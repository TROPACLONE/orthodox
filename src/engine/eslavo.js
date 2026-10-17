// Escritas de leitura do eslavo eclesiástico (dec. 5, 29, 38, B3). Especificação, fontes e exemplos:
// docs/conhecimento/10-eslavo-escritas.md. Os dados guardam o eslavo («cu») em escrita civil PRÉ-REFORMA com acentos
// (U+0301), com ѣ, і, ѳ, ѵ e ъ final (docs/esquema-oracoes.md). Daqui geram-se, sem dicionário externo:
//   civil(cu) — escrita civil moderna com acentos, como nos molitvoslovs russos «гражданским шрифтом» (azbyka.ru);
//   izvod(cu) — «Київський ізвод»: o mesmo texto eslavo em letras ucranianas, segundo a pronúncia ucraniana
//               (regras de Віра.Укр / Г. Куземська, conferidas com o modo «Київський ізвод» do Blagovist, ligado à IOU).
// Ambas são puras, O(n) (uma passagem; cada palavra é vista um número constante de vezes) e não tocam na pontuação,
// nos espaços nem nas maiúsculas. Os acentos combinantes seguem a letra que os tinha (no izvod, se a letra desaparece
// ou passa a «й», o acento passa à vogal anterior). Regras marcadas ⚠ no doc. 10 são aproximações não confirmadas.

const ACENTO = '\u0301';
const APOSTROFO = '\u2019';   // como no Blagovist («Расп’я́таго», «і́м’я»)

// Marcas combinantes: acentos (agudo, grave/«варія», «камора») → U+0301; títlos, espíritos, «паерок» e o duplo grave
// do «ѷ» não têm leitura na escrita civil → apagam-se (UTN #41 §4–5). As restantes conservam-se tal como vêm.
const ACENTOS = new Set(['\u0301', '\u0300', '\u0311']);
const APAGAR = new Set(['\u0483', '\u0484', '\u0485', '\u0486', '\u0487', '\u0488', '\u0489', '\u033E', '\u030F', '\uA66F', '\uA67C', '\uA67D']);
const eMarca = c => (c >= '\u0300' && c <= '\u036F') || (c >= '\u0483' && c <= '\u0489') || (c >= '\u2DE0' && c <= '\u2DFF')
  || (c >= '\uA66F' && c <= '\uA67D') || (c >= '\uFE20' && c <= '\uFE2F');
const eLetra = c => !eMarca(c) && ((c >= '\u0400' && c <= '\u052F') || (c >= '\u1C80' && c <= '\u1C8F') || (c >= '\uA640' && c <= '\uA69F'));
const eApostrofo = c => c === '\u2019' || c === "'" || c === '\u02BC';

// Letras próprias da tipografia eslava (se um dia os dados as trouxerem) → letra da ortografia civil pré-reforma.
// Kravetsky & Pletneva, Урок 1 (ї→и, ѕ→з, оу/ꙋ→у, ꙗ/ѧ→я, ѡ/ѻ→о, ѿ→от, ѯ→кс, ѱ→пс, ѷ→и).
const ESLAVAS = {
  'ѡ': 'о', 'ѻ': 'о', 'ѽ': 'о', 'ᲂ': 'о', 'ѿ': 'от', 'ѯ': 'кс', 'ѱ': 'пс', 'ѧ': 'я', 'ꙗ': 'я', 'ѩ': 'я', 'ѕ': 'з', 'ꙁ': 'з',
  'ꙋ': 'у', 'ѹ': 'у', 'ѫ': 'у', 'ѭ': 'ю', 'є': 'е', 'ї': 'і', 'ꙑ': 'ы', 'ѷ': 'и',
};

const maiuscula = s => (s ? s[0].toUpperCase() + s.slice(1) : s);

/** Índice da próxima letra-base a partir de i (salta marcas combinantes), ou -1 se a palavra acabou. */
function proximaBase(s, i) {
  while (i < s.length && eMarca(s[i])) i++;
  return i < s.length && eLetra(s[i]) ? i : -1;
}

