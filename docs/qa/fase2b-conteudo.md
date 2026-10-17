# QA de conteúdo — subfase 2b (preparação para a Comunhão e ação de graças)

> Decisão 49, frente (2) «conteúdo», e frente (3) na parte de fidelidade de sentido. Verificação de 2026-10-17 sobre `data/oracoes/comunhao_preparacao.json` (540 blocos: rubricas, três cânones `comunhao-kan-*`, Cânone Pascal `comunhao_preparacao-cp*`, ofício `oficio-*`) e `data/oracoes/comunhao_acao_gracas.json` (33 blocos).
> **Os ficheiros de dados não foram editados** (há revisão de tradução em curso). Todas as correções estão em [`fase2b-conteudo-patch.json`](fase2b-conteudo-patch.json): 23 entradas `{ficheiro,id,campo,de,para,motivo,fonte}`, geradas a partir dos valores atuais dos ficheiros. O `de` é o texto que estava no ficheiro no momento da verificação; se o revisor alterou entretanto o mesmo campo, a entrada falha de forma segura. A aplicação sequencial das 23 entradas foi simulada sem erros sobre os ficheiros tal como estavam no fim da verificação. Um quarto erro de tradução (kan-198 UK) foi corrigido pelo revisor durante a verificação e saiu do patch. Seis entradas tocam `manha.json`/`noite.json`, porque o mesmo texto (condácio pascal, «Воскресеніе Христово видѣвше») tem lá o mesmo erro de acento, que a 2a não detetou.

## 0. Fontes consultadas

| Código | Fonte | Como se usou |
|---|---|---|
| **MS1900** | *Молитвословъ*, 10.ª ed., Moscovo 1900 (archive.org `molitvoslov00andr`) | Camada OCR por página (hOCR), comparada **letra a letra** (normalizada, sem acentos) com o eslavo dos dados. Pp. 170–184 (Cânone Pascal), 330, 410–461 (três cânones), 461–510 (ofício), 511–518 (ação de graças). |
| **Z1912** | Зайончковскій, *Молитвы и пѣснопѣнія…*, 1912 (archive.org `molitvyipesnopenijapravoslavnogomolitvos65`; folha = página + 5) | Imagens das pp. 47–48, 106–115 (todo o Cânone Pascal e as estiqueras), 208, 244, 258–259: acentos e leituras. OCR da coluna russa (pp. 200, 203–209) para as atribuições RU. |
| **T1907** | *Православный толковый молитвословъ*, 1907 | Só para confirmar as passagens citadas pelos autores. |
| **H1906** | Hapgood, *Service Book*, 1906 | OCR das pp. 123–126 (ação de graças) e 570–571 (orações 1 e 2): atribuições EN. |
| **AZ** | Molitvoslov atual da ROC (azbyka.ru): os três cânones, o Последование, o Cânone Pascal, a ação de graças, «О молитвенном правиле в дни Пасхи». **Versão por data** (`?date=`) do Последование para 22–23.02, 10.03, 04.04, 05.04, 08.04, 11.04, 12.04, 14.04, 18.04, 19.04, 25.04 e 25.05.2026 | **Só verificação** (dec. 2): comparação automática palavra a palavra e acento a acento com todos os blocos; estrutura por período litúrgico. |
| **DOC2015** | «Об участии верных в Евхаристии» (patriarchia.ru/article/96198; texto integral em azbyka.ru/otechnik) | Citações da rubrica comunhao-kan-001 e regra da Semana Luminosa. |
| **YU** | Юнгеров, *Псалтирь* — só a reedição digital archive.org `psalms-yung-1` | Coluna RU dos Sl 22, 23, 115. |

Não foi possível obter: uma **Цветная Триодь** pré-1917 (o archive.org só tem a edição de 2002, que não é domínio público), uma **Минея** ou um **Служебникъ** pré-1917 (para S. João Crisóstomo e S. Gregório), nem uma **digitalização PD de Yungerov**. As imagens do K1817 (RSL) não foram reabertas.

## 1. Resumo

