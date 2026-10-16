// Dia litúrgico: ciclo móvel (Triódio, Pentecostário), semanas depois do Pentecostes, tom do Octoeco, Evangelho matinal,
// festas fixas e semimóveis. Especificação: docs/conhecimento/01-calendario-e-leituras.md §3–6.
// Devolve apenas códigos; os nomes em cada língua estão em src/i18n.
import { juliano, gregoriano, diaSemana, pascoa, jdnJuliano, chaveMD } from './datas.js';

// ── Festas fixas (data juliana). nivel: 'doze' (Doze Grandes Festas) | 'grande'; tipo: 'senhor' | 'mae_de_deus' | 'santo'.
// pre/pos = dias de pré-festa e de pós-festa incluindo a despedida (doc. 01 §4.1–4.2).
export const FIXAS = {
  '09-08': { id: 'nat_mae_deus', nivel: 'doze', tipo: 'mae_de_deus', pre: 1, pos: 4 },
  '09-14': { id: 'exaltacao', nivel: 'doze', tipo: 'senhor', pre: 1, pos: 7 },
  '11-21': { id: 'apresentacao', nivel: 'doze', tipo: 'mae_de_deus', pre: 1, pos: 4 },
  '12-25': { id: 'natal', nivel: 'doze', tipo: 'senhor', pre: 5, pos: 6 },
  '01-06': { id: 'teofania', nivel: 'doze', tipo: 'senhor', pre: 4, pos: 8 },
  '02-02': { id: 'encontro', nivel: 'doze', tipo: 'senhor', pre: 1, pos: 7 },
  '03-25': { id: 'anunciacao', nivel: 'doze', tipo: 'mae_de_deus', pre: 1, pos: 1 },
  '08-06': { id: 'transfiguracao', nivel: 'doze', tipo: 'senhor', pre: 1, pos: 7 },
  '08-15': { id: 'dormicao', nivel: 'doze', tipo: 'mae_de_deus', pre: 1, pos: 8 },
  '01-01': { id: 'circuncisao', nivel: 'grande', tipo: 'senhor', pre: 0, pos: 0 },
  '06-24': { id: 'nat_precursor', nivel: 'grande', tipo: 'santo', pre: 0, pos: 0 },
  '06-29': { id: 'pedro_paulo', nivel: 'grande', tipo: 'santo', pre: 0, pos: 0 },
  '08-29': { id: 'degolacao', nivel: 'grande', tipo: 'santo', pre: 0, pos: 0 },
  '10-01': { id: 'protecao', nivel: 'grande', tipo: 'mae_de_deus', pre: 0, pos: 0 },
};
// Festas móveis das Doze (deslocamento em relação à Páscoa).
export const MOVEIS_DOZE = { [-7]: 'ramos', 39: 'ascensao', 49: 'pentecostes' };

// ── Comemorações do ciclo móvel (doc. 01 §3.1), por deslocamento em relação à Páscoa.
export const MOVEIS = {
  [-77]: 'dom_zaqueu', [-70]: 'dom_publicano', [-63]: 'dom_prodigo', [-57]: 'sab_defuntos_carne', [-56]: 'dom_juizo',
  [-50]: 'sab_ascetas', [-49]: 'dom_perdao', [-48]: 'segunda_limpa', [-43]: 'sab_teodoro', [-42]: 'dom_ortodoxia',
  [-36]: 'sab_defuntos_2', [-35]: 'dom_palamas', [-29]: 'sab_defuntos_3', [-28]: 'dom_cruz', [-25]: 'quarta_mesoquaresma',
  [-22]: 'sab_defuntos_4', [-21]: 'dom_climaco', [-17]: 'quinta_grande_canone', [-15]: 'sab_acatisto', [-14]: 'dom_maria_egipciaca',
  [-8]: 'sab_lazaro', [-7]: 'ramos', [-6]: 'segunda_santa', [-5]: 'terca_santa', [-4]: 'quarta_santa', [-3]: 'quinta_santa',
  [-2]: 'sexta_santa', [-1]: 'sabado_santo', 0: 'pascoa', 7: 'dom_tome', 9: 'radonitsa', 14: 'dom_miroforas',
  21: 'dom_paralitico', 24: 'mesopentecostes', 28: 'dom_samaritana', 31: 'despedida_mesopentecostes', 35: 'dom_cego',
  38: 'despedida_pascoa', 39: 'ascensao', 42: 'dom_padres_nicea', 47: 'despedida_ascensao', 48: 'sab_defuntos_trindade',
  49: 'pentecostes', 50: 'dia_espirito_santo', 55: 'despedida_pentecostes', 56: 'dom_todos_santos', 63: 'dom_santos_russia',
};

