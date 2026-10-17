# Saltério 2c — coluna UK, Salmos 77–151 (catismas 11–20): notas de tradução

> Staging: `data/salterio/_staging/uk-b.json` — objeto `{"sl.v": "texto"}` com exatamente as **1302 chaves** de `data/salterio/_fontes/grelha.json` para os Salmos 77–151 (77.1 … 151.7). Validado por script: conjunto de chaves = grelha, nenhum texto vazio, nenhum carácter latino/russo (ы, э, ъ, ё) nem apóstrofo reto. Tradução própria (dec. 37, 40, 41), estado «não oficial — não revista» (dec. 44). Os Salmos 1–76 são feitos por outro agente com as mesmas regras: as escolhas abaixo devem ser harmonizadas com as dele antes de gerar os ficheiros `salterio-NN.json`.

## 1. Fontes

- **Texto-fonte (traduzido):** `data/salterio/_fontes/cu-civil-elizabeth.json` (Bíblia isabelina, módulo CSlElizabeth, escrita civil). Traduzido versículo a versículo, com as fronteiras de versículo e a pontuação final do eslavo (com poucas adaptações sintáticas).
- **Controlo grego:** **eBible.org `grcbrent`** — «The Greek Septuagint with Apocrypha, compiled by Sir Lancelot C. L. Brenton», *Public Domain* (texto grego da edição de Brenton, base Vaticano). Ficheiro `grcbrent_vpl.txt` do pacote https://ebible.org/Scriptures/grcbrent_vpl.zip (`grcbrent_about.htm`: «Public Domain», 2026-04-08); SHA-256 `dcd97e62bab7ff629dd6c5201d1b7ff6237254c665a79535f622e31e72fc4b50`. Swete 1909 não foi usado. O grego serviu só para esclarecer o sentido; onde diverge, segue-se o eslavo (§7).
- **Não usados:** Ohiyenko 1962 (direitos), Saltério da IOU 2023 (©), Blagovist (©). Kulish–Puliui não foi copiado (nenhum versículo tirado dele).
- **Blocos UK existentes reutilizados:** ver §6.

## 2. Convenções gerais

- Ucraniano literário atual, registo litúrgico; apóstrofo tipográfico ’ (como nos blocos existentes); travessão —.
- Pronomes divinos com maiúscula: Ти, Тебе, Тобі, Тобою, Твій…, Він, Його, Йому, Нього, Ньому, Ним, Свій…, Себе/Собі, Той, Хто (em «Той, Хто…»), Сам. Aplicado também onde a fonte civil tem minúscula por descuido mas o referente é Deus (77.66, 84.9, 90.9 «Ти», 91.9, 104.26 «Собі», 107.10 «Мені», 109.3, 110.2, 131.18 «Моя», 138.1, 141.3–4, 147.5 «Свій»). Mantida a minúscula do eslavo em «христа/помазанця», «царя нашого» (88.19), «ангели» (96.7, 103.4, 137.1, 151.4); «Ангели» com maiúscula onde o eslavo a tem (90.11, 102.20, 148.2). «Отець мій Ти» (88.27) com maiúscula (título divino).
- Sujeito pronominal acrescentado só quando o ucraniano o exige gramaticalmente (formas «-л еси» → «Ти …»; aoristos sem sujeito → «Він …»).
- Nomes (IOU/glossário): Господь, Бог, Сіон, Ізраїль, Яків, Єрусалим, Вавилон, Фараон (com maiúscula também onde o eslavo tem «фараон», 134.9, 135.15), Ливан, Ермон (132.3, eslavo «Аермонская» → «ермонська»), Фавор, Ог, Сигон (eslavo «Сиона царя Аморрейска», 134.11, 135.19); Йосиф, Мойсей, Аарон, Самуїл, Авраам, Ісаак, Давид, Єфрем, Веніамин, Манасія, Юда/Юдея, Ідумея, Едом, Моав, Агаряни, Ізмаїльтяни, Гевал, Аммон, Амалик, Тир, Ассур, Лот, Мадіам, Сисара, Явин, Кисон, Аендор, Орив, Зив, Зевей, Салман, Корей, Асаф, Еман, Ефам, Хам, Ханаан, Таніс («на полі Таніса», 77.12/43), Силом, Хорив, Дафан, Авирон, Веельфегор, Фінеес, Мелхиседек, Галаад, Сихем, Єфрафа, Кидар, Раав, Йордан, Червоне море. Possessivos: Ізраїлів/Ізраїлеві, Яковові, Ааронів, Левіїв, Кореєвим, Юдине, Хамовій.
- Interjeições: «Нехай буде, нехай буде» (буди, буди; 88.53, 105.48); «Горе мені» (Увы мне).

