# QA de traduções — subfase 2c (Saltério)

> Decisão 49, frente (3) «traduções». Verificação de 2026-10-17 sobre `data/oracoes/salterio-*.json` (21 ficheiros, 3498 blocos: 2529 versículos da grelha + 87 sobrescritos não numerados + cólofon do Sl 71, 214 títulos, 642 orações/Glórias/tropários, 26 rubricas), campos `pt`, `uk`, `ru`, `en`, e sobre os blocos existentes que citam salmos.
> **Os ficheiros de dados não foram editados.** Todas as correções estão em [`fase2c-traducoes-patch.json`](fase2c-traducoes-patch.json): **502 entradas** `{ficheiro,id,campo,de,para,motivo}`, uma por campo de bloco, com o texto final. O `de` foi lido dos ficheiros às 11:45 UTC, **depois** dos commits `c4803d6`/`ff2fed3` (QA 2d) e com as alterações ainda não comitadas que outro agente estava a aplicar (p. ex. «Аллилуия» parcial, ver §4.3); se um campo mudar entretanto, a entrada falha de forma segura. A aplicação sequencial das 502 entradas foi simulada sem erros sobre os ficheiros desse momento; nenhuma cópia «texto idêntico a …» fica dessincronizada.

| Língua | Entradas | Natureza |
|---|---|---|
| UK | 212 | uniformização entre metades (§1.2), sobrescritos, eslavismos, «Іісус», «Чоловіколюбець» |
| PT | 105 | uniformização entre metades (§1.1), dec. 70, fidelidade (§2.1) |
| EN | 99 | 1 fronteira deslocada (2 entradas), 90 divergências de Brenton (dec. 68: 76 de sentido, 11 de modo, 3 sobrescritos), 27,8 «Christ», 108,14 (dec. 70), 3 blocos existentes, 2 apóstrofos |
| RU | 86 | Sl 50 (decisão proposta, §3), «аллилуия» (§4.3) |

Ficheiros tocados fora do Saltério: `comunhao_preparacao.json` (8), `defuntos-panikhida.json` (7, só RU «аллилуия»), `defuntos-litia.json` (2), `defuntos-canone.json` (1), `noite.json` (2), `manha.json` (1).

## 0. Método

Tudo por script (scratchpad `qa2c/`): extração plana dos blocos; normalização do eslavo (sem acentos, ѣ→е, і→и…); **tabelas de frequência** termo eslavo → tradução PT/UK por metade (Sl 1–76 / 77–151) para ~100 termos e nomes; mapas versículo a versículo para os pares problemáticos; deteção de citações de salmos em todos os blocos não-Saltério (substring do eslavo normalizado) e diff palavra a palavra nas 4 línguas; verificação de **deslocação de conteúdo** RU/EN (40 palavras-chave eslavas — nomes, Senhor/Deus, alma, coração, terra, céu, inimigo, mão…: palavra em falta num versículo e presente no vizinho cujo eslavo não a tem) e de **razão de comprimento** (z > 3); maiúsculas dos pronomes divinos comparadas com as do eslavo; varrimentos ortográficos (AO90/PT-BR, latim em cirílico, ы/э/ъ/ё, apóstrofos, acentos RU, «Pause», -or/-ize). Leitura humana: §2.1.

## 1. Consistência entre as duas metades

### 1.1 PT — uma tradução por termo

