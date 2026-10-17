# Saltério eslavo — fontes, método e decisões (subfase 2c; dec. 64, 69, 72)

Ficheiros: `data/oracoes/salterio-antes.json` (ordem 0) e `salterio-01.json` … `salterio-20.json` (ordem 1–20). **Não há `salterio-depois.json`**: o P1874 termina a 20.ª catisma com «Коне́цъ и Бо́гу сла́ва» (img. n271) e passa às odes bíblicas (img. n272), sem orações depois de todo o Saltério (as do Saltério atual — «Достойно есть», Triságio, tropários «Помилуй нас», oração «Многомилостиве и Премилостиве» — não constam da fonte PD).

Os versículos levam só o eslavo (`cu`); `pt`, `ru`, `uk`, `en` ficam vazios para a sessão principal juntar as traduções de `data/salterio/_staging` (o teste `tests/oracoes.test.mjs` falha só por isso). Todos os outros blocos estão traduzidos (PT-PT, RU e UK próprias; EN própria — Hapgood 1906 não traz os textos do Saltério; os blocos reaproveitados mantêm as traduções e as fontes de origem).

## 1. Fontes e licenças

| Chave | Fonte | Licença | Uso |
|---|---|---|---|
| PON | Projeto Ponomar, «Елисаветинская Библия», `Ponomar/languages/cu/bible/elis/Psalm.text`; `Ponomar/languages/xml/Services/Kathisma1–20.xml`. https://github.com/typiconman/ponomar , commit `0af645f438856f45c22026912d2e4a9ce495e531` (17.08.2025) | **GNU GPL v3** | Texto-base dos Sl 46–151 (dec. 72), convertido automaticamente; divisão em Glórias (controlo) |
| P1874 | *Псалтирь* [Следованная], Почаевъ: Почаевская Успенская Лавра, 1874 (BSB, Liturg. 1444 m). https://archive.org/details/11187435bsb ; original https://www.digitale-sammlungen.de/en/view/bsb11187435 | Domínio público | Sl 1–45 (transcrição «gold» da 1.ª fase, verificada na digitalização); sobrescritos ausentes da isabelina; orações antes da leitura; «Слава» das 60 estâncias; textos depois de cada catisma |
| CSLE | Bíblia isabelina, módulo SWORD CSlElizabeth (CrossWire), `data/salterio/_fontes/cu-civil-elizabeth.json` | Domínio público | Grelha vinculativa (2529 vv.), conferência palavra a palavra, capitalização |
| T1907, MS1900, Z1912, H1906, … | Ver `fontes` de cada ficheiro | Domínio público | Blocos reaproveitados de `data/oracoes` (Triságio … Pai-Nosso, «Пріиди́те», «Помяни́, Го́споди», tropários dos defuntos, etc.) |
| — | Azbuka Very (azbyka.ru): «Псалтирь по кафизмам…», «О чтении Псалтири по усопшим», «Кафизма» | sem licença aberta | **Só verificação** da prática atual e ajuda à leitura da digitalização; nenhum texto copiado |

Imagens P1874 citadas como «img. nNNN» = folha 0-based do item archive.org (ficheiros `scratchpad/agA/dl/poch/nNNN.jpg`).

## 2. Conversão Ponomar → escrita civil pré-reforma (scratchpad `c2/conv.py`, `c2/align.py`, `c2/psalter.py`)

Regras, por ordem:
1. Remove-se o texto entre `{…}` (variantes marginais da Bíblia isabelina; 54 ocorrências, p. ex. 2,3 «расто́ргнимъ», 118,152 nota «Се́й рѣ́чи…»).
2. NFD; espíritos (҆ ҅), pokrytie (҇), diérese de ї e duplo grave de ѷ eliminados; **grave e kamora (̀ ̑) → agudo U+0301**; breve de й conservada.
3. Letras: ѡ ѻ ꙍ ѽ → о; ꙋ ѹ ᲂу (e «Оу» inicial) → у; ѧ ꙗ → я; є → е; ѕ ꙁ → з; ѯ → кс; ѱ → пс; ꙑ → ы; ї → і; ѷ → ѵ; ѿ → от (isolado «отъ»; antes de е/и/і/я/ю/ѣ «отъ-»: «отъи́де», «отъе́млются»). Mantêm-se ѣ, і, ѳ, ѵ, ъ.
4. Paerok (̾): «ъ» em fim de palavra e antes de я е ю и і ѣ («надъ», «предъ», «изъ», «объя́ша», «подъя́лъ», «предъи́детъ»); omite-se antes de о/у e consoante («изощре́ны», «возупова́ю», «вслѣ́дъ»).
5. **Títulos** (abreviaturas) — expandidas por radical; a regra só se aplica se o sinal de título cair dentro do segmento:

