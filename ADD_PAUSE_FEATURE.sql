-- Add pause status to user_circles table
-- Run this in Supabase SQL Editor

alter table user_circles 
add column is_paused boolean default false,
add column paused_at timestamp with time zone;

-- Create index for better performance
create index user_circles_is_paused_idx on user_circles(is_paused);
