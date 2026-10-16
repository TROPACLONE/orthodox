// Períodos das orações (doc. 03 §1.4; esquema em docs/esquema-oracoes.md; decisão B1).
// O dia litúrgico começa nas Vésperas: as orações da noite da véspera da Ascensão (P+38) e da véspera do Pentecostes
// (P+48) já pertencem ao período seguinte (B1). ⚠ A noite do Sábado Luminoso (P+6) mantém-se na Semana Luminosa.
export function periodoOracao(d, noite = false) {
  const o = d.o + (noite && (d.o === 38 || d.o === 48) ? 1 : 0);
  if (o >= 0 && o <= 6) return 'semana_luminosa';
  if (o >= 7 && o <= 38) return 'pascoa_ascensao';
  if (o >= 39 && o <= 48) return 'ascensao_pentecostes';
  return 'comum';
}

/** Blocos que se leem no período dado (campo «quando»: so / excepto). */
export function blocosDoPeriodo(blocos, periodo) {
  return blocos.filter(b => !b.quando || (b.quando.so ? b.quando.so.includes(periodo) : !(b.quando.excepto || []).includes(periodo)));
}
