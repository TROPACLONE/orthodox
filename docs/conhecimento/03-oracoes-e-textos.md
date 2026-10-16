# 03 — Orações, regras de oração e textos (fontes e licenças)

> Base de conhecimento interna — especificação para programadores.
> Tradição: Igreja Ortodoxa Russa (Patriarcado de Moscovo, ROC/РПЦ).
> Língua principal: português europeu (PT-PT). Termos originais entre parênteses (eslavo eclesiástico/russo em cirílico + transliteração; grego quando relevante). Passagens técnicas podem ficar em inglês quando a tradução perderia precisão.
> Todas as afirmações têm referência `[n]` (lista no fim). Itens não confirmados: **⚠ PARA CONFIRMAR**.
> Os textos integrais das orações **não** são reproduzidos aqui: listam-se *incipits* (primeiras palavras em eslavo) e a fonte onde obter o texto completo.

Convenções deste documento:
- Numeração dos salmos: **LXX/eslava** (a usada na liturgia e no Молитвослов), com a numeração massorética/hebraica entre parênteses quando útil (ver §6.3.4).
- "Molitvoslov" = livro de orações (Молитвослов, *Molitvoslov*; gr. Προσευχητάριον / Ὡρολόγιον para os ofícios). Em PT-PT, a edição do Patriarcado de Moscovo em Portugal chama-lhe *Devocionário* [48][49].
- Os *incipits* em eslavo foram verificados na edição em linha do Молитвослов do portal Азбука веры (azbyka.ru) [1][2][9]–[13].

---

## 0. Resumo para quem implementa

| Tema | Decisão/facto principal | Ref. |
|---|---|---|
| Orações da manhã | 27 blocos ordenados (de «Во имя Отца…» a «Достойно есть») | [1] |
| Orações da noite | 32 blocos ordenados (de «Во имя Отца…» a «В руце Твои…» + regra mental) | [2] |
| Semana Luminosa (Светлая седмица) | Orações da manhã e da noite substituídas pelas **Horas Pascais** (Часы пасхальные) até sábado de manhã inclusive | [3][4] |
| Páscoa → Ascensão | «Царю Небесный» substituído por «Христос воскресе» ×3; «Достойно есть» substituído por «Ангел вопияше…» + irmo da 9.ª ode pascal | [2][16] |
| Ascensão → Pentecostes | Omite-se «Царю Небесный» e o que o precede; começa-se em «Святый Боже» | [2][16] |
| Regra antes da Comunhão | 3 cânones (Salvador, Mãe de Deus, Anjo da Guarda) + *Последование ко Святому Причащению* (parte invariável); jejum eucarístico desde a meia-noite | [5][6] |
| Semana Luminosa e Comunhão | Regra = Cânone Pascal + cânone e orações para a Comunhão; jejum limitado a não comer depois da meia-noite | [5][6] |
| Listas de pecados para confissão | Nenhuma lista "oficial" sinodal encontrada; as listas correntes são obras privadas | §4 |
| Fontes eslavas em Unicode | Biblioteca Ponomar (Unicode real); azbyka usa codificação legada UCS no modo eslavo | [42][43][44] |
| Tipos de letra eslavos | Família SCI/Ponomar (Ponomar, Monomakh, Triodion, etc.) — **SIL OFL 1.1** | [37][38] |
| Traduções PT-PT ortodoxas | Existem (Missal 2019, Devocionário 2021, Liturgia 2023 — Patriarcado de Moscovo, Cascais), mas **todos os direitos reservados** | [48]–[51] |
| Bíblia PT livre | Almeida 1911 (SWORD, GPL), Bíblia Livre (CC BY 4.0, PT-BR), BPM (domínio público, PT-BR, rascunho) | [60]–[62] |
| Bíblia eslava | Bíblia Isabelina (Елизаветинская) 1751/1756; módulo SWORD *CSlElizabeth* em domínio público (ortografia modernizada) | [57][58] |

---

## 1. O Молитвослов (livro de orações) russo

### 1.1 Edições e aprovação

- Desde a determinação do Santo Sínodo de 25.12.2009 sobre a atividade editorial, todas as edições destinadas à venda na rede eclesiástica (diocesana, paroquial, monástica) devem ser revistas pelo Conselho Editorial (Издательский совет, *Izdatelsky sovet*) e receber o selo «Рекомендовано к публикации Издательским советом Русской Православной Церкви» (*Rekomendovano k publikatsii…*); o selo «По благословению Святейшего Патриарха…» é concedido apenas a título excecional a edições de importância geral [46].
- Consequência para a app: **não existe uma única edição "canónica"** do Molitvoslov; existem muitas edições com selo do Conselho Editorial (identificador do tipo «ИС Р…»), com pequenas diferenças (orações adicionais, notas, ortografia). A estrutura abaixo segue o Molitvoslov de azbyka.ru [1][2]. ⚠ PARA CONFIRMAR: comparar com uma edição impressa concreta com selo ИС (p. ex. Издательство Московской Патриархии) antes de fixar a ordem na app. 2.ª ronda: não há edição com selo ИС acessível em linha para comparação integral. Alternativa verificável: o *Молитвословъ* sinodal de 1900, em domínio público [72] (ver §6.5); continua por fazer a comparação com uma edição atual.
- Texto impresso em itálico (rubricas, títulos) **não se lê** durante a oração [1][10] → na app, rubricas devem ter estilo distinto e ser excluídas de qualquer modo "ler em voz alta"/TTS.

### 1.2 Orações da manhã (Молитвы утренние, *Molitvy utrennie*)

Fonte e texto completo: [1]. Ordem exata:

| # | Bloco (PT) | Título eslavo/russo | *Incipit* (eslavo) |
|---|---|---|---|
| 1 | Início habitual | Начало обычное | «Во имя Отца, и Сына, и Святаго Духа» |
| 2 | Oração do publicano | Молитва мытаря | «Боже, милостив буди мне грешному» |
| 3 | Oração preliminar | Молитва предначинательная | «Господи Иисусе Христе, Сыне Божий, молитв ради…» |
| 4 | Oração ao Espírito Santo | Молитва Святому Духу | «Царю Небесный, Утешителю» |
| 5 | Triságio | Трисвятое | «Святый Боже, Святый Крепкий» |
| 6 | Oração à Santíssima Trindade | Молитва ко Пресвятой Троице | «Пресвятая Троице, помилуй нас» |
| 7 | Oração do Senhor | Молитва Господня | «Отче наш, Иже еси на небесех» |
| 8 | Tropários trinitários | Тропари Троичные | «Воставше от сна, припадаем Ти» |
| 9 | Oração à Santíssima Trindade (2.ª) | Молитва ко Пресвятой Троице | «От сна востав, благодарю Тя…» |
| 10 | Salmo 50 (51) | Псалом 50 | «Помилуй мя, Боже» |
| 11 | Símbolo da Fé | Символ веры | «Верую во единаго Бога Отца» |
| 12 | Oração 1.ª, S. Macário o Grande | Молитва 1-я, прп. Макария Великого | «Боже, очисти мя грешнаго» |
| 13 | Oração 2.ª, do mesmo | Молитва 2-я | «От сна востав, полунощную песнь…» |
| 14 | Oração 3.ª, do mesmo | Молитва 3-я | «К Тебе, Владыко Человеколюбче» |
| 15 | Oração 4.ª, do mesmo | Молитва 4-я | «Господи, Иже многою Твоею благостию» |
| 16 | Oração 5.ª, S. Basílio o Grande | Молитва 5-я, свт. Василия Великого | «Господи Вседержителю, Боже сил» |
| 17 | Oração 6.ª, do mesmo | Молитва 6-я | «Тя благословим, вышний Боже» |
| 18 | Oração 7.ª, à Mãe de Deus | Молитва 7-я, ко Пресвятой Богородице | «Воспеваю благодать Твою, Владычице» |
| 19 | Oração 8.ª, a Nosso Senhor Jesus Cristo | Молитва 8-я | «Многомилостиве и Всемилостиве Боже мой» |
| 20 | Oração 9.ª, ao Anjo da Guarda | Молитва 9-я, к Ангелу Хранителю | «Святый Ангеле, предстояй окаянной моей души» |
| 21 | Oração 10.ª, à Mãe de Deus | Молитва 10-я | «Пресвятая Владычице моя Богородице» |
| 22 | Invocação do santo do próprio nome | Молитвенное призывание святого | «Моли Бога о мне, святый угодниче Божий (имя)» |
| 23 | Cântico à Mãe de Deus | Песнь Пресвятой Богородице | «Богородице Дево, радуйся» |
| 24 | Tropário da Cruz e oração pela pátria | Тропарь Кресту | «Спаси, Господи, люди Твоя» |
| 25 | Oração pelos vivos | Молитва о живых | «Спаси, Господи, и помилуй отца моего духовнаго…» |
| 26 | Oração pelos defuntos | Молитва об усопших | «Упокой, Господи, души усопших раб Твоих…» |
| 27 | Conclusão | Окончание молитв | «Достойно есть яко воистину блажити Тя, Богородицу» |

Notas de implementação:
- O Molitvoslov de azbyka inclui ainda um **помянник** (*pomiánnik*, lista de comemoração) mais longo, opcional, a ler «se puderes, em vez das orações breves pelos vivos e defuntos» (itens 25–26) [1] → ver §5.7.
- Género gramatical: várias orações têm formas masculinas/femininas (грешнаго/грешную; e.g. a Oração de Jesus e as ações de graças) [10][19] → a app deve guardar variantes por género (preferência do utilizador).
- Os itens 1–11 constituem o "início habitual" que se reutiliza em quase todas as regras (cânones, acatistos, Saltério) [16].

### 1.3 Orações da noite (Молитвы на сон грядущим, *Molitvy na son griaduschim*)

Fonte e texto completo: [2]. Ordem exata:

| # | Bloco (PT) | Título/observação | *Incipit* (eslavo) |
|---|---|---|---|
| 1 | Início | — | «Во имя Отца, и Сына, и Святаго Духа» (seguido do início habitual: «Молитвами святых отец наших…», «Слава Тебе, Боже наш…», «Царю Небесный…» — ver §1.4) |
| 2 | Triságio | com sinal da cruz | «Святый Боже, Святый Крепкий, Святый Безсмертный» |
| 3 | À Santíssima Trindade | — | «Пресвятая Троице, помилуй нас» |
| 4 | Oração do Senhor | — | «Отче наш» |
| 5 | Tropários | — | «Помилуй нас, Господи, помилуй нас»; «Господи, помилуй нас, на Тя бо уповахом»; «Милосердия двери отверзи нам» |
| 6 | «Senhor, tem piedade» ×12 | — | «Господи, помилуй» (12) |
| 7 | Oração 1.ª, S. Macário o Grande | — | «Боже вечный и Царю всякаго создания» |
| 8 | Oração 2.ª, S. Antíoco | — | «Вседержителю, Слове Отчий» |
| 9 | Oração 3.ª, ao Espírito Santo | — | «Господи, Царю Небесный, Утешителю» |
| 10 | Oração 4.ª, S. Macário | — | «Что Ти принесу, или что Ти воздам» |
| 11 | Oração 5.ª | — | «Господи Боже наш, еже согреших во дни сем» |
| 12 | Oração 6.ª | — | «Господи Боже наш, в Негоже веровахом» |
| 13 | Oração 7.ª, S. João Crisóstomo (24 orações breves, uma por hora) | — | «Господи, не лиши мене небесных Твоих благ» |
| 14 | Oração 8.ª, a N. S. Jesus Cristo | — | «Господи Иисусе Христе, Сыне Божий, ради честнейшия Матере Твоея» |
| 15 | Oração 9.ª, à Mãe de Deus (S. Pedro Estudita) | — | «К Тебе, Пречистей Божией Матери» |
| 16 | Oração 10.ª, à Mãe de Deus | — | «Благаго Царя благая Мати» |
| 17 | Oração 11.ª, ao Anjo da Guarda | — | «Ангеле Христов, хранителю мой святый» |
| 18 | Condácio à Mãe de Deus e outros | — | «Взбранной Воеводе»; «Преславная Приснодево»; «Все упование мое на Тя возлагаю»; «Богородице Дево, не презри мене» |
| 19 | Oração de S. Joanício o Grande | — | «Упование мое Отец» |
| 20 | «É digno» | — | «Достойно есть» |
| 21 | Despedida (отпуст) | — | «Господи Иисусе Христе, Сыне Божий, молитв ради…» |
| 22 | Oração de S. João Damasceno | — | «Владыко Человеколюбче, неужели мне одр сей гроб будет» |
| 23 | — | — | «Просвети очи мои, Христе Боже» |
| 24 | — | — | «Заступник души моея буди, Боже» |
| 25 | — | — | «Преславную Божию Матерь» |
| 26 | Oração à Cruz (benzendo-se) | — | «Да воскреснет Бог, и расточатся врази Его» |
| 27 | Variante breve | — | «Огради мя, Господи, силою Честнаго и Животворящаго Твоего Креста» |
| 28 | — | sem título | «Ослаби, остави, прости, Боже, прегрешения наша» |
| 29 | — | sem título | «Ненавидящих и обидящих нас прости, Господи Человеколюбче» |
| 30 | Confissão diária dos pecados | Исповедание грехов повседневное | «Исповедаю Тебе Господу Богу моему и Творцу» |
| 31 | Ao adormecer | — | «В руце Твои, Господи Иисусе Христе, Боже мой, предаю дух мой» |
| 32 | Regra mental antes de dormir | 5 pontos + acréscimo | termina com «Перекрестись и с молитвою засни» |

Rubrica relevante: se após as orações da noite se pretende ir logo dormir, os blocos de «Достойно есть» até à despedida (20–21) podem passar para o fim [2]. → Na app: opção "vou dormir já" que reordena.

### 1.4 Variações sazonais (regras exatas para o motor de regras)

| Período (calendário juliano, móvel a partir da Páscoa) | Regra | Ref. |
|---|---|---|
| **Semana Luminosa** (Светлая седмица): domingo de Páscoa → sábado de manhã inclusive | Orações da manhã **e** da noite substituídas pelas **Horas Pascais** (Часы пасхальные) | [3][4] |
| Páscoa → Ascensão (fora da Semana Luminosa) | «Царю Небесный» é substituído pelo tropário pascal «Христос воскресе из мертвых…» **três vezes** | [2][16] |
| Páscoa → Ascensão | «Достойно есть» é substituído pelo refrão e irmo da 9.ª ode do Cânone Pascal («Ангел вопияше Благодатней…» / «Светися, светися…») | [2][16] |
| Ascensão → Pentecostes (Trindade) | As orações começam por «Святый Боже»; omite-se «Царю Небесный» e o que o precede | [2][16] |
| Pentecostes em diante | Regra normal («Царю Небесный» volta a dizer-se; é a estiquera da festa de Pentecostes) | [1] |
| Resumo da regra "Царю Небесный" | Não se diz **de Páscoa a Pentecostes** | [1] |

Horas Pascais (ordem) [4]: «Молитвами святых отец наших…» → «Христос воскресе из мертвых…» ×3 → «Воскресение Христово видевше…» ×3 → Ипакои «Предварившия утро…» → Кондак «Аще и во гроб снизшел еси…» → «Слава»: «Во гробе плотски…» → «И ныне»: Богородичен → «Господи, помилуй» ×40 → (помянник, quando usadas como regra da manhã) → «Честнейшую Херувим…» → «Христос воскресе» ×3 → oração final/despedida.

Pontos verificados na 2.ª ronda:
- **Limite "até à Ascensão" — ✔ Confirmado (2.ª ronda) quanto aos dias; ⚠ só a noite de quarta-feira → DECISÃO DO UTILIZADOR.** O Molitvoslov do azbyka divide o tempo assim [64]:
  - «От Пасхи до праздника Вознесения Господня (40 дней)»: «Христос воскресе» ×3 e «Ангел вопияше»;
  - «От праздника Вознесения Господня до Дня Святой Троицы (10 дней)»: começa-se no «Трисвятое».
  Os 10 dias (quinta da Ascensão → sábado antes do Pentecostes) mostram que a quinta-feira da Ascensão já pertence ao 2.º período. As *Богослужебные указания* citadas na mesma página dizem «от Недели Фоминой до отдания Пасхи» [64]. A apodose cai na quarta-feira da 6.ª semana (dia 39), pelo que as duas fórmulas coincidem em todos os dias civis. Só a **oração da noite de quarta-feira** fica ambígua, porque liturgicamente já é a véspera da Ascensão. Regra da app: substituições pascais de domingo de Páscoa a **quarta-feira da 6.ª semana inclusive**; a partir de quinta-feira, início em «Святый Боже». Falta decidir a noite de quarta-feira (sugestão: manter as substituições pascais, seguindo o dia civil).
- **Início das orações de Antipascha à Ascensão — ✔ Confirmado (2.ª ronda):** substitui-se **apenas** «Царю Небесный» por «Христос воскресе» ×3. O que precede («Молитвами святых отец…», «Слава Тебе, Боже наш…») mantém-se, e segue-se o Triságio [16][64].
- **Sábado da Semana Luminosa — ✔ Confirmado (2.ª ronda):** as Horas Pascais substituem as orações «7 дней от Пасхи до утра субботы включительно» [64]. No sábado à noite usa-se a regra normal com as substituições pascais.

Pseudo-lógica sugerida:
```
if brightWeek(date) and not (saturday and evening): rule = PASCHAL_HOURS
else:
  base = MORNING|EVENING
  if pascha <= date < ascension: replace(TSARYU_NEBESNY, KHRISTOS_VOSKRESE x3); replace(DOSTOYNO_EST, ANGEL_VOPIYASHE)
  if ascension <= date < pentecost: start_from(TRISAGION)
```

---

## 2. Regras breves de oração

### 2.1 Regra de S. Serafim de Sarov (Правило преподобного Серафима Саровского)

Fonte: [7] (resume a Vida por S. Serafim Tchitchagov e a *Летопись Серафимо-Дивеевского монастыря*); texto no Molitvoslov azbyka: [8].

Versão para leigos ("para todo o cristão", sobretudo para quem não tem tempo ou não sabe ler) [7]:

| Momento | Conteúdo |
|---|---|
| Ao levantar | «Отче наш» ×3 (em honra da Santíssima Trindade); «Богородице Дево, радуйся» ×3; «Символ веры» ×1 |
| Até ao almoço (no trabalho/caminho) | Em silêncio: «Господи Иисусе Христе, Сыне Божий, помилуй мя грешнаго (грешную)»; havendo gente à volta, apenas em pensamento «Господи, помилуй» |
| Antes do almoço | Repetir a regra da manhã |
| Depois do almoço até à noite | Em silêncio: «Пресвятая Богородице, спаси мя грешнаго»; ou «Господи Иисусе Христе, Богородицею помилуй мя грешнаго» |
| Ao deitar | Repetir a regra da manhã e adormecer depois de se benzer |

A *Летопись* de Diveevo transmite uma versão **monástica** mais longa (para as irmãs da comunidade): inclui «Достойно есть», séries de inclinações e prostrações (12 + 12) com orações breves, 12 salmos à noite, pomiánnik e 100 + 100 inclinações com a Oração de Jesus e a oração à Mãe de Deus [7]. → Na app, **não** oferecer a versão monástica como "regra de S. Serafim" para leigos sem indicação clara.

### 2.2 Redução/adaptação da regra

- O documento de 2015 admite que, com a bênção do pai espiritual, a regra antes da Comunhão seja substituída por outras orações (referido a principiantes, crianças, doentes) [5][6]. Por analogia, a app deve apresentar regras reduzidas como **opção pastoral** ("com a bênção do seu confessor"), não como norma.
- ⚠ PARA CONFIRMAR: não se encontrou uma "regra breve para leigos" oficial além da de S. Serafim; muitas edições do Molitvoslov trazem notas próprias sobre regras abreviadas (variam por edição). 2.ª ronda: sem documento sinodal novo; o único texto normativo continua a ser a cláusula de substituição «с благословения духовника» do documento sobre a Eucaristia [6].

---

## 3. Preparação para a Sagrada Comunhão

### 3.1 Norma atual da ROC: «Об участии верных в Евхаристии» (2015)

Documento aprovado pela Conferência Episcopal (Архиерейское совещание) da ROC em 2–3.02.2015, Catedral de Cristo Salvador, Moscovo [5]. Texto também em [6]. Pontos normativos relevantes para a app (secções do documento) [6]:

| Tema | Norma | Secção |
|---|---|---|
| Jejum eucarístico | «полное воздержание от пищи и питья с полуночи до Святого Причащения» (abstinência total de comida e bebida desde a meia-noite) | II.2 |
| Jejum preparatório | Quem comunga algumas vezes por ano: 3 dias de jejum é conforme à tradição; quem comunga todas as semanas ou várias vezes por mês e guarda os jejuns do Typikon pode aproximar-se sem jejum adicional, ou com 1 dia de jejum, ou jejum na véspera à noite — **com a bênção do pai espiritual** | II.1 |
| Regra de oração | Feita fora dos ofícios; «обычно включает в себя каноны Спасителю, Божией Матери, Ангелу Хранителю и другие молитвословия»; «Неизменной частью молитвенной подготовки является "Последование ко святому причащению"» | II.3 |
| Substituição | Com a bênção do confessor a regra pode ser substituída por outras orações | II.3 |
| Semana Luminosa | «молитвенное правило состоит из Пасхального канона, а также канона и молитв ко Святому Причащению»; o Typikon não prevê jejum; jejum limitado a «невкушением пищи после полуночи» | II.1 |
| Confissão | Preferencialmente na véspera ou antes da Liturgia, não durante a leitura do Evangelho/cânone eucarístico; nas Semanas Santa e Luminosa o confessor pode abençoar várias comunhões na semana sem confissão antes de cada uma | III |
| Crianças | Até 3 anos o jejum eucarístico não é obrigatório; aos 7 anos devem estar habituadas a comungar em jejum; primeira confissão habitualmente aos 7 anos | VI |
| Impureza feminina | Os cânones proíbem a comunhão nesse estado (exceções: perigo de morte, hemorragia prolongada por doença) | IV |

→ Implementação: a app deve apresentar estas normas como **orientação geral**, remetendo sempre para o pai espiritual nos pontos em que o documento o exige.

### 3.2 Os três cânones (regra da véspera)

Prática descrita no Molitvoslov: na véspera, assistir ao ofício vespertino e ler em casa, além das orações da noite, o cânone penitencial, o cânone à Mãe de Deus e o cânone ao Anjo da Guarda; de manhã, as orações da manhã e o *Последование* completo, exceto o cânone se já foi lido na véspera [14]. Há opiniões pastorais (azbyka) de que o *Последование* idealmente se lê de manhã, imediatamente antes da Liturgia, mas que se pode ler na véspera [15].

