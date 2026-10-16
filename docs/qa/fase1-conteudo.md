# QA de conteúdo — fase 1 (calendário, jejum, leituras)

> Decisão 49, frente (2) «conteúdo». Verificação feita a 2026-10-16 sobre o motor (`src/engine/*`) e os dados (`data/*`).
> Só se compararam referências (livro + zachalo/versículos), graus e níveis — nenhum texto foi copiado das fontes de verificação (dec. 43).
> Fixture e teste de regressão: `tests/referencia-leituras.json` + `tests/referencia.test.mjs` (ainda **não** ligado ao `npm test`; ver §9).

## 0. Fontes

| Código | Fonte | Uso |
|---|---|---|
| **OF26** | Издательство Московской Патриархии, *Православный церковный календарь 2026*, `calendar.rop.ru/?idd=N` (publicado até 31.10.2026) | referência oficial: 304 dias (01.01–31.10.2026) |
| **AZ** | azbyka.ru/days/AAAA-MM-DD (calendário diário; leituras, glas, semana, «Поста нет», ideogramas) | 431 dias (lista abaixo) + 20 dias avulsos |
| **AZT** | azbyka.ru/days/p-kalendar-postov-i-trapez («Календарь постов», tabela por dia da semana — a ligação «Постный календарь» de cada dia) | camada paroquial do jejum |
| **AZA** | azbyka.ru/o-postax-i-trapezax («О постах и трапезах», doc. 02 [16]) | camada paroquial do jejum |
| **AND** | А. А. Андреев, «О порядке чтения Евангелия за Божественной литургией в свете рекомендаций Поместного Собора 1917–1918 гг.», *Вестник Екатеринбургской духовной семинарии* 2018 № 4(24), с. 41–129 (epds.ru/wp-content/uploads/2023/05/42824292018-Andreev.pdf) — Tab. 9 (Páscoa 30.03 OS = 2026), 17б (7.04 = 2025), 29а (19.04 = 2027) | regra de inverno |
| **PRV17** | days.pravoslavie.ru/Days/2017MMDD.htm (arquivo estático, inverno 2016–17: Páscoa 18.04 OS, s = −2, análogo de 2027–28) | regra de inverno |
| **H** | I. F. Hapgood, *Service Book…*, Boston 1906 (archive.org cu31924029363128; imagens das págs. conferidas) | AT (parémias) |
| **TRG** | Τριῴδιον κατανυκτικόν, Veneza 1876 (archive.org triodion-katanyktikon-periechon-hapasan) | parémias de Semana Santa (OCR) |

Amostra AZ (431 dias): **todos** os dias de 01.09.2026 a 21.02.2027 (Publicano; ano 2026–27, s = +1) e de 01.09.2027 a 06.02.2028 (Publicano; 2027–28, s = −2); **todos** os domingos de 01.09.2026 a 31.08.2028; **3 dias úteis aleatórios** (semente 49) em cada mês de fev.–ago. de 2027 e de 2028.

## 1. Resumo numérico

| Verificação | Comparados | Concordam | Notas |
|---|---|---|---|
| Leituras da Liturgia × OF26 | 304 dias | 276 | 28 divergências: 4 D3, 1 D5, 12 D4, 11 santoral (§3) — + D2 e D6, que passam no teste de inclusão mas faltam leituras |
| Leituras × AZ | 431 dias | 356 | 40 «incerto» do motor (inverno, vazio), 14 santoral, 2 sem dados AZ, 19 divergências (§2) |
| Versículos por zachalo × OF26 | 525 pares | 519 | 6 diferenças reais (excluídos artefactos de análise) → 5 corrigidas nos dados (§6) |
| Data juliana | 735 | 735 | |
| Tom (glas) | 355 | 355 | |
| Evangelho matinal (domingos) | 135 | 132 | 3 × D7 (Padres do I Concílio) |
| Rótulo da semana | 483 | 480 | 3 × D8 (domingo de Pentecostes) |
| Dia de jejum sim/não × AZ | 431 | 428 | 3 por definição (sem. do queijo «sem carne»; Páscoa sem texto) |
| Jejum, nível paroquial × AZT/AZA | 47 datas | 33 | 14: 4 por santo de polieleo (regra do doc. 02), 10 de regra (§5) |
| AT `verificado:false` | 71 | 55 confirmados | 16 por confirmar; 1 corrigido (§6) |

