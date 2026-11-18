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
];

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
