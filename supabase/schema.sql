-- SCA Career Platform — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste → Run).

-- ---------------------------------------------------------------
-- profiles: one row per student account, created automatically
-- on signup by the trigger below (data comes from auth signup
-- metadata set in js/supabase-client.js signUp()).
-- ---------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  region text check (region in ('East Africa', 'West Africa')),
  country text not null,
  year_of_study text,
  university text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_insert_own" on public.profiles
  for insert with check (auth.uid() = id);

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- ---------------------------------------------------------------
-- bookmarks: saved opportunities. opportunity_id matches the
-- `id` column of the Google Sheet / opportunities.json row.
-- Title/org/link are copied in at save time so a student's saved
-- list still renders correctly even if a listing is later removed
-- from the Sheet.
-- ---------------------------------------------------------------
create table if not exists public.bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  opportunity_id text not null,
  opportunity_title text,
  opportunity_org text,
  opportunity_apply_link text,
  created_at timestamptz not null default now(),
  unique (user_id, opportunity_id)
);

alter table public.bookmarks enable row level security;

create policy "bookmarks_select_own" on public.bookmarks
  for select using (auth.uid() = user_id);

create policy "bookmarks_insert_own" on public.bookmarks
  for insert with check (auth.uid() = user_id);

create policy "bookmarks_delete_own" on public.bookmarks
  for delete using (auth.uid() = user_id);

-- ---------------------------------------------------------------
-- Auto-create a profile row right after signup, from the metadata
-- passed into supabase.auth.signUp({ options: { data: {...} } }).
-- ---------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, region, country, year_of_study, university)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'region',
    new.raw_user_meta_data ->> 'country',
    new.raw_user_meta_data ->> 'year_of_study',
    new.raw_user_meta_data ->> 'university'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
