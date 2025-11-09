-- Simple fix for admin functionality
-- Run this in Supabase SQL Editor

-- Drop the restrictive update policy
drop policy if exists "Users can update their own unpublished stories" on bharosa_stories;

-- Create a permissive policy for authenticated users
-- This allows any signed-in user to update stories (good for testing/admin)
create policy "Authenticated users can update stories"
  on bharosa_stories for update
  using (auth.role() = 'authenticated');

-- Note: For production, you should add proper admin role checking
-- For now, this allows any signed-in user to act as admin
