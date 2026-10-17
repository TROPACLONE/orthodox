// Orações: períodos sazonais e integridade dos dados (todas as línguas e o eslavo em todos os blocos).
import assert from 'node:assert/strict';
import fs from 'fs';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { periodoOracao, blocosDoPeriodo, eNoite, CATISMAS, planoSalterio } from '../src/engine/oracoes.js';
const P = d => periodoOracao(dia(G(...d)));
assert.equal(P([2026, 4, 12]), 'semana_luminosa'); assert.equal(P([2026, 4, 18]), 'semana_luminosa');
assert.equal(periodoOracao(dia(G(2026, 4, 18)), true), 'pascoa_ascensao');   // noite do Sábado Luminoso (rubrica: até sábado de manhã)
assert.equal(P([2026, 4, 19]), 'pascoa_ascensao'); assert.equal(P([2026, 5, 20]), 'pascoa_ascensao');
assert.equal(periodoOracao(dia(G(2026, 5, 20)), true), 'ascensao_pentecostes');   // noite da véspera da Ascensão (B1)
// Hora (app: periodoOracao(d, eNoite(id, hora))): a partir das 18 h qualquer oração; as da noite desde o meio-dia, mas
// à 01 h do dia P+38 ainda é o dia litúrgico P+38 (Tempo Pascal), não a Ascensão.
const PH = (d, id, hora) => periodoOracao(dia(G(...d)), eNoite(id, hora));
assert.equal(PH([2026, 5, 20], 'noite', 1), 'pascoa_ascensao'); assert.equal(PH([2026, 5, 20], 'noite', 21), 'ascensao_pentecostes');
assert.equal(PH([2026, 5, 20], 'noite', 14), 'ascensao_pentecostes'); assert.equal(PH([2026, 5, 20], 'manha', 7), 'pascoa_ascensao');
assert.equal(PH([2026, 5, 20], 'refeicoes', 19), 'ascensao_pentecostes'); assert.equal(PH([2026, 5, 30], 'noite', 22), 'comum');
assert.equal(PH([2026, 4, 18], 'noite', 22), 'pascoa_ascensao');   // Sábado Luminoso à noite: Horas Pascais só «até sábado de manhã» (rubrica; QA 2a)
assert.equal(PH([2026, 4, 18], 'manha', 8), 'semana_luminosa');
assert.equal(P([2026, 5, 21]), 'ascensao_pentecostes'); assert.equal(P([2026, 5, 31]), 'comum');
assert.deepEqual(blocosDoPeriodo([{ id: 'a' }, { id: 'b', quando: { so: ['semana_luminosa'] } }, { id: 'c', quando: { excepto: ['semana_luminosa'] } }], 'comum').map(b => b.id), ['a', 'c']);
// Modos (Saltério pelos defuntos, dec. 64): so/excepto valem para o período e para os modos ativos.
const M = [{ id: 'a' }, { id: 'd', quando: { so: ['defuntos'] } }, { id: 'h', quando: { excepto: ['defuntos'] } }, { id: 'l', quando: { so: ['semana_luminosa'] } }];
assert.deepEqual(blocosDoPeriodo(M, 'comum').map(b => b.id), ['a', 'h']);
assert.deepEqual(blocosDoPeriodo(M, 'comum', ['defuntos']).map(b => b.id), ['a', 'd']);
assert.deepEqual(blocosDoPeriodo(M, 'semana_luminosa', ['defuntos']).map(b => b.id), ['a', 'd', 'l']);
// Plano pessoal (dec. 65): ciclo 1–20; com «1 por dia», a de hoje fica lida até amanhã.
assert.deepEqual(planoSalterio(0, 0, 100, false), { n: 1, lida: false });
assert.deepEqual(planoSalterio(20, 99, 100, true), { n: 1, lida: false });
assert.deepEqual(planoSalterio(7, 100, 100, true), { n: 7, lida: true });
assert.deepEqual(planoSalterio(7, 100, 100, false), { n: 8, lida: false });
assert.equal(CATISMAS.length, 20); assert.equal(CATISMAS[19][1], 151);
for (let k = 1; k < 20; k++) assert.equal(CATISMAS[k][0], CATISMAS[k - 1][1] + 1);
let n = 0;
const versos = new Map();   // «sl.v» → ficheiro (Saltério)
if (fs.existsSync('data/oracoes')) for (const f of fs.readdirSync('data/oracoes').filter(f => f.endsWith('.json'))) {
  const o = JSON.parse(fs.readFileSync('data/oracoes/' + f, 'utf8'));
  assert.equal(o.id + '.json', f, `${f}: id`);
  for (const l of ['cu', 'pt', 'ru', 'uk', 'en']) assert.ok(o.titulo[l], `${f}: título ${l}`);
  const ids = new Set();
  for (const b of o.blocos) {
    assert.ok(!ids.has(b.id), `${f}: id repetido ${b.id}`); ids.add(b.id);
    assert.ok(['rubrica', 'oracao', 'titulo', 'verso'].includes(b.tipo), `${f} ${b.id}: tipo`);
    if (b.tipo === 'verso') {
      assert.ok(Number.isInteger(b.sl) && Number.isInteger(b.v), `${f} ${b.id}: sl/v`);
      assert.ok(!versos.has(b.sl + '.' + b.v), `${f} ${b.id}: versículo repetido`); versos.set(b.sl + '.' + b.v, o.id);
    }
    for (const l of ['pt', 'ru', 'uk', 'en']) assert.ok(b[l] && b[l].trim(), `${f} ${b.id}: falta ${l}`);
    if (b.tipo !== 'rubrica') assert.ok(b.cu && b.cu.trim(), `${f} ${b.id}: falta o eslavo`);
    n++;
  }
}
console.log(`orações: períodos OK; ${n} blocos validados`);
// Saltério: todos os versículos da grelha (dec. 64), cada salmo na sua catisma, por ordem.
if (versos.size) {
  const grelha = JSON.parse(fs.readFileSync('data/salterio/_fontes/grelha.json', 'utf8'));
  for (const [sl, nv] of Object.entries(grelha)) for (let v = 1; v <= nv; v++) {
    const k = CATISMAS.findIndex(([a, b]) => sl >= a && sl <= b) + 1;
    assert.equal(versos.get(sl + '.' + v), 'salterio-' + String(k).padStart(2, '0'), `Saltério: Sl ${sl},${v}`);
  }
  assert.equal(versos.size, Object.values(grelha).reduce((a, b) => a + b), 'Saltério: versículos a mais');
  console.log(`saltério: ${versos.size} versículos nas 20 catismas`);
}
assert.equal(periodoOracao(dia(G(2027, 3, 20))), 'quaresma');   // sábado da 1.ª semana da Quaresma de 2027
console.log('orações: período da Quaresma OK');
