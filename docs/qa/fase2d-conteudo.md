# QA de conteúdo — subfase 2d (acatistos e orações pelos defuntos)

> Decisão 49, frente (2) «conteúdo». Verificação de 2026-10-17 sobre `acatistos-theotokos.json`, `acatistos-jesus.json`, `acatistos-nicolau.json` (83 blocos cada) e `defuntos-panikhida.json` (144), `defuntos-litia.json` (41), `defuntos-canone.json` (115), `defuntos-circunstancias.json` (22), `defuntos-pascoa.json` (14), com `FONTES-acatistos.md` e `FONTES-defuntos.md`.
> **Os ficheiros de dados não foram editados.** As correções estão em [`fase2d-conteudo-patch.json`](fase2d-conteudo-patch.json): **144 entradas** `{ficheiro,id,campo,de,para,motivo,fonte}`, geradas a partir dos valores atuais. A aplicação sequencial foi simulada sem erros. 60 entradas tocam `salterio-01…20.json`, porque a oração «Помяни́, Го́споди Бо́же нашъ…» está copiada byte a byte nas «Glórias» do modo «pelos defuntos» (dec. 64) e tem lá os mesmos dois acentos errados.
> O que o patch não pode fazer (inserir blocos, mudar `titulo` do ficheiro) e as escolhas que cabem ao utilizador estão nos §4 e §5.

## 0. Fontes consultadas

| Código | Fonte | Como se usou |
|---|---|---|
| **AZ** | azbyka.ru (só verificação, dec. 2/62): os três acatistos; «Панихида для чтения мирянами»; «Чин литии, совершаемой мирянином»; «Последование по исходе души от тела, читаемое мирянином»; «Радоница»; «Поминовение усопших в пасхальные дни»; orações por circunstância | Comparação automática **palavra a palavra e acento a acento** (normalização ѣ→е, і→и, sem ъ) de todos os blocos eslavos não reutilizados; estrutura dos ofícios. |
| **PS1993** | Псалтирь слѣдованная, 1993 (DjVu `psal1.djvu`) | Pp. 218–225 renderizadas a 150–400 dpi e lidas **palavra a palavra** contra todo o cânone, o tropário «Единъ естествомъ», o theotokion e a oração «Помяни». |
| **Z1912** | Зайончковскій 1912, pp. 266–268 (imagens) | Acentos e leituras de «Глубиною», evlogitária, «Трисіятельное», sedalen. |
| **MS1900** | Молитвословъ 1900 (OCR com coordenadas + imagens) | Alinhamento independente OCR ↔ acatistos (Mãe de Deus, Jesus); imagens das pp. 374, 396, 398, 406; páginas citadas (324–326, 461, 536). |
| **SZ1917** | «Слово жизни», 1917, p. 104 (imagem) | Oração final do acatisto a S. Nicolau. |
| **TR1884** | Требникъ 1884, img. 258 | Transcrição do «Указъ» (defuntos-pascoa-02). |
| Léxico | todo o eslavo já revisto em `data/oracoes` (orações, Saltério 2c) + OCR de MS1900, Z1912, T1907, SZ1917 | Verificação da **ortografia pré-reforma** (ѣ/і/ѵ/ъ) de cada palavra dos 8 ficheiros. |

## 1. Resumo