// Despedida da Páscoa e da Ascensão estão em MOVEIS; Bright Week: tons próprios por dia (doc. 01 §6.1).
const TOM_LUMINOSA = [null, 2, 3, 4, 5, 6, 8];   // seg … sáb (o sábado tem o tom 8 desde as Vésperas de sexta)
// Evangelhos matinais fixos nos domingos do Pentecostário (doc. 01 §6.2).
const EOTHINA_PENTECOSTARIO = { 7: 1, 14: 3, 21: 4, 28: 7, 35: 8, 42: 11 };

/** Domingo (JDN) dentro do intervalo de datas julianas [m1-d1, m2-d2] do ano juliano y. */
function domingoEntre(y, m1, d1, m2, d2) {
  const a = jdnJuliano(y, m1, d1), b = jdnJuliano(y, m2, d2);
  for (let j = a; j <= b; j++) if (diaSemana(j) === 0) return j;
  return null;
}
/** Sábado/domingo (dow) estritamente antes ou depois de uma data juliana. */
function antes(jdn, dow) { let j = jdn - 1; while (diaSemana(j) !== dow) j--; return j; }
function depois(jdn, dow) { let j = jdn + 1; while (diaSemana(j) !== dow) j++; return j; }

/** Comemorações semimóveis do ano juliano y (doc. 01 §3.2): Map JDN → [ids]. */
const semimoveisCache = new Map();
export function semimoveis(y) {
  let m = semimoveisCache.get(y);
  if (m) return m;
  m = new Map();
  const add = (j, id) => { if (j == null) return; const a = m.get(j); a ? a.push(id) : m.set(j, [id]); };
  const exalt = jdnJuliano(y, 9, 14), natal = jdnJuliano(y, 12, 25), teof = jdnJuliano(y, 1, 6);
  add(antes(exalt, 6), 'sab_antes_exaltacao'); add(antes(exalt, 0), 'dom_antes_exaltacao');
  add(depois(exalt, 6), 'sab_depois_exaltacao'); add(depois(exalt, 0), 'dom_depois_exaltacao');
  add(domingoEntre(y, 10, 11, 10, 17), 'dom_padres_vii_concilio');
  add(antes(jdnJuliano(y, 10, 26), 6), 'sab_demetrio');
  add(domingoEntre(y, 12, 11, 12, 17), 'dom_antepassados');
  add(domingoEntre(y, 12, 18, 12, 24), 'dom_santos_padres');
  add(antes(natal, 6), 'sab_antes_natal');
  // Depois do Natal: sábado e domingo de 26 a 31.12; Natal ao domingo → «domingo» transferido para segunda 26.12.
  const sabDepoisNatal = depois(natal, 6); if (sabDepoisNatal <= jdnJuliano(y, 12, 31)) add(sabDepoisNatal, 'sab_depois_natal');
  if (diaSemana(natal) === 0) add(natal + 1, 'dom_depois_natal');
  else { const d = depois(natal, 0); if (d <= jdnJuliano(y, 12, 31)) add(d, 'dom_depois_natal'); }
  // Teofania: sábado/domingo antes (entre o Natal anterior e 05.01) e depois (07–13.01).
  const sabAntesTeof = antes(teof, 6), domAntesTeof = antes(teof, 0);
  if (sabAntesTeof > jdnJuliano(y - 1, 12, 25)) add(sabAntesTeof, 'sab_antes_teofania');
  if (domAntesTeof > jdnJuliano(y - 1, 12, 25)) add(domAntesTeof, 'dom_antes_teofania');
  add(depois(teof, 6), 'sab_depois_teofania'); add(depois(teof, 0), 'dom_depois_teofania');
  // Novos Mártires e Confessores da Igreja Russa: domingo mais próximo de 25.01 (Concílio dos Bispos 2013) → 22–28.01.
  add(domingoEntre(y, 1, 22, 1, 28), 'dom_novos_martires');
  // Padres dos seis Concílios Ecuménicos: domingo 13–19.07.
  add(domingoEntre(y, 7, 13, 7, 19), 'dom_padres_seis_concilios');
  semimoveisCache.set(y, m);
  return m;
}

