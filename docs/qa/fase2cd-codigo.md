# QA de código — subfases 2c (Saltério) e 2d (acatistos, defuntos)

> Decisão 49, frente (1) «código». Verificação de 2026-10-17 sobre `git diff a268d58..HEAD -- src tools tests build.mjs`:
> navegação por grupos em `src/app.js` (`ecraGrupo`, `abrirGrupo`, `carregarGrupos`, «Voltar», mudança de língua com um
> grupo aberto, foco, ações `sal-*`), `planoSalterio` e modos em `blocosDoPeriodo` (`src/engine/oracoes.js`),
> `tools/gerar-dados.mjs` (`grupos-xx.json`, campos `sl`/`v`/`sob`), testes, CSS em `src/index.html` e os blocos de
> língua offline. **`data/` não foi tocado.** Nada foi enviado para o repositório (sem commit).

## 0. Como se verificou

- `npm test` (todos os testes, incl. 4912 blocos e 2529 versículos do Saltério) e `node build.mjs && node tests/build.test.mjs`:
  verdes antes e depois das correções.
- Playwright (Chromium 141, `dist/` servido por `python3 -m http.server 8765`), ecrã 390×700:
  - tempo de renderização da catisma 17 (Sl 118; 213 blocos, 969 elementos com o eslavo) com
    `Emulation.setCPUThrottlingRate` 4 e 6, e traço (`Tracing`) para separar JS / layout / pintura;
  - cenários de corrida (rede lenta com `page.route`, toques seguidos, mudança de língua a meio), sem rede
    (`setOffline`, `route.abort`), foco do teclado, `localStorage` com valores inválidos, `reducedMotion: 'reduce'`,
    memória (heap depois de GC) ao abrir as 20 catismas, pedidos ao service worker no 2.º arranque.
- Composição dos blocos de língua (bytes por campo; gzip -9 e brotli dos blocos de `dist/`).

## 1. Resumo

| # | Gravidade | Achado | Estado |
|---|---|---|---|
| 1 | Alta | Ao abrir um texto a partir de uma lista deslocada, o ecrã novo desliza (scroll suave) desde a posição antiga | **Corrigido** |
| 2 | Alta | Um `import()` falhado (sem rede) fica em cache na sessão: com rede de novo, o texto continua a não abrir | **Implementado** (2.ª ronda, §5) |
| 3 | Média | Voltar de uma catisma: lista no topo e foco num item fora do ecrã | **Corrigido** |
| 4 | Média | Mudança de língua a meio do carregamento da lista do grupo: lista noutra língua | **Corrigido** |
| 5 | Média | Cada arranque relia da cache os ~2–2,4 MB da língua (39 pedidos ao service worker) | **Corrigido** |
| 6 | Média | Catisma 17: tarefa longa de 150–320 ms com CPU ×4 | **Implementado** (§5) |
| 7 | Média | Tamanho por língua (2,0–2,4 MB): `cu` repetido nas 4 línguas, campos não usados | **Implementado** (análise §3, resultado §5) |
| 8 | Baixa-média | Os textos abertos ficam na memória até fechar a app (mapa de módulos) | **Resolvido** com 2 (§5) |
| 9 | Baixa | «Marcar como lida»: o foco do teclado caía no `<body>` | **Corrigido** |
| 10 | Baixa | `salterio.ultima` inválido no armazenamento → «Continuar» abre `salterio--2` / `salterio-3.5` | **Corrigido** + testes |
| 11 | Baixa | Toques repetidos sem rede empilhavam avisos | **Corrigido** |
| 12 | Baixa | `querySelector('h1').focus()` sem verificação de nulo | **Corrigido** (defensivo) |
| 13 | Baixa | Grupos de botões (`seg`) sem nome acessível; `<label>` não associado | **Implementado** (§5) |
| 14 | Baixa | Sem `localStorage` (Safari privado, quota): «marcada como lida» sem efeito no plano | **Implementado** (§5) |
| 15 | Baixa | `gerar-dados`: qualquer id com «-» cria um grupo; ordem por `Infinity − Infinity` | Proposto |
| 16 | Info | Decisão 60: transições continuam ativas com «reduzir movimento» | Verificado |