| Verificação | Resultado |
|---|---|
| Blocos reutilizados (165 com «[Texto idêntico a …]») | **Todos idênticos byte a byte** ao original em `cu`, `pt`, `ru`, `uk`, `en`, `fonte`, `tipo` e `repetir`; só o `quando` difere, de propósito (contexto próprio de cada ofício). Os blocos do cânone em `defuntos-canone` são cópias exatas dos da panikhida. |
| Dec. 70 (Sl 50 «purifica/cleanse») | Aplicada: as cópias do Sl 50 vêm de `manha-30`, que já tem «purifica» / «cleanse». |
| Dec. 71 («Hades») | Aplicada a todos os «адъ/а́да/а́ду/а́дово» (PT e EN «Hades»). Duas exceções deliberadas dos autores pedem decisão (§5.4). |
| Acatistos: eslavo vs texto atual (AZ) | Coincidência total de palavras e acentos, salvo as variantes já anotadas pelos autores. Erros: 6 grafias «Акаѳі́стъ/акаѳі́стѣ» nas rubricas, 1 maiúscula. Uma variante de MS1900 por anotar (act-066). |
| Acatistos: eslavo vs MS1900 | Sem leituras novas, além de act-066. A oração a S. Nicolau confere com SZ1917 p. 104 («великолѣ́пое» é a forma eslava correta, não gralha). |
| Cânone pelo defunto vs PS1993 | **13 erros** em 10 tropários (×2 ficheiros): 4 leituras (**«свѣ́тскими»** em vez de «су́етными», «Спа́съ»/«Спа́се», «прише́дшую»/«преше́дшую», «пра́ведныхъ»/«преподо́бныхъ»), 1 grafia («оше́дшую»), 8 acentos. |
| Panikhida (resto) vs Z1912 / PS1993 | 3 acentos na evlogitária; 2 acentos na oração «Помяни» (também no Saltério); falta «дважды» em «Глубиною». |
| Ortografia pré-reforma | «зми́я» (Sl 90, ×3), «Седа́ленъ» (×3), «Лі́тія» (título). O resto (~2400 palavras com ѣ/і/ѵ) está correto. |
| Estrutura e `quando` | Conforme no essencial. **Falta na panikhida** o «Слава, и нынѣ / Аллилуіа ×3, слава Тебѣ, Боже» depois do Sl 90 (§4.1). Incoerências de `quando` entre acatistos e litia/cânone (§5.2). |
| Nota pastoral e rito de 2011 | Exata (§3). |
| Atribuições de página | Conferidas por amostragem: MS1900 pp. 324–326, 461, 536–537; PS1993 pp. 218–225; Z1912 pp. 266–268; TR1884 img. 258. Corretas. |

**Entradas do patch:** 102 `cu` (60 delas no Saltério), 32 traduções (4 blocos × 4 línguas × 2 ficheiros), 9 `nota`, 1 `repetir`.

## 2. Eslavo — correções (no patch)

### 2.1 Cânone pelo defunto (panikhida-NN = canone-NN; o patch corrige os dois)

| Panikhida / cânone | Dados | Correto | Prova |
|---|---|---|---|
| 83 / 53 | оза́ри … **свѣ́тскими** привержені́и | озари́ … **су́етными** приверже́ніи | PS1993 p. 219, imagem ampliada: «ѡ҆зарѝ … сꙋе́тными привержéнїи» (a ligadura сꙋ foi lida como «свѣ»); AZ «су́етными». **Traduções corrigidas** («apegos vãos», «vain», «суетными», «марнотними»). |
| 88 / 58 | И́мый … Ты бо еси́ всѣхъ **Спа́съ**, поко́й и живо́тъ | Имы́й … всѣхъ, **Спа́се**, поко́й и живо́тъ | PS1993 p. 220: «И҆мы́й», «спⷭ҇е» (vocativo); AZ igual. **Traduções corrigidas** («Tu és, ó Salvador, o repouso e a vida de todos»). |
| 91 / 61 | **оше́дшую** | отше́дшую | PS1993 p. 220 «ѿше́дшꙋю»; AZ. |
| 99 / 69 | **прише́дшую** | преше́дшую | PS1993 p. 221 «прешéдшꙋю»; AZ. Traduções «passou para Ti». |
| 111 / 79 | трі́ехъ | тріе́хъ | PS1993 p. 222; AZ. |
| 118 / 86 | въ мѣ́стѣ **пра́ведныхъ** Твои́хъ | преподо́бныхъ | PS1993 pp. 222–223 «прпⷣбныхъ»; AZ. Traduções «santos / holy ones / преподобных». |
| 120 / 88 | испо́вѣдуемъ | исповѣ́дуемъ | CS «и҆сповѣ́дꙋемъ»; AZ. |
| 124 / 92, 126 / 94 | дворѣ́хъ | дво́рѣхъ | PS1993 pp. 223–224 «двóрѣхъ»; AZ. |
| 128 / 96 | вопло́щеннаго | воплоще́ннаго | PS1993 p. 224 «воплощéннагѡ»; AZ. |

Conferidos e certos: os restantes tropários das odes 1–9, «Ѿверзъ … ѡ҆ ны́нѣ преста́вленномъ», «Марі́е Богоро́дице», «ꙋ҆ме́ршыя» (com ы, como o Saltério), «ѿпꙋ́стивъ», «Богонача́льнымъ», o tropário «Единъ естествомъ» em **tom 5** (AZ diz «глас 6»; segue-se o impresso, nota acrescentada a canone-02) e o theotokion «Источникъ живота».

