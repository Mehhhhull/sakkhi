# Supabase Authentication Setup Guide

## 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Fill in your project details:
   - Project name: `sakkhi` (or your preferred name)
   - Database password: (create a strong password)
   - Region: Choose closest to your users
4. Click "Create new project" and wait for setup to complete

## 2. Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## 3. Configure Your App

1. Create a `.env` file in your project root:
```bash
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

2. Replace the placeholder values with your actual Supabase credentials

## 4. Enable Email Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email templates (optional):
   - Go to **Authentication** → **Email Templates**
   - Customize confirmation and password reset emails

## 5. Configure Email Settings (Optional but Recommended)

For production, set up a custom SMTP provider:
1. Go to **Settings** → **Auth**
2. Scroll to **SMTP Settings**
3. Add your email provider details (SendGrid, Mailgun, etc.)

## 6. Database Setup (Optional)

If you want to store additional user data:

```sql
-- Create a profiles table
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  pet_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Create a trigger to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, pet_name)
  values (new.id, new.raw_user_meta_data->>'pet_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

## 7. Run Your App

```bash
npm install
npm run dev
```

## Features Implemented

✅ User registration with email/password
✅ Anonymous pet name selection (for privacy)
✅ Random pet name generator
✅ Login/Logout functionality
✅ Protected routes for Circle of One and Bharosa Library
✅ User menu with pet name display
✅ Pet name editing capability
✅ Persistent authentication across page refreshes

## How It Works

1. **Sign Up**: Users create an account with email, password, and choose an anonymous pet name
2. **Pet Names**: Instead of showing real names/emails, the app displays pet names for privacy
3. **Protected Routes**: Circle of One and Bharosa Library require authentication
4. **User Menu**: Shows current pet name and allows editing
5. **Supabase Storage**: User metadata (including pet name) is stored in Supabase

## Security Notes

- Never commit your `.env` file to version control
- The `.env.example` file is provided as a template
- Pet names are stored in user metadata for privacy
- Row Level Security (RLS) should be enabled for any custom tables
