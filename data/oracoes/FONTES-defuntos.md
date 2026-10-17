# Orações pelos defuntos (2d, dec. 67) — fontes e decisões

Ficheiros (grupo `defuntos`, campo `ordem`):

| ordem | ficheiro | conteúdo | blocos |
|---|---|---|---|
| 1 | `defuntos-panikhida.json` | Panikhida na forma para leigos | 144 |
| 2 | `defuntos-litia.json` | Litia para leigos (em casa / no cemitério) | 41 |
| 3 | `defuntos-canone.json` | Cânone por um defunto (ofício «по исходѣ души отъ тѣла») | 115 |
| 4 | `defuntos-circunstancias.json` | Orações por circunstância (secções com título) | 22 |
| 5 | `defuntos-pascoa.json` | Comemoração dos defuntos no Tempo Pascal | 14 |

Gerados por script (`scratchpad/agF2/gen/build.py`, a partir dos blocos preparados em `textos1–5.py`); os blocos já existentes
(início habitual, Triságio…Pai nosso, «Senhor, tem piedade», «Vinde, adoremos», Sl 50, «É verdadeiramente digno» / «O Anjo clamou»,
«Cristo ressuscitou», pomiánnik dos defuntos, hirmos do tom 8) são cópias **byte a byte** (cu + 4 traduções + fonte) dos blocos de
`manha.json` e `comunhao_preparacao.json`, com nota «[Texto idêntico a …]». O Sl 50 é o de `manha-30` tal como está: a mudança da
dec. 70 («purifica»/«cleanse») propaga-se pela sessão principal.

## Fontes

| chave | edição | uso |
|---|---|---|
| MS1900 | Молитвословъ, Москва, Синод. тип., 1900 (archive.org `molitvoslov00andr`) | tropários «О умершихъ» pp. 324–326; «Помяни, Господи Боже нашъ…» pp. 536–537; «Молитвами святыхъ отецъ» p. 461 |
| Z1912 | Зайончковскій, Молитвы и пѣснопѣнія…, СПб., 1912 | eslavo acentuado e coluna RU (adaptada, dec. 57) dos cânticos da panikhida pp. 266–269 |
| T1907 | Православный толковый молитвословъ, Вильна/СПб., 1907 | conferência do eslavo (pp. 19–28: Saltério e cânticos sobre o corpo, para os fiéis) |
| TR1884 | Требникъ, Москва, Синод. тип., 10.º тисненіе, janeiro 1884 (reimpr. fac-similada, SPb. 1995; archive.org `Trebnik_20221222_222250_744815`) | litia à morte de um leigo img. 186–187; Sl 90 img. 188; «Указъ о провожденіи усопшихъ на святую Пасху» img. 258 |
| PS1993 | Псалтирь слѣдованная, ч. 1, Москва, 1993 (archive.org `Psaltirsledovannaja_20221222_222250_744815`) | «Послѣдованіе по исходѣ души отъ тѣла» pp. 216–226: cânone tom 8, tropário «Единъ естествомъ», theotokion «Источникъ живота», «Во блаженномъ успеніи» |
| H1906 | Hapgood, Service Book, 1906 | coluna EN onde cobre (panikhida pp. 437–453, 564–569), adaptada |
| YU1915 / BR1851 | Yungerov / Brenton | Sl 90, colunas RU / EN, copiadas de `data/salterio/_staging/{ru,en}.json` (PT e UK de `pt-b` / `uk-b`), versículos 1–16 |

- **Ponomar (dec. 72)**: procurado no clone local (`/home/user/typiconman/ponomar`): não tem panikhida, litia, Требник nem
  Псалтирь слѣдованная (só vidas de santos mencionam «панихида»). Não usado → nenhum texto GPL nestes ficheiros.
- Só para **verificação** (sem copiar): Azbuka Very (lay panikhida, litia, «по исходѣ души», Радоница, orações por circunstância),
  Е. Фомина 2010, Канонникъ (reed. 1994/2001).
- **TR1884**: o ano foi lido no cólofon (img. 3: «лѣто ҂зтҁв… ҂аѿпд, індікта ві, мѣсяца Іаннуарія»).
- **⚠ PS1993** é uma reedição de 1993 do texto sinodal (tipo eslavo). O texto litúrgico é tradicional, mas falta conferir numa
  digitalização pré-1917 da Псалтирь слѣдованная (não encontrada).

## Verificado na imagem

- PS1993 pp. 216–226 (recortes de página da sessão anterior; nesta sessão revistas as pp. 219, 220 e 222): **corrigido** o
  theotokion da ode 3, «Марі́е, Бо́га» → «Марі́е **Богоро́дице**» (imagem: «мр҃іе бц҃е»; traduções corrigidas); confirmados o
  theotokion da ode 5, o 1.º tropário da ode 6, o theotokion da ode 7 e o íncipit do hirmos 8 («Седмерицею пещь»).
