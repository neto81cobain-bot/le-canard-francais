// Skill-training content: minimal pairs (pronunciation / listening) and writing prompts.

// 'a|meaning a|b|meaning b|sound group'
const PAIRS_RAW = [
  'dessus|em cima|dessous|embaixo|u-ou',
  'tu|você|tout|tudo|u-ou',
  'rue|rua|roue|roda|u-ou',
  'vu|visto|vous|vocês / o senhor|u-ou',
  'lu|lido|loup|lobo|u-ou',
  'pur|puro|pour|para|u-ou',
  'russe|russo|rousse|ruiva|u-ou',
  'poisson|peixe|poison|veneno|s-z',
  'dessert|sobremesa|désert|deserto|s-z',
  'coussin|almofada|cousin|primo|s-z',
  'douce|doce (fem.)|douze|doze|s-z',
  'ils sont|eles são|ils ont|eles têm|s-z',
  'basse|baixa|base|base|s-z',
  'vin|vinho|vent|vento|in-an',
  'pain|pão|pont|ponte|in-on',
  'blanc|branco|blond|loiro|an-on',
  'long|longo|lent|lento|an-on',
  'dans|dentro|dont|do qual|an-on',
  'cent|cem|son|som|an-on',
  'vingt|vinte|vent|vento|in-an',
  'le|o|les|os|e-é',
  'deux|dois|des|uns, umas|eu-é',
  'je|eu|j\'ai|eu tenho|e-é',
  'peur|medo|père|pai|eu-è',
  'sœur|irmã|sur|sobre|eu-u',
  'chou|repolho|joue|bochecha|ch-j',
  'bouche|boca|bouge|mexe|ch-j',
  'cache|esconde|cage|gaiola|ch-j',
  'beau|bonito|bon|bom|o-on',
  'pull|suéter|poule|galinha|u-ou',
  'fée|fada|fait|feito|é-è',
  'mer|mar|mère|mãe|homófonos',
];

export const SOUND_GROUPS = {
  'u-ou': { title: 'U × OU', tip: 'O “u” francês: diga “i” e faça bico como para “u”. O “ou” é o nosso “u”.' },
  's-z': { title: 'S × Z', tip: 'Um “s” entre vogais soa “z” (poison). Para ter som de “s”, o francês escreve “ss” (poisson).' },
  'in-an': { title: 'IN × AN', tip: '“in” é nasal com a boca mais aberta e sorrindo (vin). “an/en” é nasal com a boca redonda e para trás (vent).' },
  'in-on': { title: 'IN × ON', tip: '“on” é nasal com os lábios bem arredondados, quase fechados — como “õ”.' },
  'an-on': { title: 'AN × ON', tip: '“an” = boca aberta, como “ã”. “on” = lábios redondos e fechados, como “õ”.' },
  'e-é': { title: 'E × É', tip: '“le/je” têm um “e” fraco, quase “â”. “les/j\'ai” têm “é” fechado e sorridente.' },
  'eu-é': { title: 'EU × É', tip: '“eu” = diga “ê” com os lábios em bico. “é” é aberto num sorriso.' },
  'eu-è': { title: 'EU × È', tip: '“peur” = “é” aberto com os lábios arredondados. “père” = “é” aberto sem bico.' },
  'eu-u': { title: 'EU × U', tip: 'Os dois têm bico. No “u”, a língua vai para a frente como no “i”; no “eu”, como no “ê”.' },
  'ch-j': { title: 'CH × J', tip: '“ch” = “x” de xícara. “j/g” = o “j” de janela.' },
  'o-on': { title: 'O × ON', tip: '“beau” é um “ô” puro, sem nasal. Em “bon” o ar sai pelo nariz.' },
  'é-è': { title: 'É × È', tip: '“é” é fechado, como o “ê” de “você”. “è/ai” é aberto, como o “é” de “pé”.' },
  'homófonos': { title: 'Homófonos', tip: 'Algumas palavras soam exatamente igual — só o contexto (ou a escrita) diferencia.' },
};

export const MINIMAL_PAIRS = PAIRS_RAW.map((r, i) => {
  const [a, pa, b, pb, g] = r.split('|');
  return { id: i, a, pa, b, pb, group: g };
}).filter((p) => p.group !== 'homófonos');

