// Formatação das referências bíblicas por língua. Os dados usam códigos OSIS e a numeração eslava/LXX (decisão 18);
// 1Kgs/2Kgs dos dados = 3.º/4.º Reinos. Abreviaturas: PT (uso português, Difusora Bíblica; «Rn» = Reinos), RU (Синодальная
// Библия), UK (уживання УПЦ: календар Волинської єпархії УПЦ, 2025–26 — Мф., Ін., Діян., Як., 1 Сол., Притч., Вих., Іуд.…;
// o calendário escreve «Йоїл.», mas o nome do profeta é «Іоїль» → «Іоїл.»; Іов./Єр./Єз./Іон./Мих./Соф./Зах./Чис./Нав./Суд./
// Вар./Дан. ⚠ ainda não vistas numa fonte da IOU), EN (SBL; LXX «Kgdms»).
const T = (s) => Object.fromEntries(s.trim().split(/\n/).map(l => l.trim().split('|')).map(([k, ...v]) => [k, v]));
// código | pt | ru | uk | en
const LIVROS = T(`
Gen|Gn|Быт.|Бут.|Gen
Exod|Ex|Исх.|Вих.|Exod
Num|Nm|Чис.|Чис.|Num
Josh|Js|Нав.|Нав.|Josh
Judg|Jz|Суд.|Суд.|Judg
1Kgs|3 Rn|3 Цар.|3 Цар.|3 Kgdms
2Kgs|4 Rn|4 Цар.|4 Цар.|4 Kgdms
Job|Jb|Иов.|Іов.|Job
Prov|Pr|Притч.|Притч.|Prov
Isa|Is|Ис.|Іс.|Isa
Jer|Jr|Иер.|Єр.|Jer
Bar|Br|Вар.|Вар.|Bar
Ezek|Ez|Иез.|Єз.|Ezek
Dan|Dn|Дан.|Дан.|Dan
Joel|Jl|Иоил.|Іоїл.|Joel
Jonah|Jn|Ион.|Іон.|Jonah
Mic|Mq|Мих.|Мих.|Mic
Zeph|Sf|Соф.|Соф.|Zeph
Zech|Zc|Зах.|Зах.|Zech
Matt|Mt|Мф.|Мф.|Matt
Mark|Mc|Мк.|Мк.|Mark
Luke|Lc|Лк.|Лк.|Luke
John|Jo|Ин.|Ін.|John
Acts|At|Деян.|Діян.|Acts
Rom|Rm|Рим.|Рим.|Rom
1Cor|1 Cor|1 Кор.|1 Кор.|1 Cor
2Cor|2 Cor|2 Кор.|2 Кор.|2 Cor
Gal|Gl|Гал.|Гал.|Gal
Eph|Ef|Еф.|Еф.|Eph
Phil|Fl|Флп.|Флп.|Phil
Col|Cl|Кол.|Кол.|Col
1Thess|1 Ts|1 Фес.|1 Сол.|1 Thess
2Thess|2 Ts|2 Фес.|2 Сол.|2 Thess
1Tim|1 Tm|1 Тим.|1 Тим.|1 Tim
2Tim|2 Tm|2 Тим.|2 Тим.|2 Tim
Titus|Tt|Тит.|Тит.|Titus
Heb|Hb|Евр.|Євр.|Heb
Jas|Tg|Иак.|Як.|Jas
1Pet|1 Pd|1 Пет.|1 Пет.|1 Pet
2Pet|2 Pd|2 Пет.|2 Пет.|2 Pet
1John|1 Jo|1 Ин.|1 Ін.|1 John
2John|2 Jo|2 Ин.|2 Ін.|2 John
3John|3 Jo|3 Ин.|3 Ін.|3 John
Jude|Jd|Иуд.|Іуд.|Jude
`);
const COL = { pt: 0, ru: 1, uk: 2, en: 3 };
// Convenções: PT «Fl 3, 8–19; Lc 21, 5-7.10-11»; RU/UK/EN «Флп. 3:8–19; Лк. 21:5–7, 10–11».
const ESTILO = { pt: { cv: ', ', grupo: '.' }, ru: { cv: ':', grupo: ', ' }, uk: { cv: ':', grupo: ', ' }, en: { cv: ':', grupo: ', ' } };
const TRACO = '–';

/** "Mark.8.34-9.1", "Luke.21.5-7,10-11,20-24", "1Pet.1.1-2,10-12,2.6-10", "Titus.2.11-14;Titus.3.4-7" → texto. */
export function formatarRef(r, lingua) {
  const { cv, grupo } = ESTILO[lingua] || ESTILO.pt, col = COL[lingua] ?? 0;
  let livroAnt = null, capAnt = null, res = '';
  for (const seg of r.split(';')) {
    const m = seg.trim().match(/^([1-4]?[A-Za-z]+)\.(\d+)\.(.+)$/);
    if (!m) { res += (res ? '; ' : '') + seg; continue; }
    const [, livro, cap, resto] = m;
    let capAtual = cap, out = '', primeiro = true;
    for (const tok of resto.split(',')) {
      let t = tok.trim(), novoCap = null;
      const mc = t.match(/^(\d+)\.(.+)$/);              // "2.6-10": muda de capítulo dentro da lista
      if (mc && !primeiro) { novoCap = mc[1]; t = mc[2]; }
      const [a, b] = t.split('-');
      const fim = b && b.includes('.') ? b.split('.')[0] + cv + b.split('.')[1] : b;   // "34-9.1": atravessa capítulos
      const vers = a + (b ? TRACO + fim : '');
      if (primeiro) out = capAtual + cv + vers;
      else if (novoCap) { capAtual = novoCap; out += '; ' + capAtual + cv + vers; }
      else out += grupo + vers;
      primeiro = false;
    }
    const nome = (LIVROS[livro] || [livro])[col] || livro;
    // Mesmo livro e capítulo do segmento anterior: só os versículos («12, 1–5.9–11»)
    if (livro === livroAnt && cap === capAnt && !out.includes('; ')) res += grupo + out.slice(cap.length + cv.length);
    else res += (res ? '; ' : '') + (livro === livroAnt ? '' : nome + ' ') + out;
    livroAnt = livro; capAnt = capAtual;
  }
  return res;
}
export const livrosConhecidos = () => Object.keys(LIVROS);
