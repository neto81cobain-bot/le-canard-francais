// Motor de conjugação francesa: ~130 verbos × 10 tempos.
// Regulares são gerados por regra; irregulares trazem só o que foge da regra.

// ─── TEMPOS ───────────────────────────────────────────────
export const TENSES = [
  { id: 'present', name: 'Présent', pt: 'Presente', level: 'A1', desc: 'Ações atuais e hábitos: *je parle* = eu falo.' },
  { id: 'passe_compose', name: 'Passé composé', pt: 'Passado (pretérito perfeito)', level: 'A2', desc: 'Ação concluída no passado: *j\'ai parlé* = eu falei.' },
  { id: 'imperatif', name: 'Impératif', pt: 'Imperativo', level: 'A2', desc: 'Ordens e pedidos: *parle !* = fale!' },
  { id: 'imparfait', name: 'Imparfait', pt: 'Pretérito imperfeito', level: 'B1', desc: 'Descrições e hábitos no passado: *je parlais* = eu falava.' },
  { id: 'futur', name: 'Futur simple', pt: 'Futuro', level: 'B1', desc: 'Futuro: *je parlerai* = eu falarei.' },
  { id: 'conditionnel', name: 'Conditionnel présent', pt: 'Futuro do pretérito', level: 'B1', desc: 'Hipóteses e pedidos educados: *je parlerais* = eu falaria.' },
  { id: 'subjonctif', name: 'Subjonctif présent', pt: 'Subjuntivo presente', level: 'B1', desc: 'Depois de *il faut que*, *je veux que*…: *que je parle* = que eu fale.' },
  { id: 'plus_que_parfait', name: 'Plus-que-parfait', pt: 'Mais-que-perfeito', level: 'B2', desc: 'Passado anterior a outro passado: *j\'avais parlé* = eu tinha falado.' },
  { id: 'futur_anterieur', name: 'Futur antérieur', pt: 'Futuro composto', level: 'B2', desc: 'Ação concluída antes de outra no futuro: *j\'aurai parlé* = eu terei falado.' },
  { id: 'conditionnel_passe', name: 'Conditionnel passé', pt: 'Futuro do pretérito composto', level: 'B2', desc: 'Hipótese no passado: *j\'aurais parlé* = eu teria falado.' },
];

export const PERSONS = ['je', 'tu', 'il/elle', 'nous', 'vous', 'ils/elles'];
const REFLEX = ['me', 'te', 'se', 'nous', 'vous', 'se'];

// ─── LISTA DE VERBOS ──────────────────────────────────────
// m: modelo (er | ir | re | irr) · aux: 'etre' se usa être · pp: particípio
// strong: radical forte (je/tu/il/ils) · fut: radical do futuro · pres: presente irregular
const V = (inf, pt, level, extra = {}) => ({ inf, pt, level, m: 'er', ...extra });

