// Leituras da Liturgia (Apóstolo e Evangelho) e do AT nos dias da Quaresma. Especificação: doc. 01 §7.
// Dados: data/lecionario/*.json, compilados de edições sinodais pré-1917 (decisão 43; ver FONTES-*.md).
// Regras aplicadas com certeza: Triódio, Pentecostário, semanas depois do Pentecostes com a отступка/преступка da
// Exaltação (s = k − 17; o Apóstolo não se desloca), sábados/domingos especiais e grandes festas.
// Inverno (do domingo depois da Teofania ao de Zaqueu): as regras de preenchimento (Andreev, 65 combinações) ainda
// não estão especificadas por completo — esses dias saem marcados «incerto» em vez de arriscar uma leitura errada.
import { jdnJuliano, diaSemana, pascoa, chaveMD } from './datas.js';
import pentecostario from '../../data/lecionario/pentecostario.json' with { type: 'json' };
import semanas from '../../data/lecionario/semanas.json' with { type: 'json' };
import triodio from '../../data/lecionario/triodio.json' with { type: 'json' };
import especiais from '../../data/lecionario/especiais.json' with { type: 'json' };
import festas from '../../data/lecionario/festas.json' with { type: 'json' };

const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const GRANDES_SENHOR = new Set(['09-14', '12-25', '01-06', '02-02', '08-06', '01-01']);
const MAE_DE_DEUS = new Set(['09-08', '11-21', '03-25', '08-15']);
// Festas lidas juntamente com as leituras do dia (grandes não-Doze e sinaxes do dia seguinte).
const COM_AS_DO_DIA = new Set(['06-24', '06-29', '08-29', '10-01', '12-26', '01-07']);
// Correspondência entre os códigos dos sábados/domingos semimóveis do calendário e as chaves dos dados.
const ESPECIAL = { dom_santos_padres: 'dom_antes_natal_pais' };

/** Domingo depois da Exaltação (primeiro domingo estritamente depois de 14.09 OS) do ano juliano y. */
function domingoDepoisExaltacao(y) { let j = jdnJuliano(y, 9, 15); while (diaSemana(j) !== 0) j++; return j; }

/**
 * @param {object} d  resultado de calendario.dia()
 * @returns {{ap: object[], ev: object[], vt: object[], extra: object[], incerto: boolean, origem: string}}
 */
export function leituras(d) {
  const { o, dow, jdn } = d, md = chaveMD(d.juliano.m, d.juliano.d), dk = DIAS[dow];
  const res = { ap: [], ev: [], vt: [], extra: [], incerto: false, origem: '' };
  const usa = (x, origem) => { if (!x) return false; res.ap = x.ap || []; res.ev = x.ev || []; res.vt = x.vt || []; res.origem = origem; return true; };
  const festa = festas[md];

  // Grandes festas do Senhor: substituem as leituras do dia (doc. 01 §5.2)
  if (festa && GRANDES_SENHOR.has(md) && !(o >= -6 && o <= 6)) { usa(festa, 'festa'); return res; }
  // Vésperas do Natal e da Teofania (Horas Reais; ao sábado/domingo, variante própria e Horas Reais na sexta anterior)
  if (md === '12-24' || md === '01-05') {
    if (dow === 0 || dow === 6) { const v = festa.variante_sab_dom; res.ap = v.ap; res.ev = v.ev; res.origem = 'vespera_sab_dom'; }
    else { usa(festa, 'vespera'); res.extra.push({ rotulo: 'horas_reais', horas: festa.horas_reais });
      if (festa.bencao_aguas) res.extra.push({ rotulo: 'bencao_aguas', ...festa.bencao_aguas }); }
    return res;
  }
  const vesperaSabDom = ['12-24', '01-05'].find(v => { const [m, dd] = v.split('-').map(Number), j = jdnJuliano(d.juliano.y, m, dd);
    return dow === 5 && (j - jdn === 1 || j - jdn === 2); });
  if (vesperaSabDom) res.extra.push({ rotulo: 'horas_reais', horas: festas[vesperaSabDom].horas_reais });

  if (o >= -70 && o <= -1) usa(triodio[String(o)], 'triodio');
  else if (o >= 0 && o <= 56) usa(pentecostario[String(o)], 'pentecostario');
  else ordinario(d, dk, res);

  // Festas da Mãe de Deus: ao domingo juntam-se às dominicais; em dia útil substituem-nas (doc. 01 §5.2)
  if (festa && MAE_DE_DEUS.has(md)) {
    if (dow === 0 || (o >= -6 && o <= 6)) res.extra.push({ rotulo: 'festa', ap: festa.ap, ev: festa.ev });
    else { const vt = res.vt; usa(festa, 'festa'); res.vt = o >= -48 && o <= -7 ? vt : res.vt; res.incerto = false; }
  } else if (festa && COM_AS_DO_DIA.has(md)) res.extra.push({ rotulo: 'festa', ap: festa.ap, ev: festa.ev });
  return res;
}

function ordinario(d, dk, res) {
  const { o, dow, jdn } = d;
  // Ano pascal a que o dia pertence: depois do Pentecostes do ano corrente, ou ainda no do ano anterior (jan.–fev.)
  const yP = o > 56 ? d.juliano.y : d.juliano.y - 1;
  const pent = pascoa(yP) + 49, pNext = pascoa(yP + 1);
  const w = Math.ceil((jdn - pent) / 7);           // semana/domingo N depois do Pentecostes
  const S = domingoDepoisExaltacao(yP), k = (S - pent) / 7, s = k - 17;

  // Domingo de Zaqueu (P_next − 77): leituras do 32.º domingo
  if (jdn === pNext - 77) { res.ap = semanas.apostolo['32'].dom; res.ev = semanas.evangelho['32'].dom; res.origem = 'zaqueu'; return; }

  // Sábados/domingos com leitura própria (antes/depois da Exaltação, do Natal e da Teofania; Antepassados; Santos Padres)
  for (const id of d.semimoveis) {
    const x = especiais[ESPECIAL[id] || id];
    if (x && (x.ap || x.ev)) { res.ap = x.ap || []; res.ev = x.ev || []; res.origem = 'especial';
      if (/natal|teofania|santos_padres|antepassados/.test(id)) res.incerto = true;   // leituras ordinárias deslocadas: ver nota
      return; }
  }

  // Apóstolo: série sem deslocamento
  const wa = w;
  // Evangelho: отступка/преступка da Exaltação
  let we;
  if (jdn <= S) {
    if (w <= 17) we = w;
    else if (dow === 0 || dow === 6) { res.incerto = true; we = w; }   // coincidem com sábado/domingo da Exaltação (com leitura própria)
    else we = s === 1 ? 11 : (w === 18 ? 10 : 11);                       // s = +2: 10.ª e 11.ª semanas (Andreev; ⚠ sem exemplo oficial)
  } else we = w - s;

  // Inverno: só se aceita o cálculo direto enquanto as séries não se esgotam e antes da Teofania
  const teof = jdnJuliano(yP + 1, 1, 6);
  if (jdn > teof && jdn < pNext - 77) res.incerto = true;
  if (wa > 33 || we > 33 || wa < 1) { res.incerto = true; return; }
  res.ap = semanas.apostolo[String(wa)][dk] || [];
  res.ev = semanas.evangelho[String(we)][dk] || [];
  res.origem = 'semanas';
}

/** Evangelho matinal dominical (1–11) a partir dos dados. */
export const eothinon = n => (especiais.eothina || [])[n - 1] || null;
