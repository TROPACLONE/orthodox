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

// Nomes: PT em português; nas outras línguas, por agora, a forma eslava/russa (a base de santos completa é a fase 3).
let nomes = null, nomesDe = null;
export async function carregarNomes(lingua) {
  const l = lingua === 'pt' ? 'pt' : 'cu';
  if (nomesDe === l) return;
  nomes = (await import(`./gerado/nomes-${l}.json`, { with: { type: 'json' } })).default; nomesDe = l;
}

/** Nomes das comemorações com grau, do maior para o menor (as grandes festas vêm do motor e não se repetem). */
export function comemoracoesDoDia(d) {
  if (!nomes) return [];
  const md = chaveMD(d.juliano.m, d.juliano.d), n = nomes[md] || [];
  return doDia(d).map(([t, a], i) => ({ t, a, nome: n[i] }))
    .filter(c => c.a !== 'grande' && c.t !== 'grande' && c.nome)
    .sort((x, y) => (ORDEM[y.a] || 0) - (ORDEM[x.a] || 0)).map(c => c.nome);
}
