# 10 — Escritas de leitura do eslavo eclesiástico: civil moderna e «Київський ізвод»

> **Âmbito:** decisões 5 e 29 (eslavo ao lado da tradução), **B3** (camada eslava por defeito em escrita civil com acentos) e **38** (na interface UK, o eslavo em «Київський ізвод») — [decisoes.md](../decisoes.md), [pendentes.md](../pendentes.md). Implementação: `src/engine/eslavo.js` (`civil(cu)`, `izvod(cu)`); testes: `tests/eslavo.test.mjs`.
> Base de conhecimento interna — especificação para quem programa e para quem revê. PT-PT (AO90). Termos nas escritas originais.
> Cada regra remete para `[n]` (lista no fim) e tem um exemplo trabalhado. Regras não confirmadas por fonte, ou só aproximadas pelo código: **⚠**.
> Fontes consultadas a 16.10.2026.

---

## 0. Resumo para quem implementa

1. **Os dados guardam uma só forma** (`cu`, [esquema-oracoes.md](../esquema-oracoes.md)): o texto sinodal em **escrita civil pré-reforma** com acentos U+0301 — com ѣ, і, ѳ, ѵ e ъ final. Exemplo: «О́тче нашъ, И́же еси́ на небесѣ́хъ».
2. **`civil(cu)`** produz a escrita dos molitvoslovs russos «гражданским шрифтом» (azbyka.ru [3]):
   - aplicam-se **só** as trocas de letras da reforma ortográfica de 1918 [6]: ѣ→е, і→и, ѳ→ф, ѵ→и/в, e cai o ъ final;
   - a gramática e a ortografia eslavas ficam intactas: «Безсме́ртный», «Свята́го», «Пречи́стыя»;
   - resultado: «О́тче наш, И́же еси́ на небесе́х».
   - Regras **mecânicas e completas**: não há ⚠ nesta função.
3. **`izvod(cu)`** produz o eslavo «em letras ucranianas segundo a pronúncia ucraniana» (dec. 38) — «О́тче наш, І́же єси́ на небесі́х».
   - As regras vêm de Віра.Укр [1], que segue Г. Куземська (2012) [2], e foram conferidas no texto do Blagovist [4], ligado à IOU.
   - Algumas regras dependem da **morfologia** (caso, classe da palavra). O código resolve-as com contexto local, uma **lista fechada de palavras** e heurísticas; tudo o que não for certo está marcado **⚠** (§3.4, §5).
4. **Ambas:**
   - são puras e O(n): uma passagem, e cada palavra é vista um número constante de vezes; 2 MB em poucos milissegundos (teste);
   - preservam pontuação, espaços e maiúsculas;
   - nunca perdem um acento: o número de U+0301 à saída é igual ao da entrada (teste).
5. **Testes:** 45 casos `civil` e 101 casos `izvod`, sobre linhas reais. Abrangem o Pai-Nosso, o Trisságio, «Царю Небесный», «Богородице Дево», o Credo completo, «Достойно есть», a Oração de Jesus, o Salmo 50, orações da manhã e tropários. Os esperados são copiados de [3], [4] e [1].

---

## 1. Formato de entrada

| Elemento | Na entrada `cu` | Notas |
|---|---|---|
| Letras | Cirílico civil + **ѣ** (U+0463), **і** (U+0456), **ѳ** (U+0473), **ѵ** (U+0475) e maiúsculas | Ortografia sinodal anterior a 1918 |
| ъ | Final de palavra e interior | O ъ interior é separador («объя́тія», «подъе́млю») |
| Acento | U+0301 combinante, a seguir à vogal | Os monossílabos podem não ter acento (como em [3]) |
| Pontuação, maiúsculas | Como na edição-fonte | Nenhuma das funções as altera |

