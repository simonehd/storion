-- Storion foundation. Apply once through controlled migration tooling.
begin;

-- Fail closed if another setup has introduced application resources since inspection.
do $$
begin
 if exists(select 1 from pg_class c join pg_namespace n on n.oid=c.relnamespace
   where n.nspname='public' and c.relkind in ('r','p','v','m'))
   or exists(select 1 from pg_namespace where nspname='storion_private')
   or exists(select 1 from storage.buckets)
   or exists(select 1 from pg_policies where schemaname in ('public','storage')) then
   raise exception 'Existing application resources detected. Inspect before applying foundation.';
 end if;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (length(display_name) between 1 and 100),
  role text not null check (role in ('creator', 'industry', 'company')),
  bio text not null default '',
  country text not null default '',
  languages text[] not null default '{}',
  interests text[] not null default '{}',
  acquisition_criteria text not null default '',
  territories text[] not null default '{}',
  created_at timestamptz not null default now()
);
create table public.companies (
  id uuid primary key default gen_random_uuid(),
  representative_id uuid not null references public.profiles(id),
  name text not null check (length(name) between 1 and 150),
  description text not null default '',
  country text not null default '',
  created_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id),
  title text not null check (length(title) between 1 and 150),
  synopsis text not null check (length(synopsis) between 1 and 10000),
  format text not null check (format in ('film', 'series', 'book')),
  stage text not null check (stage in ('idea', 'in_development', 'completed')),
  genres text[] not null default '{}',
  themes text[] not null default '{}',
  countries text[] not null default '{}',
  languages text[] not null default '{}',
  territories text[] not null default '{}',
  looking_for text[] not null default '{}',
  budget numeric check (budget >= 0),
  currency text not null default 'USD' check (currency ~ '^[A-Z]{3}$'),
  funding_notes text not null default '',
  visibility text not null default 'private' check (visibility in ('public','private')),
  ownership_declared boolean not null default false,
  created_at timestamptz not null default now(),
  check (visibility = 'private' or ownership_declared)
);
create index projects_owner on public.projects(owner_id);
create index projects_discovery on public.projects(visibility, format, stage);
create table public.favourites (
  user_id uuid references auth.users(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(user_id, project_id)
);
create table public.interests (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id),
  project_id uuid not null references public.projects(id) on delete cascade,
  message text not null check (length(message) between 1 and 4000),
  categories text[] not null check (cardinality(categories) between 1 and 5),
  status text not null default 'Received' check (status in ('Received','Viewed','Action required')),
  created_at timestamptz not null default now(),
  unique(sender_id, project_id)
);
create index interests_project on public.interests(project_id);
create table public.activity (
  id uuid primary key default gen_random_uuid(),
  interest_id uuid not null references public.interests(id) on delete cascade,
  actor_id uuid not null references auth.users(id),
  status text not null check (status in ('Received','Viewed','Action required')),
  created_at timestamptz not null default now()
);
create index activity_interest on public.activity(interest_id);
create table public.documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null check (length(name) between 1 and 200),
  storage_path text not null unique,
  created_at timestamptz not null default now()
);
create table public.document_permissions (
  document_id uuid references public.documents(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  primary key(document_id,user_id)
);
create table public.country_spotlights (
  id uuid primary key default gen_random_uuid(),
  month date not null unique check (extract(day from month) = 1),
  country_code text not null check (country_code ~ '^[A-Z]{2}$'),
  country_name text not null,
  introduction text not null,
  cultures jsonb not null default '[]'::jsonb check (jsonb_typeof(cultures) = 'array'),
  published boolean not null default false
);
create table public.spotlight_projects (
  spotlight_id uuid references public.country_spotlights(id) on delete cascade,
  project_id uuid references public.projects(id) on delete cascade,
  primary key(spotlight_id, project_id)
);

-- Private helper schema keeps security-definer helpers out of the public API.
create schema storion_private;
revoke all on schema storion_private from public;
grant usage on schema storion_private to anon, authenticated;
create function storion_private.owns_project(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.projects where id=target and owner_id=(select auth.uid()));
$$;
create function storion_private.owns_document(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.documents d join public.projects p on p.id=d.project_id
 where d.id=target and p.owner_id=(select auth.uid()));
$$;
create function storion_private.can_read_document(target uuid) returns boolean
language sql stable security definer set search_path = '' as $$
 select storion_private.owns_document(target) or exists(select 1 from public.document_permissions
 where document_id=target and user_id=(select auth.uid()));
$$;
revoke all on all functions in schema storion_private from public;
grant execute on all functions in schema storion_private to anon, authenticated;

alter table public.profiles enable row level security;
alter table public.companies enable row level security;
alter table public.projects enable row level security;
alter table public.favourites enable row level security;
alter table public.interests enable row level security;
alter table public.activity enable row level security;
alter table public.documents enable row level security;
alter table public.document_permissions enable row level security;
alter table public.country_spotlights enable row level security;
alter table public.spotlight_projects enable row level security;

-- Supabase default privileges may include TRUNCATE, which bypasses RLS.
-- Reset privileges on these new tables before granting only required operations.
revoke all on public.profiles, public.companies, public.projects, public.favourites,
 public.interests, public.activity, public.documents, public.document_permissions,
 public.country_spotlights, public.spotlight_projects from public, anon, authenticated;
grant select on public.profiles, public.companies, public.projects, public.country_spotlights, public.spotlight_projects to anon, authenticated;
grant insert, update, delete on public.profiles, public.companies, public.projects to authenticated;
grant select, insert, delete on public.favourites, public.interests, public.documents, public.document_permissions to authenticated;
grant select on public.activity to authenticated;
-- Explicitly limit grants even if the project's default privileges are broad.
revoke all on public.favourites, public.interests, public.activity, public.documents, public.document_permissions from anon;
revoke update on public.interests, public.activity, public.documents, public.document_permissions from authenticated;
revoke insert, delete on public.activity from authenticated;
revoke insert, update, delete on public.country_spotlights, public.spotlight_projects from anon, authenticated;

create policy profiles_read on public.profiles for select using (true);
create policy profiles_write on public.profiles for all to authenticated using (id=auth.uid()) with check (id=auth.uid());
create policy companies_read on public.companies for select using (true);
create policy companies_write on public.companies for all to authenticated using (representative_id=auth.uid()) with check (representative_id=auth.uid());
create policy projects_read on public.projects for select using (visibility='public' or owner_id=auth.uid());
create policy projects_write on public.projects for all to authenticated using (owner_id=auth.uid()) with check (owner_id=auth.uid());
create policy favourites_read_delete on public.favourites for all to authenticated using (user_id=auth.uid()) with check (
 user_id=auth.uid() and exists(select 1 from public.projects p where p.id=project_id));
create policy interests_read on public.interests for select to authenticated using (sender_id=auth.uid() or storion_private.owns_project(project_id));
create policy interests_insert on public.interests for insert to authenticated with check (
 sender_id=auth.uid() and status='Received' and exists(select 1 from public.projects p where p.id=project_id and p.visibility='public' and p.owner_id<>auth.uid()));
create policy activity_read on public.activity for select to authenticated using (exists(select 1 from public.interests i where i.id=interest_id));
create policy documents_read on public.documents for select to authenticated using (storion_private.owns_project(project_id) or storion_private.can_read_document(id));
create policy documents_insert on public.documents for insert to authenticated with check (
 storion_private.owns_project(project_id) and storage_path like auth.uid()::text || '/' || project_id::text || '/%');
create policy documents_delete on public.documents for delete to authenticated using (storion_private.owns_project(project_id));
create policy permissions_read on public.document_permissions for select to authenticated using (user_id=auth.uid() or storion_private.owns_document(document_id));
create policy permissions_insert on public.document_permissions for insert to authenticated with check (storion_private.owns_document(document_id));
create policy permissions_delete on public.document_permissions for delete to authenticated using (storion_private.owns_document(document_id));
create policy spotlights_read on public.country_spotlights for select using (published);
create policy spotlight_projects_read on public.spotlight_projects for select using (exists(select 1 from public.country_spotlights s where s.id=spotlight_id and s.published));

create function public.set_interest_status(target uuid, new_status text) returns void
language plpgsql security definer set search_path = '' as $$
declare current_interest public.interests;
begin
 select * into current_interest from public.interests where id=target for update;
 if current_interest.id is null or not storion_private.owns_project(current_interest.project_id) then
   raise exception 'Not authorized' using errcode='42501';
 end if;
 if new_status not in ('Received','Viewed','Action required') or new_status is null then raise exception 'Invalid status'; end if;
 if current_interest.status <> new_status then
   update public.interests set status=new_status where id=target;
   insert into public.activity(interest_id,actor_id,status) values(target,auth.uid(),new_status);
 end if;
end;
$$;
revoke all on function public.set_interest_status(uuid,text) from public, anon;
grant execute on function public.set_interest_status(uuid,text) to authenticated;

create function storion_private.record_interest() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
 insert into public.activity(interest_id,actor_id,status) values(new.id,new.sender_id,'Received');
 return new;
end;
$$;
revoke all on function storion_private.record_interest() from public;
create trigger interest_received after insert on public.interests for each row execute function storion_private.record_interest();

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('project-documents','project-documents',false,10485760,array['application/pdf']);
create policy storion_document_upload on storage.objects for insert to authenticated with check (
 bucket_id='project-documents' and (storage.foldername(name))[1]=auth.uid()::text
 and exists(select 1 from public.projects p where p.id::text=(storage.foldername(name))[2] and p.owner_id=auth.uid()));
create policy storion_document_read on storage.objects for select to authenticated using (
 bucket_id='project-documents' and exists(select 1 from public.documents d where d.storage_path=name and storion_private.can_read_document(d.id)));
create policy storion_document_delete on storage.objects for delete to authenticated using (
 bucket_id='project-documents' and (storage.foldername(name))[1]=auth.uid()::text
 and exists(select 1 from public.projects p where p.id::text=(storage.foldername(name))[2] and p.owner_id=auth.uid()));
commit;