## 3. Sobrescritos (fórmulas fixas)

Presentes na fonte (13): 79.1, 80.1, 82.1, 83.1, 84.1, 86.1, 87.1, 88.1, 89.1, 91.1, 101.1, 107.1, 141.1.

| Eslavo | UK |
|---|---|
| В конец | На кінець |
| псалом Асафу / Давиду | псалом Асафові / Давидові |
| Песнь псалма (Асафу) | Пісня псалма (Асафові) |
| псалом песни | псалом пісні |
| Песнь, псалом Давиду | Пісня, псалом Давидові |
| сыном Кореовым | синам Кореєвим |
| о точилех | про точила |
| о изменшихся | про змінених |
| свидение Асафу | свідчення Асафові |
| о Маелефе еже отвещати | про Маелеф, щоб відповідати |
| Разума (Еману Израилтянину / Ефама Израилтянина / Давиду) | Розуміння (Еманові Ізраїльтянинові / Ефама Ізраїльтянина / Давидові) |
| Молитва Моисеа человека Божия | Молитва Мойсея, людини Божої |
| Молитва нищаго, егда уныет… | Молитва убогого, коли він занепадає духом… |
| в день субботный | на день суботній |
| внегда быти ему в вертепе молящемуся | коли він був у печері, молячись |

**Sobrescritos ausentes da fonte** (o módulo não os traz e a grelha não os conta; não foram acrescentados — 60 salmos): 77, 78, 81, 85, 90, 93, 94, 96–100, 102–106, 108–140 (exceto 141) e 142–151 (incl. o sobrescrito do Sl 151). Se forem acrescentados mais tarde, fórmulas propostas, coerentes com a tabela: «Аллилуиа» → **«Алилуя»** (forma dos blocos existentes); «Песнь степеней» → «Пісня ступенів»; «Хвала песни Давиду» → «Хвала пісні Давидові»; «Псалом во исповедание» → «Псалом на славлення»; «Аггеево и Захариино» → «Аггея і Захарії».

## 4. Vocabulário recorrente (eslavo → UK)

