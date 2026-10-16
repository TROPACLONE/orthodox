// As 4 línguas têm exatamente as mesmas chaves, e todos os códigos produzidos pelo motor têm nome em cada língua.
import assert from 'node:assert/strict';
import { FIXAS, MOVEIS, MOVEIS_DOZE, dia } from '../src/engine/calendario.js';
import { jejum } from '../src/engine/jejum.js';
import { jdnGregoriano } from '../src/engine/datas.js';

const L = {};
for (const l of ['pt', 'uk', 'ru', 'en']) L[l] = (await import(`../src/i18n/${l}.js`)).default;
const chaves = (o, p = '') => Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' && !Array.isArray(v) ? chaves(v, p + k + '.') : [p + k]));
const ref = chaves(L.pt).sort();
for (const l of ['uk', 'ru', 'en']) assert.deepEqual(chaves(L[l]).sort(), ref, `chaves de ${l}`);

// Recolhe todos os códigos que o motor produz num ciclo pascal completo (532 anos é demasiado; 40 anos cobrem todos os casos)
const ids = { festa: new Set(), movel: new Set(), semimovel: new Set(), tempo: new Set(), notas: new Set() };
for (let j = jdnGregoriano(2020, 1, 1); j < jdnGregoriano(2060, 1, 1); j++) {
  const d = dia(j), f = jejum(d, { typikon: 'polieleo', atual: 'vigilia' }), g = jejum(d, {});
  if (d.festa) ids.festa.add(d.festa.id);
  d.moveis.forEach(x => ids.movel.add(x)); d.semimoveis.forEach(x => ids.semimovel.add(x));
  for (const r of [f, g]) { if (r.tempo) ids.tempo.add(r.tempo); for (const c of ['paroquial', 'typikon']) r[c].notas.forEach(x => ids.notas.add(x)); }
}
Object.values(FIXAS).forEach(f => ids.festa.add(f.id)); Object.values(MOVEIS_DOZE).forEach(x => ids.festa.add(x));
Object.values(MOVEIS).forEach(x => ids.movel.add(x));
for (const l of Object.keys(L)) for (const [grupo, s] of Object.entries(ids)) for (const id of s) {
  const t = L[l][grupo][id] ?? (grupo === 'festa' ? L[l].movel[id] : undefined);
  assert.ok(typeof t === 'string' && t.length > 0, `${l}: falta ${grupo}.${id}`);
}
for (const l of Object.keys(L)) { assert.equal(L[l].nivel.length, 9); assert.equal(L[l].nivelDesc.length, 9); assert.equal(L[l].dias.length, 7); }
console.log(`i18n: 4 línguas × ${ref.length} chaves; ${Object.values(ids).reduce((s, x) => s + x.size, 0)} códigos do motor com nome`);
