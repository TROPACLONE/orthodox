// Testes do motor do jejum (doc. 02). Cada caso indica a regra de onde vem o valor esperado.
import assert from 'node:assert/strict';
import { jdnGregoriano as G } from '../src/engine/datas.js';
import { dia } from '../src/engine/calendario.js';
import { jejum, N } from '../src/engine/jejum.js';

let n = 0;
const caso = (y, m, d, par, typ, nome, graus) => {
  const j = jejum(dia(G(y, m, d)), graus);
  assert.equal(j.paroquial.nivel, par, `${nome} (${d}.${m}.${y}) — paroquial`);
  if (typ !== undefined) assert.equal(j.typikon.nivel, typ, `${nome} (${d}.${m}.${y}) — Typikon`);
  n++; return j;
};
// Grande Quaresma 2026 (Páscoa 12.04)
caso(2026, 2, 23, N.SEM_COMIDA, N.SEM_COMIDA, 'Segunda-feira Limpa §3.1.3');
caso(2026, 2, 24, N.SEM_COMIDA, N.SEM_COMIDA, '1.ª terça §3.1.3 (azbyka)');
caso(2026, 2, 25, N.XEROFAGIA, N.XEROFAGIA, '1.ª quarta §3.1.3');
caso(2026, 3, 3, N.QUENTE_SEM_AZEITE, N.XEROFAGIA, 'terça da 2.ª semana §3.1.2');
caso(2026, 3, 7, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'sábado da Quaresma §3.1.2');
caso(2026, 3, 4, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'santo de polieleo em dia útil §3.1.2', { typikon: 'polieleo', atual: 'polieleo' });
caso(2026, 3, 22, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, '40 Mártires (09.03 OS, domingo) §3.1.4');
caso(2026, 4, 4, N.OVAS, N.OVAS, 'Sábado de Lázaro §3.1.4');
caso(2026, 4, 5, N.PEIXE, N.PEIXE, 'Domingo de Ramos §3.1.4');
caso(2026, 4, 7, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'Anunciação na Terça Santa §3.1.5');
caso(2026, 4, 10, N.SEM_COMIDA, N.SEM_COMIDA, 'Sexta-feira Santa §3.1.5');
// Páscoa e semanas contínuas
caso(2026, 4, 15, N.TUDO, N.TUDO, 'Semana Luminosa §4');
caso(2026, 2, 4, N.TUDO, N.TUDO, 'quarta da semana do Publicano §4');
caso(2026, 2, 18, N.LACTICINIOS, N.LACTICINIOS, 'quarta da semana do queijo §4');
caso(2026, 6, 3, N.TUDO, N.TUDO, 'quarta da semana da Trindade §4');
caso(2027, 1, 13, N.TUDO, N.TUDO, 'quarta dos Santos dias §4');
// Pentecostário (§2.2)
caso(2026, 5, 6, N.PEIXE, N.PEIXE, 'quarta do Meio-Pentecostes');
caso(2026, 5, 8, N.PEIXE, N.QUENTE_COM_AZEITE, 'sexta do Pentecostário');
// Jejum dos Apóstolos 2026: 08.06–11.07 NS
assert.equal(jejum(dia(G(2026, 6, 7))).jejum, false);
assert.equal(jejum(dia(G(2026, 6, 8))).tempo, 'apostolos');
assert.equal(jejum(dia(G(2026, 7, 11))).tempo, 'apostolos');
assert.equal(jejum(dia(G(2026, 7, 12))).jejum, false);   // Pedro e Paulo (domingo)
caso(2026, 6, 10, N.XEROFAGIA, N.XEROFAGIA, 'quarta, Apóstolos §3.2.2');
caso(2026, 6, 9, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'terça, Apóstolos §3.2.2 (azbyka)');
caso(2026, 6, 13, N.PEIXE, N.PEIXE, 'sábado, Apóstolos §3.2.2');
caso(2026, 7, 7, N.PEIXE, N.PEIXE, 'Natividade do Precursor §3.2.2');
// Dormição
caso(2026, 8, 19, N.PEIXE, N.PEIXE, 'Transfiguração §3.3');
caso(2026, 8, 17, N.XEROFAGIA, N.XEROFAGIA, 'segunda, Dormição §3.3');
caso(2026, 8, 22, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'sábado, Dormição §3.3');
// Jejuns de um dia e quartas/sextas
caso(2026, 9, 11, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'Degolação §5');
caso(2026, 9, 27, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'Exaltação (domingo) §5');
caso(2027, 1, 18, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'Véspera da Teofania §5');
caso(2026, 10, 14, N.PEIXE, N.XEROFAGIA, 'Proteção numa quarta §2.4');
caso(2026, 10, 16, N.QUENTE_SEM_AZEITE, N.XEROFAGIA, 'sexta comum §2.2');
caso(2026, 10, 16, N.QUENTE_COM_AZEITE, N.XEROFAGIA, 'sexta com santo de polieleo §2.4', { atual: 'polieleo' });
caso(2026, 10, 15, N.TUDO, N.TUDO, 'quinta comum');
// Natividade 2026–27 (15.11–24.12 OS = 28.11.2026–06.01.2027)
assert.equal(jejum(dia(G(2026, 11, 27))).tempo, 'quarta_sexta');   // 14.11 OS, sexta: véspera do jejum, mas dia de jejum comum
assert.equal(jejum(dia(G(2026, 11, 28))).tempo, 'natal');
caso(2026, 12, 4, N.PEIXE, N.PEIXE, 'Apresentação no Templo (sexta) §3.4.1');
caso(2026, 12, 1, N.PEIXE, N.QUENTE_COM_AZEITE, 'terça, 1.ª fase §3.4.2');
caso(2026, 12, 29, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'terça 16.12 OS, 2.ª fase §3.4.2');
caso(2026, 12, 22, N.QUENTE_COM_AZEITE, N.PEIXE, 'terça 09.12 OS (Conceição de Sant\'Ana): peixe no Typikon §3.4.1');
const s20 = caso(2027, 1, 2, N.QUENTE_COM_AZEITE, N.PEIXE, 'sábado 20.12 OS: paroquial sem peixe; Typikon ainda com peixe (proibição desde 21.12) §3.4.1–2');
assert.ok(s20.typikon.notas.includes('n_natal_20_21'));
caso(2027, 1, 3, N.QUENTE_COM_AZEITE, N.QUENTE_COM_AZEITE, 'domingo 21.12 OS, sem peixe no Typikon §3.4.1');
console.log(`jejum: ${n} casos OK`);
