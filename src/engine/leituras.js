// Leituras da Liturgia (Apóstolo e Evangelho) e do AT nos dias da Quaresma. Especificação: doc. 01 §7 e a verificação
// de conteúdo da fase 1 (docs/qa/fase1-conteudo.md §3–4), que segue o calendário oficial do Patriarcado de Moscovo.
// Dados: data/lecionario/*.json, compilados de edições sinodais pré-1917 (decisão 43; ver FONTES-*.md).
import { jdnJuliano, diaSemana, pascoa, chaveMD } from './datas.js';
import pentecostario from '../../data/lecionario/pentecostario.json' with { type: 'json' };
import semanas from '../../data/lecionario/semanas.json' with { type: 'json' };
import triodio from '../../data/lecionario/triodio.json' with { type: 'json' };
import especiais from '../../data/lecionario/especiais.json' with { type: 'json' };
import festas from '../../data/lecionario/festas.json' with { type: 'json' };

const DIAS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab'];
const GRANDES_SENHOR = new Set(['09-14', '12-25', '01-06', '02-02', '08-06', '01-01']);
const MAE_DE_DEUS = new Set(['09-08', '11-21', '03-25', '08-15']);
// Grandes festas não-Doze e Sinaxe da Mãe de Deus: ao domingo juntam-se às dominicais; em dia útil substituem-nas (D3).
const SUBSTITUI_EM_DIA_UTIL = new Set(['06-24', '06-29', '08-29', '10-01', '12-26']);
// Sinaxe do Precursor (07.01): sempre com as leituras do dia.
const COM_AS_DO_DIA = new Set(['01-07']);
const ESPECIAL = { dom_santos_padres: 'dom_antes_natal_pais' };
// Sábados com leituras próprias que leem também as ordinárias «под зачало» (D9); o sábado antes da Teofania não.
const SABADO_COM_ORDINARIO = new Set(['sab_antes_natal', 'sab_depois_natal', 'sab_depois_teofania']);
const serie = (n, dk) => ({ ap: semanas.apostolo[String(n)]?.[dk] || [], ev: semanas.evangelho[String(n)]?.[dk] || [] });

/** Domingo depois da Exaltação (primeiro domingo estritamente depois de 14.09 OS) do ano juliano y. */
function domingoDepoisExaltacao(y) { let j = jdnJuliano(y, 9, 15); while (diaSemana(j) !== 0) j++; return j; }
/** Domingo dos Antepassados (11–17.12 OS) do ano juliano y. */
function domingoAntepassados(y) { let j = jdnJuliano(y, 12, 11); while (diaSemana(j) !== 0) j++; return j; }

/**
 * @param {object} d  resultado de calendario.dia()
 * @returns {{ap: object[], ev: object[], vt: object[], extra: object[], incerto: boolean, deslocadas: boolean, semLiturgia: boolean, origem: string}}
 *   extra: grupos adicionais {rotulo: 'horas_reais'|'bencao_aguas'|'vesperas'|'festa'|'ordinario', ap, ev, vt, horas}
 */
export function leituras(d) {
  const { o, dow, jdn } = d, md = chaveMD(d.juliano.m, d.juliano.d), dk = DIAS[dow];
  const res = { ap: [], ev: [], vt: [], extra: [], incerto: false, deslocadas: false, semLiturgia: false, origem: '' };
  const usa = (x, origem) => { if (!x) return false; res.ap = x.ap || []; res.ev = x.ev || []; res.vt = x.vt || []; res.origem = origem; return true; };
  const festa = festas[md];
  const fimSemana = dow === 0 || dow === 6;

  // Grandes festas do Senhor: substituem as leituras do dia (doc. 01 §5.2)
  if (festa && GRANDES_SENHOR.has(md) && !(o >= -6 && o <= 6)) { usa(festa, 'festa'); return res; }

  // Vésperas do Natal e da Teofania
  if (md === '12-24' || md === '01-05') {
    if (!fimSemana) {
      usa(festa, 'vespera');
      res.extra.push({ rotulo: 'horas_reais', horas: festa.horas_reais });
    } else {
      // Ao sábado/domingo: Liturgia de Crisóstomo de manhã e Vésperas à parte; Horas Reais na sexta anterior (D6)
      const v = festa.variante_sab_dom;
      if (md === '12-24') { res.ap = v.ap; res.ev = v.ev; res.extra.push({ rotulo: 'vesperas', vt: festa.vt, ap: festa.ap, ev: festa.ev }); }
      else {
        const prop = especiais[dow === 6 ? 'sab_antes_teofania' : 'dom_antes_teofania'] || {};
        res.ap = prop.ap || []; res.ev = prop.ev || [];
        res.extra.push({ rotulo: 'vesperas', vt: festa.vt, ap: v.ap, ev: v.ev });
      }
      res.origem = 'vespera_sab_dom';
    }
    if (festa.bencao_aguas) res.extra.push({ rotulo: 'bencao_aguas', ...festa.bencao_aguas });
    return res;
  }
  // Sexta-feira das Horas Reais (véspera ao sábado/domingo): não há Liturgia, só as Horas (D5)
  const vesperaSabDom = ['12-24', '01-05'].find(v => { const [m, dd] = v.split('-').map(Number), j = jdnJuliano(d.juliano.y, m, dd);
    return dow === 5 && (j - jdn === 1 || j - jdn === 2); });
  if (vesperaSabDom) { res.semLiturgia = true; res.extra.push({ rotulo: 'horas_reais', horas: festas[vesperaSabDom].horas_reais }); res.origem = 'horas_reais'; return res; }

  if (o >= -70 && o <= -1) usa(triodio[String(o)], 'triodio');
  else if (o >= 0 && o <= 56) usa(pentecostario[String(o)], 'pentecostario');
  else ordinario(d, dk, res);

  // Festas da Mãe de Deus (Doze): ao domingo e nas semanas Santa/Luminosa juntam-se; em dia útil substituem (doc. 01 §5.2)
  if (festa && MAE_DE_DEUS.has(md)) {
    if (dow === 0 || (o >= -6 && o <= 6)) res.extra.push({ rotulo: 'festa', ap: festa.ap, ev: festa.ev });
    else { const vt = res.vt, havia = res.ap.length || res.ev.length; usa(festa, 'festa'); if (o >= -48 && o <= -7) res.vt = vt;
      res.incerto = false; res.deslocadas = !!havia && !(o >= -48 && o <= -7); }
  } else if (festa && SUBSTITUI_EM_DIA_UTIL.has(md)) {
    if (dow === 0) res.extra.push({ rotulo: 'festa', ap: festa.ap, ev: festa.ev });
    else { const havia = res.ap.length || res.ev.length; res.extra = res.extra.filter(e => e.rotulo !== 'ordinario');
      usa(festa, 'festa'); res.incerto = false; res.deslocadas = !!havia; }
  } else if (festa && COM_AS_DO_DIA.has(md)) res.extra.push({ rotulo: 'festa', ap: festa.ap, ev: festa.ev });
  return res;
}

