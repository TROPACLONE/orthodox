// Orações: períodos sazonais e integridade dos dados (todas as línguas e o eslavo em todos os blocos).
import assert from 'node:assert/strict';
import fs from 'fs';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { periodoOracao, blocosDoPeriodo } from '../src/engine/oracoes.js';
const P = d => periodoOracao(dia(G(...d)));
assert.equal(P([2026, 4, 12]), 'semana_luminosa'); assert.equal(P([2026, 4, 18]), 'semana_luminosa');
assert.equal(P([2026, 4, 19]), 'pascoa_ascensao'); assert.equal(P([2026, 5, 20]), 'pascoa_ascensao');
assert.equal(periodoOracao(dia(G(2026, 5, 20)), true), 'ascensao_pentecostes');   // noite da véspera da Ascensão (B1)
assert.equal(P([2026, 5, 21]), 'ascensao_pentecostes'); assert.equal(P([2026, 5, 31]), 'comum');
assert.deepEqual(blocosDoPeriodo([{ id: 'a' }, { id: 'b', quando: { so: ['semana_luminosa'] } }, { id: 'c', quando: { excepto: ['semana_luminosa'] } }], 'comum').map(b => b.id), ['a', 'c']);
let n = 0;
if (fs.existsSync('data/oracoes')) for (const f of fs.readdirSync('data/oracoes').filter(f => f.endsWith('.json'))) {
  const o = JSON.parse(fs.readFileSync('data/oracoes/' + f, 'utf8'));
  assert.equal(o.id + '.json', f, `${f}: id`);
  for (const l of ['cu', 'pt', 'ru', 'uk', 'en']) assert.ok(o.titulo[l], `${f}: título ${l}`);
  const ids = new Set();
  for (const b of o.blocos) {
    assert.ok(!ids.has(b.id), `${f}: id repetido ${b.id}`); ids.add(b.id);
    assert.ok(['rubrica', 'oracao', 'titulo'].includes(b.tipo), `${f} ${b.id}: tipo`);
    for (const l of ['pt', 'ru', 'uk', 'en']) assert.ok(b[l] && b[l].trim(), `${f} ${b.id}: falta ${l}`);
    if (b.tipo !== 'rubrica') assert.ok(b.cu && b.cu.trim(), `${f} ${b.id}: falta o eslavo`);
    n++;
  }
}
console.log(`orações: períodos OK; ${n} blocos validados`);
