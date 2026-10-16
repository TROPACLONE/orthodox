# Fontes — graus das comemorações (`graus.json`)

> **Âmbito:** para cada dia do ano juliano (01.01–31.12 OS), as comemorações com sinal de **doxologia (🕃 vermelho) ou superior** — grande festa 🕀, vigília 🕁, polieleo 🕂 — no Typikon **ou** na prática atual da IOR (Patriarcado de Moscovo). Dados para o motor de jejum (decisões 6, 8, 42, 43).
> **Data de compilação:** 2026-10-16. **Ortografia:** AO 1990 (dec. 21); nomes na forma portuguesa tradicional (dec. 19); categorias segundo o doc. 05, §1.3.
> **Ficheiro:** `data/menaion/graus.json` — 169 dias, **205 entradas** (JSON validado com `python3 -m json.tool`).

---

## 1. Esquema e convenções

```json
{"MM-DD": [{"id": "<slug>", "pt": "…", "cu": "…",
            "grau_typikon": "grande|vigilia|polieleo|doxologia|null",
            "grau_atual":   "grande|vigilia|polieleo|doxologia|null",
            "tipo": "senhor|mae_de_deus|santo|icone",
            "fonte": "CHAVE;CHAVE…"}]}
```

- **Chave `MM-DD` = data OS** (juliana). NS = OS + 13 em 1900–2099; para 16–29.02 OS converter sempre por JDN (doc. 01, §1.1; doc. 05, §1.1).
- **`grau_typikon`** = sinal do Месяцеслов do Typikon (cap. 48) para essa comemoração; `null` = sem sinal de doxologia ou superior no Typikon (santo posterior, ou sinal menor).
- **`grau_atual`** — **extensão ao pedido:** também pode ser `null`, quando a prática atual é **inferior** à doxologia (seis estiqueras ou sem sinal) mas o Typikon dá doxologia ou mais. Casos: 14.10, 19.11, 13.12, 09.03, 21.05 (Constantino de Murom), 20.07 (Elias), 27.07 (Pantaleão). Ver §5.
- **`cu`** = nome eslavo/russo em escrita civil, na forma do calendário oficial (abreviaturas de лик como no calendário: прп., свт., сщмч., блгв., блж., прав., равноап., вмч., мч.).
- **`tipo`:** `senhor` (festas do Senhor, incl. Cruz, Mandílio, Túnica, Dedicação da Igreja da Ressurreição, despedidas); `mae_de_deus` (festas da Mãe de Deus que não são de ícone, incl. Conceição 09.12, Manto 02.07, despedidas); `icone` (ícones da Mãe de Deus + ícone da Trindade 09.06); `santo` (restantes, incl. a Sinaxe dos Arcanjos 08.11 — o esquema não tem categoria para anjos ⚠).
- Só entram memórias de **data fixa**. As móveis ficam de fora (§6).

### 1.1 Regra para `grau_atual` (por ordem de prioridade)

1. **BU 2026** (Богослужебные указания da Editora do Patriarcado de Moscovo, calendar.rop.ru) — o grau do **ofício próprio** da comemoração tal como as BU o nomeiam («служба … полиелейная», «порядок совершения полиелейной службы …»), **mesmo quando as BU o apresentam como variante (Б)/(В)** ao lado de um ofício ordinário do dia. Quando as BU dizem que o grau ordinário é inferior e que um grau superior só se faz «по благословению настоятеля» (Elias, Pantaleão), regista-se o **ordinário** e a elevação vai para §5.3. Quando as BU dão «полиелейной или бденной», desempata-se pela conferência na azbyka.
2. **Conferência por amostragem na azbyka.ru/days** (`AZ`) ou dados já registados no doc. 05 (`KB05`, também azbyka) — quando as BU de 2026 não cobrem a data (BU publicadas só até 31.10.2026 NS = 18.10 OS) ou são omissas por coincidência (domingo, Quaresma, Triódio).
3. **Typikon** (`TYP48`) — só para 08.05 (S. João Teólogo), em que nem BU 2026 (Ascensão) nem a amostra azbyka permitiram conferir ⚠.

---

## 2. Chaves de fonte

