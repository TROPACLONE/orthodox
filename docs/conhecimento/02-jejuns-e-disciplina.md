# 02 — Jejuns e disciplina do calendário (Igreja Ortodoxa Russa, Patriarcado de Moscovo)

> Especificação de conhecimento para o motor diário de «nível de jejum». Referência: calendário juliano tal como praticado na Igreja Ortodoxa Russa (ROC/РПЦ).
> Língua: português europeu. Os termos originais estão em russo/eslavo eclesiástico (cirílico + transliteração) e, quando relevante, em grego. Podem manter-se citações em inglês quando a tradução perderia precisão.
> Todas as afirmações factuais remetem para a lista numerada de referências no fim do documento. Os pontos não verificados ou em conflito estão marcados com **⚠ PARA CONFIRMAR:**.

---

## 0. Convenções obrigatórias para quem implementa

### 0.1 Três camadas normativas (devem ser sempre modeladas separadamente)

| Camada | Código | O que é | Fonte principal |
|---|---|---|---|
| (a) Norma do Typikon / monástica | `TYPIKON` | Regra escrita do *Типикон* (Typikon, «Устав»), cap. 32, 33, 35, 48, 49, 51. Foi redigida sobretudo para monges; o próprio texto distingue por vezes «монаси» (monges) de «мирстии/миряне» (leigos) [1][2][15]. | [1]–[9] |
| (b) Prática paroquial russa corrente | `PARISH` | O que os calendários e guias da ROC publicam para leigos (azbyka.ru, pravmir.ru, foma.ru). Usam normalmente quatro graus: «сухоядение», «горячая без масла», «горячая с маслом», «рыба» [17][18]. | [16]–[19] |
| (c) Indulgências pessoais | `ECONOMY` | Atenuações por doença, gravidez, amamentação, viagem, vida em instituições; **decididas pelo pai espiritual (духовник, *dukhovnik*)**, não pela aplicação [10][16][32]. | [10], [16], [22], [32] |

Regra de produto: a app apresenta (a) e (b) como informação; (c) nunca é calculada automaticamente — no máximo, permite ao utilizador registar uma bênção pessoal recebida («по благословению духовника», *po blagosloveniyu dukhovnika*) [10][16].

### 0.2 Datas
- Todas as datas fixas do Typikon estão em estilo antigo (ст. ст., OS). Entre 1900 e 2099, NS = OS + 13 dias (cálculo do calendário, não fonte litúrgica). Exemplos confirmados pelas fontes: Jejum da Natividade 15 nov.–24 dez. OS = 28 nov.–6 jan. NS [14]; Pedro e Paulo 29 jun. OS = 12 jul. NS [13].
- Datas móveis expressas como deslocamento em dias em relação à Páscoa (P). Ver §3.1.

### 0.3 Vocabulário-base do Typikon (para parsing de textos)

| Termo (CS) | Translit. | Significado operativo |
|---|---|---|
| сухоядение | sukhoyadenie | «comer seco»: alimento vegetal não cozinhado; no cap. 35 equipara-se a «хлеб и воду, и сим подобная» (pão, água e semelhantes) [3] |
| варение без елеа | varenie bez elea | comida cozinhada sem azeite [2] |
| варение со елеем | varenie so eleem | comida cozinhada com azeite [2][5] |
| елей | elei | azeite / óleo vegetal [2] |
| вино | vino | vinho (de uva); medido em «чаши» (taças) [3] |
| рыба | ryba | peixe [2] |
| икра | ikra | ovas de peixe [8] |
| сыр и яица | syr i yaitsa | lacticínios («queijo») e ovos [2] |
| мясо | myaso | carne (só para leigos; os monges nunca a comem) [1][2] |
| единою днем / в 9-й час | edinoyu dnem / v 9-i chas | uma só refeição por dia, depois da hora nona (~15h) [2][3] |
| дважды днем | dvazhdy dnem | duas refeições por dia [2] |
| отнюд ясти не подобает | otnyud yasti ne podobaet | não se come de todo [1] |
| разрешение на вся | razreshenie na vsya | «dispensa para tudo», sem jejum [1][16] |
| славословие / полиелей / бдение | slavoslovie / polielei / bdenie | graus de festa do santo (grande doxologia / polieleo / vigília), que determinam as atenuações [2][13] |

---

## 1. Níveis de jejum (enumeração para o motor)

### 1.1 Tabela de níveis

| Nível | Código | Termo RU (translit.) | Definição | Fonte |
|---|---|---|---|---|
| 0 | `NO_FOOD` | полное воздержание от пищи (polnoe vozderzhanie ot pishchi) / «отнюд ясти не подобает» | Abstinência total durante o dia. Typikon: segunda e terça da 1.ª semana da Quaresma; Sexta-feira Santa. | [1][8] |
| 1 | `BREAD_WATER` | хлеб и вода (khleb i voda) | Pão e água (e sal). Prescrito no Typikon como concessão a doentes/idosos na Sexta-feira Santa «по захождении солнца»; o Typikon atonita citado no Triódio prescreve-o para ter–qui da 1.ª semana. | [8] |
| 2 | `XEROPHAGY` | сухоядение (sukhoyadenie) | Alimentos vegetais sem cozedura e sem azeite; pão, água; a Triódio menciona «сок с медом» (bebida com mel). Calendários paroquiais: «вода, хлеб, фрукты, овощи, компоты». | [3][8][17] |
| 3 | `HOT_NO_OIL` | горячая пища без масла (goryachaya pishcha bez masla) = варение без елеа | Comida vegetal cozinhada, sem óleo. | [2][17] |
| 4 | `HOT_OIL` | пища с растительным маслом (pishcha s rastitelnym maslom) = варение со елеем | Comida vegetal cozinhada com óleo vegetal; normalmente com vinho no Typikon. | [1][2][17] |
| 5 | `ROE` | разрешается икра (razreshaetsya ikra) | Nível 4 + ovas de peixe. Só no Sábado de Lázaro. | [8][16] |
| 6 | `FISH` | разрешается рыба (razreshaetsya ryba) | Nível 4 + peixe. | [1][2][16] |
| 7 | `DAIRY_EGGS` | сыр и яйца (syr i yaitsa) | Tudo menos carne (Semana do Queijo/Масленица). | [2][8] |
| 8 | `ALL` | разрешение на вся / поста нет | Sem restrição alimentar (para leigos inclui carne). | [1][2] |

Atributos ortogonais a guardar por dia (o Typikon fixa-os à parte do nível):
- `wine: bool` — «вино» é concedido separadamente do azeite (p. ex. Sexta-feira Santa com Anunciação: «на вино точию») [2].
- `meals: 1|2` e `after: "9th_hour" | "vespers" | "liturgy"` [1][2][3].
- `monastic_note` — o Typikon diferencia: nas semanas contínuas «монаси на сыр и яица, мирстии же на мясо» [2].

✔ Confirmado (2.ª ronda): não há contradição textual. O cap. 35 diz «сухоядение ясти подобает, хлеб и воду, **и сим подобная**» [3] — pão e água são o núcleo, e «coisas semelhantes» (alimentos vegetais não cozinhados, mel, frutos) cabem no mesmo grau, como no cap. 32 e no Triódio («ядим сухоядение: пием и сок с медом») [1][8]. «Хлеб и вода» aparece no Typikon apenas como **concessão nomeada** (Sexta-feira Santa para doentes/idosos; pão e kvass na 1.ª terça) [1][8]. Modelo: manter o nível 1 (`BREAD_WATER`) só para essas concessões e o nível 2 para o sukhoyadenie comum.

### 1.2 Categorias de alimentos

