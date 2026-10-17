// Gera os módulos de dados usados pela app a partir das fontes em data/ (corre antes dos testes e do build).
// Graus: núcleo compacto (o motor do jejum precisa dele sempre). Nomes: um ficheiro por língua, carregado só quando usado.
import fs from 'fs';
const dir = 'src/dados/gerado';
fs.mkdirSync(dir, { recursive: true });
const G = { grande: 'G', vigilia: 'V', polieleo: 'P', doxologia: 'D' };
const fonte = fs.existsSync('data/menaion/graus.json') ? JSON.parse(fs.readFileSync('data/menaion/graus.json', 'utf8')) : {};
const graus = {};
for (const [md, l] of Object.entries(fonte)) {
  graus[md] = l.map(c => (G[c.grau_typikon] || '-') + (G['grau_atual' in c ? c.grau_atual : c.grau_typikon] || '-')).join(',');
}
fs.writeFileSync(`${dir}/graus.json`, JSON.stringify(graus));

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
// Leituras próprias dos santos para o motor (núcleo): só os campos usados (sem fonte, conferência, notas, nome eslavo).
if (fs.existsSync('data/lecionario/santos.json')) {
  const lec = JSON.parse(fs.readFileSync('data/lecionario/santos.json', 'utf8')), CAMPOS = ['id', 'grau', 'ap', 'ev', 'vt', 'matinas_ev'];
  fs.writeFileSync(`${dir}/lecionario-santos.json`, JSON.stringify(Object.fromEntries(Object.entries(lec).filter(([k]) => !k.startsWith('_'))
    .map(([k, v]) => [k, v.map(x => Object.fromEntries(CAMPOS.filter(c => x[c] != null).map(c => [c, x[c]])))]))));
}

// Santos (fase 3, dec. 76–77): a lista diária por língua e as fichas por língua (o eslavo das fichas — nome e tropário — à
// parte, como nas orações); vão para dist/d/ e para a pré-carga da língua como as orações. As grandes festas do Senhor e
// da Mãe de Deus, as pré-festas, as pós-festas e as despedidas já vêm do motor do calendário: não se repetem.
const GRAU = { grande: 'G', vigilia: 'V', polieleo: 'P', doxologia: 'D', seis: 'S' };
// Comemorações móveis que o motor já mostra (calendario.js: MOVEIS e semimoveis).
const MOVEIS_DO_MOTOR = new Set(['sinaxe-novos-martires-russia', 'pais-primeiro-concilio', 'todos-os-santos', 'todos-os-santos-da-russia',
  'pais-seis-concilios', 'pais-setimo-concilio', 'sabado-de-demetrio', 'domingo-antepassados', 'domingo-santos-pais', 'domingo-depois-natal']);
const doMotor = c => MOVEIS_DO_MOTOR.has(c.id) || ((c.tipo === 'senhor' || c.tipo === 'theotokos') && (c.grau === 'grande' || /^(pre|pos)-festa|^despedida/.test(c.id)));
if (fs.existsSync('data/santos/dia.json')) {
  const dia = JSON.parse(fs.readFileSync('data/santos/dia.json', 'utf8'));
  const fichas = fs.existsSync('data/santos/fichas.json') ? JSON.parse(fs.readFileSync('data/santos/fichas.json', 'utf8')) : {};
  // Ligação comemoração → ficha (data/santos/fichas-ligacoes.json: id da lista diária → id da ficha; inclui as trasladações).
  const lig = fs.existsSync('data/santos/fichas-ligacoes.json') ? JSON.parse(fs.readFileSync('data/santos/fichas-ligacoes.json', 'utf8')) : {};
  const linha = (c, l) => [c[l], GRAU[c.grau] || '', lig[c.id] || (fichas[c.id] ? c.id : 0)];
  // Nomes dos santos com leituras próprias (data/lecionario/santos.json: id de graus.json ou «pon-<id Ponomar>»), para o
  // rótulo do grupo de leituras no ecrã Hoje.
  const lec = fs.existsSync('data/lecionario/santos.json') ? JSON.parse(fs.readFileSync('data/lecionario/santos.json', 'utf8')) : {};
  const porId = new Map(), todos = [...Object.values(dia.fixos).flat(), ...dia.moveis];
  for (const c of todos) { porId.set(c.id, c); if (c.ponomar_id) porId.set('pon-' + c.ponomar_id, c); }
  const idsLec = new Set(Object.entries(lec).filter(([k]) => !k.startsWith('_')).flatMap(([, v]) => v.map(x => x.id)));
  for (const l of ['pt', 'ru', 'uk', 'en']) {
    const f = Object.fromEntries(Object.entries(dia.fixos).map(([md, cs]) => [md, cs.filter(c => !doMotor(c)).map(c => linha(c, l))]));
    const m = dia.moveis.filter(c => !doMotor(c)).map(c => { const { nota, ...regra } = c.regra; return [regra, ...linha(c, l)]; });
    const n = Object.fromEntries([...idsLec].filter(id => porId.has(id)).map(id => [id, porId.get(id)[l]]));
    fs.writeFileSync(`${dirO}/santos-${l}.json`, JSON.stringify({ f, m, n }));
    if (Object.keys(fichas).length) fs.writeFileSync(`${dirO}/fichas-${l}.json`, JSON.stringify(Object.fromEntries(Object.entries(fichas).map(([id, x]) =>
      [id, { n: x.nome[l], ti: x.titulo[l], v: x.vida[l], fe: x.festas, r: x.resumo[l], tr: x.tropario && { tom: x.tropario.tom, t: x.tropario[l], ...(x.tropario.fonte && x.tropario.fonte.estado === 'a confirmar' ? { ac: 1 } : {}) } }]))));
  }
  if (Object.keys(fichas).length) fs.writeFileSync(`${dirO}/fichas-cu.json`, JSON.stringify(Object.fromEntries(Object.entries(fichas).map(([id, x]) =>
    [id, { n: x.nome.cu, tr: x.tropario ? x.tropario.cu : '' }]))));
}
for (const [l, gs] of Object.entries(grupos)) {
  for (const m of Object.values(gs)) { m.sort((a, b) => a.ordem - b.ordem); for (const x of m) delete x.ordem; }   // sort estável
  fs.writeFileSync(`${dirO}/grupos-${l}.json`, JSON.stringify(gs));
}
