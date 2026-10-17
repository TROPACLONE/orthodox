# QA de código — Fase 3 (Santos)

> Decisão 49, frente (1) «código». Verificação de 2026-10-17 sobre `git diff 92cb0f8..HEAD -- src tools tests build.mjs`:
> `santosDoDia` e regras móveis (`src/engine/santos.js`), leituras próprias dos santos e «под зачало» deslocadas
> (`src/engine/leituras.js`), `tools/gerar-dados.mjs` (`santos-xx`, `fichas-xx/cu`, `lecionario-santos.json` compacto,
> ligações), `src/app.js` (lista do dia no Hoje com «Mostrar todos», `ecraFicha` / `abrirFicha` / `carregarFichas` /
> `carregarSantos`, lista de Conhecer, «Voltar» e foco, mudança de língua com uma ficha aberta, rótulo das leituras do
> santo), `src/i18n/*`, CSS em `src/index.html`. **`data/` não foi tocado** (outro agente edita `data/santos/dia.json`).
> Nada foi enviado para o repositório (sem commit).

## 0. Como se verificou

- `npm test` (inclui a referência estrita do calendário oficial 2026: 227 dias, 122 leituras de santos) e
  `node build.mjs && node tests/build.test.mjs`: verdes antes e depois das correções.
- Regras móveis: script independente que, para cada ano civil 2025–2031, percorre todos os dias com `santosDoDia` e compara
  com o cálculo direto das regras (Páscoa juliana + n; dia da semana entre duas datas julianas). Detalhe em §3.
- Playwright (Chromium, `dist/` servido por `python3 -m http.server 8765`, 390×700, `clock.install`), datas 21.01.2026
  (8.01 juliano, 17 comemorações), 22.09.2026 (9.09 juliano: 3 fichas, uma escondida), 19.12.2026, 25.10.2026:
  abrir/fechar fichas pelo teclado a partir do Hoje e de Conhecer (deslocado), «Mostrar todos», foco, sem rede
  (`route.abort` de `santos-*`, `fichas-*`, `fichas-cu`), rede lenta (`route` em espera) com mudança de língua a meio,
  toques seguidos, `reducedMotion: 'reduce'` (contagem de `startViewTransition`), tempos de renderização.
- Tamanhos: `dist/d/santos-*`, `fichas-*` e núcleo, em bruto e gzip -9.

## 1. Resumo

| # | Gravidade | Achado | Estado |
|---|---|---|---|
| 1 | Média | Ficha aberta na língua anterior (eslavo lento + mudança de língua) | **Corrigido** |
| 2 | Média | Lista do dia chega em segundo plano e o foco do teclado cai no `<body>`; pedidos repetidos | **Corrigido** |
| 3 | Média | Arranque à espera de `santos-xx.json` (43–51 KB gzip, mais do que o núcleo) | Proposto |
| 4 | Média | Festas móveis das fichas em português nas 4 línguas (11 fichas) | Proposto (dados/gerador) |
| 5 | Baixa-média | Definições a partir de uma ficha, mudar a língua, voltar: posição da ficha aplicada ao ecrã por baixo | **Corrigido** |
| 6 | Baixa-média | Natividade e Degolação do Precursor, Pedro e Paulo: ficha sem ligação no próprio dia | Proposto |
| 7 | Baixa | «Mostrar menos» num dia sem nada para esconder | **Corrigido** |
| 8 | Baixa | Ficha aberta com o eslavo desligado: ligar o eslavo não o mostrava | **Corrigido** |
| 9 | Baixa | Domingos dos Padres (VI e VII Concílios): leituras rotuladas «Do santo do dia» | **Corrigido** |
| 10 | Baixa | Conhecer: «ordem alfabética» agrupa pelo título (RU/UK: Преподобный…, Святитель…; PT: «S.», depois «Ss.») | Proposto |
| 11 | Baixa | Acessibilidade: grau (ponto colorido) sem texto; botões dos nomes com 22 px de altura | Proposto |
| 12 | Baixa | `abrirFicha` sem ficha correspondente ou sem fichas: toque sem efeito nem aviso | Proposto |
| 13 | Info | Leituras deslocadas `facultativo` mostradas como obrigatórias; ordem santo → «под зачало» | Proposto (conteúdo) |
| 14 | Info | `lecionario-santos.json` no núcleo: necessário e quase mínimo | Verificado |
| 15 | Info | Regras móveis 2026–2030 (Páscoa e dia da semana, incl. 30.06–06.07): todas certas | Verificado |
| 16 | Info | Decisão 60: transições ativas com «reduzir movimento»; desempenho do Hoje e de Conhecer | Verificado |
| 17 | Info | Dados vistos de passagem (não são código) | Para o conteúdo |

