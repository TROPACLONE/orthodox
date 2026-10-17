# QA fase 3 — fichas dos santos (`data/santos/fichas.json`)

> Verificação (dec. 49) das **128 fichas** (nome, título, vida, festas, resumo ×4, tropário eslavo + 4 traduções). **Os dados não foram editados.** Todas as correções propostas estão em [`fase3-fichas-patch.json`](fase3-fichas-patch.json): **180 entradas** `{ficheiro,id,campo,de,para,motivo,prioridade}`, uma por campo (várias correções no mesmo campo vêm fundidas), geradas a partir dos valores atuais e testadas (aplicam-se todas; depois delas o *lint* eslavo fica limpo, salvo a exceção «Влади́міръ», grafia pré-reforma legítima).
> Prioridade: **A** erro de conteúdo/fidelidade (46), **B** erro de ortografia/terminologia/precisão (30), **C** uniformização ou opcional (104, das quais 95 são só apóstrofos UK).

## 0. Método (por *script*, leitura humana só onde indicado)

| Verificação | Como | Resultado |
|---|---|---|
| Festas × doc. 05 | Datas OS da linha «Memórias» de cada ficha do doc. 05 × `festas` (104 fichas) | 1 erro (Paísio Velitchkovski), 2 omissões menores, 1 data sem memória (§1.1) |
| Festas × `dia.json` / `graus.json` (via `fichas-ligacoes.json`) | Conjuntos de datas por santo | Nenhuma data de `graus.json`/`dia.json` em falta nas fichas. Datas das fichas sem ligação em `dia.json`: sinaxes (30.06, 05.10, 06.07, 30.01…) e 9 casos de ligação/entrada em falta do lado de `dia.json` (§4) |
| Factos dos resumos × doc. 05 | Anos, «aos N anos» e nomes próprios do resumo PT procurados na ficha do doc. 05; leitura integral dos 128 resumos PT e EN | Anos: 0 divergências. 3 erros factuais (2 herdados do doc. 05), 4 resumos com linguagem interna de QA («segundo a fonte»), 3 lendas sem marca (§1.2) |
| 24 santos do Anexo C | Leitura dos resumos; pontos duvidosos conferidos na azbyka | 1 imprecisão (Paísio Athonita, «monge desde 1950») |
| Eslavo: *lint* | `c2/lint.py` (1 acento por polissílabo, monossílabos sem acento, ъ final, і/и, ж/ш+я, caracteres) em `nome.cu` e `tropario.cu` | 22 ocorrências (§2.1) |
| Eslavo: léxico ѣ/е/і | Esqueleto de cada palavra × corpus (orações, Saltério, `dia.json`, 13 032 formas) | 1 erro (жити́й); falsos positivos (мі́рѣ «mundo», Іа́кове vocativo) conferidos |
| Tom e texto × texto atual | 91 páginas `azbyka.ru/days/<data>` (as de `fonte.conferido`) descarregadas; melhor tropário por `difflib` sobre texto normalizado | **91/100 idênticos** (razão ≥ 0,97, mesmo tom). 9 diferentes: 6 variantes documentadas (FONTES §5), Filipe (não documentado), **Marcos e Tiago Zebedeu (tropário errado)** (§2.2) |
| Traduções dos tropários | Leitura integral eslavo + PT + RU + UK + EN dos 100 tropários | 12 problemas de fidelidade/omissão (§2.3) |
| Paridade dos resumos | Números ×4 línguas, estrutura RU↔UK (pontuação), razão de comprimento; leitura PT+EN integral | 3 omissões em RU/UK/EN, 1 nome trocado (Bárbara) (§3) |
| Ortografia/registo | RU sem acentos nem letras antigas ✔; UK sem ы/э/ъ/ё ✔; PT pré-AO, «você/Vós», «inferno»; EN -ize/-or, «you» em tropários | PT AO 1990 ✔, «Tu» ✔ (1 maiúscula), EN en-GB ✔, Thee/Thou ✔ («ye/you/your» só no plural, correto); UK apóstrofo reto ' em vez de ’ (115 ocorrências, 95 campos) |

## 1. Factos e festas

