-- Admin functions to approve and publish stories
-- Run this in Supabase SQL Editor

-- Function to approve a story (admin only)
create or replace function approve_story(story_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update bharosa_stories
  set is_approved = true,
      approved_at = now()
  where id = story_id;
end;
$$;

-- Function to publish a story (admin only)
create or replace function publish_story(story_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update bharosa_stories
  set is_published = true,
      published_at = now()
  where id = story_id
  and is_approved = true;
end;
$$;

-- Function to unpublish a story (admin only)
create or replace function unpublish_story(story_id uuid)
returns void
language plpgsql
security definer
as $$
begin
  update bharosa_stories
  set is_published = false
  where id = story_id;
end;
$$;

-- View all pending stories (for admin dashboard)
-- You can query this in Supabase dashboard or create an admin page
create or replace view pending_stories as
select 
  id,
  title,
  author_name,
  city,
  category,
  snippet,
  created_at,
  user_id
from bharosa_stories
where is_approved = false
order by created_at desc;

-- To approve a story, run in SQL Editor:
-- select approve_story('story-uuid-here');

-- To publish an approved story, run:
-- select publish_story('story-uuid-here');

-- To view pending stories, run:
-- select * from pending_stories;
