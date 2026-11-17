// Nível A1 — unidades 1 a 5.
// Formato compacto (veja src/content/index.js para o parser):
//   vocab:     'francês|português|emoji'
//   sentences: 'francês|português'
//   quiz:      'pergunta|resposta certa|errada1;errada2;errada3|por quê'
//   fill:      'frase com ___|resposta|tradução|por quê'
//   dialogue:  'falante|francês|português'
// No texto das aulas: *itálico* = francês, **negrito** = destaque.

export default [
  // ════════════════════════════════════════════════════════
  {
    id: 'u1', level: 'A1', title: 'Premiers pas', pt: 'Primeiros passos', emoji: '👋',
    desc: 'Cumprimentar, se apresentar, números até 20 e os sons do francês.',
    lessons: [
      {
        id: 'u1l1', title: 'Bonjour !', emoji: '👋', goal: 'Cumprimentar e se despedir',
        intro: 'Hoje você vai aprender a dizer olá e tchau em francês — e quando usar cada forma.',
        teach: [
          { title: 'Olá!', text: '*Bonjour* serve para **bom dia** e **boa tarde**. É o cumprimento mais importante da França: sempre diga *bonjour* ao entrar numa loja!\n\n*Salut* é o "oi" entre amigos.', ex: ['Bonjour !|Bom dia! / Olá!', 'Salut !|Oi!', 'Bonjour, madame.|Bom dia, senhora.'], tip: 'Na França, não dizer *bonjour* ao vendedor é considerado falta de educação.' },
          { title: 'À noite e na despedida', text: '*Bonsoir* = boa noite **ao chegar**.\n*Bonne nuit* = boa noite **antes de dormir**.\n*Au revoir* = tchau (formal). *À demain* = até amanhã.', ex: ['Bonsoir, monsieur.|Boa noite, senhor.', 'Au revoir !|Tchau! / Até logo!', 'À demain !|Até amanhã!', 'Bonne nuit !|Boa noite! (vou dormir)'] },
        ],
        vocab: ['bonjour|bom dia, olá|☀️', 'salut|oi, tchau (informal)|🙋', 'bonsoir|boa noite (ao chegar)|🌆', 'bonne nuit|boa noite (ao dormir)|🌙', 'au revoir|tchau, até logo|👋', 'à demain|até amanhã|📅', 'madame|senhora|👩', 'monsieur|senhor|👨'],
        sentences: ['Bonjour, madame !|Bom dia, senhora!', 'Salut, Paul !|Oi, Paul!', 'Bonsoir, monsieur.|Boa noite, senhor.', 'Au revoir et à demain !|Tchau e até amanhã!', 'Bonne nuit, maman.|Boa noite, mamãe.'],
        quiz: [
          'Você chega numa padaria às 15h. O que diz?|Bonjour|Bonne nuit;Bonsoir;À demain|*Bonjour* vale para o dia todo até o fim da tarde.',
          'Você vai dormir. Como se despede?|Bonne nuit|Bonsoir;Bonjour;Salut|*Bonne nuit* é só antes de dormir; *bonsoir* é ao chegar à noite.',
          '"Salut" é mais adequado para…|um amigo|seu chefe;um policial;um cliente|*Salut* é informal, como "oi".',
        ],
        fill: ['___, madame !|Bonjour|Bom dia, senhora!|Cumprimento padrão durante o dia.', 'Au ___ !|revoir|Tchau!|*Au revoir* = até logo.', 'Bonne ___ !|nuit|Boa noite (vou dormir)!|*Nuit* = noite.'],
      },
      {
        id: 'u1l2', title: 'Je m\'appelle…', emoji: '🪪', goal: 'Dizer seu nome e perguntar o do outro',
        intro: 'Vamos aprender a se apresentar: dizer o nome, perguntar o nome e responder com educação.',
        teach: [
          { title: 'Meu nome é…', text: '*Je m\'appelle* + nome = **eu me chamo**.\nTambém dá para dizer *Je suis* + nome = **eu sou**.', ex: ['Je m\'appelle Raimundo.|Eu me chamo Raimundo.', 'Je suis Marie.|Eu sou a Marie.'], tip: 'O *e* de *je* some antes de vogal: *j\'habite*, *j\'aime*. Esse apóstrofo se chama elisão.' },
          { title: 'E você?', text: 'Informal: *Tu t\'appelles comment ?*\nFormal: *Comment vous appelez-vous ?*\nResposta educada: *Enchanté(e) !* = prazer!', ex: ['Tu t\'appelles comment ?|Como você se chama?', 'Comment vous appelez-vous ?|Como o senhor/a senhora se chama?', 'Enchanté !|Prazer! (homem fala)', 'Enchantée !|Prazer! (mulher fala)'] },
          { title: 'Tu ou vous?', text: '*Tu* = você (amigos, família, crianças).\n*Vous* = o senhor/a senhora, **ou** vocês (plural).\nNa dúvida, use *vous*.' },
        ],
        vocab: ['je m\'appelle|eu me chamo|🪪', 'comment|como|❓', 'enchanté|prazer (em conhecer)|🤝', 'et toi ?|e você?|👉', 'et vous ?|e o senhor? / e vocês?|👥', 'oui|sim|✅', 'non|não|❌'],
        sentences: ['Je m\'appelle Lucas.|Eu me chamo Lucas.', 'Tu t\'appelles comment ?|Como você se chama?', 'Enchantée, Julie !|Prazer, Julie!', 'Je suis Pierre, et toi ?|Eu sou o Pierre, e você?', 'Comment vous appelez-vous ?|Como o senhor se chama?'],
        quiz: [
          'Como perguntar o nome do seu professor?|Comment vous appelez-vous ?|Tu t\'appelles comment ?;Salut, ça va ?;Je m\'appelle comment ?|Com professor usamos *vous*, a forma educada.',
          'Uma mulher diz "prazer". Ela escreve…|Enchantée|Enchanté;Enchantés;Enchanter|No feminino acrescenta-se *-e*: *enchantée*. A pronúncia é igual!',
          'Qual é a forma correta?|J\'aime|Je aime;J aime;Jaime|Antes de vogal, *je* vira *j\'*.',
        ],
        fill: ['Je m\'___ Sophie.|appelle|Eu me chamo Sophie.|*Je m\'appelle* = eu me chamo.', 'Tu t\'appelles ___ ?|comment|Como você se chama?|*Comment* = como.', 'Je suis Marc, et ___ ?|toi|Eu sou o Marc, e você?|*Et toi ?* = e você? (informal)'],
        dialogue: ['A|Bonjour ! Je m\'appelle Léa.|Olá! Eu me chamo Léa.', 'B|Bonjour Léa ! Moi, c\'est Hugo.|Olá, Léa! Eu sou o Hugo.', 'A|Enchantée, Hugo !|Prazer, Hugo!', 'B|Enchanté !|Prazer!'],
      },
      {
        id: 'u1l3', title: 'Ça va ?', emoji: '🙂', goal: 'Perguntar como a pessoa está e ser educado',
        intro: 'Como vai? Obrigado, por favor, desculpa — as palavras mágicas do francês.',
        teach: [
          { title: 'Tudo bem?', text: '*Ça va ?* = tudo bem? (informal)\n*Comment allez-vous ?* = como vai o senhor? (formal)\nRespostas: *Ça va bien* (vou bem), *Très bien* (muito bem), *Pas mal* (nada mal), *Bof…* (mais ou menos).', ex: ['Ça va ?|Tudo bem?', 'Ça va bien, merci.|Tudo bem, obrigado.', 'Comment allez-vous ?|Como vai o senhor?', 'Très bien, et vous ?|Muito bem, e o senhor?'] },
          { title: 'Palavras mágicas', text: '*Merci* = obrigado(a). *Merci beaucoup* = muito obrigado.\n*S\'il vous plaît* = por favor (formal). *S\'il te plaît* = por favor (informal).\n*Pardon* / *Excusez-moi* = com licença, desculpa.\n*De rien* = de nada.', ex: ['Merci beaucoup !|Muito obrigado!', 'De rien.|De nada.', 'Un café, s\'il vous plaît.|Um café, por favor.', 'Pardon, madame.|Desculpe, senhora.'], tip: '*S\'il vous plaît* pronuncia-se “sil vu plé”.' },
        ],
        vocab: ['ça va|tudo bem|🙂', 'bien|bem|👍', 'très bien|muito bem|😄', 'pas mal|nada mal|😌', 'merci|obrigado|🙏', 'de rien|de nada|😊', 's\'il vous plaît|por favor|🥺', 'pardon|desculpa, com licença|🙇'],
        sentences: ['Ça va bien, merci.|Tudo bem, obrigado.', 'Comment allez-vous ?|Como vai o senhor?', 'Très bien, et toi ?|Muito bem, e você?', 'Merci beaucoup, madame.|Muito obrigado, senhora.', 'Pardon, monsieur !|Com licença, senhor!'],
        quiz: [
          'Alguém diz "Merci !". Você responde…|De rien|Pardon;Ça va;Bonsoir|*De rien* = de nada.',
          '"Pas mal" quer dizer…|nada mal|muito mal;não sei;nada|*Pas mal* é uma resposta positiva: "nada mal".',
          'Para pedir algo com educação a um desconhecido:|s\'il vous plaît|s\'il te plaît;de rien;salut|Com desconhecidos usamos a forma de *vous*.',
        ],
        fill: ['Ça ___ ?|va|Tudo bem?|*Ça va ?* = tudo bem?', 'Merci ___ !|beaucoup|Muito obrigado!|*Beaucoup* = muito.', 'Comment ___-vous ?|allez|Como vai o senhor?|Do verbo *aller* (ir).'],
      },
      {
        id: 'u1l4', title: 'Les nombres 0–20', emoji: '🔢', goal: 'Contar de 0 a 20',
        intro: 'Números aparecem em tudo: preços, idade, telefone. Vamos de zero a vinte.',
        teach: [
          { title: '0 a 10', text: '*zéro, un, deux, trois, quatre, cinq, six, sept, huit, neuf, dix*', table: [['0', 'zéro', 'zero'], ['1', 'un / une', 'um / uma'], ['2', 'deux', 'dois'], ['3', 'trois', 'três'], ['4', 'quatre', 'quatro'], ['5', 'cinq', 'cinco'], ['6', 'six', 'seis'], ['7', 'sept', 'sete'], ['8', 'huit', 'oito'], ['9', 'neuf', 'nove'], ['10', 'dix', 'dez']], tip: 'No *sept* o *p* é mudo: “sét”.' },
          { title: '11 a 20', text: '*onze, douze, treize, quatorze, quinze, seize* — depois vem o padrão *dix-sept* (10+7), *dix-huit*, *dix-neuf*, e *vingt* (20).', table: [['11', 'onze', ''], ['12', 'douze', ''], ['13', 'treize', ''], ['14', 'quatorze', ''], ['15', 'quinze', ''], ['16', 'seize', ''], ['17', 'dix-sept', '10+7'], ['18', 'dix-huit', '10+8'], ['19', 'dix-neuf', '10+9'], ['20', 'vingt', '“vã”']] },
        ],
        vocab: ['un|um|1️⃣', 'deux|dois|2️⃣', 'trois|três|3️⃣', 'quatre|quatro|4️⃣', 'cinq|cinco|5️⃣', 'six|seis|6️⃣', 'sept|sete|7️⃣', 'huit|oito|8️⃣', 'neuf|nove|9️⃣', 'dix|dez|🔟', 'quinze|quinze', 'vingt|vinte'],
        sentences: ['J\'ai deux chats.|Eu tenho dois gatos.', 'Un, deux, trois !|Um, dois, três!', 'Il a dix-huit ans.|Ele tem dezoito anos.', 'Douze croissants, s\'il vous plaît.|Doze croissants, por favor.', 'Elle a vingt ans.|Ela tem vinte anos.'],
        quiz: [
          'Como se diz 17?|dix-sept|sept-dix;dix-six;seize|17 = 10 + 7 = *dix-sept*.',
          '"Quatorze" é…|14|40;4;15|*Quatorze* = 14.',
          'Qual número é "seize"?|16|6;60;12|*Seize* = 16 (não confunda com *six* = 6).',
        ],
        fill: ['Il a dix-___ ans.|huit|Ele tem dezoito anos.|18 = *dix-huit*.', 'Un, deux, ___.|trois|Um, dois, três.|3 = *trois*.', 'Elle a ___ ans. (20)|vingt|Ela tem vinte anos.|20 = *vingt*.'],
      },
      {
        id: 'u1l5', title: 'Les sons', emoji: '👂', goal: 'Reconhecer os sons básicos do francês',
        intro: 'O francês não se lê como se escreve. Aqui estão os sons que mais confundem brasileiros.',
        teach: [
          { title: 'Letras finais mudas', text: 'Em geral, a consoante final **não** é pronunciada: *petit* (“petí”), *Paris* (“parí”), *vous* (“vu”).\nExceção: **C, R, F, L** costumam soar — lembre de *CaReFuL*: *sac, mer, chef, sel*.', ex: ['petit|pequeno', 'chef|chefe', 'Paris|Paris'] },
          { title: 'U e OU', text: '*ou* = nosso **u**: *vous, nous, bonjour*.\n*u* = um som que não existe em português: diga **i** com os lábios em bico. *tu, salut, rue*.', ex: ['vous|vocês', 'tu|você', 'rue|rua', 'roue|roda'], tip: 'Faça biquinho como se fosse assobiar e diga “i”. Esse é o *u* francês.' },
          { title: 'Nasais', text: '*on* (bom), *an/en* (tempo), *in/ain* (pão). O *n* não é pronunciado — o som sai pelo nariz.', ex: ['bon|bom', 'temps|tempo', 'pain|pão', 'vin|vinho'] },
        ],
        vocab: ['rue|rua|🛣️', 'roue|roda|🛞', 'pain|pão|🥖', 'vin|vinho|🍷', 'bon|bom|👌', 'chat|gato (o “t” é mudo)|🐈', 'mer|mar (o “r” soa)|🌊', 'sel|sal|🧂'],
        sentences: ['Bonjour, vous allez bien ?|Olá, vocês estão bem?', 'Le pain est bon.|O pão é bom.', 'Tu habites dans cette rue ?|Você mora nesta rua?', 'Un verre de vin.|Uma taça de vinho.'],
        quiz: [
          'Em "petit", o "t" final…|é mudo|é pronunciado;vira “d”;vira “s”|Consoantes finais costumam ser mudas.',
          'Qual palavra tem o som de "u" brasileiro?|vous|tu;rue;salut|*ou* = “u”. Já o *u* sozinho é o som em biquinho.',
          'Qual consoante final normalmente soa?|r, como em "mer"|t, como em "chat";s, como em "vous";d, como em "pied"|Lembre: *CaReFuL* — C, R, F, L.',
        ],
        fill: ['Le ___ est bon. (pão)|pain|O pão é bom.|*Pain* tem som nasal: “pã”.', 'Le ___ dort. (gato)|chat|O gato dorme.|*Chat* — o *t* é mudo: “chá”.'],
      },
      {
        id: 'u1story', story: true, title: 'Première rencontre', emoji: '☕', goal: 'História: o primeiro encontro no café',
        intro: 'Leia e ouça a conversa entre Raimundo e Camille num café de Paris.',
        dialogue: [
          'Camille|Bonjour ! Pardon, cette place est libre ?|Olá! Com licença, este lugar está livre?',
          'Raimundo|Oui, bien sûr !|Sim, claro!',
          'Camille|Merci ! Je m\'appelle Camille. Et vous ?|Obrigada! Eu me chamo Camille. E o senhor?',
          'Raimundo|Je m\'appelle Raimundo. Enchanté !|Eu me chamo Raimundo. Prazer!',
          'Camille|Enchantée ! Ça va ?|Prazer! Tudo bem?',
          'Raimundo|Ça va très bien, merci. Et vous ?|Tudo muito bem, obrigado. E você?',
          'Camille|Pas mal ! Bon, au revoir et bonne journée !|Nada mal! Bom, tchau e bom dia!',
        ],
        quiz: [
          'O que Camille pergunta primeiro?|Se o lugar está livre|Se ele quer café;O nome dele;Que horas são|*Cette place est libre ?* = este lugar está livre?',
          'Como Raimundo está?|Muito bem|Mais ou menos;Cansado;Mal|*Très bien* = muito bem.',
          '"Bonne journée" quer dizer…|tenha um bom dia|boa noite;até amanhã;bom apetite|*Journée* = o dia (a duração dele).',
        ],
        vocab: ['libre|livre|🪑', 'bien sûr|claro|👌', 'bonne journée|bom dia (despedida)|🌤️'],
        sentences: ['Cette place est libre ?|Este lugar está livre?', 'Oui, bien sûr !|Sim, claro!', 'Bonne journée !|Tenha um bom dia!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u2', level: 'A1', title: 'Être et Avoir', pt: 'Ser e Ter', emoji: '⚖️',
    desc: 'Os dois verbos mais importantes do francês e as expressões que usam cada um.',
    lessons: [
      {
        id: 'u2l1', title: 'Être', emoji: '✨', goal: 'Conjugar o verbo ser/estar',
        intro: '*Être* significa **ser** e **estar** ao mesmo tempo. É irregular — vale decorar!',
        teach: [
          { title: 'Conjugação', text: 'Em francês não existe diferença entre ser e estar: tudo é *être*.', table: [['je', 'suis', 'eu sou/estou'], ['tu', 'es', 'você é/está'], ['il / elle / on', 'est', 'ele/ela é, a gente é'], ['nous', 'sommes', 'nós somos'], ['vous', 'êtes', 'vocês são / o sr. é'], ['ils / elles', 'sont', 'eles/elas são']], tip: '*On* é muito usado na fala no lugar de *nous*: *on est* = a gente é.' },
          { title: 'Exemplos', text: 'Usamos *être* para identidade, nacionalidade, profissão, estado e lugar.', ex: ['Je suis brésilien.|Eu sou brasileiro.', 'Tu es fatigué ?|Você está cansado?', 'Elle est à Paris.|Ela está em Paris.', 'Nous sommes amis.|Nós somos amigos.'] },
        ],
        vocab: ['je suis|eu sou / estou', 'tu es|você é / está', 'il est|ele é / está', 'nous sommes|nós somos', 'vous êtes|vocês são', 'ils sont|eles são', 'fatigué|cansado|😴', 'content|contente|😊', 'malade|doente|🤒'],
        sentences: ['Je suis content.|Eu estou contente.', 'Tu es brésilienne ?|Você é brasileira?', 'Il est malade.|Ele está doente.', 'Nous sommes à la maison.|Nós estamos em casa.', 'Vous êtes très gentils.|Vocês são muito gentis.', 'Elles sont fatiguées.|Elas estão cansadas.'],
        quiz: [
          'Nous ___ amis.|sommes|sont;êtes;est|*nous sommes* = nós somos.',
          'Vous ___ professeur ?|êtes|est;es;sommes|Com *vous*, sempre *êtes*.',
          'Qual frase está correta?|Elles sont contentes.|Elles est contentes.;Elles sommes contentes.;Elles êtes contentes.|*ils/elles sont*.',
          'Em francês, "ser" e "estar"…|são o mesmo verbo: être|são verbos diferentes;só existe estar;usam avoir|*Être* cobre os dois sentidos.',
        ],
        fill: ['Je ___ fatigué.|suis|Eu estou cansado.|*je suis*', 'Tu ___ où ?|es|Onde você está?|*tu es*', 'Ils ___ à Lyon.|sont|Eles estão em Lyon.|*ils sont*'],
      },
      {
        id: 'u2l2', title: 'Nationalités', emoji: '🌍', goal: 'Dizer nacionalidade e profissão',
        intro: 'Com *être* dizemos de onde somos e o que fazemos. E aprendemos o feminino dos adjetivos.',
        teach: [
          { title: 'Masculino e feminino', text: 'Regra geral: acrescente **-e** no feminino.\n*français → française*, *brésilien → brésilienne* (dobra o *n*), *espagnol → espagnole*.\nSe já termina em *-e*, não muda: *belge → belge*.', ex: ['Il est français.|Ele é francês.', 'Elle est française.|Ela é francesa.', 'Je suis brésilien.|Sou brasileiro.', 'Je suis brésilienne.|Sou brasileira.'] },
          { title: 'Profissão sem artigo', text: 'Com *être*, a profissão vem **sem artigo**: *Je suis professeur* (e não *je suis un professeur*).', ex: ['Je suis médecin.|Sou médico.', 'Elle est avocate.|Ela é advogada.', 'Il est étudiant.|Ele é estudante.'], tip: 'Com *c\'est* volta o artigo: *C\'est un médecin.*' },
        ],
        vocab: ['français|francês|🇫🇷', 'brésilien|brasileiro|🇧🇷', 'portugais|português|🇵🇹', 'américain|americano|🇺🇸', 'étudiant|estudante|🎒', 'professeur|professor|👩‍🏫', 'médecin|médico|🩺', 'ingénieur|engenheiro|👷'],
        sentences: ['Je suis brésilien et j\'habite à Santarém.|Sou brasileiro e moro em Santarém.', 'Elle est française.|Ela é francesa.', 'Il est médecin.|Ele é médico.', 'Nous sommes étudiants.|Somos estudantes.', 'Tu es américaine ?|Você é americana?'],
        quiz: [
          'Feminino de "brésilien":|brésilienne|brésiliene;brésiliennes;brésilien|Termina em *-ien* → dobra o *n*: *-ienne*.',
          'Como dizer "Sou professor"?|Je suis professeur.|Je suis un professeur.;J\'ai professeur.;Je professeur.|Profissão com *être* não leva artigo.',
          'Marie est ___.|française|français;françaises;francês|Marie é mulher → *française*.',
        ],
        fill: ['Elle est ___. (francesa)|française|Ela é francesa.|Feminino: + *e*.', 'Je suis ___. (estudante, homem)|étudiant|Sou estudante.|Sem artigo depois de *je suis*.'],
      },
      {
        id: 'u2l3', title: 'Avoir', emoji: '🤝', goal: 'Conjugar o verbo ter',
        intro: '*Avoir* = **ter**. Junto com *être*, é o verbo que mais aparece em francês.',
        teach: [
          { title: 'Conjugação', table: [['j\'', 'ai', 'eu tenho'], ['tu', 'as', 'você tem'], ['il / elle / on', 'a', 'ele/ela tem'], ['nous', 'avons', 'nós temos'], ['vous', 'avez', 'vocês têm'], ['ils / elles', 'ont', 'eles/elas têm']], text: 'Repare: *j\'ai* com apóstrofo, porque *ai* começa com vogal.', tip: 'Cuidado: *ils ont* (têm) soa “il zõ”; *ils sont* (são) soa “il sõ”. A ligação em **z** faz toda a diferença!' },
          { title: 'Exemplos', ex: ['J\'ai un chien.|Eu tenho um cachorro.', 'Tu as une voiture ?|Você tem um carro?', 'Nous avons deux enfants.|Nós temos dois filhos.', 'Ils ont une maison.|Eles têm uma casa.'] },
        ],
        vocab: ['j\'ai|eu tenho', 'tu as|você tem', 'il a|ele tem', 'nous avons|nós temos', 'vous avez|vocês têm', 'ils ont|eles têm', 'un chien|um cachorro|🐕', 'une voiture|um carro|🚗', 'une maison|uma casa|🏠', 'un frère|um irmão|👦'],
        sentences: ['J\'ai un chien.|Eu tenho um cachorro.', 'Tu as un frère ?|Você tem um irmão?', 'Elle a une voiture rouge.|Ela tem um carro vermelho.', 'Nous avons une grande maison.|Nós temos uma casa grande.', 'Vous avez des enfants ?|Vocês têm filhos?', 'Ils ont un chat.|Eles têm um gato.'],
        quiz: [
          'Il ___ un vélo.|a|as;ai;ont|*il/elle a*.',
          'Vous ___ raison.|avez|avons;ont;as|*vous avez*.',
          'Qual é a forma correta?|J\'ai|Je ai;J\'as;Je a|*Je + ai* vira *j\'ai*.',
          '"Ils ont" e "ils sont" se diferenciam pelo som…|z de ligação em "ils ont"|não há diferença;o “t” final;o “s” de sont é mudo|*ils‿ont* = “il-zõ”, *ils sont* = “il-sõ”.',
        ],
        fill: ['J\'___ un chat.|ai|Eu tenho um gato.|*j\'ai*', 'Nous ___ une maison.|avons|Nós temos uma casa.|*nous avons*', 'Elles ___ deux enfants.|ont|Elas têm dois filhos.|*elles ont*'],
      },
      {
        id: 'u2l4', title: 'J\'ai faim !', emoji: '🍽️', goal: 'Expressões com avoir',
        intro: 'Em francês você não “está” com fome: você “tem” fome. Várias sensações usam *avoir*.',
        teach: [
          { title: 'Sensações com avoir', text: 'Onde o português usa **estar com**, o francês usa *avoir*:', table: [['avoir faim', 'estar com fome'], ['avoir soif', 'estar com sede'], ['avoir froid', 'estar com frio'], ['avoir chaud', 'estar com calor'], ['avoir peur', 'ter medo'], ['avoir sommeil', 'estar com sono'], ['avoir raison', 'ter razão'], ['avoir tort', 'estar errado']] },
          { title: 'A idade', text: 'A idade também é com *avoir* e precisa da palavra *ans* (anos):\n*J\'ai 30 ans* = tenho 30 anos.\nNunca diga *je suis 30* ❌', ex: ['J\'ai trente ans.|Tenho trinta anos.', 'Quel âge as-tu ?|Quantos anos você tem?', 'Elle a vingt ans.|Ela tem vinte anos.'] },
        ],
        vocab: ['avoir faim|estar com fome|🍔', 'avoir soif|estar com sede|🥤', 'avoir froid|estar com frio|🥶', 'avoir chaud|estar com calor|🥵', 'avoir peur|ter medo|😨', 'avoir sommeil|estar com sono|😪', 'avoir raison|ter razão|☝️', 'ans|anos|🎂'],
        sentences: ['J\'ai faim !|Estou com fome!', 'Tu as soif ?|Você está com sede?', 'Il a peur du chien.|Ele tem medo do cachorro.', 'Nous avons froid.|Estamos com frio.', 'Vous avez raison.|Vocês têm razão.', 'J\'ai trente-deux ans.|Tenho trinta e dois anos.'],
        quiz: [
          'Como dizer "Estou com calor"?|J\'ai chaud.|Je suis chaud.;J\'ai faim.;Je chaud.|Sensações usam *avoir*. (*Je suis chaud* tem outro sentido… evite!)',
          'Como dizer "Tenho 25 anos"?|J\'ai vingt-cinq ans.|Je suis vingt-cinq.;J\'ai vingt-cinq.;Je suis vingt-cinq ans.|Idade = *avoir* + número + *ans*.',
          '"Avoir tort" significa…|estar errado|ter razão;ter sono;ter tortas|*Avoir tort* é o oposto de *avoir raison*.',
        ],
        fill: ['J\'ai ___. (fome)|faim|Estou com fome.|*avoir faim*', 'Elle a ___ ans. (20)|vingt|Ela tem vinte anos.|Idade com *avoir*.', 'Tu as ___ ? (frio)|froid|Você está com frio?|*avoir froid*'],
      },
      {
        id: 'u2l5', title: 'Avoir ou être ?', emoji: '⚖️', goal: 'Escolher o verbo certo',
        intro: 'Hora de treinar a escolha entre *avoir* e *être* — o erro mais comum de iniciantes.',
        teach: [
          { title: 'Como decidir', text: '**Être**: o que você **é** ou **onde/como está** — nacionalidade, profissão, adjetivos (*content, fatigué, malade*), lugar.\n**Avoir**: o que você **tem** — objetos, família, idade, fome, sede, frio, medo.', ex: ['Je suis fatigué.|Estou cansado. (estado = être)', 'J\'ai sommeil.|Estou com sono. (sensação = avoir)', 'Elle est en retard.|Ela está atrasada.', 'Elle a vingt ans.|Ela tem vinte anos.'] },
          { title: 'Truque', text: 'Se em português dá para dizer **“estar com + substantivo”** (fome, frio, medo) → *avoir*.\nSe é **“estar + adjetivo”** (cansado, feliz, doente) → *être*.' },
        ],
        vocab: ['en retard|atrasado|⏰', 'en avance|adiantado|⏩', 'malade|doente|🤒', 'heureux|feliz|😁'],
        sentences: ['Je suis en retard !|Estou atrasado!', 'Il a sommeil.|Ele está com sono.', 'Nous sommes heureux.|Nós estamos felizes.', 'Tu as quel âge ?|Quantos anos você tem?', 'Elles sont malades.|Elas estão doentes.'],
        quiz: [
          'Je ___ en retard.|suis|ai;as;est|“Estar atrasado” = adjetivo/estado → *être*.',
          'Nous ___ froid.|avons|sommes;êtes;ont|“Estar com frio” → *avoir froid*.',
          'Il ___ médecin.|est|a;as;ont|Profissão → *être*.',
          'Vous ___ quel âge ?|avez|êtes;sont;as|Idade → *avoir*.',
        ],
        fill: ['Elle ___ fatiguée.|est|Ela está cansada.|Adjetivo → *être*.', 'J\'___ peur.|ai|Tenho medo.|*avoir peur*', 'Ils ___ brésiliens.|sont|Eles são brasileiros.|Nacionalidade → *être*.'],
        bank: 'avoir_etre',
      },
      {
        id: 'u2story', story: true, title: 'À l\'auberge', emoji: '🏨', goal: 'História: chegada ao albergue',
        intro: 'Ana chega cansada a um albergue em Lyon e conversa com o recepcionista.',
        dialogue: [
          'Réceptionniste|Bonsoir ! Vous avez une réservation ?|Boa noite! A senhora tem uma reserva?',
          'Ana|Oui, je m\'appelle Ana Souza. Je suis brésilienne.|Sim, eu me chamo Ana Souza. Sou brasileira.',
          'Réceptionniste|Bienvenue ! Vous êtes fatiguée ?|Bem-vinda! Está cansada?',
          'Ana|Oui, très fatiguée. Et j\'ai faim !|Sim, muito cansada. E estou com fome!',
          'Réceptionniste|Il y a un restaurant à côté. Vous avez quel âge ? C\'est pour la carte jeune.|Tem um restaurante ao lado. Quantos anos a senhora tem? É para o cartão jovem.',
          'Ana|J\'ai vingt-quatre ans.|Tenho vinte e quatro anos.',
          'Réceptionniste|Parfait ! Bonne soirée !|Perfeito! Boa noite!',
        ],
        quiz: [
          'De onde Ana é?|Do Brasil|De Portugal;Da França;Da Espanha|*Je suis brésilienne.*',
          'Como Ana está?|Cansada e com fome|Feliz e com sono;Doente;Com frio|*très fatiguée* e *j\'ai faim*.',
          'Quantos anos Ana tem?|24|20;14;34|*vingt-quatre* = 24.',
        ],
        vocab: ['une réservation|uma reserva|📋', 'bienvenue|bem-vindo(a)|🤗', 'à côté|ao lado|➡️', 'bonne soirée|boa noite (despedida)|🌃'],
        sentences: ['Vous avez une réservation ?|Você tem uma reserva?', 'Il y a un restaurant à côté.|Tem um restaurante ao lado.', 'Bienvenue à Lyon !|Bem-vindo a Lyon!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u3', level: 'A1', title: 'Ma famille', pt: 'Minha família', emoji: '👨‍👩‍👧',
    desc: 'Família, possessivos, descrever pessoas e frases negativas.',
    lessons: [
      {
        id: 'u3l1', title: 'La famille', emoji: '👪', goal: 'Nomear os membros da família',
        intro: 'Pai, mãe, irmãos, avós… vamos montar a árvore da família em francês.',
        teach: [
          { title: 'Família próxima', text: 'Repare nos artigos: *le* (masculino), *la* (feminino), *les* (plural).', table: [['le père', 'o pai'], ['la mère', 'a mãe'], ['le frère', 'o irmão'], ['la sœur', 'a irmã'], ['le fils', 'o filho (o “s” soa: “fis”)'], ['la fille', 'a filha'], ['les parents', 'os pais / os parentes']] },
          { title: 'Família estendida', table: [['le grand-père', 'o avô'], ['la grand-mère', 'a avó'], ['l\'oncle', 'o tio'], ['la tante', 'a tia'], ['le cousin / la cousine', 'o primo / a prima'], ['le mari', 'o marido'], ['la femme', 'a esposa / a mulher']], tip: '*Papa* e *maman* são as formas carinhosas, como “papai” e “mamãe”.' },
        ],
        vocab: ['le père|o pai|👨', 'la mère|a mãe|👩', 'le frère|o irmão|👦', 'la sœur|a irmã|👧', 'le fils|o filho|👶', 'la fille|a filha|👧', 'le grand-père|o avô|👴', 'la grand-mère|a avó|👵', 'l\'oncle|o tio|🧔', 'la tante|a tia|👩‍🦰'],
        sentences: ['Voici mon père.|Este é meu pai.', 'J\'ai deux sœurs.|Tenho duas irmãs.', 'Ma grand-mère a quatre-vingts ans.|Minha avó tem oitenta anos.', 'Mon oncle habite à Belém.|Meu tio mora em Belém.', 'Ils ont une fille et un fils.|Eles têm uma filha e um filho.'],
        quiz: [
          '"La sœur" é…|a irmã|a mãe;a tia;a prima|*sœur* = irmã.',
          'O pai do seu pai é o seu…|grand-père|oncle;cousin;frère|*grand-père* = avô.',
          '"Fille" pode significar filha e…|menina|mulher;irmã;tia|*une fille* = uma menina; *ma fille* = minha filha.',
        ],
        fill: ['J\'ai un ___ et une sœur.|frère|Tenho um irmão e uma irmã.|*frère* = irmão.', 'Ma ___ est médecin. (mãe)|mère|Minha mãe é médica.|*mère* = mãe.'],
      },
      {
        id: 'u3l2', title: 'Mon, ma, mes', emoji: '🫴', goal: 'Usar os possessivos',
        intro: 'Meu, minha, meus… em francês o possessivo concorda com a **coisa**, não com o dono.',
        teach: [
          { title: 'A tabela', table: [['', 'masc.', 'fem.', 'plural'], ['meu', 'mon', 'ma', 'mes'], ['seu (tu)', 'ton', 'ta', 'tes'], ['dele/dela', 'son', 'sa', 'ses'], ['nosso', 'notre', 'notre', 'nos'], ['de vocês', 'votre', 'votre', 'vos'], ['deles', 'leur', 'leur', 'leurs']] },
          { title: 'Concorda com a coisa!', text: '*son frère* = o irmão **dele ou dela**. *sa mère* = a mãe **dele ou dela**.\nO gênero é da palavra *frère/mère*, não do dono.', ex: ['Paul et sa sœur.|Paul e a irmã dele.', 'Marie et son père.|Marie e o pai dela.'], tip: 'Antes de vogal, mesmo feminino, usa-se *mon/ton/son*: *mon amie*, *son école* — para soar melhor.' },
        ],
        vocab: ['mon|meu', 'ma|minha', 'mes|meus, minhas', 'son|seu, dele, dela', 'sa|sua, dele, dela', 'notre|nosso, nossa', 'leur|deles, delas', 'une amie|uma amiga|👭'],
        sentences: ['C\'est ma mère.|Esta é minha mãe.', 'Mes parents habitent à Manaus.|Meus pais moram em Manaus.', 'Julie aime son frère.|Julie ama o irmão dela.', 'Notre maison est petite.|Nossa casa é pequena.', 'C\'est mon amie Clara.|Esta é minha amiga Clara.', 'Leurs enfants sont gentils.|Os filhos deles são gentis.'],
        quiz: [
          '___ sœur s\'appelle Ana. (minha)|Ma|Mon;Mes;Me|*sœur* é feminino → *ma*.',
          '"Pierre et sa mère" = Pierre e…|a mãe dele|a mãe dela;minha mãe;sua mãe (de você)|*sa* concorda com *mère*; o dono é Pierre.',
          '___ amie Léa. (minha)|Mon|Ma;Mes;Mien|Antes de vogal usa-se *mon*, mesmo no feminino.',
        ],
        fill: ['___ parents sont gentils. (meus)|Mes|Meus pais são gentis.|Plural → *mes*.', 'C\'est ___ voiture. (sua, de tu)|ta|É o seu carro.|*voiture* é feminino → *ta*.', 'Marc aime ___ chien. (dele)|son|Marc ama o cachorro dele.|*chien* é masculino → *son*.'],
      },
      {
        id: 'u3l3', title: 'Décrire', emoji: '🧑‍🎨', goal: 'Descrever pessoas',
        intro: 'Alto, baixo, olhos azuis, cabelo cacheado: vamos descrever as pessoas que você ama.',
        teach: [
          { title: 'Adjetivos básicos', text: 'O adjetivo concorda em gênero e número: *grand → grande → grands → grandes*.', table: [['grand(e)', 'alto(a), grande'], ['petit(e)', 'baixo(a), pequeno(a)'], ['jeune', 'jovem'], ['vieux / vieille', 'velho / velha'], ['beau / belle', 'bonito / bonita'], ['gentil(le)', 'gentil'], ['drôle', 'engraçado(a)'], ['sympa', 'simpático(a)']] },
          { title: 'Cabelo e olhos', text: 'Usamos *avoir*: *Il a les yeux bleus* (ele tem olhos azuis). *Elle a les cheveux longs* (ela tem cabelo comprido).', ex: ['J\'ai les yeux marron.|Tenho olhos castanhos.', 'Elle a les cheveux bouclés.|Ela tem cabelo cacheado.', 'Mon frère est grand et drôle.|Meu irmão é alto e engraçado.'], tip: 'Em francês, *cheveux* (cabelo) é sempre plural.' },
        ],
        vocab: ['grand|alto, grande|🦒', 'petit|baixo, pequeno|🐭', 'jeune|jovem|🧒', 'vieux|velho|🧓', 'beau|bonito|😍', 'drôle|engraçado|🤣', 'les yeux|os olhos|👀', 'les cheveux|o cabelo|💇'],
        sentences: ['Ma sœur est grande.|Minha irmã é alta.', 'Il a les yeux bleus.|Ele tem olhos azuis.', 'Mon grand-père est vieux mais drôle.|Meu avô é velho mas engraçado.', 'Elle a les cheveux longs.|Ela tem cabelo comprido.', 'Mes cousins sont très sympas.|Meus primos são muito simpáticos.'],
        quiz: [
          'Ma mère est ___.|petite|petit;petits;petites|*mère* é feminino singular → *petite*.',
          'Como dizer "Ele tem olhos verdes"?|Il a les yeux verts.|Il est les yeux verts.;Il a l\'œil vert.;Il a des yeux vert.|Olhos e cabelo com *avoir les…*',
          'Feminino de "beau":|belle|beaue;bele;beauté|Irregular: *beau → belle*.',
        ],
        fill: ['Elle a les ___ courts. (cabelo)|cheveux|Ela tem cabelo curto.|*cheveux* é sempre plural.', 'Mes frères sont ___. (altos)|grands|Meus irmãos são altos.|Masculino plural → *grands*.'],
      },
      {
        id: 'u3l4', title: 'Ne… pas', emoji: '🚫', goal: 'Fazer frases negativas',
        intro: 'Para negar em francês, o verbo fica “abraçado” por duas palavras: *ne* e *pas*.',
        teach: [
          { title: 'O sanduíche', text: '**ne + verbo + pas**\n*Je suis* → *Je ne suis pas*\n*J\'ai* → *Je n\'ai pas* (antes de vogal, *ne* vira *n\'*)', ex: ['Je ne suis pas fatigué.|Não estou cansado.', 'Il n\'a pas de voiture.|Ele não tem carro.', 'Nous n\'habitons pas ici.|Não moramos aqui.'] },
          { title: 'Pas de', text: 'Depois da negação, *un/une/des* vira **de** (ou *d\'*):\n*J\'ai un chien* → *Je n\'ai pas de chien*.', tip: 'Na fala do dia a dia, os franceses costumam “engolir” o *ne*: *Je sais pas* = não sei. Mas escreva sempre com *ne*!' },
        ],
        vocab: ['ne… pas|não', 'ne… jamais|nunca', 'ne… plus|não… mais', 'rien|nada', 'personne|ninguém', 'ici|aqui|📍'],
        sentences: ['Je ne suis pas français.|Não sou francês.', 'Elle n\'a pas de frère.|Ela não tem irmão.', 'Nous ne sommes pas en retard.|Não estamos atrasados.', 'Tu n\'as pas faim ?|Você não está com fome?', 'Il n\'habite plus ici.|Ele não mora mais aqui.'],
        quiz: [
          'Negue: "J\'ai un chat."|Je n\'ai pas de chat.|Je n\'ai pas un chat.;Je ne ai pas de chat.;Je pas ai chat.|*ne* vira *n\'* e *un* vira *de*.',
          'Onde fica o "pas"?|logo depois do verbo|antes do sujeito;no fim da frase;antes do verbo|*ne + verbo + pas*.',
          '"Il ne mange jamais" =|Ele nunca come.|Ele não come mais.;Ele não come nada.;Ele come sempre.|*ne… jamais* = nunca.',
        ],
        fill: ['Je ne suis ___ malade.|pas|Não estou doente.|*ne… pas*', 'Elle n\'a pas ___ enfants.|d\'|Ela não tem filhos.|*des* vira *de/d\'* na negativa.', 'Nous ___ sommes pas prêts.|ne|Não estamos prontos.|*ne* antes do verbo.'],
      },
      {
        id: 'u3story', story: true, title: 'La photo de famille', emoji: '📸', goal: 'História: mostrando fotos da família',
        intro: 'Raimundo mostra uma foto da família para a amiga Camille.',
        dialogue: [
          'Camille|C\'est ta famille sur la photo ?|É a sua família na foto?',
          'Raimundo|Oui ! Voici mon père et ma mère.|Sim! Aqui estão meu pai e minha mãe.',
          'Camille|Ta mère est très belle. Et lui, c\'est ton frère ?|Sua mãe é muito bonita. E ele, é seu irmão?',
          'Raimundo|Non, c\'est mon cousin Pedro. Je n\'ai pas de frère.|Não, é meu primo Pedro. Não tenho irmão.',
          'Camille|Il a les yeux verts ! Il est grand ?|Ele tem olhos verdes! Ele é alto?',
          'Raimundo|Oui, très grand. Et très drôle !|Sim, muito alto. E muito engraçado!',
        ],
        quiz: [
          'Quem é o rapaz na foto?|O primo de Raimundo|O irmão de Raimundo;O pai de Raimundo;O tio de Raimundo|*c\'est mon cousin Pedro*.',
          'Raimundo tem irmão?|Não|Sim, um;Sim, dois;Não sabemos|*Je n\'ai pas de frère.*',
          'Como é Pedro?|Alto e engraçado|Baixo e sério;Velho e simpático;Jovem e tímido|*très grand… très drôle*.',
        ],
        vocab: ['la photo|a foto|📸', 'voici|aqui está, eis|👉', 'lui|ele (tônico)|🫵'],
        sentences: ['C\'est ta famille ?|É a sua família?', 'Voici mon père.|Este é meu pai.', 'Je n\'ai pas de frère.|Não tenho irmão.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u4', level: 'A1', title: 'Au café', pt: 'No café', emoji: '🥐',
    desc: 'Comidas e bebidas, artigos, partitivos e como pedir num café ou restaurante.',
    lessons: [
      {
        id: 'u4l1', title: 'Manger et boire', emoji: '🥖', goal: 'Vocabulário de comidas e bebidas',
        intro: 'Croissant, baguete, café crème… o vocabulário mais gostoso do francês.',
        teach: [
          { title: 'Para comer', table: [['le pain', 'o pão'], ['le croissant', 'o croissant'], ['le fromage', 'o queijo'], ['la viande', 'a carne'], ['le poisson', 'o peixe'], ['la salade', 'a salada'], ['le gâteau', 'o bolo'], ['la pomme', 'a maçã']] },
          { title: 'Para beber', table: [['l\'eau (f.)', 'a água'], ['le café', 'o café'], ['le thé', 'o chá'], ['le lait', 'o leite'], ['le jus d\'orange', 'o suco de laranja'], ['le vin', 'o vinho'], ['la bière', 'a cerveja']], tip: '*Un café* na França é um espresso pequeno. Quer com leite? Peça *un café crème* ou *un crème*.' },
        ],
        vocab: ['le pain|o pão|🥖', 'le croissant|o croissant|🥐', 'le fromage|o queijo|🧀', 'le poisson|o peixe|🐟', 'la pomme|a maçã|🍎', 'le gâteau|o bolo|🍰', 'l\'eau|a água|💧', 'le café|o café|☕', 'le lait|o leite|🥛', 'le vin|o vinho|🍷'],
        sentences: ['J\'aime le fromage.|Eu gosto de queijo.', 'Le pain est chaud.|O pão está quente.', 'Elle boit du thé.|Ela bebe chá.', 'Le gâteau au chocolat est délicieux.|O bolo de chocolate é delicioso.', 'Je mange une pomme.|Eu como uma maçã.'],
        quiz: [
          '"Le poisson" é…|o peixe|o veneno;a ervilha;o frango|Cuidado: *poisson* (peixe) ≠ *poison* (veneno)!',
          'Em Paris, "un café" é…|um espresso pequeno|um café com leite;um cappuccino;um café coado grande|Para café com leite peça *un café crème*.',
          'Como se diz "a água"?|l\'eau|le eau;la eau;les eau|*eau* é feminino, mas começa com vogal → *l\'eau*.',
        ],
        fill: ['J\'aime le ___. (queijo)|fromage|Eu gosto de queijo.|*fromage* = queijo.', 'Un ___ au lait, s\'il vous plaît.|café|Um café com leite, por favor.|*café au lait* = café com leite.'],
      },
      {
        id: 'u4l2', title: 'Le, la, un, une', emoji: '🔤', goal: 'Artigos definidos e indefinidos',
        intro: 'Todo substantivo francês tem gênero. O artigo é a pista — aprenda sempre a palavra com ele!',
        teach: [
          { title: 'Definidos (o, a, os, as)', table: [['le', 'masculino', 'le pain'], ['la', 'feminino', 'la pomme'], ['l\'', 'antes de vogal/h', 'l\'eau, l\'hôtel'], ['les', 'plural', 'les croissants']] },
          { title: 'Indefinidos (um, uma, uns)', table: [['un', 'masculino', 'un café'], ['une', 'feminino', 'une bière'], ['des', 'plural', 'des fruits']], text: 'Em português às vezes omitimos o “uns/umas”, mas em francês *des* é obrigatório: *J\'ai des amis* = tenho amigos.', tip: 'O gênero nem sempre é igual ao português: *le lait* (o leite) ok, mas *la mer* (o mar) e *le lait*… Sempre memorize junto com o artigo.' },
        ],
        vocab: ['le|o', 'la|a', 'les|os, as', 'un|um', 'une|uma', 'des|uns, umas', 'la mer|o mar|🌊', 'les fruits|as frutas|🍇'],
        sentences: ['Je voudrais un croissant.|Eu queria um croissant.', 'La bière est fraîche.|A cerveja está gelada.', 'J\'ai des amis à Paris.|Tenho amigos em Paris.', 'L\'hôtel est grand.|O hotel é grande.', 'Les fruits sont bons.|As frutas são boas.'],
        quiz: [
          '___ eau est froide.|L\'|La;Le;Les|Antes de vogal: *l\'*.',
          'Tenho amigos → J\'ai ___ amis.|des|les;de;un|O plural indefinido *des* é obrigatório.',
          '"La mer" é…|o mar (feminino em francês)|a mãe;a carne;a maçã|Gênero diferente do português!',
        ],
        fill: ['Je voudrais ___ café. (um)|un|Eu queria um café.|*café* é masculino → *un*.', '___ pomme est rouge. (a)|La|A maçã é vermelha.|*pomme* é feminino → *la*.'],
      },
      {
        id: 'u4l3', title: 'Du, de la, des', emoji: '🧈', goal: 'Partitivos: quantidade indefinida',
        intro: 'Quando falamos de “um pouco de algo” — pão, água, queijo —, o francês usa o partitivo.',
        teach: [
          { title: 'Partitivo', text: 'Para coisas que não contamos (pão, água, sorte):', table: [['du', 'masculino', 'du pain'], ['de la', 'feminino', 'de la confiture'], ['de l\'', 'antes de vogal', 'de l\'eau'], ['des', 'plural', 'des fraises']], ex: ['Je mange du pain.|Eu como pão.', 'Tu veux de l\'eau ?|Você quer água?', 'Il boit de la bière.|Ele bebe cerveja.'] },
          { title: 'Gosto x consumo', text: 'Gostos usam o **definido**: *J\'aime le café* (gosto de café em geral).\nConsumo usa o **partitivo**: *Je bois du café* (bebo café — uma quantidade).\nNa negativa: *Je ne bois pas de café*.' },
          { title: 'Je voudrais', text: '*Je voudrais* = eu gostaria / eu queria. É a forma educada de pedir.', ex: ['Je voudrais de l\'eau, s\'il vous plaît.|Eu queria água, por favor.'] },
        ],
        vocab: ['du pain|pão (um pouco)|🥖', 'de la confiture|geleia|🍓', 'de l\'eau|água|💧', 'je voudrais|eu gostaria|🙋', 'le beurre|a manteiga|🧈', 'le sucre|o açúcar|🍬'],
        sentences: ['Je mange du pain avec du beurre.|Como pão com manteiga.', 'Je voudrais de l\'eau, s\'il vous plaît.|Eu queria água, por favor.', 'Tu prends du sucre ?|Você usa açúcar?', 'Je ne bois pas de vin.|Não bebo vinho.', 'J\'aime la confiture.|Gosto de geleia.'],
        quiz: [
          'Je bois ___ lait.|du|de la;le;des|Consumo de algo masculino → *du*.',
          'J\'aime ___ chocolat.|le|du;de;un|Com *aimer* (gosto geral) usa-se o definido.',
          'Negue: "Je mange de la viande."|Je ne mange pas de viande.|Je ne mange pas de la viande.;Je mange pas viande.;Je ne mange de viande.|Na negativa o partitivo vira *de*.',
        ],
        fill: ['Tu veux ___ l\'eau ?|de|Você quer água?|*de l\'eau*', 'Je mange ___ confiture.|de la|Como geleia.|Feminino → *de la*.', 'Je ___ un thé, s\'il vous plaît.|voudrais|Eu queria um chá, por favor.|*Je voudrais* = forma educada.'],
      },
      {
        id: 'u4l4', title: 'Commander', emoji: '🧾', goal: 'Pedir e pagar num café',
        intro: 'Agora é para valer: sente-se, chame o garçom, peça e pague a conta.',
        teach: [
          { title: 'Frases do garçom', ex: ['Vous désirez ?|O que deseja?', 'Et pour vous ?|E para o senhor?', 'Sur place ou à emporter ?|Para comer aqui ou para levar?', 'Autre chose ?|Mais alguma coisa?'] },
          { title: 'Suas frases', ex: ['Je voudrais un croissant, s\'il vous plaît.|Eu queria um croissant, por favor.', 'Je vais prendre une salade.|Vou querer uma salada.', 'L\'addition, s\'il vous plaît.|A conta, por favor.', 'C\'est combien ?|Quanto é?', 'Je peux payer par carte ?|Posso pagar com cartão?'], tip: 'Chame o garçom com *Monsieur !* ou *S\'il vous plaît !* — nunca com *Garçon !*, que soa rude hoje.' },
        ],
        vocab: ['l\'addition|a conta|🧾', 'la carte|o cardápio, o cartão|📜', 'combien|quanto|💶', 'payer|pagar|💳', 'à emporter|para levar|🥡', 'sur place|para comer aqui|🍽️', 'le serveur|o garçom|🤵'],
        sentences: ['L\'addition, s\'il vous plaît.|A conta, por favor.', 'C\'est combien ?|Quanto é?', 'Je vais prendre un café crème.|Vou querer um café com leite.', 'Sur place, merci.|Para comer aqui, obrigado.', 'Je peux payer par carte ?|Posso pagar com cartão?'],
        quiz: [
          'Como pedir a conta?|L\'addition, s\'il vous plaît.|La carte, s\'il vous plaît.;Le compte, merci.;C\'est l\'addition ?|*L\'addition* = a conta do restaurante.',
          '"À emporter" significa…|para levar|para comer aqui;para pagar;para dividir|*Emporter* = levar embora.',
          'Qual é a forma mais educada de chamar o garçom?|S\'il vous plaît !|Garçon !;Hé !;Toi !|*Garçon* soa ultrapassado e rude.',
        ],
        fill: ['C\'est ___ ?|combien|Quanto é?|*combien* = quanto.', 'Je vais ___ une salade.|prendre|Vou querer uma salada.|*prendre* = pegar, tomar, pedir.'],
        dialogue: ['Serveur|Bonjour ! Vous désirez ?|Olá! O que deseja?', 'Client|Je voudrais un café et un croissant.|Eu queria um café e um croissant.', 'Serveur|Sur place ou à emporter ?|Para comer aqui ou para levar?', 'Client|Sur place, s\'il vous plaît.|Aqui, por favor.', 'Serveur|Très bien. Autre chose ?|Muito bem. Mais alguma coisa?', 'Client|Non, merci. C\'est combien ?|Não, obrigado. Quanto é?'],
      },
      {
        id: 'u4story', story: true, title: 'Au bistrot', emoji: '🍷', goal: 'História: jantar no bistrô',
        intro: 'Camille e Raimundo jantam num bistrô. Será que ele consegue pedir tudo em francês?',
        dialogue: [
          'Serveur|Bonsoir ! Voici la carte.|Boa noite! Aqui está o cardápio.',
          'Raimundo|Merci. Qu\'est-ce que vous recommandez ?|Obrigado. O que o senhor recomenda?',
          'Serveur|Le poisson est excellent aujourd\'hui.|O peixe está excelente hoje.',
          'Raimundo|Alors, je vais prendre le poisson. Et de l\'eau, s\'il vous plaît.|Então vou querer o peixe. E água, por favor.',
          'Camille|Pour moi, une salade et un verre de vin rouge.|Para mim, uma salada e uma taça de vinho tinto.',
          'Serveur|Parfait. Un dessert après ?|Perfeito. Uma sobremesa depois?',
          'Camille|Peut-être un gâteau au chocolat !|Talvez um bolo de chocolate!',
        ],
        quiz: [
          'O que o garçom recomenda?|O peixe|A carne;A salada;O bolo|*Le poisson est excellent aujourd\'hui.*',
          'O que Raimundo bebe?|Água|Vinho tinto;Cerveja;Café|*de l\'eau, s\'il vous plaît*',
          '"Peut-être" significa…|talvez|claro;nunca;depois|*peut-être* = talvez.',
        ],
        vocab: ['recommander|recomendar|👍', 'aujourd\'hui|hoje|📆', 'un verre|um copo, uma taça|🥂', 'le dessert|a sobremesa|🍮', 'peut-être|talvez|🤷'],
        sentences: ['Qu\'est-ce que vous recommandez ?|O que o senhor recomenda?', 'Un verre de vin rouge.|Uma taça de vinho tinto.', 'Peut-être un dessert.|Talvez uma sobremesa.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u5', level: 'A1', title: 'Les nombres', pt: 'Números, horas e preços', emoji: '🕐',
    desc: 'Números até 100 (e a famosa matemática do francês), horas, dias e preços.',
    lessons: [
      {
        id: 'u5l1', title: '20 à 69', emoji: '🔢', goal: 'Contar de 20 a 69',
        intro: 'Depois do vinte o francês fica lógico — até o 69. Vamos lá!',
        teach: [
          { title: 'As dezenas', table: [['20', 'vingt'], ['30', 'trente'], ['40', 'quarante'], ['50', 'cinquante'], ['60', 'soixante']] },
          { title: 'Montando números', text: 'Dezena + hífen + unidade: *vingt-deux* (22), *trente-cinq* (35).\nCom o **1** usa-se *et*: *vingt et un* (21), *trente et un* (31) — sem hífen.', ex: ['vingt et un|21', 'trente-quatre|34', 'quarante-huit|48', 'cinquante et un|51', 'soixante-neuf|69'] },
        ],
        vocab: ['vingt|vinte', 'trente|trinta', 'quarante|quarenta', 'cinquante|cinquenta', 'soixante|sessenta', 'vingt et un|vinte e um', 'trente-deux|trinta e dois', 'quarante-cinq|quarenta e cinco'],
        sentences: ['J\'ai trente-deux ans.|Tenho trinta e dois anos.', 'Il y a vingt et un élèves.|Há vinte e um alunos.', 'Ça coûte quarante-cinq euros.|Custa quarenta e cinco euros.', 'Ma mère a cinquante-huit ans.|Minha mãe tem cinquenta e oito anos.'],
        quiz: [
          '31 em francês:|trente et un|trente-un;trente et une;trois-un|Com 1 usa-se *et*: *trente et un*.',
          '"Quarante-six" é…|46|36;56;64|*quarante* = 40, *six* = 6.',
          '60 em francês:|soixante|sixante;soixant;seizante|*soixante* (pronuncia “suassãt”).',
        ],
        fill: ['J\'ai ___-cinq ans. (25)|vingt|Tenho vinte e cinco anos.|25 = *vingt-cinq*.', 'Ça coûte ___ euros. (50)|cinquante|Custa cinquenta euros.|50 = *cinquante*.'],
      },
      {
        id: 'u5l2', title: '70 à 100', emoji: '🧮', goal: 'A matemática do 70, 80 e 90',
        intro: 'Aqui o francês faz conta! 70 é “sessenta-dez”, 80 é “quatro-vintes”…',
        teach: [
          { title: 'A lógica', table: [['70', 'soixante-dix', '60 + 10'], ['71', 'soixante et onze', '60 + 11'], ['75', 'soixante-quinze', '60 + 15'], ['80', 'quatre-vingts', '4 × 20'], ['81', 'quatre-vingt-un', '4 × 20 + 1'], ['90', 'quatre-vingt-dix', '4 × 20 + 10'], ['99', 'quatre-vingt-dix-neuf', '4 × 20 + 19'], ['100', 'cent', '']], tip: 'Na Bélgica e na Suíça dizem *septante* (70) e *nonante* (90). Bem mais fácil!' },
          { title: 'Detalhe do S', text: '*quatre-vingts* (80) tem **s**, mas *quatre-vingt-un* (81) perde o s.' },
        ],
        vocab: ['soixante-dix|setenta', 'quatre-vingts|oitenta', 'quatre-vingt-dix|noventa', 'cent|cem', 'soixante-quinze|setenta e cinco', 'quatre-vingt-cinq|oitenta e cinco'],
        sentences: ['Mon grand-père a quatre-vingt-deux ans.|Meu avô tem oitenta e dois anos.', 'C\'est soixante-dix euros.|São setenta euros.', 'Il y a cent personnes.|Há cem pessoas.', 'Le bus quatre-vingt-quinze.|O ônibus noventa e cinco.'],
        quiz: [
          '"Quatre-vingts" é…|80|24;84;48|4 × 20 = 80.',
          '75 em francês:|soixante-quinze|septante-cinq;soixante-dix-cinq;quatre-vingt-quinze|60 + 15 = *soixante-quinze*.',
          '"Quatre-vingt-dix-sept" =|97|87;77;47|80 + 17 = 97.',
        ],
        fill: ['C\'est ___ euros. (100)|cent|São cem euros.|100 = *cent*.', 'Il a quatre-___ ans. (80)|vingts|Ele tem oitenta anos.|80 = *quatre-vingts* (com s).'],
      },
      {
        id: 'u5l3', title: 'Quelle heure est-il ?', emoji: '⏰', goal: 'Dizer e perguntar as horas',
        intro: 'Que horas são? Na França usa-se muito o relógio de 24 horas.',
        teach: [
          { title: 'Estrutura', text: '*Il est* + número + *heure(s)*.\n*Il est une heure* (1h), *Il est trois heures* (3h).', ex: ['Quelle heure est-il ?|Que horas são?', 'Il est huit heures.|São oito horas.', 'Il est midi.|É meio-dia.', 'Il est minuit.|É meia-noite.'] },
          { title: 'Minutos e frações', table: [['et quart', 'e quinze'], ['et demie', 'e meia'], ['moins le quart', 'quinze para'], ['moins dix', 'dez para']], ex: ['Il est deux heures et demie.|São duas e meia.', 'Il est six heures moins le quart.|São quinze para as seis.', 'Le train part à 18 h 30.|O trem sai às 18h30.'] },
        ],
        vocab: ['l\'heure|a hora|⏰', 'midi|meio-dia|🕛', 'minuit|meia-noite|🌑', 'et quart|e quinze|🕒', 'et demie|e meia|🕧', 'le matin|a manhã|🌅', 'le soir|a noite|🌇'],
        sentences: ['Quelle heure est-il ?|Que horas são?', 'Il est sept heures du matin.|São sete da manhã.', 'On mange à midi.|A gente come ao meio-dia.', 'Le film commence à neuf heures et demie.|O filme começa às nove e meia.', 'Il est dix heures moins le quart.|São quinze para as dez.'],
        quiz: [
          '"Il est trois heures et quart" =|3h15|3h45;3h30;2h45|*et quart* = e quinze.',
          'Como dizer 12h?|Il est midi.|Il est douze.;Il est minuit.;C\'est midi heure.|12h = *midi*; 0h = *minuit*.',
          '"Cinq heures moins le quart" =|4h45|5h15;5h45;4h15|*moins le quart* = quinze para.',
        ],
        fill: ['Il est huit ___. (8h)|heures|São oito horas.|*heures* no plural.', 'Il est deux heures et ___. (2h30)|demie|São duas e meia.|*et demie* = e meia.'],
      },
      {
        id: 'u5l4', title: 'Les jours et les prix', emoji: '📆', goal: 'Dias da semana, meses e preços',
        intro: 'Marcar compromissos e entender preços: as últimas peças do nível A1.',
        teach: [
          { title: 'Dias da semana', text: 'Todos masculinos e com letra minúscula.', table: [['lundi', 'segunda'], ['mardi', 'terça'], ['mercredi', 'quarta'], ['jeudi', 'quinta'], ['vendredi', 'sexta'], ['samedi', 'sábado'], ['dimanche', 'domingo']], tip: '*Le lundi* = toda segunda. *Lundi* = nesta segunda.' },
          { title: 'Meses', text: '*janvier, février, mars, avril, mai, juin, juillet, août, septembre, octobre, novembre, décembre*\nDatas: *le 14 juillet*, *le premier mai* (dia 1 = *premier*).' },
          { title: 'Preços', ex: ['Ça coûte combien ?|Quanto custa?', 'Ça fait douze euros cinquante.|Dá doze euros e cinquenta.', 'C\'est trop cher !|É caro demais!', 'C\'est pas cher.|É barato.'] },
        ],
        vocab: ['lundi|segunda-feira|📅', 'vendredi|sexta-feira|🎉', 'samedi|sábado|🛍️', 'dimanche|domingo|😴', 'janvier|janeiro|❄️', 'août|agosto|☀️', 'cher|caro|💸', 'l\'euro|o euro|💶'],
        sentences: ['On se voit samedi ?|A gente se vê no sábado?', 'Mon anniversaire est le 3 mars.|Meu aniversário é dia 3 de março.', 'Ça coûte combien ?|Quanto custa?', 'C\'est trop cher !|É caro demais!', 'Le lundi, je travaille.|Às segundas eu trabalho.'],
        quiz: [
          '"Mercredi" é…|quarta-feira|terça-feira;quinta-feira;sexta-feira|*mercredi* = quarta.',
          'Como dizer "1º de maio"?|le premier mai|le un mai;le une mai;le premier de mai|Dia 1 = *premier*.',
          '"C\'est trop cher" =|É caro demais.|É muito barato.;É querido.;É bem pouco.|*cher* = caro (e também “querido”).',
        ],
        fill: ['Ça coûte ___ ?|combien|Quanto custa?|*combien* = quanto.', 'Le ___, je me repose. (domingo)|dimanche|Aos domingos eu descanso.|*dimanche* = domingo.'],
        bank: 'numbers',
      },
      {
        id: 'u5story', story: true, title: 'Au marché', emoji: '🧺', goal: 'História: compras na feira',
        intro: 'Sábado de manhã, Raimundo vai à feira comprar frutas e queijo.',
        dialogue: [
          'Vendeuse|Bonjour monsieur ! Qu\'est-ce que je vous sers ?|Bom dia, senhor! O que vai ser?',
          'Raimundo|Bonjour ! Je voudrais un kilo de pommes, s\'il vous plaît.|Bom dia! Eu queria um quilo de maçãs, por favor.',
          'Vendeuse|Voilà. Autre chose ?|Aqui está. Mais alguma coisa?',
          'Raimundo|Oui, ce fromage. Ça coûte combien ?|Sim, este queijo. Quanto custa?',
          'Vendeuse|Douze euros le kilo.|Doze euros o quilo.',
          'Raimundo|Alors deux cents grammes. Ça fait combien en tout ?|Então duzentos gramas. Quanto dá no total?',
          'Vendeuse|Ça fait cinq euros quarante. Bon week-end !|Dá cinco euros e quarenta. Bom fim de semana!',
        ],
        quiz: [
          'Quanto de maçã Raimundo compra?|1 quilo|200 gramas;2 quilos;12 maçãs|*un kilo de pommes*',
          'Quanto custa o quilo do queijo?|12 euros|5,40 euros;20 euros;2 euros|*Douze euros le kilo.*',
          'Qual o total?|5,40 euros|12 euros;4,50 euros;15,40 euros|*cinq euros quarante*',
        ],
        vocab: ['un kilo|um quilo|⚖️', 'voilà|aqui está|🤲', 'en tout|no total|➕', 'le week-end|o fim de semana|🏖️'],
        sentences: ['Je voudrais un kilo de pommes.|Eu queria um quilo de maçãs.', 'Ça fait combien en tout ?|Quanto dá no total?', 'Bon week-end !|Bom fim de semana!'],
      },
    ],
  },
];
