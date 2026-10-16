// Aritmética de calendário por número de dia juliano (JDN): juliano ↔ gregoriano, Páscoa (Pascália alexandrina).
// Especificação: docs/conhecimento/01-calendario-e-leituras.md §1–2. Sem objetos Date: nenhuma dependência do fuso horário.

const div = (a, b) => Math.floor(a / b);

/** JDN de uma data do calendário juliano (proléptico). */
export function jdnJuliano(y, m, d) {
  const a = div(14 - m, 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3;
  return d + div(153 * m2 + 2, 5) + 365 * y2 + div(y2, 4) - 32083;
}

/** JDN de uma data do calendário gregoriano (proléptico). */
export function jdnGregoriano(y, m, d) {
  const a = div(14 - m, 12), y2 = y + 4800 - a, m2 = m + 12 * a - 3;
  return d + div(153 * m2 + 2, 5) + 365 * y2 + div(y2, 4) - div(y2, 100) + div(y2, 400) - 32045;
}

/** Data juliana {y, m, d} de um JDN. */
export function juliano(jdn) {
  const c = jdn + 32082, d = div(4 * c + 3, 1461), e = c - div(1461 * d, 4), m = div(5 * e + 2, 153);
  return { y: d - 4800 + div(m, 10), m: m + 3 - 12 * div(m, 10), d: e - div(153 * m + 2, 5) + 1 };
}

/** Data gregoriana {y, m, d} de um JDN. */
export function gregoriano(jdn) {
  const a = jdn + 32044, b = div(4 * a + 3, 146097), c = a - div(146097 * b, 4);
  const d = div(4 * c + 3, 1461), e = c - div(1461 * d, 4), m = div(5 * e + 2, 153);
  return { y: 100 * b + d - 4800 + div(m, 10), m: m + 3 - 12 * div(m, 10), d: e - div(153 * m + 2, 5) + 1 };
}

/** Dia da semana: 0 = domingo … 6 = sábado. */
export const diaSemana = jdn => (jdn + 1) % 7;

const pascoas = new Map();
/** JDN da Páscoa do ano juliano y (algoritmo de Meeus para o cômputo juliano). */
export function pascoa(y) {
  let p = pascoas.get(y);
  if (p === undefined) {
    const a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7;
    p = jdnJuliano(y, div(d + e + 114, 31), ((d + e + 114) % 31) + 1);
    pascoas.set(y, p);
  }
  return p;
}

/** JDN da data civil de hoje no aparelho (a data litúrgica segue o calendário local, não UTC). */
export function hoje(agora = new Date()) {
  return jdnGregoriano(agora.getFullYear(), agora.getMonth() + 1, agora.getDate());
}

/** Chave "MM-DD" de uma data juliana. */
export const chaveMD = (m, d) => (m < 10 ? '0' : '') + m + '-' + (d < 10 ? '0' : '') + d;