### 1.1 Festas
| id | Problema | Patch |
|---|---|---|
| `paisio-velitchkovski` | **`07-05` (5 de julho) em vez de `05-07`**: o doc. 05 #20 diz «07.05 OS (padres russos do Athos)» = 7 de maio (a ficha de S. Silvano tem bem `05-07`). | A |
| `teofano-recluso` | `01-06` é a data do repouso, mas sem memória litúrgica (Teofania); a memória é 10.01. | B (retirar) |
| `alexandre-de-svir` | Falta 17.07 (2.ª invenção das relíquias, 1998), no doc. 05 e no próprio resumo. | B |
| `jorge-grande-martir` | Falta 10.11 (suplício da roda), no doc. 05. | C (opcional) |

Restantes 124 fichas: datas = doc. 05 (as não incluídas são sinaxes regionais que o doc. 05 só refere sem data). As festas móveis estão em texto PT, como previsto. Nota: «Sábado de S. Demétrio» é memória dos defuntos, não do santo — aceitável como está, porque o texto o diz.

### 1.2 Resumos
| id | Problema | Patch |
|---|---|---|
| `filareto-de-moscovo` | «metropolita de Moscovo desde 1821»: em 1821 foi **arcebispo** de Moscovo; metropolita em 1826 (vida completa na azbyka). O doc. 05 #22 copia o resumo inexato da azbyka. | A ×4 |
| `tikhon-de-zadonsk` | «Aos 37 anos foi eleito bispo de Voronej»: aos 37 (1761) foi sagrado bispo de Kexholm e Ladoga, vigário de Novgorod; Voronej só em 1763 (azbyka, vida completa). Erro herdado do doc. 05 #103. | A ×4 |
| `tiago-de-alfeu`, `nina-da-georgia`, `nicolau-taumaturgo`, `espiridiao-de-trimitunte` | **Linguagem interna de QA no texto do utilizador**: «segundo a fonte», «A Vida usada pela fonte sustenta… (argumento da fonte, não prova documental)», «citados pela fonte» — nas 4 línguas. | A/B ×4 |
| `joao-russo` | PT: «o corpo incorrupto tornou-se fonte de milagres e foi inscrito no calendário» (sujeito errado). | B |
| `marcos-evangelista` | Identificação de Marcos com o jovem de Mc 14,51-52 apresentada como facto. | C ×4 |
| `demetrio-de-tessalonica` | Pai procônsul, nomeação por Galério: pormenores da Vida apresentados como facto. | C ×4 |
| `paisio-athonita` | «Monge desde 1950»: foi para o Athos em 1950; tonsura em 1954 (⚠ conferir antes de aplicar). | C ×4 |

Datas, lugares, títulos e anos de canonização dos outros resumos conferem com o doc. 05 (anos: 0 divergências). Os 24 do Anexo C não têm divergências com a hagiografia corrente (pontos conferidos na azbyka). Lendas estão em geral marcadas («segundo a tradição/a Vida»).

## 2. Tropários

### 2.1 Eslavo (ortografia de armazenamento)
- `demetrio-de-tessalonica`: «низложи́лъ **еси** горды́ню» → «еси́» (corpus: «-лъ еси́» ×380, sem acento ×1). `basilio-bem-aventurado`: «вси́» → «вси» (corpus 199:0).
- `nome.cu`: 17 monossílabos acentuados (Пе́тръ, кня́зь, Ма́ркъ, Ни́лъ, Гре́къ, ца́рь, бра́тъ, Глѣ́бъ) → sem acento; «Паі́сій» ×2 → «Паи́сій»; «Мѵрлікі́йскій» → «Мѵрлѵкі́йскій» (como `dia.json`); «жити́й» → «житі́й»; «Рублёвъ» → «Рубле́въ».
- Corpus inconsistente, não corrigido: ѵ em nomes (Па́ѵелъ, Феѵро́ніею, Параске́ѵо vs «Павел», «Параскев» noutros ficheiros).

