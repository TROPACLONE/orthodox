# Saltério PT-PT — Salmos 1–76 (catismas 1–10): notas de tradução

Ficheiro: `data/salterio/_staging/pt-a.json` (1227 versículos, chaves exatamente as de `grelha.json` para os Sl 1–76, pela mesma ordem). Tradução própria, **não oficial — não revista** (dec. 7, 44).

## 1. Fontes

- **Texto-fonte (dec. 40):** `data/salterio/_fontes/cu-civil-elizabeth.json` (Bíblia isabelina, escrita civil). A grelha é vinculativa: os sobrescritos que a fonte numera como versículos foram traduzidos como versículos (p. ex. Sl 50,1–2; 51,1–2; 53,1–2; 59,1–2); os que a fonte não traz **não** foram acrescentados (ver §4).
- **Controlo grego:** *The Greek Septuagint with Apocrypha*, compilada por L. C. L. Brenton (1851; texto do Códice Vaticano segundo a edição sixtina), **domínio público**, edição digital eBible.org «grcbrent» (USFM, versão de 2026-04-08), descarregada a 2026-10-17 de `https://ebible.org/Scriptures/grcbrent_usfm.zip` (ficha: `https://ebible.org/details.php?id=grcbrent`; licença indicada: «Public Domain»). Não se usou Swete 1909. Atenção: a numeração de Brenton junta muitas vezes o sobrescrito ao v. 1 e desfasa alguns versículos (Sl 12, 24, 39, 54, 55, 70, 71); a comparação foi feita pelo conteúdo, não pelo número.
- **Textos já existentes** em `data/oracoes/*.json`: ver §5.

## 2. Convenções adotadas (para alinhar com os Sl 77–151)

### 2.1 Gerais
- AO 1990, PT-PT («connosco», «facto», «ação», «Batista»…); «Porque…?» interrogativo numa só palavra.
- Segue-se o **sentido, o modo e o tempo do eslavo** (futuro eslavo = futuro PT, mesmo onde a LXX tem optativo; imperativo eslavo = imperativo PT), com a sintaxe eslava até onde o português o permite. Palavras supridas: só quando indispensáveis (p. ex. 62,2 «Te desejou»).
- Versículo que continua a frase do anterior (no eslavo começa por minúscula) começa por minúscula em PT; a pontuação final do versículo anterior adapta-se (vírgula, ponto e vírgula, dois pontos).
- **Διάψαλμα («Diapsalma»): omitido.** O texto isabelino não o tem (a LXX de Brenton tem-no 71 vezes nos Sl 1–76, e 9,17 ᾠδὴ διαψάλματος); segue-se o eslavo.
- Discurso direto introduzido por dois pontos e maiúscula («disse: Não há Deus»), sem aspas.

### 2.2 Nomes divinos e pronomes
- Господь → «o Senhor»; Господи (vocativo) → «Senhor» (sem «ó»); Боже → «ó Deus»; Боже мой → «meu Deus» / «ó meu Deus»; Господи Боже мой → «Senhor meu Deus»; Вышний → «o Altíssimo».
- **Господь сил → «o Senhor das Potestades»**; Боже сил → «Deus das Potestades» (como em `oficio-020`, Sl 23,10). Não se usa «Senhor dos Exércitos» (o glossário do doc. 09 §3 não tem entrada; manteve-se a forma já existente nos dados). Царь сил (67,13, lit.) → «o rei das potestades».
- Христос (maiúscula na fonte: 2,2; 19,7; 27,8) → «Cristo» («o Seu Cristo»); христос (minúscula: 17,51) e помазанный → «ungido».
- Pronomes divinos com maiúscula: Tu, Te, Ti, Teu, Tua, Contigo; Ele, O, Lhe, Seu, Sua, Si, -Se (reflexo: «rir-Se-á», «tornou-Se», «Levante-Se»), -Lo, -No; contrações «n'Ele», «d'Ele», «Àquele». Também quando fala Deus («Eu», «Me», «Meu»: 31,8; 49; 59,9–10; 72,10; 74,3–4) e para o Rei-Messias (2,6–8; Sl 44 «Tu/Teu»). Onde a fonte tem minúscula e o referente é humano ou ambíguo (45,4 «pela sua força»; 54,21 «a sua mão»; 57,8 «o seu arco»; 67,24 «por ele»), mantém-se minúscula.
- «Senhor»/«Deus» como sujeito: não se acrescenta «Ele» onde o eslavo não tem pronome (exceto Той/Он, traduzidos «Ele»).

