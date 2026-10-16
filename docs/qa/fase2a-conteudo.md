# QA de conteúdo — subfase 2a (orações: manhã, noite, refeições, Oração de Jesus, regra de S. Serafim)

> Decisão 49, frente (2) «conteúdo», e frente (3) na parte de fidelidade de sentido. Verificação de 2026-10-16 sobre `data/oracoes/{manha,noite,refeicoes,jesus,serafim}.json`.
> **Os ficheiros de dados não foram editados** (há revisão de tradução em curso). Todas as correções estão em [`fase2a-conteudo-patch.json`](fase2a-conteudo-patch.json) — 48 entradas `{ficheiro,id,campo,de,para,motivo,fonte}`, geradas a partir dos valores atuais dos ficheiros (o `de` é o texto que estava no ficheiro no momento da verificação; se o revisor alterou entretanto o mesmo campo, a entrada falha de forma segura).

## 0. Fontes consultadas

| Código | Fonte | Como se usou |
|---|---|---|
| **Z1912** | Зайончковскій, *Молитвы и пѣснопѣнія…*, СПб. 1912 (archive.org `molitvyipesnopenijapravoslavnogomolitvos65`; folha = página + 6) | Imagens a 400 ppp das pp. 1–21, 47–48, 60–61, 106–113: eslavo (letras, acentos) e coluna russa |
| **MS1900** | *Молитвословъ*, 10.ª ed., Moscovo 1900 (archive.org `molitvoslov00andr`) | Camada de texto OCR (pp. 3–50, 110–111, 171–178) |
| **K1817** | *Канонникъ*, Moscovo 1817 (viewer.rsl.ru `rsl01015049339`) | Imagens img. 140–231 (orações da noite img. 164–191) |
| **Т1907** | *Православный толковый молитвословъ*, СПб., Изд. Виленскаго Свято-Духовскаго братства, 1907 (archive.org `pravoslavnytolko00russ`) — **fonte PD nova** | Horas Pascais pp. 165–166; Credo p. 57 |
| **H1906** | Hapgood, *Service Book*, 1906 (archive.org `cu31924029363128`; folha = página + 40) | Texto OCR das pp. 13, 15, 17, 60, 100, 107, 153, 157–162, 226–238 |
| **AZ** | Molitvoslov atual da ROC (azbyka.ru: manhã, noite, refeições, regra de S. Serafim, Horas Pascais) | **Só verificação** da redação corrente (dec. 2), nunca como fonte de dados |

Não foi possível obter digitalização PD com as orações 6–8 da manhã nem com a oração de S. Pedro Estudita (K1817 não tem as orações da manhã no intervalo consultado; MS1900, Z1912 e Т1907 não as trazem).

## 1. Resumo

| Verificação | Blocos | Resultado |
|---|---|---|
| Eslavo (`cu`) | 257 blocos (104 manhã, 112 noite, 16 refeições, 7 Jesus, 18 Serafim); comparação automática palavra a palavra com AZ + conferência visual nas imagens PD dos blocos divergentes | **37 correções** (patch) |
| Ordem / estrutura vs doc. 03 §1.2–1.3 | todas as sequências | conforme; 1 problema no motor (§4.1) |
| `quando` / `repetir` | todos | conformes no dado; 1 incoerência motor ↔ rubrica (§4.1) |
| Fidelidade das traduções | todos os blocos `oracao`/`rubrica` lidos nas 4 línguas | **5 correções** (1 UK, 1 PT, 3 EN) + avisos (§5) |
| RU «Z1912» / EN «H1906» | amostra: 14 blocos RU conferidos na imagem; 14 passagens EN no OCR de Hapgood | atribuições corretas |

Erros por tipo (entradas do patch): acentuação 24 · redação eslava divergente (orações sem fonte PD) 3 blocos (manha-44, manha-46, noite-078) · leitura/forma de palavra 8 (Credo ×2, ordem de palavras ×3, «поперу», «цѣломудреннѣ», confissão) · ortografia 4 (single «н» ×3, «отню́дъ») · fonte 6 · tradução 5.

## 2. Eslavo — resultados por grupo