| Eslavo | Conflito encontrado | Escolha | Porquê | Alterações |
|---|---|---|---|---|
| радоватися / веселитися / веселие / радование | pt-a exultar / alegrar-se / júbilo / regozijo; pt-b alegrar-se / regozijar-se / regozijo / alegria | **pt-a** | Sl 50,10 já publicado (manha-30 e 3 cópias): «alegria e júbilo; exultarão os ossos». | 41 versículos de pt-b + 4,8; **cp121 e Sl 117,24 → «exultemos e alegremo-nos nele»** |
| услыши / внуши | pt-a escuta / dá ouvidos; pt-b ouve / presta ouvidos | **pt-a** | = oficio-123 (Sl 16,6 «escuta as minhas palavras»); 38 vs 18 ocorrências | 14 |
| повеление (πρόσταγμα) | pt-a «decreto» (2,7; 7,7) e pt-b 93,20 vs pt-b «preceito» ×4 | **decreto** | sentido exato; Sl 2,7 consagrado | 80,5; 98,7; 104,10; 148,6 |
| непорочный | pt-a «sem mácula» ×7, «irrepreensível»; pt-b «imaculado» | **imaculado** | Sl 118,1 «os Imaculados» (nome litúrgico do Sl 118) | 8 (pt-a) |
| убогий | pt-a «necessitado»; pt-b «indigente» | **necessitado** | pt-a; = oficio-028 | 10 |
| лесть / льстивый | pt-a «dolo/doloso»; pt-b «engano/enganador» | **dolo** | = oficio-020 (Sl 23,4) | 4 |
| исповедание (subst.) | pt-a «ação de graças» (41,5; sobrescrito 99); pt-b «louvor» ×7 | **louvor** | 103,1 «revestiste-Te de louvor», 148,13 — «ação de graças» não serve | 2 |
| посрамити(ся) | pt-b 118,31/116 «não me envergonhes» | **confundir** | pt-a 13,6; 43,8.10; 73,21 (постыдити = envergonhar) | 2 |
| от века | pt-a 24,6 «desde a eternidade» | **desde sempre** | 6 dos 7 casos | 1 |
| христос (minúscula) | pt-b 83,10; 88,52 «Cristo» | **ungido** | regra de pt-a (17,51) e de uk | 2 |
| очистити (дec. 70) | pt-b «apagar» (77,38; 78,9; 102,3; 108,14) — herdado do antigo Sl 50,3 | **purificar** | dec. 70 | 4 |
| ад | — | «Hades» em todos os 17 casos (dec. 71) ✔ | | 0 |

Verificados sem conflito (PT): милость «misericórdia» (10× «graça» = благодать, correto), правда «justiça», истина «verdade», суд/судьбы «juízo(s)», оправдания «justificações» (34), свидения «testemunhos», заповеди «mandamentos», исповедатися «dar graças» (+ «confessar» com acusativo), языцы «nações» / людие «povo(s)», рог «chifre», Господь сил «Senhor das Potestades» (15), щедроты «compaixões», беззаконие «iniquidade», упование «esperança», Вышний «o Altíssimo», заступник/защититель «protetor/defensor», прибежище «refúgio», десница «destra», мышца «braço», гнев/ярость «ira/furor», в век / в век века, нищий «pobre», кроткий «manso», нomes próprios (dec. 19).

### 1.2 UK — uma tradução por termo

| Eslavo | uk-a (1–76) | uk-b (77–151) | Escolha (fundamento) | Alterações |
|---|---|---|---|---|
| оправдания | постанови ×3 | оправдання ×31 | **оправдання** (acn-054 «оправдань Господніх»; refrão panikhida já alinhado pela QA 2d) | 17,23; 18,9; 49,16 |
| Иосиф | Іосиф ×1 | Йосиф ×4 | **Йосиф** (act-032, nota «forma tradicional») | 76,16 |
| людие (λαός) | люди ×51 | народ ×40 | **люди** (manha-58 = Sl 27,9 «людей Твоїх»; oficio-115 «ми — люди Твої»); народ = языцы | 40 (+ oficio-022 ×2, Sl 115,5/9) |
| в век / во веки | повіки ×38 | навіки ×72 | **навіки** (31 blocos existentes vs 4) | 36 (+ 48,20 «довіку» = до века) |
| услыши / внуши / вонми | почуй / вислухай / зваж | вислухай / вслухайся / прислухайся | **uk-a** (38 vs 23; manha-66 «почуй»; em uk-b «вислухай» colidia com внуши) | 16 + oficio-123 |
| услышати (εἰσακούω) | почути ×19 | вислухати ×9 | **почути** | 9 |
| сонм | сонм ×8 | зібрання ×4 | **сонм** (oficio-137) | 4 |
| лесть | облуда ×17 | підступ ×5 | **облуда** (oficio-020, Sl 23,4) | 4 |
| посрамятся (em par com постыдятся) | зганьбляться | осоромляться | **зганьбляться** | 82,18 (o transitivo «не осором мене» = uk-a 43,8: mantém-se) |
| смирение (ταπείνωσις) | смирення ×4 | приниження ×5 | **приниження** (= PT «humilhação»; adjetivo смиренний mantém-se) | 4 + tropário k13-p-09 |
| ров | рів | яма ×3 | **рів** (cânone kan-141/177/180) | 3 |
| крепость (ἰσχύς) | кріпость ×19 | міць ×5 | **кріпость** (acatistos/cânones) | 5 |
| выну | завжди ×16 | повсякчас ×7 | **завжди** («повсякчас» = присно em 125 blocos) | 7 |
| преогорчити | прогнівити ×3 | огірчити ×9 | **огірчити** (distingue прогневати) | 3 |
| судьбы | присуди ×7 | суди ×28 | **суди** | 7 |
| воззвати | візвати | воззвав ×9 | **візвати** | 6 (regra) |
| Иуда (tribo), Манассия | Іуда, Манассія | Юда, Манасія | **uk-a** (59,9 = 107,9; cp093 «лев від Іуди») | 77,68; 107,9; 79,3 |
| eslavismos | — | «возрадуються», «возвеселиться», «возрадувалися»… | «зрадіти/звеселитися» | 14 |
| «да не когда» | «щоб коли не» ×7 | — | «щоб не» (decalque agramatical; = noite-099) | 7 |

