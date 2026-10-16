// O módulo de graus devolve o mesmo resultado a partir do JSON original e do formato compactado do build.
import assert from 'node:assert/strict';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { grausDoDia, comemoracoesDoDia, carregarNomes } from '../src/dados/graus.js';
import { jejum, N } from '../src/engine/jejum.js';
const nic = dia(G(2026, 12, 19));                       // 06.12 OS, S. Nicolau (sábado)
assert.deepEqual(grausDoDia(nic), { typikon: 'vigilia', atual: 'vigilia' });
await carregarNomes('pt'); assert.ok(comemoracoesDoDia(nic)[0].startsWith('S. Nicolau'));
await carregarNomes('ru'); assert.ok(comemoracoesDoDia(nic)[0].includes('Николай'));
const sergio = dia(G(2026, 10, 8));                     // 25.09 OS, S. Sérgio de Radonej (quinta)
assert.ok(grausDoDia(sergio).atual);
// S. João Teólogo (26.09 OS) numa quarta-feira: peixe (doc. 02 §2.4) — 09.10.2030 NS é quarta
const jt = dia(G(2030, 10, 9)); assert.equal(jt.dow, 3); assert.equal(jejum(jt, grausDoDia(jt)).paroquial.nivel, N.PEIXE);
console.log('graus: casos OK');