| Cânone | Tom | *Incipit* do irmo da 1.ª ode | Refrão | Conclusão | Ref. |
|---|---|---|---|---|---|
| Penitencial a N. S. Jesus Cristo (Канон покаянный ко Господу нашему Иисусу Христу) | 6 | «Яко по суху пешешествовав Израиль, по бездне стопами…» | «Помилуй мя, Боже, помилуй мя» | Oração «Владыко Христе Боже…» | [11] |
| De súplica à Santíssima Mãe de Deus (Канон молебный ко Пресвятой Богородице), obra do monge Teostericto | 8 | «Воду прошед яко сушу…» | «Пресвятая Богородице, спаси нас» | Orações «Царице моя преблагая…» e «К кому возопию, Владычице?» | [12] |
| Ao Anjo da Guarda (Канон Ангелу Хранителю) | 8 | «Поим Господеви…» | «Святый Ангеле Божий, хранителю мой, моли Бога о мне» | Oração «Ангеле Христов святый, к тебе припадая, молюся…» | [13] |

Estrutura comum: odes 1, 3–9 (a 2.ª ode não existe), com sedalen/Theotokion após a 3.ª e condácio + ícos após a 6.ª [11][12][13]. O cânone molebnyi é precedido pelo tropário «К Богородице прилежно ныне притецем» (×2) e Salmo 50 [12].

Atenção: azbyka tem também um «Канон покаянный ко Пресвятой Богородице» distinto do *molebnyi* [index em 9]; a regra antes da Comunhão usa o **молебный** [5][6][14].

Ordem de leitura quando os cânones são lidos à parte (чин келейного чтения): início habitual (até Símbolo da Fé, com Salmo 50) → cânone(s) → «Достойно есть» → «Слава… И ныне…», «Господи, помилуй» ×3 → despedida. Se combinados com as orações da noite, a parte inicial não se repete e o cânone vai antes de «Достойно есть» [16].

⚠ PARA CONFIRMAR: prática de combinar os três cânones num "cânone triplo" (com os irmos do primeiro cânone e os tropários dos três) — existe em muitas edições, mas não se encontrou fonte oficial. 2.ª ronda: confirma-se apenas que coletâneas correntes (Канонник, «Молитвослов для готовящихся к Исповеди и Причастию») publicam «Три канона совмещённые»; não se encontrou norma sinodal nem rubrica do Typikon. Na app: oferecer como opção, não como norma.

### 3.3 Ofício para a Sagrada Comunhão (Последование ко Святому Причащению, *Posledovanie ko Sviatomu Prichascheniiu*)

Fonte e texto completo: [9]. Estrutura:

1. Início habitual («Молитвами святых отец…», «Царю Небесный», Triságio… «Отче наш», «Господи, помилуй» ×12, «Приидите, поклонимся» ×3).
2. Salmos 22 (23), 23 (24), 115 (116:10–19) + «Аллилуия» ×3.
3. Tropários, tom 8: «Беззакония моя презри…»; «Во причастие святынь Твоих…»; Theotokion «Многая множества…».
4. Salmo 50 (51).
5. **Cânone para a Comunhão**, tom 2: irmo da 1.ª ode «Грядите, людие, поим песнь Христу Богу…»; refrões «Сердце чисто созижди во мне, Боже…», «Не отвержи мене от лица Твоего…», «Пресвятая Богородице, спаси нас»; odes 1, 3–9; condácio após a 6.ª.
6. Após a 9.ª ode: «Достойно есть», Triságio… «Отче наш», tropários penitenciais, «Господи, помилуй» ×40, estiqueras «Хотяй ясти…».
7. **Orações antes da Comunhão** (numeradas):
   1. S. Basílio o Grande — «Владыко Господи Иисусе Христе Боже наш, Источниче живота и безсмертия»
   2. S. João Crisóstomo — «Господи Боже мой, вем, яко несмь достоин»
   3. S. Simeão Metafrasta — «Единый чистый и нетленный Господи»
   4. S. João Damasceno — «Владыко Господи Иисусе Христе, Боже наш, Едине имеяй власть»
   5. S. Basílio o Grande — «Вем, Господи, яко недостойне причащаюся»
   6. S. Simeão o Novo Teólogo — «От скверных устен…» (em verso)
   7. S. João Crisóstomo — «Боже, ослаби, остави…»
   8. Do mesmo — «Несмь доволен, Владыко Господи…»
   9. Do mesmo — «Господи Иисусе Христе Боже мой, ослаби…»
   10. S. João Damasceno — «Пред дверьми храма Твоего предстою»
   - Oração de S. João Crisóstomo (lida também no templo antes de comungar): «Верую, Господи, и исповедую…»
8. Versos de S. Simeão Metafrasta «Се приступаю к Божественному Причащению…», tropários «Вечери Твоея тайныя…» etc., «Услади мя еси любовию…», «Во светлостех святых Твоих…», oração «Владыко Человеколюбче, Господи Иисусе Христе Боже мой…» [9].

Rubrica sobre tropários do início: em domingo que não seja grande festa, tropário dominical do tom; em festa grande/polieléica, o da festa; nos outros dias «Помилуй нас, Господи» [9]. ✔ Confirmado (2.ª ronda): a página do azbyka sobre a regra pascal diz [64]:
- de Páscoa à Ascensão, «все молитвословия предваряются троекратным чтением тропаря Пасхи»; aplicam-se também ao Последование as substituições de §1.4 (incluindo «Ангел вопияше» em vez de «Достойно есть»);
- na Semana Luminosa, a regra para a Comunhão «начинается с Часов Пасхи, после которых следует Пасхальный канон».

Na Semana Luminosa: em vez dos três cânones lê-se o **Cânone Pascal** de S. João Damasceno + cânone e orações para a Comunhão [3][5][6]. Texto do Cânone Pascal: azbyka (Пасхальный канон, творение прп. Иоанна Дамаскина) [ver índice 9]. ⚠ PARA CONFIRMAR: prática de Antipascha até à Ascensão (muitas paróquias abençoam o Cânone Pascal no lugar do penitencial) — sem norma escrita encontrada. 2.ª ronda: o documento de 2015/2016 [5][6] e a página pascal do azbyka [64] só preveem a substituição na **Semana Luminosa**; não se encontrou nada para o resto do período pascal. Na app: fora da Semana Luminosa, regra normal; o Cânone Pascal só como opção «com a bênção do confessor».

### 3.4 Orações de ação de graças após a Comunhão (Благодарственные молитвы по Святом Причащении)

Fonte: [10]. Ordem:
1. «Слава Тебе, Боже» ×3
2. Oração 1.ª — «Благодарю Тя, Господи Боже мой…»
3. Oração 2.ª, S. Basílio — «Владыко Христе Боже, Царю веков…»
4. Oração 3.ª, S. Simeão Metafrasta — «Даяй пищу мне плоть Твою волею…»
5. Oração 4.ª — «Тело Твое святое, Господи Иисусе Христе…»
6. Oração 5.ª, à Mãe de Deus — «Пресвятая Владычице Богородице…»
7. «Ныне отпущаеши раба Твоего, Владыко…» (Cântico de Simeão, Lc 2,29–32)
8. Triságio… «Отче наш»
9. Tropário e condácio do santo cuja Liturgia se celebrou — p. ex. Crisóstomo: tropário tom 8 «Уст твоих, яко светлость огня…», condácio tom 6 «От небес приял еси…»; Theotokion «Предстательство христиан непостыдное…»
10. «Господи, помилуй» ×12; «Честнейшую Херувим…»; despedida.
11. Rubrica final: guardar sobriedade, recolhimento e silêncio no dia da Comunhão.

→ A app deve ter **variante por Liturgia**: S. João Crisóstomo (padrão), S. Basílio o Grande (10 vezes por ano), Pré-santificados (S. Gregório Dialogo). ✔ Confirmado (2.ª ronda): os tropários e condácios são os do santo no Menaion (calendário do azbyka):
- **S. Basílio** (1/14 jan.): tropário, tom 1, «Во всю землю изыде вещание твое…»; condácio, tom 4, «Явился еси основание непоколебимое Церкве…» [69];
- **S. Gregório Dialogo** (12/25 mar.): tropário, tom 4, «Иже от Бога свыше Божественную благодать восприем…»; condácio, tom 3, «Подобоначальник показался еси Начальника пастырем Христа…» [70].
Os textos integrais devem ser retranscritos de fonte em domínio público (Menaion/Molitvoslov pré-1917, ver §6.5).

Existe ainda tradução russa (não litúrgica) das orações para a Comunhão em azbyka (Молитвы ко Св. Причащению на русском языке) [índice 9] — útil como apoio para a tradução portuguesa.

---

## 4. Preparação para a Confissão (Исповедь, *Ispoved'*)

Textos com estatuto oficial (litúrgico):
- **Ofício da Confissão** (Последование исповеди) no Требник (Ritual) — texto sacerdotal; disponível no Требник sinodal de 1906 da biblioteca Ponomar [42].
- **Confissão diária dos pecados** (Исповедание грехов повседневное), parte das orações da noite do Molitvoslov: «Исповедаю Тебе Господу Богу моему и Творцу…» [2]. É o único "exame de consciência" que faz parte do livro de orações padrão.
- Cânone penitencial ao Senhor (§3.2) [11].
- Normas da ROC sobre a prática (2015, secção III) [6].

Listas de pecados ("перечни грехов", questionários): existem dezenas de publicações; nenhuma das encontradas tem estatuto sinodal. Exemplos de obras **privadas** (de autor):
- arquim. João (Krestiankin), *Опыт построения исповеди* (Сретенский монастырь, 2016) — conferências de Quaresma em Pskovo-Petchory [17].
- Coletâneas como «Полная исповедь…» e muitas brochuras paroquiais [18] (estudo histórico das listas de pecados russas sécs. XIV–XIX: Korogodina, *Исповедь в России* [18]).
- ✔ Confirmado (2.ª ronda): «В помощь кающимся» é uma **compilação** feita «по творениям святителя Игнатия Брянчанинова» e não uma obra escrita por ele como tal. As edições correntes incluem uma secção «Дополнения из разных источников» [71]. O compilador não é identificado nas fontes consultadas. Na app: atribuir como «compilação a partir de S. Inácio (Briantchaninov)».
- ⚠ PARA CONFIRMAR: se a Comissão Inter-Conciliar (Межсоборное присутствие) publicou algum documento/projeto sobre a prática da confissão posterior a 2015 — a pesquisa não encontrou texto. 2.ª ronda: nova pesquisa (azbyka, patriarchia, pesquisa geral) sem resultado.

Recomendação para a app: oferecer (a) a confissão diária do Molitvoslov e (b) um exame de consciência **assinalado como obra de autor X, com licença/permissão**, nunca como "lista oficial da Igreja". Notas pessoais para confissão: guardar apenas localmente/cifradas (dados sensíveis).

---

## 5. Práticas devocionais

### 5.1 Oração de Jesus (Иисусова молитва, *Iisusova molitva*; gr. Εὐχὴ τοῦ Ἰησοῦ)

- Forma completa: «Господи Иисусе Христе, Сыне Божий, помилуй мя грешнаго» (fem. «грешную») — a palavra «грешнаго» é acréscimo posterior; formas breves: «Господи Иисусе Христе, помилуй мя» (uso grego), «Иисусе, Сыне Божий, помилуй мя» [19].
- Fundamento evangélico: cego Bartimeu (Mc 10,46–52), cananeia (Mt 15,22), publicano (Lc 18,13) [19].
- Tradição: Diádoco de Foticeia e Hesíquio de Jerusalém (séc. V); hesicastas do séc. XIV (S. Gregório Sinaíta, S. Gregório Palamas); na Rússia desde o séc. XI [19]. Leitura: *Добротолюбие* (Filocalia), S. Inácio (Briantchaninov), S. Teófano o Recluso, *Откровенные рассказы странника* [19].
- Advertência: a prática intensiva ("умное делание", oração do coração) deve fazer-se sob orientação de um pai espiritual experiente (S. Barsanúfio de Optina: «Без руководства… эту молитву проходить опасно») [19]. → A app pode ter contador de orações, mas **sem** instruções de técnicas psicofísicas (respiração etc.) e com aviso.

