// Interactive stories: you choose what to say and the story changes.
// node: { lines: ['fr|pt'], choices: [{ fr, pt, to, tip? }] } — a node without choices is an ending.
export const ADVENTURES = [
  {
    id: 'perdu', title: 'Perdido em Paris', emoji: '🗺️', level: 'A1', desc: 'Seu celular descarregou. Você precisa chegar ao hotel.',
    start: 'a',
    nodes: {
      a: {
        lines: ['Tu sors du métro. Ton téléphone n\'a plus de batterie !|Você sai do metrô. Seu celular ficou sem bateria!', 'Une dame passe à côté de toi.|Uma senhora passa ao seu lado.'],
        choices: [
          { fr: 'Excusez-moi, madame, vous pouvez m\'aider ?', pt: 'Com licença, senhora, pode me ajudar?', to: 'b' },
          { fr: 'Hé ! Toi ! Où est l\'hôtel ?', pt: 'Ei! Você! Onde fica o hotel?', to: 'b2', tip: 'Com desconhecidos, use “vous” e “excusez-moi”. “Toi” soa grosseiro.' },
        ],
      },
      b: {
        lines: ['La dame sourit : « Bien sûr ! Qu\'est-ce que vous cherchez ? »|A senhora sorri: “Claro! O que o senhor procura?”'],
        choices: [
          { fr: 'Je cherche l\'hôtel Bellevue, rue Cler.', pt: 'Procuro o hotel Bellevue, na rua Cler.', to: 'c' },
          { fr: 'Je cherche… euh… une pharmacie.', pt: 'Procuro… é… uma farmácia.', to: 'pharma' },
        ],
      },
      b2: {
        lines: ['La dame fronce les sourcils : « Pardon ? On se connaît ? »|A senhora franze a testa: “Perdão? A gente se conhece?”', 'Elle continue son chemin… mais un jeune homme a tout vu.|Ela segue o caminho… mas um rapaz viu tudo.'],
        choices: [
          { fr: 'Pardon, monsieur, je suis perdu. Vous pouvez m\'aider ?', pt: 'Desculpe, senhor, estou perdido. Pode me ajudar?', to: 'c' },
        ],
      },
      pharma: {
        lines: ['« La pharmacie est juste là, à gauche. Mais… vous avez l\'air perdu. »|“A farmácia é logo ali, à esquerda. Mas… o senhor parece perdido.”'],
        choices: [
          { fr: 'Oui, en fait je cherche mon hôtel, rue Cler.', pt: 'Sim, na verdade procuro meu hotel, na rua Cler.', to: 'c' },
        ],
      },
      c: {
        lines: ['« La rue Cler ? C\'est tout près. Allez tout droit, puis tournez à droite après la boulangerie. »|“A rua Cler? É bem perto. Siga em frente e vire à direita depois da padaria.”'],
        choices: [
          { fr: 'Tout droit, puis à droite. Merci beaucoup !', pt: 'Em frente, depois à direita. Muito obrigado!', to: 'd' },
          { fr: 'Vous pouvez répéter plus lentement, s\'il vous plaît ?', pt: 'Pode repetir mais devagar, por favor?', to: 'c2' },
        ],
      },
      c2: {
        lines: ['« Bien sûr. Tout… droit. Puis… à… droite. Après la boulangerie. »|“Claro. Em… frente. Depois… à… direita. Depois da padaria.”'],
        choices: [{ fr: 'Merci, c\'est très gentil !', pt: 'Obrigado, é muito gentil!', to: 'd' }],
      },
      d: {
        lines: ['Tu marches tout droit. Ça sent le pain chaud…|Você anda em frente. Cheiro de pão quentinho…', 'Devant la boulangerie, tu as faim.|Na frente da padaria, você fica com fome.'],
        choices: [
          { fr: 'J\'entre acheter un croissant.', pt: 'Entro para comprar um croissant.', to: 'e' },
          { fr: 'Je tourne à droite tout de suite.', pt: 'Viro à direita imediatamente.', to: 'end_ok' },
        ],
      },
      e: {
        lines: ['« Bonjour ! Un croissant, s\'il vous plaît. » « Un euro vingt. »|“Bom dia! Um croissant, por favor.” “Um euro e vinte.”', 'Tu paies, tu sors… et tu vois ton hôtel, juste à droite !|Você paga, sai… e vê seu hotel, logo à direita!'],
        choices: [{ fr: 'Enfin ! Bonne soirée, Paris !', pt: 'Finalmente! Boa noite, Paris!', to: 'end_best' }],
      },
      end_ok: { end: 'good', lines: ['Tu arrives à l\'hôtel. Mission accomplie !|Você chega ao hotel. Missão cumprida!'] },
      end_best: { end: 'best', lines: ['Tu arrives à l\'hôtel avec un croissant chaud. Parfait !|Você chega ao hotel com um croissant quentinho. Perfeito!'] },
    },
  },
  {
    id: 'diner', title: 'O jantar com a família francesa', emoji: '🍷', level: 'A2', desc: 'Você foi convidado para jantar na casa de um amigo.',
    start: 'a',
    nodes: {
      a: {
        lines: ['Tu sonnes à la porte. Julien ouvre : « Salut ! Entre ! Je te présente mes parents. »|Você toca a campainha. Julien abre: “Oi! Entra! Te apresento meus pais.”'],
        choices: [
          { fr: 'Bonsoir madame, bonsoir monsieur. Enchanté !', pt: 'Boa noite, senhora, boa noite, senhor. Muito prazer!', to: 'b' },
          { fr: 'Salut ! Ça va ?', pt: 'Oi! Tudo bem?', to: 'b2', tip: 'Com os pais de um amigo, o mais educado é “bonsoir madame/monsieur” e “vous”.' },
        ],
      },
      b: {
        lines: ['La mère sourit : « Bienvenue ! Vous avez fait bon voyage ? »|A mãe sorri: “Bem-vindo! Fez boa viagem?”'],
        choices: [
          { fr: 'Oui, merci. Tenez, j\'ai apporté des fleurs.', pt: 'Sim, obrigado. Tome, trouxe flores.', to: 'c' },
          { fr: 'Oui, un peu long, mais ça va.', pt: 'Sim, um pouco longa, mas tudo bem.', to: 'c' },
        ],
      },
      b2: {
        lines: ['Le père rit un peu : « Ha ha, très décontracté ! Bonsoir ! »|O pai ri um pouco: “Ha ha, bem descontraído! Boa noite!”'],
        choices: [{ fr: 'Pardon… Bonsoir, monsieur. Enchanté.', pt: 'Desculpe… Boa noite, senhor. Muito prazer.', to: 'c' }],
      },
      c: {
        lines: ['À table, la mère sert un bœuf bourguignon. « Vous en voulez encore ? »|À mesa, a mãe serve um bœuf bourguignon. “Quer mais?”'],
        choices: [
          { fr: 'Avec plaisir, c\'est délicieux !', pt: 'Com prazer, está delicioso!', to: 'd' },
          { fr: 'Non merci, j\'ai assez mangé, mais c\'était excellent.', pt: 'Não, obrigado, já comi bastante, mas estava excelente.', to: 'd' },
          { fr: 'Non, je n\'aime pas trop.', pt: 'Não, não gosto muito.', to: 'd2', tip: 'Recusar comida elogiando (“c\'était excellent”) é bem mais gentil.' },
        ],
      },
      d: {
        lines: ['Le père demande : « Et au Brésil, qu\'est-ce que vous mangez d\'habitude ? »|O pai pergunta: “E no Brasil, o que vocês costumam comer?”'],
        choices: [
          { fr: 'On mange souvent du riz, des haricots et du poisson.', pt: 'A gente come muito arroz, feijão e peixe.', to: 'e' },
          { fr: 'Chez moi, en Amazonie, on mange de l\'açaí avec du poisson !', pt: 'Na minha terra, na Amazônia, a gente come açaí com peixe!', to: 'e' },
        ],
      },
      d2: {
        lines: ['Silence à table… Julien te regarde, gêné.|Silêncio na mesa… Julien te olha, sem graça.'],
        choices: [{ fr: 'Pardon, je voulais dire que j\'ai assez mangé. C\'était très bon.', pt: 'Desculpe, quis dizer que já comi bastante. Estava muito bom.', to: 'd' }],
      },
      e: {
        lines: ['« Oh, ça a l\'air délicieux ! Il faudra que vous nous fassiez goûter ça. »|“Oh, parece delicioso! O senhor vai ter que nos fazer provar isso.”', 'La soirée se termine. Il est tard.|A noite termina. Está tarde.'],
        choices: [
          { fr: 'Merci beaucoup pour cette soirée, c\'était un plaisir.', pt: 'Muito obrigado por esta noite, foi um prazer.', to: 'end_best' },
          { fr: 'Bon, j\'y vais. Salut !', pt: 'Bom, tô indo. Tchau!', to: 'end_ok' },
        ],
      },
      end_ok: { end: 'good', lines: ['Julien rit : « À demain ! » La soirée était sympa.|Julien ri: “Até amanhã!” A noite foi legal.'] },
      end_best: { end: 'best', lines: ['La mère t\'embrasse : « Revenez quand vous voulez ! »|A mãe te dá beijinhos: “Volte quando quiser!”'] },
    },
  },
  {
    id: 'entretien', title: 'A entrevista de estágio', emoji: '💼', level: 'B1', desc: 'Uma empresa ambiental em Lyon quer te conhecer.',
    start: 'a',
    nodes: {
      a: {
        lines: ['La recruteuse : « Bonjour, asseyez-vous. Pourquoi voulez-vous travailler chez nous ? »|A recrutadora: “Bom dia, sente-se. Por que quer trabalhar conosco?”'],
        choices: [
          { fr: 'Parce que je m\'intéresse beaucoup à la protection de l\'eau.', pt: 'Porque me interesso muito pela proteção da água.', to: 'b' },
          { fr: 'Pour le salaire, honnêtement.', pt: 'Pelo salário, sinceramente.', to: 'b2', tip: 'Em entrevista, fale da motivação pelo trabalho antes de falar de dinheiro.' },
        ],
      },
      b: {
        lines: ['« Intéressant. Quelle est votre expérience ? »|“Interessante. Qual é sua experiência?”'],
        choices: [
          { fr: 'J\'ai travaillé trois ans dans le suivi de la qualité de l\'eau en Amazonie.', pt: 'Trabalhei três anos no monitoramento da qualidade da água na Amazônia.', to: 'c' },
          { fr: 'J\'utilise aussi des drones pour faire des cartes.', pt: 'Também uso drones para fazer mapas.', to: 'c' },
        ],
      },
      b2: {
        lines: ['« Je vois… Et à part le salaire ? »|“Entendo… E além do salário?”'],
        choices: [{ fr: 'Je voudrais aussi apprendre de nouvelles méthodes de suivi environnemental.', pt: 'Também gostaria de aprender novos métodos de monitoramento ambiental.', to: 'b' }],
      },
      c: {
        lines: ['« Très bien. Quel est votre principal défaut ? »|“Muito bem. Qual é o seu principal defeito?”'],
        choices: [
          { fr: 'Je suis parfois trop perfectionniste, mais j\'apprends à déléguer.', pt: 'Às vezes sou perfeccionista demais, mais estou aprendendo a delegar.', to: 'd' },
          { fr: 'Je n\'ai pas de défaut.', pt: 'Não tenho defeitos.', to: 'd', tip: 'Dizer que não tem defeitos soa arrogante. Mostre um defeito e como você lida com ele.' },
        ],
      },
      d: {
        lines: ['« Avez-vous des questions pour nous ? »|“Tem alguma pergunta para nós?”'],
        choices: [
          { fr: 'Oui : comment se passe une journée typique dans l\'équipe ?', pt: 'Sim: como é um dia típico na equipe?', to: 'end_best' },
          { fr: 'Non, pas vraiment.', pt: 'Não, na verdade não.', to: 'end_ok', tip: 'Fazer uma pergunta mostra interesse — sempre prepare uma!' },
        ],
      },
      end_ok: { end: 'good', lines: ['« Merci, nous vous recontacterons. »|“Obrigada, entraremos em contato.”'] },
      end_best: { end: 'best', lines: ['Elle sourit : « Excellente question ! Vous commencez quand ? »|Ela sorri: “Ótima pergunta! Quando você pode começar?”'] },
    },
  },
  {
    id: 'cafe', title: 'Primeiro café em Paris', emoji: '☕', level: 'A1', desc: 'Peça seu café da manhã sozinho pela primeira vez.',
    start: 'a',
    nodes: {
      a: {
        lines: ['Le serveur arrive : « Bonjour ! Qu\'est-ce que je vous sers ? »|O garçom chega: “Bom dia! O que vou lhe servir?”'],
        choices: [
          { fr: 'Bonjour ! Un café et un croissant, s\'il vous plaît.', pt: 'Bom dia! Um café e um croissant, por favor.', to: 'b' },
          { fr: 'Café.', pt: 'Café.', to: 'b2', tip: 'Sempre comece com “Bonjour” e termine com “s\'il vous plaît” — na França isso faz toda a diferença!' },
        ],
      },
      b: {
        lines: ['« Très bien. Un café noir ou un café crème ? »|“Muito bem. Café preto ou café com leite?”'],
        choices: [
          { fr: 'Un café crème, s\'il vous plaît.', pt: 'Café com leite, por favor.', to: 'c' },
          { fr: 'Un café noir, merci.', pt: 'Café preto, obrigado.', to: 'c' },
        ],
      },
      b2: {
        lines: ['Le serveur attend… et ne dit rien.|O garçom espera… e não diz nada.'],
        choices: [{ fr: 'Pardon ! Bonjour ! Un café, s\'il vous plaît.', pt: 'Desculpe! Bom dia! Um café, por favor.', to: 'b' }],
      },
      c: {
        lines: ['Le serveur revient avec la commande. Plus tard, tu veux payer.|O garçom volta com o pedido. Mais tarde, você quer pagar.'],
        choices: [
          { fr: 'L\'addition, s\'il vous plaît.', pt: 'A conta, por favor.', to: 'end_best' },
          { fr: 'Combien ?', pt: 'Quanto?', to: 'end_ok', tip: '“L\'addition, s\'il vous plaît” é a forma mais natural de pedir a conta.' },
        ],
      },
      end_ok: { end: 'good', lines: ['« Quatre euros cinquante. » Tu paies et tu pars. Bravo !|“Quatro euros e cinquenta.” Você paga e vai embora. Muito bem!'] },
      end_best: { end: 'best', lines: ['« Voilà ! Bonne journée ! » Le serveur sourit. Parfait !|“Aqui está! Bom dia!” O garçom sorri. Perfeito!'] },
    },
  },
  {
    id: 'reclamation', title: 'O quarto barulhento', emoji: '🛎️', level: 'B2', desc: 'Seu quarto de hotel não é o que você reservou. Reclame com educação.',
    start: 'a',
    nodes: {
      a: {
        lines: ['À la réception : « Bonsoir, je peux vous aider ? »|Na recepção: “Boa noite, posso ajudar?”'],
        choices: [
          { fr: 'Bonsoir. Je suis désolé de vous déranger, mais la chambre ne correspond pas à ma réservation.', pt: 'Boa noite. Desculpe incomodar, mas o quarto não corresponde à minha reserva.', to: 'b' },
          { fr: 'Votre hôtel est nul, je veux être remboursé !', pt: 'Seu hotel é péssimo, quero ser reembolsado!', to: 'b2', tip: 'Reclamar com calma e fatos funciona muito melhor — e mantém a porta aberta para uma solução.' },
        ],
      },
      b: {
        lines: ['« Ah, je suis navré. Qu\'est-ce qui ne va pas exactement ? »|“Ah, sinto muito. O que exatamente não está bom?”'],
        choices: [
          { fr: 'J\'avais réservé une chambre calme, mais elle donne sur une rue très bruyante.', pt: 'Eu tinha reservado um quarto silencioso, mas ele dá para uma rua muito barulhenta.', to: 'c' },
        ],
      },
      b2: {
        lines: ['Le réceptionniste se raidit : « Monsieur, calmez-vous, s\'il vous plaît. »|O recepcionista fica tenso: “Senhor, acalme-se, por favor.”'],
        choices: [{ fr: 'Excusez-moi, je suis fatigué. Le problème, c\'est le bruit dans la chambre.', pt: 'Desculpe, estou cansado. O problema é o barulho no quarto.', to: 'c' }],
      },
      c: {
        lines: ['« Je comprends. Il me reste une chambre côté cour, mais elle est plus petite. »|“Entendo. Ainda tenho um quarto de fundos, mas é menor.”'],
        choices: [
          { fr: 'Ce serait parfait. Serait-il possible d\'avoir le petit-déjeuner offert pour le dérangement ?', pt: 'Seria perfeito. Seria possível ter o café da manhã por conta do hotel pelo transtorno?', to: 'end_best' },
          { fr: 'D\'accord, je la prends.', pt: 'Tudo bem, fico com ele.', to: 'end_ok' },
        ],
      },
      end_ok: { end: 'good', lines: ['Tu dors enfin au calme. Problème réglé !|Você finalmente dorme em silêncio. Problema resolvido!'] },
      end_best: { end: 'best', lines: ['« Bien sûr, c\'est la moindre des choses. » Petit-déjeuner offert !|“Claro, é o mínimo.” Café da manhã por conta da casa!'] },
    },
  },
  {
    id: 'debat', title: 'O jantar do debate', emoji: '🗯️', level: 'C1', desc: 'Num jantar, discordam de você sobre a Amazônia. Argumente sem brigar.',
    start: 'a',
    nodes: {
      a: {
        lines: ['Un invité affirme : « De toute façon, la déforestation, c\'est un problème qui ne concerne que le Brésil. »|Um convidado afirma: “De qualquer forma, o desmatamento é um problema que só diz respeito ao Brasil.”'],
        choices: [
          { fr: 'Je comprends votre point de vue, mais permettez-moi de nuancer : la forêt régule le climat bien au-delà de nos frontières.', pt: 'Entendo seu ponto de vista, mas permita-me matizar: a floresta regula o clima muito além das nossas fronteiras.', to: 'b' },
          { fr: 'C\'est complètement faux.', pt: 'Isso é completamente falso.', to: 'b2', tip: 'Em debate formal, “nuancer” e reconhecer o outro lado tornam seu argumento mais convincente.' },
        ],
      },
      b: {
        lines: ['« Admettons. Mais que peut faire un Français, concrètement ? »|“Admitamos. Mas o que um francês pode fazer, concretamente?”'],
        choices: [
          { fr: 'Ne serait-ce que s\'informer sur l\'origine de ce qu\'il consomme, ce serait déjà beaucoup.', pt: 'Nem que seja se informar sobre a origem do que consome, já seria muito.', to: 'c' },
          { fr: 'Il peut soutenir des projets locaux, comme ceux des communautés riveraines.', pt: 'Pode apoiar projetos locais, como os das comunidades ribeirinhas.', to: 'c' },
        ],
      },
      b2: {
        lines: ['Un silence gêné s\'installe autour de la table.|Um silêncio constrangedor se instala na mesa.'],
        choices: [{ fr: 'Pardon, je me suis emporté. Ce que je veux dire, c\'est que l\'enjeu est mondial.', pt: 'Desculpe, me exaltei. O que quero dizer é que a questão é mundial.', to: 'b' }],
      },
      c: {
        lines: ['L\'invité réfléchit : « Vous m\'avez presque convaincu… »|O convidado pensa: “O senhor quase me convenceu…”'],
        choices: [
          { fr: 'Presque ? Eh bien, je vous propose d\'en reparler autour d\'un dessert !', pt: 'Quase? Então proponho continuarmos a conversa com uma sobremesa!', to: 'end_best' },
          { fr: 'Bon, on ne va pas y passer la nuit.', pt: 'Bom, não vamos passar a noite nisso.', to: 'end_ok' },
        ],
      },
      end_ok: { end: 'good', lines: ['La conversation change de sujet. Débat honorable !|A conversa muda de assunto. Debate honroso!'] },
      end_best: { end: 'best', lines: ['Tout le monde rit et lève son verre. Quelle élégance !|Todos riem e erguem as taças. Que elegância!'] },
    },
  },
  {
    id: 'marche', title: 'Na feira de domingo', emoji: '🍅', level: 'A1', desc: 'Compre frutas e legumes para o almoço.',
    start: 'a',
    nodes: {
      a: { lines: ['Le marchand : « Bonjour ! Qu\'est-ce que vous voulez ? »|O feirante: “Bom dia! O que o senhor quer?”'], choices: [
        { fr: 'Bonjour ! Un kilo de tomates, s\'il vous plaît.', pt: 'Bom dia! Um quilo de tomates, por favor.', to: 'b' },
        { fr: 'Tomates !', pt: 'Tomates!', to: 'b2', tip: 'Na França, sempre comece com “Bonjour” — faz toda a diferença no atendimento.' } ] },
      b: { lines: ['« Voilà ! Et avec ceci ? »|“Aqui está! E o que mais?”'], choices: [
        { fr: 'Des fraises, s\'il vous plaît. C\'est combien ?', pt: 'Morangos, por favor. Quanto é?', to: 'c' },
        { fr: 'C\'est tout, merci.', pt: 'É só isso, obrigado.', to: 'c2' } ] },
      b2: { lines: ['Le marchand sourit : « Bonjour d\'abord, non ? »|O feirante sorri: “Primeiro bom dia, não?”'], choices: [
        { fr: 'Pardon ! Bonjour ! Un kilo de tomates, s\'il vous plaît.', pt: 'Desculpe! Bom dia! Um quilo de tomates, por favor.', to: 'b' } ] },
      c: { lines: ['« Quatre euros la barquette. Ça fait six euros en tout. »|“Quatro euros a caixinha. Dá seis euros no total.”'], choices: [
        { fr: 'Voilà dix euros.', pt: 'Aqui estão dez euros.', to: 'end_best' } ] },
      c2: { lines: ['« Deux euros, s\'il vous plaît. »|“Dois euros, por favor.”'], choices: [
        { fr: 'Voilà. Bonne journée !', pt: 'Aqui está. Bom dia!', to: 'end_ok' } ] },
      end_ok: { end: 'good', lines: ['Tu rentres avec tes tomates. Simple et efficace !|Você volta com os tomates. Simples e eficiente!'] },
      end_best: { end: 'best', lines: ['« Et voilà votre monnaie : quatre euros. Bon dimanche ! »|“Aqui está seu troco: quatro euros. Bom domingo!”'] },
    },
  },
  {
    id: 'medecin', title: 'Doente em Lyon', emoji: '🤒', level: 'A2', desc: 'Você acordou com febre durante a viagem. Explique ao médico.',
    start: 'a',
    nodes: {
      a: { lines: ['Le médecin : « Bonjour. Qu\'est-ce qui ne va pas ? »|O médico: “Bom dia. O que está acontecendo?”'], choices: [
        { fr: 'J\'ai de la fièvre et mal à la gorge depuis hier.', pt: 'Estou com febre e dor de garganta desde ontem.', to: 'b' },
        { fr: 'Je suis malade.', pt: 'Estou doente.', to: 'b2', tip: 'Dê detalhes: o que sente e desde quando (“depuis hier”).' } ] },
      b2: { lines: ['« D\'accord… Mais où avez-vous mal exactement ? »|“Certo… Mas onde exatamente dói?”'], choices: [
        { fr: 'J\'ai mal à la gorge et j\'ai un peu de fièvre.', pt: 'Estou com dor de garganta e um pouco de febre.', to: 'b' } ] },
      b: { lines: ['« Vous avez des allergies à des médicaments ? »|“O senhor tem alergia a algum remédio?”'], choices: [
        { fr: 'Non, aucune allergie.', pt: 'Não, nenhuma alergia.', to: 'c' },
        { fr: 'Oui, je suis allergique à la pénicilline.', pt: 'Sim, sou alérgico à penicilina.', to: 'c' } ] },
      c: { lines: ['« C\'est une angine. Prenez ce médicament trois fois par jour. »|“É uma amigdalite. Tome este remédio três vezes ao dia.”'], choices: [
        { fr: 'Pendant combien de jours ?', pt: 'Por quantos dias?', to: 'end_best' },
        { fr: 'Merci, docteur.', pt: 'Obrigado, doutor.', to: 'end_ok' } ] },
      end_ok: { end: 'good', lines: ['Tu vas à la pharmacie. Guéris vite !|Você vai à farmácia. Melhoras!'] },
      end_best: { end: 'best', lines: ['« Cinq jours. Et beaucoup de repos ! » Excellente question !|“Cinco dias. E muito repouso!” Ótima pergunta!'] },
    },
  },
  {
    id: 'appart', title: 'Procurando apartamento', emoji: '🏢', level: 'A2', desc: 'Você visita um apartamento para alugar em Bordeaux.',
    start: 'a',
    nodes: {
      a: { lines: ['La propriétaire : « Voici le salon. Qu\'en pensez-vous ? »|A proprietária: “Aqui é a sala. O que acha?”'], choices: [
        { fr: 'Il est très lumineux ! C\'est combien par mois ?', pt: 'É bem iluminada! Quanto é por mês?', to: 'b' },
        { fr: 'Il y a combien de chambres ?', pt: 'Quantos quartos tem?', to: 'b2' } ] },
      b2: { lines: ['« Deux chambres et une petite cuisine. »|“Dois quartos e uma cozinha pequena.”'], choices: [
        { fr: 'Parfait. Et le loyer, c\'est combien ?', pt: 'Perfeito. E o aluguel, quanto é?', to: 'b' } ] },
      b: { lines: ['« Huit cents euros, charges comprises. »|“Oitocentos euros, com as taxas incluídas.”'], choices: [
        { fr: 'Est-ce que l\'électricité est comprise aussi ?', pt: 'A eletricidade também está incluída?', to: 'c' },
        { fr: 'Je le prends !', pt: 'Vou ficar com ele!', to: 'end_ok', tip: 'Antes de fechar, pergunte o que está incluído e quando pode se mudar.' } ] },
      c: { lines: ['« Non, seulement l\'eau et le chauffage. »|“Não, só a água e o aquecimento.”'], choices: [
        { fr: 'D\'accord. Je peux emménager quand ?', pt: 'Tudo bem. Quando posso me mudar?', to: 'end_best' } ] },
      end_ok: { end: 'good', lines: ['Tu as un appartement ! Tu découvriras le reste plus tard…|Você tem um apartamento! O resto você descobre depois…'] },
      end_best: { end: 'best', lines: ['« Dès le premier du mois. Bienvenue ! » Bien négocié !|“A partir do dia primeiro. Bem-vindo!” Bem negociado!'] },
    },
  },
  {
    id: 'objets', title: 'Achados e perdidos', emoji: '🎒', level: 'B1', desc: 'Você esqueceu a mochila no trem. Recupere-a.',
    start: 'a',
    nodes: {
      a: { lines: ['L\'agent : « Bonjour, c\'est pour quoi ? »|O atendente: “Bom dia, é para quê?”'], choices: [
        { fr: 'J\'ai oublié mon sac à dos dans le train de 14 h en provenance de Paris.', pt: 'Esqueci minha mochila no trem das 14h vindo de Paris.', to: 'b' },
        { fr: 'Mon sac !', pt: 'Minha mochila!', to: 'b2', tip: 'Para achados e perdidos: diga o objeto, onde e quando você o perdeu.' } ] },
      b2: { lines: ['« Quel sac ? Où ? Quand ? Il me faut plus d\'informations. »|“Que mochila? Onde? Quando? Preciso de mais informações.”'], choices: [
        { fr: 'Pardon : un sac à dos bleu, dans le train de 14 h.', pt: 'Desculpe: uma mochila azul, no trem das 14h.', to: 'b' } ] },
      b: { lines: ['« Pouvez-vous le décrire ? Qu\'est-ce qu\'il y avait dedans ? »|“Pode descrevê-la? O que havia dentro?”'], choices: [
        { fr: 'Il est bleu, avec un ordinateur et un livre de français.', pt: 'É azul, com um computador e um livro de francês.', to: 'c' } ] },
      c: { lines: ['L\'agent revient : « C\'est celui-ci ? »|O atendente volta: “É esta?”'], choices: [
        { fr: 'Oui, c\'est le mien ! Merci infiniment !', pt: 'Sim, é a minha! Muitíssimo obrigado!', to: 'end_best' },
        { fr: 'Oui. Je peux partir ?', pt: 'Sim. Posso ir?', to: 'end_ok' } ] },
      end_ok: { end: 'good', lines: ['« Signez ici d\'abord. » Sac récupéré !|“Assine aqui primeiro.” Mochila recuperada!'] },
      end_best: { end: 'best', lines: ['L\'agent sourit : « Avec plaisir. Bon voyage ! »|O atendente sorri: “Com prazer. Boa viagem!”'] },
    },
  },
  {
    id: 'colloque', title: 'Apresentação num congresso', emoji: '🎤', level: 'B2', desc: 'Você apresenta seu trabalho sobre a Amazônia num congresso em Paris.',
    start: 'a',
    nodes: {
      a: { lines: ['La modératrice : « Je vous laisse la parole. »|A moderadora: “Passo a palavra ao senhor.”'], choices: [
        { fr: 'Merci. Je vais vous présenter les résultats de trois ans de suivi de la qualité de l\'eau.', pt: 'Obrigado. Vou apresentar os resultados de três anos de monitoramento da qualidade da água.', to: 'b' },
        { fr: 'Bon… alors… euh… voilà mes slides.', pt: 'Bom… então… é… aqui estão meus slides.', to: 'b2', tip: 'Anuncie o tema logo de cara: a plateia acompanha melhor.' } ] },
      b2: { lines: ['Le public attend…|O público espera…'], choices: [
        { fr: 'Pardon. Je vais vous parler de la qualité de l\'eau en Amazonie.', pt: 'Desculpem. Vou falar da qualidade da água na Amazônia.', to: 'b' } ] },
      b: { lines: ['Une chercheuse demande : « Comment avez-vous impliqué les communautés locales ? »|Uma pesquisadora pergunta: “Como vocês envolveram as comunidades locais?”'], choices: [
        { fr: 'Les habitants ont participé aux prélèvements après une formation.', pt: 'Os moradores participaram das coletas depois de um treinamento.', to: 'c' },
        { fr: 'Bonne question ! Nous avons organisé des ateliers d\'éducation environnementale.', pt: 'Boa pergunta! Organizamos oficinas de educação ambiental.', to: 'c' } ] },
      c: { lines: ['« Et quelles sont les limites de votre étude ? »|“E quais são os limites do seu estudo?”'], choices: [
        { fr: 'Le nombre de points de mesure reste limité, mais nous comptons l\'élargir.', pt: 'O número de pontos de medição ainda é limitado, mas pretendemos ampliá-lo.', to: 'end_best' },
        { fr: 'Il n\'y en a pas.', pt: 'Não há limites.', to: 'end_ok', tip: 'Reconhecer limites mostra rigor científico.' } ] },
      end_ok: { end: 'good', lines: ['Applaudissements polis. Présentation terminée !|Aplausos educados. Apresentação concluída!'] },
      end_best: { end: 'best', lines: ['La salle applaudit chaleureusement. Bravo !|A sala aplaude calorosamente. Parabéns!'] },
    },
  },
  {
    id: 'mediation', title: 'O conflito no condomínio', emoji: '🤝', level: 'C1', desc: 'Medie uma discussão entre dois vizinhos sobre a horta do prédio.',
    start: 'a',
    nodes: {
      a: { lines: ['M. Martin : « Ses plantes envahissent tout le potager ! »|Sr. Martin: “As plantas dela invadem a horta toda!”', 'Mme Roux : « Et lui, il n\'arrose jamais les siennes ! »|Sra. Roux: “E ele nunca rega as dele!”'], choices: [
        { fr: 'Je propose qu\'on écoute chacun à tour de rôle, sans s\'interrompre.', pt: 'Proponho que ouçamos cada um por vez, sem interromper.', to: 'b' },
        { fr: 'Calmez-vous tous les deux !', pt: 'Calmem-se os dois!', to: 'b2', tip: 'Em mediação, proponha um método em vez de dar ordens.' } ] },
      b2: { lines: ['Les deux voisins se taisent, vexés.|Os dois vizinhos se calam, ofendidos.'], choices: [
        { fr: 'Pardonnez-moi. Et si chacun exposait son point de vue calmement ?', pt: 'Desculpem. E se cada um expusesse seu ponto de vista com calma?', to: 'b' } ] },
      b: { lines: ['Après les avoir écoutés, tu remarques qu\'ils veulent tous les deux un potager bien entretenu.|Depois de ouvi-los, você percebe que os dois querem uma horta bem cuidada.'], choices: [
        { fr: 'En somme, vous partagez le même objectif. Pourquoi ne pas répartir les parcelles et alterner l\'arrosage ?', pt: 'Em suma, vocês têm o mesmo objetivo. Por que não dividir os canteiros e alternar a rega?', to: 'end_best' },
        { fr: 'Il faudrait peut-être supprimer le potager.', pt: 'Talvez fosse melhor acabar com a horta.', to: 'end_ok' } ] },
      end_ok: { end: 'good', lines: ['Le conflit s\'arrête… mais personne n\'est vraiment content.|O conflito para… mas ninguém fica realmente contente.'] },
      end_best: { end: 'best', lines: ['Ils se serrent la main. « On aurait dû y penser plus tôt ! »|Eles apertam as mãos. “Devíamos ter pensado nisso antes!”'] },
    },
  },
];
import { ADVENTURES_2 } from './adventures2';
import { ADVENTURES_3 } from './adventures3';
import { ADVENTURES_4 } from './adventures4';
import { ADVENTURES_5 } from './adventures5';
import { ADVENTURES_6 } from './adventures6';
ADVENTURES.push(...ADVENTURES_2, ...ADVENTURES_3, ...ADVENTURES_4, ...ADVENTURES_5, ...ADVENTURES_6);
export const getAdventure = (id) => ADVENTURES.find((a) => a.id === id);
