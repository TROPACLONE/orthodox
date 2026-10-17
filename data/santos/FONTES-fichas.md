# Fontes — fichas dos santos (`fichas.json`)

> **Âmbito:** uma ficha curta por santo (dec. 77) para os **128 santos** da dec. 33 (critérios A + B + lista editorial C completa). Base factual: `docs/conhecimento/05-santos.md` (doc. 05) e as fontes aí citadas. Tropários: Ponomar (GPL v3, dec. 76) ou texto da Mineia sinodal anterior a 1917 (domínio público); azbyka.ru só para conferência. Compilado em 2026-10-17.
> **Licença:** os textos eslavos tirados do Ponomar ficam em GPL v3, com atribuição (dec. 76).

## 1. Esquema

```json
{"<id>": {"nome": {"cu","pt","ru","uk","en"}, "titulo": {"pt","ru","uk","en"},
           "vida": {"pt","ru","uk","en"}, "festas": ["MM-DD" (juliano), "<festa móvel em texto>"],
           "resumo": {"pt","ru","uk","en"},
           "tropario": {"tom", "cu", "pt", "ru", "uk", "en", "fonte": {"cu", "conferido", "estado"?, "variante"?, "en"?}} | null,
           "tropario_motivo"?: "…", "fontes": ["[n] …"], "criterio": "A|B|C"}}
```

- **id:** o de `data/menaion/graus.json` quando o santo lá está; senão *slug* do nome PT. Slugs novos em vez do id de `graus.json` (porque lá o id designa a festa, não o santo): `simeao-estilita` (graus: `indiccao-simeao-estilita`), `basilio-magno` (graus: `circuncisao-basilio-magno`), `joao-batista` (graus: `natividade-joao-batista` e outras festas), `zosimo-e-savacio-de-solovki` (graus: `zosimo-de-solovki` + `savacio-de-solovki`). Para santos com várias entradas em `graus.json` usou-se a memória principal (ex.: `joao-teologo-repouso`, `tikhon-de-moscovo-glorificacao`, `demetrio-de-rostov-repouso`).
- **festas:** datas OS (julianas), a primeira é a principal; as móveis vão em texto PT.
- **cu:** ortografia de armazenamento (civil pré-reforma com acentos), como `data/oracoes`. Conversão do Ponomar com o conversor `c2/conv.py`; textos atuais convertidos com o dicionário `c2/dict.pkl` + revisão manual (ѣ, і, ъ, ѳ, ѵ).
- **Traduções do tropário:** PT, RU, UK próprias (PT AO 1990, «Tu» para Deus; UK terminologia da IOU); EN própria (Thee/Thou, pronomes divinos com maiúscula, en-GB), exceto Crisóstomo e Basílio Magno (Hapgood 1906, adaptado). Os resumos são próprios, só com factos do doc. 05/fontes; lendas marcadas «segundo a tradição».

## 2. Números

| | |
|---|---|
| Fichas | 128 (104 do doc. 05 + 24 do Anexo C) |
| Tropário do **Ponomar** (GPL), conferido com o texto atual | 50 |
| Tropário da **Mineia pré-1917** sem fonte digital PD/GPL (⚠ a confirmar) | 50 |
| **Sem tropário** (texto oficial posterior a 1917, sem fonte PD/GPL) | 28 |

**Conferência com o texto atual (azbyka):** feita para **todos** os 50 tropários do Ponomar (alinhamento palavra a palavra; as divergências são só de ortografia eslava -ымъ/-имъ ou estão em §5). Onde o texto antigo e o atual diferem, segue-se o atual (dec. 62).

## 3. Os 24 santos acrescentados (lista C completa → 128)

O doc. 05 tem 104 fichas (A + B + C). A dec. 33 fixa **128 = A + B + lista editorial C completa**; a lista C completa inclui o **Anexo C** do doc. 05 (candidatos editoriais aceites pela dec. 20, item C1), que tem 25 nomes, **menos a Sinaxe do Arcanjo Miguel** (tratada como festa, dec. 20 item C3). Os santos do **Anexo B** (critério B regional) ficam fora por decisão (dec. 20, item C2). Resultado: 104 + 24 = 128. Critério de escolha (doc. 05, §0 e Anexo C): grande veneração universal ou russa sem polieleo.

| # | id | crit. | fontes | tropário |
|---|---|---|---|---|
| 105 | `joaquim-e-ana` | C | 3, 120 | tom 2 · Mineia ⚠ |
| 106 | `jose-de-volokolamsk` | C | 3, 116 | tom 5 · Mineia ⚠ |
| 107 | `fe-esperanca-caridade-e-sofia` | C | 3 | tom 4 · Mineia ⚠ |
| 108 | `parasceva-da-servia` | C | 3 | tom 2 · Ponomar `2637.xml` |
| 109 | `cosme-e-damiao-da-asia` | C | 3 | tom 8 · Ponomar `1294.xml` |
| 110 | `joao-o-esmoler` | C | 3 | tom 8 · Ponomar `252601.xml` |
| 111 | `nikon-de-radonej` | C | 3 | tom 1 · Ponomar `1644.xml` |
| 112 | `sabas-de-storojevsk` | C | 3 | tom 8 · Ponomar `190402.xml` |
| 113 | `joao-damasceno` | C | 3 | tom 8 · Mineia ⚠ |
| 114 | `inacio-teoforo` | C | 3 | tom 4 · Ponomar `897.xml` |
| 115 | `anastacia-libertadora` | C | 3 | tom 4 · Ponomar `2384.xml` |
| 116 | `tatiana` | C | 3 | tom 4 · Mineia ⚠ |
| 117 | `sava-da-servia` | C | 3 | tom 8 · Ponomar `1901.xml` |
| 118 | `macario-do-egito` | C | 3 | tom 1 · Ponomar `1401.xml` |
| 119 | `efrem-o-sirio` | C | 3 | tom 8 · Mineia ⚠ |
| 120 | `teodoro-estratelata` | C | 3 | tom 4 · Ponomar `2201.xml` |
| 121 | `teodoro-tiro` | C | 3 | tom 2 · Mineia ⚠ |
| 122 | `aleixo-homem-de-deus` | C | 3 | tom 4 · Mineia ⚠ |
| 123 | `serafim-de-vyritsa` | C | 3, 4, 118 | — |
| 124 | `pafnucio-de-borovsk` | C | 3 | tom 4 · Ponomar `964.xml` |
| 125 | `pacomio-o-grande` | C | 3 | tom 8 · Ponomar `1070.xml` |
| 126 | `eufrosina-de-polotsk` | C | 3, 119 | tom 4 · Mineia ⚠ |
| 127 | `cirilo-de-belozersk` | C | 3, 117 | tom 1 · Mineia ⚠ |
| 128 | `paisio-athonita` | C | 3 | — |