## 2. Achados

### 2.1 Corrigidos

**1 — Alta — scroll suave ao trocar de ecrã** — `src/app.js:285`, `:295` (e os mesmos padrões em `:450`, `:466`, `:472`)
- *Cenário:* na lista do Saltério deslocada até à catisma 17 (`scrollTop` 951 px), tocar na catisma. O CSS tem
  `#main { scroll-behavior: smooth }` (`src/index.html:179`), e `$('main').scrollTop = 0` dentro da transição anima o
  scroll: medido 951 → 901 → 819 → 652 → 498 → 341 px em 300 ms. O fade-in mostra o meio do Sl 118 e o texto desliza
  para cima. Com as listas curtas da fase 2b quase não se via; com as listas dos grupos vê-se sempre.
- *Correção:* `topo(y)` = `scrollTo({ top: y, behavior: 'instant' })` (como já fazia o «Voltar») em todas as trocas de
  ecrã. Depois: `scrollTop` 0 logo no 1.º frame. O scroll suave fica só para o scroll do utilizador.

**3 — Média — voltar de uma catisma para uma lista longa** — `src/app.js:291`, `:481`, `:484–488`
- *Cenário:* abrir a catisma 17 a partir da lista deslocada e tocar em «Voltar»: a lista aparecia no topo
  (`scrollTop` 0) e o foco ia para o item 17 com `preventScroll`. O item ficava a 1335 px, fora de um ecrã de 700 px
  (foco invisível para quem usa teclado ou leitor de ecrã com zoom).
- *Correção:* `abrirOracao` guarda a posição da lista (`st.oracao.y`) e o «Voltar» retoma-a; se o item continuar fora
  do ecrã (p. ex. texto aberto pelo «Continuar»), `scrollIntoView({ block: 'nearest' })` antes do foco.
  Depois: lista em 957 px, item 17 visível e com foco.

**4 — Média — corrida de língua na lista do grupo** — `src/app.js:275–287`, `:428`
- *Cenários reproduzidos:*
  (a) tocar em «Saltério» com rede lenta, abrir as Definições e mudar para UK: ao voltar, interface em ucraniano e
  lista em português («Orações antes da leitura do Saltério», «Catisma 1»);
  (b) com o grupo aberto, mudar para UK (bloco lento) e logo para RU: `lang=ru`, título «Псалтирь», mas a lista em
  ucraniano, porque a resposta de UK chegava depois da de RU e escrevia `st.grupos`.
- *Correção:* `carregarGrupos` guarda a língua do pedido e só aplica o resultado se ela ainda for a atual (devolve
  `false` se não for). `abrirGrupo` desiste nesse caso, como já fazia `abrirOracao`, e o tratador da língua não
  renderiza um pedido ultrapassado. Depois: (a) volta à lista de Orações em UK; (b) lista em RU.

**5 — Média — releitura de toda a língua a cada arranque** — `src/app.js:392–401` (`guardarLingua`)
- *Cenário:* `guardadas` só existe em memória. Em cada arranque, a app voltava a pedir os 39 blocos da língua e lia-os
  todos (`blob()`): 2,0–2,4 MB lidos da Cache Storage através do service worker, sem necessidade (bateria, I/O; dec. 23).
  O código já existia, mas o custo cresceu cerca de 4× com o Saltério.
- *Correção:* `caches.match(f)` antes do `fetch`: só se pedem os blocos que faltam (p. ex. depois de uma versão nova).
  Medido no 2.º arranque: **42 → 3 pedidos de blocos**. Offline continua a funcionar (catisma 17 abre sem rede).

