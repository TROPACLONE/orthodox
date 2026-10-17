# Fontes — santos do dia (`dia.json`)

> **Âmbito:** lista diária completa das comemorações do ano juliano (chaves `MM-DD` OS, 01-01…12-31, incluindo 02-29) e comemorações móveis com regra explícita, segundo a prática da IOR (Patriarcado de Moscovo). Decisões 2, 8, 19, 28, 30, 39, 43, 76, 77.
> **Compilação:** 2026-10-17 (Fase 3, «rápida, só o essencial»). **Ficheiro:** `data/santos/dia.json` — 366 dias, **2711 comemorações fixas**, **17 móveis**.
> **Licença:** a lista diária e os nomes eslavos derivam do **Ponomar** (GPL v3) — dados derivados em GPL v3, com atribuição (dec. 76, exceção à dec. 8).
> **Scripts** (não fazem parte da app): `scratchpad/S1/scripts/` — `01-extrair.mjs` (Ponomar → `raw.json`), `02-cu.py` (eslavo → ortografia civil pré-reforma, conversor `scratchpad/c2/` + regras de títulos hagiográficos), `ru.mjs` (genitivo eslavo → nominativo russo, estilo do calendário), `trad.mjs` + `nomes.mjs` (UK/PT/EN por regras + dicionários), `extra.mjs` (acrescentos, correções, móveis), `03-construir.mjs`, `05-escrever.mjs`, verificações `04-verificar.mjs` e `06-verif-typikon.mjs`.

---

## 1. Esquema

```json
{"fixos": {"MM-DD": [{"id", "cu", "ru", "uk", "pt", "en", "grau", "tipo", "ponomar_id?"}]},
 "moveis": [{"id", "regra", "cu", "ru", "uk", "pt", "en", "grau", "tipo"}],
 "_fontes": ["…"]}
```

- **`id`** — se a comemoração existe em `data/menaion/graus.json`, é exatamente esse id (205 entradas, todas presentes no mesmo dia). Senão, *slug* ASCII do nome PT (sem títulos/preposições, máx. 6 palavras); em colisão com outro dia, sufixo `-MMDD`. Únicos em todo o ficheiro.
- **`grau`** (= `grau_atual` de `graus.json`): `grande | vigilia | polieleo | doxologia | seis | null`. Regra: (1) entradas de `graus.json` → `grau_atual`; (2) restantes → grau do Ponomar (`SERVICE Type`: 8/7/6 grande, 5 vigília, 4 polieleo, 3 doxologia, 2 seis estiqueras, 1/0 → `null`), **limitado a `seis`**, porque `graus.json` é a lista completa das doxologias e superiores na prática atual (23 casos rebaixados, §6.2).
- **`tipo`**: `senhor | theotokos | icone | santo | sinaxe | outro` (`mae_de_deus` de `graus.json` → `theotokos`). Fora de `graus.json`: «икона» → `icone`; «Собор…» → `sinaxe`; pessoa ou evento de um santo (relíquias, trasladação) → `santo`; festas/pré-/pós-festas do Senhor e da Mãe de Deus pela palavra-chave; resto (Ano Novo, dedicação de igrejas, sábado dos defuntos) → `outro`.
- **Ordem** dentro do dia: por grau (principal primeiro), depois a ordem do Ponomar (= ordem do Menaion/calendário).
- **`ponomar_id`** — `CId` do Ponomar (`languages/cu/xml/MM/DD.xml` / `lives/<id>.xml`), quando a entrada vem de lá (2695).
- **`regra`** (móveis): `{"pascoa": n}` = Páscoa + n dias; `{"dia_semana": 0|6, "de": "MM-DD", "ate": "MM-DD", "nota"?}` = o primeiro domingo (0) ou sábado (6) no intervalo juliano inclusivo.

## 2. Nomes

