# QA de traduções — subfase 2d (acatistos e orações pelos defuntos)

> Decisão 49, frente (3) «traduções». Verificação de 2026-10-17 dos campos `pt`, `ru`, `uk`, `en` de
> `data/oracoes/acatistos-{theotokos,jesus,nicolau}.json` e `data/oracoes/defuntos-{panikhida,litia,canone,circunstancias,pascoa}.json`
> (585 blocos). Referências: decisões 7, 19, 21, 30, 36, 37, 41, 52, 53, 57, 62, 70, 71, 73; `docs/esquema-oracoes.md`;
> glossários doc. 04 §7 e doc. 09 §3; `FONTES-acatistos.md`, `FONTES-defuntos.md`.
> **Os ficheiros de dados não foram editados.** As correções estão em [`fase2d-traducoes-patch.json`](fase2d-traducoes-patch.json):
> **77 entradas** `{ficheiro,id,campo,de,para,motivo}` (51 correções distintas; o resto são o mesmo texto repetido — cânone
> da panikhida = cânone pelo defunto, ícos 1/condácio 1 repetidos no fim dos acatistos, refrão «Bendito és Tu, Senhor» ×6).
> `de` é o valor completo atual do campo; a aplicação sequencial das 77 entradas foi simulada sem erros.

## 1. Método

| Verificação | Como | Resultado |
|---|---|---|
| Blocos reutilizados (início/conclusão, Triságio…Pai nosso, Sl 50, hirmos, «Достойно есть», pomiánnik…) | script: cada bloco com «Texto idêntico a …» comparado com o original em `manha/noite/comunhao_preparacao` (cu, 4 traduções, fonte) | **165/165 idênticos byte a byte**; só difere `quando` em 106 (intencional: regras pascais próprias de cada ofício) |
| Blocos iguais aos do Saltério (2c) | script (cu + 4 traduções) | 7 textos («Со духи праведных» ×4, «Помяни, Господи Боже нашъ», «Глубиною», «Аллилуіа… слава Тебѣ, Боже») idênticos aos de `salterio-09/10/antes`; lidos na mesma |
| Sl 90 (canone-29 = litia-23 = panikhida-20) | junção dos versículos de `salterio-12` | 4 traduções idênticas ao Saltério (sem o sobrescrito) ✔ |
| Leitura lado a lado | eslavo + PT/RU/UK/EN de **todos** os blocos não reutilizados (181 textos distintos, depois de agrupar os repetidos) | ver §2 |
| Refrões | script: fim de cada ícos e condácio, por língua | **idênticos em todas as ocorrências** (13 ícos × 3 acatistos; condácios 1 e 13; «Аллилуіа» nos restantes) ✔ |
| Títulos (condácio/ícos/odes/secções) | script | uniformes; ver decisões D1 e §2.4 |
| Script / acentos | script: latim em RU/UK, cirílico em PT/EN, U+0301 em RU/UK | 1 «í» latino em UK (acj-024); RU sem acentos ✔; cirílico em PT só em rubricas (3 corrigidas) |
| Terminologia | contagens comparadas com os ficheiros existentes | Mãe de Deus (PT) / Theotokos (EN) sem exceção ✔; «Hades» (PT/EN) ✔ salvo acn-046 (D2); Іісус/Іоанн ✔; «Litia»/«Litiya», «Panikhida»/«панахида» ✔ |
| PT AO1990, EN en-GB | grupos consonânticos, -our/-or, -ise/-ize | sem formas pré-AO; en-GB ✔ (1 «baptized» isolado) |
| Marcadores de nome | script: paridade «(и́мя)/(nome)/(имя)/(ім’я)/(name)» por bloco | paridade total ✔; ver D3 |

## 2. Correções (no patch)

### 2.1 Fidelidade / sentido