| Categoria | Posição das fontes | Camada |
|---|---|---|
| Carne | Proibida em todos os dias de jejum; para monges nunca permitida; para leigos permitida nas semanas contínuas, Natividade/Teofania em qua/sex, etc. | (a) [1][2] |
| Lacticínios, ovos («скоромное», *skoromnoe*) | Toda a comida de origem animal (carne, leite, ovos) é proibida nos dias de jejum. | (a)(b) [16] |
| Peixe | Categoria intermédia; o Typikon explica a proibição no dia da Degolação porque os peixes «têm sangue» e «são criaturas animais». Pe. Job Gumerov chama-lhe «alimento semi-quaresmal» (полупостная пища). | (a) [7]; (b) [20] |
| Ovas (икра) | Permitidas como concessão própria no Sábado de Lázaro (3 onças por irmão). | (a) [8]; (b) [16] |
| Mariscos / invertebrados (кальмары, креветки, мидии) | **Divergência.** Pravenc: na regra de Jerusalém, ao contrário do peixe, «моллюски и черепокожные» são permitidos na Quaresma aos sábados, domingos e festas. Foma: uns equiparam-nos ao peixe (só 2 vezes na Quaresma), outros permitem-nos aos sáb/dom; na Grécia permitem-se nos dias de azeite. Gumerov: do ponto de vista do Typikon são animais, logo «semi-quaresmais» como o peixe; recomenda abster-se se forem iguaria. | (a) [12]; (b) [19][20] |
| Azeite / óleo vegetal | Graduado pelo Typikon («елей»). Foma: para leigos o óleo vegetal é admissível diariamente; o rigor do Typikon é monástico. | (a) [1][2]; (b) [19] |
| Vinho / álcool | O Typikon concede «вино» medido (1–3 taças) com o azeite ou à parte. Nenhuma fonte consultada concede bebidas destiladas; Foma: na Quaresma não se bebem bebidas espirituosas fortes nem vinho em grande quantidade. | (a) [2][3]; (b) [19] |
| Mel, cogumelos, cereais, legumes, fruta | Permitidos em todos os dias de jejum com refeição. | (b) [16] |

⚠ PARA CONFIRMAR: cerveja, produtos industriais «постные» (maionese vegetal, margarina), açúcar e chocolate não aparecem nas fontes primárias consultadas (2.ª ronda: Typikon caps. 32, 33, 35, 49; documento oficial de 2015/2016 [10][33]; o calendário oficial nem sequer publica graus de comida [34]). Não há fonte normativa a encontrar; é uma escolha de produto. → DECISÃO DO UTILIZADOR (proposta: não classificar automaticamente).

---

## 2. Quartas e sextas-feiras ao longo do ano

### 2.1 Base canónica
- Cânone Apostólico 69: o clérigo que não jejua na Quaresma, às quartas ou às sextas é deposto; o leigo é excomungado, «кроме немощи» (salvo doença) [22]. O Typikon (cap. 33) cita-o e comenta: jejua-se à quarta e à sexta «как во святую 40-цу», salvo doença e festa [2].
- Cânone Apostólico 64: proíbe jejuar ao domingo e ao sábado, exceto o Sábado Santo [21]. Daí as atenuações sistemáticas de sábado/domingo e a regra «пост не бывает» quando as vésperas de Natal/Teofania caem ao sábado/domingo [5][6].

### 2.2 Regra-base por período (fora dos 4 jejuns)

| Período | (a) Typikon | (b) Calendários paroquiais | Fonte |
|---|---|---|---|
| Fora dos jejuns, em geral | «Como na Quaresma» (cap. 33). Entre o fim do Jejum dos Apóstolos e o da Dormição: qua/sex uma refeição à hora nona (cap. 35). | azbyka: o peixe só se permite em festas dos Doze e festas do templo; o óleo, só com santo de polieleo. pravmir: proibidos carne e lacticínios; peixe/óleo não indicados como regra geral. | [2][3]; [16][17] |
| Pentecostário (de São Tomé ao Pentecostes) | **Azeite e vinho** às qua/sex; peixe e vinho apenas na quarta da Mesopentecostes e na quarta da Apodose da Páscoa; «Нецыи же разрешают и в прочия» (alguns permitem também nas outras). | azbyka: «по уставу в эти дни можно есть рыбу» — peixe em todas as qua/sex. | [2]; [16] |

✔ Confirmado (2.ª ronda): as duas fontes paroquiais concordam. Pravmir: «в эти дни недели Святая Церковь запрещает употребление мясной и молочной пищи, а в период недели Всех Святых до Рождества Христова следует воздержание также от рыбы и растительного масла. Лишь когда на среду и пятницу приходятся дни празднуемых святых, разрешается растительное масло, а в самые большие праздники, такие как Покров, – рыба» [17]; azbyka: no período de verão, óleo só com santo de polieleo e peixe na festa do templo [16]. Implementação: `TYPIKON` → nível 2 (1 refeição); `PARISH` → nível 3 (sem óleo), `HOT_OIL` com santo celebrado (polieleo), `FISH` nas grandes festas. Nota: o calendário oficial da Editora do Patriarcado **não** publica graus de comida (só «пост»/«строгий пост»/«поста нет») [34].

✔ Confirmado (2.ª ronda): o texto do cap. 33 é «В средах же и пятцех, всея Пятьдесятницы, елей и вино, кроме среды преполовения, и среды отдания Пасхи: В та бо два дни разрешаем на рыбу и вино. Нецыи же разрешают и в прочия» [2]; a frase da azbyka «по уставу… можно есть рыбу» [16] é imprecisa. As duas fontes paroquiais dão peixe em todas as qua/sex do Pentecostário [16][17]. Implementar `TYPIKON` = azeite/vinho (peixe só nesses 2 dias) e `PARISH` = peixe.

### 2.3 Exceções: qua/sex sem jejum (semanas contínuas)
Ver §4. Nas semanas contínuas não há jejum à quarta e à sexta [2][16][31].

### 2.4 Festa a cair numa quarta ou sexta (fora dos jejuns longos)

| Festa (OS / NS) | (a) Typikon cap. 33 | (b) Paróquia | Fonte |
|---|---|---|---|
| Natividade 25 dez. / 7 jan.; Teofania 6 jan. / 19 jan. | Monges: queijo e ovos; leigos: carne (sem jejum) | Jejum anulado | [2][5]; [16] |
| Natividade da Mãe de Deus 8 set. / 21 set.; Encontro (Сретение) 2 fev. / 15 fev.; Dormição 15 ago. / 28 ago. | Peixe e vinho | Peixe; quando cai em qua/sex, a quebra do jejum (разговение) passa para o dia seguinte | [2]; [16] |
| Transfiguração 6 ago. / 19 ago.; Entrada no Templo (Введение) 21 nov. / 4 dez. | Peixe e vinho **em qualquer dia**, duas refeições | Peixe | [2]; [16] |
| Natividade do Precursor 24 jun. / 7 jul.; Pedro e Paulo 29 jun. / 12 jul.; João Teólogo | Peixe e vinho, duas refeições | Peixe | [2]; [16] |
| Exaltação da Cruz 14 set. / 27 set.; Degolação do Precursor 29 ago. / 11 set. | **Sem peixe**; azeite e vinho | Dia de jejum rigoroso com óleo, sem peixe | [2][7]; [16][17] |
| Santo de polieleo (полиелейный) em qua/sex, fora dos jejuns | Não está explícito no cap. 33 para estes períodos | Óleo vegetal permitido | [16] |
| Festa do templo (храмовый праздник) em qua/sex | Nos jejuns da Natividade/Apóstolos: peixe (cap. 33) | Peixe | [2]; [16] |
| Proteção (Покров) 1 out. / 14 out. | Não consta do cap. 33 | pravmir: «на большие праздники, например Покров, разрешена рыба» | [17] |

✔ Confirmado (2.ª ronda), com inferência assinalada: o cap. 33 diz só «возлюбленнаго Иоанна Богослова» [2]; as duas memórias (26.09 e 08.05 OS) têm ambas o grau de **vigília** (🕁) no Typikon [35]. Aplicar a regra a ambas (inferência a partir do grau; a 08.05 cai sempre no Pentecostário, onde o resultado — peixe — coincide com a camada `PARISH`).

---

## 3. Os quatro jejuns longos

### 3.1 Grande Quaresma (Великий пост, *Velikii post*; Святая Четыредесятница; gr. Τεσσαρακοστή)

#### 3.1.1 Âncoras móveis (P = domingo de Páscoa)
Os deslocamentos abaixo são cálculos sobre a estrutura do Triódio [8][12] (Quaresma de 7 semanas = 40 dias + Semana Santa = 48 dias [16]).

