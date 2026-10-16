// Períodos das orações (doc. 03 §1.4; esquema em docs/esquema-oracoes.md; decisão B1).
// O dia litúrgico começa nas Vésperas: as orações da noite da véspera da Ascensão (P+38) e da véspera do Pentecostes
// (P+48) já pertencem ao período seguinte (B1). As Horas Pascais leem-se «отъ Пасхи до субботы утра включительно»
// (rubrica dos dados; doc. 03 §1.4; QA 2a §4.1): na noite do Sábado Luminoso (P+6) já se dizem as orações habituais.
export function periodoOracao(d, noite = false) {
  const o = d.o + (noite && (d.o === 6 || d.o === 38 || d.o === 48) ? 1 : 0);
  if (o >= 0 && o <= 6) return 'semana_luminosa';
  if (o >= 7 && o <= 38) return 'pascoa_ascensao';
  if (o >= 39 && o <= 48) return 'ascensao_pentecostes';
  return 'comum';
}

/** As orações estão a ser lidas «à noite», já no dia litúrgico seguinte (B1)? A partir das 18 h (as Vésperas) para
 *  qualquer oração; as orações da noite contam como noite desde o meio-dia — mas não depois da meia-noite, quando o dia
 *  civil já é o seguinte (às 01 h do dia P+38 ainda se está no dia litúrgico P+38, que começou nas Vésperas de P+37). */
export function eNoite(id, hora) {
  return hora >= 18 || (id === 'noite' && hora >= 12);
}

/** Blocos que se leem no período dado (campo «quando»: so / excepto). */
export function blocosDoPeriodo(blocos, periodo) {
  return blocos.filter(b => !b.quando || (b.quando.so ? b.quando.so.includes(periodo) : !(b.quando.excepto || []).includes(periodo)));
}