| Verificação | Âmbito | Resultado |
|---|---|---|
| Eslavo vs texto atual (AZ) | 573 blocos (375 textos distintos) | Coincidência quase total, incluindo os acentos: os dados seguem a redação corrente. Divergências: ver §2. |
| Eslavo vs MS1900 (OCR, letra a letra) | três cânones, Cânone Pascal, ofício, ação de graças | Só as variantes já anotadas pelos autores, mais duas leituras novas (oficio-133, comunhao-kan-171). |
| Acentos vs imagens Z1912 | Cânone Pascal completo + 5 orações | **8 acentos errados** (cp029, cp056, cp058, kan-161, oficio-123, -139, -141 ×2), mais 1 leitura (cp057). |
| Estrutura / `quando` / `repetir` | todos os blocos; AZ por data; DOC2015 | Conforme, com 2 pontos para decisão (§3). |
| Fidelidade das traduções | todos os blocos únicos nas 4 línguas | Qualidade alta. **4 erros** (1 com 3 línguas). |
| Atribuições RU (Z1912), EN (H1906), RU Salmos (YU) | amostra | Z1912 e H1906 corretos; YU não verificável em PD (§5). |

**Entradas do patch por tipo:**
- acento: 12 (8 textos; 2 deles repetidos em manha/noite);
- leitura: 3 (cp057, kan-171, oficio-133);
- tradução: 6 (kan-171 PT/RU/EN, ação de graças-23 PT/EN/UK);
- nota: 2 (oficio-029, kan-171).

## 2. Eslavo

### 2.1 Correções (no patch)

| Bloco | Dados | Correto | Prova |
|---|---|---|---|
| cp029 | вѣ́нецъ | вѣне́цъ | Z1912 p. 108 (imagem) |
| cp043 (theotokion, sem PD) | вра́та | врата́ | texto atual, que a nota diz seguir; cf. Sl 23 nos próprios dados |
| cp056 = manha-p07 = noite-007 | па́дшимъ пода́яй | подая́й | Z1912 p. 110 «подаѧ́й»; o ícos (cp057) já está certo |
| cp057 | и пла́чемъ | и пла́чимъ | Z1912 p. 110; AZ «пла́чим» |
| cp058 = manha-p05 = noite-005 | Кре́сту Твоему́ | Кресту́ | Z1912 p. 48 «Кр҇тꙋ̀»; AZ |
| kan-161 | вся́ку слезу́ | сле́зу | Z1912 p. 208; AZ |
| kan-171 | моле́нія (pl.) | моле́ніе | MS1900 p. 440, K1817 (nota), Z1912 p. 209 e **também AZ**. A nota diz que o texto atual tem o plural, o que é falso. |
| oficio-123 | не отчая́ваю | отчаява́ю | Z1912 p. 244; AZ |
| oficio-133 | сія́ де́рзостнѣ пома́зати | де́рзостно | MS1900 p. 497; AZ (a 1.ª ocorrência, «пріи́де де́рзостнѣ», está certa) |
| oficio-139 | дне и ча́са | часа́ | Z1912 p. 258; AZ |
| oficio-141 | ра́я; ова́ … ова́ | рая́; о́ва … о́ва | Z1912 pp. 258–259; AZ |

### 2.2 Itens que os autores assinalaram sem fonte PD

| Item | Resultado |
|---|---|
| «Не и́мамы ины́я по́мощи» (kan-138/139) | Confirmado: **não existe** em MS1900, que dá «Предстательство» e, como «Другой кондакъ, гласъ 6», o «Не ввѣри мя» (que os dados e AZ chamam «Стихира»). O texto confere com AZ. Sem PD. |
| Orações finais do cânone à Mãe de Deus (kan-174–177) | MS1900 p. 441 traz outra oração («Пресвятая Госпоже Владычице Богородице, вышши еси всѣхъ Ангелъ…»), como a nota diz. O texto dos dados confere com AZ palavra a palavra. Sem PD. |
| «Боголюби́ва / благолюби́ва» (kan-116) | As fontes PD (MS1900; Z1912 RU pp. 203–205 «какъ любящая оказывать добро») e o grego (ὡς φιλάγαθος) dão **«благолюби́ва»**; AZ dá «Боголюби́ва». → **Decisão do utilizador** (§6). |
| Theotokia do Cânone Pascal (cp009 … cp112, 14 blocos) | Sem Triódio pré-1917 acessível. Conferem com AZ, salvo o acento de cp043 (corrigido). A rubrica cp002 («со второго дне Пасхи») confere com AZ («поемыя со второго дня Пасхи и до отдания»). |
| Tropário e condácio de S. João Crisóstomo (ação de graças-23/24) | Sem PD (MS1900, Z1912, T1907 não os têm; nem Минея nem Служебникъ pré-1917 no archive.org). Conferem com AZ, salvo um acento duvidoso: «у́чиши» (AZ «учи́ши»), que fica por confirmar. Hapgood p. 125: «Tone V»; os dados dão tom 8. |
| S. Gregório Dialogo (ação de graças-26) | Só incípites. Não resolvido (falta Минея pré-1917). |
| Refrões do cânone da Comunhão (oficio-040, 048 …) | Conferem com AZ. MS1900 só imprime os dois «Стихъ» na ode 1, como dizem as notas. |
| Refrões dos cânones penitencial e do Anjo | Conferem com AZ (e com a marca «Іисусу:» de MS1900, kan-187/252). |
| Salmos 22, 23, 115 | Conferem com MS1900 pp. 330, 477–479 (texto isabelino). «всякъ человѣ́къ ложь» está certo (AZ «лож» é forma modernizada). |