| Abreviatura (sem acento; ⁽ˢ⁾ = letra sobreposta) | Expansão |
|---|---|
| `гд⁽ˢ⁾` | господ |
| `бг` | бог |
| `бж` | бож |
| `бз` | боз |
| `блг⁽ˢ⁾в` | благослов |
| `блг⁽ᵈ⁾ть` | благодать |
| `блг` | благ |
| `блж` | блаж |
| `ст` | свят |
| `сщ` | свящ |
| `сп⁽ˢ⁾н` | спасен |
| `сп⁽ˢ⁾` | спас |
| `спс` | спас |
| `многомл⁽ˢ⁾т` | многомилост |
| `мл⁽ˢ⁾т` | милост |
| `млтв` | молитв |
| `двд` | давид |
| `нб⁽ˢ⁾н` | небесн |
| `нбс` | небес |
| `нбо` | небо |
| `ннѣ` | нынѣ |
| `іил` | израил |
| `іер⁽ˢ⁾лим` | іерусалим |
| `цркв` | церкв |
| `цр⁽ˢ⁾тв` | царств |
| `цр` | цар |
| `прв⁽ᵈ⁾нъ$` | праведенъ |
| `прв⁽ᵈ⁾` | правед |
| `прп⁽ᵈ⁾б` | преподоб |
| `ср⁽ᵈ⁾ц` | сердц |
| `пр⁽ᵒ⁾р` | прор |
| `пр⁽ˢ⁾тол` | престол |
| `пр⁽ˢ⁾н` | присн |
| `прем⁽ᵈ⁾р` | премудр |
| `вл⁽ᵈ⁾ч` | владыч |
| `оцъ$` | отецъ |
| `оц` | отц |
| `м⁽ˢ⁾ч` | мѣсяч |
| `чт⁽ˢ⁾н` | честн |
| `хр⁽ˢ⁾т` | христ |
| `сн` | сын |
| `дх` | дух |
| `аггл` | ангел |
| `глг` | глаг |
| `гл` | глагол |
| `воскр⁽ˢ⁾ні` | воскресені |
| `воскр⁽ˢ⁾н` | воскресн |
| `воскрс` | воскрес |
| `оч⁽ˢ⁾т` | очист |

   O acento visível no Ponomar mantém-se (ex.: «бл҃же́нъ» → «блаже́нъ»); quando o acento cai na parte abreviada, o Ponomar não o mostra e usa-se a tabela: бла́га, бла́ги, бла́го, бла́гости, бла́гость, бла́гостію, благода́ть, Бо́га, Бо́гови, Бо́гомъ, Бо́гу, Бо́же, Бо́жіе, Бо́жіи, Бо́жіихъ, Бо́жій, Бо́жію, Бо́жія, Бо́зѣ, влады́чества, влады́чество, влады́чествуетъ, влады́чествуеши, влады́чествующемъ, влады́чнимъ, возглаго́ла, возглаго́летъ, возглаго́лю, воскре́снетъ, воскресе́нія, воскре́съ, глаго́ла, глаго́лалъ, глаго́лаше, глаго́летъ, глаго́ля, Го́спода, Го́сподеви, Го́сподемъ, Госпо́день, Го́споди, Госпо́дне, Госпо́дни, Госпо́днимъ, Госпо́днихъ, Госпо́дню, Госпо́дня, госпо́дствуй, Го́споду, Госпо́дь, Го́сподѣ, Дави́да, Дави́дова, Дави́дови, Дави́довъ, Дави́довы, Дави́довѣ, Дави́ду, Дави́дъ, доны́нѣ, ны́нѣ, отны́нѣ, Ду́ха, Ду́хомъ, Изра́илева, Изра́илеви, Изра́илево, Изра́илеву, Изра́илевъ, Изра́илевымъ, Изра́илевыхъ, Изра́илевѣ, Изра́или, Изра́иль, Изра́ильтянина, Изра́ильтянину, Изра́илю, Изра́иля, ми́лости, ми́лостивъ, ми́лостивый, ми́лостыни, ми́лостыню, ми́лость, ми́лостію, многоми́лостивъ, многоми́лостивый, моли́тва, небе́снаго, небе́сному, небе́сный, небе́съ, не́бо, новомѣ́сячіи, оте́цъ, очи́сти, очи́ститъ, очи́стиши, пра́веденъ, пра́веднаго, пра́ведника, пра́ведники, пра́веднику, пра́ведникъ, пра́ведницы, пра́ведничу, пра́ведно, пра́ведный, пра́ведными, пра́веднымъ, пра́ведныхъ, пра́ведныя, пра́ведніи, прему́дрости, прему́дростію, преподо́бенъ, преподо́бнаго, преподо́бному, преподо́бный, преподо́бными, преподо́бнымъ, преподо́бныхъ, преподо́бныя, преподо́бніи, престо́ла, престо́лъ, престо́лѣ, при́сно, свя́то, се́рдца, се́рдцемъ, Спа́са, спасе́ніе, спасе́ніемъ, спасе́ніи, спасе́ній, спасе́нія, ца́рство, ца́рствуй, ца́рствіе, ца́рствія, це́рквахъ, це́ркве, це́ркви, Іерусали́ма, Іерусали́ме, Іерусали́мль, Іерусали́мскія, Іерусали́мъ, Іерусали́мѣ, А́нгелъ, А́нгели, А́нгелы, а́нгельскій, А́нгеломъ, А́нгела.
   **Verificação**: todas as palavras com título alinhadas com a CSlElizabeth coincidem com ela (255 formas, 2 190 ocorrências, 0 discordâncias); as não alinhadas são sobrescritos (ausentes da CSlElizabeth) ou gralhas da CSlElizabeth (§4).