**Robustez (não usada pelos dados atuais):**
- Se aparecerem letras da tipografia eslava, são primeiro reduzidas à letra civil, segundo a tabela de Kravetsky & Pletneva, урок 1 [5]: ѡ ѻ ѽ→о, ѿ→от, ѯ→кс, ѱ→пс, ѧ ꙗ→я, ѕ ꙁ→з, ꙋ ѹ ᲂу Оу→у, є→е, ї→і, ꙑ→ы, ѷ→и.
- Marcas combinantes:
  - grave (U+0300, «варія») e «камора» (U+0311) passam a U+0301;
  - apagam-se o títlo (U+0483), os espíritos (U+0485/0486), o «паерок» (U+033E/A67D) e o duplo grave (U+030F) [7].
- As abreviaturas sob títlo **não** se desdobram (Г҃и → «Ги»): os dados não as usam e o desdobramento exige léxico.

---

## 2. `civil` — escrita civil moderna com acentos (dec. B3)

**Princípio:**
- A escrita civil do eslavo nos livros de oração russos aplica ao texto eslavo **as mudanças de letras da reforma de 1918** [6] e nada mais.
- As formas eslavas mantêm-se, como mostra o texto de [3]:
  - genitivo «-аго» (Свята́го, Единоро́днаго) e «-ыя» (Пречи́стыя);
  - prefixo «без-» antes de surda (Безсме́ртный);
  - «ко», «во»;
  - i grego dos nomes (Иису́с).

| # | Regra | Fonte | Exemplo (entrada → saída) |
|---|---|---|---|
| C1 | ѣ → е | [6]; [5] «Ѣ ѣ – е» | небесѣ́хъ → небесе́х; Вѣ́рую → Ве́рую [3] |
| C2 | і (e ї) → и, sempre (também antes de vogal e com acento) | [6]; [5] «Ї ї – и» | Ца́рствіе → Ца́рствие; Марі́и → Мари́и; міръ → мир [3] |
| C3 | ѳ → ф | [6]; [5] | Ѳео́доръ → Фео́дор; Ма́рѳа → Ма́рфа |
| C4 | ѵ → и; depois de а/е (є) → в | [5] (ѵ́/ѷ – и; ѵ – в em є҆́ѵа, па́ѵелъ, є҆ѵа́ггелїе); a reforma de 1918 não fala da ижица, que caiu de uso [6] | Ѵпоста́сь → Ипоста́сь; мѵ́ро → ми́ро; Е́ѵа → Е́ва |
| C5 | ъ no fim da palavra (ou antes de hífen) cai; o ъ interior separador fica | [6] («исключалась … Ъ на конце слов и частей сложных слов, но сохранялась в качестве разделительного знака») | нашъ → наш; объя́тія → объя́тия |
| C6 | Acentos ficam na mesma vogal; nunca se escreve «ё» | [3] (Твое́, не «Твоё»; «Безсме́ртный») | Твое́ → Твое́ |
| C7 | Maiúsculas como na fonte (Бог, Тя, Твое́…) | [3] | ОТЧЕ НАШЪ → ОТЧЕ НАШ |
| C8 | Nada mais muda: «-аго», «-ыя», «без-», «ко/во», «Иисус», «гг» | [3] | Свята́го, Пречи́стыя, Безсме́ртный, Иису́се [3] |

**Exemplo completo (Credo, art. 1)**, com a saída igual a [3]:
- entrada: «Вѣ́рую во еди́наго Бо́га Отца́, Вседержи́теля, Творца́ не́бу и земли́, ви́димымъ же всѣмъ и неви́димымъ.»
- saída: «Ве́рую во еди́наго Бо́га Отца́, Вседержи́теля, Творца́ не́бу и земли́, ви́димым же всем и неви́димым.»

**Diferenças editoriais entre fontes (não são regras):**
- [3] e o separador civil de [4] escrevem «несотворе́нна» numa palavra; o texto eslavo sinodal separa «не сотворе́нна».
- [3] escreve «благослове́на» (com um н) em «Богородице Дево».
- A função segue sempre a entrada.

---

## 3. `izvod` — «Київський ізвод» (dec. 38)

### 3.1 O que é e de onde vêm as regras