### 2.3 Variantes em que os dados preferem a redação atual à PD (política, sem patch)

kan-116 («Боголюби́ва»), kan-125 («сподо́бльшая», MS1900 «сподобльши»), kan-170 («мои́хъ», com K1817), kan-223 («ми», MS1900 «мнѣ»), kan-240 e kan-259. Na kan-259 a nota enumera as diferenças, mas **omite uma**: MS1900 também não tem «и опи́вствомъ».

Em sentido inverso, kan-134 segue a rubrica de MS1900 (repetir «Спаси отъ бѣдъ… / Призри» depois da 6.ª ode) contra AZ, que não a repete.

A 2a seguiu a PD nos casos divergentes (помянникъ). Convém uma regra única (§6).

Sem outras divergências entre o eslavo dos dados e MS1900 além das já anotadas. Os desvios do OCR são ruído de leitura ou abreviaturas de MS1900 («Слава:», refrões não impressos).

## 3. Estrutura e regras sazonais

- **Rubrica comunhao-kan-001:** as citações do DOC2015 são literais e estão em II.3. A frase da Semana Luminosa também está em **II.3**, não em II.1 (II.1 é o jejum). A nota do bloco e a entrada DOC2015 em `fontes` dizem II.1. Correção de nota a fazer pelo revisor.
- **Semana Luminosa.** O DOC2015 (II.3) diz: «молитвенное правило состоит из Пасхального канона, а также канона и молитв ко Святому Причащению». Os dados seguem-no: os três cânones ficam excluídos e o **cânone da Comunhão mantém-se**.
  - A versão por data de AZ (12–18.04.2026) **omite o cânone da Comunhão**. A sua sequência é: Horas Pascais → Cânone Pascal com estiqueras → «Ангел вопияше / Светися» → «Христос воскресе» ×3 → «Господи, помилуй» ×40 → versos «Хотяй ясти» → orações.
  - O que os autores inferiram (omitir o início, os Sl 22/23/115, os tropários, o Sl 50 e o bloco do Triságio ao «Г. п.» ×40; «Ангел вопияше» em vez de «Достойно есть») **confirma-se em AZ**, com uma diferença: AZ diz **«Христос воскресе» ×3 e «Господи, помилуй» ×40** depois de «Ангел вопияше», e os dados não (oficio-117 tem `excepto semana_luminosa`). → **Decisão** (§6). Não vai no patch, porque altera `quando` e blocos.
  - AZ acrescenta «и поклоны, сколько хочешь», o que contradiz a sua própria regra pascal. Os dados omitem-no, e bem.
- **Quaresma (oficio-029/030):** AZ por data mostra «Во Святу́ю же Четыредеся́тницу: Егда́ сла́внии…» de 23.02 a 11.04.2026, isto é, **P−48…P−1**, incluindo Sábado de Lázaro, Ramos e Semana Santa. Não aparece a 22.02. O tropário vem **depois** dos três tropários e **antes** do Sl 50, em **acréscimo**. Os dados e o motor estão conformes. A nota de oficio-029 está desatualizada (patch). O período `quaresma` falta em `docs/esquema-oracoes.md` (atualização de documentação).
- **Tempo Pascal (25.04) e Ascensão–Pentecostes (25.05):** AZ confirma os dados. Na Páscoa: «Христос воскресе» ×3 → Святый Боже; «Ангел вопияше» em vez de «Достойно», seguido do Triságio. Da Ascensão ao Pentecostes, o início é em Святый Боже, sem «Царю Небесный».
- **`repetir`:** todos conformes.
  - Cânones: kan-064 ×2 (MS1900 «Дважды») e kan-080 ×2.
  - Cânone Pascal: «Христос воскресе» ×3, «Воскресеніе Христово» ×3, «Воскресъ Іисусъ» ×3 (AZ) e exapostilário ×3 (Z1912 p. 113 «[Трижды]»).
  - Ofício: «Г. п.» ×12, «Аллилуіа» ×3 e «Г. п.» ×40.
  - Ação de graças: «Слава Тебѣ, Боже» ×3.