6. Ortografia pré-1918: «і» antes de vogal (e «й»), «и» antes de consoante nos empréstimos gregos escritos com ї no eslavo («Хрїсто́съ» → «Христо́съ», «Лїва́нъ», «вїно̀» → «вина́», «Херуві́мы» → «Херуви́мы»), exceto «міръ» (mundo); ѧ depois de ж ш ч щ → «а» («на́ша», «ва́ша», «У́жа», «сла́ждша», «пла́ча»); prefixo «из-» antes de ч/ц («изчезо́ша», «изцѣли́», «изчита́яй»), como a CSlElizabeth e o P1874.
7. Acento: monossílabos sem acento (exceto «дні́й», como na transcrição P1874); polissílabos com exatamente um acento (proclíticos «предо», «подо» sem acento).
8. Pontuação: «;» eslavo → «?»; o resto mantém-se (pontuação da isabelina).
9. Divisão de palavras como a CSlElizabeth e o P1874: «во́ньже» → «въ о́ньже», «во́нь» → «въ онь», «мимои́де(тъ)» → «ми́мо и́де(тъ)».
10. Capitalização: maiúscula de frase segundo a pontuação do Ponomar; maiúsculas de nomes divinos, pronomes referidos a Deus e nomes próprios transferidas da CSlElizabeth (alinhamento palavra a palavra); nos sobrescritos (ausentes da CSlElizabeth) por léxico de nomes próprios e correção manual (Соломо́нъ, Іонада́въ, Іеремі́я, Агге́й, Заха́рія, Авессало́мъ, Голіа́ѳъ, Іезекі́иль).
11. Alinhamento com a grelha: palavra a palavra (difflib) entre o Ponomar convertido e a CSlElizabeth; os cortes de versículo seguem a CSlElizabeth (vinculativa) e só divergem dos do Ponomar nos sobrescritos numerados em dois versículos (Sl 50, 51, 53, 59) e no Sl 92 (Ponomar 5+6 = CSlE 5). O que precede o 1.º versículo da grelha é o sobrescrito não numerado (v = 0).