Verificados sem conflito (UK): милість, правда, істина, суд, свідчення, заповіді, исповедатися → «славити» / исповедание → «славлення» (ambas as metades), ад, ріг/рога, народи, Господь сил, Всевишній, щедроти, беззаконня, уповати/надіятися, правиця, рамено, убогий/бідний, лагідний, Алилуя.

### 1.3 Sobrescritos

- PT: «о» = **sobre** (7,1; 37,1; 44,1 tinham «acerca de»); 92,0 «**Para** o dia antes do sábado» (= 91,1); 99,0 «para louvor». Restantes fórmulas coincidem nas duas metades e nos 87 não numerados.
- UK: os sobrescritos numerados de uk-b usavam dativo («псалом Асафові», «Давидові») e os não numerados acrescentados depois, o possessivo de uk-a («Псалом Давидів/Асафів»). Uniformizado no **possessivo** (11: 79, 80, 82, 87, 92, 94, 95, 107, 136, 138, 141); 79,1 «про змінених» → «про тих, що змінилися» (= 68,1); 92,0 «На день передсуботній» (= 91,1).
- EN: 44,1, 68,1, 79,1 «for alternate strains» (interpretação de Brenton) → «concerning them that shall be / have been changed»; 28,0 e 50,2 corrigidos (§2.3).

## 2. Fidelidade ao eslavo (dec. 40)

### 2.1 PT e UK — leitura lado a lado

**330 versículos** lidos com o eslavo: os **110** assinalados com ⚠ pelos tradutores (pt-a §3/§6, pt-b §8, uk-a §8, uk-b §8) e **220 aleatórios** (11 por catisma, semente fixa), mais 10 tropários/orações das catismas. Qualidade alta e literal; sem omissões nem acrescentos fora dos já anotados. Correções:

