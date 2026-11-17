// Nível A2 — unidades 6 a 9.
export default [
  // ════════════════════════════════════════════════════════
  {
    id: 'u6', level: 'A2', title: 'Verbes en -ER', pt: 'Verbos e rotina', emoji: '🔁',
    desc: 'O presente dos verbos regulares, sua rotina, frequência e os irregulares aller e faire.',
    lessons: [
      {
        id: 'u6l1', title: 'Parler', emoji: '🗣️', goal: 'Conjugar verbos regulares em -ER',
        intro: '90% dos verbos franceses terminam em *-er* e seguem o mesmo modelo. Aprenda um, saiba todos!',
        teach: [
          { title: 'O modelo', text: 'Tire o *-er* e acrescente as terminações:', table: [['je', 'parle', '-e'], ['tu', 'parles', '-es'], ['il / elle', 'parle', '-e'], ['nous', 'parlons', '-ons'], ['vous', 'parlez', '-ez'], ['ils / elles', 'parlent', '-ent']], tip: '*parle, parles, parle, parlent* soam **igual**: “parl”. O *-ent* do plural é mudo!' },
          { title: 'Verbos do dia a dia', ex: ['J\'habite à Oriximiná.|Moro em Oriximiná.', 'Tu travailles où ?|Onde você trabalha?', 'Nous aimons la musique.|Nós amamos música.', 'Ils regardent un film.|Eles assistem a um filme.'] },
        ],
        vocab: ['parler|falar|💬', 'habiter|morar|🏡', 'travailler|trabalhar|💼', 'aimer|gostar, amar|❤️', 'regarder|olhar, assistir|📺', 'écouter|escutar|🎧', 'manger|comer|🍝', 'chanter|cantar|🎤'],
        sentences: ['Je parle un peu français.|Falo um pouco de francês.', 'Tu habites où ?|Onde você mora?', 'Elle travaille dans un hôpital.|Ela trabalha num hospital.', 'Nous écoutons de la musique.|Nós escutamos música.', 'Vous aimez le cinéma ?|Vocês gostam de cinema?', 'Ils mangent à midi.|Eles comem ao meio-dia.'],
        quiz: [
          'Nous ___ français.|parlons|parlez;parlent;parle|*nous* → *-ons*.',
          'Ils ___ la télé.|regardent|regardons;regardes;regardez|*ils* → *-ent* (mudo).',
          'Qual forma NÃO soa como "parl"?|parlez|parle;parles;parlent|*parlez* soa “parlê”.',
        ],
        fill: ['J\'___ à Belém. (habiter)|habite|Moro em Belém.|*j\'habite*', 'Vous ___ le café ? (aimer)|aimez|Vocês gostam de café?|*vous* → *-ez*.', 'Tu ___ beaucoup. (travailler)|travailles|Você trabalha muito.|*tu* → *-es*.'],
      },
      {
        id: 'u6l2', title: 'Ma journée', emoji: '🌞', goal: 'Descrever sua rotina',
        intro: 'Acordar, tomar café, trabalhar, voltar para casa. Vamos contar seu dia em francês.',
        teach: [
          { title: 'Verbos pronominais', text: 'Alguns verbos vêm com *se* (como “se levantar”): o pronome muda com a pessoa.', table: [['je', 'me lève', 'eu me levanto'], ['tu', 'te lèves', ''], ['il / elle', 'se lève', ''], ['nous', 'nous levons', ''], ['vous', 'vous levez', ''], ['ils / elles', 'se lèvent', '']] },
          { title: 'Rotina', ex: ['Je me réveille à six heures.|Acordo às seis horas.', 'Je prends le petit-déjeuner.|Tomo café da manhã.', 'Je commence à travailler à huit heures.|Começo a trabalhar às oito.', 'Le soir, je me couche tard.|À noite, eu me deito tarde.'], tip: '*Le petit-déjeuner* = café da manhã. *Le déjeuner* = almoço. *Le dîner* = jantar.' },
        ],
        vocab: ['se réveiller|acordar|⏰', 'se lever|levantar-se|🛏️', 'se doucher|tomar banho|🚿', 'le petit-déjeuner|o café da manhã|🥐', 'le déjeuner|o almoço|🍛', 'le dîner|o jantar|🍲', 'se coucher|deitar-se|😴', 'tard|tarde|🌙'],
        sentences: ['Je me lève à sept heures.|Eu me levanto às sete.', 'Elle se douche le matin.|Ela toma banho de manhã.', 'Nous dînons à vingt heures.|Jantamos às oito da noite.', 'Tu te couches tard ?|Você dorme tarde?', 'Après le travail, je rentre à la maison.|Depois do trabalho, volto para casa.'],
        quiz: [
          'Tu ___ lèves à quelle heure ?|te|se;me;tu|Com *tu*, o pronome é *te*.',
          '"Le déjeuner" é…|o almoço|o café da manhã;o jantar;o lanche|Na França: *petit-déjeuner* → *déjeuner* → *dîner*.',
          'Nous nous ___ tôt.|réveillons|réveillez;réveillent;réveille|*nous* → *-ons*.',
        ],
        fill: ['Je ___ lève à six heures.|me|Eu me levanto às seis.|*je me lève*', 'Elle ___ couche tard.|se|Ela se deita tarde.|*il/elle se*'],
      },
      {
        id: 'u6l3', title: 'Toujours, jamais', emoji: '🔄', goal: 'Falar de frequência',
        intro: 'Sempre, às vezes, nunca: palavras para dizer com que frequência você faz as coisas.',
        teach: [
          { title: 'Advérbios de frequência', text: 'Vêm logo **depois do verbo**:', table: [['toujours', 'sempre'], ['souvent', 'frequentemente'], ['parfois', 'às vezes'], ['rarement', 'raramente'], ['ne… jamais', 'nunca']], ex: ['Je bois toujours du café.|Sempre bebo café.', 'Il va souvent au cinéma.|Ele vai muito ao cinema.', 'Je ne fume jamais.|Nunca fumo.'] },
          { title: 'Expressões de tempo', ex: ['tous les jours|todos os dias', 'le week-end|nos fins de semana', 'une fois par semaine|uma vez por semana', 'le matin|de manhã'] },
        ],
        vocab: ['toujours|sempre|♾️', 'souvent|frequentemente|🔁', 'parfois|às vezes|🎲', 'rarement|raramente|🐢', 'jamais|nunca|🚫', 'tous les jours|todos os dias|📆'],
        sentences: ['Je fais du sport tous les jours.|Faço esporte todos os dias.', 'Elle est toujours en retard.|Ela está sempre atrasada.', 'On mange parfois au restaurant.|A gente come às vezes no restaurante.', 'Il ne regarde jamais la télé.|Ele nunca assiste TV.', 'Nous voyageons une fois par an.|Viajamos uma vez por ano.'],
        quiz: [
          'Onde fica "souvent"?|depois do verbo|antes do sujeito;no fim sempre;antes do verbo|*Je mange souvent…*',
          '"Je ne bois jamais de vin" =|Nunca bebo vinho.|Sempre bebo vinho.;Bebo vinho às vezes.;Não bebo mais vinho.|*ne… jamais* = nunca.',
          '"Parfois" =|às vezes|sempre;perfeito;raramente|*parfois* = às vezes.',
        ],
        fill: ['Il est ___ content. (sempre)|toujours|Ele está sempre contente.|*toujours* = sempre.', 'Je ne mange ___ de viande. (nunca)|jamais|Nunca como carne.|*ne… jamais*'],
      },
      {
        id: 'u6l4', title: 'Aller et faire', emoji: '🚶', goal: 'Os irregulares aller (ir) e faire (fazer)',
        intro: 'Dois verbos irregulares que você vai usar o tempo todo.',
        teach: [
          { title: 'Aller (ir)', table: [['je', 'vais'], ['tu', 'vas'], ['il / elle', 'va'], ['nous', 'allons'], ['vous', 'allez'], ['ils / elles', 'vont']], ex: ['Je vais au travail.|Vou ao trabalho.', 'On va à la plage ?|Vamos à praia?'] },
          { title: 'Faire (fazer)', table: [['je', 'fais'], ['tu', 'fais'], ['il / elle', 'fait'], ['nous', 'faisons'], ['vous', 'faites'], ['ils / elles', 'font']], text: '*Faire* aparece em muitas expressões: *faire du sport* (praticar esporte), *faire les courses* (fazer compras), *il fait beau* (o tempo está bom).', tip: '*Vous faites* — nunca *vous faisez* ❌.' },
        ],
        vocab: ['aller|ir|🚶', 'faire|fazer|🛠️', 'faire du sport|praticar esporte|⚽', 'faire les courses|fazer compras|🛒', 'il fait beau|o tempo está bom|☀️', 'il fait froid|está frio|❄️', 'la plage|a praia|🏖️'],
        sentences: ['Je vais à la plage.|Vou à praia.', 'Nous allons au cinéma ce soir.|Vamos ao cinema hoje à noite.', 'Qu\'est-ce que tu fais ?|O que você está fazendo?', 'Ils font du vélo le dimanche.|Eles andam de bicicleta aos domingos.', 'Il fait très chaud à Santarém.|Faz muito calor em Santarém.', 'Vous faites les courses ?|Vocês estão fazendo compras?'],
        quiz: [
          'Ils ___ au parc.|vont|allons;vas;va|*ils vont*',
          'Vous ___ du sport ?|faites|faisez;font;fais|Irregular: *vous faites*.',
          '"Il fait beau" fala sobre…|o tempo (clima)|alguém bonito;um trabalho;uma comida|*il fait beau/froid/chaud* = clima.',
        ],
        fill: ['Je ___ au travail. (aller)|vais|Vou ao trabalho.|*je vais*', 'Nous ___ les courses. (faire)|faisons|Fazemos compras.|*nous faisons*', 'Il ___ froid aujourd\'hui.|fait|Está frio hoje.|Clima com *il fait*.'],
      },
      {
        id: 'u6story', story: true, title: 'Une journée à Paris', emoji: '🗼', goal: 'História: a rotina de Camille',
        intro: 'Camille conta como é um dia normal dela em Paris.',
        dialogue: [
          'Raimundo|Camille, comment est ta journée typique ?|Camille, como é seu dia típico?',
          'Camille|Je me lève à sept heures et je prends un café.|Eu me levanto às sete e tomo um café.',
          'Camille|Je vais au bureau en métro. Je travaille de neuf heures à dix-huit heures.|Vou ao escritório de metrô. Trabalho das nove às dezoito.',
          'Raimundo|Et après le travail ?|E depois do trabalho?',
          'Camille|Parfois je fais du yoga. Le vendredi, je vais au cinéma avec des amis.|Às vezes faço yoga. Às sextas, vou ao cinema com amigos.',
          'Raimundo|Et tu te couches tard ?|E você dorme tarde?',
          'Camille|Non, jamais ! Je suis toujours fatiguée !|Não, nunca! Estou sempre cansada!',
        ],
        quiz: [
          'Como Camille vai ao trabalho?|De metrô|De ônibus;A pé;De bicicleta|*en métro*',
          'O que ela faz às sextas?|Vai ao cinema|Faz yoga;Trabalha até tarde;Vai à praia|*Le vendredi, je vais au cinéma.*',
          'Camille dorme tarde?|Nunca|Sempre;Às vezes;Nas sextas|*Non, jamais !*',
        ],
        vocab: ['le bureau|o escritório|🏢', 'le métro|o metrô|🚇', 'typique|típico|📋'],
        sentences: ['Je vais au bureau en métro.|Vou ao escritório de metrô.', 'Je travaille de neuf heures à dix-huit heures.|Trabalho das nove às dezoito.', 'Je suis toujours fatiguée.|Estou sempre cansada.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u7', level: 'A2', title: 'En ville', pt: 'Na cidade', emoji: '🏙️',
    desc: 'Lugares da cidade, pedir e dar direções, preposições e transportes.',
    lessons: [
      {
        id: 'u7l1', title: 'Les lieux', emoji: '🏛️', goal: 'Lugares da cidade',
        intro: 'Padaria, farmácia, estação… os lugares que você vai procurar numa cidade francesa.',
        teach: [
          { title: 'Lugares', table: [['la boulangerie', 'a padaria'], ['la pharmacie', 'a farmácia'], ['la gare', 'a estação de trem'], ['la banque', 'o banco'], ['le supermarché', 'o supermercado'], ['la poste', 'os correios'], ['le musée', 'o museu'], ['l\'hôpital', 'o hospital']] },
          { title: 'Il y a', text: '*Il y a* = há, tem (existência).\n*Il y a une pharmacie près d\'ici ?* = Tem uma farmácia aqui perto?\nNegativa: *Il n\'y a pas de…*', ex: ['Il y a un musée dans le centre.|Tem um museu no centro.', 'Il n\'y a pas de banque ici.|Não tem banco aqui.'] },
        ],
        vocab: ['la boulangerie|a padaria|🥖', 'la pharmacie|a farmácia|💊', 'la gare|a estação|🚉', 'la banque|o banco|🏦', 'le supermarché|o supermercado|🛒', 'le musée|o museu|🖼️', 'l\'hôpital|o hospital|🏥', 'l\'église|a igreja|⛪'],
        sentences: ['Il y a une boulangerie près d\'ici ?|Tem uma padaria aqui perto?', 'La gare est loin.|A estação é longe.', 'Il n\'y a pas de pharmacie dans cette rue.|Não tem farmácia nesta rua.', 'Le musée est fermé le mardi.|O museu fecha às terças.', 'Je cherche la banque.|Estou procurando o banco.'],
        quiz: [
          '"La gare" é…|a estação de trem|o estacionamento;a guerra;a garagem|*la gare* = estação.',
          'Como perguntar "Tem um supermercado aqui?"|Il y a un supermarché ici ?|Il est un supermarché ici ?;Il a un supermarché ici ?;C\'est un supermarché ici ?|*Il y a* = há, existe.',
          'Negativa de "Il y a un musée":|Il n\'y a pas de musée.|Il n\'y a pas un musée.;Il y a pas musée.;Il n\'a pas de musée.|*ne… pas* + *de*.',
        ],
        fill: ['Il ___ a une pharmacie ici ?|y|Tem uma farmácia aqui?|*il y a* = há.', 'Je cherche la ___. (padaria)|boulangerie|Procuro a padaria.|*boulangerie* = padaria.'],
      },
      {
        id: 'u7l2', title: 'À gauche, à droite', emoji: '🧭', goal: 'Pedir e entender direções',
        intro: 'Perdido em Paris? Aprenda a pedir ajuda e a entender a resposta.',
        teach: [
          { title: 'Perguntar', ex: ['Excusez-moi, où est la gare ?|Com licença, onde fica a estação?', 'Pour aller au musée, s\'il vous plaît ?|Para ir ao museu, por favor?', 'C\'est loin ?|É longe?'] },
          { title: 'Responder', table: [['à gauche', 'à esquerda'], ['à droite', 'à direita'], ['tout droit', 'em frente, reto'], ['tournez', 'vire'], ['prenez la première rue', 'pegue a primeira rua'], ['au coin', 'na esquina'], ['au feu', 'no semáforo']], tip: 'Cuidado: *à droite* (direita) ≠ *tout droit* (reto)!' },
        ],
        vocab: ['à gauche|à esquerda|⬅️', 'à droite|à direita|➡️', 'tout droit|em frente|⬆️', 'loin|longe|🏞️', 'près|perto|📍', 'la rue|a rua|🛣️', 'le feu|o semáforo|🚦', 'le coin|a esquina|↩️'],
        sentences: ['Excusez-moi, où est la gare ?|Com licença, onde fica a estação?', 'Allez tout droit.|Siga em frente.', 'Tournez à gauche au feu.|Vire à esquerda no semáforo.', 'C\'est la deuxième rue à droite.|É a segunda rua à direita.', 'Ce n\'est pas loin, c\'est à cinq minutes.|Não é longe, fica a cinco minutos.'],
        quiz: [
          '"Tout droit" significa…|em frente|à direita;tudo certo;à esquerda|*tout droit* = reto, em frente.',
          'Como dizer "vire à direita"?|Tournez à droite.|Tournez tout droit.;Allez à gauche.;Tournez droite.|*à droite* = à direita.',
          '"Au feu" significa…|no semáforo|no fogo;na esquina;no fim|*le feu* = o fogo, mas também o semáforo.',
        ],
        fill: ['Tournez à ___. (esquerda)|gauche|Vire à esquerda.|*à gauche*', 'Allez tout ___.|droit|Siga em frente.|*tout droit*'],
        dialogue: ['Touriste|Excusez-moi, où est la pharmacie ?|Com licença, onde fica a farmácia?', 'Passant|Allez tout droit, puis tournez à droite.|Siga em frente, depois vire à direita.', 'Touriste|C\'est loin ?|É longe?', 'Passant|Non, c\'est à deux minutes.|Não, fica a dois minutos.', 'Touriste|Merci beaucoup !|Muito obrigado!'],
      },
      {
        id: 'u7l3', title: 'Au, à la, chez', emoji: '📍', goal: 'Preposições de lugar',
        intro: 'Ao, à, na casa de, em cima, embaixo… para dizer onde as coisas estão.',
        teach: [
          { title: 'À + artigo', text: '*à + le* = **au**, *à + les* = **aux**. *à la* e *à l\'* não mudam.', table: [['au cinéma', 'ao cinema'], ['à la plage', 'à praia'], ['à l\'école', 'à escola'], ['aux toilettes', 'ao banheiro']], tip: 'Com cidades: *à Paris*. Com países femininos: *en France*; masculinos: *au Brésil*.' },
          { title: 'Chez e outras', table: [['chez moi', 'na minha casa'], ['chez le médecin', 'no médico'], ['dans', 'dentro de'], ['sur', 'sobre, em cima'], ['sous', 'embaixo'], ['devant', 'na frente'], ['derrière', 'atrás'], ['à côté de', 'ao lado de']] },
        ],
        vocab: ['au|ao (à + le)', 'aux|aos (à + les)', 'chez|na casa de|🏠', 'dans|dentro de|📦', 'sur|sobre|⬆️', 'sous|embaixo|⬇️', 'devant|na frente|🔜', 'derrière|atrás|🔙'],
        sentences: ['Je vais au cinéma.|Vou ao cinema.', 'On dîne chez moi ce soir.|Vamos jantar na minha casa hoje.', 'Le chat est sous la table.|O gato está embaixo da mesa.', 'J\'habite au Brésil.|Moro no Brasil.', 'Elle est en France.|Ela está na França.', 'La banque est à côté de la poste.|O banco fica ao lado dos correios.'],
        quiz: [
          'Je vais ___ marché.|au|à le;à la;aux|*à + le* = *au*.',
          'Como dizer "no Brasil"?|au Brésil|en Brésil;à Brésil;dans Brésil|*Brésil* é masculino → *au*.',
          '"Chez le dentiste" =|no dentista|o dentista;com o dentista;sem o dentista|*chez* = na casa/no consultório de.',
        ],
        fill: ['Je vais ___ toilettes.|aux|Vou ao banheiro.|*à + les* = *aux*.', 'Les clés sont ___ la table. (em cima)|sur|As chaves estão em cima da mesa.|*sur* = sobre.', 'J\'habite ___ France.|en|Moro na França.|País feminino → *en*.'],
      },
      {
        id: 'u7l4', title: 'Les transports', emoji: '🚇', goal: 'Meios de transporte',
        intro: 'De metrô, de trem, a pé… e como comprar um bilhete.',
        teach: [
          { title: 'En ou à?', text: 'Veículos fechados: **en** (*en bus, en train, en voiture, en avion, en métro*).\nNo “lombo”: **à** (*à pied, à vélo, à moto*).', ex: ['Je vais au travail en bus.|Vou ao trabalho de ônibus.', 'Il va à l\'école à pied.|Ele vai à escola a pé.'] },
          { title: 'Prendre', text: '*Prendre* (pegar) é irregular: *je prends, tu prends, il prend, nous prenons, vous prenez, ils prennent*.', ex: ['Je prends le train de 8 h.|Pego o trem das 8h.', 'Un billet pour Lyon, s\'il vous plaît.|Uma passagem para Lyon, por favor.', 'Aller-retour ou aller simple ?|Ida e volta ou só ida?'] },
        ],
        vocab: ['le bus|o ônibus|🚌', 'le train|o trem|🚆', 'la voiture|o carro|🚗', 'l\'avion|o avião|✈️', 'le vélo|a bicicleta|🚲', 'à pied|a pé|🚶', 'le billet|o bilhete, a passagem|🎫', 'le bateau|o barco|🛥️'],
        sentences: ['Je prends le bus tous les jours.|Pego ônibus todos os dias.', 'On va à Marseille en train.|A gente vai a Marselha de trem.', 'Elle va au travail à vélo.|Ela vai ao trabalho de bicicleta.', 'Un aller-retour pour Nice, s\'il vous plaît.|Uma ida e volta para Nice, por favor.', 'À Oriximiná, on voyage en bateau.|Em Oriximiná, a gente viaja de barco.'],
        quiz: [
          'Je vais à Paris ___ avion.|en|à;au;par|Veículo fechado → *en*.',
          'Il va au bureau ___ pied.|à|en;au;par|*à pied* = a pé.',
          'Nous ___ le métro.|prenons|prenez;prennent;prends|*nous prenons*',
        ],
        fill: ['Je vais au travail ___ voiture.|en|Vou ao trabalho de carro.|*en voiture*', 'Ils ___ le train. (prendre)|prennent|Eles pegam o trem.|*ils prennent* (com dois *n*).'],
      },
      {
        id: 'u7story', story: true, title: 'Perdu à Lyon', emoji: '🗺️', goal: 'História: perdido em Lyon',
        intro: 'Raimundo chega de trem em Lyon e precisa achar o hotel.',
        dialogue: [
          'Raimundo|Pardon, madame. Je cherche l\'hôtel Bellecour. C\'est loin ?|Com licença, senhora. Estou procurando o hotel Bellecour. É longe?',
          'Dame|Non, c\'est à dix minutes à pied.|Não, fica a dez minutos a pé.',
          'Dame|Allez tout droit jusqu\'à la place, puis tournez à gauche.|Siga em frente até a praça, depois vire à esquerda.',
          'Raimundo|À gauche après la place… Et il y a une pharmacie près de l\'hôtel ?|À esquerda depois da praça… E tem uma farmácia perto do hotel?',
          'Dame|Oui, juste à côté, devant la boulangerie.|Sim, logo ao lado, na frente da padaria.',
          'Raimundo|Merci mille fois !|Muito obrigado!',
        ],
        quiz: [
          'A que distância fica o hotel?|10 minutos a pé|10 minutos de ônibus;2 minutos;30 minutos|*à dix minutes à pied*',
          'Depois da praça, Raimundo deve…|virar à esquerda|virar à direita;seguir reto;pegar o metrô|*tournez à gauche*',
          'Onde fica a farmácia?|Ao lado do hotel, na frente da padaria|Atrás da estação;Na praça;Longe do hotel|*juste à côté, devant la boulangerie*',
        ],
        vocab: ['jusqu\'à|até|🏁', 'la place|a praça|⛲', 'puis|depois, então|➡️', 'merci mille fois|muitíssimo obrigado|🙏'],
        sentences: ['Je cherche l\'hôtel.|Estou procurando o hotel.', 'Allez jusqu\'à la place.|Vá até a praça.', 'Merci mille fois !|Muitíssimo obrigado!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u8', level: 'A2', title: 'Le passé composé', pt: 'O passado', emoji: '⏮️',
    desc: 'Contar o que aconteceu: passé composé com avoir e être, particípios e marcadores de tempo.',
    lessons: [
      {
        id: 'u8l1', title: 'J\'ai mangé', emoji: '🍽️', goal: 'Passé composé com avoir',
        intro: 'O *passé composé* é o passado do dia a dia: “comi”, “falei”, “assisti”.',
        teach: [
          { title: 'A fórmula', text: '**avoir** (no presente) + **particípio**\nVerbos em *-er*: troque *-er* por **-é**: *manger → mangé*, *parler → parlé*.', table: [['j\'', 'ai mangé', 'eu comi'], ['tu', 'as mangé', 'você comeu'], ['il / elle', 'a mangé', 'ele/ela comeu'], ['nous', 'avons mangé', 'nós comemos'], ['vous', 'avez mangé', 'vocês comeram'], ['ils / elles', 'ont mangé', 'eles comeram']] },
          { title: 'Outros grupos', text: 'Verbos em *-ir* (como *finir*): **-i** → *fini*, *choisi*, *dormi*.\nNegativa: *ne* + avoir + *pas* + particípio → *Je n\'ai pas mangé*.', ex: ['J\'ai fini mon travail.|Terminei meu trabalho.', 'Elle a dormi huit heures.|Ela dormiu oito horas.', 'Nous n\'avons pas regardé le film.|Não assistimos ao filme.'] },
        ],
        vocab: ['mangé|comido|🍽️', 'parlé|falado|💬', 'regardé|assistido|📺', 'écouté|escutado|🎧', 'fini|terminado|🏁', 'dormi|dormido|😴', 'choisi|escolhido|☝️'],
        sentences: ['J\'ai mangé une pizza.|Comi uma pizza.', 'Tu as parlé avec ta mère ?|Você falou com sua mãe?', 'Elle a fini ses devoirs.|Ela terminou a lição de casa.', 'Nous avons écouté la radio.|Escutamos o rádio.', 'Ils n\'ont pas dormi.|Eles não dormiram.'],
        quiz: [
          'Particípio de "travailler":|travaillé|travaillu;travaill;travailli|*-er* → *-é*.',
          'Nous ___ regardé un film.|avons|sommes;avez;ont|Com *regarder*, auxiliar *avoir*.',
          'Negativa de "J\'ai mangé":|Je n\'ai pas mangé.|Je n\'ai mangé pas.;Je ne pas ai mangé.;J\'ai pas ne mangé.|*ne… pas* envolve o auxiliar.',
        ],
        fill: ['J\'ai ___ avec Paul. (parler)|parlé|Falei com Paul.|*parler → parlé*', 'Elle ___ fini. (avoir)|a|Ela terminou.|*elle a*', 'Ils ont ___ huit heures. (dormir)|dormi|Eles dormiram oito horas.|*dormir → dormi*'],
      },
      {
        id: 'u8l2', title: 'Fait, pris, vu', emoji: '🧩', goal: 'Particípios irregulares',
        intro: 'Os verbos mais usados têm particípios irregulares. Vale decorar esta lista curta.',
        teach: [
          { title: 'Os principais', table: [['faire', 'fait', 'feito'], ['prendre', 'pris', 'pegado'], ['voir', 'vu', 'visto'], ['avoir', 'eu', 'tido'], ['être', 'été', 'sido'], ['boire', 'bu', 'bebido'], ['lire', 'lu', 'lido'], ['dire', 'dit', 'dito'], ['écrire', 'écrit', 'escrito'], ['mettre', 'mis', 'posto']] },
          { title: 'Em frases', ex: ['J\'ai fait un gâteau.|Fiz um bolo.', 'Tu as vu ce film ?|Você viu esse filme?', 'Il a pris le train.|Ele pegou o trem.', 'Nous avons bu du café.|Bebemos café.', 'J\'ai eu peur !|Tive medo! / Levei um susto!'], tip: '*J\'ai été* = eu fui/estive. Ex.: *J\'ai été malade* = fiquei doente.' },
        ],
        vocab: ['fait|feito|🛠️', 'pris|pegado|🫳', 'vu|visto|👁️', 'eu|tido|🤲', 'été|sido, estado|✨', 'bu|bebido|🥤', 'lu|lido|📖', 'écrit|escrito|✍️'],
        sentences: ['J\'ai vu la tour Eiffel.|Vi a Torre Eiffel.', 'Qu\'est-ce que tu as fait hier ?|O que você fez ontem?', 'Elle a lu un livre.|Ela leu um livro.', 'Nous avons pris un taxi.|Pegamos um táxi.', 'Il a écrit une lettre.|Ele escreveu uma carta.'],
        quiz: [
          'Particípio de "voir":|vu|voi;voyé;vé|*voir → vu*.',
          'J\'ai ___ le métro. (prendre)|pris|prendu;prené;pri|*prendre → pris*.',
          'Particípio de "avoir":|eu|avé;avu;été|*avoir → eu* (pronuncia “ü”).',
        ],
        fill: ['J\'ai ___ un gâteau. (faire)|fait|Fiz um bolo.|*faire → fait*', 'Tu as ___ ce livre ? (lire)|lu|Você leu esse livro?|*lire → lu*', 'Ils ont ___ du vin. (boire)|bu|Eles beberam vinho.|*boire → bu*'],
      },
      {
        id: 'u8l3', title: 'Je suis allé', emoji: '✈️', goal: 'Passé composé com être',
        intro: 'Alguns verbos usam *être* no passado — quase todos de movimento. E aí o particípio concorda!',
        teach: [
          { title: 'A casa do être', text: 'Usam *être*: **aller, venir, arriver, partir, entrer, sortir, monter, descendre, naître, mourir, rester, tomber, retourner, devenir** — e todos os verbos pronominais (*se lever*…).', tip: 'Imagine uma casa: você **chega**, **entra**, **sobe**, **desce**, **sai**, **parte**… todos movimentos → *être*.' },
          { title: 'Concordância', text: 'Com *être*, o particípio concorda com o sujeito como um adjetivo:\n*Il est allé* / *Elle est allée* / *Ils sont allés* / *Elles sont allées*.', ex: ['Je suis allé à Paris.|Fui a Paris. (homem)', 'Je suis allée à Paris.|Fui a Paris. (mulher)', 'Elle est née en 1995.|Ela nasceu em 1995.', 'Nous sommes partis tôt.|Saímos cedo.'] },
        ],
        vocab: ['allé|ido|🚶', 'venu|vindo|🏃', 'arrivé|chegado|🛬', 'parti|partido, saído|🛫', 'né|nascido|👶', 'resté|ficado|🧘', 'tombé|caído|🤕', 'sorti|saído|🚪'],
        sentences: ['Je suis allé au marché.|Fui à feira.', 'Elle est arrivée hier soir.|Ela chegou ontem à noite.', 'Nous sommes restés à la maison.|Ficamos em casa.', 'Ils sont partis en vacances.|Eles saíram de férias.', 'Je suis né à Oriximiná.|Nasci em Oriximiná.', 'Elle est tombée dans la rue.|Ela caiu na rua.'],
        quiz: [
          'Elle ___ partie à huit heures.|est|a;ai;as|*partir* usa *être*.',
          'Marie est ___ en France. (aller)|allée|allé;allés;aller|Sujeito feminino → *allée*.',
          'Qual verbo usa ÊTRE no passado?|arriver|manger;faire;regarder|Movimento → *être*.',
        ],
        fill: ['Nous ___ arrivés en retard.|sommes|Chegamos atrasados.|*arriver* → *être*.', 'Elles sont ___ hier. (venir)|venues|Elas vieram ontem.|Feminino plural → *venues*.', 'Je ___ resté chez moi.|suis|Fiquei em casa.|*rester* → *être*.'],
      },
      {
        id: 'u8l4', title: 'Hier', emoji: '📅', goal: 'Marcadores de tempo passado',
        intro: 'Ontem, semana passada, há dois anos: as palavras que situam a história no tempo.',
        teach: [
          { title: 'Marcadores', table: [['hier', 'ontem'], ['avant-hier', 'anteontem'], ['hier soir', 'ontem à noite'], ['la semaine dernière', 'a semana passada'], ['le mois dernier', 'o mês passado'], ['l\'année dernière', 'o ano passado'], ['il y a deux jours', 'há dois dias'], ['déjà', 'já']], ex: ['Hier, j\'ai travaillé jusqu\'à 20 h.|Ontem trabalhei até as 20h.', 'Il y a trois ans, je suis allé en France.|Há três anos, fui à França.'] },
          { title: 'Déjà e pas encore', text: '*déjà* = já; *pas encore* = ainda não. Ficam entre o auxiliar e o particípio.', ex: ['Tu as déjà mangé ?|Você já comeu?', 'Non, je n\'ai pas encore mangé.|Não, ainda não comi.'] },
        ],
        vocab: ['hier|ontem|⏪', 'la semaine dernière|a semana passada|🗓️', 'l\'année dernière|o ano passado|📆', 'il y a|há (tempo)|⌛', 'déjà|já|✅', 'pas encore|ainda não|⏳'],
        sentences: ['Hier soir, nous sommes allés au cinéma.|Ontem à noite fomos ao cinema.', 'J\'ai visité Paris l\'année dernière.|Visitei Paris no ano passado.', 'Il est parti il y a une heure.|Ele saiu há uma hora.', 'Tu as déjà vu ce film ?|Você já viu esse filme?', 'Je n\'ai pas encore fini.|Ainda não terminei.'],
        quiz: [
          '"Il y a deux ans" =|há dois anos|em dois anos;há dois anos atrás de mim;faz dois anos que vou|*il y a* + tempo = há (passado).',
          'Onde fica "déjà"?|entre o auxiliar e o particípio|antes do sujeito;no fim;depois do particípio|*J\'ai déjà mangé.*',
          '"La semaine dernière" =|a semana passada|a última semana do mês;a semana que vem;esta semana|*dernier/dernière* = passado, último.',
        ],
        fill: ['___, j\'ai travaillé. (ontem)|Hier|Ontem trabalhei.|*hier* = ontem.', 'Tu as ___ mangé ? (já)|déjà|Você já comeu?|*déjà* = já.'],
      },
      {
        id: 'u8story', story: true, title: 'Le week-end dernier', emoji: '🎒', goal: 'História: o que você fez no fim de semana?',
        intro: 'Segunda-feira no escritório: Camille pergunta sobre o fim de semana de Raimundo.',
        dialogue: [
          'Camille|Alors, qu\'est-ce que tu as fait ce week-end ?|E aí, o que você fez neste fim de semana?',
          'Raimundo|Samedi, je suis allé à Versailles avec des amis.|No sábado, fui a Versalhes com uns amigos.',
          'Camille|Super ! Vous avez pris le train ?|Que ótimo! Vocês pegaram o trem?',
          'Raimundo|Oui, on est partis tôt. On a vu le château et les jardins.|Sim, saímos cedo. Vimos o castelo e os jardins.',
          'Camille|Et dimanche ?|E no domingo?',
          'Raimundo|Dimanche, je suis resté à la maison. J\'ai lu et j\'ai dormi !|No domingo, fiquei em casa. Li e dormi!',
        ],
        quiz: [
          'Aonde Raimundo foi no sábado?|Versalhes|Lyon;Marselha;Ao museu do Louvre|*je suis allé à Versailles*',
          'Como eles foram?|De trem|De carro;De ônibus;A pé|*Vous avez pris le train ? — Oui.*',
          'O que ele fez no domingo?|Ficou em casa, leu e dormiu|Foi ao cinema;Trabalhou;Visitou amigos|*je suis resté à la maison*',
        ],
        vocab: ['le château|o castelo|🏰', 'les jardins|os jardins|🌳', 'tôt|cedo|🌅', 'super|ótimo|🤩'],
        sentences: ['Qu\'est-ce que tu as fait ce week-end ?|O que você fez neste fim de semana?', 'On est partis tôt.|Saímos cedo.', 'Je suis resté à la maison.|Fiquei em casa.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u9', level: 'A2', title: 'Shopping', pt: 'Compras', emoji: '🛍️',
    desc: 'Roupas, cores, comparações e conversas na loja.',
    lessons: [
      {
        id: 'u9l1', title: 'Les vêtements', emoji: '👗', goal: 'Vocabulário de roupas',
        intro: 'Camisa, calça, sapato… e o verbo *porter* (vestir, usar).',
        teach: [
          { title: 'Roupas', table: [['la chemise', 'a camisa'], ['le t-shirt', 'a camiseta'], ['le pantalon', 'a calça'], ['la jupe', 'a saia'], ['la robe', 'o vestido'], ['les chaussures', 'os sapatos'], ['le manteau', 'o casaco'], ['le chapeau', 'o chapéu']] },
          { title: 'Porter', text: '*Porter* = usar, vestir (regular em *-er*): *Il porte une chemise blanche.*', tip: '*Le pantalon* é singular em francês, ao contrário de “as calças”.' },
        ],
        vocab: ['la chemise|a camisa|👔', 'le t-shirt|a camiseta|👕', 'le pantalon|a calça|👖', 'la robe|o vestido|👗', 'les chaussures|os sapatos|👞', 'le manteau|o casaco|🧥', 'le chapeau|o chapéu|🎩', 'la jupe|a saia|🩳'],
        sentences: ['Je porte un t-shirt et un jean.|Estou usando camiseta e jeans.', 'Elle achète une robe.|Ela compra um vestido.', 'Ces chaussures sont confortables.|Estes sapatos são confortáveis.', 'Il fait froid, prends ton manteau !|Está frio, pegue seu casaco!'],
        quiz: [
          '"La robe" é…|o vestido|o roupão;a roupa;a bata|*robe* = vestido.',
          '"Le pantalon" é…|a calça|o casaco;a camisa;o short|*pantalon* = calça (singular).',
          'Il ___ une chemise bleue.|porte|portes;portent;porté|*il porte* = ele usa.',
        ],
        fill: ['Elle porte une ___. (vestido)|robe|Ela usa um vestido.|*robe* = vestido.', 'Mes ___ sont neuves. (sapatos)|chaussures|Meus sapatos são novos.|*chaussures* = sapatos.'],
      },
      {
        id: 'u9l2', title: 'Les couleurs', emoji: '🎨', goal: 'Cores e concordância',
        intro: 'As cores são adjetivos: vêm **depois** do substantivo e concordam com ele.',
        teach: [
          { title: 'Cores', table: [['rouge', 'vermelho'], ['bleu / bleue', 'azul'], ['vert / verte', 'verde'], ['jaune', 'amarelo'], ['noir / noire', 'preto'], ['blanc / blanche', 'branco'], ['gris / grise', 'cinza'], ['rose', 'rosa'], ['marron', 'marrom (não muda!)'], ['orange', 'laranja (não muda!)']] },
          { title: 'Posição e concordância', text: 'Cor vem **depois**: *une robe rouge*, *des chaussures noires*.\n*Marron* e *orange* nunca mudam: *des chaussures marron*.', ex: ['un pantalon noir|uma calça preta', 'une chemise blanche|uma camisa branca', 'des yeux verts|olhos verdes'] },
        ],
        vocab: ['rouge|vermelho|🔴', 'bleu|azul|🔵', 'vert|verde|🟢', 'jaune|amarelo|🟡', 'noir|preto|⚫', 'blanc|branco|⚪', 'rose|rosa|🩷', 'orange|laranja|🟠'],
        sentences: ['J\'aime cette robe rouge.|Gosto deste vestido vermelho.', 'Il a une voiture blanche.|Ele tem um carro branco.', 'Les murs sont jaunes.|As paredes são amarelas.', 'Je cherche des chaussures noires.|Procuro sapatos pretos.'],
        quiz: [
          'Une chemise ___.|blanche|blanc;blancs;blanches|Feminino de *blanc* = *blanche*.',
          'Qual é a ordem certa?|une jupe verte|une verte jupe;verte une jupe;une jupe vert|Cor depois do substantivo, concordando.',
          'Des chaussures ___. (marrom)|marron|marrons;marronnes;marrone|*marron* é invariável.',
        ],
        fill: ['Une voiture ___. (preta)|noire|Um carro preto.|Feminino → *noire*.', 'Des yeux ___. (azuis)|bleus|Olhos azuis.|Masculino plural → *bleus*.'],
      },
      {
        id: 'u9l3', title: 'Plus… que', emoji: '⚖️', goal: 'Comparar coisas',
        intro: 'Mais caro, menos bonito, tão grande quanto: vamos comparar!',
        teach: [
          { title: 'Comparativos', table: [['plus… que', 'mais… que'], ['moins… que', 'menos… que'], ['aussi… que', 'tão… quanto']], ex: ['Cette robe est plus chère que l\'autre.|Este vestido é mais caro que o outro.', 'Paris est moins grand que São Paulo.|Paris é menor que São Paulo.', 'Il est aussi grand que son père.|Ele é tão alto quanto o pai.'] },
          { title: 'Irregulares', text: '*bon* → **meilleur** (melhor). Nunca diga *plus bon* ❌.\n*bien* → **mieux**.\nSuperlativo: *le plus…*, *le meilleur*.', ex: ['Ce café est meilleur.|Este café é melhor.', 'C\'est le meilleur restaurant de la ville.|É o melhor restaurante da cidade.', 'Elle chante mieux que moi.|Ela canta melhor que eu.'] },
        ],
        vocab: ['plus|mais|➕', 'moins|menos|➖', 'aussi|tão, também|🟰', 'meilleur|melhor|🏆', 'mieux|melhor (advérbio)|👍', 'cher|caro|💸', 'bon marché|barato|🏷️'],
        sentences: ['Ce pantalon est plus cher que la jupe.|Esta calça é mais cara que a saia.', 'Le train est plus rapide que le bus.|O trem é mais rápido que o ônibus.', 'Ton idée est meilleure !|Sua ideia é melhor!', 'Je parle mieux français maintenant.|Falo francês melhor agora.', 'C\'est le plus beau jour de ma vie.|É o dia mais bonito da minha vida.'],
        quiz: [
          'Ce gâteau est ___ que l\'autre. (melhor)|meilleur|plus bon;mieux;plus meilleur|*bon* → *meilleur*.',
          '"Aussi grand que" =|tão alto quanto|mais alto que;menos alto que;também alto|*aussi… que* = igualdade.',
          'Il danse ___ que moi. (melhor)|mieux|meilleur;plus bien;bon|Com verbo (advérbio *bien*) → *mieux*.',
        ],
        fill: ['Le TGV est ___ rapide que le bus. (mais)|plus|O TGV é mais rápido que o ônibus.|*plus… que*', 'C\'est le ___ film de l\'année. (melhor)|meilleur|É o melhor filme do ano.|Superlativo de *bon*.'],
      },
      {
        id: 'u9l4', title: 'Au magasin', emoji: '🏬', goal: 'Comprar roupas numa loja',
        intro: 'Experimentar, perguntar o tamanho e pagar — tudo em francês.',
        teach: [
          { title: 'Frases úteis', ex: ['Je peux vous aider ?|Posso ajudar?', 'Je regarde, merci.|Só estou olhando, obrigado.', 'Je peux l\'essayer ?|Posso experimentar?', 'Où sont les cabines ?|Onde ficam os provadores?', 'Vous avez une taille plus grande ?|Tem um tamanho maior?', 'Je fais du 40.|Eu visto 40.', 'Je le prends !|Vou levar!'] },
          { title: 'Le, la, les (objeto)', text: 'Para não repetir o objeto: *Je prends la robe* → *Je **la** prends*. Vem **antes** do verbo.', tip: '*Ça me va bien ?* = Ficou bem em mim?' },
        ],
        vocab: ['la taille|o tamanho|📏', 'essayer|experimentar|🪞', 'la cabine|o provador|🚪', 'les soldes|a liquidação|🏷️', 'la caisse|o caixa|💳', 'aider|ajudar|🤝'],
        sentences: ['Je peux l\'essayer ?|Posso experimentar?', 'Vous avez cette chemise en bleu ?|Vocês têm esta camisa em azul?', 'C\'est trop petit pour moi.|É pequeno demais para mim.', 'Ça me va bien ?|Ficou bem em mim?', 'Je la prends.|Vou levar (ela).', 'C\'est en soldes ?|Está em liquidação?'],
        quiz: [
          '"Je regarde, merci" serve para…|dizer que só está olhando|pedir ajuda;pagar;experimentar|Resposta educada ao vendedor.',
          'Je prends le manteau → Je ___ prends.|le|la;les;lui|*manteau* é masculino → *le*.',
          '"Les soldes" é…|a liquidação|o salário;os soldados;os saldos bancários|Na França há *soldes* em janeiro e julho.',
        ],
        fill: ['Je peux l\'___ ?|essayer|Posso experimentar?|*essayer* = experimentar.', 'Vous avez une ___ plus grande ?|taille|Tem um tamanho maior?|*taille* = tamanho.'],
      },
      {
        id: 'u9story', story: true, title: 'Les soldes', emoji: '🏷️', goal: 'História: liquidação em Paris',
        intro: 'Janeiro é mês de *soldes*. Camille ajuda Raimundo a escolher um casaco.',
        dialogue: [
          'Vendeur|Bonjour ! Je peux vous aider ?|Olá! Posso ajudar?',
          'Raimundo|Oui, je cherche un manteau chaud. Il fait très froid ici !|Sim, procuro um casaco quente. Faz muito frio aqui!',
          'Vendeur|Ce manteau noir est en soldes : moins cinquante pour cent.|Este casaco preto está em liquidação: cinquenta por cento de desconto.',
          'Camille|Le gris est plus beau, non ?|O cinza é mais bonito, não?',
          'Raimundo|Oui, mais il est plus cher. Je peux essayer le noir ?|Sim, mas é mais caro. Posso experimentar o preto?',
          'Vendeur|Bien sûr. Les cabines sont au fond.|Claro. Os provadores ficam no fundo.',
          'Raimundo|Il me va très bien. Je le prends !|Ficou muito bem em mim. Vou levar!',
        ],
        quiz: [
          'Qual casaco está em liquidação?|O preto|O cinza;O azul;Os dois|*Ce manteau noir est en soldes.*',
          'Por que Raimundo não escolhe o cinza?|É mais caro|É feio;É pequeno;É fino|*il est plus cher*',
          'Onde ficam os provadores?|No fundo da loja|Na entrada;No segundo andar;Ao lado do caixa|*au fond* = no fundo.',
        ],
        vocab: ['chaud|quente|🔥', 'pour cent|por cento|💯', 'au fond|no fundo|⬇️'],
        sentences: ['Je cherche un manteau chaud.|Procuro um casaco quente.', 'C\'est moins cinquante pour cent.|É cinquenta por cento de desconto.', 'Il me va très bien.|Ficou muito bem em mim.'],
      },
    ],
  },
];