**9 — Baixa — foco depois de «Marcar como lida»** — `src/app.js:435–441`
- *Cenário:* o botão com foco era substituído pelo parágrafo de estado e o foco caía no `<body>`. O `role="status"`
  inserido já com texto também nem sempre é anunciado.
- *Correção:* o parágrafo recebe `tabindex="-1"` e o foco, se o botão o tinha (ao receber o foco, o texto é lido).

**10 — Baixa — `localStorage` com valores inválidos** — `src/engine/oracoes.js:34–35`, `tests/oracoes.test.mjs:29`
- *Cenário:* `oh.salterio.ultima` = `-3` → «Continuar» abre `salterio--2`; `2.5` → `salterio-3.5`. Os dois falham com o
  aviso de erro.
- *Correção:* `planoSalterio` só aceita inteiros de 1 a 20; com outro valor, recomeça na 1. Testes para `-3`, `2.5`,
  `21` e `NaN`.

**11 — Baixa — avisos empilhados** — `src/app.js:443–447`
- *Cenário:* vários toques sem rede deixavam um aviso por toque. *Correção:* antes de mostrar um aviso novo, retira-se
  o anterior.

**12 — Baixa — foco num `h1` inexistente** — `src/app.js:286`, `:297`
- *Cenário:* se outro toque (separador, «Voltar») troca o ecrã durante a transição, o ecrã final pode não ter `h1`
  (a lista de Orações não tem). O `TypeError` rejeitava a promessa e o `.catch` mostrava «não foi possível abrir».
  Não se conseguiu tornar visível, porque a renderização seguinte apaga o aviso, mas o erro existe.
- *Correção:* `?.focus(...)`.

### 2.2 Propostos na 1.ª ronda (2, 6, 7, 8, 13 e 14 implementados depois: ver §5)

**2 — Alta — um `import()` falhado não volta a ser tentado** — `src/app.js:276`, `:292`, `:380` (padrão anterior, agora
também nos grupos)
- *Cenário verificado:* sem rede, tocar em «Saltério» → aviso. Com rede de novo, tocar outra vez → **0 pedidos novos**,
  o mesmo erro até reiniciar a app. O Chromium 141 guarda no mapa de módulos o resultado falhado do `import()`. O aviso
  («Ligue-se à internet uma vez…») não chega para resolver. Acontece na janela antes de `guardarLingua` acabar
  (1.ª visita, língua nova) ou se esse pedido falhou.
- *Proposta:* gerar os dados das orações como **ficheiros `.json` com hash no nome** (p. ex.
  `oracoes/salterio-17-pt.3f2a9c.json`), listados em `idiomas.json`, e carregá-los com `fetch()` + `r.json()`. Um
  pedido falhado pode repetir-se. Os dados deixam de ficar presos na memória (achado 8). Para objetos grandes,
  `JSON.parse` é mais rápido do que analisar um literal JS. No `sw.js`, a regra `bloco` (`/c-…\.js$/`) passa a cobrir
  também `oracoes/*.json`. O hash no nome é necessário: a migração de cache no `activate` compara pelo nome.
  Toca em `build.mjs`, `gerar-dados.mjs`, `app.js`, `sw.js` e `tests/build.test.mjs`. Até lá, pode mudar-se o texto de
  `ui.erroCarregar` para pedir que se reabra a app, o que exige tradução nas 4 línguas.