| Chave | Referência |
|---|---|
| **TYP47** | Типикон, гл. 47 «О знамениях Владычних, и Богородичных праздников, и святых» — definição dos sinais (🕀/🕁/🕂/🕃 vermelho/🕃 preto). Texto lido em https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/47 |
| **TYP48** | Типикон, гл. 48 «Месяцеслов» — sinal de cada dia. Texto lido (só para localizar passagens, dec. 43) em https://azbyka.ru/otechnik/Pravoslavnoe_Bogosluzhenie/tipikon/48 — reprodução da ed. «Типикон сиесть устав», М.: Издательский Совет РПЦ, 2002, que reproduz o texto da **edição sinodal pré-1917** (ver §3) |
| **BU26** | Издательство Московской Патриархии, «Богослужебные указания» 2026, http://calendar.rop.ru/?bui=N (N = dia do ano NS 2026); menológio do dia em `?idd=N`. **Só verificação**: registou-se apenas o grau; nenhum texto copiado. Consultado 2026-10-16 |
| **AZ** | azbyka.ru/days/AAAA-MM-DD — ideogramas do calendário diário (`ideograph-1` grande, `-2` «Бденные», `-3` «Полиелейные», `-4` «Славословные», `-5` «Шестиричные», `-6/7` sem sinal). **Só verificação por amostragem** (57 dias; §4.2) |
| **KB05** | `docs/conhecimento/05-santos.md` — índice §2, Anexos B/C e §0.1–0.2 (ranks azbyka e BU já recolhidos na 2.ª ronda) |
| **CAN1832** | Sínodo, abertura das relíquias e canonização de S. Mitrofano de Voronej (07.08.1832) — KB05, ficha 24 [32] |
| **CAN1896** | Canonização de S. Teodósio de Tchernigov (09.09.1896) — KB05, ficha 53 [4] |
| **CAN1903** | Glorificação de S. Serafim de Sarov (19.07.1903) — KB05, ficha 39 [4] |
| **CAN1911** | Canonização de S. Joasafe de Belgorod (04.09.1911) — KB05, ficha 30 [4] |
| **CAN1913** | Glorificação de S. Hermógenes (12.05.1913) — KB05, ficha 56 [4] |
| **CAN1916** | Canonização de S. João de Tobolsk (10.06.1916) — KB05, ficha 79 [4] |
| **CAN1988** | Concílio Local da IOR de 6–9.06.1988 (Demétrio Donskoi, André Rublev, Máximo Grego, Macário de Moscovo, Paísio Velitchkovski, Xénia, Inácio Briantchaninov, Ambrósio de Optina, Teófano) — KB05 [8]; «Деяние … о канонизации святых», ЖМП 1988, n.º 8 |
| **CAN1989** | Concílio dos Bispos de 9–11.10.1989 (S. Tikhon; S. Jó, patriarca) — KB05, fichas 5, 83 [4][13] |
| **CAN1990** | Concílio Local de 7–8.06.1990 (S. João de Kronstadt) — KB05, ficha 34 [4] |
| **CAN1992** | Concílio dos Bispos de 31.03–05.04.1992 (S. Isabel Feodorovna e S. Bárbara) — KB05, ficha 91 [139] |
| **CAN1994** | Concílio dos Bispos de 29.11–04.12.1994 (S. Filareto de Moscovo) — KB05, ficha 22 [4] |
| **CAN1997** | Glorificação de S. Pedro (Polianski), 1997 — KB05, Anexo B [4] |
| **CAN2000** | Concílio Jubilar dos Bispos de 2000 (Portadores da Paixão Imperiais; S. Lucas da Crimeia, glorificação geral) — KB05, fichas 77, 87 [86][6][4] |
| **CAN2004** | Concílio dos Bispos de 3–8.10.2004 (S. Matrona, glorificação geral) — KB05, ficha 63 [7] |

Nota sobre os atos de canonização: os atos do Santo Sínodo / Concílios fixam a **inclusão no menológio e a data**, não o grau do ofício (ex.: fórmula «Включить в месяцеслов…», doc. 01, §8A.1). Por isso as chaves `CAN*` documentam a data/origem da memória; o **grau** vem das BU (ou da conferência azbyka).

