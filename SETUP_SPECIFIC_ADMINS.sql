-- Setup Specific Admin Users
-- Run this in Supabase SQL Editor

-- First, run SETUP_ADMIN_ROLE.sql if you haven't already
-- Then run this script to make specific users admin

-- Make mehulkumarsingh.2004@gmail.com admin
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'mehulkumarsingh.2004@gmail.com';

-- Make aarti.g1983@gmail.com admin
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'aarti.g1983@gmail.com';

-- Verify admin users
SELECT 
  email, 
  raw_user_meta_data->>'is_admin' as is_admin,
  created_at
FROM auth.users 
WHERE email IN ('mehulkumarsingh.2004@gmail.com', 'aarti.g1983@gmail.com');

-- Note: These users need to sign out and sign in again for changes to take effect
