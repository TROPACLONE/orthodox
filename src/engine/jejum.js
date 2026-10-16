// Motor do jejum diário, em duas camadas (decisões 6, 20/A0–A6 e 42):
//   paroquial — «Calendário paroquial (segundo Azbuka Very)»; typikon — norma escrita do Typikon (sobretudo monástica).
// As dispensas pessoais nunca são calculadas: cabem ao pai espiritual. Especificação: docs/conhecimento/02-jejuns-e-disciplina.md.
import { chaveMD } from './datas.js';

/** Níveis (doc. 02 §1.1). */
export const N = { SEM_COMIDA: 0, PAO_AGUA: 1, XEROFAGIA: 2, QUENTE_SEM_AZEITE: 3, QUENTE_COM_AZEITE: 4, OVAS: 5, PEIXE: 6, LACTICINIOS: 7, TUDO: 8 };
const ORDEM_GRAU = { doxologia: 1, polieleo: 2, vigilia: 3, grande: 4 };
const grauMin = (g, min) => (ORDEM_GRAU[g] || 0) >= ORDEM_GRAU[min];

// Festas das Doze (e afins) que dão peixe numa quarta/sexta fora dos jejuns longos (doc. 02 §2.4).
const PEIXE_QUA_SEX = new Set(['09-08', '02-02', '08-15', '08-06', '11-21', '06-24', '06-29', '09-26', '05-08']);
// Proteção: peixe só na camada paroquial (pravmir), não consta do cap. 33.
const PEIXE_QUA_SEX_PAROQUIAL = new Set(['10-01']);
// Santos com atenuação expressa no Typikon durante o jejum da Natividade (doc. 02 §3.4.1).
const NATAL_TYPIKON_SANTOS = new Set(['11-16', '11-25', '11-30', '12-04', '12-05', '12-06', '12-09', '12-17', '12-20']);
// 40 Mártires e Invenção da Cabeça do Precursor: azeite e vinho na Quaresma (doc. 02 §3.1.4).
const QUARESMA_AZEITE = new Set(['03-09', '02-24']);

const r = (nivel, extra) => Object.assign({ nivel, vinho: false, notas: [] }, extra);

/**
 * @param {object} d  resultado de calendario.dia()
 * @param {{typikon?: string|null, atual?: string|null}} graus  grau mais alto das comemorações do dia em cada camada
 * @returns {{jejum: boolean, tempo: string|null, paroquial: object, typikon: object}}
 */
