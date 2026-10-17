/*
 Orthodox Helper — interface (Fase 1: Hoje, Calendário, Definições).
 Tudo é calculado no aparelho (decisões 8 e 26). Só se guardam preferências (língua, camada do jejum, tamanho do texto)
 no armazenamento local; nenhum dado pessoal sai do aparelho.
 Eventos: um único ouvinte por região (delegação), para não acumular ouvintes a cada nova renderização.
*/
import { hoje as jdnHoje, jdnGregoriano, jdnJuliano, gregoriano, chaveMD } from './engine/datas.js';
import { dia, FIXAS } from './engine/calendario.js';
import { jejum, N } from './engine/jejum.js';
import { grausDoDia } from './dados/graus.js';
import { santosDoDia } from './engine/santos.js';
import { leituras, eothinon } from './engine/leituras.js';
import { formatarRef } from './engine/referencias.js';
import { periodoOracao, blocosDoPeriodo, eNoite, CATISMAS, planoSalterio } from './engine/oracoes.js';
import * as conversor from './engine/eslavo.js';   // estático (núcleo, ~10 KB): um import() falhado sem rede não se repetia
import indiceOracoes from './dados/gerado/oracoes/indice.json' with { type: 'json' };

const LINGUAS = ['pt', 'uk', 'ru', 'en'];
const NOMES_LINGUA = { pt: 'Português', uk: 'Українська', ru: 'Русский', en: 'English' };
const ESCALAS = [['pequeno', 0.9], ['normal', 1], ['grande', 1.15], ['muitoGrande', 1.3]];
const VISTAS = ['hoje', 'calendario', 'oracoes', 'biblia', 'conhecer'];
const $ = id => document.getElementById(id);

// ── Animações (decisões 59–60): ecrã de arranque com progresso real e transições entre ecrãs, sempre ativas.
function progresso(p) {
  const a = $('arranque');
  if (!a) return;
  a.classList.add('js'); a.style.setProperty('--p', p);
  if (p >= 1) { a.classList.add('fim'); setTimeout(() => a.remove(), 320); }
}
progresso(.45);
// Novo ecrã no topo, sem animação de scroll: o CSS pede scroll-behavior: smooth no #main e um «scrollTop = 0» deslizaria
// o texto novo desde a posição antiga (p. ex. a meio do Sl 118 ao abrir a catisma 17 de uma lista deslocada).
const topo = (y = 0) => $('main').scrollTo({ top: y, behavior: 'instant' });
/** Troca de ecrã com fade (View Transitions nativas; sem suporte: só fade-in). Resolve quando o novo ecrã está no DOM. */
function transicao(fn) {
  if (document.visibilityState !== 'visible') { fn(); return Promise.resolve(); }
  if (!document.startViewTransition) { fn(); $('main').firstElementChild?.classList.add('entra'); return Promise.resolve(); }
  return document.startViewTransition(fn).updateCallbackDone.catch(() => {});
}

// ── Preferências (só conveniência local; a app funciona sem elas)
function ler(k) { try { return localStorage.getItem('oh.' + k); } catch { return null; } }
// Armazenamento indisponível (p. ex. navegação privada, quota): a app funciona na mesma; devolve false e fica registado,
// para avisar onde perder a preferência faz diferença (plano do Saltério).
let semArmazenamento = false;
function gravar(k, v) { try { localStorage.setItem('oh.' + k, v); return true; } catch { semArmazenamento = true; return false; } }
try { localStorage.setItem('oh.teste', '1'); localStorage.removeItem('oh.teste'); } catch { semArmazenamento = true; }
function linguaInicial() {
  const guardada = ler('lingua');
  if (LINGUAS.includes(guardada)) return guardada;
  for (const l of navigator.languages || [navigator.language || '']) {
    const base = String(l).toLowerCase().split('-')[0];
    if (LINGUAS.includes(base)) return base;
  }
  return 'pt';   // decisão 31
}

const st = {
  lingua: linguaInicial(), t: null,
  camada: ler('camada') === 'typikon' ? 'typikon' : 'paroquial',
  outraCamada: false,
  escala: ESCALAS.some(e => e[0] === ler('escala')) ? ler('escala') : 'normal',
  vista: 'hoje', definicoes: false,
  eslavo: ler('eslavo') !== 'nao', oracao: null,   // oracao: { id, dados, conv, y } quando há uma oração aberta (3.º nível)
  santos: null, todosSantos: false, ficha: null, fichas: null,   // santos do dia (língua), ficha aberta, lista das fichas
  grupo: null, grupos: null,                        // grupo aberto (Saltério, acatistos, defuntos) e as listas na língua
  modoSalterio: ler('salterio.modo') === 'defuntos' ? 'defuntos' : 'habitual', umPorDia: ler('salterio.diario') === 'sim',
  // Plano do Saltério (dec. 65) também em memória: sem armazenamento, vale até fechar a app.
  salterio: { ultima: Number(ler('salterio.ultima')) || 0, data: Number(ler('salterio.data')) || 0 },
  jdn: jdnHoje(), mes: null,
};

// ── Construção de DOM sem innerHTML (o texto entra sempre como textContent)
function h(tag, attrs, ...filhos) {
  const el = document.createElement(tag);
  if (attrs) for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v; else if (k === 'text') el.textContent = v; else el.setAttribute(k, v === true ? '' : v);
  }
  for (const f of filhos.flat()) if (f != null && f !== false) el.append(f.nodeType ? f : document.createTextNode(String(f)));
  return el;
}
function icone(id, w = 22, hgt = 22) {
  const ns = 'http://www.w3.org/2000/svg', s = document.createElementNS(ns, 'svg'), u = document.createElementNS(ns, 'use');
  s.setAttribute('width', w); s.setAttribute('height', hgt); s.setAttribute('aria-hidden', 'true');
  u.setAttribute('href', '#' + id); s.append(u); return s;
}