### 2.2 Texto e tom × texto atual (azbyka, só verificação)
- **91/100 iguais** ao texto atual, com o mesmo tom (os 50 «Mineia ⚠» incluídos — confirma que foram transcritos da azbyka, como a FONTES §6 admite).
- **`marcos-evangelista` e `tiago-de-zebedeu` — tropário errado.** Usou-se o 2.º tropário do ficheiro Ponomar (`1459.xml`, `872.xml`, `TROPARION Type="2"`, apolítico grego «У верхо́внаго Петра́…», «Апо́столъ Христо́въ былъ еси́ избра́нный…»). O tropário principal (`Type="1"`) — «Апо́столе святы́й и Евангели́сте Ма́рко / Іа́кове, моли́ Ми́лостиваго Бо́га…», tom 3 — é o do texto atual da IOR (dec. 2/62) e o mesmo modelo de Mateus, Filipe, Simão, Matias e Tiago Alfeu. Patch A: substitui cu + 4 traduções.
- `filipe-apostolo`: o texto atual (azbyka) tem «Благоукраша́ется вселе́нная, Ефіо́пія ликовству́етъ», tom 3; a ficha usa o tropário da Mineia/Ponomar «Апо́столе святы́й Фили́ппе», tom 3. É a mesma escolha feita para Mateus, mas **não está na FONTES §5** → decisão/documentação (§5).
- As outras 6 diferenças são as variantes já documentadas na FONTES §5 (Mateus, Espiridião, Jonas, Vladimir, Sabas de Storojevsk, Anastácia). Não há tom errado em nenhum dos 91 que coincidem.

### 2.3 Traduções
| id | Língua | Problema | Patch |
|---|---|---|---|
| `alexandre-nevski` | UK | Omite «Россі́йстѣй» («і державі бути богоугодною») | A |
| `vladimir-igual-apostolos` | UK | Omite «Россі́йскія» («держави твоєї») | A |
| `tatiana` | PT | «onde te lembras também de nós» — o eslavo «помяни́» é imperativo | A |
| `eustracio-e-companheiros` | PT | «Os teus mártires, Senhor» → «Teus» (pronome divino) | B |
| `joao-damasceno`, `sava-da-servia` | PT, EN | «цѣвни́це духо́вная» = «lira espiritual»/«spiritual lyre», não «do Espírito» | B |
| `tres-hierarcas` | EN, UK | «единонра́вніи» traduzido «of one mind»/«однодумні» (= единомысленные) | B |
| `cirilo-e-metodio` | UK | idem «однодумні» | B |
| `fe-esperanca-caridade-e-sofia` | ×4 | Invocação reordenada (eslavo: «Вѣ́ро, Любве́ и Наде́ждо») | C |
| `sergio-de-radonej` | PT | «въ пѣ́ніихъ» = «cânticos», não «salmos» | C |
| `judas-tadeu` | UK | «пре́лесть попра́вша» → «потоптав», não «зневажив» | C |
| `nilo-de-sora` | UK | «в Росії» — os outros tropários UK usam «Русь» | C |
| `catarina-de-alexandria`, `eufrosina-de-polotsk` | UK | «востекла́» → «зійшла до» lê-se como descida; «піднеслася» | C |

Verificado sem problemas: PT «Tu» e maiúsculas divinas (salvo o caso acima), «Soberano», «Amigo dos homens», sem «inferno» nos tropários; RU moderno sem acentos; EN Thee/Thou com pronomes divinos em maiúscula, en-GB; Crisóstomo e Basílio em Hapgood. UK IOU: «Ісус» ×6 (1 tropário + 5 resumos) → «Іісус» e «Юда/Юдо/Юди» → «Іуда…» (dec. 30, como nas orações e em `dia.json`) — patch B/C.

## 3. Paridade das 4 línguas, nomes e títulos
- RU e UK são paralelos (estrutura idêntica em 127/128 resumos). Números iguais nas 4 línguas em todas as fichas (as diferenças são numerais por extenso em EN).
- **Omissões em RU/UK/EN** da última oração do PT: `parasceva-sexta-feira` («muito venerada na Rússia como protetora da família e do trabalho»), `jorge-grande-martir` («padroeiro de Moscovo»), `joao-o-guerreiro` («invocado pelos que sofrem injustiça»). Patch A acrescenta-as; nenhuma das três está no doc. 05 — alternativa: retirá-las do PT (§5).
- `barbara`: PT/doc. 05/azbyka «Maximino (305–311)»; RU/UK/EN «Максимиан/Maximian» → patch A.
- Nomes PT tradicionais (dec. 19) ✔ em todos os nomes e resumos. Títulos: coerentes com os nomes e com o glossário (dec. 20 C5); `basilio-bem-aventurado` tem «Louco por Cristo»/«Fool-for-Christ» onde RU/UK têm «Блаженный, Христа ради юродивый» (Xénia: «Bem-aventurada, louca por Cristo») → patch C.