---

## 3. Typikon: edição, método e verificação

- **Edição do texto lido.** O texto da azbyka cita como fonte a ed. 2002 do Издательский Совет. Indícios de que reproduz a edição sinodal pré-1917: contém S. Serafim de Sarov a 02.01 com 🕁 (canonizado em 1903) e S. Inocêncio de Irkutsk (1804), mas **não** contém S. Joasafe de Belgorod (1911), S. Hermógenes (1913), S. Pitirim (1914) nem S. João de Tobolsk (1916); nenhum novo mártir.
- **Extração.** Os sinais estão em Unicode (U+1F540–U+1F543) no HTML; foram encontrados 229 sinais (14 🕀, 18 🕁, 53 🕂, 144 🕃) em 365 dias (o 18.04 não tem âncora própria no HTML, mas não tem sinal).
- **🕃 vermelho vs. preto.** A azbyka não usa cores distintas para o glifo, mas coloca-o **dentro** do `<span class="color-red">` quando o sinal é vermelho. Validação deste critério: (a) em **todos** os 🕃 cuja rubrica principal (antes de «На литургии» e das capítulos de Marcos) prescreve «Славословие великое» — que é a definição do 🕃 vermelho no cap. 47 — o sinal está dentro do span vermelho (13.09, 23.09, 23.10, 25.11, 09.12, 26.12, 31.12, 30.06, 02.07, 25.07, 01.08, 13.08, 16.08); nenhum 🕃 «fora do span» tem grande doxologia na rubrica; (b) das comemorações com 🕃 «vermelho» conferidas na azbyka (34), **31** aparecem hoje como «Славословные»; as 3 exceções (Parasceva da Sérvia 14.10, Barlaão e Joasafe 19.11, Constantino de Murom 21.05) explicam-se por rebaixamento na prática atual, não por erro de cor; e os 🕃 «pretos» conferidos (Antão de Siya 07.12, Miguel de Tver 22.11, Jacob de Rostov 27.11, Máximo de Moscovo 11.11, Mercúrio de Smolensk 24.11, Jacob de Borovichi 23.10, Vsevolod de Pskov 11.02) aparecem todos como «Шестиричные».
- **Resultado:** 141 comemorações com 🕀/🕁/🕂/🕃 vermelho no Typikon — 14 grandes, 18 vigílias, 53 polieleos, 56 doxologias. O cruzamento automático JSON ↔ cap. 48 dá **0 em falta e 0 a mais**.
- ⚠ **Verificação contra digitalização de domínio público não concluída.** Tentativas: Wikimedia Commons («Tipikon polnii.djvu», marcado PD-old-1923, é na realidade a **ed. 2002** — página de rosto do Издательский Совет; download e API com HTTP 429), ru.wikisource (429), НЭБ/rusneb.ru (403), HathiTrust (403), Google Books API (quota 0), archive.org (só reedições de 1997/2002 e Typika rutenos de 1899/1901). Os sinais (factos) não são protegidos, mas a dec. 43 pede edição pré-1917: **conferir por amostragem numa digitalização sinodal (1904/1906) da РГБ/НЭБ** quando houver acesso, prioritariamente 01.10 (Pokrov), 05.10, 07.09, 14.10, 19.11 e os 🕃 vermelhos de santos locais.

---

## 4. Conferência por amostragem

### 4.1 BU 2026 (calendar.rop.ru, `?bui=N`)

148 dias consultados (N = 2, 3, 7–9, 13–15, 19–27, 30, 32–34, 37, 38, 40, 43, 44, 46, 47, 49, 53, 55, 56, 58, 61, 67, 68, 74, 76, 81, 83, 86, 89, 90, 93, 97, 103, 104, 109, 115, 120, 122, 126, 128, 129, 133, 134, 136, 138, 140–145, 148, 149, 152–154, 156–158, 160, 162, 165, 168, 172–175, 178–180, 183, 187–190, 193, 194, 196–199, 202, 204, 205, 208, 209, 213, 214, 216–219, 221, 222, 224, 226–228, 232, 234, 238, 241, 244, 246, 248, 249, 251, 255, 257, 260, 263, 265, 267–269, 275–277, 279, 281–284, 286–288, 290–292, 295–297, 299–301, 304). Resultados relevantes:

| OS | Comemoração | Typikon | BU 2026 | Leitura |
|---|---|---|---|---|
| 01.09 | Indicção / Simeão | 🕂 | «славословная служба по Минее»; nota: o Typikon dá polieleo, «но на утрене полиелей не полагается» | atual = doxologia |
| 25.09 | Sérgio de Radonej | 🕂 | «бденной службы» | atual = vigília |
| 05.10 | Hierarcas de Moscovo | 🕂 (texto azbyka) | polieleo; nota 3: «В Типиконе служба святителей отмечена как славословная» | ⚠ §5.1 |
| 06.10 | Tomé | 🕂 | polieleo; nota: na redação atual do Typikon todos os apóstolos dos Doze e evangelistas têm polieleo, nas antigas doxologia/seis | coincide |
| 14.10 | Parasceva da Sérvia | 🕃 verm. | só «служба мучеников не имеет праздничного знака» | atual = null (AZ: seis) |
| 08.07 | Ícone de Kazan | 🕁 | «бденной службы» | coincide |
| 21.05 / 23.06 / 26.08 | Ícone de Vladimir | 🕁 / 🕂 / 🕂 | «полиелейной или бденной» / polieleo / polieleo | 21.05: vigília (AZ «Бденные») |
| 26.06 / 28.07 | Tikhvin / Smolensk | 🕂 / 🕂 | polieleo / polieleo | coincide |
| 23.07 | Potchaiv | — | polieleo | atual = polieleo |
| 12.02 / 13.10 | Iveron | — | polieleo / polieleo | atual = polieleo |
| 02.03 | «Soberana» | — | «может совершаться полиелейная служба» | atual = polieleo (AZ idem) |
| 11.06 | «Digno é» | — | polieleo (Б) | atual = polieleo |
| 09.06 | Ícone da Trindade (Lavra) | — | polieleo (А) | atual = polieleo |
| 19.07 | Serafim, relíquias | — | «бденной службы» | atual = vigília |
| 02.01 | Serafim, repouso | 🕁 | «полиелейной или бденной» | atual = polieleo (AZ: polieleo) |
| 05.07 | Sérgio, relíquias | 🕃 verm. | polieleo (А) | atual = polieleo |
| 20.07 | Elias | 🕁 | «Типикон назначает шестеричную службу (Б), но … допускает всенощное бдение (А)» | atual = null ⚠ §5.3 |
| 27.07 | Pantaleão | 🕁 | «По Уставу … шестеричная (Б). По благословению настоятеля … бденной (А)» | atual = null ⚠ §5.3 |
| 30.07 | João, o Guerreiro | — | doxologia (А) ou polieleo (Б) | atual = doxologia ⚠ |
| 16.06 | Tikhon de Medyn | — | «славословной службы прп. Тихона Калужского» | atual = doxologia ⚠ (KB05: polieleo) |
| 01.05 / 15.05 | Pafnúcio / Demétrio de Úglitch | 🕃 verm. / 🕂 | polieleo (Б) / polieleo (Б) | atual = polieleo ⚠ (AZ: doxologia) |
| 12.09, 21.09, 14.01, 23.08 | despedidas | (sem sinal próprio) | «славословная служба отдания» | incluídas com `grau_typikon` null |
| Lucas 29.05, Matrona 19.04 e 23.02, Xénia 24.01, João Russo 27.05, João de Tobolsk 10.06, Jó 19.06, João de Xangai 19.06, Inácio 30.04, Máximo Grego 21.01, Teófano 10.01 e 16.06, Irinarco 13.01, Metódio de Pechnocha 04.06/14.06, Hermógenes 12.05, Joasafe 04.09, Mitrofano 07.08, Tikhon 26.09 e 09.02, Silvano 11.09, Miguel de Kiev 30.09, Ambrósio 10.10, Optina 11.10, Atanásio 15.10, Cirilo e Maria 28.09, Isabel (relíquias) 28.09, Hilarião 11.07, Nicodemos 14.07, Portadores da Paixão / Rublev / Bogoliubski 04.07, Demétrio Donskoi 19.05, João de Kronstadt 20.12 | — | polieleo (muitas vezes como variante Б ao lado do ofício ordinário) | atual = polieleo |

