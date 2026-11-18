// More AI conversation scenarios (to reach 100). Format: id|title|emoji|level|role|goal|opener
const RAW = `
supermarche|No supermercado|🛒|A1|caixa de supermercado simpático|Pague suas compras, peça uma sacola e pergunte se aceitam cartão.|Bonjour ! Vous avez la carte du magasin ?
fromagerie|Na queijaria|🧀|A2|fromager (queijeiro) apaixonado por queijos|Peça conselho para escolher dois queijos para um jantar e pergunte o preço.|Bonjour ! Je peux vous faire goûter quelque chose ?
fleuriste|Na floricultura|💐|A1|fleuriste (florista) gentil|Compre um buquê para o aniversário de uma amiga e escolha as cores.|Bonjour ! C'est pour offrir ?
librairie|Na livraria|📚|A2|libraire (livreiro) culto|Peça um livro fácil em francês para iniciantes e pergunte o preço.|Bonjour ! Vous cherchez quelque chose en particulier ?
taxi|No táxi|🚕|A1|chauffeur de taxi falante|Diga o endereço do hotel, pergunte o preço e quanto tempo demora.|Bonjour ! Où est-ce que je vous emmène ?
metro2|Comprando bilhete de metrô|🎫|A1|agente da RATP no guichê|Compre um passe para a semana e pergunte qual linha vai para Montmartre.|Bonjour, je vous écoute.
location|Alugando um carro|🚗|B1|funcionário de locadora de carros|Alugue um carro por três dias, pergunte sobre o seguro e a gasolina.|Bonjour ! Vous avez réservé en ligne ?
velib|Alugando bicicleta|🚲|A2|turista francês que ajuda na estação de bicicletas|Peça ajuda para alugar uma bicicleta na estação e pergunte onde devolver.|Vous avez besoin d'aide avec la borne ?
coiffeur|No cabeleireiro|💇|A2|coiffeur (cabeleireiro) descontraído|Explique o corte que você quer e pergunte o preço.|Bonjour ! Qu'est-ce qu'on vous fait aujourd'hui ?
medecin2|No médico|🩺|B1|médecin généraliste atencioso|Descreva seus sintomas (febre, garganta) há quantos dias, e pergunte o que tomar.|Bonjour, asseyez-vous. Qu'est-ce qui vous amène ?
dentiste|No dentista|🦷|B1|dentista tranquilo|Explique que está com dor de dente há dois dias e marque um retorno.|Bonjour ! Alors, où est-ce que vous avez mal ?
banque|No banco|🏦|B1|conseiller bancaire (gerente)|Abra uma conta, pergunte as taxas e como receber um cartão.|Bonjour, que puis-je faire pour vous ?
poste|Nos correios|📮|A2|funcionária dos correios|Envie um pacote para o Brasil e pergunte o prazo e o preço.|Bonjour ! C'est pour un envoi en France ou à l'étranger ?
mairie|Na prefeitura|🏛️|B2|agent administratif da mairie, um pouco burocrático|Pergunte quais documentos são necessários para um cartão de residente.|Bonjour. Vous avez pris un ticket ?
prefecture|Na delegacia de estrangeiros|🗂️|B2|agent de préfecture apressado|Explique sua situação e marque um horário para renovar o visto.|Suivant ! C'est pour quel dossier ?
musee|No museu|🖼️|A2|agent d'accueil do museu d'Orsay|Compre ingressos (você tem menos de 26 anos?), pergunte onde estão os impressionistas.|Bonjour ! Combien de billets ?
visite|Visita guiada|🗺️|B1|guia turística de Montmartre|Faça perguntas sobre a história do bairro e dos pintores.|Bienvenue à Montmartre ! Vous avez des questions avant de commencer ?
camping|No camping|⛺|A2|gerente de camping na Bretanha|Peça um lugar para a barraca por duas noites e pergunte sobre os chuveiros.|Bonjour ! Vous êtes combien ?
plage|Na praia|🏖️|A1|vendedor de sorvete na praia de Nice|Peça um sorvete, escolha os sabores e pague.|Bonjour ! Une boule ou deux boules ?
ski|Na estação de esqui|⛷️|B1|moniteur de ski (instrutor) animado|Alugue esquis, pergunte sobre aulas para iniciantes e o preço do passe.|Salut ! C'est votre première fois sur des skis ?
festival|No festival de música|🎸|A2|jovem francês na fila do show|Puxe conversa, pergunte de onde ele é e qual banda ele quer ver.|Il y a un monde fou, hein ? Tu viens d'où ?
cinema|No cinema|🎬|A2|bilheteira de cinema|Compre dois ingressos, escolha a sessão e pergunte se o filme é legendado.|Bonsoir ! Pour quel film ?
match|Assistindo futebol|⚽|B1|torcedor do PSG num bar|Converse sobre o jogo, dê sua opinião e fale do futebol brasileiro.|Tu as vu ce but ? Incroyable, non ?
marche2|No mercado de pulgas|🧸|B1|brocanteur (vendedor de antiguidades) que adora negociar|Negocie o preço de uma luminária antiga.|Ah, vous avez l'œil ! Cette lampe date des années cinquante.
voisins2|Reclamação de barulho|🔊|B2|vizinho que fez festa até tarde|Reclame educadamente do barulho e proponha uma solução.|Oh, bonjour… Il y a un problème ?
colocation|Entrevista para dividir apê|🏠|B1|futura colega de apartamento|Apresente-se, fale dos seus hábitos e pergunte as regras da casa.|Salut ! Alors, parle-moi un peu de toi.
anniversaire|Organizando um aniversário|🎂|A2|amigo francês|Combine a data, o lugar e o que cada um vai levar.|Alors, on fait quoi pour l'anniversaire de Léa ?
rdv|Primeiro encontro|☕|B1|pessoa simpática que você conheceu num app|Converse sobre hobbies, viagens e combine um segundo encontro.|Salut ! Désolée pour le retard. Tu attends depuis longtemps ?
famille|Conhecendo a família|👨‍👩‍👧|A2|mãe do seu amigo francês, muito curiosa|Fale da sua família, do seu trabalho e do Brasil.|Alors, parlez-moi de votre famille ! Vous avez des frères et sœurs ?
ecole|Matrícula num curso|🏫|B1|secrétaire de uma escola de francês|Pergunte sobre horários, níveis, preço e como fazer o teste de nível.|Bonjour ! Vous voulez des informations sur nos cours ?
prof|Tirando dúvida com o professor|👩‍🏫|B1|professora de francês paciente|Pergunte a diferença entre passé composé e imparfait com exemplos.|Oui ? Tu as une question ?
stage|Primeiro dia de estágio|💼|B1|tutor do estágio numa ONG ambiental|Apresente-se, pergunte suas tarefas e os horários.|Bienvenue dans l'équipe ! Tu as fait bon voyage ?
reunion2|Apresentando um projeto|📈|B2|diretora exigente|Apresente um projeto de educação ambiental e defenda o orçamento.|Bon, vous avez dix minutes. Convainquez-moi.
telephone|Ligação de trabalho|📞|B2|cliente irritado|Acalme o cliente, entenda o problema e proponha uma solução.|Allô ? Ça fait trois fois que j'appelle !
entretien2|Entrevista por vídeo|💻|B2|recrutador de uma empresa em Montreal|Fale da sua experiência e por que quer morar no Quebec.|Bonjour ! Vous m'entendez bien ?
quebec|Conversa com quebequense|🍁|B1|morador de Montreal com sotaque forte|Pergunte sobre o inverno, a comida e expressões típicas do Quebec.|Salut ! T'es pas d'ici, toi ? Tu viens d'où ?
belgique|Em Bruxelas|🇧🇪|A2|belga simpático|Pergunte sobre as batatas fritas, o chocolate e os números “septante” e “nonante”.|Bienvenue à Bruxelles ! Tu as déjà goûté nos frites ?
suisse|Na Suíça|🇨🇭|A2|suíço de Genebra muito pontual|Pergunte sobre o trem, o lago e o preço das coisas.|Bonjour ! Le train part dans trois minutes, vous savez.
afrique|Em Dakar|🌍|B1|senegalesa que fala francês e wolof|Converse sobre a cidade, a comida e as línguas do país.|Bienvenue au Sénégal ! C'est ta première fois en Afrique ?
guyane|Na Guiana Francesa|🌿|B1|pesquisador de Caiena|Fale da Amazônia brasileira e compare com a floresta da Guiana.|Ah, tu viens de l'Amazonie aussi ? Alors on est presque voisins !
recette|Aprendendo uma receita|🍳|A2|avó francesa que ensina crepes|Pergunte os ingredientes, as quantidades e o modo de fazer.|Alors, pour les crêpes, il te faut d'abord de la farine…
restaurant2|Reclamando no restaurante|🍝|B1|garçom ocupado|Reclame que o prato veio errado e frio, educadamente.|Tout se passe bien ici ?
vin|Degustação de vinho|🍷|B2|sommelier refinado|Descreva o que sente no vinho e peça uma recomendação para presente.|Alors, que pensez-vous de ce bordeaux ?
boulanger2|Encomenda de bolo|🎂|A2|confeiteira de uma pâtisserie|Encomende um bolo para 10 pessoas para sábado e escolha o sabor.|Bonjour ! C'est pour une occasion spéciale ?
pharmacie2|Na farmácia à noite|💊|B1|farmacêutico de plantão|Explique que seu filho está com febre e pergunte o que dar.|Bonsoir, c'est pour vous ou pour quelqu'un d'autre ?
urgences|No pronto-socorro|🚑|B2|enfermeira da triagem|Explique o acidente, onde dói e se tem alergias.|Bonjour, qu'est-ce qui s'est passé exactement ?
perdu2|Perguntando o caminho|🧭|A1|passante parisiense apressado|Pergunte como chegar ao Louvre e se é longe.|Oui ? Je peux vous aider ?
aeroport|Bagagem extraviada|🧳|B1|atendente do balcão de bagagens|Descreva sua mala e dê o endereço do hotel para a entrega.|Bonjour. Votre valise n'est pas arrivée, c'est ça ?
douane|Na alfândega|🛂|A2|agente da alfândega sério|Responda: motivo da viagem, quanto tempo fica e onde vai ficar.|Passeport, s'il vous plaît. Quel est le motif de votre séjour ?
train2|No trem|🚄|A2|passageira ao lado no TGV|Puxe conversa, peça para trocar de lugar e pergunte sobre a cidade dela.|Pardon, je crois que vous êtes à ma place…
autostop|Pegando carona|🚙|B1|motorista do BlaBlaCar|Combine o ponto de encontro, as malas e divida a gasolina.|Salut ! Tu es Raimundo ? Tu as beaucoup de bagages ?
hotel2|Problema no quarto|🛏️|B1|recepcionista atencioso|Reclame que o ar-condicionado não funciona e peça outro quarto.|Bonsoir, il y a un souci avec votre chambre ?
airbnb|Chegada no Airbnb|🔑|A2|anfitrião que te recebe|Pergunte sobre o wi-fi, o lixo, a lavanderia e um bom restaurante perto.|Bienvenue ! Je vous fais visiter l'appartement ?
salle|Na academia|🏋️|A2|recepcionista da academia|Pergunte os preços, os horários e se há aula de yoga.|Bonjour ! Vous voulez vous inscrire ?
yoga|Aula de yoga|🧘|B1|professora de yoga zen|Explique que é iniciante e tem dor nas costas, e pergunte adaptações.|Bienvenue ! Vous avez déjà pratiqué le yoga ?
velo2|Oficina de bicicleta|🔧|B1|mecânico de bicicletas|Explique o problema (pneu furado, freio fraco) e pergunte prazo e preço.|Salut ! Qu'est-ce qui ne va pas avec le vélo ?
telephone2|Comprando um chip|📱|A2|vendedor de loja de celular|Compre um chip pré-pago com internet e pergunte como ativar.|Bonjour ! C'est pour un forfait ou une carte prépayée ?
informatique|Assistência técnica|🖥️|B1|técnico de informática|Explique que o computador não liga e pergunte quanto custa o conserto.|Bonjour, c'est quoi le problème avec l'ordinateur ?
benevole|Voluntariado ambiental|🌱|B1|coordenadora de uma associação ecológica|Ofereça-se como voluntário e conte sua experiência com meio ambiente.|Bonjour ! Vous voulez nous aider ? C'est super !
riviere|Projeto de rio limpo|💧|B2|engenheiro da agência da água|Discuta como monitorar a qualidade da água e trocar experiências.|Alors, au Brésil, comment vous mesurez la qualité de l'eau ?
drone|Falando de drones|🛸|B2|piloto de drone francês|Compare as regras de voo na França e no Brasil e fale de mapeamento.|Tu utilises quel modèle de drone pour tes cartes ?
journaliste|Entrevista para jornal|🎙️|B2|jornalista de uma rádio local|Fale sobre a Amazônia e o trabalho com comunidades ribeirinhas.|Merci d'être venu ! Pour commencer, présentez-vous.
podcast|Gravando um podcast|🎧|B2|apresentadora de podcast sobre viagens|Conte uma história engraçada de viagem.|Et on est en direct ! Alors, raconte-nous ta pire aventure en voyage.
debat2|Debate: redes sociais|📱|B2|amigo que acha as redes sociais perigosas|Defenda que as redes sociais também têm lados bons.|Franchement, les réseaux sociaux, ça rend les gens malheureux. Tu n'es pas d'accord ?
debat3|Debate: carro elétrico|🔋|C1|colega cético quanto aos carros elétricos|Argumente a favor ou contra com dados e nuances.|Le tout-électrique, c'est une illusion écologique, si tu veux mon avis.
debat4|Debate: turismo|🧳|C1|moradora de Veneza cansada de turistas|Discuta como conciliar turismo e qualidade de vida.|Les touristes, on n'en peut plus ! Vous trouvez ça normal ?
philo|Café filosófico|🤔|C1|filósofo de bistrô|Discuta se a felicidade depende do trabalho.|Dites-moi : peut-on être heureux sans aimer son travail ?
politique|Conversa sobre eleições|🗳️|C1|amigo francês que gosta de política|Compare os sistemas eleitorais da França e do Brasil, sem tomar partido.|Chez vous, au Brésil, le vote est obligatoire, non ?
litterature|Clube do livro|📖|C1|leitora apaixonada por Camus|Fale de um livro que marcou você e por quê.|Alors, quel livre vous a le plus marqué dans votre vie ?
cinema2|Crítica de filme|🎞️|B2|cinéfilo exigente|Dê sua opinião sobre um filme francês e defenda sua nota.|Tu as vu « Intouchables » ? Moi, je l'ai trouvé surestimé.
histoire|Aula de história|🏰|B2|guia do castelo de Versalhes|Faça perguntas sobre Luís XIV e a vida na corte.|Bienvenue à Versailles ! Vous savez qui a fait construire ce château ?
mariage|Num casamento|💒|B1|primo da noiva muito animado|Puxe conversa, elogie a festa e conte como conheceu os noivos.|Quelle belle fête, hein ! Vous êtes du côté de la mariée ou du marié ?
condoleances|Dando os pêsames|🕊️|C1|colega de trabalho que perdeu o pai|Ofereça condolências com delicadeza e ofereça ajuda.|Merci d'être passé… Ça me touche beaucoup.
excuses|Pedindo desculpas|🙏|B1|amigo chateado porque você faltou ao aniversário dele|Peça desculpas, explique e proponha compensar.|Ah, te voilà… Tu sais que je t'ai attendu toute la soirée ?
negociation|Negociando salário|💶|C1|diretora de RH|Negocie um salário maior com argumentos sobre sua experiência.|Nous vous proposons trente-cinq mille euros par an. Qu'en pensez-vous ?
demission|Pedindo demissão|📄|C1|chefe surpreso|Comunique sua saída com profissionalismo e agradeça.|Vous vouliez me voir ? Il y a un problème ?
assurance|Seguradora|📑|B2|atendente de seguradora|Declare um sinistro (seu celular quebrou na viagem) e pergunte o reembolso.|Assurances Voyage, bonjour. Comment puis-je vous aider ?
proprio|Devolvendo o apartamento|🏢|B2|proprietário exigente na vistoria|Discuta os pequenos danos e negocie a caução.|Bon, on fait l'état des lieux. Je vois une tache ici…
enfants|Brincando com crianças|🧒|A1|criança francesa de 7 anos curiosa|Responda às perguntas dela sobre o Brasil, os animais e a sua idade.|Tu viens d'où ? Il y a des singes chez toi ?
chien|Passeando com o cachorro|🐕|A1|vizinha com um cachorro|Pergunte o nome e a idade do cachorro e fale do seu animal.|Oh, il vous aime bien ! Vous avez un chien, vous aussi ?
jardin|Na horta comunitária|🥕|A2|jardineiro aposentado|Pergunte o que plantar nesta estação e como cuidar dos tomates.|Bonjour ! Vous voulez un coin de jardin ?
meteo|Falando do tempo|⛅|A1|vizinho que adora reclamar do tempo|Converse sobre o tempo hoje e compare com o clima do Pará.|Quel temps de chien aujourd'hui ! Chez vous, il fait toujours chaud, non ?
weekend|Planos de fim de semana|📅|A2|colega de trabalho|Conte o que vai fazer no fim de semana e convide para algo.|Alors, tu fais quoi ce week-end ?
souvenirs|Lembranças de infância|🧸|B1|amiga nostálgica|Conte como era sua infância e o que você fazia nas férias.|Quand tu étais petit, tu faisais quoi pendant les vacances ?
futur|Planos para o futuro|🔮|B1|amigo curioso|Fale do que você vai fazer daqui a 5 anos, usando o futuro.|Et dans cinq ans, tu te vois où ?
hypothese|E se…?|💭|B2|amiga que adora perguntas hipotéticas|Responda: o que você faria se ganhasse na loteria / pudesse morar em qualquer país.|Question du jour : si tu pouvais vivre n'importe où, tu choisirais quoi ?
`;

export const SCENARIOS_2 = RAW.trim().split('\n').map((l) => {
  const [id, title, emoji, level, role, goal, opener] = l.split('|');
  return { id, title, emoji, level, role, goal, opener };
});