**O termo.** «Київський ізвод» tem dois sentidos [8][1]:
- a **recensão** kievana dos textos (séc. XIV–XVIII);
- em uso recente, a **pronúncia/transliteração ucraniana** do eslavo sinodal.

Os molitvoslovs atuais com este nome usam o segundo sentido [1].

**Fontes das regras e o seu estatuto:**
- **Віра.Укр** [1] — «Правила української транслітерації церковнослов'янських текстів», com regras por letra e justificação.
  - O molitvoslov do site diz-se publicado «з благословення Екзарха Вселенського Патріарха в Україні єпископа Команського Михаїла» (2025). **Não é edição da IOU.**
  - As regras seguem, com diferenças assinaladas, Г. Куземська, «Якою мовою молилася давня Україна: Правила української транслітерації церковнослов'янських текстів» (К., 2012) [2].
  - Dão como coincidentes (no ѣ→і e no «Ісус»), entre outras, estas edições:
    - Православний Молитвослов, Київ, 1968, com a bênção do metropolita Filaret;
    - «Православний молитвослов | Українська вимова», УПЦ, 2024;
    - «Псалтир церковнословʼянською з парастасом | Українська вимова», УПЦ, Київ, 2024.
- **Blagovist** [4] — site ligado à IOU, já citado no doc. 09 §1.2 [22][23]. Tem um separador «Транслітерація (Київський ізвод)».
  - O seu texto das orações da manhã é o de Віра.Укр, com uma única diferença: escreve **«Іісус»** (forma da IOU, dec. 30).
  - É a referência para os esperados dos testes.
- ⚠ As edições da IOU de 2024 citadas em [1] **não foram vistas diretamente**. As regras são as de [1], conferidas no texto de [4].

### 3.2 Regras implementadas

A notação «[1] *secção*» indica a secção de Віра.Укр, por exemplo «Літера и».