| Eslavo | UK | Nota |
|---|---|---|
| исповедатися (ἐξομολογεῖσθαι) | славити («Славте Господа, бо Він благий…»; «Славитиму Тебе») | «сповідатися» evitado (sentido moderno de confissão) |
| исповедание | славлення (95.6, 103.1, 110.3, 146.7, 148.13; «зі славленням» 94.2, 99.4) | |
| хвалити / хвала / хваление | хвалити (imper. «хваліть») / хвала / хваління | |
| пети / воспети | співати / оспівувати, заспівати | |
| прославити | прославити | |
| Вышний | Всевишній | |
| Господь сил / Бог сил | Господь сил / Боже сил | |
| языцы (ἔθνη) | народи | |
| людие (λαός, povo de Deus) | народ (sing.); vocativo «людие мои/Мои» com verbo plural → «люди мої/Мої» (77.1, 80.9) | |
| людие (λαοί, plural) | люди | |
| человек / человецы / сынове человечестии | людина / люди / сини людські | |
| достояние / наследие (κληρονομία) | спадщина | |
| селение (σκήνωμα) / скиния / жилище | оселя / скинія / житло | |
| сонм / сонмище | зібрання / зборище | |
| крепость (ἰσχύς) / сила / держава (κράτος) | міць / сила / могутність | |
| мышца / десница | рамено / правиця | |
| нищий / убогий | убогий / бідний | segue-se o lexema eslavo, não o grego (que alterna) |
| оскорбляющий / стужающий | гнобитель, ті, що гноблять / ті, що утискають | |
| скорбь / печаль / нужда | скорбота / печаль / скрута | |
| избавити / избавитель / изъяти | визволити / Визволитель / вирвати | |
| заступник / заступление / защититель / помощник / прибежище | заступник / заступництво / захисник / помічник / прибіжище | |
| упование / уповати / надеятися | уповання / уповати / надіятися | |
| щедр / щедроты / ущедрити | щедрий / щедроти / змилосердитися | |
| милость / милостив / многомилостив / долготерпелив | милість / милостивий / многомилостивий / довготерпеливий | |
| правда (δικαιοσύνη) / истина / правость | правда / істина / правота | |
| неправда / беззаконие / законопреступник | неправда / беззаконня / законопорушник | |
| суета / всуе | марнота / марно | |
| лесть / льстивый | підступ / підступний | |
| преогорчити | огірчити | |
| прогневати / раздражити / искусити | прогнівити / роздратувати / спокушати | |
| негодовати | обурюватися | |
| смирити / смирение (ταπείνωσις) | упокорити / приниження | 115.1 «упокорився» (bloco existente) |
| потребити | винищити | |
| постыдитися / посрамитися | посоромитися / осоромитися | |
| брань | битва | |
| в век / во веки / в век века / в род и род / отныне и до века | навіки / навіки / на віки віків / з роду в рід / відтепер і довіку | |
| выну / присно | повсякчас | |
| зело / до зела | вельми / зовсім (118.8, 118.43) | |
| ад / ров (λάκκος) / истление | ад / яма / тління | |
| уста / устне (χείλη) | уста / губи | губи como no Sl 50 existente |
| христос / помазанный (Твой, Мой) | помазанець | 83.10, 88.39, 88.52, 104.15, 131.10, 131.17 |
| иерей / священник | ієрей / священик | 98.6, 109.4 |
| олтарь | жертовник | |
| кивот | кивот | 131.8 |
| елей | єлей | |
| Херувими | Херувими | |
| соблазн | спокуса | |
| утреневати | зрання звертатися (77.34) / рано вставати (126.2) | |
| призрети | зглянутися | |
| внуши / вонми | вслухайся / прислухайся | |
| услыши | вислухай (почути, quando é «ouvir» simples) | |
| воззвах | воззвав я / взивав я | |
| воскликнути | воскликнути | |

## 5. Salmo 118 — termos fixos

| Eslavo | UK |
|---|---|
| закон | закон |
| заповедь / заповеди (ἐντολαί) | заповідь / заповіді |
| оправдания (δικαιώματα) | оправдання — fórmula: «навчи мене оправдань Твоїх» (refrão «Благословен єси, Господи, навчи мене оправдань Твоїх», 118.12) |
| свидения (μαρτύρια) | свідчення |
| судьбы (κρίματα) / суд (κρίσις) / суди (κρίσεις, 118.137) | суди / суд / суди |
| словеса, слово (λόγοι, λόγιον) | слова, слово (o eslavo não distingue lexicalmente λόγος/λόγιον) |
| пути / путь / стезя | путі / путь / стежка |
| поучение / поучитися (μελέτη) | навчання / навчатися |
| глумитися (ἀδολεσχεῖν) | роздумувати — exceto 118.85 «глумления» → «пусті розмови» (⚠ ver §8) |
| живи мя | оживи мене |
| вразуми мя | врозуми мене |
| испытати / взыскати | досліджувати / шукати |
| законопреступник | законопорушник |

## 6. Texto UK já existente nos blocos (`data/oracoes/*.json`)