### 5.2 Terço de oração (Чётки, *Chiotki*; gr. κομποσχοίνι)

- Fio fechado com contas ou nós e uma cruz; contas maiores dividem em dezenas; o mais comum: **50 ou 100**; terços de cela monástica até 1000; forma antiga russa: лестовка (*lestovka*) [20].
- Uso: uma Oração de Jesus por conta; nas contas grandes, habitualmente uma oração à Mãe de Deus ou «Достойно есть»; no fim, «Отче наш» [20].
- Fazem parte do hábito monástico; leigos podem usá-los **com a bênção do confessor**, normalmente não à vista (no bolso ou em casa) [20].
- → App: contador configurável (33/50/100/150/1000), marcadores a cada 10/25, sem gamificação ostensiva.

### 5.3 Sinal da cruz (Крестное знамение) e dedos (Перстосложение)

- **Троеперстие** (*troeperstie*): polegar, indicador e médio juntos = Santíssima Trindade; anelar e mínimo dobrados sobre a palma = duas naturezas de Cristo [21].
- Ordem: **testa → ventre (acima do umbigo) → ombro direito → ombro esquerdo** [22].
- Primeiro completa-se o sinal da cruz, baixa-se a mão e só depois se faz a inclinação; não fazer as duas coisas ao mesmo tempo [22].
- Bispos e sacerdotes abençoam com o "перстосложение именословное" (dedos formando IC XC) [21].
- A forma é disciplinar, não dogma estrito (ex.: quem não tem a mão direita pode usar a esquerda) [21].
- → Ilustrações da app devem mostrar a ordem direita→esquerda (inverso da prática latina).

### 5.4 Inclinações e prostrações (Поклоны)

- **Поясной поклон** (*poiasnoi*, inclinação até à cintura) e **земной поклон** (*zemnoi*, prostração até ao chão, de joelhos, tocando o chão com a cabeça) [22][24].
- Prostrações **não** se fazem: aos domingos, nas festas do Senhor, de Natal a Teofania, de Páscoa a Pentecostes, e pelos comungantes no dia da Comunhão (cân. 20 do I Concílio Ecuménico e 90 do VI) [24][23]. Typikon: nesses dias, em vez de prostração, inclinação até a mão tocar o chão [24].
- ✔ Confirmado (2.ª ronda): limites na Semana Santa [67][68]:
  - no templo, as últimas prostrações (3, normalmente com a oração de S. Efrém) fazem-se no fim da Liturgia dos Pré-santificados de **Quarta-feira Santa**. O Typikon diz: «и абие упраздняются совершенно в церкви бываемые земные поклоны; в келлиях же даже и до Великого Пятка совершаются»;
  - em casa (cela) podem fazer-se até **Sexta-feira Santa**;
  - exceção: prostrações diante do **Epitáfio** (Плащаница) na Sexta e no Sábado Santos;
  - recomeçam nas Vésperas de Pentecostes (orações de joelhos).
- → Regras de prostrações (p. ex. oração de S. Efrém na Quaresma) devem ser condicionadas por esta tabela.

### 5.5 Acatistos (Акафисты; gr. Ἀκάθιστος Ὕμνος)

- Hino de louvor cantado de pé: **13 condácios e 12 ícos** alternados; os ícos terminam com refrão («Радуйся…»), os condácios com «Аллилуиа» [25].
- Único acatisto com lugar no Typikon: **Acatisto à Mãe de Deus**, nas Matinas do sábado da 5.ª semana da Grande Quaresma («Похвала Богородицы») [25]. Os restantes são hinos não litúrgicos (oração privada; molebens após a 6.ª ode) [25].
- Ordem de leitura em casa: início habitual → acatisto → conclusão (ver §3.2, чин келейного чтения) [16]. ⚠ PARA CONFIRMAR: a prática corrente "condácio 13 três vezes, depois ícos 1 e condácio 1, e oração" não foi confirmada numa fonte oficial (consta das edições impressas de acatistos). 2.ª ronda: nem o «Чин келейного чтения» [16] nem o artigo «Акафист» [25] do azbyka descrevem esta repetição; o ponto mantém-se. Fonte a consultar: uma edição pré-1917 de acatistos em domínio público (§6.5).
- **Aprovação**: desde 29.04.2011 existe no Conselho Editorial um Grupo de Trabalho para a codificação dos acatistos; os acatistos sem aprovação eclesiástica oficial devem passar por esse grupo e os projetos são submetidos ao Santo Sínodo; por determinação de 14.05.2018 (jornal n.º 28, p. 11), o Sínodo só aceita acatistos a santos recém-glorificados depois de aprovado o ofício litúrgico completo [26].
- Quaresma: há referência a uma decisão sinodal de 2018 que «не рекомендовать совершение акафистов после Божественной литургии, а также в период Святой Четыредесятницы» (exceto o Acatisto do sábado da 5.ª semana e a Пассия) [27]. ✔ Confirmado (2.ª ronda): é a determinação do Santo Sínodo de **14.05.2018, ata n.º 28**, sobre o documento da Comissão Inter-Conciliar «Акафист в молитвенной жизни Церкви». Texto: «не рекомендовать совершение акафистов после Божественной литургии, а также в период Святой Четыредесятницы, за исключением утрени субботы пятой седмицы и чинопоследования пассии в тех храмах, где имеется обычай» [27][65][66]. Refere-se ao **culto público**; não regula a oração privada [27]. (patriarchia.ru continua ilegível por ferramentas automáticas; a ata é citada por notícia oficial do Conselho Editorial [65].)
- Acatistos de uso muito comum (lista indicativa, **não normativa**): à Mãe de Deus; a Jesus Dulcíssimo (Иисусу Сладчайшему); a S. Nicolau; ao Anjo da Guarda; «Слава Богу за всё»; a ícones da Mãe de Deus. Coleção: azbyka (Акафисты) [25]. ⚠ PARA CONFIRMAR: estatuto de aprovação sinodal de cada acatisto incluído na app. 2.ª ronda — o que o Sínodo fixou em 14.05.2018 [66]:
- recordou a inadmissibilidade de usar acatistos **não aprovados pelo Santo Sínodo nem incluídos em edições oficiais**;
- os bispos só podem abençoar novos acatistos a santos locais, dentro da sua diocese;
- encarregou o Conselho Editorial de publicar e atualizar uma **lista dos acatistos aprovados**.
Não se encontrou essa lista consolidada em linha (há aprovações avulsas, p. ex. no Sínodo de 28.12.2018). → **DECISÃO DO UTILIZADOR**: critério de inclusão na app. Sugestão: só acatistos com aprovação sinodal documentada ou de edições pré-1917 com aprovação do Santo Sínodo, assinalando a fonte de cada um.

### 5.6 Saltério (Псалтирь, *Psaltir'*; gr. Ψαλτήριον) e catismas (кафизмы)

- 20 catismas (gr. κάθισμα, "sentado"), cada uma dividida em **3 "Glórias"/estâncias** (славы / статии) [28][31].
- Leitura semanal completa segundo o Typikon; **duas vezes por semana na Grande Quaresma**; a semana litúrgica começa no sábado à noite (vésperas de domingo, catisma 1) [28][31].
- Divisão (numeração LXX) [29]:

| Catisma | Salmos | Catisma | Salmos |
|---|---|---|---|
| 1 | 1–8 | 11 | 77–84 |
| 2 | 9–16 | 12 | 85–90 |
| 3 | 17–23 | 13 | 91–100 |
| 4 | 24–31 | 14 | 101–104 |
| 5 | 32–36 | 15 | 105–108 |
| 6 | 37–45 | 16 | 109–117 |
| 7 | 46–54 | 17 | 118 |
| 8 | 55–63 | 18 | 119–133 |
| 9 | 64–69 | 19 | 134–142 |
| 10 | 70–76 | 20 | 143–151 |

- Estrutura de cada catisma (leitura privada): orações antes do Saltério (uma vez, no início); em cada "Glória": «Слава… И ныне… Аллилуиа» ×3 «Слава Тебе, Боже» ×3, «Господи, помилуй» ×3 [28][29]; no fim: Triságio… «Отче наш», tropários do tom indicado, «Господи, помилуй» ×40, oração da catisma [29].
- **Leitura pelos defuntos**: em cada "Glória" lê-se a oração «Помяни, Господи Боже наш…» (pelo defunto); prática moderna: começar com as orações iniciais e o tropário «Глубиною мудрости…», terminar o Saltério com o cânone pelo defunto; prática antiga: precedido do cânone por um/vários defuntos; pode ser feita por qualquer leigo piedoso, continuamente até ao funeral e depois em memória [30]. ⚠ PARA CONFIRMAR: variante para os **vivos** (inserções "о здравии") — não descrita em [30]. 2.ª ronda: só se encontrou a prática de **grupos** organizados pelo azbyka: nomes «о здравии» comemorados na 1.ª e 2.ª «Glória» de cada catisma e nomes «об упокоении» na 3.ª [30]. É regra de uma plataforma, não norma eclesial. O texto da oração a inserir pelos vivos continua por confirmar numa fonte litúrgica.
- → Modelo de dados: `Psalm{lxx, mt, verses}` + `Kathisma{n, stasis[3]}`; planos de leitura (1 catisma/dia; leitura em grupo — azbyka tem regras para grupos [30]).

### 5.7 Pomiánnik (Помянник, lista de comemoração) e notas (записки)

- O Molitvoslov inclui um pomiánnik opcional em vez das orações breves pelos vivos e defuntos [1].
- Notas para a igreja: «О здравии» / «Об упокоении»; só se escrevem nomes de **batizados na Igreja Ortodoxa**; nomes na forma eclesiástica (Иоанн, não Иван) [34].
- Suicidas e não batizados não são comemorados na igreja; desde a determinação do Sínodo de 27.07.2011 existe um «Чин молитвеннаго утешения сродников живот свой самовольне скончавшаго» e os familiares podem, com bênção, rezar em privado [35][34]. Oração privada atribuída a S. Leão de Optina para quem morreu sem arrependimento (também lida em privado por não batizados/suicidas) [33].
- → App: o pomiánnik é dado pessoal sensível; separar "vivos"/"defuntos"; campo de nome eclesiástico; aviso pastoral nos casos acima (sem impedir oração privada).

### 5.8 Orações antes e depois das refeições

Fonte: [32].
- Antes: «Отче наш» **ou** «Очи всех на Тя, Господи, уповают…» (Sl 144,15–16); depois «Господи Иисусе Христе Боже наш, благослови нам пищу и питие…» com sinal da cruz sobre a mesa.
- Depois: «Благодарим Тя, Христе Боже наш…».
- Nas 12 grandes festas e na Páscoa substitui-se pela leitura/canto do tropário da festa; bênçãos especiais (alimentos pascais, Natal, Dormição, S. Pedro e S. Paulo) [32].
- O Часослов (Horologion) traz a forma monástica (Молитвы в трапезе: «Ядят убозии и насытятся…») [43].

### 5.9 Orações pelos defuntos

azbyka reúne [33]: Последование по исходе души от тела (para leigos); Лития (litia) feita por leigo em casa/no cemitério; Панихида para leigos; comemoração no tempo pascal; orações dos filhos pelos pais, do viúvo/viúva, por quem morreu subitamente, longe da pátria, após doença prolongada, com doença mental; cânone «по исходе души от тела».
- Oração breve no Molitvoslov: «Упокой, Господи, души усопших раб Твоих…» (item 26 da manhã) [1].