## 2. Achados

### 2.1 Corrigidos

**1 — Média — ficha na língua anterior** — `src/app.js:327–333` (`abrirFicha`)
- *Cenário (reproduzido):* abrir e fechar uma ficha (as fichas PT ficam em memória); tocar noutra com `fichas-cu` lento;
  abrir as Definições e mudar para RU; quando o eslavo chega, `carregarFichas()` já tinha devolvido `true` (PT) e
  `pedidoOracao` não mudou: ao voltar, interface em russo e ficha «Ss. Joaquim e Ana» em português.
- *Correção:* `abrirFicha` guarda a língua do pedido e desiste se ela mudou, como `abrirOracao`. Depois: volta ao Hoje em RU,
  sem ficha.

**2 — Média — renderização em segundo plano sem foco; pedidos repetidos** — `src/app.js:164–166`, `:368`, `:500–507`
- *Cenário (reproduzido):* `santos-pt` falha no arranque (a lista fica vazia, bem); com rede de novo, tocar em «Dia seguinte»
  pelo teclado: o clique renderiza e devolve o foco ao botão, mas a lista chega logo a seguir e `render()` reconstrói o
  ecrã: foco no `<body>`. Além disso, cada renderização do Hoje sem lista lançava um pedido novo (duas renderizações seguidas
  → dois pedidos e duas renderizações). Não há ciclo (uma falha não renderiza), confirmado: os pedidos param.
- *Correção:* `renderFundo()` — renderização pedida por um carregamento: o foco volta ao botão equivalente
  (`data-acao` + `data-id`) ou ao `<main>`; usada também pela lista de Conhecer. Um só pedido de santos de cada vez
  (`santosPendentes`). Depois: foco em «Dia seguinte», 1 pedido por renderização sem rede.

**5 — Baixa-média — posição de leitura depois de mudar a língua** — `src/app.js:629`, `:639`
- *Cenário (reproduzido):* ficha aberta a partir do Hoje, deslocada 318 px; Definições; EN; «Voltar». A língua fecha a
  ficha (`st.ficha = null`, como as orações), mas `antesDefinicoes` não sabia da ficha e `retomarLeitura` aplicava a posição
  da ficha ao Hoje: ecrã em 193 px, a meio do jejum.
- *Correção:* `antesDefinicoes` guarda também `ficha`, e só se retoma a posição se for o mesmo ecrã. Depois: Hoje no topo,
  foco no botão das Definições.

**7 — Baixa — «Mostrar menos» sem nada para esconder** — `src/app.js:157–163`
- *Cenário:* «Mostrar todos» num dia com muitas comemorações e depois «Dia seguinte» (`st.todosSantos` mantém-se) para
  19.12.2026 (só S. Nicolau): aparecia «Mostrar menos» com `aria-expanded="true"` sem efeito.
- *Correção:* o botão só existe se houver comemorações escondidas na vista curta (`poucos`).

**8 — Baixa — eslavo ligado com uma ficha aberta** — `src/app.js:398–401` (`completarEslavo`)
- *Cenário:* «Mostrar o eslavo» desligado, ficha aberta, ligar o eslavo nas Definições e voltar: a ficha continuava sem
  nome nem tropário eslavos (só a oração aberta era completada).
- *Correção:* `completarEslavo` pede `fichas-cu` para a ficha aberta (sem rede, fica sem eslavo). Depois: 2 parágrafos `.slav`.

**9 — Baixa — rótulo das leituras dos Domingos dos Padres** — `src/app.js:220`
- *Cenário:* 25.10.2026: as leituras de `dom_padres_vii_concilio` (e `dom_padres_seis_concilios`) apareciam como «Do santo
  do dia»: o id é o do domingo semimóvel e não está em `santos-xx.n`.
- *Correção:* `T.semimovel[e.id]` antes do rótulo genérico. Depois: «Padres do VII Concílio Ecuménico». (O 3.º id sem
  nome, `pon-220101`, é de dados: §17.)

### 2.2 Propostos

**3 — Média — arranque à espera da lista anual de santos** — `src/app.js:512–521` (`mudarLingua`), `:543`
- `mudarLingua` espera por `import(i18n)` **e** `dados('santos', l)` antes da 1.ª renderização. `santos-xx.json` tem
  159–242 KB (43–51 KB gzip) — mais do que o próprio núcleo (38 KB gzip) — para mostrar ~10 nomes. Com o service worker é
  rápido (cache), mas na 1.ª visita e em cada mudança de língua não guardada fica no caminho crítico; numa rede que
  «pendura» (sem erro), o ecrã de arranque não sai (o `import()` do i18n tem o mesmo risco, mas é ~5 KB).
