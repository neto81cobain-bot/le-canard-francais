// Graded reading: one short story per unit (A1 → C1).
// lines: 'French|Portuguese' — a "Name: " prefix marks dialogue.
// words: 'word|meaning' (glossary shown when you tap the 📖 button).
// q: comprehension — 'question|right answer|wrong;wrong;wrong'
// tf: true/false — 'statement|V or F|explanation'
// From B2 on, the questions are in French (immersion).

export const STORIES = [
  {
    id: 's1', unit: 1, level: 'A1', emoji: '🚉', title: 'À la gare', pt: 'Na estação',
    lines: [
      'Il est huit heures. Léa arrive à la gare.|São oito horas. Léa chega à estação.',
      'Un homme attend le train.|Um homem espera o trem.',
      'Léa : Bonjour, monsieur !|Léa: Bom dia, senhor!',
      'Paul : Bonjour, madame. Ça va ?|Paul: Bom dia, senhora. Tudo bem?',
      'Léa : Ça va bien, merci. Je m\'appelle Léa. Et vous ?|Léa: Tudo bem, obrigada. Eu me chamo Léa. E o senhor?',
      'Paul : Je m\'appelle Paul. Enchanté !|Paul: Eu me chamo Paul. Muito prazer!',
      'Le train arrive. Paul dit : « Au revoir, Léa. Bonne journée ! »|O trem chega. Paul diz: “Tchau, Léa. Bom dia!”',
      'Léa sourit : « À bientôt ! »|Léa sorri: “Até breve!”',
    ],
    words: ['la gare|a estação', 'attendre|esperar', 'le train|o trem', 'enchanté|muito prazer', 'sourire|sorrir', 'bonne journée|tenha um bom dia'],
    q: [
      'Onde a história acontece?|Numa estação de trem|Num café;Numa escola;Num hotel',
      'Que horas são?|Oito horas|Sete horas;Nove horas;Meio-dia',
      'Como se chama o homem?|Paul|Pierre;Louis;Hugo',
    ],
    tf: [
      'Léa está mal.|F|Ela diz “Ça va bien, merci” — está bem.',
      'Paul se despede com “Au revoir”.|V|Ele diz “Au revoir, Léa. Bonne journée !”',
    ],
  },
  {
    id: 's2', unit: 2, level: 'A1', emoji: '🏨', title: 'Une nouvelle amie', pt: 'Uma nova amiga',
    lines: [
      'Marco est italien. Il a vingt ans.|Marco é italiano. Ele tem vinte anos.',
      'Il est à Paris pour étudier le français.|Ele está em Paris para estudar francês.',
      'À l\'auberge, il rencontre Ana.|No albergue, ele conhece Ana.',
      'Marco : Tu es française ?|Marco: Você é francesa?',
      'Ana : Non, je suis brésilienne. Je suis de Recife.|Ana: Não, eu sou brasileira. Sou de Recife.',
      'Marco : J\'ai faim. Tu as faim aussi ?|Marco: Estou com fome. Você também está com fome?',
      'Ana : Oui ! Et j\'ai soif. On va au café ?|Ana: Sim! E estou com sede. Vamos ao café?',
      'Ils sont contents. Ils ont une nouvelle amie, et un nouvel ami.|Eles estão contentes. Têm uma nova amiga, e um novo amigo.',
    ],
    words: ['l\'auberge|o albergue', 'rencontrer|conhecer, encontrar', 'avoir faim|estar com fome', 'avoir soif|estar com sede', 'on va…?|vamos…?', 'content|contente'],
    q: [
      'Qual é a nacionalidade de Marco?|Italiano|Francês;Brasileiro;Espanhol',
      'De onde Ana é?|De Recife|De Paris;De Roma;De Lisboa',
      'Por que eles vão ao café?|Porque estão com fome e sede|Porque está frio;Para trabalhar;Para estudar',
    ],
    tf: [
      'Marco tem vinte anos.|V|“Il a vingt ans” — em francês a idade usa avoir.',
      'Ana é francesa.|F|Ela diz: “je suis brésilienne”.',
    ],
  },
  {
    id: 's3', unit: 3, level: 'A1', emoji: '📷', title: 'La photo', pt: 'A foto',
    lines: [
      'Chloé montre une photo à son ami Tom.|Chloé mostra uma foto ao seu amigo Tom.',
      'Chloé : Voici ma famille. C\'est mon père, il est grand et il a les cheveux gris.|Chloé: Aqui está minha família. Este é meu pai, ele é alto e tem cabelo grisalho.',
      'Chloé : Et voici ma mère. Elle est petite et très drôle.|Chloé: E aqui está minha mãe. Ela é baixa e muito engraçada.',
      'Tom : Et ce garçon, c\'est ton frère ?|Tom: E esse menino, é seu irmão?',
      'Chloé : Non, c\'est mon cousin Hugo. Je n\'ai pas de frère.|Chloé: Não, é meu primo Hugo. Eu não tenho irmão.',
      'Chloé : Mais j\'ai deux sœurs. Elles ne sont pas sur la photo.|Chloé: Mas tenho duas irmãs. Elas não estão na foto.',
      'Tom : Et le chien ?|Tom: E o cachorro?',
      'Chloé : C\'est Biscuit ! Il est gentil, mais il n\'est pas sage.|Chloé: É o Biscuit! Ele é bonzinho, mas não é obediente.',
    ],
    words: ['montrer|mostrar', 'voici|aqui está', 'les cheveux|o cabelo', 'drôle|engraçado(a)', 'le cousin|o primo', 'sage|comportado, obediente'],
    q: [
      'Como é o pai de Chloé?|Alto, de cabelo grisalho|Baixo e loiro;Alto e careca;Baixo e engraçado',
      'Quem é o menino na foto?|O primo dela|O irmão dela;O namorado;O pai dela',
      'Quantas irmãs Chloé tem?|Duas|Nenhuma;Uma;Três',
    ],
    tf: [
      'Chloé tem um irmão.|F|“Je n\'ai pas de frère” — depois de ne… pas, un/une/des viram de.',
      'As irmãs aparecem na foto.|F|“Elles ne sont pas sur la photo.”',
    ],
  },
  {
    id: 's4', unit: 4, level: 'A1', emoji: '🥐', title: 'Le petit-déjeuner', pt: 'O café da manhã',
    lines: [
      'Dimanche matin, Julien et Inès vont au bistrot du quartier.|Domingo de manhã, Julien e Inès vão ao bistrô do bairro.',
      'Le serveur : Bonjour ! Qu\'est-ce que je vous sers ?|O garçom: Bom dia! O que eu sirvo para vocês?',
      'Inès : Je voudrais un café crème et un croissant, s\'il vous plaît.|Inès: Eu queria um café com leite e um croissant, por favor.',
      'Julien : Pour moi, un thé et une tartine avec du beurre et de la confiture.|Julien: Para mim, um chá e uma torrada com manteiga e geleia.',
      'Le serveur : Désolé, il n\'y a plus de croissants.|O garçom: Desculpe, não tem mais croissants.',
      'Inès : Alors un pain au chocolat !|Inès: Então um pão de chocolate!',
      'Après, Julien demande l\'addition. C\'est onze euros.|Depois, Julien pede a conta. São onze euros.',
    ],
    words: ['le serveur|o garçom', 'je voudrais|eu gostaria / eu queria', 'la tartine|fatia de pão com algo por cima', 'le beurre|a manteiga', 'il n\'y a plus de|não tem mais', 'l\'addition|a conta'],
    q: [
      'O que Inès come no fim?|Um pain au chocolat|Um croissant;Uma tartine;Nada',
      'O que Julien bebe?|Chá|Café;Suco;Chocolate quente',
      'Quanto custa tudo?|11 euros|7 euros;12 euros;21 euros',
    ],
    tf: [
      'O bistrô ainda tinha croissants.|F|“Il n\'y a plus de croissants” = não tem mais.',
      'Julien pede a conta.|V|“Julien demande l\'addition.”',
    ],
  },
  {
    id: 's5', unit: 5, level: 'A1', emoji: '🍅', title: 'Au marché', pt: 'Na feira',
    lines: [
      'Samedi, à dix heures et demie, Madame Roux va au marché.|Sábado, às dez e meia, a senhora Roux vai à feira.',
      'Madame Roux : Bonjour ! C\'est combien, les tomates ?|Sra. Roux: Bom dia! Quanto custam os tomates?',
      'La vendeuse : Trois euros cinquante le kilo.|A vendedora: Três euros e cinquenta o quilo.',
      'Madame Roux : J\'en prends deux kilos. Et un melon, s\'il vous plaît.|Sra. Roux: Vou levar dois quilos. E um melão, por favor.',
      'La vendeuse : Voilà. Ça fait neuf euros quatre-vingt-dix.|A vendedora: Aqui está. Dá nove euros e noventa.',
      'Madame Roux paie avec un billet de dix euros.|A senhora Roux paga com uma nota de dez euros.',
      'La vendeuse lui rend dix centimes et dit : « À samedi prochain ! »|A vendedora lhe devolve dez centavos e diz: “Até o próximo sábado!”',
    ],
    words: ['le marché|a feira, o mercado', 'c\'est combien ?|quanto custa?', 'le kilo|o quilo', 'j\'en prends|eu levo (disso)', 'le billet|a nota (dinheiro)', 'rendre|devolver, dar o troco'],
    q: [
      'A que horas ela vai à feira?|10h30|10h;9h30;11h30',
      'Quanto custa o quilo de tomate?|3,50 €|3,15 €;5,30 €;2,50 €',
      'Quanto ela recebe de troco?|10 centavos|1 euro;90 centavos;Nada',
    ],
    tf: [
      '“Quatre-vingt-dix” significa 90.|V|4 × 20 + 10 = 90.',
      'Ela compra três quilos de tomate.|F|“J\'en prends deux kilos.”',
    ],
  },
  {
    id: 's6', unit: 6, level: 'A2', emoji: '⏰', title: 'Une journée de Nadia', pt: 'Um dia da Nadia',
    lines: [
      'Nadia habite à Marseille. Elle travaille dans une boulangerie.|Nadia mora em Marselha. Ela trabalha numa padaria.',
      'Elle se lève toujours à quatre heures du matin, parce que le pain doit être prêt à six heures.|Ela sempre se levanta às quatro da manhã, porque o pão tem que estar pronto às seis.',
      'Elle ne prend jamais de petit-déjeuner à la maison : elle mange un croissant au travail.|Ela nunca toma café da manhã em casa: come um croissant no trabalho.',
      'L\'après-midi, elle fait une sieste et puis elle va à la plage avec sa fille.|À tarde, ela tira um cochilo e depois vai à praia com a filha.',
      'Le soir, elles préparent le dîner ensemble et regardent un film.|À noite, elas preparam o jantar juntas e assistem a um filme.',
      'Nadia se couche tôt, vers neuf heures. Sa vie est simple, mais elle l\'adore.|Nadia se deita cedo, por volta das nove. A vida dela é simples, mas ela a adora.',
    ],
    words: ['la boulangerie|a padaria', 'se lever|levantar-se', 'prêt|pronto', 'faire une sieste|tirar um cochilo', 'ensemble|juntos', 'se coucher|deitar-se'],
    q: [
      'Onde Nadia trabalha?|Numa padaria|Num restaurante;Numa escola;Num hotel',
      'Por que ela acorda tão cedo?|Para o pão ficar pronto às seis|Para ir à praia;Porque tem insônia;Para levar a filha à escola',
      'O que ela faz à tarde?|Cochila e vai à praia|Trabalha mais;Vai ao mercado;Estuda',
    ],
    tf: [
      'Nadia toma café da manhã em casa.|F|“Elle ne prend jamais de petit-déjeuner à la maison.”',
      'Ela se deita por volta das nove.|V|“Elle se couche tôt, vers neuf heures.”',
    ],
  },
  {
    id: 's7', unit: 7, level: 'A2', emoji: '🗺️', title: 'Perdu à Bordeaux', pt: 'Perdido em Bordeaux',
    lines: [
      'Rafael est à Bordeaux pour un week-end. Il cherche le musée, mais il est perdu.|Rafael está em Bordeaux para um fim de semana. Ele procura o museu, mas está perdido.',
      'Rafael : Excusez-moi, madame, où est le musée d\'Aquitaine, s\'il vous plaît ?|Rafael: Com licença, senhora, onde fica o museu da Aquitânia, por favor?',
      'La dame : C\'est facile. Allez tout droit jusqu\'à la place, puis tournez à gauche.|A senhora: É fácil. Vá sempre reto até a praça, depois vire à esquerda.',
      'La dame : Le musée est à côté de la pharmacie, en face de la banque.|A senhora: O museu fica ao lado da farmácia, em frente ao banco.',
      'Rafael : C\'est loin ?|Rafael: É longe?',
      'La dame : Non, c\'est à dix minutes à pied. Mais vous pouvez aussi prendre le tram.|A senhora: Não, fica a dez minutos a pé. Mas o senhor também pode pegar o bonde.',
      'Rafael préfère marcher. Il fait beau, et Bordeaux est une très belle ville.|Rafael prefere andar. O tempo está bom, e Bordeaux é uma cidade muito bonita.',
    ],
    words: ['chercher|procurar', 'perdu|perdido', 'tout droit|sempre em frente', 'tourner à gauche|virar à esquerda', 'en face de|em frente a', 'à pied|a pé'],
    q: [
      'O que Rafael procura?|O museu|A estação;O hotel;A farmácia',
      'O museu fica ao lado de quê?|Da farmácia|Do banco;Da praça;Do bonde',
      'Como Rafael decide ir?|A pé|De bonde;De táxi;De bicicleta',
    ],
    tf: [
      'O museu fica longe.|F|“C\'est à dix minutes à pied.”',
      'Depois da praça, é preciso virar à esquerda.|V|“Tournez à gauche.”',
    ],
  },
  {
    id: 's8', unit: 8, level: 'A2', emoji: '🏔️', title: 'Le week-end à la montagne', pt: 'O fim de semana na montanha',
    lines: [
      'Le week-end dernier, Sophie et ses amis sont partis à la montagne.|No último fim de semana, Sophie e os amigos foram para a montanha.',
      'Ils ont pris le train vendredi soir et ils sont arrivés à Chamonix vers minuit.|Eles pegaram o trem sexta à noite e chegaram a Chamonix por volta da meia-noite.',
      'Samedi, ils ont fait une longue randonnée. Ils ont vu le mont Blanc !|No sábado, fizeram uma longa trilha. Eles viram o Mont Blanc!',
      'À midi, ils ont mangé une fondue dans un petit chalet.|Ao meio-dia, comeram um fondue num pequeno chalé.',
      'Le soir, Sophie est tombée dans la neige. Tout le monde a beaucoup ri.|À noite, Sophie caiu na neve. Todo mundo riu muito.',
      'Dimanche, ils sont restés à l\'hôtel parce qu\'il a plu toute la journée.|No domingo, ficaram no hotel porque choveu o dia todo.',
      'Ils sont rentrés fatigués, mais très heureux.|Eles voltaram cansados, mas muito felizes.',
    ],
    words: ['partir|partir, ir embora', 'la randonnée|a trilha, caminhada', 'tomber|cair', 'rire (ri)|rir (riu)', 'rester|ficar', 'pleuvoir (il a plu)|chover (choveu)'],
    q: [
      'Como eles viajaram?|De trem|De carro;De avião;De ônibus',
      'O que eles comeram no chalé?|Um fondue|Uma pizza;Crepes;Uma baguete',
      'Por que ficaram no hotel no domingo?|Porque choveu|Porque estavam doentes;Porque nevou;Para descansar',
    ],
    tf: [
      'Eles chegaram a Chamonix de manhã.|F|Chegaram “vers minuit” — por volta da meia-noite.',
      '“Sophie est tombée” usa être porque tomber é verbo de movimento.|V|Tomber faz parte dos verbos com être no passé composé.',
    ],
  },
  {
    id: 's9', unit: 9, level: 'A2', emoji: '🛍️', title: 'Les soldes', pt: 'As liquidações',
    lines: [
      'C\'est le premier jour des soldes. Emma veut acheter une veste pour l\'hiver.|É o primeiro dia de liquidação. Emma quer comprar uma jaqueta para o inverno.',
      'Dans le magasin, elle trouve une veste rouge et une veste noire.|Na loja, ela encontra uma jaqueta vermelha e uma jaqueta preta.',
      'La rouge est plus jolie que la noire, mais elle est aussi plus chère.|A vermelha é mais bonita que a preta, mas também é mais cara.',
      'Emma : Je peux l\'essayer ? Je fais du 38.|Emma: Posso experimentar? Eu visto 38.',
      'La vendeuse : Bien sûr. Les cabines sont au fond, à droite.|A vendedora: Claro. Os provadores ficam no fundo, à direita.',
      'La veste est un peu trop grande. La vendeuse apporte un 36, et c\'est parfait.|A jaqueta está um pouco grande demais. A vendedora traz um 36, e fica perfeito.',
      'Avec la réduction de 40 %, elle paie seulement soixante euros. Quelle bonne affaire !|Com o desconto de 40%, ela paga só sessenta euros. Que pechincha!',
    ],
    words: ['les soldes|a liquidação', 'la veste|a jaqueta, o casaco', 'plus… que|mais… que', 'essayer|experimentar', 'la cabine|o provador', 'une bonne affaire|um bom negócio, pechincha'],
    q: [
      'Qual jaqueta ela compra?|A vermelha|A preta;Nenhuma;As duas',
      'Que tamanho fica perfeito?|36|38;40;34',
      'Quanto ela paga?|60 euros|40 euros;100 euros;16 euros',
    ],
    tf: [
      'A jaqueta preta é mais cara.|F|“La rouge est… plus chère.”',
      'Os provadores ficam no fundo, à direita.|V|“Au fond, à droite.”',
    ],
  },
  {
    id: 's10', unit: 10, level: 'B1', emoji: '🏡', title: 'La maison de ma grand-mère', pt: 'A casa da minha avó',
    lines: [
      'Quand j\'étais petit, je passais tous mes étés chez ma grand-mère, en Bretagne.|Quando eu era pequeno, passava todos os meus verões na casa da minha avó, na Bretanha.',
      'Sa maison était au bord de la mer. Il y avait un grand jardin plein de fleurs.|A casa dela ficava à beira-mar. Havia um grande jardim cheio de flores.',
      'Chaque matin, nous allions acheter du pain, et elle me racontait des histoires de pirates.|Toda manhã, íamos comprar pão, e ela me contava histórias de piratas.',
      'L\'après-midi, je jouais sur la plage avec les enfants du village.|À tarde, eu brincava na praia com as crianças do vilarejo.',
      'Un jour, pendant une tempête, le toit de la maison s\'est cassé.|Um dia, durante uma tempestade, o telhado da casa quebrou.',
      'J\'avais très peur, mais ma grand-mère a ri et a allumé des bougies.|Eu estava com muito medo, mas minha avó riu e acendeu velas.',
      'Cette nuit-là, elle m\'a raconté sa plus belle histoire. Je ne l\'ai jamais oubliée.|Naquela noite, ela me contou sua história mais bonita. Nunca a esqueci.',
    ],
    words: ['l\'été|o verão', 'au bord de la mer|à beira-mar', 'raconter|contar (história)', 'la tempête|a tempestade', 'le toit|o telhado', 'allumer une bougie|acender uma vela'],
    q: [
      'Onde ficava a casa da avó?|À beira-mar, na Bretanha|Em Paris;Na montanha;No campo, longe do mar',
      'O que a avó contava?|Histórias de piratas|Piadas;Histórias de fantasmas;Receitas',
      'O que aconteceu durante a tempestade?|O telhado quebrou|A casa pegou fogo;A luz voltou;O jardim inundou',
    ],
    tf: [
      '“Je jouais” descreve um hábito no passado.|V|O imparfait descreve hábitos: toda tarde, ele brincava.',
      'A avó ficou com medo da tempestade.|F|Quem tinha medo era o narrador; a avó riu.',
    ],
  },
  {
    id: 's11', unit: 11, level: 'B1', emoji: '✈️', title: 'Le grand projet', pt: 'O grande projeto',
    lines: [
      'Lucas a vingt-cinq ans et il a un rêve : faire le tour du monde.|Lucas tem vinte e cinco anos e tem um sonho: dar a volta ao mundo.',
      'L\'année prochaine, il quittera son travail et il partira pendant un an.|No ano que vem, ele vai largar o emprego e vai partir por um ano.',
      'D\'abord, il ira au Canada, où il travaillera dans une ferme pendant l\'été.|Primeiro, irá ao Canadá, onde vai trabalhar numa fazenda durante o verão.',
      'Ensuite, il visitera le Brésil et il apprendra le portugais.|Depois, vai visitar o Brasil e vai aprender português.',
      'S\'il a assez d\'argent, il continuera vers le Japon.|Se tiver dinheiro suficiente, continuará rumo ao Japão.',
      'Sa mère est inquiète : « Et si tu tombes malade ? »|A mãe dele está preocupada: “E se você ficar doente?”',
      'Lucas répond : « Ne t\'inquiète pas, maman. Je t\'appellerai tous les dimanches. »|Lucas responde: “Não se preocupe, mãe. Vou te ligar todo domingo.”',
    ],
    words: ['le rêve|o sonho', 'faire le tour du monde|dar a volta ao mundo', 'quitter|deixar, largar', 'la ferme|a fazenda', 'inquiet / inquiète|preocupado(a)', 'tomber malade|ficar doente'],
    q: [
      'Qual é o primeiro país da viagem?|Canadá|Brasil;Japão;Estados Unidos',
      'O que ele fará no Brasil?|Aprender português|Trabalhar numa fazenda;Abrir um negócio;Estudar engenharia',
      'O que Lucas promete à mãe?|Ligar todo domingo|Voltar em um mês;Não viajar;Levar ela junto',
    ],
    tf: [
      'Lucas vai ao Japão de qualquer jeito.|F|Só “s\'il a assez d\'argent” — se tiver dinheiro.',
      'Depois de “si”, o francês usa o presente, não o futuro.|V|“S\'il a assez d\'argent, il continuera.”',
    ],
  },
  {
    id: 's12', unit: 12, level: 'B1', emoji: '🌳', title: 'Ville ou campagne ?', pt: 'Cidade ou campo?',
    lines: [
      'Claire et Antoine vivent à Paris depuis dix ans. Antoine veut partir à la campagne.|Claire e Antoine moram em Paris há dez anos. Antoine quer ir para o campo.',
      'Antoine : À mon avis, la vie ici est trop stressante. Il faut que nous changions de vie.|Antoine: Na minha opinião, a vida aqui é estressante demais. Precisamos mudar de vida.',
      'Claire : Je comprends, mais je ne suis pas d\'accord. À la campagne, il n\'y a pas de cinémas, pas de musées…|Claire: Eu entendo, mas não concordo. No campo não tem cinemas, nem museus…',
      'Antoine : C\'est vrai, mais il y a le calme, l\'air pur et des maisons moins chères.|Antoine: É verdade, mas há a calma, o ar puro e casas mais baratas.',
      'Claire : Et mon travail ? Je ne veux pas passer trois heures par jour dans le train.|Claire: E o meu trabalho? Não quero passar três horas por dia no trem.',
      'Antoine : Tu pourrais travailler de la maison deux jours par semaine.|Antoine: Você poderia trabalhar de casa dois dias por semana.',
      'Finalement, ils trouvent un compromis : ils achèteront une petite maison pour les week-ends.|No fim, eles encontram um meio-termo: vão comprar uma casinha para os fins de semana.',
    ],
    words: ['à mon avis|na minha opinião', 'il faut que + subjonctif|é preciso que', 'être d\'accord|concordar', 'l\'air pur|o ar puro', 'le compromis|o meio-termo, acordo', 'finalement|no fim, finalmente'],
    q: [
      'Quem quer ir para o campo?|Antoine|Claire;Os dois;Nenhum',
      'Qual é a preocupação de Claire?|O tempo de trem até o trabalho|O preço das casas;O barulho;Os vizinhos',
      'Qual é a decisão final?|Comprar uma casinha para os fins de semana|Mudar para o campo;Ficar sem mudar nada;Mudar de cidade',
    ],
    tf: [
      'Eles moram em Paris há dez anos.|V|“Depuis dix ans” = há dez anos (e continuam).',
      '“Il faut que nous changions” está no subjonctif.|V|Il faut que pede subjonctif: que nous changions.',
    ],
  },
  {
    id: 's13', unit: 13, level: 'B2', emoji: '💭', title: 'Si j\'avais su…', pt: 'Se eu soubesse…',
    lines: [
      'Camille regarde l\'annonce d\'un appartement qu\'elle n\'a pas pris l\'an dernier.|Camille olha o anúncio de um apartamento que não alugou no ano passado.',
      'Il avait une terrasse, une vue sur la Seine, et le loyer était raisonnable.|Tinha um terraço, vista para o Sena, e o aluguel era razoável.',
      'Mais elle avait hésité. Elle trouvait le quartier trop bruyant.|Mas ela tinha hesitado. Achava o bairro barulhento demais.',
      '« Si j\'avais su, je l\'aurais pris tout de suite », dit-elle à son amie Inès.|“Se eu soubesse, teria pegado na hora”, diz ela à amiga Inès.',
      'Inès : Tu devrais arrêter de regretter. Tu aurais peut-être été malheureuse là-bas.|Inès: Você deveria parar de se arrepender. Talvez você tivesse sido infeliz lá.',
      'Inès : À ta place, je chercherais un appartement encore mieux.|Inès: No seu lugar, eu procuraria um apartamento ainda melhor.',
      'Camille sourit. Elle aimerait bien avoir l\'optimisme de son amie.|Camille sorri. Ela bem que gostaria de ter o otimismo da amiga.',
    ],
    words: ['l\'annonce|o anúncio', 'le loyer|o aluguel', 'bruyant|barulhento', 'tout de suite|imediatamente', 'regretter|arrepender-se, lamentar', 'à ta place|no seu lugar'],
    q: [
      'Pourquoi Camille n\'a pas pris l\'appartement ?|Elle trouvait le quartier bruyant|Le loyer était trop cher;Il n\'avait pas de terrasse;Elle partait à l\'étranger',
      'Que conseille Inès ?|D\'arrêter de regretter|De reprendre l\'appartement;De quitter Paris;D\'acheter une maison',
      '« J\'aurais pris » est au…|conditionnel passé|futur antérieur;plus-que-parfait;passé simple',
    ],
    tf: [
      'Camille a pris l\'appartement l\'an dernier.|F|Elle ne l\'a pas pris — c\'est pour ça qu\'elle le regrette.',
      '« Si j\'avais su » est une hypothèse sur le passé.|V|Si + plus-que-parfait → conditionnel passé.',
    ],
  },
  {
    id: 's14', unit: 14, level: 'B2', emoji: '🖼️', title: 'Le tableau disparu', pt: 'O quadro desaparecido',
    lines: [
      'Le lundi matin, quand le gardien arriva au musée, il remarqua tout de suite que quelque chose n\'allait pas.|Na segunda de manhã, quando o vigia chegou ao museu, percebeu imediatamente que algo estava errado.',
      'La porte de la salle 12 était ouverte. Quelqu\'un l\'avait forcée pendant la nuit.|A porta da sala 12 estava aberta. Alguém a tinha forçado durante a noite.',
      'Le petit tableau de Monet avait disparu, mais l\'alarme n\'avait pas sonné.|O pequeno quadro de Monet tinha sumido, mas o alarme não tinha tocado.',
      'L\'inspectrice Morel interrogea le personnel. Tous avaient quitté le musée avant vingt heures.|A inspetora Morel interrogou os funcionários. Todos tinham saído do museu antes das vinte horas.',
      'Tous, sauf un : le jeune électricien, qui avait réparé l\'alarme la veille.|Todos, menos um: o jovem eletricista, que tinha consertado o alarme na véspera.',
      '« Dès que j\'aurai vérifié son alibi, nous saurons la vérité », déclara-t-elle.|“Assim que eu tiver verificado o álibi dele, saberemos a verdade”, declarou ela.',
    ],
    words: ['le gardien|o vigia', 'remarquer|notar, perceber', 'forcer une porte|arrombar uma porta', 'disparaître|desaparecer', 'la veille|a véspera', 'dès que|assim que'],
    q: [
      'Qu\'est-ce qui a disparu ?|Un tableau de Monet|Une statue;L\'argent de la caisse;Une clé',
      'Pourquoi l\'électricien est-il suspect ?|Il avait réparé l\'alarme la veille|Il était parti tôt;Il avait les clés de la salle;Il connaissait le gardien',
      '« Arriva » et « remarqua » sont au…|passé simple|imparfait;passé composé;subjonctif',
    ],
    tf: [
      'L\'alarme a sonné pendant la nuit.|F|« L\'alarme n\'avait pas sonné. »',
      '« Dès que j\'aurai vérifié » est au futur antérieur.|V|Une action finie avant une autre action future.',
    ],
  },
  {
    id: 's15', unit: 15, level: 'B2', emoji: '🎁', title: 'Le cadeau', pt: 'O presente',
    lines: [
      'C\'est l\'anniversaire de Mathilde. Ses amis veulent lui offrir un vélo.|É aniversário da Mathilde. Os amigos querem dar uma bicicleta a ela.',
      'Hugo : Le vélo, qui l\'achète ? Toi ou moi ?|Hugo: A bicicleta, quem compra? Você ou eu?',
      'Léa : Je l\'achète, et toi, tu lui donnes demain. Elle sera tellement surprise !|Léa: Eu compro, e você entrega para ela amanhã. Ela vai ficar tão surpresa!',
      'Hugo : D\'accord. Et ses parents, on leur en parle ?|Hugo: Combinado. E os pais dela, a gente fala com eles sobre isso?',
      'Léa : Oui, je leur en ai déjà parlé. Ils y pensaient aussi !|Léa: Sim, eu já falei com eles sobre isso. Eles também estavam pensando nisso!',
      'Le lendemain, Hugo le lui donne. Mathilde est ravie : elle en rêvait depuis des mois.|No dia seguinte, Hugo a entrega para ela. Mathilde fica radiante: sonhava com isso há meses.',
    ],
    words: ['offrir|presentear, oferecer', 'lui|para ele / para ela', 'leur|para eles', 'en|disso, dele(s)', 'y|nisso, lá', 'ravi(e)|radiante, encantado(a)'],
    q: [
      'Qui achète le vélo ?|Léa|Hugo;Les parents;Mathilde',
      'Dans « Hugo le lui donne », « le » remplace…|le vélo|Mathilde;Hugo;les parents',
      'Dans « elle en rêvait », « en » remplace…|du vélo|de Hugo;de ses parents;de son anniversaire',
    ],
    tf: [
      'Les parents de Mathilde ne savaient rien.|F|Léa leur en a déjà parlé, et ils y pensaient aussi.',
      '« Lui » est un pronom complément indirect.|V|Donner quelque chose à quelqu\'un → lui.',
    ],
  },
  {
    id: 's16', unit: 16, level: 'B2', emoji: '🎙️', title: 'L\'interview', pt: 'A entrevista',
    lines: [
      'Ce matin, la radio a interviewé Sarah, une chef dont le restaurant vient d\'obtenir une étoile.|Hoje de manhã, a rádio entrevistou Sarah, uma chef cujo restaurante acaba de receber uma estrela.',
      'Le restaurant, qui se trouve dans un ancien moulin, a été ouvert il y a cinq ans.|O restaurante, que fica num antigo moinho, foi aberto há cinco anos.',
      'Le journaliste : Quel est le plat dont vous êtes la plus fière ?|O jornalista: Qual é o prato de que a senhora mais se orgulha?',
      'Sarah : C\'est une soupe de poisson que ma grand-mère préparait le dimanche.|Sarah: É uma sopa de peixe que minha avó preparava aos domingos.',
      'Sarah : En la cuisinant, je pense toujours à elle. C\'est la raison pour laquelle je fais ce métier.|Sarah: Ao cozinhá-la, sempre penso nela. É a razão pela qual faço este trabalho.',
      'Le journaliste : Et l\'avenir ?|O jornalista: E o futuro?',
      'Sarah : J\'aimerais ouvrir une école où les jeunes du village apprendraient à cuisiner.|Sarah: Eu gostaria de abrir uma escola onde os jovens do vilarejo aprenderiam a cozinhar.',
    ],
    words: ['dont|de que, cujo', 'une étoile|uma estrela (guia Michelin)', 'le moulin|o moinho', 'être fier de|orgulhar-se de', 'en + gérondif|ao / enquanto (fazendo)', 'pour laquelle|pela qual'],
    q: [
      'Où se trouve le restaurant ?|Dans un ancien moulin|Dans un château;À Paris;Dans une gare',
      'De quel plat Sarah est-elle la plus fière ?|Une soupe de poisson|Un gâteau au chocolat;Une fondue;Un poulet rôti',
      'Quel est le projet de Sarah ?|Ouvrir une école de cuisine|Ouvrir un deuxième restaurant;Écrire un livre;Partir à l\'étranger',
    ],
    tf: [
      '« A été ouvert » est à la voix passive.|V|Être + participe passé : le restaurant a été ouvert.',
      'La recette vient de sa mère.|F|Elle vient de sa grand-mère.',
    ],
  },
  {
    id: 's17', unit: 17, level: 'C1', emoji: '✉️', title: 'La lettre', pt: 'A carta',
    lines: [
      'Chère Anouk,|Querida Anouk,',
      'Je suis ravie que tu aies enfin trouvé un travail qui te plaise, et je regrette que nous n\'ayons pas pu fêter ça ensemble.|Fico muito feliz que você finalmente tenha encontrado um trabalho de que goste, e lamento que não tenhamos podido comemorar juntas.',
      'Bien que la distance soit difficile, je pense à toi chaque jour.|Embora a distância seja difícil, penso em você todos os dias.',
      'Je t\'écris pour que tu saches une chose : je reviendrai en France au printemps.|Escrevo para que você saiba de uma coisa: voltarei para a França na primavera.',
      'À moins que mon contrat ne soit prolongé, j\'arriverai le 3 avril.|A menos que meu contrato seja prorrogado, chegarei em 3 de abril.',
      'Il faudrait qu\'on organise un grand dîner, avant que tout le monde ne reparte en vacances.|Seria bom organizarmos um grande jantar, antes que todo mundo saia de férias de novo.',
      'Je t\'embrasse fort, Juliette|Um beijo grande, Juliette',
    ],
    words: ['ravi(e) que + subj.|muito feliz que', 'bien que|embora', 'pour que|para que', 'à moins que (ne)|a menos que', 'avant que (ne)|antes que', 'je t\'embrasse|um beijo (fecho de carta)'],
    q: [
      'Pourquoi Juliette écrit-elle ?|Pour annoncer son retour au printemps|Pour annoncer un mariage;Pour demander de l\'argent;Pour s\'excuser d\'une dispute',
      'Qu\'est-ce qui pourrait changer la date ?|La prolongation de son contrat|La météo;Une grève;Son budget',
      'Après « bien que », on utilise…|le subjonctif|l\'indicatif;le conditionnel;l\'infinitif',
    ],
    tf: [
      'Anouk a trouvé un nouveau travail.|V|« Tu aies enfin trouvé un travail. »',
      'Le « ne » dans « à moins que… ne soit » est négatif.|F|C\'est le ne explétif : il n\'a pas de sens négatif.',
    ],
  },
  {
    id: 's18', unit: 18, level: 'C1', emoji: '📞', title: 'Le malentendu', pt: 'O mal-entendido',
    lines: [
      'Mardi, Thomas a dit à son collègue qu\'il viendrait à la réunion de jeudi.|Na terça, Thomas disse ao colega que viria à reunião de quinta.',
      'Il a ajouté qu\'il apporterait le rapport qu\'il avait terminé la veille.|Ele acrescentou que traria o relatório que tinha terminado na véspera.',
      'Jeudi, personne ne l\'a vu. Sa cheffe, furieuse, lui a demandé où il était passé.|Na quinta, ninguém o viu. A chefe dele, furiosa, perguntou onde ele tinha se metido.',
      'Thomas a affirmé qu\'on lui avait annoncé que la réunion était reportée.|Thomas afirmou que tinham lhe avisado que a reunião tinha sido adiada.',
      'Son collègue a reconnu qu\'il s\'était trompé de date en envoyant le message.|O colega reconheceu que tinha se enganado de data ao mandar a mensagem.',
      'La cheffe a conclu qu\'à l\'avenir, toutes les réunions seraient confirmées par écrit.|A chefe concluiu que, dali em diante, todas as reuniões seriam confirmadas por escrito.',
    ],
    words: ['le malentendu|o mal-entendido', 'ajouter|acrescentar', 'reporter|adiar', 'reconnaître|reconhecer, admitir', 'se tromper de|enganar-se de', 'conclure|concluir'],
    q: [
      'Pourquoi Thomas n\'est-il pas venu ?|On lui avait dit que la réunion était reportée|Il était malade;Il avait oublié;Son train était en retard',
      'Qui s\'est trompé ?|Son collègue|Thomas;La cheffe;Personne',
      'Quelle est la décision de la cheffe ?|Confirmer les réunions par écrit|Licencier Thomas;Annuler les réunions;Changer de jour',
    ],
    tf: [
      'Au discours indirect passé, « je viendrai » devient « qu\'il viendrait ».|V|Le futur devient conditionnel.',
      'Thomas n\'avait pas terminé le rapport.|F|Il l\'avait terminé la veille.',
    ],
  },
  {
    id: 's19', unit: 19, level: 'C1', emoji: '💼', title: 'L\'entretien d\'embauche', pt: 'A entrevista de emprego',
    lines: [
      'Madame Lefèvre : Bonjour, Monsieur Diallo. Je vous en prie, asseyez-vous.|Sra. Lefèvre: Bom dia, Sr. Diallo. Por favor, sente-se.',
      'Monsieur Diallo : Je vous remercie de me recevoir.|Sr. Diallo: Agradeço por me receber.',
      'Madame Lefèvre : Pourriez-vous nous expliquer pourquoi vous souhaitez rejoindre notre entreprise ?|Sra. Lefèvre: O senhor poderia nos explicar por que deseja entrar na nossa empresa?',
      'Monsieur Diallo : Votre engagement en faveur de l\'environnement correspond à mes valeurs. Par ailleurs, mon expérience en logistique me permettrait de contribuer rapidement.|Sr. Diallo: O compromisso de vocês com o meio ambiente corresponde aos meus valores. Além disso, minha experiência em logística me permitiria contribuir rapidamente.',
      'Madame Lefèvre : Quel serait, selon vous, votre principal défaut ?|Sra. Lefèvre: Qual seria, na sua opinião, seu principal defeito?',
      'Monsieur Diallo : J\'ai tendance à vouloir tout contrôler. Toutefois, j\'ai appris à déléguer.|Sr. Diallo: Tenho tendência a querer controlar tudo. No entanto, aprendi a delegar.',
      'Madame Lefèvre : Je vous remercie. Nous vous tiendrons informé d\'ici la fin de la semaine.|Sra. Lefèvre: Obrigada. Nós o manteremos informado até o fim da semana.',
    ],
    words: ['je vous en prie|por favor / fique à vontade', 'souhaiter|desejar', 'rejoindre|juntar-se a, entrar em', 'par ailleurs|além disso', 'toutefois|no entanto', 'tenir informé|manter informado'],
    q: [
      'Pourquoi M. Diallo veut-il travailler dans cette entreprise ?|Pour son engagement écologique|Pour le salaire;Parce qu\'elle est proche de chez lui;Pour voyager',
      'Quel défaut reconnaît-il ?|Il veut tout contrôler|Il est souvent en retard;Il parle trop;Il est timide',
      '« Toutefois » est synonyme de…|cependant|donc;ensuite;parce que',
    ],
    tf: [
      'Le ton de l\'entretien est formel.|V|Vouvoiement, conditionnel de politesse, « je vous en prie ».',
      'Mme Lefèvre lui donne le poste immédiatement.|F|Elle le tiendra informé avant la fin de la semaine.',
    ],
  },
  {
    id: 's20', unit: 20, level: 'C1', emoji: '☕', title: 'Au café du coin', pt: 'No café da esquina',
    lines: [
      'Max : Salut ! T\'as l\'air crevé, qu\'est-ce qui se passe ?|Max: E aí! Você parece morto de cansaço, o que está acontecendo?',
      'Jade : Laisse tomber… Mon boulot me prend la tête en ce moment.|Jade: Deixa pra lá… Meu trampo está me tirando do sério ultimamente.',
      'Max : Ton chef te met encore la pression ?|Max: Seu chefe está te pressionando de novo?',
      'Jade : Grave. Il veut tout pour hier. J\'en ai ras-le-bol.|Jade: Demais. Ele quer tudo pra ontem. Estou de saco cheio.',
      'Max : Franchement, tu devrais prendre quelques jours. Viens avec nous à la mer ce week-end, ça va te changer les idées !|Max: Sinceramente, você deveria tirar uns dias. Vem com a gente pra praia este fim de semana, vai distrair a cabeça!',
      'Jade : T\'as raison. Allez, c\'est décidé, je viens ! Mais c\'est toi qui conduis, hein.|Jade: Você tem razão. Pronto, está decidido, eu vou! Mas é você quem dirige, hein.',
      'Max : Ça marche !|Max: Fechado!',
    ],
    words: ['crevé|morto de cansaço (informal)', 'laisse tomber|deixa pra lá', 'le boulot|o trampo, trabalho', 'prendre la tête|encher a cabeça, irritar', 'grave|demais (gíria)', 'en avoir ras-le-bol|estar de saco cheio'],
    q: [
      'Pourquoi Jade est-elle fatiguée ?|À cause de son travail|Elle a mal dormi;Elle est malade;Elle a déménagé',
      'Que propose Max ?|Partir à la mer ce week-end|Changer de travail;Aller au cinéma;Parler au chef',
      'Que signifie « Ça marche ! » ici ?|D\'accord|Ça fonctionne;On marche à pied;C\'est loin',
    ],
    tf: [
      '« T\'as » est la forme familière de « tu as ».|V|À l\'oral, tu as → t\'as.',
      'Jade va conduire la voiture.|F|« C\'est toi qui conduis » — c\'est Max qui conduit.',
    ],
  },
];

const split = (s) => s.split('|');

export function parseStory(s) {
  return {
    ...s,
    lines: s.lines.map((l) => {
      const [fr, pt] = split(l);
      const m = fr.match(/^((?:Le|La) [a-zà-ÿ]+|(?:Madame|Monsieur) [A-ZÀ-Ý][a-zà-ÿ]+|[A-ZÀ-Ý][a-zà-ÿ]+) : (.*)$/);
      return m ? { who: m[1], fr: m[2], pt: (pt || '').replace(/^[^:]{1,30}: /, ''), full: fr } : { who: null, fr, pt: pt || '', full: fr };
    }),
    words: s.words.map((w) => { const [fr, pt] = split(w); return { fr, pt }; }),
    q: s.q.map((x) => { const [q, a, o] = split(x); return { q, a, o: (o || '').split(';') }; }),
    tf: s.tf.map((x) => { const [q, v, why] = split(x); return { q, a: v === 'V', why }; }),
  };
}

export const STORY_LIST = STORIES.map(parseStory);
export const getStory = (id) => STORY_LIST.find((s) => s.id === id);
