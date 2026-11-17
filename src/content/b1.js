// Nível B1 — unidades 10 a 12.
export default [
  // ════════════════════════════════════════════════════════
  {
    id: 'u10', level: 'B1', title: 'L\'imparfait', pt: 'Contar histórias', emoji: '📜',
    desc: 'O imparfait para descrever o passado e hábitos, e como combiná-lo com o passé composé.',
    lessons: [
      {
        id: 'u10l1', title: 'Quand j\'étais petit', emoji: '🧸', goal: 'Formar o imparfait',
        intro: 'O *imparfait* é o passado das descrições e dos hábitos: “eu era”, “eu morava”, “eu brincava”.',
        teach: [
          { title: 'Formação', text: 'Pegue o *nous* do presente, tire o *-ons* e acrescente as terminações:\n*nous parlons* → **parl-** → *je parlais*.', table: [['je', 'parlais', '-ais'], ['tu', 'parlais', '-ais'], ['il / elle', 'parlait', '-ait'], ['nous', 'parlions', '-ions'], ['vous', 'parliez', '-iez'], ['ils / elles', 'parlaient', '-aient']], tip: '*-ais, -ait, -aient* soam igual: “é”.' },
          { title: 'Être é a exceção', text: 'O único irregular: **ét-** → *j\'étais, tu étais, il était, nous étions, vous étiez, ils étaient*.', ex: ['Quand j\'étais petit, j\'habitais à la campagne.|Quando eu era pequeno, morava no interior.', 'Nous avions un chien.|Nós tínhamos um cachorro.', 'Il faisait beau.|Fazia tempo bom.'] },
        ],
        vocab: ['j\'étais|eu era / estava', 'j\'avais|eu tinha', 'j\'habitais|eu morava', 'il faisait|fazia (clima)', 'la campagne|o interior, o campo|🌾', 'l\'enfance|a infância|🧒', 'petit|pequeno, criança|🧸'],
        sentences: ['Quand j\'étais petit, j\'adorais les dessins animés.|Quando eu era pequeno, adorava desenhos animados.', 'Nous habitions près de la rivière.|Morávamos perto do rio.', 'Il faisait très chaud cet été-là.|Fazia muito calor naquele verão.', 'Ma grand-mère racontait des histoires.|Minha avó contava histórias.', 'Vous aviez quel âge ?|Quantos anos vocês tinham?'],
        quiz: [
          'Imparfait de "nous finissons" → je…|finissais|finais;finirais;finissait|Radical do *nous*: *finiss-* + *-ais*.',
          'J\'___ dix ans. (avoir, imparfait)|avais|avait;ai eu;aurais|*je* → *-ais*.',
          'Imparfait de "être", "ils":|étaient|étaitent;sontaient;étiont|*ét-* + *-aient*.',
        ],
        fill: ['Quand j\'___ petite… (être)|étais|Quando eu era pequena…|*j\'étais*', 'Nous ___ à Belém. (habiter)|habitions|Morávamos em Belém.|*nous* → *-ions*.', 'Il ___ beau. (faire)|faisait|Fazia tempo bom.|*il faisait*'],
      },
      {
        id: 'u10l2', title: 'Description et habitude', emoji: '🖼️', goal: 'Quando usar o imparfait',
        intro: 'O imparfait pinta o **cenário**: como as coisas eram e o que acontecia sempre.',
        teach: [
          { title: 'Três usos', text: '1. **Descrição** no passado: *La maison était grande.*\n2. **Hábito**: *Tous les étés, on allait à la plage.*\n3. **Ação em andamento** (pano de fundo): *Je lisais quand…*', ex: ['Il pleuvait et il faisait froid.|Chovia e fazia frio.', 'Le dimanche, nous mangions chez mes grands-parents.|Aos domingos, comíamos na casa dos meus avós.', 'Elle était fatiguée.|Ela estava cansada.'] },
          { title: 'Pistas', text: 'Palavras que pedem imparfait: *autrefois* (antigamente), *d\'habitude* (normalmente), *tous les jours*, *souvent*, *quand j\'étais…*' },
        ],
        vocab: ['autrefois|antigamente|🕰️', 'd\'habitude|normalmente|🔁', 'il pleuvait|chovia|🌧️', 'chaque été|todo verão|☀️', 'raconter|contar (histórias)|📖'],
        sentences: ['Autrefois, il n\'y avait pas d\'internet.|Antigamente não havia internet.', 'D\'habitude, je me levais tôt.|Normalmente eu acordava cedo.', 'Chaque été, nous allions à la plage.|Todo verão íamos à praia.', 'La ville était calme.|A cidade era calma.'],
        quiz: [
          'Para descrever como algo ERA no passado, usamos…|o imparfait|o passé composé;o presente;o futuro|Descrição = imparfait.',
          '"Tous les dimanches, nous ___ au parc."|allions|sommes allés;allons;irons|Hábito no passado → imparfait.',
          '"Autrefois" =|antigamente|outra vez;outro dia;de novo|*autrefois* = antigamente.',
        ],
        fill: ['D\'habitude, il ___ du thé. (boire)|buvait|Normalmente ele bebia chá.|*nous buvons* → *buv-* + *-ait*.', 'La maison ___ blanche. (être)|était|A casa era branca.|Descrição → *était*.'],
      },
      {
        id: 'u10l3', title: 'Imparfait ou passé composé ?', emoji: '🎬', goal: 'Combinar os dois passados',
        intro: 'O segredo de contar histórias: o imparfait é o **cenário**, o passé composé é a **ação**.',
        teach: [
          { title: 'Cenário x ação', text: '**Imparfait** = pano de fundo, o que estava acontecendo.\n**Passé composé** = o evento pontual que interrompe.', ex: ['Je dormais quand le téléphone a sonné.|Eu dormia quando o telefone tocou.', 'Il pleuvait, alors nous sommes restés à la maison.|Chovia, então ficamos em casa.', 'Quand je suis arrivé, elle préparait le dîner.|Quando cheguei, ela estava preparando o jantar.'] },
          { title: 'Regra do filme', text: 'Imagine um filme: a **câmera parada mostrando o cenário** é imparfait; **um acontecimento na cena** é passé composé.', tip: 'Em português é parecido: “eu **dormia** (imparfait) quando o telefone **tocou** (passé composé)”.' },
        ],
        vocab: ['soudain|de repente|⚡', 'quand|quando|⏱️', 'pendant que|enquanto|↔️', 'sonner|tocar (telefone)|📞', 'alors|então|➡️'],
        sentences: ['Je regardais la télé quand tu as appelé.|Eu assistia TV quando você ligou.', 'Il faisait nuit quand nous sommes partis.|Era noite quando saímos.', 'Pendant que je cuisinais, il est arrivé.|Enquanto eu cozinhava, ele chegou.', 'Soudain, la lumière s\'est éteinte.|De repente, a luz apagou.'],
        quiz: [
          'Je ___ quand il a appelé. (dormir)|dormais|ai dormi;dors;dormirai|Ação em andamento (cenário) → imparfait.',
          'Il pleuvait quand nous ___. (sortir)|sommes sortis|sortions;sortons;sortirons|Ação pontual → passé composé.',
          '"Soudain" pede geralmente…|passé composé|imparfait;futuro;subjuntivo|Algo repentino é um evento pontual.',
        ],
        fill: ['Quand je suis arrivé, elle ___. (dormir)|dormait|Quando cheguei, ela dormia.|Cenário → imparfait.', 'Il lisait quand le téléphone a ___. (sonner)|sonné|Ele lia quando o telefone tocou.|Evento → passé composé.'],
      },
      {
        id: 'u10l4', title: 'Raconter', emoji: '🗣️', goal: 'Contar uma história completa',
        intro: 'Vamos juntar tudo: conectores para contar uma história com começo, meio e fim.',
        teach: [
          { title: 'Conectores de narração', table: [['d\'abord', 'primeiro'], ['ensuite', 'em seguida'], ['puis', 'depois'], ['après', 'depois'], ['tout à coup', 'de repente'], ['finalement', 'finalmente'], ['à la fin', 'no fim']] },
          { title: 'Exemplo', text: '*C\'était un samedi. Il faisait beau. D\'abord, je suis allé au marché. Ensuite, j\'ai rencontré un vieil ami. Tout à coup, il a commencé à pleuvoir ! Finalement, nous avons pris un café ensemble.*' },
        ],
        vocab: ['d\'abord|primeiro|1️⃣', 'ensuite|em seguida|2️⃣', 'tout à coup|de repente|💥', 'finalement|finalmente|🏁', 'rencontrer|encontrar, conhecer|🤝', 'ensemble|juntos|👫'],
        sentences: ['D\'abord, j\'ai pris une douche.|Primeiro, tomei banho.', 'Ensuite, je suis allé au travail.|Em seguida, fui trabalhar.', 'Tout à coup, j\'ai vu un ami.|De repente, vi um amigo.', 'Finalement, nous avons dîné ensemble.|Finalmente, jantamos juntos.'],
        quiz: [
          'Qual conector abre uma sequência?|d\'abord|finalement;ensuite;tout à coup|*d\'abord* = primeiro.',
          '"Tout à coup" =|de repente|de uma vez;tudo junto;todos os golpes|Igual a *soudain*.',
          'C\'___ un lundi. (être, cenário)|était|a été;est;sera|Cenário → imparfait.',
        ],
        fill: ['___, je me suis levé. (primeiro)|D\'abord|Primeiro, levantei.|*d\'abord*', 'Nous avons dîné ___. (juntos)|ensemble|Jantamos juntos.|*ensemble*'],
      },
      {
        id: 'u10story', story: true, title: 'Souvenirs d\'enfance', emoji: '🌊', goal: 'História: lembranças da infância',
        intro: 'Raimundo conta para Camille como era sua infância na Amazônia.',
        dialogue: [
          'Camille|Comment était ton enfance ?|Como foi sua infância?',
          'Raimundo|J\'habitais dans une petite ville au bord du fleuve. Il faisait toujours chaud.|Eu morava numa cidadezinha à beira do rio. Fazia sempre calor.',
          'Raimundo|Tous les après-midi, je nageais avec mes cousins.|Todas as tardes, eu nadava com meus primos.',
          'Camille|C\'est magnifique ! Et un jour spécial ?|Que lindo! E um dia especial?',
          'Raimundo|Un jour, pendant que nous pêchions, un dauphin rose est apparu !|Um dia, enquanto pescávamos, apareceu um boto-cor-de-rosa!',
          'Camille|Un dauphin rose ? Incroyable !|Um golfinho rosa? Incrível!',
        ],
        quiz: [
          'Onde Raimundo morava?|Numa cidade à beira do rio|Numa capital;No litoral;Na montanha|*au bord du fleuve*',
          'O que ele fazia todas as tardes?|Nadava com os primos|Pescava sozinho;Estudava;Jogava futebol|*je nageais avec mes cousins* (hábito → imparfait)',
          'Por que "est apparu" está no passé composé?|É um evento pontual|É uma descrição;É um hábito;É um erro|Um acontecimento que interrompe a cena.',
        ],
        vocab: ['le fleuve|o rio (grande)|🌊', 'nager|nadar|🏊', 'pêcher|pescar|🎣', 'le dauphin|o golfinho, o boto|🐬', 'incroyable|incrível|🤯'],
        sentences: ['J\'habitais au bord du fleuve.|Eu morava à beira do rio.', 'Un dauphin rose est apparu.|Apareceu um boto-cor-de-rosa.', 'C\'est incroyable !|É incrível!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u11', level: 'B1', title: 'Le futur', pt: 'O futuro', emoji: '🔮',
    desc: 'Futuro próximo, futuro simples, irregulares e frases com si (se).',
    lessons: [
      {
        id: 'u11l1', title: 'Je vais partir', emoji: '🧳', goal: 'O futuro próximo',
        intro: 'O jeito mais fácil e mais usado de falar do futuro: *aller* + infinitivo.',
        teach: [
          { title: 'A fórmula', text: '**aller** (presente) + **infinitivo** = “vou fazer”.', ex: ['Je vais voyager.|Vou viajar.', 'Tu vas manger ?|Você vai comer?', 'Il va pleuvoir.|Vai chover.', 'Nous allons déménager.|Vamos nos mudar.'] },
          { title: 'Negativa', text: '*ne* + aller + *pas* + infinitivo: *Je ne vais pas travailler demain.*', tip: 'Usa-se para planos e coisas que vão acontecer logo — exatamente como o “vou + verbo” do português.' },
        ],
        vocab: ['demain|amanhã|📅', 'bientôt|em breve|⏳', 'ce soir|hoje à noite|🌙', 'la semaine prochaine|a semana que vem|🗓️', 'déménager|mudar de casa|📦', 'voyager|viajar|🌍'],
        sentences: ['Je vais partir demain.|Vou partir amanhã.', 'Qu\'est-ce que tu vas faire ce soir ?|O que você vai fazer hoje à noite?', 'Il va faire beau ce week-end.|Vai fazer tempo bom neste fim de semana.', 'Nous n\'allons pas sortir.|Não vamos sair.', 'Ils vont se marier l\'année prochaine.|Eles vão se casar no ano que vem.'],
        quiz: [
          'Nous ___ voyager. (futuro próximo)|allons|avons;sommes;irons|*aller* + infinitivo.',
          'Negativa de "Je vais sortir":|Je ne vais pas sortir.|Je vais ne pas sortir.;Je ne vais sortir pas.;Je vais pas ne sortir.|*ne… pas* em volta de *aller*.',
          '"La semaine prochaine" =|a semana que vem|a semana passada;esta semana;a próxima semana passada|*prochain* = próximo.',
        ],
        fill: ['Il ___ pleuvoir. (aller)|va|Vai chover.|*il va* + infinitivo.', 'Tu vas ___ demain ? (trabalhar)|travailler|Você vai trabalhar amanhã?|Infinitivo depois de *aller*.'],
      },
      {
        id: 'u11l2', title: 'Je parlerai', emoji: '🌅', goal: 'O futuro simples',
        intro: 'O *futur simple* é um pouco mais formal: “falarei”, “viajarei”. E é fácil de formar!',
        teach: [
          { title: 'Formação', text: '**Infinitivo** + terminações (que lembram *avoir*):', table: [['je', 'parlerai', '-ai'], ['tu', 'parleras', '-as'], ['il / elle', 'parlera', '-a'], ['nous', 'parlerons', '-ons'], ['vous', 'parlerez', '-ez'], ['ils / elles', 'parleront', '-ont']], tip: 'Verbos em *-re* perdem o *e*: *prendre* → *je prendrai*.' },
          { title: 'Exemplos', ex: ['Un jour, je parlerai français couramment.|Um dia falarei francês fluentemente.', 'Nous finirons à cinq heures.|Terminaremos às cinco.', 'Elle prendra le train.|Ela pegará o trem.'] },
        ],
        vocab: ['un jour|um dia|🌄', 'couramment|fluentemente|🗣️', 'plus tard|mais tarde|⏩', 'l\'avenir|o futuro|🔮'],
        sentences: ['Je parlerai avec lui demain.|Falarei com ele amanhã.', 'Tu finiras ton travail ?|Você terminará seu trabalho?', 'Nous voyagerons en Europe.|Viajaremos pela Europa.', 'Ils arriveront ce soir.|Eles chegarão hoje à noite.', 'Plus tard, j\'habiterai à la mer.|Mais tarde, morarei na praia.'],
        quiz: [
          'Futur de "manger", "nous":|mangerons|mangeons;mangions;mangerions|Infinitivo + *-ons*.',
          'Futur de "prendre", "je":|prendrai|prenderai;prendai;prenrai|*-re* perde o *e*: *prendr-ai*.',
          'Ils ___ demain. (arriver)|arriveront|arriverons;arrivent;arrivaient|*ils* → *-ont*.',
        ],
        fill: ['Je ___ demain. (partir)|partirai|Partirei amanhã.|*partir* + *-ai*.', 'Vous ___ le bus. (prendre)|prendrez|Vocês pegarão o ônibus.|*prendr-* + *-ez*.'],
      },
      {
        id: 'u11l3', title: 'Je serai, j\'aurai', emoji: '🗝️', goal: 'Futuros irregulares',
        intro: 'Alguns verbos mudam o radical no futuro — mas as terminações são sempre as mesmas.',
        teach: [
          { title: 'Radicais irregulares', table: [['être', 'ser-', 'je serai'], ['avoir', 'aur-', 'j\'aurai'], ['aller', 'ir-', 'j\'irai'], ['faire', 'fer-', 'je ferai'], ['pouvoir', 'pourr-', 'je pourrai'], ['vouloir', 'voudr-', 'je voudrai'], ['venir', 'viendr-', 'je viendrai'], ['voir', 'verr-', 'je verrai'], ['devoir', 'devr-', 'je devrai'], ['savoir', 'saur-', 'je saurai']] },
          { title: 'Em frases', ex: ['Je serai médecin.|Serei médico.', 'Tu auras vingt ans.|Você terá vinte anos.', 'Nous irons à Paris.|Iremos a Paris.', 'On verra !|Veremos!', 'Il fera beau demain.|Fará tempo bom amanhã.'], tip: '*On verra* (veremos) é uma expressão muito usada para “vamos ver”.' },
        ],
        vocab: ['je serai|eu serei', 'j\'aurai|eu terei', 'j\'irai|eu irei', 'je ferai|eu farei', 'je pourrai|eu poderei', 'je viendrai|eu virei', 'on verra|veremos|🤷'],
        sentences: ['Je serai là à huit heures.|Estarei lá às oito.', 'Tu pourras venir ?|Você poderá vir?', 'Nous ferons une fête.|Faremos uma festa.', 'Elle viendra avec son mari.|Ela virá com o marido.', 'On verra demain.|Veremos amanhã.'],
        quiz: [
          'Futur de "aller", "nous":|irons|allerons;allons;irions|Radical irregular *ir-*.',
          'J\'___ trente ans en mai. (avoir)|aurai|averai;aurais;serai|*avoir* → *aur-*.',
          'Futur de "voir", "je":|verrai|voirai;voirrai;vairai|*voir* → *verr-*.',
        ],
        fill: ['Je ___ là demain. (être)|serai|Estarei lá amanhã.|*être* → *ser-*.', 'Il ___ beau. (faire)|fera|Fará tempo bom.|*faire* → *fer-*.', 'Tu ___ venir ? (pouvoir)|pourras|Você poderá vir?|*pouvoir* → *pourr-*.'],
      },
      {
        id: 'u11l4', title: 'Si…', emoji: '🔀', goal: 'Hipóteses: se + presente, futuro',
        intro: 'Se fizer sol, iremos à praia. Vamos montar frases com condição.',
        teach: [
          { title: 'A estrutura', text: '**Si + presente**, **futuro**.\nNunca use futuro depois de *si* ❌.', ex: ['S\'il fait beau, nous irons à la plage.|Se fizer sol, iremos à praia.', 'Si tu étudies, tu réussiras.|Se você estudar, vai passar.', 'Si j\'ai le temps, je t\'appellerai.|Se eu tiver tempo, te ligo.'] },
          { title: 'Detalhe', text: '*si + il* = **s\'il**. Mas *si elle* não muda.', tip: 'Em português usamos subjuntivo (“se eu tiver”), mas em francês é **presente**: *si j\'ai*.' },
        ],
        vocab: ['si|se (condição)|🔀', 'réussir|conseguir, passar|🏆', 'le temps|o tempo|⏳', 'appeler|ligar, chamar|📞'],
        sentences: ['S\'il pleut, je resterai à la maison.|Se chover, ficarei em casa.', 'Si tu veux, on ira au cinéma.|Se você quiser, iremos ao cinema.', 'Si nous partons tôt, nous arriverons à midi.|Se sairmos cedo, chegaremos ao meio-dia.', 'Si elle a faim, elle mangera.|Se ela estiver com fome, vai comer.'],
        quiz: [
          'Si tu ___, tu réussiras. (étudier)|étudies|étudieras;étudierais;étudiais|Depois de *si* → presente.',
          'S\'il fait beau, nous ___ à la plage.|irons|allons;irions;sommes allés|Consequência → futuro.',
          'Como se escreve "si + il"?|s\'il|si il;s\'ils;sil|Elisão: *s\'il*.',
        ],
        fill: ['Si j\'___ le temps, je viendrai. (avoir)|ai|Se eu tiver tempo, virei.|*si* + presente.', '___ pleut, je reste. (se ele/chover)|S\'il|Se chover, eu fico.|*si + il* = *s\'il*.'],
      },
      {
        id: 'u11story', story: true, title: 'Projets d\'avenir', emoji: '🗺️', goal: 'História: planos para o futuro',
        intro: 'No fim do curso, Camille pergunta sobre os planos de Raimundo.',
        dialogue: [
          'Camille|Qu\'est-ce que tu vas faire l\'année prochaine ?|O que você vai fazer no ano que vem?',
          'Raimundo|Je vais finir ma spécialisation. Ensuite, je travaillerai dans un projet en Amazonie.|Vou terminar minha especialização. Depois, trabalharei num projeto na Amazônia.',
          'Camille|Tu reviendras en France ?|Você voltará à França?',
          'Raimundo|Si j\'ai assez d\'argent, je reviendrai l\'été prochain.|Se eu tiver dinheiro suficiente, voltarei no próximo verão.',
          'Camille|Super ! Et tu parleras français parfaitement !|Ótimo! E você falará francês perfeitamente!',
          'Raimundo|On verra ! Je ferai de mon mieux.|Veremos! Farei o meu melhor.',
        ],
        quiz: [
          'O que Raimundo vai terminar?|A especialização|O doutorado;Um livro;Uma casa|*finir ma spécialisation*',
          'Quando ele pode voltar à França?|No próximo verão, se tiver dinheiro|No próximo mês;Nunca;No Natal|*Si j\'ai assez d\'argent… l\'été prochain*',
          '"Je ferai de mon mieux" =|Farei o meu melhor|Farei melhor que você;Fiz o melhor;Faço sempre melhor|Expressão: *faire de son mieux*.',
        ],
        vocab: ['l\'argent|o dinheiro|💰', 'assez de|suficiente|✔️', 'revenir|voltar|🔙', 'faire de son mieux|fazer o seu melhor|💪'],
        sentences: ['Je reviendrai l\'été prochain.|Voltarei no próximo verão.', 'Si j\'ai assez d\'argent…|Se eu tiver dinheiro suficiente…', 'Je ferai de mon mieux.|Farei o meu melhor.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u12', level: 'B1', title: 'Opinions', pt: 'Opinar e debater', emoji: '💬',
    desc: 'Dar opinião, o subjuntivo e conectores para argumentar.',
    lessons: [
      {
        id: 'u12l1', title: 'À mon avis', emoji: '🤔', goal: 'Dar sua opinião',
        intro: 'Na minha opinião, acho que, concordo, discordo… o francês adora um bom debate!',
        teach: [
          { title: 'Dar opinião', table: [['je pense que', 'eu acho que'], ['je crois que', 'eu acredito que'], ['à mon avis', 'na minha opinião'], ['pour moi', 'para mim'], ['il me semble que', 'me parece que']] },
          { title: 'Concordar e discordar', table: [['je suis d\'accord', 'concordo'], ['je ne suis pas d\'accord', 'discordo'], ['tu as raison', 'você tem razão'], ['ça dépend', 'depende'], ['pas du tout', 'de jeito nenhum']], tip: '*D\'accord* sozinho também significa “ok, combinado”.' },
        ],
        vocab: ['je pense que|eu acho que|💭', 'à mon avis|na minha opinião|🗣️', 'd\'accord|de acordo, ok|🤝', 'ça dépend|depende|⚖️', 'pas du tout|de jeito nenhum|🙅', 'vraiment|realmente|❗'],
        sentences: ['Je pense que c\'est une bonne idée.|Acho que é uma boa ideia.', 'À mon avis, le film est trop long.|Na minha opinião, o filme é longo demais.', 'Je ne suis pas d\'accord avec toi.|Não concordo com você.', 'Tu as raison, c\'est vraiment cher.|Você tem razão, é realmente caro.', 'Ça dépend du prix.|Depende do preço.'],
        quiz: [
          '"Je suis d\'accord" =|concordo|estou acordado;estou pronto;sou de acordo com a lei|*d\'accord* = de acordo.',
          '"Pas du tout" =|de jeito nenhum|não tudo;tudo bem;um pouco|Negação forte.',
          'Como dizer "na minha opinião"?|à mon avis|à mon opinion;dans mon avis;en ma opinion|Expressão fixa: *à mon avis*.',
        ],
        fill: ['Je ___ que c\'est vrai. (acho)|pense|Acho que é verdade.|*je pense que*', 'Je ne suis pas d\'___.|accord|Não concordo.|*d\'accord*'],
      },
      {
        id: 'u12l2', title: 'Il faut que…', emoji: '📏', goal: 'Introdução ao subjuntivo',
        intro: 'O *subjonctif* aparece depois de expressões de necessidade, desejo e emoção.',
        teach: [
          { title: 'Formação', text: 'Pegue o *ils* do presente, tire *-ent* e acrescente: **-e, -es, -e, -ions, -iez, -ent**.\n*ils parlent* → *que je parle*. *ils finissent* → *que je finisse*.', table: [['que je', 'parte'], ['que tu', 'partes'], ['qu\'il / elle', 'parte'], ['que nous', 'partions'], ['que vous', 'partiez'], ['qu\'ils', 'partent']] },
          { title: 'Quando usar', text: 'Depois de: *il faut que* (é preciso que), *je veux que* (quero que), *j\'aimerais que*, *bien que* (embora), *pour que* (para que), *avant que* (antes que).', ex: ['Il faut que je parte.|É preciso que eu vá embora. / Tenho que ir.', 'Je veux que tu viennes.|Quero que você venha.', 'Bien qu\'il pleuve, on sort.|Embora chova, a gente sai.'], tip: 'Com *je pense que* (afirmativo) usa-se o **indicativo**: *je pense qu\'il est là*.' },
        ],
        vocab: ['il faut que|é preciso que|❗', 'je veux que|quero que|🙏', 'pour que|para que|🎯', 'bien que|embora|🤷', 'avant que|antes que|⏮️'],
        sentences: ['Il faut que tu étudies.|É preciso que você estude.', 'Je veux que vous parliez français.|Quero que vocês falem francês.', 'Il faut que nous partions tôt.|Precisamos sair cedo.', 'Je parle lentement pour que tu comprennes.|Falo devagar para que você entenda.'],
        quiz: [
          'Il faut que tu ___. (finir)|finisses|finis;finiras;finissais|*ils finissent* → *que tu finisses*.',
          'Qual expressão pede subjuntivo?|il faut que|je pense que;je sais que;il est certain que|Necessidade → subjuntivo.',
          'Je veux que vous ___. (écouter)|écoutiez|écoutez;écouterez;écoutiez-vous|*que vous* → *-iez*.',
        ],
        fill: ['Il faut que je ___. (partir)|parte|É preciso que eu vá.|*ils partent* → *que je parte*.', 'Je veux que tu m\'___. (écouter)|écoutes|Quero que você me escute.|*que tu* → *-es*.'],
      },
      {
        id: 'u12l3', title: 'Que je sois', emoji: '🧠', goal: 'Subjuntivos irregulares',
        intro: 'Os verbos mais usados são irregulares no subjuntivo. Esta é a lista de ouro.',
        teach: [
          { title: 'Os irregulares', table: [['être', 'que je sois', 'que nous soyons'], ['avoir', 'que j\'aie', 'que nous ayons'], ['faire', 'que je fasse', 'que nous fassions'], ['aller', 'que j\'aille', 'que nous allions'], ['pouvoir', 'que je puisse', 'que nous puissions'], ['savoir', 'que je sache', 'que nous sachions'], ['vouloir', 'que je veuille', 'que nous voulions']] },
          { title: 'Em frases', ex: ['Il faut que tu sois patient.|É preciso que você seja paciente.', 'Je veux que tu aies confiance.|Quero que você tenha confiança.', 'Il faut que nous fassions attention.|Precisamos tomar cuidado.', 'Bien qu\'il soit tard, je travaille.|Embora seja tarde, trabalho.'] },
        ],
        vocab: ['que je sois|que eu seja', 'que j\'aie|que eu tenha', 'que je fasse|que eu faça', 'que j\'aille|que eu vá', 'que je puisse|que eu possa', 'patient|paciente|🧘', 'faire attention|tomar cuidado|⚠️'],
        sentences: ['Il faut que tu sois à l\'heure.|É preciso que você seja pontual.', 'Je veux qu\'il fasse beau demain.|Quero que faça tempo bom amanhã.', 'Il faut que j\'aille chez le médecin.|Preciso ir ao médico.', 'Bien que je sois fatigué, je viens.|Embora esteja cansado, eu vou.'],
        quiz: [
          'Il faut que tu ___ patient. (être)|sois|es;seras;soit|*que tu sois*.',
          'Subjuntivo de "faire", "je":|fasse|faise;fais;ferai|*que je fasse*.',
          'Bien qu\'il ___ tard… (être)|soit|est;sera;était|*bien que* + subjuntivo.',
        ],
        fill: ['Il faut que j\'___ au travail. (aller)|aille|Preciso ir ao trabalho.|*que j\'aille*', 'Je veux que tu ___ venir. (pouvoir)|puisses|Quero que você possa vir.|*que tu puisses*'],
      },
      {
        id: 'u12l4', title: 'Débattre', emoji: '⚔️', goal: 'Conectores para argumentar',
        intro: 'Para argumentar bem: mas, porém, portanto, além disso, por um lado…',
        teach: [
          { title: 'Conectores', table: [['mais', 'mas'], ['pourtant', 'no entanto'], ['cependant', 'porém'], ['donc', 'portanto'], ['parce que', 'porque'], ['en plus', 'além disso'], ['d\'un côté… de l\'autre', 'por um lado… por outro'], ['par exemple', 'por exemplo']] },
          { title: 'Um argumento', text: '*D\'un côté, la ville offre beaucoup d\'opportunités. De l\'autre, la vie y est chère. Pourtant, je préfère la ville, parce que j\'aime la culture. Donc, je vais rester à Paris.*' },
        ],
        vocab: ['pourtant|no entanto|↩️', 'cependant|porém|✋', 'donc|portanto|➡️', 'parce que|porque|❓', 'en plus|além disso|➕', 'par exemple|por exemplo|📌'],
        sentences: ['Il pleut, pourtant il fait chaud.|Está chovendo, no entanto faz calor.', 'Je suis fatigué, donc je reste.|Estou cansado, portanto fico.', 'J\'apprends le français parce que j\'aime la culture.|Aprendo francês porque amo a cultura.', 'En plus, c\'est moins cher.|Além disso, é mais barato.', 'D\'un côté c\'est loin, de l\'autre c\'est beau.|Por um lado é longe, por outro é bonito.'],
        quiz: [
          '"Donc" introduz…|uma conclusão|uma oposição;uma causa;um exemplo|*donc* = portanto.',
          'Sinônimo de "cependant":|pourtant|donc;parce que;en plus|Ambos indicam oposição.',
          '"Parce que" =|porque|para que;por isso;portanto|*parce que* = porque (causa).',
        ],
        fill: ['Il est riche, ___ il n\'est pas heureux. (no entanto)|pourtant|Ele é rico, no entanto não é feliz.|Oposição → *pourtant*.', 'Je reste ___ je suis malade. (porque)|parce que|Fico porque estou doente.|Causa → *parce que*.'],
      },
      {
        id: 'u12story', story: true, title: 'Ville ou campagne ?', emoji: '🏞️', goal: 'História: um debate amigável',
        intro: 'Raimundo e Camille debatem: é melhor viver na cidade ou no interior?',
        dialogue: [
          'Camille|À mon avis, la vie à Paris est fantastique. Il y a tout !|Na minha opinião, a vida em Paris é fantástica. Tem de tudo!',
          'Raimundo|Je ne suis pas d\'accord. C\'est beau, pourtant c\'est très cher et stressant.|Não concordo. É bonito, no entanto é muito caro e estressante.',
          'Camille|D\'un côté, tu as raison. Mais il faut que tu voies les musées, les cafés…|Por um lado, você tem razão. Mas você precisa ver os museus, os cafés…',
          'Raimundo|Je pense que la nature est plus importante. Chez moi, il y a le fleuve, la forêt…|Acho que a natureza é mais importante. Na minha terra, tem o rio, a floresta…',
          'Camille|Alors il faut que j\'aille au Brésil pour comprendre !|Então preciso ir ao Brasil para entender!',
          'Raimundo|Exactement ! Donc, on va organiser ton voyage !|Exatamente! Então, vamos organizar sua viagem!',
        ],
        quiz: [
          'O que Camille acha de Paris?|Que é fantástica|Que é cara demais;Que é chata;Que é perigosa|*la vie à Paris est fantastique*',
          'Qual é o argumento de Raimundo?|Paris é cara e estressante|Paris é feia;Paris não tem museus;Paris é longe|*très cher et stressant*',
          'Por que "que j\'aille" está no subjuntivo?|Vem depois de "il faut que"|É passado;É futuro;É um erro|*il faut que* pede subjuntivo.',
        ],
        vocab: ['stressant|estressante|😫', 'la nature|a natureza|🌿', 'la forêt|a floresta|🌳', 'exactement|exatamente|🎯', 'organiser|organizar|🗂️'],
        sentences: ['Je ne suis pas d\'accord.|Não concordo.', 'Il faut que j\'aille au Brésil.|Preciso ir ao Brasil.', 'On va organiser ton voyage.|Vamos organizar sua viagem.'],
      },
    ],
  },
];
