# Decisões do projeto

Registo das decisões tomadas pelo utilizador. Em caso de dúvida, pergunta-se sempre — nada se assume.

| # | Data | Tema | Decisão |
|---|------|------|---------|
| 1 | 2026-10-16 | Funcionalidades | Calendário e jejuns; orações; leituras do dia; catequese/doutrina. |
| 2 | 2026-10-16 | Calendário | Juliano (estilo antigo), segundo a prática da Igreja Ortodoxa Russa **na Rússia**; datas civis (gregorianas) como equivalência. |
| 3 | 2026-10-16 | Língua da app | ~~Integralmente em português europeu (PT-PT).~~ **Substituída pela decisão 28.** |
| 4 | 2026-10-16 | Língua da base de conhecimento | PT-PT principal; inglês admitido em citações e passagens técnicas. |
| 5 | 2026-10-16 | Textos litúrgicos | Português + eslavo eclesiástico lado a lado. **Alargada pela decisão 29.** |
| 6 | 2026-10-16 | Jejum | Mostrar **ambos, lado a lado**: por defeito a regra do calendário paroquial russo, com a norma do Typikon assinalada quando difere. Indulgências pessoais nunca são calculadas (cabem ao pai espiritual). |
| 7 | 2026-10-16 | Traduções PT | **Traduções próprias** a partir do eslavo/grego, assinaladas como «tradução não oficial». Não se usam os textos com direitos reservados da paróquia de Cascais. |
| 8 | 2026-10-16 | Dados diários | **Cálculo próprio** (calendário, Páscoa, tons, leituras por algoritmo) + base de santos curada pelo projeto. Sem dependência de API externa nem de dados GPL. |
| 9 | 2026-10-16 | Pesquisa | Fazer 2.ª ronda dirigida para resolver os pontos `⚠ PARA CONFIRMAR` factuais. |
| 10 | 2026-10-16 | Santos | Só os principais (~100; **alargado a 128 pela decisão 33**), com critério de seleção documentado; os restantes apenas pelo nome no calendário. |
| 11 | 2026-10-16 | Biblioteca | Livros gratuitos e legais em português, inglês, russo e outras línguas (grego, eslavo), com estado de direitos de autor verificado. |
| 12 | 2026-10-16 | Temas adicionais | Ícones e templo; história da Igreja; Padres e espiritualidade; música e peregrinações. |
| 13 | 2026-10-16 | Paróquia do utilizador | Paróquia dos Novos Mártires e Confessores da Igreja Russa no Porto (Capela de São José, porto.cerkov.ru). **Só referência** na base de conhecimento (Ortodoxia em Portugal); sem destaque na app; a referência litúrgica continua a ser a prática na Rússia. |
| 14 | 2026-10-16 | Símbolo | Cruz ortodoxa russa de **oito pontas** (восьмиконечный крест): travessa do título, travessa principal, supedâneo inclinado; **só silhueta**, sem corpo nem inscrições. |
| 15 | 2026-10-16 | Imagens | Usar com moderação, apenas quando relevantes. **Ambas** as fontes: ícones históricos de domínio público (fonte e licença verificadas, p. ex. Wikimedia Commons) para santos e festas; ilustrações próprias em SVG para diagramas (templo, iconóstase, vestes). As ilustrações próprias nunca imitam ícones. |
| 16 | 2026-10-16 | Navegação | Menu extremamente intuitivo; conteúdo rigorosamente organizado; hierarquia de navegação simples e de fácil compreensão. |
| 17 | 2026-10-16 | Texto bíblico | Critério do utilizador: **máxima precisão e fidelidade**. Decisão técnica: **tradução própria para PT-PT a partir do grego** — AT da Septuaginta (edição de domínio público, p. ex. Swete 1909 — licença a verificar), NT do texto patriarcal de Constantinopla (1904) — **cotejada com a Bíblia eslava isabelina** (o texto efetivamente lido na prática russa, mostrado lado a lado pela decisão 5). Divergências eslavo↔grego assinaladas em nota. Assinalada como «tradução não oficial». Prioridade: os textos usados na app (leituras do dia, Saltério). A Bíblia de Figueiredo (Vulgata) serve apenas de referência auxiliar, nunca de texto-base. |
| 18 | 2026-10-16 | Livros bíblicos | Cânone, nomes e numeração **da LXX / Bíblia eslava**: 1–4 Reinos, Paralipómenos, 2–3 Esdras, 3 Macabeus, etc.; Salmos com numeração LXX (hebraica entre parênteses). |
| 19 | 2026-10-16 | Nomes próprios | **Forma portuguesa tradicional** (Elias, Isaías, João Batista, Pantaleão, Antão…). |
| 20 | 2026-10-16 | Pendentes A–E | **Aceites todas as recomendações** de [pendentes.md](pendentes.md) (A0–A6, B1–B10, C1–C6, D1–D11). |
| 21 | 2026-10-16 | Ortografia | **Acordo Ortográfico de 1990** (norma oficial em Portugal): «Batista», «ação», etc. |
| 22 | 2026-10-16 | Pesquisa | 2.ª ronda também nos documentos 05–08. |
| 23 | 2026-10-16 | Desempenho | Extremamente otimizada: mínimo de recursos (tamanho, memória, bateria), resposta imediata, eficiente. |
| 24 | 2026-10-16 | Qualidade do código | Execução de excelência; verificações periódicas de bugs, race conditions, erros e fugas de memória (testes automáticos em CI a cada push + revisões de código em cada etapa). |
| 25 | 2026-10-16 | Interface | **Só tema escuro (preto)**, sem modo claro. Bonita, trabalhada, com estética cristã ortodoxa; legível e clara — a intuitividade nunca é sacrificada pela estética. |
| 26 | 2026-10-16 | Base técnica | **Igual ao EE Calc:** web app instalável (PWA), JavaScript sem framework, esbuild, GitHub Pages, testes em GitHub Actions, funcionamento totalmente offline (cálculo local). |
| 27 | 2026-10-16 | Aparelhos | iPhone, iPad, Android e computador (layout responsivo; testes nos quatro). |
| 28 | 2026-10-16 | Línguas da app | **4 línguas: português europeu (PT-PT), ucraniano, russo e inglês.** Âmbito: **tudo** é traduzido (interface, calendário, jejuns, orações, leituras, santos, catequese, história, ícones). PT-PT é a língua-fonte do conteúdo editorial. |
| 29 | 2026-10-16 | Textos litúrgicos (multilíngue) | **Eslavo eclesiástico + língua escolhida**, lado a lado, nas 4 línguas (em RU: eslavo + tradução russa livre de direitos ou própria). Fontes e licenças verificadas por língua. |
| 30 | 2026-10-16 | Terminologia ucraniana | Uso da **Igreja Ortodoxa Ucraniana (IOU)** — tradição ligada historicamente ao Patriarcado de Moscovo, calendário juliano. |
| 31 | 2026-10-16 | Língua por defeito | **Detetar a língua do aparelho** (se for uma das 4); caso contrário **PT-PT**. Alterável nas definições. |
| 32 | 2026-10-16 | Vestes e objetos litúrgicos | **Forma grega aportuguesada** (esticário, epitraquélio, felónio, orário, epimaniquia…), com o termo eslavo entre parênteses e explicação no glossário. |
| 33 | 2026-10-16 | Santos (número) | **128 santos** (critérios A + B + lista editorial C completa). |
| 34 | 2026-10-16 | Paróquia do Porto — morada | **Rua Alexandre Herculano, 97, 4000-054 Porto** (confirmado pelo utilizador; coincide com o Vicariato). |
| 35 | 2026-10-16 | Paróquia do Porto — capela | A Capela de São José é a **capela das antigas «Oficinas de São José»** (confirmado pelo utilizador). |
