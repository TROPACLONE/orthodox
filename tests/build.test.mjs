// Verificação de dist/ depois de `npm run build` (corre no CI a seguir ao build): funcionamento offline garantido (decisão 45).
// Todos os ficheiros usados pela app estão na lista do service worker, as referências do HTML existem e a versão é o hash.
import assert from 'node:assert/strict';
import fs from 'fs';
import crypto from 'crypto';

assert.ok(fs.existsSync('dist/sw.js'), 'falta dist/: correr `npm run build` antes');
const sw = fs.readFileSync('dist/sw.js', 'utf8');
assert.match(sw, /const CACHE = 'orthodox-helper-[0-9a-f]{12}'/, 'versão da cache');
const lista = JSON.parse(sw.match(/const FICHEIROS = (\[[^\]]*\]);/)[1]);
assert.equal(new Set(lista).size, lista.length, 'entradas repetidas');
// Núcleo pré-guardado + blocos de cada língua (dist/idiomas.json) = todos os ficheiros de dist/ (decisão 45)
const idiomas = JSON.parse(fs.readFileSync('dist/idiomas.json', 'utf8'));
const porLingua = new Set(Object.values(idiomas).flat().map(f => './' + f));
for (const f of porLingua) assert.ok(!lista.includes(f), `bloco de língua no núcleo: ${f}`);
for (const l of ['pt', 'uk', 'ru', 'en']) assert.ok(idiomas[l].length > 0, `sem blocos para ${l}`);
const precisos = ['./'];
for (const f of fs.readdirSync('dist')) if (f !== 'sw.js' && fs.statSync(`dist/${f}`).isFile()) precisos.push('./' + f);
for (const f of fs.readdirSync('dist/fonts')) if (f.endsWith('.woff2')) precisos.push('./fonts/' + f);
for (const f of fs.readdirSync('dist/d')) precisos.push('./d/' + f);
assert.deepEqual([...lista, ...porLingua].sort(), precisos.sort(), 'núcleo + línguas ≠ ficheiros de dist/');

// Referências do HTML (scripts, modulepreload, fontes, ícones, manifesto) e blocos importados pelos módulos
const html = fs.readFileSync('dist/index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"|url\(([^)]+)\)/g)].map(m => m[1] || m[2]);
for (const f of fs.readdirSync('dist')) if (f.endsWith('.js') && f !== 'sw.js') {
  for (const m of fs.readFileSync(`dist/${f}`, 'utf8').matchAll(/["'](\.\/c-[A-Z0-9]+\.js)["']/g)) refs.push(m[1]);
}
for (const r of refs) { const f = './' + r.replace(/^\.\//, ''); assert.ok(lista.includes(f) || porLingua.has(f), `referência fora da cache: ${r}`); }

// Dados das orações (dist/d/, pedidos com fetch): cada oração do índice tem o eslavo e as 4 línguas; o nome tem o hash do
// conteúdo; o eslavo vai na pré-carga das 4 línguas e cada tradução só na da sua; os grupos têm a lista nas 4 línguas.
const dirO = 'src/dados/gerado/oracoes';
const indice = JSON.parse(fs.readFileSync(`${dirO}/indice.json`, 'utf8'));
const emD = new Map(fs.readdirSync('dist/d').map(f => [f.replace(/\.[0-9a-f]{8}\.json$/, ''), 'd/' + f]));
const hash = f => crypto.createHash('sha256').update(fs.readFileSync('dist/' + f)).digest('hex').slice(0, 8);
const verificar = (nome, linguas) => {
  const f = emD.get(nome);
  assert.ok(f, `falta em dist/d: ${nome}`);
  assert.equal(f.slice(-13, -5), hash(f), `hash do nome ≠ conteúdo: ${f}`);
  assert.equal(fs.readFileSync('dist/' + f, 'utf8'), fs.readFileSync(`${dirO}/${nome}.json`, 'utf8'), `conteúdo de ${f}`);
  for (const l of ['pt', 'uk', 'ru', 'en']) assert.equal(idiomas[l].includes(f), linguas.includes(l), `${f} na pré-carga de ${l}`);
};
for (const id of indice) {
  verificar(`${id}-cu`, ['pt', 'uk', 'ru', 'en']);
  for (const l of ['pt', 'uk', 'ru', 'en']) verificar(`${id}-${l}`, [l]);
  const n = JSON.parse(fs.readFileSync(`${dirO}/${id}-cu.json`, 'utf8')).cu.length;
  for (const l of ['pt', 'uk', 'ru', 'en']) assert.equal(JSON.parse(fs.readFileSync(`${dirO}/${id}-${l}.json`, 'utf8')).blocos.length, n, `${id}-${l}: blocos ≠ eslavo`);
}
for (const l of ['pt', 'uk', 'ru', 'en']) verificar(`grupos-${l}`, [l]);
assert.equal(emD.size, indice.length * 5 + 4, 'ficheiros a mais em dist/d');
// O mapa dos hashes, no núcleo (__DADOS__), aponta para estes ficheiros.
const nucleoJs = lista.filter(f => f.endsWith('.js') && f !== './sw.js').map(f => fs.readFileSync('dist/' + f.slice(2), 'utf8')).join('\n');
for (const [nome, f] of emD) assert.ok(nucleoJs.includes(f.slice(-13, -5)), `hash de ${nome} fora do núcleo`);
// Nenhum texto próprio de uma língua no núcleo (p. ex. um import estático de src/i18n/xx.js ou de uma oração colava a
// língua ao app.js e o teste acima não o veria): procura-se, nos .js do núcleo, a frase mais longa de cada fonte.
const frases = o => { const r = []; JSON.stringify(o, (k, v) => { if (typeof v === 'string' && !/["\\\n]/.test(v)) r.push(v); return v; }); return r; };
const maisLonga = l => l.reduce((a, b) => (b.length > a.length ? b : a), '');
// O eslavo das orações também não pode estar no núcleo.
for (const f of fs.readdirSync(dirO)) if (f.endsWith('-cu.json')) {
  const x = maisLonga(JSON.parse(fs.readFileSync(`${dirO}/${f}`, 'utf8')).cu);
  assert.ok(x.length > 20 && !nucleoJs.includes(x), `eslavo de ${f} no núcleo: «${x.slice(0, 40)}…»`);
}
for (const l of ['pt', 'uk', 'ru', 'en']) {
  const fontes = { [`i18n/${l}`]: (await import(`../src/i18n/${l}.js`)).default };
  for (const f of fs.readdirSync(dirO)) if (f.endsWith(`-${l}.json`)) {
    const o = JSON.parse(fs.readFileSync(`${dirO}/${f}`, 'utf8'));
    fontes[f] = o.blocos ? o.blocos.map(b => b.t) : o;   // grupos-xx.json: só títulos (podem ser curtos ou nenhum)
  }
  for (const [nome, o] of Object.entries(fontes)) {
    const x = maisLonga(frases(o));
    if (nome.startsWith('grupos-') && x.length <= 20) continue;
    assert.ok(x.length > 20 && !nucleoJs.includes(x), `texto de ${nome} no núcleo: «${x.slice(0, 40)}…»`);
  }
}
console.log(`build: ${lista.length} ficheiros na cache do service worker; ${refs.length} referências verificadas`);