**6 — Média — renderização das catismas longas** — `src/app.js:302–321`
- *Medido* (catisma 17, abrir → frame pintado; o bloco já estava descarregado, por isso mede-se só a renderização):

  | CPU | Língua / eslavo | Até ao DOM | Até ao frame | Elementos |
  |---|---|---|---|---|
  | ×1 | pt / sim | 44–73 ms | 56–86 ms | 969 |
  | ×4 | pt / não | 133–187 ms | 155–234 ms | 584 |
  | ×4 | pt / sim | 157–211 ms | 200–257 ms | 969 |
  | ×4 | uk / sim (izvod) | 195–318 ms | 242–385 ms | 969 |
  | ×6 | uk / sim | 276–509 ms | 360–595 ms | 969 |

  O traço (×4) mostra uma tarefa longa de 217–262 ms: JS ≈ 200 ms (construção do DOM e conversão do eslavo, mais o
  layout forçado pelo scroll), layout ≈ 120–150 ms, pintura ≈ 50–80 ms. Num telemóvel fraco, o INP fica acima de
  200 ms («a melhorar»). A transição em fade esconde parte do atraso, mas não o elimina. Mudar o tamanho do texto com a
  catisma aberta custa 84–183 ms de layout. O resto (memória, nós) é aceitável.
- *Propostas (por ordem):*
  1. `.par { content-visibility: auto; contain-intrinsic-size: auto 7rem; }`. Medido (uk, ×4, 3 execuções): tarefa
     longa **225–262 → 89–113 ms**, layout 135 → 51 ms. **Mas** a retoma da posição depois das Definições (posição em
     píxeis) falha: num teste, o verso 101 voltou como 102, porque as alturas estimadas diferem das reais. Por isso, a
     retoma deve passar a usar o índice do bloco (`data-i` no `.par` e `scrollIntoView` desse bloco) em vez de `y`.
     As duas alterações vão juntas.
  2. Em alternativa, renderização progressiva: os primeiros ~40 blocos de forma síncrona e o resto em lotes
     (`requestIdleCallback`/`setTimeout`). Quando há posição a retomar, renderiza-se tudo. É mais código do que a
     proposta 1.

**7 — Média — tamanho dos blocos de língua (decisões 23 e 45)** — `tools/gerar-dados.mjs:31–41`, `build.mjs:31–37`. Ver §3.

**8 — Baixa-média — memória** — `src/app.js:292`
- Cada texto aberto fica no mapa de módulos até fechar a app. Medido: heap **2,3 → 3,7 MB** (depois de GC) ao abrir as
  20 catismas. Com todas as orações em várias línguas, o heap pode chegar a ~8–10 MB. Não é uma fuga que cresça sem
  limite: tem teto. A proposta 2 resolve-o, porque um `fetch` pode ser libertado.

**13 — Baixa — acessibilidade dos interruptores** — `src/app.js:261–262`, `:330` (`seg`, mesmo padrão nas Definições)
- `role="group"` sem nome acessível. O `<label>` não está ligado a nada: o leitor de ecrã lê «Sim, botão, premido» sem
  dizer a que pergunta responde. *Proposta:* `seg(nome, opcoes, atual, rotulo)` com `'aria-label': rotulo`, ou um `id`
  no rótulo com `aria-labelledby`.

**14 — Baixa — plano sem armazenamento** — `src/app.js:436`
- Se `localStorage` lançar exceção (Safari privado, quota), `gravar` ignora-a, a mensagem diz «marcada como lida» e o
  plano não avança. *Proposta:* guardar `ultima`/`data` também em `st` (como `modoSalterio`) e ler daí em `ecraGrupo`.

**15 — Baixa — `gerar-dados.mjs:29–30`**
- Qualquer id com «-» cria um grupo, e um id futuro como `oracao-x` gera uma lista que nunca se mostra. A ordem dos
  membros sem `ordem` depende de `Infinity − Infinity = NaN`, que o comparador trata como 0. Está correto segundo a
  especificação, mas é frágil. *Proposta:* um teste que confirme que as chaves de `grupos-xx.json` são as de `GRUPOS`
  (`app.js:239`), e `ordem ?? Number.MAX_SAFE_INTEGER` com desempate explícito pelo id.

**Outras notas (sem ação necessária):**
- O ecrã da catisma não indica que o modo «Pelos defuntos» está ativo; só o conteúdo muda. É uma questão de UX
  (sugestão: uma `nota` curta no topo).