| Bloco | Campo | Problema |
|---|---|---|
| act-038 | pt, en, uk | «пла́мене страсте́й измѣня́ющая» (genitivo; ἀπαλλάττουσα) = «que **livras** da chama das paixões»; PT/EN/UK diziam «transformas/changest/змінюєш» (sentido trocado). RU já certo. **A nota do bloco defende a leitura antiga: alinhar.** |
| acj-044 | pt | «e connosco elevaste os que clamam» → «e elevaste-nos contigo, a nós que clamamos» (Ef 2,6) |
| acj-022 (= acj-071) | pt | «пречестны́й» = «venerabilíssimo», não «puríssimo» |
| act-054 | uk | «обуя́ша» = «стали безумними», não «знавісніли» (enfurecer-se) |
| acn-036 | pt | «пла́вающихъ лю́тѣ»: «navegavam **cruelmente**» → «em grande perigo» |
| acn-075 | pt | «зловѣ́рія»: «má-fé» (desonestidade) → «falsa crença» |
| acn-022 (= acn-071) | pt, en | «ра́йскаго»: «celeste / heavenly» → «do paraíso / of paradise» |
| acn-068 | uk | «богоприємним» → «богоугодним» (богопрія́тнымъ = agradável a Deus) |
| acj-042 | uk | «Хлѣ́бе Живо́тный» = «Хлібе життя» (Jo 6,35), não «Животворчий» |
| canone-54 (= panikhida-84) | ru | «взе́млющаго» presente: «взявшего» → «берущего» |
| canone-94 (= panikhida-126) | pt, en | «во святы́хъ Твои́хъ дворѣ́хъ» = «nos Teus santos átrios / Thy holy courts» (EN duplicava «holy … Saints») |
| circ-05, -16, -18 | pt, en | títulos: «Ины́я моли́твы» = «Outras orações / Other Prayers» (não «circunstâncias»); -05/-16 sem «Oração/Prayer» |
| circ-17, circ-22 | uk | «Неисповедимы» = «Незбагненні» (não «Невідомі»); «Взыщи́» = «Розшукай» (não «Знайди») |
| panikhida-31 | pt, en | «Тропари́ по непоро́чнахъ» = tropários **depois** dos «Imaculados» (Sl 118); EN «for the Departed» não está no eslavo |

### 2.2 Terminologia (glossário, dec. 71)

- canone-50 (= panikhida-80) UK «в **пекельні** глибини» → «в підземні глибини»; acj-034 PT «poderes **infernais**» → «das profundezas» (преисподняя = morada dos mortos; cf. cp016/cp047).
- pascoa-03 PT «proscomédia» → «proscomídia» (doc. 04 §7.3).
- acj-036 UK «унинням» → «зневірою» (todos os outros blocos UK: «зневіра»).
- canone-02, panikhida-02, circ-11 PT: nome do livro só em cirílico («Псалтирь следованная», «Требникъ…») → «Saltério com Seguimento («Следованная Псалтирь»)» (forma de doc. 04) e «Trebnik, «Ofício do funeral das crianças»».

### 2.3 Coerência com textos existentes

- panikhida-32/34/36/38/40/42 (refrão Sl 118,12): alinhar com o Saltério (`esquema-oracoes`: o Saltério é a referência) — PT «as Tuas justificações», UK «оправдань Твоїх», EN «Thine ordinances» (EN opcional: hoje segue H1906 «statutes»).
- canone-07, litia-07, panikhida-07, pascoa-04 UK: rubrica cita «Ангел вопіяше», mas o bloco UK diz «Ангел взивав» (e as rubricas dos acatistos citam «Ангел взивав»).
- panikhida-02 PT «santos **pais**» e litia-02 EN «holy **Fathers**»: o íncipit citado é «santos Padres» / «holy fathers».
- act-036 PT «que corre **para** Deus» → «segundo Deus» (como acn-036 e a própria nota).
- acj-075 EN «baptized» → «baptised» (forma usada nos outros 9 casos).

### 2.4 Convenção de pronomes, gramática, ortografia

- PT, pronomes da Mãe de Deus/Cristo com maiúscula (convenção dos dados: «confessando-A», «suplica-Lhe», «servi-Lo»): act-022 (= act-071) «clamando-lhe» → «-Lhe»; panikhida-52 (= -76) «por ela» → «por Ela»; act-034 «veem-no» (Cristo) → «veem-n'O».
- acj-024 UK «грíхами»: «í» latino (U+00ED) → «і».
- act-075 RU «возсылали» → «воссылали» (ortografia moderna; cf. noite-045).
- acj-062 RU: «мои … очи … просвети, взывающего» (sem antecedente) → «мне, взывающему, … просвети».
- pascoa-02 RU «умирающие о воскресшем Христе» (eslavismo; em russo atual = «acerca de») → «во Христе воскресшем».
- act-062 UK «життя таємничого веселощів» → «таємничих веселощів»; PT «taça que tiras alegria» → «que hauris a alegria».
- panikhida-29 UK «Неневісная» → «Неневісна»; pascoa-04 PT «esta aplicação aplica» → «a aplicação introduz».

## 3. Verificado sem correção

