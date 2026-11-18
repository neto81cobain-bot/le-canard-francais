// Aventuras 31–40 (A2). Mesmo formato de adventures.js.
const A = (id, title, emoji, level, desc, nodes) => ({ id, title, emoji, level, desc, start: "a", nodes });
const c = (fr, pt, to, tip) => (tip ? { fr, pt, to, tip } : { fr, pt, to });

export const ADVENTURES_4 = [
  A("trainretard", "O trem atrasado", "🚆", "A2", "Seu trem para Bordeaux está atrasado e você tem um compromisso.", {
    a: { lines: ["Annonce : « Le TGV pour Bordeaux a un retard d'environ quarante-cinq minutes. »|Aviso: “O TGV para Bordeaux está com atraso de cerca de quarenta e cinco minutos.”", "Tu vas au guichet.|Você vai ao guichê."], choices: [
      c("Bonjour. Mon train a du retard. Est-ce qu'il y a un autre train plus tôt ?", "Bom dia. Meu trem está atrasado. Tem outro trem mais cedo?", "b"),
      c("C'est inacceptable ! Je veux partir maintenant !", "É inaceitável! Quero partir agora!", "b2", "Ficar bravo com o atendente não ajuda. Pergunte por alternativas.") ] },
    b: { lines: ["« Il y a un TER à 10 h 12, mais il est plus lent. Il arrive à 13 h. »|“Tem um trem regional às 10h12, mas é mais lento. Chega às 13h.”"], choices: [
      c("Et le TGV, il arrive à quelle heure avec le retard ?", "E o TGV, chega a que horas com o atraso?", "c"),
      c("Je prends le TER, merci.", "Vou no regional, obrigado.", "end_ok") ] },
    b2: { lines: ["L'agent, calme : « Je comprends, monsieur. Je vais voir ce que je peux faire. »|O agente, calmo: “Entendo, senhor. Vou ver o que posso fazer.”"], choices: [
      c("Pardon, je suis stressé. Il y a une autre solution ?", "Desculpe, estou estressado. Tem outra solução?", "b") ] },
    c: { lines: ["« Vers 12 h 15. Et avec ce retard, vous aurez droit à un remboursement partiel. »|“Por volta de 12h15. E com esse atraso, o senhor terá direito a um reembolso parcial.”"], choices: [
      c("Parfait, je garde le TGV. Comment je demande le remboursement ?", "Perfeito, fico com o TGV. Como peço o reembolso?", "end_best") ] },
    end_ok: { end: "good", lines: ["Tu arrives à 13 h, un peu en retard, mais tu arrives.|Você chega às 13h, um pouco atrasado, mas chega."] },
    end_best: { end: "best", lines: ["Tu arrives plus tôt ET tu récupères vingt-cinq pour cent du billet. Bien joué !|Você chega mais cedo E recupera vinte e cinco por cento da passagem. Muito bem!"] },
  }),
  A("resto", "Reservando uma mesa", "📞", "A2", "Ligue para um restaurante e reserve o jantar de aniversário da sua amiga.", {
    a: { lines: ["« Restaurant Le Petit Zinc, bonjour ! »|“Restaurante Le Petit Zinc, bom dia!”"], choices: [
      c("Bonjour ! Je voudrais réserver une table pour samedi soir, s'il vous plaît.", "Bom dia! Eu gostaria de reservar uma mesa para sábado à noite, por favor.", "b"),
      c("Une table samedi.", "Uma mesa sábado.", "b", "“Je voudrais réserver…” é a fórmula clássica.") ] },
    b: { lines: ["« Pour combien de personnes et à quelle heure ? »|“Para quantas pessoas e a que horas?”"], choices: [
      c("Pour six personnes, vers vingt heures.", "Para seis pessoas, por volta das vinte horas.", "c") ] },
    c: { lines: ["« Vingt heures, c'est complet. Je peux vous proposer vingt et une heures. »|“Vinte horas está lotado. Posso propor vinte e uma horas.”"], choices: [
      c("D'accord, vingt et une heures. C'est pour un anniversaire : on peut apporter un gâteau ?", "Tudo bem, vinte e uma horas. É um aniversário: podemos levar um bolo?", "d"),
      c("Bon, d'accord.", "Bom, tudo bem.", "d2") ] },
    d: { lines: ["« Bien sûr ! Et nous ajouterons des bougies. C'est à quel nom ? »|“Claro! E colocaremos velas. Em nome de quem?”"], choices: [
      c("Au nom de Silva, S-I-L-V-A. Merci beaucoup !", "Em nome de Silva, S-I-L-V-A. Muito obrigado!", "end_best") ] },
    d2: { lines: ["« C'est à quel nom ? »|“Em nome de quem?”"], choices: [
      c("Silva.", "Silva.", "end_ok") ] },
    end_ok: { end: "good", lines: ["La table est réservée. Bon appétit !|A mesa está reservada. Bom apetite!"] },
    end_best: { end: "best", lines: ["Le samedi, le serveur arrive avec le gâteau et les bougies allumées. Ton amie est émue !|No sábado, o garçom chega com o bolo e as velas acesas. Sua amiga se emociona!"] },
  }),
  A("coiffeur", "No cabeleireiro", "💇", "A2", "Você precisa cortar o cabelo antes de uma entrevista.", {
    a: { lines: ["La coiffeuse : « Bonjour ! Qu'est-ce que je vous fais aujourd'hui ? »|A cabeleireira: “Bom dia! O que vamos fazer hoje?”"], choices: [
      c("Bonjour ! Juste une coupe, pas trop courte, s'il vous plaît.", "Bom dia! Só um corte, não muito curto, por favor.", "b"),
      c("Comme vous voulez.", "Como a senhora quiser.", "b2", "Diga exatamente o que quer — senão a surpresa pode ser grande!") ] },
    b: { lines: ["« D'accord. Je coupe deux centimètres sur les côtés ? »|“Tudo bem. Corto dois centímetros dos lados?”"], choices: [
      c("Oui, et un peu plus court derrière, s'il vous plaît.", "Sim, e um pouco mais curto atrás, por favor.", "c") ] },
    b2: { lines: ["Elle prend la tondeuse avec un grand sourire…|Ela pega a máquina com um sorrisão…"], choices: [
      c("Attendez ! Pas trop court, s'il vous plaît !", "Espere! Não muito curto, por favor!", "b"),
      c("…", "…", "end_ok") ] },
    c: { lines: ["Vingt minutes plus tard : « Voilà ! Ça vous plaît ? »|Vinte minutos depois: “Pronto! Gostou?”"], choices: [
      c("C'est parfait, merci ! Je vous dois combien ?", "Ficou perfeito, obrigado! Quanto lhe devo?", "end_best") ] },
    end_ok: { end: "good", lines: ["Résultat : très, très court. Au moins, il fait frais !|Resultado: muito, muito curto. Pelo menos fica fresquinho!"] },
    end_best: { end: "best", lines: ["« Vingt-cinq euros. Bonne chance pour l'entretien ! » Tu es impeccable.|“Vinte e cinco euros. Boa sorte na entrevista!” Você está impecável."] },
  }),
  A("colis", "Mandando um pacote", "📦", "A2", "Você quer mandar um presente para sua mãe no Brasil.", {
    a: { lines: ["L'employé : « Bonjour ! C'est pour un envoi ? »|O atendente: “Bom dia! É para um envio?”"], choices: [
      c("Oui, je voudrais envoyer ce colis au Brésil.", "Sim, eu gostaria de mandar este pacote para o Brasil.", "b") ] },
    b: { lines: ["« Il y a quoi dedans ? Pas de liquides ni de batteries ? »|“O que tem dentro? Sem líquidos nem baterias?”"], choices: [
      c("Non, seulement des vêtements et un livre.", "Não, só roupas e um livro.", "c"),
      c("Il y a du parfum.", "Tem perfume.", "b2", "Perfume é líquido inflamável: não pode ir por avião.") ] },
    b2: { lines: ["« Ah, le parfum est interdit en avion. Il faut le retirer. »|“Ah, o perfume é proibido em avião. Precisa tirar.”"], choices: [
      c("D'accord, je le retire. Il reste des vêtements et un livre.", "Tudo bem, vou tirar. Ficam roupas e um livro.", "c") ] },
    c: { lines: ["« Envoi normal en quinze jours à trente euros, ou express en cinq jours à soixante euros. »|“Envio normal em quinze dias por trinta euros, ou expresso em cinco dias por sessenta euros.”"], choices: [
      c("Le normal, c'est parfait. Il y a un numéro de suivi ?", "O normal está ótimo. Tem código de rastreio?", "end_best"),
      c("L'express.", "O expresso.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Le colis arrive vite… mais tu as payé le double.|O pacote chega rápido… mas você pagou o dobro."] },
    end_best: { end: "best", lines: ["Tu suis ton colis jour après jour. Ta mère est ravie !|Você acompanha o pacote dia a dia. Sua mãe fica radiante!"] },
  }),
  A("location", "Alugando um carro", "🚙", "A2", "Você quer alugar um carro para conhecer a Provença.", {
    a: { lines: ["L'agent : « Bonjour ! Vous avez une réservation ? »|O agente: “Bom dia! Tem reserva?”"], choices: [
      c("Non. Je voudrais louer une petite voiture pour trois jours.", "Não. Eu gostaria de alugar um carro pequeno por três dias.", "b") ] },
    b: { lines: ["« Votre permis de conduire, s'il vous plaît. Vous voulez l'assurance complète ? »|“Sua carteira de motorista, por favor. Quer o seguro completo?”"], choices: [
      c("Qu'est-ce qu'elle couvre exactement ?", "O que ele cobre exatamente?", "c"),
      c("Non, merci.", "Não, obrigado.", "c2") ] },
    c: { lines: ["« Les dommages, le vol et les vitres. C'est quinze euros par jour en plus. »|“Danos, roubo e vidros. São quinze euros por dia a mais.”"], choices: [
      c("D'accord, je la prends. Je rends la voiture avec le plein ?", "Tudo bem, vou ficar com ele. Devolvo o carro de tanque cheio?", "end_best") ] },
    c2: { lines: ["« Très bien. Voici les clés. »|“Muito bem. Aqui estão as chaves.”"], choices: [
      c("Merci !", "Obrigado!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu pars… et tu rayes la portière sur un parking. Ça coûte cher !|Você parte… e risca a porta num estacionamento. Sai caro!"] },
    end_best: { end: "best", lines: ["« Oui, avec le plein. » Trois jours de lavande et de villages, sans aucun stress !|“Sim, de tanque cheio.” Três dias de lavanda e vilarejos, sem estresse nenhum!"] },
  }),
  A("puce", "Um chip de celular", "📶", "A2", "Você chegou à França e precisa de internet no celular.", {
    a: { lines: ["Le vendeur : « Bonjour ! Je peux vous renseigner ? »|O vendedor: “Bom dia! Posso ajudar?”"], choices: [
      c("Bonjour ! Je cherche une carte SIM avec internet pour un mois.", "Bom dia! Procuro um chip com internet para um mês.", "b") ] },
    b: { lines: ["« On a un forfait à quinze euros avec cinquante gigas, ou à vingt-cinq euros avec appels illimités vers l'étranger. »|“Temos um plano de quinze euros com cinquenta gigas, ou de vinte e cinco euros com ligações ilimitadas para o exterior.”"], choices: [
      c("J'appelle souvent ma famille au Brésil. Le deuxième inclut le Brésil ?", "Ligo muito para minha família no Brasil. O segundo inclui o Brasil?", "c"),
      c("Le moins cher.", "O mais barato.", "c2") ] },
    c: { lines: ["« Oui, le Brésil est inclus ! Il faut votre passeport pour l'activer. »|“Sim, o Brasil está incluído! Precisa do seu passaporte para ativar.”"], choices: [
      c("Voilà. Il y a un engagement ?", "Aqui está. Tem fidelidade?", "end_best") ] },
    c2: { lines: ["« Quinze euros. Votre passeport, s'il vous plaît. »|“Quinze euros. Seu passaporte, por favor.”"], choices: [
      c("Voilà.", "Aqui está.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu as internet… mais les appels vers le Brésil coûtent très cher !|Você tem internet… mas as ligações para o Brasil saem caríssimas!"] },
    end_best: { end: "best", lines: ["« Non, sans engagement. » Tu appelles ta famille tous les jours sans souci !|“Não, sem fidelidade.” Você liga para a família todo dia sem preocupação!"] },
  }),
  A("camping", "Chegando ao camping", "⛺", "A2", "Você chega a um camping na Bretanha sem reserva.", {
    a: { lines: ["L'accueil : « Bonsoir ! Vous avez réservé ? »|A recepção: “Boa noite! Vocês reservaram?”"], choices: [
      c("Non, malheureusement. Il vous reste un emplacement pour une tente ?", "Não, infelizmente. Ainda tem um lugar para uma barraca?", "b"),
      c("Non. On peut dormir ici ?", "Não. Podemos dormir aqui?", "b") ] },
    b: { lines: ["« Il reste un emplacement près des sanitaires ou un autre près de la rivière, mais plus cher. »|“Sobrou um lugar perto dos banheiros ou outro perto do rio, porém mais caro.”"], choices: [
      c("Quelle est la différence de prix ?", "Qual é a diferença de preço?", "c"),
      c("Près des sanitaires, c'est bien.", "Perto dos banheiros está bom.", "end_ok") ] },
    c: { lines: ["« Trois euros de plus par nuit. »|“Três euros a mais por noite.”"], choices: [
      c("Alors la rivière ! On reste deux nuits.", "Então o do rio! Vamos ficar duas noites.", "end_best") ] },
    end_ok: { end: "good", lines: ["Pratique, mais il y a du passage toute la nuit…|Prático, mas tem gente passando a noite toda…"] },
    end_best: { end: "best", lines: ["Tu t'endors au bruit de la rivière, sous les étoiles. Magique !|Você adormece com o barulho do rio, sob as estrelas. Mágico!"] },
  }),
  A("cuisine", "A aula de culinária", "👩‍🍳", "A2", "Você se inscreveu numa aula para aprender a fazer quiche.", {
    a: { lines: ["La cheffe : « Bienvenue ! Aujourd'hui, on prépare une quiche lorraine. Vous avez déjà cuisiné ? »|A chef: “Bem-vindos! Hoje vamos preparar uma quiche lorraine. Já cozinharam antes?”"], choices: [
      c("Un peu, mais je n'ai jamais fait de quiche.", "Um pouco, mas nunca fiz quiche.", "b") ] },
    b: { lines: ["« Pas de problème. D'abord, battez les œufs avec la crème. »|“Sem problema. Primeiro, batam os ovos com o creme.”"], choices: [
      c("Combien d'œufs faut-il ?", "Quantos ovos são necessários?", "c"),
      c("Je mets tous les œufs ?", "Ponho todos os ovos?", "c2") ] },
    c: { lines: ["« Trois œufs et vingt centilitres de crème. Ensuite, ajoutez les lardons. »|“Três ovos e vinte centilitros de creme. Depois, acrescentem o bacon.”"], choices: [
      c("Et je mets la quiche au four combien de temps ?", "E ponho a quiche no forno por quanto tempo?", "end_best") ] },
    c2: { lines: ["La cheffe rit : « Non, non ! Seulement trois ! »|A chef ri: “Não, não! Só três!”"], choices: [
      c("Oups ! Trois œufs, d'accord.", "Opa! Três ovos, tudo bem.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Ta quiche est un peu baveuse, mais délicieuse !|Sua quiche ficou um pouco mole, mas deliciosa!"] },
    end_best: { end: "best", lines: ["« Trente minutes à 180 degrés. » Ta quiche est parfaite, la cheffe te félicite !|“Trinta minutos a 180 graus.” Sua quiche fica perfeita, e a chef te dá os parabéns!"] },
  }),
  A("salle", "Matrícula na academia", "🏋️", "A2", "Você quer se inscrever numa academia em Lyon.", {
    a: { lines: ["Le coach : « Salut ! Tu veux t'inscrire ? »|O instrutor: “Oi! Quer se inscrever?”"], choices: [
      c("Oui ! Quels sont les tarifs ?", "Sim! Quais são os preços?", "b") ] },
    b: { lines: ["« Trente euros par mois avec un an d'engagement, ou quarante-cinq euros sans engagement. »|“Trinta euros por mês com um ano de fidelidade, ou quarenta e cinco euros sem fidelidade.”"], choices: [
      c("Je reste seulement quatre mois à Lyon. Je prends sans engagement.", "Só fico quatro meses em Lyon. Fico com o sem fidelidade.", "c"),
      c("Trente euros, c'est moins cher !", "Trinta euros é mais barato!", "c2", "Com fidelidade de um ano, você paga 12 meses mesmo indo embora antes.") ] },
    c: { lines: ["« Logique. Tu veux un programme d'entraînement personnalisé ? C'est gratuit le premier jour. »|“Faz sentido. Quer um programa de treino personalizado? É grátis no primeiro dia.”"], choices: [
      c("Oui, avec plaisir ! Je voudrais renforcer mon dos.", "Sim, com prazer! Eu queria fortalecer as costas.", "end_best") ] },
    c2: { lines: ["« Attention, tu devras payer douze mois, même si tu pars. »|“Atenção, você vai ter que pagar doze meses, mesmo se for embora.”"], choices: [
      c("Ah… alors sans engagement, s'il te plaît.", "Ah… então sem fidelidade, por favor.", "c"),
      c("Tant pis, je signe.", "Paciência, eu assino.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu fais du sport… et tu paies pendant huit mois après ton départ !|Você faz exercício… e paga oito meses depois de ir embora!"] },
    end_best: { end: "best", lines: ["Programme sur mesure, bon prix et zéro piège. En forme !|Programa sob medida, preço bom e nenhuma armadilha. Em forma!"] },
  }),
  A("oubli", "O celular esquecido no táxi", "📱", "A2", "Você saiu do táxi e percebeu que esqueceu o celular.", {
    a: { lines: ["Tu empruntes le téléphone d'un passant et tu appelles la compagnie de taxis.|Você pega o telefone de um passante e liga para a empresa de táxi."], choices: [
      c("Bonjour, j'ai oublié mon téléphone dans un de vos taxis, il y a dix minutes.", "Bom dia, esqueci meu celular num dos seus táxis, há dez minutos.", "b"),
      c("Mon téléphone ! Dans le taxi !", "Meu celular! No táxi!", "b2") ] },
    b: { lines: ["« Vous vous souvenez du trajet et de l'heure ? »|“O senhor se lembra do trajeto e do horário?”"], choices: [
      c("Oui, de la gare jusqu'à la place Bellecour, vers quinze heures. Le taxi était une voiture blanche.", "Sim, da estação até a praça Bellecour, por volta das quinze horas. O táxi era um carro branco.", "c") ] },
    b2: { lines: ["« Calmez-vous, monsieur. Vous pouvez me donner plus d'informations ? »|“Acalme-se, senhor. Pode me dar mais informações?”"], choices: [
      c("Pardon. De la gare à la place Bellecour, vers quinze heures.", "Desculpe. Da estação até a praça Bellecour, por volta das quinze horas.", "c") ] },
    c: { lines: ["« Je contacte le chauffeur… Il l'a trouvé ! Il peut revenir dans vingt minutes. »|“Vou contatar o motorista… Ele encontrou! Pode voltar em vinte minutos.”"], choices: [
      c("Merci infiniment ! Je l'attends devant le café de la place.", "Muitíssimo obrigado! Espero em frente ao café da praça.", "end_best"),
      c("D'accord, merci.", "Tudo bem, obrigado.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu récupères ton téléphone. Ouf !|Você recupera o celular. Ufa!"] },
    end_best: { end: "best", lines: ["Le chauffeur arrive pile au café. Tu lui offres un café pour le remercier !|O motorista chega direto no café. Você paga um café para agradecer!"] },
  }),
];