| Dia | Offset |
|---|---|
| Domingo do Publicano e do Fariseu | P−70 |
| Semana contínua do Publicano (seg–sáb) | P−69 … P−64 |
| Domingo do Filho Pródigo | P−63 |
| Sábado da Carne (sábado de defuntos ecuménico) | P−57 |
| Domingo da Carne (Мясопуст; último dia de carne) | P−56 |
| Semana do Queijo (Сырная седмица / Масленица) | P−55 … P−50 |
| Domingo do Queijo / do Perdão (Прощёное воскресенье) | P−49 |
| Segunda Pura (Чистый понедельник) | P−48 |
| 1.º sábado (S. Teodoro Tiro) | P−43 |
| Sábados de defuntos da 2.ª/3.ª/4.ª semana | P−36, P−29, P−22 |
| Quarta da Mesoquaresma (Средопостная среда) | P−25 |
| Quinta do Grande Cânone (Andreevo stoyanie) | P−17 (cânone na véspera, quarta à noite) |
| Sábado do Acatisto | P−15 |
| Fim da Quarentena (sexta da 6.ª semana) | P−9 |
| Sábado de Lázaro | P−8 |
| Domingo de Ramos (Вход Господень в Иерусалим, Неделя ваий) | P−7 |
| Semana Santa (Страстная седмица) seg–sáb | P−6 … P−1 |

#### 3.1.2 Regra geral

| Dia | (a) Typikon | (b) Paróquia (pravmir/azbyka) | Fonte |
|---|---|---|---|
| Seg–sex, semanas 2–6 | Jejum até à tarde; **sukhoyadenie**, 1 refeição | Seg/Qua/Sex: sukhoyadenie; Ter/Qui: quente sem óleo | [1][12]; [17] |
| Sábado e domingo | Azeite e vinho («разрешаем на елей точию, и вино»), 2 refeições | Quente com óleo | [1]; [16][17] |
| Peixe | **Só** na Anunciação e no Domingo de Ramos («рыбы же во всю святую четыредесятницу никакоже дерзнем ясти») | Idem | [1][8]; [16] |
| Santo de polieleo/festa do templo em dia útil | Azeite e vinho, como ao sábado/domingo; peixe não | — | [12] |

#### 3.1.3 Primeira semana

| Dia | (a) Typikon | (b) Paróquia | Fonte |
|---|---|---|---|
| Seg (P−48) | Abstinência total | Abstinência total | [1]; [16][17] |
| Ter (P−47) | Abstinência total; os fracos e idosos podem comer pão e kvass depois das vésperas | Quente sem óleo (pravmir) / ainda sem comer (azbyka: primeira refeição na quarta) | [1]; [16][17] |
| Qua (P−46) | Depois da Liturgia dos Pré-santificados. Cap. 32: «хлеб тепл, и от снедей овощных теплых», funcho com mel. Triódio: sukhoyadenie e «сок с медом» | Sukhoyadenie | [1][8]; [16] |
| Qui (P−45) | Triódio: não se põe mesa; jejua-se até sexta | Quente sem óleo (pravmir) | [8]; [17] |
| Sex (P−44) | Come-se depois dos Pré-santificados (sukhoyadenie); azeite «não se pratica» por respeito ao dia | Sukhoyadenie; bênção do colivo | [1][8]; [16] |
| Sáb (P−43, S. Teodoro) | Fava cozida, azeitonas, comida cozinhada com azeite, vinho | Com óleo | [8]; [17] |

⚠ PARA CONFIRMAR (conflito confirmado na 2.ª ronda): (a) dentro do Typikon — cap. 32: «В среду же по совершении преждесвященных… ядим хлеб тепл, и от снедей овощных теплых» [1]; cap. 49: «ядим сухоядение: пием и сок с медом. В четверток же тоя седмицы трапезы не поставляем, но пребываем постящеся даже до пятка» [8]. (b) Entre fontes paroquiais — azbyka: segunda e terça sem comida, primeira refeição na quarta [16]; pravmir: tabela com «горячая без масла» [17]. O calendário oficial não arbitra (não publica graus de comida) [34]. → DECISÃO DO UTILIZADOR (que leitura mostrar por omissão em cada camada; proposta: `TYPIKON` = cap. 49 com nota do cap. 32; `PARISH` = azbyka).

#### 3.1.4 Dias especiais da Quaresma

| Dia | (a) Typikon | Fonte |
|---|---|---|
| Quarta da Mesoquaresma (P−25) | **Sem** azeite nem vinho: «день плача есть, а не радости» | [8] |
| Quarta à noite e Quinta do Grande Cânone (P−18/P−17) | A Triódio dá azeite e vinho «pelo trabalho da vigília», notando que alguns typika só dão vinho. O cap. 32 diz que, embora alguns typika o permitam, o azeite «не творится» na «quarta do grande cânone» | [8]; [1] |
| Sábado do Acatisto (P−15) | Dois pratos com azeite, vinho | [8] |
| Véspera da Anunciação (24 mar. OS), se antes do Sábado de Lázaro | Azeite e vinho | [1] |
| Anunciação (25 mar. / 7 abr.) antes do Domingo de Ramos | Peixe e vinho; 1 refeição, salvo sáb/dom | [1][2] |
| Sábado de Lázaro (P−8) | Comida cozinhada com azeite + **ovas** («икру… по три онгии»), vinho | [8]; (b) [16][17] |
| Domingo de Ramos (P−7) | Peixe e vinho | [1][8] |
| 40 Mártires (9 mar.), 1.ª/2.ª Invenção da Cabeça do Precursor (24 fev.) | O Triódio cita o *typikon* da Santa Montanha: dois pratos com azeite e duas taças de vinho. Para o Typikon russo, ver [12] (azeite e vinho em festa) | [8][12] |

⚠ PARA CONFIRMAR (conflito confirmado na 2.ª ronda): cap. 49 — «На трапезе разрешаем на елей, и вина причащаемся труда ради бденнаго… Внимающии же спастися, воздержанию прилежат» e «ядим елей, и вино пием, труда ради бывшаго. Нецыи же…» [8]; cap. 32 — «в среду великаго канона… аще нецыи уставы и повелевают на елей разрешати, но не творится за честность дней» [1]. Proposta: `TYPIKON` = vinho sem azeite (`wine=true`, nível 2), marcado como controverso. → DECISÃO DO UTILIZADOR. A quarta da Mesoquaresma fica sem azeite nem vinho (cap. 49: «день плача есть, а не радости» [8]): seguir a regra russa.

#### 3.1.5 Semana Santa, dia a dia

| Dia | (a) Typikon | (b) Paróquia | Fonte |
|---|---|---|---|
| Seg, Ter, Qua Santas | Sukhoyadenie, «как в 1-ю седмицу» | Jejum «строгий (без масла)» | [8]; [16] |
| Quinta Santa | Triódio: comida cozinhada com azeite e vinho (o Studita: um prato, legumes e favas, vinho; o atonita: dois pratos com azeite, 3 taças). O cap. 32 diz que o azeite «не творится» por respeito ao dia | — | [8]; [1] |
| Sexta Santa | Não se come; doentes/idosos: pão e água depois do pôr do sol | Não se come até ao «вынос Плащаницы» (pravmir) / até ao fim do «чин погребения» (azbyka) | [8]; [16][17] |
| Sábado Santo | Depois da Liturgia (de Basílio, com as vésperas): um pedaço de pão, 6 figos ou tâmaras, uma taça de vinho | Bênção de kulitch/pascha depois da Liturgia | [8]; [16] |
| Anunciação na Semana Santa | Seg–Qua: azeite e vinho; Sexta Santa: «на вино точию» (só vinho); sem peixe | — | [2][12] |

