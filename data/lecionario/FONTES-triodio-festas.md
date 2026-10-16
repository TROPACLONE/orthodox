# Fontes — Triódio, sábados/domingos especiais e festas fixas

Ficheiros abrangidos: `triodio.json` (P−70 … P−1), `especiais.json`, `festas.json`.
Compilado a 2026-10-16. Fora de âmbito: Pentecostário e semanas depois do Pentecostes (outro compilador); Ascensão e Pentecostes ficam remetidas para esse ficheiro (`festas.json → _meta.moveis`).

## 1. Fontes usadas (domínio público)

| # | Fonte | Acesso | O que se conferiu |
|---|---|---|---|
| F1 | **Священное Евангелие** (Evangeliário de altar), Kyiv, tipografia da Lavra, c. 1875–1879 (pré-1917, domínio público) | archive.org/details/svjaschennoeevangelie44 — imagens das págs. n642–n646 (Сказание do Triódio; Semana Santa; 12 Evangelhos da Paixão; Horas Reais; 11 Evangelhos matinais) e n647–n682 (Собор­ник/Месяцеслов: festas; «общие» dos santos) | todos os **Evangelhos** (zachalo) do Triódio aos sábados/domingos, Semana do Publicano a Semana do Queijo, Semana Santa, Horas Reais, 12 Evangelhos, eothina; Evangelhos das festas (matinas e liturgia); sábados/domingos antes/depois da Exaltação; véspera e festa do Natal e da Teofania; comuns |
| F2 | **Апостол** sinodal (reimpressão fac-similada do texto sinodal, cuja tábua — «Сказание…», «Месяцеслов…», «Прокимни… общии» — é a das edições pré-1917) | archive.org/details/Bogosluzhebnyeknigi_20221222_221247_078022, ficheiro `Апостол.pdf`, págs. impressas 443–450 (Триодь), 452–514 (Месяцеслов), 515–518 (общие) | todos os **Apóstolos** (zachalo) do Triódio, Semana Santa, Horas Reais do Natal e da Teofania, festas, sábados/domingos especiais e comuns |
| F3 | I. F. Hapgood, *Service Book of the Holy Orthodox-Catholic Apostolic (Greco-Russian) Church*, Boston, 1906 (domínio público) | archive.org/details/cu31924029363128 (OCR `_djvu.txt`), págs. xix–xxv: «A Table of Lessons…», «…for the Twelve Great Feasts», «…for the Saints in General» | **versículos** (o índice sinodal só dá o zachalo): domingos do Triódio e da Quaresma, Semana Santa (matinas/liturgia), sábados/domingos especiais, 12 festas, comuns |
| F4 | *Триодь постная*, Lviv, 1906 (domínio público) | archive.org/details/triodion-1906 | consultada; o OCR eslavo é ilegível e não foi usada para extração sistemática (ver ⚠ 1) |

Não se usaram dados do Ponomar (GPL) nem de bases com direito *sui generis* (dec. 43). A azbyka.ru serviu **apenas** de amostragem de verificação (secção 3).

## 2. Método

1. Esqueleto P−70 … P−1 gerado por script (`offset` relativo à Páscoa); cada dia tem `ap`, `ev`, `vt`.
2. Número do zachalo lido diretamente nas imagens de F1/F2 (numerais cirílicos com titlo). Atenção: na tipografia de F1/F2 o **ѳ (9)** parece-se com **д (4)**; todos os casos ambíguos foram resolvidos pela sequência dos zachala e, em 1 caso, pela amostragem (Hb zach. 309, ver ⚠ 3).
3. Versículos: do índice de F3 quando existe; nos restantes casos, a extensão canónica do zachalo indicado pela fonte (conhecimento do lecionário), em **numeração eslava/LXX** (dec. 18: p. ex. Rm 14,19-26; Jr 38,31-34; Dn 3,1-88).
4. Leituras do AT (`vt`): ver ⚠ 1 — conferidas por amostragem, não por leitura integral de fonte impressa; as não conferidas têm `"verificado": false`.
5. Validação: `python3 -m json.tool` em todos os ficheiros; regex de formato em todas as referências; 70 chaves (−70 … −1) presentes.

## 3. Verificação por amostragem (azbyka.ru/days, ano 2026, Páscoa = 12.04 NS)

Só comparação; nada foi copiado. 18 dias:

| Dia (offset) | Data NS | Conferido | Resultado |
|---|---|---|---|
| P−57 sáb. «de carne» | 14.02.2026 | 1 Cor 146; Lc 105; defuntos 1 Ts 270, Jo 16 | ✔ |
| P−53 qua. queijo | 18.02.2026 | Jl 2,12-26; Jl 3,12-21 | ✔ |
| P−50 sáb. queijo | 21.02.2026 | Rm 115; Mt 16; Gl 213; Mt 43 | ✔ |
| P−44 sex. sem. 1 | 27.02.2026 | Is 3,1-14; Gn 2,20-3,20; Pr 3,19-34 | ✔ |
| P−39 qua. sem. 2 | 04.03.2026 | Is 5,16-**25**; Gn 4,16-26; Pr 5,15-6,3 | ✖→corrigido (rascunho tinha Is 5,16-26) |
| P−36 sáb. 2 | 07.03.2026 | Hb 3,12-16 zach. **309**; Mc 6; Jo 16 | ✖→corrigido (rascunho 308; F2 ambíguo ѳ/д) |
| P−34 seg. sem. 3 | 09.03.2026 | Is 8,13-9,7; Gn 6,9-22; Pr 8,1-21 | ✔ |
| P−32 qua. sem. 3 | 11.03.2026 | Is 10,12-20; Gn 7,6-9; Pr 9,12-18 | ✔ |
| P−31 qui. sem. 3 | 12.03.2026 | Is 11,10-12,2; Gn 7,11-8,3; Pr 10,1-22 | ✔ |
| P−25 qua. sem. 4 | 18.03.2026 | Is 26,21-27,9; Gn 9,18-10,1; Pr 12,23-13,9 | ✔ |
| P−24 qui. sem. 4 | 19.03.2026 | Is 28,14-22; Gn 10,32-11,9; Pr 13,20-14,6 | ✔ |
| P−18 qua. sem. 5 | 25.03.2026 | Is 41,4-14; Gn 17,1-9; Pr 15,20-16,9 | ✔ |
| P−17 qui. sem. 5 | 26.03.2026 | Is 42,5-16; Gn 18,20-33; Pr 16,17-17,17 | ✔ |
| P−13 seg. sem. 6 | 30.03.2026 | Is 48,17-49,4; Gn 27,1-41; Pr 19,16-25 | ✔ |
| P−11 qua. sem. 6 | 01.04.2026 | Is 58,1-11; Gn 43,26-31;45,1-16; Pr 21,23-22,4 | ✔ |
| P−10 qui. sem. 6 | 02.04.2026 | Is 65,8-16; Gn 46,1-7; Pr 23,15-24,5 | ✔ |
| P−6 Grande Segunda | 06.04.2026 | Mt 84 (matinas); Mt 98 | ✔ |
| P−1 Grande Sábado | 11.04.2026 | 1 Cor 133 + Gl 206; Mt 114; Rm 91; Mt 115 | ✔ |

Resumo: 16/18 coincidentes à primeira; 2 divergências do rascunho, corrigidas (assinaladas acima).

## 4. ⚠ Pontos em aberto