// ── Formatação de datas (Intl só para nomes; o cálculo é próprio)
const fmtCache = new Map();
function fmt(opts) {
  const k = st.t.intl + JSON.stringify(opts);
  let f = fmtCache.get(k);
  if (!f) { f = new Intl.DateTimeFormat(st.t.intl, { timeZone: 'UTC', ...opts }); fmtCache.set(k, f); }
  return f;
}
const utc = (y, m, d) => new Date(Date.UTC(y, m - 1, d));
// Dia da semana pelos nomes próprios da app (o CLDR ucraniano usa o acusativo, «п’ятницю», no formato completo).
const dataCivilLonga = c => `${st.t.dias[(jdnGregoriano(c.y, c.m, c.d) + 1) % 7]}, ${st.t.ui.dataJuliana(fmt({ day: 'numeric', month: 'long' }).format(utc(c.y, c.m, c.d)), c.y)}`;
// Data juliana: dia e mês formatados sobre um ano bissexto qualquer (o 29 de fevereiro juliano tem de existir).
const diaMesJuliano = j => fmt({ day: 'numeric', month: 'long' }).format(utc(2024, j.m, j.d));
const nomeMes = (y, m) => { const t = fmt({ month: 'long', year: 'numeric' }).format(utc(y, m, 1)); return t[0].toLocaleUpperCase(st.t.intl) + t.slice(1); };

// ── Dados do dia
function info(jdn) {
  const d = dia(jdn), g = grausDoDia(d);
  return { d, g, j: jejum(d, g) };
}
function rotuloSemana(s) {
  if (!s) return null;
  const S = st.t.semana;
  if (s.tipo === 'pentecostes') return s.domingo ? S.pentecostesDom(s.n) : S.pentecostes(s.n);
  if (s.tipo === 'quaresma') return s.domingo ? S.quaresmaDom(s.n) : S.quaresma(s.n);
  if (s.tipo === 'pascoa') return s.domingo ? S.pascoaDom(s.n) : S.pascoa(s.n);
  if (s.tipo === 'triodio') return S.triodio[s.n - 1];
  return null;
}

// ── Ecrã «Hoje» (ou o dia escolhido no calendário)
function ecraHoje() {
  const T = st.t, { d, j } = info(st.jdn);
  const eHoje = st.jdn === jdnHoje();
  const s = h('section', { class: 'screen' });

  s.append(h('div', { class: 'navdia' },
    h('button', { class: 'icon-btn', type: 'button', 'data-acao': 'dia-1', 'aria-label': T.ui.diaAnterior }, icone('i-voltar')),
    h('div', { class: 'grow' },
      h('h1', { class: 'data-civil', text: dataCivilLonga(d.civil) }),
      h('span', { class: 'data-juliana', text: `${T.ui.dataJuliana(diaMesJuliano(d.juliano), d.juliano.y)} · ${T.ui.calJuliano}` })),
    h('button', { class: 'icon-btn', type: 'button', 'data-acao': 'dia+1', 'aria-label': T.ui.diaSeguinte }, icone('i-seguinte'))));
  if (!eHoje) s.append(h('button', { class: 'link', type: 'button', 'data-acao': 'hoje', text: T.ui.hojeBtn }));

  const chips = h('div', { class: 'chips' });
  const sem = rotuloSemana(d.semana);
  if (sem) chips.append(h('span', { class: 'chip', text: sem }));
  if (d.tom) chips.append(h('span', { class: 'chip', text: T.ui.tom(d.tom) }));
  chips.append(h('span', { class: 'chip' + (j.jejum ? ' jejum' : ''), text: j.jejum ? T.ui.diaJejum : T.ui.semJejum }));
  s.append(chips);

  // Santos e festas
  const bloco = h('div', { class: 'bloco' }, h('h2', { text: T.ui.santos }));
  const lista = h('ul', { class: 'lista' });
  const vistos = new Set();
  const festa = id => T.festa[id] || T.movel[id];
  // Festa fixa que coincide com uma festa móvel das Doze (p. ex. Anunciação na Páscoa ou nos Ramos): mostram-se as duas.
  const fixa = FIXAS[chaveMD(d.juliano.m, d.juliano.d)];
  // Grande festa de um santo (Precursor, Pedro e Paulo): o nome da festa abre a ficha.
  const fichaFesta = st.santos && st.santos.fg && st.santos.fg[chaveMD(d.juliano.m, d.juliano.d)];
  const nomeFesta = (texto, id) => (fichaFesta && fixa && id === fixa.id
    ? h('button', { class: 'santo', type: 'button', 'data-acao': 'ficha', 'data-id': fichaFesta, text: texto }) : texto);
  if (d.festa) { bloco.append(h('div', { class: 'festa-principal' }, nomeFesta(festa(d.festa.id), d.festa.id))); vistos.add(d.festa.id); }
  if (fixa && !vistos.has(fixa.id)) { lista.append(h('li', { class: 'festa-principal' }, nomeFesta(T.festa[fixa.id], fixa.id))); vistos.add(fixa.id); }
  for (const id of d.moveis) if (!vistos.has(id)) { lista.append(h('li', { text: T.movel[id] })); vistos.add(id); }
  for (const id of d.semimoveis) lista.append(h('li', { text: T.semimovel[id] }));
  if (d.prefesta) lista.append(h('li', { class: 'fase', text: `${T.ui[d.prefesta.fase]}: ${festa(d.prefesta.id)}` }));
  // Comemorações do Menaion (fase 3): as de maior grau e, sem sinal, as 3 primeiras; «Mostrar todos» abre o resto.
  // As grandes festas («G») já vêm do motor. Um nome com ficha abre-a.
  let todos = null;
  if (st.santos) {
    const ss = santosDoDia(st.santos, d).filter(x => x[1] !== 'G'), poucos = ss.filter((x, i) => x[1] || i < 3);
    const ver = st.todosSantos ? ss : poucos;
    for (const [nome, g, ficha] of ver) lista.append(h('li', { class: g ? 'g-' + g : null }, g && h('span', { class: 'sr', text: T.ui.grau[g] + ': ' }),
      ficha ? h('button', { class: 'santo', type: 'button', 'data-acao': 'ficha', 'data-id': ficha, text: nome }) : nome));
    // «Mostrar menos» só onde há o que esconder (st.todosSantos mantém-se ao mudar de dia)
    if (ss.length > poucos.length) todos = h('button', { class: 'link', type: 'button', 'data-acao': 'santos-todos',
      'aria-expanded': String(st.todosSantos), text: st.todosSantos ? T.ui.santosMenos : T.ui.santosTodos(ss.length) });
  } else if (!santosPendentes) {   // sem rede no arranque: um só pedido de cada vez, por muitas renderizações que haja
    santosPendentes = carregarSantos().then(ok => { if (ok && !st.definicoes && !st.ficha && st.vista === 'hoje') renderFundo(); })
      .catch(() => {}).finally(() => { santosPendentes = null; });
  }
  if (lista.childElementCount) bloco.append(lista);
  if (todos) bloco.append(todos);
  if (bloco.childElementCount > 1) s.append(bloco);

  // Jejum
  const cam = st.outraCamada ? (st.camada === 'paroquial' ? 'typikon' : 'paroquial') : st.camada;
  const r = j[cam];
  const bj = h('div', { class: 'bloco' }, h('h2', { text: T.ui.jejum }));
  if (j.tempo && T.tempo[j.tempo]) bj.append(h('span', { class: 'camada', text: T.tempo[j.tempo] }));
  const extras = [];
  if (r.vinho && r.nivel < N.TUDO) extras.push(T.ui.comVinho);
  if (r.refeicoes && cam === 'typikon') extras.push(T.ui.refeicoes(r.refeicoes));
  bj.append(h('div', { class: 'nivel', text: T.nivel[r.nivel] + (extras.length ? ' · ' + extras.join(' · ') : '') }),
    h('div', { class: 'desc', text: T.nivelDesc[r.nivel] }),
    h('span', { class: 'camada', text: cam === 'paroquial' ? T.ui.camadaParoquial : T.ui.camadaTypikon }));
  for (const n of r.notas) if (T.notas[n]) bj.append(h('div', { class: 'nota' + (cam === 'typikon' ? ' typikon' : ''), text: T.notas[n] }));
  const outra = cam === 'paroquial' ? j.typikon : j.paroquial;
  if (j.jejum || outra.nivel !== r.nivel) {
    bj.append(h('button', { class: 'link', type: 'button', 'data-acao': 'camada', text: cam === 'paroquial' ? T.ui.verTypikon : T.ui.verParoquial }));
  }
  if (j.jejum) bj.append(h('div', { class: 'nota', text: T.ui.notaJejum }));
  s.append(bj);

  s.append(blocoLeituras(d));
  return s;
}

