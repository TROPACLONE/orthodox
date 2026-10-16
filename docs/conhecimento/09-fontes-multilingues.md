# 09 — Fontes multilingues: textos, Bíblias, terminologia e i18n (PT-PT · UK · RU · EN)

> **Âmbito:** decisões 5, 7, 17–19 e 28–31 ([decisoes.md](../decisoes.md)). A app mostra **eslavo eclesiástico + língua escolhida** lado a lado nas 4 línguas (dec. 29); a terminologia ucraniana segue o uso da **Igreja Ortodoxa Ucraniana (IOU)** (dec. 30); PT-PT é a língua-fonte do conteúdo editorial (dec. 28).
> Base de conhecimento interna — especificação para quem traduz e para quem programa. PT-PT (AO90); passagens técnicas em inglês quando a tradução perderia precisão. Termos nas escritas originais.
> Cada afirmação remete para `[n]` (lista no fim). Remissões internas: «doc. 03 §6», «doc. 04 §7», etc. Não verificado: **⚠ PARA CONFIRMAR**. Escolhas do utilizador: **→ DECISÃO DO UTILIZADOR**.
> Medições próprias (fontes tipográficas, regras CLDR) foram feitas a 16.10.2026 com fontTools 4.67 e Node 22.22 (ICU 77.1, CLDR 47) — método descrito em §5.
> Estado da informação: 16 de outubro de 2026. Este documento não é parecer jurídico.

---

## 0. Resumo para quem implementa

1. **Não há tradução livre, aprovada e completa do Molitvoslov em nenhuma das três línguas.**
   - RU: a língua litúrgica da IOR é o eslavo; as traduções russas existentes são privadas ou missionárias [1][6]. Há traduções **pré-1917 em domínio público** (Zaionchkovsky/«Nakhimov», 1912 [1][2]; Svirelin, 1894 [1]), mas com linguagem datada e cobertura parcial.
   - UK (IOU): a IOU admite o ucraniano na liturgia [17] e publicou um **Saltério** (2023) [12], com direitos não abertos. Não se encontrou Molitvoslov ucraniano oficial com licença livre.
   - EN: o **Hapgood** (1906; 2.ª ed. 1922, com aval do Patriarca Tikhon) está em domínio público [45][48]. Usa salmos do *Book of Common Prayer*, numeração hebraica e terminologia arcaica [46].
   → Seguir o padrão da decisão 7: **tradução própria** a partir do eslavo/grego, assinalada «tradução não oficial», nas 4 línguas. Usar as fontes livres só como referência lexical (§1.4).
2. **Bíblias livres.**
   - RU: Sinodal 1876, domínio público [29][41]. Salmos com numeração LXX e títulos contados como versículos [44].
   - UK: Kulish–Puliui–Nechui-Levytsky (1903/1905), domínio público [40]; protestante e de numeração hebraica [40][42].
   - EN: Brenton LXX (1851), domínio público; existe ainda uma atualização CC0 [38][39].
   - Ohiyenko (1962): o estatuto de direitos e o cânone são **duvidosos** (⚠ §2.2).
3. **Ucraniano da IOU ≠ ucraniano da Igreja Ortodoxa da Ucrânia (OCU/ПЦУ).** A IOU escreve «Іісус», «Іоанн» e «євангеліст» [16][22]; a OCU escreve «Ісус», «Іоан» e «євангелист» [25][26]. A OCU usa o calendário novo-juliano desde 01.09.2023 [27]; a IOU mantém o juliano [18]. Não misturar fontes (§3.0).
4. **Inglês:**
   - ROC/ROCOR dizem «Entry of the Theotokos», «Exaltation of the Cross» e «Protection» [71][72][73][75];
   - a OCA alterna entre «Entrance/Entry» e «Elevation/Universal Exaltation» [50][59][62];
   - o uso grego diz «Presentation» para 21 de novembro [78] (§3.0).
5. **i18n:**
   - RU/UK têm 4 categorias plurais CLDR (*one/few/many/other*) [127];
   - em pt-PT, «0» é *other* e não *one* (≠ pt-BR) [127].
   - A fonte **Ponomar** (OFL) cobre eslavo + ucraniano + latim. Pesa 135 KB em WOFF2 completo e ~45 KB num subconjunto «civil + acentos» sem *hinting* (medição própria, §5.4).

---

## 1. Textos litúrgicos e orações (coluna «língua escolhida» da dec. 29)

### 1.1 Russo

**Estatuto oficial**
- A língua de culto da IOR é o eslavo eclesiástico. A tradução de textos litúrgicos para russo tem uma tradição longa, mas a sua legitimidade «была и остается предметом напряженной полемики» [1].
- O projeto do Межсоборное присутствие «Церковнославянский язык в жизни Русской Православной Церкви XXI века» (2010–2011) foi publicado **para discussão**, não como documento aprovado [6]:
  - mantém o eslavo como língua principal do culto e admite textos «на национальных языках» que «должны точно передавать смысл оригинала» [6];
  - as correções dos livros litúrgicos fazem-se «лишь по благословению Священного Синода с последующим утверждением Архиерейским Собором» [6].
- O órgão que prepara textos litúrgicos novos é a **Синодальная богослужебная комиссия** (criada a 16.10.1989); os textos são aprovados pelo Santo Sínodo [7]. Exemplo: o Sínodo aprovou «для употребления за богослужением и в домашней молитве» um acatisto aos santos Boris e Gleb [8]. Trata-se de textos **eslavos** novos, não de traduções russas.
- ⚠ PARA CONFIRMAR: não se encontrou nenhuma tradução **russa** do Molitvoslov, da regra da Comunhão ou dos tropários aprovada pelo Sínodo ou por uma comissão sinodal. A «Синодальная библейско-богословская комиссия» não aparece, nas fontes consultadas, como aprovando traduções litúrgicas russas [6][7].

**Traduções russas pré-1917 (candidatas a domínio público)**

| Obra | Dados | Conteúdo | Estatuto | Ref. |
|---|---|---|---|---|
| **«Молитвы и песнопения Православного Молитвослова (для мирян) с переводом на русский язык, объяснениями и примечаниями»** | Николай Нахимов = pseudónimo de **Николай Чеславович Зайончковский** (09.02.1859 – 07.03.1920); SPb., **1912**; reeditado desde os anos 1990 | Orações da manhã e da noite, orações diversas, textos litúrgicos, cânone à Mãe de Deus | Autor † 1920 → domínio público na UE (vida + 70 anos; doc. 03 §6.5.1). Usar a impressão de 1912, não as reedições modernas | [1][2][3] |
| «Последование ко святому причащению и по причащении. В переводе на русский язык с греческого» | прот. Александр Свирелин, Moscovo, **1894** | Ofício para a Comunhão (traduzido do grego) | ⚠ PARA CONFIRMAR: a data da morte do tradutor (um prot. A. I. Svirelin, de Pereslavl, morreu em **1906**; não está provado que seja o mesmo) | [1][10] |
| «Воскресная служба Октоиха всех восьми гласов… на славянском и русском языках» | trad. do grego, «И. Ф. Ловягин», SPb., 1888 (reed. 1892, 1995) | Ofícios dominicais do Octoeco (Vésperas, Matinas, Liturgia) | ⚠ PARA CONFIRMAR: datas do tradutor (nome tal como dado em [1]) | [1] |
| «Сборник церковных песнопений с переводом их на русский язык» | прот. Владимир Успенский, Moscovo, 1911 | Hinos (tropários, etc.) | ⚠ PARA CONFIRMAR: datas do autor | [1] |
| «Толковый сокращенный молитвенник… с пер. на рус. яз.» | Иоанн Бухарев, 1896 (também 1902, 1904) | Orações de uso corrente | ⚠ PARA CONFIRMAR: ficha e datas do autor (só se viu um resumo de pesquisa do catálogo НЭБ) | [11] |
| Saltério de **П. А. Юнгеров** (tradução do AT «в первую очередь» a partir da Septuaginta, 1908–1917) | Kazan | Saltério da LXX em russo | Autor † 1921 [9] → domínio público. ⚠ PARA CONFIRMAR: ano e local do volume do Saltério (lojas indicam 1915) | [4][9] |

**Traduções modernas (com direitos)** — só como referência; não se reproduzem:
- «Православное богослужение в переводе с греческого и церковнославянского языков», 6 vols., Moscovo, 2007–2017 [1];
- traduções de Анри Волохонский (2016), usadas por alguns sacerdotes nos ofícios do Batismo e das exéquias [1].

**Conclusão RU**
- Coluna russa: **tradução própria** a partir do eslavo/grego (padrão da dec. 7), assinalada «неофициальный перевод».
- Zaionchkovsky (1912) e Svirelin (1894) servem de referência lexical em domínio público, depois de verificadas as datas.
→ **DECISÃO DO UTILIZADOR**:
  - (a) tradução russa própria e moderna;
  - (b) adaptar Zaionchkovsky 1912 (domínio público, ortografia pré-1918 a modernizar);
  - (c) mostrar só o eslavo em escrita civil com acentos e **sem** tradução russa. Para muitos falantes de russo o eslavo é parcialmente compreensível — juízo editorial, não facto verificado.

### 1.2 Ucraniano (uso da IOU)

**Estatuto na IOU**
- Em 2013, o metropolita António (de Boryspil) declarou que, segundo normas dos anos 1990, «якщо 2/3 парафіян хочуть службу українською або іншою мовою – жодних питань не виникне». Acrescentou que as paróquias da Volínia passaram «в основному» ao ucraniano, e também algumas de Kyiv [17].
- A Resolução do Concílio da IOU de 27.05.2022 não trata da língua litúrgica [16]. Declara a «повну самостійність і незалежність» da IOU e pede, para a diáspora, a preservação da «віри, культури, мови» [16].
- A própria IOU escreve «Господа Іісуса Христа», «Іоанна Богослова», «2 Ін.» [16]. Esta ortografia deve ser seguida (dec. 30).

**Textos em ucraniano ligados à IOU**

| Texto | Dados | Base / numeração | Direitos | Ref. |
|---|---|---|---|---|
| **Псалтир** (Видавничий відділ УПЦ, Kyiv, **2023**, 344 pp.) | Trabalho de uma comissão criada «за дорученням Синодальної літургічно-богослужбової комісії УПЦ» (20.12.2017–01.08.2018), presidida pelo bispo Filaret (Zverev); revisto pela Academia Teológica de Kyiv, com bênção do metropolita Onufrii, para «богослужбового вжитку» | Texto eclético: harmoniza o massorético com a LXX; numeração LXX (ex.: «Пс. 90:6», «Пс. 21:16») | Não há licença aberta → pedir autorização | [12] |
| **EUM — Об'єднавчий український переклад** (Evangelho, Apóstolo, NT) | Grupo de leigos e clérigos ligados à IOU (protodiácono R. Vorobii; V. Sholokh, do Departamento Editorial da IOU; e outros), 2012–2015; texto bizantino Robinson–Pierpont; 1.ª edição em 2023–2024 pela **Stavropégia do Patriarcado Ecuménico em Ucrânia** | NT (bizantino) | «Усі права на текст належать перекладачам»; aceitam pedidos de edição | [13][14][15] |
| **Blagovist** (blagovist.info, projeto ligado aos sites da IOU) — Molitvoslov em linha | Orações da manhã e da noite, regra da Comunhão, cânones, tropários das festas, Saltério. Modos: eslavo, «Транслітерація (Київський ізвод)», ucraniano | Eslavo em codificação legada UCS (como a azbyka; doc. 03 §6.1.1) | Sem licença declarada → tratar como © | [16][22][23] |

