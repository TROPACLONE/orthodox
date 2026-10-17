# Saltério 2c — colunas EN (Brenton) e RU (Yungerov): fontes, alinhamento, divergências

> Staging: `data/salterio/_staging/en.json` e `ru.json` — um objeto `{"sl.v": "texto"}` cada, com exatamente as 2529 chaves de `data/salterio/_fontes/grelha.json` (151 salmos, numeração LXX/eslava). Validado por script: conjunto de chaves = grelha, nenhum texto vazio. Gerado em 2026-10-17 a partir das fontes abaixo; nada copiado de azbyka.ru (consultada só para um dado bibliográfico, §1.2).

## 1. Fontes e prova de domínio público

### 1.1 EN — Brenton 1851 (BR1851)

- **Texto:** L. C. L. Brenton, *The Septuagint Version of the Old Testament, according to the Vatican Text, translated into English*, Londres, 1851 (Brenton † 1862).
- **Ficheiro usado:** eBible.org «eng-Brenton», USFM `20-PSAeng-Brenton.usfm` (pacote https://ebible.org/Scriptures/eng-Brenton_usfm.zip; ficheiros-fonte datados de 7 out. 2026). SHA-256 do ficheiro: `12602415af372ce675b511eae878b94fd12e048dd882110a3ce130d0eeed8622`.
- **Licença:** `copr.htm` do mesmo pacote e https://ebible.org/eng-Brenton/copr.htm (verificado em linha em 2026-10-17): «Translation of the Greek Septuagint into English by Sir Lancelot Charles Lee Brenton. Published in 1851, and now in the Public Domain.» + rodapé «Public Domain». A página de frente `00-FRTeng-Brenton.usfm` só contém a lista de abreviaturas de Brenton (sem restrições).
- **Adaptação feita (mínima):**
  - retiradas as notas `\f…\f*` e referências `\x…\x*`; marcas `\add` (itálicos de Brenton: palavras suplementadas) e `\sc` reduzidas a texto simples — as palavras ficam, o itálico perde-se;
  - apóstrofos retos → tipográficos (’); o texto de Brenton nos Salmos **não tem aspas**, só apóstrofos;
  - grafia britânica e arcaísmos tal como impressos (*shew, to-day, Judæa, Æman, Ætham, Aggæus, honour*…); minúsculas nos pronomes divinos (*thee, thy, he*) como em Brenton — **sem** a capitalização usada nos blocos existentes (ver §7);
  - parênteses e parênteses retos de Brenton mantidos como impressos (7.4, 44.6, 67.5, 118.60; 146.8 «[and green herb for the service of men;]» = texto que Brenton marca como ausente do Vaticano; o eslavo tem-no);
  - **«Pause.» (Διάψαλμα) mantido** em 72 versículos (o eslavo não tem диапсалма; inclui 9.17 «A song of Pause.» e 67.8 «Pause:»). É redação de Brenton, por isso não foi retirado; o bloco existente oficio-020 já o omite. **Decisão pendente:** omitir em todo o Saltério (um `replace` determinístico) ou manter.
  - nenhuma palavra de Brenton foi reescrita; só se deslocaram fronteiras de versículo (§3) e se retiraram da grelha os sobrescritos/cólofon que o eslavo da grelha não tem (§5).

### 1.2 RU — Yungerov (YU1915)

- **Obra:** П. А. Юнгеров (1856–1921), tradução russa do Saltério a partir da LXX, 1915 (publicada primeiro no «Православный собеседник», Kazan, e depois em separata — informação bibliográfica de D. G. Dobykin, «Переводы П. А. Юнгерова», só consultada). Autor † 1921 → domínio público na Rússia (autores falecidos antes de 1943) e na UE (vida + 70).
- **Digitalização impressa PD procurada e não encontrada nesta sessão:** archive.org (pesquisa avançada por «юнгеров», «Psaltir», «Псалтирь в русском переводе…»: o único resultado é o item abaixo); Google Books API (quota esgotada, HTTP 429 — não verificável); НЭБ rusneb.ru (HTTP 403 pelo proxy); РГБ search.rsl.ru (interface só JS); pesquisa web (só reedições comerciais modernas). **Pendente:** localizar a edição de Kazan 1915 / os números do «Православный собеседник» 1914–1915 (prlib.ru, РГБ, НЭБ) e conferir o texto.
- **Fonte usada (recurso de reserva indicado):** archive.org `psalms-yung-1`, «Псалтирь пророка Давида. Опыт переложения на русский язык» (https://archive.org/details/psalms-yung-1; carregado em 2022-12-13; coleção «opensource/community»; **sem licença declarada**). Usou-se o ficheiro **EPUB** do item (`psalms-yung (1-я копия).epub`, SHA-256 `6cf34927e9a9b2727f4c604af25226d8ee7bfa0fca36a750a6cfebfdc7c084c9`): é o texto digital de origem — o PDF do item (399 pp.) é uma conversão calibre desse EPUB e o `_djvu.txt` (já usado na 2b) é OCR desse PDF. O EPUB reproduz uma **reedição moderna** com aparato editorial («– Ред.», referências à 2.ª ed. do «Частное введение» de 2003); usou-se **só o texto dos versículos** (negrito), nunca as notas nem a introdução.
- **Edição por salmo:** todos os 151 salmos vêm desta mesma fonte (`psalms-yung-1`, EPUB). Nenhum de edição impressa.
- **Tratamento:**
  - marcas de nota (`<sup>n</sup>`) e todas as notas retiradas;
  - suplementos de Yungerov: na reedição aparecem como palavras **entre parênteses curvos** dentro do negrito (ex. 4.3 «Доколе вы (будете) упорны?»); mantidos tal como estão (371 parênteses de abertura no staging). Não há itálicos nem parênteses retos no texto dos versículos — os acrescentos editoriais em parênteses retos da reedição só ocorrem na introdução e nas notas, que não foram usadas. ⚠ Sem a edição de 1915 não se pode confirmar se o impresso usava parênteses ou itálico;
  - ortografia moderna já presente na reedição; formas de Yungerov mantidas («убоюся», «напоевающая», «все» sem ё);
  - travessão: «–» (U+2013) da reedição → «—» (U+2014), como nos blocos RU existentes; 3 correções de digitalização: 4.3 «упорны?.» → «упорны?» (ponto solto deixado pela marca de nota), 46.1 «Kореевых» com K latino → cirílico, 131.18 aspa reta final → «»»;
  - acentos de desambiguação da reedição **mantidos** em 16 versículos: 10.1 ка́к; 10.3 что́, то́, что́; 23.1 что́; 55.12 что́; 74.5 ро́га; 77.3 Что́; 77.5 что́, то́; 77.27 мяса́; 77.28 напа́дали; 77.71 пасти́; 84.9 что́; 88.12 что́; 95.11 что́; 95.12 что́; 118.43 сло́ва; 136.2 орга́ны. (Os blocos RU existentes não têm acentos — decidir se se retiram.)
  - mantida a maiúscula inicial de cada versículo da reedição, mesmo após vírgula (ex. 115.10 «Во дворах»; o bloco existente oficio-022 passou-a a minúscula).

### 1.3 Eslavo (referência de alinhamento)

`data/salterio/_fontes/cu-civil-elizabeth.json` / `grelha.json` (módulo SWORD CSlElizabeth, «1757 Church Slavonic Elizabeth Bible», rusbible.ru, grafia modernizada, versificação Synodal). Problemas encontrados ao alinhar (para o responsável do eslavo):
- **Sobrescritos não numerados ausentes:** em 84 salmos o módulo não traz o sobrescrito (ex. Sl 22 «Псалом Давиду», 103 «Давиду, о бытии мира», 118 «Аллилуиа»; Sl 1–2 não têm sobrescrito no eslavo). Só ficam os sobrescritos que a Bíblia isabelina numera como versículo (Sl 3, 4… 50,1–2…) e os que entram no v.1 (Sl 10, 16). Os textos EN/RU correspondentes ficaram fora da grelha e estão em §5.
- **Cólofon do Sl 71** («Оскудеша песни Давида, сына Иессеова», 71,20 na versificação sinodal) ausente do módulo; EN/RU em §5.
- **Gralhas no eslavo:** 55.11 «глаголгол», 76.9 «глаголгол», 137.4 «глаголголы» (dittografia; ler «глагол», «глаголы»). Parênteses do próprio texto: 64.10 «(есть)», 77.55 «(землю)».

## 2. Resumo da verificação

- Chaves: EN 2529 = RU 2529 = grelha (151 salmos). Nenhum versículo vazio; **nenhum versículo em falta** em Yungerov nem em Brenton (há só lacunas internas de Brenton, listadas em §4).
- Método EN: contagens Brenton × grelha (diferem em 71, 114, 129, 141 e 144; 115 tem «4a»), alinhamento por comprimento (Gale–Church) e **leitura integral** dos 2529 pares eslavo/inglês, fronteira a fronteira e versículo a versículo.
- Método RU: numeração de Yungerov (sobrescrito não numerado = v.0) × grelha (diferem em 12, 13, 92, 127, 141), e verificação lexical automática de todas as fronteiras (raízes comuns russo/eslavo, deslocações até 14 palavras), com revisão manual de todos os casos assinalados.

## 3. Alinhamento EN (Brenton → grelha eslava)

### 3.1 Mudanças estruturais (contagem, sobrescritos, versículos com letra)

| Sl | Brenton | Grelha eslava | Operação |
|---|---|---|---|
| 10 | Brenton v.1 = sobrescrito + 1.º versículo (separados por parágrafo no USFM) | Grelha v.1 também inclui o sobrescrito («В конец, псалом Давиду. На Господа уповах…») | Mantidos juntos em 10.1. |
| 16 | Idem («A Prayer of David. Hearken…») | Grelha v.1 inclui «Молитва Давиду.» | Mantidos juntos em 16.1. |
| 24 | Brenton 1 «To thee… lifted up my soul.» / 2 «O my God… laugh me to scorn.» / 3 «For none… be ashamed: let them be ashamed… without cause.» | CU 1 = BR 1+2; CU 2 «ибо вси терпящии…»; CU 3 «Да постыдятся…» | BR 1+2 → 24.1; BR 3 dividido em 24.2 / 24.3. (Sobrescrito «A Psalm of David.» fora da grelha.) |
| 65 | BR 1 = sobrescrito + «Shout unto God, all the earth.»; BR 2 «O sing praises…» | CU 1 = sobrescrito; CU 2 = «Воскликните… дадите славу хвале Его» | Sobrescrito → 65.1; «Shout unto God…» + BR 2 → 65.2. |
| 71 | BR 1 = «For Solomon.» + v.1; BR 20 = cólofon «The hymns of David the son of Jessæ are ended.» (20 vv.) | CU 19 vv.; sem sobrescrito nem cólofon | Sobrescrito e cólofon retirados (ver §5). BR 1–19 = CU 1–19. |
| 86 | BR 1 = sobrescrito + «His foundations are in the holy mountains.» | CU 1 = sobrescrito; CU 2 = «Основания его… селений Иаковлих» | Sobrescrito → 86.1; resto de BR 1 + BR 2 → 86.2. |
| 89 | BR 1 = sobrescrito + «Lord, thou hast been our refuge…»; BR 5 «Years shall be vanity…» / BR 6 «In the morning let it flower…» | CU 1 = sobrescrito; CU 6 = «Уничижения их лета будут… изсхнет» | Sobrescrito → 89.1; BR 1 (resto) → 89.2; BR 2–4 → 89.3–5; BR 5+6 → 89.6; BR 7–17 = CU 7–17 (mais as deslocações de 89.9/10 e 89.11/12 em §3.2). |
| 111 | BR 5 «…with judgment.» / 6 «For he shall not be moved for ever; the righteous shall be in everlasting remembrance.» / 7 «He shall not be afraid of any evil report: his heart is ready…» / 8 «His heart is established…» | CU 5 «…яко в век не подвижится.» / 6 «В память вечную будет праведник.» / 7 «От слуха зла не убоится:» / 8 «готово сердце его… дондеже воззрит на враги своя.» | BR 5 + «For he shall not be moved for ever;» → 111.5; resto de BR 6 → 111.6; BR 7 dividido: «He shall not be afraid of any evil report:» → 111.7; «his heart is ready to trust in the Lord.» + BR 8 → 111.8. |
| 114 | BR 9 vv.: 3 «…I found affliction and sorrow.» / 4 «Then I called on the name of the Lord: O Lord, deliver my soul.» / 5 «The Lord is merciful…» | CU 8 vv.: 3 «…скорбь и болезнь обретох и имя Господне призвах:» / 4 «о, Господи, избави душу мою: милостив Господь…» | BR 3 + «Then I called on the name of the Lord:» → 114.3; «O Lord, deliver my soul.» + BR 5 → 114.4; BR 6–9 → 114.5–8. |
| 115 | BR numera 1, 2, 3, 4, 4a, 6–10 (sem v.5) | CU 1–10 | BR 4a → 115.5; restantes 1:1. |
| 127 | BR 3 «Thy wife… sides of thy house: thy children as young olive-plants…» / 4 «Behold, thus…» / 5 «May the Lord bless thee…» / 6 «And mayest thou see thy children’s children. Peace…» | CU 3 «Жена твоя…» / 4 «сынове твои…» / 5 «Се, тако…» / 6 «Благословит тя… мир на Израиля» | BR 3 dividido em 127.3 / 127.4; BR 4 → 127.5; BR 5+6 → 127.6. |
| 129 | BR 8 vv. (1 «Out of the depths… O Lord.» / 2 «O Lord, hearken… supplication.» / 3 «…who shall stand?» / 4 «For with thee is forgiveness: for thy name’s sake» / 5 «have I waited…» / 6 «My soul has hoped… till night.» / 7 «Let Israel hope… plenteous redemption.» / 8 «And he shall redeem…») | CU 6 vv. | 129.1 = BR 1 + «O Lord, hearken to my voice;»; 129.2 = resto de BR 2; 129.3 = BR 3 + «For with thee is forgiveness:»; 129.4 = «for thy name’s sake» + BR 5 + «My soul has hoped in the Lord;»; 129.5 = «from the morning watch till night.» + «Let Israel hope in the Lord:»; 129.6 = resto de BR 7 + BR 8. |
| 139 | BR 1 = só sobrescrito; BR 2–14 (13 vv.); BR 6 «The proud have hid a snare… for my feet; they set a stumbling-block… Pause.» | CU 14 vv., sem sobrescrito | Sobrescrito retirado; BR 2–5 → 139.1–4; BR 6 dividido em 139.5 / 139.6; BR 7–14 = CU 7–14. |
| 141 | BR 8 vv.: 7 «Attend to my supplication… stronger than I.» / 8 «Bring my soul out of prison…» | CU 7 vv. (v.7 contém as duas partes) | BR 7+8 → 141.7. |
| 144 | BR 13 + 13a («The Lord is faithful in his words, and holy in all his works.») | CU 13 inclui «верен Господь во всех словесех Своих…» | BR 13+13a → 144.13. (Sobrescrito «David’s Psalm of praise.» fora da grelha.) |

Além disso, em 82 salmos (lista em §5) o v.1 de Brenton começa pelo sobrescrito, separado do texto por parágrafo no USFM; como a grelha não tem esse sobrescrito, o sobrescrito foi retirado e o v.1 começa no texto do salmo. Nos 65 salmos em que a grelha numera o sobrescrito como versículo (Sl 3–9, 11, 12, 17–21, 29, 30, 33, 35, 37–41, 43–48, 50–69, 74–76, 79, 80, 82–84, 86–89, 91, 101, 107, 141), Brenton também o numera, exceto 65, 86 e 89 (tabela acima).

### 3.2 Fronteiras internas deslocadas (contagem igual, conteúdo deslocado)

Fragmento de Brenton deslocado de um versículo para o vizinho, para que cada versículo corresponda ao eslavo (números = grelha):

| Sl | de v. | para v. | fragmento deslocado |
|---|---|---|---|
| 12 | 5 | 6 | «my persecutors will exult if ever I should be moved.» |
| 16 | 3 | 4 | «I am purposed that my mouth shall not speak amiss.» |
| 18 | 6 | 5 | «In the sun he has set his tabernacle;» |
| 30 | 17 | 16 | «and from them that persecute me.» |
| 33 | 17 | 18 | «The righteous cried, and the Lord hearkened to them,» |
| 36 | 20 | 19 | «For the sinners shall perish;» |
| 37 | 12 | 13 | «and my nearest of kin stood afar off.» |
| 43 | 21 | 22 | «shall not God search these things out?» |
| 44 | 4 | 5 | «in thy comeliness, and in thy beauty;» |
| 44 | 15 | 14 | «in embroidered clothing:» |
| 50 | 2 | 1 | «when Nathan the prophet came to him,» |
| 52 | 5 | 6 | «There were they greatly afraid, where there was no fear:» |
| 58 | 14 | 13 | «And for their cursing and falsehood shall utter destruction be denounced:» |
| 59 | 10 | 9 | «Judas is my king;» |
| 64 | 9 | 8 | «The nations shall be troubled,» |
| 67 | 5 | 6 | «They shall be troubled before the face of him,» |
| 75 | 12 | 13 | «even to him that is terrible,» |
| 76 | 7 | 6 | «And I meditated;» |
| 78 | 1 | 2 | «they have made Jerusalem a storehouse of fruits.» |
| 89 | 9 | 10 | «our years have spun out their tale as a spider.» |
| 89 | 12 | 11 | «and who knows how to number his days because of the fear of thy wrath?» |
| 91 | 15 | 16 | «that they may declare» |
| 92 | 4 | 5 | «the billows of the sea are wonderful: the Lord is wonderful in high places.» |
| 93 | 19 | 18 | «thy mercy, O Lord, helped me.» |
| 94 | 8 | 7 | «To-day, if ye will hear his voice,» |
| 95 | 12 | 13 | «before the presence of the Lord:» |
| 100 | 1 | 2 | «I will sing a psalm,» |
| 101 | 8 | 7 | «I have become like an owl in a ruined house.» |
| 102 | 17 | 18 | «and his righteousness to children’s children;» |
| 105 | 28 | 29 | «And they provoked him with their devices;» |
| 107 | 7 | 8 | «God has spoken in his sanctuary;» |
| 119 | 7 | 6 | «I was peaceable among them that hated peace;» |
| 123 | 3 | 2 | «verily they would have swallowed us up alive,» |
| 123 | 4 | 3 | «verily the water would have drowned us,» |
| 125 | 3 | 2 | «The Lord has done great things among them.» |
| 134 | 20 | 19 | «O house of Levi, bless ye the Lord:» |
| 138 | 2 | 1 | «Thou knowest my down-sitting and mine up-rising:» |
| 143 | 14 | 13 | «Their oxen are fat:» |
| 145 | 8 | 9 | «the Lord preserves the strangers;» |

Fronteiras **não reproduzíveis sem reordenar Brenton** (deixadas como impressas, assinaladas): 16.7–8 («from those that resist thy right hand» em 16.8), 44.9–10 («with which kings’ daughters have gladdened thee» em 44.10), 51.3–4 («All the day» no fim de 51.3), 73.5–6 («as in a wood of trees» em 73.6). Ver §4.

## 4. Divergências de leitura Brenton ↔ eslavo (não reescritas — dec. 40)

Recolhidas na leitura integral. Não se listam diferenças de pura tradução nem as dezenas de pequenas variantes nos sobrescritos («For the end», «a Psalm» a mais ou a menos), salvo as de autoria ou conteúdo. Lista em inglês porque se refere à coluna EN.

- **Sistemática:** «Pause.» em 72 versículos: 3.3, 3.5, 4.3, 4.5, 7.6, 9.17, 9.21, 19.4, 20.3, 23.6, 31.4, 31.5, 31.7, 33.11, 38.6, 38.8, 38.12, 43.9, 45.4, 45.8, 46.5, 47.9, 48.14, 48.16, 49.6, 49.15, 51.5, 51.7, 53.5, 54.8, 54.20, 56.3, 56.7, 58.6, 58.14, 59.6, 60.5, 61.5, 61.9, 65.4, 65.7, 65.15, 66.2, 66.5, 67.8, 67.20, 67.33, 74.4, 75.4, 75.10, 76.4, 76.10, 76.16, 79.8, 80.8, 81.2, 82.9, 83.5, 83.9, 84.3, 86.3, 86.6, 87.8, 88.5, 88.38, 88.46, 88.49, 93.15, 139.3, 139.6, 139.9, 142.6.
- **5.1** — Superscription: Brenton «For the end, a Psalm of David, concerning her that inherits» — CU has no «В конец» («О наследствующем, Псалом Давиду»).
- **7.11** — «My help is righteous, coming from God» — CU «Помощь моя от Бога» (no «righteous»; LXX δικαία).
- **9.17** — «A song of Pause» (ᾠδὴ διαψάλματος) — not in CU.
- **13.1** — Brenton adds «there is not even so much as one» — CU 13.1 ends «несть творяй благостыню».
- **13.3** — Brenton adds the long LXX plus (Rom 3:13–18: «Their throat is an open sepulchre … no fear of God before their eyes») — not in CU 13.3.
- **16.4** — «I am purposed that my mouth shall not speak amiss. As for the works of men…» — CU «Яко да не возглаголют уста моя дел человеческих» (that my mouth may not speak of the works of men); different reading/punctuation.
- **16.7–8** — «from those that resist thy right hand» stands in Brenton v.8 («Keep me as the apple of the eye from those that resist…»); CU has «от противящихся деснице Твоей» at the end of v.7. Boundary not reproducible without reordering Brenton; left as printed.
- **16.14** — «O Lord, destroy them from the earth» — CU «от малых от земли»; «they have been satisfied with uncleanness» (ὑείων) — CU «насытишася сынов» (with sons, υἱῶν).
- **17.30** — «delivered from a troop» — CU «от искушения» (from temptation).
- **20.1** — Superscription: Brenton «For the end, a Psalm of David» — CU only «Псалом Давиду».
- **22.5** — «thy cup cheers me like the best wine» — CU «чаша Твоя упоявающи мя, яко державна» (inebriating me, how mighty); existing block oficio-018 already adapted this.
- **22.6** — «for a very long time» — CU «в долготу дний» (unto length of days).
- **23.6** — «seek him» — CU «ищущих Господа» (seek the Lord).
- **26.8** — Brenton lacks «Господа взыщу» («My heart said to thee, I have diligently sought thy face»).
- **29.1** — Superscription: Brenton «For the end, a Psalm and Song…» — CU has no «В конец».
- **33.5** — «delivered me from all my sojournings» (παροικιῶν) — CU «от всех скорбей моих» (from all my afflictions).
- **36.28** — «the blameless shall be avenged» — CU «беззаконницы же изженутся» (the lawless shall be driven out): opposite sense.
- **37.8** — «my soul is filled with mockings» (ψυχή) — CU «лядвия моя» (my loins, ψόαι).
- **38.6** — «thou hast made my days old» (παλαιάς) — CU «пяди положил еси дни моя» (as handbreadths, παλαιστάς).
- **41.7** — «O my God, my soul has been troubled within me» — CU «Ко мне самому душа моя смятеся» (no «O my God»).
- **44.9–10** — Brenton: «…out of the ivory palaces, / with which kings’ daughters have gladdened thee for thine honour» — CU 9 «из нихже возвеселиша Тя», 10 «Дщери царей в чести Твоей». Different construal; boundary kept as Brenton prints it.
- **44.12–13** — Brenton «for he is thy Lord. / And the daughter of Tyre shall adore him with gifts» — CU 12 «…Господь твой, и поклонишися Ему» (and thou shalt worship Him), 13 «и дщи Тирова с дары».
- **44.14** — «the daughter of the king of Esebon» — CU «дщере Царевы внутрь» (within).
- **45.6** — «God shall help her with his countenance» — CU «поможет ему Бог утро заутра» (early in the morning).
- **47.10** — «We have thought of thy mercy» — CU «Прияхом… милость Твою» (we have received).
- **49.23** — «the salvation of God» — CU «спасение Мое» (my salvation).
- **50.7** — «in sins did my mother conceive me» — CU «роди мя» (bore me); existing blocks use «bear».
- **50.10** — «the afflicted bones» — CU «кости смиренныя» (humbled); existing blocks use «humbled».
- **51.3–4** — Brenton «boast of iniquity in thy mischief? All the day / thy tongue has devised…» — CU 3 «Что хвалишися во злобе, сильне? Беззаконие весь день.» 4 «Неправду умысли язык твой». Different construal; boundary as printed.
- **54.1** — Superscription: «by David» — CU «Асафу» (Asaph).
- **55.3** — «all the day from the dawning of the day» — CU «весь день… с высоты» (from on high).
- **55.4** — «They shall be afraid, but I will trust in thee» — CU «В день не убоюся, аз же уповаю на Тя» (by day I will not fear).
- **55.8** — «Thou wilt on no account save them» — CU «Ни о чесомже отринеши я» (for nothing wilt thou cast them out).
- **55.14** — Brenton lacks «очи мои от слез» (mine eyes from tears); «before God in the land of the living» — CU «пред Господем во свете живых» (in the light of the living).
- **64.1** — Brenton lacks the second half of the superscription: «песнь Иеремиева и Иезекиилева, людий преселения, егда хотяху исходити».
- **64.2** — Brenton lacks «во Иерусалиме» (in Jerusalem).
- **66.2** — Brenton lacks «и помилуй ны» (and have mercy on us).
- **68.30** — «the salvation of thy countenance has helped me» — CU «спасение Твое, Боже, да приимет мя» (let thy salvation, O God, uphold me).
- **69.2** — Brenton lacks the second half «Господи, помощи ми потщися» (O Lord, make haste to help me).
- **70.15** — «I am not acquainted with the affairs of men» — CU «яко не познах книжная» (I have not known letters).
- **72.21** — «my heart has rejoiced, and my reins have been gladdened» — CU «разжжеся сердце мое, и утробы моя изменишася» (my heart was inflamed, my reins were changed).
- **73.16** — «thou hast prepared the sun and the moon» — CU «зарю и солнце» (the dawn and the sun).
- **73.18** — «Remember this thy creation» — CU «Помяни сия» (remember this).
- **76.5** — «All mine enemies set a watch against me» — CU «Предваристе стражбы очи мои» (mine eyes forestalled the watches).
- **76.9** — Brenton lacks «сконча глагол от рода в род» (he has ended his word from generation to generation); renders «for ever, even for ever and ever».
- **79.1** — Superscription: Brenton adds «a Psalm concerning the Assyrian» — not in CU.
- **87.15** — «dost thou reject my prayer» — CU «отрееши душу мою» (my soul).
- **88.13** — «the north and the west» — CU «Север и море» (the north and the sea).
- **88.21** — «I have anointed him by my holy mercy» (ἐλέει) — CU «елеем святым Моим» (with my holy oil).
- **88.45** — «Thou hast deprived him of glory» — CU «разорил еси от очищения его» (thou hast deprived him of his cleansing).
- **88.46** — «the days of his throne» — CU «дни времене его» (the days of his time).
- **89.17** — Brenton lacks the repeated clause «и дело рук наших исправи» (and prosper thou the work of our hands).
- **90.10** — «no scourge shall draw nigh to thy dwelling» — CU «телеси твоему» (to thy body).
- **91.10** — Brenton lacks the repetition «(Яко се, врази Твои,) Господи, яко се, врази Твои».
- **91.11** — «mine old age with rich mercy» (ἐλέει) — CU «в елеи мастите» (with rich oil).
- **92.4** — Brenton lacks «возмут реки сотрения своя» (the rivers shall lift up their waves); 92.4 holds only «at the voices of many waters:».
- **94.3** — «a great king over all gods: for the Lord will not cast off his people» — CU «Царь велий по всей земли» (over all the earth), without the clause about his people.
- **97.9** — Brenton lacks «от лица Господня, яко грядет» (before the Lord, for he comes) and has «For he is come».
- **105.20** — «changed their glory» — CU «измениша славу Его» (his glory).
- **105.48** — «Amen, Amen» — CU «буди, буди» (so be it), which Brenton elsewhere renders «So be it».
- **106.3** — «and north, and south» — CU «и севера и моря» (and the sea).
- **107.3** — Brenton lacks «Востани, слава моя» (Awake, my glory).
- **108.20** — «This is the dealing of the Lord with those who falsely accuse me» — CU «Сие дело оболгающих мя у Господа» (this is the work of them that slander me before the Lord).
- **114.1** — «I am well pleased» — CU «Возлюбих» (I have loved).
- **115.1** — «but I was greatly afflicted» — CU «смирихся зело» (humbled); existing block oficio-022 already adapted.
- **122.4** — «Yea, our soul has been exceedingly filled with it: let the reproach be to them that are at ease» — CU «наипаче наполнися душа наша поношения гобзующих…» (our soul is filled with the reproach of them that are at ease).
- **129.5** — Brenton has «from the morning watch till night» once; CU repeats «от стражи утренния» (from the morning watch until night, from the morning watch let Israel hope).
- **138.9** — «If I should spread my wings to fly straight forward… it would be vain» — CU «Аще возму криле мои рано» (take my wings at dawn); «it would be vain» has no CU equivalent.
- **138.20** — «For thou wilt say concerning their thought» — CU «Яко ревниви есте в помышлениих» (for ye are contentious in thoughts).
- **139.11** — Brenton adds «on the earth» (Coals of fire shall fall upon them on the earth).
- **140.6** — «for they are sweet» — CU «яко возмогоша» (for they have prevailed).
- **140.7** — «our bones» — CU «кости их» (their bones).
- **144.9** — «The Lord is good to those that wait on him» — CU «Благ Господь всяческим» (good to all).

## 5. Texto fora da grelha (sobrescritos e cólofon)

Texto de Brenton e de Yungerov sem lugar na grelha atual (o eslavo de `cu-civil-elizabeth.json` não o tem). Guardado aqui para quando o eslavo tiver os sobrescritos (p. ex. em blocos `titulo`/`rubrica`). Sl 10 e 16: o sobrescrito ficou dentro do v.1 (como no eslavo).

| Sl | EN (Brenton) | RU (Yungerov) |
|---|---|---|
| 1 | — | Псалом Давида. |
| 2 | — | Псалом Давида. |
| 13 | For the end, a Psalm of David. | В конец. Псалом Давида. |
| 14 | A Psalm of David. | В конец. Псалом Давида. |
| 15 | A writing of David. | Столпописание Давида. |
| 22 | A Psalm of David. | Псалом Давида. |
| 23 | A Psalm for David on the first day of the week. | Псалом Давида. В первый день недели. |
| 24 | A Psalm of David. | Псалом Давида. |
| 25 | A Psalm of David. | Псалом Давида. |
| 26 | A Psalm of David, before he was anointed. | Псалом Давида. Прежде помазания. |
| 27 | A Psalm of David. | Псалом Давида. |
| 28 | A Psalm of David on the occasion of the solemn assembly of the Tabernacle. | Псалом Давида. На исход скинии. |
| 31 | A Psalm of instruction by David. | Псалом Давида. В научение. |
| 32 | A Psalm of David. | Псалом Давида, не надписанный у евреев. |
| 34 | A Psalm of David. | Псалом Давида. |
| 36 | A Psalm of David. | Псалом Давида. |
| 42 | A Psalm of David. | Псалом Давида. Ненадписанный у евреев. |
| 49 | A Psalm for Asaph. | Псалом Асафа. |
| 70 | By David, a Psalm sung by the sons of Jonadab, and the first that were taken captive. | Псалом Давида. Сынов Ионадавовых и первых пленников. Не надписан у евреев. |
| 71 | For Solomon. / The hymns of David the son of Jessæ are ended. | О Соломоне. Псалом Давида. / Окончились песни Давида, сына Иессеева. |
| 72 | A Psalm for Asaph. | Псалом Асафа. |
| 73 | A Psalm of instruction for Asaph. | В научение. Асафа. |
| 77 | A Psalm of instruction for Asaph. | В научение. Асафа. |
| 78 | A Psalm for Asaph. | Псалом Асафа. |
| 81 | A Psalm for Asaph. | Псалом Асафа. |
| 85 | A Prayer of David. | Молитва Давида. |
| 90 | Praise of a Song, by David. | Хвалебная песнь. Давида. Не надписан у евреев. |
| 92 | For the day before the Sabbath, when the land was first inhabited, the praise of a Song by David. | В день предсубботний, когда населилась земля. Хвалебная песнь. Давида. |
| 93 | A Psalm of David for the fourth day of the week. | Псалом Давида. В четвертый (день) недели. |
| 94 | The praise of a Song by David. | Хвалебная песнь. Давида. Не надписан у евреев. |
| 95 | When the house was built after the Captivity, a Song by David. | Хвалебная песнь Давида. Когда строился дом, после пленения. Не надписан у евреев. |
| 96 | For David, when his land is established. | Псалом Давида. Когда земля его устроилась. Не надписан у евреев. |
| 97 | A Psalm of David. | Псалом Давида. |
| 98 | A Psalm of David. | Псалом Давида. |
| 99 | A Psalm for Thanksgiving. | Псалом Давида. Хвалебный. |
| 100 | A Psalm of David. | Псалом Давида. |
| 102 | A Psalm of David. | Псалом Давида. |
| 103 | A Psalm of David. | Псалом Давида о бытии мира. |
| 104 | Alleluia. | Аллилуиа. |
| 105 | Alleluia. | Аллилуия. |
| 106 | Alleluia. | Аллилуия. |
| 108 | For the end, a Psalm of David. | В конец. Псалом Давида. |
| 109 | A Psalm of David. | Псалом Давида. |
| 110 | Alleluia. | Аллилуия. |
| 111 | Alleluia. | Аллилуия. Псалом. |
| 112 | Alleluia. | Аллилуия. |
| 113 | Alleluia. | Аллилуия. |
| 114 | Alleluia. | Аллилуия. |
| 115 | Alleluia. | Аллилуия. |
| 116 | Alleluia. | Аллилуия. |
| 117 | Alleluia. | Аллилуия. |
| 118 | Alleluia. | Аллилуия. |
| 119 | A Song of Degrees. | Песнь степеней. |
| 120 | A Song of Degrees. | Песнь степеней. |
| 121 | A Song of Degrees. | Песнь степеней. |
| 122 | A Song of Degrees. | Песнь степеней. |
| 123 | A Song of Degrees. | Песнь степеней. |
| 124 | A Song of Degrees. | Песнь степеней. |
| 125 | A Song of Degrees. | Песнь степеней. |
| 126 | A Song of Degrees. | Песнь степеней. |
| 127 | A Song of Degrees. | Песнь степеней. |
| 128 | A Song of Degrees. | Песнь степеней. |
| 129 | A Song of Degrees. | Песнь степеней. |
| 130 | A Song of Degrees. | Песнь степеней. |
| 131 | A Song of Degrees. | Песнь степеней. |
| 132 | A Song of Degrees. | Песнь степеней. |
| 133 | A Song of Degrees. | Песнь степеней. |
| 134 | Alleluia. | Аллилуия. |
| 135 | Alleluia. | Аллилуия. |
| 136 | For David, a Psalm of Jeremias. | Давида. Иеремиею. |
| 137 | A Psalm for David, of Aggæus and Zacharias. | Псалом Давида. Аггея и Захарии. |
| 138 | For the end, a Psalm of David. | В конец. Давида. Псалом Захарии, в рассеянии. |
| 139 | For the end, a Psalm of David. | В конец. Псалом Давида. |
| 140 | A Psalm of David. | Псалом Давида. |
| 142 | A Psalm of David, when his son pursued him. | Псалом Давида, когда его преследовал Авессалом, сын его. |
| 143 | A Psalm of David concerning Goliad. | Псалом Давида. О Голиафе. |
| 144 | David’s Psalm of praise. | Хвала Давида. |
| 145 | Alleluia, a Psalm of Aggæus and Zacharias. | Аллилуия. Аггея и Захарии. |
| 146 | Alleluia, a Psalm of Aggæus and Zacharias. | Аллилуия. |
| 147 | Alleluia, a Psalm of Aggæus and Zacharias. | Аллилуия. Аггея и Захарии. |
| 148 | Alleluia, a Psalm of Aggæus and Zacharias. | Аллилуия. Аггея и Захарии. |
| 149 | Alleluia. | Аллилуия. |
| 150 | Alleluia. | Аллилуия. |
| 151 | This Psalm is a genuine one of David, though supernumerary, composed when he fought in single combat with Goliad. | Сей псалом писан особо, вне числа 150 псалмов, Давида, когда он единоборствовал с Голиафом. |

## 6. Alinhamento RU (Yungerov → grelha eslava)

| Sl | Yungerov | Operação |
|---|---|---|
| 1, 2 e outros 82 | sobrescrito como v.0 | retirado da grelha (texto em §5) |
| 10 | v.0 «В конец. Псалом Давида.» + v.1; v.3 termina com «Господь во храме святом Своем:» | v.0 + v.1 → 10.1; «Господь во храме святом Своем:» passa para o início de 10.4 (eslavo 10.4 «Господь во храме святем Своем.») |
| 12 | 7 vv. (6 «Угнетающие меня обрадуются…» / 7 «Я же уповал…») | 6+7 → 12.6 |
| 13 | 8 vv. (7 «Кто даст с Сиона…?» / 8 «Когда возвратит…») | 7+8 → 13.7 |
| 16 | v.0 «Молитва Давида.» + v.1 | → 16.1 |
| 71 | v.19 termina com o cólofon «Окончились песни Давида, сына Иессеева.» | cólofon retirado (§5); sobrescrito v.0 retirado |
| 92 | 6 vv. (5 «Дивны высокие волны…» / 6 «Откровения Твои…») | 5+6 → 92.5 |
| 107 | v.10 começa com «Иуда – царь Мой,» | fragmento passa para o fim de 107.9 (eslavo 107.9 «…Иуда царь Мой,») |
| 127 | 7 vv. (6 «…во все дни жизни твоей.» / 7 «И увидишь сынов сынов твоих…») | 6+7 → 127.6 |
| 141 | 8 vv. (7 «…ибо они укрепились более меня.» / 8 «Изведи из темницы…») | 7+8 → 141.7 |
| 151 | Yungerov diz que a Bíblia eslava não divide o salmo e que ele segue os 7 vv. da sinodal | coincide com a grelha (7) |

Nos restantes salmos a numeração de Yungerov (que segue a da Bíblia eslava, com sobrescritos numerados quando o eslavo os numera, incl. 50,1–2, 51,1–2, 53,1–2, 59,1–2) coincide com a grelha, e a verificação lexical não encontrou outras deslocações (os 25 casos marginais assinalados depois do alinhamento foram revistos à mão: falsos positivos).

## 7. Comparação com os blocos existentes

Comparação palavra a palavra (acentos ignorados) entre o staging e os blocos de `data/oracoes/*.json` com fonte BR1851/YU1915. O texto do Saltério é a referência (esquema-oracoes.md); as diferenças abaixo são para alinhar.

**Diferenças gerais EN:** os blocos existentes são Brenton **adaptado** — pronomes divinos com maiúscula (*Thee, Thy, Thou, He, His, Name*), arcaísmos que não estão no Brenton de 1851 (*hath, -eth, unto*), e leituras corrigidas para o eslavo conforme a respetiva `nota` (ex. 50.5 «know» por «am conscious of», 50.10 «humbled» por «afflicted», 50.14 «sovereign» por «directing», 50.21 «with oblation», 115.1 «humbled», 23.6 «seek the Lord», 22.5 «which inebriateth me, how mighty it is», «Pause» omitido). O staging mantém o Brenton impresso (instrução desta subfase). **Decisão pendente:** (a) aplicar ao Saltério as mesmas convenções (maiúsculas divinas, correções pontuais para o eslavo) ou (b) alinhar os blocos existentes ao Brenton do Saltério.

**Diferenças RU:** oficio-020 (Sl 23) é idêntico ao staging (a menos dos acentos, que o bloco não tem: 23.1 «что́»). oficio-018 (Sl 22) foi adaptado ao eslavo (nota do bloco): «Посему» → «Ибо», «для меня» → «предо мною», «убоюся» → «убоюсь», «напоевающая» → «напояющая», «(она)» → «она», «моей. И» → «моей, и», «если я пойду» → «если я и пойду». oficio-022 (Sl 115): «все» → «всё», «Твоей.» → «Твоей;», «мои,» → «мои.», «Во» → «во».

Saída completa do comparador:

```
=== manha-30 [en] Sl 50,3–21  (fonte: BR1851 Sl 50)
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «know»  →  staging: «am conscious of»
  [replace] existing: «iniquity,»  →  staging: «iniquity;»
  [replace] existing: «Thee»  →  staging: «thee»
  [replace] existing: «Thee,»  →  staging: «thee:»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «bear»  →  staging: «conceive»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «Thou»  →  staging: «thou lovest truth: thou»
  [replace] existing: «loved truth;»  →  staging: «manifested to me»
  [insert] existing: «»  →  staging: «secret and»
  [delete] existing: «and secret»  →  staging: «»
  [replace] existing: «Thy wisdom hast Thou made manifest unto me.»  →  staging: «thy wisdom.»
  [replace] existing: «purified; Thou»  →  staging: «purified: thou»
  [replace] existing: «joy;»  →  staging: «joy:»
  [replace] existing: «humbled»  →  staging: «afflicted»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «God,»  →  staging: «God;»
  [replace] existing: «Thy presence,»  →  staging: «thy presence;»
  [replace] existing: «take»  →  staging: «remove»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy salvation, and»  →  staging: «thy salvation:»
  [replace] existing: «Thy sovereign»  →  staging: «thy directing»
  [replace] existing: «Thy ways,»  →  staging: «thy ways;»
  [delete] existing: «the»  →  staging: «»
  [insert] existing: «»  →  staging: «men»
  [replace] existing: «unto Thee.»  →  staging: «to thee.»
  [replace] existing: «salvation;»  →  staging: «salvation: and»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «lips,»  →  staging: «lips;»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou hadst desired»  →  staging: «thou desiredst»
  [replace] existing: «it; Thou»  →  staging: «it: thou»
  [replace] existing: «whole-burnt offerings. A sacrifice unto»  →  staging: «whole-burnt-offerings. Sacrifice to»
  [replace] existing: «spirit;»  →  staging: «spirit:»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «pleasure,»  →  staging: «pleasure;»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «with oblation»  →  staging: «offering,»
  [replace] existing: «whole-burnt offerings;»  →  staging: «whole-burnt-sacrifices:»
  [replace] existing: «Thine»  →  staging: «thine»
=== comunhao-kan-085 [en] Sl 50,3–21  (fonte: BR1851 Sl 50)
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «know»  →  staging: «am conscious of»
  [replace] existing: «iniquity,»  →  staging: «iniquity;»
  [replace] existing: «Thee»  →  staging: «thee»
  [replace] existing: «Thee,»  →  staging: «thee:»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «bear»  →  staging: «conceive»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «Thou»  →  staging: «thou lovest truth: thou»
  [replace] existing: «loved truth;»  →  staging: «manifested to me»
  [insert] existing: «»  →  staging: «secret and»
  [delete] existing: «and secret»  →  staging: «»
  [replace] existing: «Thy wisdom hast Thou made manifest unto me.»  →  staging: «thy wisdom.»
  [replace] existing: «purified; Thou»  →  staging: «purified: thou»
  [replace] existing: «joy;»  →  staging: «joy:»
  [replace] existing: «humbled»  →  staging: «afflicted»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «God,»  →  staging: «God;»
  [replace] existing: «Thy presence,»  →  staging: «thy presence;»
  [replace] existing: «take»  →  staging: «remove»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy salvation, and»  →  staging: «thy salvation:»
  [replace] existing: «Thy sovereign»  →  staging: «thy directing»
  [replace] existing: «Thy ways,»  →  staging: «thy ways;»
  [delete] existing: «the»  →  staging: «»
  [insert] existing: «»  →  staging: «men»
  [replace] existing: «unto Thee.»  →  staging: «to thee.»
  [replace] existing: «salvation;»  →  staging: «salvation: and»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «lips,»  →  staging: «lips;»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou hadst desired»  →  staging: «thou desiredst»
  [replace] existing: «it; Thou»  →  staging: «it: thou»
  [replace] existing: «whole-burnt offerings. A sacrifice unto»  →  staging: «whole-burnt-offerings. Sacrifice to»
  [replace] existing: «spirit;»  →  staging: «spirit:»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «pleasure,»  →  staging: «pleasure;»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «with oblation»  →  staging: «offering,»
  [replace] existing: «whole-burnt offerings;»  →  staging: «whole-burnt-sacrifices:»
  [replace] existing: «Thine»  →  staging: «thine»
=== oficio-032 [en] Sl 50,3–21  (fonte: BR1851 Sl 50)
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «know»  →  staging: «am conscious of»
  [replace] existing: «iniquity,»  →  staging: «iniquity;»
  [replace] existing: «Thee»  →  staging: «thee»
  [replace] existing: «Thee,»  →  staging: «thee:»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «bear»  →  staging: «conceive»
  [replace] existing: «For»  →  staging: «For,»
  [replace] existing: «Thou»  →  staging: «thou lovest truth: thou»
  [replace] existing: «loved truth;»  →  staging: «manifested to me»
  [insert] existing: «»  →  staging: «secret and»
  [delete] existing: «and secret»  →  staging: «»
  [replace] existing: «Thy wisdom hast Thou made manifest unto me.»  →  staging: «thy wisdom.»
  [replace] existing: «purified; Thou»  →  staging: «purified: thou»
  [replace] existing: «joy;»  →  staging: «joy:»
  [replace] existing: «humbled»  →  staging: «afflicted»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «God,»  →  staging: «God;»
  [replace] existing: «Thy presence,»  →  staging: «thy presence;»
  [replace] existing: «take»  →  staging: «remove»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy salvation, and»  →  staging: «thy salvation:»
  [replace] existing: «Thy sovereign»  →  staging: «thy directing»
  [replace] existing: «Thy ways,»  →  staging: «thy ways;»
  [delete] existing: «the»  →  staging: «»
  [insert] existing: «»  →  staging: «men»
  [replace] existing: «unto Thee.»  →  staging: «to thee.»
  [replace] existing: «salvation;»  →  staging: «salvation: and»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «lips,»  →  staging: «lips;»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thou hadst desired»  →  staging: «thou desiredst»
  [replace] existing: «it; Thou»  →  staging: «it: thou»
  [replace] existing: «whole-burnt offerings. A sacrifice unto»  →  staging: «whole-burnt-offerings. Sacrifice to»
  [replace] existing: «spirit;»  →  staging: «spirit:»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «pleasure,»  →  staging: «pleasure;»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «with oblation»  →  staging: «offering,»
  [replace] existing: «whole-burnt offerings;»  →  staging: «whole-burnt-sacrifices:»
  [replace] existing: «Thine»  →  staging: «thine»
=== oficio-018 [en] Sl 22,1–6  (fonte: BR1851 Sl 22 (adaptado))
  [replace] existing: «tendeth»  →  staging: «tends»
  [replace] existing: «hath He»  →  staging: «he has»
  [replace] existing: «dwell; He hath»  →  staging: «dwell: he has»
  [replace] existing: «hath»  →  staging: «has»
  [replace] existing: «soul; He hath»  →  staging: «soul: he has»
  [replace] existing: «His Name's»  →  staging: «his name’s»
  [replace] existing: «evils,»  →  staging: «evils:»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «against»  →  staging: «in presence of»
  [replace] existing: «me; Thou»  →  staging: «me: thou»
  [insert] existing: «»  →  staging: «thoroughly»
  [replace] existing: «oil,»  →  staging: «oil;»
  [replace] existing: «Thy cup, which inebriateth me, how mighty it is! And»  →  staging: «thy cup cheers me like the best wine.»
  [insert] existing: «»  →  staging: «also»
  [replace] existing: «life,»  →  staging: «life:»
  [replace] existing: «unto length of days.»  →  staging: «for a very long time.»
=== oficio-018 [ru] Sl 22,1–6  (fonte: YU1915 Пс 22 (adaptado))
  [replace] existing: «Ибо,»  →  staging: «Посему,»
  [delete] existing: «и»  →  staging: «»
  [replace] existing: «убоюсь»  →  staging: «убоюся»
  [replace] existing: «предо мною»  →  staging: «для меня»
  [replace] existing: «напояющая»  →  staging: «напоевающая»
  [replace] existing: «она»  →  staging: «(она)»
  [replace] existing: «моей, и»  →  staging: «моей. И»
=== oficio-020 [en] Sl 23,1–10  (fonte: BR1851 Sl 23 (adaptado))
  [replace] existing: «Lord's,»  →  staging: «Lord’s»
  [replace] existing: «therein.»  →  staging: «in it.»
  [replace] existing: «hath»  →  staging: «has»
  [replace] existing: «into»  →  staging: «to»
  [replace] existing: «Lord? Or»  →  staging: «Lord, and»
  [replace] existing: «His»  →  staging: «his»
  [replace] existing: «heart,»  →  staging: «heart;»
  [replace] existing: «hath»  →  staging: «has»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «the Lord,»  →  staging: «him,»
  [insert] existing: «»  →  staging: «Pause.»
  [delete] existing: «O»  →  staging: «»
  [replace] existing: «doors,»  →  staging: «doors;»
  [replace] existing: «King»  →  staging: «king»
  [replace] existing: «King»  →  staging: «king»
  [replace] existing: «The»  →  staging: «the»
  [delete] existing: «O»  →  staging: «»
  [replace] existing: «princes,»  →  staging: «princes;»
  [replace] existing: «lifted»  →  staging: «lift»
  [replace] existing: «doors,»  →  staging: «doors;»
  [replace] existing: «King»  →  staging: «king»
  [replace] existing: «King»  →  staging: «king»
  [replace] existing: «He»  →  staging: «he»
  [replace] existing: «the King»  →  staging: «this king»
=== oficio-020 [ru] Sl 23,1–10  (fonte: YU1915 Пс 23)
  identical
=== oficio-022 [en] Sl 115,1–10  (fonte: BR1851 Sl 115 (adaptado))
  [replace] existing: «spoken; and»  →  staging: «spoken: but»
  [replace] existing: «humbled.»  →  staging: «afflicted.»
  [replace] existing: «amazement:»  →  staging: «amazement,»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «He hath»  →  staging: «he has»
  [replace] existing: «Name»  →  staging: «name»
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Lord»  →  staging: «Lord,»
  [replace] existing: «His»  →  staging: «his»
  [replace] existing: «His»  →  staging: «his»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thy»  →  staging: «thy»
  [replace] existing: «Thine handmaid; Thou»  →  staging: «thine handmaid: thou»
  [replace] existing: «unto Thee»  →  staging: «to thee»
  [replace] existing: «Name»  →  staging: «name»
  [replace] existing: «Lord»  →  staging: «Lord,»
  [replace] existing: «His»  →  staging: «his»
  [replace] existing: «Lord's»  →  staging: «Lord’s»
  [delete] existing: «O»  →  staging: «»
=== oficio-022 [ru] Sl 115,1–10  (fonte: YU1915 Пс 115)
  [replace] existing: «всё,»  →  staging: «все,»
  [replace] existing: «Твоей;»  →  staging: «Твоей.»
  [replace] existing: «мои.»  →  staging: «мои,»
  [replace] existing: «во»  →  staging: «Во»
=== oficio-036 [en] Sl 50,12–12  (fonte: BR1851 Sl 50,12)
  [replace] existing: «God,»  →  staging: «God;»
=== oficio-038 [en] Sl 50,13–13  (fonte: BR1851 Sl 50,13)
  [replace] existing: «Thy presence,»  →  staging: «thy presence;»
  [replace] existing: «take»  →  staging: «remove»
  [replace] existing: «Thy»  →  staging: «thy»
=== oficio-099 [en] Sl 50,14–14  (fonte: BR1851 Sl 50,14)
  [replace] existing: «unto»  →  staging: «to»
  [replace] existing: «Thy salvation, and»  →  staging: «thy salvation:»
  [replace] existing: «Thy sovereign»  →  staging: «thy directing»
=== refeicoes-06 [en] Sl 144,15–16  (fonte: BR1851 Sl 144,15–16 (adaptado))
  [replace] existing: «hope in Thee, O Lord,»  →  staging: «wait upon thee;»
  [replace] existing: «Thou»  →  staging: «thou»
  [replace] existing: «season;»  →  staging: «season.»
  [replace] existing: «Thy bountiful hand»  →  staging: «thine hands,»
  [delete] existing: «good»  →  staging: «»
=== comunhao_preparacao-cp118 EN: Verse: Let God arise, and let His enemies be scattered. A sacred Pascha hath been shown forth unto us today: a new and holy Pascha, a mystical Pascha, an all-venerable Pascha, a Pascha which is Christ the Redeemer; a blameless Pascha, a great Pascha, a Pascha of the faithful, a Pascha which openeth unto us the gates of Paradise, a Pascha which sanctifieth all the faithful.
=== comunhao_preparacao-cp119 EN: Verse: As smoke vanisheth, so let them vanish. Come from the vision, O ye women, bearers of good tidings, and say unto Zion: Receive from us the glad tidings of joy of the Resurrection of Christ; adorn thyself, exult and rejoice, O Jerusalem, beholding Christ the King coming forth from the tomb as a bridegroom.
=== comunhao_preparacao-cp120 EN: Verse: So let the sinners perish at the presence of God, but let the righteous be glad. The myrrh-bearing women, standing at deep dawn before the tomb of the Giver of life, found an Angel sitting upon the stone, and he spake unto them thus: Why seek ye the Living among the dead? Why mourn ye the Incorruptible amid corruption? Go, proclaim it unto His disciples.
=== comunhao_preparacao-cp121 EN: Verse: This is the day which the Lord hath made; let us rejoice and be glad therein. Pascha the fair, Pascha, the Pascha of the Lord! A Pascha all-venerable hath dawned upon us. Pascha! Let us embrace one another with joy. O Pascha, ransom from sorrow! For today Christ hath shone forth from the tomb as from a bridal chamber, and hath filled the women with joy, saying: Proclaim it unto the Apostles.
EN 67.2: Let God arise, and let his enemies be scattered; and let them that hate him flee from before him.
EN 67.3: As smoke vanishes, let them vanish: as wax melts before the fire, so let the sinners perish from before God.
EN 67.4: But let the righteous rejoice; let them exult before God: let them be delighted with joy.
EN 117.24: This is the day which the Lord has made: let us exult and rejoice in it.
```