// Writing prompts by level (diary)
export const WRITING_PROMPTS = {
  A1: [
    { pt: 'Apresente-se: nome, idade, cidade e o que você gosta.', fr: 'Présente-toi.', model: 'Je m\'appelle Ana. J\'ai trente ans. J\'habite à Belém. J\'aime la musique et le café.' },
    { pt: 'Descreva sua família em 3 frases.', fr: 'Décris ta famille.', model: 'J\'ai une sœur et un frère. Ma mère est très gentille. Mon père aime le football.' },
    { pt: 'O que você come no café da manhã?', fr: 'Qu\'est-ce que tu manges le matin ?', model: 'Le matin, je mange du pain avec du beurre et je bois un café au lait.' },
    { pt: 'Descreva seu quarto ou sua casa.', fr: 'Décris ta maison.', model: 'Ma maison est petite. Il y a deux chambres et une cuisine. J\'aime beaucoup mon jardin.' },
    { pt: 'Que dia é hoje e como está o tempo?', fr: 'Quel jour sommes-nous ? Quel temps fait-il ?', model: 'Aujourd\'hui, c\'est mardi. Il fait chaud et il y a du soleil.' },
  ],
  A2: [
    { pt: 'Conte o que você fez no último fim de semana.', fr: 'Qu\'est-ce que tu as fait le week-end dernier ?', model: 'Samedi, je suis allé au marché et j\'ai acheté des fruits. Dimanche, j\'ai regardé un film avec mes amis.' },
    { pt: 'Descreva sua rotina de um dia normal.', fr: 'Décris ta journée.', model: 'Je me lève à sept heures. Je prends le bus pour aller au travail. Le soir, je cuisine et je lis un peu.' },
    { pt: 'Explique a alguém como chegar à sua casa.', fr: 'Explique le chemin jusqu\'à chez toi.', model: 'Prends la deuxième rue à droite, puis va tout droit. Ma maison est en face de la boulangerie.' },
    { pt: 'Qual é sua roupa favorita? Descreva.', fr: 'Quel est ton vêtement préféré ?', model: 'Mon vêtement préféré est une veste bleue. Elle est plus confortable que mes autres vestes.' },
  ],
  B1: [
    { pt: 'Conte uma lembrança da sua infância.', fr: 'Raconte un souvenir d\'enfance.', model: 'Quand j\'étais petit, j\'allais chez mes grands-parents tous les étés. Un jour, nous avons vu un dauphin.' },
    { pt: 'Quais são seus planos para o próximo ano?', fr: 'Quels sont tes projets pour l\'année prochaine ?', model: 'L\'année prochaine, je voyagerai en France et je parlerai mieux français. Si j\'ai le temps, je ferai un cours de cuisine.' },
    { pt: 'Cidade ou campo: o que você prefere e por quê?', fr: 'Ville ou campagne ?', model: 'À mon avis, la campagne est plus calme, mais je préfère la ville parce qu\'il y a plus de choses à faire.' },
  ],
  B2: [
    { pt: 'O que você faria se ganhasse na loteria?', fr: 'Que ferais-tu si tu gagnais au loto ?', model: 'Si je gagnais au loto, j\'achèterais une maison au bord de la mer et j\'aiderais ma famille.' },
    { pt: 'Escreva sobre algo de que você se arrepende.', fr: 'Écris sur un regret.', model: 'Si j\'avais étudié le français plus tôt, j\'aurais pu travailler à Paris. Mais il n\'est jamais trop tard !' },
    { pt: 'Dê conselhos a um amigo que quer aprender francês.', fr: 'Donne des conseils à un ami.', model: 'À ta place, j\'écouterais des podcasts tous les jours. Tu devrais aussi parler avec des Français dès que possible.' },
  ],
  C1: [
    { pt: 'Escreva uma carta formal pedindo informações sobre um curso.', fr: 'Rédige une lettre formelle.', model: 'Madame, Monsieur, je me permets de vous écrire afin d\'obtenir des renseignements sur votre formation. Je vous prie d\'agréer mes salutations distinguées.' },
    { pt: 'Argumente: as redes sociais fazem mais bem ou mal?', fr: 'Les réseaux sociaux : bienfait ou danger ?', model: 'Bien que les réseaux sociaux permettent de rester en contact, il faut reconnaître qu\'ils favorisent la désinformation.' },
    { pt: 'Conte, em discurso indireto, uma conversa que você teve.', fr: 'Rapporte une conversation.', model: 'Mon collègue m\'a dit qu\'il partirait le lendemain et m\'a demandé si je pouvais le remplacer.' },
  ],
};
