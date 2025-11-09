-- Setup Admin Role System
-- Run this in Supabase SQL Editor

-- Step 1: Add is_admin field to user metadata
-- This will be stored in auth.users metadata

-- Step 2: Create a function to check if user is admin
create or replace function is_admin()
returns boolean
language sql
security definer
as $$
  select coalesce(
    (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean,
    false
  );
$$;

-- Step 3: Update RLS policies to check admin status
drop policy if exists "Authenticated users can update stories" on bharosa_stories;

create policy "Admins can update stories"
  on bharosa_stories for update
  using (
    auth.uid() = user_id  -- Users can update their own stories
    OR 
    is_admin()  -- Or user is an admin
  );

-- Step 4: To make a user an admin, run this (replace with actual user ID):
-- UPDATE auth.users 
-- SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
-- WHERE id = 'user-id-here';

-- To find your user ID, run:
-- SELECT id, email FROM auth.users;

-- Example: Make yourself admin (replace YOUR_EMAIL with your actual email)
-- UPDATE auth.users 
-- SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
-- WHERE email = 'your-email@example.com';
