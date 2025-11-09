# Complete Setup Instructions

## Step 1: Supabase Project Setup

1. Go to https://supabase.com and create an account
2. Click "New Project"
3. Fill in project details and wait for setup to complete

## Step 2: Get API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy:
   - **Project URL**
   - **anon public key**

## Step 3: Configure Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholders with your actual Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 4: Run Database Migration

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. **First**, run `DROP_TABLES.sql` (if you had previous tables)
4. **Then**, copy the entire content from `CIRCLE_OF_ONE_SETUP.sql`
5. Paste it into the SQL Editor and click "Run"
6. **Finally**, run `ADD_PAUSE_FEATURE.sql` to add pause functionality

This creates:
- `user_circles` table (stores user experience selections and pause status)
- `circle_messages` table (stores chat messages)
- `message_reactions` table (for emoji reactions)
- Row Level Security policies (for data privacy)
- Indexes (for better performance)

## Step 5: Enable Realtime (Optional but Recommended)

1. In Supabase dashboard, go to **Database** → **Replication**
2. Find the `circle_messages` table
3. Enable replication for real-time message updates

## Step 6: Run Your App

```bash
npm install
npm run dev
```

## What Works Now:

✅ **Authentication**
- User signup with email/password
- Anonymous pet names for privacy
- Login/logout functionality

✅ **Circle of One**
- Select up to 2 experiences
- Matched with users who share similar experiences
- Real-time chat with other moms
- Messages persist in database
- Pet names shown instead of real names
- Dummy messages mixed with real ones for better UX
- Pause chat feature - other users see when someone pauses
- Real-time pause status notifications

✅ **Protected Routes**
- Circle of One requires authentication
- Bharosa Library requires authentication

## Testing Circle of One:

1. Create 2+ accounts with different pet names
2. Select the same experiences (e.g., "First-time mom" + "Postpartum depression")
3. Both users will see each other's messages in real-time
4. Messages are stored permanently in the database

## Troubleshooting:

**Error: "supabaseUrl is required"**
- Make sure `.env` file exists with correct values
- Restart dev server after adding environment variables

**Messages not showing up**
- Check if SQL migration ran successfully
- Verify Row Level Security policies are created
- Check browser console for errors

**Real-time not working**
- Enable replication for `circle_messages` table
- Check if Supabase project is on a paid plan (free tier has limits)

## Security Notes:

- Pet names are used instead of real names for privacy
- Row Level Security ensures users only see messages from matching circles
- All data is encrypted in transit and at rest
- Never commit `.env` file to version control
