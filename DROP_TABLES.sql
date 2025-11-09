-- Run this FIRST to drop existing tables with the bad policies
-- Then run CIRCLE_OF_ONE_SETUP.sql

drop table if exists message_reactions cascade;
drop table if exists circle_messages cascade;
drop table if exists user_circles cascade;
drop function if exists get_matching_circles(text[]);
