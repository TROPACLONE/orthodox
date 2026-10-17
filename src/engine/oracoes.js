// Períodos das orações (doc. 03 §1.4; esquema em docs/esquema-oracoes.md; decisão B1).
// O dia litúrgico começa nas Vésperas: as orações da noite da véspera da Ascensão (P+38) e da véspera do Pentecostes
// (P+48) já pertencem ao período seguinte (B1). As Horas Pascais leem-se «отъ Пасхи до субботы утра включительно»
// (rubrica dos dados; doc. 03 §1.4; QA 2a §4.1): na noite do Sábado Luminoso (P+6) já se dizem as orações habituais.
export function periodoOracao(d, noite = false) {
  const o = d.o + (noite && (d.o === 6 || d.o === 38 || d.o === 48) ? 1 : 0);
  if (o >= 0 && o <= 6) return 'semana_luminosa';
  if (o >= 7 && o <= 38) return 'pascoa_ascensao';
  if (o >= 39 && o <= 48) return 'ascensao_pentecostes';
  if (o >= -48 && o <= -1) return 'quaresma';   // Grande Quaresma e Semana Santa (p. ex. «Егда славнии» no ofício da Comunhão)
  return 'comum';
}

/** As orações estão a ser lidas «à noite», já no dia litúrgico seguinte (B1)? A partir das 18 h (as Vésperas) para
 *  qualquer oração; as orações da noite contam como noite desde o meio-dia — mas não depois da meia-noite, quando o dia
 *  civil já é o seguinte (às 01 h do dia P+38 ainda se está no dia litúrgico P+38, que começou nas Vésperas de P+37). */
export function eNoite(id, hora) {
  return hora >= 18 || (id === 'noite' && hora >= 12);
}

/** Blocos que se leem no período dado e com os modos ativos (p. ex. «defuntos» no Saltério, dec. 64): campo «quando»,
 *  so (basta uma etiqueta ativa) / excepto (basta uma etiqueta ativa para o excluir). */
export function blocosDoPeriodo(blocos, periodo, modos = []) {
  const ativa = t => t === periodo || modos.includes(t);
  return blocos.filter(b => !b.quando || (b.quando.so ? b.quando.so.some(ativa) : !(b.quando.excepto || []).some(ativa)));
}

// Saltério (doc. 03 §5.6): salmos de cada catisma, numeração LXX.
export const CATISMAS = [[1, 8], [9, 16], [17, 23], [24, 31], [32, 36], [37, 45], [46, 54], [55, 63], [64, 69], [70, 76],
  [77, 84], [85, 90], [91, 100], [101, 104], [105, 108], [109, 117], [118, 118], [119, 133], [134, 142], [143, 151]];

/** Plano pessoal do Saltério (dec. 65): a catisma a seguir à última marcada como lida, em ciclo 1–20. Com «1 por dia»,
 *  se já se marcou uma hoje, devolve essa, como lida. */
export function planoSalterio(ultima, dataUltima, hoje, umPorDia) {
  if (!(Number.isInteger(ultima) && ultima >= 1 && ultima <= 20)) ultima = 0;   // valor guardado inválido: recomeça na 1
  if (umPorDia && ultima && dataUltima === hoje) return { n: ultima, lida: true };
  return { n: ultima ? ultima % 20 + 1 : 1, lida: false };
}
