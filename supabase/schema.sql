-- Leads da Landing Page — Alta Permissão Sistêmica
-- Rodar no SQL Editor do projeto CRM da Missão Consciência

create table if not exists alta_permissao_leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text not null,
  email           text not null,
  lot             smallint not null check (lot in (1, 2, 3)),
  source          text not null default 'alta_permissao_jul_2026',
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_content     text,
  utm_term        text,
  status          text not null default 'checkout_iniciado'
                    check (status in ('checkout_iniciado', 'comprou')),
  purchased_at    timestamptz,
  hotmart_txn_id  text unique,
  created_at      timestamptz default now()
);

-- Indexes
create index if not exists alta_permissao_leads_email_idx  on alta_permissao_leads (lower(email));
create index if not exists alta_permissao_leads_status_idx on alta_permissao_leads (status);
create index if not exists alta_permissao_leads_utm_source_idx on alta_permissao_leads (utm_source);

-- Tabela já existente: adiciona as colunas de UTM sem quebrar leads antigos
alter table alta_permissao_leads
  add column if not exists utm_source text,
  add column if not exists utm_medium text,
  add column if not exists utm_campaign text,
  add column if not exists utm_content text,
  add column if not exists utm_term text;

-- RLS
alter table alta_permissao_leads enable row level security;

-- Visitante pode inserir (captura de lead)
create policy "insert_public" on alta_permissao_leads
  for insert with check (true);

-- Leitura e update apenas com service_role key (webhook + dashboard)

-- ─── Queries úteis ────────────────────────────────────────────
-- Abandonaram o carrinho:
-- select name, phone, email, lot, created_at
-- from alta_permissao_leads
-- where status = 'checkout_iniciado'
-- order by created_at desc;

-- Compradores:
-- select name, phone, email, lot, utm_source, utm_medium, utm_campaign, utm_content, purchased_at
-- from alta_permissao_leads
-- where status = 'comprou'
-- order by purchased_at desc;

-- Compradores por origem:
-- select utm_source, utm_medium, utm_campaign, utm_content, count(*)
-- from alta_permissao_leads
-- where status = 'comprou'
-- group by 1, 2, 3, 4
-- order by count(*) desc;
