// Validação dos dados compilados (graus do Menaion e lecionário), se existirem.
import assert from 'node:assert/strict';
import fs from 'fs';
const ler = f => (fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : null);
let n = 0;
const graus = ler('data/menaion/graus.json');
if (graus) {
  const G = new Set(['grande', 'vigilia', 'polieleo', 'doxologia', null]);
  for (const [md, lista] of Object.entries(graus)) {
    assert.match(md, /^(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, md);
    for (const c of lista) {
      assert.ok(c.pt || c.cu, `${md}: comemoração sem nome`);
      assert.ok(G.has(c.grau_typikon ?? null) && G.has(c.grau_atual ?? null), `${md} ${c.id}: grau inválido`);
      n++;
    }
  }
}
const REF = /^[1-4]?[A-Za-z]+\.\d+\.\d+/;
const refs = x => (Array.isArray(x) ? x : x ? [x] : []).forEach(r => { if (r && r.r) { assert.match(r.r, REF, JSON.stringify(r)); n++; } });
for (const f of ['pentecostario', 'semanas', 'triodio', 'especiais', 'festas']) {
  const d = ler(`data/lecionario/${f}.json`);
  if (!d) continue;
  const andar = o => { if (Array.isArray(o)) { if (o.length && o[0] && typeof o[0] === 'object' && 'r' in o[0]) refs(o); else o.forEach(andar); }
    else if (o && typeof o === 'object') { if ('r' in o) refs(o); else for (const [k, v] of Object.entries(o)) if (!k.startsWith('_')) andar(v); } };
  andar(d);
}
console.log(`dados: ${n} registos validados`);
