# PRD: Landing Page — Treinamento Alta Permissão Sistêmica

## Introdução

Landing page de vendas para o workshop ao vivo **Alta Permissão Sistêmica** (10 de julho, online), com sistema de lotes automático, captura de leads via formulário modal, redirecionamento para checkout na Hotmart e integração webhook para rastrear quem comprou vs. quem não comprou — viabilizando campanhas de reengajamento segmentadas.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React + Vite |
| Estilização | Tailwind CSS |
| Componentes UI | Shadcn/UI |
| Ícones | Lucide React |
| Animações | Framer Motion |
| Deploy | Vercel |
| Fonte | Google Fonts — Encode Sans Condensed |
| Backend (leads) | Supabase (tabela `leads`) |
| Checkout | Hotmart (URLs por lote — a inserir depois) |
| Webhook receiver | Vercel API Route (`/api/webhook-hotmart`) |

---

## Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `cream` | `#ECD7B8` | Texto principal, destaques de copy |
| `dark` | `#202020` | Background base |
| `red` | `#E90000` | Acentos pontuais (escassez, lote) |
| `lime` | `#D1FF03` | Botões CTA, destaques de conversão |

---

## Sistema de Lotes

| Lote | Preço | Período | Virada (meia-noite) |
|---|---|---|---|
| 1º Lote | R$ 97 | 22 a 28 de Junho | 29/06 às 00:00 |
| 2º Lote | R$ 197 | 29 de Junho a 05 de Julho | 06/07 às 00:00 |
| 3º Lote | R$ 297 | A partir de 06 de Julho | — |

A lógica de lote é calculada no **client-side com base na data atual** (sem dependência de servidor), garantindo funcionamento após deploy sem manutenção.

---

## Objetivos

- Converter visitante em comprador ou lead capturado em uma única sessão
- Sistema de lotes automático que opera sem intervenção manual após o deploy
- Captura de nome, telefone e e-mail antes do redirecionamento para o checkout
- Design de alta percepção de valor (elegância > pressão)
- Performance mobile-first

---

## User Stories

### US-001: Setup do projeto
**Descrição:** Como desenvolvedor, preciso do projeto configurado com todas as dependências para iniciar a implementação.

**Acceptance Criteria:**
- [ ] Vite + React inicializado
- [ ] Tailwind CSS configurado com as cores custom (cream, dark, red, lime)
- [ ] Encode Sans Condensed importada do Google Fonts como fonte padrão
- [ ] Shadcn/UI inicializado (componentes: Button, Dialog, Input, Form)
- [ ] Framer Motion instalado
- [ ] Lucide React instalado
- [ ] Supabase client instalado e configurado via `.env`
- [ ] Vercel `vercel.json` criado com config base
- [ ] `README.md` com instruções de setup e variáveis de ambiente necessárias

---

### US-002: Lógica de lote automático
**Descrição:** Como visitante, quero ver o preço correto e a urgência do lote atual, sem que a proprietária precise atualizar a página manualmente.

**Acceptance Criteria:**
- [ ] Hook `useLot()` retorna: `{ lotNumber, price, endDate, hotmartUrl, label }`
- [ ] Lote calculado com base em `new Date()` comparado às datas fixas dos lotes
- [ ] Após a data de virada (00:00:00 do dia seguinte), o lote avança automaticamente
- [ ] No 3º lote, não há data de virada — exibe o preço final sem countdown
- [ ] Hook é o único lugar onde as datas e preços ficam definidos (single source of truth)
- [ ] Typecheck passa

---

### US-003: Countdown de virada de lote
**Descrição:** Como visitante, quero ver quanto tempo resta para o lote atual encerrar, criando urgência real.

**Acceptance Criteria:**
- [ ] Componente `LotCountdown` exibe: dias, horas, minutos, segundos
- [ ] Atualiza a cada segundo via `setInterval`
- [ ] Quando o countdown chega a zero, atualiza o lote automaticamente (sem reload da página)
- [ ] No 3º lote, o componente não é exibido
- [ ] Texto: "Faltam X dias, HH:MM:SS para o próximo lote"
- [ ] Estilização: destaque em vermelho (`#E90000`) para o número
- [ ] Typecheck passa

---

### US-004: Header dinâmico com lote atual
**Descrição:** Como visitante, quero ver imediatamente no topo qual lote está ativo e o preço, sem descer a página.

**Acceptance Criteria:**
- [ ] Sticky header com: logo, lote atual ("1º LOTE", "2º LOTE", "3º LOTE"), preço atual e botão CTA
- [ ] Preço e label do lote vêm do hook `useLot()`
- [ ] Ao virar o lote, o header atualiza sem reload
- [ ] Header some quando o usuário está no topo (acima do hero) e aparece após scroll de 200px
- [ ] Animação de entrada suave via Framer Motion
- [ ] Verify em browser usando skill verify
- [ ] Typecheck passa