- Os sobrescritos em eslavo usam itálico sintético: não há Old Standard TT itálico. O itálico do PT Serif existe.
  Todos os caracteres do eslavo convertido (civil/izvod) e das traduções estão dentro dos `unicode-range` das fontes.
- `blocosDoPeriodo` com modos: semântica correta e testada. Os períodos e os modos partilham o mesmo espaço de nomes,
  por isso um modo nunca se pode chamar como um período.

**16 — Decisão 60 (animações):** com `reducedMotion: 'reduce'`, abrir o grupo, abrir a catisma e voltar fizeram as 4
View Transitions esperadas. A única regra ligada ao «reduzir movimento» é o `scroll-behavior: smooth`
(`index.html:179`), que agora só afeta o scroll feito pelo utilizador.

## 3. Tamanho dos blocos de língua (decisões 23 e 45)

**Composição medida** (JSON gerado, KB; o bloco JS em `dist/` tem o mesmo tamanho):

| Língua | Total | `cu` | Tradução `t` | `id` | `tipo` | `sl` | Saltério | gzip -9 dos blocos | brotli |
|---|---|---|---|---|---|---|---|---|---|
| pt | 2040 | 1069 | 642 | 78 | 64 | 17 | 1215 | 562 | 480 |
| uk | 2381 | 1069 | 981 | 78 | 64 | 17 | 1411 | 565 | 474 |
| ru | 2384 | 1069 | 985 | 78 | 64 | 17 | 1412 | 544 | 448 |
| en | 2062 | 1069 | 663 | 78 | 64 | 17 | 1232 | 566 | 469 |

As 4 línguas somam 8,75 MB em `dist/` (2,2 MB com gzip).

**Avaliação.** Cerca de 85% de cada bloco é texto que não se pode reduzir: o eslavo (1,07 MB) mais a tradução
(0,64–0,98 MB). O GitHub Pages serve com gzip, por isso a transferência é de ~0,55 MB por língua, uma só vez. No
aparelho ficam ~2–2,4 MB, porque a Cache Storage guarda o conteúdo descomprimido. Para um Molitvoslov completo com o
Saltério bilingue, o tamanho é **aceitável** à luz da dec. 23. O desperdício real estava em duas coisas: reler tudo a
cada arranque (achado 5, corrigido) e repetir o `cu` em cada língua guardada.

**Otimizações propostas (por ordem de ganho/custo):**
1. **`cu` num ficheiro partilhado.** `gerar-dados` passa a escrever `{id}-cu.json` (`tituloCu` e um array de `cu`
   alinhado por índice) e `{id}-{l}.json` sem `cu`. O `build.mjs` já sabe marcar blocos partilhados
   (`linguasDe` devolve várias línguas, como em `nomes-cu.json`): basta `-cu.json` → `['pt','uk','ru','en']`.
   `abrirOracao` passa a importar os dois em paralelo (já faz `Promise.all` com `eslavo.js`).
   *Ganho estimado:* 1.ª língua 2040 → ~1925 KB (−5% no aparelho, −12% gzip: 555 → ~490 KB); **cada língua
   adicional −55%** (~−1,1 MB no aparelho, ~−300 KB transferidos); `dist/` 8,75 → ~5,5 MB. Mantém a dec. 45 (núcleo
   na língua escolhida + eslavo).
2. **Tirar campos que a app não usa:** `id` dos blocos (78 KB por língua), `sl` (17 KB), `tipo` por omissão `oracao`
   (até 64 KB), `tituloCu` nos ficheiros de língua. Ganho de ~150 KB (~7%) no aparelho, menor com gzip. *Cuidado:* se
   a pesquisa ou os marcadores das fases seguintes forem usar os ids, mantém-se o `id`.
3. **Compressão:** o GitHub Pages já faz gzip e não serve brotli (ganho possível de ~15%). Guardar comprimido na cache
   (`CompressionStream`) dividiria o espaço por ~4, mas custaria CPU a cada abertura. **Não recomendado.**
