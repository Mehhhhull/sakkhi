-- Complete Fix Script
-- Run this ENTIRE script in Supabase SQL Editor to fix the infinite recursion issue

-- Step 1: Drop all existing policies
drop policy if exists "Users can view circles with matching experiences" on user_circles;
drop policy if exists "Users can view their own circles" on user_circles;
drop policy if exists "Users can insert their own circles" on user_circles;
drop policy if exists "Users can update their own circles" on user_circles;
drop policy if exists "Users can view messages in their circles" on circle_messages;
drop policy if exists "Users can insert messages in their circles" on circle_messages;
drop policy if exists "Users can view all reactions" on message_reactions;
drop policy if exists "Users can add their own reactions" on message_reactions;
drop policy if exists "Users can delete their own reactions" on message_reactions;

-- Step 2: Create FIXED policies without recursion

-- Policy 1: Users can ALWAYS view their own circles
create policy "Users can view their own circles"
  on user_circles for select
  using (auth.uid() = user_id);

-- Policy 2: Users can insert their own circles
create policy "Users can insert their own circles"
  on user_circles for insert
  with check (auth.uid() = user_id);

-- Policy 3: Users can update their own circles
create policy "Users can update their own circles"
  on user_circles for update
  using (auth.uid() = user_id);

-- Policy 4: Users can view messages in their circles
create policy "Users can view messages in their circles"
  on circle_messages for select
  using (
    exists (
      select 1 from user_circles uc1
      cross join user_circles uc2
      where uc1.user_id = auth.uid()
      and uc2.id = circle_messages.circle_id
      and uc1.experiences && uc2.experiences
      and uc1.is_active = true
      and uc2.is_active = true
    )
  );

-- Policy 5: Users can insert messages in their circles
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

-- Policy 6: Users can view all reactions
create policy "Users can view all reactions"
  on message_reactions for select
  using (true);

-- Policy 7: Users can add their own reactions
create policy "Users can add their own reactions"
  on message_reactions for insert
  with check (auth.uid() = user_id);

-- Policy 8: Users can delete their own reactions
create policy "Users can delete their own reactions"
  on message_reactions for delete
  using (auth.uid() = user_id);
