# Acatistos (2d, dec. 66) — fontes e decisões

Ficheiros (grupo `acatistos`, campo `ordem`):

| ordem | ficheiro | conteúdo | blocos |
|---|---|---|---|
| 1 | `acatistos-theotokos.json` | Acatisto à Santíssima Mãe de Deus | 83 |
| 2 | `acatistos-jesus.json` | Acatisto ao Dulcíssimo Senhor Jesus Cristo | 83 |
| 3 | `acatistos-nicolau.json` | Acatisto a S. Nicolau, o Taumaturgo | 83 |

Estrutura igual nos três (ids `act-`, `acj-`, `acn-` + 3 algarismos):
título → rubrica de leitura em privado (doc. 03 §3.2/§5.5) → **início habitual** (cópias byte a byte, cu + 4 traduções + fonte,
de `noite-019` e `manha-05/10/12/13/14/15–20/25/16/28`, com nota «Texto idêntico a …» e os `quando` de `manha.json`) →
condácio 1 … condácio 13 (título + texto de cada condácio e ícos; refrões escritos por extenso, como nas edições PD) →
condácio 13 com `repetir: 3` → rubrica e repetição do ícos 1 e do condácio 1 (texto atual, ver ⚠ resolvido) → oração da edição PD →
**conclusão** (cópias de `manha-81…87` e `oficio-106a`, com as variantes pascais de `manha.json`).
Semana Luminosa: «Молитвами святыхъ отецъ…», rubrica própria e «Христосъ воскресе» ×3 em vez do início; no fim «Ангелъ вопіяше»,
«Свѣтися» e «Христосъ воскресе» ×3 (modelo das Horas Pascais e da dec. 63; ⚠ sem rubrica PD para acatistos).

Gerados por script em `scratchpad/agE2/` (`ms.py`/`stream.py` → `align.py` → `conv.py` → `final_cu.py` → `build.py`, traduções em
`tr_theo.py`, `tr_jesus.py`, `tr_nik.py`). `node tools/gerar-dados.mjs && node tests/oracoes.test.mjs`: OK (1414 blocos).

## Fontes (B2: edição e prova de aprovação)