4. **Saltério por catisma:** já está dividido em 20 blocos (~50–70 KB cada), e cada um só se carrega quando se abre.
   O que não é preguiçoso é a pré-cache offline (`guardarLingua`). Opções:
   (a) manter — o Saltério é «orações», portanto núcleo da dec. 45 — **recomendado**;
   (b) ordenar `idiomas[l]` para que as orações diárias se descarreguem primeiro e o Saltério no fim (trivial no
   `build.mjs`);
   (c) só pré-guardar o Saltério depois de se abrir o grupo pela 1.ª vez: poupa ~1,2–1,4 MB a quem nunca o lê, mas
   quebra «offline garantido» para quem o abre pela 1.ª vez sem rede. **Pede uma alteração da dec. 45**, e cabe ao
   utilizador decidir.
5. (Baixa) Ao mudar de língua, a anterior fica na cache para sempre: a migração no `activate` copia todos os blocos
   de `idiomas.json`. Com a proposta 1, cada língua extra custa menos de metade, e por isso não se propõe apagar.

## 4. Alterações aplicadas

| Ficheiro | Alteração |
|---|---|
| `src/app.js` | `topo(y)` sem scroll suave em todas as trocas de ecrã; `carregarGrupos` com verificação da língua (devolve `false`); `abrirGrupo` e o tratador da língua respeitam-na; `st.oracao.y` com a posição da lista e retoma ao voltar, mais `scrollIntoView({block:'nearest'})`; `guardarLingua` só pede os blocos que não estão na cache; foco no estado de «Marcar como lida»; um só aviso de erro; `h1?.focus` |
| `src/engine/oracoes.js` | `planoSalterio` ignora valores guardados inválidos |
| `tests/oracoes.test.mjs` | casos `-3`, `2.5`, `21`, `NaN` |

Depois das alterações: `npm test` OK; `node build.mjs && node tests/build.test.mjs` OK (núcleo 126,0 KB; blocos de
língua iguais); cenários Playwright 1, 3, 4, 5, 9, 10, 11 confirmados como corrigidos; mudança normal de língua com um
acatisto aberto, modo «Pelos defuntos» com foco do teclado e retoma da posição depois das Definições sem regressões;
sem erros na consola.

## 5. 2.ª ronda: implementação das propostas 2, 6, 7, 8, 13 e 14

Pedido do coordenador depois do commit 77b3402. A decisão 45 fica igual: toda a língua escolhida, com o Saltério, é
pré-carregada para uso offline. `data/` não foi tocado; nada foi enviado para o repositório.

### 5.1 O que mudou