| # | Regra | Fonte | Exemplo (entrada → saída) | Código |
|---|---|---|---|---|
| K1 | **ѣ → і**; no início de palavra ou depois de vogal → ї | [1] «Букви ѣ, є, ъ, ь» (вёрую→вірую; эдzть→їдять) | Вѣ́рую → Ві́рую; Тебѣ́ → Тебі́; вѣ́ки вѣко́въ → ві́ки віко́в | mecânico |
| K2 | **е → є** no início da palavra, depois de vogal, de ъ/ь (prefixo) e onde hoje se diz є; nos outros casos е fica | [1] «є, е» а)–в) | еси́ → єси́; Твое́ → Твоє́; Ца́рствіе → Ца́рствіє; подъе́млю → под’є́млю; сте́ля → сте́ля | mecânico; o caso в) («Господнє») não é tratado ⚠ |
| K3 | Exceção a K2: nomes hebraicos/gregos com Е- | [1] «є, е» | Еммануи́лъ → Еммануї́л; Емма́усъ → Емма́ус | lista (Емману-, Еммау-, Еллад-, Елемент-) ⚠ incompleta |
| K4 | **и → і** na conjunção «и» e no início de palavra | [1] «Літера и» а), б) | и → і; И́же → І́же; изба́ви → ізба́ви; и́мя → і́м’я | mecânico |
| K5 | **и → ї** depois de vogal | [1] «Літера и» (твої, моїх, фарисеї) | твои́ → твої́; Марі́и → Марі́ї; грѣ́шніи → грі́шнії | mecânico |
| K6 | **и → і** depois de prefixo terminado em vogal (não ї) | [1] «Літера и» е) | вои́стину → воі́стину; мимои́детъ → мимоі́деть; неизрече́нный → неізрече́нний | lista de prefixos+raiz ⚠ |
| K7 | **при+и → прий**, **наи- → най-**; o acento do и passa à vogal anterior | [1] «Літера и» (пріи1детъ /прийдеть/); texto de [4]/[1]: «при́йдеть» | пріи́детъ → при́йдеть; пріиди́ → прийди́; наипа́че → найпа́че | mecânico |
| K8 | **pronomes** и́хъ, и́мъ, и́хже → ї; mas и́мже, и́миже → і; «ни» negativo (e николи́же, ничто́же, никогда́же, ниже́, уничижи́ти) → ні | [1] «Літера и» б), ж); texto de [1]: «нікогда́же», «унічижи́ть» | и́хъ → ї́х; И́мже → І́мже; ниже́ → ніже́; уничижи́тъ → унічижи́ть | lista |
| K9 | **-и final → -і** em nomes/pronomes onde o ucraniano tem і (gen./dat./loc. sing., plurais; dativos ти/ми; «вси»); **imperativos, infinitivos e 2.ª pess. mantêm и** | [1] «Літера и» в), г*) | на небеси́ и на земли́ → на небесі́ і на землі́; о́чи → о́чі; ти → ті; **mas** оста́ви, очи́сти, суди́ти, отве́рзеши ficam | **lista fechada** de palavras (земли, жизни, очи, небеси, немощи, помощи, заповѣди, души, дни, стези, вещи, двери, благодати, друзи, врази, предтечи, ти, ми, вси; 2.ª verificação, conferidas no texto de [1]: плоти, нощи, полунощи, имени, матери, воли, мори, пѣсни, ложи, сѣти, тли, кости, страсти, безпрестани, готови, воздвижени, достойни, вышнихъ → ви́шніх) ⚠ |
| K10 | Exceção a K9: nomes fem. em -ть depois de 2.ª consoante (милости, чести, благости; любови) mantêm -и | [1] «Літера и» в) Виняток | бла́гости → бла́гости; сме́рти → сме́рти | resulta de K9 (não estão na lista) ⚠ os textos de [1] e [4] não a seguem com constância (contagem 16.10.2026: милості 6 / милости 3, благости 4 / благості 2, смерти 3 / смерті 2, ліности 4 / ліності 2) |
| K11 | **Imperativo plural** acentuado na última sílaba com и → і (-и́те, -и́мся) | [1] «Літера и» д) («поклонімся» se o и é acentuado) | пріиди́те, поклони́мся → прийді́те, поклоні́мся | heurística: só -и́те e -и́мся finais acentuados ⚠ (também apanha o presente «твори́те») |
| K12 | **і → и entre consoantes** | [1] «Літера ї» 1) | міръ → мир; херуві́мъ → херуви́м | mecânico |
| K13 | **і → и depois de пр, вр, хр** antes de vogal | [1] «Літера ї» 2) | пріе́млите → приє́млите; воспріими́ → восприйми́; Гавріи́лъ → Гавриї́л | mecânico |
| K14 | **іа depois de vogal → я**; -іа/-еа finais → -ія/-ея (Марія, Іудея) | [1] «Літера ї» (Ісая, Каяфа, аллилуя); «Літери а, я» | Иса́іа → Іса́я; аллилу́іа → аллилу́я | mecânico; o -а final depois de і/е → я é ⚠ |
| K15 | **христіан- → християн-**, **діакон- → диякон-**, **діавол- → диявол-** (і antes de а iotado) | [1] «Літера ї» 3); texto de [1]: «дия́вольськаго», «дия́волю» | христіа́нскаго → христия́нськаго; діа́волю → дия́волю | lista (exceção «патріарх» respeitada) ⚠ |
| K16 | **Desinências adjetivais** de radical duro/misto: -кій/-гій/-хій/-жій/-шій/-чій/-щій (e -ійся) → -ий; -кія, -жія (Божія), -йшія/-дшія/-вшія → -ия; -жіе → -иє; Бо́жію → Бо́жию; mas -жіей → -ієй | [1] «Літера ї» 6)–8); texto de [1]: «оболки́йся», «Честні́йшия», «преше́дшия», «мно́гий», «мирськи́я», «Бо́жию» | Крѣ́пкій → Крі́пкий; вся́кія → вся́кия; Бо́жій/Бо́жія/Бо́жіе → Бо́жий/Бо́жия/Бо́жиє; Бо́жіей → Бо́жієй; мно́гій → мно́гий | **heurística** ⚠ — §3.4 |
| K17 | **ы → и**; exceções -цы → -ці (nominativo em ц brando), Богородицы, Троицы, души | [1] «Літера ы» | Сы́не → Си́не; живы́мъ → живи́м; отцы́ → отці́; **mas** человѣ́цы → челові́ци | ы→и mecânico; exceções por lista ⚠ |
| K18 | **ъ final cai**; **-цъ → -ць**; nos **verbos de 3.ª pess.** -тъ → -ть (também -дастъ → -дасть: «пода́сть» em [1]) e -тся → -ться (não nos particípios: «прият») | [1] «ъ, ь» а)–в) (кінцеве -ть: Геращенко 1917, Архангельське Євангеліє) | насъ → нас; оте́цъ → оте́ць; бу́детъ → бу́деть; святи́тся → святи́ться; зача́тъ → зача́т | -тся e -цъ mecânicos; -тъ verbal por heurística ⚠ |
| K19 | **ъ interior** depois de prefixo, antes de vogal iotada → apóstrofo; antes de и/consoante cai | [1] «ъ, ь» | подъе́млю → под’є́млю; объя́тія → об’я́тія; подъи́мемъ → поди́мем | mecânico |
| K20 | **ь cai** depois de ж ч ш щ, labiais e р; fica nos outros casos; formas fixas вонми́ → воньми́, е́смь → є́сьм | [1] «ъ, ь» | Це́рковь → Це́рков; Ма́терь → Ма́тер; по́мощь → по́мощ; Госпо́дь → Госпо́дь | mecânico + lista |
| K21 | **а depois de ц → я**; também **у → ю** | [1] «Літери а, я» (Отця, сердця, младенця, конця); у→ю: texto de [1]/[4] (Отцю́, Богоро́дицю, лицю́) | Отца́ → Отця́; конца́ → конця́; Отцу́ → Отцю́; Богоро́дицу → Богоро́дицю | mecânico (ц não inicial, e só na última sílaba: «немерца́ющим» em [1]); у→ю ⚠ não está nas regras escritas; [1] diz que [2] só «допускає» o ц brando |
| K22 | **Apóstrofo** depois de б п в м ф antes de я, ю, no início de palavra, depois de vogal, de р ou de prefixo acabado em consoante (без-, раз-, роз-, из-, воз-, вз-, низ-, чрез-); não depois de consoante da raiz (свят-, освят-); exceções бя́хъ, бя́ху, вя́щшій | [1] «Апостроф» («після префіксів… згідно із сучасним правописом»); texto de [1]: «безм'яте́жен» | и́мя → і́м’я; мя → м’я; па́мять → па́м’ять; Распя́таго → Расп’я́таго; Свята́го → Свята́го | mecânico + exceções (расп’ят- por lista) |
| K23 | **-ск- → -ськ-**, **-цк- → -цьк-**, **-сск- → -ськ-** nos sufixos adjetivais, também -ческ- → -чеськ- | [1] «Прикметникові суфікси -ськ-, -цьк-»; «Літера с»; texto de [1]: «вся́чеських», «вся́чеськая» | Апо́стольскую → Апо́стольськую; мірска́го → мирська́го; ру́сскій → ру́ський; га́лицкая → га́лицькая | heurística: ск depois de ь н м р л й в с д т, a partir da 4.ª letra, antes de vogal ⚠ |
| K24 | **ѵ**: no início → і; depois de а, е → в; noutros casos → и | [1] «Літера v» (іпостась, лавра, Євфрат) | Ѵпоста́сь → Іпоста́сь; Е́ѵа → Є́ва; мѵ́ро → ми́ро | «и» no interior é ⚠ (inferência de C4) |
| K25 | **ѳ → ф** | [5]; uso da IOU (Феодор, doc. 09 §4) | Ѳео́доръ → Фео́дор | mecânico |
| K26 | **Іисусъ → Іісус** (IOU) | [4] «Молитва Іісусова», orações da manhã; dec. 30 | Іису́се → Іісу́се | ⚠ [1] e [2] escrevem «Ісус», e o Credo de [4] também |
| K27 | **Троица → Тройця** | texto de [1]/[4] (Тро́йце, Тройці) | Тро́ице → Тро́йце; Тро́ицы → Тро́йці | lista |
| K28 | **Acentos** como no texto eslavo | [1] «Наголоси» («Наголоси подаємо незмінно») | — | mecânico; se a letra acentuada passa a «й» ou desaparece, o acento vai para a vogal anterior (K7) |
| K29 | **г, щ e as restantes consoantes** escrevem-se como estão: г lê-se [ɦ], щ [ʃtʃ]; ґ não se usa | [1] (nenhuma regra de troca); texto de [4] | Го́споди → Го́споди | mecânico |