## 2. Leituras × AZ: as 19 divergências

| Classe | Datas (NS) | Quem tem razão |
|---|---|---|
| D3 festa grande em dia útil | 11.09.2026, 14.10.2026 | AZ/OF26 (ver D3) |
| Santoral substitui o ordinário (vigília/polieleo, Ano Novo litúrgico) | 14.09.2026, 08.10.2026, 09.10.2026 | fora do âmbito actual do motor (fase 3) |
| D1 troca do Domingo dos Antepassados | 20.12.2026, 19.12.2027 | AZ = AND |
| Apóstolo de inverno atrasado uma semana no algoritmo da AZ | 01.01, 04.01, 05.01, 11.01, 12.01, 13.01, 15.01.2027 | **motor** (= AND Tab. 9; AZ dá, p. ex., Hb 11,8… da sem. 30 a 19.12 OS) |
| Início de versículo | 07.11.2026 e 06.11.2027 (Lc 7,1 vs 7,2), 11.10.2027 (Lc 4,38 vs 4,37), 02.11.2027 (Fl 2,17 vs 2,16) | motor = OF26 para Lc 4,37 e Fl 2,16 (12–13.10.2026); Lc 7,2 por confirmar |
| Sábado de carne: AZ repete as leituras do Triódio como «за упокой» | 19.02.2028 | motor (= OF26 14.02.2026) |

## 3. Defeitos do motor (para a sessão principal — `src/*`)

**D1 — Domingo dos Antepassados: falta a troca (Typikon 11.12; AND p. 58).** `leituras.js/ordinario`.
Regra: o Domingo dos Antepassados F (n.º nF) lê Ap 29 + Ev 28 (já está). Além disso: o domingo cujo Evangelho ordinário (já com o deslocamento s) seria o Ev 28 — i.e. o **domingo 28 + s** — lê o Evangelho que F teria (**Ev nF − s**); o domingo cujo Apóstolo seria o Ap 29 — o **domingo 29** — lê **Ap nF**. (Se esse domingo tiver leituras próprias, a leitura trocada vai «под зачало».)
- 20.12.2026 (Dom. 29; s = +1, nF = 30): esperado **Cl 3,12-16 (z 258) + Lc 17,12-19 (z 85)**; motor Cl 3,4-11 + Lc 14,16-24 (repetidas a 27.12). Fontes: AZ 20.12.2026; AND Tab. 9 (Dom. 29: Ap 30, Ev 29).
- 19.12.2027 (Dom. 26; s = −2, nF = 27): esperado **Ef 5,8-19 (z 229) + Lc 17,12-19 (z 85)**; motor Lc 14,16-24. Fontes: AZ; AND Tab. 29a (Dom. 26: 26/29). O Ap 27 vai para o Dom. 29 = 09.01.2028 (Dom. depois do Natal, «под зачало», AND).
- PRV17 confirma a prática: 04.12 OS 2017 «Лк., 85 зач. (Недели 29-й)».

**D2 — Zaqueu no Domingo depois (ou antes) da Teofania perde as leituras próprias.** `ordinario` faz `return` em Zaqueu antes de ver `d.semimoveis`. 25.01.2026: esperado **Ef 4,7-13 (z 224) + Mt 4,12-17 (z 8)** e, «Ряд.», 1 Tm 4,9-15 (z 285) + Lc 19,1-10 (z 94); motor só Zaqueu. Fonte: OF26 25.01.2026.