## 4. Fora de `fichas.json` (não estão no patch)
- **`dia.json`: S. Germano do Alasca a `12-12`**; a azbyka dá 26.12 NS = **13.12 OS** (como a ficha e o doc. 05).
- `fichas-ligacoes.json` sem ligação para entradas que existem em `dia.json`: `trasladacao-reliquias-teodosio-quievopetcher` (14.08), `trasladacao-reliquias-bartolomeu` (25.08), `isabel-feodorovna-reliquias` (28.09), `invencao-reliquias-sabas-storojev` (19.01), `trasladacao-reliquias-moscovsquikh-cipriano-focio-jonas` (27.05), `dormicao-ana` (25.07 → `joaquim-e-ana`), `dedicacao-khram-jorge-em-lide-ideje` (03.11) e `osviachtchenie-khram-jorge-em-quieve-pred` (26.11), `nafanail-lucas-clemente` (22.04).
- Doc. 05: corrigir #22 (Filareto, 1821/1826) e #103 (Tikhon de Zadonsk, 1761/1763).
- Dec. 78 diz «a conferir»; os dados e a FONTES usam `estado: "a confirmar"`.

## 5. Decisões necessárias
1. **Marcos e Tiago Zebedeu**: aceitar a troca para o tropário principal (recomendado; patch A).
2. **Filipe, apóstolo**: manter o tropário da Mineia (como Mateus) e acrescentá-lo à FONTES §5, ou seguir o texto atual («Благоукраша́ется вселе́нная», dec. 62).
3. **Nomes próprios UK**: as fichas usam formas civis (Яків, Йосиф, Олександр, Тетяна, Ілля, Катерина, Володимир), como as orações, e misturam **Алексій/Олексій**; `dia.json` usa as formas eclesiásticas (Іаков, Іосиф, Александр, Алексій, Татіана, Ілія, Єкатерина, Владимир). Escolher uma norma para a app. O patch só aplica «Іісус» e «Іуда» (já decididos na fase 2c).
4. **S. Silvano** — «Mantém o teu espírito no **inferno**» (RU «во аде», EN «hell»): a dec. 71 manda «Hades», mas aqui «ад» tem sentido espiritual (lugar de tormento) e a frase é conhecida assim. Aplicar «Hades» ou abrir exceção.
5. **Acrescentos do PT** (Parasceva, Jorge, João o Guerreiro): acrescentar às outras 3 línguas (patch) ou retirar do PT (não estão no doc. 05).
6. «цѣвни́ца»: PT/EN «lira»/«lyre» e RU/UK «свирель/сопілка» (Demétrio de Rostov, Nina, Damasceno, Sava). Uniformizar (ex. «flauta»/«pipe»)? Em Teodósio das Grutas, «свѣ́тлостію» foi traduzido «pureza/чистотой/purity» nas 4 línguas (literal: «esplendor»).
7. As decisões já pendentes na FONTES (50 tropários «Mineia ⚠» sem fonte PD; Espiridião com o tropário comum) mantêm-se: a conferência confirma que o texto coincide com o atual.

## 6. Reprodução
*Scripts* em `scratchpad/qa3f/`: `common.py` (carregamento, mapa ficha → doc. 05), `festas.py`/`a_dates.py`/`b_dia.py` (festas), `c_lint.py`/`d_lex.py` (eslavo), `e_lang.py` (ortografia e registo), `f_tone.py` (tom e texto × azbyka; páginas em `az/`), `g_par.py`/`j_caps.py` (paridade), `h_facts.py` (factos × doc. 05), `mk_patch.py` (gera o patch). Ponomar: clone local `typiconman/ponomar` (ficheiros `lives/1459.xml`, `872.xml`, `2535.xml`, `1500.xml`).
