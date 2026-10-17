# Esquema dos dados das orações (`data/oracoes/<id>.json`)

Decisões aplicáveis: 5, 7, 29, 36–38, 40–41, 44, 52–53.

```jsonc
{
  "id": "manha",                                   // nome do ficheiro sem .json
  "titulo": { "cu": "…", "pt": "…", "ru": "…", "uk": "…", "en": "…" },
  "fontes": [ { "chave": "MS1900", "descricao": "Молитвослов, Синодальная типография, 1900", "url": "https://archive.org/…", "notas": "…" } ],
  "estado": { "pt": "nao_revista", "ru": "dp_adaptada", "uk": "nao_revista", "en": "dp_adaptada" },
  //   nao_revista = tradução própria não revista (dec. 44); dp_adaptada = tradução de domínio público adaptada (dec. 36/41);
  //   revista_nativo / revista_clero = estados seguintes (dec. 44)
  "blocos": [
    {
      "id": "manha-01",                            // estável: a interface e os testes usam-no
      "tipo": "rubrica" | "oracao" | "titulo",
      "cu": "…",          // eslavo eclesiástico em ESCRITA CIVIL PRÉ-REFORMA COM ACENTOS (U+0301; mantém ѣ, і, ѳ, ѵ, ъ final),
                          // transcrito de edição sinodal pré-1917 de domínio público. A forma moderna (dec. B3) e o
                          // «Київський ізвод» (dec. 38) são gerados por src/engine/eslavo.js — não se guardam à parte.
      "pt": "…", "ru": "…", "uk": "…", "en": "…",  // tradução de cada bloco (rubricas também traduzidas)
      "fonte": { "cu": "MS1900 p. 5", "ru": "Z1912 p. 12" | "propria", "en": "H1906 p. 3" | "propria", "pt": "propria", "uk": "propria" },
      "repetir": 3,                                // opcional: «(três vezes)»
      "quando": { "so": ["semana_luminosa"] } | { "excepto": ["pascoa_ascensao", "ascensao_pentecostes"] },   // opcional
      "nota": "…"                                  // opcional, PT: decisões de tradução, ⚠ dúvidas
    }
  ]
}
```

Períodos (`quando`), calculados pelo motor a partir da Páscoa (doc. 03 §1.4, decisão B1):
- `semana_luminosa` — P … P+6 (as orações da manhã e da noite são substituídas pelas Horas Pascais);
- `pascoa_ascensao` — P+7 … véspera da Ascensão (a oração da noite da quarta-feira P+38 já pertence à Ascensão, B1);
- `ascensao_pentecostes` — Ascensão … véspera do Pentecostes (as orações começam em «Santo Deus»);
- `quaresma` — P−48 … P−1, de segunda-feira da 1.ª semana a Sábado Santo, incluindo Sábado de Lázaro, Ramos e Semana Santa (como no Molitvoslov atual por data; usado no tropário «Егда́ сла́внии» do ofício da Comunhão);
- `comum` — o resto do ano.

Regras de tradução:
- **PT-PT**: tradução própria a partir do eslavo (grego só para controlo); «Tu» para Deus (dec. 52); AO 1990; terminologia do glossário (doc. 04 §7, doc. 09 §3); nomes tradicionais portugueses (dec. 19).
- **RU**: Zaionchkovsky 1912 (domínio público) com ortografia modernizada, onde cobrir o texto; senão tradução própria (dec. 36). Indicar em `fonte.ru`.
- **UK**: tradução própria com a terminologia da IOU (dec. 30, 37): Іісус, Іоанн, Богородиця…
- **EN**: Hapgood 1906 (domínio público) adaptado onde cobrir; senão tradução própria; Thee/Thou (dec. 53); en-GB.
- Fidelidade: tradução fiel, sem paráfrase nem acrescentos; quando o eslavo é ambíguo, seguir o grego e anotar em `nota`.

## Saltério (2c; dec. 18, 40, 41, 64, 65)

Ficheiros em `data/oracoes/` (mesmo formato das orações, mesmo gerador):
- `salterio-antes.json`: orações antes da leitura do Saltério (lidas antes de cada sessão).
- `salterio-01.json` … `salterio-20.json`: uma catisma por ficheiro (`id` = `salterio-01`…).
- `salterio-depois.json` (só se a fonte PD o tiver): orações depois de ler todo o Saltério.

Blocos novos, além de `rubrica | oracao | titulo`:
```
{ "id": "sl-050", "tipo": "titulo", "sl": 50, "cu": "Псало́мъ 50.", "pt": "Salmo 50 (51)", "ru": "Псалом 50", "uk": "Псалом 50", "en": "Psalm 50 (51)" }
{ "id": "sl-050-03", "tipo": "verso", "sl": 50, "v": 3, "cu": "…", "pt": "…", "ru": "…", "uk": "…", "en": "…" }
```
- `sl` e `v`: numeração LXX/eslava (dec. 18); número hebraico entre parênteses só no título, quando difere.
- Grelha de versículos de referência: `data/salterio/_fontes/grelha.json` (Bíblia isabelina, módulo CSlElizabeth, domínio público): 151 salmos, 2529 versículos; o sobrescrito conta como versículo (Sl 50,1–2). Diferenças com Brenton: Sl 71, 114, 129, 141 (alinhar ao eslavo e assinalar em nota).
- A fonte por omissão de cada língua para os versículos vai no nível do ficheiro: `"fonteVersos": { "cu": "…", "ru": "YU1915", "en": "BR1851", "pt": "propria", "uk": "propria" }`; `fonte` num bloco só quando foge à regra.
- «Glórias» (статии): rubrica + fórmulas, segundo a Следованная Псалтирь PD; ids `kNN-gM-…`.
- Modo **«pelos defuntos»** (dec. 64): a etiqueta `defuntos` entra em `quando.so` / `quando.excepto` como os períodos (p. ex. «Помяни, Господи» com `"quando": {"so": ["defuntos"]}`). O motor recebe o período e os modos ativos.

Tradução dos salmos: PT e UK próprias a partir do eslavo isabelino, LXX grega só como controlo (dec. 40); RU Yungerov (dec. 41); EN Brenton adaptado (Thee/Thou já é o de Brenton; en-GB). Salmos que já existem noutras orações (Sl 50, 22, 23, 115, 142…): o texto do Saltério é a referência; as diferenças com os blocos existentes são assinaladas para alinhar.