**D3 — Festas grandes não-Doze em dia útil substituem as leituras do dia.** `COM_AS_DO_DIA` junta ordinário + festa. Em dia útil (seg–sáb) o ordinário **não** se lê (fica para o dia adjacente, D4) para **24.06, 29.06, 29.08, 01.10 e 26.12**; **07.01** (Sinaxe do Precursor) mantém ordinário + festa (OF26 20.01.2026). Esperados: 07.07.2026 Rm 13,11-14,4 (z 112) + Lc 1,1-25.57-68.76.80 (z 1); 11.09.2026 At 13,25-32 (z 33) + Mc 6,14-30 (z 24); 14.10.2026 Hb 9,1-7 (z 320) + Lc 10,38-42; 11,27-28 (z 54); 08.01.2026 Hb 2,11-18 (z 306) + Mt 2,13-23 (z 4). Fontes: OF26; AZ 12.07.2027 e 12.07.2028 (29.06), 11.09.2027, 14.10.2027, 08.01.2027. Ao domingo junta-se ao dominical (sem alteração).

**D4 — Leituras ordinárias transferidas «под зачало».** Quando uma festa com leituras próprias suprime o ordinário, este lê-se no dia adjacente da mesma semana, a seguir às do próprio dia («…и за вторник (под зачало)»). OF26: 15.09 (seg. 14.09 → ter.), 22.09 (seg. → ter.), 07.10 (qui. → qua.), 10.10 (sex. → sáb.), 13.10 (qua. → ter.), 06.07, 20.07, 27.07, 31.07, 13.08, 18.08, 27.08, 10.09, 25.09, 11.02.2026. A direção depende do dia livre (anterior ou seguinte); depende do santoral, por isso pode ficar para a fase 3, mas as 12 grandes festas e D3 já dão os casos fixos.

**D5 — Sexta-feira das Horas Reais (véspera do Natal/Teofania ao sáb./dom.): não há Liturgia.** OF26 16.01.2026: «Литургии не положено. Часы навечерия…». Motor dá as leituras ordinárias da sexta + Horas. Esperado: só as Horas Reais.

**D6 — Véspera da Teofania ao sábado/domingo: falta a Liturgia.** OF26 18.01.2026 (domingo): Liturgia de Crisóstomo com as leituras do **Domingo antes da Teofania** (2 Tm 4,5-8 z 298; Mc 1,1-8 z 1); Vésperas à parte com **1 Cor 10,1-4 (z 143, от полу) + Lc 3,1-18 (z 9)**; Bênção da água 1 Cor 10,1-4 + Mc 1,9-11. Motor só devolve as Vésperas (e, até esta revisão, com 1 Cor 9,19-27 — corrigido nos dados). Ao sábado: idem com as do Sábado antes da Teofania. Na véspera do Natal ao sáb./dom. (Gl 3,15-22 z 207 + Mt 13,31-36 z 53 na Liturgia; já nos dados) faltam as Vésperas (Hb 1,1-12 z 303 + Lc 2,1-20 z 5) — PRV17.

**D7 — Evangelho matinal do Domingo dos Padres do I Concílio (P+42) = 10, não 11.** `calendario.js` `EOTHINA_PENTECOSTARIO[42]`. OF26 24.05.2026 «Утр. – Ев. 10-е, Ин., 66 зач., XXI, 1–14»; AZ 13.06.2027 e 28.05.2028 (Jo 21,1-14). Coincide com a fórmula contínua ((42/7 − 7) mod 11 = 10). O doc. 01 §6.2 («Padres do I Concílio — Jo zach. 67 (= 11)») está errado.

**D8 — Domingo de Pentecostes sem rótulo de semana.** OF26/AZ: «Неделя 8-я по Пасхе» (P+49). Motor `semana = null`. Menor.