// ─────────────────────────────────────────────────────────────── civil ──
// ѣ→е · і/ї→и · ѳ→ф · ѵ→и (→в depois de а/е) · ъ final apaga-se (o ъ interior, separador, mantém-se: «объя́тие»)
// · letras eslavas → civis · nunca «ё» · acentos, maiúsculas e pontuação intactos.

/** Eslavo pré-reforma (dados «cu») → escrita civil moderna com acentos (dec. B3). */
export function civil(cu) {
  if (!cu) return cu ?? '';
  let out = '', ant = '', subir = false;   // ant: letra-base anterior (minúscula) na palavra; subir: «Оу» → «У»
  for (let i = 0; i < cu.length; i++) {
    let c = cu[i];
    if (subir && eLetra(c)) { c = c.toUpperCase(); subir = false; }
    if (eMarca(c)) {
      if (ACENTOS.has(c)) out += ACENTO; else if (!APAGAR.has(c)) out += c;
      continue;
    }
    if (!eLetra(c)) { out += c; ant = ''; continue; }
    const l = c.toLowerCase();
    let r;
    switch (l) {
      case 'ѣ': r = 'е'; break;
      case 'і': case 'ї': r = 'и'; break;
      case 'ѳ': r = 'ф'; break;
      case 'ѵ': r = (ant === 'а' || ant === 'е' || ant === 'є') ? 'в' : 'и'; break;
      case 'ъ': r = proximaBase(cu, i + 1) < 0 ? '' : 'ъ'; break;
      case 'ᲂ': { const p = proximaBase(cu, i + 1); r = p >= 0 && cu[p].toLowerCase() === 'у' ? '' : 'о'; break; }
      case 'о': {   // dígrafo «оу» em início de palavra (tipografia eslava: Оу҆клони́сѧ) → у
        const p = ant ? -1 : proximaBase(cu, i + 1);
        if (p >= 0 && cu[p].toLowerCase() === 'у') { r = ''; subir = l !== c; }
        break;
      }
      default: r = ESLAVAS[l];
    }
    out += r === undefined ? c : (l !== c ? maiuscula(r) : r);
    ant = l;
  }
  return out;
}

// ─────────────────────────────────────────────────────────────── izvod ──
const VOGAIS = new Set('аеєиіїоуыэюяѣ');
const eConsoante = c => c !== undefined && c !== '' && !VOGAIS.has(c) && c !== 'ъ' && c !== 'ь' && c !== 'й' && c !== APOSTROFO;
const LABIAIS = new Set('бпвмф');
const SIBILANTES_VELARES = new Set('кгхжшчщ');   // «твердий/мішаний» radical dos adjetivos (Віра.Укр, «Літера ї» 6–8)
const ANTES_DE_SK = new Set('ьнмрлйвсдт');        // fim de radical antes do sufixo adjetival -ск- (→ -ськ-)
// Prefixos acabados em consoante: labial + я/ю logo a seguir leva apóstrofo, como no ucraniano «розм’якшити»
// (Віра.Укр, «Апостроф»: «після префіксів… згідно із сучасним правописом»; texto: «безм’яте́жен»).
const PREFIXOS_CONSOANTE = new Set(['без', 'безъ', 'раз', 'роз', 'из', 'воз', 'вз', 'низ', 'чрез']);
/** b[k] está na última sílaba da palavra (não há vogal depois)? */
const ultimaSilaba = (b, k) => { for (let j = k + 1; j < b.length; j++) if (VOGAIS.has(b[j])) return false; return true; };

