# Final Admin Setup - Specific Users Only

## Admin Users
Only these two emails have admin access:
- ✅ mehulkumarsingh.2004@gmail.com
- ✅ aarti.g1983@gmail.com

## Setup Steps

### Step 1: Run Admin Role Setup
In Supabase SQL Editor, run:
```
SETUP_ADMIN_ROLE.sql
```

### Step 2: Make Specific Users Admin
In Supabase SQL Editor, run:
```
SETUP_SPECIFIC_ADMINS.sql
```

This will:
- Make mehulkumarsingh.2004@gmail.com admin
- Make aarti.g1983@gmail.com admin
- Verify both users are set up correctly

### Step 3: Sign Out and Sign In
Both admin users need to:
1. Sign out of their accounts
2. Sign in again
3. Go to `/admin`
4. They should now have access!

## Security Layers

### Layer 1: Frontend Check
- Admin emails are hardcoded in the React component
- Only these emails can see the admin dashboard

### Layer 2: Database Check
- User metadata has `is_admin: true` flag
- Database policies check this flag

### Layer 3: Row Level Security
- Only admins can update story approval/publish status
- Regular users cannot modify these fields

## What Each User Can Do

### Admin Users (mehulkumarsingh.2004@gmail.com & aarti.g1983@gmail.com):
- ✅ Access `/admin` dashboard
- ✅ View all pending stories
- ✅ Approve stories
- ✅ Publish stories
- ✅ Delete inappropriate stories
- ✅ Submit their own stories
- ✅ View and bookmark all published stories

### Regular Users (Everyone Else):
- ❌ Cannot access `/admin` dashboard
- ❌ See "Access Denied" if they try
- ✅ Can submit stories (goes to moderation)
- ✅ Can view published stories
- ✅ Can bookmark stories
- ✅ Can use Circle of One
- ✅ Can use all other features

## Verification

### Check if users are admin in database:
```sql
SELECT 
  email, 
  raw_user_meta_data->>'is_admin' as is_admin
FROM auth.users 
WHERE email IN ('mehulkumarsingh.2004@gmail.com', 'aarti.g1983@gmail.com');
```

Should show `true` for both emails.

### Check if users exist:
```sql
SELECT email, created_at 
FROM auth.users 
WHERE email IN ('mehulkumarsingh.2004@gmail.com', 'aarti.g1983@gmail.com');
```

## Adding More Admins Later

If you want to add another admin in the future:

### Option 1: Update the code
Edit `src/Pages/Admin/AdminDashboard.jsx`:
```javascript
const ADMIN_EMAILS = [
  'mehulkumarsingh.2004@gmail.com',
  'aarti.g1983@gmail.com',
  'new-admin@example.com'  // Add new email here
];
```

### Option 2: Use SQL only
```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'new-admin@example.com';
```

## Removing Admin Access

To remove admin access from a user:

```sql
UPDATE auth.users 
SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": false}'::jsonb
WHERE email = 'user-email@example.com';
```

And remove their email from the hardcoded list in the code.

## Important Notes

1. **Both users must create accounts first** before running the SQL
2. **They must sign out and sign in** after being made admin
3. **Frontend check is immediate** - works as soon as code is deployed
4. **Database check requires SQL** - must run the SQL scripts
5. **Both layers work together** - provides double security

## Troubleshooting

### "User not found in database"
**Solution:** The user needs to sign up first. Create an account with that email.

### "Still seeing Access Denied"
**Solution:** 
1. Check if SQL was run successfully
2. Sign out and sign in again
3. Clear browser cache
4. Check browser console for errors

### "SQL says 0 rows updated"
**Solution:** The user hasn't created an account yet. They need to sign up first.

## Testing

1. **Test with admin account:**
   - Sign in as mehulkumarsingh.2004@gmail.com
   - Go to `/admin`
   - Should see admin dashboard

2. **Test with regular account:**
   - Sign in with any other email
   - Go to `/admin`
   - Should see "Access Denied"

3. **Test story approval:**
   - Submit a story as regular user
   - Sign in as admin
   - Approve and publish the story
   - Verify it appears on Bharosa Library