**D9 — Sábados com leituras próprias no inverno.** O motor dá só as próprias (e `incerto`). OF26 lê também o ordinário «под зачало» no Sábado antes do Natal (03.01.2026: Ef 5,1-8 z 228 + Lc 16,10-15 z 81), Sábado depois do Natal (10.01.2026: Cl 1,3-6 z 249 + Lc 17,3-10 z 84) e Sábado depois da Teofania (24.01.2026: 1 Ts 5,14-23 z 273 + Lc 17,3-10 z 84); não no Sábado antes da Teofania (17.01.2026). Ver regra §4.

**Santoral** (fora do âmbito actual, registado para a fase 3): santos/festas com vigília ou polieleo substituem o ordinário em dia útil (OF26: 15.01, 02.02, 12.02, 21.07 Kazan, 28.07 Vladimir, 01.08 Serafim, 14.08 Procissão da Cruz, 14.09 Ano Novo, 08.10 Sérgio, 09.10 João Teólogo; 22.03.2026 Quarenta Mártires no 4.º dom. da Quaresma substituem as leituras de S. João Clímaco).

## 4. Regra de inverno (do fim das séries ordinárias ao Publicano)

Notação: `Pent` = Pentecostes do ano pascal; **w** = n.º da semana/domingo depois do Pentecostes (седмица w = seg–sáb antes do domingo w); **s = k − 17** (deslocamento da Exaltação, já implementado); **T** = n.º do domingo do Publicano = (P_next − 70 − Pent)/7. Séries do столп: 1–33 antes do Triódio (a 34 e a 35 pertencem às semanas do Publicano e do Pródigo).

### 4.1 Dias úteis (seg–sex; e sábados sem leituras próprias) — **regra firme**

```text
avanço:    Ap(w) = w,  Ev(w) = w − s                        (como hoje)
w* = 34 + s                                                 # 1.ª semana em que a série do Evangelho se esgota (w − s > 33)
se w ≥ w*:  Ap(w) = Ev(w) = R(w) = 33 − (T − w)             # «рядовые чтения R-й седмицы»: Apóstolo E Evangelho da mesma semana R
                                                            # a semana T (antes do Publicano) lê a 33, a T−1 a 32, …
se s > 0 e 33 < w < w*  (só 1–2 semanas, Apóstolo esgotado antes do Evangelho):
            Ap(w) = Ev(w) = w − s   (= 33 com s = +1)       ⚠ AZ; AND Tab. 9 dá Ap 29 / Ev 33 (dias «omissíveis», entre parênteses)
```

- Sempre R(w*) ≥ 29 e a retrocessão é de 1 a 5 semanas (verificado nos 532 anos 1941–2472: 13 combinações (s, T)) — coincide com o 6.º «зри» do Typikon a 07.01 («depois da 33.ª volta à 29.ª»).
- **Evidência:** OF26 (2025–26: s = −1, T = 34): sem. 32 «ев. чтения 33-й седмицы», sem. 33 «рядовые чтения 32-й седмицы» (Ap **e** Ev da 32: Tg 3,1-10 z 54 + Mc 11,11-23 z 50 a 20.01.2026), sem. 34 «рядовые чтения 33-й седмицы по причине Крещенской отступки». PRV17 (2016–17: s = −2, T = 33): sem. 32 = 32/32, sem. 33 = 33/33. AZ 2026–27 (s = +1, T = 38): sem. 35→30, 36→31, 37→32, 38→33 (= AND Tab. 9); AZ 2027–28 (s = −2, T = 33): sem. 32 = 32/32, 33 = 33/33. Script de conferência: 80 de 88 dias úteis AZ de dez.–fev. (dois anos) concordam com a regra; os 8 restantes são o atraso de Apóstolo da AZ (§2).
- **Diferença com AND:** AND trata Ap e Ev em separado (p. ex. 2025–26 sem. 33: Ap 33/Ev 32) e propõe intercalar as semanas 15–16 de Marcos omitidas em setembro (Tab. 29а: sem. 28 = Ev 16). O OF26 **não** faz nem uma coisa nem outra → seguir OF26.
- Exemplos (motor deve dar): 2027 — 25–29.01 Ap/Ev 30; 01–05.02 31; 08–12.02 32; 16–19.02 33; 21–22.01 33 (⚠). 2028 — 24–28.01 32; 31.01–04.02 33. Lista completa em `tests/referencia-leituras.json → inverno`.