### 2.1 Concordância com a transcrição «gold» (Sl 1–45, P1874)
9 009 palavras: **99,32 % idênticas** (letra e acento), 99,80 % sem contar maiúsculas, **99,97 %** ignorando acento e ortografia. As diferenças restantes são variantes de edição (isabelina × Saltério litúrgico de 1874), não erros do conversor: maiúsculas de frase/pronomes (43), acentos («изме́тъ/и́зметъ» 36,40; «жива́/жи́ва» 21,27; «Рѣ́чная/Рѣчна́я» 45,5), grafias («тму/тьму» 17,12, 17,29, 34,6 — o P1874 e o Saltério atual têm «тм-») e três leituras («ми́мо идо́хъ/мимоидо́хъ» 36,36; «конце́въ/коне́цъ» 45,10; «Моли́тва Дави́ду» no v. 1 do Sl 16 no Ponomar). **QA 2c** (`docs/qa/fase2c-conteudo.md` §2.1): as outras diferenças gráficas eram **erros de transcrição** e foram corrigidas conforme a digitalização — 9,9 e 32,8 «вселе́ннѣй» (img. n041, n077), 9,29 e 10,4 «призира́етѣ», «испыта́етѣ» (n043, n045), 18,4 «рѣ́чи» (n055), 19,8 «ко́нехъ» (n057), 37,4 «косте́хъ» (n088); 30,11 acento «изчезе́» (Ponomar, Saltério atual); **45,10 «коне́цъ»** (isabelina e Saltério atual; dec. 62, 72; o P1874 «конце́въ» fica em nota); 141,7 «укрѣпи́шася» (gralha do Ponomar); minúscula em «псало́мъ» nos sobrescritos 4,1, 5,1, 8,1, 60,1. Para os Sl 1–45 mantém-se a transcrição P1874 (com as notas de `scratchpad/agA/tr/notes.tsv` aplicadas e em `nota` dos versículos), com três uniformizações: ѵ conservado (16,12 «скѵ́менъ»; 44,9 «Смѵ́рна», confirmado na img. n100; 44,13 «Тѵ́рова»), ѧ depois de chiante → «а» (15,6; 18,11; 34,14; 43,6.19.21) e monossílabo «силъ» sem acento (45,8.12). A 1.ª fase aplicou ainda 110 correções de acento onde o Ponomar e o Saltério atual concordavam contra a leitura inicial (`agA/tr/acc_log.tsv`).

## 3. Conferência CSlElizabeth ↔ texto (todos os versículos)

Comparação palavra a palavra, sem acentos nem diferenças ortográficas (ѣ/е, і/и, ѳ/ф, ѵ, ъ).

**Sl 46–151 (Ponomar convertido)** — 24 diferenças, nenhuma leitura genuína:
- gralhas da CSlElizabeth: «глаголгол» (55,11; 76,9) e «глаголголы» (137,4) → «глаго́лъ», «глаго́лы»; «Воскресени» (81,8; 131,8) → «Воскресни́»; «очестиши» (64,4), «очести» (78,9) → «очи́стиши», «очи́сти»; «оымают» (79,13) → «объима́ютъ»; «утрених» (72,14) → «у́треннихъ»;
- ortografia: «нашя/вашя» da CSlElizabeth (65,12; 78,9; 89,15; 107,14; 121,2; 136,2; 57,3; 113,22; 133,2) e «Ужя» (118,61) → «на́ша», «ва́ша», «У́жа» (regra 6);
- divisão de palavras e prefixo «из-»: resolvidas pelas regras 6 e 9 (antes da regra: 22 casos «изчез-/исчез-», «изцѣл-/исцѣл-», 8 «в оньже/во́ньже», 3 «мимо иде/мимои́де»).

**Sl 1–45 (P1874)** — gralhas da CSlElizabeth corrigidas na 1.ª fase: «Воскресени» (3,8; 7,7; 9,20; 9,33; 16,13; 43,24; 43,27), «Спси» (11,2), «очести» (18,13; 24,11), «преподобн» (17,26); sobrescritos que a CSlElizabeth junta ao v. 1 (10,1; 16,1) separados em v = 0; ortografia (15,6; 18,11; 34,14; 43,6.19.21); uma leitura P1874 contra a isabelina mantida com ⚠ (45,10 «конце́въ»). As decisões de variante da 1.ª fase (6,1; 25,2; 36,31; 39,11; 41,1; 43,1) seguem a isabelina e estão em `nota`.

Nenhuma leitura genuína precisou de recurso a kaz1893.txt/p1904.txt (OCR de má qualidade); as dúvidas foram resolvidas na digitalização P1874.

## 4. Grelha e sobrescritos (dec. 69)