### 2.1 Blocos sem fonte PD sinalizados pelos autores

| Bloco(s) | Resultado |
|---|---|
| Horas Pascais: tropário «Во гробѣ плотски», «Слава: Яко живоносецъ», «И нынѣ: Вышняго освященное» (manha-p08–p10 = noite-008–010) | **Fonte PD encontrada: Т1907 pp. 165–166.** Texto confere, salvo: (a) ordem «и **черто́га вся́каго** ца́рскаго» (Т1907 e AZ) — os dados tinham «вся́каго черто́га»; (b) «благослове́**н**а Ты въ жена́хъ» com um só «н» (Т1907). Ordem dos três tropários (Во гробѣ → Слава: Яко живоносецъ → И нынѣ: Вышняго) confirmada por Т1907, H1906 p. 237 e AZ — **o doc. 03 §1.4 («Слава: Во гробе плотски») está errado**, os dados estão certos. |
| 2.ª estrofe de «Воскресеніе Христово видѣвше» (manha-p05/noite-005) | Está **integralmente** em Z1912 pp. 47–48 («Пріидите, вси вѣрніи… смертію смерть разруши»), conferido na imagem. Sem correção. |
| Orações 6.ª, 7.ª, 8.ª da manhã (manha-44, 46, 48) | Sem PD. Confronto com a redação corrente: a 6.ª tem 5 divergências («и́мже/и́хже», «дарова́вшаго/пода́вшаго», «мы́сленная о́чеса… умы́», «непоколеби́мо/непоколе́блемо», acento «ужа́сная»); **a 7.ª é uma redação reconstruída que não corresponde à sinodal** (≈25 divergências: «Бодри́ти… уны́ніе со́нное», «Плѣне́нна… свободи́», «Жизнода́вца», «чу́дная», «исцѣли́», «Струю́ слезъ пода́ждь», «Моли́твенное служе́ніе», «испра́ви», «воздѣва́ю»…) → substituição integral; a 8.ª tem «безлѣ́ностно тща́тельно» por «безъ лѣ́ности то́щно» e «отню́дь» por «отню́дъ». As traduções mantêm-se (o sentido é o mesmo). |
| Comemorações breves (manha-61, 63, 68) | Formas correntes válidas (há edições ROC com «начальники, наставники, благодѣтели», como nos dados, e outras com «вся ближнія рода моего и други», como em AZ). Sem correção; ⚠ continuam sem PD. |
| Bênção da refeição «Господи Іисусе Христе Боже нашъ, благослови намъ пищу…» (refeicoes-07) | Confere com a redação corrente; só o acento «питіе́». AZ omite «еси́» («я́ко благослове́нъ во вѣ́ки») — variante, não corrigida. ⚠ sem PD. |
| Oração de S. Pedro Estudita (noite-078) | Sem PD (K1817 não a tem). **8 divergências** em relação à redação corrente que a nota diz seguir («еда́» por «неуже́ли», «всѣмъ помышле́ніемъ» por «все́ю мы́слію», «ненави́жу» por «ненави́жду», «отъ скве́рныхъ дѣлъ» por «скверноде́йства», ordem «зла́я моя́ дѣла́», acentos) → corrigido para a redação corrente. |
| Três tropários pascais (Христос воскресе, Ангелъ вопіяше, Свѣтися) | Conferem com Z1912 pp. 106, 112–113. |

### 2.2 Variante do Credo: «и сла́вима» vs «и ссла́вима» (manha-32, serafim-07)

- **Edições PD:** Z1912 p. 61 imprime «спокланѧ́ема и҆ **ссла́вима**» (lido na imagem a 400 ppp — a nota atual do bloco, «Z1912 lê и сла́вима», é um erro de leitura); MS1900 pp. 110–111 «спокланяема и сславима»; Т1907 p. 57 «спокланяема и сславима».
- **Edições correntes da ROC:** «спокланя́ема и ссла́вима» (AZ, manhã e «Символ веры»).
- **Proposta (dec. 2):** «и ссла́вима» — coincide com todas as fontes consultadas (= συνδοξαζόμενον). Patch em manha-32 e serafim-07; a «nota» de ambos deve ser reescrita pelo revisor (campo fora do formato do patch).