### 2.2 Resto da panikhida, litia e orações

| Bloco | Dados | Correto | Prova |
|---|---|---|---|
| panikhida-37 | почесте́й … вѣ́нцевъ | по́честей … вѣнце́въ | Z1912 p. 267 (imagem); AZ |
| panikhida-39 | ра́я па́ки | рая́ | Z1912 p. 267 «раѧ̀»; cf. oficio-141 (QA 2b) |
| panikhida-49, -134, canone-111, circunstancias-06, **salterio-01…20 (k\*-g\*-04, 60 cópias)** | надежди́ … испо́вѣда | наде́жди … исповѣ́да | PS1993 p. 225 «надéжди», «и҆сповѣ́да»; AZ |
| panikhida-27 | sem `repetir` | `repetir: 2` | «Глубиною» diz-se duas vezes antes de «Слава, и нынѣ» (AZ «(Дважды)») |
| panikhida-20, litia-23, canone-29 (Sl 90) | смотри́ши, тѣ́леси, **зми́я** | смо́триши, тѣлеси́, змі́я | Saltério 2c (sl-090), referência pela dec. 72 e pela própria pendência de FONTES-defuntos; AZ. «зми́я» viola a regra do і antes de vogal. |
| panikhida-50, -74, litia-29 | Седа́ленъ | Сѣда́ленъ | Z1912 p. 268; `comunhao_preparacao.json` |
| litia-01 (e **`titulo.cu` do ficheiro**, fora do patch) | Лі́тія | Ли́тія | ortografia civil pré-reforma (MS1900 «литургія») |
| circunstancias-22 | Неизслѣди́мы | Неизслѣ́димы | como canone-107 (PS1993 p. 224) e AZ |
| pascoa-02 | кто̀, что̀, вси́ | кто, что, вси | convenção da app: monossílabos sem acento, só U+0301 (são os únicos graves de toda a pasta) |

### 2.3 Acatistos

| Bloco | Dados | Correto | Prova |
|---|---|---|---|
| act/acj/acn-002 | Акаѳі́стъ | Акаѳи́стъ | і só antes de vogal; o título (001) já está certo |
| act/acj/acn-004 | акаѳі́стѣ | акаѳи́стѣ | idem |
| act-046 | сохрани́въ **Ю** | сохрани́въ **ю** | refere-se ao seio, como dizem a nota e as 4 traduções; MS1900 p. 398 minúscula |
| act-066 (nota) | — | variante não anotada: MS1900 p. 406 «освяти́, просла́ви, научи́» (sem «и») | imagem conferida |
| act-066, acj-022, acn-066 (nota) | «⚠ … a confirmar com o Akafistnik» | redação da dec. 73 (troca da época soviética; algumas edições repõem «царей») | decisoes.md n.º 73 |

Conferidos e certos: «Египтѣ» (MS1900 p. 396 imprime «Египтѣ», não «Егѵптѣ» como o Saltério), «плачъ за грѣхи» (MS1900 p. 374), «Пречи́стѣй Ма́тери» (dativo), «великолѣ́пое и́мя» (SZ1917 p. 104; forma eslava, cf. «свя́то и великолѣ́по»), «изъима́ющая», «отъими́», «необъиме́нный», «Вѣті́я» (já anotados pelos autores).

## 3. Nota pastoral e Tempo Pascal

- **Quem se comemora** (panikhida-04, litia-04, canone-05, circunstancias-04): exato — só batizados ortodoxos nas notas e na oração da Igreja; suicidas e não batizados só em oração privada, com a bênção do pai espiritual. Sugestão de redação (sem patch, porque mexe nas 4 línguas): «só os cristãos ortodoxos» em vez de «só os batizados na Igreja Ortodoxa» (quem foi recebido na Ortodoxia por crisma também é comemorado).
- **Rito de 2011** (circunstancias-21): exato — «Чин молитвенного утешения сродников живот свой самовольне скончавшего», aprovado pelo Santo Sínodo em 27.07.2011, celebrado pelo sacerdote para os familiares, não é funeral nem panikhida; o funeral de um suicida só com decisão do bispo (p. ex. doença mental). A oração de S. Leão de Optina confere com a forma corrente.
- **Tempo Pascal** (rubricas -05/-06/-07, pascoa-02…06): exato — sem panikhidas na Semana Luminosa; da Quinta-feira Santa ao Domingo de Tomé sem comemoração pública; Radonitsa na terça-feira da 2.ª semana; cânticos pascais até à despedida da Páscoa, sem rito próprio no Typikon. A transcrição do «Указъ» confere com TR1884 img. 258.
- `quando`: as substituições pascais seguem as convenções de `manha.json` (Христосъ воскресе ×3 em `semana_luminosa`+`pascoa_ascensao`; «Ангелъ вопіяше» em lugar de «Достойно есть»; início em «Святый Боже» em `ascensao_pentecostes`). Nos acatistos, a Semana Luminosa segue o modelo das Horas Pascais (sem Triságio…«Пріидите»), de forma coerente.