- O modo «Київський ізвод» do Blagovist apresenta o eslavo em letras ucranianas, segundo a pronúncia ucraniana [22][23]. → **DECISÃO DO UTILIZADOR**: para a interface UK, a coluna eslava mostra o eslavo em escrita civil russa com acentos (B3) **ou** a transliteração «Київський ізвод»?
- ⚠ PARA CONFIRMAR: existência de um Molitvoslov **ucraniano** oficial da IOU (editora, ano, aprovação sinodal). As pesquisas não o encontraram.

**Conclusão UK**
- Coluna ucraniana: **tradução própria**, com a ortografia e a terminologia da IOU (§3).
- Alternativa: pedir autorização ao Видавничий відділ УПЦ (Saltério 2023) e aos tradutores EUM.
- A tradução Kulish–Puliui (domínio público) é protestante e de numeração hebraica (§2.2); serve apenas de referência lexical.

### 1.3 Inglês (uso ROC/ROCOR)

| Obra | Dados | Conteúdo | Estatuto | Ref. |
|---|---|---|---|---|
| **Hapgood, *Service Book of the Holy Orthodox-Catholic Apostolic (Greco-Russian) Church*** | Boston, Houghton Mifflin, **1906**; traduzido «from the old Church-Slavonic service books of the Russian church», cotejado com os gregos; 2.ª ed. revista, Nova Iorque, **1922**, com aval do Patriarca Tikhon (03.11.1921) | Vésperas, Matinas, Liturgias, Mistérios, Molebens, Panikhidas, hinos dos 8 tons, ofícios das festas, «Communion, Prayers in preparation for» | Hapgood † 26.06.1928 → domínio público na UE; HathiTrust classifica o volume de 1906 como «pd» | [45][46][47][48] |
| Traduções do arquimandrita Ephrem (Lash) | Patriarcado Ecuménico; † 14.03.2016 | Grande parte dos ofícios gregos | Protegidas (morte em 2016); termos de uso do site anastasis não verificados (o site não respondeu) | [49] |
| Traduções da OCA (oca.org), de Jordanville/ROCOR e de Holy Transfiguration | — | Modernas | ⚠ PARA CONFIRMAR, caso a caso; presumir © | — |

**Características do Hapgood** (prefácio, OCR [46]):
- lições bíblicas da **KJV**;
- salmos do **Book of Common Prayer**, com numeração hebraica (ex.: «Psalm civ» no início das Vésperas = LXX 103; «Psalm li» = LXX 50);
- a oração de S. Crisóstomo tirada do BCP;
- terminologia própria: «Collect-Hymn (Kondak)», «Birth-giver of God», «Assumption (Falling Asleep)», «Molieben»/«Prayer Service», «Te Deum» [46].
→ Não serve como texto de base para uma app moderna fiel à LXX (dec. 17–18). Serve como **fonte em domínio público de redação litúrgica** e para os tropários das festas.

**Conclusão EN:** tradução própria a partir do eslavo/grego, com terminologia ROC/ROCOR (§3); salmos a partir da LXX (Brenton como referência, §2.3).

### 1.4 Matriz por texto e língua

| Texto | RU | UK (IOU) | EN | Ação |
|---|---|---|---|---|
| Orações da manhã e da noite | Zaionchkovsky 1912 (domínio público, ref.) [2] | Blagovist (©) [22] | ⚠ Hapgood não contém o Molitvoslov privado completo (não confirmado no índice [46]) | Tradução própria |
| Regra / Ofício da Comunhão | Svirelin 1894 ⚠ [1]; Zaionchkovsky ⚠ | Blagovist «Послідування до Причастя» (©) [22] | Hapgood «Prayers in preparation for Communion» (domínio público) [46] | Tradução própria; Hapgood como referência |
| Saltério | Sinodal 1876 (domínio público; base massorética) [5]; Yungerov (LXX, domínio público ⚠) [4][9] | Saltério IOU 2023 (©) [12] | Brenton LXX (domínio público) [38] | Tradução própria a partir da LXX/eslavo (dec. 17) |
| Símbolo da Fé | ⚠ não há texto russo «oficial» (o RU litúrgico é o eslavo) | Blagovist «Українською» (©) [23] | Hapgood (domínio público) [46] | Tradução própria (dec. 7) |
| Tropários/condácios das festas | Uspensky 1911 ⚠; Lovyagin 1888 (Octoeco) ⚠ [1] | Blagovist (©) [22] | Hapgood (domínio público) [46] | Tradução própria |

---

## 2. Bíblias

### 2.1 Russo

- **Sinodal** («Синодальный перевод»):
  - aprovado pelo Santo Sínodo «для домашнего (не богослужебного) чтения» [4][5];
  - Evangelhos 1860, NT 1862, Bíblia completa **1876** [5];
  - AT canónico traduzido do **massorético**, com acrescentos da LXX entre parênteses; os 10 livros não canónicos traduzidos do grego, exceto **3 Esdras** (da Vulgata) [5];
  - 50 livros do AT, como a Bíblia isabelina [5].
  - Licença: CrossWire `RusSynodal` e eBible `russyn` dão «Public Domain» [29][41]. A edição «Licht im Osten» (`RusSynodalLIO`) tem ortografia e correções próprias, «Copyright remains with LiO» → **não usar** [34].
  - Revisões da Moscovo-Patriarquia (1956, 1968…) [5]: usar o texto de 1876/1917 e não uma revisão moderna anotada.
- **Arquimandrita Makarii (Glukharev)** — Pentateuco, tradução de 1825 (CrossWire `RusMakarij`, domínio público) [37].
- **Yungerov** — AT sobretudo a partir da LXX (1908–1917) [4]; domínio público (autor † 1921 [9]); ⚠ não se encontrou edição eletrónica com licença declarada.
- **Kassian (Bezobrazov)** — NT 1953–1965, sobre Nestle–Aland [4]; protegido. **RBO** — Bíblia 2011 [4]; protegida.

### 2.2 Ucraniano

- **Kulish–Puliui–Nechui-Levytsky**:
  - Bíblia completa publicada em Viena, **1903**, reeditada pela British and Foreign Bible Society **sem** os livros não canónicos [42];
  - eBible `ukr1871` («Біблія в пер. П. Куліша та І. Пулюя, 1905») e CrossWire `UkrKulish` (NT 1871) dão domínio público [31][40];
  - salmos com numeração **hebraica** na edição eBible (Sl 23 = «Господь пастирь мій») [40];
  - ortografia pré-moderna («сьвіт», «життє»).
- **Ohiyenko (metropolita Ilarion)** — tradução feita 1917–1940; Bíblia completa em Londres, **1962** [42].
  - ⚠ PARA CONFIRMAR — direitos: o CrossWire diz «Public Domain» («Переклад Івана Огієнка 1930») [30]. Mas o autor morreu em 1972, e com vida + 70 anos o texto só ficaria livre em 2043. Os direitos da edição de 1962 (Bible Society) não foram esclarecidos.
  - ⚠ PARA CONFIRMAR — cânone: o *Bibliological Dictionary* de A. Men diz que inclui os livros não canónicos [42]; o módulo eletrónico tem só 66 livros [43].
  - ⚠ Numeração dos salmos: nos módulos eletrónicos pode ter sido remapeada para a versificação «Synodal» do SWORD — por isso o Sl 22 aparece como «Господь — то мій Пастир» [43]. Verificar na edição impressa.
- **Khomenko** (católico, Roma, 1963) e **Kobrin** (Varsóvia, 1936, **a partir da LXX**) [42]: estatuto ⚠ não verificado.
- **IOU**:
  - Saltério 2023 (numeração LXX, ©) [12];
  - NT EUM (©, tradutores) [14];
  - ⚠ PARA CONFIRMAR: não se encontrou Bíblia ucraniana completa aprovada pela IOU.

### 2.3 Inglês

- **Brenton** — «Translation of the Greek Septuagint into English by Sir Lancelot Charles Lee Brenton. Published in 1851, and now in the Public Domain» (eBible `eng-Brenton`) [38].
  - Numeração LXX: na eBible, «Psalm 23:1» = «A Psalm for David on the first day of the week. The earth is the Lord's…», ou seja, LXX 23 = TM 24, com o título no v. 1 [38].
  - ⚠ PARA CONFIRMAR: a edição de 1844 (só inglês) referida no pedido; a eBible dá 1851.
- **Updated Brenton** (`englxxup`) — atualização ortográfica com apócrifos; «CC0 Public Domain dedication on language updates by Adam Boyd in 2020» [39]. Recomendado como referência EN da LXX.
- **KJV / KJVA** — CrossWire: «The rights to the base text are held by the Crown of England» [32]. Domínio público fora do Reino Unido; ⚠ PARA CONFIRMAR o efeito da *Crown patent* numa PWA distribuída também no Reino Unido. Tradução do TM (cânone e numeração protestantes); a KJVA inclui os «Apocrypha» [32].
- **Douay–Rheims (Challoner)** — a partir da Vulgata, domínio público [35]. Numeração dos salmos da Vulgata = LXX (doc. 03 §6.3.4). Origem católica (B8).
- **LXX grega** — o módulo CrossWire `LXX` (Rahlfs, CCAT) é «Copyrighted; Free non-commercial distribution» [36] → não serve de base (dec. 17 exige edição em domínio público, p. ex. Swete; doc. 03).

### 2.4 Cânone e numeração — quadro de compatibilidade com a dec. 18

| Bíblia | Língua | Cânone AT | Numeração dos salmos | Título = versículo? | Licença | Ref. |
|---|---|---|---|---|---|---|
| Isabelina (texto de comparação) | CS | Completo, eslavo (inclui não canónicos e Sl 151) | LXX | Sim | Domínio público (CSlElizabeth, ortografia modernizada) | [33]; doc. 03 §6.3 |
| Sinodal 1876 | RU | 78 livros na edição eletrónica (inclui 1–3 Mac, 2–3 Esd) | LXX | Sim (Sl 50: título = vv. 1–2) | Domínio público | [5][29][44] |
| Kulish–Puliui 1903/1905 | UK | Protestante (sem não canónicos) | Hebraica | ⚠ | Domínio público | [40][42] |
| Ohiyenko 1962 | UK | ⚠ (66 livros na edição eletrónica) | ⚠ | ⚠ | ⚠ | [30][42][43] |
| Saltério IOU 2023 | UK | só Saltério | LXX | ⚠ | © | [12] |
| Brenton 1851 / Updated | EN | LXX + apócrifos | LXX | Título no v. 1 | Domínio público / CC0 | [38][39] |
| KJV(A) | EN | Protestante (+ Apocrypha) | Hebraica | Não | Domínio público (⚠ Crown, Reino Unido) | [32] |
| Hapgood (salmos do BCP) | EN | — | Hebraica | — | Domínio público | [46] |

→ Para os textos que a app mostra (leituras, Saltério), a **chave canónica é LXX/eslava** (doc. 03 §6.5.5). As Bíblias de numeração hebraica (Kulish, KJV, Hapgood) exigem a tabela de correspondência versículo a versículo.

---

## 3. Terminologia — glossário de 4 línguas + eslavo

### 3.0 Convenções e diferenças entre fontes

**Ucraniano: IOU vs. OCU**