Resumos destes 24: o doc. 05 não tem ficha; usaram-se os dados do calendário [3] e, quando existem, as páginas citadas no Anexo C ([116] José, [117] Cirilo, [118] Serafim de Vyritsa, [119] Eufrosina, [120] Joaquim e Ana), limitando-se a factos correntes da hagiografia (marcados «segundo a tradição» quando lendários). ⚠ **Rever** estes 24 resumos numa 2.ª ronda contra as páginas azbyka/pravenc de cada santo.

## 4. Fontes por ficha

Números = referências do doc. 05 (lista «Referências»). Tropário: «Ponomar `<ficheiro>`» = `Ponomar/languages/cu/xml/lives/<ficheiro>` (github.com/typiconman/ponomar, GPL v3); «Mineia ⚠» = ver §6.

| # | id | crit. | fontes | tropário |
|---|---|---|---|---|
| 1 | `simeao-estilita` | A | 2, 3, 9, 129 | tom 1 · Ponomar `1426.xml` |
| 2 | `silvano-do-athos` | B | 3, 4, 10 | — |
| 3 | `sergio-de-radonej` | A | 2, 3, 4, 11 | tom 4 · Mineia ⚠ |
| 4 | `joao-teologo-repouso` | A | 2, 3, 12 | tom 2 · Ponomar `962.xml` |
| 5 | `tikhon-de-moscovo-glorificacao` | B | 3, 4, 5, 13 | — |
| 6 | `caritao-confessor` | A | 2, 3, 14 | tom 8 · Mineia ⚠ |
| 7 | `sinaxe-hierarcas-de-moscovo` | A | 2, 3, 4, 15 | tom 4 · Mineia ⚠ |
| 8 | `tome-apostolo` | A | 2, 3, 16 | tom 2 · Mineia ⚠ |
| 9 | `tiago-de-alfeu` | A | 2, 3, 17 | tom 3 · Mineia ⚠ |
| 10 | `ambrosio-de-optina` | B | 3, 4, 8, 18, 146 | — |
| 11 | `sinaxe-optina` | C | 3, 4, 19 | — |
| 12 | `lucas-evangelista` | A | 2, 3, 20, 34, 121 | tom 5 · Mineia ⚠ |
| 13 | `demetrio-de-tessalonica` | A | 2, 3, 21 | tom 3 · Mineia ⚠ |
| 14 | `demetrio-de-rostov-repouso` | A | 2, 3, 22, 131, 132 | tom 8 · Mineia ⚠ |
| 15 | `parasceva-sexta-feira` | C | 3, 23 | tom 4 · Mineia ⚠ |
| 16 | `jo-de-potchaiv` | B | 3, 24, 130 | tom 4 · Mineia ⚠ |
| 17 | `joao-crisostomo` | A | 2, 3, 25 | tom 8 · Ponomar `97802.xml` · EN Hapgood |
| 18 | `filipe-apostolo` | A | 2, 3, 26 | tom 3 · Ponomar `2535.xml` |
| 19 | `gregorio-palamas` | C | 3, 27, 155 | tom 8 · Mineia ⚠ |
| 20 | `paisio-velitchkovski` | C | 3, 4, 8, 28, 152 | — |
| 21 | `mateus-evangelista` | A | 2, 3, 29 | tom 3 · Ponomar `1500.xml` |
| 22 | `filareto-de-moscovo` | B | 3, 4, 30 | — |
| 23 | `alexandre-nevski` | A | 2, 3, 4, 31, 133 | tom 4 · Mineia ⚠ |
| 24 | `mitrofano-de-voronej` | A | 2, 3, 4, 32 | tom 4 · Mineia ⚠ |
| 25 | `catarina-de-alexandria` | C | 3, 33 | tom 4 · Mineia ⚠ |
| 26 | `andre-primeiro-chamado` | A | 2, 3, 34, 134 | tom 4 · Mineia ⚠ |
| 27 | `barbara` | C | 3, 35 | tom 8 · Mineia ⚠ |
| 28 | `sabas-santificado` | A | 2, 3, 36, 135 | tom 8 · Mineia ⚠ |
| 29 | `nicolau-taumaturgo` | A | 2, 3, 37 | tom 4 · Ponomar `1635.xml` |
| 30 | `joasafe-de-belgorod` | B | 3, 4, 38, 156 | tom 3 · Mineia ⚠ |
| 31 | `espiridiao-de-trimitunte` | C | 3, 39, 147 | tom 4 · Ponomar `2049.xml` |
| 32 | `eustracio-e-companheiros` | A | 2, 3, 40 | tom 4 · Ponomar `3111.xml` |
| 33 | `germano-do-alasca` | C | 3, 4, 41, 124, 125 | — |
| 34 | `joao-de-kronstadt` | B | 3, 4, 42, 150 | — |
| 35 | `pedro-de-moscovo` | A | 2, 3, 4, 43 | tom 4 · Ponomar `177901.xml` |
| 36 | `estevao-protomartir` | C | 3, 44 | tom 4 · Ponomar `205102.xml` |
| 37 | `macario-de-moscovo` | B | 3, 4, 8, 45 | — |
| 38 | `basilio-magno` | A | 2, 3, 46 | tom 1 · Mineia ⚠ · EN Hapgood |
| 39 | `serafim-de-sarov` | A | 2, 3, 4, 47 | tom 4 · Ponomar `09968.xml` |
| 40 | `filipe-de-moscovo` | A | 2, 3, 4, 48, 144, 145 | tom 8 · Ponomar `180.xml` |
| 41 | `teofano-recluso` | B | 3, 4, 49, 153 | — |
| 42 | `teodosio-cenobiarca` | A | 2, 3, 50 | tom 8 · Ponomar `2210.xml` |
| 43 | `nina-da-georgia` | A | 2, 3, 4, 51 | tom 4 · Mineia ⚠ |
| 44 | `antao-o-grande` | A | 2, 3, 52 | tom 4 · Ponomar `209.xml` |
| 45 | `marcos-de-efeso` | B | 3, 53, 121, 123 | — |
| 46 | `eutimio-o-grande` | A | 2, 3, 54, 136 | tom 4 · Ponomar `260.xml` |
| 47 | `maximo-o-grego` | B | 3, 4, 55 | — |
| 48 | `xenia-de-sao-petersburgo` | B | 3, 4, 8, 56, 127 | — |
| 49 | `gregorio-teologo` | A | 2, 3, 57 | tom 1 · Ponomar `535.xml` |
| 50 | `sinaxe-novos-martires` | B | 3, 4, 5, 58 | — |
| 51 | `tres-hierarcas` | A | 2, 3, 4, 138 | tom 4 · Ponomar `09030.xml` |
| 52 | `nicolau-do-japao` | C | 3, 4, 59 | — |
| 53 | `teodosio-de-tchernigov` | B | 3, 4, 60 | tom 4 · Mineia ⚠ |
| 54 | `aleixo-de-moscovo` | A | 2, 3, 4, 61 | tom 8 · Ponomar `131.xml` |
| 55 | `cirilo-e-metodio` | A | 2, 3, 62, 63 | tom 4 · Ponomar `152501.xml` |
| 56 | `hermogenes-de-moscovo` | B | 3, 4, 64 | tom 4 · Mineia ⚠ |
| 57 | `daniel-de-moscovo` | B | 3, 4, 65, 137 | tom 4 · Mineia ⚠ |
| 58 | `quarenta-martires-de-sebaste` | A | 2, 3, 66 | tom 1 · Mineia ⚠ |
| 59 | `joao-climaco` | C | 3, 67 | tom 1 · Mineia ⚠ |
| 60 | `inocencio-de-moscovo` | C | 3, 4, 68, 151 | — |
| 61 | `maria-egipciaca` | C | 3, 69, 148 | tom 8 · Mineia ⚠ |
| 62 | `zosimo-e-savacio-de-solovki` | A | 2, 3, 4, 70, 71 | tom 4 · Mineia ⚠ |
| 63 | `matrona-de-moscovo` | B | 3, 7, 72 | — |
| 64 | `jorge-grande-martir` | A | 2, 3, 73 | tom 4 · Ponomar `09497.xml` |
| 65 | `marcos-evangelista` | A | 2, 3, 74 | tom 3 · Ponomar `1459.xml` |
| 66 | `estevao-de-perm` | C | 3, 75 | tom 4 · Ponomar `937.xml` |
| 67 | `tiago-de-zebedeu` | A | 2, 3, 76 | tom 3 · Ponomar `872.xml` |
| 68 | `inacio-briantchaninov` | B | 3, 4, 77, 149 | — |
| 69 | `teodosio-das-grutas` | A | 2, 3, 4, 78, 103 | tom 8 · Mineia ⚠ |
| 70 | `nilo-de-sora` | B | 3, 4, 79, 140 | tom 4 · Mineia ⚠ |
| 71 | `simao-zelota` | A | 2, 3, 80 | tom 3 · Ponomar `1029.xml` |
| 72 | `demetrio-de-uglitch` | A | 2, 3, 81, 141 | tom 4 · Mineia ⚠ |
| 73 | `cornelio-de-komel` | A | 2, 3, 82 | tom 4 · Mineia ⚠ |
| 74 | `demetrio-donskoi` | B | 3, 4, 8, 83 | — |
| 75 | `constantino-e-helena` | A | 2, 3, 84 | tom 8 · Ponomar `1270.xml` |
| 76 | `joao-russo` | B | 3, 4, 85 | — |
| 77 | `lucas-da-crimeia` | B | 3, 86 | — |
| 78 | `barlaao-de-khutyn` | B | 3, 4, 87 | tom 3 · Ponomar `357.xml` |
| 79 | `joao-de-tobolsk` | B | 3, 4, 88 | tom 8 · Mineia ⚠ |
| 80 | `bartolomeu-e-barnabe` | A | 2, 3, 89, 90 | tom 3 · Mineia ⚠ |
| 81 | `jonas-de-moscovo` | A | 2, 3, 4, 91 | tom 4 · Ponomar `1042.xml` |
| 82 | `judas-tadeu` | A | 2, 3, 92 | tom 1 · Ponomar `1346.xml` |
| 83 | `jo-patriarca-de-moscovo` | B | 3, 4, 93 | — |
| 84 | `joao-batista` | A | 2, 3, 94 | tom 4 · Ponomar `3050.xml` |
| 85 | `pedro-e-fevronia` | C | 3, 4, 95 | tom 8 · Ponomar `6797.xml` |
| 86 | `pedro-e-paulo` | A | 2, 3, 96, 97, 128 | tom 4 · Ponomar `09785.xml` |
| 87 | `portadores-paixao-imperiais` | C | 3, 4, 6, 98, 143 | — |
| 88 | `andre-rublev` | B | 3, 4, 8, 99, 142 | — |
| 89 | `andre-bogoliubski` | B | 3, 4, 100 | tom 8 · Mineia ⚠ |
| 90 | `atanasio-do-athos` | A | 2, 3, 101 | tom 3 · Ponomar `293.xml` |
| 91 | `isabel-feodorovna` | C | 3, 102, 139 | — |
| 92 | `antao-das-grutas` | A | 2, 3, 4, 78, 103 | tom 4 · Mineia ⚠ |
| 93 | `olga-de-kiev` | C | 3, 4, 104, 126 | tom 1 · Mineia ⚠ |
| 94 | `nicodemos-hagiorita` | B | 3, 105, 154 | — |
| 95 | `vladimir-igual-apostolos` | A | 2, 3, 4, 106 | tom 4 · Mineia ⚠ |
| 96 | `elias-profeta` | A | 2, 3, 107 | tom 4 · Ponomar `09946.xml` |
| 97 | `maria-madalena` | C | 3, 108 | tom 1 · Ponomar `2598.xml` |
| 98 | `boris-e-gleb` | A | 2, 3, 4, 109 | tom 2 · Ponomar `324.xml` |
| 99 | `pantaleao` | A | 2, 3, 110 | tom 3 · Ponomar `1727.xml` |
| 100 | `joao-o-guerreiro` | B | 3, 111 | tom 4 · Mineia ⚠ |
| 101 | `basilio-bem-aventurado` | C | 3, 112 | tom 8 · Mineia ⚠ |
| 102 | `matias-apostolo` | A | 2, 3, 113 | tom 3 · Ponomar `1503.xml` |
| 103 | `tikhon-de-zadonsk` | A | 2, 3, 114 | tom 8 · Mineia ⚠ |
| 104 | `alexandre-de-svir` | C | 3, 4, 115 | tom 4 · Ponomar `12501.xml` |
| 105 | `joaquim-e-ana` | C | 3, 120 | tom 2 · Mineia ⚠ |
| 106 | `jose-de-volokolamsk` | C | 3, 116 | tom 5 · Mineia ⚠ |
| 107 | `fe-esperanca-caridade-e-sofia` | C | 3 | tom 4 · Mineia ⚠ |
| 108 | `parasceva-da-servia` | C | 3 | tom 2 · Ponomar `2637.xml` |
| 109 | `cosme-e-damiao-da-asia` | C | 3 | tom 8 · Ponomar `1294.xml` |
| 110 | `joao-o-esmoler` | C | 3 | tom 8 · Ponomar `252601.xml` |
| 111 | `nikon-de-radonej` | C | 3 | tom 1 · Ponomar `1644.xml` |
| 112 | `sabas-de-storojevsk` | C | 3 | tom 8 · Ponomar `190402.xml` |
| 113 | `joao-damasceno` | C | 3 | tom 8 · Mineia ⚠ |
| 114 | `inacio-teoforo` | C | 3 | tom 4 · Ponomar `897.xml` |
| 115 | `anastacia-libertadora` | C | 3 | tom 4 · Ponomar `2384.xml` |
| 116 | `tatiana` | C | 3 | tom 4 · Mineia ⚠ |
| 117 | `sava-da-servia` | C | 3 | tom 8 · Ponomar `1901.xml` |
| 118 | `macario-do-egito` | C | 3 | tom 1 · Ponomar `1401.xml` |
| 119 | `efrem-o-sirio` | C | 3 | tom 8 · Mineia ⚠ |
| 120 | `teodoro-estratelata` | C | 3 | tom 4 · Ponomar `2201.xml` |
| 121 | `teodoro-tiro` | C | 3 | tom 2 · Mineia ⚠ |
| 122 | `aleixo-homem-de-deus` | C | 3 | tom 4 · Mineia ⚠ |
| 123 | `serafim-de-vyritsa` | C | 3, 4, 118 | — |
| 124 | `pafnucio-de-borovsk` | C | 3 | tom 4 · Ponomar `964.xml` |
| 125 | `pacomio-o-grande` | C | 3 | tom 8 · Ponomar `1070.xml` |
| 126 | `eufrosina-de-polotsk` | C | 3, 119 | tom 4 · Mineia ⚠ |
| 127 | `cirilo-de-belozersk` | C | 3, 117 | tom 1 · Mineia ⚠ |
| 128 | `paisio-athonita` | C | 3 | — |