## 4. Estrutura — fora do patch (inserções)

1. **Panikhida, depois do Sl 90 (bloco 20):** falta «Сла́ва Отцу́… и ны́нѣ…» + «Аллилу́іа, аллилу́іа, аллилу́іа, сла́ва Тебѣ́, Бо́же» ×3, que o texto atual para leigos tem (AZ) e que a própria litia já tem (`defuntos-litia-24`, copiável). Inserir antes da rubrica 21.
2. **Panikhida, depois da ode 6 (antes do condácio 103):** AZ põe «Слава… и нынѣ» depois do «Господи, помилуй» ×3 (em lugar da exclamação). Opcional; a ode 3 dos dados também o faz só antes do theotokion.
3. **Cânone:** AZ («по исходе души», para leigos) não tem «Пріидите» nem o «Господи помилуй» ×12 depois dos tropários (canone-21, -26/27); os dados seguem PS1993 (litania do sacerdote → ×12). Defensável; fica registado.
4. Litia: falta o fecho «Душа́ его́ во благи́хъ водвори́тся…» (sem fonte PD, como os autores dizem). Panikhida: a 17.ª catisma fica só em rubrica (AZ dá-a por extenso, com refrões); defensável.

## 5. Decisões do utilizador

1. **Oração final do acatisto à Mãe de Deus:** os dados usam a de MS1900 («Пріими́, Всеблагомо́щная…»); o texto atual (AZ) traz «Пресвята́я Влады́чице моя́ Богоро́дице…», que já existe em PD (`manha-52`, copiável byte a byte). A dec. 62 manda seguir o texto atual com nota sobre o antigo.
2. **«Молитвами святыхъ отецъ» de Ascensão a Pentecostes:** nos acatistos omite-se (como `noite-019`: «começa-se no Santo Deus»); na litia e no cânone mantém-se (como substituto da bênção do sacerdote). Escolher uma regra para todos os ofícios leigos. Na mesma linha, `litia-10` e `canone-10` («Слава Тебѣ, Боже нашъ») mostram-se na Semana Luminosa, ao contrário de `manha-10` e dos acatistos; se se quiser coerência, `quando: {"excepto": ["semana_luminosa","ascensao_pentecostes"]}`.
3. **Acatistos na Semana Luminosa:** a rubrica própria (act/acj/acn-004) não tem fonte PD. Há quem diga que, nessa semana, os acatistos se substituem pelo Cânone Pascal; confirmar com o clero.
4. **Dec. 71 e palavras afins:** acn-046 «въ бе́здну а́дскую» → PT «inferno», EN «hell» (os autores defendem: lugar do castigo, original eslavo); acj-034 «преиспо́днихъ потреби́телю» → PT «poderes infernais». Manter, ou «abismo do Hades» / «poderes do abismo».
5. **«тмѣ/тма» no Sl 90** (TR1884) vs «тьмѣ/тьма» (Saltério 2c): alinhar ou não.
6. **S. Nicolau (SZ1917, edição diocesana) e PS1993 (reedição de 1993):** continuam as pendências B2 de FONTES (nada a corrigir no texto).

## 6. Notas para os FONTES (sem patch)

- FONTES-acatistos, «Dúvidas» 3: obsoleta (dec. 73 tomada).
- FONTES-defuntos, última dúvida (Sl 90 a alinhar com a catisma 12): resolvida pelo patch, salvo §5.5.
- FONTES-defuntos, «Verificado na imagem»: o cotejo automático «≥ 97 %» não apanhou os erros do §2.1, porque comparava com textos modernos normalizados sem acentos e tratava como variante «свѣтскими/суетными». Convém referir a nova leitura das pp. 219–224.