| Traço | IOU (usar) | OCU / norma civil | Ref. |
|---|---|---|---|
| Nome de Jesus | Іісус («Господа Іісуса Христа») | Ісус («Господа Ісуса Христа») | [16][22] / [26] |
| João | Іоанн (Іоанна Богослова, Іоанна Предтечі) | Іоан (Іоана Богослова) | [16][18] / [25] |
| «evangelista» | євангеліст | євангелист | [16] / [25] |
| Calendário | Juliano, datas «за старим і (новим) стилем» | Novo-juliano para as festas fixas desde 01.09.2023 (as comunidades podem manter o antigo) | [18] / [27] |
| Abreviaturas do Menológio | прп., свт., сщмч., вмч., блгв., стртп., безср. | ⚠ não comparado | [20] |

Nota: os títulos de notícias da IOU são escritos em ucraniano moderno («Предстоятель очолив…»), mas mantêm os nomes de forma eslava («Іоанна Кронштадтського», «Феодосія Печерського») [89][92].

**Inglês: ROC/ROCOR vs. OCA/grego**

| Festa / termo | ROC/ROCOR (usar) | OCA | Grego/outros | Ref. |
|---|---|---|---|---|
| 21.11 | Entry of the (Most Holy) Theotokos into the Temple | «Entrance…» [50]; «Entry of the Most Holy Mother of God» [62] | «Presentation of the Theotokos» | [71][75][78] |
| 14.09 | Exaltation of the Cross; «Universal Exaltation (Elevation)…» | «Elevation of the Cross» [50]; «Universal Exaltation…» [59] | «Elevation» ⚠ | [73][75] |
| 01.10 | Protection of the Mother of God / of the Most Holy Theotokos | idem [60] | — (festa sobretudo russa [72]) | [72] |
| 02.02 | Meeting (Presentation) of Our Lord | «Meeting of the Lord» [50][61] | «Presentation»/«Hypapante» ⚠ | [75] |
| 06.01 | Theophany | «Epiphany» [50] e «Theophany» [58] | ⚠ | [58] |
| Datas | duplas: «October 1/14» | calendário revisto: S. Sérgio a **25.09 civil** [51] (IOR: 25.09 EA = 08.10 EN [79]) | — | [72] |
| Kyiv/Kiev | ⚠ | «Kiev Caves» [52][64] | — | → DECISÃO (§4) |
| Grau sacerdotal | Archpriest; «protopresbyter» é grau superior no uso eslavo | — | no uso grego, Protopresbyter = Archpriest | [77] |

**Legenda da tabela de glossário:**
- CS «=» quer dizer igual ao RU (em escrita civil, decisão B3);
- **⚠** = forma não atestada nas fontes da IOU (UK) ou ROC/ROCOR/OCA (EN) consultadas — proposta a verificar;
- as formas PT-PT seguem o doc. 04 §7, o doc. 01 e as decisões B4/C5.

### 3.1 Festas

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 1 | Páscoa (Ressurreição de Cristo) | Пасха; Светлое Христово Воскресение | Пасха Христова; Світле Христове Воскресіння | Pascha / Holy Pascha | = | [18][22][50] |
| 2 | Domingo de Ramos (Entrada em Jerusalém) | Вход Господень в Иерусалим | Вхід Господній до Єрусалима; Вербна неділя | Entry of the Lord into Jerusalem / Palm Sunday | Неделя ваий | [18][114][75]; doc. 01 |
| 3 | Ascensão | Вознесение Господне | Вознесіння Господнє | Ascension of our Lord | = | [18][75] |
| 4 | Pentecostes / Santíssima Trindade | День Святой Троицы. Пятидесятница | День Святої Трійці. П'ятидесятниця | Holy Pentecost / Trinity Sunday | = | [18][75] |
| 5 | Natividade de Cristo | Рождество Христово | Різдво Христове | Nativity of Christ | = | [18][50] |
| 6 | Teofania (Batismo do Senhor) | Богоявление; Крещение Господне | Хрещення Господнє (pop. Водохреща) | Theophany | = | [18][19][58] |
| 7 | Apresentação do Senhor (Encontro) | Сретение Господне | Стрітення Господнє | Meeting (Presentation) of Our Lord | = | [18][75]; doc. 01 |
| 8 | Anunciação | Благовещение Пресвятой Богородицы | Благовіщення Пресвятої Богородиці | Annunciation of the Most Holy Theotokos | = | [18][75] |
| 9 | Transfiguração | Преображение Господне | Преображення Господнє | Transfiguration of Our Lord | = | [18][75] |
| 10 | Dormição da Mãe de Deus | Успение Пресвятой Богородицы | Успіння Пресвятої Богородиці | Dormition of the Theotokos | = | [18][75] |
| 11 | Natividade da Mãe de Deus | Рождество Пресвятой Богородицы | Різдво Пресвятої Богородиці | Nativity of the Theotokos | = | [18][75] |
| 12 | Exaltação da Cruz | Воздвижение Креста Господня | Воздвиження Хреста Господнього | Exaltation of the Cross | = | [18][73] |
| 13 | Apresentação da Mãe de Deus no Templo | Введение во храм Пресвятой Богородицы | Введення у храм Пресвятої Богородиці | Entry of the Theotokos into the Temple | = | [18][71] |
| 14 | Circuncisão do Senhor | Обрезание Господне | Обрізання Господнє | Circumcision of the Lord ⚠ | = | [18] |
| 15 | Natividade de S. João Batista | Рождество Иоанна Предтечи | Різдво Іоанна Предтечі | Nativity of St John the Forerunner ⚠ | = | [18] |
| 16 | Santos Apóstolos Pedro e Paulo | свв. первоверховных апостолов Петра и Павла | святих первоверховних апостолів Петра і Павла | Holy Chief Apostles Peter and Paul ⚠ | = | [18] |
| 17 | Degolação de S. João Batista | Усекновение главы Иоанна Предтечи | Усікновіння глави Іоанна Предтечі | Beheading of the … Forerunner and Baptist John | = | [18][66] |
| 18 | Proteção (Pokrov) da Mãe de Deus | Покров Пресвятой Богородицы | Покров Пресвятої Богородиці | Protection of the Mother of God | = | [18][95][72] |
| 19 | Doze Grandes Festas | двунадесятые праздники | дванадесяті свята | Twelve Great Feasts ⚠ | = | [18] |
| 20 | Grandes festas | великие праздники | великі свята | Great Feasts ⚠ | = | [18] |
| 21 | Pré-festa | предпразднство | передсвято ⚠ | Forefeast | = | [58][65] |
| 22 | Pós-festa | попразднство | післясвято ⚠ | Afterfeast | = | [69] |
| 23 | Despedida da festa | отдание праздника | віддання свята ⚠ | Leavetaking ⚠ | = | doc. 01 |
| 24 | Antipascha (Domingo de Tomé) | Антипасха | Антипасха | Antipascha / Thomas Sunday ⚠ | = | [99] |
| 25 | Meio-Pentecostes | Преполовение Пятидесятницы | Переполовення П'ятидесятниці ⚠ | Mid-Pentecost ⚠ | = | doc. 01 |
| 26 | Todos os Santos da terra russa | Неделя всех святых, в земле Российской просиявших | ⚠ | Sunday of All Saints of Russia ⚠ | = | doc. 01 |