### 4.2 Domingos — regra com evidência parcial

1. Domingo T − 1: **Zaqueu** (Ap 32 + Ev 32). Se coincidir com o domingo antes/depois da Teofania: leituras próprias + Zaqueu «Ряд.» (D2).
2. Domingo antes do Natal (Santos Padres): nunca ordinário (Typikon; OF26 04.01.2026).
3. Outros domingos com leituras próprias no inverno (depois do Natal, antes e depois da Teofania): **só as próprias** (OF26 11.01 e 18.01.2026; PRV17 02.01 e 09.01 OS 2017). AND dá-lhes ordinário quando a Páscoa seguinte é tardia; a AZ dá-lhes o Ap/Ev 33 (Publicano!) — rejeitar.
4. Domingos sem leituras próprias entre a Teofania e Zaqueu (2027: 31.01 e 07.02): **Evangelho R(w)** (2027: Lc 18,18-27 z 91 e Lc 18,35-43 z 93) — AZ = AND. Apóstolo: AZ Ap R(w) (Cl 3,12-16; 1 Tm 1,15-17) vs AND Ap 31 e Ap 17 (não repetir o Ap 30 já lido em D1) — ⚠ sem fonte oficial; sugestão: AZ (mesma regra dos dias úteis).
5. 2027–28 não tem domingos a preencher (Teofania → Zaqueu → Publicano consecutivos).

### 4.3 Sábados

Sábados sem leituras próprias: como os dias úteis (R(w) na zona de retrocessão; OF26 31.01.2026 = Sáb. 33). Sábados com leituras próprias: antes do Natal, depois do Natal e depois da Teofania — próprias + ordinário «под зачало» (avanço ou R(w) conforme a zona; D9); antes da Teofania — só as próprias. ⚠ A troca do Sábado antes do Natal proposta por AND (Ap 26/Ev 29) não está no Typikon e não é seguida por OF26 nem AZ → não implementar.

## 5. Jejum (47 datas, ambas as camadas)

Dias de jejum sim/não: 428/431 = AZ. Níveis paroquiais (0 nada … 8 tudo) contra as duas páginas da própria azbyka, que **se contradizem** entre si:

| Data (NS) | Dia | Paroquial (motor) | Typikon (motor) | AZT tabela | AZA artigo | |
|---|---|---|---|---|---|---|
| 2027-03-15 | Segunda Limpa | 0 | 0 | 0 | 0 | ✔ |
| 2027-03-16 | 1.ª terça | 0 | 0 | 0 | 0 | ✔ |
| 2027-03-17 | 1.ª quarta | 2 | 2 | 2 | 2 | ✔ |
| 2027-03-22 | Seg. 2.ª sem. (40 Mártires) | 2 | 4 +vinho | 3 | 3 | ≠ (M1) |
| 2027-03-23 | Ter. 2.ª sem. | 3 | 2 | 3 | 3 | ✔ |
| 2027-03-24 | Qua. 2.ª sem. | 2 | 2 | 2 | 2 | ✔ |
| 2027-03-27 | Sáb. Quaresma | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2027-03-29 | Seg. 3.ª sem. | 2 | 2 | 3 | 3 | ≠ (M1) |
| 2027-04-07 | Anunciação (qua. Mesoquaresma) | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2027-04-24 | Sáb. de Lázaro | 5 | 5 +vinho | 5 | 5 | ✔ |
| 2027-04-25 | Ramos | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2027-04-26 | Grande Segunda | 2 | 2 | 3 | 2 («строгий») | ≠ tabela (M1) |
| 2027-04-30 | Sexta Santa | 0 | 0 | 0 | 0 | ✔ |
| 2027-05-12 | Qua. Pentecostário | 6 | 4 +vinho | 6 | 6 | ✔ |
| 2027-06-28 | Seg. Apóstolos (Jonas de Moscovo, polieleo) | 4 | 4 +vinho | 6 | 3 | santo (regra doc. 02) |
| 2027-06-29 | Ter. Apóstolos | 6 | 4 +vinho | 6 | 4 | ≠ artigo (M2) |
| 2027-06-30 | Qua. Apóstolos | 2 | 2 | 4 | 2 | ≠ tabela (M2) |
| 2027-07-03 | Sáb. Apóstolos | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2027-07-07 | Natividade do Precursor (qua.) | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2027-08-16 | Seg. Dormição | 2 | 2 | 3 | 3 | ≠ (M1) |
| 2027-08-17 | Ter. Dormição | 3 | 3 | 3 | 3 | ✔ |
| 2027-08-18 | Qua. Dormição | 2 | 2 | 2 | 2 | ✔ |
| 2027-08-19 | Transfiguração (qui.) | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2027-08-21 | Sáb. Dormição | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2026-08-28 | Dormição em sexta | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2026-11-30 | Seg. Natal, fase 1 | 3 | 4 +vinho | 6 | 3 | ≠ tabela (M2) |
| 2026-12-01 | Ter. Natal, fase 1 | 6 | 4 +vinho | 6 | 4 | ≠ artigo (M2) |
| 2026-12-02 | Qua. Natal, fase 1 (santo polieleo) | 4 | 4 +vinho | 4 | 2 | santo |
| 2026-12-04 | Entrada no Templo (sex.) | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2026-12-05 | Sáb. Natal | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2026-12-19 | S. Nicolau (sáb.) | 6 | 6 +vinho | 6 | 6 | ✔ |
| 2026-12-21 | Seg. Natal, fase 2 | 3 | 2 | 4 | 3 | ≠ tabela (M3) |
| 2026-12-23 | Qua. Natal, fase 2 (Joasafe, polieleo) | 4 | 2 | 3 | 3 | santo |
| 2026-12-24 | Qui. Natal, fase 2 | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2027-01-02 | Sáb. 20.12 OS | 4 | 6 +vinho | 4 | 4 | ✔ |
| 2027-01-04 | Seg. 2–6 jan. | 2 | 2 | 3 | 3 | ≠ (M1) |
| 2027-01-05 | Ter. 2–6 jan. | 3 | 4 +vinho | 3 | 3 | ✔ |
| 2027-01-06 | Véspera do Natal (qua.) | 2 | 4 +vinho | 2 | 2 | ✔ |
| 2027-01-13 | Qua. dos Santos dias | 8 | 8 | 8 | 8 | ✔ |
| 2027-01-18 | Véspera da Teofania (seg.) | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2027-02-24 | Qua. sem. do Publicano | 8 | 8 | 8 | 8 | ✔ |
| 2027-03-10 | Qua. sem. do queijo | 7 | 7 | 7 | 7 | ✔ |
| 2027-09-11 | Degolação (sáb.) | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2027-09-27 | Exaltação (seg.) | 4 | 4 +vinho | 4 | 4 | ✔ |
| 2027-10-13 | Qua. comum (Miguel de Kiev, polieleo) | 4 | 2 | «пост» | 3 | santo |
| 2027-10-14 | Proteção (qui.) | 8 | 8 | 8 | 8 | ✔ |
| 2027-08-04 | Qua. comum | 3 | 2 | «пост» | 3 | ✔ |