// Palavras inteiras (forma-fonte em minúsculas, sem acentos) com leitura fixa. Valor: uma saída por letra-fonte
// (string do mesmo comprimento, «_» = letra que desaparece; ou lista). Fontes: Віра.Укр, «Літера и» в)–ж), «ъ, ь».
const PALAVRAS = new Map(Object.entries({
  // pronomes «и/их/им» → ї; dativos enclíticos ти/ми → ті/мі; «вси» → всі; «ни» negativo → ні
  'ихъ': 'їх_', 'имъ': 'їм_', 'ихже': 'їхже', 'ими': 'їми', 'ти': 'ті', 'ми': 'мі', 'вси': 'всі', 'ни': 'ні', 'ниже': 'ніже',
  // -и final de nomes onde o ucraniano tem і (gen./dat./loc. sing. e plural) — lista fechada, ⚠ não é regra mecânica
  'земли': 'землі', 'жизни': 'жизні', 'очи': 'очі', 'небеси': 'небесі', 'немощи': 'немощі', 'помощи': 'помощі',
  'заповѣди': 'заповіді', 'души': 'душі', 'дни': 'дні', 'стези': 'стезі', 'вещи': 'вещі', 'двери': 'двері',
  'благодати': 'благодаті', 'друзи': 'друзі', 'врази': 'вразі', 'предтечи': 'предтечі',
  // idem, conferidas no texto de Віра.Укр (orações da manhã e da noite) e do Blagovist (2.ª verificação, fase 2a):
  // nomes fora da exceção K10 (-ть depois de 2 consoantes), plurais e adjetivos curtos no plural
  'плоти': 'плоті', 'нощи': 'нощі', 'полунощи': 'полунощі', 'имени': 'імені', 'матери': 'матері', 'воли': 'волі',
  'мори': 'морі', 'пѣсни': 'пісні', 'ложи': 'ложі', 'сѣти': 'сіті', 'тли': 'тлі', 'кости': 'кості', 'страсти': 'страсті',
  'безпрестани': 'безпрестані', 'готови': 'готові', 'воздвижени': 'воздвижені', 'достойни': 'достойні',
  'вышнихъ': 'вишніх_',
  // idem, 3.ª verificação (fase 2b): conferidas no texto de Віра.Укр dos três cânones, do Послідування e das orações de
  // ação de graças («ка́мені», «Суди́щі», «поста́влені», «Ве́чері», «Кро́ві», «Го́сподеві», «Царе́ві» também em
  // «Молитви ранішні»); dativos -ови/-еви → -ові/-еві; plurais com з/с de г/х (как «друзі»); particípios curtos no plural
  'вечери': 'вечері', 'брани': 'брані', 'добродѣтели': 'добродітелі', 'камени': 'камені', 'капли': 'каплі',
  'пажити': 'пажиті', 'пещи': 'пещі', 'погибели': 'погибелі', 'рабыни': 'рабині', 'сѣни': 'сіні', 'твари': 'тварі',
  'стражи': 'стражі', 'судищи': 'судищі', 'святыни': 'святині', 'князи': 'князі',
  'болѣзни': 'болізні', 'печали': 'печалі', 'крови': 'крові', 'пути': 'путі', 'сами': 'самі',
  'господеви': 'господеві', 'цареви': 'цареві', 'мірови': 'мирові',
  'прилози': 'прилозі', 'патріарси': 'патріарсі', 'поставлени': 'поставлені', 'свободны': 'свободні',
  'богородичны': 'богородичні',
  'предстательницы': 'предстательниці', 'утѣшительницы': 'утішительниці', 'блудницы': 'блудниці',
  // formas fixas do texto de Віра.Укр (fase 2b): «Госпо́днє» (K2 в), «Ко́рмчию», «возопи́й», «кля́тся» (aoristo, não
  // -ться), «постиди́мся» (não é imperativo: K11 não se aplica), «єле́йом»
  'господне': 'господнє', 'кормчію': 'кормчию', 'благій': 'благий', 'возопій': 'возопий', 'клятся': 'клятся', 'постыдимся': 'постидимся',
  'елеомъ': ['є', 'л', 'е', 'йо', 'м', ''],
  // -цы → -ці quando o nominativo singular termina em ц brando; Богородицы/Троицы (Віра.Укр, «Літера ы»)
  'отцы': 'отці', 'тельцы': 'тельці', 'старцы': 'старці', 'богородицы': 'богородиці', 'троицы': 'тройці', 'тысящы': 'тисящі',
  'владычицы': 'владичиці',
  'аминь': 'амінь',
  'есмь': ['є', 'с', 'ьм', ''], 'нѣсмь': ['н', 'і', 'с', 'ьм', ''], 'есмы': ['є', 'сь', 'м', 'и'],
  'возми': ['в', 'о', 'зь', 'м', 'и'], 'возмите': ['в', 'о', 'зь', 'м', 'і', 'т', 'е'],
  'возмитеся': ['в', 'о', 'зь', 'м', 'і', 'т', 'е', 'с', 'я'],
  'вонми': ['в', 'о', 'нь', 'м', 'и'], 'чинми': ['ч', 'и', 'нь', 'м', 'и'],
  'вонмемъ': ['в', 'о', 'нь', 'м', 'е', 'м', ''], 'возмемъ': ['в', 'о', 'зь', 'м', 'е', 'м', ''],
  // imperfeito de «быти» e «вящшій»: sem apóstrofo (Віра.Укр, «Апостроф»)
  'бяхъ': 'бях_', 'бяху': 'бяху', 'бяше': 'бяше', 'бяшу': 'бяшу',
}).map(([k, v]) => [k, Array.isArray(v) ? v : [...v].map(x => (x === '_' ? '' : x))]));

