// Santos do dia (data/santos/dia.json): estrutura, nomes nas 5 línguas e coerência com data/menaion/graus.json (id, grau, tipo).
import assert from 'node:assert/strict';
import fs from 'fs';
const D = JSON.parse(fs.readFileSync(new URL('../data/santos/dia.json', import.meta.url)));
const GR = JSON.parse(fs.readFileSync(new URL('../data/menaion/graus.json', import.meta.url)));
const GRAUS = ['grande', 'vigilia', 'polieleo', 'doxologia', 'seis', null];
const TIPOS = new Set(['senhor', 'theotokos', 'icone', 'santo', 'sinaxe', 'outro']);
const LEN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
// todos os dias do ano juliano, incluindo 29.02
const esperadas = LEN.flatMap((n, m) => Array.from({ length: n }, (_, d) => `${String(m + 1).padStart(2, '0')}-${String(d + 1).padStart(2, '0')}`));
assert.deepEqual(Object.keys(D.fixos).sort(), esperadas);
assert.ok(Array.isArray(D._fontes) && D._fontes.length > 0);
const vistos = new Set();
const nomes = (x, onde) => {
  for (const f of ['cu', 'ru', 'uk', 'pt', 'en']) assert.ok(typeof x[f] === 'string' && x[f].trim().length > 1, `${onde} ${x.id}: ${f} vazio`);
  assert.ok(!/[A-Za-z⟨⟩<>]/.test((x.cu + x.ru + x.uk).replace(/\b[IVX]+\b/g, '')), `${onde} ${x.id}: carácter latino ou de marcação no cirílico`);
};
for (const [k, lista] of Object.entries(D.fixos)) {
  assert.ok(lista.length > 0, `${k} sem comemorações`);
  let ant = 0;
  for (const x of lista) {
    assert.match(x.id, /^[a-z0-9]+(-[a-z0-9]+)*$/, `${k}: id ${x.id}`);
    assert.ok(!vistos.has(x.id), `id repetido: ${x.id}`); vistos.add(x.id);
    assert.ok(GRAUS.includes(x.grau), `${k} ${x.id}: grau ${x.grau}`);
    assert.ok(TIPOS.has(x.tipo), `${k} ${x.id}: tipo ${x.tipo}`);
    nomes(x, k);
    const r = GRAUS.indexOf(x.grau); assert.ok(r >= ant, `${k}: ordem (principal primeiro) em ${x.id}`); ant = r;
  }
}
// graus.json: cada comemoração no mesmo dia, mesmo id, grau = grau_atual, tipo equivalente
const idsGraus = new Set();
for (const [k, lista] of Object.entries(GR)) for (const g of lista) {
  idsGraus.add(g.id);
  const x = D.fixos[k].find(y => y.id === g.id);
  assert.ok(x, `graus.json ${k} ${g.id} em falta em dia.json`);
  assert.equal(x.grau, g.grau_atual, `${k} ${g.id}: grau`);
  assert.equal(x.tipo, g.tipo === 'mae_de_deus' ? 'theotokos' : g.tipo, `${k} ${g.id}: tipo`);
}
// fora de graus.json não há doxologia ou superior (graus.json é a lista completa da prática atual)
for (const [k, lista] of Object.entries(D.fixos)) for (const x of lista)
  if (!idsGraus.has(x.id)) assert.ok(x.grau === 'seis' || x.grau === null, `${k} ${x.id}: grau ${x.grau} sem entrada em graus.json`);
// móveis: regra explícita
const MMDD = /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
assert.ok(D.moveis.length >= 10);
for (const m of D.moveis) {
  assert.ok(!vistos.has(m.id), `id repetido: ${m.id}`); vistos.add(m.id);
  assert.ok(GRAUS.includes(m.grau) && TIPOS.has(m.tipo), m.id);
  nomes(m, 'móvel');
  const r = m.regra;
  if ('pascoa' in r) assert.ok(Number.isInteger(r.pascoa), m.id);
  else { assert.ok([0, 6].includes(r.dia_semana) && MMDD.test(r.de) && MMDD.test(r.ate) && r.de <= r.ate, m.id); }
}
const nov = D.moveis.find(m => m.id === 'sinaxe-novos-martires-russia');
assert.deepEqual([nov.regra.dia_semana, nov.regra.de], [0, '01-25']);
console.log(`santos: ${Object.values(D.fixos).flat().length} comemorações fixas, ${D.moveis.length} móveis — ok`);
