# QA de conteúdo — subfase 2c (Saltério eslavo)

> Decisão 49, frente (2) «conteúdo». Verificação de 2026-10-17 sobre `data/oracoes/salterio-antes.json` e `salterio-01.json` … `salterio-20.json` (3498 blocos: 2615 versículos + `sl-071-fim`, 214 títulos, 642 orações, 26 rubricas), à luz de `data/salterio/_fontes/FONTES-salterio.md`, `docs/esquema-oracoes.md` (Saltério) e das decisões 2, 62, 64, 69 e 72.
> **Os ficheiros de dados não foram editados.** Todas as correções estão em [`fase2c-conteudo-patch.json`](fase2c-conteudo-patch.json): **67 entradas** `{ficheiro,id,campo,de,para,motivo,fonte}` (36 `cu`, 7 × `pt`/`ru`/`uk`/`en`, 3 `nota`), geradas a partir dos valores atuais; cada par (id, campo) aparece uma só vez. A aplicação das 67 entradas foi simulada sem erros sobre cópias dos ficheiros, e o eslavo resultante passa o *lint* ortográfico/acentual (`c2/lint.py`).

## 0. Fontes e método

| Código | Fonte | Uso nesta verificação |
|---|---|---|
| **PON** | Ponomar, `languages/cu/bible/elis/Psalm.text` (commit `0af645f`), convertido com o conversor da 2c (`scratchpad/c2/conv.py`, `align.py`, regras de `psalter.py`) | Comparação palavra a palavra (letra + acento + maiúscula) de **todos** os versículos; corpus completo do Ponomar (`languages/cu`) como dicionário de acentos eslavos |
| **CSLE** | `data/salterio/_fontes/cu-civil-elizabeth.json` | Comparação palavra a palavra (sem acento/ortografia) de todos os versículos numerados; grelha |
| **G1874** | Transcrição P1874 dos Sl 1–45 (`scratchpad/agA/tr/k01–k06.txt`) | Comparação com os dados (Sl 1–45) |
| **P1874** | Digitalização *Псалтирь [Слѣдованная]*, Почаевъ 1874 (`scratchpad/agA/dl/poch/nNNN.jpg`) | **Só** para decidir discrepâncias (≈60 recortes pequenos) e para 10 Glórias por amostragem |
| **AZ** | azbyka.ru, «Псалтирь по кафизмам с ударениями» (`agA/dl/az_kaf.txt`), textos depois das catismas (`c2/az_end_NN.txt`), «Кафизма», «О чтении Псалтири по усопшим» | **Só verificação** (dec. 2/62): acentos dos versículos; texto e acentos dos tropários e orações depois das catismas; ordem das orações iniciais |
| **T1907** | *Православный толковый молитвословъ*, 1907, p. 19 (OCR) | Regra do «Помяни» |

Automatização: `scratchpad/qa2c/a1.py` (dados × Ponomar convertido), `a2.py`/`a3.py` (léxico ѣ/е/і e janelas de ѣ), `a4.py` (lint), `a5.py` (coerência de acentos no corpus), `a6.py` (textos depois das catismas × AZ), `a7.py` (acentos dos versículos × AZ), `b1.py` (estrutura), `mkpatch.py` (patch).

## 1. Resumo

| Verificação | Âmbito | Resultado |
|---|---|---|
| Versículos × Ponomar convertido | 2615 vv. | Sl 46–151: **idênticos** (só 22 maiúsculas de nomes próprios nos sobrescritos, intencionais). Sl 1–45: 43 maiúsculas, 11 ortografia, 4 acento, 3 leitura → §2.1 |
| Versículos × CSlElizabeth | 2529 vv. numerados | 23 diferenças, todas já decididas (gralhas da CSlE, sobrescritos 10,1/16,1) salvo 45,10 → patch |
| Versículos × transcrição 1874 | 730 vv. (Sl 1–45) | 11 diferenças = as uniformizações documentadas em FONTES §2.1 |
| Acentos | todos os blocos | Todos os polissílabos com exatamente 1 acento; monossílabos sem acento (exceções: `salterio-antes-16` «всѣ́мъ», herdado de `defuntos-panikhida-27`). Acentos × Ponomar: 4 divergências (Sl 1–45). Acentos dos versículos × AZ: 42 divergências, nenhuma corrigida (§2.2) |
| Ortografia pré-reforma | todos os blocos | *Lint* sem erros (і antes de vogal, ъ final, ж/ш/ч/щ + а). Léxico ѣ/е: **3 erros de ѣ** (141,7; k04-p-19; e os de transcrição dos Sl 1–45, §2.1) |
| Estrutura | 20 catismas, 60 Glórias, grelha | Conforme com `CATISMAS` do motor, com a divisão corrente e com o P1874 (10 Glórias conferidas na imagem) |
| Sobrescritos | 86 v = 0 + 69 numerados + `sl-071-fim` | Bandeiras corretas (verificação independente Ponomar v0 × CSLE); 4 maiúsculas indevidas → patch |
| Textos depois das catismas (P1874) | K1–K20 | **Muitos erros de transcrição** confirmados na imagem: K1–K5 (1.ª fase) e K10 (2c) → 21 blocos no patch (§3.2–3.3) |
| Orações iniciais, Glórias, modo defuntos | `salterio-antes`, `kNN-g*`, `quando` | Conforme P1874 e AZ; blocos reaproveitados idênticos às origens (558/558); 3 pontos para decisão (§4) |