// Homógrafos: o nome da lista acima (по́мощи → по́мощі) e o infinitivo acentuado na última sílaba (помощи́ = «ajudar»,
// que fica com и: «никто́же возмо́жетъ помощи́ намъ» → «помощи́» no texto de Віра.Укр).
const INFINITIVOS = new Set(['помощи']);

// Inícios de palavra com leitura fixa (o resto da palavra segue as regras gerais). Ordem: o primeiro que casa.
const RAIZES = [
  ['іисус', 'іісус'], ['иисус', 'іісус'],          // Іисусъ → «Іісус» (IOU, dec. 30; Blagovist) — ⚠ Віра.Укр: «Ісус»
  ['христіан', 'християн'], ['діакон', 'диякон'], ['діавол', 'диявол'], ['троиц', 'тройц'],
  ['уничиж', 'унічиж'],                               // у + «ни» negativo (Віра.Укр, «Літера и» ж); texto: «унічи́жить»
  ['распя', ['р', 'а', 'с', 'п', APOSTROFO + 'я']], ['вящш', 'вящш'],
  // с- prefixo + labial + я → apóstrofo, como no ucraniano «зв’язаний» (texto de Віра.Укр: «Св’я́зан», «сп’я́ща»)
  ['связ', ['с', 'в' + APOSTROFO, 'я', 'з']], ['спящ', ['с', 'п' + APOSTROFO, 'я', 'щ']],
  // и depois de prefixo terminado em vogal → і, não ї (Віра.Укр, «Літера и» е)
  ['воистин', 'воістин'], ['поистин', 'поістин'], ['преиспод', 'преіспод'], ['преиз', 'преіз'], ['преис', 'преіс'],
  ['мимоид', 'мимоід'], ['многоимен', 'многоімен'], ['неиз', 'неіз'], ['неис', 'неіс'],
  ['неижд', 'неіжд'], ['произв', 'проізв'], ['преим', 'преім'],   // texto de Віра.Укр: «неіждива́ємоє», «проізволе́ніє», «преіму́щий»
  ['наи', 'най'],                                       // наипа́че → найпа́че
  ['николи', 'ніколи'], ['никогда', 'нікогда'], ['ничто', 'нічто'], ['ничесо', 'нічесо'], ['нигдѣ', 'нігді'], ['никто', 'нікто'],
  // е inicial que se lê [е] em palavras gregas/hebraicas (Віра.Укр, «є, е», exceção)
  ['емману', 'емману'], ['еммау', 'еммау'], ['еллад', 'еллад'], ['елемент', 'елемент'],
].map(([k, v]) => [k, Array.isArray(v) ? v : [...v]]);

// Particípios curtos e nomes em -атъ/-ятъ/-итъ que NÃO são verbos de 3.ª pessoa (o ъ cai sem amolecer o т).
const NAO_VERBOS = new Set(['свят', 'распят', 'прият', 'взят', 'зачат', 'отъят', 'объят', 'сжат', 'проклят', 'клят', 'пилат',
  'брат', 'злат', 'щит', 'убит', 'пролит', 'бит', 'повит', 'сокрыт', 'обрат']);