## 5. Variantes e escolhas no tropário

- 40 `filipe-de-moscovo` — O texto Ponomar (edição antiga) acrescenta uma petição pelo imperador ortodoxo, ausente do texto atual.
- 62 `zosimo-e-savacio-de-solovki` — Tropário de S. Zósimo (17.04); Savácio tem tropário próprio a 27.09.
- 64 `jorge-grande-martir` — Texto atual «царей поборниче»; o Ponomar (edição antiga) tem «православныхъ поборниче».
- 78 `barlaao-de-khutyn` — O Ponomar tem «къ ра́цѣ моще́й твои́хъ» onde o texto atual tem «къ тебѣ́».
- 81 `jonas-de-moscovo` — Tropário «Отъ ю́ности твоея́» (no texto atual é «ин тропарь»; o primeiro é «Яре́мъ Госпо́день»).
- 95 `vladimir-igual-apostolos` — Usa-se o tropário tradicional do Menaion (tom 4, «Уподо́бился еси́ купцу́»); o texto atual lista em primeiro lugar um tropário mais recente (tom 1).
- 98 `boris-e-gleb` — O Ponomar tem «незло́бнымъ» onde o texto atual tem «незло́бивымъ».
- 108 `parasceva-da-servia` — Tom 2 segundo o texto atual; o Ponomar indica tom 4.
- 112 `sabas-de-storojevsk` — Tropário «Отъ ю́ности Боже́ственною» («ин тропарь» no texto atual; o primeiro é «Пусты́ни яви́лся еси́»).
- 115 `anastacia-libertadora` — Tropário comum das virgens-mártires («ин тропарь» no texto atual; o primeiro é «Побѣдоно́снаго Воскресе́нія»).
- 118 `macario-do-egito` — O Ponomar tem «въ тѣлеси́ … показа́лся … богоно́се … притека́ющихъ къ тебѣ́»; segue-se o texto atual.
- 119 `efrem-o-sirio` — O ficheiro Ponomar 817.xml traz por erro o tropário de S. João Crisóstomo; usa-se o tropário próprio do texto atual.
- 124 `pafnucio-de-borovsk` — O Ponomar tem «ми́лости благоутро́бія» (genitivo); segue-se o texto atual.
- 17 `joao-crisostomo`, 38 `basilio-magno` — EN de Hapgood 1906 (tropário de despedida da Liturgia), com pronomes divinos em maiúscula; em 17 Hapgood segue o grego («intercede thou with Christ our God»), o eslavo tem «моли́ Сло́ва Христа́ Бо́га» — acrescentou-se «the Word».
- 21 `mateus-evangelista` — usa-se o tropário da Mineia/Ponomar («Апо́столе святы́й и Евангели́сте Матѳе́е»); o texto atual põe em 1.º lugar outro tropário («Усе́рдно отъ мы́тницы»).
- 23 `alexandre-nevski` — o Ponomar (11401.xml) tem outro tropário («Позна́й свою́ бра́тію»); usou-se o tropário atual do dia, que fica em §6.
- 31 `espiridiao-de-trimitunte` — o Ponomar só traz o tropário comum «Пра́вило вѣ́ры» («ин тропарь» no texto atual); o próprio é «Собо́ра Пе́рваго».
- 62 — o tropário é o de S. Zósimo; a ficha cobre o par.