### 2.3 Sobrescritos (fórmulas fixas)
| Eslavo | LXX | PT |
|---|---|---|
| В конец | Εἰς τὸ τέλος | Para o fim |
| Псалом Давиду | ψαλμὸς τῷ Δαυίδ | salmo de David |
| песнь (Давиду) | ᾠδή | cântico (de David) |
| псалом песни | ψαλμὸς ᾠδῆς | salmo de cântico |
| песнь псалма | ᾠδὴ ψαλμοῦ | cântico de salmo |
| в песнех | ἐν ὕμνοις | em cânticos |
| разума (Давиду) | συνέσεως | de entendimento (de David) |
| в разум | εἰς σύνεσιν | para entendimento |
| в столпописание | εἰς στηλογραφίαν | para inscrição em coluna |
| да не растлиши | μὴ διαφθείρῃς | não destruas |
| о осмем / о осмей | ὑπὲρ τῆς ὀγδόης | sobre a oitava |
| о точилех | ὑπὲρ τῶν ληνῶν | sobre os lagares |
| о тайных (сына) | ὑπὲρ τῶν κρυφίων (τοῦ υἱοῦ) | sobre os segredos (do filho) |
| о изменяемых / о изменитися хотящих / о изменшихся | ὑπὲρ τῶν ἀλλοιωθησομένων | sobre os que serão mudados / os que hão de ser mudados / os que foram mudados |
| отроку Господню Давиду | τῷ παιδί / δούλῳ Κυρίου | do servo do Senhor, David |
| сынов Кореовых / сыном Кореовым / о сынех Кореовых | τοῖς υἱοῖς Κορέ / ὑπὲρ τῶν υἱῶν Κορέ | dos filhos de Coré / aos filhos de Coré / sobre os filhos de Coré |
| Идифуму / о Идифуме | τῷ Ἰδιθούν / ὑπὲρ Ἰδιθούν | a Iditun / sobre Iditun |
| Асафу | τῷ Ἀσάφ | de Asaf |
| в воспоминание | εἰς ἀνάμνησιν | para recordação |
| Молитва Давиду | Προσευχὴ τοῦ Δαυίδ | Oração de David |
| вторыя субботы (47,1) | δευτέρᾳ σαββάτου | do segundo dia da semana |
| изступления (30,1) | ἐκστάσεως | de espanto (= «изступление» em 30,23 e em `oficio-022`, Sl 115) |

Dativo «Давиду», «Асафу» = «de David», «de Asaf» (autoria), salvo quando a construção pede «a» (38,1 «a Iditun»).

