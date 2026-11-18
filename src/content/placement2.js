// Teste de nível no estilo TCF: tudo em francês, por blocos de nível (A1 → C1).
// skill: 'structure' (estruturas da língua), 'reading' (compreensão escrita), 'listening' (compreensão oral).
// Formato: { level, skill, text?, q, a, o: [3 erradas] }. Em 'listening', text = áudio (não aparece na tela).
const I = (level, skill, q, a, o, text) => ({ level, skill, q, a, o, text });

export const PLACEMENT_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1'];

export const PLACEMENT_BANK = [
  // ───────── A1 ─────────
  I('A1', 'structure', 'Je ___ brésilien.', 'suis', ['es', 'est', 'ai']),
  I('A1', 'structure', 'Nous ___ deux enfants.', 'avons', ['sommes', 'ont', 'avez']),
  I('A1', 'structure', 'Elle habite ___ Paris.', 'à', ['en', 'au', 'dans le']),
  I('A1', 'structure', 'Tu veux ___ café ?', 'un', ['une', 'la', 'des']),
  I('A1', 'structure', 'Il y a ___ pommes sur la table.', 'des', ['un', 'du', 'de la']),
  I('A1', 'reading', 'Que doit faire Léa ?', 'Aller à la gare', ['Acheter un billet de train', 'Prendre le train', 'Téléphoner à Paul'], 'Salut Léa ! Je suis à la gare. Mon train arrive à 18 h. Tu peux venir me chercher ? Merci ! Paul'),
  I('A1', 'reading', 'Quand est-ce que la boulangerie est fermée ?', 'Le lundi', ['Le dimanche', 'Le mardi', 'Après 18 h'], 'BOULANGERIE MARTIN — Ouvert du mardi au dimanche, de 7 h à 19 h. Fermé le lundi.'),
  I('A1', 'reading', 'Avec qui Ana habite ?', 'Avec son chat', ['Avec ses parents', 'Avec son frère', 'Avec une amie'], "Je m'appelle Ana. J'ai 25 ans. J'habite à Lyon avec mon chat. Je travaille dans un hôpital."),
  I('A1', 'reading', 'Pour 14 €, on peut avoir…', 'un plat et un dessert', ['une entrée, un plat et un dessert', 'un plat et une boisson', 'seulement une boisson'], 'Menu du jour : 14 €. Entrée + plat OU plat + dessert. Boisson non comprise.'),
  I('A1', 'listening', "Qu'est-ce que la personne achète ?", 'Deux croissants et une baguette', ['Un croissant et deux baguettes', 'Deux baguettes', 'Deux croissants et un café'], "Bonjour, je voudrais deux croissants et une baguette, s'il vous plaît."),
  I('A1', 'listening', 'Quand est le rendez-vous ?', 'Jeudi à 10 h 15', ['Mardi à 10 h 15', 'Jeudi à 10 h 45', 'Jeudi à 11 h 15'], 'Le rendez-vous chez le médecin est jeudi à dix heures et quart.'),
  I('A1', 'listening', 'Où est la poste ?', 'À gauche, après la pharmacie', ['À droite, après la pharmacie', 'À gauche, avant la pharmacie', 'En face de la pharmacie'], "Excusez-moi… La poste ? C'est à gauche, juste après la pharmacie."),

  // ───────── A2 ─────────
  I('A2', 'structure', 'Hier, nous ___ au cinéma.', 'sommes allés', ['avons allé', 'allons', 'irons']),
  I('A2', 'structure', "Quand j'étais petit, je ___ au foot tous les jours.", 'jouais', ['ai joué', 'jouerai', 'jouerais']),
  I('A2', 'structure', 'Tu connais Marie ? — Oui, je ___ connais bien.', 'la', ['lui', 'le', 'en']),
  I('A2', 'structure', 'Il y a ___ monde dans ce restaurant !', 'beaucoup de', ['beaucoup du', 'très', 'plusieurs']),
  I('A2', 'structure', "C'est la ville ___ je suis né.", 'où', ['que', 'qui', 'dont']),
  I('A2', 'reading', 'Pourquoi la famille Morel écrit ce message ?', 'Pour prévenir du bruit et inviter les voisins', ['Pour se plaindre du bruit des voisins', 'Pour annoncer leur déménagement', "Pour demander de l'aide pour la fête"], "Chers voisins, nous organisons une fête samedi soir pour l'anniversaire de notre fils. Il y aura peut-être un peu de bruit jusqu'à minuit. Nous nous excusons d'avance. Vous êtes les bienvenus ! — Famille Morel"),
  I('A2', 'reading', 'Quelle information est vraie ?', "Il n'est pas nécessaire d'avoir de l'expérience", ["Il faut obligatoirement parler anglais", "Le poste est pour toute l'année", 'On travaille seulement en semaine'], "Offre d'emploi : restaurant cherche serveur/serveuse pour l'été. Expérience non obligatoire. Anglais souhaité. Travail le week-end."),
  I('A2', 'reading', 'Que se passe-t-il avec les billets du 14 juillet ?', "On rembourse l'argent", ['Ils sont valables le 15 juillet', 'On peut entrer gratuitement', 'Ils coûtent moins cher'], 'Le musée sera exceptionnellement fermé le 14 juillet. Les billets achetés pour cette date seront remboursés.'),
  I('A2', 'reading', 'Pourquoi Claire annule le dîner ?', 'Sa fille est malade', ['Elle est malade', 'Elle travaille tard', 'Elle a un autre dîner'], "Salut ! Désolée, je ne peux pas venir dîner ce soir : ma fille est malade. On peut se voir la semaine prochaine ? Bises, Claire"),
  I('A2', 'listening', 'Quel est le problème ?', 'Le train a vingt minutes de retard', ['Le train est annulé', 'Le train part de la voie deux', 'Le train va à Montpellier'], 'Attention : le train à destination de Marseille partira avec vingt minutes de retard, voie numéro six.'),
  I('A2', 'listening', 'Que doivent faire les autres ?', 'Commencer à manger sans Julien', ['Attendre Julien pour manger', 'Aller chercher Julien', 'Annuler le dîner'], "Allô, c'est Julien. Je serai en retard ce soir, il y a des embouteillages. Commencez à manger sans moi !"),
  I('A2', 'listening', 'Comment aller au musée ?', 'Bus 12, puis cinq minutes à pied', ['Métro, puis bus 12', 'Bus 5, puis douze minutes à pied', 'À pied depuis la gare'], "Pour aller au musée, prenez le bus 12 jusqu'à la place de la République, puis marchez cinq minutes."),

  // ───────── B1 ─────────
  I('B1', 'structure', "Si j'avais plus de temps, j'___ le piano.", 'apprendrais', ['apprendrai', 'apprenais', 'aurais appris']),
  I('B1', 'structure', 'Il faut que tu ___ tes devoirs avant de sortir.', 'fasses', ['fais', 'feras', 'ferais']),
  I('B1', 'structure', 'Je cherche le livre ___ tu m\'as parlé.', 'dont', ['que', 'où', 'lequel']),
  I('B1', 'structure', 'Quand nous sommes arrivés, le film ___ déjà commencé.', 'avait', ['a', 'était', 'aurait']),
  I('B1', 'structure', "___ il pleuvait, nous sommes sortis.", "Même s'", ["Parce qu'", "Puisqu'", "Pour qu'"]),
  I('B1', 'reading', 'Quelle critique est mentionnée ?', "Il n'y a pas assez de pistes cyclables sûres", ['Les vélos sont trop chers', 'Il y a trop de vélos', 'La mairie a supprimé des vélos'], "Depuis janvier, la ville a installé 200 vélos en libre-service. Le succès est tel que la mairie envisage de doubler leur nombre l'an prochain. Cependant, certains habitants regrettent le manque de pistes cyclables sécurisées."),
  I('B1', 'reading', "Que demande l'auteur ?", 'Si le matériel est fourni', ['Le prix du stage', 'Un changement de dates', "L'annulation de son inscription"], "Chère Madame, suite à notre entretien téléphonique, je vous confirme mon inscription au stage de cuisine du 3 au 7 mai. Pourriez-vous m'indiquer si le matériel est fourni ou si je dois apporter mes propres couteaux ?"),
  I('B1', 'reading', 'Que conseillent les chercheurs ?', "Éviter les écrans avant d'aller se coucher", ['Travailler moins de 3 h par jour', "Dormir une heure l'après-midi", "N'utiliser l'écran qu'au travail"], "Selon une étude récente, les Français passent en moyenne 3 h par jour devant un écran en dehors du travail. Les chercheurs recommandent de ne pas utiliser d'écran une heure avant de dormir pour améliorer la qualité du sommeil."),
  I('B1', 'reading', "Quel inconvénient l'auteur mentionne-t-il ?", 'Il faut prendre la voiture pour tout', ['La vie est plus chère', 'Il y a trop de pollution', 'Il se sent très seul'], "J'ai longtemps hésité avant de quitter Paris pour la campagne. Aujourd'hui, je ne regrette rien : la vie est moins chère et je respire enfin. Seul bémol : il faut prendre la voiture pour tout."),
  I('B1', 'listening', 'Que se passera-t-il demain ?', 'Des bus remplaceront la ligne 4', ['Le métro sera gratuit', 'Toutes les lignes seront fermées', 'Les bus seront en grève'], 'Mesdames et messieurs, en raison d\'un mouvement social, la ligne 4 du métro ne circulera pas demain. Des bus de remplacement seront mis en place entre les stations principales.'),
  I('B1', 'listening', 'Que veut savoir la personne ?', 'Si les charges sont comprises dans le loyer', ["Où se trouve l'appartement", 'Combien de chambres il y a', 'Si les animaux sont acceptés'], "Bonjour, je vous appelle au sujet de l'annonce pour l'appartement. Il est toujours disponible ? J'aimerais savoir si les charges sont comprises dans le loyer."),
  I('B1', 'listening', "Quelle est l'opinion de la personne sur le film ?", 'Positive, malgré la longueur', ['Négative, car le film était long', 'Négative, à cause des acteurs', "Elle s'est ennuyée"], "Franchement, le film était un peu long, mais les acteurs étaient tellement bons que je ne me suis pas ennuyé une seconde."),

  // ───────── B2 ─────────
  I('B2', 'structure', "Bien qu'il ___ tard, elle a continué à travailler.", 'soit', ['est', 'était', 'sera']),
  I('B2', 'structure', "Je ne pense pas qu'il ___ raison.", 'ait', ['a', 'aura', 'avait']),
  I('B2', 'structure', "Si j'avais su, je ___ venu plus tôt.", 'serais', ['aurais', 'serai', 'étais']),
  I('B2', 'structure', 'Les problèmes ___ nous avons parlé sont graves.', 'dont', ['que', 'lesquels', 'auxquels']),
  I('B2', 'structure', "Il a réussi l'examen ___ son manque de préparation.", 'malgré', ['grâce à', 'à cause de', 'bien que']),
  I('B2', 'reading', 'Que signifie ici « droit à la déconnexion » ?', 'Le droit de ne pas répondre aux messages professionnels en dehors du travail', ['Le droit de travailler sans internet', "L'obligation de revenir au bureau", "L'interdiction des réseaux sociaux au travail"], "Si le télétravail a permis à de nombreux salariés de gagner en autonomie, il a aussi brouillé la frontière entre vie professionnelle et vie privée. Certaines entreprises instaurent désormais un « droit à la déconnexion »."),
  I('B2', 'reading', "Selon l'auteur, les épiceries de vrac…", 'reflètent un changement durable des mentalités', ["ne sont qu'une mode passagère", 'sont plus chères que les supermarchés', 'vont bientôt disparaître'], "Loin d'être un simple effet de mode, l'essor des épiceries de vrac témoigne d'une prise de conscience durable face à la surconsommation d'emballages."),
  I('B2', 'reading', "Comment l'attitude des commerçants a-t-elle évolué ?", 'Hésitants au début, ils constatent maintenant des effets positifs', ['Favorables au début, ils sont devenus hostiles', 'Ils ont toujours été opposés', "Ils n'ont jamais donné leur avis"], "Le maire a annoncé la piétonnisation du centre historique. Les commerçants, d'abord réticents, reconnaissent aujourd'hui une hausse de la fréquentation."),
  I('B2', 'reading', "Pour l'entraîneur, le succès vient surtout…", "du travail et de l'entraînement", ['du talent naturel', 'de la chance', "de l'argent investi"], "« On ne naît pas champion, on le devient », répète l'entraîneur, qui refuse d'attribuer le succès de son équipe au seul talent."),
  I('B2', 'listening', 'Pourquoi les Français ne lisent-ils pas davantage ?', 'À cause de la concurrence des écrans', ['Par manque de temps', 'Parce que les livres sont chers', 'Parce qu\'ils préfèrent la radio'], "Contrairement à ce que l'on pourrait croire, ce n'est pas le manque de temps qui empêche les Français de lire davantage, mais plutôt la concurrence des écrans."),
  I('B2', 'listening', 'Que dit la personne sur le projet ?', "Il réorganisera les équipes sans supprimer d'emplois", ['Il supprimera quelques emplois', 'Il sera abandonné', "Il créera beaucoup d'emplois"], "Je comprends vos inquiétudes, mais permettez-moi de nuancer : le projet ne supprimera aucun emploi ; il entraînera plutôt une réorganisation des équipes."),
  I('B2', 'listening', 'Que reproche la personne ?', "Les habitants n'ont pas été informés à temps", ['Les travaux sont trop longs', 'Les habitants se sont trop plaints', 'Les travaux coûtent trop cher'], "Il aurait fallu prévenir les habitants bien avant le début des travaux ; ça aurait évité bien des malentendus."),

  // ───────── C1 ─────────
  I('C1', 'structure', '___ soient les difficultés, nous mènerons ce projet à terme.', 'Quelles que', ['Quels que', 'Quoi que', 'Bien que']),
  I('C1', 'structure', "Il est parti sans que personne ne s'en ___ aperçu.", 'soit', ['est', 'ait', 'était']),
  I('C1', 'structure', "À peine ___ arrivé qu'il a dû repartir.", 'était-il', ['il était', 'est-il', 'avait-il']),
  I('C1', 'structure', "Il n'est pas de jour ___ je ne pense à elle.", 'où', ['que', 'dont', 'lequel']),
  I('C1', 'structure', 'Nous aurions préféré que vous nous ___ plus tôt.', 'ayez prévenus', ['avez prévenus', 'auriez prévenus', 'aviez prévenus']),
  I('C1', 'reading', "Quelle est la position de l'auteur ?", 'La technologie est nécessaire, mais insuffisante', ['La technologie résoudra seule la crise', "Les comportements n'ont aucune importance", 'La crise climatique est exagérée'], "Il serait naïf de croire que la technologie, à elle seule, résoudra la crise climatique ; encore faut-il que les comportements évoluent."),
  I('C1', 'reading', "Quelle est l'attitude de l'auteur ?", 'Il constate un fait sans prendre parti', ['Il se réjouit de cette situation', 'Il la critique sévèrement', 'Il conteste ce fait'], "Que l'on s'en réjouisse ou qu'on le déplore, l'anglais s'est imposé comme langue de la recherche scientifique."),
  I('C1', 'reading', 'Que reproche-t-on au rapport ?', "D'ignorer les effets sociaux, bien qu'il soit très complet", ["D'être trop court", "D'exagérer les conséquences sociales", "D'avoir été publié trop tard"], 'Le rapport, pour exhaustif qu\'il soit, passe sous silence les conséquences sociales de la réforme.'),
  I('C1', 'reading', 'Que signifie cette phrase ?', "Il faut reconnaître que les mesures n'ont pas donné le résultat attendu", ['Les mesures ont été imposées par la force', 'Les mesures ont dépassé les attentes', 'On attend encore les résultats'], "Force est de constater que les mesures adoptées n'ont pas eu l'effet escompté."),
  I('C1', 'listening', 'Que veut dire la personne ?', "Elle reconnaît les efforts, mais constate que les objectifs n'ont pas été atteints", ['Elle juge les efforts inutiles', "Elle félicite l'équipe pour ses résultats", "Elle propose d'abandonner les objectifs"], "Loin de moi l'idée de minimiser vos efforts, mais force est de reconnaître que les objectifs n'ont pas été atteints."),
  I('C1', 'listening', 'Quel est le principal problème du projet ?', 'Son calendrier', ['Son coût', 'Son équipe', 'Son objectif'], "Ce n'est pas tant le coût du projet qui pose problème que son calendrier, franchement irréaliste."),
  I('C1', 'listening', "Selon la personne, l'équipe est efficace…", "à condition qu'on lui laisse de l'autonomie", ["parce qu'elle est très surveillée", "malgré son manque d'autonomie", 'seulement sous pression'], "Pour peu qu'on lui laisse un peu d'autonomie, cette équipe se montre d'une efficacité redoutable."),
];

// Banco extra (+18 por nível) — usado no teste de nível e nos simulados.
import { PLACEMENT_EXTRA } from './placement3';
PLACEMENT_BANK.push(...PLACEMENT_EXTRA);