- 2529 versículos numerados (ids `sl-NNN-VV`, 2 algarismos; Sl 118 com 3 a partir do v. 100) + **86 sobrescritos não numerados** (`v = 0`, id `sl-NNN-00`, logo a seguir ao título) + `sl-071-fim`.
- São 86 e não 84: os Sl 10 e 16 têm sobrescrito que a CSlElizabeth inclui no v. 1 (por isso fora de `_staging/sobrescritos.json`); aqui separa-se como no P1874 e no Saltério atual. As traduções dos vv. 10,1 e 16,1 já estão repartidas entre v = 0 e v = 1.
- Sobrescritos não numerados tirados do P1874 por faltarem na Bíblia isabelina: Sl 97 e 98 (img. n187), 100 (n189), 102 (n193), 109 (n214; o P1874 lê «Аллилу́іа, псало́мъ Дави́ду», mas segue-se o Saltério atual e a LXX: **«Псало́мъ Дави́ду.»**, dec. 62, variante em nota), 140 (n256); os do Sl 1, 2, 13, 14, 24, 25, 27, 34, 36 vêm da transcrição P1874. Os restantes seguem a isabelina (Ponomar), como na 1.ª fase (cf. 41,1; 43,1), mesmo onde o P1874 difere (p. ex. Sl 111 P1874 «Аллилуіа, Аггеово и Захаріино»; 151 «внѣ числа́ р҃н ѱалмо́въ … на Голіа́да»). Parênteses do Ponomar nos «Аллилу́іа» (104–150) retirados; vírgula final → ponto.
- `sl-071-fim`: «Оскудѣ́ша пѣ́сни Дави́да, сы́на Іессе́ова.» — P1874 img. n142 (e o Saltério atual), impressa depois do «Сла́ва:» como cabeça do Sl 72; a isabelina (Ponomar 72,0) lê «Оконча́шася…» (gr. ἐξέλιπον) e a CSlElizabeth omite-a. Posição: **depois da 1.ª Glória da catisma 10** (`k10-g1-…`), antes do título do Sl 72, como no P1874 e no Saltério atual.
- `"sobrescrito": true` em todos os v = 0, em `sl-071-fim` e nos versículos numerados que são só sobrescrito (Sl 3, 4, 5, 6, 7, 8, 9, 11, 12, 17, 18, 19, 20, 21, 29, 30, 33, 35, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50 (1–2), 51 (1–2), 52, 53 (1–2), 54, 55, 56, 57, 58, 59 (1–2), 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 74, 75, 76, 79, 80, 82, 83, 84, 86, 87, 88, 89, 91, 101, 107, 141; marcados a partir do Ponomar v. 0 e da marca «S» da transcrição P1874).

### 4.1 Leem-se os sobrescritos?
Na prática russa **não se leem em voz alta** na leitura corrente: os livros litúrgicos que trazem salmos isolados começam no primeiro versículo de texto (Sl 50 do Molitvoslov/Z1912 — `comunhao-kan-085` começa em «Поми́луй мя, Бо́же»; Hexapsalmo e Horas do Horológio sinodal, p. ex. Sl 3 «Го́споди, что ся умно́жиша»); Azbuka Very, «О чтении Псалтири по усопшим», resposta do sacerdote Antóni Lúnin (comentário de 18 de agosto): os primeiros versículos «выделенные красным шрифтом» são «т. н. «надписания» псалмов. Их читать не нужно». O P1874 imprime-os no corpo do salmo (numerados ou como cabeça). ⚠ Não se encontrou norma do Typikon que o regule para a leitura das catismas; a app marca-os (`sobrescrito`) para a interface os distinguir/ocultar.

## 5. As 60 «Glórias» (estâncias)

Fronteiras verificadas uma a uma na digitalização P1874 (o «Сла́ва:» impresso no fim de cada estância) e conferidas com o Ponomar `Kathisma1–20.xml` (que tem dois erros: `Kathisma1.xml` repete o Sl 9 na 3.ª estância e `Kathisma8.xml` dá Sl 51–54 em vez de 61–63 na 3.ª), com Azbuka Very («Кафизма») e com `CATISMAS` do motor.