---

## 6. Fontes textuais e licenças (crítico)

### 6.1 Eslavo eclesiástico

#### 6.1.1 Ortografias e codificações

| Forma | Descrição | Uso na app |
|---|---|---|
| Ortografia eslava (церковнославянский шрифт) | Letras históricas (ѣ, ѡ, ѵ, ѳ, ꙋ, ѧ…), acentos e espíritos, títulos (abreviaturas com ҃), algarismos cirílicos | Modo "eslavo autêntico"; requer Unicode + fonte OFL |
| "Escrita civil" (гражданский шрифт) com acentos | Texto eslavo em ortografia russa moderna com acentos (ex.: «Бо́же, очи́сти мя…») — é o formato de azbyka [1][2] | Modo "eslavo legível" (recomendado como padrão) |
| Codificações legadas (UCS / Ирмологион, HIP) | Texto em fontes de 8 bits que **parecem** eslavo mas usam latim/dígitos (ex. «ЦRю2 нбcный» = «Царю небесный») | **Não usar** sem conversão |

- **Unicode Technical Note #41 — Church Slavonic Typography in Unicode** (A. Andreev, Y. Shardt, N. Simmons, v1, 04.11.2015): modelo de codificação, tipografia, ordenação, métodos de entrada, romanização e numerais cirílicos [40]. Referência obrigatória para o pipeline de texto (normalização NFC, marcas combinatórias, títulos).
- azbyka.ru no modo «Церковнославянский шрифт» usa **codificação legada UCS** (`class="slavic"`, texto do tipo «ЦRю2 нбcный, ўтёшителю…») — verificado no HTML de [44]. Para usar, converter com os conversores SCI (UCS/HIP → Unicode; extensão LibreOffice «Church Slavonic Converter Extension») [39][45].
- ✔ Confirmado (2.ª ronda), lido o PDF da UTN #41 [40]:
  - a nota não impõe NFC nem NFD. No eslavo sinodal moderno **todas** as marcas combinatórias têm classe combinatória 230, pelo que a reordenação canónica «is not an issue»; NFC é seguro para armazenamento;
  - só há problema em textos não normalizados, p. ex. U+0358 (classe 232) com o título U+0483. Nesse caso insere-se **U+034F COMBINING GRAPHEME JOINER** para impedir a reordenação;
  - **ambiguidades** a tratar na pesquisa/colação:
    - U+047D/U+047C «ѽ» não tem decomposição canónica, mas equivale linguística e tipograficamente a U+A64D/U+A64C + U+0486 + U+0311 (duas codificações possíveis, a tratar na colação);
    - o duplo agudo U+030B (okovavy) e o duplo grave U+030F (kendema) podem aparecer como dois acentos separados.
  → Pipeline: guardar em NFC e aplicar uma função de *folding* própria para pesquisa.

#### 6.1.2 Fontes de texto legíveis por máquina

| Fonte | Conteúdo | Formato | Licença | Ref. |
|---|---|---|---|---|
| **Biblioteca Ponomar** (ponomar.net/maktabah) | Апостол (МП 1989), Евангелие (1984), Ирмологий (1995), Минея mensal (Правило веры 1996–97), Минея общая (2002), Октоих (1981), Псалтирь следованная (1978), Служебник 1906, Требник 1906, Типикон (2002), Триодь постная/цветная (1992), **Часослов (1991)**, Добротолюбие | HTML em **Unicode eslavo real** (verificado: U+A64B, U+1C82, U+2DED…) + PDF/DJVU | Licença dos textos não declarada no site [41][38]; dados Ponomar tratados como GPL — irrelevante: decisão 7/8 (não se usam como dados; ver §6.5) | [41][42][43] |
| Repositórios Git Ponomar/SCI | github.com/typiconman, github.com/slavonic (ferramentas) | código | Software SCI: MIT salvo indicação em contrário [38]; licença de dados — irrelevante: decisão 7/8 | [38][41] |
| azbyka.ru Molitvoslov | Orações da manhã/noite, cânones, acatistos, Saltério por catismas (também PDF/ePub) | HTML em escrita civil com acentos (Unicode); modo eslavo em UCS legado | Apenas «©2026 Молитвослов»; sem licença aberta encontrada → **pedir autorização** | [1][29][44] |
| Edições sinodais pré-1917 (Служебник/Требник 1906) | Textos litúrgicos | via Ponomar | Domínio público na UE: obra anónima/coletiva publicada há mais de 70 anos [75]. ✔ Confirmado (2.ª ronda) para a UE/PT; regime russo não verificado. Usar as **digitalizações** da edição, não o HTML Ponomar (ver §6.5) | [42][75] |

Notas:
- O **Molitvoslov** como livro autónomo não aparece na lista da Biblioteca Ponomar [42]; grande parte do seu conteúdo está no Часослов (Horologion) e no Псалтирь следованная (orações da manhã/noite estão em edições do "Псалтирь следованная"/"Канонник"). Ponto «em que livro Ponomar estão as orações da manhã/noite» — irrelevante: decisão 7/8 (os dados Ponomar não se usam; fonte alternativa em §6.5).
- Os textos litúrgicos tradicionais são anónimos/antigos; mas as **edições modernas** (1978–2002) podem ter direitos editoriais (composição, correções). Estatuto das edições modernas do Издательство МП — irrelevante: decisão 7/8 (usam-se edições pré-1917; ver §6.5).

#### 6.1.3 Tipos de letra (todos SIL OFL 1.1)

Projeto Slavonic Computing Initiative (SCI, sci.ponomar.net) [36][37][38]:

| Fonte | Uso |
|---|---|
| **Ponomar** (ex-Hirmos Ponomar) | Eslavo sinodal moderno (também romeno cirílico, aleúte, iacuto) — **recomendada para o corpo de texto** |
| Pochaevsk | Edições de Potchaiv (fim séc. XIX) e Jordanville |
| Triodion | Livros litúrgicos russos do início do séc. XX |
| Acathist | Edições sinodais de grande formato |
| Fedorovsk, Vilnius | Impressos pré-nikonianos |
| Menaion, Voskresensky | Manuscritos (ustav; Glagolítico; neumas znamenny experimentais) |
| **Monomakh** | Académico (ustav/poluustav + latim) |
| Shafarik | Antigo eslavo (cirílico + glagolítico) |
| Indiction, Vertograd, Cathisma, Oglavie, Pomorsky | Capitulares e títulos decorativos |
| FiraSlav | Monoespaçada para edição |

- Licença das fontes: **SIL Open Font License 1.1**; drivers de teclado, pacotes TeX e outro código: **MIT** (salvo indicação) [38].
- Há pacote de **webfonts** para alojar no próprio servidor (OFL) [39]. → Self-host (não depender de CDN externo); incluir o texto da OFL nos créditos da app.

### 6.2 Traduções portuguesas de textos ortodoxos

#### 6.2.1 Patriarcado de Moscovo em Portugal (PT-PT) — fonte preferencial

Contexto: a Diocese de Espanha e Portugal (Испанско-Португальская / Мадридская и Лиссабонская епархия; *Diócesis de Madrid y Lisboa*) foi criada a 28.12.2018, integrada no Exarcado Patriarcal da Europa Ocidental; arcebispo Nestor (Sirotenko); site orthodoxspain.com [47].

| Obra | Dados | PT | Licença | Ref. |
|---|---|---|---|---|
| **Missal Ortodoxo — Horas do Ofício Divino e Liturgia Eucarística** (Portugal, 2019) | Coord. e comentários: Pe. Dr. Pedro Pruteanu; tradutor principal: Prof. Dr. Luís Filipe Thomaz; colab.: Pe. Ivan Gherboveţchi, Gabriela Mota; bênção do arcebispo Nestor (Patriarcado de Moscovo); traduzido do grego tendo em conta traduções modernas; contém Vésperas, Matinas, as três Liturgias, orações de absolvição | PT-PT | «Todos os direitos reservados…» (DL 143/2014); © 2019 Associação "LusOrtodoxia"; reprodução só com autorização escrita | [50][54] |
| **Devocionário Ortodoxo** (2021) | Trad./ed.: Hegúmeno Pedro (Pruteanu) e Hierodiácono Jerónimo (Thomaz), paróquia de S. João Crisóstomo, Cascais; bênção do arcebispo Nestor; ed. **Paulus** (PT e BR); ~228–230 pp.; contém orações da manhã e da noite, partes fixas de Vésperas/Completas/Matinas, preparação e ação de graças da Comunhão (do Missal), Horas, Cânone penitencial (S. Teodoro Estudita), Cânone paraclético à Deípara, Acatisto, instrução sobre a confissão, glossário | PT-PT | Edição comercial; sem licença aberta | [48][49] |
| **Liturgia Eucarística de S. João Crisóstomo** (Cascais, 2023) | Bênção de D. Pedro (Pruteanu), bispo de Caffa, auxiliar do exarca patriarcal; inclui rubrica pascal («Da Páscoa à Ascensão, canta-se por três vezes: "Cristo ressuscitou dos mortos…"») | PT-PT ("connosco", "Ámen") | PDF cifrado (cópia desativada); sem licença | [51] |
| ortodoxia.pt ("Ortodoxia em Portugal — Portal missionário e catequético") | Textos, homilias, «Cânone paraclético à Santíssima Deípara», léxico | PT-PT | «Copyright © 2026 ORTODOXIA EM PORTUGAL» | [49][52][53] |
| **Pequeno léxico** do Pe. Jerónimo Thomaz (2023) | Opções terminológicas: *Deípara* (Theotokos) — preferida a "Mãe de Deus" (considerada ambígua); *Soberano/Soberana* (Despota/Despina), reservando *Senhor/Senhora* para Kyrios; *Cânon*, *Ode*, *Hirmos*, *Tropário*, *Theotókion*, *Apolytíkion*, *Acatisto*, *Triságio*, *Catisma*, *Metanóia*, *Prokímenon*, *Ecfonese*… | PT-PT | idem | [52] |

**Conclusão de licenciamento**: não foi encontrada **nenhuma** tradução portuguesa (PT-PT) de orações ortodoxas com licença aberta. A fonte terminologicamente mais adequada (mesma jurisdição, PT-PT) é a da equipa de Cascais/LusOrtodoxia, mas é **todos os direitos reservados**. → Ação recomendada: pedir autorização escrita à Associação LusOrtodoxia / Diocese (arcebispo Nestor) para uso dos textos do Devocionário/Missal na app; alternativa: tradução própria revista por clero da diocese, alinhada com o léxico [52].

— irrelevante: decisão 7/8 — (dúvida original: o Devocionário traduz as orações da manhã/noite **russas** (Molitvoslov) ou um conjunto de tradição greco-romena (o conteúdo descrito inclui o cânone penitencial de S. Teodoro Estudita e Cânone paraclético, típicos da tradição grega/romena) [49]. Verificar no livro se a ordem coincide com §1.2–1.3; caso contrário a app terá de traduzir os blocos em falta.) Com a decisão 7 (tradução própria) a questão deixa de condicionar a app.

— irrelevante: decisão 7/8 — o PDF da Liturgia [51] contém notas de tradução que referem a tradução romena — as escolhas podem diferir do uso eslavo (ex.: "Deípara"); validar com o clero da paróquia russa local.

#### 6.2.2 Outras jurisdições / Brasil (PT-BR)