export function jejum(d, graus = {}) {
  const { o, dow } = d, md = chaveMD(d.juliano.m, d.juliano.d), m = d.juliano.m, dia = d.juliano.d;
  const gT = graus.typikon || null, gP = 'atual' in graus ? graus.atual : gT;
  const quaSex = dow === 3 || dow === 5, satSun = dow === 6 || dow === 0;
  const tudo = (tempo, nota) => ({ jejum: false, tempo, paroquial: r(N.TUDO), typikon: r(N.TUDO, nota ? { notas: [nota] } : {}) });

  // 1. Páscoa, semanas contínuas e grandes festas sem jejum
  if (o >= 0 && o <= 6) return tudo('semana_luminosa', 'n_monges_luminosa');
  if (o >= -69 && o <= -64) return tudo('semana_publicano', 'n_monges_continua');
  if (o >= 49 && o <= 56) return tudo(o === 49 || o === 56 ? null : 'semana_trindade', 'n_monges_trindade');
  if ((m === 12 && dia >= 25) || (m === 1 && dia <= 4)) return tudo('santos_dias', 'n_monges_continua');
  if (md === '01-06') return tudo(null);
  if (o >= -55 && o <= -49) {
    return { jejum: true, tempo: 'semana_queijo', paroquial: r(N.LACTICINIOS),
      typikon: r(N.LACTICINIOS, { notas: quaSex ? ['n_queijo_qua_sex'] : [] }) };
  }

  // 2. Jejuns de um só dia
  if (md === '01-05') {
    return { jejum: true, tempo: 'vespera_teofania', paroquial: r(N.QUENTE_COM_AZEITE, { notas: ['n_vespera_teofania'] }),
      typikon: r(N.QUENTE_COM_AZEITE, { vinho: true, notas: satSun ? ['n_vespera_sab_dom'] : [] }) };
  }
  if (md === '08-29' || md === '09-14') {
    return { jejum: true, tempo: md === '08-29' ? 'degolacao' : 'exaltacao', paroquial: r(N.QUENTE_COM_AZEITE),
      typikon: r(N.QUENTE_COM_AZEITE, { vinho: true }) };
  }

  // 3. Grande Quaresma e Semana Santa (P−48 … P−1)
  if (o >= -48 && o <= -1) return quaresma(d, md, gT, gP);

  // 4. Jejum dos Apóstolos: P+57 … 28.06
  if (o >= 57 && (m < 6 || (m === 6 && dia <= 28))) return jejumLongo('apostolos', d, md, gT, gP);
  // 5. Jejum da Dormição: 01–14.08
  if (m === 8 && dia <= 14) return dormicao(d, md, gT, gP);
  // 6. Jejum da Natividade: 15.11–24.12
  if ((m === 11 && dia >= 15) || (m === 12 && dia <= 24)) return jejumLongo('natal', d, md, gT, gP);

  // 7. Quartas e sextas fora dos jejuns longos
  if (quaSex) {
    if (o >= 7 && o <= 48) {   // Pentecostário (doc. 02 §2.2)
      const peixeT = o === 24 || o === 38;
      return { jejum: true, tempo: 'quarta_sexta', paroquial: r(N.PEIXE),
        typikon: r(peixeT ? N.PEIXE : N.QUENTE_COM_AZEITE, { vinho: true, notas: peixeT ? [] : ['n_pentecostario_peixe'] }) };
    }
    const par = PEIXE_QUA_SEX.has(md) || PEIXE_QUA_SEX_PAROQUIAL.has(md) || grauMin(gP, 'vigilia') ? N.PEIXE
      : grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.QUENTE_SEM_AZEITE;
    const typ = PEIXE_QUA_SEX.has(md) ? r(N.PEIXE, { vinho: true, refeicoes: 2 })
      : r(N.XEROFAGIA, { refeicoes: 1, notas: grauMin(gT, 'doxologia') ? ['n_typikon_nao_explicito'] : [] });
    return { jejum: true, tempo: 'quarta_sexta', paroquial: r(par), typikon: typ };
  }
  return { jejum: false, tempo: null, paroquial: r(N.TUDO), typikon: r(N.TUDO) };
}