| Ficheiro | Alteração |
|---|---|
| `tools/gerar-dados.mjs` | Cada oração dá `{id}-cu.json` (`titulo` e o array `cu`, alinhado pela posição; `''` nas rubricas) e `{id}-xx.json` só com a tradução: `id` (mantido), `t`, `tipo` só em rubricas e títulos, `repetir`, `v`, `sob`, `quando`. Saem `cu`, `sl`, `tituloCu` e `tipo: oracao/verso` dos ficheiros de língua. |
| `build.mjs` | Os dados das orações deixam de ser módulos esbuild. São copiados para `dist/d/{id}-{cu\|xx}.{sha256[0:8]}.json`. O mapa id → hashes (`__DADOS__`, 8 hex por ficheiro na ordem cu, pt, uk, ru, en) vai no núcleo (bloco de 2,1 KB). `idiomas.json` põe os ficheiros `-cu` nas 4 línguas e cada tradução só na sua. A versão da cache inclui `dist/d/`. |
| `src/app.js` | `dados(id, l)` com `fetch()` (um pedido falhado repete-se no toque seguinte). `abrirOracao` pede a tradução e, **só com o eslavo ligado**, o `-cu` em paralelo. Ao ligar o eslavo nas Definições com uma oração aberta, `completarEslavo` pede o `-cu` nesse momento (sem rede: fica só a tradução). A lista do grupo não se volta a pedir enquanto a língua for a mesma. `eslavo.js` passa a import estático: no núcleo (~10 KB), um `import()` falhado sem rede deixava o eslavo indisponível até reiniciar. A posição depois das Definições guarda-se como bloco e desvio (`posicaoLeitura`/`retomarLeitura`, com correção em até 3 frames). `campo()` dá aos grupos `seg` o nome do rótulo (`aria-labelledby`). Plano do Saltério também em memória (`st.salterio`); `gravar` devolve `false` e, sem armazenamento, aparece a nota `salterio.semArmazenamento` na lista do Saltério e no estado de «Marcar como lida». |
| `src/sw.js` | A regra de «bloco com nome pelo conteúdo» cobre `d/*.{hash}.json`. Na migração do `activate`, os caminhos comparam-se relativamente ao `scope` (`d/…`), e não só pelo nome final. |
| `src/index.html` | `.par { content-visibility: auto; contain-intrinsic-size: auto 7rem; }` |
| `src/i18n/{pt,uk,ru,en}.js` | `salterio.semArmazenamento` nas 4 línguas |
| `tests/build.test.mjs` | `dist/d/` entra na lista completa de ficheiros. Cada id do índice tem `-cu` e as 4 línguas em `dist/d/`, com hash = conteúdo e conteúdo = ficheiro gerado; o `-cu` está na pré-carga das 4 línguas e cada tradução só na sua; os blocos da tradução e do eslavo são em igual número; os 4 `grupos-xx`; nenhum ficheiro a mais; os hashes estão no núcleo; o eslavo das orações não está no núcleo (além do teste de textos de cada língua). |

### 5.2 Tamanhos (antes → depois)

| | Antes (77b3402) | Depois |
|---|---|---|
| `dist/` total | 9096 KB (gzip 2474) | **5606 KB (gzip 1591)** |
| Núcleo JS + HTML (relatório do build) | 126,0 KB | **118,3 KB** |
| Pré-cache do núcleo | 333 KB (gzip 239) | 333 KB (gzip 240) |
| Pré-carga pt | 2013 KB (gzip 563), 39 ficheiros | 1954 KB (gzip 512), 75 ficheiros |
| Pré-carga uk | 2365 KB (gzip 565) | 2307 KB (gzip 550) |
| Pré-carga ru | 2368 KB (gzip 544) | 2310 KB (gzip 552) |
| Pré-carga en | 2039 KB (gzip 567) | 1981 KB (gzip 514) |
| As 4 línguas juntas | 8754 KB (gzip 2231) | **5265 KB (gzip 1348)** |
| Cada língua a mais (o eslavo já está guardado) | 2013–2368 KB | **869–1225 KB** (gzip 254–294) |

O eslavo partilhado ocupa 1086 KB (gzip 257). A 1.ª língua quase não muda (−3% no aparelho; com gzip, de −9% em pt a +1,5% em ru), como
se previa em §3: o ganho está em cada língua a mais, em `dist/` e na memória.

### 5.3 Verificação

- `npm test`, `node build.mjs` e `node tests/build.test.mjs`: OK.
- **Duas línguas:** em pt, Orações da manhã (51 parágrafos em eslavo), catisma 17 (200) e o acatisto a Jesus (44). A
  seguir, mudança para uk: lista dos acatistos em ucraniano; Orações da noite, Panikhida e catisma 1 em uk, com eslavo
  em izvod. Pedidos: um par `xx` + `cu` por oração; `grupos-xx` uma vez por língua. Sem erros na consola.
- **Eslavo desligado:** a catisma 17 abre sem pedir nenhum `-cu`. Ao ligar o eslavo nas Definições com a catisma
  aberta, o `-cu` é pedido e, ao voltar, aparecem os 200 parágrafos em eslavo.