**Entradas do patch por tipo:** ortografia/leitura/acento de versículos 11 (9 dos Sl 1–45, 141,7, 109,0); maiúsculas de sobrescritos 4; textos depois das catismas 21 blocos `cu` (leituras, acentos e o tom da K4); traduções que acompanham mudanças de sentido 28 (k02-p-12, k03-p-12, k04-p-08, k04-p-11, k05-p-10, k05-p-11, sl-109-00 × 4 línguas); notas 3.

## 2. Versículos

### 2.1 Sl 1–45 (transcrição P1874) — diferenças com o Ponomar, decididas

| Versículo | Dados | Ponomar | Imagem P1874 | Decisão |
|---|---|---|---|---|
| 9,9; 32,8 | вселе́нней | вселе́ннѣй | n041, n077: **вселе́ннѣй** | erro de transcrição → patch |
| 9,29 | призира́ете | призира́етѣ | n043: **призира́етѣ** | erro → patch |
| 10,4 | призира́ете, испыта́ете | -етѣ, -етѣ | n045: **-етѣ** (duais) | erro → patch |
| 18,4 | ре́чи | рѣ́чи | n055: **рѣ́чи** | erro → patch |
| 19,8 | ко́нѣхъ | ко́нехъ | n057: **ко́нехъ** | erro → patch |
| 37,4 | костѣ́хъ | косте́хъ | n088: **ко́стехъ/косте́хъ** (е) | erro → patch (acento do Ponomar) |
| 30,11 | изче́зе | изчезе́ | n072: acento ilegível | patch → «изчезе́» (Ponomar, AZ, e 72,26; 106,5; 142,7 da app) |
| 45,10 | конце́въ | коне́цъ | P1874 «конце́въ» | patch → «коне́цъ» (dec. 72: base isabelina; dec. 62: AZ igual) — **resolve FONTES ⚠1** |
| 17,12; 17,29; 34,6 | тму, тма | тьму, тьма | P1874 «тму/тма» | mantém-se: o Saltério atual (AZ) também «тму» (17,12; 17,29; 103,20; 104,28). Só incoerência gráfica com os Sl 46–151 (Ponomar «тьма») — opcional |
| 21,27 | жива́ | жи́ва | n061: **жива̀** | mantém-se (= AZ) |
| 36,40 | изме́тъ | и́зметъ | — | mantém-se (= AZ «изме́т») |
| 45,5 | Рѣ́чная | Рѣчна́я | n101: **Рѣ́чная** | mantém-se (= AZ) |
| 36,36 | ми́мо идо́хъ | мимоидо́хъ | n086: duas palavras | mantém-se (regra 9 das FONTES) |
| 16,1 | (sobrescrito em v = 0) | «Моли́тва Дави́ду» no v. 1 | — | mantém-se; as traduções de 10,0/10,1 e 16,0/16,1 **já estão repartidas** (FONTES ⚠8 resolvido) |

Os erros ѣ↔е da transcrição dos Sl 1–45 só são visíveis onde o Ponomar difere; como toda a letra dos Sl 1–45 coincide com o Ponomar fora destes casos, não há outros por detetar desta classe.

### 2.2 Acentos dos versículos × texto atual (AZ)
42 divergências em 2615 versículos (lista em `scratchpad/qa2c/a7.json`). Todas são acentos da Bíblia isabelina/P1874 diferentes da edição sinodal corrente (ex.: 9,31 преклони́тся/прекло́нится; 26,2 изнемого́ша/изнемо́гоша; 59,5 же́стокая/жесто́кая; 106,10 нището́ю/нище́тою; 151,6 и́долы/идо́лы) ou faltas de acento/gralhas do AZ (88,50 «Давиду́», 134,16 «возлаго́лют»). **Nenhuma corrigida**: dec. 72 fixa a base isabelina e os dados seguem fielmente o Ponomar/P1874.