| Fonte | Jurisdição | PT | Licença | Ref. |
|---|---|---|---|---|
| ECCLESIA (ecclesia.com.br) — biblioteca com secções Liturgia/Espiritualidade | Portal brasileiro com ligação ao Patriarcado Ecuménico (lista também jurisdições antioquina, sérvia, ucraniana) | PT-BR | «©2003-2025 – ECCLESIA (Brasil). Todos os direitos reservados» | [55] |
| Divina Liturgia (Canadian Journal of Orthodox Christianity, 2019) | Adaptação de texto de "Ortodoxia Portugal" | PT | — irrelevante: decisão 7/8 | [56] |
| Metrópole Ortodoxa de Espanha e Portugal (Patriarcado Ecuménico) | — | — | Não foram encontrados textos em PT | — |
| Igreja Russa no Estrangeiro (ROCOR) no Brasil; Arquidiocese Antioquina de S. Paulo | — | PT-BR | — irrelevante: decisão 7/8 (sites não acessíveis na 1.ª ronda; não verificado) | — |

Notas PT-BR vs PT-PT: textos brasileiros usam "você/vocês", "Amém", ortografia e vocabulário distintos (ex.: "Mãe de Deus" vs "Deípara"; "Pai Nosso" igual); **não** misturar fontes num mesmo texto sem revisão. — irrelevante: decisão 7/8 — existência de organismos não canónicos que publicam em português (p. ex. "Igreja Católica Ortodoxa de Portugal", descrita como não canónica no doc. 04, refs. [52][53] desse documento) — evitar como fonte.

### 6.3 Bíblia

#### 6.3.1 Bíblia eslava (Елизаветинская Библия, *Elizavetinskaia Bibliia*)

- Publicada em 1751, com edições em 1756, 1757 e 1759; a 2.ª edição (revista) é a base de todas as reimpressões e é a versão autorizada da ROC [58].
- **CrossWire SWORD módulo `CSlElizabeth`** — "1757 Church Slavonic Elizabeth Bible", v1.5.2 (2011), fonte eletrónica rusbible.ru, **ortografia modernizada**, licença **Public Domain** [57].
- Biblioteca Ponomar: Евангелие (1984) e Апостол (1989) em Unicode eslavo (leituras litúrgicas) [42].
- azbyka.ru/biblia: eslavo (ortografia eslava, pré-reforma e civil), Sinodal russa e LXX Rahlfs em paralelo; mesma questão de licença que o resto do azbyka [59].
- ⚠ PARA CONFIRMAR: fonte em Unicode eslavo completo (com acentos e títulos) e licença explícita para a Bíblia inteira (para o Saltério em especial). 2.ª ronda: não se encontrou transcrição livre em **ortografia eslava autêntica**:
  - CSlElizabeth é domínio público mas com «modernized spelling» [57];
  - Ponomar é GPL (decisão 8);
  - azbyka tem © sem licença [59].
  Solução: transcrição própria a partir de digitalizações pré-1917 (§6.5).

#### 6.3.2 Bíblia em português

| Tradução | Variante | Cânone | Numeração dos salmos | Licença | Ref. |
|---|---|---|---|---|---|
| **Almeida 1911** (reimp. de 1900; trad. séc. XVII) — SWORD `PorAlmeida1911` | PT antigo (ortografia de 1911) | protestante ⚠ | massorética ⚠ | GPL (segundo CrossWire) ⚠ texto provavelmente em domínio público | [60] |
| **Bíblia Livre** (BLIVRE, 2018; atualização da Almeida 1819, Textus Receptus) | PT-BR | protestante ⚠ | massorética | **CC BY 4.0 Brasil** (atribuição obrigatória, indicar data da versão) | [61] |
| **Bíblia Portuguesa Mundial** (BPM) | PT-BR | ✔ Confirmado (2.ª ronda): inclui Tobite, Judite, Ester e Daniel gregos, Sabedoria, Sirácida, Baruc, 1–3 Macabeus, 1 Esdras, Oração de Manassés, Salmo 151, 2 Esdras e 4 Macabeus [80] | massorética ⚠ | **Domínio público**; declarada "rascunho em revisão" | [62] |
| **Figueiredo** (Pe. António Pereira de Figueiredo, trad. da Vulgata; NT 1778–81, AT 1782–90) | **PT-PT** (antigo) | inclui deuterocanónicos (edições posteriores de 1828 retiraram-nos) | Vulgata (≈ LXX) ⚠ | domínio público (autor † 1797) | [63] |
| Traduções modernas (Sociedade Bíblica de Portugal, ARC/ARA/ACF, católicas) | PT-PT/PT-BR | — | — | Protegidas por direitos — irrelevante: decisão 7/8 (não se usam) | — |

Recomendação: para os **salmos** dentro das orações (Sl 50, 22, 23, 115, etc.) a tradução deve seguir a **LXX** (o texto eslavo traduz a LXX). Nenhuma das Bíblias PT livres segue a LXX; Figueiredo (Vulgata) aproxima-se na numeração e em parte no texto, mas precisa de digitalização/OCR. ✔ Confirmado (2.ª ronda) — fontes digitais: digitalizações com OCR no archive.org.
- Edição de **Londres, Harrison e Filhos, 1866**, num só volume [78]. O OCR é utilizável mas com erros. Não traz os livros deuterocanónicos: no OCR não aparece o título «Livro de Tobias» (verificação por OCR).
- Série «Bíblia Sagrada (Volume I–XVI)», sem data de edição nos metadados [79].
Ver §6.5.4. Alternativa: tradução própria dos salmos litúrgicos a partir da LXX/eslavo, ou licenciar a tradução do Missal/Devocionário (que contém salmos e hinos) [48][50].

#### 6.3.3 Livros e cânone

- A Bíblia ortodoxa russa inclui os livros "não canónicos"/anaginoskómena (Tobias, Judite, Sabedoria, Sirácida, Baruc, 1–3 Macabeus, 2–3 Esdras…) e o Salmo 151 [58][31]. ✔ Confirmado (2.ª ronda), segundo a *Enciclopédia Ortodoxa* [82], são **não canónicos** na Bíblia eslava/russa:
- os livros de Tobias, Judite, Sabedoria de Salomão, Sabedoria de Jesus filho de Sirac, 2 Esdras (= 1 Esd grego), 3 Esdras (= 4 Esd latino), Epístola de Jeremias, Baruc e os 3 livros dos Macabeus;
- partes de livros canónicos: Oração de Manassés (fim de 2 Paralipómenos), acrescentos a Ester (7 trechos sem numeração de versículos), Salmo 151, e Daniel 3,24–90, 13 e 14.

#### 6.3.4 Numeração dos salmos (LXX vs. massorética)

Correspondência [31]:

| LXX / eslavo / Vulgata | Massorético (hebraico; Bíblias protestantes e modernas) |
|---|---|
| 1–8 | 1–8 |
| 9 | 9–10 |
| 10–112 | 11–113 (= LXX + 1) |
| 113 | 114–115 |
| 114 | 116:1–9 |
| 115 | 116:10–19 |
| 116–145 | 117–146 (= LXX + 1) |
| 146 | 147:1–11 |
| 147 | 147:12–20 |
| 148–150 | 148–150 |
| 151 | (não existe; fora do cânone hebraico) |

- Exemplos práticos: Sl 50 (eslavo) = Sl 51 (hebraico); Sl 90 «Живый в помощи Вышняго» = Sl 91; Sl 118 (catisma 17) = Sl 119.
- ✔ Confirmado (2.ª ronda): **numeração dos versículos**:
  - eslavo, sinodal russo e Vulgata/Figueiredo **contam o título** como versículo(s). Ex.: Sl 50 — vv. 1–2 = título, v. 3 = «Помилуй мя, Боже» / «Tem piedade de mim, ó Deos» (verificado no módulo CSlElizabeth, no texto sinodal do azbyka e no OCR de Figueiredo 1866) [57][59][78];
  - as Bíblias protestantes em português (linha Almeida) **não numeram** o título: Sl 51,1 = «Tem misericórdia de mim, ó Deus» [81].
  O desvio é de 0 a 2 versículos, conforme o salmo tenha título curto, longo ou nenhum. → Construir a tabela de correspondência por **alinhamento de texto**, salmo a salmo, não por fórmula (ver §6.5.5).
- → Modelo de dados: guardar ambos (`lxx`, `mt`) e mostrar a LXX por omissão na interface litúrgica, com a MT entre parênteses.

### 6.4 Matriz de decisão de licenciamento (resumo)

| Necessidade | Fonte candidata | Estado | Próxima ação |
|---|---|---|---|
| Eslavo, orações (Unicode) | Ponomar (Часослов etc.) | Licença dos textos não declarada | Contactar SCI/Ponomar (contacto no site) [41] |
| Eslavo, orações (escrita civil c/ acentos) | azbyka.ru | © sem licença aberta | Pedir autorização ou derivar de edições pré-1917 |
| Fontes eslavas | SCI (Ponomar, Monomakh…) | OFL 1.1 ✔ | Self-host + créditos [38] |
| PT-PT orações | Devocionário / Missal (LusOrtodoxia) | Todos os direitos reservados | Pedir autorização escrita à LusOrtodoxia/Diocese |
| PT Bíblia | Bíblia Livre (CC BY), BPM (PD), Almeida 1911 | Livres mas PT-BR/antigo, numeração MT | Adaptar; salmos litúrgicos a partir da LXX |
| Eslavo Bíblia | CSlElizabeth (PD) | ✔ (ortografia modernizada) | Verificar codificação/acentos |

> Nota (2.ª ronda): com as decisões 7 e 8, as linhas «Ponomar», «azbyka» e «Devocionário/Missal» desta matriz deixam de ser opções; a via adotada está em §6.5.

### 6.5 Fontes em domínio público para o eslavo e para o português (2.ª ronda; decisões 5, 7 e 8)

Objetivo: obter o texto eslavo (lado a lado com a tradução própria, decisão 5) **sem** dados GPL nem textos com direitos reservados (decisões 7 e 8).

#### 6.5.1 Enquadramento jurídico (resumo técnico, não é parecer jurídico)

- **Prazo de proteção na UE/PT** (Diretiva 2006/116/CE): em regra, vida do autor + 70 anos. Para obras **anónimas** ou coletivas sem autor identificado, 70 anos após a obra ser «licitamente tornada acessível ao público» [75]. As edições sinodais (Синодальная типография, «по благословению Святейшего Правительствующего Синода») anteriores a 1917 têm mais de 100 anos → **domínio público na UE/PT**. Regime russo não verificado nesta ronda.
- **Reimpressões modernas** («репринт», edições МП 1978–2002) podem acrescentar material editorial próprio (introduções, correções, paginação). Usar a **impressão original** pré-1917 (cf. §6.1.2).
- **Transcrições**: na UE só há direito de autor quando há «criação intelectual própria do autor» (TJUE, C-5/08 *Infopaq*) [77]. Uma transcrição fiel de texto em domínio público dificilmente o cria. Porém, um corpus pode estar protegido pelo **direito *sui generis* das bases de dados** contra a extração de uma parte substancial (Diretiva 96/9/CE, art. 7.º) [76]. As digitalizações Ponomar estão sob GPL (decisão 8).
  → **O texto subjacente (edição pré-1917) é livre e pode ser retranscrito de forma independente a partir das digitalizações**, sem copiar ficheiros Ponomar/azbyka. ⚠ PARA CONFIRMAR com jurista: se é admissível usar Ponomar/azbyka só para **revisão** pontual da transcrição própria (zona cinzenta; por prudência, evitar).

#### 6.5.2 Digitalizações identificadas (pré-1917)

