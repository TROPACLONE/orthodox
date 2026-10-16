# Fontes — Lecionário do Pentecostário e das semanas depois do Pentecostes

Ficheiros: `pentecostario.json` (P+0 … P+56, 57 dias) e `semanas.json` (semanas 1–35 × seg…dom, séries **apostolo** e **evangelho** separadas). Compilados a partir de **fontes impressas de domínio público** (decisões 8 e 43). Nenhum dado foi copiado de azbyka.ru, pravoslavie.ru nem do Ponomar.

## 1. Fontes (edições exatas)

| # | Edição | Onde | Uso |
|---|--------|------|-----|
| A | *Господа нашего Иисуса Христа Святое Евангелие … на славянском и русском наречии*, СПб., Синодальная типография, 1875 — apêndice **«Указание евангельских чтений на все дни года»** (pp. impressas 1–9) | https://archive.org/details/20260101_20260101_1251 — PDF, folhas 433–441 | **Fonte principal do Evangelho**: capítulo/versículos de cada dia (P+0…P+49 e semanas 1–35, incl. leituras «за упокой»). Lido página a página a partir das imagens (300 ppi), não só do OCR. |
| B | *Книга деяний святых апостол* (Апостол), Москва, Синодальная типография, dez. 1809 — **«Сказание»** final (zachala do Apóstolo e do Evangelho por semana) e rubricas vermelhas no texto («Конец …», «Преступи …», «Чти …») | Biblioteca Estatal Russa, registo 01013421042 — https://viewer.rsl.ru/rsl01013421042 (Сказание: imagens 450–473; texto: 20–450) | **Fonte principal do Apóstolo**: n.º de zachalo por dia; rubricas de fim/salto para os limites dos versículos. |
| C | Bíblia Isabelina (Елизаветинская Библия), ed. 1762 — **«Сказание главам евангельским утренним, апостолом и евангелием, известно седмицам всего лета»** | https://archive.org/details/1762_20211101 — PDF, folhas 609–613 | Controlo independente dos zachala (Apóstolo + Evangelho), P+0 … semana 31. |
| D | Texto eslavo isabelino do NT com marcas de zachalo (PDF por livro) | https://archive.org/details/Slavic_Bible_PDF (ficheiros 51–76) | Só como **ferramenta**: correspondência zachalo ↔ versículo inicial (para atribuir `z` às referências de A e verificar inícios das de B). |
| E | Типикон (texto sinodal), cap. 50 «Пентикостарион» | https://ru.wikisource.org/wiki/Типикон/Глава_50._Начало_с_Богом_святым,_пентикостариа. | Controlo dos zachala de domingos e Semana Luminosa. |
| F | I. Hapgood, *Service Book of the Holy Orthodox-Catholic Apostolic (Greco-Russian) Church*, 1906 — «Table of lessons» (domingos) | https://archive.org/details/cu31924029363128 | Controlo dos domingos. |
| G | И. Косолапов, *Месяцеслов … с приложением … тридцати пяти таблиц чтений из Евангелия и Апостола*, Казань, 1874 | RSL 01003587014 — https://viewer.rsl.ru/rsl01003587014 | Controlo dos zachala dominicais. |

## 2. Método

1. **Evangelho**: transcrição integral de A (imagens), linha a linha; cada referência recebeu o zachalo cujo início (segundo D) coincide com o 1.º versículo ou o contém. Resultado comparado com os zachala de C: 1 divergência (ver §4).
2. **Apóstolo**: zachalo de cada dia lido em B (Сказание) e cruzado com C; versículos determinados pelo início do zachalo (D) e pelas rubricas «Конец …/Преступи …/Чти …» de B (verificadas visualmente numa amostra de ~60 rubricas: p. ex. Hb 11,33–12,2 «Конец всем святым»; 1 Ts 4,13-17 «Конец мертвым»; Hb 12,25-26 + 13,22-25 «Преступи вторнику на конец послания»; Gl 1,11-19 «Конец недели»).
3. Numeração das semanas: `Неделя N` = P+49+7N; a semana N (seg–sáb) termina na Неделя N (doc. 01, §7.2). Em A, «Понед. N:» segue a Неделя N−1 — mesma convenção. **Sem отступка/преступка aplicada**: o JSON dá a série «pura» por semana; o deslocamento do Evangelho (s = k − 17) é aplicado em runtime (doc. 01, §7.3). Semana 17 (dias úteis) = Marcos da semana 32, como no livro; semanas 15–16 e 30–34 com Marcos; Lucas a partir da 18.ª.
4. Semanas 33–35 correspondem às semanas do Publicano, do Filho Pródigo e de Carnaval (A rotula «Понед. 34/35»); a semana do Queijo (36.ª) pertence ao Triódio e não está aqui.
5. Leituras pelos defuntos: `pentecostario.json["48"].ap_defuntos/ev_defuntos` (Sábado da Trindade) e `semanas.json["defuntos"]` (sábado da semana 35 = Sábado de Carnaval): 1 Ts 4,13-17 (z 270, rubrica «Конец мертвым» em B) e Jo 5,24-30 (z 16, «и за упокой» em A).
6. Formato: `{"r": OSIS, "z": int}`; numeração de versículos eslava/sinodal. Meios-zachala («от полу») guardados com o número inteiro do zachalo.

