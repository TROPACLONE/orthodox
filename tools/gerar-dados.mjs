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
