-- Bharosa Library Database Setup
-- Run this in your Supabase SQL Editor

-- Create stories table
create table bharosa_stories (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  city text not null,
  author_name text not null,
  category text,
  snippet text,
  content text not null,
  emoji text default '✨',
  language text default 'English',
  ambience text default 'Silence',
  duration text,
  is_approved boolean default false,
  is_published boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  approved_at timestamp with time zone,
  published_at timestamp with time zone
);

-- Create bookmarks table
create table story_bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  story_id uuid references bharosa_stories on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, story_id)
);

-- Create reflections table (for "Reflect" feature)
create table story_reflections (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  story_id uuid references bharosa_stories on delete cascade not null,
  reflection_text text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table bharosa_stories enable row level security;
alter table story_bookmarks enable row level security;
alter table story_reflections enable row level security;

-- Policies for bharosa_stories
create policy "Anyone can view published stories"
  on bharosa_stories for select
  using (is_published = true);

create policy "Users can view their own stories"
  on bharosa_stories for select
  using (auth.uid() = user_id);

create policy "Users can insert their own stories"
  on bharosa_stories for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own unpublished stories"
  on bharosa_stories for update
  using (auth.uid() = user_id and is_published = false);

-- Policies for story_bookmarks
create policy "Users can view their own bookmarks"
  on story_bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can create their own bookmarks"
  on story_bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own bookmarks"
  on story_bookmarks for delete
  using (auth.uid() = user_id);

-- Policies for story_reflections
create policy "Users can view their own reflections"
  on story_reflections for select
  using (auth.uid() = user_id);

create policy "Users can create their own reflections"
  on story_reflections for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reflections"
  on story_reflections for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reflections"
  on story_reflections for delete
  using (auth.uid() = user_id);

-- Create indexes for better performance
create index bharosa_stories_user_id_idx on bharosa_stories(user_id);
create index bharosa_stories_published_idx on bharosa_stories(is_published, published_at desc);
create index bharosa_stories_approved_idx on bharosa_stories(is_approved);
create index story_bookmarks_user_id_idx on story_bookmarks(user_id);
create index story_bookmarks_story_id_idx on story_bookmarks(story_id);
create index story_reflections_story_id_idx on story_reflections(story_id);

-- Function to calculate reading duration based on word count
create or replace function calculate_reading_duration(content_text text)
returns text
language plpgsql
as $$
declare
  word_count int;
  minutes int;
begin
  word_count := array_length(regexp_split_to_array(content_text, '\s+'), 1);
  minutes := greatest(1, round(word_count / 200.0));
  return minutes || ' min read';
end;
$$;

-- Trigger to auto-calculate duration on insert/update
create or replace function set_story_duration()
returns trigger
language plpgsql
as $$
begin
  new.duration := calculate_reading_duration(new.content);
  return new;
end;
$$;

create trigger calculate_duration_trigger
before insert or update on bharosa_stories
for each row
execute function set_story_duration();