### 4.2 azbyka.ru/days (57 dias)

2025-09-20, 10-02, 10-10, 10-13, 10-14, 11-01, 11-04, 11-05, 11-06, 11-08, 11-10, 11-11, 11-18, 11-19, 11-21, 11-22, 11-24, 11-26, 11-27, 11-28, 11-29, 11-30, 12-02, 12-04 a 12-10, 12-13, 12-16, 12-18, 12-19, 12-20, 12-22, 12-23, 12-25, 12-26; 2026-01-25, 02-13, 02-24, 03-15, 03-22, 03-24, 03-30, 04-14, 04-19, 05-09, 05-28, 05-29, 06-03, 06-05, 06-06, 06-09, 08-07, 09-03. Usada sobretudo para 19.10–18.12 OS (BU ainda não publicadas) e para os santos locais do Typikon que as BU 2026 não mencionam. Resultados notáveis: Kazan 22.10 polieleo; «Alegria de todos os aflitos» 24.10 polieleo; Demétrio 26.10 polieleo (Typikon 🕁); Sinaxe dos Arcanjos 08.11 polieleo (Typikon 🕁); Tikhon, eleição 05.11 polieleo; Barlaão e Joasafe 19.11 sem sinal (Typikon 🕃 verm.); Eustrácio 13.12 sem sinal (Typikon 🕂); Quarenta Mártires 09.03 sem sinal (Typikon 🕂); Constantino de Murom 21.05 abaixo de doxologia (Typikon 🕃 verm.); «Скоропослушница» 09.11 e ícone de Kursk 27.11 **sem** polieleo (excluídos).

### 4.3 Divergências Typikon ↔ prática atual (resumo)

Sobe: Sérgio 25.09 (polieleo → vigília); Sérgio, relíquias 05.07, e Pafnúcio 01.05 (doxologia → polieleo). Desce: Indicção/Simeão 01.09 (polieleo → doxologia); Demétrio 26.10, Arcanjos 08.11, Serafim 02.01 (vigília → polieleo); Cornélio de Komel 19.05 (polieleo → doxologia, KB05); Elias, Pantaleão (vigília → seis estiqueras, ⚠); Parasceva da Sérvia, Barlaão e Joasafe, Constantino de Murom (doxologia → abaixo); Eustrácio, Quarenta Mártires (polieleo → sem sinal). 64 comemorações sem sinal no Typikon entram pela prática atual (santos posteriores, ícones, despedidas).

---

## 5. ⚠ Pontos em aberto

### 5.1 Fontes do Typikon
1. ⚠ Conferência com digitalização **pré-1917** por fazer (§3).
2. ⚠ **Pokrov 01.10**: o texto lido dá 🕀; o doc. 01 (§4.2) já notava que a ed. 2002 marca o Pokrov (e a Circuncisão) com 🕀, e a rubrica diz «Аще ли храм ея, или изволит настоятель совершити всенощное бдение» (vigília condicional). Conferir o sinal numa edição sinodal.
3. ⚠ **Hierarcas de Moscovo 05.10**: texto lido 🕂; as BU 2026 dizem que o Typikon marca o ofício como **doxologia**. Mantido polieleo em ambas as colunas até conferência.
4. ⚠ Vigílias **condicionais** do Typikon («Аще хощет настоятель, творим бдение»): 26.10, 05.12, 06.12, 17.01, 20.01, 25.01 (🕂 com bdenie facultativo), 23.04, 08.11, 05.07 (Atanásio, só «идеже храм»). O campo guarda o sinal impresso.
5. ⚠ Muitos 🕂/🕃 de santos russos são **locais na origem** («Совершается собор его во обители его / идеже лежат мощи его»); o JSON não distingue esta restrição.