- **Pormenor:** Z1912 p. 113 e AZ passam da catavásia da 9.ª ode diretamente ao exapostilário, sem «Христос воскресе» ×3. cp115 acrescenta-o por analogia com as outras odes. Opcional.

## 4. Fidelidade das traduções

Foram lidos todos os 375 textos distintos nas quatro línguas. A qualidade geral é alta e não há omissões. Correções no patch:

| Bloco | Língua | Erro | Correção |
|---|---|---|---|
| ação de graças-23 (tropário de Crisóstomo) | PT, EN, UK | «не сребролю́бія мі́рови сокро́вища сниска́» = juntou para o mundo tesouros **de não-avareza**. As versões negavam o verbo («não amontoou… tesouros de avareza», «laid up… no treasures of avarice», «не скарби… зібрала»), invertendo o sentido. Hapgood (fonte declarada) diz «the treasure of non-avariciousness». | «ajuntou… tesouros de desapego do dinheiro» / «treasures of freedom from avarice» / «скарби несріблолюбства» |
| kan-171 | PT, RU, EN | plural «súplicas / моления / supplications» | singular (o eslavo corrigido) |
| kan-198 | UK | «зневажає» (despreza) por «попира́етъ» (calca) | «топче» — **já corrigido pelo revisor** durante a verificação; fora do patch |

Avisos sem patch:
- EN do refrão «Пресвятая Богородице, спаси насъ»: «O Most Holy Theotokos» nos cânones e «Most holy Theotokos» no ofício (7 blocos). Convém uniformizar.
- PT «Proteção infalível» (ação de graças-27) e «que não deixa confundidos» (kan-137) para o mesmo «непосты́дное». Convém uniformizar com a 2.ª forma, que é mais fiel.
- EN kan-151: «exalt above all» acrescenta «above all» (fórmula tradicional, mas o eslavo diz só «превозноси́те»).
- RU ação de graças-23 «сокровища не сребролюбия» é literal mas ambíguo («нестяжания» seria mais claro).

**Atribuições:**
- **RU Z1912:** confirmada nas pp. 200 (kan-080) e 203–209 (kan-116, kan-161, kan-171 «прими молитву»).
- **EN H1906:** as adaptações descritas nas notas correspondem ao texto de Hapgood pp. 123–126 e 570–571 («sinning woman», «guidance to life eternal», «dead», «invisible wolf»…).
- **RU Yungerov:** coincide com a reedição digital `psalms-yung-1`. Não há digitalização PD acessível; o ano e a edição (1915) continuam ⚠ (§6).

## 5. Pendentes

1. **Sem fonte PD:** «Не имамы» (kan-139), kan-175/177, 14 theotokia pascais, tropário e condácio de Crisóstomo (com o acento «у́чиши» por confirmar), S. Gregório (só incípites), refrões atuais. Procurar Цветная Триодь, Минея (nov., mar.) e Служебникъ sinodais pré-1917 (RSL/НЭБ, não acessíveis nesta sessão).
2. **Yungerov:** localizar a edição impressa (Kazan, 1915?) e conferir os Sl 22, 23 e 115.
3. **Notas a reescrever pelo revisor depois de aplicar o patch:**
   - kan-001 e a entrada DOC2015 de `fontes`: II.3, não II.1, para a Semana Luminosa;
   - kan-259: acrescentar «и опи́вствомъ» à lista de diferenças;
   - manha-p05/p07 e noite-005/007: indicar o acento confirmado em Z1912;
   - `docs/esquema-oracoes.md`: acrescentar o período `quaresma` (P−48…P−1).

## 6. Decisões do utilizador

1. **Política PD ↔ redação atual** onde divergem (kan-116, 125, 223, 240, 259; e, inversamente, kan-134). A recomendação é seguir a PD quando coincide com o grego. Em kan-116 isso dá **«благолюби́ва»** (= φιλάγαθος), com a tradução «pois amas o bem».
2. **Semana Luminosa:**
   - manter o cânone da Comunhão (DOC2015), como agora — recomendado;
   - acrescentar, depois de «Ангел вопияше / Светися», «Христос воскресе» ×3 e «Господи, помилуй» ×40, como AZ (i.e. tirar `semana_luminosa` do `excepto` de oficio-117 e acrescentar um bloco «Христос воскресе» ×3) — a confirmar pelo clero (dec. 44).
3. **Quaresma:** o período P−48…P−1 confirma-se na prática atual (AZ). Manter, embora «Четыредесятница» em sentido estrito acabe em P−9.