- **Sem rede e depois com rede** (sem service worker, para forçar a falha): o toque em «Saltério» sem rede dá 1 aviso;
  com rede, o toque seguinte abre a lista. O mesmo com a catisma 5. Antes: 0 pedidos novos e sem abrir até reiniciar.
- **Service worker:** na 1.ª visita, 86 pedidos (73 de `d/`); a cache fica com 98 entradas (núcleo e língua pt). No
  **2.º arranque, 11 pedidos e 0 de `d/`**: só os blocos JS do arranque, servidos pela cache. Offline: catisma 17 e
  Litia abrem, com eslavo.
- **Atualizações:** simularam-se duas versões seguidas em que só `salterio-17-pt` muda. Depois de cada uma há 2 caches
  (a atual e a anterior), cada uma com o seu hash de `salterio-17-pt`. O hash da 1.ª versão desaparece na 2.ª
  atualização, e a catisma 17 continua a abrir. Os ficheiros com hash não se acumulam além da versão anterior.
- **Catisma 17, CPU ×4** (abrir → frame, 4 execuções; agora inclui o `fetch` e o `JSON.parse`):

  | | Antes: até ao DOM | Antes: tarefa longa | Depois: até ao DOM | Depois: tarefa longa |
  |---|---|---|---|---|
  | pt, eslavo ligado | 157–211 ms | 148–194 ms | **93–135 ms** | **55–96 ms** |
  | uk, eslavo ligado | 195–318 ms | 217–262 ms (traço) | 170–221 ms | 104–188 ms (traço: 86–147) |
  | pt, eslavo desligado | 133–187 ms | — | 58–107 ms | ≤ 68 ms |
  | uk, CPU ×6 | 276–509 ms | — | 198–326 ms | 130–263 ms |

  Layout no traço: 121–146 → 29–44 ms. Mudar o tamanho do texto com a catisma aberta: 84–183 → 31–44 ms. Em uk, o
  custo que resta é sobretudo a conversão izvod (JS), não o layout.
- **Memória:** heap depois de GC ao abrir as 20 catismas: 2,3 → 2,7 MB (antes 2,3 → 3,7 MB). Os textos fechados
  libertam-se.
- **Retoma da posição depois das Definições** (catisma 17, com `content-visibility`): em 5 posições (3000, 9000,
  15 000 e 22 000 px, e 12 000 px com o tamanho do texto mudado para «grande» nas Definições), volta sempre ao
  **mesmo versículo** (21, 63, 102, 148, 80), com diferença de 0–1 px dentro do bloco. Sem desvio de um versículo; antes
  da correção, só com o CSS, o 101 voltava como 102.
- **Acessibilidade:** `getByRole('group', { name: 'Leitura' })` e `'Uma catisma por dia'` encontram 1 grupo cada; nas
  Definições, os 4 grupos têm o nome do rótulo.
- **Sem armazenamento** (`setItem` lança exceção): a nota aparece na lista do Saltério; «Marcar como lida» na catisma 3
  mostra o estado com o aviso; ao voltar, «Continuar: catisma 4» (plano em memória).
- **Regressões da 1.ª ronda** (cenários 1, 3, 4, 9, 10, 11, decisão 60): todos OK, e o cenário E2 (repetir depois da
  falha) passa agora a abrir.

### 5.4 O que fica por fazer

- Os blocos de i18n (`src/i18n/xx.js`) e os nomes (`nomes-xx.json`) continuam a ser `import()`. Se a mudança de língua
  falhar sem rede antes de a língua estar guardada, só volta a funcionar depois de reiniciar a app. Fica a língua atual,
  sem erro visível. Isto acontece raramente; a correção é a mesma (JSON com `fetch`), mas para o i18n implica separar o
  texto das funções.
- `gerar-dados.mjs` (achado 15) não foi alterado.