## 6. Tropários «Mineia ⚠» (50) — sem fonte PD/GPL digital consultada

São textos tradicionais da Mineia sinodal anterior a 1917 (domínio público), mas **nenhum scan PD nem ficheiro GPL foi efetivamente lido** nesta ronda: o Ponomar não os tem (ou tem só o lugar vazio), o *Месяцеслов* sinodal de 1901 (archive.org) não traz tropários de santos e o *Часослов* 1888 disponível está incompleto. O texto foi transcrito do **texto atual** (azbyka) e convertido para a ortografia de armazenamento — ou seja, na prática a azbyka serviu de fonte e não só de conferência (contra a regra da dec. 43/76). Campo `fonte.estado = "a confirmar"`. **Decisão pendente:** aceitar assim, conferir com uma Mineia PD (scans) ou passar a `null`. Inclui 4 santos canonizados em 1896–1916 (Teodósio de Tchernigov, Joasafe, Hermógenes, João de Tobolsk), cujo ofício saiu em impressões sinodais pré-1917, e 2 de veneração local antiga cujo tropário pode ser tardio (Nilo de Sora, André Bogoliubski).

3 `sergio-de-radonej`, 6 `caritao-confessor`, 7 `sinaxe-hierarcas-de-moscovo`, 8 `tome-apostolo`, 9 `tiago-de-alfeu`, 12 `lucas-evangelista`, 13 `demetrio-de-tessalonica`, 14 `demetrio-de-rostov-repouso`, 15 `parasceva-sexta-feira`, 16 `jo-de-potchaiv`, 19 `gregorio-palamas`, 23 `alexandre-nevski`, 24 `mitrofano-de-voronej`, 25 `catarina-de-alexandria`, 26 `andre-primeiro-chamado`, 27 `barbara`, 28 `sabas-santificado`, 30 `joasafe-de-belgorod`, 38 `basilio-magno`, 43 `nina-da-georgia`, 53 `teodosio-de-tchernigov`, 56 `hermogenes-de-moscovo`, 57 `daniel-de-moscovo`, 58 `quarenta-martires-de-sebaste`, 59 `joao-climaco`, 61 `maria-egipciaca`, 62 `zosimo-e-savacio-de-solovki`, 69 `teodosio-das-grutas`, 70 `nilo-de-sora`, 72 `demetrio-de-uglitch`, 73 `cornelio-de-komel`, 79 `joao-de-tobolsk`, 80 `bartolomeu-e-barnabe`, 89 `andre-bogoliubski`, 92 `antao-das-grutas`, 93 `olga-de-kiev`, 95 `vladimir-igual-apostolos`, 100 `joao-o-guerreiro`, 101 `basilio-bem-aventurado`, 103 `tikhon-de-zadonsk`, 105 `joaquim-e-ana`, 106 `jose-de-volokolamsk`, 107 `fe-esperanca-caridade-e-sofia`, 113 `joao-damasceno`, 116 `tatiana`, 119 `efrem-o-sirio`, 121 `teodoro-tiro`, 122 `aleixo-homem-de-deus`, 126 `eufrosina-de-polotsk`, 127 `cirilo-de-belozersk`.