### 5.2 Prática atual
6. ⚠ Conflitos BU ↔ azbyka (regra §1.1 aplicada): Pafnúcio 01.05 e Demétrio de Úglitch 15.05 (BU polieleo / AZ doxologia); Pedro de Krutitsy 27.09 (BU doxologia (Б) e polieleo / AZ polieleo → doxologia); João, o Guerreiro 30.07 (BU doxologia (А) / polieleo (Б); KB05 AZ polieleo → doxologia); Tikhon de Medyn 16.06 (BU doxologia / KB05 polieleo → doxologia); Jorge 23.04 (BU 2026 polieleo por coincidir com o Meio-Pentecostes / AZ vigília → vigília).
7. ⚠ Só Typikon ou só KB05 (sem BU 2026 nem amostra azbyka nova): 08.05 João Teólogo (vigília, TYP48), 09.02 despedida do Encontro e 25.11 despedida da Apresentação (TYP48; o padrão das BU para as outras despedidas é doxologia), 21.12, 14.02, 17.02, 04.03, 07.05, 19.01, 05.02, 26.11, 30.12, 01.06, 19.05 (Cornélio), 05.07 (Atanásio).
8. ⚠ **Cobertura da prática atual**: o inventário cobre (a) todas as 141 entradas do Typikon, (b) os 128 santos do doc. 05 e (c) os dias conferidos em §4. **Outros santos locais com polieleo/doxologia na Minea atual da MP não foram inventariados** (as BU de 19.10–18.12 OS de 2026 não estavam publicadas e a azbyka só pode ser usada por amostragem — dec. 43). Rever ano a ano com as BU.
9. ⚠ S. João de Xangai (19.06): a data de inclusão no menológio da IOR (Concílio dos Bispos de 2008, segundo memória) **não foi verificada** nesta ronda; o grau vem das BU 2026.

### 5.3 Elevações facultativas (não refletidas em `grau_atual`)
Segundo as BU 2026, podem fazer-se por bênção do reitor ou em variante: Elias 20.07 e Pantaleão 27.07 → vigília; Santa Olga 11.07 → polieleo (ordinário: seis estiqueras); ícone do Don 19.08 → polieleo (variante Б); Serafim 02.01, Gregório 25.01, Nicolau 09.05, ícone de Vladimir 21.05 → «polieleo ou vigília»; Sérgio 05.07 e Atanásio 05.07 em igrejas dedicadas → vigília. A azbyka dá polieleo a Elias. Ícone de Feodorovskaia (14.03, 16.08), «Неупиваемая Чаша» (05.05), «Скоропослушница» (09.11) e Kursk (27.11): sem polieleo nas fontes consultadas → excluídos.

### 5.4 Memórias móveis excluídas do ficheiro `MM-DD`
Sinaxe dos Novos Mártires e Confessores (domingo mais próximo de 25.01 OS; vigília segundo KB05); Sinaxe dos Santos de Moscovo (domingo antes de 26.08 OS; vigília como variante Б nas BU 2026); Todos os Santos da Terra Russa (P+63); Barlaão de Khutyn (1.ª sexta-feira do jejum de S. Pedro, KB05); ícone de Iveron (terça da Semana Luminosa), Potchaiv (sexta da Semana Luminosa), Kursk (9.ª sexta depois da Páscoa) — não verificados nesta ronda. Ver doc. 01, §8A.2.

---

## 6. Contagens

| | grande | vigília | polieleo | doxologia | null |
|---|---|---|---|---|---|
| `grau_typikon` | 14 | 18 | 53 | 56 | 64 |
| `grau_atual` | 14 | 15 | 108 | 61 | 7 |

Por tipo: santo 164 · senhor 15 · ícone 15 · Mãe de Deus 11.

## Ajuste da revisão (2026-10-16)

`AJUSTE-DOMINGO` — Em 03.09, 20.07 e 27.07 OS o `grau_atual` tinha sido deduzido das Богослужебные указания de 2026, ano em que estes dias calham ao **domingo** (o ofício do santo junta-se ao dominical e o sinal próprio não aparece). Não é prova de descida de grau: repôs-se o grau do Typikon. ⚠ PARA CONFIRMAR com um ano em que caiam em dia útil.