const RAW = [
  // ── -ER regulares ──
  V('parler', 'falar', 'A1', { top: true }),
  V('aimer', 'amar, gostar', 'A1', { top: true }),
  V('habiter', 'morar', 'A1'),
  V('travailler', 'trabalhar', 'A1', { top: true }),
  V('manger', 'comer', 'A1', { top: true }),
  V('commencer', 'começar', 'A2'),
  V('chanter', 'cantar', 'A1'),
  V('danser', 'dançar', 'A1'),
  V('regarder', 'olhar, assistir', 'A1'),
  V('écouter', 'escutar', 'A1'),
  V('jouer', 'jogar, brincar, tocar', 'A1'),
  V('donner', 'dar', 'A1', { top: true }),
  V('trouver', 'encontrar, achar', 'A2', { top: true }),
  V('penser', 'pensar', 'A2', { top: true }),
  V('chercher', 'procurar', 'A1'),
  V('demander', 'pedir, perguntar', 'A2', { top: true }),
  V('arriver', 'chegar', 'A1', { aux: 'etre', top: true }),
  V('entrer', 'entrar', 'A2', { aux: 'etre' }),
  V('rester', 'ficar', 'A2', { aux: 'etre' }),
  V('tomber', 'cair', 'A2', { aux: 'etre' }),
  V('monter', 'subir', 'A2', { aux: 'etre' }),
  V('rentrer', 'voltar (para casa)', 'A2', { aux: 'etre' }),
  V('passer', 'passar', 'A2', { top: true }),
  V('porter', 'usar, carregar', 'A2'),
  V('montrer', 'mostrar', 'A2'),
  V('oublier', 'esquecer', 'A2'),
  V('préparer', 'preparar', 'A1'),
  V('visiter', 'visitar', 'A1'),
  V('voyager', 'viajar', 'A1'),
  V('nager', 'nadar', 'A2'),
  V('changer', 'mudar, trocar', 'B1'),
  V('étudier', 'estudar', 'A1'),
  V('utiliser', 'usar, utilizar', 'B1'),
  V('laisser', 'deixar', 'B1', { top: true }),
  V('garder', 'guardar', 'B1'),
  V('fermer', 'fechar', 'A2'),
  V('apporter', 'trazer', 'A2'),
  V('gagner', 'ganhar', 'A2'),
  V('aider', 'ajudar', 'A2'),
  V('marcher', 'andar, caminhar, funcionar', 'A2'),
  V('coûter', 'custar', 'A1'),
  V('rêver', 'sonhar', 'B1'),
  V('pleurer', 'chorar', 'B1'),
  V('raconter', 'contar', 'B1'),
  V('téléphoner', 'telefonar', 'A2'),
  V('cuisiner', 'cozinhar', 'A2'),
  V('décider', 'decidir', 'B1'),
  V('expliquer', 'explicar', 'B1'),
  V('continuer', 'continuar', 'B1'),
  V('arrêter', 'parar', 'B1'),
  V('sembler', 'parecer', 'B2'),
  V('accepter', 'aceitar', 'B1'),
  V('annoncer', 'anunciar', 'B2'),
  V('remercier', 'agradecer', 'B1'),
  V('souhaiter', 'desejar', 'B1'),
  V('prier', 'rezar, pedir (formal)', 'C1'),
  V('tourner', 'virar, girar', 'A2'),
  V('traverser', 'atravessar', 'A2'),
  V('quitter', 'deixar, sair de', 'B1'),
  V('inviter', 'convidar', 'A2'),
  V('réserver', 'reservar', 'A2'),
  V('rencontrer', 'encontrar, conhecer', 'A2'),
  V('présenter', 'apresentar', 'B1'),
  V('organiser', 'organizar', 'B1'),
  V('oser', 'ousar', 'C1'),
  V('avouer', 'confessar', 'C1'),
  V('nier', 'negar', 'C1'),
  V('ajouter', 'acrescentar', 'B2'),
  V('remarquer', 'notar, perceber', 'B2'),
  V('profiter', 'aproveitar', 'B1'),
  V('déménager', 'mudar de casa', 'B1'),
  V('partager', 'compartilhar', 'B1'),
  V('protéger', 'proteger', 'B2', { strong: 'protèg' }),
  V('lancer', 'lançar, jogar', 'B2'),
  V('placer', 'colocar', 'B2'),
  V('employer', 'empregar, usar', 'B2', { strong: 'emploi', fut: 'emploier' }),
  V('s\'ennuyer', 'entediar-se', 'B2', { refl: true, strong: 'ennui', fut: 'ennuier' }),
  V('s\'inquiéter', 'preocupar-se', 'B2', { refl: true, strong: 'inquièt' }),
  V('s\'occuper', 'cuidar, ocupar-se', 'B1', { refl: true }),
  V('discuter', 'conversar, discutir', 'B1'),
  V('essayer', 'tentar, experimentar', 'A2', { strong: 'essai', fut: 'essaier' }),
  V('payer', 'pagar', 'A2', { strong: 'pai', fut: 'paier' }),
  V('envoyer', 'enviar', 'A2', { strong: 'envoi', fut: 'enverr' }),
  V('nettoyer', 'limpar', 'B1', { strong: 'nettoi', fut: 'nettoier' }),
  V('acheter', 'comprar', 'A1', { strong: 'achèt', fut: 'achèter' }),
  V('lever', 'levantar', 'A2', { strong: 'lèv', fut: 'lèver' }),
  V('préférer', 'preferir', 'A2', { strong: 'préfèr' }),
  V('espérer', 'esperar (ter esperança)', 'B1', { strong: 'espèr' }),
  V('répéter', 'repetir', 'A2', { strong: 'répèt' }),
  V('appeler', 'chamar, ligar', 'A2', { strong: 'appell', fut: 'appeller' }),
  V('jeter', 'jogar fora', 'B1', { strong: 'jett', fut: 'jetter' }),
  // ── pronominais ──
  V('se lever', 'levantar-se', 'A2', { refl: true, strong: 'lèv', fut: 'lèver' }),
  V('se réveiller', 'acordar', 'A2', { refl: true }),
  V('se coucher', 'deitar-se', 'A2', { refl: true }),
  V('s\'habiller', 'vestir-se', 'A2', { refl: true }),
  V('se promener', 'passear', 'B1', { refl: true, strong: 'promèn', fut: 'promèner' }),
  V('se dépêcher', 'apressar-se', 'B1', { refl: true }),
  V('s\'amuser', 'divertir-se', 'B1', { refl: true }),
  V('s\'appeler', 'chamar-se', 'A1', { refl: true, strong: 'appell', fut: 'appeller' }),
  V('se laver', 'lavar-se', 'A2', { refl: true }),
  V('se reposer', 'descansar', 'B1', { refl: true }),
  V('se marier', 'casar-se', 'B1', { refl: true }),
  V('se tromper', 'enganar-se, errar', 'B2', { refl: true }),
  // ── -IR (tipo finir) ──
  V('finir', 'terminar', 'A2', { m: 'ir', top: true }),
  V('choisir', 'escolher', 'A2', { m: 'ir' }),
  V('réussir', 'conseguir, passar', 'B1', { m: 'ir' }),
  V('grandir', 'crescer', 'B1', { m: 'ir' }),
  V('réfléchir', 'refletir, pensar bem', 'B1', { m: 'ir' }),
  V('remplir', 'encher, preencher', 'B1', { m: 'ir' }),
  V('obéir', 'obedecer', 'B2', { m: 'ir' }),
  V('réagir', 'reagir', 'B2', { m: 'ir' }),
  V('grossir', 'engordar', 'B1', { m: 'ir' }),
  V('maigrir', 'emagrecer', 'B1', { m: 'ir' }),
  // ── -RE (tipo vendre) ──
  V('vendre', 'vender', 'A2', { m: 're' }),
  V('attendre', 'esperar, aguardar', 'A2', { m: 're', top: true }),
  V('répondre', 'responder', 'A2', { m: 're' }),
  V('perdre', 'perder', 'A2', { m: 're' }),
  V('entendre', 'ouvir', 'A2', { m: 're', top: true }),
  V('descendre', 'descer', 'A2', { m: 're', aux: 'etre' }),
  V('rendre', 'devolver, tornar', 'B1', { m: 're' }),
  // ── IRREGULARES ──
  { inf: 'être', pt: 'ser, estar', level: 'A1', m: 'irr', top: true, pres: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], pp: 'été', fut: 'ser', imp: 'ét', subj: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'], impv: ['sois', 'soyons', 'soyez'] },
  { inf: 'avoir', pt: 'ter', level: 'A1', m: 'irr', top: true, pres: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], pp: 'eu', fut: 'aur', subj: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'], impv: ['aie', 'ayons', 'ayez'] },
  { inf: 'aller', pt: 'ir', level: 'A1', m: 'irr', top: true, aux: 'etre', pres: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], pp: 'allé', fut: 'ir', subj: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'], impv: ['va', 'allons', 'allez'] },
  { inf: 'faire', pt: 'fazer', level: 'A1', m: 'irr', top: true, pres: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], pp: 'fait', fut: 'fer', subj: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'] },
  { inf: 'pouvoir', pt: 'poder', level: 'A2', m: 'irr', top: true, pres: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], pp: 'pu', fut: 'pourr', subj: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'], impv: null },
  { inf: 'vouloir', pt: 'querer', level: 'A2', m: 'irr', top: true, pres: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], pp: 'voulu', fut: 'voudr', subj: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'], impv: ['veuille', 'veuillons', 'veuillez'] },
  { inf: 'savoir', pt: 'saber', level: 'A2', m: 'irr', top: true, pres: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], pp: 'su', fut: 'saur', subj: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'], impv: ['sache', 'sachons', 'sachez'] },
  { inf: 'devoir', pt: 'dever, ter que', level: 'A2', m: 'irr', top: true, pres: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'], pp: 'dû', fut: 'devr', impv: null },
  { inf: 'venir', pt: 'vir', level: 'A1', m: 'irr', top: true, aux: 'etre', pres: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], pp: 'venu', fut: 'viendr' },
  { inf: 'revenir', pt: 'voltar', level: 'A2', m: 'irr', aux: 'etre', pres: ['reviens', 'reviens', 'revient', 'revenons', 'revenez', 'reviennent'], pp: 'revenu', fut: 'reviendr' },
  { inf: 'devenir', pt: 'tornar-se', level: 'B1', m: 'irr', aux: 'etre', pres: ['deviens', 'deviens', 'devient', 'devenons', 'devenez', 'deviennent'], pp: 'devenu', fut: 'deviendr' },
  { inf: 'tenir', pt: 'segurar', level: 'B1', m: 'irr', pres: ['tiens', 'tiens', 'tient', 'tenons', 'tenez', 'tiennent'], pp: 'tenu', fut: 'tiendr' },
  { inf: 'obtenir', pt: 'obter', level: 'B2', m: 'irr', pres: ['obtiens', 'obtiens', 'obtient', 'obtenons', 'obtenez', 'obtiennent'], pp: 'obtenu', fut: 'obtiendr' },
  { inf: 'se souvenir', pt: 'lembrar-se', level: 'B1', m: 'irr', refl: true, pres: ['souviens', 'souviens', 'souvient', 'souvenons', 'souvenez', 'souviennent'], pp: 'souvenu', fut: 'souviendr' },
  { inf: 'prendre', pt: 'pegar, tomar', level: 'A1', m: 'irr', top: true, pres: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], pp: 'pris' },
  { inf: 'apprendre', pt: 'aprender', level: 'A1', m: 'irr', pres: ['apprends', 'apprends', 'apprend', 'apprenons', 'apprenez', 'apprennent'], pp: 'appris' },
  { inf: 'comprendre', pt: 'entender, compreender', level: 'A1', m: 'irr', top: true, pres: ['comprends', 'comprends', 'comprend', 'comprenons', 'comprenez', 'comprennent'], pp: 'compris' },
  { inf: 'mettre', pt: 'pôr, colocar', level: 'A2', m: 'irr', top: true, pres: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], pp: 'mis' },
  { inf: 'promettre', pt: 'prometer', level: 'B1', m: 'irr', pres: ['promets', 'promets', 'promet', 'promettons', 'promettez', 'promettent'], pp: 'promis' },
  { inf: 'permettre', pt: 'permitir', level: 'B1', m: 'irr', pres: ['permets', 'permets', 'permet', 'permettons', 'permettez', 'permettent'], pp: 'permis' },
  { inf: 'dire', pt: 'dizer', level: 'A1', m: 'irr', top: true, pres: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], pp: 'dit' },
  { inf: 'lire', pt: 'ler', level: 'A1', m: 'irr', pres: ['lis', 'lis', 'lit', 'lisons', 'lisez', 'lisent'], pp: 'lu' },
  { inf: 'écrire', pt: 'escrever', level: 'A1', m: 'irr', pres: ['écris', 'écris', 'écrit', 'écrivons', 'écrivez', 'écrivent'], pp: 'écrit' },
  { inf: 'voir', pt: 'ver', level: 'A1', m: 'irr', top: true, pres: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], pp: 'vu', fut: 'verr' },
  { inf: 'croire', pt: 'crer, acreditar', level: 'B1', m: 'irr', pres: ['crois', 'crois', 'croit', 'croyons', 'croyez', 'croient'], pp: 'cru' },
  { inf: 'boire', pt: 'beber', level: 'A1', m: 'irr', pres: ['bois', 'bois', 'boit', 'buvons', 'buvez', 'boivent'], pp: 'bu' },
  { inf: 'connaître', pt: 'conhecer', level: 'A2', m: 'irr', top: true, pres: ['connais', 'connais', 'connaît', 'connaissons', 'connaissez', 'connaissent'], pp: 'connu' },
  { inf: 'reconnaître', pt: 'reconhecer', level: 'B1', m: 'irr', pres: ['reconnais', 'reconnais', 'reconnaît', 'reconnaissons', 'reconnaissez', 'reconnaissent'], pp: 'reconnu' },
  { inf: 'partir', pt: 'partir, sair, ir embora', level: 'A2', m: 'irr', aux: 'etre', pres: ['pars', 'pars', 'part', 'partons', 'partez', 'partent'], pp: 'parti' },
  { inf: 'sortir', pt: 'sair', level: 'A2', m: 'irr', aux: 'etre', pres: ['sors', 'sors', 'sort', 'sortons', 'sortez', 'sortent'], pp: 'sorti' },
  { inf: 'dormir', pt: 'dormir', level: 'A1', m: 'irr', pres: ['dors', 'dors', 'dort', 'dormons', 'dormez', 'dorment'], pp: 'dormi' },
  { inf: 'sentir', pt: 'sentir, cheirar', level: 'B1', m: 'irr', pres: ['sens', 'sens', 'sent', 'sentons', 'sentez', 'sentent'], pp: 'senti' },
  { inf: 'servir', pt: 'servir', level: 'B1', m: 'irr', pres: ['sers', 'sers', 'sert', 'servons', 'servez', 'servent'], pp: 'servi' },
  { inf: 'ouvrir', pt: 'abrir', level: 'A2', m: 'irr', pres: ['ouvre', 'ouvres', 'ouvre', 'ouvrons', 'ouvrez', 'ouvrent'], pp: 'ouvert' },
  { inf: 'offrir', pt: 'oferecer, presentear', level: 'B1', m: 'irr', pres: ['offre', 'offres', 'offre', 'offrons', 'offrez', 'offrent'], pp: 'offert' },
  { inf: 'découvrir', pt: 'descobrir', level: 'B1', m: 'irr', pres: ['découvre', 'découvres', 'découvre', 'découvrons', 'découvrez', 'découvrent'], pp: 'découvert' },
  { inf: 'recevoir', pt: 'receber', level: 'B1', m: 'irr', pres: ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'], pp: 'reçu', fut: 'recevr' },
  { inf: 'vivre', pt: 'viver', level: 'A2', m: 'irr', pres: ['vis', 'vis', 'vit', 'vivons', 'vivez', 'vivent'], pp: 'vécu' },
  { inf: 'suivre', pt: 'seguir', level: 'B1', m: 'irr', pres: ['suis', 'suis', 'suit', 'suivons', 'suivez', 'suivent'], pp: 'suivi' },
  { inf: 'courir', pt: 'correr', level: 'A2', m: 'irr', pres: ['cours', 'cours', 'court', 'courons', 'courez', 'courent'], pp: 'couru', fut: 'courr' },
  { inf: 'mourir', pt: 'morrer', level: 'B1', m: 'irr', aux: 'etre', pres: ['meurs', 'meurs', 'meurt', 'mourons', 'mourez', 'meurent'], pp: 'mort', fut: 'mourr' },
  { inf: 'naître', pt: 'nascer', level: 'A2', m: 'irr', aux: 'etre', pres: ['nais', 'nais', 'naît', 'naissons', 'naissez', 'naissent'], pp: 'né' },
  { inf: 'conduire', pt: 'dirigir, conduzir', level: 'A2', m: 'irr', pres: ['conduis', 'conduis', 'conduit', 'conduisons', 'conduisez', 'conduisent'], pp: 'conduit' },
  { inf: 'construire', pt: 'construir', level: 'B1', m: 'irr', pres: ['construis', 'construis', 'construit', 'construisons', 'construisez', 'construisent'], pp: 'construit' },
  { inf: 'traduire', pt: 'traduzir', level: 'B1', m: 'irr', pres: ['traduis', 'traduis', 'traduit', 'traduisons', 'traduisez', 'traduisent'], pp: 'traduit' },
  { inf: 'produire', pt: 'produzir', level: 'B2', m: 'irr', pres: ['produis', 'produis', 'produit', 'produisons', 'produisez', 'produisent'], pp: 'produit' },
  { inf: 'plaire', pt: 'agradar', level: 'B1', m: 'irr', pres: ['plais', 'plais', 'plaît', 'plaisons', 'plaisez', 'plaisent'], pp: 'plu' },
  { inf: 'rire', pt: 'rir', level: 'B1', m: 'irr', pres: ['ris', 'ris', 'rit', 'rions', 'riez', 'rient'], pp: 'ri' },
  { inf: 'sourire', pt: 'sorrir', level: 'B1', m: 'irr', pres: ['souris', 'souris', 'sourit', 'sourions', 'souriez', 'sourient'], pp: 'souri' },
  { inf: 'craindre', pt: 'temer', level: 'B2', m: 'irr', pres: ['crains', 'crains', 'craint', 'craignons', 'craignez', 'craignent'], pp: 'craint' },
  { inf: 'peindre', pt: 'pintar', level: 'B2', m: 'irr', pres: ['peins', 'peins', 'peint', 'peignons', 'peignez', 'peignent'], pp: 'peint' },
  { inf: 'éteindre', pt: 'apagar (luz)', level: 'B1', m: 'irr', pres: ['éteins', 'éteins', 'éteint', 'éteignons', 'éteignez', 'éteignent'], pp: 'éteint' },
  { inf: 'battre', pt: 'bater', level: 'B2', m: 'irr', pres: ['bats', 'bats', 'bat', 'battons', 'battez', 'battent'], pp: 'battu' },
  { inf: 'interrompre', pt: 'interromper', level: 'B2', m: 'irr', pres: ['interromps', 'interromps', 'interrompt', 'interrompons', 'interrompez', 'interrompent'], pp: 'interrompu' },
  { inf: 'convaincre', pt: 'convencer', level: 'B2', m: 'irr', pres: ['convaincs', 'convaincs', 'convainc', 'convainquons', 'convainquez', 'convainquent'], pp: 'convaincu' },
  { inf: 's\'asseoir', pt: 'sentar-se', level: 'B1', m: 'irr', refl: true, pres: ['assieds', 'assieds', 'assied', 'asseyons', 'asseyez', 'asseyent'], pp: 'assis', fut: 'assiér', impv: ['assieds-toi', 'asseyons-nous', 'asseyez-vous'] },
  { inf: 'valoir', pt: 'valer', level: 'B2', m: 'irr', pres: ['vaux', 'vaux', 'vaut', 'valons', 'valez', 'valent'], pp: 'valu', fut: 'vaudr', subj: ['vaille', 'vailles', 'vaille', 'valions', 'valiez', 'vaillent'], impv: null },
  { inf: 'résoudre', pt: 'resolver', level: 'B2', m: 'irr', pres: ['résous', 'résous', 'résout', 'résolvons', 'résolvez', 'résolvent'], pp: 'résolu' },
  { inf: 'apercevoir', pt: 'perceber, avistar', level: 'B2', m: 'irr', pres: ['aperçois', 'aperçois', 'aperçoit', 'apercevons', 'apercevez', 'aperçoivent'], pp: 'aperçu', fut: 'apercevr' },
  { inf: 'se taire', pt: 'calar-se', level: 'B2', m: 'irr', refl: true, pres: ['tais', 'tais', 'tait', 'taisons', 'taisez', 'taisent'], pp: 'tu' },
  { inf: 'se plaindre', pt: 'queixar-se', level: 'B2', m: 'irr', refl: true, pres: ['plains', 'plains', 'plaint', 'plaignons', 'plaignez', 'plaignent'], pp: 'plaint' },
  { inf: 'se sentir', pt: 'sentir-se', level: 'A2', m: 'irr', refl: true, pres: ['sens', 'sens', 'sent', 'sentons', 'sentez', 'sentent'], pp: 'senti' },
  { inf: 'atteindre', pt: 'atingir, alcançar', level: 'C1', m: 'irr', pres: ['atteins', 'atteins', 'atteint', 'atteignons', 'atteignez', 'atteignent'], pp: 'atteint' },
  { inf: 'acquérir', pt: 'adquirir', level: 'C1', m: 'irr', pres: ['acquiers', 'acquiers', 'acquiert', 'acquérons', 'acquérez', 'acquièrent'], pp: 'acquis', fut: 'acquerr' },
  { inf: 'émouvoir', pt: 'comover', level: 'C1', m: 'irr', pres: ['émeus', 'émeus', 'émeut', 'émouvons', 'émouvez', 'émeuvent'], pp: 'ému', fut: 'émouvr' },
  { inf: 'vaincre', pt: 'vencer', level: 'C1', m: 'irr', pres: ['vaincs', 'vaincs', 'vainc', 'vainquons', 'vainquez', 'vainquent'], pp: 'vaincu' },
  { inf: 'accueillir', pt: 'acolher, receber', level: 'B2', m: 'irr', pres: ['accueille', 'accueilles', 'accueille', 'accueillons', 'accueillez', 'accueillent'], pp: 'accueilli', fut: 'accueiller' },
  { inf: 'cueillir', pt: 'colher', level: 'B2', m: 'irr', pres: ['cueille', 'cueilles', 'cueille', 'cueillons', 'cueillez', 'cueillent'], pp: 'cueilli', fut: 'cueiller' },
  { inf: 'fuir', pt: 'fugir', level: 'B2', m: 'irr', pres: ['fuis', 'fuis', 'fuit', 'fuyons', 'fuyez', 'fuient'], pp: 'fui' },
  { inf: 'mentir', pt: 'mentir', level: 'B1', m: 'irr', pres: ['mens', 'mens', 'ment', 'mentons', 'mentez', 'mentent'], pp: 'menti' },
  { inf: 'se rendre compte', pt: 'perceber, dar-se conta', level: 'B2', m: 're', refl: true, suffix: ' compte', noAgree: true },
  { inf: 'appartenir', pt: 'pertencer', level: 'C1', m: 'irr', pres: ['appartiens', 'appartiens', 'appartient', 'appartenons', 'appartenez', 'appartiennent'], pp: 'appartenu', fut: 'appartiendr' },
  { inf: 'soutenir', pt: 'apoiar, sustentar', level: 'C1', m: 'irr', pres: ['soutiens', 'soutiens', 'soutient', 'soutenons', 'soutenez', 'soutiennent'], pp: 'soutenu', fut: 'soutiendr' },
  { inf: 'prévoir', pt: 'prever', level: 'C1', m: 'irr', pres: ['prévois', 'prévois', 'prévoit', 'prévoyons', 'prévoyez', 'prévoient'], pp: 'prévu', fut: 'prévoir' },
  { inf: 'décevoir', pt: 'decepcionar', level: 'C1', m: 'irr', pres: ['déçois', 'déçois', 'déçoit', 'décevons', 'décevez', 'déçoivent'], pp: 'déçu', fut: 'décevr' },
  { inf: 'paraître', pt: 'parecer', level: 'C1', m: 'irr', pres: ['parais', 'parais', 'paraît', 'paraissons', 'paraissez', 'paraissent'], pp: 'paru' },
  { inf: 'disparaître', pt: 'desaparecer', level: 'B2', m: 'irr', pres: ['disparais', 'disparais', 'disparaît', 'disparaissons', 'disparaissez', 'disparaissent'], pp: 'disparu' },
  { inf: 'se battre', pt: 'lutar, brigar', level: 'C1', m: 'irr', refl: true, pres: ['bats', 'bats', 'bat', 'battons', 'battez', 'battent'], pp: 'battu' },
  { inf: 'se distraire', pt: 'distrair-se', level: 'C1', m: 'irr', refl: true, pres: ['distrais', 'distrais', 'distrait', 'distrayons', 'distrayez', 'distraient'], pp: 'distrait', subj: ['distraie', 'distraies', 'distraie', 'distrayions', 'distrayiez', 'distraient'] },
];