| Cat. | 1.ª Glória | 2.ª Glória | 3.ª Glória | P1874 (img.) |
|---|---|---|---|---|
| 1 | 1–3 | 4–6 | 7–8 | n034, n037, n039 |
| 2 | 9–10 | 11–13 | 14–16 | n045, n047, n050 |
| 3 | 17 | 18–20 | 21–23 | n055, n058, n063 |
| 4 | 24–26 | 27–29 | 30–31 | n068, n071, n075 |
| 5 | 32–33 | 34–35 | 36 | n080, n084, n087 |
| 6 | 37–39 | 40–42 | 43–45 | n093, n097, n101 |
| 7 | 46–48 | 49–50 | 51–54 | n106, n110, n114 |
| 8 | 55–57 | 58–60 | 61–63 | n119, n123, n126 |
| 9 | 64–66 | 67 | 68–69 | n130, n133, n137 |
| 10 | 70–71 | 72–73 | 74–76 | n142, n146, n150 |
| 11 | 77 | 78–80 | 81–84 | n158, n162, n166 |
| 12 | 85–87 | 88 | 89–90 | n171, n175, n178 |
| 13 | 91–93 | 94–96 | 97–100 | n183, n187, n190 |
| 14 | 101–102 | 103 | 104 | n195, n197, n201 |
| 15 | 105 | 106 | 107–108 | n206, n209, n212 |
| 16 | 109–111 | 112–114 | 115–117 | n216, n219, n222 |
| 17 | 118,1–72 | 118,73–131 | 118,132–176 | n228, n233, n236 |
| 18 | 119–123 | 124–128 | 129–133 | n241, n244, n247 |
| 19 | 134–136 | 137–139 | 140–142 | n252, n256, n259 |
| 20 | 143–144 | 145–147 | 148–150 (+151 depois) | n264, n267, n269 |

Na 20.ª catisma o P1874 (img. n269) imprime depois do Sl 150 «Сла́ва, и ны́нѣ, аллилу́іа» e só depois o Sl 151; segue-se essa ordem (3.ª Glória antes do Sl 151).

**O que se diz em cada Glória** (blocos `kNN-gM-01…05`): «Сла́ва Отцу́… и ны́нѣ… Ами́нь», «Аллилу́іа» ×3 «сла́ва Тебѣ́, Бо́же» (×3), «Го́споди, поми́луй» ×3, «Сла́ва Отцу́… и ны́нѣ…». O P1874 só imprime «Сла́ва:»; a fórmula segue o Ponomar (`GloryToTheFather1` + `AlleluiaGlory`) e a prática russa descrita por Azbuka Very, «Кафизма», que cita M. Skabalanóvitch, *Толковый Типикон* (1910). Nas 3 Glórias de cada catisma.

## 6. Orações antes da leitura e depois de cada catisma

- **Antes** (`salterio-antes`, P1874 img. n029–n030): rubrica «Разу́мно да бу́детъ…»; «Благослове́нъ Богъ нашъ…» (sacerdote) ou «Моли́твами святы́хъ оте́цъ…»; «Сла́ва Тебѣ́, Бо́же нашъ» (não está no P1874; acrescentado como no Saltério atual, dec. 62); «Царю́ Небе́сный» (com as substituições pascais das orações da noite); Triságio … Pai-Nosso (o P1874 abrevia «Трисвято́е. По О́тче нашъ»); tropários tom 6 «Поми́луй насъ, Го́споди…», «Сла́ва: Честно́е проро́ка…», «И ны́нѣ: Мно́гая мно́жества…»; «Го́споди, поми́луй» 40; «И поклони́ся, ели́ко ти мо́щно»; oração à Santíssima Trindade «Всесвята́я Тро́ице…»; «Пріиди́те, поклони́мся» (três); rubrica final «Та́же посто́й ма́ло…».
- **Depois de cada catisma** (`kNN-p-…`): rubrica «По … каѳи́смѣ, Трисвято́е» (K1: «Пресвята́я Тро́ице. О́тче нашъ»); Triságio … Pai-Nosso; tropários (título com o tom), «Сла́ва:», «И ны́нѣ:» (formas abreviadas, como no P1874 e em `noite-033/034`); «Го́споди, поми́луй» 40; «Моли́тва»; oração da catisma. K1–K5 transcritos na 1.ª fase (`agA/end`), K6–K20 nesta (`c2/end`), todos do P1874; Azbuka Very só para ajudar a ler a letra miúda. Tons no P1874: K1 1, K2 2, K3 3, K4 4, K5 5, K6 3, K7 5, K8 5, K9 6, K10 6, K11 7, K12 7, K13 8, K14 8, K15 1, K16 1, K17 2, K18 2, K19 7, K20 8. **K4: tom 7** (Saltério atual, dec. 62); o P1874 imprime «гласъ д҃» (img. n075) — em nota. **QA 2c**: a transcrição continha erros de leitura (K1–K5 e K10), corrigidos conforme a digitalização (p. ex. K1 «Оте́цъ … Испусти́тель … прейти́»; K2 «моли́, Богоро́дице»; K3 theotokion «Влады́чице … заче́нши … обложе́ннаго … Чи́стая … спасти́ вся пою́щыя»; K4 «невѣ́стникъ … уясни́вше свѣщы́ … неуко́рный»; K5 «отча́янный … моли́ся … духово́мъ»; K10 «вверга́ю … каса́яйся … исповѣ́даяй … сляца́емь»); em todos esses pontos o P1874 coincide com o texto atual. As variantes genuínas do P1874 (K6 «не явле́нныхъ»; K10 «боя́ся»; K11 «къ»; K12 «неискуше́нъ»; K13 «имѣ́я», «да́руй … мі́рная»; K14 «въ мѣ́сто», «Бо́же нашъ, спасе́ній»; K15 sem «и», «мнѣ»; K17 «дне́й», «тмы»; K19 «прегрѣши́хъ»; K20 «ви́дѣвъ») e quatro acentos ilegíveis na digitalização seguem o **texto atual (dec. 62)**, com a leitura do P1874 em `nota` (`docs/qa/fase2c-conteudo-patch2.json`). K19 «страстьми́ Твои́ми» é a leitura do P1874 e do texto atual («Свои́ми» é a do cânone de Comunhão).
- Blocos reaproveitados **byte a byte** (cu e as 4 traduções; `nota` «[Texto idêntico a …]»): `manha-16/18/19/28`, `noite-011/019/020/021/023/024/025–032`, `defuntos-panikhida-27/46/49/129–132`. O `quando` dos originais não se copia (exceto onde indicado).