/** O ъ final de b (…тъ) é desinência de 3.ª pessoa do presente/futuro? (Віра.Укр «ъ, ь» б): -тъ → -ть.) ⚠ heurística. */
function verbo3(b) {
  const n = b.length;
  if (n < 4) return false;
  const v = b[n - 3];
  if (v === 'с' && b[n - 4] === 'а' && b[n - 5] === 'д') return true;   // да́стъ, пода́стъ, возда́стъ → -дасть (Віра.Укр: «пода́сть»)
  if (!'еиуюяа'.includes(v)) return false;          // -отъ (живо́тъ), -ѣтъ (свѣ́тъ, завѣ́тъ), -стъ… não são verbos
  return !NAO_VERBOS.has(b.slice(0, n - 1).join('').replace(/і/g, 'и'));   // «прія́тъ» = «прият»
}

/** і de b[k] é a vogal de uma desinência adjetival de radical duro/misto (Віра.Укр, «Літера ї» 6–8: вели́кій → вели́кий,
 *  вся́кія → вся́кия, Бо́жій/Бо́жія/Бо́жіе → Бо́жий/Бо́жия/Бо́жиє; mas Бо́жіей → Бо́жієй)? Heurística ⚠: protege nomes
 *  (Се́ргій, ору́жіе, великоду́шіе, Литургі́я, благополу́чія) e não distingue o plural (Бо́жія повелѣ́нія → «Бо́жия»). */
function desinenciaAdjetival(b, k, acento, nome) {
  const ant = b[k - 1], prox = b[k + 1], n = b.length;
  const fim = prox === 'й' && (k + 2 === n                               // -ій (nom. masc.)
    || (k + 4 === n && b[k + 2] === 'с' && b[k + 3] === 'я'));           // -ійся (particípio reflexo: оболкі́йся → оболки́йся)
  const acusativo = prox === 'ю' && k + 2 === n && ant === 'ж';         // Бо́жію (ac. fem.) → Бо́жию (texto de Віра.Укр)
  const longa = prox === 'и' && k + 2 < n && ant === 'ж';               // Бо́жіимъ, Бо́жіихъ → Бо́жиїм, Бо́жиїх (idem)
  if (!fim && !acusativo && !longa && prox !== 'я' && !(prox === 'е' && b[k + 2] !== 'й')) return false;   // -ія, -іе (não -іей)
  switch (ant) {
    case 'к': return fim || !acento[k] || b[k - 2] === 'с';              // мірскі́я → мирськи́я (sufixo -ск-)
    case 'х': return fim || !acento[k];
    case 'г': return fim ? (!!acento[k] || !nome) : !acento[k];          // благі́й, мно́гій; mas Се́ргій (maiúscula), Литургі́я
    case 'ж': return fim || /(?:^|[^а-я])(?:бож|враж)$/.test(b.slice(0, k).join(''));
    case 'щ': return fim || !acento[k];                                  // бу́дущія, гряду́щіе
    case 'ш': return fim || ('йдв'.includes(b[k - 2]) && !acento[k]);    // честнѣ́йшія, преше́дшія → -шия; mas малоду́шія
    default: return fim;                                                 // ч: só -ій
  }
}