### 2.3 Acentos e letras conferidos nas imagens PD (blocos com fonte Z1912/K1817)

A comparação com AZ revelou cerca de 60 diferenças de acento; só se propõe correção quando a imagem PD confirma o acento de AZ (ou o da própria fonte declarada): manha-24, 27 (inclui a gralha «нечаа́ніи»), 30 («вели́цѣй»), 34, 40, 42 (5 acentos), 50, 58 («да́руя»), 66 (inclui «разшири́», «непребори́му»), 71, 72, 74, 76, 78, 79; noite-059, 080 («Блага́го», «обря́щу»), 098. Onde a imagem não era legível (p. ex. «уско́ривъ», «мірскі́я», «пло́тскія», «бо́рющія») manteve-se o dado — ver §6.

Outras correções de leitura: noite-037 «поперу́» (K1817; dados «попру́»); noite-043 «убо́гую ду́шу мою́» (ordem K1817); noite-047 «цѣлому́дреннѣ» (K1817); noite-109 (confissão diária) «ви́нна себе́», «то́чію **Ты**, Го́споди», «преше́дшая», «вку́пѣ», «имѣ́ю» (MS1900 p. 28 — as traduções já seguiam esta leitura); manha-56/serafim-06 «Тобо́ю: благослове́на Ты» (Z1912 p. 9); refeicoes-13 «преизоби́луемъ» (MS1900 p. 33; acento ⚠).

Conferidos e corretos (sem correção): blocos de noite-037 a noite-103 contra K1817 (inclui «Сло́во О́тчее», «сѣ́мя тли во мнѣ», «спасе́нія Твоего́», «отъ нау́ки злы», «уя́звенъ», «содѣ́явъ», «ми́лость Сы́на Твоего́»); помянникъ (manha-66–79) contra Z1912 pp. 9–12, incluindo «окая́ннѣй мое́й души́» e «прости́ ихъ», que divergem de AZ mas são a leitura PD.

## 3. Ordem e estrutura

- **Manhã:** sequência conforme doc. 03 §1.2 (com «Пріидите, поклонимся» antes do Sl 50 e o Símbolo depois dele, como nas edições atuais). Помянникъ completo como alternativa às formas breves: correto.
- **Noite:** conforme doc. 03 §1.3 e K1817 img. 164–191 (Іоанникій → Достойно → Слава, и нынѣ → Г. помилуй ×3 → отпустъ → Damasceno → Просвѣти → Слава: Заступникъ → И нынѣ: Преславную → Крестъ → …).
- **Horas Pascais:** ordem confirmada por H1906 pp. 237–238 e AZ (Молитвами → Христосъ воскресе ×3 → Воскресеніе ×3 → Ипакои → Кондакъ → 3 tropários → Г. п. ×40 → Слава, и нынѣ → Честнѣйшую → Молитвами → Христосъ воскресе ×3 → Слава, и нынѣ → Г. п. ×3).
- **`repetir`:** todos conformes (publicano ×3, Трисвятое ×3, Г. п. ×3/×12/×40, «Подаждь» ×3, tropário pascal ×3, regra de S. Serafim ×3/×1).
- **Refeições:** refeicoes-11 segue MS1900 («…не лиши насъ и Небеснаго Твоего Царствія»); o Molitvoslov atual acrescenta «но яко посредѣ ученикъ Твоихъ пришелъ еси, Спасе, миръ даяй имъ, пріиди къ намъ и спаси насъ». Pela dec. 2 recomenda-se acrescentar — **decisão do utilizador** (não está no patch).

## 4. Regras sazonais (`quando`)

Todos os `quando` dos dados conferem com doc. 03 §1.4 e B1 (Царю Небесный omitido de Páscoa a Pentecostes; «Христосъ воскресе» ×3 e «Ангелъ вопіяше/Свѣтися» só em `pascoa_ascensao`; início em «Святый Боже» em `ascensao_pentecostes`; «Достойно есть» volta na Ascensão, como diz AZ).

### 4.1 Incoerência no motor (não corrigível pelo patch de dados)