## 7. Modo «pelos defuntos» (dec. 64; `quando: {"so": ["defuntos"]}`)

- Em cada Glória: «Помяни́, Го́споди Бо́же нашъ…» (`defuntos-panikhida-49`), antes do «Сла́ва… и ны́нѣ» final. Fonte: T1907 p. 19 («послѣ каждой «Славы»… обычно произносится»); Azbuka Very, «О чтении Псалтири по усопшим» («На каждой Славе читается молитва «Помяни, Господи Боже наш…»»). ⚠ **A confirmar pelo clero (dec. 44):** nenhuma fonte fixa o ponto exato na fórmula (alternativa corrente: entre «Сла́ва Отцу́…» e «И ны́нѣ…»).
- Prática atual (Azbuka Very, mesmo artigo; dec. 62), ⚠ ausente do P1874 e do T1907: começar com as orações iniciais e o tropário «Глубино́ю му́дрости» (`salterio-antes`, depois do Pai-Nosso; ⚠ **a confirmar pelo clero, dec. 44**: o ponto e se substitui os tropários de tom 6 não estão indicados); cada catisma começa por «Пріиди́те, поклони́мся» (`kNN-02`); termina com os tropários dos defuntos «Со ду́хи пра́ведныхъ…» (substituem os tropários da catisma: estes têm `excepto: ["defuntos"]`) e a oração da catisma; depois de todo o Saltério, o cânone pelo defunto (rubrica `k20-fim-01`; cânone em `defuntos-canone.json`).

## 8. ⚠ Dúvidas

Resolvidas na QA 2c (`docs/qa/fase2c-conteudo.md`): 45,10 → «коне́цъ» (dec. 62, 72); tom da K4 → 7 (dec. 62); Sl 109 v = 0 → «Псало́мъ Дави́ду.» (dec. 62); Sl 151 «150» mantido (é a leitura do Saltério atual; «р҃н» é só a notação numérica); `sl-071-fim` depois da 1.ª Glória da K10; traduções de 10,1 e 16,1 repartidas; sobrescritos dos Sl 46–151 conferidos com o texto atual (só diferem 41,1, 43,1 e 111,0, onde se segue a isabelina por instrução do projeto).

Em aberto:
1. Ponto exato do «Помяни́, Го́споди» na Glória e do «Глубино́ю му́дрости» nas orações iniciais (modo defuntos) — **a confirmar pelo clero (dec. 44)**.
2. Sobrescritos: leitura em voz alta (§4.1) — a confirmar pelo clero.
3. ~~Acento «надежди́» no «Помяни́»~~ — resolvido: «въ наде́жди» em `defuntos-panikhida-49` e nas 60 cópias `kNN-gM-04` (patch de conteúdo da 2d, docs/qa/fase2d-conteudo.md).
