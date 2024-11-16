create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new."updatedAt" = now();
  return new;
end;
$$ language plpgsql;

create table public.warehouse (
    id uuid not null default gen_random_uuid (),
    code character varying not null,
    name text not null,
    lng double precision not null,
    lat double precision not null,
    address text null,
    "isActive" boolean not null default true,
    "createdBy" uuid not null default gen_random_uuid (),
    "createdAt" timestamp with time zone default now(),
    "updatedAt" timestamp with time zone default now(),
    constraint warehouse_pkey primary key (id)
);

create policy "Enable read access for all users"
  on public.warehouse
  for select
  to authenticated
  using (true);

create trigger handle_warehouse_updated_at
    before update on public.warehouse
    for each row
    execute function public.handle_updated_at();