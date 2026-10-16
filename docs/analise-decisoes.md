# Análise de coerência das decisões 1–39

> **Estado:** todas as propostas P1–P7 foram **aceites** pelo utilizador em 2026-10-16 (decisões 40–46).

Revisão crítica de [decisoes.md](decisoes.md) com um único critério: **coerência e fidelidade do produto final**. A maioria das decisões é coerente entre si. Abaixo estão apenas os pontos onde há **conflito, lacuna ou risco**, com a alteração proposta (P).

---

## P1 — Texto-fonte das traduções bíblicas: eslavo, não grego (altera dec. 17) — *importante*

**Problema.** A dec. 17 traduz o AT a partir da LXX grega (edição Swete) e o NT do texto patriarcal de 1904, cotejando depois com o eslavo. Mas:
- a app mostra **eslavo + tradução lado a lado** (dec. 5, 29). Se a tradução vier do grego, as duas colunas divergem em vários versículos (acrescentos, ordem, numeração), e o leitor vê, lado a lado, dois textos que não dizem o mesmo;
- as **perícopes do lecionário russo** (zachala, início e fim de cada leitura) estão definidas sobre o texto eslavo; traduzir do grego obriga a reajustar fronteiras;
- a edição de Swete reproduz essencialmente **um único manuscrito** (Códice Vaticano) — é uma edição académica, não o texto eclesiástico;
- a referência litúrgica do projeto é a **prática na Rússia** (dec. 2), onde se lê a Bíblia isabelina — que já segue o cânone e a numeração da LXX (dec. 18).

**Proposta.** Texto-fonte das traduções próprias = **Bíblia eslava isabelina** (o texto efetivamente lido); a **LXX grega e o texto patriarcal ficam como controlo** (para esclarecer passos obscuros do eslavo), com divergências relevantes em nota. Ganha-se alinhamento exato versículo a versículo e perícope a perícope, nas 4 línguas.

## P2 — Bíblia e orações em RU, UK e EN: lacuna (completa dec. 28, 29, 36, 37)

**Problema.** As decisões fixam a Bíblia apenas para PT e as orações para PT, RU e UK. Falta: Bíblia em RU/UK/EN e orações em EN. As fontes de domínio público disponíveis (doc. 09) não são equivalentes:
- RU: **Sinodal 1876** (domínio público) — NT fiável; mas o **AT é traduzido do hebraico massorético**, o que contraria a dec. 18; o **Saltério de Yungerov** (LXX, † 1921, domínio público) cobre os Salmos;
- UK: **Kulish–Puliui** é do hebraico e de origem protestante — contraria a dec. 18; a do Ohiyenko está protegida até 2042;
- EN: **Brenton** (LXX, domínio público) para o AT; **Hapgood** 1906/1922 (traduzido dos livros eslavos russos, com aval do Patriarca Tikhon) para orações e ofícios, mas com Salmos do *Book of Common Prayer* (numeração hebraica).

**Proposta — um único princípio para as 4 línguas** (o mesmo que já escolheste para o russo na dec. 36):
> Usa-se uma **tradução humana de domínio público** quando existir e **seguir o texto da LXX/eslavo**; caso contrário, **tradução própria a partir do eslavo** (P1).

| Língua | Orações | Saltério | AT (leituras) | NT |
|---|---|---|---|---|
| PT | própria | própria | própria | própria |
| RU | Zaionchkovsky (dec. 36) | Yungerov | Yungerov onde existir; senão própria | Sinodal 1876 |
| UK | própria (dec. 37) | própria | própria | própria |
| EN | Hapgood adaptado (Salmos substituídos por Brenton, numeração LXX) | Brenton | Brenton | própria do eslavo (o NT da KJV segue o *Textus Receptus*, não o texto bizantino eclesiástico) |

## P3 — Rótulo honesto da camada «paroquial» do jejum (precisa dec. 6 / A0)

**Problema.** O calendário oficial da IOR **não publica graus de alimentação** (doc. 02). A camada «paroquial» vem do azbyka.ru — fonte muito usada, mas **não oficial**. Chamar-lhe «prática da Igreja» seria impreciso.

**Proposta.** Rotular na app: **«Calendário paroquial (segundo Azbuka Very)»** e **«Typikon»**, com uma nota curta a explicar que a Igreja não publica uma tabela oficial de alimentos e que a medida pessoal cabe ao pai espiritual.

## P4 — Lista diária de santos: fonte juridicamente segura (precisa dec. 8 e 10)

**Problema.** Os nomes dos milhares de santos comemorados diariamente teriam de vir de uma base existente (calendar.rop.ru, azbyka). Na UE, as bases de dados têm **direito *sui generis*** (Diretiva 96/9/CE): extrair uma parte substancial é ilícito, mesmo que cada facto seja livre. Além disso, a maioria desses santos menores **não tem forma portuguesa ou inglesa estabelecida**.

**Proposta.**
- Construir a lista a partir do **Mesiatseslov sinodal pré-1917** (domínio público) e acrescentar as canonizações posteriores a partir dos **atos oficiais do Santo Sínodo e dos Concílios** (documentos oficiais), usando o calendar.rop.ru apenas para verificar por amostragem;
- nomes dos santos menores em PT/EN: **regras fixas de transcrição** (do glossário) + nome eslavo ao lado; RU/UK diretamente do Menaion.

## P5 — Estado de revisão de cada tradução (reforça dec. 7, 24, 28)

**Problema.** Tudo o que for «tradução própria» é feito por mim. Posso ser rigoroso e verificar sistematicamente (glossário, cotejo, testes automáticos de terminologia), mas **uma tradução litúrgica só é fiável depois de revista por falantes nativos competentes** — sobretudo em RU e UK.

**Proposta.** Cada texto traduzido leva um **estado visível**: «tradução não oficial — não revista» → «revista por falante nativo» → «revista por clérigo». Sugiro (se tiveres essa possibilidade) pedir revisão a alguém da tua paróquia para RU/UK.

## P6 — Offline vs. imagens, biblioteca e 4 línguas (concilia dec. 15, 23, 26, 28)

**Problema.** «Totalmente offline» + «mínimo de recursos» entra em conflito com 4 línguas completas, imagens de ícones e livros externos.

**Proposta.**
- **Offline garantido:** núcleo (calendário, jejum, orações, leituras) na **língua escolhida + eslavo**;
- outras línguas: descarregadas **quando escolhidas** (requer internet uma vez);
- imagens: comprimidas (AVIF/WebP), guardadas em cache **na primeira visualização**;
- biblioteca: ligações externas (exige internet) — exceto os textos que traduzirmos.

## P7 — Ordem de produção (operacionaliza dec. 28)

**Problema.** Escrever e traduzir em paralelo leva a versões divergentes entre línguas.

**Proposta.** Para cada módulo: conteúdo PT-PT **fechado e verificado** → só então traduzido para UK/RU/EN, a partir de uma única fonte de dados com identificadores comuns. Entrega por fases: 1) calendário + jejum + leituras; 2) orações; 3) santos; 4) catequese, história, ícones, biblioteca. Interface sempre nas 4 línguas.

---

## Decisões verificadas sem alterações

Coerentes entre si: 1, 2, 4, 6 (com P3), 9–16, 18–27, 30–35, 38, 39.
Nota sobre a dec. 30/38: a versão ucraniana mantém o **calendário e a prática da IOR** (dec. 2), com terminologia da IOU — coerente, mas a app deve dizê-lo explicitamente na versão UK, para não sugerir que reproduz o calendário próprio da IOU.