⚠ PARA CONFIRMAR: (1) Quinta Santa com ou sem azeite — conflito confirmado: o cap. 49 dá «варение с елеем. Пием же и вино», cita o Studita (um prato, sem menção de azeite) e o atonita (dois pratos com azeite) e termina «И сия вся како разсудит настоятель» [8]; o cap. 32 diz que o azeite «не творится» [1]. → DECISÃO DO UTILIZADOR (camada `TYPIKON`). (2) Hora de quebrar o jejum da Sexta-feira Santa: pravmir «до выноса Плащаницы» [17] vs. azbyka «только после окончании чина погребения Плащаницы» [16]; o calendário oficial só diz «Строгий пост.» [34]; o Typikon manda não comer de todo (doentes/idosos: pão e água depois do pôr do sol) [8]. → DECISÃO DO UTILIZADOR (camada `PARISH`). (3) ✔ Confirmado (2.ª ronda) pelos capítulos de Marcos do Typikon a 25.03 [35]: Anunciação na **Quinta Santa** → «На трапезе же не разрешаем на рыбы: но точию на елей и вино»; Anunciação na **Sexta Santa** → na Quinta Santa «разрешаем на елей и вино» e na Sexta, depois da Liturgia de Crisóstomo, «ядим сухоядение, и пием вино» (= «на вино точию» do cap. 33 [2]); Anunciação no **Sábado Santo** → refeição depois da Liturgia de Basílio «якоже указася в великую субботу» (sem atenuação própria). Anunciação na Grande Quarta: «варение без елеа: вино же пием» [35].

### 3.2 Jejum dos Apóstolos / de Pedro e Paulo (Петров пост, Апостольский пост; gr. νηστεία τῶν ἁγίων ἀποστόλων)

#### 3.2.1 Cálculo
- Começa na segunda-feira a seguir ao Domingo de Todos os Santos (1.º domingo depois do Pentecostes) e termina a 28 jun. OS. A festa de 29 jun. OS / 12 jul. NS não é dia de jejum, salvo se for quarta ou sexta (ver §2.4) [9][13].
- Início = P+57. Fim = 28 jun. OS (inclusive).
- Com a Páscoa juliana entre 22 mar. e 25 abr. OS: Páscoa a 22 mar. → início a 18 mai. OS → **42 dias**. Páscoa a 25 abr. → início a 21 jun. OS → **8 dias**. (Cálculo; amplitude 8–42 dias.)
- ✔ Confirmado (2.ª ronda): a pravenc define os limites («начинающийся в понедельник после 1-й недели по Пятидесятнице… и продолжающийся до дня памяти св. апостолов Петра и Павла 29 июня ст. ст.») [13], o que dá 8–42 dias por cálculo; a pravmir: «Продолжительнейший Петров пост заключает в себе шесть недель, а кратчайший неделю с днем» [17]. O «от 1 до 5 недель» da azbyka [16] é incoerente com a própria página («шесть недель… восемь дней»).

#### 3.2.2 Regra por dia (igual ao Jejum da Natividade no cap. 33)

| Dia | (a) Typikon | (b) Paróquia | Fonte |
|---|---|---|---|
| Seg, Qua, Sex | Sukhoyadenie, 1 refeição à hora nona, sem azeite nem vinho | Seg: quente sem óleo; Qua/Sex: sukhoyadenie | [2][9][13]; [16][17] |
| Ter, Qui | Azeite e vinho, sem peixe, 2 refeições | Peixe (pravmir: tabela «рыба») ou óleo (azbyka) | [2][13]; [16][17] |
| Sáb, Dom | Peixe, 2 refeições | Peixe | [2][13]; [16] |

Modificadores de santos (cap. 33):

| Santo | Seg | Ter/Qui | Qua/Sex | Fonte |
|---|---|---|---|---|
| Com grande doxologia (славословие) | Peixe (cap. 33: «Аще в понедельник, подобне») | Peixe | Azeite e vinho, 1 refeição | [2] |
| Com polieleo | Pravenc: azeite e vinho em seg/qua/sex; peixe em ter/qui | Peixe | Azeite e vinho | [13] |
| Com vigília (бдение) ou do templo | Peixe | Peixe | Azeite, vinho **e peixe** | [2][13] |
| Natividade do Precursor (24 jun. OS) ou Pedro e Paulo em qua/sex | — | — | Peixe e vinho, 2 refeições | [2] |

⚠ PARA CONFIRMAR (conflito interno do Typikon confirmado na 2.ª ronda): cap. 33 — «Аще случится святый во вторник, или в четверток имеяй славословие, ядим рыбу: Аще в понедельник, подобне» [2]; cap. 48 (14.11) — «Въ понедельникъ же, въ срeду и въ пятокъ, разрешaемъ точию на елeй и вино, рыбы же не ядимъ, кроме хрaма» (citado por Zheltov, que nota que o cap. 33 «не считает понедельник подчеркнуто постным днем») [15]; a pravenc segue o cap. 48 [13][14]. O motor deve guardar a regra como parâmetro (`monday_like: "tue_thu" | "wed_fri"`). → DECISÃO DO UTILIZADOR (valor por omissão na camada `TYPIKON`).

### 3.3 Jejum da Dormição (Успенский пост)
- 1–14 ago. OS = 14–27 ago. NS [16]. O Typikon (1 ago.) diz que neste dia se deixa a carne e se começa o jejum, e que não se dá peixe salvo na Transfiguração [7].

| Dia | (a) Typikon cap. 33 | (b) Paróquia | Fonte |
|---|---|---|---|
| Seg, Qua, Sex | Sukhoyadenie até à hora nona; com prostrações | Sukhoyadenie | [2]; [17] |
| Ter, Qui | Comida cozinhada sem azeite | Quente sem óleo | [2]; [17] |
| Sáb, Dom | Comida cozinhada com azeite, vinho; **sem peixe** | Com óleo | [2]; [16][17] |
| Transfiguração (6 ago. / 19 ago.) | Peixe, 2 refeições | Peixe | [2]; [16][17] |
| Dormição (15 ago.) em qua/sex | Peixe e vinho | «Рыбный день», quebra do jejum passa para o dia seguinte | [2]; [16][17] |

⚠ PARA CONFIRMAR: santos de polieleo/vigília dentro do Jejum da Dormição (p. ex. festa do templo) não estão no texto do cap. 33, que diz apenas «рыбы же не ядим, до Успения Пресвятыя Богородицы: но токмо на Преображение Христово» [2]. Tentado na 2.ª ronda: Typikon caps. 33 e 48 (01.08), azbyka [16], pravmir [17]; não se encontrou a pravenc «Успенский пост». Proposta mantida: modificador do §3.2 com teto «sem peixe».

### 3.4 Jejum da Natividade / de S. Filipe (Рождественский пост, Филиппов пост; «Малая Четыредесятница»)
- 15 nov.–24 dez. OS = 28 nov.–6 jan. NS; a véspera do jejum (заговенье) é a memória do Apóstolo Filipe, 14 nov. OS [14].
- No cap. 51, o Typikon remete para novembro a regra dos jejuns [9].

#### 3.4.1 (a) Typikon

| Dia | Regra | Fonte |
|---|---|---|
| Seg, Qua, Sex | Sukhoyadenie, 1 refeição, sem azeite nem vinho | [2][14] |
| Ter, Qui | Azeite e vinho, sem peixe, 2 refeições | [2][14] |
| Sáb, Dom | Peixe, 2 refeições | [2][14] |
| Grandes santos listados no Typikon (OS): **16, 25, 30 nov.; 4, 5, 6, 9, 17, 20 dez.** | Em ter/qui: peixe. Em seg/qua/sex: só azeite e vinho, sem peixe, salvo se for festa do templo | [4][14] |
| Entrada da Mãe de Deus no Templo (21 nov. OS / 4 dez.) | Peixe em qualquer dia | [2][4] |
| Santo com vigília ou do templo em qua/sex | Peixe (cap. 33) | [2][14] |
| 20/21–24 dez. OS | Sem peixe, mesmo ao sábado e ao domingo. Typikon: «От 20-го же числа, даже до 25» | [4] |
| Variante «de alguns typika» | Desde 9 dez., peixe só ao sábado, ao domingo e na festa do templo | [4][14] |

Notas de leitura:
- A pravenc [14] e Zheltov [15] interpretam «a partir do dia 20» como **a partir de 21 dez.** (o dia 20, S. Inácio, está na lista de atenuações).
- A pravenc diz que os redatores do Typikon atual não aceitam a variante «desde 9 dez.» [14].
- O cap. 33 e o cap. 48 contradizem-se quanto à segunda-feira (ver §3.2.2) [14][15].

#### 3.4.2 (b) Prática paroquial (duas fases, origem russa antiga)
Zheltov [15] diz que a divisão em dois períodos vem do «Око церковное» pré-niconiano: peixe às terças e quintas até S. Nicolau (6 dez. OS), seguido de um período mais rigoroso. Diz também que as regras do Typikon «относятся по преимуществу к монашествующим».