// ── Leituras do dia
function blocoLeituras(d) {
  const T = st.t, L = leituras(d), b = h('div', { class: 'bloco' }, h('h2', { text: T.ui.leituras }));
  let porVerificar = false;
  const refs = lista => lista.map(x => { if (x.verificado === false) porVerificar = true; return formatarRef(x.r, st.lingua) + (x.verificado === false ? ' *' : ''); }).join('; ');
  const linha = (rotulo, lista) => { if (lista && lista.length) b.append(h('div', { class: 'read' }, h('span', { text: rotulo }), h('span', { text: refs(lista) }))); };
  const sub = txt => b.append(h('span', { class: 'camada', text: txt }));
  // Agrupa por ofício (sv); sem sv = Liturgia. Na Sexta-feira Santa, por exemplo, há leituras de 5 ofícios.
  const ORDEM = ['matinas_12_evangelhos', 'matinas', 'hora1', 'hora3', 'hora6', 'hora9', 'vesperas_vespera', 'vesperas', 'lava_pes', 'liturgia_presantificados', 'liturgia'];
  const grupos = new Map();
  const pôr = (tipo, x) => { const sv = x.sv || 'liturgia'; if (!grupos.has(sv)) grupos.set(sv, { vt: [], ap: [], ev: [] }); grupos.get(sv)[tipo].push(x); };
  L.vt.forEach(x => pôr('vt', x)); L.ap.forEach(x => pôr('ap', x)); L.ev.forEach(x => pôr('ev', x));
  const svs = [...grupos.keys()].sort((a, c) => (ORDEM.indexOf(a) + 1 || 99) - (ORDEM.indexOf(c) + 1 || 99));
  const variosOficios = svs.length > 1 || (svs[0] && svs[0] !== 'liturgia');
  for (const sv of svs) {
    const g = grupos.get(sv);
    if (variosOficios) sub(T.ui.servico[sv] || sv);
    linha(T.ui.antigoTestamento, g.vt); linha(T.ui.apostolo, g.ap);
    if (sv === 'matinas_12_evangelhos') g.ev.forEach((x, i) => linha(`${T.ui.evangelho} ${i + 1}`, [x])); else linha(T.ui.evangelho, g.ev);
  }
  if (L.semLiturgia || (!L.ap.length && !L.ev.length && !L.incerto)) b.append(h('div', { class: 'desc', text: T.ui.semLiturgia }));
  for (const e of L.extra) {
    if (e.rotulo === 'horas_reais') { sub(T.ui.horasReais);
      for (const [hora, x] of Object.entries(e.horas)) linha(T.ui.servico[hora] || hora, [...(x.vt || []), ...(x.ap || []), ...(x.ev || [])]); }
    else if (e.rotulo === 'santo') {   // santo do Menaion (fase 3): Vésperas (AT), Matinas (Evangelho), Liturgia
      sub((st.santos && st.santos.n[e.id]) || T.semimovel[e.id] || T.ui.leiturasSanto);   // domingos dos Padres: id do domingo
      linha(`${T.ui.servico.vesperas}: ${T.ui.antigoTestamento}`, e.vt); linha(`${T.ui.servico.matinas}: ${T.ui.evangelho}`, e.matinas_ev);
      linha(T.ui.apostolo, e.ap); linha(T.ui.evangelho, e.ev); }
    else { sub({ bencao_aguas: T.ui.bencaoAguas, vesperas: T.ui.servico.vesperas, ordinario: T.ui.ordinario }[e.rotulo] || T.ui.festaLeituras);
      linha(T.ui.antigoTestamento, e.vt); linha(T.ui.apostolo, e.ap); linha(T.ui.evangelho, e.ev); }
  }
  if (typeof d.eothinon === 'number') { const e = eothinon(d.eothinon); sub(T.ui.matinas); linha(T.ui.evangelhoMatinal(d.eothinon), e ? [e] : []); }
  else if (d.eothinon && d.eothinon.omitido) b.append(h('div', { class: 'desc', text: T.ui.evangelhoMatinalOmitido }));
  if (L.deslocadas) b.append(h('div', { class: 'nota', text: T.ui.leiturasDeslocadas }));
  if (L.incerto) b.append(h('div', { class: 'nota', text: T.ui.leiturasIncertas }));
  if (porVerificar) b.append(h('div', { class: 'nota', text: T.ui.naoVerificado }));
  return b;
}