/** Pré-festa, pós-festa e despedida das festas fixas, com as regras especiais do Encontro e da Anunciação. */
function estadoFesta(jdn, jul, p) {
  const om = jdn - p;
  if (om >= 1 && om <= 38) return { id: 'pascoa', fase: om === 38 ? 'despedida' : 'posfesta' };
  if (om >= 40 && om <= 47) return { id: 'ascensao', fase: om === 47 ? 'despedida' : 'posfesta' };
  if (om >= 50 && om <= 55) return { id: 'pentecostes', fase: om === 55 ? 'despedida' : 'posfesta' };
  for (const [md, f] of Object.entries(FIXAS)) {
    if (!f.pre && !f.pos) continue;
    const [m, d] = md.split('-').map(Number);
    // a festa pode pertencer ao ano juliano anterior/seguinte (Natal ↔ janeiro)
    for (const y of [jul.y - 1, jul.y, jul.y + 1]) {
      const fj = jdnJuliano(y, m, d);
      let pre = f.pre, pos = f.pos;
      if (f.id === 'encontro') pos = posEncontro(fj, pascoa(y));
      if (f.id === 'anunciacao') { const o = fj - pascoa(y); if (o >= -7 && o <= 6) { pre = 0; pos = 0; } else if (o === -8) pos = 0; }
      const k = jdn - fj;
      if (k < 0 && -k <= pre) return { id: f.id, fase: 'prefesta' };
      if (k > 0 && k <= pos) return { id: f.id, fase: k === pos ? 'despedida' : 'posfesta' };
    }
  }
  return null;
}
/** Dias de pós-festa do Encontro (02.02) conforme o Triódio (doc. 01 §4.1, nota 1). */
function posEncontro(fj, p) {
  const o = fj - p;                     // P−70 Publicano … P−49 Perdão
  const ate = alvo => Math.max(0, Math.min(7, alvo - fj));
  // Antes do domingo do Pródigo: pós-festa normal. ⚠ O doc. 01 não cobre a festa em P−70…P−64 (o 7.º dia pode cair no
  // sábado de carne, onde não há despedida); mantém-se a regra geral até haver fonte.
  if (o < -63) return 7;
  if (o <= -61) return ate(p - 58);     // dom. Pródigo, seg/ter da semana de carne → sexta dessa semana
  if (o <= -57) return ate(p - 54);     // qua–sáb da semana de carne → terça do queijo
  if (o <= -55) return ate(p - 52);     // dom. de carne, seg. do queijo → quinta do queijo
  if (o <= -53) return ate(p - 50);     // ter/qua do queijo → sábado do queijo
  if (o <= -50) return ate(p - 49);     // qui–sáb do queijo → domingo do Perdão
  return 0;                             // no próprio domingo do Perdão: um só dia
}

/**
 * Informação litúrgica de um dia civil (JDN).
 * @returns {{jdn, civil, juliano, dow, p, o, festa, fixa, moveis, semimoveis, prefesta, periodo, semana, tom, eothinon}}
 */
