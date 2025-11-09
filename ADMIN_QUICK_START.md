# Admin Dashboard Quick Start

## How to Approve Stories

### Step 1: Access Admin Dashboard
Go to: `http://localhost:5173/admin` (or your deployed URL + `/admin`)

### Step 2: Sign In
- You need to be signed in to access the admin dashboard
- Any authenticated user can currently access it
- (You can add role-based access control later)

### Step 3: Review Stories

**Pending Review Tab:**
- Shows all newly submitted stories
- Stories are waiting for your approval
- Click "View Full" to read the complete story

**Approved Tab:**
- Shows stories you've approved
- These are ready to be published
- Click "Publish" to make them public

### Step 4: Approve a Story

1. Read the story carefully
2. Check for:
   - Inappropriate content
   - Spam or promotional content
   - Harmful or triggering content without warnings
3. Click "Approve" if the story is good
4. Click "Delete" if the story should be removed

### Step 5: Publish a Story

1. Go to "Approved" tab
2. Click "Publish" on any approved story
3. Story immediately appears on Bharosa Library for all users

## Admin Dashboard Features

### Story Cards Show:
- Title and author name
- City and category
- Emoji and language
- Snippet preview
- Submission date

### Actions Available:
- **View Full** - Read complete story in modal
- **Approve** - Mark story as approved (pending stories only)
- **Publish** - Make story public (approved stories only)
- **Delete** - Remove story permanently (requires confirmation)

### Two-Step Process:
1. **Approve** - Story is reviewed and deemed appropriate
2. **Publish** - Story goes live on Bharosa Library

This two-step process gives you time to review before making stories public.

## Quick Tips

✅ **Review carefully** - These are real people's stories
✅ **Be respectful** - Even when rejecting, remember someone shared their truth
✅ **Check language** - Make sure the language tag matches the content
✅ **Verify location** - City should be appropriate (can be vague for privacy)
✅ **Author names** - Can be anonymous, pet names, or real names - all are okay

## What to Reject

❌ Spam or promotional content
❌ Hate speech or discrimination
❌ Graphic violence without context
❌ Content that could harm others
❌ Duplicate submissions
❌ Stories that don't fit the platform's purpose

## What to Approve

✅ Personal motherhood experiences
✅ Mental health journeys
✅ Postpartum stories
✅ Pregnancy experiences
✅ Self-discovery narratives
✅ Support and encouragement
✅ Raw, honest, authentic stories

## Security Note

Currently, any signed-in user can access `/admin`. For production, you should:

1. Add an `is_admin` field to user profiles
2. Create an admin role in Supabase
3. Protect the admin route with role checking
4. Only allow specific users to approve/publish

Example protection (to implement later):
```javascript
if (!user?.user_metadata?.is_admin) {
  return <div>Access Denied</div>;
}
```

## Need Help?

- Check `BHAROSA_LIBRARY_GUIDE.md` for detailed documentation
- Use SQL commands in `APPROVE_STORIES.sql` as alternative
- View database directly in Supabase dashboard