// ── Calendário mensal (semana a começar ao domingo, decisão 39)
function ecraCalendario() {
  const T = st.t;
  if (!st.mes) { const c = gregoriano(st.jdn); st.mes = { y: c.y, m: c.m }; }
  const { y, m } = st.mes;
  const s = h('section', { class: 'screen' });
  s.append(h('div', { class: 'mes-cab' },
    h('button', { class: 'icon-btn', type: 'button', 'data-acao': 'mes-1', 'aria-label': T.ui.mes }, icone('i-voltar')),
    h('h1', { text: nomeMes(y, m) }),
    h('button', { class: 'icon-btn', type: 'button', 'data-acao': 'mes+1', 'aria-label': T.ui.mesSeg }, icone('i-seguinte'))));
  const g = h('div', { class: 'grelha', role: 'group', 'aria-label': nomeMes(y, m) });
  T.diasCurtos.forEach((x, i) => g.append(h('span', { class: 'dow' + (i === 0 ? ' dom' : ''), text: x })));
  const primeiro = jdnGregoriano(y, m, 1), fim = m === 12 ? jdnGregoriano(y + 1, 1, 1) : jdnGregoriano(y, m + 1, 1);
  const vazios = (primeiro + 1) % 7;
  for (let i = 0; i < vazios; i++) g.append(h('span'));
  const hj = jdnHoje();
  for (let jdn = primeiro; jdn < fim; jdn++) {
    const { d, j } = info(jdn);
    const festa = !!d.festa;
    const cls = ['dia', d.dow === 0 && 'dom', festa && 'festa', j.jejum && 'jejum', jdn === hj && 'hoje', jdn === st.jdn && 'sel'].filter(Boolean).join(' ');
    const nome = [dataCivilLonga(d.civil), festa ? (T.festa[d.festa.id] || T.movel[d.festa.id]) : null, j.jejum ? T.ui.diaJejum : null].filter(Boolean).join('. ');
    g.append(h('button', { class: cls, type: 'button', 'data-acao': 'abrir', 'data-jdn': jdn, 'aria-label': nome, 'aria-current': jdn === hj && 'date' },
      h('b', { text: d.civil.d }), h('small', { text: d.juliano.d })));
  }
  s.append(g, h('div', { class: 'legenda' },
    h('span', {}, h('i', { style: 'background:var(--gold)' }), T.ui.legendaJejum),
    h('span', {}, h('i', { style: 'background:var(--cinnabar)' }), T.ui.legendaFesta),
    h('span', { text: T.ui.legendaJuliano })));
  return s;
}