- *Proposta:* (a) não esperar pelos santos no arranque: o Hoje já sabe renderizar sem eles e pedir a lista (agora com
  `renderFundo`, sem perder o foco) — custo: os nomes aparecem um instante depois; ou (b) dividir por trimestre/mês
  (`santos-xx-MM`), com o mês atual no arranque; ou (c) `Promise.race` com um prazo (p. ex. 1,5 s) e seguir sem a lista.

**4 — Média — festas móveis das fichas sem tradução** — `tools/gerar-dados.mjs:80` (`fe: x.festas`), `src/app.js:351`
- 11 fichas têm em `festas` texto livre em português (p. ex. «2.º domingo da Grande Quaresma», «Domingo de S. Tomé (2.º
  domingo da Páscoa)», «domingo mais próximo de 25.01 (OS)»), copiado igual para `fichas-en/ru/uk`: a ficha de S. Gregório
  Palamas em russo mostra «Дни памяти: …; 2.º domingo da Grande Quaresma».
- *Proposta:* nos dados, festas móveis como regra (`{ "pascoa": -35 }`, `{ "movel": "dom_tome" }`) ou ids já traduzidos em
  `T.movel`/`T.semimovel`; o gerador/app resolve-as. Sem isso, o gerador pode pelo menos omitir as entradas não «MM-DD»
  fora de PT (perde informação: decisão de conteúdo). Nota: «mais próximo de 25.01» não é a regra de `dia.json` nem a
  do Concílio de 2000 («em ou depois de 25.01»).

**6 — Baixa-média — fichas das grandes festas de santos sem ligação no próprio dia** — `src/app.js:148`, `:157`
- `santos-xx` traz `['Natividade de S. João Batista', 'G', 'joao-batista']` (06-24), Pedro e Paulo (06-29) e Degolação
  (08-29), mas o Hoje filtra «G» (a festa já vem do motor como `.festa-principal`, texto simples): nesses dias não há
  caminho para a ficha (só por Conhecer).
- *Proposta:* se houver um «G» com ficha, a `.festa-principal` passa a botão `data-acao="ficha"` (com CSS que mantenha o
  cinábrio). O «Voltar» já encontra `[data-acao="ficha"][data-id=…]` fora de `.menu`.

**10 — Baixa — ordem de Conhecer** — `src/app.js:373`
- `localeCompare` sobre o nome completo: em RU/UK a lista fica agrupada pelo título (36 «Преподобный…», 28 «Святитель…»,
  12 «Апостол…»); em PT, 111 «S. …», depois 13 «Ss. …» e as «Sinaxe». O custo é desprezável (0,1 ms para 128 nomes;
  V8 guarda o colador).
- *Proposta:* chave de ordenação por língua no gerador (nome sem o título, ou campo `ord` nos dados).

**11 — Baixa — acessibilidade da lista do dia** — `src/index.html:89–91`
- O grau do Typikon é só um ponto colorido (`::before`), sem equivalente para leitores de ecrã. Sugestão: texto
  visualmente escondido («vigília», «polieleo»…) ou `title`/`aria-describedby`.
- `.santo` tem 22,4 px de altura (a app usa 44 px nos outros botões). Passa o mínimo WCAG 2.5.8 pela exceção do
  espaçamento (passo de 28 px), mas é apertado ao toque; sugere-se `padding: 4px 0` / `min-height: 32px`.
- «Mostrar todos»: `aria-expanded` correto e o foco fica no botão (verificado); os itens novos ficam acima do botão.
  Opcional: `aria-controls` para a lista.

**12 — Baixa — toque sem efeito** — `src/app.js:332`
- Se `st.fichas[id]` não existir, `abrirFicha` sai em silêncio. Hoje todas as 126 ligações apontam para fichas
  existentes (verificado nas 4 línguas); sugere-se um teste no build (`santos-xx` → `fichas-xx`) em vez de código defensivo.
- Conhecer sem rede: aviso `role="status"` correto; repete-se ao tocar de novo no separador (verificado). Sem indicador
  de carregamento (com rede é instantâneo do cache).

**13 — Info — leituras deslocadas** — `src/engine/leituras.js:39–40`, `:148`; `src/app.js:222`
- `juntaDeslocadas` marca `facultativo: true` (só 1 de 6 casos no OF26), mas o ecrã não o distingue: aparece como «Do dia
  («под зачало»)» igual às obrigatórias. E fica depois do grupo do santo (o «под зачало» lê-se com as do dia, antes do
  santo). Decisão de conteúdo: rótulo «(facultativo)» e trocar a ordem das duas chamadas.

### 2.3 Verificado