| Campo | Forma |
|---|---|
| `cu` | Cabeçalho do Menaion/Месяцеслов em **eslavo, ortografia civil pré-reforma com acentos** (como os `cu` de `data/oracoes`), convertido do eslavo autêntico do Ponomar pelo conversor de `scratchpad/c2/` (+ 40 regras de títulos: сщмч҃, мч҃ник, прпⷣб, архіепⷭ҇копъ, бцⷣа…). **Mantém o genitivo do cabeçalho** («Свята́го му́ченика…», «Преподо́бнаго…») e os anos foram retirados; nomes próprios capitalizados segundo o `ru`. Para as 8 entradas de `graus.json` sem par no Ponomar e para os acrescentos, `cu` escrito à mão na mesma ortografia. |
| `ru` | Russo moderno, **nominativo**, abreviaturas do calendário oficial: «Прп. Серафим Саровский», «Свт. Петр, митр. Московский», «Обретение мощей прп. Сергия Радонежского» (eventos: dependentes em genitivo). Entradas de `graus.json`: o `cu` desse ficheiro (já em russo civil, nominativo). Restantes: gerado por regras (genitivo→nominativo, protecção de genitivos regidos por preposição/parentesco/«Божией Матери»). |
| `uk` | Ucraniano, uso da IOU (dec. 30): formas eclesiásticas (Іоанн, Фома, Василій, Михаїл; Миколай, Петро, Павло, Олена). Gerado do `ru` por regras: ы→и; и→і no início, antes de vogal/й; и→ї depois de vogal; Е- inicial→Є; ъ→ʼ; -ей→-ій; -ец→-ець; adjetivos -ский→-ський, -цкий→-цький, -ная→-на…; léxico (єп., архієп., пресвітер, диякон, ігумен, Знайдення/Перенесення мощей, Передсвято, Посвято, Віддання, Божої Матері). |
| `pt` | Regras fixas de transcrição (§3) + forma portuguesa tradicional dos nomes conhecidos (dec. 19; dicionário de ~450 nomes e ~200 epítetos/topónimos em `nomes.mjs`). Entradas de `graus.json`: o `pt` desse ficheiro, com o «S.» genérico substituído pelo título específico (V., B., Mt.…) quando o nome não o repete. |
| `en` | en-GB (dec. 39): formas tradicionais litúrgicas (Seraphim of Sarov, Sergius of Radonezh, the Kiev Caves) + transcrição (§3). Para as 90 entradas de `graus.json` de festas/eventos o EN foi escrito à mão (`en-graus.json`). |

### 2.1 Abreviaturas de títulos (por língua)

| Título | RU | UK | PT | EN |
|---|---|---|---|---|
| Mártir / mártires | Мч. / Мц. / Мчч. / Мцц. | Мч. / Мц. / Мчч. / Мцц. | Mt. / Mts. | Mart. / Marts. |
| Hieromártir | Сщмч. / Сщмчч. | Сщмч. / Сщмчч. | Hieromt. / Hieromts. | Hieromart. / Hieromarts. |
| Mártir venerável | Прмч. / Прмц. / Прмчч. | Прмч. / Прмц. / Прмчч. | V. Mt. / V. Mts. | Ven. Mart. / Ven. Marts. |
| Grande-mártir | Вмч. / Вмц. | Вмч. / Вмц. | Gr.-Mt. / Gr.-Mts. | Gt Mart. / Gt Marts. |
| Venerável | Прп. / Прпп. | Прп. / Прпп. | V. / VV. | Ven. / Vens. |
| Hierarca (santo bispo) | Свт. / Свтт. | Свт. / Свтт. | S. / Ss. | St / Sts |
| Santo (genérico) | Св. / Свв. | Св. / Свв. | S. / Ss. | St / Sts |
| Apóstolo | Ап. / Апп. | Ап. / Апп. | Ap. / Aps. | Ap. / Aps. |
| Apóstolo e evangelista | Ап. и ев. | Ап. і єв. | Ap. e Ev. | Ap. & Ev. |
| Profeta | Прор. / Прорр. | Прор. / Прорр. | Prof. / Profs. | Proph. / Prophs. |
| Justo | Прав. / Правв. | Прав. / Правв. | J. / JJ. | Rt. / Rts. |
| Bem-aventurado (louco por Cristo) | Блж. | Блаж. | B. / BB. | Bl. |
| Fiel (príncipe) | Блгв. / Блгвв. | Блгв. / Блгвв. | Fiel / Fiéis | Rt-bel. |
| Igual aos Apóstolos | Равноап. | Рівноап. | Ig. Ap. | Eq.-Ap. |
| Confessor | исп. | спов. | confessor | Confessor |
| bispo · arcebispo · metropolita | еп. · архиеп. · митр. | єп. · архієп. · митр. | bispo · arcebispo · metropolita | Bishop · Archbishop · Metropolitan |
| grão-príncipe · príncipe | вел. кн. · кн. | вел. кн. · кн. | grão-príncipe · príncipe | Grand Prince · Prince |

`graus.json` usa em PT o «S.» genérico para todos; mantém-se como forma de «Hierarca/Santo», e as outras abreviaturas ficam reservadas aos títulos específicos. Em `src/i18n` não há títulos hagiográficos abreviados (só «Santos…» por extenso).

