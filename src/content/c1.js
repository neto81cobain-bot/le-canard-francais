// Nível C1 — unidades 17 a 20.
export default [
  // ════════════════════════════════════════════════════════
  {
    id: 'u17', level: 'C1', title: 'Le subjonctif avancé', pt: 'Subjuntivo avançado', emoji: '🧠',
    desc: 'Subjuntivo depois de emoções, dúvidas e conjunções; subjuntivo passado; indicativo × subjuntivo.',
    verbs: ['être', 'avoir', 'faire', 'pouvoir', 'savoir', 'venir', 'partir', 'comprendre', 'vouloir', 'aller'], tenses: ['subjonctif'],
    lessons: [
      {
        id: 'u17l1', title: 'Je suis content que…', emoji: '😊', goal: 'Subjuntivo com sentimentos e dúvidas',
        intro: 'Fico feliz que você esteja aqui. Duvido que ele venha. Emoções e dúvidas pedem subjuntivo.',
        teach: [
          { title: 'Quando o subjuntivo aparece', table: [['emoção', 'je suis content que, j\'ai peur que, je regrette que'], ['vontade', 'je veux que, je souhaite que, j\'aimerais que'], ['dúvida', 'je doute que, il est possible que'], ['necessidade', 'il faut que, il est important que'], ['opinião negativa', 'je ne pense pas que, je ne crois pas que']], ex: ['Je suis ravi que tu sois là.|Estou encantado que você esteja aqui.', 'Je doute qu\'il vienne.|Duvido que ele venha.', 'Il est possible qu\'elle ait raison.|É possível que ela tenha razão.'] },
          { title: 'Indicativo × subjuntivo', text: '*Je pense qu\'il **est** là* (certeza → indicativo).\n*Je ne pense pas qu\'il **soit** là* (dúvida → subjuntivo).\n*Je suis sûr qu\'il **viendra*** × *Je ne suis pas sûr qu\'il **vienne***.', tip: 'Mesmo sujeito? Use infinitivo: *Je suis content **de** partir* (e não *que je parte*).' },
        ],
        vocab: ['je souhaite que|desejo que|🌠', 'je doute que|duvido que|🤨', 'j\'ai peur que|tenho medo que|😨', 'il est possible que|é possível que|🎲', 'je regrette que|lamento que|😔', 'ravi|encantado|😍'],
        sentences: ['Je suis contente que tu puisses venir.|Estou contente que você possa vir.', 'J\'ai peur qu\'il soit trop tard.|Tenho medo de que seja tarde demais.', 'Je ne crois pas qu\'elle sache la vérité.|Não acredito que ela saiba a verdade.', 'Il est important que vous compreniez.|É importante que vocês entendam.', 'Je souhaite que tout aille bien.|Desejo que tudo corra bem.'],
        quiz: [
          'Je doute qu\'il ___ raison. (avoir)|ait|a;aura;avait|Dúvida → subjuntivo: *qu\'il ait*.',
          'Je pense qu\'il ___ là. (être)|est|soit;sera être;serait être|Certeza (afirmativa) → indicativo.',
          'Je ne pense pas qu\'il ___ là. (être)|soit|est;sera;était|Negativa de opinião → subjuntivo.',
          'Je suis content ___ partir. (eu mesmo)|de|que je;à;pour que|Mesmo sujeito → *de* + infinitivo.',
        ],
        fill: ['Je suis ravi que tu ___ là. (être)|sois|Estou encantado que você esteja aqui.|*que tu sois*.', 'Il est possible qu\'elle ___ demain. (venir)|vienne|É possível que ela venha amanhã.|*ils viennent* → *qu\'elle vienne*.'],
      },
      {
        id: 'u17l2', title: 'Bien que, pour que', emoji: '🧷', goal: 'Conjunções que pedem subjuntivo',
        intro: 'Embora, para que, antes que, sem que, até que — todas elas puxam o subjuntivo.',
        teach: [
          { title: 'Conjunções + subjuntivo', table: [['bien que / quoique', 'embora'], ['pour que / afin que', 'para que'], ['avant que', 'antes que'], ['sans que', 'sem que'], ['jusqu\'à ce que', 'até que'], ['à condition que', 'desde que, com a condição de que'], ['de peur que', 'com medo de que'], ['à moins que', 'a menos que']] },
          { title: 'Atenção', text: '*Après que* pede **indicativo** (o fato já aconteceu): *après qu\'il est parti*.\n*Avant que* pede **subjuntivo**: *avant qu\'il parte*.', ex: ['Bien qu\'il pleuve, on sort.|Embora chova, a gente sai.', 'Je parle lentement pour que tu comprennes.|Falo devagar para que você entenda.', 'Partons avant qu\'il soit trop tard.|Vamos antes que seja tarde demais.', 'Je resterai jusqu\'à ce que tu reviennes.|Ficarei até que você volte.'] },
        ],
        vocab: ['bien que|embora|🤷', 'pour que|para que|🎯', 'avant que|antes que|⏮️', 'sans que|sem que|🚫', 'jusqu\'à ce que|até que|🏁', 'à condition que|desde que|📜', 'à moins que|a menos que|❓'],
        sentences: ['Bien qu\'elle soit fatiguée, elle travaille.|Embora esteja cansada, ela trabalha.', 'Je t\'explique pour que tu saches.|Te explico para que você saiba.', 'Il est parti sans que je le voie.|Ele saiu sem que eu o visse.', 'Tu peux sortir à condition que tu rentres avant minuit.|Você pode sair desde que volte antes da meia-noite.', 'On ira à la plage, à moins qu\'il pleuve.|Iremos à praia, a menos que chova.'],
        quiz: [
          'Bien qu\'il ___ riche, il est simple. (être)|soit|est;sera;était|*bien que* + subjuntivo.',
          'Après qu\'il ___ parti, on a mangé.|est|soit;fût être;sera|*après que* pede indicativo.',
          'Je travaille pour que mes enfants ___ étudier. (pouvoir)|puissent|peuvent;pourront;pouvaient|*pour que* + subjuntivo.',
        ],
        fill: ['Partons avant qu\'il ___ trop tard. (être)|soit|Vamos antes que seja tarde demais.|*avant que* + subjuntivo.', 'Je t\'attendrai jusqu\'à ce que tu ___. (revenir)|reviennes|Vou te esperar até você voltar.|*ils reviennent* → *que tu reviennes*.'],
      },
      {
        id: 'u17l3', title: 'Qu\'il ait fini', emoji: '✔️', goal: 'Subjuntivo passado',
        intro: 'Estou feliz que você **tenha vindo**. O subjuntivo também tem passado.',
        teach: [
          { title: 'Formação', text: '**avoir/être no subjuntivo** + **particípio**:\n*que j\'aie fini*, *que tu sois venu(e)*, *qu\'ils aient compris*.', table: [['que j\'', 'aie parlé'], ['que tu', 'sois parti(e)'], ['qu\'il', 'ait compris'], ['que nous', 'ayons fini'], ['que vous', 'soyez arrivé(e)s'], ['qu\'ils', 'aient vu']] },
          { title: 'Uso', text: 'Ação **anterior** à do verbo principal:\n*Je suis content que tu **viennes*** (agora/futuro) × *Je suis content que tu **sois venu*** (já veio).', ex: ['Je suis désolé que tu aies attendu.|Sinto muito que você tenha esperado.', 'Bien qu\'il ait étudié, il a raté l\'examen.|Embora tenha estudado, ele foi mal na prova.', 'C\'est le meilleur film que j\'aie jamais vu.|É o melhor filme que eu já vi.'], tip: 'Depois de superlativos (*le meilleur… que*, *le seul… que*) o subjuntivo é comum no registro cuidado.' },
        ],
        vocab: ['désolé|desolado, sinto muito|😔', 'rater|falhar, perder|❌', 'jamais|já (em superlativos), nunca|♾️', 'le seul|o único|☝️'],
        sentences: ['Je suis heureux que vous soyez venus.|Estou feliz que vocês tenham vindo.', 'Il est dommage qu\'elle soit partie si tôt.|É uma pena que ela tenha ido tão cedo.', 'Bien que nous ayons couru, nous avons raté le train.|Embora tenhamos corrido, perdemos o trem.', 'C\'est la plus belle ville que j\'aie visitée.|É a cidade mais bonita que já visitei.'],
        quiz: [
          'Je suis content que tu ___ venu. (já veio)|sois|es;aies;seras|*venir* usa *être*: *que tu sois venu*.',
          'Bien qu\'il ___ étudié, il a échoué.|ait|a;aie;avait|*bien que* + subjuntivo passado: *qu\'il ait étudié*.',
          'C\'est le seul livre que j\'___ lu.|aie|ai;aurais;avais|Depois de *le seul… que* → subjuntivo (registro cuidado).',
        ],
        fill: ['Je regrette que tu ___ attendu. (avoir)|aies|Lamento que você tenha esperado.|*que tu aies*.', 'Il est dommage qu\'ils ___ partis. (être)|soient|É uma pena que eles tenham ido.|*partir* → *être*: *qu\'ils soient partis*.'],
      },
      {
        id: 'u17l4', title: 'Nuances', emoji: '🎨', goal: 'Expressões de concessão e hipótese',
        intro: 'Seja como for, quem quer que seja, por mais que… Expressões elegantes do francês culto.',
        teach: [
          { title: 'Concessão elegante', table: [['quoi que tu fasses', 'o que quer que você faça'], ['qui que ce soit', 'quem quer que seja'], ['où que tu ailles', 'aonde quer que você vá'], ['quel que soit', 'qualquer que seja'], ['si… que + subj.', 'por mais… que'], ['avoir beau + inf.', 'por mais que (em vão)']] },
          { title: 'Exemplos', ex: ['Quoi que tu dises, je t\'aime.|O que quer que você diga, eu te amo.', 'Où que tu ailles, je te suivrai.|Aonde quer que você vá, eu te seguirei.', 'Quel que soit le prix, je l\'achète.|Qualquer que seja o preço, eu compro.', 'J\'ai beau essayer, je n\'y arrive pas.|Por mais que eu tente, não consigo.'], tip: '*Avoir beau* é muito francês e não tem equivalente direto: *Il a beau être riche, il n\'est pas heureux* (Por mais rico que seja, não é feliz).' },
        ],
        vocab: ['quoi que|o que quer que|🌀', 'où que|aonde quer que|🗺️', 'quel que soit|qualquer que seja|🎲', 'avoir beau|por mais que|💪', 'y arriver|conseguir|🏆'],
        sentences: ['Quoi qu\'il arrive, je serai là.|Aconteça o que acontecer, estarei lá.', 'Quelle que soit ta décision, je la respecte.|Qualquer que seja sua decisão, eu respeito.', 'Il a beau travailler, il ne gagne pas assez.|Por mais que trabalhe, ele não ganha o suficiente.', 'Qui que ce soit, ne réponds pas.|Seja quem for, não responda.'],
        quiz: [
          '"J\'ai beau chercher" significa…|Por mais que eu procure (sem sucesso)|Procuro bem;Procurar é bonito;Tenho que procurar|*avoir beau* + infinitivo = em vão.',
          'Quoi que tu ___, je t\'aide. (faire)|fasses|fais;feras;faisais|*quoi que* + subjuntivo.',
          '___ soit le résultat, je suis fier. (Qualquer que seja, masc.)|Quel que|Quelle que;Quoi que;Quelque|Concorda com *résultat* (masc.): *quel que soit*.',
        ],
        fill: ['Où que tu ___, je te suivrai. (aller)|ailles|Aonde quer que você vá, te seguirei.|*que tu ailles*.', 'Quoi qu\'il ___, je reste. (arriver)|arrive|Aconteça o que acontecer, eu fico.|*qu\'il arrive* (subjuntivo).'],
      },
      {
        id: 'u17story', story: true, title: 'La lettre', emoji: '✉️', goal: 'História: uma carta emocionante',
        intro: 'Camille lê para Raimundo uma carta antiga de sua avó.',
        dialogue: [
          'Camille|« Ma chère petite, je suis si heureuse que tu sois née. »|“Minha querida pequena, estou tão feliz que você tenha nascido.”',
          'Camille|« Où que tu ailles, n\'oublie jamais d\'où tu viens. »|“Aonde quer que você vá, nunca esqueça de onde veio.”',
          'Raimundo|C\'est magnifique. Elle l\'a écrite quand ?|Que lindo. Ela escreveu quando?',
          'Camille|Avant que je parte faire mes études. Bien qu\'elle ait été malade, elle a écrit chaque semaine.|Antes de eu ir estudar. Embora tenha estado doente, ela escreveu toda semana.',
          'Raimundo|Il faut que tu gardes ces lettres précieusement.|Você precisa guardar essas cartas com carinho.',
          'Camille|Je les garderai, quoi qu\'il arrive.|Vou guardá-las, aconteça o que acontecer.',
        ],
        quiz: [
          'Quem escreveu a carta?|A avó de Camille|A mãe de Camille;Raimundo;Uma amiga|*une lettre de sa grand-mère*',
          'Quando a avó escreveu as cartas?|Antes de Camille ir estudar|Depois do casamento;Na infância de Camille;No Natal|*Avant que je parte faire mes études.*',
          'Qual conselho da carta?|Nunca esquecer de onde veio|Viajar muito;Estudar medicina;Voltar logo|*n\'oublie jamais d\'où tu viens*',
        ],
        vocab: ['la lettre|a carta|✉️', 'précieusement|com muito cuidado|💎', 'faire ses études|estudar (na faculdade)|🎓', 'chaque semaine|toda semana|📅'],
        sentences: ['Je suis si heureuse que tu sois née.|Estou tão feliz que você tenha nascido.', 'N\'oublie jamais d\'où tu viens.|Nunca esqueça de onde você vem.', 'Je les garderai, quoi qu\'il arrive.|Vou guardá-las, aconteça o que acontecer.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u18', level: 'C1', title: 'Le discours rapporté', pt: 'Discurso indireto', emoji: '🗨️',
    desc: 'Contar o que alguém disse: discurso indireto, concordância dos tempos e verbos introdutórios.',
    verbs: ['dire', 'demander', 'répondre', 'expliquer', 'promettre', 'annoncer', 'savoir'], tenses: ['imparfait', 'plus_que_parfait', 'conditionnel'],
    lessons: [
      {
        id: 'u18l1', title: 'Il dit que…', emoji: '💬', goal: 'Discurso indireto no presente',
        intro: 'Ele diz que está cansado. Quando o verbo introdutório está no presente, quase nada muda.',
        teach: [
          { title: 'O que muda', text: 'Pronomes e possessivos se adaptam ao novo falante:\n*Paul : « Je suis fatigué. »* → *Paul dit qu\'**il** est fatigué.*\n*Marie : « Mon frère arrive. »* → *Marie dit que **son** frère arrive.*' },
          { title: 'Perguntas indiretas', table: [['pergunta sim/não', 'si', 'Il demande si tu viens.'], ['qu\'est-ce que', 'ce que', 'Il demande ce que tu veux.'], ['qu\'est-ce qui', 'ce qui', 'Il demande ce qui se passe.'], ['où, quand, comment, pourquoi', 'iguais', 'Il demande où tu habites.']], tip: 'Na pergunta indireta **não** há inversão nem ponto de interrogação: *Il demande où tu vas.*' },
          { title: 'Ordens', text: 'Imperativo → **de + infinitivo**: *« Ferme la porte ! »* → *Il me dit **de fermer** la porte.*' },
        ],
        vocab: ['dire que|dizer que|💬', 'demander si|perguntar se|❓', 'ce que|o que (objeto)', 'ce qui|o que (sujeito)', 'répondre que|responder que|↩️', 'se passer|acontecer|⚡'],
        sentences: ['Elle dit qu\'elle est en retard.|Ela diz que está atrasada.', 'Il me demande si je parle anglais.|Ele me pergunta se eu falo inglês.', 'Je ne sais pas ce que tu veux.|Não sei o que você quer.', 'Dis-moi ce qui se passe.|Me diga o que está acontecendo.', 'Le médecin me dit de me reposer.|O médico me diz para descansar.'],
        quiz: [
          '« Tu viens ? » → Il demande ___ tu viens.|si|que;ce que;quoi|Pergunta sim/não → *si*.',
          '« Qu\'est-ce que tu fais ? » → Il demande ___ tu fais.|ce que|qu\'est-ce que;que;quoi|*qu\'est-ce que* → *ce que*.',
          '« Ferme la fenêtre ! » → Elle me dit ___ la fenêtre.|de fermer|que je ferme;fermer;ferme|Ordem → *de* + infinitivo.',
        ],
        fill: ['Il demande ___ se passe. (o que)|ce qui|Ele pergunta o que está acontecendo.|*qu\'est-ce qui* → *ce qui*.', 'Paul dit qu\'___ est malade. (ele)|il|Paul diz que está doente.|*je* vira *il*.'],
      },
      {
        id: 'u18l2', title: 'Il a dit qu\'il viendrait', emoji: '🔁', goal: 'Concordância dos tempos',
        intro: 'Ele disse que viria. Quando o verbo introdutório está no passado, os tempos “recuam”.',
        teach: [
          { title: 'A tabela do recuo', table: [['présent', '→ imparfait', '« Je suis prêt » → il a dit qu\'il était prêt'], ['passé composé', '→ plus-que-parfait', '« J\'ai fini » → il a dit qu\'il avait fini'], ['futur', '→ conditionnel', '« Je viendrai » → il a dit qu\'il viendrait'], ['futur proche', '→ allait + inf.', '« Je vais partir » → il a dit qu\'il allait partir'], ['imparfait / PQP / cond.', 'não mudam', '']] },
          { title: 'Marcadores de tempo', table: [['aujourd\'hui', 'ce jour-là'], ['hier', 'la veille'], ['demain', 'le lendemain'], ['la semaine prochaine', 'la semaine suivante'], ['maintenant', 'à ce moment-là'], ['ici', 'là']], tip: 'Em português acontece o mesmo: “ele disse que **viria**”. Confie na intuição!' },
        ],
        vocab: ['la veille|a véspera, o dia anterior|⏮️', 'le lendemain|o dia seguinte|⏭️', 'à ce moment-là|naquele momento|📍', 'annoncer|anunciar|📢', 'affirmer|afirmar|☝️', 'avouer|confessar|🙊'],
        sentences: ['Il a dit qu\'il était fatigué.|Ele disse que estava cansado.', 'Elle m\'a promis qu\'elle viendrait.|Ela me prometeu que viria.', 'Ils ont annoncé qu\'ils avaient gagné.|Eles anunciaram que tinham ganhado.', 'Il a expliqué qu\'il allait déménager le lendemain.|Ele explicou que ia se mudar no dia seguinte.', 'Je lui ai demandé où il habitait.|Perguntei a ele onde morava.'],
        quiz: [
          '« Je viendrai. » → Il a dit qu\'il ___.|viendrait|viendra;venait;vient|Futuro → conditionnel.',
          '« J\'ai perdu mes clés. » → Elle a dit qu\'elle ___ ses clés.|avait perdu|a perdu;perdait;aurait perdu|Passé composé → plus-que-parfait.',
          '« Demain » no discurso indireto passado vira…|le lendemain|la veille;hier;demain matin|*demain* → *le lendemain*.',
          '« Je suis content. » → Il a dit qu\'il ___ content.|était|est;sera;soit|Presente → imparfait.',
        ],
        fill: ['« Je pars. » → Il a dit qu\'il ___. (partir)|partait|“Eu vou embora.” → Ele disse que ia embora.|Presente → imparfait.', 'Elle a promis qu\'elle ___. (appeler, futuro no passado)|appellerait|Ela prometeu que ligaria.|Futuro → conditionnel: *appellerait*.'],
      },
      {
        id: 'u18l3', title: 'Verbes introducteurs', emoji: '📣', goal: 'Variar os verbos de fala',
        intro: 'Um bom narrador não usa só “dizer”. Vamos enriquecer o vocabulário.',
        teach: [
          { title: 'Além de "dire"', table: [['affirmer', 'afirmar'], ['prétendre', 'alegar'], ['avouer', 'confessar'], ['admettre', 'admitir'], ['nier', 'negar'], ['se plaindre', 'reclamar'], ['suggérer', 'sugerir'], ['rappeler', 'lembrar (alguém)'], ['ajouter', 'acrescentar'], ['s\'exclamer', 'exclamar']] },
          { title: 'Com infinitivo', text: 'Vários verbos aceitam **de + infinitivo** quando o sujeito é o mesmo:\n*Il a avoué **avoir menti*** (infinitivo passado).\n*Elle a promis **de venir***.\n*Ils ont refusé **de répondre***.', tip: '*Prétendre* é falso cognato: significa **alegar**, não “pretender”.' },
        ],
        vocab: ['affirmer|afirmar|☝️', 'avouer|confessar|🙊', 'nier|negar|🙅', 'prétendre|alegar|🤥', 'ajouter|acrescentar|➕', 'refuser de|recusar-se a|✋'],
        sentences: ['Il a avoué qu\'il avait menti.|Ele confessou que tinha mentido.', 'Elle nie avoir pris l\'argent.|Ela nega ter pegado o dinheiro.', 'Il prétend être le meilleur.|Ele alega ser o melhor.', 'Elle a ajouté qu\'elle était désolée.|Ela acrescentou que sentia muito.', 'Ils ont refusé de répondre.|Eles se recusaram a responder.'],
        quiz: [
          '"Prétendre" significa…|alegar|pretender;fingir;prender|Falso cognato!',
          '"Nier" significa…|negar|ninar;nascer;notar|*nier* = negar.',
          'Il a avoué ___ menti.|avoir|d\'avoir été;qu\'il ment;être|Infinitivo passado: *avoir* + particípio.',
        ],
        fill: ['Elle a refusé ___ venir.|de|Ela se recusou a vir.|*refuser de* + infinitivo.', 'Il a ___ qu\'il avait tort. (admitiu)|admis|Ele admitiu que estava errado.|*admettre* → *admis*.'],
      },
      {
        id: 'u18l4', title: 'Les médias', emoji: '📰', goal: 'Entender notícias e reportagens',
        intro: 'Segundo fontes, o governo teria… Linguagem jornalística para ler o *Le Monde*.',
        teach: [
          { title: 'Expressões da imprensa', table: [['selon', 'segundo'], ['d\'après', 'de acordo com'], ['il paraît que', 'parece que, dizem que'], ['conditionnel', 'informação não confirmada'], ['le gouvernement', 'o governo'], ['une enquête', 'uma investigação, uma pesquisa'], ['les élections', 'as eleições'], ['la grève', 'a greve']], ex: ['Selon la police, il y aurait trois blessés.|Segundo a polícia, haveria três feridos.', 'D\'après le journal, le prix va augmenter.|De acordo com o jornal, o preço vai aumentar.'] },
          { title: 'Manchetes', text: 'Manchetes costumam omitir verbos e artigos: *Grève à la SNCF : trafic perturbé* (Greve na SNCF: tráfego interrompido).', tip: 'Ouvir *France Info* ou ler *20 minutes* (curtinho) é um ótimo treino de nível C1.' },
        ],
        vocab: ['selon|segundo|📰', 'd\'après|de acordo com|📋', 'l\'enquête|a investigação, a pesquisa|🔍', 'la grève|a greve|🪧', 'augmenter|aumentar|📈', 'baisser|baixar|📉', 'le gouvernement|o governo|🏛️'],
        sentences: ['Selon les experts, la température va augmenter.|Segundo os especialistas, a temperatura vai aumentar.', 'Il paraît qu\'il y aura une grève demain.|Parece que haverá greve amanhã.', 'Le suspect aurait quitté le pays.|O suspeito teria deixado o país.', 'Une enquête a été ouverte.|Uma investigação foi aberta.', 'Les prix ont baissé ce mois-ci.|Os preços baixaram este mês.'],
        quiz: [
          '"Le suspect aurait fui" indica…|informação não confirmada|certeza absoluta;uma ordem;um desejo|Conditionnel jornalístico.',
          '"Selon" significa…|segundo|sozinho;sempre;sem|*selon* = segundo, conforme.',
          '"Il paraît que" significa…|dizem que, parece que|ele aparece;ele parece doente;ele para|Expressão de boato.',
        ],
        fill: ['___ la météo, il va pleuvoir. (segundo)|Selon|Segundo a previsão, vai chover.|*selon* = segundo.', 'Une ___ a été ouverte. (investigação)|enquête|Uma investigação foi aberta.|*enquête* = investigação.'],
      },
      {
        id: 'u18story', story: true, title: 'Le malentendu', emoji: '🤦', goal: 'História: um mal-entendido',
        intro: 'Hugo conta para Raimundo uma confusão que aconteceu com Léa.',
        dialogue: [
          'Hugo|Léa m\'avait dit qu\'elle viendrait à la fête.|A Léa tinha me dito que viria à festa.',
          'Raimundo|Et elle n\'est pas venue ?|E ela não veio?',
          'Hugo|Non ! Le lendemain, elle m\'a expliqué qu\'elle avait cru que c\'était samedi.|Não! No dia seguinte, ela me explicou que tinha achado que era sábado.',
          'Raimundo|Tu lui avais dit que c\'était vendredi ?|Você tinha dito a ela que era sexta?',
          'Hugo|Je pensais que je le lui avais dit… Elle prétend que non.|Achei que tinha dito… Ela alega que não.',
          'Raimundo|Il paraît que c\'est toi qui t\'es trompé !|Parece que foi você que se enganou!',
        ],
        quiz: [
          'O que Léa tinha dito?|Que viria à festa|Que não viria;Que estava doente;Que ia viajar|*qu\'elle viendrait à la fête*',
          'Por que ela não foi?|Achou que a festa era no sábado|Estava doente;Esqueceu;Não foi convidada|*elle avait cru que c\'était samedi*',
          '"Le lendemain" significa…|no dia seguinte|na véspera;na mesma noite;uma semana depois|*lendemain* = dia seguinte.',
        ],
        vocab: ['le malentendu|o mal-entendido|🤦', 'croire|achar, acreditar|💭', 'se tromper|enganar-se|❌'],
        sentences: ['Elle m\'avait dit qu\'elle viendrait.|Ela tinha me dito que viria.', 'Elle prétend que non.|Ela alega que não.', 'C\'est toi qui t\'es trompé !|Foi você que se enganou!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u19', level: 'C1', title: 'Le registre formel', pt: 'Francês formal e escrito', emoji: '🎩',
    desc: 'E-mails e cartas formais, entrevista de emprego, conectores do texto argumentativo e inversão.',
    verbs: ['vouloir', 'pouvoir', 'permettre', 'recevoir', 'remercier', 'souhaiter', 'prier'], tenses: ['conditionnel', 'present', 'subjonctif'],
    lessons: [
      {
        id: 'u19l1', title: 'Madame, Monsieur', emoji: '📧', goal: 'Escrever e-mails formais',
        intro: 'O e-mail formal francês tem fórmulas fixas — e elas impressionam qualquer recrutador.',
        teach: [
          { title: 'Abertura', table: [['Madame, Monsieur,', 'Prezados (destinatário desconhecido)'], ['Madame la Directrice,', 'Prezada diretora'], ['Bonjour Madame Dupont,', 'Olá, Sra. Dupont (menos formal)'], ['Je me permets de vous écrire…', 'Tomo a liberdade de lhe escrever…'], ['Suite à notre conversation…', 'Em seguida à nossa conversa…']] },
          { title: 'Fechamento', table: [['Je vous remercie par avance.', 'Agradeço desde já.'], ['Dans l\'attente de votre réponse,', 'No aguardo de sua resposta,'], ['Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.', 'Atenciosamente (muito formal)'], ['Cordialement,', 'Cordialmente (padrão por e-mail)'], ['Bien à vous,', 'Um abraço (formal, mas cordial)']], tip: 'Por e-mail, *Cordialement* resolve 90% dos casos. A fórmula longa com *veuillez agréer* é para cartas oficiais.' },
        ],
        vocab: ['cordialement|cordialmente|✉️', 'ci-joint|em anexo|📎', 'je me permets de|tomo a liberdade de|🙏', 'dans l\'attente de|no aguardo de|⏳', 'suite à|em seguida a, após|➡️', 'la candidature|a candidatura|📄'],
        sentences: ['Madame, Monsieur, je me permets de vous contacter au sujet de l\'offre d\'emploi.|Prezados, tomo a liberdade de contatá-los sobre a vaga de emprego.', 'Veuillez trouver ci-joint mon CV.|Segue em anexo meu currículo.', 'Je vous remercie par avance de votre réponse.|Agradeço desde já sua resposta.', 'Dans l\'attente de votre retour, je vous prie d\'agréer mes salutations distinguées.|No aguardo de seu retorno, atenciosamente.', 'Suite à notre entretien téléphonique, je vous envoie le document.|Após nossa conversa telefônica, envio o documento.'],
        quiz: [
          'Abertura para destinatário desconhecido:|Madame, Monsieur,|Salut,;Cher ami,;Coucou,|Fórmula padrão formal.',
          '"Ci-joint" significa…|em anexo|aqui junto de mim;abaixo;juntos|Usado para anexos.',
          'Fechamento padrão de e-mail profissional:|Cordialement,|Bisous,;À plus,;Ciao,|*Cordialement* é o mais usado.',
        ],
        fill: ['Veuillez trouver ___ mon CV.|ci-joint|Segue em anexo meu currículo.|*ci-joint* = em anexo.', 'Je vous ___ par avance. (agradeço)|remercie|Agradeço desde já.|*remercier* = agradecer.'],
      },
      {
        id: 'u19l2', title: 'L\'entretien d\'embauche', emoji: '💼', goal: 'Entrevista de emprego',
        intro: 'Fale da sua experiência, qualidades e projetos — com o vocabulário profissional certo.',
        teach: [
          { title: 'Apresentar-se', ex: ['J\'ai cinq ans d\'expérience dans le secteur de l\'environnement.|Tenho cinco anos de experiência no setor ambiental.', 'Je suis titulaire d\'un diplôme en gestion environnementale.|Sou formado em gestão ambiental.', 'J\'ai été chargé de la coordination d\'un projet.|Fui responsável pela coordenação de um projeto.', 'Je maîtrise les outils de géomatique.|Domino as ferramentas de geoprocessamento.'] },
          { title: 'Qualidades e perguntas', table: [['rigoureux / rigoureuse', 'rigoroso, cuidadoso'], ['autonome', 'autônomo'], ['avoir le sens de l\'organisation', 'ser organizado'], ['travailler en équipe', 'trabalhar em equipe'], ['Quels sont vos points forts ?', 'Quais são seus pontos fortes?'], ['Où vous voyez-vous dans cinq ans ?', 'Onde você se vê em cinco anos?']], tip: 'Na França, evite falar de salário na primeira entrevista, a menos que perguntem: *Quelles sont vos prétentions salariales ?*' },
        ],
        vocab: ['l\'entretien|a entrevista|💼', 'l\'expérience|a experiência|📈', 'le poste|o cargo|🪑', 'les compétences|as competências|🧰', 'le stage|o estágio|🎓', 'embaucher|contratar|🤝', 'l\'équipe|a equipe|👥'],
        sentences: ['Je suis très motivé par ce poste.|Estou muito motivado por este cargo.', 'Mon point fort, c\'est l\'organisation.|Meu ponto forte é a organização.', 'J\'aime travailler en équipe.|Gosto de trabalhar em equipe.', 'J\'ai fait un stage dans une ONG.|Fiz um estágio numa ONG.', 'Je souhaiterais en savoir plus sur l\'entreprise.|Eu gostaria de saber mais sobre a empresa.'],
        quiz: [
          '"Le poste" numa entrevista significa…|o cargo|o correio;o posto de gasolina;o post|*poste* (masc.) = cargo; *la poste* = correios.',
          '"Embaucher" significa…|contratar|demitir;embarcar;embaçar|O oposto é *licencier* (demitir).',
          'Como dizer "domino o Excel"?|Je maîtrise Excel.|Je domine Excel.;Je sais bien de Excel.;Je suis maître Excel.|*maîtriser* = dominar (uma habilidade).',
        ],
        fill: ['J\'ai fait un ___ de six mois. (estágio)|stage|Fiz um estágio de seis meses.|*stage* = estágio.', 'J\'aime travailler en ___.|équipe|Gosto de trabalhar em equipe.|*en équipe*.'],
      },
      {
        id: 'u19l3', title: 'Argumenter à l\'écrit', emoji: '✍️', goal: 'Conectores do texto argumentativo',
        intro: 'Em primeiro lugar, além disso, no entanto, em suma: a estrutura de uma dissertação francesa.',
        teach: [
          { title: 'Estrutura', table: [['introduire', 'Tout d\'abord, En premier lieu'], ['ajouter', 'De plus, En outre, Par ailleurs'], ['opposer', 'Cependant, Néanmoins, Toutefois, En revanche'], ['exemplifier', 'Par exemple, Ainsi, Notamment'], ['concluir', 'En somme, En définitive, Pour conclure'], ['causa', 'En effet, Étant donné que, Puisque'], ['consequência', 'Par conséquent, C\'est pourquoi, Ainsi']] },
          { title: 'Um parágrafo', text: '*Tout d\'abord, le télétravail permet de gagner du temps. **En effet**, on évite les transports. **En revanche**, il peut isoler les salariés. **Par conséquent**, un modèle hybride semble idéal.*', tip: '*En effet* não é “de fato” como contradição: ele **confirma e explica** o que veio antes.' },
        ],
        vocab: ['en outre|além disso|➕', 'néanmoins|no entanto|↩️', 'en revanche|por outro lado|🔄', 'par conséquent|consequentemente|➡️', 'en effet|com efeito, de fato|✅', 'notamment|notadamente, em especial|📌', 'en somme|em suma|🏁'],
        sentences: ['Tout d\'abord, il faut définir le problème.|Em primeiro lugar, é preciso definir o problema.', 'De plus, cette solution coûte moins cher.|Além disso, essa solução custa menos.', 'Néanmoins, elle présente quelques risques.|No entanto, ela apresenta alguns riscos.', 'Par conséquent, nous proposons une autre approche.|Consequentemente, propomos outra abordagem.', 'En somme, les avantages l\'emportent sur les inconvénients.|Em suma, as vantagens superam as desvantagens.'],
        quiz: [
          'Conector de oposição:|Néanmoins|En outre;Par exemple;En effet|*néanmoins* = no entanto.',
          '"En effet" serve para…|confirmar e explicar a ideia anterior|contradizer;concluir;dar um exemplo|Ele justifica o que foi dito.',
          '"Par conséquent" indica…|consequência|causa;oposição;tempo|= consequentemente.',
        ],
        fill: ['___, il faut agir vite. (Consequentemente)|Par conséquent|Consequentemente, é preciso agir rápido.|Consequência.', 'C\'est cher. ___, c\'est de bonne qualité. (Por outro lado)|En revanche|É caro. Por outro lado, é de boa qualidade.|Contraste → *en revanche*.'],
      },
      {
        id: 'u19l4', title: 'Puis-je…?', emoji: '🎩', goal: 'Inversão e francês culto',
        intro: 'Puis-je vous aider ? A inversão e outras marcas do registro elevado.',
        teach: [
          { title: 'Três registros da pergunta', table: [['familiar', 'Tu viens ?'], ['padrão', 'Est-ce que tu viens ?'], ['formal', 'Viens-tu ?'], ['familiar', 'Il habite où ?'], ['padrão', 'Où est-ce qu\'il habite ?'], ['formal', 'Où habite-t-il ?']], tip: 'Entre duas vogais coloca-se um **-t-**: *Parle-t-il ?*, *A-t-elle fini ?*' },
          { title: 'Outras marcas formais', text: '*Puis-je…?* (forma de *pouvoir* para *je* na inversão).\n*Ne* sozinho (sem *pas*) com *pouvoir, savoir, oser, cesser*: *Je ne saurais dire* (Eu não saberia dizer).\n*Ne* expletivo: *avant qu\'il **ne** parte*, *de peur qu\'il **ne** pleuve* (não nega nada!).' },
        ],
        vocab: ['puis-je|posso|🙋', 'veuillez|queira, por favor (formal)|🙏', 'je ne saurais|eu não saberia|🤐', 'oser|ousar|💪', 'cesser|cessar|✋', 'auriez-vous|o senhor teria|❓'],
        sentences: ['Puis-je vous poser une question ?|Posso lhe fazer uma pergunta?', 'Auriez-vous l\'amabilité de m\'aider ?|O senhor teria a gentileza de me ajudar?', 'Veuillez patienter, s\'il vous plaît.|Queira aguardar, por favor.', 'Où se trouve la gare, je vous prie ?|Onde fica a estação, por gentileza?', 'A-t-il reçu ma lettre ?|Ele recebeu minha carta?'],
        quiz: [
          'Forma formal de "Est-ce qu\'il parle français ?":|Parle-t-il français ?|Parle-il français ?;Il parle-t-il français ?;Parle il français ?|Inversão com *-t-* entre vogais.',
          'Como dizer "Posso entrar?" formalmente?|Puis-je entrer ?|Peux-je entrer ?;Je peux-je entrer ?;Pouvais-je entrer ?|Na inversão, *je peux* → *puis-je*.',
          'Em "avant qu\'il ne parte", o "ne"…|não nega nada (ne expletivo)|nega a ação;é um erro;significa “nunca”|É o *ne* expletivo do registro culto.',
        ],
        fill: ['___-vous patienter ? (poderia)|Pourriez|O senhor poderia aguardar?|Conditionnel de *pouvoir*: *pourriez*.', 'A-___-elle fini ?|t|Ela terminou?|*-t-* entre duas vogais.'],
      },
      {
        id: 'u19story', story: true, title: 'L\'entretien', emoji: '🌳', goal: 'História: entrevista numa ONG ambiental',
        intro: 'Raimundo faz uma entrevista em francês para trabalhar numa ONG ambiental em Caiena.',
        dialogue: [
          'Recruteuse|Bonjour, Monsieur da Silva. Pourriez-vous vous présenter ?|Bom dia, Sr. da Silva. O senhor poderia se apresentar?',
          'Raimundo|Bien sûr. Je suis analyste environnemental et j\'ai plusieurs années d\'expérience en Amazonie.|Claro. Sou analista ambiental e tenho vários anos de experiência na Amazônia.',
          'Recruteuse|Quels sont vos points forts ?|Quais são seus pontos fortes?',
          'Raimundo|Tout d\'abord, je maîtrise la géomatique. De plus, j\'ai l\'habitude de travailler avec les communautés locales.|Em primeiro lugar, domino o geoprocessamento. Além disso, estou acostumado a trabalhar com comunidades locais.',
          'Recruteuse|Excellent. Auriez-vous des questions ?|Excelente. O senhor teria perguntas?',
          'Raimundo|Oui : puis-je savoir quand le poste commencerait ?|Sim: posso saber quando o cargo começaria?',
        ],
        quiz: [
          'Qual é a profissão de Raimundo?|Analista ambiental|Professor;Engenheiro;Jornalista|*analyste environnemental*',
          'Qual conector ele usa para acrescentar uma ideia?|De plus|Néanmoins;En revanche;Par conséquent|*De plus* = além disso.',
          'Por que "commencerait" está no conditionnel?|Pergunta educada sobre algo hipotético|É passado;É uma ordem;É um erro|O conditionnel suaviza a pergunta.',
        ],
        vocab: ['l\'ONG|a ONG|🌳', 'les communautés|as comunidades|🏘️', 'avoir l\'habitude de|estar acostumado a|🔁'],
        sentences: ['Pourriez-vous vous présenter ?|O senhor poderia se apresentar?', 'J\'ai l\'habitude de travailler avec les communautés.|Estou acostumado a trabalhar com as comunidades.', 'Puis-je savoir quand le poste commencerait ?|Posso saber quando o cargo começaria?'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u20', level: 'C1', title: 'Parler comme un natif', pt: 'Falar como nativo', emoji: '🗼',
    desc: 'Francês falado, gírias, verlan, expressões idiomáticas e nuances culturais.',
    verbs: ['faire', 'avoir', 'être', 'aller', 'prendre', 'mettre', 'tomber'], tenses: ['present', 'passe_compose'],
    lessons: [
      {
        id: 'u20l1', title: 'Le français parlé', emoji: '🗣️', goal: 'Como os franceses falam de verdade',
        intro: 'Ninguém em Paris diz *je ne sais pas*. Vamos aprender o francês da rua.',
        teach: [
          { title: 'Reduções da fala', table: [['je ne sais pas', 'j\'sais pas → “chépa”'], ['il y a', 'y a'], ['tu es', 't\'es'], ['je suis', 'j\'suis → “chui”'], ['ce n\'est pas', 'c\'est pas'], ['nous', 'on (sempre!)'], ['qu\'est-ce que tu fais ?', 'tu fais quoi ?']] },
          { title: 'Marcadores de conversa', table: [['bah / ben', 'bom, né'], ['du coup', 'então, por isso'], ['genre', 'tipo'], ['grave', 'muito, demais (gíria)'], ['en fait', 'na verdade'], ['bref', 'enfim, resumindo'], ['quoi', 'né (no fim da frase)']], tip: 'O *ne* da negação some quase sempre na fala: *Je sais pas, c\'est pas grave, j\'aime pas*. Escreva com *ne*, fale sem!' },
        ],
        vocab: ['du coup|então, por isso|➡️', 'en fait|na verdade|💡', 'genre|tipo|🤙', 'bref|enfim|✂️', 'c\'est pas grave|não tem problema|👌', 't\'inquiète|relaxa, não se preocupa|😎'],
        sentences: ['J\'sais pas, en fait.|Não sei, na verdade.', 'Y a personne ici.|Não tem ninguém aqui.', 'Du coup, on fait quoi ?|Então, o que a gente faz?', 'C\'est pas grave, t\'inquiète.|Não tem problema, relaxa.', 'Bref, c\'était génial.|Enfim, foi ótimo.'],
        quiz: [
          '"Du coup" significa…|então, por isso|de repente;de golpe;de novo|Muito usado para ligar ideias.',
          '"Y a" é a forma falada de…|il y a|il a;y en a;il va|*Il y a* → *y a* na fala.',
          '"T\'inquiète" significa…|relaxa, não se preocupa|você está preocupado;cuidado!;fique quieto|De *ne t\'inquiète pas*.',
        ],
        fill: ['J\'sais ___. (não sei)|pas|Não sei.|Na fala, o *ne* cai.', '___ fait, j\'ai oublié. (Na verdade)|En|Na verdade, esqueci.|*en fait*.'],
      },
      {
        id: 'u20l2', title: 'L\'argot et le verlan', emoji: '😎', goal: 'Gírias e verlan',
        intro: 'Ouf, *chelou*, *meuf*, *bouffer*: o vocabulário informal que você vai ouvir em filmes e séries.',
        teach: [
          { title: 'Gírias comuns', table: [['bouffer', 'comer (rangar)'], ['le boulot', 'o trampo, o trabalho'], ['une bagnole', 'um carro'], ['le fric / le pognon', 'a grana'], ['un mec', 'um cara'], ['une nana', 'uma mina, uma garota'], ['crevé', 'morto de cansado'], ['kiffer', 'curtir, adorar']] },
          { title: 'Verlan', text: 'O *verlan* inverte as sílabas (*l\'envers* → *verlan*):', table: [['fou', 'ouf', 'louco'], ['bizarre', 'zarbi', 'esquisito'], ['louche', 'chelou', 'estranho, suspeito'], ['femme', 'meuf', 'mulher, mina'], ['mec', 'keum', 'cara'], ['lourd', 'relou', 'chato'], ['fête', 'teuf', 'festa']], tip: 'Use com amigos, **nunca** numa entrevista ou com desconhecidos mais velhos!' },
        ],
        vocab: ['bouffer|comer (gíria)|🍔', 'le boulot|o trabalho (gíria)|💼', 'le fric|a grana|💸', 'un mec|um cara|🧑', 'crevé|morto de cansado|😵', 'kiffer|curtir|😍', 'ouf|louco (verlan)|🤪', 'chelou|estranho (verlan)|🤨'],
        sentences: ['Je suis crevé après le boulot.|Estou morto de cansado depois do trampo.', 'C\'est un truc de ouf !|É uma coisa de louco!', 'Ce mec est un peu chelou.|Esse cara é meio estranho.', 'On va bouffer ?|Bora comer?', 'Je kiffe trop cette chanson.|Curto demais essa música.'],
        quiz: [
          '"Ouf" em verlan vem de…|fou (louco)|ouvert;œuf;fouet|Inversão de *fou*.',
          '"Le boulot" significa…|o trabalho|o pão;o bolo;o barco|Gíria muito comum.',
          '"Je suis crevé" significa…|estou morto de cansado|estou criativo;estou com fome;estou doente|*crevé* = exausto.',
          'Em que situação NÃO usar gírias?|Numa entrevista de emprego|Com amigos;Numa festa;Mandando mensagem pra um colega próximo|Registro informal só com pessoas próximas.',
        ],
        fill: ['C\'est un truc de ___ ! (louco, verlan)|ouf|É uma coisa de louco!|*fou* → *ouf*.', 'Je ___ cette série ! (curto)|kiffe|Curto essa série!|*kiffer* = curtir.'],
      },
      {
        id: 'u20l3', title: 'Expressions imagées', emoji: '🐸', goal: 'Expressões idiomáticas',
        intro: 'Ter a barata, cair nas maçãs, chamar um gato de gato: o francês é cheio de imagens.',
        teach: [
          { title: 'Expressões do dia a dia', table: [['avoir la flemme', 'estar com preguiça'], ['poser un lapin', 'dar um bolo'], ['tomber dans les pommes', 'desmaiar'], ['coûter les yeux de la tête', 'custar os olhos da cara'], ['avoir le cafard', 'estar pra baixo'], ['casser les pieds', 'encher o saco'], ['avoir un coup de foudre', 'amor à primeira vista'], ['ce n\'est pas la mer à boire', 'não é nenhum bicho de sete cabeças']] },
          { title: 'Com animais', table: [['avoir un chat dans la gorge', 'estar rouco'], ['quand les poules auront des dents', 'quando as galinhas tiverem dentes (nunca)'], ['revenons à nos moutons', 'voltemos ao assunto'], ['un froid de canard', 'um frio de pato (muito frio!)'], ['poser une question bête', 'fazer uma pergunta boba']], tip: '*Un froid de canard* = frio de rachar. Le Canard aprova! 🦆' },
        ],
        vocab: ['avoir la flemme|estar com preguiça|🦥', 'poser un lapin|dar um bolo|🐰', 'avoir le cafard|estar pra baixo|🪳', 'casser les pieds|encher o saco|🦶', 'un coup de foudre|amor à primeira vista|⚡', 'un froid de canard|frio de rachar|🥶'],
        sentences: ['J\'ai la flemme d\'aller au sport.|Estou com preguiça de ir pra academia.', 'Il m\'a posé un lapin hier soir.|Ele me deu um bolo ontem à noite.', 'Il fait un froid de canard !|Está um frio de rachar!', 'Arrête de me casser les pieds !|Para de encher o meu saco!', 'Revenons à nos moutons.|Voltemos ao assunto.'],
        quiz: [
          '"Poser un lapin" significa…|dar um bolo (não aparecer)|dar um presente;criar coelhos;fazer uma pose|Expressão famosa.',
          '"Avoir la flemme" significa…|estar com preguiça|ter febre;estar apaixonado;ter fome|*flemme* = preguiça.',
          '"Un froid de canard" significa…|um frio intenso|um pato com frio;uma gripe;um vento leve|Frio de rachar!',
          '"Revenons à nos moutons" =|voltemos ao assunto|vamos para a fazenda;contemos ovelhas;vamos dormir|Retomar o tema principal.',
        ],
        fill: ['J\'ai la ___ de cuisiner. (preguiça)|flemme|Estou com preguiça de cozinhar.|*avoir la flemme*.', 'Il fait un froid de ___ !|canard|Está um frio de rachar!|*un froid de canard*.'],
      },
      {
        id: 'u20l4', title: 'Les nuances', emoji: '🎭', goal: 'Ironia, atenuação e humor',
        intro: 'Os franceses adoram a *litote*: dizer menos para significar mais. Entenda o que eles querem dizer.',
        teach: [
          { title: 'Litote e atenuação', table: [['Ce n\'est pas mal.', 'Está muito bom.'], ['Ce n\'est pas terrible.', 'Está ruim.'], ['Je ne suis pas contre.', 'Eu topo, adoraria.'], ['Il n\'est pas bête.', 'Ele é inteligente.'], ['Ça ne me déplaît pas.', 'Eu gosto bastante.']], tip: '*Pas terrible* engana brasileiros: **não** é “nada terrível”, é “não muito bom”.' },
          { title: 'Ironia e reações', table: [['Super…', '(irônico) Que ótimo…'], ['Tu m\'étonnes !', 'Nem me fale! / Óbvio!'], ['N\'importe quoi !', 'Que absurdo!'], ['Ça me fait une belle jambe.', 'Grande coisa (não me serve de nada).'], ['C\'est le comble !', 'É o cúmulo!'], ['Et alors ?', 'E daí?']] },
        ],
        vocab: ['pas terrible|não muito bom|😕', 'pas mal|muito bom|👍', 'n\'importe quoi|que absurdo|🙄', 'tu m\'étonnes|nem me fale, óbvio|😏', 'le comble|o cúmulo|🤯', 'et alors|e daí|🤷'],
        sentences: ['Le film ? Pas terrible.|O filme? Não muito bom.', 'Ton gâteau n\'est pas mal du tout !|Seu bolo está ótimo!', 'Il a encore oublié ? Tu m\'étonnes !|Ele esqueceu de novo? Óbvio!', 'C\'est n\'importe quoi !|Que absurdo!', 'Un apéro ? Je ne suis pas contre.|Um aperitivo? Não recuso.'],
        quiz: [
          '"Ce n\'est pas terrible" significa…|Não é muito bom|Não é terrível, é ótimo;É assustador;É incrível|Falso amigo clássico!',
          '"Je ne suis pas contre" significa…|Eu topo|Sou contra;Não sei;Tanto faz|Litote = concordância.',
          '"Tu m\'étonnes !" geralmente significa…|Óbvio! / Nem me fale!|Você me surpreende de verdade;Você me assusta;Você está atrasado|Usado com ironia.',
        ],
        fill: ['Le resto ? ___ terrible. (não muito bom)|Pas|O restaurante? Não muito bom.|*pas terrible*.', 'C\'est ___ quoi ! (absurdo)|n\'importe|Que absurdo!|*n\'importe quoi*.'],
      },
      {
        id: 'u20story', story: true, title: 'Au café du coin', emoji: '☕', goal: 'História: papo de bar com nativos',
        intro: 'Sexta à noite, Raimundo encontra Hugo e Léa num café. A conversa é bem informal!',
        dialogue: [
          'Hugo|Salut ! Ça va ? T\'as l\'air crevé.|E aí! Tudo bem? Você parece morto de cansado.',
          'Raimundo|Ouais, le boulot, c\'était un truc de ouf cette semaine.|É, o trampo foi uma loucura esta semana.',
          'Léa|Tu m\'étonnes. Et en plus il fait un froid de canard !|Nem me fale. E ainda tá um frio de rachar!',
          'Hugo|Bon, du coup, on bouffe où ce soir ?|Bom, então, onde a gente come hoje?',
          'Raimundo|J\'ai la flemme de marcher… Le resto d\'à côté, il est pas mal ?|Tô com preguiça de andar… O restaurante aqui do lado é bom?',
          'Léa|Bof, pas terrible. Mais bon, on y va, c\'est pas la mer à boire !|Hum, não muito. Mas tá, vamos, não é nenhum bicho de sete cabeças!',
        ],
        quiz: [
          'Como Raimundo está?|Muito cansado|Animado;Doente;Com fome apenas|*T\'as l\'air crevé.*',
          'O que Léa acha do restaurante ao lado?|Não muito bom|Excelente;Caro demais;Fechado|*pas terrible*',
          '"C\'est pas la mer à boire" significa…|não é nada difícil|é muito longe;é caro;é o mar|Não é um bicho de sete cabeças.',
        ],
        vocab: ['ouais|é, sim (informal)|👍', 'le resto|o restaurante (gíria)|🍽️', 'bof|hum, mais ou menos|😐', 'avoir l\'air|parecer|👀'],
        sentences: ['T\'as l\'air crevé.|Você parece morto de cansado.', 'On bouffe où ce soir ?|Onde a gente come hoje?', 'C\'est pas la mer à boire !|Não é nenhum bicho de sete cabeças!'],
      },
    ],
  },
];