- **Refrões** idênticos em todas as ocorrências e línguas: «Alegra-Te, Noiva não desposada!» / «Радуйся, Невеста Неневестная!» / «Радуйся, Невісто Неневісна!» / «Rejoice, O Bride unwedded!»; «Jesus, Filho de Deus, tem piedade de mim.» (e equivalentes); «Alegra-te, Nicolau, grande Taumaturgo!» (e equivalentes); «Aleluia/Аллилуия/Алилуя/Alleluia».
- **RU Z1912 (dec. 57)**: os blocos marcados Z1912 (act-020…036, acj-020…032, canone-71/72/90, panikhida-29…52) foram comparados com o eslavo: as adaptações anotadas retiram os acréscimos e paráfrases de Z1912; nenhum acréscimo remanescente.
- **EN H1906**: adaptações ao singular e ao eslavo anotadas; Thee/Thou e maiúsculas divinas corretas; pronomes da Mãe de Deus e de S. Nicolau em minúscula, como em manha-81/83.
- **PT «Tu»** a Deus e à Mãe de Deus (maiúscula) e aos santos (minúscula, «Alegra-te, Nicolau»), como nos dados existentes; «Vós» só no plural (mártires, panikhida-35/37).
- **dec. 73** («людей/вѣрныхъ» em vez de «царей», act-066, acj-022, acn-066) e **dec. 70** («очисти» = «purifica/cleanse», acj-026) traduzidos coerentemente.
- **UK (IOU)**: Іісус, Іоанн, Богородиця, «Томина неділя», «Йосиф» — como nos ficheiros existentes.

## 4. Decisões necessárias

| # | Questão | Recomendação |
|---|---|---|
| D1 | Rótulo PT do ícos: os dados (39 títulos 2d + `comunhao_preparacao`) e os glossários (doc. 04, doc. 09 n.º 71) usam **«Ikos»**; o pedido desta verificação refere «Ícos». | Manter «Ikos» (glossário) ou decidir «Ícos» e mudar os glossários e todos os títulos de uma vez. Não incluído no patch. |
| D2 | acn-046 «въ бе́здну а́дскую сатану́ вверга́яй»: PT «abismo do **inferno**», EN «abyss of **hell**», UK «пекельну» — exceção deliberada à dec. 71 (a nota justifica: castigo de Satanás). | Confirmar a exceção, ou uniformizar («abismo do Hades / abyss of Hades / безодню адову»). |
| D3 | Marcadores de nome: 2d e o Saltério usam «(nome)/(и́мя)»; `manha.json` usa «[nome]/[os seus nomes]», e as cópias de manha-77 em circ-09 e pascoa-09 mantêm «[…]» ao lado de blocos com «(…)». | Escolher uma convenção para toda a app (e corrigir manha ou 2d+Saltério). |
| D4 | RU «Аллилуиа» (defuntos 29 ocorrências, Saltério 180) vs «Аллилуия» (acatistos 36, manha/noite/comunhão 25). | Uniformizar (forma moderna «Аллилуия»). |
| D5 | PT: «panikhida/litia» em minúscula no texto corrido (16) e com maiúscula noutros sítios (7); EN sempre «Panikhida/Litiya». | Fixar regra (ex.: maiúscula quando designa o ofício como título). |
| D6 | EN: relativo «Who» com maiúscula 13× nos acatistos (acj-028, -038, -064, -066, -075; acn-032, -036, -075; act-022/071, -030, -038, -066); minúscula em manha/noite e nos ofícios pelos defuntos. | Uniformizar (minúscula, como manha/noite). |
| D7 | UK «з Хомою» (acj-066) vs «Томина неділя» (rubricas); uso da IOU para o apóstolo («Фома»/«Хома»/«Тома») a confirmar. | Confirmar a forma IOU. |
| D8 | act-038: se se aceitar «livras da chama», a **nota** do bloco (que defende «измѣня́ющая» = «transformas») tem de ser reescrita. | Reescrever a nota com a correção. |

## 5. Fora do âmbito (para a sessão principal)

- Sl 90 (canone-29 = litia-23 = panikhida-20): o eslavo (TR1884) ainda difere do de `salterio-12` em acentos, «тьма/тма», «ты/Ты, Го́споди»; RU (Yungerov) v. 10 diz «к жилищу твоему», o eslavo «тѣ́леси» (PT/UK/EN seguem o eslavo). Já assinalado em FONTES-defuntos.md; a resolver no Saltério.
- As rubricas RU citam íncipits eslavos («Ангел вопияше», «Светися»), embora o bloco RU diga «Ангел возгласил…», «Сияй…»: convenção aceitável, mantida.
