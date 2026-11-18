// Vocabulary trails by subject. 'palavra com artigo|tradução|emoji'
// The article shows the gender: le/un = masculino (azul), la/une = feminino (vermelho), l' = olhe a dica.
const W = (arr) => arr.map((s) => {
  const [raw, pt, emoji] = s.split('|');
  const g = (/\((m|f)\)/.exec(raw) || [])[1] || null;
  const fr = raw.replace(/\s*\((m|f)\)/, '');
  return { fr, pt, emoji, g: g || genderOf(fr), isWord: true, key: 'w:' + fr };
});

export const VOCAB_THEMES = [
  { id: 'comida', title: 'Comida', emoji: '🍽️', color: '#D9822B', words: W([
    'le pain|o pão|🥖', 'le fromage|o queijo|🧀', 'la pomme|a maçã|🍎', 'la banane|a banana|🍌', 'le poulet|o frango|🍗',
    'le poisson|o peixe|🐟', 'la viande|a carne|🥩', 'le riz|o arroz|🍚', 'les pâtes|o macarrão|🍝', 'l\'œuf (m)|o ovo|🥚',
    'la soupe|a sopa|🍲', 'le gâteau|o bolo|🍰', 'la fraise|o morango|🍓', 'la tomate|o tomate|🍅', 'la pomme de terre|a batata|🥔',
    'le beurre|a manteiga|🧈', 'le sel|o sal|🧂', 'le sucre|o açúcar|🍬', 'le jus|o suco|🧃', 'la glace|o sorvete|🍦',
  ]) },
  { id: 'casa', title: 'Casa', emoji: '🏠', color: '#2A9D8F', words: W([
    'la maison|a casa|🏠', 'la cuisine|a cozinha|🍳', 'la chambre|o quarto|🛏️', 'la salle de bain|o banheiro|🛁', 'le salon|a sala|🛋️',
    'la porte|a porta|🚪', 'la fenêtre|a janela|🪟', 'le lit|a cama|🛏️', 'la table|a mesa|🪑', 'la chaise|a cadeira|🪑',
    'le canapé|o sofá|🛋️', 'la clé|a chave|🔑', 'le miroir|o espelho|🪞', 'la lampe|a luminária|💡', 'le jardin|o jardim|🌷',
    'le toit|o telhado|🏚️', 'l\'escalier (m)|a escada|🪜', 'le frigo|a geladeira|🧊', 'la douche|o chuveiro|🚿', 'le balcon|a varanda|🏙️',
  ]) },
  { id: 'corpo', title: 'Corpo e saúde', emoji: '🧍', color: '#E63946', words: W([
    'la tête|a cabeça|🙂', 'les yeux|os olhos|👀', 'le nez|o nariz|👃', 'la bouche|a boca|👄', 'l\'oreille (f)|a orelha|👂',
    'la main|a mão|✋', 'le bras|o braço|💪', 'la jambe|a perna|🦵', 'le pied|o pé|🦶', 'le dos|as costas|🧍',
    'le ventre|a barriga|🤰', 'le cœur|o coração|❤️', 'la dent|o dente|🦷', 'les cheveux|o cabelo|💇', 'le doigt|o dedo|☝️',
    'le médecin|o médico|🩺', 'la fièvre|a febre|🤒', 'le rhume|o resfriado|🤧', 'le médicament|o remédio|💊', 'l\'hôpital (m)|o hospital|🏥',
  ]) },
  { id: 'roupa', title: 'Roupas', emoji: '👕', color: '#7C5CFC', words: W([
    'la chemise|a camisa|👔', 'le t-shirt|a camiseta|👕', 'le pantalon|a calça|👖', 'la robe|o vestido|👗', 'la jupe|a saia|👗',
    'le manteau|o casaco|🧥', 'la veste|a jaqueta|🧥', 'les chaussures|os sapatos|👞', 'les chaussettes|as meias|🧦', 'le chapeau|o chapéu|👒',
    'la casquette|o boné|🧢', 'l\'écharpe (f)|o cachecol|🧣', 'les lunettes|os óculos|👓', 'le sac|a bolsa|👜', 'la ceinture|o cinto|🪢',
    'le maillot de bain|o maiô/sunga|🩱', 'les gants|as luvas|🧤', 'la cravate|a gravata|👔', 'le pyjama|o pijama|🛌', 'les baskets|os tênis|👟',
  ]) },
  { id: 'trabalho', title: 'Profissões', emoji: '👷', color: '#1E3A8A', words: W([
    'le professeur|o professor|🧑‍🏫', 'le médecin|o médico|🧑‍⚕️', 'l\'infirmière (f)|a enfermeira|👩‍⚕️', 'l\'avocat (m)|o advogado|⚖️', 'l\'ingénieur (m)|o engenheiro|👷',
    'le cuisinier|o cozinheiro|🧑‍🍳', 'le serveur|o garçom|🍽️', 'le vendeur|o vendedor|🛍️', 'le policier|o policial|👮', 'le pompier|o bombeiro|🧑‍🚒',
    'l\'agriculteur (m)|o agricultor|🧑‍🌾', 'le pêcheur|o pescador|🎣', 'le chauffeur|o motorista|🚕', 'le journaliste|o jornalista|📰', 'le chercheur|o pesquisador|🔬',
    'le bureau|o escritório|🏢', 'la réunion|a reunião|👥', 'le salaire|o salário|💶', 'le patron|o chefe|🧑‍💼', 'le collègue|o colega|🤝',
  ]) },
  { id: 'natureza', title: 'Natureza e meio ambiente', emoji: '🌳', color: '#2A9D8F', words: W([
    'la forêt|a floresta|🌳', 'l\'arbre (m)|a árvore|🌲', 'la rivière|o rio|🏞️', 'le fleuve|o rio (grande)|🌊', 'la mer|o mar|🌊',
    'la plage|a praia|🏖️', 'la montagne|a montanha|⛰️', 'le ciel|o céu|☁️', 'la pluie|a chuva|🌧️', 'le vent|o vento|🌬️',
    'l\'oiseau (m)|o pássaro|🐦', 'le poisson|o peixe|🐠', 'la fleur|a flor|🌸', 'la feuille|a folha|🍃', 'la terre|a terra|🌍',
    'l\'eau (f)|a água|💧', 'la pollution|a poluição|🏭', 'les déchets|o lixo|🗑️', 'le recyclage|a reciclagem|♻️', 'l\'énergie solaire (f)|a energia solar|☀️',
  ]) },
  { id: 'cidade', title: 'Cidade e transporte', emoji: '🏙️', color: '#0E7490', words: W([
    'la rue|a rua|🛣️', 'la gare|a estação|🚉', 'l\'aéroport (m)|o aeroporto|✈️', 'le bus|o ônibus|🚌', 'le métro|o metrô|🚇',
    'le vélo|a bicicleta|🚲', 'la voiture|o carro|🚗', 'le bateau|o barco|⛵', 'la banque|o banco|🏦', 'la pharmacie|a farmácia|💊',
    'le supermarché|o supermercado|🛒', 'l\'église (f)|a igreja|⛪', 'le musée|o museu|🏛️', 'le parc|o parque|🌳', 'la boulangerie|a padaria|🥐',
    'le pont|a ponte|🌉', 'le feu rouge|o semáforo|🚦', 'le billet|a passagem|🎫', 'le plan|o mapa|🗺️', 'l\'hôtel (m)|o hotel|🏨',
  ]) },
  { id: 'emocoes', title: 'Sentimentos e adjetivos', emoji: '😊', color: '#C2417B', words: W([
    'heureux / heureuse|feliz|😊', 'triste|triste|😢', 'fatigué(e)|cansado|😴', 'content(e)|contente|😄', 'en colère|com raiva|😠',
    'inquiet / inquiète|preocupado|😟', 'surpris(e)|surpreso|😮', 'amoureux / amoureuse|apaixonado|😍', 'calme|calmo|😌', 'nerveux / nerveuse|nervoso|😬',
    'grand(e)|grande, alto|📏', 'petit(e)|pequeno|🐁', 'beau / belle|bonito|🌹', 'jeune|jovem|🧒', 'vieux / vieille|velho|👴',
    'chaud(e)|quente|🔥', 'froid(e)|frio|🧊', 'facile|fácil|👌', 'difficile|difícil|🧗', 'rapide|rápido|⚡',
  ]) },
  { id: 'animais', title: 'Animais', emoji: '🐾', color: '#B87333', words: W([
    'le chien|o cachorro|🐕', 'le chat|o gato|🐈', 'l\'oiseau (m)|o pássaro|🐦', 'le cheval|o cavalo|🐎', 'la vache|a vaca|🐄',
    'le cochon|o porco|🐖', 'le mouton|a ovelha|🐑', 'la poule|a galinha|🐔', 'le canard|o pato|🦆', 'le lapin|o coelho|🐇',
    'la souris|o rato|🐁', 'le poisson|o peixe|🐟', 'le serpent|a cobra|🐍', 'le singe|o macaco|🐒', 'le lion|o leão|🦁',
    'l\'éléphant (m)|o elefante|🐘', 'la tortue|a tartaruga|🐢', 'le papillon|a borboleta|🦋', 'l\'abeille (f)|a abelha|🐝', 'la fourmi|a formiga|🐜',
  ]) },
  { id: 'familia', title: 'Família', emoji: '👨‍👩‍👧', color: '#E63946', words: W([
    'la mère|a mãe|👩', 'le père|o pai|👨', 'les parents|os pais|👪', 'le frère|o irmão|👦', 'la sœur|a irmã|👧',
    'le fils|o filho|👦', 'la fille|a filha|👧', 'le grand-père|o avô|👴', 'la grand-mère|a avó|👵', 'l\'oncle (m)|o tio|🧔',
    'la tante|a tia|👩', 'le cousin|o primo|🧑', 'la cousine|a prima|👩', 'le neveu|o sobrinho|👦', 'la nièce|a sobrinha|👧',
    'le mari|o marido|🤵', 'la femme|a esposa|👰', 'le bébé|o bebê|👶', 'le petit-fils|o neto|🧒', 'la belle-mère|a sogra|👵',
  ]) },
  { id: 'escola', title: 'Escola e estudos', emoji: '🎒', color: '#1E3A8A', words: W([
    'l\'école (f)|a escola|🏫', 'le professeur|o professor|👩‍🏫', 'l\'élève (m)|o aluno|🧑‍🎓', 'le livre|o livro|📕', 'le cahier|o caderno|📓',
    'le stylo|a caneta|🖊️', 'le crayon|o lápis|✏️', 'la gomme|a borracha|🧽', 'le sac|a mochila|🎒', 'la classe|a sala de aula|🏫',
    'le tableau|o quadro|🧑‍🏫', 'la leçon|a lição|📖', 'l\'examen (m)|a prova|📝', 'la note|a nota|💯', 'les devoirs|o dever de casa|📚',
    'la règle|a régua|📏', 'les ciseaux|a tesoura|✂️', 'la bibliothèque|a biblioteca|🏛️', 'l\'université (f)|a universidade|🎓', 'le diplôme|o diploma|📜',
  ]) },
  { id: 'esportes', title: 'Esportes e lazer', emoji: '⚽', color: '#2E9E5B', words: W([
    'le football|o futebol|⚽', 'le basket|o basquete|🏀', 'le tennis|o tênis|🎾', 'la natation|a natação|🏊', 'le vélo|a bicicleta|🚲',
    'la course|a corrida|🏃', 'le ballon|a bola|⚽', 'l\'équipe (f)|o time|👥', 'le match|a partida|🏟️', 'le but|o gol|🥅',
    'le joueur|o jogador|🧍', 'l\'arbitre (m)|o juiz|🧑‍⚖️', 'la piscine|a piscina|🏊', 'le stade|o estádio|🏟️', 'la randonnée|a trilha, caminhada|🥾',
    'la danse|a dança|💃', 'la musique|a música|🎵', 'le jeu|o jogo|🎲', 'la pêche|a pesca|🎣', 'le cinéma|o cinema|🎬',
  ]) },
  { id: 'tempo', title: 'Tempo e clima', emoji: '⛅', color: '#0EA5E9', words: W([
    'le soleil|o sol|☀️', 'la pluie|a chuva|🌧️', 'la neige|a neve|❄️', 'le vent|o vento|🌬️', 'le nuage|a nuvem|☁️',
    'l\'orage (m)|a tempestade|⛈️', 'l\'arc-en-ciel (m)|o arco-íris|🌈', 'la chaleur|o calor|🥵', 'le froid|o frio|🥶', 'le brouillard|a neblina|🌫️',
    'le printemps|a primavera|🌸', 'l\'été (m)|o verão|🏖️', 'l\'automne (m)|o outono|🍂', 'l\'hiver (m)|o inverno|☃️', 'la saison|a estação|🗓️',
    'la température|a temperatura|🌡️', 'le ciel|o céu|🌌', 'l\'éclair (m)|o relâmpago|⚡', 'la sécheresse|a seca|🏜️', 'le parapluie|o guarda-chuva|☂️',
  ]) },
  { id: 'tecnologia', title: 'Tecnologia', emoji: '💻', color: '#334155', words: W([
    'l\'ordinateur (m)|o computador|💻', 'le téléphone|o telefone|📱', 'l\'écran (m)|a tela|🖥️', 'le clavier|o teclado|⌨️', 'la souris|o mouse|🖱️',
    'le logiciel|o programa|💾', 'l\'application (f)|o aplicativo|📲', 'le site|o site|🌐', 'le courriel|o e-mail|📧', 'le mot de passe|a senha|🔑',
    'le réseau|a rede|🕸️', 'la batterie|a bateria|🔋', 'le chargeur|o carregador|🔌', 'l\'imprimante (f)|a impressora|🖨️', 'le fichier|o arquivo|📄',
    'télécharger|baixar|⬇️', 'envoyer|enviar|📤', 'la vidéo|o vídeo|📹', 'l\'appareil photo (m)|a câmera|📷', 'le drone|o drone|🛸',
  ]) },
  { id: 'ambiente', title: 'Meio ambiente', emoji: '♻️', color: '#16A34A', words: W([
    'l\'environnement (m)|o meio ambiente|🌍', 'la pollution|a poluição|🏭', 'le recyclage|a reciclagem|♻️', 'les déchets|o lixo|🗑️', 'l\'énergie (f)|a energia|⚡',
    'le réchauffement|o aquecimento|🌡️', 'la forêt|a floresta|🌳', 'la déforestation|o desmatamento|🪓', 'la biodiversité|a biodiversidade|🦜', 'l\'espèce (f)|a espécie|🐆',
    'l\'eau potable (f)|a água potável|🚰', 'le fleuve|o rio|🏞️', 'la qualité de l\'eau|a qualidade da água|💧', 'l\'échantillon (m)|a amostra|🧪', 'la carte|o mapa|🗺️',
    'le panneau solaire|o painel solar|🔆', 'l\'éolienne (f)|a turbina eólica|🌬️', 'protéger|proteger|🛡️', 'la communauté|a comunidade|👥', 'durable|sustentável|🌱',
  ]) },
  { id: 'viagem', title: 'Viagem', emoji: '🧳', color: '#0E7490', words: W([
    'le voyage|a viagem|✈️', 'la valise|a mala|🧳', 'le passeport|o passaporte|🛂', 'le billet|a passagem|🎫', 'l\'avion (m)|o avião|✈️',
    'l\'aéroport (m)|o aeroporto|🛫', 'la gare|a estação de trem|🚉', 'le train|o trem|🚆', 'l\'hôtel (m)|o hotel|🏨', 'la réservation|a reserva|📅',
    'la plage|a praia|🏖️', 'la montagne|a montanha|🏔️', 'le musée|o museu|🖼️', 'le plan|o mapa (da cidade)|🗺️', 'le guide|o guia|🧑‍🏫',
    'le souvenir|a lembrancinha|🎁', 'la douane|a alfândega|🛃', 'le vol|o voo|🛬', 'le départ|a partida|🛫', 'l\'arrivée (f)|a chegada|🛬',
  ]) },
  { id: 'tempo2', title: 'Dias, meses e horas', emoji: '📅', color: '#7C5CFC', words: W([
    'lundi|segunda-feira|1️⃣', 'mardi|terça-feira|2️⃣', 'mercredi|quarta-feira|3️⃣', 'jeudi|quinta-feira|4️⃣', 'vendredi|sexta-feira|5️⃣',
    'samedi|sábado|6️⃣', 'dimanche|domingo|7️⃣', 'janvier|janeiro|❄️', 'février|fevereiro|💘', 'mars|março|🌱',
    'avril|abril|🐟', 'mai|maio|🌷', 'juin|junho|☀️', 'juillet|julho|🎆', 'août|agosto|🏖️',
    'septembre|setembro|🍇', 'octobre|outubro|🎃', 'novembre|novembro|🍂', 'décembre|dezembro|🎄', 'aujourd\'hui|hoje|📍',
  ]) },
  { id: 'cozinha', title: 'Na cozinha', emoji: '🍳', color: '#D9822B', words: W([
    'la poêle|a frigideira|🍳', 'la casserole|a panela|🍲', 'le four|o forno|🔥', 'le couteau|a faca|🔪', 'la fourchette|o garfo|🍴',
    'la cuillère|a colher|🥄', 'l\'assiette (f)|o prato|🍽️', 'le verre|o copo|🥛', 'la tasse|a xícara|☕', 'la bouteille|a garrafa|🍾',
    'couper|cortar|🔪', 'cuire|cozinhar|♨️', 'mélanger|misturar|🥣', 'la recette|a receita|📖', 'le repas|a refeição|🍽️',
    'le petit-déjeuner|o café da manhã|🥐', 'le déjeuner|o almoço|🥗', 'le dîner|o jantar|🍝', 'la serviette|o guardanapo|🧻', 'le plat|o prato (comida)|🥘',
  ]) },
  { id: 'verbos1', title: 'Verbos do dia a dia', emoji: '🔁', color: '#C2417B', words: W([
    'manger|comer|🍽️', 'boire|beber|🥤', 'dormir|dormir|😴', 'parler|falar|🗣️', 'écouter|ouvir|👂',
    'regarder|olhar, assistir|👀', 'lire|ler|📖', 'écrire|escrever|✍️', 'marcher|andar|🚶', 'courir|correr|🏃',
    'travailler|trabalhar|💼', 'acheter|comprar|🛒', 'payer|pagar|💳', 'ouvrir|abrir|🔓', 'fermer|fechar|🔒',
    'chercher|procurar|🔍', 'trouver|encontrar|🎯', 'aider|ajudar|🤝', 'attendre|esperar|⏳', 'oublier|esquecer|🤦',
  ]) },
  { id: 'cores', title: 'Cores e formas', emoji: '🎨', color: '#E0A526', words: W([
    'rouge|vermelho|🔴', 'bleu|azul|🔵', 'vert|verde|🟢', 'jaune|amarelo|🟡', 'noir|preto|⚫',
    'blanc|branco|⚪', 'gris|cinza|🩶', 'rose|rosa|🌸', 'violet|roxo|🟣', 'orange|laranja|🟠',
    'marron|marrom|🟤', 'clair|claro|🔆', 'foncé|escuro|🌑', 'le cercle|o círculo|⭕', 'le carré|o quadrado|⬜',
    'le triangle|o triângulo|🔺', 'l\'étoile (f)|a estrela|⭐', 'le cœur|o coração|❤️', 'la ligne|a linha|➖', 'la couleur|a cor|🎨',
  ]) },
];

import { VOCAB_THEMES_2_RAW } from './vocab2';
import { VOCAB_THEMES_3_RAW } from './vocab3';
VOCAB_THEMES.push(...[...VOCAB_THEMES_2_RAW, ...VOCAB_THEMES_3_RAW].map((t) => ({ ...t, words: W(t.words) })));

// Gender from the article (for colours): 'm' | 'f' | null
export function genderOf(fr = '') {
  if (!fr) return null;
  const s = fr.trim().toLowerCase();
  if (/\((m)\)/.test(s) || /^(le|un) /.test(s)) return 'm';
  if (/\((f)\)/.test(s) || /^(la|une) /.test(s)) return 'f';
  return null;
}

// Gender colours: masculine blue, feminine red (like many French textbooks).
export const GENDER_COLORS = { m: '#2563EB', f: '#DC2626' };
export const genderColor = (fr, fallback) => GENDER_COLORS[genderOf(fr)] || fallback;
