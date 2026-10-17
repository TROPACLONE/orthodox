// Build: empacota e minifica para dist/ (a pasta publicada). Cada língua é um bloco separado, carregado quando escolhido;
// o service worker pré-guarda o núcleo e a app guarda os blocos da língua escolhida (decisões 23, 26, 45).
import { build, transform } from 'esbuild';
import fs from 'fs';
import crypto from 'crypto';

await import('./tools/gerar-dados.mjs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/fonts', { recursive: true });
// Dados das orações: ficheiros estáticos em dist/d/, com o hash do conteúdo no nome (uma versão nova só muda o nome dos
// que mudaram; o service worker guarda-os pelo nome). A app pede-os com fetch(): um pedido falhado sem rede repete-se
// no toque seguinte, ao contrário de um import() falhado, que o browser guarda até fechar a app; e o texto fechado
// liberta-se da memória. O núcleo leva só o mapa id → hashes (__DADOS__): 8 carateres hex por ficheiro, na ordem de
// DADOS_LINGUAS (grupos: sem eslavo, «-» no lugar do hash).
const DADOS_LINGUAS = ['cu', 'pt', 'uk', 'ru', 'en'];
const dirO = 'src/dados/gerado/oracoes', dados = {}, ficheirosDados = [];
fs.mkdirSync('dist/d');
for (const f of fs.readdirSync(dirO).sort()) {
  const m = f.match(/^(.+)-(cu|pt|uk|ru|en)\.json$/);
  if (!m) continue;                                              // indice.json: vai no núcleo (import estático)
  const conteudo = fs.readFileSync(`${dirO}/${f}`), h = crypto.createHash('sha256').update(conteudo).digest('hex').slice(0, 8);
  const nome = `d/${m[1]}-${m[2]}.${h}.json`;
  fs.writeFileSync(`dist/${nome}`, conteudo);
  (dados[m[1]] ||= DADOS_LINGUAS.map(() => '-'.repeat(8)))[DADOS_LINGUAS.indexOf(m[2])] = h;
  ficheirosDados.push({ nome, lingua: m[2] });
}
const { metafile } = await build({
  entryPoints: ['src/app.js'], bundle: true, splitting: true, minify: true, format: 'esm', target: ['safari16', 'chrome110', 'firefox115'],
  outdir: 'dist', entryNames: '[name]', chunkNames: 'c-[hash]', legalComments: 'inline', logLevel: 'warning', metafile: true,
  charset: 'utf8',   // cirílico em UTF-8 (2 bytes) e não em \uXXXX (6 bytes): blocos uk/ru e nomes eslavos ~3× menores
  define: { __VERSAO__: JSON.stringify(pkg.version), __DADOS__: JSON.stringify(Object.fromEntries(Object.entries(dados).map(([k, v]) => [k, v.join('')]))) },
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
// Blocos próprios de cada língua (decisão 45): só a língua escolhida fica garantida offline; o service worker pré-guarda
// o núcleo, e a app pede os ficheiros da língua ativa (dist/idiomas.json) logo que a escolhe. O eslavo das orações
// (d/*-cu.*.json) pertence às 4 línguas.
const LINGUAS = ['pt', 'uk', 'ru', 'en'];
const linguasDe = entrada => {
  const m = entrada.match(/src\/i18n\/(pt|uk|ru|en)\.js$/);
  if (m) return [m[1]];
  return null;
};
const idiomas = Object.fromEntries(LINGUAS.map(l => [l, []]));
const porLingua = new Set();
for (const [saida, info] of Object.entries(metafile.outputs)) {
  if (!saida.endsWith('.js')) continue;
  const ls = Object.keys(info.inputs).map(linguasDe);
  if (!ls.length || ls.some(x => !x)) continue;                 // bloco com código comum: núcleo
  const f = saida.slice(5);
  for (const l of new Set(ls.flat())) idiomas[l].push(f);
  porLingua.add(f);
}
for (const { nome, lingua } of ficheirosDados) {
  for (const l of lingua === 'cu' ? LINGUAS : [lingua]) idiomas[l].push(nome);
  porLingua.add(nome);
}
fs.writeFileSync('dist/idiomas.json', JSON.stringify(idiomas));
// Lista do núcleo para o service worker; versão = hash do conteúdo de tudo
const lista = [], todos = [];
for (const f of fs.readdirSync('dist').sort()) if (f !== 'sw.js' && fs.statSync(`dist/${f}`).isFile()) { todos.push(f); if (!porLingua.has(f)) lista.push(f); }
for (const f of fs.readdirSync('dist/fonts').sort()) if (f.endsWith('.woff2')) { lista.push('fonts/' + f); todos.push('fonts/' + f); }
todos.push(...ficheirosDados.map(x => x.nome));
const hash = crypto.createHash('sha256');
for (const f of todos) hash.update(f).update(fs.readFileSync(`dist/${f}`));
const versao = hash.digest('hex').slice(0, 12);
fs.writeFileSync('dist/sw.js', fs.readFileSync('src/sw.js', 'utf8').replace('__HASH__', versao)
  .replace(/const FICHEIROS = \[[^\]]*\];/, `const FICHEIROS = ${JSON.stringify(['./', ...lista.map(f => './' + f)])};`));
const kb = n => (n / 1024).toFixed(1) + ' KB', tam = f => fs.statSync(`dist/${f}`).size;
console.log(`dist/ (versão ${versao}):`);
for (const f of [...lista, 'sw.js']) console.log('  ' + f.padEnd(44) + kb(tam(f)));
const soma = l => l.reduce((s, f) => s + tam(f), 0);
const js = soma(lista.filter(f => f.endsWith('.js'))) + tam('index.html');
console.log(`  núcleo — JS + HTML: ${kb(js)}; pré-cache: ${kb(soma([...lista, 'sw.js']))}`);
for (const l of LINGUAS) console.log(`  língua ${l}: ${idiomas[l].length} ficheiros, ${kb(soma(idiomas[l]))}`);
