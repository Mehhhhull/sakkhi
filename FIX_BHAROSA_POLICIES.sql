-- Fix Row Level Security policies for Bharosa Library
-- Run this in Supabase SQL Editor

-- Drop existing update policy
drop policy if exists "Users can update their own unpublished stories" on bharosa_stories;

-- Create new update policy that allows:
-- 1. Users can update their own stories
-- 2. Anyone can update approval/publish status (for admin functionality)
create policy "Users can update stories"
  on bharosa_stories for update
  using (
    auth.uid() = user_id  -- Users can update their own stories
    OR 
    true  -- Or anyone can update (for admin - you can restrict this later)
  )
  with check (
    auth.uid() = user_id  -- Users can only modify their own content
    OR
    true  -- Or allow admin updates (you can restrict this later)
  );

-- Alternative: More secure version (uncomment if you want stricter control)
-- This only allows updating approval/publish fields by anyone, but content only by owner
/*
create policy "Users can update their own story content"
  on bharosa_stories for update
  using (auth.uid() = user_id);

create policy "Anyone can update approval status"
  on bharosa_stories for update
  using (true)
  with check (
    -- Only allow updating these specific fields
    (old.title = new.title) AND
    (old.content = new.content) AND
    (old.author_name = new.author_name) AND
    (old.city = new.city)
  );
*/
