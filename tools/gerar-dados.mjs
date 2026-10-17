// Gera os módulos de dados usados pela app a partir das fontes em data/ (corre antes dos testes e do build).
// Graus: núcleo compacto (o motor do jejum precisa dele sempre). Nomes: um ficheiro por língua, carregado só quando usado.
import fs from 'fs';
const dir = 'src/dados/gerado';
fs.mkdirSync(dir, { recursive: true });
const G = { grande: 'G', vigilia: 'V', polieleo: 'P', doxologia: 'D' };
const fonte = fs.existsSync('data/menaion/graus.json') ? JSON.parse(fs.readFileSync('data/menaion/graus.json', 'utf8')) : {};
const graus = {}, nomes = { pt: {}, cu: {} };
for (const [md, l] of Object.entries(fonte)) {
  graus[md] = l.map(c => (G[c.grau_typikon] || '-') + (G['grau_atual' in c ? c.grau_atual : c.grau_typikon] || '-')).join(',');
  nomes.pt[md] = l.map(c => c.pt || c.cu || ''); nomes.cu[md] = l.map(c => c.cu || c.pt || '');
}
fs.writeFileSync(`${dir}/graus.json`, JSON.stringify(graus));
for (const [l, n] of Object.entries(nomes)) fs.writeFileSync(`${dir}/nomes-${l}.json`, JSON.stringify(n));

// Orações: um ficheiro por oração e por língua (eslavo + a língua escolhida), mais um índice (só os ids: vai no núcleo,
// e os títulos da lista vêm do i18n).
const dirO = `${dir}/oracoes`;
fs.rmSync(dirO, { recursive: true, force: true });
fs.mkdirSync(dirO, { recursive: true });
const indice = [];
if (fs.existsSync('data/oracoes')) for (const f of fs.readdirSync('data/oracoes').sort()) {
  if (!f.endsWith('.json') || f.startsWith('_')) continue;   // _parte-*.json: partes ainda por juntar
  const o = JSON.parse(fs.readFileSync(`data/oracoes/${f}`, 'utf8'));
  indice.push(o.id);
  for (const l of ['pt', 'ru', 'uk', 'en']) {
    const blocos = o.blocos.map(b => {
      const x = { id: b.id, tipo: b.tipo, cu: b.cu || '', t: b[l] || '' };
      if (b.repetir) x.repetir = b.repetir;
      if (b.quando) x.quando = b.quando;
      return x;
    });
    fs.writeFileSync(`${dirO}/${o.id}-${l}.json`, JSON.stringify({ titulo: o.titulo[l], tituloCu: o.titulo.cu, estado: o.estado[l], blocos }));
  }
}
fs.writeFileSync(`${dirO}/indice.json`, JSON.stringify(indice));
