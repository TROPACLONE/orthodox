// Funcionamento sem internet: guarda só os ficheiros da própria app (nunca dados pessoais). Pré-guarda o núcleo; os blocos
// de cada língua guardam-se quando a app os pede (decisão 45). Cache primeiro; uma versão nova
// (novo hash, definido no build) assume no arranque seguinte. A cache anterior mantém-se até à seguinte, para que uma página
// ainda com o código antigo consiga carregar os seus blocos (c-….js, com nome pelo conteúdo).
const CACHE = 'orthodox-helper-__HASH__';
const FICHEIROS = ['./', './index.html', './app.js'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE)
  .then(c => c.addAll(FICHEIROS.map(f => new Request(f, { cache: 'reload' })))).then(() => self.skipWaiting())));
// Os blocos de língua já guardados que a versão nova continua a usar (mesmo nome = mesmo conteúdo, idiomas.json) passam
// para a cache nova antes de se apagarem as antigas: sem isto, a língua escolhida deixava de estar offline à 2.ª atualização.
self.addEventListener('activate', e => e.waitUntil((async () => {
  const atual = await caches.open(CACHE);
  const antigas = (await caches.keys()).filter(k => k.startsWith('orthodox-helper-') && k !== CACHE);
  const idiomas = await atual.match('idiomas.json');
  const usados = new Set(idiomas ? Object.values(await idiomas.json()).flat() : []);
  for (const k of antigas.reverse()) {                 // da mais recente para a mais antiga
    const c = await caches.open(k);
    for (const pedido of await c.keys()) {
      if (!usados.has(new URL(pedido.url).pathname.split('/').pop()) || await atual.match(pedido)) continue;
      const r = await c.match(pedido);
      if (r) await atual.put(pedido, r);
    }
  }
  await Promise.all(antigas.slice(1).map(k => caches.delete(k)));   // fica só a anterior (páginas ainda abertas)
  await self.clients.claim();
})()));
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const bloco = /\/c-[A-Z0-9]+\.js$/.test(url.pathname);
  e.respondWith(caches.open(CACHE).then(c => c.match(e.request, { ignoreSearch: true }))
    .then(r => r || (bloco ? caches.match(e.request, { ignoreSearch: true }) : null))
    .then(r => r || fetch(e.request).then(res => {
      // Blocos de língua e outros ficheiros da app pedidos depois da instalação: guardam-se na cache desta versão.
      if (res.ok && res.type === 'basic') { const copia = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); }
      return res;
    })));
});