**Exemplo trabalhado (Pai-Nosso, frase 2).** Saída idêntica a [4] «Молитва Господня»:
- entrada: «Да святи́тся и́мя Твое́, да пріи́детъ Ца́рствіе Твое́, да бу́детъ во́ля Твоя́, я́ко на небеси́ и на земли́.»
- passos:
  1. святи́тся → святи́ться (K18);
  2. и́мя → і́м’я (K4 + K22);
  3. Твое́ → Твоє́ (K2);
  4. пріи́детъ → при́йдеть (K13 + K7 + K18);
  5. Ца́рствіе → Ца́рствіє (K2);
  6. бу́детъ → бу́деть (K18);
  7. небеси́, земли́ → небесі́, землі́ (K9);
  8. и → і (K4).
- saída: «Да святи́ться і́м’я Твоє́, да при́йдеть Ца́рствіє Твоє́, да бу́деть во́ля Твоя́, я́ко на небесі́ і на землі́.»

**Exemplo trabalhado (Credo, art. 4).** Saída idêntica a [4] e a [1]:
- entrada: «Распя́таго же за ны при Понті́йстѣмъ Пила́тѣ, и страда́вша, и погребе́нна.»
- passos:
  1. Распя́таго → Расп’я́таго (K22);
  2. ны → ни (K17);
  3. і antes de й fica і (K12 só atua entre consoantes);
  4. ѣ → і (K1);
  5. o ъ final cai (K18).
