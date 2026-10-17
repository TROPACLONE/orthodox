// O módulo de graus devolve o mesmo resultado a partir do JSON original e do formato compactado do build.
import assert from 'node:assert/strict';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import fs from 'fs';
import { grausDoDia } from '../src/dados/graus.js';
import { santosDoDia } from '../src/engine/santos.js';
import { jejum, N } from '../src/engine/jejum.js';
const nic = dia(G(2026, 12, 19));                       // 06.12 OS, S. Nicolau (sábado)
assert.deepEqual(grausDoDia(nic), { typikon: 'vigilia', atual: 'vigilia' });
// Santos do dia (fase 3): o santo de maior grau vem primeiro, na língua do ficheiro gerado
const S = l => JSON.parse(fs.readFileSync(`src/dados/gerado/oracoes/santos-${l}.json`, 'utf8'));
assert.ok(santosDoDia(S('pt'), nic)[0][0].includes('Nicolau')); assert.equal(santosDoDia(S('pt'), nic)[0][1], 'V');
assert.ok(santosDoDia(S('ru'), nic)[0][0].includes('Николай'));
// Comemoração móvel: Sinaxe dos Santos de Moscovo (domingo de 19 a 25.08 OS) — 2026: domingo 06.09 NS = 24.08 OS
assert.ok(santosDoDia(S('pt'), dia(G(2026, 9, 6))).some(x => /Moscovo/.test(x[0])));
assert.ok(!santosDoDia(S('pt'), dia(G(2026, 9, 7))).some(x => /Sinaxe dos Santos de Moscovo/.test(x[0])));
// As que o motor já mostra não se repetem (Novos Mártires: 08.02.2026)
assert.ok(!santosDoDia(S('pt'), dia(G(2026, 2, 8))).some(x => /Novos Mártires e Confessores/.test(x[0])));
const sergio = dia(G(2026, 10, 8));                     // 25.09 OS, S. Sérgio de Radonej (quinta)
assert.ok(grausDoDia(sergio).atual);
// S. João Teólogo (26.09 OS) numa quarta-feira: peixe (doc. 02 §2.4) — 09.10.2030 NS é quarta
const jt = dia(G(2030, 10, 9)); assert.equal(jt.dow, 3); assert.equal(jejum(jt, grausDoDia(jt)).paroquial.nivel, N.PEIXE);
console.log('graus: casos OK');