Diferenças textuais isabelina × Saltério atual (informativas, sem patch, coerentes com a dec. 72): 46,5 достоя́нія; 59,9; 62,5; 74,7; 76,20 (Твоя́/Твои́ trocados); 77,18 воспроси́ти; 93,23 «Богъ» (AZ «Богъ нашъ»; o P1874, img. n183, também traz «нашъ» só na margem, como o Ponomar `{на́шъ}`); 103,25 и́хже; 106,12 помага́яй; 108,31 преста́; 143,5 преклони́.

### 2.3 Ortografia
- 141,7 «укрепи́шася» → **«укрѣпи́шася»** (gralha do Ponomar «ᲂу҆крепи́шасѧ»; raiz крѣп-; 68,5 e todos os outros ficheiros com ѣ) → patch.
- ѳ/ѵ/ф: todas as formas conferidas (Аса́фъ, Іо́сифъ, Ефре́мъ, Голіа́ѳъ, Егѵ́петъ, Моѵсе́й, Смѵ́рна, Ѳа́воръ…) estão corretas. Nota: os outros ficheiros da app escrevem «Еги́петъ/еги́петскія» (act-042, oficio-035) — incoerência entre ficheiros, fora do âmbito.
- `salterio-antes-09` usa «всё» (ё não pertence à ortografia pré-1918); vem de `noite-024`, idêntico por construção — corrigir na origem se se quiser (fora do patch).

### 2.4 Maiúsculas nos sobrescritos
4,1; 5,1; 8,1 «Псало́мъ Дави́ду» e 60,1 «Дави́ду Псало́мъ» a meio do sobrescrito → minúscula (os outros 80 sobrescritos e o P1874, img. n039, têm minúscula) → patch.

## 3. Textos que não são versículos

### 3.1 Estrutura
- `CATISMAS` (`src/engine/oracoes.js`) = intervalos dos ficheiros; 151 salmos, 2529 vv. numerados, 86 v = 0, ids no formato do esquema (118 com 3 algarismos a partir do v. 100), sem duplicados.
- 60 Glórias = tabela de FONTES §5 = divisão corrente (AZ «Кафизма»). **10 conferidas na imagem P1874**: n045 (K2/1), n063 (K3/3), n080 (K5/1), n110 (K7/2), n133 (K9/2), n162 (K11/2), n197 (K14/2), n228 (K17/1, 118,72), n244 (K18/2), n267 (K20/2) — todas certas, e os sobrescritos seguintes (Sl 11, 34, 51, 68, 81, 104, 129, 148) coincidem com os dados.
- Fórmula da Glória (`kNN-gM-01…05`, «Аллилуіа…» e «Господи, помилуй» com `repetir: 3`) = AZ «Кафизма» (Skabalánovitch).
- Sobrescritos: v = 0 todos com `sobrescrito: true`; os 69 numerados marcados coincidem exatamente com o conjunto calculado de forma independente (Ponomar v0 ↔ v. 1(–2) da CSLE); 50,1–2, 51,1–2, 53,1–2, 59,1–2 corretos.
- `salterio-antes`: ordem e textos = P1874 (img. n029–n030) e AZ; «Слава Тебѣ, Боже нашъ» acrescentado (dec. 62) conforme o AZ. Blocos reaproveitados: 558, todos idênticos às origens nas 5 línguas.

### 3.2 Tropários e orações depois das catismas — erros de transcrição
A comparação automática com o AZ (texto atual) deu ~110 pontos; os não triviais foram decididos na imagem P1874. **Resultado: a transcrição dos textos depois das catismas não é fiável** — nas K1–K5 (1.ª fase) há leituras que não estão nem no P1874 nem no texto atual (p. ex. todo o theotokion da K3), e na K10 (2c) os particípios em -яй foram normalizados. Corrigido no patch (a leitura do P1874 coincide em todos estes casos com o texto atual):