Reutilizado **verbatim** (só dividido por versículos):
- **Sl 115,1–10** ← `comunhao_preparacao.json` `oficio-022`. Diferenças com o eslavo do Saltério, para decisão (não alteradas): 115.4 termina em «.» (eslavo «:»); 115.8 «і ім’я Господнє призову» — o eslavo tem «и **во** имя Господне призову» (ἐν ὀνόματι); proposta opcional: «і в ім’я Господнє призову». «Обітниці» (молитвы = εὐχάς, votos) mantido e adotado.
- **Sl 117,24** ← `comunhao_preparacao-cp121` (sem «Стих:»): «Це день, що його створив Господь, зрадіймо і звеселімося в нім.» Nota: no resto do Saltério «сотвори» → «сотворив»; proposta opcional de alinhar para «сотворив».
- **Sl 144,15–16** ← `refeicoes-06`, **adaptado ao texto do Saltério**: a oração (MS1900) tem «Господи» e «щедрую» que o Saltério isabelino não tem; retiradas essas duas palavras, o resto é verbatim e dividido nos dois versículos: 144.15 «Очі всіх на Тебе уповають, і Ти даєш їм їжу в свій час:» / 144.16 «відкриваєш Ти руку Твою і наповнюєш усе живе благоволінням.» O bloco `refeicoes-06` fica como está (segue a oração, não o Saltério).
- Coerência verificada com: `refeicoes-13` («дає їжу всякій плоті» = 135.25), Sl 50/22/23 (губи, ближній, всесвіт, на довгі дні, марнота, утискати, єлей).
- Não há no repositório blocos UK dos Sl 102, 103, 133, 140, 141, 142 (procurados).

## 7. Divergências eslavo × grego (Brenton) — traduzido o eslavo

- 77.31 «множайшая их» → «найчисленніших» (gr. ἐν τοῖς πίοσιν «os mais robustos»).
- 86.4 «сии быша тамо» → «вони були там» (gr. ἐγεννήθησαν «nasceram»).
- 87.15 «отрееши душу мою» (gr. τὴν προσευχήν μου).
- 88.33 «ранами неправды их» (gr. ἁμαρτίας).
- 89.12 «окованныя сердцем в мудрости» → «тих, що серцем прикуті до мудрості» (gr. πεπαιδευμένους «instruídos»).
- 92.4 «возмут реки сотрения своя» — oração ausente do grego de Brenton.
- 93.23 «Господь Бог» (gr. + ἡμῶν).
- 94.3 «по всей земли» (gr. ἐπὶ πάντας τοὺς θεούς); 94.4 o eslavo não tem a oração grega «ὅτι οὐκ ἀπώσεται Κύριος τὸν λαὸν αὐτοῦ»; 94.7 inclui «Днесь аще глас Его услышите» (fronteira de versículo diferente).
- 98.5 «яко свято есть» (neutro: o escabelo) → «бо воно святе» (gr. ἅγιός ἐστι «Ele é santo»).
- 101.16 «имене Господня» (gr. τὸ ὄνομά σου Κύριε).
- 103.16 «ихже еси насадил» (gr. ἐφύτευσεν, 3.ª pessoa).
- 105.20 «славу Его» (gr. αὐτῶν); 106.30 «хотения Своего» (gr. αὐτῶν); 145.4 «помышления его» (gr. αὐτῶν).
- 107.3 «Востани, слава моя» — a mais no eslavo.
- 131.17 «помазанному Моему» (gr. τῷ χριστῷ σου).
- 138.20 «Яко ревниви есте в помышлениих» (gr. ὅτι ἐρεῖς εἰς διαλογισμόν).
- 140.6 «судии их» (gr. οἱ κραταιοί), «яко возмогоша» → «бо вони виявилися сильні» (gr. ἠδύνθησαν «foram agradáveis»); 140.7 «кости их» (gr. ἡμῶν).
- 144.9 «всяческим» → «до всіх» (Brenton τοῖς ὑπομένουσι); 144.13 o eslavo tem o versículo «верен Господь во всех словесех Своих…», ausente do grego de Brenton.
- Versificação diferente do grego (alinhado ao eslavo, como manda a grelha): Sl 114 (8 vs 9), 115 (10 vs 9), 129 (6 vs 8), 141 (7 vs 8).