Divergências de **regra** (camada paroquial; a camada Typikon não tem divergências face ao doc. 02):
- **M1 — Segunda-feira** nas semanas 2–6 da Quaresma, Grande Segunda, Jejum da Dormição e 2–6 jan.: AZT e o texto da mesma página («Понедельник, вторник, четверг – горячая пища без масла» na Dormição) dão **3 (quente sem azeite)**; o motor dá **2 (xerofagia)** (`jejum.js`: `base = dow === 2 || dow === 4 ? QUENTE_SEM_AZEITE : XEROFAGIA` em `quaresma()`, `dormicao()` e na fase 3 de `jejumLongo`). O doc. 02 §3.1.2 cita a pravmir para «seg/qua/sex: sukhoyadenie». Como a camada se chama «segundo Azbuka Very» (dec. 42), recomenda-se segunda = 3.
- **M2 — Apóstolos e Natal fase 1 (28.11–19.12 NS):** AZT = seg/ter/qui/sáb/dom **peixe**, qua/sex **com azeite**; AZA = seg/qua/sex **sem azeite nem peixe**, ter/qui **azeite** (peixe só com santo grande), sáb/dom peixe. O motor mistura (Apóstolos: AZA; Natal fase 1: ter/qui peixe de Foma/pravmir). → **decisão do utilizador** (qual das duas páginas da azbyka é a referência).
- **M3 — Natal fase 2 (20.12–01.01 NS):** AZT = seg/ter/qui **azeite**, qua/sex **sem azeite**, sáb/dom peixe; motor = seg 3, ter/qui 4, qua/sex 2. Mesma decisão que M2.
- 40 Mártires: com a correção de grau (§7) a camada paroquial fica com o nível do dia (AZ não dá sinal ao santo); o Typikon mantém azeite e vinho (`QUARESMA_AZEITE`).

## 6. Integridade dos dados — correções feitas

AT (71 marcadas `verificado:false`): **55 confirmadas** (`verificado: true` + campo `conf` com página): H confirma Horas Reais do Natal (1.ª, 3.ª, 6.ª), 6 das 8 parémias da véspera do Natal, as 4 das Horas da Teofania, 12 das 13 parémias da véspera, as 3 da Bênção da água, 2 das 3 da véspera de Ramos, Quinta e Sexta Santas (exceto 2), Sábado Santo (15 de 16); TRG confirma Jb 1,1-12 (Grande Segunda). **16 por confirmar** (campo `nota_verif`): 9.ª hora do Natal (H omisso), Dn 2,44-45 (H 44-46), Is 7,10-16… das Vésperas (H 7,10-15…9-11), Êx 14,21-23 (H 21-25), Gn 49,1-2.8-12 (H 1-12), 8 parémias de seg.–qua. Santas (H omisso), Jb 38,1-23 (H 1-22), Jr da 9.ª hora de Sexta Santa (gralha em H), Dn 3,1-88.

Correções:
| Ficheiro | Antes | Depois | Fonte |
|---|---|---|---|
| triodio.json P−1, 11.ª parémia | Is 61,1-10 | **Is 61,1-9** | H p. 224; o v. 10 abre a 9.ª parémia |
| triodio.json P−21 (S. João Clímaco) | Ef 5,9-19 **z 224** | **Ef 5,8-19 z 229** | z 224 = Ef 4,7-13 (OF26 25.01.2026); semanas.json; AZ 11.04.2027 |
| triodio.json P−2, 3.ª hora | Rm 5,6-10 | **Rm 5,6-11** | OF26 10.04.2026; AZ 30.04.2027 |
| triodio.json P−2, Vésperas (Ev. composto) | Mt 27,1-38; Lc 23,39-43; Mt 27,39-54; … | **Mt 27,1-44; Lc 23,39-43; Mt 27,45-54; Jo 19,31-37; Mt 27,55-61** | OF26; AZ (H dá a divisão 38/39) |
| triodio.json P−61 e semanas.json ap. 35 ter | 1 Jo 3,11-20 | **1 Jo 3,10-20** | OF26 10.02.2026; AZ 02.03.2027 |
| semanas.json ev. 5 sex | Mt 13,4-9 | **Mt 13,3-9** | OF26 03.07.2026; AZ 11.07.2025, 23.07.2027 |
| semanas.json ev. 2 ter | Mt 7,15-21 **z 21** | **z 22** | OF26 09.06.2026 («Мф., 22 зач.»); fonte D do FONTES-semanas |
| festas.json 01-05, 6.ª hora | Mc 1,9-11 | **Mc 1,9-15** | H p. 182; OF26 16.01.2026 |
| festas.json 01-05 `variante_sab_dom` | 1 Cor 9,19-27 (meio) | **1 Cor 10,1-4** (z 143 от полу) | OF26 18.01.2026 |