| Bloco | Dados → P1874 (img.) |
|---|---|
| k01-p-19 | Сло́ва **Отче́** → **Оте́цъ**; Испусти́тел**ю** → Испусти́тел**ь**; вне́млющ**и** → вне́млющ**е**; **пройти́** → **прейти́**; жи́тія → житія́ (n040) |
| k02-p-12 | Сы́на Твоего́ **Моле́бнице** → **моли́, Богоро́дице** (n051) + traduções |
| k03-p-10 | **во** прегрѣше́ніихъ → **въ**; возопі́й **Го́сподеви** → **Го́споду** (n063) |
| k03-p-11 | **разгнѣта́ются** → **разгиба́ются**; всенаро́дн**ѣ**мъ → всенаро́дн**о**мъ (n063) |
| k03-p-12 | **Богоро́дице** → **Влады́чице**; **зачала́** → **заче́нши**; **облече́ннаго** → **обложе́ннаго**; Его́же **чтя** → Его́же, **Чи́стая**; моли́ **спасти́ся всѣмъ пою́щимъ** Тя → моли́ **спасти́ вся пою́щыя** Тя (n063) + traduções |
| k04-p-10 | **корми́теля** → **окорми́теля** (n075) |
| k04-p-11 | въ **небе́сный черто́гъ** → въ **невѣ́стникъ**; **укра́сивше свѣщи́** → **уясни́вше свѣщы́** (n075) + traduções |
| k04-p-12 | Го́сподеви → Го́споду (n075) |
| k04-p-19 | **ти́ми** → **и́ми**; **неукори́зненный** → **неуко́рный**; безчелов**е́**чное → безчелов**ѣ́**чное (n076) |
| k05-p-10 | **окая́нный** → **отча́янный** (n087) + traduções |
| k05-p-11 | всегда́ **моля́ся** → **моли́ся** (n087) + traduções |
| k05-p-18 | нечи́стымъ **ду́хомъ** → **духово́мъ** (n087) |
| k10-p-18 | **ве́ргаю** → **вверга́ю**; каса́**яся** → каса́**яйся**; исповѣ́да**я** → исповѣ́да**яй**; сл**а**ца́емь → сл**я**ца́емь; объи́ми → объими́ (n151–n152) |

Acentos corrigidos (P1874 ilegível; decididos pelo uso eslavo do corpus Ponomar e/ou pelo texto atual): Тяготы́, часа́ (k01-p-10); житія́ (k01-p-12, k01-p-19, k04-p-10, k05-p-10); украси́, Благі́й (k03-p-19); соприча́стницы (k04-p-11); Благо́му, сле́зы, Благі́й ×2, чужде́му (k04-p-19); до́брая (k05-p-11); Ко́е ×2, плотски́ми, благо́ю (k10-p-18); плотскі́я (k11-p-18); же́стокаго (k18-p-18); страстьми́ (k19-p-18); и́но (k20-p-18).

Conferidos na imagem e **certos nos dados** (variantes do P1874, mantidas): k04 «имѣ́я» e «проити́»; k06-p-18 «не явле́нныхъ» (2 palavras); k10-p-09 «боя́ся»; k11-p-18 «къ»; k13-p-11 «имѣ́я»; k13-p-18 «да́руй»; k14-p-09 «въ мѣ́сто»; k14-p-18 «Бо́же нашъ, спасе́ній»; k15-p-09/10 (com «и», «мнѣ»); k17-p-18 «дней» (P1874 «дне́й») e «тмы»; k19-p-10 «прегрѣши́хъ»; k19-p-18 «Твои́ми»; k20-p-18 «ви́дѣвъ»; K1 tropários (n039–n040) e K2 tropários.

Não verificáveis (acento, P1874 ilegível, sem forma no Ponomar; mantidos): k03-p-19 «никако́же» (AZ «ника́коже»; k10-p-18 tem «ника́коже» — incoerência interna), k11-p-10 «Мыта́реву», «тако́вомъ», k17-p-10 «мыта́ревымъ» (AZ «Мытаре́ву», «таково́мъ», «мытаре́вымъ»).

### 3.3 Tons dos tropários
P1874 = AZ em 19 catismas. **K4**: P1874 «гласъ д҃» (img. n075, conferido), AZ tom 7 → patch para **tom 7** pela dec. 62 (texto atual, nota com a variante) — **resolve FONTES ⚠2, confirmar**.

### 3.4 Pontos ⚠ das FONTES