| Período (NS) | Seg | Ter, Qui | Qua, Sex | Sáb, Dom | Fonte |
|---|---|---|---|---|---|
| 28 nov.–19 dez. | Quente sem óleo | Peixe | Sukhoyadenie | Peixe | [18] (variante «suave»); [17] |
| 20 dez.–1 jan. | Quente sem óleo | Com óleo (sem peixe) | Sukhoyadenie | Peixe | [16][18] |
| 2–6 jan. (preparação da festa) | Sukhoyadenie | Sem peixe; óleo ⚠ (ver nota) | Sukhoyadenie | Com óleo, **sem peixe** | [16][18] |

⚠ PARA CONFIRMAR: (1) Segunda a quinta de 2–5 jan. NS — divergência paroquial mantida após a 2.ª ronda: azbyka (óleo só sáb/dom) [16]; Foma (sukhoyadenie seg/qua) [18]; pravmir: «В предпразднство нельзя есть рыбу во все дни, в субботу и воскресенье – пища с маслом» (sem detalhe dos dias úteis) [17]; o calendário oficial não publica graus de comida [34]. → DECISÃO DO UTILIZADOR (fonte paroquial de referência). (2) ✔ Confirmado (2.ª ronda): o cap. 33 dá sukhoyadenie às seg/qua/sex («ни елеа вкушаем, ни вина… и ядим в тыя дни сухоядение») [2], logo a variante «Typikon» da Foma [18] não é o Typikon: não a usar na camada (a).

---

## 4. Semanas contínuas (сплошные седмицы, *sploshnye sedmitsy*)

Definição: semanas sem jejum à quarta e à sexta [31][16].

| Semana | Limites | (a) Typikon | (b) Paróquia | Fonte |
|---|---|---|---|---|
| Santos dias / Святки | 25 dez.–4 jan. OS = 7–17 jan. NS (a 5 jan. OS é véspera de jejum) | «Ядим от Рождества Христова по вся дни, до навечерия святаго Богоявления»; nos «doze dias»: monges queijo e ovos, leigos carne | Sem jejum | [5][2]; [16] |
| Publicano e Fariseu | P−69 … P−64 | Contra o jejum «арцивуриев» dos heterodoxos, monges comem queijo e ovos (qua/sex à hora nona) e leigos carne | Sem jejum | [8][2]; [16][31] |
| Semana do Queijo (Масленица) | P−55 … P−50 (+ dom. P−49) | Sem carne. Seg: queijo e ovos, 2 vezes. Qua e Sex: sem Liturgia, «Аллилуия» com prostrações; queijo e ovos **uma vez**, depois das vésperas | Ovos, lacticínios e peixe; sem carne | [8][2]; [16] |
| Semana Luminosa (Светлая) | P+1 … P+6 | «Монаси на сыр и яица и рыбы, мирстии же на вся» | Sem jejum | [1]; [16] |
| Semana da Trindade | P+50 … P+55 | «Разрешена ясти рыбы, сыр, и яица, и млеко: а миряном мясо, до недели всех святых» | Sem jejum | [1][2]; [16] |

✔ Confirmado (2.ª ronda): o cap. 49 coloca a nota contra o jejum «арцивуриев» dentro do ofício do Domingo do Publicano («в сей седмице…») [8], e o calendário oficial de 2026 marca a segunda seguinte ao Domingo do Publicano: «Седмица сплошная… В течение всей седмицы, включая среду и пятницу, поста нет» (02.02.2026 NS) [34]. Usar P−69…P−64.

✔ Confirmado (2.ª ronda): o calendário oficial diz a 25.12 «От 25 декабря до 5 января – Святки (святые дни). Нет поста в среду и пятницу» e marca 05.01 OS (18.01 NS) como «День постный» [34]; o Typikon: «Ядим от Рождества Христова по вся дни, до навечерия святаго Богоявления» [5]. Sem jejum de qua/sex: 25.12–04.01 OS = **7–17 jan. NS**; a 18 jan. NS é jejum.

Disciplina conjugal (camada b): azbyka afirma que, nas semanas Luminosa e dos Santos dias, e a partir da Semana do Queijo, se recomenda abstinência conjugal «согласно церковным правилам» [16]. O documento de 2016 refere esta abstinência apenas para a preparação da Comunhão (§7) [10].

---

## 5. Jejuns de um só dia

| Dia | OS / NS | (a) Typikon (dia útil) | Ao sábado/domingo | (b) Paróquia | Fonte |
|---|---|---|---|---|---|
| Véspera da Natividade (Рождественский сочельник) | 24 dez. / 6 jan. | Depois das vésperas e da Liturgia: comida cozinhada com azeite e vinho, **sem peixe** [15] | «Пост не бывает»: Horas Reais antecipadas para sexta; Liturgia de Crisóstomo; depois, um pedaço de pão e um pouco de vinho; vésperas à 7.ª hora | Dia mais rigoroso; tradição de esperar pela «primeira estrela» e comer sotchivo (сочиво); ao sáb/dom, comida com óleo | [5]; [16][18] |
| Véspera da Teofania (Крещенский сочельник) | 5 jan. / 18 jan. | Ver ⚠ abaixo | «Пост не бывает»: Horas Reais na sexta anterior (nessa sexta, «сыр и яица» — leitura provável do texto, pois a sexta cai nos Santos dias); depois da Liturgia de Crisóstomo, pão, figos/tâmaras e 1 taça de vinho «яко да не наречется пост»; refeição completa depois das vésperas, com azeite; nada de queijo, ovos ou peixe | Jejum rigoroso sem peixe, com óleo; sotchivo/colivo depois da Liturgia e da água benta | [6]; [16][17] |
| Degolação do Precursor (Усекновение) | 29 ago. / 11 set. | Azeite, frutos, uma taça de vinho; nada de carne nem peixe | (sem atenuação própria) | Sem peixe, com óleo | [7][2]; [16][17] |
| Exaltação da Cruz (Воздвижение) | 14 set. / 27 set. | Sem peixe; azeite e vinho; à noite, frutos | (sem atenuação própria) | Sem peixe, com óleo | [2]; [16][17] |

✔ Confirmado (2.ª ronda): (1) Typikon, 05.01, em dia útil: «входим в трапезу, и ядим с древяномаслием, испиваем же и вина. Сыра же и подобных ему, рыб никакоже дерзнем ясти» [6] — **azeite e vinho, sem peixe** também na camada (a). (2) O texto do Typikon para 24.12 e 05.01 não menciona estrela; a «первая звезда» é costume citado só por fontes paroquiais [16][17][18]. (3) Typikon, 14.09: «бывает утешение братии, о елеа и вина… Сыра же и яиц и рыбы, никакоже дерзнем коснутися» e 29.08: sem queijo, ovos nem peixe [7][35] — nenhum dos textos prevê atenuação ao sábado/domingo; manter azeite e vinho, sem peixe.

---

## 6. Matriz consolidada: festas × dia da semana × período

| Festa / grau | Fora de jejum, qua/sex | Quaresma (dia útil) | Apóstolos / Natividade (seg/qua/sex) | Apóstolos / Natividade (ter/qui) | Dormição | Fonte |
|---|---|---|---|---|---|---|
| Natividade, Teofania | ALL | — | — | — | — | [2] |
| Transfiguração, Entrada no Templo | FISH (qualquer dia) | — | FISH | FISH | FISH | [2] |
| Anunciação | — | FISH (Semana Santa: §3.1.5) | — | — | — | [1][2] |
| Ramos | — | FISH | — | — | — | [1] |
| Natividade da Mãe de Deus, Encontro, Dormição | FISH | ⚠ (o Encontro pode cair na Quaresma muito cedo) | — | — | Dormição em qua/sex: FISH | [2] |
| Precursor (24 jun.), Pedro e Paulo, João Teólogo | FISH | — | FISH | FISH | — | [2] |
| Exaltação, Degolação | HOT_OIL + vinho | — | — | — | — | [2] |
| Santo com vigília / do templo | FISH (b) | HOT_OIL + vinho (sem peixe) | FISH | FISH | ⚠ | [2][12][13][16] |
| Santo com polieleo | HOT_OIL (b) | HOT_OIL + vinho | HOT_OIL + vinho | FISH | ⚠ | [12][13][16] |
| Santo com grande doxologia | — (b não especifica) | ⚠ | Qua/Sex: HOT_OIL + vinho; Seg: ⚠ (§3.2.2) | FISH | ⚠ | [2][13] |

