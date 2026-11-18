// Aventuras 21–30 (A1). Mesmo formato de adventures.js.
const A = (id, title, emoji, level, desc, nodes) => ({ id, title, emoji, level, desc, start: "a", nodes });
const c = (fr, pt, to, tip) => (tip ? { fr, pt, to, tip } : { fr, pt, to });

export const ADVENTURES_3 = [
  A("bus", "O ônibus certo", "🚌", "A1", "Você precisa ir ao museu de ônibus, mas não sabe qual pegar.", {
    a: { lines: ["Tu es à l'arrêt de bus. Une jeune femme attend aussi.|Você está no ponto de ônibus. Uma moça também está esperando."], choices: [
      c("Bonjour ! Excusez-moi, quel bus va au musée ?", "Bom dia! Com licença, que ônibus vai para o museu?", "b"),
      c("Musée ? Bus ?", "Museu? Ônibus?", "b2", "Uma frase completa e educada funciona muito melhor: “Quel bus va au musée ?”") ] },
    b: { lines: ["« C'est le bus 21. Il arrive dans cinq minutes. »|“É o ônibus 21. Chega em cinco minutos.”"], choices: [
      c("Merci beaucoup ! Je descends à quel arrêt ?", "Muito obrigado! Desço em que ponto?", "c"),
      c("Merci !", "Obrigado!", "c2") ] },
    b2: { lines: ["Elle sourit : « Le musée ? Prenez le 21 ! »|Ela sorri: “O museu? Pegue o 21!”"], choices: [
      c("Ah, merci ! Je descends où ?", "Ah, obrigado! Desço onde?", "c") ] },
    c: { lines: ["« À l'arrêt “Beaux-Arts”. C'est le sixième arrêt. »|“No ponto ‘Belas-Artes’. É o sexto ponto.”"], choices: [
      c("Parfait, merci et bonne journée !", "Perfeito, obrigado e bom dia!", "end_best") ] },
    c2: { lines: ["Tu montes dans le bus… mais où descendre ?|Você sobe no ônibus… mas onde descer?"], choices: [
      c("Pardon, monsieur, le musée, c'est quel arrêt ?", "Desculpe, senhor, o museu é em qual ponto?", "end_ok") ] },
    end_ok: { end: "good", lines: ["Le chauffeur t'aide et tu arrives au musée.|O motorista te ajuda e você chega ao museu."] },
    end_best: { end: "best", lines: ["Tu descends au bon arrêt, juste devant le musée. Parfait !|Você desce no ponto certo, bem em frente ao museu. Perfeito!"] },
  }),
  A("glace", "Na sorveteria", "🍦", "A1", "Está calor em Nice. Hora de um sorvete!", {
    a: { lines: ["Le glacier : « Bonjour ! Quel parfum ? »|O sorveteiro: “Bom dia! Que sabor?”"], choices: [
      c("Bonjour ! Une boule vanille et une boule fraise, s'il vous plaît.", "Bom dia! Uma bola de baunilha e uma de morango, por favor.", "b"),
      c("Je veux une glace.", "Quero um sorvete.", "b2", "Diga o sabor (“parfum”) e o número de bolas (“boules”).") ] },
    b: { lines: ["« En cornet ou en pot ? »|“Na casquinha ou no potinho?”"], choices: [
      c("En cornet, s'il vous plaît. C'est combien ?", "Na casquinha, por favor. Quanto é?", "c"),
      c("En pot.", "No potinho.", "c") ] },
    b2: { lines: ["« D'accord, mais quel parfum ? Il y a vanille, chocolat, fraise, citron… »|“Tudo bem, mas que sabor? Tem baunilha, chocolate, morango, limão…”"], choices: [
      c("Chocolat et citron, s'il vous plaît !", "Chocolate e limão, por favor!", "b") ] },
    c: { lines: ["« Quatre euros. »|“Quatro euros.”"], choices: [
      c("Voilà. Merci, bonne journée !", "Aqui está. Obrigado, bom dia!", "end_best"),
      c("Voilà.", "Aqui está.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu manges ta glace au soleil. Miam !|Você toma seu sorvete ao sol. Hum!"] },
    end_best: { end: "best", lines: ["« Merci à vous ! Et voilà une petite gaufrette en cadeau ! »|“Obrigado! E aqui está um biscoitinho de brinde!”"] },
  }),
  A("checkin", "Check-in no hotel", "🏨", "A1", "Você chegou ao hotel depois de uma longa viagem.", {
    a: { lines: ["Réceptionniste : « Bonsoir ! Bienvenue à l'hôtel du Parc. »|Recepcionista: “Boa noite! Bem-vindo ao hotel do Parque.”"], choices: [
      c("Bonsoir ! J'ai une réservation au nom de Silva.", "Boa noite! Tenho uma reserva em nome de Silva.", "b"),
      c("Une chambre !", "Um quarto!", "b2", "Diga que tem reserva: “J'ai une réservation au nom de…”") ] },
    b: { lines: ["« Oui, une chambre simple pour trois nuits. Votre passeport, s'il vous plaît. »|“Sim, um quarto de solteiro por três noites. Seu passaporte, por favor.”"], choices: [
      c("Voilà. Le petit-déjeuner est à quelle heure ?", "Aqui está. O café da manhã é a que horas?", "c"),
      c("Voilà.", "Aqui está.", "c2") ] },
    b2: { lines: ["« Vous avez une réservation ? »|“O senhor tem reserva?”"], choices: [
      c("Oui, pardon ! Au nom de Silva.", "Sim, desculpe! Em nome de Silva.", "b") ] },
    c: { lines: ["« De sept heures à dix heures, au rez-de-chaussée. Voici votre clé : chambre 305. »|“Das sete às dez, no térreo. Aqui está sua chave: quarto 305.”"], choices: [
      c("Merci beaucoup ! Bonne soirée !", "Muito obrigado! Boa noite!", "end_best") ] },
    c2: { lines: ["« Voici votre clé : chambre 305. »|“Aqui está sua chave: quarto 305.”"], choices: [
      c("Merci !", "Obrigado!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu montes dans ta chambre et tu dors bien.|Você sobe para o quarto e dorme bem."] },
    end_best: { end: "best", lines: ["Tu sais tout : la chambre, la clé et l'heure du petit-déjeuner. Parfait !|Você sabe tudo: o quarto, a chave e a hora do café. Perfeito!"] },
  }),
  A("musee", "O ingresso do museu", "🖼️", "A1", "Você quer visitar o Louvre com um amigo.", {
    a: { lines: ["Guichet : « Bonjour ! Combien de billets ? »|Bilheteria: “Bom dia! Quantos ingressos?”"], choices: [
      c("Bonjour ! Deux billets, s'il vous plaît.", "Bom dia! Dois ingressos, por favor.", "b"),
      c("Deux.", "Dois.", "b", "Diga sempre “bonjour” e “s'il vous plaît” — na França é essencial.") ] },
    b: { lines: ["« Vous avez moins de vingt-six ans ? »|“Vocês têm menos de vinte e seis anos?”"], choices: [
      c("Moi, oui, j'ai vingt-quatre ans. Mon ami a trente ans.", "Eu sim, tenho vinte e quatro anos. Meu amigo tem trinta.", "c"),
      c("Non.", "Não.", "c2") ] },
    c: { lines: ["« Alors un billet gratuit et un billet à vingt-deux euros. »|“Então um ingresso grátis e um de vinte e dois euros.”"], choices: [
      c("Super ! Il y a un plan du musée ?", "Ótimo! Tem um mapa do museu?", "end_best") ] },
    c2: { lines: ["« Deux billets à vingt-deux euros, ça fait quarante-quatre euros. »|“Dois ingressos de vinte e dois euros, dá quarenta e quatro euros.”"], choices: [
      c("Voilà, merci !", "Aqui está, obrigado!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Vous entrez au musée. Bonne visite !|Vocês entram no museu. Boa visita!"] },
    end_best: { end: "best", lines: ["Tu économises vingt-deux euros et tu as le plan. Malin !|Você economiza vinte e dois euros e ainda pega o mapa. Esperto!"] },
  }),
  A("photo", "Uma foto, por favor", "📸", "A1", "Você está na Torre Eiffel e quer uma foto sua.", {
    a: { lines: ["Un couple se promène à côté de toi.|Um casal passeia ao seu lado."], choices: [
      c("Excusez-moi, vous pouvez prendre une photo, s'il vous plaît ?", "Com licença, vocês podem tirar uma foto, por favor?", "b"),
      c("Photo !", "Foto!", "b2", "Peça com “Vous pouvez… s'il vous plaît ?”") ] },
    b: { lines: ["L'homme : « Bien sûr ! Avec la tour derrière ? »|O homem: “Claro! Com a torre atrás?”"], choices: [
      c("Oui, merci ! Vous pouvez en prendre deux ?", "Sim, obrigado! Pode tirar duas?", "c") ] },
    b2: { lines: ["La femme hésite : « Euh… vous voulez une photo ? »|A mulher hesita: “É… você quer uma foto?”"], choices: [
      c("Oui, s'il vous plaît ! Pardon.", "Sim, por favor! Desculpe.", "b") ] },
    c: { lines: ["« Voilà ! Elles sont jolies ! »|“Pronto! Ficaram bonitas!”"], choices: [
      c("Merci beaucoup ! Vous voulez une photo aussi ?", "Muito obrigado! Querem uma foto também?", "end_best"),
      c("Merci !", "Obrigado!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu as une belle photo avec la tour Eiffel.|Você tem uma bela foto com a Torre Eiffel."] },
    end_best: { end: "best", lines: ["Tu prends leur photo aussi. Ils sont ravis ! Échange parfait.|Você tira a foto deles também. Eles adoram! Troca perfeita."] },
  }),
  A("parasol", "Um guarda-sol na praia", "⛱️", "A1", "Você quer alugar um guarda-sol e duas cadeiras.", {
    a: { lines: ["Le plagiste : « Bonjour ! Vous voulez un parasol ? »|O barraqueiro: “Bom dia! Quer um guarda-sol?”"], choices: [
      c("Oui, un parasol et deux chaises, s'il vous plaît.", "Sim, um guarda-sol e duas cadeiras, por favor.", "b"),
      c("Oui. C'est combien ?", "Sim. Quanto é?", "b") ] },
    b: { lines: ["« Pour la journée, c'est vingt euros. Pour l'après-midi, douze euros. »|“Para o dia todo, vinte euros. Para a tarde, doze euros.”"], choices: [
      c("Pour l'après-midi, s'il vous plaît. On peut payer par carte ?", "Para a tarde, por favor. Dá para pagar com cartão?", "c"),
      c("La journée.", "O dia.", "c2") ] },
    c: { lines: ["« Oui, bien sûr. Voilà, numéro 8, au premier rang ! »|“Sim, claro. Aqui está, número 8, na primeira fila!”"], choices: [
      c("Super, merci beaucoup !", "Ótimo, muito obrigado!", "end_best") ] },
    c2: { lines: ["« Vingt euros, s'il vous plaît. Numéro 15. »|“Vinte euros, por favor. Número 15.”"], choices: [
      c("Voilà. Merci !", "Aqui está. Obrigado!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu te reposes sous ton parasol.|Você descansa debaixo do seu guarda-sol."] },
    end_best: { end: "best", lines: ["Premier rang, vue sur la mer et bon prix. Les vacances parfaites !|Primeira fila, vista para o mar e bom preço. Férias perfeitas!"] },
  }),
  A("voisine", "A vizinha simpática", "🏠", "A1", "Você acabou de se mudar e encontra a vizinha no corredor.", {
    a: { lines: ["La voisine : « Bonjour ! Vous êtes nouveau ici ? »|A vizinha: “Bom dia! O senhor é novo aqui?”"], choices: [
      c("Bonjour ! Oui, j'habite au deuxième étage. Je m'appelle Raimundo.", "Bom dia! Sim, moro no segundo andar. Me chamo Raimundo.", "b"),
      c("Oui.", "Sim.", "b2", "Aproveite para se apresentar: nome e andar.") ] },
    b: { lines: ["« Enchantée ! Moi, c'est Claire. Vous venez d'où ? »|“Muito prazer! Eu sou a Claire. O senhor vem de onde?”"], choices: [
      c("Je viens du Brésil. Et vous, vous habitez ici depuis longtemps ?", "Venho do Brasil. E a senhora mora aqui há muito tempo?", "c") ] },
    b2: { lines: ["Elle attend un peu… « Et vous vous appelez comment ? »|Ela espera um pouco… “E como o senhor se chama?”"], choices: [
      c("Raimundo. Pardon, je suis un peu timide !", "Raimundo. Desculpe, sou um pouco tímido!", "c2") ] },
    c: { lines: ["« Dix ans ! Si vous avez besoin de quelque chose, je suis au troisième. »|“Dez anos! Se precisar de alguma coisa, estou no terceiro.”"], choices: [
      c("C'est très gentil, merci ! Bonne journée, Claire !", "É muito gentil, obrigado! Bom dia, Claire!", "end_best") ] },
    c2: { lines: ["« Pas de problème ! Bienvenue dans l'immeuble ! »|“Sem problema! Bem-vindo ao prédio!”"], choices: [
      c("Merci, au revoir !", "Obrigado, tchau!", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu connais maintenant ta voisine.|Agora você conhece sua vizinha."] },
    end_best: { end: "best", lines: ["Le lendemain, Claire t'apporte un gâteau de bienvenue !|No dia seguinte, Claire te traz um bolo de boas-vindas!"] },
  }),
  A("cinema", "Noite de cinema", "🎟️", "A1", "Você quer ver um filme francês com legendas.", {
    a: { lines: ["Caissière : « Bonsoir ! Pour quel film ? »|Caixa: “Boa noite! Para que filme?”"], choices: [
      c("Bonsoir ! Deux places pour « Le Grand Voyage », s'il vous plaît.", "Boa noite! Dois lugares para “A Grande Viagem”, por favor.", "b"),
      c("Le film, là.", "Aquele filme ali.", "b2", "Diga o nome do filme e quantos lugares (“places”).") ] },
    b: { lines: ["« La séance de vingt heures ou de vingt-deux heures ? »|“A sessão das vinte ou das vinte e duas?”"], choices: [
      c("Vingt heures. Il est en version originale sous-titrée ?", "Vinte horas. É em versão original legendada?", "c"),
      c("Vingt-deux heures.", "Vinte e duas horas.", "c2") ] },
    b2: { lines: ["« Lequel ? Il y a cinq films ce soir. »|“Qual? Tem cinco filmes hoje à noite.”"], choices: [
      c("Pardon ! « Le Grand Voyage », deux places.", "Desculpe! “A Grande Viagem”, dois lugares.", "b") ] },
    c: { lines: ["« Oui, avec des sous-titres en français. Ça fait dix-huit euros. »|“Sim, com legendas em francês. Dá dezoito euros.”"], choices: [
      c("Parfait pour apprendre ! Voilà.", "Perfeito para aprender! Aqui está.", "end_best") ] },
    c2: { lines: ["« Dix-huit euros, s'il vous plaît. »|“Dezoito euros, por favor.”"], choices: [
      c("Voilà, merci.", "Aqui está, obrigado.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu regardes le film… tard, mais tu le regardes !|Você vê o filme… tarde, mas vê!"] },
    end_best: { end: "best", lines: ["Film en français avec sous-titres : tu apprends en t'amusant. Bravo !|Filme em francês com legenda: você aprende se divertindo. Parabéns!"] },
  }),
  A("fleurs", "Flores para a anfitriã", "💐", "A1", "Você vai jantar na casa de uma amiga e quer levar flores.", {
    a: { lines: ["La fleuriste : « Bonjour ! Je peux vous aider ? »|A florista: “Bom dia! Posso ajudar?”"], choices: [
      c("Bonjour ! Je voudrais un bouquet pour une amie.", "Bom dia! Eu queria um buquê para uma amiga.", "b"),
      c("Des fleurs.", "Flores.", "b", "“Je voudrais…” é a forma educada de pedir.") ] },
    b: { lines: ["« Quelles couleurs ? J'ai des roses, des tulipes, des tournesols… »|“Que cores? Tenho rosas, tulipas, girassóis…”"], choices: [
      c("Des tulipes jaunes et blanches, s'il vous plaît.", "Tulipas amarelas e brancas, por favor.", "c"),
      c("Des roses rouges !", "Rosas vermelhas!", "c2", "Cuidado: na França, rosas vermelhas significam paixão.") ] },
    c: { lines: ["« Très joli choix ! Quinze euros. Je fais un joli papier ? »|“Escolha muito bonita! Quinze euros. Faço um papel bonito?”"], choices: [
      c("Oui, merci beaucoup !", "Sim, muito obrigado!", "end_best") ] },
    c2: { lines: ["La fleuriste sourit : « Des roses rouges… pour une amie ? »|A florista sorri: “Rosas vermelhas… para uma amiga?”"], choices: [
      c("Ah… plutôt des tulipes, alors !", "Ah… melhor tulipas, então!", "c"),
      c("Oui, oui, des roses rouges.", "Sim, sim, rosas vermelhas.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Ton amie est surprise… et un peu gênée !|Sua amiga fica surpresa… e um pouco sem graça!"] },
    end_best: { end: "best", lines: ["Ton amie adore les tulipes. « Elles sont magnifiques, merci ! »|Sua amiga adora as tulipas. “São lindas, obrigada!”"] },
  }),
  A("pharma", "Dor de cabeça", "💊", "A1", "Você está com dor de cabeça e entra numa farmácia.", {
    a: { lines: ["Le pharmacien : « Bonjour, monsieur. Qu'est-ce qui ne va pas ? »|O farmacêutico: “Bom dia, senhor. O que está acontecendo?”"], choices: [
      c("Bonjour. J'ai mal à la tête depuis ce matin.", "Bom dia. Estou com dor de cabeça desde hoje de manhã.", "b"),
      c("Tête !", "Cabeça!", "b2", "Use “J'ai mal à…” para dizer onde dói.") ] },
    b: { lines: ["« Vous avez de la fièvre ? Vous êtes allergique à quelque chose ? »|“Tem febre? É alérgico a alguma coisa?”"], choices: [
      c("Non, pas de fièvre et pas d'allergie.", "Não, sem febre e sem alergia.", "c") ] },
    b2: { lines: ["« Vous avez mal à la tête ? »|“O senhor está com dor de cabeça?”"], choices: [
      c("Oui, j'ai mal à la tête.", "Sim, estou com dor de cabeça.", "b") ] },
    c: { lines: ["« Prenez un comprimé de paracétamol, trois fois par jour maximum. »|“Tome um comprimido de paracetamol, no máximo três vezes por dia.”"], choices: [
      c("D'accord. Je le prends avec de l'eau ?", "Tudo bem. Tomo com água?", "end_best"),
      c("Merci.", "Obrigado.", "end_ok") ] },
    end_ok: { end: "good", lines: ["Tu prends le médicament et tu te sens mieux.|Você toma o remédio e se sente melhor."] },
    end_best: { end: "best", lines: ["« Oui, et buvez beaucoup d'eau. Reposez-vous ! » Bonne communication !|“Sim, e beba bastante água. Descanse!” Ótima comunicação!"] },
  }),
];
