// Aventuras 41–50 (B1). Mesmo formato de adventures.js.
const A = (id, title, emoji, level, desc, nodes) => ({ id, title, emoji, level, desc, start: "a", nodes });
const c = (fr, pt, to, tip) => (tip ? { fr, pt, to, tip } : { fr, pt, to });

export const ADVENTURES_5 = [
  A("abime", "O pacote danificado", "📦", "B1", "Sua encomenda chegou quebrada. Ligue para a loja.", {
    a: { lines: ["« Service client, Sandrine à l'appareil. Que puis-je faire pour vous ? »|“Atendimento ao cliente, Sandrine falando. Em que posso ajudar?”"], choices: [
      c("Bonjour. J'ai reçu ma commande hier, mais la lampe est cassée.", "Bom dia. Recebi meu pedido ontem, mas a luminária está quebrada.", "b"),
      c("Votre colis est arrivé en morceaux, c'est n'importe quoi !", "Seu pacote chegou em pedaços, que absurdo!", "b2", "Descreva o problema com calma: o atendente não tem culpa.") ] },
    b: { lines: ["« Je suis désolée. Vous avez votre numéro de commande ? »|“Sinto muito. O senhor tem o número do pedido?”"], choices: [
      c("Oui, c'est le 48213. J'ai aussi pris des photos du carton.", "Sim, é o 48213. Também tirei fotos da caixa.", "c"),
      c("Euh… je ne sais pas.", "É… não sei.", "c2") ] },
    b2: { lines: ["« Je comprends votre frustration. Expliquez-moi ce qui s'est passé. »|“Entendo sua frustração. Explique o que aconteceu.”"], choices: [
      c("Pardon. La lampe est arrivée cassée.", "Desculpe. A luminária chegou quebrada.", "b") ] },
    c: { lines: ["« Parfait, avec les photos, je peux vous proposer un remplacement ou un remboursement. »|“Perfeito, com as fotos posso oferecer uma troca ou um reembolso.”"], choices: [
      c("Je préférerais un remplacement. Est-ce que je dois renvoyer la lampe cassée ?", "Eu preferiria uma troca. Preciso devolver a luminária quebrada?", "end_best") ] },
    c2: { lines: ["« Il est sur votre courriel de confirmation. Vous pouvez me rappeler avec ce numéro ? »|“Está no seu e-mail de confirmação. Pode me ligar de novo com esse número?”"], choices: [
      c("D'accord, je vous rappelle.", "Tudo bem, ligo de novo.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu rappelles le lendemain et tout s'arrange, un peu plus lentement.|Você liga no dia seguinte e tudo se resolve, um pouco mais devagar."] },
    end_best: { end: "best", lines: ["« Non, gardez-la. La nouvelle arrive jeudi. » Problème réglé en trois minutes !|“Não, pode ficar com ela. A nova chega quinta.” Problema resolvido em três minutos!"] },
  }),
  A("covoit", "Carona compartilhada", "🚘", "B1", "Você reservou uma carona de Paris a Nantes com um desconhecido.", {
    a: { lines: ["Le conducteur : « Salut ! Tu es Raimundo ? Moi, c'est Julien. Tu as des bagages ? »|O motorista: “Oi! Você é o Raimundo? Eu sou o Julien. Tem bagagem?”"], choices: [
      c("Salut Julien ! Juste un sac à dos. Merci de m'emmener !", "Oi Julien! Só uma mochila. Obrigado pela carona!", "b") ] },
    b: { lines: ["Après une heure : « Ça te dérange si je mets de la musique ? »|Depois de uma hora: “Te incomoda se eu puser música?”"], choices: [
      c("Pas du tout ! Qu'est-ce que tu écoutes ?", "De jeito nenhum! O que você escuta?", "c"),
      c("Je préfère dormir, désolé.", "Prefiro dormir, desculpa.", "c2") ] },
    c: { lines: ["« Du rock français. Tu connais Téléphone ? »|“Rock francês. Conhece o Téléphone?”"], choices: [
      c("Non, mais j'adorerais découvrir ! Et toi, tu connais la musique brésilienne ?", "Não, mas adoraria conhecer! E você, conhece música brasileira?", "end_best") ] },
    c2: { lines: ["« Pas de souci, repose-toi. »|“Sem problema, descanse.”"], choices: [
      c("Merci, réveille-moi à Nantes !", "Obrigado, me acorda em Nantes!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu arrives à Nantes reposé. Trajet tranquille.|Você chega a Nantes descansado. Viagem tranquila."] },
    end_best: { end: "best", lines: ["Quatre heures d'échange musical. Julien t'invite à un concert le week-end prochain !|Quatro horas de troca musical. Julien te convida para um show no próximo fim de semana!"] },
  }),
  A("correspondance", "A conexão perdida", "🛫", "B1", "Seu primeiro voo atrasou e você perdeu a conexão em Paris.", {
    a: { lines: ["Au comptoir de la compagnie, il y a une longue file. Enfin ton tour.|No balcão da companhia, há uma fila enorme. Enfim chega sua vez."], choices: [
      c("Bonjour. Mon vol de Lisbonne avait du retard et j'ai raté ma correspondance pour Montréal.", "Bom dia. Meu voo de Lisboa atrasou e perdi minha conexão para Montreal.", "b") ] },
    b: { lines: ["« Je vois. Le prochain vol direct est demain à 10 h. »|“Entendo. O próximo voo direto é amanhã às 10h.”"], choices: [
      c("Dans ce cas, la compagnie prend en charge l'hôtel et le repas, n'est-ce pas ?", "Nesse caso, a companhia cobre o hotel e a refeição, não é?", "c"),
      c("Bon… je dors à l'aéroport, alors.", "Bom… então durmo no aeroporto.", "end_ok") ] },
    c: { lines: ["« Tout à fait. Voici un bon pour l'hôtel et un bon repas. »|“Exatamente. Aqui está um voucher para o hotel e um para a refeição.”"], choices: [
      c("Merci. Et puisque le retard dépasse trois heures, j'ai droit à une indemnisation ?", "Obrigado. E como o atraso passa de três horas, tenho direito a uma indenização?", "end_best") ] },
    end_ok: { end: "good", lines: ["Tu passes une nuit inconfortable sur un banc, mais tu pars le lendemain.|Você passa uma noite desconfortável num banco, mas parte no dia seguinte."] },
    end_best: { end: "best", lines: ["« Oui, remplissez ce formulaire en ligne. » Hôtel, dîner ET indemnisation. Expert !|“Sim, preencha este formulário online.” Hotel, jantar E indenização. Especialista!"] },
  }),
  A("stage", "Primeiro dia de estágio", "🧑‍💻", "B1", "Você começa um estágio numa empresa de energia solar em Toulouse.", {
    a: { lines: ["La tutrice : « Bienvenue ! Je suis Marion, ta tutrice. Tu as trouvé facilement ? »|A supervisora: “Bem-vindo! Sou a Marion, sua supervisora. Achou fácil?”"], choices: [
      c("Oui, merci ! Je suis très content de commencer.", "Sim, obrigado! Estou muito contente de começar.", "b") ] },
    b: { lines: ["« Cette semaine, tu vas analyser des données de production. Tu connais Excel ? »|“Esta semana, você vai analisar dados de produção. Conhece Excel?”"], choices: [
      c("Oui, assez bien. Mais je voudrais savoir quels sont vos objectifs pour ce stage.", "Sim, razoavelmente. Mas eu gostaria de saber quais são os objetivos de vocês para este estágio.", "c"),
      c("Oui, parfaitement !", "Sim, perfeitamente!", "c2", "Exagerar suas habilidades pode virar problema depois.") ] },
    c: { lines: ["« Excellente question ! On aimerait un rapport sur la performance des panneaux d'ici deux mois. »|“Ótima pergunta! Gostaríamos de um relatório sobre o desempenho dos painéis em dois meses.”"], choices: [
      c("Très bien. Est-ce qu'on pourrait faire un point chaque vendredi ?", "Muito bem. Poderíamos fazer uma reunião rápida toda sexta?", "end_best") ] },
    c2: { lines: ["« Super, alors fais-moi un tableau croisé dynamique pour midi. »|“Ótimo, então me faça uma tabela dinâmica até meio-dia.”"], choices: [
      c("Euh… en fait, je ne maîtrise pas encore les tableaux croisés.", "É… na verdade, ainda não domino tabelas dinâmicas.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Marion t'explique patiemment. Leçon apprise : l'honnêteté d'abord.|Marion te explica com paciência. Lição aprendida: honestidade em primeiro lugar."] },
    end_best: { end: "best", lines: ["Marion est impressionnée : « Tu es organisé, j'aime ça ! »|Marion fica impressionada: “Você é organizado, gosto disso!”"] },
  }),
  A("panne", "Pane na estrada", "🛠️", "B1", "Seu carro alugado parou numa estrada do interior.", {
    a: { lines: ["Tu appelles l'assistance. « Bonjour, quel est le problème ? »|Você liga para a assistência. “Bom dia, qual é o problema?”"], choices: [
      c("La voiture s'est arrêtée et un voyant rouge est allumé.", "O carro parou e uma luz vermelha acendeu no painel.", "b"),
      c("La voiture ne marche plus.", "O carro não anda mais.", "b2") ] },
    b: { lines: ["« Vous êtes en sécurité ? Où êtes-vous exactement ? »|“O senhor está em segurança? Onde está exatamente?”"], choices: [
      c("Oui, je suis sur le bas-côté, avec le gilet jaune. Sur la D23, près du village de Saint-Rémy.", "Sim, estou no acostamento, com o colete amarelo. Na D23, perto do vilarejo de Saint-Rémy.", "c") ] },
    b2: { lines: ["« Pouvez-vous m'en dire plus ? Il y a un voyant allumé ? »|“Pode me dizer mais? Tem alguma luz acesa?”"], choices: [
      c("Oui, un voyant rouge.", "Sim, uma luz vermelha.", "b") ] },
    c: { lines: ["« Parfait. Une dépanneuse arrive dans quarante minutes. »|“Perfeito. Um guincho chega em quarenta minutos.”"], choices: [
      c("Merci. Est-ce que j'aurai une voiture de remplacement ?", "Obrigado. Terei um carro reserva?", "end_best"),
      c("D'accord, j'attends.", "Tudo bem, espero.", "end_ok") ] },
    end_ok: { end: "good", lines: ["La dépanneuse arrive. Tu finis le voyage en train.|O guincho chega. Você termina a viagem de trem."] },
    end_best: { end: "best", lines: ["« Oui, elle vous attendra au garage. » Tu continues ton voyage le jour même !|“Sim, ele estará esperando na oficina.” Você continua a viagem no mesmo dia!"] },
  }),
  A("annule", "O amigo que desmarcou", "🙄", "B1", "Seu amigo desmarcou o cinema pela terceira vez seguida.", {
    a: { lines: ["Texto de Lucas : « Désolé, je ne peux pas ce soir, j'ai un truc. »|Mensagem do Lucas: “Foi mal, não posso hoje, tenho um compromisso.”"], choices: [
      c("Pas de souci… mais c'est la troisième fois. Tout va bien de ton côté ?", "Sem problema… mas é a terceira vez. Está tudo bem com você?", "b"),
      c("Encore ?! T'es vraiment pas fiable.", "De novo?! Você não é nada confiável.", "b2", "Mostrar preocupação abre espaço para conversa; acusar fecha.") ] },
    b: { lines: ["« En fait… je traverse une période difficile au boulot. Je n'ai la tête à rien. »|“Na verdade… estou passando por um período difícil no trampo. Não tenho cabeça para nada.”"], choices: [
      c("Je comprends. Si tu veux, on peut juste prendre un café et parler.", "Entendo. Se quiser, a gente pode só tomar um café e conversar.", "end_best") ] },
    b2: { lines: ["« Ok… si tu le prends comme ça. »|“Ok… se você leva assim.”"], choices: [
      c("Pardon, je me suis énervé. Qu'est-ce qui se passe ?", "Desculpa, me irritei. O que está acontecendo?", "b"),
      c("Tant pis.", "Paciência.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Vous ne vous parlez plus pendant quelques semaines.|Vocês ficam algumas semanas sem se falar."] },
    end_best: { end: "best", lines: ["Le lendemain, Lucas t'écrit : « Merci, ça m'a fait du bien de parler. »|No dia seguinte, Lucas te escreve: “Obrigado, me fez bem conversar.”"] },
  }),
  A("ong", "Entrevista numa ONG", "🌱", "B1", "Você quer ser voluntário numa ONG ambiental em Marselha.", {
    a: { lines: ["La responsable : « Merci d'être venu ! Pourquoi voulez-vous rejoindre notre association ? »|A responsável: “Obrigada por ter vindo! Por que quer entrar na nossa associação?”"], choices: [
      c("Je travaille dans l'environnement et je voudrais agir concrètement pour protéger le littoral.", "Trabalho com meio ambiente e gostaria de agir concretamente para proteger o litoral.", "b"),
      c("J'ai du temps libre.", "Tenho tempo livre.", "b2", "Mostre motivação e o que você pode trazer.") ] },
    b: { lines: ["« Formidable ! Quelles compétences pourriez-vous apporter ? »|“Formidável! Que competências poderia trazer?”"], choices: [
      c("J'ai de l'expérience en analyse de la qualité de l'eau et en cartographie.", "Tenho experiência em análise da qualidade da água e em cartografia.", "c") ] },
    b2: { lines: ["« D'accord… mais qu'est-ce qui vous intéresse dans notre mission ? »|“Certo… mas o que lhe interessa na nossa missão?”"], choices: [
      c("La protection de la mer. Et j'ai de l'expérience en analyse de l'eau.", "A proteção do mar. E tenho experiência em análise de água.", "c") ] },
    c: { lines: ["« Justement, nous cherchons quelqu'un pour suivre la pollution dans les calanques ! »|“Justamente, procuramos alguém para monitorar a poluição nas calanques!”"], choices: [
      c("Ce serait un plaisir ! Je suis disponible deux samedis par mois.", "Seria um prazer! Estou disponível dois sábados por mês.", "end_best"),
      c("Peut-être. Je vais réfléchir.", "Talvez. Vou pensar.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Elle te laisse sa carte. La porte reste ouverte.|Ela te deixa o cartão. A porta continua aberta."] },
    end_best: { end: "best", lines: ["Le mois suivant, tu plonges dans les calanques avec l'équipe scientifique !|No mês seguinte, você mergulha nas calanques com a equipe científica!"] },
  }),
  A("hopital", "Visitando um amigo no hospital", "🏥", "B1", "Seu amigo Antoine quebrou a perna. Você vai visitá-lo.", {
    a: { lines: ["À l'accueil : « Bonjour, c'est pour une visite ? »|Na recepção: “Bom dia, é para uma visita?”"], choices: [
      c("Oui, je viens voir Antoine Leroy. Il a été opéré hier.", "Sim, vim ver Antoine Leroy. Ele foi operado ontem.", "b") ] },
    b: { lines: ["« Chambre 214, deuxième étage. Les visites se terminent à vingt heures. »|“Quarto 214, segundo andar. As visitas terminam às vinte horas.”", "Dans la chambre, Antoine a l'air fatigué.|No quarto, Antoine parece cansado."], choices: [
      c("Salut, mon vieux ! Comment tu te sens ? Je t'ai apporté des magazines.", "Oi, meu velho! Como você está se sentindo? Te trouxe umas revistas.", "c"),
      c("Wow, tu as une sale tête !", "Nossa, que cara péssima!", "c2", "Mesmo brincando, comece mostrando cuidado.") ] },
    c: { lines: ["« Ça va mieux, merci. Le pire, c'est l'ennui ! »|“Estou melhor, obrigado. O pior é o tédio!”"], choices: [
      c("Je reviens demain avec un jeu de cartes, alors !", "Então volto amanhã com um baralho!", "end_best") ] },
    c2: { lines: ["Antoine rit un peu : « Merci, sympa… »|Antoine ri um pouco: “Valeu, que simpático…”"], choices: [
      c("Je rigole ! Tu as besoin de quelque chose ?", "Brincadeira! Precisa de alguma coisa?", "c") ] },
    end_ok: { end: "good", lines: ["Tu passes une heure avec lui.|Você passa uma hora com ele."] },
    end_best: { end: "best", lines: ["Chaque soir, vous jouez aux cartes. Les infirmières t'appellent « le meilleur ami de la chambre 214 » !|Toda noite vocês jogam cartas. As enfermeiras te chamam de “o melhor amigo do quarto 214”!"] },
  }),
  A("coloc2", "Entrevista para dividir apê", "🏢", "B1", "Você visita um apartamento compartilhado em Lille.", {
    a: { lines: ["Emma : « Bienvenue ! Ici, on est trois. Parle-nous un peu de toi. »|Emma: “Bem-vindo! Aqui somos três. Fala um pouco de você.”"], choices: [
      c("Je suis brésilien, je travaille dans l'environnement. Je suis calme et j'adore cuisiner.", "Sou brasileiro, trabalho com meio ambiente. Sou tranquilo e adoro cozinhar.", "b") ] },
    b: { lines: ["Hugo : « Cuisiner ? Génial ! Et pour le ménage, tu es comment ? »|Hugo: “Cozinhar? Genial! E na limpeza, como você é?”"], choices: [
      c("Je suis assez organisé. Vous avez un planning de ménage ?", "Sou bem organizado. Vocês têm uma escala de limpeza?", "c"),
      c("Euh… je fais de mon mieux !", "É… faço o meu melhor!", "c2") ] },
    c: { lines: ["Emma : « Oui, sur le frigo ! Le loyer est de quatre cents euros, charges comprises. »|Emma: “Sim, na geladeira! O aluguel é quatrocentos euros, com as despesas incluídas.”"], choices: [
      c("Parfait. Et je pourrais vous préparer une feijoada samedi pour qu'on se connaisse mieux ?", "Perfeito. E eu poderia preparar uma feijoada no sábado para a gente se conhecer melhor?", "end_best") ] },
    c2: { lines: ["Les colocs échangent un regard un peu inquiet.|Os colegas trocam um olhar meio preocupado."], choices: [
      c("Je plaisante ! Je suis organisé. Vous avez un planning ?", "Brincadeira! Sou organizado. Vocês têm uma escala?", "c"),
      c("…", "…", "end_ok") ] },
    end_ok: { end: "good", lines: ["« On te tient au courant. » Tu attends leur réponse.|“A gente te avisa.” Você espera a resposta."] },
    end_best: { end: "best", lines: ["Après la feijoada, la décision est unanime : la chambre est à toi !|Depois da feijoada, a decisão é unânime: o quarto é seu!"] },
  }),
  A("fac", "Matrícula na universidade", "🎓", "B1", "Você vai se inscrever num curso de francês na universidade de Grenoble.", {
    a: { lines: ["La secrétaire : « Bonjour. Vous venez pour l'inscription ? Vous avez tous les documents ? »|A secretária: “Bom dia. Veio para a matrícula? Tem todos os documentos?”"], choices: [
      c("Oui : passeport, photo, attestation de logement et diplôme traduit.", "Sim: passaporte, foto, comprovante de moradia e diploma traduzido.", "b"),
      c("J'ai mon passeport.", "Tenho meu passaporte.", "b2") ] },
    b: { lines: ["« Parfait. Vous devez aussi passer un test de niveau lundi. »|“Perfeito. O senhor também precisa fazer um teste de nível na segunda.”"], choices: [
      c("Très bien. Le test comprend une partie orale ?", "Muito bem. O teste tem uma parte oral?", "c") ] },
    b2: { lines: ["« Il manque l'attestation de logement et le diplôme traduit. »|“Faltam o comprovante de moradia e o diploma traduzido.”"], choices: [
      c("D'accord, je peux les envoyer par courriel aujourd'hui ?", "Tudo bem, posso mandar por e-mail hoje?", "b"),
      c("Je reviens la semaine prochaine.", "Volto semana que vem.", "end_ok") ] },
    c: { lines: ["« Oui, un entretien de dix minutes. Ensuite, vous aurez votre carte d'étudiant. »|“Sim, uma conversa de dez minutos. Depois o senhor recebe a carteirinha de estudante.”"], choices: [
      c("Merci beaucoup pour toutes ces informations !", "Muito obrigado por todas essas informações!", "end_best") ] },
    end_ok: { end: "good", lines: ["Tu reviens la semaine suivante. Inscription faite, avec un peu de retard.|Você volta na semana seguinte. Matrícula feita, com um pouco de atraso."] },
    end_best: { end: "best", lines: ["Lundi, tu réussis le test et tu es placé en niveau B2. Félicitations !|Segunda, você passa no teste e fica no nível B2. Parabéns!"] },
  }),
];