---

### US-005: Seção Hero
**Descrição:** Como visitante, quero entender imediatamente o que é o evento e sentir a urgência de comprar agora.

**Acceptance Criteria:**
- [ ] Tag "AO VIVO | 10 DE JULHO | ÀS 09H" visível no topo
- [ ] Headline principal com hierarquia tipográfica clara (Encode Sans Condensed, bold, grande)
- [ ] Placeholder de vídeo (div estilizada com ícone play) — URL a inserir depois
- [ ] Sub-promessa abaixo do vídeo
- [ ] CTA principal: botão lime com texto "Quero garantir meu ingresso" → abre modal de captura (US-006)
- [ ] Preço do lote atual + indicadores "Online e Ao Vivo" e "Garantia de 7 dias" (ícones Lucide)
- [ ] Animação de entrada via Framer Motion (fade-in + slide-up escalonado por elemento)
- [ ] Verify em browser usando skill verify
- [ ] Typecheck passa

---

### US-006: Modal de captura de leads
**Descrição:** Como visitante que quer comprar, preciso preencher meus dados antes de ir para o checkout, e como proprietária preciso capturar esses contatos.

**Acceptance Criteria:**
- [ ] Modal abre ao clicar em qualquer botão CTA da página
- [ ] Campos: Nome completo (required), Telefone com máscara BR (required), E-mail (required, validação formato)
- [ ] Validação client-side com feedback inline nos campos
- [ ] Ao submeter: salva lead no Supabase (tabela `leads`) → redireciona para URL Hotmart do lote atual
- [ ] Se Supabase falhar: exibe erro discreto, mas ainda redireciona para o Hotmart (não bloqueia a venda)
- [ ] Loading state no botão durante a requisição
- [ ] Máscara de telefone: `(99) 9 9999-9999`
- [ ] Modal fecha ao clicar fora ou no X
- [ ] Verify em browser usando skill verify
- [ ] Typecheck passa

---

### US-007: Blocos de copy — Narrativa principal
**Descrição:** Como visitante, quero ler uma narrativa coerente e progressiva que me faça entender meu problema e ver a solução, sem repetição.

**Blocos na ordem:**

1. **"Existem aprendizados que apenas informam"** → Problema: o elástico que puxa de volta
2. **"A verdade é que o comportamento humano..."** → Mecanismo: padrões nos bastidores
3. **"Alta Permissão Sistêmica"** → Solução: modelo de compreensão com visual destacado (card cream em fundo dark)
4. **"Neste dia, você aprenderá"** → Lista de entregas — dividida em 2 grupos: pessoal + profissional
5. **"E aqui está o detalhe mais importante"** → Revelação de identidade (não tem nada de errado com você)
6. **"Se você deseja..."** → Qualificação em 2 colunas: para si mesma / para quem trabalha com pessoas

**Acceptance Criteria:**
- [ ] Copy revisada para eliminar repetições (ver seção "Ajustes de copy" abaixo)
- [ ] Cada bloco tem animação de entrada via Framer Motion (fade-in ao entrar na viewport — `whileInView`)
- [ ] Card "Alta Permissão Sistêmica" usa background `#ECD7B8`, texto `#202020`
- [ ] Slot de imagem (`<img />` com `src` placeholder) nas seções que pedem imagem
- [ ] Typecheck passa

---

### US-008: Programação do evento
**Descrição:** Como visitante, quero ver o que vai acontecer durante o dia para avaliar se vale meu tempo.

**Acceptance Criteria:**
- [ ] Timeline vertical com 3 marcadores: 10:00, 12:30, 16:00
- [ ] Cada marcador tem horário (destaque lime ou cream) + descrição do bloco
- [ ] Layout clean, com linha vertical conectando os pontos
- [ ] Badge "Conteúdo 100% online ao vivo e com replay"
- [ ] CTA ao final do bloco → abre modal de captura
- [ ] Typecheck passa

---

### US-009: Tabela de preços e lotes
**Descrição:** Como visitante, quero ver todos os lotes de uma vez para entender que o preço sobe e agir agora.

**Acceptance Criteria:**
- [ ] 3 cards de lote exibidos simultaneamente
- [ ] Lote atual tem destaque visual (borda lime, badge "LOTE ATUAL")
- [ ] Lotes anteriores aparecem riscados e em opacidade reduzida
- [ ] Lotes futuros aparecem em estado neutro (sem destaque)
- [ ] Cada card tem: número do lote, preço, período de vigência
- [ ] CTA no card ativo → abre modal de captura
- [ ] Countdown integrado neste bloco também
- [ ] Typecheck passa