| Texto necessário | Edição em domínio público identificada | Onde | Escrita | Estado |
|---|---|---|---|---|
| **Molitvoslov** (orações da manhã e da noite, **Símbolo da Fé**, **Последование ко Святому Причащению**) | «Молитвословъ», 10.ª ed., Moscovo, Синодальная типографія, 1900, «По благословенію Святѣйшаго Правительствующаго Синода» (exemplar da UNC Chapel Hill, André Savine Collection; 594 imagens; OCR ABBYY de má qualidade para cirílico antigo) | archive.org `molitvoslov00andr` [72] | **Escrita civil pré-reforma** (ѣ, і, ъ), não tipo eslavo | ✔ verificado (página de rosto, «Вѣрую во единаго Бога», «Послѣдованіе ко Святому Причащенію» no OCR) |
| **Часослов** (Horologion) | «Часословъ», 1888, em tipo eslavo | archive.org `chasoslov_1888` [73] | Tipo eslavo | ⚠ PARA CONFIRMAR: impressor/local (metadados vazios; OCR ilegível) — ver página de rosto antes de usar |
| **Saltério** | Texto bíblico: Bíblia Isabelina (1751/1756), em domínio público | Módulo SWORD CSlElizabeth [57] | Escrita civil **sem acentos**, ortografia modernizada (verificado: Sl 50 «Помилуй мя, Боже, по велицей милости Твоей…») | ✔ texto; ⚠ PARA CONFIRMAR: digitalização de um **Псалтирь** sinodal pré-1917 (com divisão em catismas e acentos) — não identificada com segurança no archive.org. A Biblioteca Estatal Russa (dlib.rsl.ru) e a НЭБ (rusneb.ru) não são pesquisáveis por ferramentas automáticas |
| **Служебник / Требник** (ofício da confissão, se necessário) | Edições sinodais de 1906 | Digitalizações PDF/DjVu listadas na Biblioteca Ponomar [42] | Tipo eslavo | Usar só as **imagens** da impressão de 1906, não o HTML |
| **Menaion** (tropários de S. Basílio/S. Gregório, §3.4) | — | — | — | ⚠ PARA CONFIRMAR: digitalização pré-1917 não procurada nesta ronda |

Não usar como fonte: as páginas do ru.wikisource «Часослов» e «Последование ко Святому Причащению». São cópias de azbyka.ru/verapravoslavnaya.ru, sem edição de origem identificada, e estão marcadas para eliminação ({{к удалению}}) [74].

#### 6.5.3 Existe transcrição Unicode limpa e livre?

| Candidato | Ortografia | Licença | Conclusão |
|---|---|---|---|
| CSlElizabeth (CrossWire) | Civil modernizada, sem acentos | **Domínio público** [57] | Utilizável para o Saltério/Bíblia na camada «escrita civil»; acentos a acrescentar |
| Biblioteca Ponomar | Eslava autêntica (Unicode real) | GPL (decisão 8) | Não usar como dados |
| azbyka.ru | Civil com acentos; eslava em UCS legado | © sem licença | Não usar |
| ru.wikisource | Civil com acentos (copiada do azbyka) | Proveniência incerta | Não usar |

→ **Não existe** (que se tenha encontrado) uma transcrição Unicode livre, em ortografia eslava autêntica, do Molitvoslov, do Часослов ou do Последование. **Plano**: transcrição própria, por OCR e revisão manual das digitalizações de §6.5.2, codificada segundo a UTN #41 (§6.1.1), em duas camadas: «eslavo autêntico» e «escrita civil com acentos». A camada civil do Molitvoslov pode derivar diretamente da edição de 1900, que já está em escrita civil.
→ **DECISÃO DO UTILIZADOR**: qual camada é mostrada por omissão no modo lado a lado (§6.1.1 recomenda a escrita civil com acentos), e se a camada «eslavo autêntico» entra já na 1.ª versão ou mais tarde (implica transcrição a partir de digitalizações em tipo eslavo).

#### 6.5.4 Bíblia portuguesa em domínio público mais próxima do PT-PT

| Tradução | Variante | Domínio público | Cânone | Numeração dos salmos | Observações |
|---|---|---|---|---|---|
| **Figueiredo** (P.e António Pereira de Figueiredo, † 1797; trad. da Vulgata) | **PT europeu** (ortografia antiga: «Deos», «peccado») | Sim (autor † 1797) [63] | Edições originais com deuterocanónicos; a de Londres 1866 sem eles [78] | **Igual à LXX/eslava** (Vulgata), incluindo a contagem dos títulos como versículos [78] | A mais próxima do PT-PT e da numeração litúrgica. Precisa de atualização ortográfica (AO90) e revisão do OCR [78][79] |
| Almeida 1911 (SWORD) | PT antigo, linha protestante | Texto provavelmente em domínio público; o módulo é GPL [60] | Protestante | Massorética | GPL → evitar (decisão 8) |
| BPM | PT-BR | Sim [62] | Com deuterocanónicos [80] | Massorética ⚠ (não verificada salmo a salmo) | Exige adaptação PT-BR → PT-PT; «rascunho em revisão» |

→ **DECISÃO DO UTILIZADOR** (leituras do dia, decisão 1):
- (a) tradução própria de todas as perícopas a partir do eslavo/grego, coerente com a decisão 7;
- (b) Figueiredo com ortografia atualizada, também PT-PT, com o Saltério e a numeração alinhados com a LXX, mas traduzido da Vulgata latina;
- (c) BPM adaptada.
Para os **salmos dentro das orações** mantém-se a tradução própria a partir do eslavo/LXX (§6.3.2), com Figueiredo como referência lexical.

#### 6.5.5 Numeração LXX dos salmos — regras de implementação

1. **Chave canónica = numeração LXX/eslava** (capítulo e versículo), a mesma do texto eslavo, da Bíblia sinodal russa e de Figueiredo/Vulgata [82][59][78]. Correspondência de capítulos com a numeração massorética: tabela de §6.3.4 [31][82].
2. **Versículos**: as edições LXX/eslavas/Vulgata numeram os títulos («Въ конецъ, псаломъ Давиду…») como versículos. As edições protestantes PT/EN não o fazem: Sl 50,3 eslavo = Sl 51,1 Almeida [57][81]. Guardar `{lxx_ps, lxx_v} ↔ {mt_ps, mt_v}` numa **tabela por versículo**, gerada por alinhamento de texto e revista à mão, não por fórmula.
3. **Casos especiais**: Sl 9 (= MT 9–10), 113 (= MT 114–115), 114+115 (= MT 116), 146+147 (= MT 147) e Sl 151 (sem correspondência MT) — ver §6.3.4.
4. **Interface**: mostrar sempre a numeração LXX; a MT só entre parênteses, em contexto de estudo bíblico (§6.3.4).

---

## 7. Lista consolidada de dúvidas (⚠)

Estado após a 2.ª ronda (16 out. 2026):

1. ✔ Fronteira pascal: substituições até quarta-feira da 6.ª semana (apodose) inclusive; ⚠ noite de quarta-feira → **DECISÃO DO UTILIZADOR** [64] (§1.4).
2. ✔ De Antipascha à Ascensão substitui-se só «Царю Небесный» [16][64].
3. ✔ Sábado à noite da Semana Luminosa: regra normal com substituições pascais [64].
4. ⚠ Edição impressa de referência com selo ИС (comparação por fazer; alternativa em domínio público: [72]).
5. ⚠ Cânone triplo combinado: existe em coletâneas, sem norma (§3.2).
6. ⚠ Cânone Pascal antes da Comunhão de Antipascha à Ascensão: sem norma; só a Semana Luminosa está regulada [6][64].
7. ✔ Tropário/condácio de S. Basílio e S. Gregório [69][70].
8. ⚠ Documento da Comissão Inter-Conciliar sobre a confissão pós-2015 (não encontrado); ✔ «В помощь кающимся» é compilação [71].
9. ✔ Determinação sinodal de 14.05.2018 (ata n.º 28) [65][66]; ⚠ aprovação de cada acatisto → **DECISÃO DO UTILIZADOR** (critério de inclusão); ⚠ ordem «condácio 13 ×3…».
10. ✔ Limites das prostrações na Semana Santa [67][68].
11. ⚠ Saltério pelos vivos: só prática de grupos do azbyka [30].
12. Licenças Ponomar/azbyka e edições modernas — irrelevante: decisão 7/8; ✔ domínio público das edições pré-1917 na UE [75] (§6.5.1); ⚠ uso de Ponomar/azbyka só para revisão → jurista.
13. ✔ Normalização Unicode segundo a UTN #41 [40] (§6.1.1).
14. Devocionário/LusOrtodoxia — irrelevante: decisão 7/8.
15. Fontes ROCOR/antioquinas no Brasil; outras fontes PT — irrelevante: decisão 7/8.
16. PorAlmeida1911 = GPL (evitar, decisão 8); ✔ BPM com deuterocanónicos [80]; ✔ Figueiredo digitalizado no archive.org [78][79]; traduções modernas — irrelevante: decisão 7/8.
17. ✔ Numeração de versículos nos salmos [57][59][78][81] (§6.3.4, §6.5.5).
18. ✔ Lista dos livros não canónicos da Bíblia sinodal [82].
19. (novo) ⚠ Impressor do Часослов de 1888; ⚠ digitalização de Псалтирь e Menaion sinodais pré-1917 (§6.5.2).
20. (novo) **DECISÃO DO UTILIZADOR**: camada eslava por omissão (civil com acentos vs. autêntica) e calendário de transcrição (§6.5.3).
21. (novo) **DECISÃO DO UTILIZADOR**: texto bíblico das leituras do dia — tradução própria, Figueiredo atualizado ou BPM adaptada (§6.5.4).

---

## Referências

