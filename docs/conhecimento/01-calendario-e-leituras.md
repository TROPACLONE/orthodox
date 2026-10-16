# 01 — Calendário litúrgico, Pascálio, Octoeco e leituras (prática da Igreja Ortodoxa Russa / Patriarcado de Moscovo)

> **Âmbito:** especificação técnica para programadores. Referência = calendário juliano tal como praticado na Igreja Ortodoxa Russa (Русская Православная Церковь, *Russkaia Pravoslavnaia Tserkov'*, ROC/MP), com o equivalente civil gregoriano.
> **Data de compilação:** 2026-10-16. **Língua:** PT-PT; termos originais entre parênteses (eslavo eclesiástico/russo em cirílico + transliteração; grego quando relevante). Passagens algorítmicas mantidas em inglês/pseudocódigo quando a tradução perderia precisão.
> **Convenção de fontes:** cada afirmação factual tem referência `[n]` (lista no fim). Resultados obtidos por cálculo próprio (scripts de verificação) são marcados como **(cálculo próprio)** e foram cruzados com fontes externas sempre que indicado.
> **⚠ PARA CONFIRMAR** assinala conflitos entre fontes ou pontos não verificados.

---

## 0. Convenções usadas neste documento

| Símbolo | Significado |
|---|---|
| **OS** | "estilo antigo" (старый стиль, *staryi stil'*), data no calendário juliano — é a data litúrgica de referência |
| **NS** | "estilo novo" (новый стиль, *novyi stil'*), data civil gregoriana |
| **P** | Domingo de Páscoa (Пасха, *Paskha*; gr. Πάσχα) do ano corrente, como número de dia juliano (JDN) |
| **P±n** | dia que dista *n* dias de P |
| **P_next** | Páscoa do ano civil seguinte (necessária para as leituras de inverno, §7.5) |
| **Неделя N** (*Nedelia*) | em eslavo eclesiástico "неделя" = **domingo**; "Неделя N по Пятидесятнице" = N-ésimo domingo depois do Pentecostes |
| **Седмица N** (*sedmitsa*) | **semana** de segunda a sábado que **precede** a Неделя N (ver §7.2) |
| **Зачало** (*zachalo*) | perícope numerada do Apóstolo/Evangelho litúrgico |

Dia litúrgico: começa nas Vésperas da véspera (o tom do Octoeco, por exemplo, muda no sábado à tarde [20]). Para efeitos de base de dados, recomenda-se guardar a data civil do dia e tratar a "véspera" como atributo do serviço.

---

## 1. Calendário juliano ↔ gregoriano

### 1.1 Regra exata de conversão

**Regra de implementação:** converter sempre via número de dia juliano (JDN), nunca somando um desfasamento fixo às cegas. O desfasamento muda nos anos seculares que são bissextos no juliano mas não no gregoriano (1900, 2100, 2200…) [2].

```text
# Julian (proleptic) date -> JDN
a  = (14 - month) div 12
y2 = year + 4800 - a
m2 = month + 12*a - 3
JDN_julian = day + (153*m2 + 2) div 5 + 365*y2 + y2 div 4 - 32083
# Gregorian date -> JDN
JDN_greg   = day + (153*m2 + 2) div 5 + 365*y2 + y2 div 4 - y2 div 100 + y2 div 400 - 32045
# Weekday: JDN mod 7  (0 = Monday ... 6 = Sunday)
```

Tabela de desfasamento (verificada por **cálculo próprio** com as fórmulas acima e coincidente com a tabela de [2]):

| Datas julianas (OS) | Gregoriano = juliano + | Exemplo |
|---|---|---|
| 01.03.1800 – 28.02.1900 | 12 dias | 28.02.1900 OS = 12.03.1900 NS |
| 29.02.1900 OS | (dia só existente no juliano) | = 13.03.1900 NS |
| 01.03.1900 – 28.02.2100 | **13 dias** | 25.12.2099 OS = 07.01.2100 NS |
| 29.02.2100 OS | (dia só existente no juliano) | = 14.03.2100 NS |
| 01.03.2100 – 28.02.2200 | **14 dias** | 25.12.2100 OS = **08.01.2101** NS |

- A fonte [1] confirma "o calendário juliano está 13 dias atrás do gregoriano em 1900–2099". [2] dá a tabela de transição em 1900/2100 e avisa que, ao atravessar um 29 de fevereiro que só existe no juliano, esse dia conta para a diferença.
- **Consequência prática:** a partir de março de 2100 todas as datas NS das festas fixas avançam um dia (ex.: Natal 25.12 OS passa de 7 de janeiro para 8 de janeiro NS) **(cálculo próprio)**.
- **Armadilhas de implementação:**
  1. Entre 1 e 13 de janeiro NS (1901–2100) ainda é dezembro do **ano juliano anterior** (ex.: 07.01.2026 NS = 25.12.2025 OS). Qualquer cálculo dependente do ano (Pascálio, ciclo de leituras) deve usar o ano juliano correto.
  2. O ano civil juliano começa a 01.01 OS (= 14.01 NS); o ano eclesiástico/indicção começa a 01.09 OS (= 14.09 NS), "Начало индикта, сиречь новаго лета" no Typikon [10]; o "ano pascal" (para leituras) vai de Páscoa a Páscoa [19].
  3. Usar sempre aritmética de calendário proléptico; não usar bibliotecas de data que façam a "reforma de 1582" implicitamente sem controlo.

### 1.2 Porque é que a ROC mantém o calendário juliano

- **1923:** uma reunião de bispos presidida pelo Patriarca Tikhon decidiu (24 de setembro de 1923) adotar o novo estilo a partir de 2 de outubro OS; a 8 de novembro de 1923 o Patriarca adiou "temporariamente" a introdução, porque as outras Igrejas Ortodoxas — "com as quais a Igreja russa deve estar sempre em unidade" — também a tinham adiado [8].
- **Declaração do Patriarca Tikhon de 17(30).09.1924** ao Comité Executivo Central: o calendário juliano "não foi elevado pela Igreja a dogma de fé intocável", e a reforma é "em princípio admissível", mas exige (1) o acordo de todas as Igrejas autocéfalas, (2) o consentimento do povo crente; acrescenta que a reforma ficou comprometida por ter sido proclamada primeiro pelos "renovacionistas" (обновленцы, *obnovlentsy*) e pela convicção de que era imposta pelo poder civil [7].
- **Conferência de Moscovo de 1948** (Совещание глав и представителей автокефальных Православных Церквей): segundo o prof. arcipreste Vladimir Khulap (Academia Teológica de São Petersburgo), decidiu-se que todas as Igrejas Ortodoxas celebram a Páscoa em conjunto pelo Pascálio alexandrino e pelo calendário juliano, e que para as festas fixas cada Igreja local pode escolher o calendário juliano ou o neojuliano; a ROC vive pelo calendário juliano e pelo Pascálio alexandrino [4].
- **Posição atual (fontes oficiais):** as «Пояснения к Православному церковному календарю» do calendário oficial da Editora do Patriarcado afirmam: «В богослужебной практике Русская Православная Церковь пользуется юлианским календарем… Разница между старым и новым стилем в XXI столетии – 13 дней» [41]. No sítio oficial patriarchia.ru, hierarcas responsáveis justificam a manutenção pela vontade do povo crente e pela memória das perseguições: arcipreste Nikolai Balashov (DECR, 2005: «Вопрос о перемене календарного стиля перед Русской Православной Церковью не стоит»); metropolita Hilarion (2011: o calendário «не является чем-то священным и незыблемым», mas «поскольку такой потребности у Церкви нет… не нужно поднимать этот вопрос»); metropolita Iuvenali (2017: «еще не пришло время обсуждать вопрос о календаре») [46].
- ✔ Confirmado (2.ª ronda): a prática e a sua fundamentação atual estão confirmadas por fonte oficial [41][46]. Nota: não foi encontrada **decisão conciliar** recente específica sobre o calendário — pesquisados os textos das determinações/decretos dos Concílios dos Bispos de 2008, 2011, 2013, 2016 e 2017 no patriarchia.ru (sem ocorrências de «юлиан»/«календарн»).

---

## 2. Pascálio (Пасхалия, *Paskhaliia*)

### 2.1 Regra

- Formulação tradicional: a Páscoa celebra-se no primeiro domingo depois da primeira lua cheia que se segue ao equinócio da primavera [4]. Na prática, a ROC aplica o **Pascálio alexandrino** em tabelas/aritmética sobre o calendário juliano (equinócio fixado a 21 de março juliano, lua cheia pascal tabular do ciclo lunar de 19 anos), não observações astronómicas [4][5].
- Intervalo: **22 de março – 25 de abril OS** [4]; no séc. XX–XXI isso corresponde a **4 de abril – 8 de maio NS** [3].
- Ciclo: as datas repetem-se a cada **532 anos** (= 19 × 28), o "grande indicção" (Великий индиктион, *Velikii indiktion*) [4]. O ciclo corrente vai de 1941 a 2472 [19].

### 2.2 Algoritmo (Meeus, Julian computus)

Fonte: J. Meeus, *Astronomical Algorithms* (1991), reproduzido em [1]; é o algoritmo citado por A. Andreev para os cálculos de leituras da ROC [19].

```text
# Input: Y (Julian year). Output: Pascha in the JULIAN calendar.
a = Y mod 4
b = Y mod 7
c = Y mod 19
d = (19*c + 15) mod 30
e = (2*a + 4*b - d + 34) mod 7
month = (d + e + 114) div 31      # 3 = March, 4 = April
day   = ((d + e + 114) mod 31) + 1
# Civil (Gregorian) date: convert via JDN (§1.1). For 1900–2099 this equals +13 days.
```

Variante equivalente (Gauss), dada em [3]: `a = (19·(Y mod 19) + 15) mod 30`; `b = (2·(Y mod 4) + 4·(Y mod 7) + 6a + 6) mod 7`; se `a+b > 9` → Páscoa a `(a+b−9)` de abril OS, senão a `(22+a+b)` de março OS [3].

### 2.3 Verificação (datas conhecidas)

| Ano | Páscoa OS | Páscoa NS | Confirmação externa |
|---|---|---|---|
| 2024 | 22.04 | 05.05.2024 | (cálculo próprio) |
| **2025** | 07.04 | **20.04.2025** | azbyka.ru [26]; orthocal.info `pascha_distance = 0` [31] |
| **2026** | 30.03 | **12.04.2026** | azbyka.ru [26]; orthocal.info [31] |
| **2027** | 19.04 | **02.05.2027** | azbyka.ru [26]; orthocal.info [31] |
| 2028 | 03.04 | 16.04.2028 | (cálculo próprio) |
| 2029 | 26.03 | 08.04.2029 | (cálculo próprio) |
| 2030 | 15.04 | 28.04.2030 | (cálculo próprio) |
| 2031 | 31.03 | 13.04.2031 | (cálculo próprio) |
| 2032 | 19.04 | 02.05.2032 | (cálculo próprio) |
| 2033 | 11.04 | 24.04.2033 | (cálculo próprio) |
| 2034 | 27.03 | 09.04.2034 | (cálculo próprio) |
| 2035 | 16.04 | 29.04.2035 | (cálculo próprio) |

Teste de regressão recomendado: o projeto Ponomar inclui `paschalion.pl`, que gera o Pascálio para os 532 anos a partir de 1941 e compara com uma tabela de referência (`paschalion_baseline.txt`), com todas as datas no calendário juliano [27].

### 2.4 A "regra da Páscoa judaica" — como é entendida

- **Cânone 7 dos Apóstolos** (7-е апостольское правило): "Se algum bispo, presbítero ou diácono celebrar o santo dia da Páscoa antes do equinócio da primavera com os judeus, seja deposto" (Если какой-либо епископ, или пресвитер, или диакон отпразднует святой день Пасхи раньше весеннего равноденствия вместе с иудеями, да будет извержен) [6]. Ver também o 1.º cânone do Concílio de Antioquia [6].
- **Interpretação dos canonistas bizantinos:**
  - Zonaras: o sentido do cânone é celebrar a Páscoa "não com os judeus, isto é, não no mesmo dia que eles; porque a festa deles deve preceder, e depois deve celebrar-se a nossa Páscoa" [6].
  - Balsamon: os apóstolos determinam "que a Páscoa do Senhor seja celebrada por nós **depois** de os judeus terem celebrado a páscoa legal" [6].
- **Leitura académica atual (difundida em fontes da ROC):** o arcipreste V. Khulap afirma que estes cânones visam a **dependência** da data cristã em relação ao cálculo judaico (14 de Nisan), e não a coincidência num mesmo dia, "como hoje frequentemente se interpreta erradamente"; lembra que, pelo Pascálio alexandrino, a Páscoa cristã coincidiu com a judaica em 289, 296, 316, 319, 323, 343, 347, 367, 370, 374, 394, nove vezes no séc. V e, pela última vez, em 783 [5]. A enciclopédia Azbuka Very cita ainda uma análise segundo a qual o "erro de Zonaras" resultou de no seu tempo a Páscoa cristã cair sempre, de facto, depois da judaica [5]; Khulap resume que o cânone 7 proíbe orientar-se pelo 14 de Nisan judaico [4].
- **Consequência para implementação:** o calendário da ROC calcula a Páscoa **exclusivamente** pelo Pascálio alexandrino/juliano [4]; os algoritmos de referência (Meeus [1], Ponomar [27]) **não** contêm qualquer verificação contra o calendário hebraico. **Não implementar** uma regra "depois da Páscoa judaica" — isso alteraria datas em relação ao calendário oficial.
- ✔ Confirmado (2.ª ronda) **quanto ao cálculo:** o calendário oficial da Editora do Patriarcado define a regra pascal assim: «Древнее правило так называемой александрийской православной пасхалии назначает праздновать Пасху в первое воскресенье по первом весеннем полнолунии, после дня весеннего равноденствия – 21 марта ст. ст.… с 22 марта по 25 апреля ст. ст.» — **sem** qualquer condição relativa à Páscoa judaica [41]. A afirmação popular "a Páscoa ortodoxa nunca coincide nem precede a Páscoa judaica" continua a ser apenas uma leitura canónica (Zonaras/Balsamon vs. Khulap/Voronov/[5]), sem efeito normativo no cálculo.

---

## 3. Ciclo móvel (Триодь Постная + Цветная, *Triod' Postnaia / Tsvetnaia*)

### 3.1 Tabela de offsets em relação a P

Os offsets foram cruzados com os ficheiros de dados do Ponomar (`languages/xml/triodion/NN.xml`, onde NN = dias **antes** de P; `languages/xml/pentecostarion/NN.xml`, onde NN = dias **depois** de P + 1) [27] e com o Typikon, caps. 49–50 [11][12].

| Offset | Dia da semana | Comemoração (PT) | Original | Notas / fonte |
|---|---|---|---|---|
| P−77 | Dom | Domingo de Zaqueu (prática russa) | Неделя о Закхее (*o Zakkhee*) | Lc 19,1-10 (zach. 94) é lido sempre no domingo imediatamente anterior ao do Publicano [19] |
| P−71 (vésp.) / P−70 | Sáb/Dom | Início do Triódio; Domingo do Publicano e do Fariseu | Неделя о мытаре и фарисее | 2 Tm 3,10-15; Lc 18,10-14 [27]; Typikon: pode cair entre 11.01 e 15.02 OS [10][19] |
| P−63 | Dom | Filho Pródigo | Неделя о блудном сыне | 1 Cor 6,12-20; Lc 15,11-32 [27] |
| P−57 | Sáb | Sábado ecuménico dos defuntos ("de carne") | Мясопустная родительская суббота | "ecuménico": comemoração de todos os defuntos [22][27] |
| P−56 | Dom | Domingo do Juízo Final ("de carne") | Неделя мясопустная, о Страшном суде | Mt 25,31-46 [27] |
| P−50 | Sáb | Sábado dos santos ascetas | Суббота сырная | [27] |
| P−49 | Dom | Domingo do Perdão / expulsão de Adão | Неделя сыропустная (Прощёное воскресенье) | Mt 6,14-21 [27] |
| P−48 | Seg | Segunda-feira Limpa — início da Grande Quaresma | Чистый понедельник | [27] |
| P−42 | Dom | 1.º Dom. Quaresma — Triunfo da Ortodoxia | Неделя 1-я Великого поста, Торжество Православия | Hb 11,24-26.32-12,2a; Jo 1,43-51 [27] |
| P−36, P−29, P−22 | Sáb | 2.º, 3.º, 4.º sábados da Quaresma (defuntos) | Родительские субботы 2-й, 3-й, 4-й седмиц | [22][27] |
| P−35 | Dom | 2.º Dom. — S. Gregório Palamas | Неделя 2-я, свт. Григория Паламы | [27] |
| P−28 | Dom | 3.º Dom. — Veneração da Cruz | Неделя 3-я, Крестопоклонная | [27] |
| P−21 | Dom | 4.º Dom. — S. João Clímaco | Неделя 4-я, прп. Иоанна Лествичника | [27] |
| P−15 | Sáb | Sábado do Acatisto (Louvor da Mãe de Deus) | Суббота Акафиста (Похвала Пресвятой Богородицы) | [27] |
| P−14 | Dom | 5.º Dom. — S. Maria Egipcíaca | Неделя 5-я, прп. Марии Египетской | [27] |
| P−8 | Sáb | Sábado de Lázaro | Лазарева суббота | [27] |
| P−7 | Dom | Domingo de Ramos (festa do Senhor, das Doze) | Вход Господень в Иерусалим (Неделя Ваий) | [27][14] |
| P−6…P−1 | Seg–Sáb | Semana Santa | Страстная седмица | P−2 = Sexta-feira Santa; P−1 = Sábado Santo [27] |
| **P** | Dom | **Páscoa** | Светлое Христово Воскресение | At 1,1-8; Jo 1,1-17 [27] |
| P+1…P+6 | Seg–Sáb | Semana Luminosa | Светлая седмица | tons próprios por dia (§6.1) [12] |
| P+7 | Dom | Domingo de Tomé (Antipáscoa) | Неделя Антипасхи (Фомина) | [12][27] |
| P+9 | Ter | Radonitsa (comemoração dos defuntos) | Радоница | 9.º dia após a Páscoa, terça da semana de Tomé [21][27] |
| P+14 | Dom | Mulheres Miróforas | Неделя 3-я по Пасхе, святых жен-мироносиц | [12] |
| P+21 | Dom | Paralítico | Неделя 4-я, о расслабленном | [12] |
| P+24 | Qua | Meio-Pentecostes | Преполовение Пятидесятницы | [27] |
| P+28 | Dom | Samaritana | Неделя 5-я, о самаряныне | [12] |
| P+31 | Qua | Despedida do Meio-Pentecostes | Отдание Преполовения | única festa não "grande" com despedida solene [17][27] |
| P+35 | Dom | Cego de nascença | Неделя 6-я, о слепом | [12] |
| P+38 | Qua | **Despedida da Páscoa** | Отдание Пасхи | pós-festa pascal de 38 dias [15][27] |
| P+39 | Qui | **Ascensão** | Вознесение Господне | [27] |
| P+42 | Dom | Padres do I Concílio Ecuménico | Неделя 7-я, святых отцов I Вселенского собора | [12] |
| P+47 | Sex | Despedida da Ascensão | Отдание Вознесения | [14][27] |
| P+48 | Sáb | Sábado da Trindade (defuntos, ecuménico) | Троицкая родительская суббота | [22][27] |
| **P+49** | Dom | **Pentecostes / Santíssima Trindade** | День Святой Троицы. Пятидесятница | [27] |
| P+50 | Seg | Dia do Espírito Santo | День Святого Духа | [27] |
| P+55 | Sáb | Despedida do Pentecostes | Отдание Пятидесятницы | [14][27] |
| P+56 | Dom | Todos os Santos (fim do Pentecostário; tom 8, Evangelho matinal 1) | Неделя Всех святых | [12][27] |
| P+57 | Seg | Início do Jejum dos Apóstolos (até 28.06 OS inclusive) | Петров (Апостольский) пост | duração 8–42 dias [23][27] |
| P+63 | Dom | Todos os Santos que resplandeceram na terra russa | Неделя всех святых, в земле Российской просиявших | 2.º domingo após o Pentecostes [27] |

Verificação da duração do Jejum dos Apóstolos **(cálculo próprio)**: começa em P+57 e termina a 28.06 OS; com P = 25.04 OS → 21.06–28.06 (8 dias); com P = 22.03 OS → 18.05–28.06 (42 dias); coincide com [23].

### 3.2 Domingos/sábados "semimóveis" do ciclo fixo (dependem do dia da semana)

| Comemoração | Regra (OS) | Fonte |
|---|---|---|
| Sábado e domingo **antes** da Exaltação | último sáb./dom. antes de 14.09 (7–13.09) | [10][16] |
| Sábado e domingo **depois** da Exaltação | primeiro sáb./dom. depois de 14.09 (15–21.09) | [10][19] |
| Padres do VII Concílio Ecuménico | domingo **11–17.10** (se 11.10 for domingo, nesse dia) | [10]; ✔ nota 1 |
| Sábado de S. Demétrio (defuntos) | sábado **estritamente** antes de 26.10 OS, i.e. sábado **19–25.10 OS** (= 01–07.11 NS em 1900–2099) | [22][44]; ✔ nota 2 |
| Domingo dos Antepassados (Праотец) | domingo 11–17.12 | [10] |
| Domingo dos Santos Padres (antes do Natal) | domingo 18–24.12 | [10] |
| Sábado/domingo antes do Natal | sábado/domingo 18–24.12 | [10][19] |
| Sábado/domingo depois do Natal (domingo: Sts. José, David, Tiago) | 26–31.12; se o Natal cair em domingo, o "domingo depois do Natal" passa para segunda 26.12 | [10] |
| Sábado/domingo antes e depois da Teofania | antes: entre o Natal e 05.01; depois: 07–13.01 | [10][16][19] |
| Concílio dos Novos Mártires e Confessores da Igreja Russa | 25.01 OS se for domingo; se 25.01 cair seg–qua → domingo anterior; qui–sáb → domingo seguinte (Concílio dos Bispos 2013) ⇒ domingo **22–28.01 OS** | [24][43]; ✔ nota 3 |
| Padres dos seis Concílios Ecuménicos | domingo mais próximo de 16.07 ⇒ domingo **13–19.07 OS** (seg/ter → domingo anterior; sex/sáb → seguinte) | [10][44]; ✔ nota 4 |
| Comemoração dos defuntos da Grande Guerra Patriótica | **9 de maio NS** (= 26.04 OS; data fixa) | [22][41] |
| Comemoração de todos os cristãos ortodoxos mortos ou presos inocentemente pelos perseguidores (Поминовение всех православных христиан, безвинно богоборцами убиенных…) | **17.10 OS = 30.10 NS** (data fixa; Santo Sínodo, 23–24.09.2021) | [41] |

Notas:
1. ✔ Confirmado (2.ª ronda): o mesmo «зри» do Typikon (11.10) acrescenta: «И аще случится 11 день настоящий в неделю, поется в тойже день служба святых отец седьмаго собора» [10] — logo, o domingo vai de **11 a 17.10 OS**.
2. ✔ Confirmado (2.ª ronda): quando 26.10 OS cai em sábado, o sábado parental é o **anterior** (19.10 OS). Verificado nos anos em que 08.11 NS foi sábado: 2014 → 01.11.2014 NS e 2025 → 01.11.2025 NS, no calendário da azbyka.ru [44]; outros anos: 02.11.2019, 07.11.2026 [44]; a lista oficial de 2026 dá «25 октября (ст.ст.) — Димитриевская родительская суббота» [41]. A pravenc define-a como «суббота перед днем памяти» [48]. Regra: `max{sábado} < 26.10 OS`.
3. ✔ Confirmado (2.ª ronda): o texto oficial das Постановления do Concílio dos Bispos de 2013, ponto 30, diz: «25 января (по старому стилю), в случае совпадения этого числа с воскресным днем; в предшествующий этой дате воскресный день, если 25 января… приходится на дни от понедельника до среды; в последующий этой дате воскресный день, если… от четверга до субботы» [43]; o calendário oficial repete-o em nota e a lista oficial dos Concílios de santos dá «воскресенье, 25 января или ближайшее к 25 января» [41][42]. A página da azbyka com "1.º domingo depois de 25.01" [22] está desatualizada (regra de 1992).
4. ✔ Confirmado (2.ª ronda): o Typikon só explicita quarta (→ domingo anterior) e quinta (→ seguinte) [10]; a regra completa do «domingo mais próximo» (13–19.07 OS) confirma-se empiricamente na azbyka.ru: 16.07 OS em sexta (2022) → 31.07.2022 NS; em sábado (2023) → 30.07.2023; em segunda (2024) → 28.07.2024; em terça (2025) → 27.07.2025 [44]; e no calendário oficial de 2026 (16.07 OS em quarta → «13 июля по старому стилю… Память святых отцов шести Вселенских Соборов») [41].

---

## 4. Ciclo fixo — Grandes Festas

### 4.1 As Doze Grandes Festas (Двунадесятые праздники, *Dvunadesiatye prazdniki*) + Páscoa

Datas NS válidas para 01.03.1900–28.02.2100 (OS + 13). Durações de pré-festa/pós-festa segundo a tabela da azbyka.ru [14]; sinais do Typikon [10].

| Festa (PT) | Original | OS | NS | Total de dias | Pré-festa (предпразднство) | Pós-festa incl. despedida (попразднство) | Despedida (отдание) OS / NS |
|---|---|---|---|---|---|---|---|
| **Páscoa** | Пасха | móvel | móvel | — | — | 38 dias (até à véspera da Ascensão) [15] | P+38 (quarta da 6.ª semana) [27] |
| Natividade da Mãe de Deus | Рождество Пресвятой Богородицы | 08.09 | 21.09 | 6 | 1 | 4 | 12.09 / 25.09 |
| Exaltação da Cruz | Воздвижение Креста Господня | 14.09 | 27.09 | 9 | 1 | 7 | 21.09 / 04.10 |
| Apresentação da Mãe de Deus no Templo | Введение во храм Пресвятой Богородицы | 21.11 | 04.12 | 6 | 1 | 4 | 25.11 / 08.12 |
| Natividade de Cristo | Рождество Христово | 25.12 | 07.01 | 12 | 5 (20–24.12) | 6 | 31.12 / 13.01 |
| Teofania / Batismo do Senhor | Крещение Господне. Богоявление | 06.01 | 19.01 | 13 | 4 (02–05.01) | 8 | 14.01 / 27.01 |
| Apresentação do Senhor (Encontro) | Сретение Господне | 02.02 | 15.02 | 2–9 | 1 | 0–7 (depende do Triódio) | 03–09.02 / 16–22.02 ✔ nota 1 |
| Anunciação | Благовещение Пресвятой Богородицы | 25.03 | 07.04 | 3 | 1 | 1 | 26.03 / 08.04 (regras especiais, nota 2) |
| Entrada em Jerusalém (Ramos) | Вход Господень в Иерусалим | P−7 | — | 1 | — | — | sem despedida [14][17] |
| Ascensão | Вознесение Господне | P+39 | — | 10 | 1 | 8 | P+47 (sexta da 7.ª semana) |
| Pentecostes | Пятидесятница | P+49 | — | 7 | — | 6 | P+55 (sábado seguinte) |
| Transfiguração | Преображение Господне | 06.08 | 19.08 | 9 | 1 | 7 | 13.08 / 26.08 |
| Dormição da Mãe de Deus | Успение Пресвятой Богородицы | 15.08 | 28.08 | 10 | 1 | 8 | 23.08 / 05.09 |

Notas:
1. **Apresentação do Senhor (Сретение)** — não há despedida no sábado e domingo "de carne", nem na quarta e sexta da semana do queijo. Se a festa cair: no domingo do Pródigo, ou segunda/terça da semana "de carne" → despedida na sexta dessa semana; quarta–sábado da semana "de carne" → terça da semana do queijo; domingo "de carne" ou segunda da semana do queijo → quinta do queijo; terça ou quarta do queijo → sábado do queijo; quinta–sábado do queijo → domingo do Perdão; no próprio domingo do Perdão → um só dia, sem pós-festa [14]. ✔ Confirmado (2.ª ronda): a despedida ordinária é a **09.02 OS** — Typikon, 09.02: «В сий день отдается праздник Сретения Господня. Аще же не случится в сий день отдание праздника…» [10]; com pós-festa de 1–7 dias a despedida cai em 03–09.02 OS = **16–22.02 NS** (1900–2099). O "16 a 23" da azbyka [14] contradiz a própria coluna "0–7 dias" da tabela: é gralha.
2. **Anunciação** — se cair no Sábado de Lázaro, não há pós-festa; se cair no Domingo de Ramos, Semana Santa ou Semana Luminosa, não há pré- nem pós-festa, só o dia da festa [14]. Na prática, a despedida de 26.03 só se celebra efetivamente quando coincide com sábados/domingos da 3.ª–5.ª semana da Quaresma [17].
3. A Ascensão tem "pré-festa" de 1 dia [14]; o dia anterior à Ascensão (P+38) é também a despedida da Páscoa [27] (a identificação da pré-festa com P+38 é inferência a partir de [14] e [27]).
4. Total de dias de despedida no Typikon: 13 por ano (11 festas das Doze, exceto Ramos, + Meio-Pentecostes) [17].

### 4.2 Grandes festas não pertencentes às Doze

O Typikon (cap. 47) define como grandes, com o sinal de cruz em círculo, as festas de Cristo, da Mãe de Deus, duas do Precursor (Natividade e Degolação) e a dos Apóstolos Pedro e Paulo [9]. A edição russa de 2002 marca também a Circuncisão e o Pokrov com 🕀 [10]; a azbyka.ru enumera estas cinco como "великие" do Typikon [13].

| Festa (PT) | Original | OS | NS | Pré/pós-festa | Fonte |
|---|---|---|---|---|---|
| Circuncisão do Senhor (+ S. Basílio Magno) | Обрезание Господне | 01.01 | 14.01 | sem pré/pós-festa próprios; cai entre a despedida do Natal (31.12) e a pré-festa da Teofania (02.01) | [10][14] |
| Natividade de S. João Batista | Рождество Иоанна Предтечи | 24.06 | 07.07 | Typikon: sem pré-festa; a 25.06 ainda se cantam estiqueras do Precursor; o *Полный православный богословский словарь* chama "попразднство" a 25.06 | [10][39] |
| Santos Apóstolos Pedro e Paulo | Свв. апостолов Петра и Павла | 29.06 | 12.07 | sem pré-festa no Typikon; 30.06 = Sinaxe dos 12 Apóstolos, com estiqueras de Pedro e Paulo | [10] |
| Degolação de S. João Batista (dia de jejum) | Усекновение главы Иоанна Предтечи | 29.08 | 11.09 | 30.08 ainda tem estiqueras do Precursor | [10] |
| Proteção (Pokrov) da Mãe de Deus | Покров Пресвятой Богородицы | 01.10 | 14.10 | sem pré/pós-festa | [10] |

✔ Confirmado (2.ª ronda): (a) o manual de liturgia de A. S. Kashkin (Seminário de Saratov, 2010) dá «Великих праздников всего 17»: as Doze + cinco «великих недвунадесятых (Покров…, Обрезание Господне, Рождество Иоанна Предтечи, …Петра и Павла, Усекновение главы Иоанна Предтечи)», todas com 🕀 [45]. A "sexta" grande festa referida pela azbyka [13] não é identificada por nenhuma fonte encontrada; o modelo usa as **cinco**. (b) O calendário **oficial** de 2026 também não dá título de pré-festa/pós-festa a 23.06, 25.06, 28.06, 30.06 nem 30.08 OS (dá-o, por exemplo, a 03.02: «Попразднство Сретения Господня») [41] — tratar estes dias como dias comuns com elementos da festa.

### 4.3 Outros pontos fixos úteis

- 01.09 OS — Início da indicção (Ano Novo eclesiástico) [10].
- 20.12 OS — início da pré-festa do Natal; o Typikon nota que de 20.12 a 14.01 há regras próprias (Октоих, etc.) [10].
- 11.01 OS — o Domingo do Publicano pode cair já a 11.01 (pós-festa da Teofania) [10].

---

## 5. Hierarquia (ranks) das festas no Typikon e combinação de memórias

### 5.1 Sinais (знаки праздников, *znaki prazdnikov*) — Typikon, cap. 47

| Sinal (Unicode) | Descrição (Typikon) | Categoria | Serviço típico | Fonte |
|---|---|---|---|---|
| 🕀 U+1F540 (vermelho) | "крест окружен" — cruz em círculo | Festa grande (великий праздник) | vigília (бдение) e todo o ofício da festa | [9][13] |
| 🕁 U+1F541 (vermelho) | "крест с полукружием" — cruz com semicírculo | Festa média, 1.ª classe | vigília; cânone da Mãe de Deus nas Matinas | [9][13] |
| 🕂 U+1F542 (vermelho) | "крест един точию" — só a cruz | Festa média, 2.ª classe | sem vigília; polieleo (полиелей), Evangelho, Grande Doxologia | [9][13] |
| 🕃 U+1F543 vermelho | três pontos semicircundados, vermelho | Festa pequena — "doxologia" (славословная) | 6 estiqueras; cânone em 6; Grande Doxologia cantada | [9][13] |
| 🕃 U+1F543 preto | idem, preto | Festa pequena — "de seis estiqueras" (шестеричная) | 6 estiqueras em "Senhor, clamei"; cânone em 6 | [9][13] |
| (sem sinal) | — | Santo "sem sinal" | 3 estiqueras; cânone em 4 | [9][13] |

Notas de implementação:
- As cores (vermelho/preto) são semânticas: 🕃 vermelho ≠ 🕃 preto. Guardar o rank como enumeração, não como glifo.
- Correspondências com fontes de dados:
  - **Ponomar** (`SERVICE Type`): 8 = festa do Senhor; 7 = festa da Mãe de Deus; 6 = "grande santo" (Pedro e Paulo, João Teólogo…); 5 = vigília; 4 = polieleo; 3 = doxologia; 2 = de seis estiqueras; 1 = simples; 0 = sem serviço; −1 = "Aleluia ou tropário possível"; −2 = memória dupla separável. O autor admite que a distinção 6/5 não é clara [28].
  - **orthocal.info**: campo `feast_level` com descrição (ex.: `2` = "Black squigg (6-stich typikon symbol)") [31].
  - **holytrinityorthodox.com**: 6 = vigília de grande festa; 5 = vigília; 4 = polieleo; 3 = doxologia; 2 = seis estiqueras; 0/1 = sem sinal [37].
  - **azbyka.ru**: o HTML do widget usa classes `ideograph-N`; a tabela de correspondência N → sinal não foi encontrada publicada [33]. — irrelevante: decisão 8 (sem dependência de dados da azbyka; o rank é curado pelo projeto, ver §8A).

### 5.2 Como se combinam as memórias (regras gerais documentadas)

- **Festa do Senhor em domingo** → o ofício dominical (ressurreição) **não** se canta: "ничтоже поется воскресно" (Exaltação, 14.09), "воскресно ничтоже поем" (Natal e Teofania), "ничтоже воскресно поется, ниже Евангелие утреннее чтется" (Transfiguração) [10].
- **Natividade do Precursor, Degolação, Pedro e Paulo em domingo** → o ofício dominical é cantado e **precede** o da festa ("предваряют вся воскресная" / "предваряет вся служба воскресна") [10].
- **Festas da Mãe de Deus (das Doze) em domingo:** o ofício dominical (Octoeco) **combina-se** com o da festa — Typikon, capítulo de Marcos a 08.09: «[МРК] Аще ли случится Рождество Богородицы в неделю…» (estiqueras dominicais + da festa, tropário dominical + da festa) [10]; Kashkin: «песнопения Октоиха соединяются с песнопениями праздника. Устав такой службы находится в Марковых главах всех Богородичных праздников»; nas Matinas lê-se o **Evangelho da festa** (não o matinal dominical, mas canta-se o exapostilário "evangélico" do domingo); na Liturgia, «Апостол и Евангелие – рядовые и праздника» [45]. ✔ Confirmado (2.ª ronda). Implementação: festa da Mãe de Deus em domingo **não** suprime as leituras dominicais ordinárias da Liturgia (ao contrário das festas do Senhor).
- **Capítulos de Marcos** (Марковы главы, marcados [МРК] no Typikon): regras casuísticas para coincidências entre o ciclo fixo e o móvel ou o dominical (ex.: pré-festa do Encontro nos domingos do Triódio; pré-festa da Anunciação em diferentes dias da Quaresma) [10]. Devem ser modelados como **tabela de exceções**, não como regra geral.
- **Octoeco + Menaion em dias de semana:** a quantidade de estiqueras/cânones do Octoeco vs. Menaion depende do rank do santo (ver a tabela de referência para regentes em [13]).
- **Sábados de defuntos:** qualquer sábado é dedicado à oração pelos defuntos, exceto quando nele cai festa de polieleo, vigília ou grande festa [22].

---

## 6. Octoeco (Октоих, *Oktoikh*) e Evangelhos matinais dominicais

### 6.1 Tom (глас, *glas*) da semana

- O ciclo de oito tons começa no **Domingo de Tomé** (P+7) e cada semana tem um tom "condutor", que muda no **sábado nas Vésperas** [20]. O Typikon confirma: no Domingo de Tomé, na Mesonýktikon, canta-se o cânone trinitário do Octoeco "do 1.º tom" [12]; no Domingo de Todos os Santos (P+56) o cânone dominical é do **tom 8** [12].
- **Fórmula** (equivalente às fórmulas `Tone` dos dados do Ponomar [27], verificada **(cálculo próprio)** contra o Typikon e a azbyka.ru):

```text
d    = days since the most recent Pascha (d >= 7)     # use previous year's Pascha before current Pascha
w    = floor(d / 7)                                   # weeks since Pascha, counting from its Sunday
tone = w mod 8;  if tone == 0: tone = 8
# Weekday rows (Mon..Sat) take the tone of the preceding Sunday;
# liturgically the new tone starts at Saturday Vespers.
```

  Verificações: P+7 → tom 1; P+14 (Miróforas) → 2; P+56 (Todos os Santos) → 8 [12]; 18.10.2026 NS (domingo 20 depois do Pentecostes) → tom 3, coincide com os tropários "глас 3" da azbyka.ru [25] e com orthocal.info [31].
- **Semana Luminosa:** não segue o ciclo; nas Matinas cantam-se estiqueras dominicais de um tom diferente por dia: segunda — tom 2, terça — 3, quarta — 4, quinta — 5, sexta — 6; nas Vésperas de sexta, tom 8 (o tom 7 é saltado) [12].
- **Fim do ciclo:** a azbyka.ru diz que o ciclo se repete "até à Grande Quaresma seguinte" [20]; o Ponomar atribui tom aos domingos da Quaresma até ao 5.º domingo (P−14) com a mesma fórmula, e o Domingo de Ramos sem tom (`Tone="-1"`) [27]. ✔ Confirmado (2.ª ronda): o calendário oficial indica para a Quaresma «В седмичные дни Великого поста служба совершается по Минее и Триоди, без Октоиха, кроме Троичнов, седальнов и светильнов рядового гласа» [41]; o Typikon (cap. 49) usa nos dias de semana da Quaresma o «Аллилуиа… во глас прилучившийся октоиха», as estiqueras martíricas do tom e o ofício dominical do Octoeco aos domingos [11]. Logo, o **tom da semana continua a contar-se em toda a Quaresma** (a fórmula aplica-se até P−14 e à semana seguinte); só a quantidade de textos do Octoeco usados em dias de semana é reduzida. Domingo de Ramos: sem tom [27].

### 6.2 Os 11 Evangelhos matinais dominicais (евангелия утренние воскресные, *evangeliia utrennie voskresnye*; gr. ἑωθινά)

| N.º | Perícope | Zachalo | Fonte |
|---|---|---|---|
| 1 | Mt 28,16-20 | 116 | [27] |
| 2 | Mc 16,1-8 | 70 | [27] |
| 3 | Mc 16,9-20 | 71 | [27] |
| 4 | Lc 24,1-12 | 112 | [27] |
| 5 | Lc 24,12-35 | 113 | [27] |
| 6 | Lc 24,36-53 | 114 | [27] |
| 7 | Jo 20,1-10 | 63 | [27] |
| 8 | Jo 20,11-18 | 64 | [27] |
| 9 | Jo 20,19-31 | 65 | [27] |
| 10 | Jo 21,1-14 | 66 | [27] |
| 11 | Jo 21,15-25 | 67 | [27] |

**Cálculo:**

```text
# For an ordinary Sunday from All Saints (P+56) until the 5th Sunday of Lent (P_next-14):
d = days since the most recent Pascha
eothinon = (d/7 - 7) mod 11;  if eothinon == 0: eothinon = 11
# All Saints (d = 56) -> 1.  The cycle runs continuously through the civil new year and into Lent.
```

- Fórmula retirada dos atributos `Cmd="(ndayP / 7 - 7) % 11 == n"` dos dados do Ponomar (onde `ndayP` = dias desde a Páscoa do ano anterior, usada para datas antes da Páscoa corrente) [27][40].
- Verificações com a azbyka.ru **(cálculo próprio)**: 01.03.2026 NS (1.º Dom. Quaresma) → 5 (Lc 24,12-35, zach. 113); 07.06.2026 (Todos os Santos) → 1 (Mt 28,16-20); 18.10.2026 → 9 (Jo 20,19-31) — todos coincidem com a indicação "Утр." da azbyka.ru [25][26].
- **Domingos do Pentecostário (fixos, Typikon):** Tomé — Mt zach. 116 (= n.º 1); Miróforas — Mc zach. 71 (= 3); Paralítico — Lc zach. 112 (= 4); Samaritana — Jo zach. 63 (= 7); Cego — Jo zach. 64 (= 8); Padres do I Concílio — Jo zach. 66 (= 10; corrigido na QA da fase 1: calendário oficial 2026, 24.05.2026 «Утр. – Ев. 10-е, Ин., 66 зач.»); Pentecostes — Jo zach. 65 (Jo 20,19-23, parte do n.º 9) [12].
- **Domingo de Ramos:** Evangelho matinal próprio, Mt 21,1-11.15-17 (zach. 83) [27].
- **Festa do Senhor em domingo:** não se lê o Evangelho matinal dominical (ex.: Transfiguração) [10]; o ciclo **não** é "empurrado" (o número seguinte continua a ser dado pela fórmula).

---

## 7. Lecionário (Apóstolo e Evangelho na Liturgia)

### 7.1 Estrutura geral

- **Typikon, cap. 10:** o Evangelho de João lê-se da Páscoa ao Pentecostes; Mateus desde depois do Pentecostes até ao **Domingo depois da Exaltação**; Lucas desde depois desse domingo até ao Domingo do Publicano e do Fariseu [19].
- **"Pilar" (столп) do *Сказание II* do Evangeliário litúrgico:** 17 semanas de sábados/domingos de Mateus (dias de semana: 11 semanas de Mateus + 6 de Marcos) e 18 semanas de sábados/domingos de Lucas (dias de semana: 12 de Lucas + 6 de Marcos + 3 dias da semana do queijo de Lucas) [19]. O ciclo anual dá leituras para 33 semanas e 32 domingos entre o Pentecostes e o Domingo do Publicano [18].
- Os dias de semana da 17.ª semana repetem leituras de Marcos da 32.ª semana (Mc zach. 48–53) [19].
- Distribuição de Marcos nos dias de semana (tabela I de Andreev): sem. 15 → Mc 21–26; 16 → 27–32; 17 → 48–53; 30 → 33–41; 31 → 42–46; 32 → 48–53; 33 → 54–58; 34 → 59–63 [19].
- O Apóstolo segue a sequência por semanas depois do Pentecostes e **não** está sujeito à "отступка" da Exaltação [19].

### 7.2 Numeração de semanas depois do Pentecostes

```text
Pent = P + 49
Sunday N after Pentecost ("Неделя N по Пятидесятнице") = Pent + 7*N      # N = 1 -> All Saints (P+56)
Week N ("седмица N", Mon..Sat)  = days Pent + 7*(N-1) + 1 .. Pent + 7*N - 1
# Week 1 = Monday after Pentecost (Day of the Holy Spirit) .. Saturday before All Saints.
```

Verificação: 16.10.2026 NS (sexta) é "Седмица 20-я по Пятидесятнице" e 18.10.2026 é "Неделя 20-я по Пятидесятнице" no calendário da azbyka.ru e do pravoslavie.ru [25][38], o que confirma que a Седмица N termina na Неделя N **(cálculo próprio: Pent 2026 = 31.05 NS)**. A numeração de semanas **não** muda com a отступка: "o cômputo de domingos e semanas mantém-se" [26].

### 7.3 Отступка / преступка da Exaltação (Воздвиженская отступка, "Lucan jump")

Definições [18]:
- **Отступка** (*otstupka*, "recuo"): repetição de leituras já lidas quando faltam leituras ordinárias.
- **Преступка** (*prestupka*, "salto"): omissão de leituras ordinárias.

**Regra (Typikon/Сказание I, prática MP):** a partir da **segunda-feira depois do Domingo depois da Exaltação**, lêem-se as leituras ordinárias de Lucas da **18.ª semana** (segunda-feira: Lc zach. 10, etc.) e depois as seguintes por ordem, **independentemente** do número que esse domingo tenha no ano corrente [18][19]. Fundamento: a transição histórica no Ano Novo bizantino (23.09, Conceição do Precursor, narrada em Lucas) [18][19].

**Algoritmo:**

```text
S  = first Sunday strictly after 14 Sept (OS)              # "Sunday after the Exaltation", 15..21 Sept
k  = (S - Pent) / 7                                         # its number after Pentecost
s  = k - 17                                                 # Gospel shift
# Weekdays: for week w >= k+1, read the Gospel of week (w - s).
#   s > 0  -> otstupka (repeat 1-2 weeks before the Lucan start)
#   s = 0  -> neither
#   s < 0  -> prestupka (skip 1-3 weeks of Matthew/Mark; not compensated, per Typikon)
# Saturdays/Sundays: the Lucan series (Sat/Sun 18, 19, ...) also starts after S (see below).
# Apostol: NO shift -> Apostol of week w is read in week w.
```

Resultado para todo o ciclo de 532 anos **(cálculo próprio, script em JDN)**, que reproduz exatamente as faixas publicadas [18]:

| Páscoa OS | Páscoa NS (1900–2099) | k (n.º do Dom. depois da Exaltação) | s | Efeito [18] |
|---|---|---|---|---|
| 22–23.03 | 04–05.04 | 19 | +2 | отступка de 2 semanas |
| 24–30.03 | 06–12.04 | 18 | +1 | отступка de 1 semana |
| 31.03–06.04 | 13–19.04 | 17 | 0 | nem uma nem outra |
| 07–13.04 | 20–26.04 | 16 | −1 | преступка de 1 semana |
| 14–20.04 | 27.04–03.05 | 15 | −2 | преступка de 2 semanas |
| 21–25.04 | 04–08.05 | 14 | −3 | преступка de 3 semanas (início mais precoce de Lucas: segunda da 15.ª semana [19]) |

**Anos próximos (cálculo próprio):** 2025 s = −1; **2026 s = +1**; 2027 s = −2; 2028 s = 0; 2029 s = +1; 2030 s = −2; 2031 s = 0; 2032 s = −2; 2033 s = −1; 2034 s = +1; 2035 s = −2.

**Exemplo verificado (2026, s = +1):** domingo 18.10.2026 NS = Неделя 20: Apóstolo **do domingo 20** (Gl 1,11-19, zach. 200) e Evangelho **do domingo 19** (Lc 6,31-36, zach. 26); Evangelho matinal n.º 9 — em azbyka.ru [25] e orthocal.info [31]. Sexta 16.10.2026 (semana 20): Fl 3,8-19 (Apóstolo da 20.ª semana) + Lc 6,17-23 (Evangelho da 19.ª semana) — em holytrinityorthodox.com e orthocal.info [36][31].

**Detalhes (Andreev [19]):**
- *Dias de semana com s > 0:* o Сказание I só diz "volta atrás e lê cinco dias de onde quiseres". Os calendários e as Богослужебные указания da MP indicam normalmente repetir a **11.ª semana** (última de Mateus), mais raramente a **17.ª**; Andreev propõe, em alternativa, ler antes as leituras da 31.ª (e 30.ª) semana [19]. ✔ Confirmado (2.ª ronda) para s = +1: o calendário **oficial** de 2026 indica na segunda 15/28.09: «Седмица 18-я по Пятидесятнице (ев. чтения 11-й, Матфеевой, седмицы по причине Воздвиженской отступки)» (Mt zach. 94, 95…), e na segunda 22.09/05.10: «С этого дня, согласно Церковному Уставу (Типикон, глава 10), начинается чтение евангельских зачал 18-й, Лукиной, седмицы. Счет Недель и седмиц остается прежним» [41]. Default = **11.ª semana**. ⚠ Para s = +2 (Páscoa a 22–23.03 OS) não foi encontrado exemplo oficial; manter parâmetro (sugestão: 10.ª + 11.ª, admitida por Andreev [19]).
- *Sábados/domingos com s > 0:* os 1–2 sábados/domingos que ficam sem Mateus coincidem sempre com o sábado/domingo antes/depois da Exaltação, que têm leituras próprias; as leituras do 18.º sábado/domingo começam depois do Domingo depois da Exaltação [19].
- *Sábados/domingos com s < 0:* as últimas leituras de Mateus (15.º, 16.º, 17.º sábado/domingo) são omitidas "на ряду" e podem ser usadas em janeiro (§7.4) [19].
- *Leituras de Marcos omitidas em setembro (s < 0):* prática alternativa (não prevista no Typikon) proposta por Andreev — reinserir as leituras de Marcos das semanas 15–16 antes da 30.ª semana; as da 17.ª não precisam, porque serão lidas como 32.ª semana [19].

**História e variantes de prática (norma vs. prática):**
- O Concílio Local de 1917–1918 recomendou a отступка da Exaltação; foi indicada nas Богослужебные указания de 1957, suspensa pelo Patriarca Aleixo I após mal-entendidos em 1958, e reintroduzida nos calendários da MP em 1963 pelo metropolita Nikodim (Rotov); desde então está nos calendários e Богослужебные указания da MP, mas nunca foram publicadas tabelas oficiais completas [19].
- O manual clássico do arcipreste K. Nikolsky afirmava que Mateus podia continuar depois da Exaltação, contra o Typikon [19].
- O Ponomar oferece duas opções de seleção do Evangelho: "Lucan Jump" e "Jordanville" (`TheophanyJump`, só com отступка de inverno) [40]. ⚠ **PARA CONFIRMAR** (não verificado na 2.ª ronda: pesquisa em inglês sobre a prática ROCOR/Jordanville sem resultado conclusivo) que comunidades usam a opção "Jordanville" hoje. Sem impacto para o projeto (decisão 2): a ROC/MP usa a отступка da Exaltação, confirmada no calendário oficial de 2026 [41].
- As tabelas gregas de Glyzonius (séc. XVI) têm transposições não adotadas na Rússia (ex.: Evangelho do 21.º domingo no Domingo dos Padres do VII Concílio; 22.º domingo entre 30.10 e 05.11), exceto a leitura de Lc zach. 76 no Domingo dos Antepassados [19].

### 7.4 Regras de sábados/domingos especiais (ciclo fixo)

- Têm leituras próprias: sábado e domingo **antes** e **depois** da Exaltação, do Natal e da Teofania [16][19]. Quando um sábado/domingo tem leitura especial e ordinária, a ordinária lê-se "под зачало" (em conjunto, a seguir) [19]; o **Domingo antes do Natal (Santos Padres)** nunca tem leituras ordinárias [19].
- **Domingo dos Antepassados:** lê-se o Apóstolo do 29.º domingo e o Evangelho do 28.º domingo; para evitar repetição troca-se com o domingo em que essas leituras cairiam (Typikon, 11.12) [19]. Andreev propõe a mesma troca para o sábado antes do Natal (Apóstolo do 26.º sábado, Evangelho do 29.º sábado) — extensão não escrita no Typikon [19].
- **Natal em domingo:** na véspera (sábado, Vésperas) lêem-se Gl zach. 207 e Mt zach. 53; o Apóstolo/Evangelho "do sábado antes do Natal" passa para o sábado anterior ao Domingo dos Santos Padres [19].
- **Natal em domingo → domingo depois do Natal a 26.12 (segunda)** [10]. Andreev lista transferências por ano, p. ex. "leituras do domingo antes da Iluminação transferidas para segunda/terça 1 de janeiro" e "sábado depois do Natal para sexta 31.12" [19].
- **Sábado antes da Exaltação** em ano em que a festa de 08.09 cai nesse sábado: Apóstolo/Evangelho desse sábado passam para 13.09 [10].

### 7.5 Отступка de inverno ("da Teofania", Крещенская / Богоявленская отступка)

- No inverno só pode haver **отступка**: entre o fim das leituras ordinárias e o início do Triódio (em geral entre o Domingo depois da Teofania e o Domingo do Publicano) repetem-se leituras das últimas semanas; só não há отступка com a Páscoa seguinte mais precoce (22.03) e apenas em ano não bissexto; nos outros casos cobre 1 a 5 semanas [18].
- O Domingo do Publicano (P_next − 70) cai entre **11.01 e 15.02 OS** (Typikon, capítulo de Marcos a 11.01) [19].
- **Zaqueu:** Lc zach. 94 é sempre lido no domingo imediatamente anterior ao do Publicano [19].
- **Domingos a preencher** (Сказание I + princípio de não repetição de leituras de sábado/domingo no mesmo ano pascal): primeiro, as leituras ordinárias que caíram em sábados/domingos com leitura especial (antes/depois do Natal e da Teofania; na prática até duas); se não chegarem, as do 17.º (e 16.º) sábado/domingo de Mateus, deslocadas de setembro [19].
- **Dias de semana:** depois da 33.ª semana, se ainda não chegou o Domingo do Publicano, repetem-se até 4 semanas (ex.: depois da 33.ª volta-se à 29.ª) — Typikon, 6.º "зри" de 07.01 [19].
- **Exemplo (Andreev):** Páscoa a 02.04 OS e Páscoa seguinte a 21/22.04 → Publicano no 38.º domingo (11.02); o 37.º domingo lê Zaqueu; os domingos 34–36 lêem as leituras do 31.º, 16.º e 17.º domingos [19]. Com a Páscoa seguinte precoce, o mesmo ano tem distribuição diferente [19].
- **Consequência de implementação:** a distribuição de setembro–fevereiro **depende de P e de P_next**; Andreev calculou, por força bruta sobre os 532 anos, **65 combinações** e publicou tabelas completas (máximo de 4 variantes para um mesmo P, para P = 06.04 OS) [19].
- **Apóstolo no inverno:** não segue a отступка; nos sábados/domingos depois da Iluminação escolhem-se Apóstolos ainda não lidos no ano pascal (ex.: Páscoa a 22.03: nos domingos 35 e 36 lêem-se os Apóstolos dos domingos 18 e 19, que tinham ficado por ler nos domingos antes/depois da Exaltação) [19]. ⚠ Regra derivada por Andreev a partir do princípio de "ler tudo sem repetições"; não está escrita literalmente no Typikon.

**Recomendação técnica:** não reimplementar o algoritmo à mão. Usar (a) as tabelas de Andreev (2018) [19] como especificação e casos de teste, ou (b) os dados `kahuna` do Ponomar (`Ponomar/scripts/Perl/data/*.tsv`, colunas `month day doy nday ndayF apostol gospel`), a partir dos quais o script `kahuna.pl` gera as regras da отступка; o teste `test_lj.pl` valida a implementação [27]. Licença GPLv3 (ver §8).

### 7.6 Leituras do Triódio e da Quaresma

| Período | Estrutura | Fonte |
|---|---|---|
| Domingos preparatórios (Publicano → Perdão) | Apóstolo + Evangelho próprios (ver §3.1) | [27] |
| Dias de semana da Grande Quaresma (seg–sex) | sem Liturgia completa (exceto a dos Pré-santificados e a Anunciação); leituras do AT: Isaías à 6.ª hora, Génesis e Provérbios nas Vésperas (ex.: Segunda-feira Limpa: Is 1,1-20; Gn 1,1-13; Pr 1,1-20) | [11][22][27] |
| Sábados da Quaresma | Hebreus + Marcos (ex.: 2.º sábado: Hb 3,12-16; Mc 1,35-44) + leituras de defuntos (1 Ts 4,13-17; 1 Cor 15,47-57; Jo 5,24-30) nos sábados 2–4 | [27] |
| Domingos da Quaresma | Hebreus + Jo 1,43-51 (1.º); Mc 2,1-12 (2.º); Mc 8,34b-9,1 (3.º); Mc 9,17-31 (4.º); Mc 10,32b-45 (5.º); com leituras adicionais do santo do dia (Palamas, Clímaco, Maria Egipcíaca) | [27] |
| Páscoa → Pentecostes | Atos + João (Páscoa: At 1,1-8; Jo 1,1-17) | [19][27] |

---

## 8. Fontes de dados legíveis por máquina

| Fonte | Conteúdo | Formato / acesso | Licença / termos | Língua(s) | Tradição |
|---|---|---|---|---|---|
| **Ponomar** (github.com/typiconman/ponomar; ponomar.net) | Месяцеслов (santos por dia), ranks, leituras (Vésperas/Matinas/Liturgia com zachala), tropários/condáquios, vidas, Pascálio, regras de отступка | Repositório Git (~612 MB, ~37 700 ficheiros); XML por dia e por memória (`languages/xml/MM/DD.xml`, `lives/<CId>.xml`, `triodion/`, `pentecostarion/`); API Perl; app Java | **GPL v3 ou posterior** (código e repositório) [27]; vidas com atributos `Copyright` de terceiros (ex.: 3 943 ocorrências "saint.gr", "Bulgakov Handbook", "ПРАВОСЛАВИЕ.RU") ⚠ | cu (eslavo), cu/ru (russo civil, 3 068 ficheiros de vidas), en, el, fr, zh, ar, la [27] | Russa (autor: A. Andreev, SPbDA) |
| **azbyka.ru** (Азбука веры) | santos do dia (com classes de rank), leituras (Utr./Lit.), tropários/condáquios, jejum, semana/tom | (1) endpoint público do widget `https://azbyka.ru/days/widgets/presentations.json?date=YYYY-MM-DD` (JSON com HTML pronto); (2) **API v1/v2 com registo e aprovação do administrador** (`/days/register/userapi`; docs v2 em `/days/api-v2/doc`); v1 será descontinuada [33][34] | ⚠ termos de utilização da API não visíveis sem conta; não foi encontrada licença aberta [33] | ru | ROC/MP |
| **holytrinityorthodox.com** (paróquia do Patriarcado de Moscovo, Baltimore) | santos (incl. novos mártires, opção "MP"), leituras, tropários/condáquios, jejum, sinais do Typikon; anos até 2099 | Widget AJAX/PHP: `/htc/ocalendar/v2calendar.php?month=&today=&year=&dt=&header=&lives=&trp=&scripture=` (HTML) [36] | "© 2000–2026 … All rights reserved"; programa de integração para webmasters, mas sem licença de dados explícita ⚠ [35][36] | en, ru (tropários em eslavo) [35] | ROC (datas julianas com NS) |
| **orthocal.info** | dia litúrgico, tom, títulos, santos, jejum, leituras com texto bíblico (KJV ou LXX2012+WEB), `feast_level` | REST JSON + OpenAPI 3.1: `/api/{tradition}/{cal}/{year}/{month}/{day}/`, `tradition ∈ {slavic, greek}`, `cal ∈ {gregorian, julian}`; também feeds [31] | código MIT (orthocal-python) [32]; serviço "sem condições", agradecimento opcional [30] | en | **OCA/ROCOR** (não MP); dados eslavos baseados no projeto de Paul Kachur [30] |
| **days.pravoslavie.ru** (Православие.Ru) | calendário diário (semana, tom, santos, leituras) | HTML; páginas por data **juliana** (`/Days/YYYYMMDD.html`); ficheiro JS anual `daysCalendarData{YYYY}rus.js` com festas/jejuns em chaves AAMMDD julianas [38] | "© ПРАВОСЛАВИЕ.RU"; sem API documentada ⚠ | ru (também en, sr) | ROC |
| **Typikon** (texto integral) | regras normativas (caps. 47–52, Capítulos de Marcos) | HTML em azbyka.ru (edição Moscovo, Izdatel'skii Sovet RPTs, 2002) [9][10] | texto litúrgico; reprodução no portal ⚠ termos azbyka | cu (ortografia civil) | ROC |
| **Andreev (2018)** | tabelas completas de leituras (Apóstolo/Evangelho) para todo o ciclo de 532 anos | PDF académico (Вестник ЕДС, DOI 10.24411/2224-5391-2018-10403) [19] | artigo protegido por direitos de autor; usar como especificação/testes | ru (resumo en) | ROC/MP |

Observações:
- **Богослужебные указания** (Instruções litúrgicas anuais da Editora do Patriarcado de Moscovo) são a referência normativa anual (inclui a отступка desde 1963) [19], mas não foram encontradas como dados abertos. (2.ª ronda) A mesma Editora publica em linha o **Православный церковный календарь** oficial (calendar.rop.ru): месяцеслов diário com semana, tom, Evangelho matinal, leituras e notas de ordo, publicado só com um mês de antecedência; os dados completos estão no «Патриарший календарь» impresso [41][47]. É a melhor referência de verificação (ver §8A).
- ⚠ Colunas "Licença / termos" desta tabela (azbyka, holytrinity, pravoslavie, textos de terceiros no Ponomar) — irrelevante: decisão 8 (cálculo próprio + base de santos curada; nenhuma destas fontes é dependência).
- O Ponomar publica no sítio uma declaração editorial que condena a agressão contra a Ucrânia e critica a liderança do Patriarcado de Moscovo [29]. Facto relevante para decisões de produto (atribuição/branding), não para a qualidade técnica dos dados.
- Para a prática MP, a fonte aberta mais completa e com licença clara é o **Ponomar** (GPLv3, com cautela nos textos de terceiros); para validação cruzada diária, **azbyka.ru** (MP, russo) e **holytrinityorthodox.com** (MP, inglês). O **orthocal.info** é útil para inglês e testes, mas segue a OCA/ROCOR (pode divergir em santos locais russos e em detalhes de prática).

---

## 8A. Base própria de santos e festas (decisão 8)

### 8A.1 Lista de referência para as comemorações diárias

- **Fonte autoritativa:** o **«официальный календарь Русской Православной Церкви»** — o «Православный церковный календарь» / «Патриарший календарь» anual da Editora do Patriarcado de Moscovo (Издательство Московской Патриархии), cujo месяцеслов é a referência citada pelos próprios atos oficiais (p. ex. Concílio dos Bispos 2013: «как и указано в официальном календаре Издательства Московской Патриархии») [43][47]. Consulta em linha: calendar.rop.ru (um mês à frente; completo só na edição impressa) [41].
- **Estrutura de cada dia no calendário oficial** («Пояснения») [41]: (1) festa ou domingo/semana depois do Pentecostes e tom; 1.º parágrafo — santos universais e russos **com ofício** na Minea/Triódio (e alguns russos recém-glorificados); 2.º — todos os outros santos do dia, exceto novos mártires; 3.º — novos mártires e confessores **sem ofício próprio** (apelido em itálico, por decisão do Concílio de 2011); 4.º — ícones locais da Mãe de Deus; depois, notas de liturgia/jejum («особо строгий пост или поста нет»), leituras e notas de ordo. Títulos e nomes segundo a resolução patriarcal n.º ПК–01/1832 de 02.11.2015 [41]. Sugestão de modelo: campo `paragraph ∈ {1,2,3,4}` por memória.
- **Indícios tipográficos de rank** (calendário oficial) [41]: Doze festas — negrito vermelho grande; domingos — vermelho; santos com **vigília** (e ainda Sto. André e S. Vladimir) — negrito vermelho menor; outros santos grandes/especialmente venerados — negrito preto. O sinal exato do Typikon (§5.1) vem do Месяцеслов do Typikon (cap. 48) para os santos que lá constam [10]; para santos posteriores, da Minea da MP e das Богослужебные указания (não abertas).
- **Atualizações:** (a) decisões do Santo Sínodo publicadas nos «Журналы» em patriarchia.ru com a fórmula «Включить в месяцеслов Русской Православной Церкви…» e a data OS/NS (ex.: 12.03.2026 — S. Nicodemo (Milaš), 21.09/04.10; Sta. Ana, mãe de S. Basílio de Ostrog, 30.04/13.05) [47]; (b) **lista oficial do Concílio dos Novos Mártires e Confessores**, mantida pela Comissão sinodal de canonização e pelo departamento de calendário da Editora, com «все даты памяти святого, входящие в официальный календарь… (по старому и по новому стилям)» — versão de outubro de 2026 em .doc [47]; (c) lista oficial dos **Concílios (Соборы) de santos** com a regra de data de cada um [42].
- **Dados de domínio público a guardar:** nome canónico (eslavo/russo) + nome PT, título de santidade (лик), data OS, tipo de colocação (§8A.2), rank, parágrafo, ano/século. Não copiar tropários, vidas nem notas (decisão 7: traduções próprias).

### 8A.2 Regras de colocação (fixa vs. móvel)

| Tipo | Regra | Exemplos (datas OS) | Fonte |
|---|---|---|---|
| **Fixa** | data OS do Месяцеслов (NS = OS + 13 em 1900–2099) | a maioria das memórias; 26.04 (= 9 maio NS, militares mortos, Concílio 1994); 17.10 (= 30 out. NS, vítimas das perseguições, Sínodo 2021) | [41] |
| **Pascal** (offset de P) | ver §3.1 | Todos os santos da terra russa = 2.º domingo depois do Pentecostes (P+63); Padres do Monte Atos = 2.º domingo depois do Pentecostes; vários Concílios regionais (Bielorrússia, Volgogrado, Vologda, Novgorod, Pskov, S. Petersburgo, Udmúrtia) = 3.º domingo depois do Pentecostes (P+70); Pskov-Pechory = 4.º domingo (P+77); Novos Mártires de Butovo = «4-я суббота по Пасхе» (P+27; 2026 → 26.04 OS / 09.05 NS); Padres do Sinai = quarta da Semana Luminosa (P+3); Todos os veneráveis padres = Sábado do Queijo (P−50); Todos os padres das Grutas de Kiev = 2.º domingo da Quaresma (P−35) | [41][42] |
| **Domingo/sábado num intervalo** (ciclo fixo) | fórmula «dia da semana d no intervalo [a, b] OS» | Sáb./dom. antes da Exaltação 07–13.09; depois 15–21.09; Padres do VII Concílio dom. 11–17.10; Sábado de S. Demétrio 19–25.10; Antepassados dom. 11–17.12; Santos Padres dom. 18–24.12; dom. depois do Natal 26–31.12 (Natal em domingo → segunda 26.12); Novos Mártires dom. 22–28.01; Padres dos seis Concílios dom. 13–19.07 | §3.2 [10][41][43] |
| **«Ближайшее воскресенье к X»** | domingo em [X−3, X+3] | Alanos (10.11), Alemanha (20.09), Saratov (31.08); Novos Mártires (25.01) | [42] |
| **«Воскресенье после X»** | domingo em [X+1, X+7] ⚠ | Altai (07.09), Valaam (06.08), Kuban (28.09), Cazaquistão — novos mártires (03.09), Carélia — novos mártires (18.10), Níjni Novgorod (26.08), Perm (29.01), Tver (29.06), Kholm e Podláquia (19.05); Cheliabinsk (27.09: «27 сентября, если это воскресный день; в воскресенье перед 27 сентября, если на воскресенье после 27 сентября приходится праздник Покрова») | [42] |
| **«Воскресенье перед X»** | domingo em [X−7, X−1] ⚠ | Espanha e Portugal (29.09), Kuzbass (18.08), Moscovo (26.08), Smolensk (28.07) | [42] |
| Ligada a outra celebração | no mesmo dia | Comemoração dos que sofreram nas perseguições (Sínodo 30.01.1991): no calendário oficial de 2026 está no domingo do Concílio dos Novos Mártires (26.01 OS) | [41] |

⚠ PARA CONFIRMAR: a lista oficial [42] não diz se «после X»/«перед X» inclui X quando X é domingo (a nota de Cheliabinsk sugere que, nesse caso particular, sim). Validar ano a ano contra o calendário oficial [41] antes de fixar a regra.

---

## 9. Lista consolidada de dúvidas (⚠ PARA CONFIRMAR)

Estado após a 2.ª ronda (2026-10-16):

1. ✔ Calendário juliano — posição oficial atual confirmada (calendário oficial + declarações no patriarchia.ru); sem decisão conciliar recente específica — §1.2.
2. ✔ "Regra da Páscoa judaica" — o calendário oficial define a regra sem essa condição; debate canónico sem efeito no cálculo — §2.4.
3. ✔ Domingo dos Padres do VII Concílio: 11–17.10 OS — §3.2.
4. ✔ Sábado de S. Demétrio: sábado 19–25.10 OS — §3.2.
5. ✔ Novos Mártires: regra de 2013 (texto oficial), domingo 22–28.01 OS — §3.2.
6. ✔ Padres dos seis Concílios: domingo mais próximo de 16.07 (13–19.07 OS) — §3.2.
7. ✔ Despedida do Encontro: 03–09.02 OS = 16–22.02 NS; "16–23" da azbyka é gralha — §4.1.
8. ✔ Grandes festas não pertencentes às Doze = 5; 23/25/28/30.06 e 30.08 sem estatuto formal de pré/pós-festa — §4.2.
9. ✔ Festas da Mãe de Deus (Doze) em domingo: combinação com o ofício dominical (capítulos de Marcos) — §5.2.
10. — irrelevante: decisão 8 — classes `ideograph-N` da azbyka — §5.1.
11. ✔ Octoeco na Quaresma: o tom continua a contar-se; dias de semana usam só tríadicos, sedais e exapostilários do tom — §6.1.
12. ✔ (s = +1) Semana a repetir na отступка de setembro = 11.ª (calendário oficial 2026); ⚠ s = +2 sem exemplo oficial — §7.3.
13. ⚠ Comunidades que usam a opção "Jordanville" — não verificado; sem impacto (decisão 2) — §7.3.
14. ⚠ Seleção de Apóstolos no inverno: princípio de Andreev, não texto do Typikon (não verificado na 2.ª ronda) — §7.5.
15. — irrelevante: decisão 8 — licenças/termos de azbyka.ru, holytrinityorthodox.com, pravoslavie.ru e textos de terceiros no Ponomar — §8.

---

## 10. Referências

1. Wikipedia (en), "Date of Easter" — secção *Meeus's Julian algorithm* e desfasamento de 13 dias em 1900–2099. https://en.wikipedia.org/wiki/Date_of_Easter
2. Wikipedia (en), "Conversion between Julian and Gregorian calendars" — tabela de transição 1900/2100. https://en.wikipedia.org/wiki/Conversion_between_Julian_and_Gregorian_calendars
3. Wikipedia (ru), "Пасхалия" — fórmula de Gauss; intervalo 4.04–8.05 NS. https://ru.wikipedia.org/wiki/Пасхалия
4. Прот. Владимир Хулап, "Календарь и пасхалия" (entrevista; Azbuka Very). https://azbyka.ru/kalendar-i-pashaliya
5. Azbuka Very, "Пасхалия" (artigo enciclopédico, incl. citações de Khulap, L. Voronov). https://azbyka.ru/pasxaliya
6. 7-е Апостольское правило, com comentários de Zonaras, Aristeno, Balsamon (Azbuka Very, "Церковное право"). https://azbyka.ru/pravo/7-apostolskoe-pravilo/
7. Заявление Святейшего Патриарха Тихона от 17(30).09.1924 г. во ВЦИК о календарной реформе. https://www.azbyka.ru/otechnik/Tihon_Belavin/zajavlenie-svjatejshego-patriarha-tihona-ot-17-30-09-1924-g-v-tsentralnyj-ispolnitelnyj-komitet-po-voprosam-ob-otnoshenii-pravoslavnoj-russkoj-tserkvi-k-kalendarnoj-reforme-perehodu-na-grigorianskij-novyj-stil/
8. Распоряжение Патриарха Тихона о временном отложении введения нового стиля (8.11.1923). https://www.azbyka.ru/otechnik/Tihon_Belavin/rasporjazhenie-patriarha-tihona-ob-vremennom-otlozhenii-postanovlenija-o-vvedenii-v-tserkovnoe-upotreblenie-novogo-kalendarnogo-stilja/
9. Типикон, гл. 47 "О знамениях Владычних, и Богородичных праздников, и святых" (ed. Издательский Совет РПЦ, 2002). https://www.azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/47
10. Типикон, гл. 48 "Месяцеслов" (incl. Марковы главы). https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48
11. Типикон, гл. 49 "Триодион". https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/49
12. Типикон, гл. 50 "Пентикостарион". https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/50
13. Azbuka Very (Церковный календарь), "Знаки праздников". https://azbyka.ru/days/p-znaki-prazdnikov
14. Azbuka Very, "Таблица дней предпразднств, попразднств и отданий Двунадесятых праздников". https://azbyka.ru/days/p-tablica-dnej-predprazdnstv-poprazdnstv-i-otdanij-dvunadesjatyh-nepodvizhnyh-i-podvizhnyh-gospodskih-prazdnikov
15. Azbuka Very, "Попразднство". https://azbyka.ru/poprazdnstvo
16. Azbuka Very, "Предпразднство". https://azbyka.ru/predprazdnstvo
17. Azbuka Very, "Отдание праздника". https://azbyka.ru/otdanie-prazdnika
18. Azbuka Very, "Отступка и преступка". https://azbyka.ru/otstupka-i-prestupka
19. Андреев А. А. "О порядке чтения Евангелия за Божественной литургией в свете рекомендаций Поместного Собора 1917–1918 гг." // Вестник Екатеринбургской духовной семинарии. 2018. № 4(24). С. 41–129. DOI 10.24411/2224-5391-2018-10403. https://epds.ru/wp-content/uploads/2023/05/42824292018-Andreev.pdf
20. Azbuka Very, "Осмогласие". https://azbyka.ru/osmoglasie
21. Azbuka Very, "Радоница". https://azbyka.ru/radonica
22. Azbuka Very, "Родительские субботы". https://azbyka.ru/roditelskie-subboty
23. Azbuka Very, "Апостольский пост". https://azbyka.ru/apostolskij-post
24. Azbuka Very, calendário 04.02.2024 — Собор новомучеников (decisões de 1992 e 2013). https://azbyka.ru/days/2024-02-04
25. Azbuka Very, calendário 18.10.2026 (Неделя 20-я по Пятидесятнице; leituras e tom). https://azbyka.ru/days/2026-10-18
26. Azbuka Very, calendário diário (páginas 2025-04-20, 2026-04-12, 2027-05-02, 2026-03-01, 2026-06-07 e 2025-09-29 — esta última com a nota "Счет Недель и седмиц остается прежним") e widget JSON. https://azbyka.ru/days/ ; https://azbyka.ru/days/2025-09-29
27. Ponomar Project — repositório (README, LICENSE GPLv3, dados XML, scripts Perl `paschalion.pl`, `kahuna.pl`, `test_lj.pl`). https://github.com/typiconman/ponomar
28. Ponomar — documentação Texinfo (secção *Liturgical ranks*). https://github.com/typiconman/ponomar/blob/master/Ponomar/doc/ponomar.texi
29. Ponomar Project — página inicial. https://www.ponomar.net/
30. orthocal.info — About. https://orthocal.info/about/
31. orthocal.info — API (OpenAPI 3.1) e documentação. https://orthocal.info/api/openapi.json ; https://orthocal.info/api/docs/
32. orthocal-python — repositório (LICENSE MIT). https://github.com/brianglass/orthocal-python
33. Azbuka Very — "Виджет православного календаря на вашем сайте" (API help). https://azbyka.ru/days/api-help
34. Azbuka Very — "Азбука веры на вашем сайте". https://azbyka.ru/azbuka-very-na-vashem-sajte
35. Holy Trinity Russian Orthodox Church (Baltimore) — About Calendar. https://www.holytrinityorthodox.com/htc/orthodox-calendar/about-calendar/
36. Holy Trinity — For Webmasters / Appendix A. https://www.holytrinityorthodox.com/htc/orthodox-calendar/for-webmasters/ ; https://www.holytrinityorthodox.com/htc/orthodox-calendar/for-webmasters/appendix-a/
37. Holy Trinity — Typikon Signs. https://www.holytrinityorthodox.com/htc/ocalendar/TipikonSigns.htm
38. Православие.Ru — Православный церковный календарь. https://days.pravoslavie.ru/
39. Полный православный богословский энциклопедический словарь — "Рождество Иоанна Предтечи" (Azbuka Very). https://www.azbyka.ru/otechnik/Spravochniki/polnyj-pravoslavnyj-bogoslovsko-entsiklopedicheskij-slovar/2529
40. Ponomar — `GospelSelector.java` (opções "LucanJump" e "Jordanville/TheophanyJump") e `DivineLiturgy1.java` (definição de `ndayP`/`ndayF`). https://github.com/typiconman/ponomar/tree/master/Ponomar
41. Издательство Московской Патриархии — «Православный церковный календарь» oficial em linha: «Пояснения к Православному церковному календарю» (http://calendar.rop.ru/?inc=02), «О церковных праздниках… постах в 2026 году» (http://calendar.rop.ru/?inc=2026) e páginas diárias de 2026 (http://calendar.rop.ru/?idd=N, N = dia do ano; consultadas N = 33, 39, 47, 54, 129, 165, 172, 187–194, 207, 255, 271, 278, 303). Consultado em 2026-10-16.
42. «Перечень Соборов святых с указанием дат празднования по старому стилю», Патриарший календарь 2024, pp. 417–418 (Издательство Московской Патриархии). http://calendar.rop.ru/pdf2024/07_ss.pdf
43. «Постановления Освященного Архиерейского Собора Русской Православной Церкви» (2013), п. 30 (Собор новомучеников). Патриархия.ru. https://patriarchia.ru/article/88595
44. Azbuka Very, calendário diário: 2014-11-01, 2019-11-02, 2025-11-01, 2026-11-07 (Димитриевская родительская суббота); 2022-07-31, 2023-07-30, 2024-07-28, 2025-07-27 (отцов шести Вселенских Соборов); 2026-09-28. https://azbyka.ru/days/AAAA-MM-DD
45. Кашкин А. С. «Устав православного богослужения: учебное пособие по Литургике». Саратов: Изд-во Саратовской митрополии, 2010 (Ч. I, гл. 2, §2.1; texto em Azbuka Very). https://azbyka.ru/otechnik/Aleksej_Kashkin/ustav-pravoslavnogo-bogosluzhenija/3_22
46. Патриархия.ru: прот. Николай Балашов (23.12.2005) https://patriarchia.ru/article/55673 ; митр. Иларион (09.09.2011) https://patriarchia.ru/article/51746 ; митр. Ювеналий, «Еще не пришло время обсуждать вопрос о григорианском календаре» (31.12.2017) https://patriarchia.ru/article/98990 ; determinações/decretos dos Concílios dos Bispos 2008 (88781), 2011 (96524), 2016 (97654), 2017 (98916) em https://patriarchia.ru/article/<id>.
47. Патриархия.ru: «В месяцеслов Русской Православной Церкви включены имена двух святых Сербской Православной Церкви» (12.03.2026) https://patriarchia.ru/article/120118 ; «Опубликован актуальный список Собора новомучеников и исповедников Церкви Русской» (02.10.2026, com ficheiro .doc) https://patriarchia.ru/article/123170 ; «Вышел в свет Патриарший календарь на 2027 год» https://patriarchia.ru/article/123332 ; «…Богослужебный месяцеслов на 2027 год» https://patriarchia.ru/article/121906
48. Православная энциклопедия, «Димитриевская родительская суббота». https://www.pravenc.ru/text/172067.html