### 2.4 Léxico recorrente (eslavo → PT)
- **милость** → misericórdia; **милостыня** → misericórdia (23,5 já existente; 32,5); **щедроты** → compaixões; **ущедрити** → compadecer-se; **щедр** → compassivo; **благость / благостыня** → bondade; **благоволение** → benevolência; **благоволити** → comprazer-se.
- **правда** → justiça; **праведный / праведник** → justo; **правый** → reto; **правость / правота** → retidão; **истина** → verdade; **неправда** → injustiça; **неправедный** → injusto.
- **суд** → juízo; **судьбы** → juízos; **судия** → juiz; **прю** → causa.
- **оправдания** (δικαιώματα) → **justificações** (17,23; 18,9; 49,16; alinhado com `pt-b.json`, que o usa no Sl 118 e seguintes); **заповедь** → mandamento; **закон** → lei; **свидения / свидетельство** → testemunhos / testemunho; **завет** → aliança; **повеление** (πρόσταγμα, só 2,7 e 7,7) → decreto (⚠ `pt-b` usa «preceitos» para «повеления» em 98,7 — alinhar).
- **беззаконие** → iniquidade; **беззаконный / беззаконник** → iníquo; **законопреступный** → transgressor (da lei); **нечестивый** → ímpio; **нечестие** → impiedade; **лукавый / лукавнуяй** → maligno / o que obra (pratica) o mal; **лукавство / злоба** → malícia; **грешник** → pecador; **грехопадение / прегрешение** → falta; **лесть** → dolo; **льстивый** → doloso.
- **уповати (на)** → esperar (em); **упование** → esperança; **надеятися** → confiar; **терпети** (Господа) → aguardar; **терпение** → paciência; **чаяти** → aguardar/esperar.
- **исповедатися** (a Deus) → **dar graças** («Dar-Te-ei graças, Senhor»; «Deem-Te graças os povos»); **исповедание** → ação de graças; excecionalmente 31,5 «исповем … беззаконие» → «confessarei». **хвалити / хвала** → louvar / louvor; **похвалитися** → gloriar-se.
- **пети / пою** (ψάλλω) → cantar; **воспою и пою** → «cantarei e salmodiarei»; **песнь** → cântico; **пение** → canto / hino.
- **радость** → alegria; **веселие** → júbilo; **радование** → regozijo; **возрадоватися / радоватися** → exultar; **возвеселитися** → alegrar-se.
- **постыдитися** → ser envergonhado (envergonhar-se); **посрамитися** → ser confundido; **студ** → vergonha; **срам / срамота** → ignomínia; **поношение** → opróbrio.
- **гнев** → ira; **ярость** → furor.
- **скорбь** → aflição; **печаль** → tristeza; **нужда** → angústia; **озлобление** → opressão; **стужающии ми** → os que me afligem; **оскорбляющии** → os que me oprimem.
- **заступник** → protetor; **заступление** → proteção; **защититель** → defensor; **помощник / помощь** → auxílio; **прибежище** → refúgio; **утверждение** → firmeza; **держава** → fortaleza; **крепость** → força; **сила** → poder (de Deus), força (humana), exércitos («в силах наших»); **покровитель** → abrigo (70,6); **кров** → abrigo («sob o abrigo das Tuas asas»).
- **избавити** → livrar (48,8 «redimir», no contexto do resgate); **Избавитель** → Libertador; **изяти** → arrancar; **спас / Спаситель** → Salvador.
- **селение** → morada; **жилище** → habitação; **храм** → templo; **святило** → santuário; **во святем (Своем)** → no (Seu) santuário; **двор** → átrio; **церковь** → **igreja** (minúscula, também em sentido negativo: 25,5 «a igreja dos que praticam o mal»); **сонм** → assembleia.
- **языцы** → nações; **людие** → povos / povo; **люди Твоя** → o Teu povo; **нищий** → pobre; **убогий** → necessitado; **кроткий** → manso; **смиренный** → humilde / humilhado; **смирение** → humilhação; **преподобный** → santo (como em `oficio-022`); **святый** → santo.
- **ад** → Hades; **ров** → cova; **яма** → fossa; **сеть** → laço; **рог** → **chifre** (sentido próprio e figurado: 17,3 «o chifre da minha salvação», 74,5–11; evita-se «corno», malsoante em PT-PT, e a paráfrase «força»); **избости роги** → escornar (43,6).
- **оружие** → arma (ὅπλον) ou espada (ῥομφαία), segundo o contexto; **мечь** → espada; **брань** → batalha / guerra; **жезл** → vara (cetro em 44,7); **десница** → destra; **мышца** → braço.
- **утроба / утробы** → entranhas (ventre em 43,26, γαστήρ); **чрево** → ventre; **лице** (de Deus) → face (rosto em 50,11, texto existente); **от лица** → diante de / da face de.
- **живот** → vida; **душа** → alma; **семя** → descendência; **достояние** → herança; **одержание** → possessão.
- **молитвы (εὐχαί) воздам** → «cumprirei os meus votos» (como `oficio-022`); **молитва** → oração; **моление** → súplica; **молитвенницы** → suplicantes.
- **призвати** → invocar; **воззвати** → clamar; **услыши** → escuta; **слыши** → ouve; **внуши** → dá ouvidos; **вонми** → atende; **в помощь мою вонми** → «atende em meu auxílio».
- **во век** → para sempre; **в век века** → pelos séculos dos séculos; **во веки** → pelos séculos; **в век и в век века** → para sempre e pelos séculos dos séculos; **до конца / в конец** → até ao fim; **в род и род** → de geração em geração; **буди, буди** → «Assim seja, assim seja».
- **поклонитися** → prostrar-se (65,4 «adorar»); **благословен** → bendito; **блажен** → bem-aventurado; **лютый** → cruel / funesto («день лют» → «dia funesto»).

### 2.5 Nomes próprios (dec. 19)
David, Absalão, Cusi, Jemini, Saul, Abimelec, Doeg (o idumeu), zifeus, Natã, Betsabé, Urias, Coré, Asaf, Iditun, Maelet, Salomão; Sião, Jerusalém, Israel, Jacob, Judá, Judeia, Efraim, Manassés, Benjamim, Zabulão, Neftali, Galaad, Siquém, Moab, Idumeia, Edom, Joab, Mesopotâmia da Síria, Síria de Sobal, vale das Salinas, Gat, Társis, Arábia, Sabá, Etiópia / etíopes, Egito, Líbano, Hermon, Jordão, Monte Pequeno, Basã, Selmon, Sinai, Cades, Etam, Tiro, Moisés, Aarão, José, Abraão, Jeremias, Ezequiel; Querubins, Anjo(s) (maiúscula como na fonte).

## 3. Divergências eslavo ↔ LXX (Brenton) e opção tomada
Regra: segue-se sempre o eslavo. Diferenças menores de artigo, conjunção ou ordem não se registam.

