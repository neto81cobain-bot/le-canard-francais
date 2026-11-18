// Aventuras 51–60 (B2 e C1). Mesmo formato de adventures.js.
const A = (id, title, emoji, level, desc, nodes) => ({ id, title, emoji, level, desc, start: "a", nodes });
const c = (fr, pt, to, tip) => (tip ? { fr, pt, to, tip } : { fr, pt, to });

export const ADVENTURES_6 = [
  A("caution", "A devolução do caução", "🔑", "B2", "Você saiu do apartamento e o proprietário quer reter o depósito.", {
    a: { lines: ["Le propriétaire : « Je vais garder trois cents euros de la caution pour la peinture du salon. »|O proprietário: “Vou reter trezentos euros do caução pela pintura da sala.”"], choices: [
      c("Je comprends, mais l'état des lieux d'entrée mentionnait déjà des traces sur ce mur.", "Entendo, mas a vistoria de entrada já mencionava marcas nessa parede.", "b"),
      c("Vous plaisantez ? C'est du vol !", "Está brincando? Isso é roubo!", "b2", "Argumente com documentos (o “état des lieux”), não com acusações.") ] },
    b: { lines: ["« Vraiment ? Je ne m'en souviens pas. »|“Sério? Não me lembro disso.”"], choices: [
      c("J'ai une copie signée ici, avec les photos. Je vous propose qu'on la relise ensemble.", "Tenho uma cópia assinada aqui, com as fotos. Proponho que a gente releia junto.", "c") ] },
    b2: { lines: ["« Je ne vous permets pas ! Si vous le prenez comme ça… »|“Não admito! Se o senhor leva assim…”"], choices: [
      c("Excusez-moi. Regardons plutôt l'état des lieux d'entrée.", "Desculpe. Vamos olhar a vistoria de entrada.", "b"),
      c("Je vais saisir la justice !", "Vou à justiça!", "end_ok") ] },
    c: { lines: ["Il lit le document en silence. « Effectivement… c'était déjà là. »|Ele lê o documento em silêncio. “De fato… já estava assim.”"], choices: [
      c("Je vous remercie de le reconnaître. Je compte donc sur la restitution intégrale sous un mois, comme le prévoit la loi.", "Agradeço por reconhecer. Conto então com a devolução integral em um mês, como prevê a lei.", "end_best") ] },
    end_ok: { end: "good", lines: ["Après des mois de démarches, tu récupères ton argent… épuisé.|Depois de meses de trâmites, você recupera o dinheiro… exausto."] },
    end_best: { end: "best", lines: ["Deux semaines plus tard, la totalité de la caution est sur ton compte. Argumentation impeccable !|Duas semanas depois, o caução inteiro está na sua conta. Argumentação impecável!"] },
  }),
  A("parents", "Reunião de pais na escola", "🏫", "B2", "A professora do seu sobrinho quer conversar sobre o comportamento dele.", {
    a: { lines: ["L'institutrice : « Merci d'être venu. Théo est brillant, mais il perturbe souvent la classe. »|A professora: “Obrigada por ter vindo. Théo é brilhante, mas atrapalha a turma com frequência.”"], choices: [
      c("Merci de m'en parler. Pourriez-vous me donner des exemples concrets ?", "Obrigado por me contar. Poderia me dar exemplos concretos?", "b"),
      c("Théo ? Impossible, il est adorable à la maison.", "Théo? Impossível, ele é um amor em casa.", "b2", "Ouvir antes de defender ajuda a encontrar soluções.") ] },
    b: { lines: ["« Il finit ses exercices en cinq minutes et ensuite, il s'ennuie et bavarde. »|“Ele termina os exercícios em cinco minutos e depois fica entediado e conversa.”"], choices: [
      c("Et s'il avait des exercices supplémentaires, plus difficiles ? Il a peut-être besoin de défis.", "E se ele tivesse exercícios extras, mais difíceis? Talvez ele precise de desafios.", "c"),
      c("Je vais le punir, alors.", "Então vou castigá-lo.", "end_ok") ] },
    b2: { lines: ["« Je ne dis pas qu'il est méchant. Mais en classe, c'est différent. »|“Não digo que ele é malvado. Mas na sala é diferente.”"], choices: [
      c("Je vous écoute. Que se passe-t-il exactement ?", "Estou ouvindo. O que acontece exatamente?", "b") ] },
    c: { lines: ["« C'est une excellente idée. Je peux lui confier un projet de recherche. »|“É uma excelente ideia. Posso confiar a ele um projeto de pesquisa.”"], choices: [
      c("Parfait. Faisons un point dans un mois pour voir si ça l'aide.", "Perfeito. Vamos conversar de novo em um mês para ver se ajuda.", "end_best") ] },
    end_ok: { end: "good", lines: ["Théo se calme un peu… mais il trouve l'école de plus en plus ennuyeuse.|Théo se acalma um pouco… mas acha a escola cada vez mais chata."] },
    end_best: { end: "best", lines: ["Un mois plus tard, Théo présente son projet sur les volcans à toute l'école !|Um mês depois, Théo apresenta seu projeto sobre vulcões para a escola toda!"] },
  }),
  A("brocante", "Negociando na feira de antiguidades", "🏺", "B2", "Você encontrou um relógio antigo lindo, mas caro demais.", {
    a: { lines: ["Le brocanteur : « Belle pièce, hein ? Horloge de 1920. Deux cents euros. »|O antiquário: “Bela peça, hein? Relógio de 1920. Duzentos euros.”"], choices: [
      c("Elle est superbe. Mais le cadran est un peu abîmé, et elle ne fonctionne pas, si je ne m'abuse ?", "É linda. Mas o mostrador está um pouco danificado, e ele não funciona, se não me engano?", "b"),
      c("Cent euros, c'est mon dernier prix !", "Cem euros, é meu último preço!", "b2", "Começar com ultimato fecha a negociação. Aponte os defeitos com elegância.") ] },
    b: { lines: ["« Bon… il faudrait la faire réviser, c'est vrai. Je peux faire cent soixante-dix. »|“Bom… precisaria de revisão, é verdade. Posso fazer por cento e setenta.”"], choices: [
      c("La révision coûte au moins cinquante euros. Que diriez-vous de cent trente ?", "A revisão custa pelo menos cinquenta euros. O que acha de cento e trinta?", "c") ] },
    b2: { lines: ["« Cent ? Vous voulez me ruiner ! »|“Cem? O senhor quer me arruinar!”"], choices: [
      c("Pardon, j'ai été brusque. Elle ne fonctionne pas, n'est-ce pas ?", "Desculpe, fui brusco. Ele não funciona, não é?", "b"),
      c("Tant pis, au revoir.", "Paciência, tchau.", "end_ok") ] },
    c: { lines: ["« Allez, cent cinquante, et je vous donne l'adresse d'un bon horloger. »|“Vamos lá, cento e cinquenta, e eu te dou o endereço de um bom relojoeiro.”"], choices: [
      c("Marché conclu ! Ravi de faire affaire avec vous.", "Fechado! Foi um prazer fazer negócio com o senhor.", "end_best") ] },
    end_ok: { end: "good", lines: ["Tu repars sans l'horloge… et tu y repenses toute la semaine.|Você vai embora sem o relógio… e fica pensando nele a semana inteira."] },
    end_best: { end: "best", lines: ["Cinquante euros d'économie et un contact précieux. Négociation de pro !|Cinquenta euros de economia e um contato precioso. Negociação de profissional!"] },
  }),
  A("projet", "Apresentando um projeto", "📊", "B2", "Você precisa convencer a diretoria a financiar um projeto de reciclagem.", {
    a: { lines: ["Le directeur : « Vous avez dix minutes. Allez-y. »|O diretor: “O senhor tem dez minutos. Pode começar.”"], choices: [
      c("Merci. En un mot : ce projet réduirait nos déchets de quarante pour cent et nos coûts de quinze pour cent.", "Obrigado. Em resumo: este projeto reduziria nossos resíduos em quarenta por cento e nossos custos em quinze por cento.", "b"),
      c("Alors, d'abord, je vais vous raconter l'histoire du recyclage depuis 1970…", "Então, primeiro, vou contar a história da reciclagem desde 1970…", "b2", "Com pouco tempo, comece pelo resultado principal.") ] },
    b: { lines: ["La directrice financière : « Quinze pour cent ? Sur quelle base ? »|A diretora financeira: “Quinze por cento? Com base em quê?”"], choices: [
      c("Sur les données de l'usine pilote de Lyon, que je vous ai envoyées hier.", "Nos dados da fábrica-piloto de Lyon, que enviei ontem.", "c"),
      c("C'est une estimation… assez optimiste.", "É uma estimativa… bem otimista.", "end_ok") ] },
    b2: { lines: ["Le directeur regarde sa montre…|O diretor olha o relógio…"], choices: [
      c("Pardon, j'en viens au fait : moins quarante pour cent de déchets, moins quinze pour cent de coûts.", "Desculpe, vou direto ao ponto: menos quarenta por cento de resíduos, menos quinze por cento de custos.", "b") ] },
    c: { lines: ["« Et l'investissement initial ? »|“E o investimento inicial?”"], choices: [
      c("Cent mille euros, amortis en dix-huit mois. Je propose de commencer par un site test.", "Cem mil euros, amortizados em dezoito meses. Proponho começar por uma unidade de teste.", "end_best") ] },
    end_ok: { end: "good", lines: ["« Revenez avec des chiffres plus solides. » Le projet est reporté.|“Volte com números mais sólidos.” O projeto é adiado."] },
    end_best: { end: "best", lines: ["Le directeur sourit : « Clair, chiffré, prudent. On valide le site test. »|O diretor sorri: “Claro, com números, prudente. Aprovamos a unidade de teste.”"] },
  }),
  A("quartier", "Conselho do bairro", "🏘️", "B2", "Na reunião do bairro, discute-se transformar um terreno baldio.", {
    a: { lines: ["Le président : « Certains veulent un parking, d'autres un jardin partagé. Votre avis ? »|O presidente: “Alguns querem um estacionamento, outros uma horta comunitária. Sua opinião?”"], choices: [
      c("À mon sens, un jardin partagé renforcerait les liens entre voisins, tout en améliorant le cadre de vie.", "Na minha visão, uma horta comunitária fortaleceria os laços entre vizinhos, além de melhorar a qualidade de vida.", "b"),
      c("Le parking ne sert à rien, c'est évident.", "O estacionamento não serve para nada, é óbvio.", "b2", "Desqualificar a outra opção cria resistência. Argumente pelos benefícios.") ] },
    b: { lines: ["Un commerçant : « Mais mes clients ne trouvent jamais de place pour se garer ! »|Um comerciante: “Mas meus clientes nunca acham vaga para estacionar!”"], choices: [
      c("C'est un vrai problème. Et si on réservait une partie du terrain à quelques places de livraison et de courte durée ?", "É um problema real. E se a gente reservasse parte do terreno para algumas vagas de carga e descarga e de curta duração?", "c") ] },
    b2: { lines: ["Le commerçant s'énerve : « Facile à dire quand on n'a pas de magasin ! »|O comerciante se irrita: “Fácil falar quando não se tem loja!”"], choices: [
      c("Vous avez raison, pardon. Comment pourrait-on concilier les deux ?", "O senhor tem razão, desculpe. Como poderíamos conciliar os dois?", "b") ] },
    c: { lines: ["Le président : « Un compromis… Mettons-le au vote ! »|O presidente: “Um meio-termo… Vamos votar!”"], choices: [
      c("Je propose aussi qu'on crée un groupe de bénévoles pour entretenir le jardin.", "Proponho também criar um grupo de voluntários para cuidar da horta.", "end_best"),
      c("D'accord, votons.", "Certo, vamos votar.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Le compromis passe de justesse.|O meio-termo é aprovado por pouco."] },
    end_best: { end: "best", lines: ["Adopté à l'unanimité ! Au printemps, tu plantes les premières tomates avec le commerçant.|Aprovado por unanimidade! Na primavera, você planta os primeiros tomates com o comerciante."] },
  }),
  A("journaliste", "Entrevista para o jornal", "🗞️", "B2", "Um jornalista te entrevista sobre a enchente que atingiu sua cidade.", {
    a: { lines: ["Le journaliste : « Vous habitez ici depuis longtemps. Ces inondations vous ont surpris ? »|O jornalista: “O senhor mora aqui há muito tempo. Essas enchentes o surpreenderam?”"], choices: [
      c("Par leur ampleur, oui. Mais les scientifiques nous alertaient depuis des années.", "Pela dimensão, sim. Mas os cientistas nos alertavam havia anos.", "b"),
      c("C'est la faute du maire, point final.", "É culpa do prefeito, ponto final.", "b2", "Diante da imprensa, prefira fatos a acusações.") ] },
    b: { lines: ["« Qu'est-ce qui aurait pu être fait ? »|“O que poderia ter sido feito?”"], choices: [
      c("Préserver les zones humides, qui absorbent l'eau, au lieu de construire dessus.", "Preservar as áreas úmidas, que absorvem a água, em vez de construir em cima delas.", "c") ] },
    b2: { lines: ["« Vous pouvez développer ? Qu'est-ce qui lui est reproché, concrètement ? »|“Pode desenvolver? O que se critica nele, concretamente?”"], choices: [
      c("En fait, le problème est plus large : on a construit sur les zones humides.", "Na verdade, o problema é mais amplo: construiu-se sobre as áreas úmidas.", "b") ] },
    c: { lines: ["« Et aujourd'hui, quel message voulez-vous faire passer ? »|“E hoje, que mensagem o senhor quer passar?”"], choices: [
      c("Que la solidarité des habitants a été admirable, et qu'il faut maintenant reconstruire autrement.", "Que a solidariedade dos moradores foi admirável, e que agora é preciso reconstruir de outro jeito.", "end_best"),
      c("Qu'on est fatigués.", "Que estamos cansados.", "end_ok") ] },
    end_ok: { end: "good", lines: ["L'article paraît. Ton témoignage est court mais sincère.|O artigo sai. Seu depoimento é curto, mas sincero."] },
    end_best: { end: "best", lines: ["Ta citation fait la une : « Reconstruire autrement. » La mairie t'invite à un débat public !|Sua citação vira manchete: “Reconstruir de outro jeito.” A prefeitura te convida para um debate público!"] },
  }),
  A("master", "Entrevista para o mestrado", "🎓", "C1", "Você disputa uma vaga num mestrado em Paris.", {
    a: { lines: ["La professeure : « Pourquoi ce master, et pourquoi maintenant ? »|A professora: “Por que este mestrado, e por que agora?”"], choices: [
      c("Après cinq ans de terrain, j'ai mesuré mes limites théoriques ; ce master me permettrait de les dépasser.", "Depois de cinco anos de campo, percebi meus limites teóricos; este mestrado me permitiria superá-los.", "b"),
      c("Parce que c'est un bon master et qu'il est à Paris.", "Porque é um bom mestrado e fica em Paris.", "b2", "Mostre um projeto coerente: trajetória → necessidade → objetivo.") ] },
    b: { lines: ["« Quel serait votre sujet de mémoire ? »|“Qual seria o tema da sua dissertação?”"], choices: [
      c("J'envisagerais d'étudier l'impact de l'exploitation minière sur la qualité de l'eau des communautés riveraines.", "Eu pensaria em estudar o impacto da mineração na qualidade da água das comunidades ribeirinhas.", "c") ] },
    b2: { lines: ["« Certes. Mais qu'apporteriez-vous, vous, à ce programme ? »|“Certo. Mas o que o senhor traria a este programa?”"], choices: [
      c("Une expérience de terrain de cinq ans, que je souhaiterais approfondir sur le plan théorique.", "Uma experiência de campo de cinco anos, que eu gostaria de aprofundar no plano teórico.", "b") ] },
    c: { lines: ["« Sujet pertinent. Mais comment garantiriez-vous la rigueur méthodologique ? »|“Tema pertinente. Mas como garantiria o rigor metodológico?”"], choices: [
      c("En croisant analyses en laboratoire, données géospatiales et entretiens qualitatifs, afin de trianguler les résultats.", "Cruzando análises de laboratório, dados geoespaciais e entrevistas qualitativas, a fim de triangular os resultados.", "end_best"),
      c("Je ferais de mon mieux, avec l'aide de mon directeur.", "Eu faria o meu melhor, com a ajuda do meu orientador.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu es placé sur liste d'attente. Rien n'est perdu !|Você fica na lista de espera. Nada está perdido!"] },
    end_best: { end: "best", lines: ["Une semaine plus tard : « Nous avons le plaisir de vous annoncer votre admission. »|Uma semana depois: “Temos o prazer de anunciar sua admissão.”"] },
  }),
  A("debattv", "Debate na televisão", "📺", "C1", "Você participa de um debate ao vivo sobre o futuro das cidades.", {
    a: { lines: ["L'animatrice : « Votre contradicteur affirme que la voiture reste indispensable. Que lui répondez-vous ? »|A apresentadora: “Seu oponente afirma que o carro continua indispensável. O que responde a ele?”"], choices: [
      c("Je ne nie pas qu'elle le soit en zone rurale. En revanche, en ville, les alternatives existent déjà.", "Não nego que seja na zona rural. Já na cidade, as alternativas já existem.", "b"),
      c("Il dit n'importe quoi, comme d'habitude.", "Ele fala besteira, como sempre.", "b2", "Num debate, conceder um ponto aumenta sua credibilidade.") ] },
    b: { lines: ["Le contradicteur : « Encore faudrait-il que les transports soient fiables ! »|O oponente: “Ainda seria preciso que os transportes fossem confiáveis!”"], choices: [
      c("Tout à fait, et c'est précisément là qu'il faut investir, plutôt que dans de nouvelles routes.", "Exatamente, e é justamente aí que é preciso investir, em vez de em novas estradas.", "c") ] },
    b2: { lines: ["L'animatrice : « Restons courtois, s'il vous plaît. Votre argument ? »|A apresentadora: “Vamos manter a cortesia, por favor. Seu argumento?”"], choices: [
      c("Pardonnez-moi. Mon argument est simple : en ville, des alternatives existent.", "Perdoem-me. Meu argumento é simples: na cidade, existem alternativas.", "b") ] },
    c: { lines: ["L'animatrice : « Il nous reste trente secondes. Votre conclusion ? »|A apresentadora: “Restam trinta segundos. Sua conclusão?”"], choices: [
      c("Il ne s'agit pas d'opposer ville et campagne, mais d'offrir à chacun le choix de se déplacer autrement.", "Não se trata de opor cidade e campo, mas de oferecer a cada um a escolha de se deslocar de outro jeito.", "end_best"),
      c("Bref, la voiture, c'est fini.", "Enfim, o carro acabou.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Ta conclusion divise les téléspectateurs.|Sua conclusão divide os telespectadores."] },
    end_best: { end: "best", lines: ["Même ton contradicteur hoche la tête. Ta phrase circule sur les réseaux le soir même !|Até seu oponente concorda com a cabeça. Sua frase circula nas redes na mesma noite!"] },
  }),
  A("pitch", "Pitch para investidores", "💡", "C1", "Você tem três minutos para apresentar sua startup de monitoramento de água.", {
    a: { lines: ["L'investisseuse : « Le temps commence maintenant. »|A investidora: “O tempo começa agora.”"], choices: [
      c("Deux milliards de personnes boivent une eau non contrôlée. Nos capteurs à bas coût changent la donne.", "Dois bilhões de pessoas bebem água sem controle. Nossos sensores de baixo custo mudam o jogo.", "b"),
      c("Bonjour, je m'appelle Raimundo, j'ai fait mes études à…", "Bom dia, me chamo Raimundo, estudei em…", "b2", "Num pitch, abra com o problema e o impacto, não com sua biografia.") ] },
    b: { lines: ["« Intéressant. Quel est votre modèle économique ? »|“Interessante. Qual é o seu modelo de negócio?”"], choices: [
      c("Un abonnement mensuel pour les collectivités, qui paient moins qu'une seule analyse en laboratoire.", "Uma assinatura mensal para os municípios, que pagam menos do que uma única análise de laboratório.", "c") ] },
    b2: { lines: ["Elle vous interrompt : « Allez à l'essentiel : quel problème résolvez-vous ? »|Ela interrompe: “Vá ao essencial: que problema o senhor resolve?”"], choices: [
      c("Pardon. L'accès à une eau contrôlée : nos capteurs coûtent dix fois moins cher.", "Desculpe. O acesso a água controlada: nossos sensores custam dez vezes menos.", "b") ] },
    c: { lines: ["« Et vos concurrents ? »|“E seus concorrentes?”"], choices: [
      c("Ils visent les industriels. Nous sommes les seuls à cibler les petites communes isolées, un marché délaissé.", "Eles miram as indústrias. Somos os únicos focados em pequenos municípios isolados, um mercado esquecido.", "end_best"),
      c("Nous n'avons pas vraiment de concurrents.", "Não temos concorrentes, na verdade.", "end_ok", "Dizer que não há concorrência costuma soar como falta de pesquisa.") ] },
    end_ok: { end: "good", lines: ["« Tout le monde a des concurrents… » Elle reste prudente, mais garde ta carte.|“Todo mundo tem concorrentes…” Ela fica cautelosa, mas guarda seu cartão."] },
    end_best: { end: "best", lines: ["« Positionnement clair. Envoyez-moi votre dossier lundi. » Premier pas vers la levée de fonds !|“Posicionamento claro. Me mande seu material na segunda.” Primeiro passo para a captação!"] },
  }),
  A("soutenance", "A defesa da dissertação", "📜", "C1", "Chegou o dia da sua defesa de mestrado diante da banca.", {
    a: { lines: ["Le président du jury : « Vous disposez de vingt minutes pour présenter vos travaux. »|O presidente da banca: “O senhor dispõe de vinte minutos para apresentar seu trabalho.”"], choices: [
      c("Je vous remercie. Je commencerai par la problématique, puis la méthodologie, avant d'en venir aux résultats.", "Agradeço. Começarei pela problemática, depois a metodologia, antes de chegar aos resultados.", "b") ] },
    b: { lines: ["Un membre du jury : « Votre échantillon de douze communautés n'est-il pas un peu restreint ? »|Um membro da banca: “Sua amostra de doze comunidades não é um pouco restrita?”"], choices: [
      c("C'est une limite que j'assume. Toutefois, la profondeur des entretiens compense en partie la taille de l'échantillon.", "É uma limitação que assumo. Contudo, a profundidade das entrevistas compensa em parte o tamanho da amostra.", "c"),
      c("Non, il est largement suffisant.", "Não, é mais do que suficiente.", "b2", "Diante de uma crítica justa, reconheça a limitação e explique como a mitigou.") ] },
    b2: { lines: ["Le jury échange un regard sceptique. « Sur quoi fondez-vous cette affirmation ? »|A banca troca um olhar cético. “Em que o senhor baseia essa afirmação?”"], choices: [
      c("Vous avez raison de le souligner : c'est une limite, que la profondeur qualitative compense en partie.", "Os senhores têm razão em apontar: é uma limitação, que a profundidade qualitativa compensa em parte.", "c") ] },
    c: { lines: ["« Et quelles perspectives voyez-vous pour une thèse ? »|“E que perspectivas o senhor vê para um doutorado?”"], choices: [
      c("Il serait pertinent d'élargir l'étude à l'ensemble du bassin et d'y intégrer un suivi sur plusieurs saisons.", "Seria pertinente ampliar o estudo para toda a bacia e incluir um monitoramento ao longo de várias estações.", "end_best"),
      c("Je n'y ai pas encore réfléchi.", "Ainda não pensei nisso.", "end_ok") ] },
    end_ok: { end: "good", lines: ["« Admis, mention bien. » Une belle réussite !|“Aprovado, com menção bom.” Um belo sucesso!"] },
    end_best: { end: "best", lines: ["« Admis avec mention très bien et les félicitations du jury. » Bravo, docteur en devenir !|“Aprovado com menção muito bom e os parabéns da banca.” Parabéns, futuro doutor!"] },
  }),
];