---

### US-010: Seção da mentora
**Descrição:** Como visitante, quero saber quem vai me ensinar e por que devo confiar nela.

**Acceptance Criteria:**
- [ ] Foto com `src` placeholder (a enviar depois)
- [ ] Nome: Talita Lopes
- [ ] Título: "Fundadora da Escola Missão Consciência® e especialista em Mentalidade de Alta Permissão"
- [ ] Bio: "Com mais de 10 anos de experiência terapêutica, já soma mais de 150 mil mulheres impactadas..."
- [ ] Layout: foto à esquerda + texto à direita (desktop) / foto acima + texto abaixo (mobile)
- [ ] Verify em browser usando skill verify
- [ ] Typecheck passa

---

### US-011: Garantia e FAQ
**Descrição:** Como visitante hesitante, quero ver que não tenho risco e ter minhas dúvidas respondidas.

**Acceptance Criteria:**
- [ ] Bloco de garantia: badge de 7 dias + texto da política de reembolso
- [ ] FAQ com accordion (Shadcn/UI `Accordion`) — conteúdo placeholder com 5 perguntas genéricas até copy chegar
- [ ] Perguntas placeholder: "Tem replay?", "Precisa ter experiência prévia?", "Como funciona a garantia?", "É ao vivo ou gravado?", "Posso parcelar?"
- [ ] Typecheck passa

---

### US-012: Supabase — Tabela de leads
**Descrição:** Como proprietária, preciso que os dados dos leads sejam armazenados de forma organizada, com status de compra rastreável para segmentar campanhas de reengajamento.

**Schema da tabela `leads`:**

```sql
create table leads (
  id              uuid primary key default gen_random_uuid(),
  name            text not null,
  phone           text not null,
  email           text not null,
  lot             smallint not null,          -- 1, 2 ou 3
  purchased       boolean not null default false,
  purchased_at    timestamptz,
  hotmart_txn_id  text,                       -- ID da transação Hotmart
  created_at      timestamptz default now()
);
```

**Acceptance Criteria:**
- [ ] Script SQL da tabela `leads` criado conforme schema acima
- [ ] RLS habilitado: `insert` público (anon key), `select/update` apenas com service role key
- [ ] Index em `email` para lookup rápido no webhook
- [ ] Variáveis de ambiente documentadas:
  - `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` — usadas no frontend
  - `SUPABASE_SERVICE_ROLE_KEY` — usada apenas na API Route do webhook (nunca exposta ao cliente)
- [ ] Typecheck passa

---

### US-013: Webhook Hotmart — Rastrear compradores
**Descrição:** Como proprietária, preciso que toda compra registrada na Hotmart atualize automaticamente o status do lead no Supabase, para que eu saiba quem comprou e quem não comprou.

**Fluxo:**
```
Hotmart dispara POST → /api/webhook-hotmart
  → Valida assinatura Hotmart (header hottok)
  → Extrai email do comprador do payload
  → Busca lead pelo email na tabela leads
  → Atualiza: purchased = true, purchased_at = now(), hotmart_txn_id = id da transação
  → Retorna 200 OK
```

**Acceptance Criteria:**
- [ ] Vercel API Route criada em `/api/webhook-hotmart.ts`
- [ ] Validação do header `hottok` (secret configurado no painel Hotmart + variável `HOTMART_WEBHOOK_SECRET`)
- [ ] Se validação falhar: retorna 401, sem processar
- [ ] Extrai `buyer.email` e `purchase.transaction` do payload Hotmart
- [ ] Busca lead por `email` (case-insensitive) — se não encontrar, registra no log mas retorna 200 (compra sem lead prévia é válida)
- [ ] Atualiza `purchased`, `purchased_at` e `hotmart_txn_id` com service role key
- [ ] Endpoint idempotente: se mesmo `hotmart_txn_id` chegar duas vezes, não duplica
- [ ] Log de erros para debugging (sem expor dados sensíveis)
- [ ] Variável de ambiente: `HOTMART_WEBHOOK_SECRET`
- [ ] Typecheck passa

---

### US-014: Segmentação de não-compradores
**Descrição:** Como proprietária, preciso conseguir exportar facilmente a lista de quem captou o lead mas não comprou, para usar em campanhas de reengajamento.

**Acceptance Criteria:**
- [ ] Query SQL documentada no README:
  ```sql
  -- Leads que não compraram (reengajamento)
  select name, phone, email, lot, created_at
  from leads
  where purchased = false
  order by created_at desc;
  ```
