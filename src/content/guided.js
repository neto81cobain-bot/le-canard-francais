// Conversas guiadas (sem IA): o Canard fala, você responde EM FRANCÊS a partir de uma dica em português.
// A correção é offline: sua frase é comparada com as respostas-modelo (qualquer uma vale).
// Turno: ['fala do Canard fr|pt', 'o que você deve dizer (pt)', 'modelo 1; modelo 2; …']
const G = (id, title, emoji, level, setting, turns) => ({
  id, title, emoji, level, setting,
  turns: turns.map(([bot, hint, models]) => {
    const [fr, pt] = bot.split('|');
    return { fr, pt, hint, models: models.split(';').map((m) => m.trim()).filter(Boolean) };
  }),
});

export const GUIDED = [
  // ───── A1 ─────
  G('g-cafe', 'No café', '☕', 'A1', 'Você está num café em Paris.', [
    ["Bonjour ! Qu'est-ce que vous désirez ?|Bom dia! O que deseja?", 'Cumprimente e peça um café, por favor.', "Bonjour, un café, s'il vous plaît; Bonjour, je voudrais un café, s'il vous plaît"],
    ['Un café… et avec ça ?|Um café… e algo mais?', 'Peça também um croissant.', "Un croissant, s'il vous plaît; Et un croissant, s'il vous plaît; Je voudrais aussi un croissant"],
    ['Sur place ou à emporter ?|Para comer aqui ou para levar?', 'Diga que é para comer aqui.', 'Sur place, merci; Sur place, s\'il vous plaît'],
    ['Très bien. Ça fait quatre euros.|Muito bem. Dá quatro euros.', 'Pergunte se pode pagar com cartão.', 'Je peux payer par carte ?; Est-ce que je peux payer par carte ?'],
    ['Bien sûr ! Bonne journée !|Claro! Bom dia!', 'Agradeça e deseje bom dia também.', 'Merci, bonne journée; Merci, vous aussi; Merci beaucoup, bonne journée'],
  ]),
  G('g-presenter', 'Se apresentando', '👋', 'A1', 'Primeiro dia no curso de francês.', [
    ["Salut ! Je m'appelle Léa. Et toi ?|Oi! Eu me chamo Léa. E você?", 'Diga seu nome.', "Je m'appelle Raimundo; Moi, c'est Raimundo; Je suis Raimundo"],
    ['Enchantée ! Tu viens d\'où ?|Prazer! De onde você é?', 'Diga que é do Brasil.', 'Je viens du Brésil; Je suis brésilien; Je suis du Brésil'],
    ['Super ! Tu habites où ?|Legal! Onde você mora?', 'Diga que mora em São Paulo, no Brasil.', 'J\'habite à São Paulo, au Brésil; J\'habite au Brésil'],
    ["Tu as quel âge ?|Quantos anos você tem?", 'Diga que tem trinta anos.', "J'ai trente ans"],
    ['Moi, j\'ai vingt-cinq ans. Bienvenue dans le cours !|Eu tenho 25. Bem-vindo ao curso!', 'Agradeça.', 'Merci; Merci beaucoup; Merci, Léa'],
  ]),
  G('g-boulangerie', 'Na padaria', '🥖', 'A1', 'Domingo de manhã, padaria do bairro.', [
    ['Bonjour monsieur !|Bom dia, senhor!', 'Cumprimente e peça uma baguete.', "Bonjour, une baguette, s'il vous plaît; Bonjour madame, une baguette, s'il vous plaît"],
    ['Bien cuite ou pas trop cuite ?|Bem assada ou não muito?', 'Diga que quer não muito assada.', 'Pas trop cuite, s\'il vous plaît; Pas trop cuite, merci'],
    ['Et avec ceci ?|E mais alguma coisa?', 'Peça dois pains au chocolat.', "Deux pains au chocolat, s'il vous plaît; Et deux pains au chocolat"],
    ['Voilà. Ça fait trois euros dix.|Aqui está. Dá três euros e dez.', 'Pergunte quanto é, de novo, porque não entendeu.', "Pardon, c'est combien ?; Pardon, combien ?; Vous pouvez répéter, s'il vous plaît ?"],
    ['Trois euros dix.|Três euros e dez.', 'Diga “aqui está” e agradeça.', 'Voilà, merci; Voilà, merci beaucoup'],
  ]),
  G('g-chemin', 'Pedindo o caminho', '🗺️', 'A1', 'Você está perdido perto da estação.', [
    ["Oui ? Je peux vous aider ?|Sim? Posso ajudar?", 'Pergunte onde fica a estação.', 'Où est la gare, s\'il vous plaît ?; Excusez-moi, où est la gare ?'],
    ["C'est tout droit, puis à gauche.|É reto, depois à esquerda.", 'Pergunte se é longe.', "C'est loin ?; Est-ce que c'est loin ?"],
    ['Non, cinq minutes à pied.|Não, cinco minutos a pé.', 'Repita para confirmar: reto e depois à esquerda.', 'Tout droit, puis à gauche ?; Donc tout droit et à gauche ?'],
    ["C'est ça !|Isso mesmo!", 'Agradeça muito.', 'Merci beaucoup; Merci beaucoup, monsieur; Merci'],
    ['De rien. Bonne journée !|De nada. Bom dia!', 'Despeça-se.', 'Au revoir, bonne journée; Au revoir; Bonne journée'],
  ]),
  G('g-hotel', 'Chegando ao hotel', '🛎️', 'A1', 'Recepção do hotel, à noite.', [
    ['Bonsoir ! Vous avez une réservation ?|Boa noite! Tem reserva?', 'Diga que sim, em nome de Silva.', 'Oui, au nom de Silva; Bonsoir, oui, au nom de Silva'],
    ['Pour combien de nuits ?|Por quantas noites?', 'Diga: três noites.', 'Trois nuits; Pour trois nuits'],
    ['Voici votre clé. Chambre 12.|Aqui está a chave. Quarto 12.', 'Pergunte a que horas é o café da manhã.', "Le petit-déjeuner est à quelle heure ?; À quelle heure est le petit-déjeuner ?"],
    ['De sept heures à dix heures.|Das sete às dez.', 'Pergunte se tem wi-fi.', 'Il y a le wifi ?; Est-ce qu\'il y a le wifi ?'],
    ['Oui, le code est sur la clé. Bonne nuit !|Sim, a senha está na chave. Boa noite!', 'Agradeça e deseje boa noite.', 'Merci, bonne nuit; Merci beaucoup, bonne nuit'],
  ]),
  G('g-marche', 'Na feira', '🍅', 'A1', 'Feira de sábado.', [
    ['Bonjour ! Qu\'est-ce qu\'il vous faut ?|Bom dia! Do que precisa?', 'Peça um quilo de tomates.', "Un kilo de tomates, s'il vous plaît; Je voudrais un kilo de tomates"],
    ['Voilà. Autre chose ?|Aqui está. Mais alguma coisa?', 'Pergunte quanto custam as maçãs.', 'Combien coûtent les pommes ?; C\'est combien, les pommes ?'],
    ['Deux euros le kilo.|Dois euros o quilo.', 'Peça meio quilo de maçãs.', "Un demi-kilo de pommes, s'il vous plaît; Un demi-kilo, s'il vous plaît"],
    ['Très bien. Ce sera tout ?|Muito bem. É só isso?', 'Diga que é só isso.', "Oui, c'est tout; C'est tout, merci"],
    ['Ça fait quatre euros.|Dá quatro euros.', 'Diga “aqui está” e agradeça.', 'Voilà, merci; Voilà, merci beaucoup'],
  ]),

  // ───── A2 ─────
  G('g-weekend', 'Seu fim de semana', '📅', 'A2', 'Segunda-feira, conversa com uma colega.', [
    ["Salut ! Tu as passé un bon week-end ?|Oi! Teve um bom fim de semana?", 'Diga que sim, foi muito bom.', "Oui, c'était très bien; Oui, j'ai passé un très bon week-end"],
    ["Qu'est-ce que tu as fait ?|O que você fez?", 'Diga que foi à praia com amigos.', "Je suis allé à la plage avec des amis; Je suis allé à la plage avec mes amis"],
    ['Il a fait beau ?|Fez tempo bom?', 'Diga que fez sol, mas ventou.', "Il a fait soleil, mais il y avait du vent; Il a fait beau, mais il y avait du vent"],
    ['Et dimanche ?|E no domingo?', 'Diga que ficou em casa e descansou.', "Je suis resté à la maison et je me suis reposé; Je suis resté chez moi et je me suis reposé"],
    ['Moi aussi ! On déjeune ensemble ?|Eu também! Vamos almoçar juntos?', 'Aceite com prazer.', 'Avec plaisir; Oui, avec plaisir; Oui, bonne idée'],
  ]),
  G('g-medecin', 'No médico', '🩺', 'A2', 'Consultório médico.', [
    ["Bonjour. Qu'est-ce qui ne va pas ?|Bom dia. O que está acontecendo?", 'Diga que está com dor de garganta.', "J'ai mal à la gorge; Bonjour, j'ai mal à la gorge"],
    ['Depuis quand ?|Desde quando?', 'Diga: desde ontem.', "Depuis hier; J'ai mal depuis hier"],
    ['Vous avez de la fièvre ?|Tem febre?', 'Diga que um pouco, 38 graus.', "Un peu, trente-huit degrés; Oui, un peu, trente-huit"],
    ['Je vais vous donner un sirop.|Vou lhe dar um xarope.', 'Pergunte quantas vezes por dia deve tomar.', "Je dois le prendre combien de fois par jour ?; Combien de fois par jour ?"],
    ['Trois fois par jour, pendant cinq jours.|Três vezes ao dia, por cinco dias.', 'Agradeça ao doutor.', 'Merci, docteur; Merci beaucoup, docteur'],
  ]),
  G('g-appart', 'Visitando um apartamento', '🏠', 'A2', 'Visita com a imobiliária.', [
    ['Voici le salon. Il est lumineux, non ?|Esta é a sala. Bem iluminada, né?', 'Concorde e pergunte quantos quartos há.', "Oui, il est très lumineux. Il y a combien de chambres ?; Oui. Il y a combien de chambres ?"],
    ["Deux chambres et une petite cuisine.|Dois quartos e uma cozinha pequena.", 'Pergunte quanto é o aluguel.', "Le loyer est de combien ?; C'est combien, le loyer ?"],
    ['Huit cents euros par mois.|Oitocentos euros por mês.', 'Pergunte se as despesas estão incluídas.', 'Les charges sont comprises ?; Est-ce que les charges sont comprises ?'],
    ['Oui, tout est compris.|Sim, está tudo incluído.', 'Pergunte se pode visitar de novo amanhã.', "Je peux revenir demain ?; Est-ce que je peux le revoir demain ?"],
    ['Bien sûr, à dix heures ?|Claro, às dez?', 'Confirme: perfeito, até amanhã.', 'Parfait, à demain; D\'accord, à demain'],
  ]),
  G('g-train', 'Comprando passagem', '🚆', 'A2', 'Guichê da estação.', [
    ["Bonjour, c'est pour où ?|Bom dia, é para onde?", 'Peça uma passagem para Lyon.', "Un billet pour Lyon, s'il vous plaît; Je voudrais un billet pour Lyon"],
    ['Aller simple ou aller-retour ?|Só ida ou ida e volta?', 'Peça ida e volta.', 'Aller-retour, s\'il vous plaît; Un aller-retour'],
    ['Vous partez quand ?|Quando o senhor vai?', 'Diga: sexta de manhã.', 'Vendredi matin; Je pars vendredi matin'],
    ['Il y a un train à 8 h 12.|Tem um trem às 8h12.', 'Pergunte a que horas chega.', "Il arrive à quelle heure ?; À quelle heure il arrive ?"],
    ['À 10 h 05.|Às 10h05.', 'Diga que está perfeito e que vai pagar com cartão.', 'Parfait, je paie par carte; C\'est parfait, je paie par carte'],
  ]),
  G('g-resto', 'Jantar no restaurante', '🍷', 'A2', 'Restaurante à noite.', [
    ['Vous avez choisi ?|Já escolheram?', 'Peça o prato do dia.', "Je vais prendre le plat du jour; Le plat du jour, s'il vous plaît"],
    ['Et comme boisson ?|E para beber?', 'Peça uma garrafa de água com gás.', "Une bouteille d'eau gazeuse, s'il vous plaît; Une eau gazeuse, s'il vous plaît"],
    ['Le plat vous a plu ?|Gostou do prato?', 'Diga que estava delicioso.', "C'était délicieux; Oui, c'était délicieux"],
    ['Un dessert ?|Uma sobremesa?', 'Diga que não, obrigado, e peça a conta.', "Non merci, l'addition, s'il vous plaît; Non, merci. L'addition, s'il vous plaît"],
    ['Tout de suite.|Agora mesmo.', 'Pergunte se o serviço está incluído.', 'Le service est compris ?; Est-ce que le service est compris ?'],
  ]),
  G('g-telephone', 'Ligando para um amigo', '📞', 'A2', 'Você liga para combinar um programa.', [
    ['Allô ?|Alô?', 'Diga oi e quem fala.', "Salut, c'est Raimundo; Allô, c'est Raimundo"],
    ['Ah, salut ! Ça va ?|Ah, oi! Tudo bem?', 'Diga que sim e pergunte se ele está livre sábado.', "Ça va. Tu es libre samedi ?; Oui, ça va. Tu es libre samedi ?"],
    ['Samedi ? Oui, pourquoi ?|Sábado? Sim, por quê?', 'Convide para ir ao cinema.', 'Tu veux aller au cinéma ?; On va au cinéma ?'],
    ['Bonne idée ! À quelle heure ?|Boa ideia! A que horas?', 'Proponha às oito da noite.', 'À vingt heures ?; À huit heures du soir ?'],
    ['Parfait. On se retrouve devant le cinéma.|Perfeito. A gente se encontra em frente ao cinema.', 'Concorde e despeça-se.', "D'accord, à samedi; Super, à samedi"],
  ]),

  // ───── B1 ─────
  G('g-entretien', 'Entrevista de emprego', '💼', 'B1', 'Entrevista numa empresa em Lyon.', [
    ['Parlez-moi un peu de vous.|Fale um pouco de você.', 'Diga que é engenheiro e trabalha há cinco anos na área.', "Je suis ingénieur et je travaille dans ce domaine depuis cinq ans"],
    ['Pourquoi voulez-vous ce poste ?|Por que quer este cargo?', 'Diga que gostaria de trabalhar numa equipe internacional.', "J'aimerais travailler dans une équipe internationale; Je voudrais travailler dans une équipe internationale"],
    ['Quelles sont vos qualités ?|Quais são suas qualidades?', 'Diga que é organizado e curioso.', 'Je suis organisé et curieux'],
    ['Et un défaut ?|E um defeito?', 'Diga que às vezes é perfeccionista demais.', 'Je suis parfois trop perfectionniste; Parfois, je suis trop perfectionniste'],
    ['Avez-vous des questions ?|Tem perguntas?', 'Pergunte quando receberá uma resposta.', "Quand est-ce que j'aurai une réponse ?; Quand aurai-je une réponse ?"],
  ]),
  G('g-reclamer', 'Reclamando de um produto', '📦', 'B1', 'Loja de eletrônicos.', [
    ['Bonjour, je peux vous aider ?|Bom dia, posso ajudar?', 'Diga que comprou este fone semana passada e ele não funciona.', "J'ai acheté ce casque la semaine dernière et il ne marche pas; J'ai acheté ce casque la semaine dernière, mais il ne fonctionne pas"],
    ['Vous avez le ticket de caisse ?|Tem o cupom fiscal?', 'Diga que sim, aqui está.', 'Oui, le voici; Oui, voilà'],
    ['Vous voulez un échange ou un remboursement ?|Quer troca ou reembolso?', 'Diga que prefere um reembolso.', "Je préférerais un remboursement; Je voudrais un remboursement"],
    ['Il faut attendre trois jours.|É preciso esperar três dias.', 'Pergunte se não dá para fazer hoje.', "Ce n'est pas possible aujourd'hui ?; On ne peut pas le faire aujourd'hui ?"],
    ['Je vais demander à mon responsable.|Vou perguntar ao meu gerente.', 'Agradeça pela ajuda.', "Merci pour votre aide; Je vous remercie pour votre aide"],
  ]),
  G('g-enfance', 'Lembranças de infância', '🧸', 'B1', 'Conversa com uma amiga nostálgica.', [
    ['Quand tu étais petit, tu habitais où ?|Quando você era pequeno, morava onde?', 'Diga que morava numa cidade pequena, perto de um rio.', "J'habitais dans une petite ville, près d'une rivière; J'habitais dans une petite ville près d'un fleuve"],
    ['Tu faisais quoi après l\'école ?|O que você fazia depois da escola?', 'Diga que jogava bola com os amigos.', 'Je jouais au foot avec mes amis; Je jouais au football avec mes copains'],
    ['Et pendant les vacances ?|E nas férias?', 'Diga que ia à casa dos avós.', "J'allais chez mes grands-parents; J'allais chez mes grands-parents à la campagne"],
    ['Tu étais un enfant sage ?|Você era uma criança comportada?', 'Diga que não muito, era bem levado.', "Pas vraiment, j'étais assez coquin; Pas trop, j'étais un peu turbulent"],
    ['Ha ha ! Ça te manque, cette époque ?|Haha! Sente falta dessa época?', 'Diga que sim, sente muita falta.', 'Oui, ça me manque beaucoup; Oui, elle me manque beaucoup'],
  ]),
  G('g-projets', 'Planos para o futuro', '🔮', 'B1', 'Conversa com um amigo curioso.', [
    ['Tu te vois où dans cinq ans ?|Onde você se vê daqui a cinco anos?', 'Diga que espera morar na França.', "J'espère habiter en France; J'espère vivre en France"],
    ['Et ton travail ?|E seu trabalho?', 'Diga que vai trabalhar com turismo.', "Je travaillerai dans le tourisme; Je vais travailler dans le tourisme"],
    ['Tu parleras bien français ?|Vai falar bem francês?', 'Diga que, se estudar todo dia, vai falar fluentemente.', "Si j'étudie tous les jours, je parlerai couramment; Si j'étudie chaque jour, je parlerai couramment"],
    ['Et si ça ne marche pas ?|E se não der certo?', 'Diga que vai tentar outra coisa.', "J'essaierai autre chose; Je vais essayer autre chose"],
    ["J'aime ton optimisme !|Adoro seu otimismo!", 'Agradeça e devolva a pergunta: e você?', 'Merci ! Et toi ?; Merci. Et toi, tu te vois où ?'],
  ]),
  G('g-avis', 'Dando sua opinião', '🗣️', 'B1', 'Debate entre amigos sobre redes sociais.', [
    ['Les réseaux sociaux, tu trouves ça bien ?|Redes sociais, você acha bom?', 'Diga que, na sua opinião, têm vantagens e desvantagens.', "À mon avis, il y a des avantages et des inconvénients; Selon moi, il y a des avantages et des inconvénients"],
    ['Par exemple ?|Por exemplo?', 'Diga que ajudam a falar com a família que está longe.', "Ils aident à parler avec la famille qui est loin; Ça aide à parler avec ma famille qui est loin"],
    ['Et les inconvénients ?|E as desvantagens?', 'Diga que passamos tempo demais na tela.', "On passe trop de temps devant l'écran; Nous passons trop de temps sur l'écran"],
    ['Alors, qu\'est-ce qu\'il faut faire ?|Então, o que fazer?', 'Diga que é preciso se limitar.', "Il faut se limiter; Il faut savoir se limiter"],
    ['Je suis d\'accord avec toi.|Concordo com você.', 'Diga que fica contente que concordem.', "Je suis content qu'on soit d'accord; Je suis contente qu'on soit d'accord"],
  ]),

  G('g-viagem', 'Contando uma viagem', '✈️', 'B1', 'Um colega quer saber das suas férias.', [
    ["Alors, ces vacances au Portugal ?|E aí, essas férias em Portugal?", 'Diga que foram ótimas e que visitou Lisboa e o Porto.', "C'était génial, j'ai visité Lisbonne et Porto; Super, j'ai visité Lisbonne et Porto"],
    ["Qu'est-ce qui t'a le plus plu ?|O que você mais gostou?", 'Diga que o que mais gostou foi a comida.', "Ce qui m'a le plus plu, c'est la nourriture; Ce que j'ai préféré, c'est la nourriture"],
    ['Il faisait chaud ?|Fazia calor?', 'Diga que fazia muito calor durante o dia, mas que à noite era agradável.', "Il faisait très chaud la journée, mais le soir c'était agréable; Il faisait très chaud pendant la journée, mais le soir, c'était agréable"],
    ["Tu as eu des problèmes ?|Teve algum problema?", 'Diga que perdeu o trem uma vez porque tinha dormido demais.', "J'ai raté le train une fois parce que j'avais trop dormi; Une fois, j'ai raté le train parce que j'avais trop dormi"],
    ['Ha ha ! Tu y retournerais ?|Haha! Voltaria lá?', 'Diga que sim, sem hesitar.', "Oui, sans hésiter; Oui, sans hésitation"],
  ]),

  // ───── B2 ─────
  G('g-conseil', 'Pedindo conselho', '🧭', 'B2', 'Você recebeu uma proposta de trabalho em outro país.', [
    ["Alors, tu as pris ta décision ?|E aí, já decidiu?", 'Diga que ainda hesita, porque teria que deixar a família.', "J'hésite encore, parce que je devrais quitter ma famille; J'hésite encore, car je devrais quitter ma famille"],
    ["À ta place, j'accepterais.|No seu lugar, eu aceitaria.", 'Pergunte por que ela aceitaria.', "Pourquoi tu accepterais ?; Pourquoi accepterais-tu ?"],
    ["C'est une occasion unique.|É uma oportunidade única.", 'Diga que embora seja uma boa oportunidade, tem medo de se arrepender.', "Bien que ce soit une bonne occasion, j'ai peur de le regretter; Même si c'est une bonne occasion, j'ai peur de le regretter"],
    ['Tu pourrais rentrer souvent, non ?|Você poderia voltar sempre, não?', 'Diga que, se a empresa pagasse as passagens, seria mais fácil.', "Si l'entreprise payait les billets, ce serait plus facile"],
    ['Demande-le pendant la négociation !|Peça isso na negociação!', 'Diga que é uma excelente ideia e que vai pedir.', "C'est une excellente idée, je vais le demander; Excellente idée, je vais le demander"],
  ]),
  G('g-debat', 'Debate: carros na cidade', '🚗', 'B2', 'Reunião do bairro.', [
    ["Il faut interdire les voitures dans le centre !|Tem que proibir os carros no centro!", 'Diga que entende, mas que é preciso pensar nos comerciantes.', "Je comprends, mais il faut penser aux commerçants; Je vous comprends, mais il faut penser aux commerçants"],
    ['Les commerçants s\'adapteront.|Os comerciantes vão se adaptar.', 'Diga que não tem certeza de que se adaptem rápido.', "Je ne suis pas sûr qu'ils s'adaptent rapidement; Je ne suis pas certain qu'ils s'adaptent vite"],
    ["Alors, que proposez-vous ?|Então, o que o senhor propõe?", 'Proponha fechar o centro só nos fins de semana.', "Je propose de fermer le centre seulement le week-end; Je propose qu'on ferme le centre seulement le week-end"],
    ["C'est un compromis intéressant.|É um meio-termo interessante.", 'Acrescente que seria preciso mais ônibus.', "En plus, il faudrait plus de bus; Il faudrait aussi plus de bus"],
    ['On peut le soumettre au vote.|Podemos colocar em votação.', 'Concorde e agradeça pela escuta.', "D'accord, merci de m'avoir écouté; Je suis d'accord, merci de votre écoute"],
  ]),
  G('g-assurance', 'Ligando para o seguro', '📋', 'B2', 'Um galho caiu no seu carro durante a tempestade.', [
    ['Service sinistres, bonjour.|Setor de sinistros, bom dia.', 'Diga que quer declarar um sinistro.', "Bonjour, je voudrais déclarer un sinistre; Je souhaiterais déclarer un sinistre"],
    ["Que s'est-il passé ?|O que aconteceu?", 'Diga que uma árvore caiu no seu carro durante a tempestade.', "Un arbre est tombé sur ma voiture pendant la tempête; Une branche est tombée sur ma voiture pendant la tempête"],
    ['Quelqu\'un a été blessé ?|Alguém se feriu?', 'Diga que felizmente não havia ninguém dentro.', "Heureusement, il n'y avait personne dedans; Heureusement, personne n'était à l'intérieur"],
    ['Avez-vous pris des photos ?|Tirou fotos?', 'Diga que sim e pergunte para onde enviá-las.', "Oui, à qui dois-je les envoyer ?; Oui, où est-ce que je peux les envoyer ?"],
    ['Par courriel. Un expert vous contactera.|Por e-mail. Um perito vai entrar em contato.', 'Pergunte em quanto tempo, aproximadamente.', "Dans combien de temps, à peu près ?; Sous combien de temps, environ ?"],
  ]),
  G('g-voisin', 'O vizinho barulhento', '🔊', 'B2', 'Você bate na porta do vizinho, meia-noite.', [
    ['Oui ? C\'est pour quoi ?|Sim? O que foi?', 'Desculpe-se pela hora e diga que a música está muito alta.', "Désolé de vous déranger, mais la musique est très forte; Excusez-moi de vous déranger, mais la musique est trop forte"],
    ["Ah bon ? On fête un anniversaire…|Ah é? Estamos comemorando um aniversário…", 'Diga que entende, mas que precisa acordar cedo amanhã.', "Je comprends, mais je dois me lever tôt demain; Je comprends, mais je me lève tôt demain"],
    ['On va baisser un peu.|Vamos abaixar um pouco.', 'Agradeça e pergunte até que horas a festa vai.', "Merci. La fête va durer jusqu'à quelle heure ?; Merci. Jusqu'à quelle heure vous allez faire la fête ?"],
    ['Jusqu\'à une heure, maximum.|Até uma hora, no máximo.', 'Diga que tudo bem, se a música ficar mais baixa.', "D'accord, si la musique est moins forte; Ça va, à condition que la musique soit moins forte"],
    ['Promis. Désolé encore !|Prometo. Desculpe de novo!', 'Diga que não tem problema e deseje boa festa.', "Pas de problème, bonne fête; Ce n'est pas grave, bonne soirée"],
  ]),
  G('g-presentation', 'Apresentando um projeto', '📊', 'B2', 'Reunião com a diretoria.', [
    ['Vous avez dix minutes.|O senhor tem dez minutos.', 'Diga que o projeto reduziria os resíduos em 30 por cento.', "Ce projet réduirait les déchets de trente pour cent; Notre projet permettrait de réduire les déchets de trente pour cent"],
    ['Combien ça coûte ?|Quanto custa?', 'Diga: cinquenta mil euros, amortizados em um ano.', "Cinquante mille euros, amortis en un an; Ça coûte cinquante mille euros, amortis en un an"],
    ['Et les risques ?|E os riscos?', 'Diga que o principal risco é o atraso dos fornecedores.', "Le principal risque, c'est le retard des fournisseurs; Le risque principal est le retard des fournisseurs"],
    ['Comment le réduire ?|Como reduzi-lo?', 'Proponha começar com um teste num só local.', "Je propose de commencer par un test sur un seul site; On pourrait commencer par un test sur un seul site"],
    ['Très convaincant.|Muito convincente.', 'Agradeça pela atenção.', "Je vous remercie de votre attention; Merci de votre attention"],
  ]),

  G('g-teletravail', 'Pedindo home office', '🏡', 'B2', 'Conversa com sua chefe.', [
    ["Vous vouliez me parler ?|O senhor queria falar comigo?", 'Diga que gostaria de pedir dois dias de home office por semana.', "J'aimerais vous demander deux jours de télétravail par semaine; Je voudrais demander deux jours de télétravail par semaine"],
    ['Pour quelle raison ?|Por que motivo?', 'Diga que perde duas horas por dia no trânsito.', "Je perds deux heures par jour dans les transports; Je perds deux heures par jour dans les embouteillages"],
    ["J'ai peur que l'équipe en souffre.|Tenho medo de que a equipe sofra com isso.", 'Diga que entende, mas que continuaria disponível o tempo todo.', "Je comprends, mais je resterais disponible tout le temps; Je comprends, mais je serais joignable en permanence"],
    ['Et si on essayait un mois ?|E se tentássemos um mês?', 'Diga que é uma ótima ideia e proponha um balanço no fim do mês.', "Excellente idée, on pourrait faire un bilan à la fin du mois; Très bonne idée, faisons un bilan à la fin du mois"],
    ["Marché conclu.|Fechado.", 'Agradeça pela confiança.', "Merci pour votre confiance; Je vous remercie de votre confiance"],
  ]),

  // ───── C1 ─────
  G('g-negocier', 'Negociando salário', '🤝', 'C1', 'Proposta de emprego em Paris.', [
    ['Nous vous proposons quarante mille euros.|Propomos quarenta mil euros.', 'Agradeça e diga que, dada sua experiência, esperava algo próximo de 45 mil.', "Je vous remercie. Compte tenu de mon expérience, j'espérais plutôt quarante-cinq mille; Merci. Vu mon expérience, j'envisageais plutôt quarante-cinq mille euros"],
    ['Notre marge est limitée.|Nossa margem é limitada.', 'Pergunte se seria possível acrescentar dois dias de home office.', "Serait-il possible d'ajouter deux jours de télétravail ?; Pourrait-on ajouter deux jours de télétravail ?"],
    ['Cela me semble envisageable.|Isso me parece possível.', 'Pergunte também sobre um bônus anual.', "Et qu'en est-il d'une prime annuelle ?; Et une prime annuelle, serait-ce envisageable ?"],
    ['Mille cinq cents euros, sous conditions.|Mil e quinhentos euros, sob condições.', 'Diga que, desde que as condições sejam claras, aceita.', "À condition que les conditions soient claires, j'accepte; Pourvu que les conditions soient claires, j'accepte"],
    ['Parfait, je vous envoie le contrat.|Perfeito, envio o contrato.', 'Diga que fica muito feliz em se juntar à equipe.', "Je suis ravi de rejoindre votre équipe; Je suis ravi de rejoindre l'équipe"],
  ]),
  G('g-colloque', 'Pergunta num colóquio', '🎤', 'C1', 'Você faz uma pergunta ao palestrante.', [
    ['Nous passons aux questions.|Vamos às perguntas.', 'Agradeça pela apresentação, que foi muito esclarecedora.', "Merci pour votre présentation, qui était très éclairante; Je vous remercie pour cette présentation très éclairante"],
    ["Je vous en prie, quelle est votre question ?|Por favor, qual é a sua pergunta?", 'Pergunte se os resultados poderiam ser aplicados no Brasil.', "Pensez-vous que ces résultats pourraient s'appliquer au Brésil ?; Ces résultats pourraient-ils s'appliquer au Brésil ?"],
    ["En partie, mais le contexte est différent.|Em parte, mas o contexto é diferente.", 'Pergunte em que, exatamente, o contexto difere.', "En quoi, exactement, le contexte est-il différent ?; En quoi le contexte diffère-t-il exactement ?"],
    ["Surtout par la taille du pays et le climat.|Sobretudo pelo tamanho do país e pelo clima.", 'Diga que é justamente o que você observa no seu trabalho.', "C'est justement ce que j'observe dans mon travail; C'est précisément ce que j'observe dans mon travail"],
    ["Nous pourrions en discuter après.|Poderíamos conversar depois.", 'Diga que seria um prazer.', "Ce serait avec plaisir; Ce serait un plaisir; Avec grand plaisir"],
  ]),
  G('g-mediation', 'Mediando um conflito', '⚖️', 'C1', 'Dois colegas brigaram por um projeto.', [
    ["Il ne fait jamais sa part du travail !|Ele nunca faz a parte dele!", 'Diga que entende a frustração, mas que é preciso ouvir os dois lados.', "Je comprends votre frustration, mais il faut écouter les deux parties; Je comprends ta frustration, mais il faut entendre les deux côtés"],
    ['Moi, on ne me donne jamais les informations à temps !|A mim nunca passam as informações a tempo!', 'Diga que, se for o caso, é um problema de comunicação.', "Si c'est le cas, c'est un problème de communication; Si tel est le cas, il s'agit d'un problème de communication"],
    ['Peut-être…|Talvez…', 'Proponha uma reunião rápida toda segunda.', "Je propose qu'on fasse un point rapide chaque lundi; Je propose une courte réunion chaque lundi"],
    ['Et si l\'un de nous ne vient pas ?|E se um de nós não vier?', 'Diga que, aconteça o que acontecer, as decisões ficarão por escrito.', "Quoi qu'il arrive, les décisions seront notées par écrit; Quoi qu'il en soit, les décisions seront mises par écrit"],
    ["D'accord, on essaie.|Tudo bem, vamos tentar.", 'Agradeça aos dois pela boa vontade.', "Merci à tous les deux pour votre bonne volonté; Je vous remercie tous les deux de votre bonne volonté"],
  ]),
  G('g-soutenance', 'Defendendo sua pesquisa', '🎓', 'C1', 'Pergunta da banca.', [
    ["Votre échantillon n'est-il pas trop restreint ?|Sua amostra não é restrita demais?", 'Diga que é uma limitação que você assume.', "C'est une limite que j'assume; Il s'agit d'une limite que j'assume pleinement"],
    ['Comment la compensez-vous ?|Como o senhor a compensa?', 'Diga que pela profundidade das entrevistas.', "Par la profondeur des entretiens; Je la compense par la profondeur des entretiens"],
    ['Et la reproductibilité ?|E a reprodutibilidade?', 'Diga que todos os protocolos estão descritos em anexo.', "Tous les protocoles sont décrits en annexe; L'ensemble des protocoles est décrit en annexe"],
    ['Quelles perspectives voyez-vous ?|Que perspectivas vê?', 'Diga que seria pertinente ampliar o estudo a toda a bacia.', "Il serait pertinent d'élargir l'étude à l'ensemble du bassin; Il serait pertinent d'étendre l'étude à tout le bassin"],
    ['Merci, nous allons délibérer.|Obrigado, vamos deliberar.', 'Agradeça à banca pelas observações.', "Je remercie le jury pour ses remarques; Merci au jury pour ses observations"],
  ]),
  G('g-plainte', 'Reclamação formal ao banco', '🏦', 'C1', 'Atendimento do banco, por telefone.', [
    ["Votre banque, bonjour.|Seu banco, bom dia.", 'Diga que liga a respeito de uma cobrança que não reconhece.', "Je vous appelle au sujet d'un prélèvement que je ne reconnais pas; Je vous contacte au sujet d'un débit que je ne reconnais pas"],
    ['De quel montant ?|De que valor?', 'Diga: duzentos euros, do dia 3 de março.', "Deux cents euros, en date du trois mars; Deux cents euros, le trois mars"],
    ['Je ne vois rien d\'anormal.|Não vejo nada de anormal.', 'Diga que, no entanto, nunca autorizou esse pagamento.', "Pourtant, je n'ai jamais autorisé ce paiement; Je n'ai pourtant jamais autorisé ce paiement"],
    ['Je vais ouvrir une réclamation.|Vou abrir uma reclamação.', 'Pergunte em quanto tempo terá uma resposta.', "Dans quel délai aurai-je une réponse ?; Sous quel délai puis-je espérer une réponse ?"],
    ['Sous dix jours ouvrés.|Em até dez dias úteis.', 'Peça que confirmem por escrito.', "Pourriez-vous me le confirmer par écrit ?; Je vous serais reconnaissant de me le confirmer par écrit"],
  ]),
  G('g-guide', 'Apresentando sua cidade', '🌆', 'C1', 'Jantar com colegas franceses curiosos sobre o Brasil.', [
    ["Alors, ta ville, elle est comment ?|E aí, como é a sua cidade?", 'Diga que é uma cidade grande, cheia de contrastes.', "C'est une grande ville, pleine de contrastes; C'est une grande ville pleine de contrastes"],
    ['Et le coût de la vie ?|E o custo de vida?', 'Diga que é bem mais baixo que em Paris, embora os aluguéis estejam subindo.', "Il est bien plus bas qu'à Paris, bien que les loyers augmentent; C'est beaucoup moins cher qu'à Paris, même si les loyers augmentent"],
    ["Qu'est-ce qu'il faut absolument voir ?|O que é imperdível?", 'Diga que é preciso visitar o mercado central e provar a culinária local.', "Il faut visiter le marché central et goûter la cuisine locale; Il faut absolument visiter le marché central et goûter la cuisine locale"],
    ["Ça donne envie !|Dá vontade!", 'Diga que, por mais caótica que seja, você a adora.', "Aussi chaotique qu'elle soit, je l'adore; Si chaotique qu'elle soit, je l'adore"],
    ['Tu nous feras visiter un jour ?|Um dia você vai nos mostrar?', 'Diga que será um prazer recebê-los quando quiserem.', "Ce sera un plaisir de vous accueillir quand vous voudrez; Ce sera avec plaisir, quand vous voulez"],
  ]),
];