`src/engine/oracoes.js` mantém a **noite do Sábado Luminoso (P+6) na Semana Luminosa** (Horas Pascais). Isto contradiz: (a) a rubrica dos próprios dados (manha-p02/noite-002: «до субботы утра включительно»); (b) doc. 03 §1.4, ponto «✔ Confirmado (2.ª ronda)… No sábado à noite usa-se a regra normal com as substituições pascais»; (c) a lógica de B1 (o dia litúrgico começa nas Vésperas: a noite de sábado já é o Domingo de S. Tomé). **Recomendação:** em `periodoOracao`, `noite && d.o === 6` → `pascoa_ascensao`. A alteração é de código (frente 1); fica para quem mantém o motor.

## 5. Fidelidade das traduções

Lidos todos os blocos nas quatro línguas. Qualidade geral boa; correções no patch:

| Bloco | Língua | Erro | Correção |
|---|---|---|---|
| manha-68 | UK | «богоспасенну» = «salva por Deus»; o eslavo é «богохрани́мую» (guardada por Deus) | «Богом бережену» |
| noite-039 | EN | «worshipped King, Holy Jesus Christ» — «Святы́й» qualifica «Царю́» | «worshipped and holy King, Jesus Christ» |
| noite-065 | EN | «calamity» por «напа́сть» (πειρασμός) | «temptation» |
| noite-078 | PT | «não me fira o Senhor!» transforma a pergunta temerosa num desejo | «acaso o Senhor me ferirá?» |
| noite-078 | EN | «lest the Lord strike me!» (idem) | «will the Lord strike me down?» |

Avisos sem patch (decisões de política, já assinaladas pelos autores com ⚠):
- **RU Z1912 (dec. 36) é paráfrase** em vários blocos, com acrescentos: Credo («как свет рождается от света», «одно в жизни крещение», «другой, вечной жизни»), Pai-Nosso («Да прославляется святость имени Твоего», «Хлеб, необходимый для нашего существования»), Sl 50, oração 5.ª, «Честнейшую» («без болезни» por «без истления»). As atribuições a Z1912 estão corretas (conferidas na imagem: manha-12, 20, 22–24, 27, 56, 58, p05, 83, 84; noite-080 corrigido de «Милосердаго» para «Благого», como diz a nota). Se a dec. 36 deve ceder à fidelidade (dec. 49/3) nestes casos é **decisão do utilizador**.
- Incoerência menor: a nota de manha-34 diz que RU «от лукавого» segue o Pai-Nosso, mas o Pai-Nosso RU (Z1912) diz «от зла».
- EN H1906: 14 passagens conferidas (pp. 13, 15, 17, 60, 100, 107, 153, 157–158, 162, 226, 230, 232, 237–238); as adaptações descritas nas notas correspondem ao texto de Hapgood.

## 6. Pendentes

1. **Sem fonte PD** (texto agora alinhado com a redação corrente, só verificação): orações 6–8 da manhã, Pedro Estudita, formas breves pelos vivos/defuntos, petição pela pátria, bênção da refeição. Procurar um Молитвословъ / Псалтирь слѣдованная sinodal 1880–1916 com estas orações (Google Books/HathiTrust/НЭБ não acessíveis nesta sessão).
2. Acentos não confirmáveis na imagem (mantidos): «уско́ривъ» (manha-36), «мірскі́я» (manha-38), «ху́дую» (manha-50), «бо́рющія»/«пло́тскія»/«но́щи»/«пре́йти» (noite-037), «строя́», «сатани́ну», «бѣ́совское» (noite-043), «щедру́ю»/«преизоби́луемъ» das refeições (MS1900 quase sem acentos).
3. Motor: noite do Sábado Luminoso (§4.1).
4. Decisões do utilizador: continuação de «Благодаримъ Тя» (§3); paráfrases RU de Z1912 (§5).
5. Notas a reescrever pelo revisor depois de aplicar o patch: manha-32/serafim-07 (Credo), manha-44/46/48 e noite-078 (redação corrente, ainda sem PD), manha-p08–p10/noite-008–010 (fonte Т1907; acrescentar Т1907 a `fontes`); doc. 03 §1.4 (ordem do «Слава» das Horas Pascais).
