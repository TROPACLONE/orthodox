# Base de conhecimento — Ortodoxia Russa (Patriarcado de Moscovo)

Fase 1 do projeto: recolha de factos documentados que servirão de fundamento à aplicação.

## Critérios

- **Referência:** calendário juliano (estilo antigo), segundo a prática da Igreja Ortodoxa Russa na Rússia; as datas civis (gregorianas) são indicadas como equivalência.
- **Língua:** (a app terá 4 línguas — PT-PT, UK, RU, EN — decisão 28) principalmente português europeu (PT-PT), com os termos originais (eslavo eclesiástico / russo / grego) entre parênteses. Admite-se inglês (citações, passagens técnicas, algoritmos) quando a tradução perderia precisão. O conteúdo editorial da app é escrito primeiro em PT-PT (língua-fonte) e depois traduzido.
- **Rigor:** cada afirmação tem fonte numerada. Pontos contraditórios ou não verificados ficam marcados com `⚠ PARA CONFIRMAR`.
- **Norma vs. prática:** distingue-se sempre o Typikon (norma) da prática paroquial russa corrente.

## Documentos

| # | Documento | Âmbito |
|---|-----------|--------|
| 01 | [Calendário e leituras](01-calendario-e-leituras.md) | Juliano↔gregoriano, Pascália, ciclos fixo e móvel, festas, tons, lecionário, fontes de dados |
| 02 | [Jejuns e disciplina](02-jejuns-e-disciplina.md) | Níveis de jejum, jejuns plurianuais e de um dia, semanas livres, jejum eucarístico, prostrações |
| 03 | [Orações e textos](03-oracoes-e-textos.md) | Molitvoslov, preparação para a Comunhão, Oração de Jesus, Saltério, fontes de textos e licenças |
| 04 | [Doutrina e terminologia](04-doutrina-e-terminologia.md) | Credo, dogmas, Mistérios, ofícios, estrutura da IOR, glossário PT-PT |
| 05 | [Santos](05-santos.md) | ~100 santos principais: datas, posição no Typikon, biografia factual |
| 06 | [Padres, espiritualidade e biblioteca](06-padres-espiritualidade-e-biblioteca.md) | Padres da Igreja, Filocalia, monaquismo, catálogo de livros gratuitos |
| 07 | [História da Igreja](07-historia-da-igreja.md) | Da Igreja primitiva à atualidade; Rus'; Ortodoxia em Portugal |
| 08 | [Ícones, templo, música, peregrinações](08-icones-templo-musica-peregrinacoes.md) | Iconografia, arquitetura, vestes, cores litúrgicas, canto, mosteiros |
| 09 | [Fontes multilingues](09-fontes-multilingues.md) | Textos litúrgicos e Bíblias em RU/UK/EN, glossário em 4 línguas, i18n e tipos de letra eslavos |

## Estado (fase 1 concluída)

| Documento | Linhas | Fontes | ⚠ por confirmar |
|---|---|---|---|
| 01 Calendário e leituras | 519 | 40 | 13 |
| 02 Jejuns e disciplina | 525 | 32 | 22 |
| 03 Orações e textos | 596 | 63 | 32 |
| 04 Doutrina e terminologia | 754 | 56 | 24 |

Para listar todos os pontos em aberto: `grep -n "PARA CONFIRMAR" docs/conhecimento/*.md`
