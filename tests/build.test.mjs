// Verificação de dist/ depois de `npm run build` (corre no CI a seguir ao build): funcionamento offline garantido (decisão 45).
// Todos os ficheiros usados pela app estão na lista do service worker, as referências do HTML existem e a versão é o hash.
import assert from 'node:assert/strict';
import fs from 'fs';

assert.ok(fs.existsSync('dist/sw.js'), 'falta dist/: correr `npm run build` antes');
const sw = fs.readFileSync('dist/sw.js', 'utf8');
assert.match(sw, /const CACHE = 'orthodox-helper-[0-9a-f]{12}'/, 'versão da cache');
const lista = JSON.parse(sw.match(/const FICHEIROS = (\[[^\]]*\]);/)[1]);
assert.equal(new Set(lista).size, lista.length, 'entradas repetidas');
const precisos = ['./'];
for (const f of fs.readdirSync('dist')) if (f !== 'sw.js' && fs.statSync(`dist/${f}`).isFile()) precisos.push('./' + f);
for (const f of fs.readdirSync('dist/fonts')) if (f.endsWith('.woff2')) precisos.push('./fonts/' + f);
assert.deepEqual([...lista].sort(), precisos.sort(), 'lista do service worker ≠ ficheiros de dist/');

// Referências do HTML (scripts, modulepreload, fontes, ícones, manifesto) e blocos importados pelos módulos
const html = fs.readFileSync('dist/index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"#:]+)"|url\(([^)]+)\)/g)].map(m => m[1] || m[2]);
for (const f of fs.readdirSync('dist')) if (f.endsWith('.js') && f !== 'sw.js') {
  for (const m of fs.readFileSync(`dist/${f}`, 'utf8').matchAll(/["'](\.\/c-[A-Z0-9]+\.js)["']/g)) refs.push(m[1]);
}
for (const r of refs) assert.ok(lista.includes('./' + r.replace(/^\.\//, '')), `referência fora da cache: ${r}`);
console.log(`build: ${lista.length} ficheiros na cache do service worker; ${refs.length} referências verificadas`);
