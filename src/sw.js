// Funcionamento sem internet: guarda só os ficheiros da própria app (nunca dados pessoais). Cache primeiro; uma versão nova
// (novo hash, definido no build) assume no arranque seguinte. A cache anterior mantém-se até à seguinte, para que uma página
// ainda com o código antigo consiga carregar os seus blocos (c-….js, com nome pelo conteúdo).
const CACHE = 'orthodox-helper-__HASH__';
const FICHEIROS = ['./', './index.html', './app.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE)
  .then(c => c.addAll(FICHEIROS.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys().then(chaves => {
  const antigas = chaves.filter(k => k.startsWith('orthodox-helper-') && k !== CACHE);
  return Promise.all(antigas.slice(0, -1).map(k => caches.delete(k)));
}).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const bloco = /\/c-[A-Z0-9]+\.js$/.test(url.pathname);
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request, { ignoreSearch: true }))
    .then(r => r || (bloco ? caches.match(e.request, { ignoreSearch: true }) : null))
    .then(r => r || fetch(e.request)));
});
