// Graus (sinais do Typikon) das comemorações fixas, compilados de fontes de domínio público (decisão 43):
// data/menaion/graus.json (ver data/menaion/FONTES-graus.md) → src/dados/gerado/ (tools/gerar-dados.mjs).
// Núcleo: "TA,TA" por dia (T = Typikon, A = prática atual; G grande, V vigília, P polieleo, D doxologia, - abaixo).
import { chaveMD } from '../engine/datas.js';
import graus from './gerado/graus.json' with { type: 'json' };

const ORDEM = { grande: 4, vigilia: 3, polieleo: 2, doxologia: 1 };
const CODIGO = { G: 'grande', V: 'vigilia', P: 'polieleo', D: 'doxologia' };
const maior = (a, b) => ((ORDEM[b] || 0) > (ORDEM[a] || 0) ? b : a);
const doDia = d => { const s = graus[chaveMD(d.juliano.m, d.juliano.d)]; return s ? s.split(',').map(x => [CODIGO[x[0]] || null, CODIGO[x[1]] || null]) : []; };

/** Grau mais alto do dia em cada camada (Typikon e prática atual), para o motor do jejum. */
export function grausDoDia(d) {
  let typikon = null, atual = null;
  for (const [t, a] of doDia(d)) { typikon = maior(typikon, t); atual = maior(atual, a); }
  return { typikon, atual };
}