function quaresma(d, md, gT, gP) {
  const { o, dow } = d, satSun = dow === 6 || dow === 0;
  const res = (par, typ, tempo = o >= -6 ? 'semana_santa' : 'quaresma') => ({ jejum: true, tempo, paroquial: par, typikon: typ });

  // Anunciação (25.03) dentro da Quaresma / Semana Santa (doc. 02 §3.1.4–3.1.5; Typikon, capítulos de Marcos a 25.03)
  if (md === '03-25') {
    if (o <= -7) return res(r(N.PEIXE), r(N.PEIXE, { vinho: true, refeicoes: satSun ? 2 : 1 }));
    if (o >= -6 && o <= -5) return res(r(N.QUENTE_COM_AZEITE, { notas: ['n_anunciacao_semana_santa'] }), r(N.QUENTE_COM_AZEITE, { vinho: true }));
    if (o === -4) return res(r(N.QUENTE_SEM_AZEITE, { vinho: true, notas: ['n_anunciacao_semana_santa'] }), r(N.QUENTE_SEM_AZEITE, { vinho: true }));
    if (o === -3) return res(r(N.QUENTE_COM_AZEITE, { notas: ['n_anunciacao_semana_santa'] }), r(N.QUENTE_COM_AZEITE, { vinho: true }));
    if (o === -2) return res(r(N.XEROFAGIA, { vinho: true, notas: ['n_anunciacao_semana_santa'] }), r(N.XEROFAGIA, { vinho: true }));
  }
  if (o === -8) return res(r(N.OVAS), r(N.OVAS, { vinho: true }));                            // Sábado de Lázaro
  if (o === -7) return res(r(N.PEIXE), r(N.PEIXE, { vinho: true }));                          // Domingo de Ramos
  // Semana Santa
  if (o >= -6 && o <= -4) return res(r(N.XEROFAGIA), r(N.XEROFAGIA, { refeicoes: 1 }));
  if (o === -3) return res(r(N.QUENTE_COM_AZEITE, { vinho: true, notas: ['n_quinta_santa'] }), r(N.QUENTE_COM_AZEITE, { vinho: true, notas: ['n_quinta_santa'] }));
  if (o === -2) return res(r(N.SEM_COMIDA, { notas: ['n_sexta_santa'] }), r(N.SEM_COMIDA, { notas: ['n_sexta_santa_doentes'] }));
  if (o === -1) return res(r(N.XEROFAGIA), r(N.XEROFAGIA, { vinho: true, notas: ['n_sabado_santo'] }));
  // Véspera da Anunciação antes do Sábado de Lázaro: azeite e vinho (Typikon)
  const vesperaAnunc = md === '03-24' && o < -9;
  // Primeira semana (doc. 02 §3.1.3)
  if (o === -48) return res(r(N.SEM_COMIDA), r(N.SEM_COMIDA));
  if (o === -47) return res(r(N.SEM_COMIDA, { notas: ['n_primeira_terca'] }), r(N.SEM_COMIDA, { notas: ['n_primeira_terca_fracos'] }));
  if (o === -46) return res(r(N.XEROFAGIA), r(N.XEROFAGIA, { refeicoes: 1, notas: ['n_primeira_quarta'] }));
  if (o === -45) return res(r(N.QUENTE_SEM_AZEITE), r(N.SEM_COMIDA, { notas: ['n_primeira_quinta'] }));
  if (o === -44) return res(r(N.XEROFAGIA), r(N.XEROFAGIA, { refeicoes: 1 }));
  // Sábados e domingos
  if (satSun) return res(r(N.QUENTE_COM_AZEITE), r(N.QUENTE_COM_AZEITE, { vinho: true, refeicoes: 2 }));
  // Dias úteis das semanas 2–6
  const santoT = grauMin(gT, 'polieleo') || QUARESMA_AZEITE.has(md) || vesperaAnunc;
  const santoP = grauMin(gP, 'polieleo');
  const base = dow === 2 || dow === 4 ? N.QUENTE_SEM_AZEITE : N.XEROFAGIA;
  const par = r(santoP ? N.QUENTE_COM_AZEITE : base);
  let typ = santoT ? r(N.QUENTE_COM_AZEITE, { vinho: true }) : r(N.XEROFAGIA, { refeicoes: 1 });
  if (o === -25) typ = r(N.XEROFAGIA, { refeicoes: 1, notas: ['n_mesoquaresma'] });
  if (o === -17) { typ = r(N.XEROFAGIA, { vinho: true, notas: ['n_grande_canone'] }); par.notas.push('n_grande_canone_par'); }
  if (grauMin(gT, 'doxologia') && !santoT) typ.notas.push('n_quaresma_doxologia');
  return res(par, typ);
}