- TR1884 img. 3 (cólofon), img. 186–188 e 258 (sessão anterior); Z1912 p. 269 (hirmos 9; sessão anterior).
- **Cotejo automático** (`agF2/gen/check.py`): cada bloco eslavo, normalizado (sem acentos, ѣ→е, і→и, sem ъ final), comparado com
  os textos modernos acima. Todos coincidem a ≥ 97 %, exceto: variantes conhecidas (o 1.º tropário da ode 1 do PS1993 não tem
  o nome, as edições modernas sim; «полезное… усопшаго» em «Глубиною» = T1907), blocos reutilizados e os dois theotokia conferidos
  na imagem (odes 5 e 7).

## Decisões de estrutura

1. **Forma para leigos**: em lugar de «Благословенъ Богъ нашъ», «Молитвами святыхъ отецъ…»; litanias e orações secretas omitidas;
   «Господи, помилуй» em seu lugar (12 depois do Sl 90, 40 + «Помяни, Господи Боже нашъ…» depois dos tropários «по непорочнахъ»,
   3 depois das odes 3 e 6); despedida «Молитвами святыхъ отецъ…»; «Во блаженномъ успеніи…», «Вѣчная память» ×3. Ordem do
   «Панихида для чтения мирянами» e do «Чин литии, совершаемой мирянином» atuais (só estrutura), **só com textos de fontes PD**
   (dec. 44: ⚠ confirmação pelo clero nas rubricas).
   - O fecho moderno da despedida da panikhida («Живыми и мертвыми обладаяй…») e o fecho «Душа его во благих водворится…» da
     litia não foram incluídos (sem fonte PD); usa-se «Молитвами святыхъ отецъ».
   - O cânone da panikhida é o do PS1993 (o mesmo das edições atuais para leigos). A 17.ª catisma (parastás) é só rubrica,
     remetendo para o Saltério.
2. **Tempo Pascal — estrutura mista**: as mudanças entram **nos próprios ficheiros 1–3** com `quando` («Христосъ воскресе» ×3
   no princípio e no fim e «Ангелъ вопіяше» em lugar de «Достойно есть» em `semana_luminosa` + `pascoa_ascensao`; omissão de
   «Слава Тебѣ, Боже нашъ» e «Царю Небесный» em `ascensao_pentecostes` na litia e no cânone; rubrica da Semana Luminosa: não há
   panikhidas). O ficheiro 5 **não duplica** os ofícios: explica a regra antiga (Указ do TR1884, transcrito), a prática atual
   da IOR (Semana Luminosa, Radonitsa, cemitérios), como a app aplica as mudanças, e dá uma forma breve (tropário pascal +
   pomiánnik dos defuntos de MS1900/Z1912 + «Вѣчная память»). Assim quem abre a panikhida em maio lê já o texto certo, e
   a explicação está num só sítio.
3. **Cânone por vários defuntos**: o PS1993 só dá o singular → **não** se criou `defuntos-canone_muitos`; rubrica com as formas
   do plural. O cânone «за многоумершія» da parastás está em H1906 pp. 442–449, mas falta o eslavo numa digitalização PD.
4. **Circunstâncias**: as orações próprias (filhos pelos pais, pais por um filho, viúva, viúvo, morte súbita, longe da pátria,
   doença prolongada, doença mental) só se encontraram em edições modernas (pesquisas de texto integral no archive.org, grafia
   antiga e moderna: «Ты плачущих утешение», «хранитель сирых», «Молитва вдовца»… → só edições de 2010+). Cada secção tem
   título e rubrica com o íncipit e a indicação das orações PD a usar («Помяни, Господи Боже нашъ…» de MS1900; a dos pais de
   Z1912 p. 12 = `manha-77`); o texto moderno não se copia.
5. **Nota pastoral (doc. 03 §5.7)**: rubrica em todos os ofícios (só batizados ortodoxos são comemorados na igreja; suicidas e
   não batizados só em oração privada, com bênção) e secção própria nas circunstâncias, com a **descrição** do «Чин молитвенного
   утешения сродников живот свой самовольне скончавшего» (Santo Sínodo, 27.07.2011; doc. 03 refs. [34][35]) sem o seu texto, e a
   oração de S. Leão de Optina.
6. Nomes: «(и́мя)» / «(nome)» / «(имя)» / «(ім’я)» / «(name)»; textos no masculino singular como nos livros; rubrica com as
   formas do feminino e do plural.
7. PT «Hades» para «адъ» (dec. 71; corrigidos 2 blocos preparados), EN idem, como nos ficheiros existentes; PT «Litia»
   (glossário doc. 09 n.º 64).

## ⚠ Dúvidas (para a sessão principal / clero)

- Hirmos da ode 8 «Седмерицею пещь…»: o PS1993 só dá o íncipit; texto completo segundo o Octoechos corrente, sem imagem PD.
- Versículos do «Аллилуіа» da panikhida: eslavo segundo o texto corrente (Sl 64,5; 101,13; 24,13), sem imagem PD.
- Oração de S. Leão de Optina: forma corrente; não conferida na edição de 1876 da sua vida (não localizada no archive.org).
- PS1993 (1993) como fonte do cânone, ver acima.
- Número de «Господи, помилуй» e lugar de «Помяни, Господи…» na forma para leigos; prática pascal das panikhidas (dec. 44).
- Sl 90: eslavo do TR1884; alinhar com a catisma 12 quando o Saltério (2c) estiver fechado (as traduções já são as do Saltério).
