// Santos do dia (fase 3, dec. 76): data/santos/dia.json → src/dados/gerado/oracoes/santos-xx.json (tools/gerar-dados.mjs).
// Formato compacto por língua: { f: { 'MM-DD': [[nome, grau, ficha], …] }, m: [[regra, nome, grau, ficha], …] }, com
// grau 'G' grande, 'V' vigília, 'P' polieleo, 'D' doxologia, 'S' seis estiqueras, '' sem sinal; ficha = id da ficha ou 0.
// Regras móveis: { pascoa: n } (dia P+n) ou { dia_semana, de, ate } (esse dia da semana entre duas datas julianas).
import { chaveMD } from './datas.js';

const ORDEM = { G: 5, V: 4, P: 3, D: 2, S: 1 };
const casa = (r, d, md) => (r.pascoa != null ? d.o === r.pascoa : d.dow === r.dia_semana && md >= r.de && md <= r.ate);

/** Comemorações do dia [nome, grau, ficha], das de maior grau para as de menor (ordem do calendário dentro de cada grau). */
export function santosDoDia(S, d) {
  const md = chaveMD(d.juliano.m, d.juliano.d);
  const lista = [...S.m.filter(x => casa(x[0], d, md)).map(x => x.slice(1)), ...(S.f[md] || [])];
  return lista.map((x, i) => [x, i]).sort((a, b) => (ORDEM[b[0][1]] || 0) - (ORDEM[a[0][1]] || 0) || a[1] - b[1]).map(([x]) => x);
}
