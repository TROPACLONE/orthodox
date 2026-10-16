// Graus (sinais do Typikon) das comemorações fixas, compilados de fontes de domínio público (decisão 43):
// data/menaion/graus.json — ver data/menaion/FONTES-graus.md.
import { chaveMD } from '../engine/datas.js';
import graus from '../../data/menaion/graus.json' with { type: 'json' };

const ORDEM = { grande: 4, vigilia: 3, polieleo: 2, doxologia: 1 };
const maior = (a, b) => ((ORDEM[b] || 0) > (ORDEM[a] || 0) ? b : a);

/** Grau mais alto do dia em cada camada (Typikon e prática atual), para o motor do jejum. */
export function grausDoDia(d) {
  let typikon = null, atual = null;
  for (const c of graus[chaveMD(d.juliano.m, d.juliano.d)] || []) {
    typikon = maior(typikon, c.grau_typikon);
    atual = maior(atual, c.grau_atual || c.grau_typikon);
  }
  return { typikon, atual };
}

/** Nomes das comemorações com grau (as grandes festas vêm do motor do calendário e não se repetem). */
export function comemoracoesDoDia(d, lingua) {
  const lista = (graus[chaveMD(d.juliano.m, d.juliano.d)] || []).filter(c => (c.grau_atual || c.grau_typikon) !== 'grande');
  lista.sort((a, b) => (ORDEM[b.grau_atual || b.grau_typikon] || 0) - (ORDEM[a.grau_atual || a.grau_typikon] || 0));
  // Fase 1: nomes em PT e em eslavo/russo; os nomes ucranianos e ingleses chegam com a base de santos (fase 3).
  return lista.map(c => (lingua === 'pt' ? c.pt : c.cu) || c.pt || c.cu).filter(Boolean);
}