**14 — `lecionario-santos.json` no núcleo** — `tools/gerar-dados.mjs:47–52`, `src/engine/leituras.js:10`
- Necessário no núcleo: `leituras()` é síncrona, as leituras são independentes da língua e o Hoje tem de as mostrar
  offline em qualquer língua; levá-lo para `santos-xx` duplicava-o 4× e obrigava a um motor assíncrono.
- Tamanho: 33,2 KB em bruto, **4,9 KB gzip** (núcleo: 151,9 KB). Sem nomes nem fontes (só `id, grau, ap, ev, vt,
  matinas_ev`). Sobras pequenas, não usadas pelo motor nem pela app: `meio` (24 perícopes) e `vt[].sv` (51, sempre
  «vesperas»), ~1,1 KB em bruto; `grau` só é lido para `polieleo`/`vigilia` (~1,7 KB). Ganho < 0,4 KB gzip: não se mexeu.

**15 — Regras móveis** — `src/engine/santos.js:8`
- 7 comemorações móveis vão para a lista (as outras 10 são do motor e o gerador retira-as). Para 2025–2031, cada uma
  cai exatamente uma vez por ano e no dia do cálculo independente (0 diferenças). 2026–2030:

| Regra | 2026 | 2027 | 2028 | 2029 | 2030 |
|---|---|---|---|---|---|
| P+27 Novos Mártires de Butovo (sábado) | 09.05 | 29.05 | 13.05 | 05.05 | 25.05 |
| P+63 Santos do Athos | 14.06 | 04.07 | 18.06 | 10.06 | 30.06 |
| P+70 Bielorrússia, Novgorod, Pskov | 21.06 | 11.07 | 25.06 | 17.06 | 07.07 |
| domingo 30.06–06.07 OS (Tver; atravessa o fim do mês) | 19.07 | 18.07 | 16.07 | 15.07 | 14.07 |
| domingo 19.08–25.08 OS (Moscovo) | 06.09 | 05.09 | 03.09 | 02.09 | 01.09 |

- `o` é relativo à Páscoa do ano **juliano** do dia e `md` é a data juliana, como as regras pedem. A comparação de
  cadeias «MM-DD» funciona entre meses; não suportaria um intervalo que atravesse o fim do ano — `tests/santos.test.mjs`
  já exige `de <= ate`. `domingo-depois-natal` («se não houver domingo, a 26.12») não cabe na regra, mas é do motor.

**16 — Decisão 60 e desempenho**
- Com `reducedMotion: 'reduce'`: abrir ficha, «Voltar» e separador → 3 `startViewTransition` (animações ativas).
- Hoje com 17 comemorações expandidas: renderização ≤ 2 ms; `santosDoDia` (17 regras + ordenação) desprezável;
  `leituras()` com santos e deslocadas: 0,036 ms/dia (5 anos). Conhecer (128 itens): renderização ~1 ms.
- «Voltar» de uma ficha: do Hoje, foco no nome e posição retomada (120 px); de Conhecer deslocado (3000 px), foco no item,
  visível. Ficha sem `fichas-cu`: abre sem eslavo. Sem `fichas-pt`: um só aviso por toques repetidos. Dois toques seguidos:
  abre só a última; toque e separador: não abre.

**17 — Dados vistos de passagem (para a frente «conteúdo»; `data/` não foi tocado)**
- `data/lecionario/santos.json` 06-08 `pon-220101`: `cu` em inglês («Translation of the relics of Вмч. Феодора
  Стратилата») e sem `ponomar_id` correspondente em `dia.json` → rótulo genérico nas leituras.
- Nomes PT ainda transliterados na lista do dia na 1.ª passagem (p. ex. «JJ. Bogootets…», «Obretenie e Prenessenie…»);
  numa 2.ª corrida já vinham traduzidos (o outro agente está a editar `dia.json`).

## 3. Alterações aplicadas

Só `src/app.js` (+27/−10 linhas). Testes e build verdes depois (`npm test`; `node build.mjs && node tests/build.test.mjs`;
núcleo 151,4 → 151,9 KB). Cenários Playwright de 1, 2, 5, 7, 8, 9 repetidos com o resultado esperado.

| # | Onde | O quê |
|---|---|---|
| 1 | `abrirFicha` | desiste se a língua mudou durante o pedido |
| 2 | `renderFundo`, `santosPendentes` | foco mantido nas renderizações em segundo plano; um pedido de santos de cada vez |
| 5 | `antesDefinicoes` | guarda `ficha`; só retoma a posição no mesmo ecrã |
| 7 | `ecraHoje` | «Mostrar todos/menos» só com comemorações escondidas |
| 8 | `completarEslavo` | completa o eslavo da ficha aberta |
| 9 | `blocoLeituras` | rótulo `T.semimovel[id]` para os domingos dos Padres |