| chave | edição | uso | aprovação |
|---|---|---|---|
| MS1900 | Молитвословъ, изд. 10-е, Москва, Синодальная типографія, 1900 — archive.org [`molitvoslov00andr`](https://archive.org/details/molitvoslov00andr) | eslavo do acatisto a Jesus (cap. XII, pp. 365–386) e à Mãe de Deus (cap. XIII, pp. 387–409) | Tipografia Sinodal; folha de rosto: «По благословенію Святѣйшаго Правительствующаго Синода» |
| Z1912 | Н. Нахимовъ [Н. Ч. Зайончковскій], Молитвы и пѣснопѣнія православнаго молитвослова…, СПб., Синодальная типографія, 1912 — archive.org [`molitvyipesnopenijapravoslavnogomolitvos65`](https://archive.org/details/molitvyipesnopenijapravoslavnogomolitvos65) | coluna RU onde o OCR é legível: Mãe de Deus pp. 188–199 (K1–I2, K3, K5–I5), Jesus pp. 209–217 (K1–K4 e início de I1–I3; Z1912 não traduz as invocações «Іисусе…»); «гласъ 8» do condácio 1 da Mãe de Deus (p. 188) | Tipografia Sinodal |
| SZ1917 | еп. Никандръ (Феноменовъ), Слово жизни въ богослужебныхъ пѣснопѣніяхъ Православной Церкви… Вып. 2. Акаѳисты на каждый день седмицы, Вятка, Изд. Вятскаго Епархіальнаго Братства Свт. Николая, 1917 — archive.org [`slovozhiznivbogosluzhebnyhpesnopenijahpr78`](https://archive.org/details/slovozhiznivbogosluzhebnyhpesnopenijahpr78) | eslavo do acatisto a S. Nicolau (pp. 89–104; página = folha do PDF − 1) | ⚠ edição **diocesana**, não sinodal (ver dúvidas) |
| AZB | Акафисты, azbyka.ru (texto atual, escrita civil acentuada) | **só** para identificar o texto atual (dec. 62) e como guia de acentuação; não copiado como fonte do todo | — |
| K1817, H1906, Z1912 | (blocos comuns copiados de `manha/noite/comunhao_preparacao`) | início e conclusão | — |

Domínio público: MS1900 e Z1912 (Tip. Sinodal; Zaionchkovsky † 1920); SZ1917 (publicado em 1917, compilador † 1933;
o texto do acatisto é tradicional e anónimo).

**Ponomar (dec. 72):** o clone local `/home/user/typiconman/ponomar` (commit `0af645f`, 17.08.2025) **não tem** estes acatistos
(só o condácio «Взбранной Воеводѣ» em `languages/cu/xml/Services/CommonPrayers/ChampionLeader.xml`). Não usado; os ficheiros
**não** levam licença GPL.

**Inglês de 1919:** *The Akathist Hymn and Little Compline arranged … The Greek text with a rendering in English*, London: Williams &
Norgate, 1919 (tradutor não indicado — obra anónima; domínio público nos EUA (pré-1929) e na UE (anónima, 70 anos após a
publicação)). **Não usado**: traduz o texto **grego** (p. ex. ícos 1 «the Creator becomes a babe» = βρεφουργεῖται, onde o eslavo
diz «покланяемся Творцу»), com saudações noutra ordem nalguns ícos, cobre só a Mãe de Deus e o OCR tem linhas em falta. Coluna EN
própria (Thee/Thou, en-GB; pronomes da Mãe de Deus e do santo em minúscula, como em `manha-81/83`).

## Método do eslavo (decisões 5, 7, 62)

1. **MS1900 (Jesus, Mãe de Deus):** palavras da camada OCR (`djvu.xml`, com coordenadas) alinhadas automaticamente com o texto atual
   (difflib, palavras normalizadas ѣ→е, і→и, sem ъ final): Jesus 1575 palavras, Mãe de Deus 1379. Cada diferença foi classificada
   (ruído de OCR vs. variante real); as suspeitas foram **verificadas nos recortes das imagens** (lista abaixo).
2. **SZ1917 (S. Nicolau):** OCR fraco; as 16 páginas foram **lidas integralmente nas imagens** (pp. 89–104) e conferidas palavra a
   palavra com o texto atual; a ortografia pré-reforma (ѣ, і, ѵ) segue o impresso.
3. Ortografia: ѣ/і/ѵ/ъ do impresso (OCR quando coincide) e do léxico dos ficheiros já revistos (`data/oracoes/*.json`);
   palavras sem atestação resolvidas à mão. **Acentos:** os do texto atual, conferidos por amostragem com os acentos impressos de
   MS1900 (p. ex. «призва́лъ», «сни́де», «возложи́мъ», «рѣку̀», «Госпожѐ», «позна́хомъ»); a oração de MS1900 à Mãe de Deus leva os acentos
   do impresso (completados onde faltam); a de SZ1917 (sem acentos) leva acentos próprios. Monossílabos sem acento (convenção da app).
4. Texto: onde o impresso e o texto atual diferem, segue-se o **texto atual** com nota da leitura antiga em cada bloco (dec. 62).

### Verificado na imagem

- MS1900 (Jesus): K1 «имѣя» (p. 365); I1 «царей укрѣпленіе» (p. 366); K2 «плачущую» (p. 367); I2 «Азъ во Отцѣ»; I3 «не презри и
  мене», «но яко многоцѣнное мѵро»; K5 «запятъ ны»; I5 «Мы же пѣснь»; I6 «напой мя», «даждь ми плачь», «ищущихъ», «отгоняющая»;
  K8 «сего бо ради»; K10 «до смерти»; K11 «исцѣленія»; I11 «потемне́нная», «грѣхами»; I12 «огрѣй мя»; oração «толико», «во вѣки»;
  títulos e «Кондакъ 1, гласъ 8» (p. 365).
- MS1900 (Mãe de Deus): K5 «зари; и яко … держаще ю»; I5 «послужити Ему и возопити»; I6 «пище»; I7 «воспоимъ ю»; K6 «буесло́вяща»;
  K8 «умъ на небеса»; I8 «таинства дверь»; I9 «пребываеши»; I11 «источаеши рѣку̀»; I12 «царей благочестивыхъ»; K13 «Аллилуіа.
  [Трижды]»; oração «Пріими, всеблагомощная…» completa (pp. 407–409); título (p. 387).
- SZ1917 (S. Nicolau): pp. 89–104 integralmente (variantes abaixo).

### Variantes impressas ↔ texto atual (segue-se o atual; nota no bloco)

- **Jesus:** K1 «имѣя»→«имѣяй»; I1 «царей»→«вѣрныхъ укрѣпленіе»; K2 «плачущую»→«плачущу»; I6 «ми плачь»→«мнѣ», «ищущихъ»→«ищущимъ»;
  K11 «исцѣленія»→«исцѣленіе»; I11 «потемне́нная»→«потемне́нныя», «грѣхами»→«грѣхми»; I12 «огрѣй»→«согрѣй»; oração no plural
  («Боже нашъ … славимъ о насъ … раби Твои … вниде … толико») → singular atual («Боже мой … славлю о мнѣ … рабъ Твой … пріиде …
  толикаго»). A legenda «Хождение Иисуса Христа по водам (Мф. 14:22–33)» do texto em linha (K4) não pertence ao acatisto: omitida.
- **Mãe de Deus:** K6 «буесло́вяща»→«буесло́вна»; I8 «дверь»→«двери»; I12 «царей благочестивыхъ»→«людей»; K13 com uma só
  «Аллилуіа» (o texto em linha escreve-a 3×; segue-se o impresso, porque o condácio inteiro se repete 3×).
- **S. Nicolau (SZ1917):** K2 «мѵротворца»→«мѵроточца», «напояеши … вопіющихъ къ Богу»→«напаяеши … вопіющихъ Богу»; I2 «неразумѣнный»→
  «неуразумѣнный», «проповѣдывай»→«проповѣдавый»; K3 «слезу всякую»→«всяку», «богоносе»→«богоносне»; I3 «ангеломъ … человѣкомъ»→
  «Ангеловъ … человѣковъ»; I4 «Слыша»→«Слышаша», «всяка истина»→«всякая»; K6 «единомъ»→«единемъ»; K7 «люди Мѵрейскія пасый, весь міръ …
  исполнилъ еси, и отъ насъ»→«упаслъ еси и весь міръ … исполнилъ еси. И отъ насъ»; I8 «воздвизая»→«подвизая»; I9 «посѣкаяй»→
  «посѣцаяй», «покрове Богомъ данный»→«зданный»; I11 «свѣщу»→«лучу»; I12 «царемъ вѣрнымъ»→«людемъ»; K12 «свѣдующіи»→«свѣдущіи».

## ⚠ Resolvido (doc. 03 §5.5)

«Condácio 13 três vezes, depois ícos 1 e condácio 1»: **as três edições PD consultadas não têm a repetição** — MS1900 p. 385 e
p. 407 («[Трижды]» e logo a oração) e SZ1917 p. 103 («(Трижды)» e logo a oração). É prática das edições atuais (azbyka: «Этот
кондак читается трижды, затем икос 1-й и кондак 1-й»). Pela dec. 62 inclui-se, com rubrica própria e nota.

## ⚠ Dúvidas (para a sessão principal / clero)

1. **S. Nicolau — B2:** SZ1917 é edição diocesana (Vyatka), não sinodal; o volume indica aprovação sinodal para outros acatistos
   (notas «разрѣшенъ Св. Синодомъ»), não para este. Não se encontrou digitalização legível de edição sinodal pré-1917 (archive.org e
   Google Books sem resultado; a RSL tem edições sinodais em tipo eslavo, a conferir: `viewer.rsl.ru`). O texto coincide com o atual
   salvo as variantes acima. → confirmar com uma edição sinodal.
2. **Orações finais:** Mãe de Deus — usa-se a de MS1900 «Пріими, Всеблагомощная…»; o texto em linha dá «Пресвятая Владычице моя
   Богородице» (já em `manha.json`). S. Nicolau — usa-se a de SZ1917 «О, пастырю добрый…» (menciona «Державу Россійскую»); as edições
   atuais trazem «О, всесвятый Николае…» e «О, всеблагій отче Николае…», **não incluídas** por falta de edição PD (não se copiou o
   azbyka). → decidir se se procuram essas orações numa edição PD.
3. **«царей» → «людей/вѣрныхъ»** (Jesus I1, Mãe de Deus I12, S. Nicolau I12): troca típica das edições soviéticas; há edições atuais
   que repõem «царей». Seguiu-se o texto em linha (dec. 62), com nota. → confirmar com o Akafistnik oficial da IOR.
4. Início habitual sem Sl 50 nem Símbolo da Fé (o doc. 03 §3.2 menciona-os para os cânones; para acatistos as edições atuais variam);
   rubrica da Semana Luminosa própria (sem fonte PD).
5. Pormenores de ortografia/acento seguidos do texto atual sem atestação PD: «Вѣті́я» (ícos 9 dos três; os impressos não acentuam
   esta palavra e os dicionários dão «вѣ́тія»), «еди́немъ» (S. Nicolau K6; impresso «единомъ»); grafias com ъ «отъими́», «изъима́ющая»,
   «необъиме́нный» como em MS1900, e «изъима́яй» (S. Nicolau I10; impresso «изимаяй»).
6. RU: Z1912 só em parte (OCR fragmentado e, em Jesus, invocações não traduzidas); resto tradução própria. EN, PT, UK: próprias,
   não revistas (dec. 44).
7. Fora do âmbito, encontrado ao construir o léxico: `comunhao_preparacao.json` bloco `comunhao-kan-177` tem «надѣ́ждою» (deve ser
   «наде́ждою», sem ѣ).
