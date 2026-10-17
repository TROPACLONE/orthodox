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

// Orações: o eslavo uma só vez por oração ({id}-cu.json, partilhado pelas 4 línguas) e um ficheiro por língua só com a
// tradução ({id}-xx.json); mais um índice (só os ids: vai no núcleo, e os títulos da lista vêm do i18n). No build, estes
// ficheiros vão para dist/d/ com o hash do conteúdo no nome e a app pede-os com fetch() (não são módulos).
const dirO = `${dir}/oracoes`;
fs.rmSync(dirO, { recursive: true, force: true });
fs.mkdirSync(dirO, { recursive: true });
const indice = [];
// Grupos (Saltério, acatistos, defuntos): ids «grupo-membro»; a lista de cada grupo, com os títulos na língua, vai num
// ficheiro pequeno por língua, carregado só quando se abre um grupo. Ordem: campo «ordem» do ficheiro, senão o nome.
const grupos = Object.fromEntries(['pt', 'ru', 'uk', 'en'].map(l => [l, {}]));
if (fs.existsSync('data/oracoes')) for (const f of fs.readdirSync('data/oracoes').sort()) {
  if (!f.endsWith('.json') || f.startsWith('_')) continue;   // _parte-*.json: partes ainda por juntar
  const o = JSON.parse(fs.readFileSync(`data/oracoes/${f}`, 'utf8'));
  indice.push(o.id);
  const g = o.id.includes('-') && o.id.split('-')[0];
  if (g) for (const l of ['pt', 'ru', 'uk', 'en']) (grupos[l][g] ||= []).push({ id: o.id, titulo: o.titulo[l], ordem: o.ordem ?? Infinity });
  // Eslavo: alinhado pela posição com os blocos do ficheiro de língua ('' nas rubricas).
  fs.writeFileSync(`${dirO}/${o.id}-cu.json`, JSON.stringify({ titulo: o.titulo.cu, cu: o.blocos.map(b => b.cu || '') }));
  for (const l of ['pt', 'ru', 'uk', 'en']) {
    // Só os campos que a app usa: «tipo» só para rubricas e títulos (oração e verso mostram-se da mesma maneira).
    const blocos = o.blocos.map(b => {
      const x = { id: b.id };
      if (b.tipo === 'rubrica' || b.tipo === 'titulo') x.tipo = b.tipo;
      x.t = b[l] || '';
      if (b.repetir) x.repetir = b.repetir;
      if (b.sl) { if (b.v) x.v = b.v; if (b.sobrescrito) x.sob = 1; }   // versículo, sobrescrito (Saltério, dec. 69)
      if (b.quando) x.quando = b.quando;
      return x;
    });
    fs.writeFileSync(`${dirO}/${o.id}-${l}.json`, JSON.stringify({ titulo: o.titulo[l], estado: o.estado[l], blocos }));
  }
}
fs.writeFileSync(`${dirO}/indice.json`, JSON.stringify(indice));
for (const [l, gs] of Object.entries(grupos)) {
  for (const m of Object.values(gs)) { m.sort((a, b) => a.ordem - b.ordem); for (const x of m) delete x.ordem; }   // sort estável
  fs.writeFileSync(`${dirO}/grupos-${l}.json`, JSON.stringify(gs));
}