Conferência zachalo ↔ versículos: 525 pares (livro, zachalo) do OF26 com as referências do motor — 6 diferenças reais: as 5 correções de versículos acima (1 Cor 10,1-4; 1 Jo 3,10; Mt 13,3; Rm 5,11; Ev. composto de Sexta Santa) e Jo 13,3-11 (Quinta Santa, lava-pés; OF26 13,3-17 no Evangelho composto — sem alteração). Zachala: 1 erro (Mt 7,15-21 z 21 → 22) e 1 em P−21 (Ef z 224 → 229).

## 7. Graus (`data/menaion/graus.json`, entradas ⚠)

| Comemoração | Antes | Depois | Evidência |
|---|---|---|---|
| Elias 20.07 | `grau_atual` ausente (→ Typikon: vigília) | **polieleo** | AZ em dia útil: 02.08.2024, 02.08.2027, 02.08.2028 = «Полиелейные»; BU26: vigília só «допускает» |
| Pantaleão 27.07 | ausente (→ vigília) | **null** (seis estiqueras) | AZ 09.08.2024/2027/2028 = «Шестиричные»; BU26: «По Уставу … шестеричная» |
| Quarenta Mártires 09.03 | ausente (→ polieleo) | **null** | AZ 22.03.2027 e 22.03.2028 sem sinal |
| Proteção 01.10 | grande/grande | sem alteração | AZ 14.10.2025 e 14.10.2027 = grande festa; sinal 🕀 do Typikon pré-1917 continua por conferir |
| Hierarcas de Moscovo 05.10 | polieleo/polieleo | sem alteração | conflito: BU26 polieleo (18.10.2026, domingo) vs AZ 18.10.2027 (segunda) «Славословные»; mantém-se a prioridade BU (FONTES-graus §1.1) |

Nota: `AJUSTE-DOMINGO` tinha **removido** a chave `grau_atual` (e não posto o valor do Typikon) nestas três entradas; o gerador lê a ausência como «igual ao Typikon».

## 8. Pontos que ficam em aberto

- Regra de inverno §4.1 caso «s > 0, semana de transição» (2 dias em 2027: 21–22.01) e Apóstolo dos domingos de preenchimento §4.2(4) — sem fonte oficial; reconferir com as BU de 2027 quando publicadas (calendar.rop.ru publica um mês à frente).
- Jejum M2/M3: decisão do utilizador (tabela vs artigo da azbyka).
- 16 parémias por confirmar (§6) — precisam do Triódio/Menaion sinodal (imagens).
- Doc. 01 §6.2 (P+42 = 11) e §7.5 devem ser atualizados com §3 D7 e §4 (pasta `docs/conhecimento`, fora do âmbito desta verificação).

## 9. Como usar o teste

`node tests/referencia.test.mjs` — 227 dias do OF26 têm de passar (as leituras do motor ⊆ referências oficiais do dia; tom e Evangelho matinal aos domingos). Os 43 pendentes (31 dias de inverno + 9 defeitos D1–D6 + 3 × D7) só são listados (`VERBOSO=1`); com `ESTRITO=1` falham. Sugere-se acrescentá-lo ao `npm test` e passar a `ESTRITO=1` quando D1–D7 e a regra de inverno estiverem implementados.