// ── Orações: lista (2.º nível) e texto (3.º nível). Ordem do mapa de navegação aprovado (decisão 47).
const ORACOES = ['manha', 'noite', 'comunhao_preparacao', 'comunhao_acao_gracas', 'jesus', 'serafim', 'acatistos', 'salterio', 'defuntos', 'refeicoes'];
const GRUPOS = new Set(['acatistos', 'salterio', 'defuntos']);   // abrem uma lista (ids «grupo-membro» nos dados)
function ecraOracoes() {
  const T = st.t, s = h('section', { class: 'screen' }), ul = h('ul', { class: 'menu' });
  for (const id of ORACOES) {
    const grupo = GRUPOS.has(id), ok = grupo ? indiceOracoes.some(x => x.startsWith(id + '-')) : indiceOracoes.includes(id);
    ul.append(h('li', {}, h('button', { class: 'item', type: 'button', 'data-acao': grupo ? 'grupo' : 'oracao', 'data-id': id, disabled: !ok },
      h('span', { text: T.oracoes[id] }), ok ? icone('i-seguinte', 18, 18) : h('small', { text: T.ui.emPreparacao }))));
  }
  s.append(ul);
  return s;
}
// Lista de um grupo (4.º nível de navegação: Orações → Saltério → catisma). No Saltério, o plano pessoal (dec. 65) e o
// modo de leitura (dec. 64) ficam por cima da lista.
const idCatisma = n => 'salterio-' + String(n).padStart(2, '0');
function ecraGrupo() {
  const T = st.t, g = st.grupo, S = T.salterio, s = h('section', { class: 'screen' });
  s.append(h('h1', { class: 'data-civil', tabindex: '-1', text: T.oracoes[g] }));
  if (g === 'salterio') {
    const p = planoSalterio(st.salterio.ultima, st.salterio.data, jdnHoje(), st.umPorDia);
    s.append(h('div', { class: 'bloco' },
      p.lida ? h('p', { class: 'txt', text: S.hojeLida(p.n) })
        : h('button', { class: 'item', type: 'button', 'data-acao': 'oracao', 'data-id': idCatisma(p.n) }, h('span', { text: S.continuar(p.n) }), icone('i-seguinte', 18, 18)),
      semArmazenamento && h('p', { class: 'nota', text: S.semArmazenamento }),
      campo(S.umPorDia, 'sal-diario', [['sim', T.ui.sim], ['nao', T.ui.nao]], st.umPorDia ? 'sim' : 'nao'),
      campo(S.modo, 'sal-modo', [['habitual', S.habitual], ['defuntos', S.defuntos]], st.modoSalterio)));
  }
  const ul = h('ul', { class: 'menu' });
  for (const m of st.grupos[g] || []) {
    const n = g === 'salterio' && /^salterio-\d\d$/.test(m.id) && Number(m.id.slice(9));
    ul.append(h('li', {}, h('button', { class: 'item', type: 'button', 'data-acao': 'oracao', 'data-id': m.id },
      h('span', {}, m.titulo, n && h('small', { class: 'sub', text: S.salmos(...CATISMAS[n - 1]) })), icone('i-seguinte', 18, 18))));
  }
  s.append(ul);
  return s;
}
// Dados das orações (dist/d/, nome com o hash do conteúdo; ver build.mjs). fetch() e não import(): sem rede, o pedido
// falha, mas repete-se no toque seguinte (um import() falhado fica guardado pelo browser até fechar a app).
const DADOS_LINGUAS = ['cu', 'pt', 'uk', 'ru', 'en'];
async function dados(id, l) {
  const hash = (__DADOS__[id] || '').substr(DADOS_LINGUAS.indexOf(l) * 8, 8);
  if (!/^[0-9a-f]{8}$/.test(hash)) throw new Error(`sem dados: ${id}-${l}`);
  const r = await fetch(`d/${id}-${l}.${hash}.json`);
  if (!r.ok) throw new Error(r.status);
  return r.json();
}
// ── Santos (fase 3): a lista do dia carrega-se com a língua; as fichas só quando se abre uma (ou a lista de Conhecer).
let santosPendentes = null;
async function carregarSantos() {
  const lingua = st.lingua, x = await dados('santos', lingua);
  if (lingua !== st.lingua) return false;
  st.santos = x; return true;
}
let fichasDe = null;
async function carregarFichas() {
  const lingua = st.lingua;
  if (fichasDe === lingua) return true;
  const x = await dados('fichas', lingua);
  if (lingua !== st.lingua) return false;
  st.fichas = x; fichasDe = lingua; return true;
}
async function abrirFicha(id) {
  const pedido = ++pedidoOracao, lingua = st.lingua;
  // Eslavo (nome e tropário) só com «Mostrar o eslavo»; sem rede, a ficha abre na mesma, sem ele.
  const [ok, cu] = await Promise.all([carregarFichas(), st.eslavo ? dados('fichas', 'cu').catch(() => null) : null]);
  // As fichas já estavam em memória e o eslavo chegou depois de mudar a língua: a ficha ficaria na língua anterior.
  if (!ok || pedido !== pedidoOracao || lingua !== st.lingua || !st.fichas[id]) return;
  st.ficha = { id, x: st.fichas[id], cu: cu && cu[id], y: $('main').scrollTop };
  await transicao(() => { render(); topo(); });
  if (!st.definicoes) $('main').querySelector('h1')?.focus({ preventScroll: true });
}
// Data de uma festa: a civil do ano corrente e a juliana (o calendário da Igreja, dec. 2).
function dataFesta(f) {
  const m = /^(\d\d)-(\d\d)$/.exec(f);
  if (!m) return f;
  const j = { m: +m[1], d: +m[2] }, c = gregoriano(jdnJuliano(gregoriano(jdnHoje()).y, j.m, j.d));
  return st.t.ui.dataFesta(fmt({ day: 'numeric', month: 'long' }).format(utc(c.y, c.m, c.d)), diaMesJuliano(j));
}
function ecraFicha() {
  const T = st.t, { x, cu } = st.ficha, s = h('section', { class: 'screen oracao' });
  const eslavo = st.eslavo && cu ? (st.lingua === 'uk' ? conversor.izvod : conversor.civil) : null;
  s.append(h('h1', { class: 'data-civil', tabindex: '-1', text: x.n }));
  if (eslavo && cu.n) s.append(h('p', { class: 'slav', lang: 'cu', text: eslavo(cu.n) }));
  const sub = [x.ti, x.v].filter(Boolean).join(' · ');
  if (sub) s.append(h('p', { class: 'desc', text: sub }));
  if (x.fe && x.fe.length) s.append(h('p', { class: 'desc', text: `${T.ui.festas}: ${x.fe.map(dataFesta).join('; ')}` }));
  if (x.r) s.append(h('p', { class: 'txt', text: x.r }));
  if (x.tr && x.tr.t) {
    s.append(h('h2', { class: 'titulo-oracao', text: T.ui.tropario(x.tr.tom) }));
    const par = h('div', { class: 'par' });
    if (eslavo && cu.tr) par.append(h('p', { class: 'slav', lang: 'cu', text: eslavo(cu.tr) }));
    par.append(h('p', { class: 'trad', text: x.tr.t }));
    s.append(par);
    if (x.tr.ac) s.append(h('p', { class: 'nota', text: T.ui.troparioAConferir }));   // dec. 78
  }
  return s;
}
// Conhecer (fase 4 por fazer): por agora, a lista dos santos com ficha, por ordem alfabética.
function ecraConhecer() {
  const T = st.t, s = h('section', { class: 'screen' });
  s.append(h('h1', { class: 'data-civil', tabindex: '-1', text: T.ui.santosFichas }));
  if (!st.fichas || fichasDe !== st.lingua) {
    carregarFichas().then(ok => { if (ok && st.vista === 'conhecer' && !st.ficha && !st.definicoes) renderFundo(); })
      .catch(() => s.append(h('p', { class: 'nota', role: 'status', text: T.ui.erroCarregar })));
    return s;
  }
  const ul = h('ul', { class: 'menu' });
  // Ordem pelo nome sem o título (S., Ss., Преподобный…): o título vem à parte, em x.ti.
  const chave = x => x.n.replace(/^(?:\S+\.\s+)+/, '').replace(new RegExp('^' + (x.ti || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s+', 'i'), '');
  const lista = Object.entries(st.fichas).sort((a, b) => chave(a[1]).localeCompare(chave(b[1]), T.intl));
  for (const [id, x] of lista) ul.append(h('li', {}, h('button', { class: 'item', type: 'button', 'data-acao': 'ficha', 'data-id': id },
    h('span', {}, x.n, x.ti && h('small', { class: 'sub', text: x.ti })), icone('i-seguinte', 18, 18))));
  s.append(ul);
  return s;
}

let gruposDe = null;   // língua de st.grupos (a lista não se volta a pedir a cada abertura)
// Devolve false se entretanto mudou a língua (dois toques seguidos na língua, ou a língua mudada nas Definições durante o
// carregamento): a lista que chega tarde não substitui a da língua atual.
async function carregarGrupos() {
  const lingua = st.lingua;
  if (gruposDe === lingua) return true;
  const g = await dados('grupos', lingua);
  if (lingua !== st.lingua) return false;
  st.grupos = g; gruposDe = lingua;
  return true;
}
// Eslavo de uma oração (ficheiro partilhado pelas 4 línguas, alinhado pela posição dos blocos). Com o eslavo desligado
// não se pede: liga-se nas Definições e completa-se então (completarEslavo). o.conv marca a oração com eslavo.
const carregarEslavo = async id => (await dados(id, 'cu')).cu;
function juntarEslavo(o, cu) {
  o.dados.blocos.forEach((b, i) => { b.cu = cu[i]; });
  o.conv = conversor;
}
async function completarEslavo() {
  const f = st.ficha;   // ficha aberta com o eslavo desligado: nome e tropário eslavos ainda por pedir
  if (f && !f.cu) try { const cu = await dados('fichas', 'cu'); if (st.ficha === f) f.cu = cu[f.id]; } catch { /* sem rede */ }
  const o = st.oracao;
  if (!o || o.conv) return;
  try { const e = await carregarEslavo(o.id); if (st.oracao === o) juntarEslavo(o, e); } catch { /* sem rede: fica só a tradução */ }
}
async function abrirGrupo(g) {
  const pedido = ++pedidoOracao;
  if (!(await carregarGrupos()) || pedido !== pedidoOracao) return;
  st.grupo = g;
  await transicao(() => { render(); topo(); });
  if (!st.definicoes) $('main').querySelector('h1')?.focus({ preventScroll: true });
}

let pedidoOracao = 0;
async function abrirOracao(id) {
  const pedido = ++pedidoOracao, lingua = st.lingua, y = $('main').scrollTop;   // posição na lista, retomada ao voltar
  const [d, eslavo] = await Promise.all([dados(id, lingua), st.eslavo ? carregarEslavo(id) : null]);   // em paralelo
  if (pedido !== pedidoOracao || lingua !== st.lingua) return;   // entretanto abriu-se outra oração ou mudou a língua
  st.oracao = { id, dados: d, conv: null, y };
  if (eslavo) juntarEslavo(st.oracao, eslavo);
  await transicao(() => { render(); topo(); });
  // O botão tocado desapareceu: o foco passa ao título da oração (leitores de ecrã anunciam o novo ecrã).
  if (!st.definicoes) $('main').querySelector('h1')?.focus({ preventScroll: true });
}
// Os avisos de período descrevem as orações da manhã e da noite. O ofício da Comunhão começa da mesma maneira,
// mas na Semana Luminosa lê-se o Cânone Pascal (não as Horas Pascais); as outras orações não têm aviso.
const comAviso = (id, periodo) => id === 'manha' || id === 'noite' || (id === 'comunhao_preparacao' && periodo !== 'semana_luminosa');
function ecraOracao() {
  const T = st.t, { id, dados, conv } = st.oracao, s = h('section', { class: 'screen oracao' });
  const d = dia(jdnHoje()), periodo = periodoOracao(d, eNoite(id, new Date().getHours()));
  const salterio = id.startsWith('salterio-'), modos = salterio && st.modoSalterio === 'defuntos' ? ['defuntos'] : [];
  s.append(h('h1', { class: 'data-civil', tabindex: '-1', text: dados.titulo }), h('span', { class: 'estado', text: T.estado[dados.estado] || dados.estado }));
  if (T.periodo[periodo] && comAviso(id, periodo)) s.append(h('div', { class: 'nota', text: T.periodo[periodo] }));   // só os períodos com aviso (pascais)
  const eslavo = st.eslavo && conv ? (st.lingua === 'uk' ? conv.izvod : conv.civil) : null;
  for (const b of blocosDoPeriodo(dados.blocos, periodo, modos)) {
    const rep = b.repetir ? ` (${T.ui.vezes(b.repetir)})` : '';
    if (b.tipo === 'rubrica') { s.append(h('p', { class: 'rubrica', text: b.t + rep })); continue; }
    if (b.tipo === 'titulo') { if (b.t !== dados.titulo) s.append(h('h2', { class: 'titulo-oracao', text: b.t })); continue; }   // o 1.º título repete o h1
    const par = h('div', { class: b.sob ? 'par sobrescrito' : 'par' }), v = () => b.v && h('sup', { class: 'v', text: b.v });   // n.º do versículo
    // «(3 vezes)» está na língua da interface, não em eslavo
    if (eslavo && b.cu) par.append(h('p', { class: 'slav', lang: 'cu' }, v(), eslavo(b.cu), rep && h('span', { lang: T.lang, text: rep })));
    par.append(h('p', { class: 'trad' }, v(), b.t + (eslavo && b.cu ? '' : rep)));
    s.append(par);
  }
  // Catisma: marcar como lida avança o plano pessoal (dec. 65).
  if (/^salterio-\d\d$/.test(id)) s.append(h('button', { class: 'link', type: 'button', 'data-acao': 'sal-lida', 'data-n': Number(id.slice(9)), text: T.salterio.marcarLida }));
  return s;
}

function ecraEmPreparacao() {
  const T = st.t;
  return h('section', { class: 'screen' }, h('div', { class: 'vazio' }, icone('cruz', 40, 56),
    h('h1', { text: T.ui.emPreparacao }), h('p', { class: 'txt', text: T.ui.emPreparacaoTxt })));
}

// Pergunta com botões de escolha: o grupo tem como nome acessível o rótulo (aria-labelledby).
function campo(rotulo, nome, opcoes, atual) {
  return h('div', { class: 'campo' }, h('label', { id: 'rotulo-' + nome, text: rotulo }), seg(nome, opcoes, atual));
}
function seg(nome, opcoes, atual) {
  return h('div', { class: 'seg', role: 'group', 'aria-labelledby': 'rotulo-' + nome }, opcoes.map(([v, rotulo]) =>
    h('button', { type: 'button', 'data-acao': nome, 'data-valor': v, 'aria-pressed': String(v === atual), text: rotulo })));
}
function ecraDefinicoes() {
  const T = st.t;
  return h('section', { class: 'screen' },
    campo(T.ui.lingua, 'lingua', LINGUAS.map(l => [l, NOMES_LINGUA[l]]), st.lingua),
    campo(T.ui.camadaDefeito, 'camada-defeito', [['paroquial', T.ui.camadaParoquial], ['typikon', T.ui.camadaTypikon]], st.camada),
    campo(T.ui.tamanhoTexto, 'escala', ESCALAS.map(([k]) => [k, T.ui[k]]), st.escala),
    campo(T.ui.mostrarEslavo, 'eslavo', [['sim', T.ui.sim], ['nao', T.ui.nao]], st.eslavo ? 'sim' : 'nao'),
    h('div', { class: 'bloco' }, h('h2', { text: T.ui.acerca }), h('p', { class: 'txt', text: T.ui.acercaTxt }),
      h('p', { class: 'txt', text: `${T.ui.versao} ${__VERSAO__}` })),
    h('div', { class: 'bloco' }, h('h2', { text: T.ui.licencas }), h('p', { class: 'txt', text: T.ui.licencasTxt })));
}

// ── Renderização
function render() {
  const T = st.t, main = $('main');
  document.documentElement.lang = T.lang;
  document.documentElement.style.setProperty('--scale', ESCALAS.find(e => e[0] === st.escala)[1]);
  const esq = $('btn-esq'), dir = $('btn-dir');
  const voltar = st.definicoes || !!st.oracao || !!st.grupo || !!st.ficha;
  esq.replaceChildren(icone(voltar ? 'i-voltar' : 'i-pesquisa'));
  esq.setAttribute('aria-label', voltar ? T.ui.voltar : T.ui.pesquisar);
  esq.disabled = !voltar;                        // a pesquisa chega com o conteúdo pesquisável (fases 2–4)
  dir.replaceChildren(icone('i-definicoes')); dir.setAttribute('aria-label', T.ui.definicoes); dir.hidden = st.definicoes;
  $('titulo').textContent = st.definicoes ? T.ui.definicoes : (st.vista === 'hoje' ? 'Orthodox Helper' : T.nav[st.vista]);

  const ecra = st.definicoes ? ecraDefinicoes() : st.ficha ? ecraFicha() : st.vista === 'hoje' ? ecraHoje() : st.vista === 'calendario' ? ecraCalendario()
    : st.vista === 'oracoes' ? (st.oracao ? ecraOracao() : st.grupo ? ecraGrupo() : ecraOracoes())
    : st.vista === 'conhecer' ? ecraConhecer() : ecraEmPreparacao();
  main.replaceChildren(ecra);

  const tabs = $('tabs');
  if (tabs.dataset.lingua !== st.lingua) {        // a barra só se reconstrói quando muda a língua
    tabs.replaceChildren(...VISTAS.map(v => h('button', { class: 'tab', type: 'button', 'data-vista': v }, icone('i-' + v, 24, 24), h('span', { text: T.nav[v] }))));
    tabs.dataset.lingua = st.lingua;
  }
  for (const b of tabs.children) b.setAttribute('aria-current', !st.definicoes && b.dataset.vista === st.vista ? 'page' : 'false');
}
// Renderização pedida por um carregamento em segundo plano (santos do dia, fichas de Conhecer): o ecrã é reconstruído
// sem um toque, e o foco do teclado não pode cair no <body> — volta ao botão equivalente, ou ao conteúdo.
function renderFundo() {
  const m = $('main'), a = document.activeElement, dentro = a !== m && m.contains(a);
  const sel = dentro && a.dataset.acao ? `[data-acao="${a.dataset.acao}"]` + (a.dataset.id ? `[data-id="${a.dataset.id}"]` : '') : null;
  render();
  if (dentro) ((sel && m.querySelector(sel)) || m).focus({ preventScroll: true });
}

// Pedidos em fila: dois toques seguidos não podem terminar fora de ordem (os santos do dia também ficam no estado), e um pedido
// ultrapassado por outro mais recente já não se aplica. Devolve true se a língua ficou ativa.
let filaLingua = Promise.resolve(), ultimoPedido = 0;
function mudarLingua(l) {
  const pedido = ++ultimoPedido;
  const p = filaLingua.then(async () => {
    if (pedido !== ultimoPedido) return false;
        // A lista anual de santos (~45 KB) não atrasa o arranque nem a troca de língua: pede-se ao mostrar o dia.
    const t = await import(`./i18n/${l}.js`);
    st.t = t.default; st.santos = null;
    st.lingua = l; fmtCache.clear();
    guardarLingua(l);
    return true;
  });
  filaLingua = p.catch(() => {});
  return p;
}

// Língua garantida offline (decisão 45): depois de a língua ficar ativa, pedem-se em segundo plano todos os seus blocos
// (orações, nomes); o service worker guarda-os. Sem rede, falha em silêncio e tenta-se no próximo arranque.
const guardadas = new Set();
function guardarLingua(l) {
  if (guardadas.has(l) || !('serviceWorker' in navigator) || !navigator.serviceWorker.controller) return;
  guardadas.add(l);
  const ok = r => { if (!r.ok) throw new Error(r.status); return r; };
  const pedir = () => fetch('idiomas.json').then(r => ok(r).json())
    // Só os que faltam: sem isto, cada arranque relia da cache os ~2 MB da língua (39 pedidos ao service worker).
    .then(m => Promise.all((m[l] || []).map(f => caches.match(f).then(c => c || fetch(f).then(r => ok(r).blob())))))
    .catch(() => guardadas.delete(l));
  'requestIdleCallback' in window ? requestIdleCallback(pedir, { timeout: 5000 }) : setTimeout(pedir, 2000);
}

// Arranque: sem o bloco da língua guardada (p. ex. sem rede antes de o service worker ter guardado tudo), usa-se o português
// e, se também faltar (só a língua escolhida fica garantida offline), a primeira língua que estiver guardada.
for (const [i, l] of [...new Set([st.lingua, 'pt', ...LINGUAS])].entries()) {
  try { await mudarLingua(l); break; } catch (e) { if (i === LINGUAS.length - 1) throw e; }
}
progresso(.85);
render();
requestAnimationFrame(() => progresso(1));

// ── Eventos (um ouvinte por região)
$('main').addEventListener('click', async e => {
  const b = e.target.closest('[data-acao]');
  if (!b) return;
  const a = b.dataset.acao;
  if (a === 'dia-1' || a === 'dia+1') { st.jdn += a === 'dia+1' ? 1 : -1; st.outraCamada = false; st.mes = null; }
  else if (a === 'hoje') { st.jdn = jdnHoje(); st.mes = null; }
  else if (a === 'camada') st.outraCamada = !st.outraCamada;
  else if (a === 'mes-1' || a === 'mes+1') {
    const k = st.mes.y * 12 + st.mes.m - 1 + (a === 'mes+1' ? 1 : -1);
    st.mes = { y: Math.floor(k / 12), m: (k % 12) + 1 };
  } else if (a === 'abrir') { st.jdn = Number(b.dataset.jdn); st.vista = 'hoje'; st.outraCamada = false; }
  else if (a === 'lingua') {
    // Bloco da língua indisponível (sem rede e ainda não guardado): fica a língua atual.
    try { if (!(await mudarLingua(b.dataset.valor))) return; } catch { return; }
    gravar('lingua', st.lingua); st.oracao = null; st.ficha = null;   // o texto aberto estava noutra língua
    if (st.grupo) try { if (!(await carregarGrupos())) return; } catch { st.grupo = null; }   // a lista do grupo também (um pedido ultrapassado não renderiza)
  }
  else if (a === 'camada-defeito') { st.camada = b.dataset.valor; gravar('camada', st.camada); }
  else if (a === 'escala') { st.escala = b.dataset.valor; gravar('escala', st.escala); }
  else if (a === 'eslavo') { st.eslavo = b.dataset.valor === 'sim'; gravar('eslavo', b.dataset.valor); if (st.eslavo) await completarEslavo(); }
  else if (a === 'santos-todos') st.todosSantos = !st.todosSantos;
  else if (a === 'sal-diario') { st.umPorDia = b.dataset.valor === 'sim'; gravar('salterio.diario', b.dataset.valor); }
  else if (a === 'sal-modo') { st.modoSalterio = b.dataset.valor; gravar('salterio.modo', b.dataset.valor); }
  else if (a === 'sal-lida') {                         // sem reconstruir o ecrã: a posição de leitura fica
    st.salterio = { ultima: Number(b.dataset.n), data: jdnHoje() };
    const S = st.t.salterio, ok = gravar('salterio.ultima', st.salterio.ultima) && gravar('salterio.data', st.salterio.data);
    const comFoco = document.activeElement === b, aviso = h('p', { class: 'txt', role: 'status', tabindex: '-1', text: ok ? S.lida : `${S.lida} ${S.semArmazenamento}` });
    b.replaceWith(aviso);
    if (comFoco) aviso.focus({ preventScroll: true });   // o botão desapareceu: o foco não cai no <body>
    return;
  }
  else if (a === 'oracao' || a === 'grupo' || a === 'ficha') {
    ({ grupo: abrirGrupo, oracao: abrirOracao, ficha: abrirFicha })[a](b.dataset.id).catch(() => {   // sem rede e ainda não guardada: avisa em vez de não fazer nada
      const aviso = h('p', { class: 'nota', role: 'status', text: st.t.ui.erroCarregar }), ecra = $('main').querySelector('.screen');
      ecra?.querySelector(':scope > .nota[role="status"]')?.remove();   // toques repetidos: um só aviso
      ecra?.prepend(aviso);
    });
    return;
  }
  else return;
  // O ecrã é reconstruído: o foco do teclado volta ao botão equivalente (ou ao conteúdo, se o botão desapareceu).
  const comFoco = document.activeElement === b;
  const fazer = () => { render(); if (a === 'abrir' || a === 'dia-1' || a === 'dia+1' || a === 'hoje') topo(); };
  if (['abrir', 'dia-1', 'dia+1', 'hoje', 'mes-1', 'mes+1'].includes(a)) await transicao(fazer); else fazer();
  if (comFoco) {
    const sel = `[data-acao="${a}"]` + (b.dataset.valor ? `[data-valor="${b.dataset.valor}"]` : '');
    const alvo = a === 'abrir' || a === 'hoje' ? null : $('main').querySelector(sel);
    (alvo || $('main')).focus({ preventScroll: true });
  }
});
$('tabs').addEventListener('click', e => {
  const b = e.target.closest('[data-vista]');
  if (!b) return;
  if (b.dataset.vista === 'hoje' && st.vista === 'hoje' && !st.definicoes) st.jdn = jdnHoje();
  st.vista = b.dataset.vista; st.definicoes = false; st.outraCamada = false; st.oracao = null; st.grupo = null; st.ficha = null; st.todosSantos = false; pedidoOracao++;
  transicao(() => { render(); topo(); });
});
// Definições abertas a meio de uma oração longa: ao voltar ao mesmo ecrã, retoma-se a posição de leitura. A posição é o
// bloco no topo do ecrã (índice entre os filhos do ecrã) e o desvio dentro dele, não os píxeis: com content-visibility,
// a altura dos blocos fora do ecrã é estimada, e o tamanho do texto pode ter mudado entretanto.
function posicaoLeitura() {
  const m = $('main'), topoM = m.getBoundingClientRect().top, filhos = m.firstElementChild?.children || [];
  for (let i = 0; i < filhos.length; i++) { const r = filhos[i].getBoundingClientRect(); if (r.bottom > topoM) return { i, dy: topoM - r.top }; }
  return { i: 0, dy: 0 };
}
function retomarLeitura({ i, dy }) {
  const m = $('main'), el = m.firstElementChild?.children[i];
  if (!el) return;
  // Os blocos vizinhos só ganham a altura real depois de renderizados: corrige-se nos frames seguintes (até 3).
  const acertar = n => {
    const d = el.getBoundingClientRect().top - m.getBoundingClientRect().top + dy;
    if (Math.abs(d) >= 1) topo(m.scrollTop + d);
    if (n) requestAnimationFrame(() => acertar(n - 1));
  };
  acertar(3);
}
let antesDefinicoes = null;
$('btn-dir').addEventListener('click', () => {
  antesDefinicoes = { vista: st.vista, oracao: st.oracao, ficha: st.ficha, pos: posicaoLeitura() };
  st.definicoes = true; transicao(() => { render(); topo(); });
});
$('btn-esq').addEventListener('click', async () => {
  // O «Voltar» fica desativado no ecrã de destino: o foco do teclado passa ao elemento equivalente (e não ao <body>).
  let alvo, y = 0, pos = null;
  if (st.definicoes) {
    st.definicoes = false; alvo = 'btn-dir';
    const a = antesDefinicoes;
    // A mudança de língua fecha a ficha (e o texto): a posição guardada era a dele, não a do ecrã por baixo.
    if (a && a.vista === st.vista && a.oracao === st.oracao && a.ficha === st.ficha) pos = a.pos;
  } else if (st.ficha) { alvo = st.ficha.id; y = st.ficha.y || 0; st.ficha = null; pedidoOracao++; }
  else if (st.oracao) { alvo = st.oracao.id; y = st.oracao.y || 0; st.oracao = null; pedidoOracao++; }
  else if (st.grupo) { alvo = st.grupo; st.grupo = null; pedidoOracao++; }
  else return;
  await transicao(() => { render(); if (pos) retomarLeitura(pos); else topo(y); });   // sem scroll-behavior: smooth
  const el = alvo === 'btn-dir' ? $('btn-dir') : $('main').querySelector(`.menu [data-id="${alvo}"], [data-acao="ficha"][data-id="${alvo}"]`);
  // Aberta pelo «Continuar» (fora da lista) ou lista mais alta do que o ecrã: o item fica à vista antes de receber o foco.
  if (el && alvo !== 'btn-dir') el.scrollIntoView({ block: 'nearest', behavior: 'instant' });
  (el || $('main')).focus({ preventScroll: true });
});
// Mudança de dia com a app aberta: se o ecrã mostrava «hoje», passa para o novo dia.
let ultimoHoje = jdnHoje();
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') return;
  const agora = jdnHoje();
  if (agora !== ultimoHoje) { if (st.jdn === ultimoHoje) st.jdn = agora; ultimoHoje = agora; render(); }
});

// Contexto seguro: https ou http://localhost (permite testar o funcionamento offline localmente).
if ('serviceWorker' in navigator && window.isSecureContext) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
  navigator.serviceWorker.ready.then(() => { if (!navigator.serviceWorker.controller) navigator.serviceWorker.addEventListener('controllerchange', () => guardarLingua(st.lingua), { once: true }); else guardarLingua(st.lingua); });
}
