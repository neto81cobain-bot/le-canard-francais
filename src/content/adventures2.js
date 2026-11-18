// Aventuras 13–20. Mesmo formato de adventures.js.
export const ADVENTURES_2 = [
  {
    id: "taxi", title: "O táxi do aeroporto", emoji: "🚕", level: "A1", desc: "Você acabou de pousar em Paris. Pegue um táxi até o hotel.",
    start: "a",
    nodes: {
      a: { lines: ["Le chauffeur : « Bonjour ! Vous allez où ? »|O motorista: “Bom dia! Para onde vai?”"], choices: [
        { fr: "Bonjour ! À l'hôtel Lumière, rue de Rivoli, s'il vous plaît.", pt: "Bom dia! Para o hotel Lumière, na rua de Rivoli, por favor.", to: "b" },
        { fr: "Hôtel. Vite.", pt: "Hotel. Rápido.", to: "b2", tip: "Diga o nome e o endereço do hotel — e não esqueça o “bonjour” e o “s'il vous plaît”." } ] },
      b: { lines: ["« Très bien. Vous mettez votre valise dans le coffre ? »|“Muito bem. Coloca sua mala no porta-malas?”"], choices: [
        { fr: "Oui, merci. C'est combien jusqu'à l'hôtel ?", pt: "Sim, obrigado. Quanto custa até o hotel?", to: "c" },
        { fr: "Oui. On y va !", pt: "Sim. Vamos!", to: "c2" } ] },
      b2: { lines: ["Le chauffeur : « Quel hôtel ? Il y a mille hôtels à Paris ! »|O motorista: “Que hotel? Tem mil hotéis em Paris!”"], choices: [
        { fr: "Pardon ! L'hôtel Lumière, rue de Rivoli, s'il vous plaît.", pt: "Desculpe! O hotel Lumière, na rua de Rivoli, por favor.", to: "b" } ] },
      c: { lines: ["« C'est un forfait : cinquante-cinq euros. »|“É um preço fixo: cinquenta e cinco euros.”"], choices: [
        { fr: "Parfait. Je peux payer par carte ?", pt: "Perfeito. Posso pagar com cartão?", to: "end_best" },
        { fr: "D'accord.", pt: "Tudo bem.", to: "end_ok" } ] },
      c2: { lines: ["Le trajet dure quarante minutes. « Voilà, nous sommes arrivés ! »|O trajeto dura quarenta minutos. “Pronto, chegamos!”"], choices: [
        { fr: "Merci beaucoup ! Bonne journée !", pt: "Muito obrigado! Bom dia!", to: "end_ok" } ] },
      end_ok: { end: "good", lines: ["Tu arrives à l'hôtel sans problème.|Você chega ao hotel sem problemas."] },
      end_best: { end: "best", lines: ["« Bien sûr ! » Tu paies par carte et tu sais exactement le prix. Parfait !|“Claro!” Você paga com cartão e sabe exatamente o preço. Perfeito!"] },
    },
  },
  {
    id: "anniv", title: "A festa surpresa", emoji: "🎉", level: "A1", desc: "Você foi convidado para o aniversário de um colega francês.",
    start: "a",
    nodes: {
      a: { lines: ["Chloé t'ouvre la porte : « Salut ! Entre ! »|Chloé abre a porta: “Oi! Entra!”"], choices: [
        { fr: "Salut Chloé ! Merci pour l'invitation. J'ai apporté des fleurs.", pt: "Oi Chloé! Obrigado pelo convite. Trouxe flores.", to: "b" },
        { fr: "Salut ! Où est le gâteau ?", pt: "Oi! Cadê o bolo?", to: "b2", tip: "Agradecer o convite e levar um presentinho é sempre bem-vindo." } ] },
      b: { lines: ["« Oh, elles sont magnifiques ! Tu connais Antoine ? »|“Ah, são lindas! Você conhece o Antoine?”"], choices: [
        { fr: "Non. Enchanté, Antoine ! Moi, c'est Raimundo.", pt: "Não. Muito prazer, Antoine! Eu sou o Raimundo.", to: "c" },
        { fr: "Non.", pt: "Não.", to: "c2" } ] },
      b2: { lines: ["Chloé rit : « Patience ! D'abord, on dit bonjour à tout le monde. »|Chloé ri: “Calma! Primeiro, a gente cumprimenta todo mundo.”"], choices: [
        { fr: "Tu as raison ! Bonsoir tout le monde !", pt: "Você tem razão! Boa noite, pessoal!", to: "b" } ] },
      c: { lines: ["Antoine : « Enchanté ! Tu es brésilien ? Tu aimes la France ? »|Antoine: “Prazer! Você é brasileiro? Gosta da França?”"], choices: [
        { fr: "Oui, j'adore ! Surtout le fromage.", pt: "Sim, adoro! Principalmente o queijo.", to: "end_best" } ] },
      c2: { lines: ["Antoine te regarde, un peu gêné.|Antoine te olha, meio sem graça."], choices: [
        { fr: "Euh… Bonsoir. Je m'appelle Raimundo.", pt: "É… Boa noite. Eu me chamo Raimundo.", to: "end_ok" } ] },
      end_ok: { end: "good", lines: ["La soirée commence. Tu manges du gâteau et tu chantes avec tout le monde.|A festa começa. Você come bolo e canta com todo mundo."] },
      end_best: { end: "best", lines: ["Antoine rit : « Toi, tu es déjà un vrai Français ! »|Antoine ri: “Você já é um francês de verdade!”"] },
    },
  },
  {
    id: "banque", title: "Abrindo uma conta", emoji: "🏦", level: "A2", desc: "Você vai morar um ano na França e precisa de uma conta no banco.",
    start: "a",
    nodes: {
      a: { lines: ["Le conseiller : « Bonjour, asseyez-vous. Que puis-je faire pour vous ? »|O gerente: “Bom dia, sente-se. Em que posso ajudar?”"], choices: [
        { fr: "Bonjour. Je voudrais ouvrir un compte, s'il vous plaît.", pt: "Bom dia. Eu gostaria de abrir uma conta, por favor.", to: "b" },
        { fr: "Je veux un compte.", pt: "Quero uma conta.", to: "b", tip: "“Je voudrais” é a forma educada de pedir algo." } ] },
      b: { lines: ["« Très bien. Vous avez une pièce d'identité et un justificatif de domicile ? »|“Muito bem. O senhor tem um documento de identidade e um comprovante de residência?”"], choices: [
        { fr: "Voici mon passeport et mon contrat de location.", pt: "Aqui está meu passaporte e meu contrato de aluguel.", to: "c" },
        { fr: "J'ai seulement mon passeport.", pt: "Só tenho meu passaporte.", to: "c2" } ] },
      c: { lines: ["« Parfait. Vous voulez aussi une carte bancaire ? »|“Perfeito. Quer também um cartão?”"], choices: [
        { fr: "Oui. Il y a des frais par mois ?", pt: "Sim. Tem tarifa mensal?", to: "end_best" },
        { fr: "Oui, merci.", pt: "Sim, obrigado.", to: "end_ok" } ] },
      c2: { lines: ["« Il me faut aussi un justificatif de domicile. Vous pouvez revenir demain ? »|“Também preciso de um comprovante de residência. Pode voltar amanhã?”"], choices: [
        { fr: "D'accord, je reviens demain avec le document.", pt: "Tudo bem, volto amanhã com o documento.", to: "end_ok" } ] },
      end_ok: { end: "good", lines: ["Ton compte est presque prêt. Bonne nouvelle !|Sua conta está quase pronta. Boa notícia!"] },
      end_best: { end: "best", lines: ["« Deux euros par mois, mais c'est gratuit pour les étudiants ! » Bien joué !|“Dois euros por mês, mas é grátis para estudantes!” Muito bem!"] },
    },
  },
  {
    id: "velo", title: "A bicicleta furada", emoji: "🚲", level: "A2", desc: "O pneu da sua bicicleta furou no meio do passeio pelo Loire.",
    start: "a",
    nodes: {
      a: { lines: ["Ton pneu est crevé ! Tu vois un petit atelier de vélos.|Seu pneu furou! Você vê uma pequena oficina de bicicletas."], choices: [
        { fr: "Bonjour ! Mon pneu est crevé. Vous pouvez le réparer ?", pt: "Bom dia! Meu pneu furou. O senhor pode consertar?", to: "b" },
        { fr: "Bonjour ! Mon vélo est mort.", pt: "Bom dia! Minha bicicleta morreu.", to: "b2", tip: "“Crevé” é a palavra certa para pneu furado." } ] },
      b: { lines: ["Le réparateur : « Oui, mais j'ai deux vélos avant le vôtre. Revenez dans une heure. »|O mecânico: “Sim, mas tenho duas bicicletas antes da sua. Volte em uma hora.”"], choices: [
        { fr: "Pas de problème. Il y a un café près d'ici ?", pt: "Sem problema. Tem um café aqui perto?", to: "c" },
        { fr: "Une heure ? C'est trop long !", pt: "Uma hora? É demais!", to: "c2" } ] },
      b2: { lines: ["Il rit : « Mort ? Voyons ça… Ah, c'est juste le pneu ! »|Ele ri: “Morreu? Vamos ver… Ah, é só o pneu!”"], choices: [
        { fr: "Ah, tant mieux ! Vous pouvez le réparer ?", pt: "Ah, ainda bem! Pode consertar?", to: "b" } ] },
      c: { lines: ["« Oui, au bout de la rue, à droite. Leurs tartes sont délicieuses. »|“Sim, no fim da rua, à direita. As tortas de lá são deliciosas.”"], choices: [
        { fr: "Merci ! À tout à l'heure !", pt: "Obrigado! Até daqui a pouco!", to: "end_best" } ] },
      c2: { lines: ["« Désolé, je ne peux pas faire plus vite. »|“Desculpe, não consigo fazer mais rápido.”"], choices: [
        { fr: "D'accord, j'attends.", pt: "Tudo bem, eu espero.", to: "end_ok" } ] },
      end_ok: { end: "good", lines: ["Une heure plus tard, ton vélo est réparé.|Uma hora depois, sua bicicleta está consertada."] },
      end_best: { end: "best", lines: ["Tu manges une tarte aux pommes au soleil, et ton vélo t'attend, tout neuf !|Você come uma torta de maçã ao sol, e a bicicleta te espera, novinha!"] },
    },
  },
  {
    id: "coloc", title: "A briga dos colegas de casa", emoji: "🧽", level: "B1", desc: "A louça se acumula no apartamento dividido. Converse com o Théo.",
    start: "a",
    nodes: {
      a: { lines: ["Théo : « Encore la vaisselle dans l'évier ? Ce n'est pas à moi de tout faire ! »|Théo: “De novo a louça na pia? Não sou eu que tenho que fazer tudo!”"], choices: [
        { fr: "Tu as raison, je suis désolé. On pourrait faire un planning ?", pt: "Você tem razão, desculpa. A gente podia fazer uma escala?", to: "b" },
        { fr: "C'est pas que moi ! Toi aussi tu laisses tout traîner.", pt: "Não sou só eu! Você também deixa tudo largado.", to: "b2", tip: "Reconhecer a parte de culpa desarma a discussão." } ] },
      b: { lines: ["Théo se calme : « Bonne idée. Comment tu vois ça ? »|Théo se acalma: “Boa ideia. Como você imagina isso?”"], choices: [
        { fr: "Je m'occupe de la vaisselle la semaine, et toi du ménage le week-end ?", pt: "Eu cuido da louça durante a semana e você da faxina no fim de semana?", to: "c" } ] },
      b2: { lines: ["« Moi ? Je fais les courses et le ménage tous les samedis ! »|“Eu? Eu faço as compras e a faxina todo sábado!”"], choices: [
        { fr: "C'est vrai, pardon. On pourrait s'organiser mieux.", pt: "É verdade, desculpa. A gente podia se organizar melhor.", to: "b" },
        { fr: "Bon, d'accord, je fais la vaisselle.", pt: "Tá bom, eu lavo a louça.", to: "end_ok" } ] },
      c: { lines: ["« Ça me va ! Et si on mettait le planning sur le frigo ? »|“Por mim, tudo bem! E se a gente colasse a escala na geladeira?”"], choices: [
        { fr: "Parfait ! Et ce soir, je t'invite à manger une pizza pour faire la paix.", pt: "Perfeito! E hoje à noite eu te pago uma pizza para fazer as pazes.", to: "end_best" } ] },
      end_ok: { end: "good", lines: ["La vaisselle est faite… mais l'ambiance reste un peu froide.|A louça está lavada… mas o clima continua meio frio."] },
      end_best: { end: "best", lines: ["Théo sourit : « Marché conclu ! » Le planning tient depuis trois mois.|Théo sorri: “Fechado!” A escala funciona há três meses."] },
    },
  },
  {
    id: "radio", title: "Entrevista na rádio local", emoji: "📻", level: "B1", desc: "Uma rádio de Nantes quer saber da sua experiência como estrangeiro.",
    start: "a",
    nodes: {
      a: { lines: ["La journaliste : « Bonjour et bienvenue ! Depuis combien de temps vous vivez à Nantes ? »|A jornalista: “Olá e bem-vindo! Há quanto tempo o senhor mora em Nantes?”"], choices: [
        { fr: "Bonjour ! J'habite ici depuis huit mois.", pt: "Olá! Moro aqui há oito meses.", to: "b" },
        { fr: "Huit mois.", pt: "Oito meses.", to: "b", tip: "Responda com frase completa: “J'habite ici depuis huit mois” (presente + depuis)." } ] },
      b: { lines: ["« Qu'est-ce qui vous a le plus surpris en arrivant ? »|“O que mais surpreendeu o senhor quando chegou?”"], choices: [
        { fr: "Ce qui m'a surpris, c'est que les magasins ferment le dimanche.", pt: "O que me surpreendeu é que as lojas fecham no domingo.", to: "c" },
        { fr: "La pluie ! Il pleut tout le temps.", pt: "A chuva! Chove o tempo todo.", to: "c2" } ] },
      c: { lines: ["« Et qu'est-ce qui vous manque du Brésil ? »|“E do que o senhor sente falta do Brasil?”"], choices: [
        { fr: "Ma famille me manque, et aussi la chaleur des gens.", pt: "Sinto falta da minha família, e também do calor humano.", to: "end_best" },
        { fr: "La famille, surtout.", pt: "A família, principalmente.", to: "end_ok", tip: "Para “sinto falta de”, use “… me manque”: “Ma famille me manque” — a família é o sujeito." } ] },
      c2: { lines: ["Elle rit : « Bienvenue en Bretagne… enfin, presque ! Et qu'est-ce qui vous manque ? »|Ela ri: “Bem-vindo à Bretanha… quer dizer, quase! E do que sente falta?”"], choices: [
        { fr: "Le soleil et ma famille me manquent beaucoup.", pt: "Sinto muita falta do sol e da minha família.", to: "end_best" } ] },
      end_ok: { end: "good", lines: ["L'interview se termine. La journaliste vous remercie.|A entrevista termina. A jornalista agradece."] },
      end_best: { end: "best", lines: ["« Quelle belle réponse ! Merci et bonne continuation à Nantes ! »|“Que bela resposta! Obrigada e boa sorte em Nantes!”"] },
    },
  },
  {
    id: "assurance", title: "O acidente de carro", emoji: "🚗", level: "B2", desc: "Um carro bateu no seu carro alugado. Resolva com o outro motorista.",
    start: "a",
    nodes: {
      a: { lines: ["L'autre conducteur sort, énervé : « Vous avez freiné trop brusquement ! »|O outro motorista sai, irritado: “O senhor freou bruscamente demais!”"], choices: [
        { fr: "Calmons-nous. Personne n'est blessé, c'est le principal. On remplit un constat ?", pt: "Vamos nos acalmar. Ninguém se feriu, isso é o principal. Vamos preencher um boletim amigável?", to: "b" },
        { fr: "C'est vous qui rouliez trop vite !", pt: "Foi o senhor que estava rápido demais!", to: "b2", tip: "Na França, o “constat amiable” resolve sem brigas: cada um descreve os fatos." } ] },
      b: { lines: ["« D'accord. J'ai un constat dans la boîte à gants. »|“Tudo bem. Tenho um formulário no porta-luvas.”"], choices: [
        { fr: "Je propose qu'on prenne aussi des photos des deux voitures.", pt: "Sugiro que a gente também tire fotos dos dois carros.", to: "c" },
        { fr: "Remplissez-le, moi je ne comprends pas tout.", pt: "Preencha o senhor, eu não entendo tudo.", to: "c2", tip: "Nunca deixe o outro preencher sozinho: você assina o que está escrito." } ] },
      b2: { lines: ["« Pas du tout ! Je vais appeler la police ! »|“De jeito nenhum! Vou chamar a polícia!”"], choices: [
        { fr: "Attendez. Je préférerais qu'on règle ça calmement, avec un constat.", pt: "Espere. Eu preferiria que resolvêssemos isso com calma, com um boletim amigável.", to: "b" } ] },
      c: { lines: ["Vous prenez les photos et remplissez le constat ensemble, point par point.|Vocês tiram as fotos e preenchem o formulário juntos, ponto por ponto."], choices: [
        { fr: "Avant de signer, relisons ensemble le croquis de l'accident.", pt: "Antes de assinar, vamos reler juntos o desenho do acidente.", to: "end_best" } ] },
      c2: { lines: ["Il remplit le constat… et coche que c'était ta faute.|Ele preenche o formulário… e marca que a culpa foi sua."], choices: [
        { fr: "Attendez, ce n'est pas exact. Je ne signe pas ça.", pt: "Espere, isso não está correto. Não assino isso.", to: "end_ok" } ] },
      end_ok: { end: "good", lines: ["Après une longue discussion, vous corrigez le constat. Ouf !|Depois de uma longa discussão, vocês corrigem o formulário. Ufa!"] },
      end_best: { end: "best", lines: ["Le constat est clair et signé. L'assurance règle tout en une semaine. Bravo !|O formulário está claro e assinado. O seguro resolve tudo em uma semana. Parabéns!"] },
    },
  },
  {
    id: "negociation", title: "Negociando o salário", emoji: "🤝", level: "C1", desc: "Uma empresa de Lyon quer contratar você. Hora de falar de dinheiro.",
    start: "a",
    nodes: {
      a: { lines: ["La DRH : « Nous vous proposons un poste à trente-huit mille euros brut par an. Qu'en pensez-vous ? »|A diretora de RH: “Propomos um cargo de trinta e oito mil euros brutos por ano. O que acha?”"], choices: [
        { fr: "Je vous remercie de cette proposition. Compte tenu de mon expérience, j'envisageais plutôt quarante-trois mille.", pt: "Agradeço a proposta. Considerando minha experiência, eu pensava mais em quarenta e três mil.", to: "b" },
        { fr: "C'est très peu. Je veux plus.", pt: "É muito pouco. Quero mais.", to: "b2", tip: "Agradeça, justifique e proponha um número: é assim que se negocia em francês formal." } ] },
      b: { lines: ["« Je comprends. Notre marge est limitée, mais nous pourrions faire un effort. »|“Entendo. Nossa margem é limitada, mas poderíamos fazer um esforço.”"], choices: [
        { fr: "Si le salaire fixe ne peut pas évoluer, serait-il envisageable d'ajouter du télétravail et une prime annuelle ?", pt: "Se o salário fixo não puder mudar, seria possível acrescentar home office e um bônus anual?", to: "c" },
        { fr: "D'accord, j'accepte quarante mille.", pt: "Tudo bem, aceito quarenta mil.", to: "end_ok" } ] },
      b2: { lines: ["La DRH, un peu froide : « Pourriez-vous préciser vos attentes ? »|A diretora, um pouco fria: “Poderia especificar suas expectativas?”"], choices: [
        { fr: "Bien sûr. Au vu de mes compétences, quarante-trois mille me sembleraient justes.", pt: "Claro. Em vista das minhas competências, quarenta e três mil me pareceriam justos.", to: "b" } ] },
      c: { lines: ["« Deux jours de télétravail et une prime de quinze cents euros… cela vous conviendrait-il ? »|“Dois dias de home office e um bônus de mil e quinhentos euros… isso lhe conviria?”"], choices: [
        { fr: "Cela me convient tout à fait. Je suis ravi de rejoindre votre équipe.", pt: "Isso me convém perfeitamente. Fico muito feliz em me juntar à sua equipe.", to: "end_best" } ] },
      end_ok: { end: "good", lines: ["Vous signez le contrat. Correct, mais vous auriez pu obtenir davantage.|Você assina o contrato. Razoável, mas poderia ter conseguido mais."] },
      end_best: { end: "best", lines: ["Poignée de main : meilleur salaire, télétravail et prime. Négociation magistrale !|Aperto de mão: salário melhor, home office e bônus. Negociação de mestre!"] },
    },
  },
];