## 7. Sem tropário (28)

| # | id | motivo |
|---|---|---|
| 2 | `silvano-do-athos` | Glorificação 1987/1991: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 5 | `tikhon-de-moscovo-glorificacao` | Glorificação 1989: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 10 | `ambrosio-de-optina` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 11 | `sinaxe-optina` | Glorificação 1996/2000: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 20 | `paisio-velitchkovski` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 22 | `filareto-de-moscovo` | Glorificação 1994: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 33 | `germano-do-alasca` | Glorificação 1970: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 34 | `joao-de-kronstadt` | Glorificação 1990: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 37 | `macario-de-moscovo` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 41 | `teofano-recluso` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 45 | `marcos-de-efeso` | Canonizado em Constantinopla (1734) e inscrito tardiamente no menológio russo: não se encontrou o texto eslavo do tropário em edição de domínio público, e o ficheiro Ponomar (256.xml) tem o tropário vazio — omitido. |
| 47 | `maximo-o-grego` | Glorificação 1988 (veneração local abençoada em 1591, depois suprimida): tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 48 | `xenia-de-sao-petersburgo` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 50 | `sinaxe-novos-martires` | Glorificação 1992/2000: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 52 | `nicolau-do-japao` | Glorificação 1970: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 60 | `inocencio-de-moscovo` | Glorificação 1977: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 63 | `matrona-de-moscovo` | Glorificação 1999/2004: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 68 | `inacio-briantchaninov` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 74 | `demetrio-donskoi` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 76 | `joao-russo` | Glorificação 1962 (inscrição no calendário da IOR): tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 77 | `lucas-da-crimeia` | Glorificação 1995/2000: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 83 | `jo-patriarca-de-moscovo` | Glorificação 1989: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 87 | `portadores-paixao-imperiais` | Glorificação 2000: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 88 | `andre-rublev` | Glorificação 1988: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 91 | `isabel-feodorovna` | Glorificação 1992: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 94 | `nicodemos-hagiorita` | Glorificação 1955 (Constantinopla): tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 123 | `serafim-de-vyritsa` | Glorificação 2000: tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |
| 128 | `paisio-athonita` | Glorificação 2015 (Constantinopla): tropário oficial posterior a 1917, sem texto PD nem GPL — omitido. |

