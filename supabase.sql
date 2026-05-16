-- Supabase schema for AgentFlow
-- Tables: profiles, agents, conversations, messages

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table if not exists public.agents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  type text,
  company text,
  description text,
  product text,
  tone text,
  system_prompt text,
  status text default 'active',
  created_at timestamptz default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references public.conversations(id) on delete cascade,
  agent_id uuid references public.agents(id) on delete cascade,
  role text,
  content text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.agents enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- Policies: owners can insert/select/update/delete their own rows
create policy "profiles_user_is_owner" on public.profiles
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "agents_user_is_owner" on public.agents
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "conversations_user_is_owner" on public.conversations
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "messages_owner" on public.messages
  for all using (exists (select 1 from public.conversations c where c.id = public.messages.conversation_id and c.user_id = auth.uid())) with check (true);

-- Function to create profile on user signup (Supabase trigger)
create or replace function public.handle_new_user()
returns trigger language plpgsql as $$
begin
  insert into public.profiles (user_id, full_name, created_at)
  values (new.id, new.raw_user_meta_data ->> 'full_name', now())
  on conflict (user_id) do nothing;
  return new;
end;
$$;

-- Create trigger on auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