- [ ] Query equivalente para compradores documentada
- [ ] README explica como exportar via dashboard Supabase (Table Editor → Export CSV)
- [ ] Typecheck passa (n/a — só documentação)

---

## Ajustes de Copy (a aplicar na implementação)

A copy original tem redundância entre os blocos "Neste dia, você aprenderá" e "E aqui está o detalhe mais importante" — ambos entregam a mesma promessa de consciência expandida com palavras diferentes.

**Proposta de reorganização narrativa:**

| Posição | Bloco | Função narrativa |
|---|---|---|
| 1 | Existem aprendizados... | **Empatia** — reconhece o leitor |
| 2 | A verdade é... | **Diagnóstico** — nomeia o problema real |
| 3 | Alta Permissão Sistêmica | **Mecanismo** — apresenta a solução |
| 4 | Neste dia você aprenderá | **Prova de entrega** — o que leva para casa |
| 5 | Se você trabalha com pessoas | **Expansão de público** — amplia sem fragmentar |
| 6 | E aqui está o detalhe | **Virada emocional** — o que muda de verdade |
| 7 | Programação + CTA | **Prova de estrutura** + conversão |

O bloco 6 ("E aqui está o detalhe") deve ser reescrito como momento de pico emocional — a promessa mais profunda, não uma repetição das entregas. Será refinado na implementação.

---

## Requisitos Funcionais

- FR-1: Lote calculado client-side com base em `new Date()` — sem requisição de rede
- FR-2: Countdown atualiza a cada segundo, vira o lote automaticamente ao chegar em zero
- FR-3: Header sticky com preço dinâmico aparece após 200px de scroll
- FR-4: Modal de captura abre em qualquer CTA da página
- FR-5: Formulário valida campos antes de enviar; não bloqueia o Hotmart se Supabase falhar
- FR-6: Animações de entrada via Framer Motion `whileInView` com `once: true`
- FR-7: Fonte Encode Sans Condensed carregada via Google Fonts com `display=swap`
- FR-8: Layout responsivo mobile-first; breakpoints: `sm` (640px), `md` (768px), `lg` (1024px)
- FR-9: Vercel API Route `/api/webhook-hotmart` recebe POST da Hotmart, valida `hottok` e atualiza `purchased` no Supabase via service role key
- FR-10: Webhook é idempotente — mesma transação Hotmart processada duas vezes não duplica atualização
- FR-11: Frontend usa apenas `anon key` do Supabase — `service role key` fica exclusivamente na API Route

---

## Non-Goals (fora do escopo desta entrega)

- Área de membros ou acesso ao conteúdo do workshop
- Integração direta com Hotmart via API (apenas redirecionamento de URL)
- Autenticação de usuários
- Painel administrativo para visualizar leads (acesso direto no dashboard Supabase)
- Pixel de rastreamento (Meta/Google) — a inserir em fase posterior
- Depoimentos / prova social — copy e imagens a enviar depois
- Bloco de FAQ com copy real — a enviar depois

---

## Considerações Técnicas

- URLs Hotmart por lote ficam no hook `useLot()` com placeholder `#` até serem enviadas
- Foto da mentora: `<img src="/images/talita.jpg" />` — arquivo a inserir na pasta `public/`
- Foto do bloco "Alta Permissão Sistêmica": `<img src="/images/workshop.jpg" />` — idem
- Slot de vídeo: `<div>` estilizada com thumbnail placeholder + ícone play (Lucide `Play`)
- O campo `lot` na tabela Supabase registra qual lote estava ativo no momento da captura

---

## Métricas de Sucesso

- Countdown funciona corretamente e vira o lote automaticamente nas datas definidas
- Lead capturado com sucesso no Supabase antes do redirecionamento para o Hotmart
- Página carrega em menos de 3s no mobile (Lighthouse Performance > 80)
- Zero erros de TypeScript na build
- Layout fiel ao mock em mobile e adaptado para desktop

---

## Questões em Aberto

- [ ] URLs Hotmart por lote (a enviar)
- [ ] Foto da mentora Talita Lopes (a enviar)
- [ ] Foto para o bloco "Alta Permissão Sistêmica" (a enviar)
- [ ] Copy do FAQ (a enviar)
- [ ] Blocos adicionais de copy mencionados como "faltando" (a enviar)
- [ ] URL do vídeo para o player do hero (a enviar)
- [ ] Pixels de rastreamento — Meta Pixel ID e/ou Google Analytics (fase 2)
- [ ] `HOTMART_WEBHOOK_SECRET` — copiar do painel Hotmart após configurar o webhook lá
- [ ] Estratégia de reengajamento para não-compradores: e-mail manual via export CSV, automação via ferramenta externa (ActiveCampaign, etc.), ou construir envio automático? (decisão para fase 2)