/** Jejuns dos Apóstolos e da Natividade (mesma regra no cap. 33; a camada paroquial difere). */
function jejumLongo(tempo, d, md, gT, gP) {
  const { dow } = d, m = d.juliano.m, dia = d.juliano.d;
  const seg = dow === 1, terQui = dow === 2 || dow === 4, quaSex = dow === 3 || dow === 5, satSun = dow === 6 || dow === 0;
  const fase = tempo === 'natal' ? (m === 12 && dia >= 20 ? 3 : m === 12 && dia >= 7 ? 2 : 1) : 0;
  const semPeixeT = tempo === 'natal' && m === 12 && dia >= 21;     // pravenc/Zheltov: «a partir do dia 20» = desde 21.12
  const res = (par, typ) => ({ jejum: true, tempo, paroquial: par, typikon: typ });

  // Festas com peixe em qualquer dia
  if (md === '11-21' || md === '06-24' || (md === '06-29')) return res(r(N.PEIXE), r(N.PEIXE, { vinho: true, refeicoes: 2 }));

  // ── Camada Typikon (cap. 33; segunda-feira como quarta/sexta segundo o cap. 48, com nota do conflito)
  let gTyp = gT;
  if (tempo === 'natal' && NATAL_TYPIKON_SANTOS.has(md) && !grauMin(gTyp, 'doxologia')) gTyp = 'doxologia';
  let typ;
  if (grauMin(gTyp, 'vigilia')) typ = r(semPeixeT ? N.QUENTE_COM_AZEITE : N.PEIXE, { vinho: true, refeicoes: 2 });
  else if (satSun) typ = r(semPeixeT ? N.QUENTE_COM_AZEITE : N.PEIXE, { vinho: true, refeicoes: 2 });
  else if (terQui) typ = r(grauMin(gTyp, 'doxologia') && !semPeixeT ? N.PEIXE : N.QUENTE_COM_AZEITE, { vinho: true, refeicoes: 2 });
  else typ = grauMin(gTyp, 'doxologia') ? r(N.QUENTE_COM_AZEITE, { vinho: true, refeicoes: 1 }) : r(N.XEROFAGIA, { refeicoes: 1 });
  if (seg) typ.notas.push('n_segunda_conflito');
  if (tempo === 'natal' && m === 12 && (dia === 20 || dia === 21)) typ.notas.push('n_natal_20_21');

  // ── Camada paroquial (doc. 02 §3.2.2 e §3.4.2; referência: azbyka)
  let par;
  if (tempo === 'apostolos') {
    if (satSun) par = r(N.PEIXE);
    else if (terQui) par = r(grauMin(gP, 'polieleo') ? N.PEIXE : N.QUENTE_COM_AZEITE, { notas: ['n_apostolos_ter_qui'] });
    else if (quaSex) par = r(grauMin(gP, 'vigilia') ? N.PEIXE : grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.XEROFAGIA);
    else par = r(grauMin(gP, 'vigilia') ? N.PEIXE : grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.QUENTE_SEM_AZEITE);
  } else if (fase === 1 || fase === 2) {
    if (satSun) par = r(N.PEIXE);
    else if (terQui) par = r(fase === 1 || grauMin(gP, 'polieleo') ? N.PEIXE : N.QUENTE_COM_AZEITE);
    else if (quaSex) par = r(grauMin(gP, 'vigilia') ? N.PEIXE : grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.XEROFAGIA);
    else par = r(grauMin(gP, 'vigilia') ? N.PEIXE : grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.QUENTE_SEM_AZEITE);
  } else {                                                    // 20–24.12: sem peixe
    if (satSun) par = r(N.QUENTE_COM_AZEITE);
    else if (terQui) par = r(grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.QUENTE_SEM_AZEITE);
    else par = r(grauMin(gP, 'polieleo') ? N.QUENTE_COM_AZEITE : N.XEROFAGIA);
    if (dow !== 0 && dow !== 6 && md !== '12-24') par.notas.push('n_natal_2_5_jan');
  }
  if (md === '12-24') { par.notas.push('n_vespera_natal'); typ = r(N.QUENTE_COM_AZEITE, { vinho: true, notas: satSun ? ['n_vespera_sab_dom'] : [] }); }
  return res(par, typ);
}

function dormicao(d, md, gT, gP) {
  const { dow } = d, satSun = dow === 6 || dow === 0, terQui = dow === 2 || dow === 4;
  const res = (par, typ) => ({ jejum: true, tempo: 'dormicao', paroquial: par, typikon: typ });
  if (md === '08-06') return res(r(N.PEIXE), r(N.PEIXE, { vinho: true, refeicoes: 2 }));
  const base = satSun ? N.QUENTE_COM_AZEITE : terQui ? N.QUENTE_SEM_AZEITE : N.XEROFAGIA;
  // Santos de polieleo/vigília: sem fonte no cap. 33 — aplica-se o modificador do jejum dos Apóstolos com teto «sem peixe».
  const santo = (g) => grauMin(g, 'polieleo') && base < N.QUENTE_COM_AZEITE;
  const par = r(santo(gP) ? N.QUENTE_COM_AZEITE : base, { notas: santo(gP) ? ['n_dormicao_santos'] : [] });
  const typ = r(santo(gT) ? N.QUENTE_COM_AZEITE : base, { vinho: satSun || santo(gT), refeicoes: satSun ? 2 : 1, notas: santo(gT) ? ['n_dormicao_santos'] : [] });
  return res(par, typ);
}
