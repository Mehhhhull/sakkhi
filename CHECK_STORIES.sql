-- Check the status of all stories in your database
-- Run this in Supabase SQL Editor to see what's happening

-- View all stories with their status
SELECT 
  id,
  title,
  author_name,
  city,
  is_approved,
  is_published,
  created_at,
  approved_at,
  published_at
FROM bharosa_stories
ORDER BY created_at DESC;

-- Count stories by status
SELECT 
  COUNT(*) FILTER (WHERE is_approved = false AND is_published = false) as pending,
  COUNT(*) FILTER (WHERE is_approved = true AND is_published = false) as approved_not_published,
  COUNT(*) FILTER (WHERE is_published = true) as published,
  COUNT(*) as total
FROM bharosa_stories;

-- If you want to manually publish a story that's approved:
-- UPDATE bharosa_stories 
-- SET is_published = true, published_at = NOW() 
-- WHERE id = 'your-story-id-here' AND is_approved = true;

-- If you want to approve AND publish in one step:
-- UPDATE bharosa_stories 
-- SET is_approved = true, is_published = true, approved_at = NOW(), published_at = NOW() 
-- WHERE id = 'your-story-id-here';
