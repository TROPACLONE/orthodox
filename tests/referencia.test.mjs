// Verificação de conteúdo (decisão 49, fase 1): o motor contra o calendário oficial do Patriarcado de Moscovo (2026)
// e contra a regra de inverno e os defeitos documentados em docs/qa/fase1-conteudo.md. Dados: tests/referencia-leituras.json.
// · oficial_2026 — tem de passar sempre (regressão).
// · inverno e pendentes — regras ainda não implementadas: o teste só informa; com ESTRITO=1 passa a falhar.
import assert from 'node:assert/strict';
import fs from 'fs';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { leituras } from '../src/engine/leituras.js';
const ref = JSON.parse(fs.readFileSync('tests/referencia-leituras.json', 'utf8'));
const estrito = process.env.ESTRITO === '1';
const doMotor = s => { const [y, m, d] = s.split('-').map(Number); const dd = dia(G(y, m, d)), l = leituras(dd);
  const ordinario = l.extra.filter(e => e.rotulo === 'ordinario').flatMap(e => [...e.ap, ...e.ev]);   // leituras «под зачало»
  return { dd, l, lit: [...l.ap, ...l.ev, ...ordinario].filter(x => !x.sv || x.sv === 'liturgia').map(x => x.r.split('.')[0] + '#' + x.z) }; };
let n = 0;
for (const [s, o] of Object.entries(ref.oficial_2026)) {
  const { dd, lit } = doMotor(s);
  const oficial = new Set(o.oficial.map(([b, z]) => b + '#' + z));
  assert.ok(lit.length && lit.every(x => oficial.has(x)), `${s} (${o.os}): leituras do motor ${lit.join(' ')} fora do calendário oficial`);
  if (o.tom && dd.dow === 0) assert.equal(dd.tom, o.tom, `${s}: tom`);
  if (o.eothinon && typeof dd.eothinon === 'number') assert.equal(dd.eothinon, o.eothinon, `${s}: Evangelho matinal`);
  n++;
}
const falhas = [];
for (const [s, o] of Object.entries(ref.inverno)) {
  const { lit } = doMotor(s), esp = o.leituras.map(([b, z]) => b + '#' + z);
  if (JSON.stringify(lit) !== JSON.stringify(esp)) falhas.push(`inverno ${s}: motor ${lit.join(' ') || '—'} ≠ ${esp.join(' ')}`);
}
for (const p of ref.pendentes) {
  const { lit } = doMotor(p.data), esp = p.esperado.map(([b, z]) => b + '#' + z);
  if (JSON.stringify([...lit].sort()) !== JSON.stringify([...esp].sort())) falhas.push(`pendente ${p.data} (${p.regra}): motor ${lit.join(' ') || '—'} ≠ ${esp.join(' ') || 'sem Liturgia'}`);
}
for (const [s, e] of Object.entries(ref.eothinon_pendente)) {
  const [y, m, d] = s.split('-').map(Number), eo = dia(G(y, m, d)).eothinon;
  if (eo !== e) falhas.push(`Evangelho matinal ${s}: motor ${JSON.stringify(eo)} ≠ ${e}`);
}
if (estrito) assert.deepEqual(falhas, [], 'pendentes de conteúdo');
console.log(`referência: ${n} dias do calendário oficial 2026 OK; ${falhas.length} pendentes de conteúdo${falhas.length && !estrito ? ' (ESTRITO=1 para falhar)' : ''}`);
if (falhas.length && process.env.VERBOSO === '1') falhas.forEach(f => console.log('  ' + f));