- 4,1: eslavo «в песнех, Псалом» ↔ LXX ἐν ψαλμοῖς ᾠδή; segue-se o eslavo («em cânticos, salmo»).
- 5,1: o eslavo não tem «В конец» (LXX Εἰς τὸ τέλος); não se acrescenta.
- 5,4: eslavo «услыши» (imperativo) e «узриши мя» (ver-me-ás) ↔ LXX εἰσακούσῃ (futuro), ἐπόψομαι (vigiarei); segue-se o eslavo.
- 5,6: o eslavo não tem Κύριε.
- 7,7: eslavo «враг Твоих» ↔ LXX τῶν ἐχθρῶν μου; segue-se o eslavo («dos Teus inimigos»).
- 7,10: eslavo acrescenta «праведно» («com justiça»).
- 7,11: eslavo «Помощь моя от Бога» ↔ LXX Δικαία ἡ βοήθειά μου; segue-se o eslavo (sem «justo»).
- 9,15: eslavo «возрадуемся» (1.ª pl.) ↔ LXX ἀγαλλιάσομαι (1.ª sg.); «exultaremos».
- 9,17: LXX acrescenta ᾠδὴ διαψάλματος; omitido como no eslavo.
- 9,33: eslavo «Боже мой», «убогих Твоих до конца» ↔ LXX ὁ Θεός, τῶν πενήτων; segue-se o eslavo.
- 9,35: eslavo «сиру Ты буди помощник» (imperativo) ↔ LXX ἦσθα; «sê Tu o auxílio».
- 9,37: eslavo «Господь царь» (nome) ↔ LXX βασιλεύσει; «O Senhor é Rei».
- 9,38: eslavo «услышал еси» (2.ª p.) ↔ LXX εἰσήκουσε Κύριος (3.ª p.); segue-se o eslavo.
- 9,39: eslavo «Суди» (imperativo) ↔ LXX κρῖναι (infinitivo); «Julga».
- 11,3: eslavo acrescenta «злая» («coisas más»).
- 12,3: eslavo «день и нощь» ↔ LXX ἡμέρας; «dia e noite».
- 13,3: a LXX (Vaticano/Brenton) intercala Rm 3,13–18 («τάφος ἀνεῳγμένος…»); o eslavo não o tem; omitido.
- 13,5: eslavo «Господь» ↔ LXX ὁ Θεός; 13,6 eslavo «Господь же» ↔ ὅτι Κύριος.
- 15,11: eslavo «красота» (formosura) ↔ LXX τερπνότητες (delícias); «a formosura».
- 16,3: eslavo repete «искусил» ↔ LXX ἐπύρωσας (provaste com fogo); «provaste-me».
- 16,8: eslavo acrescenta «Господи».
- 16,13–14: «от малых от земли» («dos poucos da terra») ↔ LXX Brenton ἀπολύων ἀπὸ γῆς; «насытишася сынов» (filhos, υἱῶν) ↔ Brenton ὑείων (carne de porco); segue-se o eslavo.
- 17,30: eslavo «от искушения» (da tentação) ↔ LXX ἀπὸ πειρατηρίου (do bando armado); segue-se o eslavo.
- 17,44: eslavo «Избавиши» (futuro) ↔ LXX ῥῦσαι (imperativo); segue-se o eslavo.
- 17,47: eslavo «благословен Бог» ↔ LXX ὁ Θεός μου.
- 17,51: eslavo «спасения царева» ↔ LXX τοῦ βασιλέως αὐτοῦ; «do rei».
- 19,2–6: o eslavo tem futuros («Услышит», «защитит», «Послет», «Помянет», «Даст», «исполнит») onde a LXX tem optativos; segue-se o eslavo (futuro), salvo «тучно буди» (imperativo). 19,2 «печали» (tristeza) ↔ θλίψεως. 19,5–6 o eslavo acrescenta «Господь»/«Господа».
- 19,8: eslavo «призовем» (invocaremos) ↔ LXX μεγαλυνθησόμεθα (seremos engrandecidos); segue-se o eslavo.
- 20,1: o eslavo não tem «В конец».
- 20,3: eslavo «сердца его», «хотения устну» ↔ LXX ψυχῆς, δέησιν.
- 21,20: eslavo «помощь твою» ↔ LXX τὴν βοήθειάν μου; «o Teu auxílio».
- 21,31: eslavo ativo «возвестит Господеви род грядущий» ↔ LXX passivo ἀναγγελήσεται; segue-se o eslavo.
- 24,1: eslavo «Боже мой, на Тя уповах» ↔ LXX ὁ Θεός μου ἐπὶ σοὶ πέποιθα; numeração diferente da de Brenton (o eslavo junta o início ao v. 1).
- 26,3: eslavo «на него аз уповаю» ↔ LXX ἐν ταύτῃ (nisto); lê-se «n'Ele» (cf. leitura eclesiástica), ⚠ ambíguo («него» pode referir «полк»).
- 26,6: eslavo «жертву хваления и воскликновения» ↔ LXX θυσίαν ἀλαλαγμοῦ; segue-se o eslavo.
- 26,8: eslavo «Господа взыщу» ↔ LXX ἐξεζήτησα τὸ πρόσωπόν σου; segue-se o eslavo.
- 29,1: o eslavo não tem «В конец».
- 29,8: eslavo «подаждь» (imperativo) ↔ LXX παρέσχου (aoristo); segue-se o eslavo.
- 30,23: o eslavo não tem «Κύριε».
- 33,5: eslavo «от всех скорбей моих» ↔ LXX ἐκ πασῶν τῶν παροικιῶν μου (das minhas peregrinações); segue-se o eslavo.
- 34,8: eslavo no singular («ему», «не весть», «скры», «впадет») ↔ LXX no plural; segue-se o eslavo.
- 34,10: eslavo «Господи, Господи» ↔ LXX Κύριε uma vez.
- 36,23: eslavo «и пути Его восхощет зело» (com «Его» em maiúscula: o homem desejará os caminhos do Senhor) ↔ LXX καὶ τὴν ὁδὸν αὐτοῦ θελήσει; segue-se o eslavo.
- 36,28: eslavo «беззаконницы же изженутся» (os iníquos serão expulsos) ↔ LXX de Brenton ἄμωμοι ἐκδικηθήσονται; segue-se o eslavo (= ἄνομοι δὲ ἐκδιωχθήσονται de outros códices).
- 37,8: eslavo «лядвия моя» (os meus lombos) ↔ LXX ἡ ψυχή μου; segue-se o eslavo.
- 37,10: eslavo acrescenta «Господи».
- 37,21: eslavo «гонях благостыню» (seguia a bondade) ↔ LXX δικαιοσύνην; segue-se o eslavo.
- 38,6: eslavo «пяди» (palmos) ↔ LXX de Brenton παλαιάς (velhos; outros códices παλαιστάς, palmos); segue-se o eslavo.
- 38,8: eslavo «от Тебе есть» (vem de Ti) ↔ LXX παρὰ σοί.
- 38,12: o eslavo não tem «ταράσσεται» na última frase.
- 38,13: eslavo «у Тебе» (junto de Ti) ↔ LXX ἐν τῇ γῇ (na terra); segue-se o eslavo.
- 39,9: eslavo «посреде чрева моего» (das minhas entranhas) ↔ LXX τῆς καρδίας μου; segue-se o eslavo.
- 39,11: eslavo «Правду Твою» ↔ LXX τὴν δικαιοσύνην μου (Brenton, unida ao v. 10).
- 39,12: eslavo «да заступите мя» (imperativo/desejo) ↔ LXX ἀντελάβοντό μου (aoristo); segue-se o eslavo.
- 41,1: eslavo acrescenta «псалом Давиду».
- 41,3: eslavo acrescenta «крепкому» («o Deus forte e vivo»).
- 41,9: eslavo «и нощию песнь Его от мене» ↔ LXX καὶ νυκτὸς δηλώσει· παρ' ἐμοὶ…; segue-se o eslavo.
- 41,11: eslavo «врази мои» ↔ LXX οἱ θλίβοντές με.
- 43,13: eslavo «в восклицаниих наших» ↔ LXX αὐτῶν.
- 44,12–13: eslavo «и поклонишися Ему, и дщи Тирова с дары» (e tu te prostrarás diante d'Ele; e a filha de Tiro com dons) ↔ LXX καὶ προσκυνήσουσιν αὐτῷ θυγατέρες Τύρου ἐν δώροις; segue-se o eslavo. 44,14: o eslavo não tem Ἐσεβών.
- 44,18: eslavo «Помяну» (1.ª sg.) ↔ LXX μνησθήσονται (3.ª pl.); segue-se o eslavo.
- 45,6: eslavo «утро заутра» (de manhã cedo) ↔ LXX τῷ προσώπῳ; segue-se o eslavo.
- 45,7: eslavo acrescenta «Вышний». 45,9: eslavo «дела Божия» ↔ LXX τοῦ Κυρίου.
- 47,1: «вторыя субботы» (δευτέρᾳ σαββάτου) = «do segundo dia da semana» («суббота» no sentido de «semana», como em Sl 23 «единыя от суббот»).
- 49,21: eslavo acrescenta «грехи твоя» («os teus pecados»).
- 49,23: eslavo «спасение Мое» ↔ LXX τὸ σωτήριον Θεοῦ; segue-se o eslavo.
- 52,5: eslavo «Господа» ↔ LXX τὸν Θεόν; 52,7 eslavo «Бог» ↔ LXX Κύριον.
- 54,1: eslavo «Асафу» ↔ LXX τῷ Δαυίδ; segue-se o eslavo («de Asaf»).
- 54,3: eslavo «печалию моею» (na minha tristeza) ↔ LXX ἐν τῇ ἀδολεσχίᾳ μου (na minha meditação/queixa).
- 54,9: eslavo acrescenta «Бога».
- 54,20–21: o eslavo junta «несть бо им изменения…» ao v. 20 (Brenton ao v. 21); segue-se a divisão da grelha.
- 55,4: eslavo «В день не убоюся» (de dia não temerei) ↔ LXX φοβηθήσονται; segue-se o eslavo.
- 55,8: eslavo «отринеши я» (rejeitá-los-ás) ↔ LXX σώσεις αὐτούς; segue-se o eslavo.
- 55,14: eslavo acrescenta «очи мои от слез»; «пред Господем» ↔ LXX τοῦ Θεοῦ; «благоугожду» (1.ª sg., futuro) ↔ LXX τοῦ εὐαρεστῆσαι.
- 56,8: eslavo acrescenta «во славе моей» («na minha glória»).
- 57,7: eslavo «сокрушит» (futuro) ↔ LXX συνέτριψε (aoristo). 57,11: o eslavo não tem ἀσεβῶν.
- 58,14: eslavo «яко Бог владычествует Иаковом и концы земли» (Deus domina sobre Jacob e os confins da terra) ↔ LXX ὅτι ὁ Θεὸς τοῦ Ἰακὼβ δεσπόζει τῶν περάτων; segue-se o eslavo.
- 59,2: eslavo «и порази Едома в дебри Солей» acrescenta «Edom».
- 60,1: eslavo acrescenta «Псалом».
- 62,1: eslavo «в пустыни Иудейстей» (deserto da Judeia) ↔ LXX τῆς Ἰδουμαίας (da Idumeia); segue-se o eslavo.
- 62,2: «коль множицею Тебе плоть моя» não tem verbo; supre-se «Te desejou» (mínimo).
- 62,6: eslavo «восхвалят Тя уста моя» ↔ LXX αἰνέσει τὸ ὄνομά σου.
- 63,2: eslavo «глас мой» ↔ LXX τῆς προσευχῆς μου. 63,3: eslavo «Покрый» (imperativo) ↔ LXX ἐσκέπασας (aoristo).
- 64,1: o eslavo (como outros códices da LXX) acrescenta «песнь Иеремиева и Иезекиилева, людий преселения, егда хотяху исходити»; Brenton só ψαλμὸς τῷ Δαυίδ, ᾠδή; segue-se o eslavo.
- 64,2: eslavo acrescenta «во Иерусалиме». 64,8: eslavo acrescenta «кто постоит?». 64,9: eslavo «украсиши» (adornarás) ↔ LXX τέρψεις (alegrarás).
- 64,10: o eslavo imprime «(есть)» entre parênteses (palavra suprida pela edição); traduzido «é», sem parênteses.
- 65,4: eslavo acrescenta «Вышний».
- 66,2: eslavo imperativo 2.ª p. («ущедри… благослови… просвети лице Твое… и помилуй ны») ↔ LXX optativo 3.ª p. (τὸ πρόσωπον αὐτοῦ) e sem «помилуй ны»; segue-se o eslavo.
- 67,2–4: texto já existente (comunhao_preparacao-cp118–120; noite-103) — ver «Textos já existentes».
- 67,12: o eslavo não tem Θεός. 67,13: o eslavo não repete τοῦ ἀγαπητοῦ.
- 67,31: eslavo «еже затворити искушенныя сребром» (para encerrar os provados com prata) ↔ LXX τοῦ μὴ ἀποκλεισθῆναι (para que não sejam excluídos); segue-se o eslavo.
- 67,32: eslavo «молитвенницы» (suplicantes) ↔ LXX πρέσβεις (embaixadores); segue-se o eslavo.
- 68,1: eslavo acrescenta «псалом». 68,7: eslavo repete «Господи». 68,11: eslavo «покрых» (cobri) ↔ LXX συνέκαμψα (curvei).
- 68,30: eslavo «спасение Твое, Боже, да приимет мя» (optativo, sem «da Tua face») ↔ LXX ἡ σωτηρία τοῦ προσώπου σου ἀντελάβετό μου; segue-se o eslavo.
- 68,33: eslavo acrescenta «душа ваша». 68,37: eslavo «рабов Твоих… имя Твое» ↔ LXX αὐτοῦ.
- 69,2: eslavo acrescenta «Господи, помощи ми потщися» (como Sl 39,14; ausente de Brenton). 69,5: eslavo «Боже… Господь» ↔ LXX ὁ Θεός (só no 2.º).
- 70,15: eslavo «не познах книжная» (não conheci as letras) ↔ LXX πραγματείας (negócios); segue-se o eslavo.
- 70,21: eslavo «величествие твое» (a Tua grandeza) ↔ LXX τὴν δικαιοσύνην σου; segue-se o eslavo. 70,22: eslavo acrescenta «в людех, Господи».
- 71: a grelha (19 vv.) não tem o sobrescrito (LXX v. 1 Εἰς Σαλωμών) nem o v. final «Оскудеша песни Давида, сына Иессеова» (LXX v. 20 Ἐξέλιπον οἱ ὕμνοι Δαυὶδ τοῦ υἱοῦ Ἰεσσαί), impresso nos saltérios eslavos; não se acrescenta (grelha vinculativa). Proposta, se for preciso: «Acabaram os hinos de David, filho de Jessé.» ⚠
- 71,14: eslavo «честно имя его пред ними» ↔ LXX ἔντιμον τὸ ὄνομα αὐτῶν ἐνώπιον αὐτοῦ; segue-se o eslavo.
- 72,15: eslavo «емуже обещахся» (com a qual me comprometi) ↔ LXX ἠσυνθέτηκα (fui infiel); segue-se o eslavo.
- 72,21: eslavo «разжжеся» (inflamou-se) ↔ LXX ηὐφράνθη (alegrou-se); segue-se o eslavo.
- 73,5: eslavo «во исходе» (na saída) ↔ LXX εἰς τὴν εἴσοδον (na entrada). 73,8: eslavo «праздники Божия» ↔ LXX τοῦ Κυρίου. 73,9: eslavo «Знамения их» ↔ LXX τὰ σημεῖα ἡμῶν.
- 73,16: eslavo «зарю и солнце» (a aurora e o sol) ↔ LXX ἥλιον καὶ σελήνην; segue-se o eslavo.
- 75,3: eslavo «в Мире» (com maiúscula: Salém) ↔ LXX ἐν εἰρήνῃ; «na Paz».
- 75,8: eslavo «Оттоле гнев Твой» (desde então a Tua ira) ↔ LXX ἀπὸ τῆς ὀργῆς σου (ligado à pergunta); segue-se o eslavo.
- 75,10: eslavo «кроткия земли» ↔ LXX τοὺς πρᾳεῖς τῇ καρδίᾳ; segue-se o eslavo.
- 76,5: eslavo «Предваристе стражбы очи мои» (os meus olhos anteciparam as vigílias) ↔ LXX πάντες οἱ ἐχθροί μου; segue-se o eslavo.
- 76,9: eslavo acrescenta «сконча глагол» (pondo fim à palavra).

## 4. Sobrescritos que a fonte não numera (não traduzidos)

A fonte (módulo isabelino) não inclui o sobrescrito como versículo nos salmos abaixo (a Bíblia eslava imprime-o como título sem número; a LXX de Brenton junta-o ao v. 1). Por a grelha ser vinculativa, **não foram acrescentados** ao `pt-a.json`. Se a app quiser mostrá-los como título, propõe-se (forma eslava a confirmar numa edição PD ⚠):

| Sl | LXX (Brenton) | PT proposto |
|---|---|---|
| 13 | Εἰς τὸ τέλος, ψαλμὸς τῷ Δαυίδ | Para o fim, salmo de David. |
| 14 | Ψαλμὸς τῷ Δαυίδ | Salmo de David. |
| 15 | Στηλογραφία τῷ Δαυίδ | Inscrição em coluna, de David. |
| 22 | Ψαλμὸς τῷ Δαυίδ | Salmo de David. |
| 23 | Ψαλμὸς τῷ Δαυὶδ τῆς μιᾶς σαββάτου | Salmo de David, do primeiro dia da semana. (`oficio-020` não o tem, como o Molitvoslov) |
| 24 | Ψαλμὸς τῷ Δαυίδ | Salmo de David. |
| 25 | Τοῦ Δαυίδ | De David. |
| 26 | Τοῦ Δαυὶδ, πρὸ τοῦ χρισθῆναι | De David, antes de ser ungido. |
| 27 | Τοῦ Δαυίδ | De David. |
| 28 | Ψαλμὸς τῷ Δαυὶδ ἐξοδίου σκηνῆς | Salmo de David, da saída do tabernáculo. |
| 31 | Συνέσεως τῷ Δαυίδ | De entendimento, de David. |
| 32 | Τῷ Δαυίδ | De David. |
| 34 | Τῷ Δαυίδ | De David. |
| 36 | Τῷ Δαυίδ | De David. |
| 42 | Ψαλμὸς τῷ Δαυίδ | Salmo de David. |
| 49 | Ψαλμὸς τῷ Ἀσάφ | Salmo de Asaf. |
| 70 | Τῷ Δαυὶδ υἱῶν Ἰωναδὰβ, καὶ τῶν πρώτων αἰχμαλωτισθέντων | De David, dos filhos de Jonadab e dos primeiros que foram levados cativos. |
| 71 | Εἰς Σαλωμών | Para Salomão. |
| 72 | Ψαλμὸς τῷ Ἀσάφ | Salmo de Asaf. |
| 73 | Συνέσεως τῷ Ἀσάφ | De entendimento, de Asaf. |

Nos Sl 10 e 16 a fonte junta o sobrescrito ao v. 1 («В конец, псалом Давиду. На Господа уповах…»; «Молитва Давиду. Услыши…»); traduziu-se assim, no mesmo versículo. Sl 71: falta também o versículo final «Оскудеша песни Давида, сына Иессеова» (ver §3).

## 5. Textos já existentes nos dados e alinhamento

Reutilizados **literalmente** (verificado por script: a junção dos versículos reproduz o campo `pt` original carácter a carácter):
- **Sl 22** = `comunhao_preparacao.json` › `oficio-018` (vv. 1–6).
- **Sl 23** = `oficio-020` (vv. 1–10). Mantém-se «… ao seu próximo. Este receberá…» embora o eslavo continue a frase (23,4 «:» / 23,5 «сей»).
- **Sl 50,3–21** = `manha.json` › `manha-30` (= `comunhao-kan-085`, `oficio-032`). Sobrescrito 50,1–2 novo.

Alinhados com frases existentes (o versículo do salmo não coincide totalmente com a oração):
- 12,4–5 ↔ `noite-099` («ilumina os meus olhos, para que eu não adormeça na morte, … não diga: Prevaleci contra ele»).
- 16,6 ↔ `oficio-123` («inclina para mim o Teu ouvido e escuta as minhas palavras»).
- 27,9 ↔ `manha-58` («Salva … o Teu povo e abençoa a Tua herança»).
- 30,6 («Nas Tuas mãos entregarei o meu espírito», futuro «предложу») ↔ `noite-111` (oração, «предаю» → «entrego»): diferença justificada pelo eslavo; sem alteração.
- 72,28 ↔ `oficio-154` (a oração tem outro texto: «во Господе упование спасения моего»); traduzido o texto do salmo, com a mesma formulação de base («Mas para mim é bom unir-me a Deus, pôr no Senhor a minha esperança…»).
- 67,2–4 composto a partir de `comunhao_preparacao-cp118`–`cp120` e `noite-103`.

**Alterações propostas aos blocos existentes (não aplicadas — decidir):**
1. `noite-103`: «Levante-se Deus» → «Levante-Se Deus» (reflexo divino com maiúscula, como em `cp118` e no resto dos dados: «Te comprazes», «manifestou-Se»).
2. `comunhao_preparacao-cp119`: «Como se desvanece o fumo, assim eles desapareçam» → «… assim se desvaneçam» (o eslavo repete o mesmo verbo: «изчезает … да изчезнут»; é a forma de `noite-103`, usada em 67,3).
3. `manha-42`: «Deus das potências» (Боже сил) → «Deus das Potestades», para coincidir com «Senhor das Potestades» (`oficio-020`, Sl 23,10) e com os Salmos.
4. `manha-30` (Sl 50,3 e 50,11): «apaga» segue o grego ἐξάλειψον; o eslavo diz «очисти» (purifica). Fiel ao eslavo seria «purifica a minha iniquidade» / «purifica todas as minhas iniquidades». Mantido literalmente por ser texto já validado (QA 2a); ⚠ decidir.
5. `oficio-018` (Sl 22,5) traduz «державна» por «poderoso» («quão poderoso é!»); em 15,6 o mesmo adjetivo (κράτιστος) foi traduzido «excelente» («nos meus lugares excelentes … excelente»), porque «poderoso» não faz sentido aí. Sem alteração; registado.

## 6. Dúvidas e pontos a rever (⚠)
- **оправдания → «justificações»**: alinhado com `pt-b.json` (Sl 118: «ensina-me as Tuas justificações»); alternativa mais corrente seria «preceitos»/«estatutos», mas «justificações» é o decalque fiel do eslavo e do grego.
- **рог → «chifre»** (sentido figurado incluído); alternativa «poder/força» seria paráfrase; «corno» evitado por ser malsoante em PT-PT.
- **церковь → «igreja»** (minúscula) mesmo em 25,5 («a igreja dos que praticam o mal»); alternativa «assembleia» (mas essa é a tradução de «сонм»).
- **26,3** «на него аз уповаю» lido como «n'Ele eu espero» (LXX ἐν ταύτῃ = nisto); «него» pode referir «полк».
- **36,23** «пути Его» com maiúscula na fonte: o homem «desejará grandemente os Seus caminhos» (LXX: Deus quererá o caminho dele).
- **75,3** «в Мире» com maiúscula (Salém) → «na Paz».
- **47,1** «вторыя субботы» → «do segundo dia da semana» (literal seria «do segundo sábado», enganador).
- Versículos obscuros traduzidos literalmente, sem interpretação: 4,9; 9,30–31; 15,3–4; 16,14; 35,2–3; 38,6–8; 54,14 («владыко мой» → «meu senhor», LXX ἡγεμών); 57,6; 57,10; 63,7; 64,10–14; 67,7; 67,13–15; 67,19; 67,24; 67,31; 72,4; 72,7; 72,15; 73,4–6; 73,20; 74,3; 74,7; 75,8; 75,11.
- 9,22 «презираеши» → «desvias o olhar» (ὑπερορᾷς); 21,18 «презреша мя» → «olharam para mim» (ἐπεῖδον).
- 21,19 «одежди» → «túnica» (como em Jo 19,24); 44,9 «стакти» → «estacte»; 59,8 «юдоль Жилищ» → «o vale das Habitações» (жилище = habitação).
- Pronomes em «Para o fim, do servo do Senhor, David» (17,1; 35,1): «отроку Господню Давиду» lido como «do servo do Senhor, David».
