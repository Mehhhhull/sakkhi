-- Circle of One Database Setup
-- Run this in your Supabase SQL Editor

-- Create user_circles table to store user experience selections
create table user_circles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  experiences text[] not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  is_active boolean default true
);

-- Create messages table for circle chat
create table circle_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  circle_id uuid references user_circles on delete cascade not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create reactions table for message reactions
create table message_reactions (
  id uuid default gen_random_uuid() primary key,
  message_id uuid references circle_messages on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  emoji text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(message_id, user_id, emoji)
);

-- Enable Row Level Security
alter table user_circles enable row level security;
alter table circle_messages enable row level security;
alter table message_reactions enable row level security;

-- Policies for user_circles (FIXED - no recursion)
create policy "Users can view their own circles"
  on user_circles for select
  using (auth.uid() = user_id);

create policy "Users can view circles with matching experiences"
  on user_circles for select
  using (
    exists (
      select 1 from user_circles my_circle
      where my_circle.user_id = auth.uid()
      and my_circle.experiences && user_circles.experiences
      and my_circle.is_active = true
      and user_circles.is_active = true
      and my_circle.id != user_circles.id
    )
  );

create policy "Users can insert their own circles"
  on user_circles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own circles"
  on user_circles for update
  using (auth.uid() = user_id);

-- Policies for circle_messages
create policy "Users can view messages in their circles"
  on circle_messages for select
  using (
    exists (
      select 1 from user_circles uc1
      join user_circles uc2 on uc1.experiences && uc2.experiences
      where uc1.user_id = auth.uid()
      and uc2.id = circle_messages.circle_id
      and uc1.is_active = true
      and uc2.is_active = true
    )
  );

create policy "Users can insert messages in their circles"
  on circle_messages for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from user_circles
      where id = circle_id
      and user_id = auth.uid()
      and is_active = true
    )
  );

-- Policies for message_reactions
create policy "Users can view all reactions"
  on message_reactions for select
  using (true);

create policy "Users can add their own reactions"
  on message_reactions for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own reactions"
  on message_reactions for delete
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index user_circles_user_id_idx on user_circles(user_id);
create index user_circles_experiences_idx on user_circles using gin(experiences);
create index user_circles_is_active_idx on user_circles(is_active);
create index circle_messages_circle_id_idx on circle_messages(circle_id);
create index circle_messages_created_at_idx on circle_messages(created_at desc);
create index message_reactions_message_id_idx on message_reactions(message_id);

-- Create a function to get matching circles
create or replace function get_matching_circles(user_experiences text[])
returns setof user_circles
language sql
stable
as $$
  select * from user_circles
  where experiences && user_experiences
  and is_active = true
  order by created_at desc;
$$;