| ⚠ | Decisão |
|---|---|
| 1. 45,10 конце́въ | → «коне́цъ» (§2.1), patch |
| 2. K4 tom 4 × 7 | → tom 7 (dec. 62), patch, **confirmar** |
| 3. Sl 109 v = 0 | → «Псало́мъ Дави́ду.» (dec. 62: AZ; LXX «Τῷ Δαυιδ ψαλμός»), patch com traduções e nota |
| 4. Sl 151 «150» | mantém-se: é a leitura do Saltério atual (AZ «вне числа́ 150 псалмо́в … на Голиа́фа»); «р҃н» é só a notação numérica eslava |
| 5. Posição de «Помяни» e «Глубиною» | **para o utilizador** (§4) |
| 6. Leitura dos sobrescritos | fica para o clero (sem norma encontrada) |
| 7. Sobrescritos 46–151 × P1874 | colacionados indiretamente com o AZ (que = P1874 nas amostras): só diferem 41,1, 43,1, 111,0 (a isabelina sem «не надпи́санъ у евре́й» / com «псаломъ» / sem «Агге́ово и Заха́ріино») — segue-se a isabelina por instrução do projeto (notas já existentes); 109 corrigido acima |
| 8. Traduções 10,1 e 16,1 | já repartidas — resolvido |

## 4. Decisões pedidas ao utilizador

1. **Conflito dec. 62 × FONTES §6.** As FONTES dizem «segue-se o P1874» nas diferenças de redação dos textos depois das catismas; a dec. 62 manda seguir o texto atual com nota. O patch só corrige **erros de transcrição** (onde o P1874 já coincide com o texto atual) e aplica a dec. 62 ao tom da K4 e ao Sl 109. Ficam por decidir estas variantes genuínas do P1874 (P1874 → texto atual): k10-p-09 «боя́ся» → «боя́йся»; k13-p-11 «имѣ́я» → «имѣ́яй»; k13-p-18 «да́руй намъ» → «да́руяй намъ»; k14-p-09 «въ мѣ́сто» → «вмѣ́сто»; k14-p-18 «Го́споди Бо́же нашъ, спасе́ній на́шихъ» → «Го́споди Бо́же спасе́ній на́шихъ»; k15-p-09 «спаси́ мя» → «и спаси́ мя»; k15-p-10 «мысль мнѣ» → «мысль ми»; k11-p-18 «къ благоугожде́нію» → «ко»; k12-p-18 «неискуше́нъ» → «не искуше́нъ»; k06-p-18 «не явле́нныхъ» → «неявле́нныхъ»; k17-p-18 «дней», «тмы» → «дній», «тьмы»; k19-p-10 «прегрѣши́хъ» → «прегрѣши́въ»; k20-p-18 «ви́дѣвъ» → «ви́дѣхъ»; e os 4 acentos não verificáveis de §3.2. Recomendação: aplicar a dec. 62 (são poucos e o sentido quase não muda; «прегрѣши́въ» e «ви́дѣхъ» pedem revisão das traduções).
2. **«Помяни, Господи» na Glória** (`kNN-gM-04`, antes do «Слава… и нынѣ» final): T1907 diz só «послѣ каждой «Славы»» e o AZ «На каждой Славе»; nenhuma fonte fixa o ponto. A alternativa corrente em Saltérios para leigos é «Слава Отцу…» → «Помяни…» → «И нынѣ…» (exige partir a fórmula). Sem fonte PD, mantém-se.
3. **«Глубиною мудрости»** (`salterio-antes-16`) depois do Pai-Nosso e antes dos tropários «Помилуй насъ»: o AZ só diz «с предначинательных молитв и тропаря «Глубиною мудрости»»; não se sabe se substitui os tropários de tom 6. Mantém-se.
4. **Acento «надежди́» no «Помяни»** (`defuntos-panikhida-49`, reproduzido nos 60 blocos `kNN-gM-04`): o eslavo corrente acentua «въ наде́жди» (Ponomar ×8, 0 «надежди́»; também k07-p-11 «въ наде́жди» nos dados). Recomenda-se conferir na fonte PD do bloco (MS1900 pp. 536–537 / Требникъ) e corrigir na origem e nas 60 cópias — fora deste patch por ser bloco de outra subfase.
5. Informativo: `sl-071-fim` fica antes da Glória «como pedido», mas o P1874 (n142) e o AZ imprimem-no depois do «Слава:»; não há orações depois de todo o Saltério (o AZ tem «Достойно есть…», sem fonte PD) — coerente com FONTES.

## 5. Para atualizar em `FONTES-salterio.md` (sessão principal)
§2.1 (erros ѣ/е da transcrição e 45,10), §6 (tom da K4 e erros corrigidos nos textos depois das catismas), §8 (⚠1–4 e 8 resolvidos; ⚠2/3 por dec. 62).