## 3. Transcrição do cirílico (nomes sem forma tradicional)

| Cirílico | а б в г д е ё ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы ь э ю я |
|---|---|
| **PT** | a b v g (gu antes de e/i) d e io j z i i c (qu antes de e/i) l m n o p r s (ss entre vogais) t u f kh ts tch ch chtch — y — e iu ia |
| **EN** | a b v g d e (ye inicial/após vogal) yo zh z i y k l m n o p r s t u f kh ts ch sh shch — y — e yu ya |

Terminações: -ий → PT -io / EN -ius (nomes gregos); -ия → -ia; -ей → -ei. Adjetivos de lugar -ский/-цкий → PT «de X» / EN «of X» (X = radical transcrito; -ийский → -ia: Кесарийский → de Kessaria), salvo topónimos do dicionário (Печерский → das Grutas / of the Caves; Московский → de Moscovo / of Moscow; Киевский → de Kiev / of Kiev — forma litúrgica tradicional, dec. 39). Ícones: PT «Ícone da Mãe de Deus de X «Nome»», EN «X Icon of the Mother of God “Name”» (~30 nomes de ícones traduzidos; os outros transcritos).

## 4. Comemorações móveis (`moveis`)

| id | regra (OS) | fonte |
|---|---|---|
| sinaxe-novos-martires-russia | domingo 25–31.01 (em ou depois de 25.01) | Ponomar (float 12); CAN2000 |
| pais-primeiro-concilio | Páscoa + 42 | Triódio |
| todos-os-santos | Páscoa + 56 | Triódio |
| todos-os-santos-da-russia · sinaxe-santos-do-athos | Páscoa + 63 | CAN1918; MP2026 |
| sinaxe-santos-da-bielorrussia · -de-novgorod · -de-pskov | Páscoa + 70 | MP2026 |
| sinaxe-novos-martires-butovo | Páscoa + 27 (4.º sábado) | MP2026 |
| sinaxe-santos-de-tver | domingo 30.06–06.07 | MP2026 |
| pais-seis-concilios | domingo 13–19.07 | Ponomar (float 13); Typikon |
| sinaxe-santos-de-moscovo | domingo 19–25.08 (antes de 26.08) | MP2026 |
| pais-setimo-concilio | domingo 11–17.10 | Ponomar; Typikon |
| sabado-de-demetrio | sábado 19–25.10 | Ponomar (float 9) |
| domingo-antepassados · domingo-santos-pais | domingo 11–17.12 · 18–24.12 | Typikon |
| domingo-depois-natal | domingo 26–31.12 (sem domingo: 26.12) | Typikon |

MP2026 = a data dada pela regra coincide, em 2026, com a do calendário oficial (Páscoa 12.04.2026 NS). As memórias do Ponomar só ao domingo/sábado (`Cmd="dow == …"`) foram retiradas dos fixos e passaram para aqui; S. João de Xangai (06-19) e a Despedida do Encontro (02-09) ficam fixos (prática do PM; `graus.json`).

## 5. Acrescentos e correções ao Ponomar (`extra.mjs`)

- **Canonizações posteriores** (presença no calendário oficial 2026 conferida): S. Paísio Hagiorita, 29.06 (CAN2015 — canonizado pelo Sínodo de Constantinopla em 13.01.2015; número do diário do Santo Sínodo da IOR **não conferido**); Hieromt. Agatângelo de Iaroslavl, 03.10 (CAN2000). Corrigidos nomes do Ponomar: Ig. Ap. Nicolau do Japão, 03.02 (CAN1970, Santo Sínodo, 10.04.1970); Hieromt. Sérgio Metchev, 24.12 (CAN2000). As restantes canonizações do séc. XX (S. João de Kronstadt, S. Matrona, S. Lucas da Crimeia, S. Tikhon, Portadores da Paixão, S. Isabel, Optina, S. Serafim de Vyritsa, S. Silvano…) já estão no Ponomar ou em `graus.json` (chaves CAN* em `FONTES-graus.md`).
- **Lacunas do Ponomar detetadas pelo Typikon (TYP48)**: Prof. Zacarias e J. Isabel (05.09), Gr.-Mt. Teodoro Tiro (17.02), Hieromt. Pancrácio de Taormina (09.07), Apóstolos dos Setenta Herodião, Ágabo e c. (08.04), Dedicação de Constantinopla (11.05), Mt. Longino (16.10).
- Descartadas 111 entradas do Ponomar: notas de transferência (rubricas condicionais `nday`), texto inglês por traduzir, «тезоименитство патриарха», duplicados de 28.02 em ano bissexto (estão em 29.02).
- Entradas de `graus.json` sem par no Ponomar (8, `cu` à mão): 02-09 relíquias de S. Tikhon; 02-23 relíquias de S. Matrona; 05-24 glorificação de S. Xénia; 06-09 ícone da Trindade de Rublev; 07-04 Portadores da Paixão Imperiais; 07-11 relíquias de S. Hilarião (Troitski); 09-28 relíquias de S. Isabel; 10-11 Sinaxe de Optina.

