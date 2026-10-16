// Build: empacota e minifica para dist/ (a pasta publicada). Cada língua é um bloco separado, carregado quando escolhido;
// todos os ficheiros ficam na lista do service worker para uso sem internet (decisões 23, 26, 45).
import { build, transform } from 'esbuild';
import fs from 'fs';
import crypto from 'crypto';

await import('./tools/gerar-dados.mjs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/fonts', { recursive: true });
const { metafile } = await build({
  entryPoints: ['src/app.js'], bundle: true, splitting: true, minify: true, format: 'esm', target: ['safari16', 'chrome110', 'firefox115'],
  outdir: 'dist', entryNames: '[name]', chunkNames: 'c-[hash]', legalComments: 'inline', logLevel: 'warning', metafile: true,
  charset: 'utf8',   // cirílico em UTF-8 (2 bytes) e não em \uXXXX (6 bytes): blocos uk/ru e nomes eslavos ~3× menores
  define: { __VERSAO__: JSON.stringify(pkg.version) },
});
// Caminho de arranque: app.js e os blocos que importa estaticamente → modulepreload (pedidos em paralelo)
const arranque = [], visitar = f => { if (arranque.includes(f)) return; arranque.push(f);
  for (const i of metafile.outputs[f].imports) if (i.kind === 'import-statement') visitar(i.path); };
visitar('dist/app.js');
let html = fs.readFileSync('src/index.html', 'utf8');
const css = html.match(/<style>([\s\S]*?)<\/style>/)[1];
html = html.replace(css, (await transform(css, { loader: 'css', minify: true })).code.trim()).replace(/\n\s*/g, '\n');
html = html.replace('<link rel="manifest"', arranque.map(f => `<link rel="modulepreload" href="${f.slice(5)}">`).join('\n') + '\n<link rel="manifest"');
fs.writeFileSync('dist/index.html', html);
for (const f of ['manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png']) fs.copyFileSync(`src/${f}`, `dist/${f}`);
for (const f of fs.readdirSync('src/fonts')) fs.copyFileSync(`src/fonts/${f}`, `dist/fonts/${f}`);
// Lista de ficheiros para o service worker; versão = hash do conteúdo
const lista = [];
for (const f of fs.readdirSync('dist').sort()) if (f !== 'sw.js' && fs.statSync(`dist/${f}`).isFile()) lista.push(f);
for (const f of fs.readdirSync('dist/fonts').sort()) if (f.endsWith('.woff2')) lista.push('fonts/' + f);
const hash = crypto.createHash('sha256');
for (const f of lista) hash.update(f).update(fs.readFileSync(`dist/${f}`));
const versao = hash.digest('hex').slice(0, 12);
fs.writeFileSync('dist/sw.js', fs.readFileSync('src/sw.js', 'utf8').replace('__HASH__', versao)
  .replace(/const FICHEIROS = \[[^\]]*\];/, `const FICHEIROS = ${JSON.stringify(['./', ...lista.map(f => './' + f)])};`));
const kb = n => (n / 1024).toFixed(1) + ' KB', tam = f => fs.statSync(`dist/${f}`).size;
console.log(`dist/ (versão ${versao}):`);
for (const f of [...lista, 'sw.js']) console.log('  ' + f.padEnd(44) + kb(tam(f)));
const js = lista.filter(f => f.endsWith('.js')).reduce((s, f) => s + tam(f), 0) + tam('index.html');
console.log(`  JS + HTML: ${kb(js)}; total em cache: ${kb([...lista, 'sw.js'].reduce((s, f) => s + tam(f), 0))}`);