⚠ PARA CONFIRMAR: a regra exata do Typikon para a Quaresma com festa de grande doxologia (sem polieleo) não foi encontrada. A pravenc diz genericamente que nas semanas da Quaresma há uma refeição com sukhoyadenie «и когда, если случится праздник, дозволяется, как в субботы и воскресенья, вкушение пищи с елеем и вина» [12]. Tentado na 2.ª ronda: caps. 32 e 49 do Typikon (só regras gerais e dias nomeados).

---

## 7. Jejum eucarístico e preparação para a Comunhão

### 7.1 Documento oficial
- «Об участии верных в Евхаристии» (Sobre a participação dos fiéis na Eucaristia). Foi aprovado pela Reunião Episcopal (Архиерейское совещание) de 2–3 fev. 2015 [11] e **adotado pelo Concílio Episcopal (Архиерейский Собор) de 2–3 fev. 2016** [10].
- ✔ Confirmado (2.ª ronda): o texto oficial foi lido no ficheiro publicado pelo patriarchia.ru (doc_AS_eu.doc, anexo do artigo [11]) e coincide com a cópia da azbyka nas passagens usadas (§7.2) [33]. Os decretos do Concílio de 2016, ponto 18: «Собор утверждает одобренный Архиерейским Совещанием 2 февраля 2015 года и принятый Священным Синодом 5 мая 2015 года (журнал №1) документ «Об участии верных в Евхаристии»» [33].

### 7.2 Conteúdo normativo (resumo fiel; citações em russo)

| Ponto | Conteúdo | Fonte |
|---|---|---|
| Jejum preparatório (приуготовительный пост) | Regulado pela tradição ascética: abstenção de comida «скоромная», afastamento de diversões, oração e arrependimento. Duração e medida variáveis. | [10] |
| Prática dos 3 dias | «Практика, согласно которой причащающийся несколько раз в году постится три дня перед Причащением, вполне соответствует преданию Церкви.» | [10] |
| Comunhão frequente | Quem comunga todas as semanas ou várias vezes por mês e cumpre os jejuns do Typikon pode aproximar-se sem jejum adicional, ou com 1 dia de jejum, ou com jejum na noite da véspera, «с благословения духовника». | [10] |
| Semana Luminosa | Quem cumpriu a Quaresma pode comungar limitando o jejum a não comer depois da meia-noite. «Аналогичная практика может быть распространена на период между Рождеством и Богоявлением.» | [10] |
| Jejum eucarístico (евхаристический пост) | «Полное воздержание от пищи и питья с полуночи до Святого Причащения». Canonicamente obrigatório (cân. 41 [50] de Cartago). | [10] |
| Exceções ao jejum eucarístico | Não se aplica a bebés, a doentes graves com toma ininterrupta de medicamentos ou alimento (p. ex. diabetes) e a moribundos. Pode ser atenuado para grávidas e lactantes, por decisão do *dukhovnik*. | [10] |
| Crianças | Até aos 3 anos não é obrigatório; a partir dos 3 anos, habituação gradual; aos 7 anos devem comungar em jejum. | [10] |
| Liturgia vespertina dos Pré-santificados | Sínodo de 28 nov. 1968: abstinência mínima de **6 horas**; desde a meia-noite é «весьма похвально». | [10] |
| Liturgias noturnas (Páscoa, Natividade) | Seguir a norma das 6 horas. | [10] |
| Jejum atenuado por circunstâncias | Doença (dieta especial), gravidez, amamentação, e vida em instituições com alimentação comum (exército, hospitais, internatos, prisões): o jejum preparatório pode ser «сокращен, облегчен или отменен». | [10] |
| Abstinência conjugal | Na preparação; o cân. 5 de Timóteo de Alexandria fala da véspera. | [10] |
| Tabaco | Abster-se desde a meia-noite e, se possível, desde a véspera à noite. | [10] |
| Confissão | Normalmente antes da Comunhão. O *dukhovnik* pode abençoar várias comunhões na mesma semana (Semana Santa, Semana Luminosa) sem confissão antes de cada uma. | [10] |
| Dias em que não se pode recusar a Comunhão aos fiéis | Páscoa, Natividade, Teofania, sábados de defuntos e Radonitsa. | [10] |
| Norma monástica (Typikon) | Quem quer comungar guarda toda a semana anterior, desde segunda-feira, em jejum, oração e sobriedade. | [1] |

✔ Confirmado (2.ª ronda): o texto oficial só fala de «приуготовительный пост» antes da **Comunhão** e da confissão como parte dessa preparação («открытие их перед священником в Таинстве Покаяния») [33]; pesquisa no patriarchia.ru não revelou outro documento normativo sobre jejum antes da confissão. A app não deve inventar um «jejum de confissão».

### 7.3 Implicações para o motor
- O jejum eucarístico é um **evento pessoal** (o utilizador marca «vou comungar em D»), não um nível do calendário.
- Gerar: `pre_communion_fast` (3 dias, por omissão `PARISH`, configurável: 0/1/3 dias ou «véspera à noite», com a nota «с благословения духовника») + `eucharistic_fast` desde as 00:00 de D (ou ≥ 6 h antes, se a liturgia for vespertina ou noturna) [10].
- Nas Semanas Luminosa e dos Santos dias: só o jejum desde a meia-noite, se o utilizador tiver cumprido o jejum anterior [10].

---

## 8. Outros elementos disciplinares do calendário

### 8.1 Prostrações (земные поклоны, *zemnye poklony*)

| Regra | Fonte |
|---|---|
| Cân. 20 de Niceia I: aos domingos e nos dias do Pentecostes (Páscoa → Pentecostes) reza-se de pé, sem ajoelhar; confirmado pelo cân. 90 do Concílio in Trullo e pelo cân. 91 de S. Basílio | [23][24][25] |
| Typikon: «В неделю бо и владычний праздник, и в пятьдесятницу всю, колена не преклоняют» (inclinações pequenas em vez de prostrações) | [25] |
| Prática da ROC: sem prostrações aos domingos (também na Quaresma), nas festas do Senhor (Господские) entre as Doze, de Grande Quarta (em casa, de Grande Sexta) até ao Pentecostes, e da Natividade à Teofania. São substituídas por inclinações até à cintura (поясные), mesmo diante dos Santos Dons | [24] |
| Exceções: prostrações diante do Epitáfio (Плащаница) e na saída da Cruz | [24] |
| Retoma: orações de joelhos nas vésperas do Pentecostes | [1] |
| Sábados e festas a partir do grau de doxologia: prostrações não prescritas, mas também não proibidas (Shlyapin) | [24] |
| Nos dias úteis dos jejuns com serviço de «Аллилуия» (Natividade, Apóstolos, Dormição) há prostrações «как во святую 40-цу» | [4][13][2] |
| Quarta e sexta da Semana do Queijo: «Аллилуия с поклоны» | [8] |

✔ Confirmado (2.ª ronda) quanto à fronteira: é regra do próprio Typikon (cap. 49, Grande Quarta, Liturgia dos Pré-santificados): «И абие упраждняются совершенно в церкви бываемыя поклоны: В келлиах же даже и до великаго пятка совершаются» [8]. ⚠ PARA CONFIRMAR: a lista das «festas do Senhor» em que não há prostrações não foi verificada caso a caso (p. ex. Transfiguração e Exaltação em dia útil; na Exaltação há prostrações diante da Cruz segundo [24]).

### 8.2 Dias em que a ROC não celebra casamentos (венчание, *venchanie*)
Fonte: azbyka (calendário de casamentos), que segue a prática da ROC [26].

| Interdição | Detalhe |
|---|---|
| Terças e quintas | Vésperas dos dias de jejum (qua/sex) |
| Sábados | Véspera do domingo («малая Пасха») |
| Páscoa; vésperas das festas dos Doze e das grandes festas | Nas festas dos Doze não é proibido, mas é «нежелательно» |
| Vésperas da festa do templo | Variável por igreja → requer configuração da paróquia |
| Semana do Queijo, Santos dias, Semana Luminosa | As outras semanas contínuas e as semanas preparatórias não estão proibidas, mas é «нежелательно» |
| Os 4 jejuns longos | Grande, Apóstolos, Dormição, Natividade |
| Degolação (11 set. NS) e Exaltação (27 set. NS) e as suas vésperas | — |
| Exceções | «Только правящим архиереем» (só o bispo diocesano); um casamento celebrado num dia proibido não é inválido |