// ─── HELPERS ──────────────────────────────────────────────
const ER_END = ['e', 'es', 'e', 'ons', 'ez', 'ent'];
const IMP_END = ['ais', 'ais', 'ait', 'ions', 'iez', 'aient'];
const FUT_END = ['ai', 'as', 'a', 'ons', 'ez', 'ont'];
const SUB_END = ['e', 'es', 'e', 'ions', 'iez', 'ent'];

function soften(stem, ending) {
  // manger → mangeons, commencer → commençons (antes de a/o)
  if (/^[ao]/.test(ending)) {
    if (stem.endsWith('g')) return stem + 'e';
    if (stem.endsWith('c')) return stem.slice(0, -1) + 'ç';
  }
  return stem;
}

function baseInf(v) {
  return v.inf.replace(/^se /, '').replace(/^s'/, '').replace(/ compte$/, '');
}

function present(v) {
  if (v.pres) return v.pres;
  const inf = baseInf(v);
  if (v.m === 'ir') {
    const s = inf.slice(0, -2);
    return [s + 'is', s + 'is', s + 'it', s + 'issons', s + 'issez', s + 'issent'];
  }
  if (v.m === 're') {
    const s = inf.slice(0, -2);
    return [s + 's', s + 's', s, s + 'ons', s + 'ez', s + 'ent'];
  }
  const s = inf.slice(0, -2);
  const strong = v.strong || s;
  return ER_END.map((e, i) => ([0, 1, 2, 5].includes(i) ? strong + e : soften(s, e) + e));
}

function nousStem(v) {
  return present(v)[3].replace(/ons$/, '');
}

function imparfait(v) {
  const stem = v.imp || nousStem(v);
  return IMP_END.map((e) => {
    let s = stem;
    if (e.startsWith('i')) {
      if (s.endsWith('ge') && !v.pres) s = s.slice(0, -1);
      if (s.endsWith('ç')) s = s.slice(0, -1) + 'c';
    }
    return s + e;
  });
}

function futStem(v) {
  if (v.fut) return v.fut;
  const inf = baseInf(v);
  if (inf.endsWith('re')) return inf.slice(0, -1);
  return inf;
}

const futur = (v) => FUT_END.map((e) => futStem(v) + e);
const conditionnel = (v) => IMP_END.map((e) => futStem(v) + e);

function subjonctif(v) {
  if (v.subj) return v.subj;
  const p = present(v);
  const ils = p[5].replace(/ent$/, '');
  const imp = imparfait(v);
  return [ils + 'e', ils + 'es', ils + 'e', imp[3], imp[4], ils + 'ent'];
}

function imperatif(v) {
  if (v.impv !== undefined) return v.impv;
  const p = present(v);
  let tu = p[1];
  if (/es$/.test(tu) || (v.m === 'er') || /(ouvr|offr|découvr|accueill|cueill)es$/.test(tu)) tu = tu.replace(/s$/, '');
  return [tu, p[3], p[4]];
}

// ─── API ──────────────────────────────────────────────────
export const VERBS = RAW.map((v) => ({ ...v, aux: v.aux || (v.refl ? 'etre' : 'avoir'), pp: v.pp || ppOf(v) }));

function ppOf(v) {
  const inf = baseInf(v);
  if (v.m === 'ir') return inf.slice(0, -1);
  if (v.m === 're') return inf.slice(0, -2) + 'u';
  return inf.slice(0, -2) + 'é';
}

export const getVerb = (inf) => VERBS.find((v) => v.inf === inf);

const AUX = { avoir: getVerbRaw('avoir'), etre: getVerbRaw('être') };
function getVerbRaw(inf) { return RAW.find((v) => v.inf === inf); }

// Simple forms (no pronoun)
export function simpleForms(v, tense) {
  switch (tense) {
    case 'present': return present(v);
    case 'imparfait': return imparfait(v);
    case 'futur': return futur(v);
    case 'conditionnel': return conditionnel(v);
    case 'subjonctif': return subjonctif(v);
    default: return null;
  }
}

const COMPOUND = { passe_compose: 'present', plus_que_parfait: 'imparfait', futur_anterieur: 'futur', conditionnel_passe: 'conditionnel' };

function agree(pp, i, etre) {
  if (!etre) return pp;
  if (i >= 3) return pp + (pp.endsWith('s') ? '' : 's');
  return pp;
}

// Returns 6 entries { subject, form, full } (imperative: 3)
export function conjugate(v, tense) {
  if (tense === 'imperatif') {
    const f = imperatif(v);
    if (!f) return null;
    const subj = ['(tu)', '(nous)', '(vous)'];
    const pro = ['toi', 'nous', 'vous'];
    return f.map((form, i) => {
      let full = form;
      if (v.refl && !form.includes('-')) full = form + '-' + pro[i];
      if (v.suffix) full += v.suffix;
      return { subject: subj[i], form: full, full: full + ' !' };
    });
  }
  const etre = v.aux === 'etre';
  let forms;
  if (COMPOUND[tense]) {
    const auxForms = simpleForms(AUX[v.aux], COMPOUND[tense]);
    forms = auxForms.map((a, i) => a + ' ' + agree(v.pp, i, etre && !v.noAgree));
  } else {
    forms = simpleForms(v, tense);
  }
  return forms.map((form, i) => {
    let body = form;
    if (v.refl) {
      const r = REFLEX[i];
      body = (/^[aeiouhâàéèêîôû]/i.test(form) && (r === 'me' || r === 'te' || r === 'se') ? r[0] + "'" : r + ' ') + form;
    }
    if (v.suffix) body += v.suffix;
    let subject = PERSONS[i];
    if (i === 0 && /^[aeiouâàéèêîôûh]/i.test(body)) subject = "j'";
    if (tense === 'subjonctif') subject = (i === 2 || i === 5 ? "qu'" : 'que ') + subject;
    const sep = subject.endsWith("'") ? '' : ' ';
    return { subject, form: body, full: subject + sep + body };
  });
}

// For typing exercises: accepted answers for one cell
export function acceptedForms(v, tense, i) {
  const c = conjugate(v, tense);
  if (!c || !c[i]) return [];
  const f = c[i].form;
  const out = [f];
  if (v.aux === 'etre' && COMPOUND[tense] && !v.noAgree && !v.suffix) {
    const pp = v.pp;
    out.push(f.replace(new RegExp(pp + 's?$'), pp + 'e' + (i >= 3 ? 's' : '')));
  }
  return out;
}

export const VERB_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];
export const tensesForLevel = (lvl) => {
  const order = VERB_LEVELS.indexOf(lvl);
  return TENSES.filter((t) => VERB_LEVELS.indexOf(t.level) <= Math.max(order, 0));
};

export const MODEL_LABEL = { er: '1º grupo (-er)', ir: '2º grupo (-ir, tipo finir)', re: '3º grupo (-re, tipo vendre)', irr: 'Irregular' };