/** Leitura ucraniana da letra b[k] (minúscula), dadas as vizinhas. `sobre` recebe saídas impostas a letras seguintes. */
function regra(b, k, acento, sobre, nome) {
  const n = b.length, c = b[k], ant = k > 0 ? b[k - 1] : '', prox = k + 1 < n ? b[k + 1] : '';
  switch (c) {
    case 'ѣ': return k === 0 || VOGAIS.has(ant) ? 'ї' : 'і';                       // ѣ = і (ї em início/após vogal)
    case 'е': return k === 0 || VOGAIS.has(ant) || ant === 'ъ' || ant === 'ь' || ant === APOSTROFO ? 'є' : 'е';
    case 'и':
      if (n === 1) return acento[0] ? 'ї' : 'і';                                  // «и» conjunção → і; «и́» pronome → ї ⚠
      if (k === 0) return 'і';                                                     // início de palavra
      if (k >= 3 && (ant === 'и' || ant === 'і') && b[k - 2] === 'р' && b[k - 3] === 'п') return 'й';   // при+и → прий
      if (VOGAIS.has(ant)) return 'ї';                                             // твои́ → твої́
      if (acento[k] && ((k === n - 3 && b[n - 2] === 'т' && b[n - 1] === 'е')        // imperativo -и́те → -і́те
        || (k === n - 5 && b[n - 4] === 'т' && b[n - 3] === 'е' && b[n - 2] === 'с' && b[n - 1] === 'я')   // -и́теся
        || (k === n - 4 && b[n - 3] === 'м' && b[n - 2] === 'с' && b[n - 1] === 'я'))) return 'і';   // -и́мся → -і́мся ⚠
      return 'и';
    case 'і':
      if (VOGAIS.has(ant) && prox === 'а') { sobre[k + 1] = ''; return 'я'; }     // Иса́іа → Іса́я, аллилу́іа → аллилу́я
      if (VOGAIS.has(ant)) return 'ї';                                             // шу́ія → шу́їя (texto de Віра.Укр)
      if (k >= 2 && ant === 'р' && 'пвх'.includes(b[k - 2]) && VOGAIS.has(prox)) return 'и';   // прі-, врі-, хрі- → при-…
      if (SIBILANTES_VELARES.has(ant) && desinenciaAdjetival(b, k, acento, nome)) return 'и';
      if (k > 0 && eConsoante(ant) && eConsoante(prox)) return 'и';               // між приголосними: міръ → мир
      return 'і';
    case 'ы': return 'и';
    case 'ѵ': return k === 0 ? 'і' : ('аеє'.includes(ant) ? 'в' : 'и');
    case 'ѳ': return 'ф';
    case 'ъ':
      if (k === n - 1) return ant === 'ц' || (ant === 'т' && verbo3(b)) ? 'ь' : '';   // оте́цъ → оте́ць, бу́детъ → бу́деть
      return prox === 'е' || prox === 'я' || prox === 'ю' ? APOSTROFO : '';
    case 'ь':
      if (LABIAIS.has(ant) || ant === 'р') return prox === 'е' || prox === 'я' || prox === 'ю' || prox === 'і' ? APOSTROFO : '';
      return 'жчшщ'.includes(ant) ? '' : 'ь';
    case 'а':
      if (ant === 'ц' && k >= 2 && ultimaSilaba(b, k)) return 'я';                 // Отца́ → Отця́; mas немерца́ющимъ
      if (k === n - 1 && k >= 2 && (ant === 'і' || ant === 'е')) return 'я';        // Марі́а → Марі́я, Іуде́а → Іуде́я ⚠
      return 'а';
    case 'у': return ant === 'ц' && k >= 2 && ultimaSilaba(b, k) ? 'ю' : 'у';      // Отцу́ → Отцю́ ⚠
    case 'т': return k === n - 3 && prox === 'с' && b[k + 2] === 'я' ? 'ть' : 'т';  // -тся → -ться
    case 'с':
      if (prox === 'к' && VOGAIS.has(b[k + 2]) && k >= 3
        && (ANTES_DE_SK.has(ant) || (ant === 'е' && b[k - 2] === 'ч'))) return ant === 'с' ? 'ь' : 'сь';   // -ческ- → -чеськ-
      return 'с';
    case 'ц': return prox === 'к' && VOGAIS.has(b[k + 2]) && k >= 1 ? 'ць' : 'ц';
    case 'з':                                                                      // ме́рзкаго → ме́рзькаго (texto de Віра.Укр);
      return prox === 'к' && VOGAIS.has(b[k + 2]) && k >= 3                        // não no fim de prefixo (безконе́чный)
        && !PREFIXOS_CONSOANTE.has(b.slice(0, k + 1).join('')) ? 'зь' : 'з';
    default:
      if (LABIAIS.has(c) && (prox === 'я' || prox === 'ю')
        && (k === 0 || VOGAIS.has(ant) || ant === 'р' || PREFIXOS_CONSOANTE.has(b.slice(0, k).join('')))) return c + APOSTROFO;
      return c;
  }
}