## 3. Verificação por amostragem (azbyka.ru/days, só verificação)

| Data (NS) | Dia | Nosso valor | azbyka | ✓ |
|---|---|---|---|---|
| 13.04.2026 | P+1 | Act 1,12-17.21-26 (z2); Jo 1,18-28 (z2) | idem | ✓ |
| 29.04.2026 | P+17 | Act 8,18-25 (z19); Jo 6,35-39 (z21) | idem | ✓ |
| 15.05.2026 | P+33 | Act 15,5-34 (z36); Jo 10,17-28 (z37) | idem | ✓ |
| 30.05.2026 | P+48 | Act 28,1-31 (z51); Jo 21,15-25 (z67); defuntos 1Ts 4,13-17 / Jo 5,24-30 | idem (azbyka indica estas como as dos livros litúrgicos) | ✓ |
| 01.06.2026 | sem. 1 seg | Ef 5,8-19 (z229); Mt 18,10-20 (z75) | idem | ✓ |
| 07.06.2026 | Dom. 1 | Hb 11,33-12,2 (z330); Mt 10,32-33.37-38; 19,27-30 (z38) | idem | ✓ |
| 16.06.2026 | sem. 3 ter | Rm 7,14-8,2 (z95); Mt 10,9-15 (z35) | idem | ✓ |
| 09.07.2026 | sem. 6 qui | 1Cor 3,18-23 (z129); Mt 13,36-43 (z54) | idem | ✓ |
| 25.07.2026 | sem. 8 sáb | Rm 13,1-10 (z111); Mt 12,30-37 (z47) | idem | ✓ |
| 21.08.2026 | sem. 12 sex | 2Cor 7,10-16 (z184); Mc 2,18-22 (z9) | idem | ✓ |
| 08.09.2026 | sem. 15 ter | Gl 2,21-3,7 (z204); Mc 6,1-7 (z22) | idem | ✓ |
| 16.10.2026 | sem. 20 sex (s=+1) | Ap. sem. 20: Fl 3,8-19 (z245); Ev. sem. 19: Lc 6,17-23 (z24) | idem | ✓ |
| 20.10.2026 | sem. 21 ter (s=+1) | Cl 1,1-2.7-11 (z249); Ev. sem. 20: Lc 6,37-45 (z27) | idem | ✓ |
| 11.11.2026 | sem. 24 qua (s=+1) | 1Ts 4,1-12; Ev. sem. 23: Lc 11,9-13 | idem | ✓ |
| 24.11.2026 | sem. 26 ter (s=+1) | 1Tm 1,8-14; Ev. sem. 25: Lc 12,42-48 | idem | ✓ |
| 09.12.2026 | sem. 28 qua (s=+1) | 2Tm 4,9-22; Ev. sem. 27: Lc 18,15-17.26-30 | idem | ✓ |

16/16 concordantes (após a correção Ef 5,8 — ver §4).

## 4. ⚠ PARA CONFIRMAR / notas

- ⚠ **Ef 5,8-19 (z 229)** (seg. do Espírito Santo e Dom. 26): o texto eslavo começa em «яко чада света ходите» (fim do v. 8); Hapgood dá 5,9-19. Adotado **5,8-19** (numeração eslava).
- ⚠ **Mt 7,15-21 (sem. 2 ter)**: C dá zachalo **21**; a marcação de D põe o 21 em 7,12 e o 22 em 7,15. Adotado **21** (fonte impressa).
- ⚠ **Lc 10,22-24 (sem. 23 seg)**: C dá zachalo **52**; D marca 51 até 10,22. Adotado **52**.
- ⚠ Leituras que começam a meio de um zachalo segundo D (z = zachalo que as contém): Mt 13,4-9 (50), Mt 13,54-58 (56), Mc 5,22-24.35-6,1 (20), Mt 22,35-46 (92), Lc 9,44-50 (47), Lc 7,2-10 (29), Lc 8,41-56 (39). Os de Lc 9,44 / 7,2 / 8,41 e Mt 13,4 confirmados em C.
- ⚠ **Limites de versículos do Apóstolo**: zachala confirmados em B e C para todos os dias; versículos inicial/final conferidos com rubricas de B só numa amostra (~60) e nos 16 dias da §3. Recomenda-se uma 2.ª passagem completa pelas rubricas «Конец …» de B.
- ⚠ D (PDF digital do texto isabelino, 2010) é usado apenas como índice zachalo→versículo; o texto subjacente é de domínio público, mas a origem da digitalização não está documentada. Para eliminar esta dependência, cada zachalo pode ser conferido nas margens de B/A.
- As semanas 33–35 (Publicano, Pródigo, Carnaval) sobrepõem-se ao Triódio; o motor deve dar prioridade a `triodio.json` quando aplicável.