## 8. Referências usadas

- [2] Типикон, гл. 48 «Месяцеслов» (sinais 🕀/🕁/🕂 por dia)
- [3] Azbuka Very — calendário diário, endpoint do widget (JSON com HTML; ideogramas de rank «Двунадесятые, Великие / Бденные / Полиелейные / Слав
- [4] Православная энциклопедия, «Канонизация» (secções sobre a IOR: séc. XI–1547; Concílios de 1547–1549; 1550–1721; 1721–1894; 1894–1917; 1917–1
- [5] Православная энциклопедия, «Новомученики» (Concílio de 1918; Concílio dos Bispos de 1992; regra de 2013)
- [6] Православная энциклопедия, «Николай II Александрович» (morte, canonização de 2000, questão dos restos)
- [7] Православная энциклопедия, «Матрона» (Matrona de Moscovo: datas, glorificações de 1999 e 2004, relíquias)
- [8] Wikipedia (ru), «Поместный собор Русской православной церкви (1988)» — lista dos nove santos glorificados e referência ao «Деяние … о канони
- [9] Azbuka Very — Церковный календарь, «Прп. Симеон Столпник, Антиохийский и матерь его Марфа Каппадокийская»
- [10] Azbuka Very — Церковный календарь, «Преподобный Силуан Афонский»
- [11] Azbuka Very — Церковный календарь, «Преподобный Сергий Радонежский, игумен»
- [12] Azbuka Very — Церковный календарь, «Апостол и евангелист Иоанн Богослов»
- [13] Azbuka Very — Церковный календарь, «Святитель Тихон (Беллавин), патриарх Московский и всея России»
- [14] Azbuka Very — Церковный календарь, «Преподобный Харитон Исповедник, епископ Иконийский»
- [15] Azbuka Very — Церковный календарь, «Собор Московских святителей»
- [16] Azbuka Very — Церковный календарь, «Апостол Фома Дидим (Близнец)»
- [17] Azbuka Very — Церковный календарь, «Апостол Иаков Алфеев, брат евангелиста Матфея»
- [18] Azbuka Very — Церковный календарь, «Преподобный Амвросий Оптинский»
- [19] Azbuka Very — Церковный календарь, «Собор всех святых, в Оптиной пустыни просиявших»
- [20] Azbuka Very — Церковный календарь, «Святой апостол и евангелист Лука»
- [21] Azbuka Very — Церковный календарь, «Великомученик Димитрий Солунский (Фессалоникийский), Мироточивый»
- [22] Azbuka Very — Церковный календарь, «Святитель Димитрий, митрополит Ростовский»
- [23] Azbuka Very — Церковный календарь, «Великомученица Параскева Пятница»
- [24] Azbuka Very — Церковный календарь, «Преподобный Иов Почаевский, игумен»
- [25] Azbuka Very — Церковный календарь, «Святитель Иоанн Златоуст, архиепископ Константинопольский»
- [26] Azbuka Very — Церковный календарь, «Святой апостол Филипп»
- [27] Azbuka Very — Церковный календарь, «Святитель Григорий Палама, архиепископ Солунский (Фессалоникийский)»
- [28] Azbuka Very — Церковный календарь, «Преподобный Паисий Величковский»
- [29] Azbuka Very — Церковный календарь, «Апостол и евангелист Матфей (Левий), брат ап. Иакова Алфеева»
- [30] Azbuka Very — Церковный календарь, «Святитель Филарет (Дроздов), митрополит Московский»
- [31] Azbuka Very — Церковный календарь, «Благоверный князь Александр (в схиме Алексий) Невский»
- [32] Azbuka Very — Церковный календарь, «Святитель Митрофан (в схиме Макарий), епископ Воронежский»
- [33] Azbuka Very — Церковный календарь, «Великомученица Екатерина Александрийская, дева»
- [34] Azbuka Very — Церковный календарь, «Апостол Андрей Первозванный»
- [35] Azbuka Very — Церковный календарь, «Вмц. Варвара, и мц. Иулиания Илиопольские»
- [36] Azbuka Very — Церковный календарь, «Преподобный Савва Освященный, Муталаскский, игумен»
- [37] Azbuka Very — Церковный календарь, «Святитель Николай Чудотворец, архиепископ Мир Ликийских»
- [38] Azbuka Very — Церковный календарь, «Святитель Иоасаф, епископ Белгородский»
- [39] Azbuka Very — Церковный календарь, «Святитель Спиридон, епископ Тримифунтский»
- [40] Azbuka Very — Церковный календарь, «Мученики Евстратий, Авксентий, Евгений, Мардарий и Орест Севастийские»
- [41] Azbuka Very — Церковный календарь, «Преподобный Герман Аляскинский»
- [42] Azbuka Very — Церковный календарь, «Праведный Иоанн Кронштадтский, пресвитер»
- [43] Azbuka Very — Церковный календарь, «Святитель Петр Московский, митрополит Киевский и всея Руси, чудотворец»
- [44] Azbuka Very — Церковный календарь, «Апостол от 70-ти Стефан, первомученик, архидиакон»
- [45] Azbuka Very — Церковный календарь, «Святитель Макарий, митрополит Московский и всея Руси»
- [46] Azbuka Very — Церковный календарь, «Святитель Василий Великий, архиепископ Кесарийский (Каппадокийский)»
- [47] Azbuka Very — Церковный календарь, «Преподобный Серафим Саровский»
- [48] Azbuka Very — Церковный календарь, «Святитель Филипп II (Колычев), митрополит Московский и всея Руси»
- [49] Azbuka Very — Церковный календарь, «Святитель Феофан Затворник Вышенский, епископ Тамбовский»
- [50] Azbuka Very — Церковный календарь, «Преподобный Феодосий Великий, Киновиарх»
- [51] Azbuka Very — Церковный календарь, «Равноапостольная Нина, просветительница Грузии»
- [52] Azbuka Very — Церковный календарь, «Преподобный Антоний Великий, Египетский»
- [53] Azbuka Very — Церковный календарь, «Святитель Марк Евгеник, архиепископ Ефесский»
- [54] Azbuka Very — Церковный календарь, «Преподобный Евфимий Великий, иеромонах»
- [55] Azbuka Very — Церковный календарь, «Преподобный Максим Грек»
- [56] Azbuka Very — Церковный календарь, «Блаженная Ксения Петербургская, Христа ради юродивая»
- [57] Azbuka Very — Церковный календарь, «Святитель Григорий Богослов, Назианзин, Младший, архиепископ Константинопольский»
- [58] Azbuka Very — Церковный календарь, «Собор новомучеников и исповедников Церкви Русской»
- [59] Azbuka Very — Церковный календарь, «Равноапостольный Николай (Касаткин), архиепископ Японский»
- [60] Azbuka Very — Церковный календарь, «Святитель Феодосий, архиепископ Черниговский»
- [61] Azbuka Very — Церковный календарь, «Святитель Алексий Московский, митрополит Киевский и всея Руси, чудотворец»
- [62] Azbuka Very — Церковный календарь, «Равноапостольный Кирилл (Константин) Философ, Моравский»
- [63] Azbuka Very — Церковный календарь, «Равноапостольный Мефодий, архиепископ Моравский»
- [64] Azbuka Very — Церковный календарь, «Священномученик Ермоген, патриарх Московский и всея Руси»
- [65] Azbuka Very — Церковный календарь, «Благоверный князь Даниил Московский»
- [66] Azbuka Very — Церковный календарь, «Сорок мучеников Севастийских»
- [67] Azbuka Very — Церковный календарь, «Преподобный Иоанн Лествичник, Синайский, игумен»
- [68] Azbuka Very — Церковный календарь, «Святитель Иннокентий (Вениаминов), митрополит Московский»
- [69] Azbuka Very — Церковный календарь, «Преподобная Мария Египетская»
- [70] Azbuka Very — Церковный календарь, «Преподобный Зосима Соловецкий, игумен»
- [71] Azbuka Very — Церковный календарь, «Преподобный Савватий Соловецкий»
- [72] Azbuka Very — Церковный календарь, «Блаженная Матрона Московская (Никонова)»
- [73] Azbuka Very — Церковный календарь, «Святой великомученик Георгий Победоносец»
- [74] Azbuka Very — Церковный календарь, «Апостол от 70-ти и евангелист Марк Александрийский, епископ»
- [75] Azbuka Very — Церковный календарь, «Святитель Стефан (Великопермский), епископ Пермский»
- [76] Azbuka Very — Церковный календарь, «Апостол Иаков Зеведеев, брат ап. Иоанна Богослова»
- [77] Azbuka Very — Церковный календарь, «Святитель Игнатий (Брянчанинов), епископ Кавказский»
- [78] Azbuka Very — Церковный календарь, «Преподобный Феодосий Печерский, игумен»
- [79] Azbuka Very — Церковный календарь, «Преподобный Нил Сорский»
- [80] Azbuka Very — Церковный календарь, «Апостол Симон Зилот, Кананит»
- [81] Azbuka Very — Церковный календарь, «Благоверный Димитрий Угличский и Московский, царевич»
- [82] Azbuka Very — Церковный календарь, «Преподобный Корнилий Комельский»
- [83] Azbuka Very — Церковный календарь, «Благоверный князь Димитрий Донской»
- [84] Azbuka Very — Церковный календарь, «Жития равноапостольных императора Константина и царицы Елены»
- [85] Azbuka Very — Церковный календарь, «Праведный Иоанн Русский»
- [86] Azbuka Very — Церковный календарь, «Святитель Лука (Войно-Ясенецкий), архиепископ Симферопольский и Крымский»
- [87] Azbuka Very — Церковный календарь, «Преподобный Варлаам Хутынский»
- [88] Azbuka Very — Церковный календарь, «Святитель Иоанн (Максимович), митрополит Тобольский»
- [89] Azbuka Very — Церковный календарь, «Апостол Варфоломей (Нафанаил)»
- [90] Azbuka Very — Церковный календарь, «Апостол от 70-ти Варнава (Иосия) Медиоланский, Кипрский, епископ»
- [91] Azbuka Very — Церковный календарь, «Святитель Иона Московский, митрополит Киевский и всея Руси»
- [92] Azbuka Very — Церковный календарь, «Апостол Иуда Иаковлев (Леввей, Фаддей), брат Господень»
- [93] Azbuka Very — Церковный календарь, «Святитель Иов, патриарх Московский и всея Руси»
- [94] Azbuka Very — Церковный календарь, «Пророк Предтеча и Креститель Господень Иоанн»
- [95] Azbuka Very — Церковный календарь, «Блгвв. кн. Петр (в иночестве Давид) и кн. Феврония (в иночестве Евфросиния), Муромские чудотворцы»
- [96] Azbuka Very — Церковный календарь, «Апостол Петр (до призвания Симон)»
- [97] Azbuka Very — Церковный календарь, «Апостол Павел»
- [98] Azbuka Very — Церковный календарь, «Cтрастотерпцы Николай II Романов, император Российский, Александра, императрица Российская, Алексий, цес
- [99] Azbuka Very — Церковный календарь, «Преподобный Андрей Рублев, иконописец»
- [100] Azbuka Very — Церковный календарь, «Благоверный великий князь Андрей Боголюбский»
- [101] Azbuka Very — Церковный календарь, «Преподобный Афанасий Афонский, игумен»
- [102] Azbuka Very — Церковный календарь, «Преподобномученица Елисавета Феодоровна, Алапаевская»
- [103] Azbuka Very — Церковный календарь, «Преподобный Антоний Печерский»
- [104] Azbuka Very — Церковный календарь, «Равноапостольная Ольга (в Крещении Елена)»
- [105] Azbuka Very — Церковный календарь, «Преподобный Никодим Святогорец»
- [106] Azbuka Very — Церковный календарь, «Св. равноапостольный князь Владимир»
- [107] Azbuka Very — Церковный календарь, «Житие пророка Илии Фесвитянина»
- [108] Azbuka Very — Церковный календарь, «Равноапостольная Мария Магдалина, мироносица»
- [109] Azbuka Very — Церковный календарь, «Благоверный князь Борис (в Крещении Роман), страстотерпец»
- [110] Azbuka Very — Церковный календарь, «Великомученик Пантелеимон целитель»
- [111] Azbuka Very — Церковный календарь, «Мученик Иоанн Воин»
- [112] Azbuka Very — Церковный календарь, «Блаженный Василий Московский, Христа ради юродивый»
- [113] Azbuka Very — Церковный календарь, «Апостол Матфий»
- [114] Azbuka Very — Церковный календарь, «Святитель Тихон Задонский, епископ Воронежский»
- [115] Azbuka Very — Церковный календарь, «Преподобный Александр Свирский, игумен»
- [116] Azbuka Very — Церковный календарь, «Преподобный Иосиф Волоцкий (Волоколамский), игумен»
- [117] Azbuka Very — Церковный календарь, «Преподобный Кирилл Белоезерский, игумен»
- [118] Azbuka Very — Церковный календарь, «Преподобный Серафим Вырицкий (Муравьев), иеросхимонах»
- [119] Azbuka Very — Церковный календарь, «Преподобная Евфросиния Полоцкая (до крещения княжна Предислава), игумения»
- [120] Azbuka Very — Церковный календарь, «Праведные Иоаким и Анна, родители Пресвятой Богородицы»
- [121] Русская Православная Церковь — «Православный церковный календарь» 2026 (Издательство Московской Патриархии), versão em linha: menológio diár
- [123] Православная энциклопедия, «Марк Евгеник» (т. 43, с. 685–693)
- [124] Православная энциклопедия, «Герман» (прп. Аляскинский; т. 11, с. 223–225)
- [125] Православная энциклопедия, «Аляскинская (Кадьякская) миссия»
- [126] Православная энциклопедия, «Ольга»
- [127] Православная энциклопедия, «Ксения Петербургская»
- [128] Православная энциклопедия, «Павел» (апостол)
- [129] Православная энциклопедия, «Симеон Столпник (Старший)»
- [130] Православная энциклопедия, «Иов» (прп. Почаевский)
- [131] Православная энциклопедия, «Димитрий» (свт. Ростовский)
- [132] Православная энциклопедия, «Арсений» (Мацеевич)
- [133] Православная энциклопедия, «Александр Ярославич Невский»
- [134] Православная энциклопедия, «Андрей Первозванный»
- [135] Православная энциклопедия, «Савва Освященный»
- [136] Православная энциклопедия, «Евфимий Великий» (т. 17, с. 442–448)
- [137] Православная энциклопедия, «Даниил Александрович»
- [138] Православная энциклопедия, «Иоанн Мавропод»
- [139] Православная энциклопедия, «Елисавета Феодоровна»
- [140] Православная энциклопедия, «Нил» (прп. Сорский)
- [141] Православная энциклопедия, «Димитрий Иоаннович» (царевич Угличский)
- [142] Православная энциклопедия, «Андрей Рублёв»
- [143] Коммерсантъ (Екатеринбург), «Екатеринбургская епархия объяснила передачу земли, где нашли царские останки», 27.07.2026
- [144] Православная энциклопедия, «Иов» (патриарх Московский)
- [145] Православная энциклопедия, «Никон» (патриарх)
- [146] Православная энциклопедия, «Амвросий» (прп. Оптинский)
- [147] Православная энциклопедия, «Керкирская, Паксийская и Заморских островов митрополия»
- [148] Православная энциклопедия, «Мария Египетская» (т. 43, с. 545–557)
- [149] Православная энциклопедия, «Игнатий» (Брянчанинов)
- [150] Православная энциклопедия, «Иоанн Кронштадтский»
- [151] Православная энциклопедия, «Иннокентий» (Вениаминов)
- [152] Православная энциклопедия, «Паисий» (Величковский)
- [153] Православная энциклопедия, «Вышенский в честь Успения Пресвятой Богородицы женский монастырь»
- [154] Православная энциклопедия, «Никодим Святогорец»
- [155] Православная энциклопедия, «Григорий Палама»
- [156] Православная энциклопедия, «Белгородская и Старооскольская епархия»
- Ponomar — github.com/typiconman/ponomar (GPL v3), `Ponomar/languages/cu/xml/lives/*.xml`, commit 0af645f (2025-08-17).
- Hapgood, I. F., *Service Book of the Holy Orthodox-Catholic Apostolic (Greco-Russian) Church*, Boston, 1906 (domínio público).
- azbyka.ru/days/AAAA-MM-DD — só conferência do texto atual dos tropários (consultado 2026-10-17).
