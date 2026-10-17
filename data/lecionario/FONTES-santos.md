# Fontes — leituras próprias dos santos (`santos.json`)

Fase 3, tarefa S3 (dec. 61, 76). Compilado a 2026-10-17. Motor: `src/engine/leituras.js` (`juntaSantos`, `leSantos`, `juntaDeslocadas`).

## 1. Ficheiro e esquema

```json
{"MM-DD (juliano)": [{"id": "<id de data/menaion/graus.json | pon-<CId>>", "grau": "vigilia|polieleo|doxologia|seis|simples|null",
  "ap": [{"r": "Heb.13.17-21", "z": 335}], "ev": [...], "matinas_ev": [...], "vt": [{"r": "...", "sv": "vesperas"}],
  "fonte": "PON:<CId> | comum:<cat> | comum*:<cat> | MP | festa:<MM-DD> | por-resolver", "conf": "OF26", "nota": "..."}],
 "dom_padres_seis_concilios": [...], "dom_padres_vii_concilio": [...]}
```

- **216 entradas em 183 dias** + 2 domingos semimóveis dos Padres (chave = id de `calendario.semimoveis`).
- **148 entradas com id dos graus** (vigília 15, polieleo 108, doxologia 21, `null` 4) e **68 santos de grau inferior** (`pon-<CId>`: 42 de seis estiqueras, 26 sem sinal), com o nome em `cu` (russo civil do Ponomar).
- `matinas_ev` (90) e `vt` (17, parémias das Vésperas) só nos santos de polieleo/vigília. `meio: true` = «от полу».
- Grandes festas fixas e Sinaxes de 26.12 / 07.01 continuam em `festas.json` (não duplicadas). Despedidas: só a da Dormição (23.08) tem Apóstolo/Evangelho da festa; as outras não têm leituras próprias.
- `conf: "OF26"` = coincide com o calendário oficial 2026 (127 entradas). Sem `conf` = fora do período conferível (19.10–18.12 OS) ou dia em que o motor não lê santos.
- `fonte: "por-resolver"` (7) e `MP` sem leituras (1): o santo tem leituras no calendário oficial que nenhuma fonte aberta dá — o motor não mostra nada (§5).

## 2. Fontes

| Chave | Fonte | Uso |
|---|---|---|
| **PON** | **Ponomar** (github.com/typiconman/ponomar, commit `0af645f`, 2025-08-17), **GPL v3 ou posterior** — permitido pela dec. 76 (exceção à dec. 8), com atribuição. Ficheiros `languages/xml/lives/<CId>.xml` (SERVICE/LITURGY/MATINS/VESPERS), `languages/cu/xml/MM/DD.xml` (memórias do dia), `languages/cu/ru/xml/lives/<CId>.xml` (nomes), `languages/en/bible/kjv/Composite.text` (parémias compostas, só a lista de versículos) | leituras de 164 entradas |
| **comum** | Leituras gerais («общие») do Apóstolo e do Evangeliário sinodais — `festas.json → comuns` (ver FONTES-triodio-festas.md, F1/F2) | 36 entradas; categoria pelo título (Прп./Свт./Сщмч./Мч./Ап./ícone…) |
| **comum\*** | Combinação de leituras gerais da mesma família (tabela `FAM` do gerador: p. ex. venerável = Gl 213 / 2 Cor 176 / Gl 208 × Mt 43 / Lc 24 / Mt 10) escolhida pela conferência com o OF26 | 8 entradas |
| **MP** | Correção pontual onde o Ponomar (prática ROCOR) diverge: S. Simão Zelota (Mt 56, não Mt 34) | 1 (+1 por resolver) |
| **OF26** | Издательство Московской Патриархии, Православный церковный календарь 2026 (calendar.rop.ru), fixture `tests/referencia-leituras.json` — **só verificação** (direito *sui generis*): escolhe entre variantes já dadas pelas fontes; nenhuma leitura foi copiada dele | 227 dias |

Zachala sem `Pericope` no Ponomar: mapa início-de-perícope → zachalo a partir de todos os ficheiros do lecionário e das perícopes numeradas do Ponomar; 1 Jo 4,7-11 = zach. 73 «от полу» (manual).

## 3. Método

1. Para cada memória dos graus (doxologia ou superior), procura-se a memória do Ponomar do mesmo dia por radicais do nome (8 casamentos errados excluídos à mão). Leituras próprias = bloco LITURGY sem condições `Cmd` (Matinas: aceita-se `dow != 0`).
2. Candidatos, por ordem: próprias (PON/MP) → comuns da categoria (todas as combinações principal × alternativas) → comum\* (família da categoria, só polieleo/vigília).
3. Dias do OF26: escolhe-se o 1.º candidato cujas leituras da Liturgia estão todas no dia oficial e explicam pelo menos uma referência que o motor ainda não dá (ordinário, festa, Evangelho matinal dominical, outro santo do dia). O Evangelho das Matinas é o da fonte ou, se o OF26 imprimir outro da lista habitual (Mt 43, Jo 35, Lc 4, Jo 67, Lc 106, Mt 104), esse.
4. Doxologia e graus inferiores: só entram se a fonte der **leituras próprias** e, nos dias conferíveis, se o OF26 as imprimir. Omitidas 33 memórias de doxologia/`null` (sem leituras próprias na fonte ou não impressas no OF26: p. ex. Nikita de Novgorod, Arsénio de Tver, Estêvão de Perm, José de Volokolamsk, Sabbatius de Solovki).
5. Polieleo/vigília sem candidato coincidente num dia em que o motor lê santos → `por-resolver` (sem leituras).
6. Gerador (Node, fora do repositório): extração do Ponomar → casamento → candidatos → conferência; reproduzível a partir desta descrição.

