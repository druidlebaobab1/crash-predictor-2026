-- Crash Predictor 2026 — schéma Supabase
-- À exécuter dans : Dashboard Supabase → SQL Editor → New query → Run

create extension if not exists "pgcrypto";

create table if not exists public.users (
    id uuid primary key default gen_random_uuid(),
    unique_id text not null unique,
    name text not null,
    email text not null unique,
    phone text not null default '',
    is_subscribed boolean not null default false,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

alter table public.users add column if not exists unique_id text;
alter table public.users add column if not exists name text;
alter table public.users add column if not exists email text;
alter table public.users add column if not exists phone text default '';
alter table public.users add column if not exists is_subscribed boolean default false;
alter table public.users add column if not exists created_at timestamptz default now();
alter table public.users add column if not exists updated_at timestamptz default now();

create table if not exists public.payments (
    id uuid primary key default gen_random_uuid(),
    tx_ref text not null unique,
    transaction_id text,
    flw_ref text,
    email text not null,
    unique_id text,
    amount numeric not null,
    currency text not null,
    network text,
    status text not null default 'pending',
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists users_email_idx on public.users (email);
create index if not exists users_unique_id_idx on public.users (unique_id);
create index if not exists payments_email_idx on public.payments (email);
create index if not exists payments_status_idx on public.payments (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
    new.updated_at = now();
    return new;
end;
$$;

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
before update on public.users
for each row execute procedure public.set_updated_at();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
before update on public.payments
for each row execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.payments enable row level security;

drop policy if exists "users_select_anon" on public.users;
drop policy if exists "users_insert_anon" on public.users;
drop policy if exists "users_update_anon" on public.users;
drop policy if exists "payments_select_anon" on public.payments;
drop policy if exists "payments_insert_anon" on public.payments;
drop policy if exists "payments_update_anon" on public.payments;

create policy "users_select_anon" on public.users for select to anon using (true);
create policy "users_insert_anon" on public.users for insert to anon with check (true);
create policy "users_update_anon" on public.users for update to anon using (true) with check (true);

create policy "payments_select_anon" on public.payments for select to anon using (true);
create policy "payments_insert_anon" on public.payments for insert to anon with check (true);
create policy "payments_update_anon" on public.payments for update to anon using (true) with check (true);

do $$
begin
    if not exists (
        select 1
        from pg_publication_tables
        where pubname = 'supabase_realtime'
          and schemaname = 'public'
          and tablename = 'users'
    ) then
        execute 'alter publication supabase_realtime add table public.users';
    end if;
end;
$$;
