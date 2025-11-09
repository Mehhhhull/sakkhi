# How to Make Yourself Admin

## Quick Setup (3 Steps)

### Step 1: Run the Admin Setup SQL

In Supabase SQL Editor, run `SETUP_ADMIN_ROLE.sql`

This creates:
- Admin checking function
- Updated RLS policies
- Admin role system

### Step 2: Find Your User ID

In Supabase SQL Editor, run:

```sql
SELECT id, email FROM auth.users;
```

Copy your user ID (the UUID next to your email)

### Step 3: Make Yourself Admin

In Supabase SQL Editor, run (replace with YOUR email):

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'your-email@example.com';
```

**Example:**
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'john@example.com';
```

### Step 4: Sign Out and Sign In Again

1. Sign out of your account
2. Sign in again
3. Go to `/admin`
4. You should now have access! 🎉

## Verify Admin Status

To check if you're an admin, run:

```sql
SELECT 
  email, 
  raw_user_meta_data->>'is_admin' as is_admin 
FROM auth.users 
WHERE email = 'your-email@example.com';
```

Should return `true` in the `is_admin` column.

## Make Another User Admin

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'another-user@example.com';
```

## Remove Admin Access

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": false}'::jsonb
WHERE email = 'user-to-remove@example.com';
```

Or completely remove the field:

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data - 'is_admin'
WHERE email = 'user-to-remove@example.com';
```

## What Happens Now?

### For Admin Users:
- ✅ Can access `/admin` dashboard
- ✅ Can approve stories
- ✅ Can publish stories
- ✅ Can delete stories

### For Regular Users:
- ❌ Cannot access `/admin` dashboard
- ❌ See "Access Denied" message if they try
- ✅ Can still submit stories
- ✅ Can still view published stories
- ✅ Can still bookmark stories

## Security Notes

- Admin status is stored in user metadata
- Only admins can update story approval/publish status
- Regular users can only update their own unpublished stories
- Admin check happens on both frontend and database level
- Users cannot make themselves admin (only via SQL)

## Troubleshooting

### "Still seeing Access Denied after making myself admin"
**Solution:** Sign out and sign in again. The user metadata needs to refresh.

### "Can't find my email in auth.users"
**Solution:** Make sure you've created an account and verified your email.

### "SQL command doesn't work"
**Solution:** Make sure you ran `SETUP_ADMIN_ROLE.sql` first.

### "Want to test with multiple accounts"
**Solution:** Create multiple accounts and make them all admin using the same SQL command with different emails.

## Alternative: Make Admin During Signup

If you want to automatically make certain emails admin during signup, you can use Supabase Database Webhooks or Edge Functions. For now, manual SQL is the simplest approach.