| Versículo | Problema | Correção |
|---|---|---|
| PT 79,16 | «e (olha) para o filho do homem» — verbo suprido entre parênteses, o eslavo é elíptico | «e sobre o filho do homem» |
| PT 108,24 | «alterou-se por causa do óleo» sugere o contrário de «еле́а ра́ди» (δι' ἔλαιον, «por falta») | «por falta de óleo» |
| PT 131,3–4 | juramento «а́ще вни́ду…» traduzido «se eu entrar…» (frase sem conclusão), quando 94,11 e UK/EN usam a negação | «Não entrarei… não darei sono…» |
| UK 26,3 | «на нього я уповаю» (PT «n'Ele», RU «на Него») | «на Нього» |
| UK 103,30 | «пошлеш духа Твого» (PT «Espírito», uso litúrgico) | «Духа Твого» |
| UK 12,4–5 | «щоб коли не заснув я на смерть» | «щоб не заснув я смертним сном» (= noite-099) |
| PT k02-p-19 | «em Cristo Teu» | «no Teu Cristo» |

Diferenças de leitura PT↔UK mantidas (ambas defensáveis, anotadas pelos tradutores): 15,3 «na Sua terra» / «на землі його»; 54,21 «Sua aliança»; 75,3 «na Paz» / «в мирі»; 108,20 «junto do Senhor» / «від Господа»; 44,11–12 (o eslavo escreve «Твое́/Твоя́» com maiúscula para a «filha»; PT/UK/EN usam minúscula). Leituras literais obscuras (74,7 «das saídas» = do oriente; 77,69; 57,6) ficam como estão.

### 2.2 RU (Yungerov) e EN (Brenton) — alinhamento automático

- Deslocação de conteúdo: 10 sinais → **1 erro real**: EN **67,11/12**, Brenton juntou «ὁ θεός» de 67,11 a 67,12 («The Lord God will give») — fronteira corrigida. Os outros 9 (RU 9,35; 76,3; 83,4; 106,34; EN 43,10; 48,3; 73,8; 83,4; UK 17,8) são divergências de leitura, não deslocações.
- Razão de comprimento: 37 outliers z > 3 revistos; nenhum erro de alinhamento (RU: suplementos de Yungerov entre parênteses, 326 versículos, mantidos como na fonte; EN: paráfrases de Brenton, ver §2.3).

### 2.3 EN — conformidade com a dec. 68

- «Pause»: 0 ✔. Maiúsculas divinas: coerentes com o eslavo (16 sinais revistos; só 27,8 «His anointed» → «His Christ», «Христа́» com maiúscula, como 2,2 e 19,7). Convenção a registar: EN escreve em minúscula os pronomes de **1.ª pessoa de Deus** («my people», «my Son»), PT/UK em maiúscula («Meu», «Мій») — ver D5.
- **Divergências de Brenton não corrigidas no staging**: lidos em EN todos os versículos que pt-a §3 / pt-b §7 listam como divergência eslavo ↔ LXX (≈155); o staging EN tinha corrigido parte (16,14; 36,28; 38,6; 70,15; 76,5…). Corrigem-se mais **90** (76 de sentido, 11 de modo, 3 sobrescritos) (referente, pessoa, palavra plena, acrescento/omissão), por ex.: 62,1 «Idumea» → «Judea»; 58,14; 67,31–32 («Ambassadors» → «Suppliants»); 15,11 «delights» → «beauty»; 38,8; 38,12; 39,9.11; 43,13; 70,21; 72,15; 75,8.10; 76,19 (texto que não corresponde ao eslavo); 80,9 (cláusula de 49,7 acrescentada); 103,17 «sparrows/heron» → «birds/stork»; 9,33.35.37–39; 17,51; 19,2–6 e mais 5 de **modo** (futuro/imperativo eslavo em vez do optativo grego, = PT/UK); 108,14 «blotted out» → «cleansed» (dec. 70). O `motivo` de cada entrada diz que a leitura de Brenton (`de`) deve ir para a `nota` ao aplicar.
- Mantidas (sentido equivalente ou interpretação tradicional): 77,38 «forgive», 78,9 «be merciful», 102,3 «forgiveth» (ἱλάσκομαι; eslavo «очи́стити»), 21,20, 48,3, 73,16, 77,21, 92,4.

### 2.4 RU

Sem acentos (0 U+0301) ✔; sem latim ✔; «ё» em 12 blocos (= uso de 27 blocos existentes). Sl 50: ver §3.

## 3. Blocos existentes que citam salmos

Deteção automática (eslavo de cada versículo procurado em todos os blocos): 30 blocos.

| Bloco(s) | Salmo | Resultado | Decisão |
|---|---|---|---|
| manha-30 = comunhao-kan-085 = oficio-032 = defuntos-panikhida-54; oficio-036/038/099 (+ cópias) | 50,3–21 | PT, UK, EN idênticos ✔. **RU difere** em todos os versículos: blocos = tradução própria do eslavo (dec. 57); Saltério = Yungerov (leituras do grego, «(пролития)», «(но)», gralha «сердце сокрушенного» em 50,19) | **D1** — proposto: o Saltério adota o RU dos blocos (16 versículos no patch), como já se fez em PT/UK/EN e no RU dos Sl 22/23/115 |
| oficio-018 (22), oficio-022 (115) | | idênticos ✔ (PT 115,4/5: «.» vs «:» segue o eslavo de cada fonte) | UK oficio-022 ×2 «народом» → «людьми» (§1.2) |
| oficio-020 | 23,2 | UK «утвердив» vs Saltério «приготував» | **aceite** (eslavo «уготова́лъ») |
| noite-103 | 67,2–3 | PT «Levante-se»; UK «від вогню» | **aceites**: «Levante-Se», «від лиця вогню». RU («рассеются», prece Z1912) e EN («His face», Hapgood) ficam: são a oração, não o salmo |
| cp118 / cp119 / cp120 / cp121 | 67,2–4; 117,24 | PT cp119 «assim eles desapareçam» | **aceite** «assim se desvaneçam»; cp121 PT «exultemos e alegremo-nos» (§1.1); EN cp119/120/121 → Brenton do Saltério (dec. 41: salmos em EN = Brenton). RU (Z1912) mantém-se |
| manha-42 | — («Бо́же силъ») | PT «Deus das potências» | **aceite** «Deus das Potestades» |
| oficio-123 | 16,6 | UK «вислухай» | → «почуй» (= Saltério e §1.2) |
| noite-099 | 12,4–5 | PT alinhado ✔ | Saltério UK alinhado ao bloco (§2.1) |
| defuntos-panikhida-32…42 | 118,12 | já alinhados pela QA 2d (`ff2fed3`) ✔ | — |
| canone-29 = litia-23 = panikhida-20 | 90 | traduções idênticas ✔ | (eslavo «тма/тьма» já anotado na QA 2d) |
| refeicoes-06 | 144,15–16 | forma da oração («Господи», «щедрую») | mantém-se (nota do bloco) ✔ |
| manha-58, oficio-154, noite-111, refeicoes-13, noite-043 | 27,9; 72,28; 30,6; 135,25; 39,14 | alusões em orações, com nota | mantêm-se ✔ |

## 4. Ortografia, registo, maiúsculas

### 4.1 PT
AO90 limpo (0 «acç/ecç/ópt/Egipto/baptis»); 0 formas PT-BR; «Porque…?» ✔; pronomes divinos com maiúscula coerentes com o eslavo (7 casos em que o eslavo tem minúscula e PT maiúscula são referências a Deus). «longânimo» → «longânime» (k08-p-18).

### 4.2 UK
0 latim, 0 ы/э/ъ/ё, apóstrofo ’ em todos os casos ✔. **«Ісус» ×6** (orações das catismas 2, 3, 15, 18–20) → «Іісус» (dec. 30). **«Человіколюб-» ×15** → «Чоловіколюб-» (64 blocos existentes). Eslavismos e «щоб коли не»: §1.2.

### 4.3 RU
**«Аллилуиа»**: o Saltério usa «Аллилуия» nos sobrescritos e «Аллилуиа» nas 60 Glórias. Ao gerar este relatório, outro agente estava a aplicar a D4 da QA 2d com substituição sensível a maiúsculas: ficou «**Аллилуия, аллилуиа, аллилуиа**, слава Тебе, Боже» nas 60 Glórias. O patch completa as três (60 Glórias + 10 blocos de defuntos que são cópias).

### 4.4 EN
en-GB ✔ (Saviour, honour, neighbour; 0 -or/-ize americanos); Thee/Thou ✔; 2 apóstrofos curvos (k01-p-11, k15-p-18) → retos.

## 5. Decisões para o utilizador

| # | Questão | Proposta (já no patch) | Alternativa |
|---|---|---|---|
| D1 | RU do Sl 50 no Saltério ≠ RU de manha-30 (e cópias) | Saltério = texto dos blocos (tradução própria, dec. 57); atualizar `fonte.ru` desses versículos | manter Yungerov e anotar a diferença |
| D2 | PT радоватися/веселитися: «exultar/alegrar-se» (Sl 50) vs «alegrar-se/regozijar-se» (Sl 117,24 = cp121) | «exultar/alegrar-se»; cp121 → «exultemos e alegremo-nos nele» | o inverso: muda o Sl 50 em 4 blocos |
| D3 | UK людие: «люди Твої» vs «народ Твій» | «люди» (40 versículos de uk-b + oficio-022) | «народ» (51 versículos de uk-a + manha-58) |
| D4 | EN: corrigir 90 divergências de Brenton (dec. 68), incl. 11 de modo verbal | corrigir | só as 76 de sentido + 3 sobrescritos |
| D5 | EN: pronomes de 1.ª pessoa de Deus em minúscula («my people»), PT/UK em maiúscula | manter (Brenton) | «My/Me» em maiúscula |

## 6. Fora do âmbito (para as outras frentes)

- acn-046 PT/EN «inferno/hell» para «а́дскую» — exceção à dec. 71 já pendente na QA 2d (D2).
- Glossário (doc. 04 §7) marca «Todo-Poderoso» como [BR] e propõe «Omnipotente»; a app usa «Todo-Poderoso» em 14 blocos e o Saltério em 5.
- «Силы небесныя»: «potências do alto» (k01-p-12, k11-p-11), «Potências celestes» (k14-p-11, noite-098), «Potestades celestes» (oficio-125/135/141) — sem regra.
- Inconsistências entre cópias, anteriores a esta fase: `comunhao_preparacao-cp090/092/094/096/098` (UK) e `oficio-126` ↔ `comunhao_acao_gracas-08` (4 línguas).