function ordinario(d, dk, res) {
  const { o, dow, jdn } = d;
  // Ano pascal a que o dia pertence: depois do Pentecostes do ano corrente, ou ainda no do ano anterior (jan.–fev.)
  const yP = o > 56 ? d.juliano.y : d.juliano.y - 1;
  const pent = pascoa(yP) + 49, pNext = pascoa(yP + 1);
  const w = Math.ceil((jdn - pent) / 7);                 // semana / domingo N depois do Pentecostes
  const S = domingoDepoisExaltacao(yP), k = (S - pent) / 7, s = k - 17;
  const T = (pNext - 70 - pent) / 7;                     // n.º do domingo do Publicano
  const F = domingoAntepassados(yP), nF = (F - pent) / 7;

  // Leituras próprias de sábados/domingos semimóveis (Exaltação, Natal, Teofania, Antepassados, Santos Padres)
  const proprias = d.semimoveis.map(id => [id, especiais[ESPECIAL[id] || id]]).find(([, x]) => x && (x.ap || x.ev));

  // Série ordinária deste dia (dias úteis e sábados: regra de inverno do QA §4.1; domingos: §4.2 e troca dos Antepassados)
  const ord = serieDoDia(w, dk, dow, jdn, { S, s, T, nF, res });

  if (jdn === pNext - 77) {                               // Domingo de Zaqueu: Ap 32 + Ev 32 (D2: com as próprias, se as houver)
    const zaq = serie(32, 'dom');
    if (proprias) { res.ap = proprias[1].ap || []; res.ev = proprias[1].ev || []; res.extra.push({ rotulo: 'ordinario', ...zaq }); }
    else { res.ap = zaq.ap; res.ev = zaq.ev; }
    res.origem = 'zaqueu'; return;
  }
  if (proprias) {
    const [id, x] = proprias;
    res.ap = x.ap || []; res.ev = x.ev || []; res.origem = 'especial';
    if (SABADO_COM_ORDINARIO.has(id) && ord) res.extra.push({ rotulo: 'ordinario', ...ord });   // D9
    return;
  }
  if (!ord) { res.incerto = true; return; }
  res.ap = ord.ap; res.ev = ord.ev; res.origem = 'semanas';
}

/** Apóstolo e Evangelho ordinários da semana w, com a отступка/преступка da Exaltação e a regra de inverno. */
function serieDoDia(w, dk, dow, jdn, { S, s, T, nF, res }) {
  if (w < 1) return null;
  if (dow === 0) {
    // Domingos. Troca do Domingo dos Antepassados (Typikon 11.12; QA D1): o domingo com Ev 28 lê o Ev de F; o domingo 29 lê o Ap de F.
    let na = w, ne = jdn > S ? w - s : w;
    if (jdn > S && ne === 28 && w !== nF) ne = nF - s;
    if (w === 29 && w !== nF) na = nF;
    if (ne > 32 || na > 32) {                              // inverno, entre a Teofania e Zaqueu: Evangelho R(w); Apóstolo R(w) ⚠ (QA §4.2.4)
      const R = 33 - (T - w); res.incerto = true;
      return { ap: serie(R, 'dom').ap, ev: serie(R, 'dom').ev };
    }
    return { ap: serie(na, 'dom').ap, ev: serie(ne, 'dom').ev };
  }
  // Dias úteis e sábados
  if (jdn <= S) {
    if (w <= 17) return serie(w, dk);
    if (dow === 6) return null;                            // sábados antes/depois da Exaltação têm leituras próprias
    return { ap: serie(w, dk).ap, ev: serie(s === 1 ? 11 : (w === 18 ? 10 : 11), dk).ev };   // s = +2: 10.ª e 11.ª ⚠ (Andreev)
  }
  const wEstrela = 34 + s;
  if (w >= wEstrela) { const R = 33 - (T - w); return serie(R, dk); }          // regra de inverno firme (QA §4.1)
  if (s > 0 && w > 33) { res.incerto = true; return serie(w - s, dk); }       // transição curta com s > 0 (⚠)
  return { ap: serie(w, dk).ap, ev: serie(w - s, dk).ev };
}

/** Evangelho matinal dominical (1–11) a partir dos dados. */
export const eothinon = n => (especiais.eothina || [])[n - 1] || null;