export function dia(jdn) {
  const jul = juliano(jdn), dow = diaSemana(jdn), p = pascoa(jul.y), o = jdn - p;
  const pAnt = pascoa(jul.y - 1), pent = p + 49, pentAnt = pAnt + 49;
  const md = chaveMD(jul.m, jul.d);
  const fixa = FIXAS[md] || null;
  const moveis = MOVEIS[o] ? [MOVEIS[o]] : [];
  const semi = semimoveis(jul.y).get(jdn) || [];
  const festaDoze = MOVEIS_DOZE[o] || (o === 0 ? 'pascoa' : null);

  // Período litúrgico
  let periodo;
  if (o >= -70 && o <= -49) periodo = 'triodio_preparatorio';
  else if (o >= -48 && o <= -8) periodo = 'quaresma';
  else if (o >= -7 && o <= -1) periodo = 'semana_santa';
  else if (o === 0) periodo = 'pascoa';
  else if (o >= 1 && o <= 6) periodo = 'semana_luminosa';
  else if (o >= 7 && o <= 56) periodo = 'pentecostario';
  else periodo = 'comum';

  // Semana (doc. 01 §7.2; convenção russa: «седмица N» depois do Pentecostes termina no domingo N)
  let semana = null;
  if (o > 49) semana = { tipo: 'pentecostes', n: Math.ceil((jdn - pent) / 7) };
  else if (o < -70) semana = { tipo: 'pentecostes', n: Math.ceil((jdn - pentAnt) / 7) };
  else if (o >= -69 && o <= -49 && dow !== 0) semana = { tipo: 'triodio', n: Math.ceil((o + 70) / 7) };  // 1 Publicano, 2 Pródigo, 3 queijo
  else if (o >= -48 && o <= -8 && dow !== 0) semana = { tipo: 'quaresma', n: Math.floor((o + 48) / 7) + 1 };
  else if (o >= 8 && o <= 48 && dow !== 0) semana = { tipo: 'pascoa', n: Math.floor(o / 7) + 1 };
  if (semana && dow === 0) semana.domingo = true;
  if (dow === 0 && o >= -42 && o <= -14) semana = { tipo: 'quaresma', n: (o + 49) / 7, domingo: true };
  if (dow === 0 && o >= 7 && o <= 42) semana = { tipo: 'pascoa', n: o / 7 + 1, domingo: true };

  // Tom do Octoeco (doc. 01 §6.1)
  let tom = null;
  if (o >= 1 && o <= 6) tom = TOM_LUMINOSA[o];
  else if (o >= 7) { const w = Math.floor(o / 7) % 8; tom = w || 8; }
  else if (o <= -8) { const w = Math.floor((jdn - pAnt) / 7) % 8; tom = w || 8; }

  // Evangelho matinal dominical (doc. 01 §6.2)
  let eothinon = null;
  if (dow === 0) {
    if (EOTHINA_PENTECOSTARIO[o]) eothinon = EOTHINA_PENTECOSTARIO[o];
    else if (o === 49) eothinon = 'pentecostes';
    else if (o === -7) eothinon = 'ramos';
    else if (o >= 56 || o <= -14) {
      const d = o >= 56 ? o : jdn - pAnt;
      eothinon = ((d / 7 - 7) % 11 + 11) % 11 || 11;
    }
  }

  const festa = festaDoze ? { id: festaDoze, nivel: festaDoze === 'pascoa' ? 'pascoa' : 'doze', tipo: 'senhor' } : fixa;
  // Festa do Senhor ao domingo: não se lê o Evangelho matinal dominical (doc. 01 §5.2, §6.2)
  if (dow === 0 && festa && festa.tipo === 'senhor' && typeof eothinon === 'number') eothinon = { omitido: eothinon };

  return {
    jdn, civil: gregoriano(jdn), juliano: jul, dow, p, o, periodo, semana, tom, eothinon,
    festa, fixa, moveis, semimoveis: semi, prefesta: estadoFesta(jdn, jul, p),
  };
}

/** Datas (JDN) da Páscoa e das festas móveis das Doze de um ano civil, para listas anuais. */
export function festasMoveisDoAno(anoCivil) {
  const p = pascoa(anoCivil);   // a Páscoa cai sempre em março–maio: o ano juliano coincide com o civil
  return { pascoa: p, ramos: p - 7, ascensao: p + 39, pentecostes: p + 49 };
}