- saída: «Расп’я́таго же за ни при Понті́йстім Пила́ті, і страда́вша, і погребе́нна.»

### 3.3 Apóstrofo, letras e tipografia

- **Apóstrofo:** U+2019 (’), como em [4] («Расп’я́таго», «і́м’я»).
  - [1] usa ora ’ ora '.
  - A norma ucraniana recomenda U+02BC (ʼ) ⚠ — a decidir com a fonte tipográfica (doc. 09 §5.4).
  - Na entrada aceitam-se os três.
- **Letras:**
  - і = U+0456, ї = U+0457, є = U+0454;
  - a coluna izvod deve ter `lang="uk"`, para o «і» ucraniano aparecer com ponto (UTN #41; doc. 09 §5.3) — `src/app.js` já o faz.

### 3.4 Limites conhecidos (onde o código pode divergir de [1]/[4])

1. **-и final (K9):**
   - o ucraniano distingue «землі» (nome) de «оста́ви» (imperativo);
   - sem análise morfológica só se convertem as palavras da lista;
   - qualquer outro nome com -и final fica com и (ex.: «Ма́тери», «ду́ши» só se estiver na lista) ⚠;
   - ao acrescentar orações, rever as palavras novas e alargar `PALAVRAS` em `eslavo.js`.
2. **Desinências adjetivais (K16):**
   - [1] distingue o singular (вся́кия, Бо́жия) do plural (Ієрусали́мськія, Бо́жія повелі́нія);
   - o código não sabe o número gramatical e aplica sempre o singular ⚠;
   - para não estragar nomes:
     - -жія/-жіе só se convertem em Бож-/враж-;
     - -гій só com acento no і (благі́й, mas Се́ргій, Гео́ргій);
     - -кія/-гія/-хія/-щія só sem acento no і (protege Литургі́я, іерархі́я);
     - ш/ч só em -ій.
3. **-тъ verbal (K18):**
   - reconhece-se por -етъ/-итъ/-утъ/-ютъ/-атъ/-ятъ;
   - há uma lista de particípios e nomes (свят, распят, прият, зачат, брат, Пилат, щит…) ⚠;
   - um nome em -атъ/-итъ fora da lista receberia ь.
4. **-ськ- (K23):** «вско́рѣ» e «отскочи» estão protegidos (ск nas três primeiras letras não conta). Um nome com consoante+ск+vogal depois da 4.ª letra seria amolecido ⚠.
5. **Prefixos (K6):** só os pares da lista. «вои́нъ» (raiz) → «воїн» está certo, mas uma palavra prefixada nova (по+и…) sairia com ї ⚠.
6. **Inconsistências das próprias fontes:**
   - [1]/[4] escrevem «ду́ши»/«ду́ші», «Тро́іце»/«Тро́йце», «святи́тся»/«святи́ться» e «ми́лості» contra a sua exceção K10;
   - o código segue a **regra escrita** de [1].
   - O «убої́ться» do código (K18) diverge do exemplo «убоїтся» de [1] «Літера и» — ⚠.

---

## 4. Testes (`tests/eslavo.test.mjs`)

**Casos de texto:**
- **2.ª verificação (fase 2a, dec. 49), 16.10.2026:** as 257 linhas de orações (manhã, noite, refeições, Oração de Jesus, regra de S. Serafim) foram convertidas e alinhadas palavra a palavra com o texto de [1] («Молитви ранішні», «Молитви на сон грядущим»). Fora das variantes de redação do próprio texto eslavo, as divergências do conversor foram corrigidas (K8, K9, K15, K16, K18, K21, K22, K23) e ficaram 17 casos novos nos testes. Divergências que ficam: K10 (fontes inconstantes), K16 no plural («плотськія», «Ієрусалимськія» em [1]; o código dá -ия), «Іісус» (K26), «сп'я́ща» de [1] (sem regra que o justifique), «почию» de [1] (o código dá «почію»).
- O texto «Київський ізвод» da página longa de [4] (`molytvy-ranishni`) segue outra transliteração, mais simples («святится», «приідет», «мя», «ти/ми»), diferente das páginas individuais de [4] e de [1]; não serve de referência.
- **45 casos `civil`:** Pai-Nosso (5), Credo (12), Trisságio, «Слава», «Царю Небесный» (3), «Богородице Дево» (2), «Достойно есть» (2), Oração de Jesus, publicano, «Пресвятая Троице», S. Macário (2), Salmo 50 (3), tropário «Внезапно», mais casos de letras e marcas.
  - Esperados de [3]; «Богородице Дево» e Oração de Jesus de [4] (separador civil).
- **101 casos `izvod`:** as mesmas linhas, mais o Salmo 50, a oração a S. Macário, os tropários do tom 6, «Спаси, Господи», as orações 8 e 10 da manhã, e um caso por regra com os exemplos de [1].
  - Esperados de [4] e [1].
  - Onde a fonte difere só em maiúsculas, vírgulas ou acento de monossílabo, o comentário do caso indica-o.

**Invariantes (sobre 35 linhas):**
- o número de acentos é igual à entrada;
- não ficam ѣ, ѳ, ѵ nem «ё»;
- nenhum acento fica solto;
- pontuação e espaços inalterados;
- `civil` sem ъ final; `izvod` sem ъ nem ы;
- 2 MB processados em tempo linear.

---

## 5. ⚠ Para confirmar

1. Ver as edições da IOU de 2024 («Православний молитвослов | Українська вимова»; Псалтир, Баладек, 2024), para confirmar que seguem [1]:
   - em K9, K16, K18 e K21 (у→ю);
   - na forma do nome **Іісус vs Ісус** (K26).
2. **Apóstrofo** U+2019 vs U+02BC (§3.3).
3. **«Господнє»** (K2 в) e outros є «onde hoje se diz є»: não tratados.
4. Alargar as listas de K3, K6, K9, K15, K17 e K18 à medida que entram orações novas (fase 2a–2d). Cada palavra nova com -и final, -ія/-іе, -атъ/-ятъ/-итъ, «ск» ou «прі/наи» deve ser conferida em [1]/[4].
5. Revisão por falante nativo (dec. 44) das colunas izvod antes de as marcar como revistas.

---

## Referências

1. Віра.Укр — «Православний молитвослов (Київський ізвод)». Regras: «Правила української транслітерації церковнослов'янських текстів»:
   - página-índice: https://xn--80ad6b1e.xn--j1amh/b/molytvoslov-cs-ukr/pravyla-cs-transliteratsiyi (віра.укр);
   - subpáginas:
     - «Букви ѣ, є, ъ, ь» …/bukvy-%D1%A3-ye--
     - «Літери а, я» …/litery-a-ya
     - «Літера ї» …/litery-yi-i
     - «Літера и» …/litera-y
     - «Транслітерація імені Іисусъ» …/pravyla-cs-transliteratsiyi-transliteratsiya-imeni-iysus
     - «Літера ы» …/litera-yy
     - «Літера с» …/litera-s
     - «Прикметникові суфікси -ськ-, -цьк-» …/prykmetnykovi-sufiksy-sk-tsk
     - «Літера v» …/litera-v
     - «Апостроф» …/apostrof
     - «Наголоси» …/pravyla-cs-transliteratsiyi-naholosy
     - «Вступ. Обґрунтування…» …/pravyla-cs-transliteratsiyi-vstup-obgruntuvannya-ukrayinskoyi-vymovy-tserkovnoslovyanskykh-tekstiv
   - texto: «Молитви ранішні» …/molytvy-ranishni;
   - página de rosto: «З благословення Екзарха Вселенського Патріарха в Україні єпископа Команського МИХАЇЛА … Київ 2025».
2. Г. Куземська, *Якою мовою молилася давня Україна: Правила української транслітерації церковнослов'янських текстів*, К., 2012 — citada por [1].
   - Apresentação em parafia.org.ua: https://parafia.org.ua/biblioteka/knygy-broshury/pravyla-ukrajinskoji-transliteratsiji-suchasnoji-tserkovnoslovyanskoji-movy/
   - ⚠ O livro não foi consultado diretamente.
3. Азбука веры — «Молитвы утренние» (escrita civil com acentos). https://azbyka.ru/molitvoslov/molitvy-utrennie.html
4. Благовіст (IOU) — Молитвослов, separadores «Транслітерація» e «Транслітерація (Київський ізвод)»:
   - https://blagovist.info/molytvoslov/otche-nash
   - …/symvol-viry
   - …/tsariu-nebesnyy
   - …/bohorodytse-divo-raduysia
   - …/iisusova-molytva
   - …/molytvy-ranishni
   - = doc. 09 [22][23].
5. А. Г. Кравецкий, А. А. Плетнёва, *Учебное руководство по церковнославянскому языку*, урок 1 (correspondência de letras e sons). https://azbyka.ru/otechnik/Aleksandr-Kraveckij/uchebnoe-rukovodstvo-po-tserkovnoslavjanskomu-jazyku/1
6. «Реформа русской орфографии 1918 года» (Wikipédia russa; decretos de 23.12.1917 e 10.10.1918):
   - ѣ, ѳ, і → е, ф, и;
   - ъ final cai, mantém-se como separador;
   - a ижица não é mencionada e caiu de uso.
   - https://ru.wikipedia.org/wiki/Реформа_русской_орфографии_1918_года
7. Unicode Technical Note #41 — *Church Slavonic Typography in Unicode* (2015). https://www.unicode.org/notes/tn41/tn41-1.pdf (= doc. 09 [130]).
8. Вікіпедія — «Київський ізвод». https://uk.wikipedia.org/wiki/Київський_ізвод