Notas:
- A mesma fonte diz que só a ROC e a OCA proíbem terças, quintas e sábados [26].
- ⚠ PARA CONFIRMAR: o documento conciliar de 2017 «О канонических аспектах церковного брака» não contém esta lista (confirmado na 2.ª ronda no texto oficial [36]; pesquisa no patriarchia.ru sem outro documento; a «Настольная книга священнослужителя» da Editora do Patriarcado não foi acessível em linha). Não foi encontrado documento normativo oficial da ROC com a lista de dias; a lista vem da tradição sinodal e de manuais. Há também variação diocesana. Pela pravenc, a «Semana dos Pais» antes do Sábado de S. Demétrio (sem casamentos) é prática de velhos-crentes, não da ROC [27].

### 8.3 Radonitsa e sábados de defuntos (родительские субботы, *roditelskie subboty*)

| Dia | Posição | Fonte |
|---|---|---|
| Sábado da Carne (вселенская, ecuménico) | P−57 | [28][8] |
| Sábados da 2.ª, 3.ª e 4.ª semanas da Quaresma | P−36, P−29, P−22 | [28] |
| Radonitsa (Радоница) | Terça da 2.ª semana depois da Páscoa = P+9. Como nas semanas Santa e Luminosa não se fazem comemorações, as memórias «acumulam-se» desde o fim da 4.ª semana da Quaresma; a segunda de São Tomé não convém porque no domingo à noite há grande prokimenon | [29][28] |
| Sábado da Trindade (вселенская) | P+48 | [28] |
| Sábado de S. Demétrio (Димитриевская) | Sábado antes de 26 out. OS (8 nov. NS). Não é dia de defuntos no Typikon; na ROC atual serve-se segundo o cap. 13 do Typikon («Аллилуия» ao sábado) | [27] |
| 9 de maio NS (26 abr. OS) | Comemoração dos soldados e de todos os mortos da Grande Guerra Patriótica, instituída pelo Concílio Episcopal de 1994; ectenia de defuntos especial «о вождех и воинах» | [30] |

Notas de implementação:
- Os sábados de defuntos e a Radonitsa **não alteram o nível de jejum** (aplica-se a regra do período). Sábado e domingo nunca são dias de jejum até à hora nona, exceto o Sábado Santo [21].
- A Radonitsa cai sempre num período sem jejum à terça [2].
- Pelo documento de 2016, é inadmissível recusar a Comunhão nos sábados de defuntos e na Radonitsa [10].

✔ Confirmado (2.ª ronda): é o sábado **estritamente anterior** a 26.10 OS (sábado 19–25.10 OS). Nos anos em que 26.10 OS caiu num sábado (2014, 2025) o calendário da azbyka marcou o sábado anterior (01.11.2014 e 01.11.2025 NS) [37]; a lista oficial de 2026 dá «25 октября (ст.ст.) — Димитриевская родительская суббота» [34]. A expressão «за неделю» da azbyka [28] é aproximada.

---

## 9. Indulgências (camada c) — quem decide

| Situação | Norma / prática | Quem decide | Fonte |
|---|---|---|---|
| Doença | O Cân. Apostólico 69 isenta «немощь телесная»; o Typikon repete «кроме немощи» | *Dukhovnik* | [22][2] |
| Fracos e idosos na Quaresma | Pão e kvass na 1.ª terça à noite; pão e água depois do pôr do sol na Sexta-feira Santa | Regra do próprio Typikon | [1][8] |
| Fracos, doentes, idosos, grávidas, lactantes | Os requisitos «ослабляются» | «По благословению духовника» | [16] |
| Gravidez, amamentação, dieta médica, instituições | O jejum preparatório pode ser encurtado, atenuado ou anulado | *Dukhovnik* | [10] |
| Viagem / peregrinação | Não há cânone específico nas fontes consultadas. Arcipreste Aleksandr Ilyashenko: «Разрешение на послабление поста не есть обязательное указание ослабить пост»; a medida é individual | Pastoral (*dukhovnik*) | [32] |
| Medida geral para leigos | Foma: cada um define a medida aconselhando-se com o sacerdote; o jejum de nível monástico só com bênção especial | Sacerdote / *dukhovnik* | [19] |
| Crianças | Preparação para a Comunhão definida pelos pais com o *dukhovnik* | Pais + *dukhovnik* | [10] |

Regra de produto: a app pode oferecer um «perfil de economia» (`ECONOMY`) registado pelo utilizador. Nunca deve sugerir que a app concede a dispensa.

---

## 10. Algoritmo de referência (motor diário)

```
input: date_os, profile ∈ {TYPIKON, PARISH, ECONOMY(custom)}, parish_config{temple_feasts[]}, menaion_rank(date)
P := julian_pascha(year)                      # outro documento de conhecimento
d := date_os - P (em dias)

1) Períodos sem jejum (devolver ALL; DAIRY_EGGS na Semana do Queijo):
   Santos dias 25.12–04.01 OS; d ∈ [-69,-64]; d ∈ [-55,-49] → DAIRY_EGGS;
   d ∈ [0,6]; d ∈ [49,55]                                                 [1][2][5][8]
2) Dias absolutos (sobrepõem-se às festas, salvo a nota da Anunciação):
   d=-48,-47 → NO_FOOD; d=-2 (Sexta Santa) → NO_FOOD (wine se Anunciação [2]);
   d=-1 (Sábado Santo) → regra própria (pão, frutos, vinho)               [1][8]
3) Jejuns de um dia (24.12, 05.01, 29.08, 14.09 OS) com a variante sáb/dom (§5)     [2][5][6][7]
4) Período:
   Quaresma d ∈ [-48,-1] → tabelas §3.1
   Apóstolos d ≥ 57 e date ≤ 28.06 OS → §3.2
   Dormição 01–14.08 OS → §3.3
   Natividade 15.11–24.12 OS → §3.4 (sub-fases conforme o perfil)
   Pentecostário d ∈ [7,48] → qua/sex §2.2
   Resto → qua/sex §2.2 ; outros dias ALL
5) Modificadores de festa (§2.4, §6) segundo menaion_rank e temple_feasts;
   aplicar max(nível_base, nível_festa) dentro do teto do período
   (Quaresma: peixe só na Anunciação/Ramos; Dormição: peixe só na Transfiguração; 20/21–24.12 sem peixe)
6) Devolver {level, wine, meals, after, notes[], conflicts[]}
   e incluir em conflicts[] os ⚠ aplicáveis ao dia.
```

Precedências críticas (todas suportadas pelas secções acima):
1. Semana Santa > festas (só a Anunciação mexe no nível, e sem peixe) [2].
2. Anunciação/Ramos > regra geral da Quaresma [1].
3. Sáb/dom nunca são «até à hora nona» (Cân. Ap. 64), exceto o Sábado Santo [21].
4. Natividade/Teofania em qua/sex anulam o jejum [2].
5. A Exaltação e a Degolação nunca dão peixe [2][7].

---

## 11. Lista consolidada de dúvidas (⚠)

Estado após a 2.ª ronda (2026-10-16). **Achado transversal:** o calendário oficial da Editora do Patriarcado (calendar.rop.ru) só indica «пост», «строгий пост», «день постный» ou «поста нет» — **não publica graus de comida** [34]. A camada `PARISH` assenta, portanto, em fontes paroquiais não oficiais (azbyka, pravmir, foma).

