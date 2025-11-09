# Bharosa Library Setup Guide

## Database Setup

### Step 1: Run the SQL Migration

In Supabase SQL Editor, run `BHAROSA_LIBRARY_SETUP.sql` to create:
- `bharosa_stories` table (stores all stories)
- `story_bookmarks` table (user bookmarks)
- `story_reflections` table (user reflections)
- Row Level Security policies
- Auto-calculate reading duration trigger

### Step 2: Run Admin Functions

Run `APPROVE_STORIES.sql` to create admin functions for:
- Approving stories
- Publishing stories
- Viewing pending stories

## Features Implemented

### For Users:

✅ **View Stories**
- Dummy stories (3 hardcoded examples) always visible
- Real user-submitted stories appear alongside dummy ones
- Stories sorted by newest first

✅ **Submit Stories**
- Click "Share Your Bharosa Story"
- Fill in title, location, author name (can be anonymous)
- Choose category, emoji, and language
- Stories go to moderation queue (not published immediately)

✅ **Bookmark Stories**
- Click 🔖 Bookmark button on any story
- Bookmarks are saved per user
- Toggle to remove bookmarks

✅ **Story Details**
- Click any story card to read full content
- Auto-calculated reading duration
- Language and ambience selectors (UI only for now)

### For Admins:

✅ **Admin Dashboard UI**
Access the admin dashboard at: `/admin`

Features:
- View all pending stories
- View approved stories waiting to be published
- Read full story content
- Approve stories with one click
- Publish approved stories
- Delete inappropriate stories

✅ **Alternative: SQL Commands**
You can also approve stories via SQL Editor:
```sql
select approve_story('story-uuid-here');
select publish_story('story-uuid-here');
select * from pending_stories;
```

## How It Works

### Story Submission Flow:
1. User fills out story form
2. Story saved with `is_approved = false` and `is_published = false`
3. Admin reviews story in Supabase dashboard
4. Admin runs `approve_story()` function
5. Admin runs `publish_story()` function
6. Story appears on Bharosa Library for all users

### Privacy & Security:
- Users can use anonymous names (e.g., "Sunflower from Mumbai", "Anonymous")
- Pet names from authentication are NOT automatically used
- Users choose how they want to be identified per story
- Row Level Security ensures users can only edit their own unpublished stories
- Only published stories are visible to everyone

### Reading Duration:
- Automatically calculated based on word count
- Assumes 200 words per minute reading speed
- Updates automatically when story content changes

## Testing

### Test Story Submission:
1. Sign in to the app
2. Go to Bharosa Library
3. Click "Share Your Bharosa Story"
4. Fill out the form and submit
5. Check Supabase dashboard → `bharosa_stories` table
6. You'll see your story with `is_published = false`

### Test Story Approval:
1. In Supabase, go to SQL Editor
2. Run: `select * from pending_stories;`
3. Copy a story ID
4. Run: `select approve_story('paste-id-here');`
5. Run: `select publish_story('paste-id-here');`
6. Refresh Bharosa Library - story now appears!

### Test Bookmarks:
1. Sign in
2. Click 🔖 on any story
3. Check `story_bookmarks` table in Supabase
4. Click again to remove bookmark

## Future Enhancements (Not Yet Implemented)

- Reflections feature (database ready, UI pending)
- Language translation (dropdown exists, functionality pending)
- Ambience audio player (dropdown exists, audio pending)
- Admin dashboard UI (currently SQL-based)
- Story editing after submission
- Story deletion requests
- Email notifications for approval

## Database Schema

### bharosa_stories
- `id` - UUID primary key
- `user_id` - References auth.users
- `title` - Story title
- `city` - Author's location
- `author_name` - How author wants to be called
- `category` - Story category
- `snippet` - Auto-generated preview
- `content` - Full story text
- `emoji` - Story emoji
- `language` - Story language
- `ambience` - Preferred ambience
- `duration` - Auto-calculated reading time
- `is_approved` - Admin approval status
- `is_published` - Publication status
- `created_at` - Submission timestamp
- `approved_at` - Approval timestamp
- `published_at` - Publication timestamp

### story_bookmarks
- `id` - UUID primary key
- `user_id` - References auth.users
- `story_id` - References bharosa_stories
- `created_at` - Bookmark timestamp

### story_reflections
- `id` - UUID primary key
- `user_id` - References auth.users
- `story_id` - References bharosa_stories
- `reflection_text` - User's reflection
- `created_at` - Reflection timestamp

## Admin Workflow

### Using Admin Dashboard (Recommended):

1. **Access Dashboard:**
   - Go to `/admin` in your browser
   - Sign in if not already logged in

2. **Review Pending Stories:**
   - See all stories in "Pending Review" tab
   - Click "View Full" to read complete story
   - Check for inappropriate content, spam, etc.

3. **Approve Story:**
   - Click "Approve" button on the story card
   - Story moves to "Approved" tab

4. **Publish Story:**
   - Go to "Approved" tab
   - Click "Publish" on approved stories
   - Story now appears on Bharosa Library for all users

5. **Delete Story:**
   - Click "Delete" button to remove inappropriate stories
   - Confirmation required

### Using SQL (Alternative):

1. **Check Pending Stories:**
   ```sql
   select * from pending_stories;
   ```

2. **Review Story Content:**
   ```sql
   select title, content, author_name, city 
   from bharosa_stories 
   where id = 'story-id';
   ```

3. **Approve Story:**
   ```sql
   select approve_story('story-id');
   ```

4. **Publish Story:**
   ```sql
   select publish_story('story-id');
   ```

5. **Unpublish if Needed:**
   ```sql
   select unpublish_story('story-id');
   ```

## Notes

- Dummy stories (3 hardcoded) will always appear first
- Real stories appear after dummy stories
- Stories require both approval AND publication to be visible
- Users can submit multiple stories
- Each story can have a different author name (for privacy)
- Bookmarks are private to each user
