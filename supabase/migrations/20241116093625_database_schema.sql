create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

create table public.user (
  id uuid not null default gen_random_uuid (),
  "fullName" text not null,
  email text not null,
  role character varying not null,
  "isEnabled" boolean not null default true,
  "isDeleted" boolean not null default false,
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null default now(),
  "deletedAt" timestamp with time zone default null,
  constraint user_pkey primary key (id)
) tablespace pg_default;

create policy "Enable read access for all users to users"
  on public.user
  for select
  to authenticated
  using (true);

create trigger handle_user_updated_at
  before update on public.user
  for each row
  execute function public.handle_updated_at();

create table public.warehouse (
  id uuid not null default gen_random_uuid (),
  code character varying not null,
  name text not null,
  lng double precision not null,
  lat double precision not null,
  address text null,
  "isEnabled" boolean not null default true,
  "isDeleted" boolean not null default false,
  "createdBy" uuid not null default gen_random_uuid (),
  "createdAt" timestamp with time zone not null default now(),
  "updatedAt" timestamp with time zone not null default now(),
  "deletedAt" timestamp with time zone default null,
  constraint warehouse_pkey primary key (id),
  constraint warehouse_createdBy_fkey foreign key ("createdBy") references "user" (id) on update cascade
) tablespace pg_default;

create policy "Enable read access for all users to warehouses"
  on public.warehouse
  for select
  to authenticated
  using (true);

create trigger handle_warehouse_updated_at
    before update on public.warehouse
    for each row
    execute function public.handle_updated_at();