1. ✔ Níveis 1 vs. 2: sem contradição (cap. 35 «хлеб и воду, и сим подобная») [1][3][8].
2. ✔ Qua/sex comuns fora dos jejuns: `PARISH` sem óleo; óleo com santo celebrado; peixe em grandes festas [16][17].
3. ✔ Qua/sex do Pentecostário: Typikon = azeite/vinho (peixe em 2 dias); paróquia = peixe [2][16][17].
4. ⚠ Segunda-feira nos jejuns dos Apóstolos e da Natividade: conflito interno cap. 33 vs. cap. 48 → DECISÃO DO UTILIZADOR [2][13][14][15].
5. ⚠ Quarta e quinta da 1.ª semana da Quaresma: conflito interno (cap. 32 vs. cap. 49) e paroquial → DECISÃO DO UTILIZADOR [1][8][16][17].
6. ⚠ Quinta do Grande Cânone e Quinta Santa: azeite sim/não (cap. 32 vs. cap. 49; o cap. 49 deixa a Quinta Santa ao superior) → DECISÃO DO UTILIZADOR [1][8].
7. ⚠ Sexta Santa: quebra do jejum depois do «вынос» (pravmir) ou do «погребение» (azbyka) → DECISÃO DO UTILIZADOR [16][17][34].
8. ✔ Anunciação na Quinta, Sexta e Sábado Santos: regras lidas nos capítulos de Marcos (25.03) [35].
9. ⚠ Natividade: 20 vs. 21 dez. OS mantém-se como nota de leitura [4][14][15]; regras paroquiais de 2–5 jan. NS divergentes → DECISÃO DO UTILIZADOR [16][17][18].
10. ✔ Véspera da Teofania em dia útil: azeite e vinho, sem peixe (Typikon, 05.01) [6].
11. Mariscos: três posições diferentes [12][19][20] (não revisto na 2.ª ronda).
12. ⚠ Bebidas destiladas, cerveja e produtos industriais: nenhuma fonte normativa → DECISÃO DO UTILIZADOR.
13. ✔ Calendário oficial: lido em linha (calendar.rop.ru) [34]; não contém graus de comida (ver acima).
14. ✔ Documento sobre a Eucaristia: texto oficial lido; aprovado em 2015, adotado pelo Sínodo (05.05.2015) e confirmado pelo Concílio de 2016 [33].
15. ⚠ Casamentos: não há documento normativo oficial com a lista; a lista vem da azbyka e há variação diocesana [26][36].
16. ✔ Sábado de S. Demétrio: sábado 19–25.10 OS [34][37].
17. ✔/⚠ Prostrações: fronteira Grande Quarta/Sexta confirmada no Typikon [8]; lista das festas do Senhor por verificar [24][25].
18. ✔ Duração do Jejum dos Apóstolos: 8–42 dias [13][17].
19. ⚠ Santos de polieleo/vigília no Jejum da Dormição: sem regra no Typikon (§3.3).
20. ⚠ Quaresma com festa de grande doxologia: sem regra específica encontrada (§6).
21. ✔ João Teólogo: ambas as memórias são de vigília (Typikon) [35].
22. ✔ Semana contínua do Publicano e Santos dias (7–17 jan. NS): confirmados no calendário oficial [34].

---

## 12. Referências

1. Типикон, гл. 32 «О велицей четыредесятнице, яже должен всякий христианин хранити» (ed. Издательский Совет РПЦ, 2002). https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/32
2. Типикон, гл. 33 «О разрешении всего лета». https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/33
3. Типикон, гл. 35 «Разсуждение о ястии и питии субботы и недели…». https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/35
4. Типикон, гл. 48, Месяцеслов — 14 ноября (устав Рождественского поста). https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48_3
5. Типикон, гл. 48, Месяцеслов — 24–25 декабря. https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48_4
6. Типикон, гл. 48, Месяцеслов — 5 января. https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48_5
7. Типикон, гл. 48, Месяцеслов — 1 и 29 августа. https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48_12
8. Типикон, гл. 49 (Триодь постная: неделя мытаря — Великая суббота). https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/49
9. Типикон, гл. 51 «Начало святаго поста святых… апостол». https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/51
10. «Об участии верных в Евхаристии» (Архиерейский Собор РПЦ, 2–3.02.2016), texto em azbyka.ru. https://www.azbyka.ru/otechnik/dokumenty/ob-uchastii-vernyh-v-evharistii/
11. «Об участии верных в Евхаристии», Патриархия.ru (aprovado pela Reunião Episcopal de 2–3.02.2015). https://patriarchia.ru/article/96198
12. Православная энциклопедия, «Великий пост». https://www.pravenc.ru/text/150109.html
13. Православная энциклопедия, «Петров пост». https://www.pravenc.ru/text/2580468.html
14. Православная энциклопедия, «Рождественский пост». https://www.pravenc.ru/text/2661718.html
15. Свящ. Михаил Желтов, «Уставные указания о соблюдении Рождественского поста и их происхождение», Православие.Ru, 28.11.2017. https://pravoslavie.ru/108588.html
16. «О постах и трапезах», Азбука веры. https://azbyka.ru/o-postax-i-trapezax
17. «Церковный православный календарь постов и трапез на 2026 год», Правмир. https://www.pravmir.ru/kalendar-postov-i-trapez-na-2026-god/
18. «Календарь питания Рождественского поста», Фома. https://foma.ru/kalendar-rozhdestvenskogo-posta.html
19. «Что можно и нельзя в Великий пост?», Фома. https://foma.ru/chto-mozhno-i-nelzya-v-velikiy-post.html
20. Иеромонах Иов (Гумеров), «Можно ли в пост есть морепродукты…», Православие.Ru. https://pravoslavie.ru/6901.html
21. Апостольское правило 64. https://azbyka.ru/pravo/64-apostolskoe-pravilo/
22. Апостольское правило 69. https://azbyka.ru/pravo/69-apostolskoe-pravilo/
23. I Вселенский Собор, правило 20. https://azbyka.ru/pravo/pervyj-vselenskij-sobor-20/
24. Свящ. Алексей Шляпин, «Смысл и время поклонов», Азбука веры. https://azbyka.ru/smysl-i-vremja-poklonov
25. «Допускаются ли земные поклоны перед Чашей… от Пасхи до Троицы?», Азбука веры (Вопросы и ответы). https://azbyka.ru/vopros/?p=4196
26. «Календарь венчаний», Азбука веры. https://azbyka.ru/days/p-kalendar-venchanij
27. Православная энциклопедия, «Димитриевская родительская суббота». https://www.pravenc.ru/text/172067.html
28. «Поминовение усопших», Азбука веры. https://azbyka.ru/pominovenie-usopshix
29. «Радоница», Азбука веры. https://azbyka.ru/radonica
30. Собрание документов РПЦ, т. 2, ч. 1 — «Об установлении особого ежегодного поминовения усопших в день Победы, 9 мая (26 апреля)» (Архиерейский Собор 1994). https://www.azbyka.ru/otechnik/pravila/sobranie-dokumentov-russkoj-pravoslavnoj-tserkvi-tom-2-chast-1/1_8
31. «Сплошная седмица», Азбука веры. https://azbyka.ru/sploshnaya-sedmica
32. Прот. Александр Ильяшенко, «Нужно ли послабление поста современным паломникам?», Правмир. https://www.pravmir.ru/vopros-otvet/nuzhno-li-poslablenie-posta-sovremennym-palomnikam/
33. «Об участии верных в Евхаристии», texto oficial (ficheiro doc_AS_eu.doc anexo ao artigo do Патриархия.ru, 03.02.2015) https://patriarchia.ru/data/2015/02/03/1235926388/doc_AS_eu.doc ; «Постановления Освященного Архиерейского Собора РПЦ (2–3 февраля 2016 года)», п. 18. https://patriarchia.ru/article/97654
34. Издательство Московской Патриархии — «Православный церковный календарь» oficial em linha: «Пояснения…» (http://calendar.rop.ru/?inc=02), «О церковных праздниках… постах в 2026 году» (http://calendar.rop.ru/?inc=2026) e páginas diárias de 2026 (http://calendar.rop.ru/?idd=N; N = 7, 18, 33, 47, 54, 100, 152). Consultado em 2026-10-16.
35. Типикон, гл. 48, Месяцеслов (texto integral): 25 марта (Марковы главы sobre a Anunciação na Semana Santa), 14 сентября, 26 сентября, 8 мая. https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48
36. «О канонических аспектах церковного брака» (Архиерейский Собор 2017), Патриархия.ru. https://patriarchia.ru/article/98910
37. Azbuka Very, calendário diário 2014-11-01, 2025-11-01, 2026-11-07 (Димитриевская родительская суббота). https://azbyka.ru/days/2025-11-01
