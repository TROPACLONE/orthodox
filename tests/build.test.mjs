// Verificação de dist/ depois de `npm run build` (corre no CI a seguir ao build): funcionamento offline garantido (decisão 45).
// Todos os ficheiros usados pela app estão na lista do service worker, as referências do HTML existem e a versão é o hash.
import assert from 'node:assert/strict';
import fs from 'fs';

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
assert.deepEqual([...lista, ...porLingua].sort(), precisos.sort(), 'núcleo + línguas ≠ ficheiros de dist/');

// Referências do HTML (scripts, modulepreload, fontes, ícones, manifesto) e blocos importados pelos módulos
const html = fs.readFileSync('dist/index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"|url\(([^)]+)\)/g)].map(m => m[1] || m[2]);
for (const f of fs.readdirSync('dist')) if (f.endsWith('.js') && f !== 'sw.js') {
  for (const m of fs.readFileSync(`dist/${f}`, 'utf8').matchAll(/["'](\.\/c-[A-Z0-9]+\.js)["']/g)) refs.push(m[1]);
}
for (const r of refs) { const f = './' + r.replace(/^\.\//, ''); assert.ok(lista.includes(f) || porLingua.has(f), `referência fora da cache: ${r}`); }
console.log(`build: ${lista.length} ficheiros na cache do service worker; ${refs.length} referências verificadas`);
