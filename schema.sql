
-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  website text,
  social_links jsonb,
  accent_color text,
  brand_logo_url text,
  is_public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ARTWORKS
create table if not exists artworks (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid references profiles(id) on delete cascade,
  title text not null,
  year text,
  medium text,
  dimensions jsonb,
  description text,
  tags text[],
  status text check (status in ('for_sale','sold','on_view','not_for_sale')) default 'for_sale',
  price_history jsonb,
  current_price numeric,
  currency text default 'USD',
  images text[],
  public boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- EDITIONS
create table if not exists editions (
  id uuid primary key default uuid_generate_v4(),
  artwork_id uuid references artworks(id) on delete cascade,
  edition_number int,
  edition_size int,
  price numeric,
  availability boolean default true
);

-- CATALOGUES
create table if not exists catalogues (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid references profiles(id) on delete cascade,
  title text not null,
  settings jsonb,
  artworks uuid[],
  access text check (access in ('public','password','private')) default 'public',
  password text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- INQUIRIES
create table if not exists inquiries (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid references profiles(id) on delete cascade,
  artwork_id uuid references artworks(id) on delete cascade,
  catalogue_id uuid references catalogues(id),
  name text,
  email text,
  phone text,
  message text,
  status text check (status in ('new','qualified','offer_sent','negotiation','won','lost')) default 'new',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- ORDERS
create table if not exists orders (
  id uuid primary key default uuid_generate_v4(),
  artist_id uuid references profiles(id) on delete cascade,
  inquiry_id uuid references inquiries(id),
  buyer_name text,
  buyer_email text,
  items jsonb, -- [{artwork_id, edition_id, qty, unit_price, currency}]
  currency text default 'USD',
  subtotal numeric,
  discount numeric,
  shipping numeric,
  tax numeric,
  total_amount numeric,
  status text check (status in ('draft','pending_payment','paid','shipped','cancelled')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- STORAGE BUCKETS
insert into storage.buckets (id, name, public)
values ('artworks', 'artworks', true),
       ('avatars', 'avatars', true),
       ('catalogues', 'catalogues', true)
on conflict (id) do nothing;

-- RLS
alter table profiles enable row level security;
alter table artworks enable row level security;
alter table editions enable row level security;
alter table catalogues enable row level security;
alter table inquiries enable row level security;
alter table orders enable row level security;

-- Helper: check auth.uid()
create or replace function auth_uid() returns uuid language sql immutable as $$
  select coalesce((select auth.uid()), '00000000-0000-0000-0000-000000000000')::uuid;
$$;

-- PROFILES policies
create policy "Public can view public profiles"
on profiles for select
using (is_public = true);

create policy "Users can view own profile"
on profiles for select
using (id = auth.uid());

create policy "Users can upsert own profile"
on profiles for insert with check (id = auth.uid())
;
create policy "Users can update own profile"
on profiles for update using (id = auth.uid());

-- ARTWORKS policies
create policy "Public can read public artworks"
on artworks for select using (public = true);

create policy "Owner can read own artworks"
on artworks for select using (artist_id = auth.uid());

create policy "Owner can insert artworks"
on artworks for insert with check (artist_id = auth.uid());

create policy "Owner can update artworks"
on artworks for update using (artist_id = auth.uid());

create policy "Owner can delete artworks"
on artworks for delete using (artist_id = auth.uid());

-- EDITIONS policies
create policy "Owner manages editions"
on editions for all using (exists (select 1 from artworks a where a.id = editions.artwork_id and a.artist_id = auth.uid()))
with check (exists (select 1 from artworks a where a.id = editions.artwork_id and a.artist_id = auth.uid()));

-- CATALOGUES policies
create policy "Public can read public catalogues"
on catalogues for select using (access = 'public');

create policy "Owner can read own catalogues"
on catalogues for select using (artist_id = auth.uid());

create policy "Owner manages catalogues"
on catalogues for all using (artist_id = auth.uid()) with check (artist_id = auth.uid());

-- INQUIRIES policies
create policy "Anyone can create inquiry to artist"
on inquiries for insert with check (true);

create policy "Owner can view inquiries"
on inquiries for select using (artist_id = auth.uid());

create policy "Owner can update inquiries"
on inquiries for update using (artist_id = auth.uid());

-- ORDERS policies
create policy "Owner manages orders"
on orders for all using (artist_id = auth.uid()) with check (artist_id = auth.uid());