/** Converte uma palavra (s[a..z), letras + marcas + apóstrofos) para o izvod. */
function palavraIzvod(s, a, z) {
  const b = [], mai = [], acento = [], extra = [];
  let maiusculaSeguinte = false;
  for (let i = a; i < z; i++) {
    const c = s[i];
    if (eMarca(c)) {
      const k = b.length - 1;                  // a palavra começa sempre por letra: k ≥ 0
      if (ACENTOS.has(c)) acento[k] = true;
      else if (!APAGAR.has(c)) extra[k] = (extra[k] ?? '') + c;
      continue;
    }
    if (eApostrofo(c)) { b.push(APOSTROFO); mai.push(false); continue; }
    const l = c.toLowerCase();
    if (l === 'ᲂ' || (l === 'о' && b.length === 0)) {   // «ᲂу» e «Оу» inicial (tipografia eslava) → у
      const p = proximaBase(s, i + 1);
      if (p >= 0 && p < z && s[p].toLowerCase() === 'у') { if (l !== c) maiusculaSeguinte = true; continue; }
    }
    const e = ESLAVAS[l] ?? l;
    for (let j = 0; j < e.length; j++) { b.push(e[j]); mai.push(j === 0 && (l !== c || maiusculaSeguinte)); }
    maiusculaSeguinte = false;
  }
  const n = b.length;
  let letras = 0, maiusculas = 0;
  for (let k = 0; k < n; k++) if (b[k] !== APOSTROFO) { letras++; if (mai[k]) maiusculas++; }
  const tudoMaiusculas = letras > 1 && maiusculas === letras;

  const chave = b.join('');
  const sobre = new Array(n);
  const fixa = INFINITIVOS.has(chave) && acento[n - 1] ? undefined : PALAVRAS.get(chave);
  if (fixa) for (let k = 0; k < n; k++) sobre[k] = fixa[k];
  else for (const [raiz, saida] of RAIZES) {
    if (chave.startsWith(raiz)) { for (let k = 0; k < raiz.length; k++) sobre[k] = saida[k]; break; }
  }

  let out = '';
  for (let k = 0; k < n; k++) {
    let t = sobre[k] !== undefined ? sobre[k] : regra(b, k, acento, sobre, mai[0]);
    if (tudoMaiusculas) t = t.toUpperCase(); else if (mai[k]) t = maiuscula(t);
    if (acento[k] && (t === '' || t === 'й' || t === 'Й')) {
      // a letra acentuada desapareceu ou passou a «й» (прии́детъ → при́йдеть): o acento passa à vogal anterior
      let p = out.length - 1;
      while (p >= 0 && !VOGAIS.has(out[p].toLowerCase())) p--;
      out = p < 0 ? out + t + ACENTO : out.slice(0, p + 1) + ACENTO + out.slice(p + 1) + t;
    } else out += acento[k] ? t + ACENTO : t;
    if (extra[k]) out += extra[k];
  }
  return out;
}

/** Eslavo pré-reforma (dados «cu») → «Київський ізвод» (eslavo em letras ucranianas; dec. 38). */
export function izvod(cu) {
  if (!cu) return cu ?? '';
  let out = '', i = 0;
  const n = cu.length;
  while (i < n) {
    if (!eLetra(cu[i])) { out += eMarca(cu[i]) ? (ACENTOS.has(cu[i]) ? ACENTO : APAGAR.has(cu[i]) ? '' : cu[i]) : cu[i]; i++; continue; }
    let j = i + 1;
    while (j < n && (eLetra(cu[j]) || eMarca(cu[j]) || (eApostrofo(cu[j]) && j + 1 < n && eLetra(cu[j + 1])))) j++;
    out += palavraIzvod(cu, i, j);
    i = j;
  }
  return out;
}
