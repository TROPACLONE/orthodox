// Leituras: casos verificados no doc. 01 §7.3 (calendário oficial 2026, azbyka.ru, orthocal.info) e FONTES-semanas.md.
import assert from 'node:assert/strict';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { leituras } from '../src/engine/leituras.js';
let n = 0;
const L = (y, m, d) => leituras(dia(G(y, m, d)));
const caso = (y, m, d, ap, ev, nome) => { const r = L(y, m, d);
  assert.equal(r.ap[0]?.r, ap, `${nome} — Apóstolo`); assert.equal(r.ev[0]?.r, ev, `${nome} — Evangelho`); assert.equal(r.incerto, false, nome); n++; return r; };
caso(2026, 10, 16, 'Phil.3.8-19', 'Luke.6.17-23', '16.10.2026: Apóstolo da semana 20, Evangelho da 19 (s = +1)');
caso(2026, 10, 18, 'Gal.1.11-19', 'Luke.6.31-36', '18.10.2026: domingo 20, Evangelho do domingo 19');
const r28 = caso(2026, 9, 28, 'Eph.4.25-32', 'Matt.23.13-22', '28.09.2026: semana 18 com Evangelho da 11.ª (отступка; calendário oficial: Mt zach. 94)');
assert.equal(r28.ev[0].z, 94);
assert.equal(L(2026, 10, 5).ev[0].r, 'Luke.3.19-22', '05.10.2026: início de Lucas (18.ª semana), calendário oficial'); n++;
caso(2026, 4, 12, 'Acts.1.1-8', 'John.1.1-17', 'Páscoa');
caso(2026, 4, 29, 'Acts.8.18-25', 'John.6.35-39', 'P+17 (FONTES-semanas §3)');
caso(2026, 6, 16, 'Rom.7.14-8.2', 'Matt.10.9-15', 'semana 3, terça (FONTES-semanas §3)');
const teof = L(2027, 1, 19); assert.equal(teof.ev[0].r, 'Matt.3.13-17'); n++;
const zaq = L(2027, 2, 14); assert.equal(zaq.ev[0].r, 'Luke.19.1-10', 'Zaqueu 2027 (Páscoa 02.05.2027 → P−77 = 14.02.2027)');
n++;
// Santos do Menaion (santos.json; FONTES-santos.md §3)
const santo = (r, id) => r.extra.find(e => e.rotulo === 'santo' && e.id === id);
const sNic = santo(L(2026, 12, 19), 'nicolau-taumaturgo');                // sábado 06.12 OS: vigília, junta-se às do dia
assert.ok(sNic && sNic.ap[0].z === 335 && sNic.ev[0].z === 24 && sNic.vt.length === 3, 'S. Nicolau: Hb 335, Lc 24, 3 parémias'); n++;
const dHier = L(2026, 10, 18);                                             // domingo + Sinaxe dos hierarcas de Moscovo (polieleo)
assert.equal(dHier.ev[0].z, 26); assert.equal(santo(dHier, 'sinaxe-hierarcas-de-moscovo').ev[0].z, 11, 'domingo: dominicais + santo'); n++;
const jorge = L(2026, 5, 6);                                               // Pentecostário, dia útil: Atos/João + S. Jorge
assert.equal(jorge.ap[0].z, 34); assert.equal(santo(jorge, 'jorge-grande-martir').ap[0].z, 29); n++;
assert.equal(L(2026, 2, 1).extra.length, 0, 'domingo do Publicano: sem santos (S. Marcos de Éfeso)'); n++;
assert.equal(L(2026, 4, 14).extra.length, 0, 'Semana Luminosa: sem santos'); n++;
assert.equal(L(2026, 9, 21).extra.length, 0, 'Natividade da Mãe de Deus em dia útil: substitui tudo'); n++;
const quaresma = L(2026, 3, 9);                                            // 1.º e 2.º achados da cabeça do Precursor, 2.ª semana da Quaresma
assert.ok(quaresma.incerto && !quaresma.extra.length, 'Quaresma, dia útil, polieleo: incerto'); n++;
const desl = L(2026, 9, 22).extra.find(e => e.rotulo === 'ordinario');     // ordinário de 21.09 (festa) «под зачало» no dia seguinte
assert.ok(desl && desl.facultativo && desl.ap[0].z === 219, '22.09.2026: Ef 219 «под зачало»'); n++;
assert.ok(!L(2026, 9, 20).extra.some(e => e.rotulo === 'ordinario'), 'a véspera (domingo) não recebe as deslocadas'); n++;
assert.equal(santo(L(2026, 10, 25), 'dom_padres_vii_concilio').ev[0].z, 56, 'Domingo dos Padres do VII Concílio: Jo 56'); n++;
console.log(`leituras: ${n} casos OK`);