## 6. Verificação

### 6.1 Por amostragem
- **Typikon sinodal, cap. 48 «Месяцеслов»** (pré-1917, domínio público; texto em `scratchpad/tip48.txt`): cabeçalho de **todos os 366 dias** comparado com `dia.json` (3 primeiros nomes próprios de cada cabeçalho, radical de 4 letras): 603/672 = **89,7 %**; das 69 faltas, ~55 são ruído do texto (palavras de rubrica, formas «Мироточца/Мироточивый», «Вакинф/Иакинф») e as lacunas reais foram corrigidas (§5).
- **Calendário oficial do PM 2026** (calendar.rop.ru, só verificação, nada copiado; cache `scratchpad/rop.json`): **34 dias** espalhados de 19.12 a 03.10 OS (1 em cada 9). Comemorações do calendário oficial encontradas em `dia.json`: 205/250 = **82 %**. As faltas são sobretudo listas de novos mártires com apelido (o Ponomar dá muitas vezes só «Сщмч. Иоанн пресвитер»), alguns ícones locais (Шуйская, Югская, «Воспитание»), sinaxes locais fixas (Калужских, Липецких, Холмских) e santos gregos/georgianos acrescentados recentemente (Анфим Хиосский, Шио Мгвимский); S. Porfírio Kavsokalyvitis (02.12 NS) não está no Ponomar e fica fora do período verificado — a conferir.

### 6.2 Diferenças em relação a `graus.json` (dados do Ponomar vs `grau_atual`)
`dia.json` usa sempre o id, a data e o `grau_atual` de `graus.json`; nenhuma data diverge. Diferenças de **grau** entre o Ponomar e `grau_atual` (63 das 205), por exemplo: Ponomar sem sinal → polieleo (34, sobretudo santos russos glorificados depois: Irinarco de Rostov, Marcos de Éfeso, Máximo o Grego, Xénia…); doxologia → polieleo (8: Zósimo, Pafnúcio de Borovsk, Antão das Grutas, Alexandre Nevski…); polieleo → vigília (S. Jorge, ícones de Vladimir 21.05 e de Kazan 08.07); sem sinal → grande (Exaltação, Proteção, Apresentação da Mãe de Deus: falha do Ponomar); seis → `null` (Pantaleão, Parasceva da Sérvia); 40 Mártires e 13.12: polieleo → `null`.
Entradas do Ponomar com doxologia ou mais **sem** entrada em `graus.json` (rebaixadas a `seis`; a rever): 01-18 Cirilo e Maria de Radonej (pais de S. Sérgio); 03-26 e 07-13 Sinaxe do Arcanjo Gabriel; 03-31 S. Jonas de Moscovo; 06-28 Sérgio e Germano de Valaam e ícone «Três Mãos»; 07-12 ícone «Três Mãos»; 08-08 trasladação de Zósimo e Savácio; 08-14 Teodósio das Grutas; 08-28 relíquias de Job de Potchaiv; 08-30 Alexandre de Svir e relíquias de Daniel de Moscovo; 08-31 Cinto da Mãe de Deus; 09-11 Sérgio e Germano de Valaam; 10-07 Jonas de Hankou; 10-12 Cruz de Malta em Gatchina; 10-18 relíquias de José de Volokolamsk; 10-19 S. João de Kronstadt; 11-09 ícone «Pronta a Ouvir»; 11-27 Sinal (2.ª entrada); 11-28 Hieromt. Serafim (Tchitchagov); 12-12 S. Espiridão; S. Germano do Alasca.

## 7. Limitações conhecidas
- `ru`/`uk`/`pt`/`en` das ~2500 memórias menores são **gerados por regras** a partir do cabeçalho eslavo: corretos na grande maioria, mas há cabeçalhos do Ponomar com sintaxe eslava que ficam literais («к Севастийстем Езере», «Антиохия Великия») e nomes gregos raros só transcritos. O `cu` é a referência.
- Os novos mártires aparecem como no Ponomar (muitas vezes sem apelido); a lista do calendário oficial atual é mais extensa.