## 8. Dúvidas e soluções interpretativas (⚠ para revisão nativa/clerical)

- **«На кінець»** para «В конец» (εἰς τὸ τέλος): alternativa «До кінця». Harmonizar com Sl 1–76.
- **«Розуміння»** para «Разума» (συνέσεως, *maskil*): alternativa «Повчання» (interpretação) ou «Розуму».
- **исповедатися → «славити»** e **исповедание → «славлення»**: soa estranho em 103.1 («у славлення і величність зодягнувся»); alternativa global «прославляти/прославлення» ou «хвала». A usar igual nos Sl 1–76.
- **Йосиф** (77.67, 79.2, 80.6, 104.17): a IOU usa por vezes «Іосиф» (cf. Іоанн, Іісус); escolhido «Йосиф» por paralelismo com «Яків». Decisão a tomar em conjunto.
- 89.10 «лета наша яко паучина поучахуся» → «літа наші, як павутину, снували ми» (sentido; literal «роздумувалися як павутина» é ininteligível).
- 94.11 e 131.3–4 (juramento «аще внидут / аще вниду», hebraísmo = «não entrarão / não entrarei») → traduzido pelo sentido negativo.
- 106.8, .15, .21, .31 «Да исповедятся Господеви милости Его…» → «Нехай славлять Господа милості Його і чудеса Його…» (literal; sujeito ambíguo como no eslavo).
- 108.20 «Сие дело оболгающих мя у Господа» → «Таке діло від Господа тим, що обмовляють мене» (interpretação de «у Господа» = παρὰ Κυρίου).
- 108.24 «изменися елеа ради» → «змінилася без єлею» (sentido).
- 109.6 «исполнит падения» → «наповнить трупами» (πτώματα).
- 118.85 «глумления» → «пусті розмови» (ἀδολεσχίας), enquanto «глумитися» → «роздумувати» noutros versículos.
- 140.5 «яко еще и молитва моя во благоволениих их» → «бо ще й молитва моя — проти їхніх уподобань» (sentido corrente; literal «в уподобаннях їхніх»).
- 77.26 «лив» (λίψ, vento do sudoeste) → «вітер західний»; alternativa «південно-західний».
- 79.14 «уединенный дивий» → «дикий звір-самітник»; 101.7 «неясыть» → «пелікан», «нырище» → «руїни»; 103.17 «еродий» → «лелека»; 104.40 «крастели» → «перепели»; 147.6/148.8 «голоть» → «лід».
- 80.7 «руце его в коши поработасте» → «руки його рабствували при кошах».
- 92.4 «сотрения» → «бурхання» (lexema raro; aproximação).
- 121.3 «емуже причастие его вкупе» → «що з’єднане воєдино».
- 126.4 «сынове оттрясенных» → «сини вигнанців».
- 127.3 «в странах дому твоего» → «біля стін дому твого».
- 104.18 «железо пройде душа его» → «душа його пройшла крізь залізо» (sujeito = душа).
- 77.55 «(землю)» e outros parênteses do próprio eslavo mantidos.
- Gralha na fonte: 137.4 «глаголголы» (ler «глаголы») — traduzido «слова».

## 9. Procedimento

Lotes por catisma (11–20), cada um validado por script (chaves da grelha, carateres proibidos, pontuação final comparada com o eslavo, verificação heurística das maiúsculas dos pronomes divinos e da consistência dos termos de §4–5); depois releitura integral lado a lado com o eslavo (correções aplicadas, p. ex. 79.16, 80.6, 102.14, 103.5, 104.24, 108.5, 128.8, 142.3, 143.7). Scripts e lotes no scratchpad da sessão (`agD2/`), não no repositório.