1. Азбука веры — Молитвослов: «Молитвы утренние». https://azbyka.ru/molitvoslov/molitvy-utrennie.html
2. Азбука веры — Молитвослов: «Молитвы на сон грядущим» (com notas sobre o período pascal). https://azbyka.ru/molitvoslov/molitvy-na-son-gryadushhim.html
3. Азбука веры — «Светлая седмица». https://azbyka.ru/svetlaya-sedmica
4. Азбука веры — «Часы пасхальные». https://azbyka.ru/chasy-pasxalnye
5. Патриархия.ru — «Об участии верных в Евхаристии» (aprovado pela Conferência Episcopal, 2–3.02.2015). https://patriarchia.ru/article/96198
6. Азбука веры (Отечник) — «Об участии верных в Евхаристии» (texto integral). https://www.azbyka.ru/otechnik/dokumenty/ob-uchastii-vernyh-v-evharistii/
7. Азбука веры — «Молитвенное правило прп. Серафима Саровского» (artigo). https://azbyka.ru/o-kratkom-molitvennom-pravile-serafima-sarovskogo
8. Азбука веры — Молитвослов: «Молитвенное правило прп. Серафима Саровского». https://azbyka.ru/molitvoslov/molitvennoe-pravilo-prp-serafima-sarovskogo.html
9. Азбука веры — Молитвослов: «Последование ко Святому Причащению» (e índice do Molitvoslov: https://azbyka.ru/molitvoslov/). https://azbyka.ru/molitvoslov/posledovanie-ko-svyatomu-prichashheniyu.html
10. Азбука веры — Молитвослов: «Благодарственные молитвы по Святом Причащении». https://azbyka.ru/molitvoslov/blagodarstvennye-molitvy-po-svyatom-prichashhenii.html
11. Азбука веры — «Канон покаянный ко Господу нашему Иисусу Христу». https://azbyka.ru/molitvoslov/kanon-pokayannyj-ko-gospodu-nashemu-iisusu-xristu.html
12. Азбука веры — «Канон молебный ко Пресвятой Богородице». https://azbyka.ru/molitvoslov/kanon-molebnyj-ko-presvyatoj-bogorodice.html
13. Азбука веры — «Канон Ангелу Хранителю». https://azbyka.ru/molitvoslov/kanon-angelu-xranitelyu.html
14. Т. Никитина (сост.), «Православный молитвослов на дни Великого поста» — «Правило для готовящихся ко святому Причащению». https://www.azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/pravoslavnyj-molitvoslov-na-dni-velikogo-posta/6_8
15. Азбука веры (Вопросы) — «Когда надо читать молитвы ко Причастию?». https://azbyka.ru/vopros/kogda-nado-chitat-molitvy-ko-prichastiju/
16. Азбука веры — «Чин келейного чтения канонов и акафистов». https://azbyka.ru/molitvoslov/chin-kelejnogo-chtenija-kanonov-i-akafistov.html
17. Архим. Иоанн (Крестьянкин), «Опыт построения исповеди». https://azbyka.ru/audio/?p=11379
18. М. В. Корогодина, «Исповедь в России в XIV–XIX веках. Исследование и тексты». https://azbyka.ru/otechnik/Viktor-Zhivov/m-v-korogodina-ispoved-v-rossii-v-14-19-vekah-issledo-vanie-i-teksty/
19. Азбука веры — «Иисусова молитва». https://azbyka.ru/molitva-iisusova
20. Азбука веры — «Чётки». https://azbyka.ru/chyotki
21. Азбука веры — «Перстосложение». https://azbyka.ru/perstoslozhenie
22. Азбука веры — «Крестное знамение». https://azbyka.ru/krestnoe-znamenie
23. Азбука веры (Вопросы) — sobre prostrações (cân. 20 do I e 90 do VI Concílios). https://azbyka.ru/vopros/?p=4196
24. Азбука веры — «Поклон». https://azbyka.ru/poklon
25. Азбука веры — «Акафист». https://www.azbyka.ru/akafist
26. Азбука веры (Новости, 21.02.2023) — reunião do Grupo de Trabalho para a codificação dos acatistos. https://azbyka.ru/news/v-izdatelskom-sovete-sostojalos-ocherednoe-zasedanie-rabochej-gruppy-po-kodifikacii-akafistov-rassmotreny-pesnopenija-svv-peresvetu-i-osljabe-andreju-simbirskomu
27. Азбука веры — «Можно ли читать акафисты в Великий пост». https://azbyka.ru/mozhno-li-chitat-akafisty-v-velikij-post
28. Азбука веры — «Кафизма». https://azbyka.ru/kafizma
29. Азбука веры — «Псалтирь по кафизмам с ударениями и молитвами». https://azbyka.ru/molitvoslov/psaltir-po-kafizmam.html
30. Азбука веры — «О чтении Псалтири по усопшим». https://azbyka.ru/psalms/o-chtenii-psaltiri-po-usopshim/ (e «Правила организации групп чтения Псалтири»: https://azbyka.ru/psalms/pravila-organizacii-grupp-chtenija-psaltiri/)
31. OrthodoxWiki — «Psalms» (numeração LXX/MT, catismas). https://orthodoxwiki.org/Psalms
32. Азбука веры — «Молитвы перед и после вкушения пищи». https://azbyka.ru/molitvoslov/molitvy-pered-i-posle-vkusheniya-pishhi.html
33. Азбука веры — Molitvoslov, secção «Молитвы об усопших» (e oração de S. Leão de Optina: https://azbyka.ru/molitvoslov/molitva-o-roditele-umershem-bez-pokayaniya.html). https://azbyka.ru/molitvoslov/1/smert-i-pominovenie-usopshix/molitvy-ob-usopshih
34. Азбука веры — «Записка церковная». https://azbyka.ru/zapiska-cerkovnaya
35. Азбука веры — «Об отпевании детей и подростков, совершивших самоубийство» (refere a determinação sinodal de 27.07.2011). https://azbyka.ru/ob-otpevanii-detej-i-podrostkov-sovershivshih-samoubijstvo
36. Slavonic Computing Initiative @ Ponomar Project — página principal. https://sci.ponomar.net/
37. SCI — «Fonts». https://sci.ponomar.net/fonts.html
38. SCI — «Legal» (SIL OFL 1.1; MIT). https://sci.ponomar.net/legal.html
39. SCI — «Tools» (webfonts, conversores). https://sci.ponomar.net/tools.html
40. Unicode Technical Note #41 — «Church Slavonic Typography in Unicode». https://www.unicode.org/notes/tn41/
41. Ponomar Project — página principal. https://www.ponomar.net/
42. Ponomar — «Library of Liturgical Texts: modern Slavonic books». https://www.ponomar.net/maktabah/index.html
43. Ponomar — Часослов (МП, 1991), «Молитвы в трапезе». https://www.ponomar.net/maktabah/Chasoslov1991/10trapez.html
44. Азбука веры — «Утренние молитвы церковнославянским шрифтом». https://azbyka.ru/molitvoslov/utrennie-molitvy-cerkovnoslavjanskim-shriftom.html
45. SCI — «Editors/Users» (Church Slavonic Converter Extension). https://sci.ponomar.net/users.html
46. Издательский Совет РПЦ — «Определение Священного Синода от 25 декабря 2009 года об издательской деятельности». https://izdatsovet.ru/doc/index.php?ELEMENT_ID=801 (jornais do Sínodo: https://patriarchia.ru/article/98427)
47. Wikipedia — «Spanish–Portuguese diocese» (Moscow Patriarchate). https://en.wikipedia.org/wiki/Spanish%E2%80%93Portuguese_diocese
48. OrthoChristian — «Portuguese Orthodox prayer book published for first time» (12.04.2021). https://orthochristian.com/138591.html
49. Ortodoxia em Portugal — «O "Devocionário Ortodoxo" – primeiro livro de orações ortodoxas em português». https://www.ortodoxia.pt/o-devocionario-ortodoxo-primeiro-livro-de-oracoes-ortodoxas-em-portugues/
50. *Missal Ortodoxo* (LusOrtodoxia, 2019) — amostra PDF (ficha técnica e direitos). https://ortodoxia.pt/data/Missal-9pag.pdf
51. *Liturgia Eucarística de S. João Crisóstomo* (Cascais, 2023) — PDF. https://www.ortodoxia.pt/data/Liturgia-S.Joao.pdf
52. Pe. Jerónimo Thomaz — «Pequeno léxico de termos litúrgicos e teológicos» (2023). https://www.ortodoxia.pt/padre-jeronimo-thomaz-lexikon/
53. Ortodoxia em Portugal — «Cânone paraclético à Santíssima Deípara». https://www.ortodoxia.pt/canone-paracletico-a-santissima-deipara/
54. OrthoChristian — «Service book for priest and choir published in Portuguese» (2019). https://orthochristian.com/125716.html
55. ECCLESIA (Brasil). https://www.ecclesia.com.br/
56. Canadian Journal of Orthodox Christianity, vol. 14/2 — «Divina Liturgia» (PT). https://www.cjoc.ca/pdf/Vol_14_2_1_Divina_Liturgia.pdf
57. CrossWire SWORD — módulo «CSlElizabeth». https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=CSlElizabeth
58. Wikipedia — «Elizabeth Bible». https://en.wikipedia.org/wiki/Elizabeth_Bible (e «Bible translations into Church Slavonic»: https://en.wikipedia.org/wiki/Bible_translations_into_Church_Slavonic)
59. Азбука веры — Библия (exemplo Sl 50). https://azbyka.ru/biblia/?Ps.50
60. CrossWire SWORD — módulo «PorAlmeida1911». https://www.crosswire.org/sword/modules/ModInfo.jsp?modName=PorAlmeida1911
61. eBible.org — «Bíblia Livre» (porbr2018). https://ebible.org/find/details.php?id=porbr2018
62. eBible.org — «Bíblia Portuguesa Mundial» (porbrbsl). https://ebible.org/find/details.php?id=porbrbsl
63. Wikipédia — «António Pereira de Figueiredo». https://pt.wikipedia.org/wiki/Ant%C3%B3nio_Pereira_de_Figueiredo
64. Азбука веры — Молитвослов: «О молитвенном правиле в дни празднования Святой Пасхи» (inclui excerto das *Богослужебные указания*). https://azbyka.ru/molitvoslov/o-molitvennom-pravile-v-dni-prazdnovaniya-svyatoj-pasxi.html
65. Патриархия.ru — «В Издательском Совете состоялось очередное заседание рабочей группы по кодификации акафистов» (cita a determinação sinodal de 14.05.2018, ata n.º 28, p. 11). https://patriarchia.ru/article/122905
66. «Приходы» (prichod.ru) — В. Городничева, «Норма акафиста» (resumo das decisões do Santo Sínodo de 14.05.2018). https://prichod.ru/aktualniye-voprosy/norma-akafista/
67. Азбука веры — «Великая Среда» (fim das prostrações; exceção do Epitáfio). https://azbyka.ru/days/strastnaya-velikaja-sreda
68. Азбука веры (Вопросы) — «Когда прекращаются земные поклоны в Великий пост?» (cita o Typikon). https://azbyka.ru/vopros/kogda-prekrashhayutsya-zemnye-poklony-v-velikij-post/
69. Азбука веры — calendário: «Святитель Василий Великий» (tropário e condácio). https://azbyka.ru/days/sv-vasilij-velikij
70. Азбука веры — calendário: «Святитель Григорий Двоеслов» (tropário e condácio). https://azbyka.ru/days/sv-grigorij-dvoeslov
71. Азбука веры (áudio) — «В помощь кающимся» (secções, incl. «Дополнения из разных источников»). https://azbyka.ru/audio/?p=13985
72. Internet Archive — «Молитвословъ», 10.ª ed., Москва, Синодальная типографія, 1900 (UNC Chapel Hill, André Savine Collection). https://archive.org/details/molitvoslov00andr
73. Internet Archive — «Часословъ», 1888. https://archive.org/details/chasoslov_1888
74. Wikisource (ru) — «Последование ко Святому Причащению» e «Часослов» (cópias marcadas para eliminação). https://ru.wikisource.org/wiki/Последование_ко_Святому_Причащению ; https://ru.wikisource.org/wiki/Часослов
75. EUR-Lex — síntese «Direitos de autor e direitos conexos: prazo de proteção» (Diretiva 2006/116/CE). https://eur-lex.europa.eu/PT/legal-content/summary/copyright-and-related-rights-term-of-protection.html
76. Diretiva 96/9/CE (proteção jurídica das bases de dados), art. 7.º. https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:31996L0009
77. TJUE, acórdão de 16.07.2009, processo C-5/08, *Infopaq International*. https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:62008CJ0005
78. Internet Archive — A. P. de Figueiredo, *Biblia Sagrada… traduzida em portuguez segundo a Vulgata latina*, Londres, Harrison e Filhos, 1866. https://archive.org/details/biblia-sagrada-vulgata-antonio-pereira-de-figueiredo-1866
79. Internet Archive — A. P. de Figueiredo, *Bíblia Sagrada*, volumes I–XVI (digitalizações sem data de edição nos metadados). https://archive.org/details/6-biblia-vulgata-padre-antonio-pereira-de-figueiredo-01_202007
80. eBible.org — BPM, índice de livros. https://ebible.org/porbrbsl/index.htm
81. Bíblia Online — Almeida Corrigida Fiel, Sl 51 (exemplo de numeração protestante). https://www.bibliaonline.com.br/acf/sl/51
82. Православная энциклопедия — «Библия. I. Общие сведения», t. 5, pp. 89–97. https://www.pravenc.ru/text/209479.html