### 3.2 Calendário, tempos e jejum

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 27 | Estilo antigo (juliano) / estilo novo | старый стиль / новый стиль | старий стиль / новий стиль | Old Style / New Style («October 1/14») | — | [18][72] |
| 28 | Calendário novo-juliano (revisto) | новоюлианский календарь | новоюліанський календар | Revised Julian ⚠ | — | [27] |
| 29 | Pascália | Пасхалия | Пасхалія | Paschalion ⚠ | = | [18] |
| 30 | Semana (litúrgica) | седмица | седмиця | Week | = | [19][24] |
| 31 | N.º domingo depois do Pentecostes | Неделя N-я по Пятидесятнице | Неділя N-а після П'ятидесятниці | Nth Sunday after Pentecost ⚠ | Неделя | [79][95] |
| 32 | Tom | глас | глас | Tone ⚠ | = | [24] |
| 33 | Jejum | пост | піст | fast | = | [19][69] |
| 34 | Grande Quaresma | Великий пост | Великий піст | Great Lent | Святая Четыредесятница ⚠ | [19][115][69] |
| 35 | Jejum dos Apóstolos | Петров пост | Петрів піст | Apostles' Fast | = | [19][116][69] |
| 36 | Jejum da Dormição | Успенский пост | Успенський піст | Dormition Fast | = | [19][69] |
| 37 | Jejum da Natividade | Рождественский пост | Різдвяний піст | Nativity Fast | = | [19][69] |
| 38 | Semana Santa | Страстная седмица | Страсна седмиця ⚠ (cf. «12 Страсних Євангелій») | Holy Week | = | [111][50] |
| 39 | Semana Luminosa | Светлая седмица | Світла седмиця | Bright Week | = | [19][69] |
| 40 | Semana contínua (sem jejum de quarta e sexta) | сплошная седмица | ⚠ | fast-free week | = | [86][69] |
| 41 | Semana do queijo (Máslenitsa) | Сырная седмица, Масленица | Масниця | Cheesefare Week ⚠ | = | [19] |
| 42 | Domingo «de carne» (do Juízo Final) | Неделя мясопустная | ⚠ (Субота м'ясопусна = sábado) | Meatfare Sunday | = | [21][70] |
| 43 | Domingo do Perdão | Прощёное воскресенье | Прощена неділя ⚠ | Forgiveness Sunday / Cheesefare Sunday | = | [70] |
| 44 | Sábados de sufrágio pelos defuntos | родительские субботы | Субота м'ясопусна / Троїцька / Димитріївська | Memorial Saturdays ⚠ | = | [21] |
| 45 | Radonitsa | Радоница | Радониця | Radonitsa ⚠ | = | [21][117] |
| 46 | Véspera (Sotchelnik) | сочельник | Святвечір; Хрещенський святвечір | Eve of Theophany | навечерие | [19][69] |
| 47 | Xerofagia | сухоядение | ⚠ | xerophagy («dry eating») | = | [69] |
| 48 | Comida quente sem azeite | горячая пища без масла | гаряча їжа без масла | ⚠ (o EN usa «wine and oil» como nível) | — | [19] |
| 49 | Comida com azeite | горячая пища с растительным маслом | гаряча їжа, заправлена маслом | wine and oil | — | [19][69] |
| 50 | Peixe permitido | разрешается рыба | дозволено рибу | fish | — | [19][69] |
| 51 | Sem jejum | поста нет | ⚠ | fast-free | — | [79][69] |

### 3.3 Ofícios, livros e hinografia

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 52 | Divina Liturgia | Божественная литургия | Божественна літургія | Divine Liturgy | = | [100][75] |
| 53 | Liturgia de S. Basílio Magno | Литургия свт. Василия Великого | Літургія святителя Василія Великого ⚠ | Liturgy of St Basil the Great ⚠ | = | [126] |
| 54 | Liturgia dos Dons Pré-santificados | Литургия Преждеосвященных Даров | Літургія Передосвячених Дарів | Liturgy of the Presanctified Gifts | = | [113][50] |
| 55 | Vigília (de toda a noite) | всенощное бдение | всенічне бдіння | All-Night Vigil | = | [99][71] |
| 56 | Vésperas | вечерня | вечірня | Vespers ⚠ | = | [24][112] |
| 57 | Matinas | утреня | утреня | Matins ⚠ | = | [24][111] |
| 58 | Horas | часы | часи | Hours | = | [24][75] |
| 59 | Completas | повечерие | повечір'я ⚠ | Compline | = | [46] |
| 60 | Ofício da Meia-Noite | полунощница | полуношниця ⚠ | Midnight Office ⚠ | = | doc. 04 |
| 61 | Moleben | молебен | молебень | Moleben ⚠ (Hapgood: «Molieben», «Prayer Service») | = | [100][46] |
| 62 | Panikhida | панихида | панахида | Panikhida | = | [101][46] |
| 63 | Acatisto | акафист | акафіст | Akathist ⚠ | = | [102] |
| 64 | Litia | лития | літія ⚠ | Litiya (Hapgood) | = | [46] |
| 65 | Cânone | канон | канон | Canon | = | [24][46] |
| 66 | Ode | песнь | пісня | Ode ⚠ | = | [24] |
| 67 | Hirmos | ирмос | ірмос | Irmos ⚠ | = | [24] |
| 68 | Catavásia | катавасия | катавасія | Katavasia ⚠ | = | [24] |
| 69 | Tropário | тропарь | тропар | Troparion ⚠ | = | [24] |
| 70 | Condácio | кондак | кондак | Kontakion ⚠ (Hapgood: «Collect-Hymn (Kondak)») | = | [24][46] |
| 71 | Ikos | икос | ікос | Ikos ⚠ | = | [24] |
| 72 | Estiquério | стихира | стихира | Sticheron ⚠ | = | [24] |
| 73 | Theotokion | богородичен | Богородичний | Theotokion ⚠ | = | [24] |
| 74 | Prokímenon | прокимен | прокімен | Prokeimenon ⚠ | = | [24] |
| 75 | Sedalen | седален | сідальний | Sessional hymn ⚠ | = | [24] |
| 76 | Exapostilário | светилен | світильний; екзапостиларій | Exapostilarion ⚠ | = | [24] |
| 77 | Laudes | хвалитны | хвалитні псалми | Praises / Lauds ⚠ | = | [24] |
| 78 | Doxologia (grande / quotidiana) | славословие великое / вседневное | славослов'я (повсякденне) | Great Doxology ⚠ | = | [24] |
| 79 | Litania (ectenia) | ектения | єктенія | Litany ⚠ | = | [24] |
| 80 | Catisma | кафизма | кафізма | Kathisma ⚠ | = | [24] |
| 81 | Polieleo | полиелей | полієлей ⚠ | Polyeleos ⚠ | = | doc. 04 |
| 82 | Saltério | Псалтирь | Псалтир | Psalter | = | [12][38] |
| 83 | Horológio | Часослов | Часослов | Horologion ⚠ | = | [24][142] |
| 84 | Octoeco | Октоих | Октоїх | Octoechos ⚠ | = | [24] |
| 85 | Menaia | Минея | Мінея | Menaion ⚠ | = | [24] |
| 86 | Triódio | Триодь постная | Тріодь Пісна | Lenten Triodion ⚠ | = | [142] |
| 87 | Pentecostário | Триодь цветная | Тріодь Квітна | Pentecostarion ⚠ | = | [142] |
| 88 | Typikon | Типикон / Устав | Типікон | Typikon | = | [142][46] |
| 89 | Livro dos ofícios (Sluzhebnik) | Служебник | Служебник | Service Book | = | [142][46] |
| 90 | Trebnik | Требник | Требник | Book of Needs | = | [142][46] |
| 91 | Irmológio | Ирмологий | Ірмологій | Irmologion | = | [142][46] |
| 92 | Apóstolo (livro) | Апостол | Апостол | Apostol ⚠ | = | [142][24] |
| 93 | Livro de orações (Molitvoslov) | Молитвослов | Молитвослов | Prayer Book ⚠ | = | [22] |
| 94 | Orações da manhã | Молитвы утренние | Молитви ранішні | Morning Prayers ⚠ | = | [22] |
| 95 | Orações da noite | Молитвы на сон грядущим | Молитви вечірні | Evening Prayers ⚠ | = | [22] |
| 96 | Ofício para a Sagrada Comunhão | Последование ко Святому Причащению | Послідування до Причастя | Prayers in preparation for Communion | = | [22][46] |
| 97 | Orações de ação de graças | Благодарственные молитвы | Подячні молитви після Святого Причастя | Thanksgiving Prayers ⚠ | = | [22] |
| 98 | Símbolo da Fé | Символ веры | Символ віри | Creed / Symbol of Faith ⚠ | = | [23] |
| 99 | Oração de Jesus | Иисусова молитва | Молитва Іісусова | Jesus Prayer ⚠ | = | [22] |
| 100 | Despedida (fórmula final) | отпуст | відпуст | Dismissal ⚠ | = | [22] |

### 3.4 Mistérios e vida sacramental

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 101 | Mistérios (Sacramentos) | Таинства | Таїнства | Mysteries / Sacraments ⚠ | = | [96] |
| 102 | Batismo | Крещение | Хрещення | Baptism | = | [96][46] |
| 103 | Crismação | Миропомазание | Миропомазання ⚠ | Chrismation | = | [46] |
| 104 | Comunhão (Eucaristia) | Причащение / Евхаристия | Причастя / Євхаристія ⚠ | Holy Communion | = | [96][46] |
| 105 | Confissão | Исповедь / Покаяние | Сповідь | Confession | = | [96][46] |
| 106 | Matrimónio (Coroação) | Венчание / Брак | Вінчання | Matrimony ⚠ | = | [98][46] |
| 107 | Santa Unção | Соборование / Елеосвящение | Соборування (Єлеосвячення ⚠) | Unction ⚠ | = | [97][46] |
| 108 | Ordenação (quirotonia) | хиротония | хіротонія | Ordination ⚠ | = | [124] |
| 109 | Antimínsio | антиминс | антимінс | Antimension ⚠ | = | [103] |
| 110 | Relíquias | мощи | мощі | Relics ⚠ | = | [123] |
| 111 | Glorificação (canonização) | прославление | прославлення у лику святих | Glorification ⚠ | = | [121] |
| 112 | Tonsura monástica | постриг | чернечий постриг; постриг у мантію | Tonsure | = | [118][46] |

### 3.5 Clero e monaquismo

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 113 | Patriarca | патриарх | патріарх (патр.) | Patriarch | = | [20] |
| 114 | Metropolita | митрополит | митрополит (митр.) | Metropolitan | = | [20] |
| 115 | Arcebispo | архиепископ | архієпископ (архієп.) | Archbishop | = | [20] |
| 116 | Bispo | епископ | єпископ (єп.) | Bishop | = | [20] |
| 117 | Arquimandrita | архимандрит | архімандрит (архім.) | Archimandrite | = | [20][104] |
| 118 | Igúmeno | игумен | ігумен (ігум.) | Hegumen / Abbot | = | [20][77] |
| 119 | Hieromonge | иеромонах | ієромонах | Hieromonk ⚠ | = | [105] |
| 120 | Arquipresbítero | протоиерей | протоієрей | Archpriest | = | [110][77] |
| 121 | Protopresbítero | протопресвитер | протопресвітер ⚠ | Protopresbyter (grau superior, no uso eslavo) | = | [77] |
| 122 | Presbítero / sacerdote | иерей / священник / пресвитер | ієрей / священик ⚠ / пресвітер (пресвіт.) | Priest | = | [20] |
| 123 | Protodiácono | протодиакон | протодиякон | Protodeacon ⚠ | = | [107] |
| 124 | Diácono | диакон | диякон (дияк.) | Deacon | = | [20][76] |
| 125 | Hierodiácono | иеродиакон | ієродиякон | Hierodeacon ⚠ | = | [106] |
| 126 | Subdiácono | иподиакон | іподиякон | Subdeacon ⚠ | = | [108] |
| 127 | Leitor | чтец | читець ⚠ | Reader ⚠ | = | — |
| 128 | Monge / monja | монах / монахиня | чернець, монах ⚠ / монахиня | Monk / Nun | = | [12][118] |
| 129 | Esquimonge / esquima | схимонах / схима | схимонах ⚠, схимонахиня; схиігуменя | Schemamonk ⚠ | = | [125][109] |

### 3.6 Categorias de santos (abreviaturas do Menológio)

| # | PT-PT (C5) | RU (abrev.) | UK (IOU) (abrev.) | EN (ROC/ROCOR/OCA) | CS | Ref. |
|---|---|---|---|---|---|---|
| 130 | Apóstolo | апостол (ап.) | апостол (ап.) | Apostle | = | [20][68] |
| 131 | Igual aos Apóstolos | равноапостольный (равноап.) | рівноапостольний | Equal-to-the-Apostles / «Equal of the Apostles» | = | [80][93][63][55] |
| 132 | Profeta | пророк (прор.) | пророк (прор.) | Prophet | = | [20][67] |
| 133 | Precursor | Предтеча | Предтеча | Forerunner | = | [18][66] |
| 134 | Mártir | мученик (мч.) | мученик (мч.) | Martyr | = | [20][52] |
| 135 | Grande-mártir | великомученик (вмч.) | великомученик (вмч.) | Greatmartyr (OCA, numa palavra) / Great Martyr ⚠ | = | [20][84][88][54] |
| 136 | Hieromártir | священномученик (сщмч.) | священномученик (сщмч.) | Hieromartyr | = | [20][24][52] |
| 137 | Monge-mártir | преподобномученик (прмч.) | преподобномученик (прмч.) | Venerable Martyr (ROCOR) / Monastic Martyr (OCA) | = | [20][74][59] |
| 138 | Confessor | исповедник (исп.) | сповідник (спов.) | Confessor ⚠ | = | [20][79] |
| 139 | Venerável | преподобный (прп.) | преподобний (прп.) | Venerable | = | [20][90][51][74] |
| 140 | Santo hierarca | святитель (свт.) | святитель (свт.) | Saint … Bishop/Archbishop of … | = | [20][91][57] |
| 141 | Justo | праведный (прав.) | праведний (прав.) | Righteous | = | [20][89][58] |
| 142 | Portador da paixão | страстотерпец (стртп.) | страстотерпець (стртп.) | Passion-Bearer | = | [20][120][53] |
| 143 | Louco por Cristo / bem-aventurado | Христа ради юродивый; блаженный (блж.) | Христа ради юродивий; блаженний (блж.) | Fool-for-Christ ⚠ / Blessed | = | [20][119][63] |
| 144 | Anárgiro | бессребреник | безсрібник (безср.) | Unmercenary | = | [83][20][94][56] |
| 145 | Fiel (príncipe) | благоверный (блгв.) | благовірний (блгв.) | Right-believing ⚠ / «Holy Great Prince» | = | [20][55] |
| 146 | Taumaturgo | чудотворец | чудотворець | Wonderworker | = | [79][91][51][57] |
| 147 | Teólogo | Богослов | Богослов | Theologian | = | [85][16][68] |

### 3.7 Templo

| # | PT-PT | RU | UK (IOU) | EN (ROC/ROCOR) | CS | Ref. |
|---|---|---|---|---|---|---|
| 148 | Templo / igreja | храм | храм | church / temple ⚠ | = | [28][87] |
| 149 | Santuário (altar) | алтарь | вівтар | Altar / Sanctuary ⚠ | олтарь ⚠ | [28] |
| 150 | Santa Mesa | престол | престол | Holy Table ⚠ | = | [28] |
| 151 | Prótese (mesa) | жертвенник | жертовник | Table of Oblation ⚠ | = | [28] |
| 152 | Iconóstase | иконостас | іконостас | Iconostasis ⚠ | = | [28] |
| 153 | Portas Reais | Царские врата | Царські врата | Royal Doors ⚠ | = | [28][122] |
| 154 | Portas diaconais | диаконские двери | дияконські врата | Deacons' Doors ⚠ | = | [28] |
| 155 | Soleia / Ambão | солея / амвон | солея / амвон ⚠ | Solea / Ambo ⚠ | = | doc. 08 |
| 156 | Coros laterais | клирос | клірос ⚠ | Kliros / choir ⚠ | = | doc. 08 |
| 157 | Nave | средняя часть храма | середня частина храму | Nave ⚠ | — | [28] |
| 158 | Nártex | притвор | притвор | Narthex ⚠ | = | [28] |
| 159 | Turíbulo | кадило | кадило | Censer ⚠ | = | [28] |

### 3.8 Vestes litúrgicas

| # | PT-PT (doc. 08, B4) | RU | UK (IOU) | EN (ROC/ROCOR) | Ref. |
|---|---|---|---|---|---|
| 160 | Esticário | стихарь | стихар | Sticharion | [138][76][139] |
| 161 | Orário | орарь | орар ⚠ | Orarion | [138][76] |
| 162 | Punhos | поручи | поручі ⚠ | Epimanikia (cuffs) | [138][76] |
| 163 | Epitraquélio | епитрахиль | єпитрахиль ⚠ | Epitrachelion | [138][76] |
| 164 | Cinto | пояс | пояс ⚠ | Zone | [138][76] |
| 165 | Felónio | фелонь | фелонь ⚠ | Phelonion | [138][76] |
| 166 | Nabedrennik (prémio; só tradição eslava) | набедренник | набедреник ⚠ | Nabedrennik | [138][76] |
| 167 | Epigonátio (palitsa) | палица | палиця ⚠ | Epigonation / Palitsa | [138][76] |
| 168 | Sakkos | саккос | саккос ⚠ | Sakkos | [138][76] |
| 169 | Omofório | омофор | омофор | Omophorion | [138][76][140] |
| 170 | Mitra | митра | митра ⚠ | Mitre | [138][76] |
| 171 | Panágia | панагия | панагія ⚠ | Panagia / Engolpion | [138][76] |
| 172 | Cruz peitoral | наперсный крест | наперсний хрест ⚠ | Pectoral cross | [138][76] |
| 173 | Kamilavka | камилавка | камилавка ⚠ | Kamilavka | [138][76] |
| 174 | Skufia | скуфья | скуфія ⚠ | Skufia | [138][76] |
| 175 | Klobuk / Mantia | клобук / мантия | клобук ⚠ / мантія | Klobuk / Mantiya | [138][76][141] |

Notas:
- Ponto de partida para validar os ⚠ ucranianos de §3.7–3.8: o texto ucraniano da Lei de Deus em [28] (vocabulário do templo) e a lista de livros litúrgicos do Blagovist [142]. → Validação final por um clérigo da IOU (sugestão).
- Os itens EN marcados ⚠ (Matins, Vespers, Troparion, Kontakion…) são as formas correntes em inglês, mas não foram verificados numa fonte ROC/ROCOR desta ronda. A 2.ª ronda (dec. 9) deve confirmá-los no *Jordanville Prayer Book* ou num calendário da ROCOR.

---

## 4. Nomes dos santos — convenções por língua

**Regras**

1. **RU:** forma do **Menológio/Месяцеслов**, não a forma civil.
   - Exemplos: «Иоанн» (não «Иван»), «Георгий», «Сергий», «Феодор», «Алексий».
   - Datas: «Прп. Сергия, игумена Радонежского» (25.09 EA = 08.10 EN) [79]; «Вмч. Георгия Победоносца» (06.05 EN) [84]; «св. прав. Иоанна Кронштадтского» [82]; «Сщмчч. … Феодора Лебедева» [79].
   - Os nomes de batismo inscrevem-se na forma eclesiástica: «записывается именно как Иоанн, независимо от того, называют ли его в миру Иваном» (resumo de pesquisa; ⚠ fonte jornalística).
2. **UK (IOU):** formas eslavas adaptadas à ortografia ucraniana.
   - Exemplos: «преподобного Сергія Радонезького» [87], «вмч. Георгія Побідоносця» [88], «праведного Іоанна Кронштадтського» [89], «преподобного Серафима Саровського» [90], «свт. Миколая Чудотворця» [91], «преподобного Феодосія Печерського» [92], «рівноапостольного князя Володимира» [93], «безсрібників Косми і Даміана» [94], «Іоанна Предтечі» [18].
   - A OCU escreve «Іоана Богослова» [25]; o ucraniano civil corrente usa «Іван», «Юрій» (⚠ não verificado nesta ronda).
3. **EN (ROC/ROCOR):** forma inglesa tradicional + categoria + topónimo.
   - Exemplos: «Venerable Sergius of Radonezh» [74]; «Repose of Venerable Seraphim, Wonderworker of Sarov» [58]; «Saint Nicholas the Wonderworker, Archbishop of Myra in Lycia» [57]; «Greatmartyr, Victory-bearer, and Wonderworker George» [54]; «Holy Great Prince Vladimir (Basil in Baptism), Equal of the Apostles, and Enlightener of Rus'» [55]; «Martyrs and Passion-Bearers Boris and Gleb» [53]; «Venerable Theodosius, Abbot of the Kiev Far Caves Monastery» [64]; «Holy Apostle and Evangelist John the Theologian» [68]; «Holy, Glorious Prophet Elijah» [67]; «Venerable Martyrs Grand Duchess Elizabeth Feodorovna and Nun Barbara» [74].
4. **PT-PT:** forma portuguesa tradicional (dec. 19): Sérgio de Radonej, Serafim de Sarov, Nicolau, Jorge, Vladimiro, Teodósio, João o Teólogo, Elias. ⚠ As formas dos topónimos russos (Radonej/Radonezh) seguem o doc. 05.

**Exemplos por categoria (4 línguas + eslavo)**

| Categoria | PT-PT | RU | UK (IOU) | EN | Ref. |
|---|---|---|---|---|---|
| Venerável | S. Sérgio de Radonej | прп. Сергий Радонежский | прп. Сергій Радонезький | Venerable Sergius of Radonezh | [79][87][74] |
| Venerável | S. Serafim de Sarov | прп. Серафим Саровский | прп. Серафим Саровський | Venerable Seraphim of Sarov | [81][90][58] |
| Venerável (Kyiv) | S. Teodósio das Grutas | прп. Феодосий Печерский | прп. Феодосій Печерський | Venerable Theodosius of the Kiev Caves | [92][64] |
| Grande-mártir | S. Jorge, o Vitorioso | вмч. Георгий Победоносец | вмч. Георгій Побідоносець | Greatmartyr George | [84][88][54] |
| Santo hierarca | S. Nicolau Taumaturgo | свт. Николай Чудотворец | свт. Миколай Чудотворець | St Nicholas the Wonderworker | [91][57] |
| Justo | S. João de Kronstadt | прав. Иоанн Кронштадтский | прав. Іоанн Кронштадтський | ⚠ Righteous John of Kronstadt | [82][89] |
| Igual aos Apóstolos | S. Vladimiro | равноап. кн. Владимир | рівноап. князь Володимир | Equal-to-the-Apostles Vladimir | [80][93][55] |
| Portadores da paixão | Ss. Boris e Gleb | стртпп. Борис и Глеб | стртпп. Борис і Гліб | Passion-Bearers Boris and Gleb | [120][53] |
| Anárgiros | Ss. Cosme e Damião | бессрр. Косма и Дамиан (Асийские) | безсрр. Косма і Даміан | Unmercenaries Cosmas and Damian | [83][94][56] |
| Apóstolo | S. João Teólogo | ап. Иоанн Богослов | ап. Іоанн Богослов | Apostle John the Theologian | [85][16][68] |

Notas:
- A OCA chama aos santos Cosme e Damião de 1 de novembro «of Mesopotamia» [56]; a IOR chama-lhes «Асийские» [83]. → A forma EN de cada santo verifica-se na fonte ROC/ROCOR, não só na OCA.
- → **DECISÃO DO UTILIZADOR**: topónimos ucranianos em inglês — «Kiev Caves» (forma tradicional OCA [52][64]) ou «Kyiv Caves» (forma oficial atual da Ucrânia)? Recomenda-se manter as formas litúrgicas nos títulos dos santos e usar «Kyiv» na interface (⚠ política editorial).

---

## 5. Interface e i18n

### 5.1 Plurais (CLDR 47)

| Locale | Categorias cardinais | Regra (CLDR, *v* = n.º de casas decimais visíveis) | Exemplos (medição Node/ICU 77) | Ref. |
|---|---|---|---|---|
| `ru`, `uk` | one, few, many, other | **one**: v=0 ∧ i%10=1 ∧ i%100≠11 · **few**: v=0 ∧ i%10=2..4 ∧ i%100≠12..14 · **many**: v=0 ∧ (i%10=0 ∨ i%10=5..9 ∨ i%100=11..14) · **other**: decimais | 0→many, 1→one, 2–4→few, 5→many, 11–14→many, 21→one, 22→few, 1,5→other | [127] |
| `pt-PT` | one, many, other | **one**: i=1 ∧ v=0 · **many**: milhões exatos/notação compacta | 0→**other** (≠ `pt`: 0→one), 1→one, 1 000 000→many | [127] |
| `en` | one, other | one: i=1 ∧ v=0 | — | [127] |

- **Ordinais:**
  - `uk` tem «few» para 3, 23, 33… (n%10=3 ∧ n%100≠13) [128];
  - `ru` e `pt` só têm «other» [128];
  - `en` tem one/two/few/other [128].
  O ordinal ucraniano da categoria few existe, mas o sufixo («3-й», «3-я») depende do género e do caso; não se resolve com regras plurais. → Formular sempre os ordinais por extenso em cada língua, com mensagens próprias.
- **Implementação:**
  - usar `Intl.PluralRules` (nativo, 0 KB) com mensagens com chaves `one/few/many/other`;
  - em `pt-PT` fornecer também `many` (cai em `other` quando não fornecido; recomenda-se só `one/other` + `many` = `other`);
  - nunca usar a lógica «n === 1».

### 5.2 Datas e números (Intl, CLDR 47 — medição própria em 07.01.2027)

| Locale | short | medium | long | full | Dia + mês | 1.º dia da semana (CLDR) | Números |
|---|---|---|---|---|---|---|---|
| `pt-PT` | 07/01/27 | 07/01/2027 | 7 de janeiro de 2027 | quinta-feira, 7 de janeiro de 2027 | 7 de janeiro | domingo (7) | 1 234 567,89 (NBSP U+00A0) |
| `uk` | 07.01.27 | 7 січ. 2027 р. | 7 січня 2027 р. | четвер, 7 січня 2027 р. | 7 січня (genitivo); mês isolado «січень» | segunda (1) | 1 234 567,89 (U+00A0) |
| `ru` | 07.01.2027 | 7 янв. 2027 г. | 7 января 2027 г. | четверг, 7 января 2027 г. | 7 января (genitivo); isolado «январь» | segunda (1) | 1 234 567,89 (U+00A0) |
| `en-GB` | 07/01/2027 | 7 Jan 2027 | 7 January 2027 | Thursday, 7 January 2027 | 7 January | segunda (1) | 1,234,567.89 |
| `en`/`en-US` | 1/7/27 | Jan 7, 2027 | January 7, 2027 | Thursday, January 7, 2027 | January 7 | domingo (7) | 1,234,567.89 |

Fonte: valores de `Intl.DateTimeFormat`/`Intl.NumberFormat`/`Intl.Locale` no Node 22.22 (ICU 77.1, CLDR 47) — medição própria; os dados de semana vêm do `supplementalData.xml` da CLDR [129].

Notas de implementação:
- **Datas duplas EA/EN** (dec. 2): formatar com `{day:'numeric', month:'long'}`. Em RU/UK o mês sai no **genitivo** («7 января», «7 січня»), correto para «25 декабря / 7 января». Para o mês isolado (cabeçalhos de calendário) usar `month:'long'` **sem** dia, que dá o nominativo («январь», «січень»).
- **Ano juliano:** `Intl` não tem calendário juliano. O cálculo é próprio (dec. 8) e só se usa `Intl` para os nomes. Atenção: formatar uma data juliana como objeto `Date` gregoriano dá o dia errado → formatar os componentes (dia, mês) com mensagens próprias ou com `formatToParts` sobre uma data gregorianizada «falsa» do mesmo dia/mês (⚠ testar casos de 29 de fevereiro juliano).
- **Inglês:** → **DECISÃO DO UTILIZADOR**: `en-GB` (dd/mm, segunda-feira; mais próximo da prática europeia e da ROCOR em Inglaterra) ou `en-US`? Recomendação técnica: `en-GB`, por evitar a ambiguidade «1/7». A dec. 31 deteta a língua do aparelho; mapear `en-*` → `en` com formato GB, salvo decisão em contrário.
- **Primeiro dia da semana:** a CLDR dá domingo para `pt-PT` [129]. O calendário litúrgico começa a semana no **domingo** (doc. 01: «Неделя» = domingo); a grelha do calendário deve seguir a convenção litúrgica e não o `weekInfo`. → **DECISÃO DO UTILIZADOR** (grelha domingo–sábado para todas as línguas?).

### 5.3 Etiquetas de língua e texto eslavo

- `lang`: `pt-PT`, `uk`, `ru`, `en`; eslavo eclesiástico = `cu` (ISO 639-1) — usar `lang="cu"` nas colunas eslavas.
- Isto importa tipograficamente (UTN #41):
  - em eslavo, U+0456 «і» é desenhado **sem ponto** e serve de base aos acentos (і́ = U+0456 U+0301);
  - em ucraniano o mesmo código tem um ponto;
  - as fontes eslavas resolvem a diferença com a *feature* OpenType `locl` [130];
  - a Ponomar tem `locl` (medição §5.4).
  → Sem `lang` correto, o «і» ucraniano mostrado numa fonte eslava (ou o eslavo numa fonte ucraniana) sai errado.
- Escrita civil com acentos (camada por defeito, B3):
  - precisa só de Cirílico básico (U+0400–045F, + Ґ/ґ U+0490/0491 para UK) e de U+0301 (acento agudo combinante);
  - as fontes de sistema iOS/Android cobrem estes caracteres, mas a posição do acento combinante varia → ⚠ PARA CONFIRMAR em teste nos 4 aparelhos (dec. 27). Se falhar, usar a Ponomar também para esta camada.
- Blocos Unicode do eslavo autêntico:
  - Cyrillic (0400–04FF), Cyrillic Supplement (0500–052F), Cyrillic Extended-A (2DE0–2DFF, letras sobrescritas), Extended-B (A640–A69F), Extended-C (1C80–1C8F), Combining Diacritical Marks (0300–036F, incl. U+0311 kamora), Combining Half Marks (FE20–FE2F), General/Supplemental Punctuation [130];
  - o bloco Cyrillic Extended-D (1E030–1E08F, Unicode 15.0) é novo [131]; a Ponomar não o cobre (medição) e o eslavo sinodal não precisa dele (⚠ inferência: a UTN #41 é anterior ao bloco).

### 5.4 Fontes eslavas (OFL 1.1) — cobertura e tamanhos medidos

Origem: ficheiros TTF publicados pela Slavonic Computing Initiative [132][134]–[137]; licença SIL OFL 1.1 («Copyright 2025 The Ponomar Project Authors») [133].

| Fonte (versão) | Glifos / cmap | Cobertura relevante (pontos de código presentes / bloco) | Faltam | TTF | WOFF2 completo | Subconjunto «civil + acentos»* (com *hinting* / sem) | Subconjunto «eslavo completo»** (com / sem) |
|---|---|---|---|---|---|---|---|
| **Ponomar** 1.302 | 782 / 781 | Latim básico + Latin-1 completos; Cyrillic 150; Ext-A 29/32; Ext-B 48/96; Ext-C 9/16; Half Marks 3 | — (tem ґ, ѣ, ѵ, ѡ, ꙋ, ᲂ, ҃, ҇, ꙿ, é, ã, ç, «») | 337 220 B | **135 436 B** | 65 784 / **44 932 B** | 102 572 / **71 632 B** |
| Triodion 1.202 | 528 / 527 | Cyrillic 136; Ext-A 23; Ext-B 17 | **ґ (U+0491)** | 173 068 B | 73 824 B | 39 816 / 26 088 B | 61 336 / 40 996 B |
| Monomakh 1.200 | 859 / 815 | Latin Ext-A completo; Ext-A 32/32; Ext-B 72/96 | — | 230 236 B | 86 420 B | 39 144 / 25 396 B | 76 320 / 50 768 B |
| Pochaevsk 1.210 | 522 / 518 | Cyrillic 128; Ext-A 23; Ext-B 17 | **ґ (U+0491)** | 180 120 B | 76 952 B | 38 580 / 25 240 B | 63 332 / 42 348 B |

\* U+0020–007E, 00A0–00FF, 0400–045F, 0490–0491, 0300–0301, 0308, 2010–2027, 2116.
\** Latim básico + Latin-1 + 0300–036F + 0400–052F + 1C80–1C8F + 2DE0–2DFF + A640–A69F + FE20–FE2F + 1E030–1E08F + 2010–2E4F.
*Features* da Ponomar: GSUB `ccmp liga locl salt ss01 ss02`; GPOS `kern mark mkmk`. Todas foram mantidas nos subconjuntos (`layout_features=['*']`); são necessárias para o posicionamento dos diacríticos (`mark`/`mkmk`).

Método: `fontTools.subset` (4.67) com `flavor='woff2'`, todas as *features*, `hinting` ligado/desligado, sobre os TTF de [134]–[137] (descarregados a 16.10.2026).

Recomendações (dec. 23):
1. **Uma só fonte eslava: Ponomar** (recomendada no doc. 03 §6.1.3; única das quatro com ґ e cobertura completa de Latin-1 para PT). Self-host com `font-display: swap`, **sem *hinting*** (os ecrãs modernos não precisam dele; poupa ~30 %).
2. **Dois subconjuntos com `unicode-range`:**
   - «civil» ≈ 45 KB;
   - «eslavo autêntico» ≈ 72 KB, carregado só se o utilizador ativar o modo eslavo (B3).
   O browser só descarrega o que a página usa. Os dois ficam na cache do *service worker* para uso offline (dec. 26).
3. Alternativa mais leve: **subconjunto por glifos realmente usados** no corpus (gerado no *build* a partir dos textos da app). ⚠ PARA CONFIRMAR o ganho com o corpus real.
4. A interface (menus) usa a fonte do sistema (0 KB); a Ponomar só nas colunas de texto litúrgico.
5. Créditos: incluir o texto da OFL e o aviso de *copyright* da Ponomar [133] na página «Sobre».

---

## 6. Dúvidas e decisões pendentes

### 6.1 ⚠ PARA CONFIRMAR

1. Aprovação sinodal (IOR) de alguma tradução **russa** do Molitvoslov ou de hinos — não encontrada (§1.1).
2. Datas de morte de Svirelin (1894), «И. Ф. Ловягин» (1888), V. Uspensky (1911) e I. Bukharev (1896) → estatuto de domínio público (§1.1).
3. Ano e local do Saltério de Yungerov; existência de digitalização (§1.1, §2.1).
4. Molitvoslov ucraniano oficial da IOU (editora/aprovação) (§1.2).
5. Ohiyenko: direitos (CrossWire diz domínio público; autor † 1972), cânone (Men vs. módulo com 66 livros) e numeração impressa dos salmos (§2.2).
6. Brenton 1844 vs. 1851 (§2.3); efeito da *Crown patent* da KJV numa PWA (§2.3).
7. Termos UK marcados ⚠ (vestes, partes do templo, alguns ofícios) e termos EN ⚠ (formas ROC/ROCOR de Matins, Troparion, etc.) — §3.
8. Comportamento do acento combinante U+0301 nas fontes de sistema dos 4 aparelhos (§5.3).
9. Termos de uso dos textos de Ephrem Lash (site inacessível) (§1.3).

### 6.2 → DECISÃO DO UTILIZADOR

1. **Coluna RU**: tradução própria / Zaionchkovsky 1912 adaptado / só eslavo civil (§1.1).
2. **Coluna UK**: tradução própria vs. pedir autorização à IOU (Saltério 2023, Blagovist) e aos tradutores EUM (§1.2).
3. **Eslavo na interface UK**: escrita civil russa com acentos vs. transliteração «Київський ізвод» (§1.2).
4. **Inglês**: `en-GB` vs. `en-US`; «Kyiv» vs. «Kiev» nos títulos de santos (§4, §5.2).
5. **Grelha do calendário**: semana a começar ao domingo em todas as línguas (§5.2).

---

## Referências

1. A. Kravetsky, «К истории и предыстории литургических переводов XVII–XXI вв.» (2017), PDF. https://ruslang.ru/doc/kravetsky/Kravetsky_2017_Tipologiya%20liturgicheskih%20perevodov.pdf
2. Азбука веры — Николай Чеславович Зайончковский (Нахимов), página de autor. https://www.azbyka.ru/otechnik/Nikolaj_Zajonchkovskij/
3. Азбука веры — «Молитвы и песнопения православного молитвослова (для мирян)…». https://azbyka.ru/otechnik/Nikolaj_Zajonchkovskij/molitvy-i-pesnopenija-pravoslavnogo-molitvoslova-dlja-mirjan-s-perevodom-na-russkij-jazyk-ob-jasnenijami-i-primechanijami/
4. Азбука веры — «О переводах Библии на русский язык». https://azbyka.ru/o-perevodah-biblii
5. Википедия — «Синодальный перевод». https://ru.wikipedia.org/wiki/Синодальный_перевод
6. Православие.Ru — Проект документа «Церковнославянский язык в жизни Русской Православной Церкви XXI века» (17.06.2011). https://pravoslavie.ru/47105.html
7. Википедия — «Синодальная богослужебная комиссия». https://ru.wikipedia.org/wiki/Синодальная_богослужебная_комиссия
8. Патриархия.ru — «Акафист благоверным страстотерпцам князьям Борису и Глебу». https://patriarchia.ru/article/101489
9. Лабиринт — «Псалтирь. Перевод с греческого П. Юнгерова» (ficha comercial; datas 1856–1921). https://www.labirint.ru/books/372161/
10. Азбука веры — «Краевед А. И. Свирелин». https://www.azbyka.ru/otechnik/Aleksandr-Svirelin/kraeved-a-i-svirelin/
11. НЭБ — ficha de catálogo (Бухарев, «Толковый сокращенный молитвенник», 1896), segundo resumo de pesquisa; página não acessível diretamente. https://rusneb.ru/catalog/000199_000009_003639049/
12. EUM — «Псалтир видання Видавничого відділу УПЦ» (2023), com prefácio. http://eum.org.ua/index.php/vydannia/psaltyr-vydannia-vydavnychoho-viddilu-upts
13. EUM — «Про переклад». http://eum.org.ua/pro-pereklad
14. EUM — «Друковані видання». http://eum.org.ua/vydannia
15. EUM — «Співпраця». http://eum.org.ua/spivpratsia
16. УПЦ (news.church.ua) — «Постанова Собору Української Православної Церкви від 27 травня 2022 року». https://news.church.ua/2022/05/27/postanova-soboru-ukrajinskoji-pravoslavnoji-cerkvi-vid-27-travnya-2022-roku/
17. Zaxid.net — «УПЦ (МП) може перейти на українську мову богослужінь» (11.02.2013). https://zaxid.net/upts_mp_mozhe_pereyti_na_ukrayinsku_movu_bogosluzhin_n1277479
18. Благовіст (УПЦ) — «Церковні свята у 2026 році за старим і (новим) стилем». https://blagovist.info/tserkovni-sviata
19. Благовіст — «Пости». https://blagovist.info/posty
20. Благовіст — «Пояснення до місяцеслова» (abreviaturas). https://blagovist.info/poyasnennya-do-misyatseslova
21. Благовіст — «Дні особливого поминання померлих». https://blagovist.info/dni-osoblyvoho-pomynannia-pomerlykh
22. Благовіст — «Молитвослов» (índice; «Молитви ранішні»). https://blagovist.info/molytvoslov · https://blagovist.info/molytvoslov/molytvy-ranishni
23. Благовіст — «Символ віри» (eslavo, transliteração, «Київський ізвод», ucraniano, grego). https://blagovist.info/molytvoslov/symvol-viry
24. Благовіст — «Богослужбові вказівки». https://blagovist.info/bohosluzhbovi-vkazivky-2
25. ПЦУ (pomisna.info) — «Богослужіння в день пам'яті святого апостола і євангелиста Іоана Богослова» (09.10.2019). https://www.pomisna.info/uk/vsi-novyny/bogosluzhinnya-v-den-pam-yati-svyatogo-apostola-i-yevangelysta-ioana-bogoslova/
26. ПЦУ — notícia «Богоявлення … Господа Ісуса Христа» (URL com «isusa-hrysta»). https://www.pomisna.info/uk/vsi-novyny/bogoyavlennya-tse-odkrovennya-boga-yak-svyatoyi-trojtsi-ta-yavlennya-svitu-boga-vtilenogo-gospoda-isusa-hrysta-mytropolyt-epifanij/
27. ПЦУ — «Звернення Помісного Собору Православної Церкви України до українського народу» (27.07.2023). https://www.pomisna.info/uk/document-post/zvernennya-pomisnogo-soboru-pravoslavnoyi-tserkvy-ukrayiny-do-ukrayinskogo-narodu/
28. Освіта.ua — «Упорядкування православного храму» (texto ucraniano de tipo catequético). https://osvita.ua/vnz/reports/relig/20461/
29. CrossWire — módulo `RusSynodal`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=RusSynodal
30. CrossWire — módulo `UkrOgienko`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=UkrOgienko
31. CrossWire — módulo `UkrKulish`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=UkrKulish
32. CrossWire — módulos `KJV`/`KJVA`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=KJVA
33. CrossWire — módulo `CSlElizabeth`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=CSlElizabeth
34. CrossWire — módulo `RusSynodalLIO`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=RusSynodalLIO
35. CrossWire — módulo `DRC`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=DRC
36. CrossWire — módulo `LXX`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=LXX
37. CrossWire — módulo `RusMakarij`. https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=RusMakarij
38. eBible.org — Brenton Septuagint Translation (`eng-Brenton`). https://ebible.org/Scriptures/details.php?id=eng-Brenton
39. eBible.org — Updated Brenton English Septuagint (`englxxup`). https://ebible.org/Scriptures/details.php?id=englxxup
40. eBible.org — «Біблія в пер. П. Куліша та І. Пулюя, 1905» (`ukr1871`). https://ebible.org/Scriptures/details.php?id=ukr1871
41. eBible.org — Синодальный перевод (`russyn`). https://ebible.org/Scriptures/details.php?id=russyn
42. А. Мень, *Библиологический словарь*, t. 3 — «Украинские переводы Библии» (Азбука веры). https://www.azbyka.ru/otechnik/Spravochniki/bibliologicheskij-slovar-tom-3/331
43. getBible API — `ukrogienko` (lista de livros; Sl 22). https://api.getbible.net/v2/ukrogienko/books.json
44. getBible API — `synodal` (lista de livros; Sl 50). https://api.getbible.net/v2/synodal/19/50.json
45. HathiTrust — Hapgood, *Service book…* (1906), registo 005779424 (direitos «pd»). https://catalog.hathitrust.org/Record/005779424
46. Internet Archive — Hapgood, *Service book of the Holy Orthodox-Catholic apostolic (Greco-Russian) church* (1906), OCR. https://archive.org/details/cu31924029363128
47. Internet Archive — Hapgood, *Service book…* (ed. revista, 1922). https://archive.org/details/servicebookofhol0000isab_n5f1
48. OrthodoxWiki — «Isabel Hapgood». https://en.orthodoxwiki.org/Isabel_Hapgood
49. OrthodoxWiki — «Ephrem (Lash)». https://en.orthodoxwiki.org/Ephrem_(Lash)
50. OCA — *The Orthodox Faith*, «The Church Year» (índice). https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-year
51. OCA — Lives of the Saints, 25.09.2026. https://www.oca.org/saints/lives/2026/09/25
52. OCA — 03.10.2026. https://www.oca.org/saints/lives/2026/10/03
53. OCA — 24.07.2026. https://www.oca.org/saints/lives/2026/07/24
54. OCA — 23.04.2026. https://www.oca.org/saints/lives/2026/04/23
55. OCA — 15.07.2026. https://www.oca.org/saints/lives/2026/07/15
56. OCA — 01.11.2026. https://www.oca.org/saints/lives/2026/11/01
57. OCA — 06.12.2026. https://www.oca.org/saints/lives/2026/12/06
58. OCA — 02.01.2026. https://www.oca.org/saints/lives/2026/01/02
59. OCA — 14.09.2026. https://www.oca.org/saints/lives/2026/09/14
60. OCA — 01.10.2026. https://www.oca.org/saints/lives/2026/10/01
61. OCA — 02.02.2026. https://www.oca.org/saints/lives/2026/02/02
62. OCA — 21.11.2026. https://www.oca.org/saints/lives/2026/11/21
63. OCA — 11.07.2026. https://www.oca.org/saints/lives/2026/07/11
64. OCA — 03.05.2026. https://www.oca.org/saints/lives/2026/05/03
65. OCA — 20.12.2026. https://www.oca.org/saints/lives/2026/12/20
66. OCA — 29.08.2026. https://www.oca.org/saints/lives/2026/08/29
67. OCA — 20.07.2026. https://www.oca.org/saints/lives/2026/07/20
68. OCA — 26.09.2026. https://www.oca.org/saints/lives/2026/09/26
69. OCA — «Fasting & Fast-Free Seasons of the Church». https://www.oca.org/liturgics/outlines/fasting-fast-free-seasons-of-the-church
70. OCA — «Pre-Lent». https://www.oca.org/orthodoxy/the-orthodox-faith/worship/the-church-year/pre-lent
71. ROCOR, Eastern American Diocese — «Entry of the Theotokos» em Jordanville. https://eadiocese.org/news_231213_2
72. ROCOR, Eastern American Diocese — «Protection of the Mother of God» (October 1/14). https://eadiocese.org/news_211028_1.html
73. ROCOR, Eastern American Diocese — «Exaltation of the Cross». https://www.eadiocese.org/news_241001_2
74. ROCOR, Eastern American Diocese — S. Sérgio; «Venerable Martyrs Grand Duchess Elizabeth Feodorovna and Nun Barbara». https://eadiocese.org/news_250722_3
75. St. Nicholas Russian Orthodox Church (Reading, PA; paróquia do Patriarcado de Moscovo) — «Great Feast Days 2026» (PDF). https://stnicholasberks.org/files/Great-Feast-Days-2026.pdf
76. OrthodoxWiki — «Vestments». https://en.orthodoxwiki.org/Vestments
77. OrthodoxWiki — «Archpriest». https://en.orthodoxwiki.org/Archpriest
78. OrthodoxWiki — «Entrance of the Theotokos». https://en.orthodoxwiki.org/Entrance_of_the_Theotokos
79. Азбука веры — calendário, 08.10.2026. https://azbyka.ru/days/2026-10-08
80. Азбука веры — 28.07.2026. https://azbyka.ru/days/2026-07-28
81. Азбука веры — 01.08.2026. https://azbyka.ru/days/2026-08-01
82. Азбука веры — 02.01.2027. https://azbyka.ru/days/2027-01-02
83. Азбука веры — 14.11.2026. https://azbyka.ru/days/2026-11-14
84. Азбука веры — 06.05.2026. https://azbyka.ru/days/2026-05-06
85. Азбука веры — 09.10.2026. https://azbyka.ru/days/2026-10-09
86. Азбука веры — 06.02.2026 («Седмица сплошная»). https://azbyka.ru/days/2026-02-06
87. УПЦ (uoc-news.church) — «…в ім'я преподобного Сергія Радонезького у Києві» (08.10.2026). https://uoc-news.church/2026/10/08/predstoyatel-ocholiv-prestolne-svyato-xramovogo-kompleksu-v-imya-prepodobnogo-sergiya-radonezkogo-u-kijevi/
88. УПЦ — «Ми просимо Георгія Побідоносця…» (06.05.2025). https://uoc-news.church/2025/05/06/mi-prosimo-georgiya-pobidonoscya-ukripiti-nashix-vojiniv-blazhennishij-mitropolit-onufrij/
89. УПЦ — «Храм праведного Іоанна Кронштадтського…» (13.03.2022). https://uoc-news.church/2022/03/13/xram-pravednogo-ioanna-kronshtadtskogo-v-donecku-postrazhdav-u-rezultati-obstrilu/
90. УПЦ — «У день пам'яті преподобного Серафима Саровського…» (15.01.2025). https://uoc-news.church/2025/01/15/u-den-pamyati-prepodobnogo-serafima-sarovskogo-predstoyatel-ocholiv-bozhestvennu-liturgiyu-u-feofaniji/
91. УПЦ — «…храм на честь свт. Миколая Чудотворця» (18.12.2021). https://uoc-news.church/2021/12/18/u-vinnickij-jeparxiji-osvyacheno-novij-xram-na-chest-svt-mikolaya-chudotvorcya/
92. УПЦ — «…перенесення мощей преподобного Феодосія Печерського» (27.08.2026). https://uoc-news.church/2026/08/27/predstoyatel-ocholiv-svyatkove-bogosluzhinnya-u-den-perenesennya-moshhej-prepodobnogo-feodosiya-pecherskogo/
93. УПЦ — «…дня пам'яті рівноапостольного князя Володимира» (29.07.2026). https://uoc-news.church/2026/07/29/svyatishij-patriarx-serbskij-porfirij-nadislav-predstoyatelyu-upc-vitannya-z-nagodi-dnya-pamyati-rivnoapostolnogo-knyazya-volodimira/
94. УПЦ — «…храм на честь святих безсрібників Косми і Даміана у Києві» (05.10.2026). https://uoc-news.church/2026/10/05/blazhennishij-mitropolit-onufrij-osvyativ-xram-na-chest-svyatix-bezsribnikiv-kosmi-i-damiana-u-kijevi/
95. УПЦ, Ізюмська єпархія — «Покров Пресвятої Владичиці нашої Богородиці та Приснодіви Марії» (14.10.2026) e «Неділя 18-а після П'ятидесятниці». http://izum.church.ua/2026/10/14/pokrov-presvyatoji-vladichici-nashoji-bogorodici-ta-prisnodivi-mariji-3/
96. УПЦ — «…таїнства Хрещення, Сповіді та Причастя…» (09.04.2017). https://uoc-news.church/2017/04/09/kliriki-jeparxij-upc-zvershili-tajinstva-xreshhennya-spovidi-ta-prichastya-u-zakladax-vikonannya-pokaran/
97. УПЦ — «…звершили таїнство Соборування» (24.03.2025). https://uoc-news.church/2025/03/24/na-zakordonnix-parafiyax-upc-zvershili-tajinstvo-soboruvannya/
98. УПЦ — «…звершив вінчання військовослужбовців…» (11.11.2019). https://uoc-news.church/2019/11/11/klirik-vinnickoji-jeparxiji-zvershiv-vinchannya-vijskovosluzhbovciv-na-peredovij/
99. УПЦ — «Напередодні Антипасхи Предстоятель очолив всенічне бдіння…» (18.04.2026). https://uoc-news.church/2026/04/18/naperedodni-antipasxi-predstoyatel-ocholiv-vsenichne-bdinnya-u-kafedralnomu-sobori-chernivciv-2026/
100. УПЦ — «…Божественну літургію та молебень на новий навчальний рік…» (01.09.2026). https://uoc-news.church/2026/09/01/predstoyatel-ocholiv-bozhestvennu-liturgiyu-ta-moleben-na-novij-navchalnij-rik-u-golosijivskomu-monastiri-2026/
101. УПЦ — «…звершено панахиду…» (05.07.2025). https://uoc-news.church/2025/07/05/u-kijevo-pecherskij-lavri-zversheno-panaxidu-za-prisnopamyatnogo-mitropolita-volodimira/
102. УПЦ — «…запис акафіста преподобному Іову Угольському» (13.06.2026). https://uoc-news.church/2026/06/13/xustska-jeparxiya-pidgotuvala-zapis-akafista-prepodobnomu-iovu-ugolskomu/
103. УПЦ — «…освячення нових антимінсів» (15.07.2024). https://uoc-news.church/2024/07/15/blazhennishij-mitropolit-onufrij-zvershiv-osvyachennya-novix-antiminsiv/
104. УПЦ — «…архімандрита Іринея (Воронкова)» (04.03.2026). https://uoc-news.church/2026/03/04/u-danivskomu-monastiri-vidspivali-najstarshogo-klirika-chernigivskoji-jeparxiji-arximandrita-irineya-voronkova/
105. УПЦ — «…про ієромонаха Феодосія (Макеєва)» (27.02.2025). https://uoc-news.church/2025/02/27/pressluzhba-vinnickoji-jeparxiji-opublikuvala-zayavu-shhodo-informaciji-zmi-pro-ijeromonaxa-feodosiya-makejeva/
106. УПЦ — «…сина ієродиякона обителі…» (20.02.2026). https://uoc-news.church/2026/02/20/v-ioninskomu-monastiri-kijeva-vidspivali-zagiblogo-na-fronti-sina-ijerodiyakona-obiteli-vojina-georgiya/
107. УПЦ — «…протодиякон Олександр Ткаченко» (31.05.2022). https://uoc-news.church/2022/05/31/u-donecku-vnaslidok-obstrilu-zaginuv-klirik-upc-protodiyakon-oleksandr-tkachenko/
108. УПЦ — «Іподиякон єпископа Гостомельського…» (25.03.2026). https://uoc-news.church/2026/03/25/ipodiyakon-jepiskopa-gostomelskogo-arkadiya-stav-bronzovim-chempionom-svitu-z-kikboksingu/
109. УПЦ — «…схиігумені Нектарії (Трейтяк)» (13.02.2021). https://uoc-news.church/2021/02/13/v-uspenskomu-jeleckomu-monastiri-zversheno-chin-vidspivuvannya-novospochiloji-sxiigumeni-nektariji-trejtyak/
110. УПЦ — «…із протоієреєм Іоанном Солодчуком» (25.05.2026). https://uoc-news.church/2026/05/25/u-kijivskix-duxovnix-shkolax-vidbulasya-zustrich-studentiv-iz-protoijerejem-ioannom-solodchukom/
111. УПЦ — «…утреню з читанням 12-ти Страсних Євангелій…» (09.04.2026). https://uoc-news.church/2026/04/09/predstoyatel-ocholiv-utrenyu-z-chitannyam-12-ti-strasnix-jevangelij-u-kijevo-pecherskij-lavri-2026/
112. УПЦ — «…вечірню з виносом Плащаниці…» (10.04.2026). https://uoc-news.church/2026/04/10/predstoyatel-ocholiv-vechirnyu-z-vinosom-plashhanici-u-kijevi-pecherskij-lavri-2026/
113. УПЦ — «…Літургію Передосвячених Дарів…» (08.04.2026). https://uoc-news.church/2026/04/08/predstoyatel-ocholiv-ostannyu-u-roci-liturgiyu-peredosvyachenix-dariv-ta-nagorodiv-duxovenstvo-2026/
114. УПЦ — «У Вербну неділю…» (05.04.2026). https://uoc-news.church/2026/04/05/u-verbnu-nedilyu-predstoyatel-ocholiv-svyatkove-bogosluzhinnya-u-kijevo-pecherskij-lavri-2026/
115. УПЦ — «…молитовно зустріли Великий піст» (27.02.2026). https://uoc-news.church/2026/02/27/pozbavleni-xramiv-gromadi-upc-molitovno-zustrili-velikij-pist/
116. УПЦ — «Петрів піст: чому важливий…» (07.06.2026). https://uoc-news.church/2026/06/07/petriv-pist-chomu-vazhlivij-ta-yak-provesti-arxijepiskop-ladanskij-feodosij/
117. УПЦ — «…поминальний день Радониці» (03.05.2022). https://uoc-news.church/2022/05/03/pro-te-yak-pravoslavnomu-xristiyaninu-slid-provesti-pominalnij-den-radonici-video/
118. УПЦ — «…перший чернечий постриг» (24.08.2026). https://uoc-news.church/2026/08/24/v-illinskomu-cholovichomu-monastiri-vinnici-vidbuvsya-pershij-chernechij-postrig/
119. УПЦ — «Житіє блаженної Ольги Флорівської, Христа ради юродивої» (31.08.2026). https://uoc-news.church/2026/08/31/zhitije-blazhennoji-olgi-florivskoji-xrista-radi-yurodivoji/
120. УПЦ — «Перші страстотерпці на Русі Борис та Гліб…» (06.08.2020). https://uoc-news.church/2020/08/06/pershi-strastoterpci-na-rusi-boris-ta-glib-lyubov-do-brata-dorozhcha-za-zhittya/
121. УПЦ — «…прославлення у лику святих преподобносповідника Філарета Звіринецького» (06.04.2025). https://uoc-news.church/2025/04/06/predstoyatel-ocholiv-proslavlennya-u-liku-svyatix-prepodobnospovidnika-filareta-zvirineckogo/
122. УПЦ — «…зламавши Царські врата» (15.05.2017). https://uoc-news.church/2017/05/15/u-seli-na-ternopilshhini-rozkolniki-uvirvalisya-do-xramu-upc-zlamavshi-carski-vrata/
123. УПЦ — «…нетлінні мощі…» (23.01.2025). https://uoc-news.church/2025/01/23/minkult-vpershe-v-postradyanskij-istoriji-zabrav-vid-cerkvi-netlinni-moshhi-shhob-postaviti-jix-na-vlasnij-balans/
124. УПЦ — «…з 30-річчям з дня архієрейської хіротонії» (13.09.2026). https://uoc-news.church/2026/09/13/vitannya-predstoyatelya-mitropolitu-krivorizkomu-i-nikopolskomu-jefremu-z-30-richchyam-z-dnya-arxijerejskoji-xirotoniji/
125. УПЦ — «…упокоєння схимонахині Рафаїли…» (17.12.2025). https://uoc-news.church/2025/12/17/do-20-ji-richnici-upokojennya-sximonaxini-rafajili-u-zhitomiri-vidbulisya-zaupokijni-bogosluzhinnya/
126. УПЦ — «…храм на честь святителя Василія Великого…» (16.01.2026). https://uoc-news.church/2026/01/16/mitropolit-meletij-osvyativ-xram-na-chest-svyatitelya-vasiliya-velikogo-v-selishhi-krasnojilsk-na-bukovini/
127. Unicode CLDR 47 — `plurals.xml`. https://raw.githubusercontent.com/unicode-org/cldr/release-47/common/supplemental/plurals.xml
128. Unicode CLDR 47 — `ordinals.xml`. https://raw.githubusercontent.com/unicode-org/cldr/release-47/common/supplemental/ordinals.xml
129. Unicode CLDR 47 — `supplementalData.xml` (weekData). https://raw.githubusercontent.com/unicode-org/cldr/release-47/common/supplemental/supplementalData.xml
130. Unicode Technical Note #41 — *Church Slavonic Typography in Unicode* (A. Andreev, Y. Shardt, N. Simmons, v1, 04.11.2015), PDF. https://www.unicode.org/notes/tn41/tn41-1.pdf
131. Unicode 15.0.0 — novos blocos (Cyrillic Extended-D, 1E030..1E08F). https://www.unicode.org/versions/Unicode15.0.0/
132. Slavonic Computing Initiative — «Fonts». https://sci.ponomar.net/fonts.html
133. Ponomar — `OFL.txt` («Copyright 2025 The Ponomar Project Authors»; SIL OFL 1.1). https://raw.githubusercontent.com/slavonic/Ponomar/master/OFL.txt
134. Ponomar-Regular.ttf. https://raw.githubusercontent.com/slavonic/Ponomar/master/fonts/ttf/Ponomar-Regular.ttf
135. Triodion-Regular.ttf. https://raw.githubusercontent.com/slavonic/Triodion/master/fonts/ttf/Triodion-Regular.ttf
136. Monomakh-Regular.ttf. https://raw.githubusercontent.com/slavonic/Monomakh/master/fonts/ttf/Monomakh-Regular.ttf
137. Pochaevsk-Regular.ttf. https://raw.githubusercontent.com/slavonic/Pochaevsk/master/fonts/ttf/Pochaevsk-Regular.ttf
138. Азбука веры — «Богослужебные облачения». https://azbyka.ru/oblachenie
139. УПЦ — «…хрестики та стихарі…» (29.08.2022). https://uoc-news.church/2022/08/29/na-smitniku-opinilis-xrestiki-ta-stixari-u-merezhi-opublikuvali-foto-blyuznirstva-pribichnikiv-pcu/
140. УПЦ — «Хай Матір Божа покриває Своїм Омофором…» (28.02.2022). https://uoc-news.church/2022/02/28/xaj-matir-bozha-pokrivaje-svojim-omoforom-usix-nas-keruyuchij-spravami-upc-zvernuvsya-do-kiyan-ta-zaxisnikiv-mistavideo/
141. УПЦ — «…постриги у мантію» (15.04.2025). https://uoc-news.church/2025/04/15/v-oleksandrijskij-ta-mukachivskij-jeparxiyax-vidbulisya-postrigi-u-mantiyu/
142. Благовіст — «Богослужбові книги» (Служебник, Мінея, Часослов, Октоїх, Псалтир, Тріодь Пісна, Типікон, Тріодь Квітна, Требник, Ірмологій, Апостол, Євангеліє). https://blagovist.info/bohosluzhbovi-knyhy