## 4. Regras implementadas no motor (prática russa atual, doc. 01 §5, §7.4)

- **Junção:** as leituras do santo juntam-se às do dia (`extra: {rotulo: 'santo', id, grau, ap, ev, vt?, matinas_ev?}`), em dia útil, sábado e domingo (domingo: dominicais + santo — OF26 18.10.2026, 16.08.2026). A mesma perícope não se repete (dedup por livro + zachalo). Domingos dos Padres do VI e do VII Concílio: com as dominicais (OF26 26.07 e 25.10.2026).
- **Sem santos:** grandes festas do Senhor e da Mãe de Deus (fixas e móveis), festas que substituem em dia útil (Natividade e Degolação do Precursor, Pedro e Paulo, Proteção), vésperas do Natal/Teofania e Horas Reais; Quaresma (P−48…P−7), Semana Santa e Luminosa; despedida da Páscoa (P+38), Ascensão, sábado de defuntos antes do Pentecostes, Pentecostes, Dia do Espírito Santo; sábados P−57 e P−50; domingos do Triódio (P−70…P−49) e do Pentecostário até Todos os Santos russos (P+63). Todas conferidas no OF26 (p. ex. S. Marcos de Éfeso no domingo do Publicano 2026, S. Metódio no domingo de Tomé, S. Nilo de Sora na despedida da Páscoa).
- **`incerto`:** Quaresma, dia útil, com santo de polieleo/vigília (Liturgia dos Pré-santificados ou por bênção: pode ler-se o santo; nenhum caso no OF26).
- **«Под зачало» (deslocadas):** quando uma festa em dia útil desloca as ordinárias (`deslocadas`), estas leem-se na véspera; se a véspera for domingo (ou não tiver ordinárias), no dia seguinte — `extra: {rotulo: 'ordinario', facultativo: true, de: <jdn>}`. ⚠ O OF26 só o imprime em 1 de 6 casos (22.09.2026: Ef 219, sem o Evangelho Mc 48), por isso fica facultativo e fora da verificação estrita.
- Mantém-se: sábados especiais com ordinário «под зачало» (D9), Zaqueu, festas da Mãe de Deus ao domingo (já existentes).

## 5. Verificação (tests/referencia.test.mjs, ESTRITO)

- 227 dias oficiais 2026: **0 dias com leituras do motor fora do calendário oficial** (agora incluindo as 122 leituras de santos).
- **Coincidência total** (todas as referências do dia oficial dadas pelo motor, contando Evangelhos das Matinas e deslocadas): **79 → 150 dias** (limiar `MIN_COMPLETOS = 150`).
- Memórias conferidas: 76 de 93 memórias dos graus em dias conferíveis (as restantes: santos não lidos nesse dia — Triódio/Pentecostário/Quaresma — ou por resolver).

## 6. ⚠ Casos em aberto

1. **Por resolver** (o OF26 imprime leituras que nem o Ponomar nem os comuns dão; conferir no Месяцеслов do Apóstolo/Evangelho sinodais): S. Tiago de Zebedeu 30.04 (OF26: At 29, Lc 17), Constantino e Helena 21.05 (Gl 200?), ícone da Trindade 09.06, André Rublev e André Bogoliubski 04.07, relíquias de S. Mitrofano 07.08, S. João de Kronstadt 20.12, S. Metódio de Pechnocha 14.06 (Gl 213 sem Evangelho identificável).
2. **Não conferidos** (fora do OF26 ou dia sem santos em 2026): 17 entradas só com comuns (Irinarco de Rostov, Marcos de Éfeso, Cirilo, Hermógenes, Matrona (relíquias), Daniel de Moscovo, Metódio, Nilo de Sora, glorificação de João de Kronstadt, Nicodemos, Tikhon (glorificação, eleição), ícone «Alegria dos aflitos», Demétrio de Rostov, Jó de Pochaiv, Filareto, Joasafe) e 46 com leituras do Ponomar (prática ROCOR: pode divergir da MP como em Simão Zelota).
3. **Santos de grau inferior sem leituras próprias na fonte** que o OF26 imprime com comuns (p. ex. Melânia 31.12, Isaac da Dalmácia 30.05): não entram (a fonte não os dá; escolher o comum seria copiar o OF26).
4. **Memórias móveis** fora deste ficheiro: Concílio dos Novos Mártires (domingo 25.01 ± — o OF26 2026 imprime Rm 99 num domingo do Triódio), transferência de S. Jorge para a Semana Luminosa/Tomé, Todos os Santos russos (P+63: Hb 330, Mt 10 — falta no Pentecostário), concílios locais (§8A do doc. 01).
5. **Ordem** santo/dia: o motor põe sempre as do dia primeiro e as do santo em `extra`; para os santos de vigília em dia útil o Typikon lê primeiro o santo («и рядовое под зачало») — só afeta a apresentação.
6. A app (`src/app.js`, não alterada) mostra o grupo `santo` com o rótulo genérico das festas e ignora `matinas_ev`; o grupo `ordinario` facultativo aparece como «ordinário».
7. `festas.json → comuns.hieromartires.ap_alt`: Fl 3,20-4,3 está como zach. 249; o Ponomar dá 246 (Fl 249 = Cl 1,3-6 no Ponomar) — a confirmar no Apóstolo sinodal.
