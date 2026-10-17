// Verificação de conteúdo (decisão 49, fase 1): o motor contra o calendário oficial do Patriarcado de Moscovo (2026)
// e contra a regra de inverno e os defeitos documentados em docs/qa/fase1-conteudo.md. Dados: tests/referencia-leituras.json.
// · oficial_2026 — tem de passar sempre (regressão).
// · inverno e pendentes — regras ainda não implementadas: o teste só informa; com ESTRITO=1 passa a falhar.
import assert from 'node:assert/strict';
import fs from 'fs';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { leituras, eothinon } from '../src/engine/leituras.js';
const festas = JSON.parse(fs.readFileSync('data/lecionario/festas.json', 'utf8'));
const ref = JSON.parse(fs.readFileSync('tests/referencia-leituras.json', 'utf8'));
const estrito = process.env.ESTRITO === '1';
const chave = x => x.r.split('.')[0] + '#' + x.z;
// Liturgia: leituras do dia, «под зачало» (ordinário de sábados especiais) e dos santos do Menaion (santos.json).
// As leituras deslocadas facultativas (facultativo: true) e as das Matinas só entram na contagem de coincidência total.
// Os fixtures «inverno» e «pendentes» só tratam do ciclo ordinário: aí os santos ficam de fora (comSantos = false).
const doMotor = (s, comSantos = true) => { const [y, m, d] = s.split('-').map(Number); const dd = dia(G(y, m, d)), l = leituras(dd);
  const juntas = l.extra.filter(e => (e.rotulo === 'ordinario' && !e.facultativo) || (comSantos && e.rotulo === 'santo')).flatMap(e => [...e.ap, ...e.ev]);
  return { dd, l, lit: [...l.ap, ...l.ev, ...juntas].filter(x => !x.sv || x.sv === 'liturgia').map(chave) }; };
// Tudo o que o motor dá para o dia (Liturgia + Matinas + deslocadas facultativas), para a contagem de coincidência total
function completo(dd, l) {
  const md = String(dd.juliano.m).padStart(2, '0') + '-' + String(dd.juliano.d).padStart(2, '0');
  const festa = l.origem === 'festa' || l.extra.some(e => e.rotulo === 'festa');
  return [...(typeof dd.eothinon === 'number' ? [eothinon(dd.eothinon)] : []), ...(festa ? festas[md]?.matinas_ev || [] : []),
    ...l.extra.flatMap(e => [...(e.matinas_ev || []), ...(e.facultativo ? [...e.ap, ...e.ev] : [])])].filter(Boolean).map(chave);
}
let n = 0, completos = 0, santos = 0;
for (const [s, o] of Object.entries(ref.oficial_2026)) {
  const { dd, l, lit } = doMotor(s);
  const oficial = new Set(o.oficial.map(([b, z]) => b + '#' + z));
  assert.ok(lit.length && lit.every(x => oficial.has(x)), `${s} (${o.os}): leituras do motor ${lit.join(' ')} fora do calendário oficial`);
  santos += l.extra.filter(e => e.rotulo === 'santo').length;
  const motor = new Set([...lit, ...completo(dd, l).filter(x => oficial.has(x))]);
  if ([...oficial].every(x => motor.has(x))) completos++;
  if (o.tom && dd.dow === 0) assert.equal(dd.tom, o.tom, `${s}: tom`);
  if (o.eothinon && typeof dd.eothinon === 'number') assert.equal(dd.eothinon, o.eothinon, `${s}: Evangelho matinal`);
  n++;
}
const falhas = [];
for (const [s, o] of Object.entries(ref.inverno)) {
  const { lit } = doMotor(s, false), esp = o.leituras.map(([b, z]) => b + '#' + z);
  if (JSON.stringify(lit) !== JSON.stringify(esp)) falhas.push(`inverno ${s}: motor ${lit.join(' ') || '—'} ≠ ${esp.join(' ')}`);
}
for (const p of ref.pendentes) {
  const { lit } = doMotor(p.data, false), esp = p.esperado.map(([b, z]) => b + '#' + z);
  if (JSON.stringify([...lit].sort()) !== JSON.stringify([...esp].sort())) falhas.push(`pendente ${p.data} (${p.regra}): motor ${lit.join(' ') || '—'} ≠ ${esp.join(' ') || 'sem Liturgia'}`);
}
for (const [s, e] of Object.entries(ref.eothinon_pendente)) {
  const [y, m, d] = s.split('-').map(Number), eo = dia(G(y, m, d)).eothinon;
  if (eo !== e) falhas.push(`Evangelho matinal ${s}: motor ${JSON.stringify(eo)} ≠ ${e}`);
}
if (estrito) assert.deepEqual(falhas, [], 'pendentes de conteúdo');
// Coincidência total (todas as referências do dia no calendário oficial): 79/227 antes das leituras dos santos (fase 3, S3)
const MIN_COMPLETOS = 150;
if (estrito) assert.ok(completos >= MIN_COMPLETOS, `coincidência total: ${completos} < ${MIN_COMPLETOS}`);
console.log(`referência: ${n} dias do calendário oficial 2026 OK (${santos} leituras de santos; ${completos} dias coincidem totalmente); ${falhas.length} pendentes de conteúdo${falhas.length && !estrito ? ' (ESTRITO=1 para falhar)' : ''}`);
if (falhas.length && process.env.VERBOSO === '1') falhas.forEach(f => console.log('  ' + f));