1. **AT da Quaresma (Isaías/Génesis/Provérbios, 30 dias)**: 13 dias conferidos por amostragem (todos ✔ exceto P−39, corrigido); os outros 17 dias e Joel/Zacarias da semana do queijo vêm do conhecimento do Triódio, **sem conferência linha a linha** em fonte impressa de domínio público (o Triódio de Lviv 1906 tem OCR ilegível). Recomenda-se conferir com as imagens de F4 (incipit/explicit) antes da publicação.
2. **AT da Semana Santa, Horas Reais (Natal, Teofania, Sexta-feira Santa), Vésperas de 24.12, 05.01, Quinta/Sexta/Sábado Santos, parémias de Ramos, Bênção da Água**: `verificado: false`. Extensões de versículos podem variar entre edições (p. ex. Br 3,35/3,36; Is 8,8-10/8,9-10; Dn 3 com a Oração de Azarias em numeração eslava). Só o Grande Sábado (15 parémias) segue a ordem do Typikon com segurança.
3. Hb 3,12-16 (2.º sábado): F2 lê-se «тд/тѳ»; adotado **309** (confirmado na amostragem). Por coerência, Hb 3,5-11.17-19 = 308 e Hb 4,1-13 = 310 (não usados aqui).
4. **Grande Terça (matinas)** Mt 22,15-23,39: F1 indica zach. **90** (início em 22,15); algumas tabelas modernas dão 92. Mantido 90 (fonte). **Grande Quarta (matinas)** Jo 12,17-50: F1 indica zach. **41**.
5. **Semana do queijo, quinta-feira**: Lc 23,1-34.44-56 (zach. 110) — extensão de versículos não confirmada por F3 (variante 23,1-31.33.44-56 nalgumas tabelas).
6. **Véspera da Teofania em sábado/domingo**: a rubrica de F2 («аще ли несть пост, начинаем его от полу») foi interpretada como início do Apóstolo (zach. 143) a meio; confirmar no Typikon de 1904, 05.01.
7. **Comuns «hierarcas»**: F1 dá Mt 11 e Jo 35 (leitura do índice incerta: «от полу»); F3 dá Jo 10,1-9 (matinas) e Mt 5,14-19 ou Jo 10,9-16 (liturgia). Adotado F3 com zach. de F1.
8. **Zaqueu**: sem Apóstolo próprio — usa-se o do domingo ordinário corrente (cálculo do outro compilador / §7.5).
9. **Comum de um Apóstolo**: F2 só tem a leitura geral dos Apóstolos (1 Cor zach. 131); usada para ambos.
10. Ascensão (P+39) e Pentecostes (P+49) — das Doze Festas — não estão em `festas.json` para não duplicar o ficheiro do Pentecostário.
11. Edição de F2: reimpressão moderna (≈ 2001) do texto sinodal; a tábua coincide com as edições sinodais pré-1917, mas convém confirmar 2–3 entradas num exemplar datado (rsl.ru) para fechar a questão de direitos.

## 5. Convenções de dados

Ver `_meta.convencoes` em `triodio.json`. Resumo: `{"r": "Livro.C.V-V;…", "z": n}`; `meio: true` = «от полу»; `sv` = serviço; `tipo` = leitura adicional (santo, Mãe de Deus, defuntos); OT em `vt` com `sv` (hora6, vesperas, …) e `n` (ordem das parémias). Códigos de livro OSIS; 1Kgs/2Kgs = 3/4 Reinos (LXX).

## 6. Verificação de conteúdo (decisão 49, fase 1 — 2026-10-16)

Relatório completo: `docs/qa/fase1-conteudo.md` §6. Das 71 leituras do AT com `verificado: false`, **55** foram confirmadas numa fonte impressa de domínio público e passaram a `verificado: true` com o campo `conf` (página): Hapgood 1906 (imagens conferidas, págs. 174–175, 182–183, 189–191, 204, 210–213, 217–218, 223–224) e, para Jb 1,1-12, o Τριῴδιον κατανυκτικόν de Veneza, 1876. As **16** restantes ficam `false` com `nota_verif` (Hapgood omisso ou com delimitação diferente — KJV).

Correções (fontes: Hapgood 1906 = H; calendário oficial MP 2026 = OF26; azbyka = AZ, só verificação):
- P−1, 11.ª parémia: Is 61,1-10 → **Is 61,1-9** (H p. 224; o v. 10 abre a 9.ª parémia).
- P−21 (S. João Clímaco): Ef 5,9-19 **z 224** → **Ef 5,8-19 z 229** (z 224 = Ef 4,7-13, OF26 25.01.2026; coerência com semanas.json).
- P−2, 3.ª hora: Rm 5,6-10 → **Rm 5,6-11** (OF26 10.04.2026; AZ 30.04.2027).
- P−2, Vésperas, Evangelho composto: → **Mt 27,1-44; Lc 23,39-43; Mt 27,45-54; Jo 19,31-37; Mt 27,55-61** (OF26; AZ; H divide em 38/39).
- P−61: 1 Jo 3,11-20 → **3,10-20** (OF26 10.02.2026).
- 05.01, Horas Reais, 6.ª hora: Mc 1,9-11 → **Mc 1,9-15** (H p. 182; OF26 16.01.2026).
- 05.01, `variante_sab_dom` (Vésperas quando a véspera cai ao sáb./dom.): 1 Cor 9,19-27 → **1 Cor 10,1-4** (z 143, от полу; OF26 18.01.2026). Resolve o ⚠ 6.
