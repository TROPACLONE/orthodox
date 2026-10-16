// Testes do motor de calendário: conversões, Pascália, ciclo móvel, tons, Evangelhos matinais, semimóveis.
// Valores de referência: doc. 01 (azbyka.ru, orthocal.info, calendário oficial 2026) — ver comentários.
import assert from 'node:assert/strict';
import * as D from '../src/engine/datas.js';
import * as C from '../src/engine/calendario.js';

let n = 0;
const t = (nome, f) => { f(); n++; };
const G = (y, m, d) => D.jdnGregoriano(y, m, d);
const ns = j => { const g = D.gregoriano(j); return `${g.d}.${g.m}.${g.y}`; };

t('JDN: ida e volta em 600 anos', () => {
  for (let j = G(1700, 1, 1); j < G(2300, 1, 1); j += 37) {
    const g = D.gregoriano(j), u = D.juliano(j);
    assert.equal(D.jdnGregoriano(g.y, g.m, g.d), j); assert.equal(D.jdnJuliano(u.y, u.m, u.d), j);
  }
});
t('Desfasamento juliano↔gregoriano (doc. 01 §1.1)', () => {
  assert.equal(ns(D.jdnJuliano(2025, 12, 25)), '7.1.2026');
  assert.equal(ns(D.jdnJuliano(2099, 12, 25)), '7.1.2100');
  assert.equal(ns(D.jdnJuliano(2100, 12, 25)), '8.1.2101');
  assert.equal(ns(D.jdnJuliano(1900, 2, 29)), '13.3.1900');
  assert.equal(D.diaSemana(G(2026, 10, 16)), 5);   // sexta-feira
});
t('Pascália 2024–2035 (doc. 01 §2.3)', () => {
  const ref = { 2024: '5.5.2024', 2025: '20.4.2025', 2026: '12.4.2026', 2027: '2.5.2027', 2028: '16.4.2028', 2029: '8.4.2029',
    2030: '28.4.2030', 2031: '13.4.2031', 2032: '2.5.2032', 2033: '24.4.2033', 2034: '9.4.2034', 2035: '29.4.2035' };
  for (const [y, v] of Object.entries(ref)) assert.equal(ns(D.pascoa(+y)), v, y);
});
t('Pascália: 532 anos sempre ao domingo, entre 22.03 e 25.04 OS', () => {
  for (let y = 1941; y < 1941 + 532; y++) {
    const p = D.pascoa(y), u = D.juliano(p);
    assert.equal(D.diaSemana(p), 0);
    assert.ok((u.m === 3 && u.d >= 22) || (u.m === 4 && u.d <= 25), String(y));
  }
  assert.equal(D.pascoa(1941 + 532), D.jdnJuliano(1941 + 532, D.juliano(D.pascoa(1941)).m, D.juliano(D.pascoa(1941)).d));
});
t('16.10.2026: 20.ª semana depois do Pentecostes, tom 2 (azbyka)', () => {
  const d = C.dia(G(2026, 10, 16));
  assert.deepEqual(d.semana, { tipo: 'pentecostes', n: 20 }); assert.equal(d.tom, 2);
  assert.equal(`${d.juliano.d}.${d.juliano.m}`, '3.10');
});
t('18.10.2026: domingo 20, tom 3, Evangelho matinal 9 (azbyka, orthocal)', () => {
  const d = C.dia(G(2026, 10, 18));
  assert.equal(d.semana.n, 20); assert.ok(d.semana.domingo); assert.equal(d.tom, 3); assert.equal(d.eothinon, 9);
});
t('Evangelhos matinais: 01.03.2026 → 5; 07.06.2026 (Todos os Santos) → 1', () => {
  assert.equal(C.dia(G(2026, 3, 1)).eothinon, 5);
  const ts = C.dia(G(2026, 6, 7)); assert.equal(ts.eothinon, 1); assert.equal(ts.tom, 8); assert.deepEqual(ts.moveis, ['dom_todos_santos']);
});
t('Ciclo móvel 2026', () => {
  assert.deepEqual(C.dia(G(2026, 4, 12)).moveis, ['pascoa']);
  assert.deepEqual(C.dia(G(2026, 4, 5)).moveis, ['ramos']);
  assert.deepEqual(C.dia(G(2026, 5, 21)).moveis, ['ascensao']);
  assert.deepEqual(C.dia(G(2026, 5, 31)).moveis, ['pentecostes']);
  assert.deepEqual(C.dia(G(2026, 2, 23)).moveis, ['segunda_limpa']);
  assert.deepEqual(C.dia(G(2026, 4, 21)).moveis, ['radonitsa']);
  assert.equal(C.dia(G(2026, 4, 5)).festa.id, 'ramos');
});
t('Semimóveis (doc. 01 §3.2, notas 2–4)', () => {
  const tem = (j, id) => assert.ok(C.dia(j).semimoveis.includes(id), `${id} em ${ns(j)}`);
  tem(G(2026, 11, 7), 'sab_demetrio'); tem(G(2025, 11, 1), 'sab_demetrio'); tem(G(2014, 11, 1), 'sab_demetrio');
  tem(G(2022, 7, 31), 'dom_padres_seis_concilios'); tem(G(2023, 7, 30), 'dom_padres_seis_concilios');
  tem(G(2024, 7, 28), 'dom_padres_seis_concilios'); tem(G(2025, 7, 27), 'dom_padres_seis_concilios');
});
t('Festas fixas e pós-festa', () => {
  assert.equal(C.dia(G(2026, 10, 14)).festa.id, 'protecao');
  assert.equal(C.dia(G(2027, 1, 7)).festa.id, 'natal');
  assert.deepEqual(C.dia(G(2027, 1, 13)).prefesta, { id: 'natal', fase: 'despedida' });
  assert.deepEqual(C.dia(G(2026, 9, 26)).prefesta, { id: 'exaltacao', fase: 'prefesta' });
  assert.deepEqual(C.dia(G(2026, 5, 20)).prefesta, { id: 'pascoa', fase: 'despedida' });
});
t('Transfiguração ao domingo: Evangelho matinal omitido', () => {
  // 06.08 OS cai ao domingo em 2029 (19.08.2029 NS)
  const d = C.dia(G(2029, 8, 19)); assert.equal(d.dow, 0); assert.equal(d.festa.id, 'transfiguracao'); assert.ok(d.eothinon.omitido);
});
console.log(`calendário: ${n} testes OK`);
