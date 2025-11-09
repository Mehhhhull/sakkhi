# Troubleshooting: Stories Not Showing Up

## Problem: Approved stories aren't appearing in Bharosa Library

### Why This Happens:
Stories need to be **BOTH approved AND published** to show up on Bharosa Library.

- ✅ **Approved** = Story is reviewed and safe
- ✅ **Published** = Story is live and visible to everyone

### Solution 1: Use "Quick Publish" Button (Easiest)

In the Admin Dashboard (`/admin`):
1. Go to "Pending Review" tab
2. Click **"Quick Publish"** button (green button)
3. This approves AND publishes in one click
4. Story immediately appears on Bharosa Library

### Solution 2: Two-Step Process

In the Admin Dashboard:
1. Click "Approve Only" on a pending story
2. Go to "Approved" tab
3. Click "Publish" on the approved story
4. Story now appears on Bharosa Library

### Solution 3: Check Story Status (SQL)

Run `CHECK_STORIES.sql` in Supabase SQL Editor to see:
- How many stories are pending
- How many are approved but not published
- How many are published

```sql
SELECT 
  title,
  is_approved,
  is_published
FROM bharosa_stories
ORDER BY created_at DESC;
```

### Solution 4: Manually Publish via SQL

If you have approved stories that aren't published:

```sql
-- Publish a specific story
UPDATE bharosa_stories 
SET is_published = true, published_at = NOW() 
WHERE id = 'your-story-id-here' AND is_approved = true;

-- Or approve and publish in one go
UPDATE bharosa_stories 
SET is_approved = true, is_published = true, 
    approved_at = NOW(), published_at = NOW() 
WHERE id = 'your-story-id-here';
```

## Verification Steps

### 1. Check in Admin Dashboard
- Go to `/admin`
- Count stories in "Pending Review" tab
- Count stories in "Approved" tab
- Published stories won't appear in either tab

### 2. Check in Supabase Dashboard
- Go to Supabase → Table Editor → `bharosa_stories`
- Look at `is_approved` and `is_published` columns
- Published stories should have BOTH set to `true`

### 3. Check in Bharosa Library
- Go to `/bharosa-library`
- Scroll down to "Sacred Stories" section
- You should see:
  - 3 dummy stories (always there)
  - Your published stories (if any)

### 4. Check Browser Console
- Open browser DevTools (F12)
- Go to Console tab
- Look for: "Loaded real stories: X"
- This shows how many published stories were loaded

## Common Issues

### Issue: "I clicked Approve but story isn't showing"
**Solution:** You also need to click "Publish" after approving. Or use "Quick Publish" instead.

### Issue: "I see the story in Approved tab but not on the website"
**Solution:** Click the "Publish" button in the Approved tab.

### Issue: "Quick Publish button doesn't work"
**Solution:** Check browser console for errors. Make sure you're signed in.

### Issue: "No stories showing at all, not even dummy ones"
**Solution:** Check if the page is loading. Dummy stories are hardcoded and should always appear.

### Issue: "Story shows in database but not on website"
**Solution:** Verify both `is_approved` and `is_published` are `true` in the database.

## Quick Test

To test if everything is working:

1. **Submit a test story:**
   - Go to Bharosa Library
   - Click "Share Your Bharosa Story"
   - Fill out form and submit

2. **Check it appears in admin:**
   - Go to `/admin`
   - Should see story in "Pending Review"

3. **Quick publish it:**
   - Click "Quick Publish" button
   - Should see success message

4. **Verify it appears:**
   - Go back to Bharosa Library
   - Scroll to "Sacred Stories"
   - Your story should appear after the 3 dummy stories

## Still Not Working?

Run this SQL to see all stories and their status:

```sql
SELECT 
  id,
  title,
  author_name,
  is_approved,
  is_published,
  created_at
FROM bharosa_stories
ORDER BY created_at DESC;
```

If `is_published = true` but story still doesn't show:
1. Check browser console for errors
2. Try hard refresh (Ctrl+Shift+R)
3. Check if Row Level Security policies are correct
4. Verify Supabase connection is working
