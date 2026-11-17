// Nível B2 — unidades 13 a 16.
export default [
  // ════════════════════════════════════════════════════════
  {
    id: 'u13', level: 'B2', title: 'Le conditionnel', pt: 'Hipóteses e desejos', emoji: '💭',
    desc: 'Conditionnel presente e passado, as três frases com "si", conselhos e pedidos educados.',
    verbs: ['être', 'avoir', 'aller', 'faire', 'pouvoir', 'vouloir', 'devoir', 'aimer', 'savoir'], tenses: ['conditionnel', 'conditionnel_passe'],
    lessons: [
      {
        id: 'u13l1', title: 'Je voudrais', emoji: '🙏', goal: 'Formar o conditionnel présent',
        intro: 'O *conditionnel* é o “futuro do pretérito”: falaria, iria, poderia. Você já usa *je voudrais* — agora vai entender por quê.',
        teach: [
          { title: 'Formação', text: 'Radical do **futuro** + terminações do **imparfait**:\n*parler* → *parler-* → *je parlerais*.\nOs irregulares usam o mesmo radical irregular do futuro: *ser-*, *aur-*, *ir-*, *fer-*, *pourr-*, *voudr-*, *devr-*, *saur-*, *viendr-*, *verr-*.', table: [['je', 'parlerais', 'eu falaria'], ['tu', 'parlerais', 'você falaria'], ['il / elle', 'parlerait', 'ele falaria'], ['nous', 'parlerions', 'nós falaríamos'], ['vous', 'parleriez', 'vocês falariam'], ['ils / elles', 'parleraient', 'eles falariam']] },
          { title: 'Para que serve', text: '1. **Pedidos educados**: *Je voudrais un café.* *Pourriez-vous m\'aider ?*\n2. **Desejos**: *J\'aimerais voyager au Japon.*\n3. **Conselhos**: *Tu devrais dormir plus.*\n4. **Hipóteses**: *À ta place, je partirais.*\n5. **Informação não confirmada** (jornais): *Le président serait malade.*', tip: '*Je voudrais* é bem mais educado que *je veux*. Em loja ou restaurante, use sempre o conditionnel!' },
        ],
        vocab: ['je voudrais|eu gostaria, eu queria|🙋', 'j\'aimerais|eu gostaria|💭', 'tu devrais|você deveria|☝️', 'pourriez-vous|o senhor poderia|🙏', 'à ta place|no seu lugar|🔄', 'volontiers|com prazer|😊', 'le conseil|o conselho|💡'],
        sentences: ['Pourriez-vous parler plus lentement ?|O senhor poderia falar mais devagar?', 'J\'aimerais vivre à la campagne.|Eu gostaria de morar no interior.', 'Tu devrais te reposer.|Você deveria descansar.', 'À ta place, j\'accepterais.|No seu lugar, eu aceitaria.', 'Nous serions ravis de venir.|Ficaríamos encantados em ir.', 'Ce serait génial !|Seria ótimo!'],
        quiz: [
          'Conditionnel de "pouvoir", "vous":|pourriez|pouvriez;pourrez;pouviez|Radical do futuro *pourr-* + *-iez*.',
          'Qual frase é um conselho?|Tu devrais manger mieux.|Tu dois manger mieux.;Tu mangeras mieux.;Tu manges mieux.|*Tu devrais* = você deveria (conselho).',
          'J\'___ bien un café. (aimer)|aimerais|aimerai;aimais;aime|Desejo educado → conditionnel: *-ais*.',
          'Nos jornais, "Le ministre serait parti" significa…|O ministro teria saído (não confirmado)|O ministro saiu com certeza;O ministro vai sair;O ministro sairia se pudesse|O conditionnel jornalístico indica informação não confirmada.',
        ],
        fill: ['Tu ___ te reposer. (devoir)|devrais|Você deveria descansar.|*devoir* → *devr-* + *-ais*.', 'Ce ___ parfait ! (être)|serait|Seria perfeito!|*être* → *ser-* + *-ait*.', '___-vous m\'aider ? (pouvoir)|Pourriez|O senhor poderia me ajudar?|*pourr-* + *-iez*.'],
      },
      {
        id: 'u13l2', title: 'Si j\'avais…', emoji: '🔀', goal: 'Hipóteses: si + imparfait, conditionnel',
        intro: 'Se eu tivesse dinheiro, eu viajaria. A hipótese mais famosa do francês tem uma regra de ouro.',
        teach: [
          { title: 'A estrutura', text: '**Si + imparfait**, **conditionnel présent**.\nNunca use conditionnel depois de *si* ❌.', ex: ['Si j\'avais de l\'argent, je voyagerais.|Se eu tivesse dinheiro, viajaria.', 'Si tu venais, on serait contents.|Se você viesse, ficaríamos contentes.', 'S\'il faisait beau, nous irions à la plage.|Se fizesse sol, iríamos à praia.'] },
          { title: 'Os três tipos de "si"', table: [['possível', 'si + présent → futur', 'Si tu viens, je serai content.'], ['improvável', 'si + imparfait → conditionnel', 'Si tu venais, je serais content.'], ['impossível (passado)', 'si + plus-que-parfait → cond. passé', 'Si tu étais venu, j\'aurais été content.']], tip: 'Em português usamos subjuntivo (“se eu tivesse”), mas em francês é **imparfait**: *si j\'avais*.' },
        ],
        vocab: ['si|se|🔀', 'l\'argent|o dinheiro|💰', 'gagner au loto|ganhar na loteria|🎰', 'le monde entier|o mundo inteiro|🌍', 'ravi|encantado|😍'],
        sentences: ['Si j\'étais riche, j\'achèterais une maison au bord de la mer.|Se eu fosse rico, compraria uma casa na beira do mar.', 'Si tu parlais français, tu pourrais travailler à Paris.|Se você falasse francês, poderia trabalhar em Paris.', 'Si nous avions le temps, nous viendrions.|Se tivéssemos tempo, viríamos.', 'Que ferais-tu si tu gagnais au loto ?|O que você faria se ganhasse na loteria?', 'S\'il pleuvait, je resterais chez moi.|Se chovesse, eu ficaria em casa.'],
        quiz: [
          'Si j\'___ le temps, je viendrais. (avoir)|avais|aurais;ai;aurai|Depois de *si*: imparfait.',
          'Si tu étudiais, tu ___. (réussir)|réussirais|réussiras;réussissais;réussis|Consequência hipotética → conditionnel.',
          'Qual frase está correta?|Si j\'étais toi, je partirais.|Si je serais toi, je partirais.;Si j\'étais toi, je pars.;Si je suis toi, je partirais.|*si* + imparfait, conditionnel.',
          '"Si tu viens, je serai content" expressa…|algo possível|algo impossível;algo passado;uma ordem|*si + présent → futur* = hipótese real/possível.',
        ],
        fill: ['Si j\'___ riche, je voyagerais. (être)|étais|Se eu fosse rico, viajaria.|*si* + imparfait.', 'S\'il faisait beau, on ___ à la plage. (aller)|irait|Se fizesse sol, iríamos à praia.|*aller* → *ir-* + *-ait*.', 'Que ___-tu à ma place ? (faire)|ferais|O que você faria no meu lugar?|*faire* → *fer-* + *-ais*.'],
      },
      {
        id: 'u13l3', title: 'J\'aurais dû', emoji: '😔', goal: 'Conditionnel passé e arrependimentos',
        intro: 'Eu deveria ter… Eu teria… O conditionnel passé fala do que poderia ter sido.',
        teach: [
          { title: 'Formação', text: '**avoir/être no conditionnel** + **particípio**:\n*j\'aurais parlé* (eu teria falado), *je serais allé* (eu teria ido).', table: [['j\'', 'aurais fini', 'eu teria terminado'], ['tu', 'aurais pu', 'você teria podido'], ['elle', 'serait venue', 'ela teria vindo'], ['nous', 'aurions dû', 'nós deveríamos ter'], ['vous', 'seriez partis', 'vocês teriam saído'], ['ils', 'auraient aimé', 'eles teriam gostado']] },
          { title: 'Arrependimentos e críticas', text: '*J\'aurais dû* + infinitivo = **eu deveria ter**.\n*Tu aurais pu* + infinitivo = **você poderia ter**.\n*J\'aurais aimé* = **eu teria gostado**.', ex: ['J\'aurais dû étudier plus.|Eu deveria ter estudado mais.', 'Tu aurais pu me prévenir !|Você poderia ter me avisado!', 'J\'aurais aimé te voir.|Eu teria gostado de te ver.'] },
          { title: 'Si + plus-que-parfait', text: 'Hipótese impossível (o passado não muda): **si + plus-que-parfait**, **conditionnel passé**.', ex: ['Si j\'avais su, je serais venu.|Se eu soubesse, teria vindo.', 'Si tu m\'avais appelé, je t\'aurais aidé.|Se você tivesse me ligado, eu teria te ajudado.'] },
        ],
        vocab: ['j\'aurais dû|eu deveria ter|😔', 'tu aurais pu|você poderia ter|🤦', 'prévenir|avisar|📢', 'le regret|o arrependimento|💔', 'si j\'avais su|se eu soubesse|🤷'],
        sentences: ['J\'aurais dû partir plus tôt.|Eu deveria ter saído mais cedo.', 'Tu aurais pu me le dire.|Você poderia ter me dito.', 'Si j\'avais su, je ne serais pas venu.|Se eu soubesse, não teria vindo.', 'Nous aurions aimé rester plus longtemps.|Teríamos gostado de ficar mais tempo.', 'Elle serait partie sans toi.|Ela teria ido embora sem você.'],
        quiz: [
          '"J\'aurais dû étudier" =|Eu deveria ter estudado|Eu devo estudar;Eu deverei estudar;Eu estudaria|*aurais dû* + infinitivo = deveria ter.',
          'Si j\'avais su, je ___ venu.|serais|aurais;étais;serai|*venir* usa *être* → *serais venu*.',
          'Si tu m\'___ appelé, je t\'aurais aidé.|avais|aurais;as;avait|Hipótese no passado: *si + plus-que-parfait*.',
        ],
        fill: ['J\'___ dû t\'écouter.|aurais|Eu deveria ter te escutado.|*aurais dû*.', 'Si j\'avais su, je ___ resté. (être)|serais|Se eu soubesse, teria ficado.|*rester* usa *être*.'],
      },
      {
        id: 'u13l4', title: 'Conseils et suggestions', emoji: '💡', goal: 'Dar conselhos e sugerir com elegância',
        intro: 'Como sugerir algo sem parecer mandão? O francês tem várias fórmulas educadas.',
        teach: [
          { title: 'Sugerir', table: [['On pourrait…', 'A gente poderia…'], ['Et si on + imparfait ?', 'E se a gente…?'], ['Ça te dirait de…?', 'Você toparia…?'], ['Je te conseille de…', 'Eu te aconselho a…'], ['Il vaudrait mieux…', 'Seria melhor…'], ['Tu ferais mieux de…', 'Seria melhor você…']] },
          { title: 'Exemplos', ex: ['Et si on allait au cinéma ?|E se a gente fosse ao cinema?', 'Ça te dirait de dîner ensemble ?|Você toparia jantar junto?', 'Il vaudrait mieux partir maintenant.|Seria melhor sair agora.', 'Tu ferais mieux de te taire.|Seria melhor você ficar quieto.'], tip: '*Et si on…?* usa o **imparfait**: *Et si on sortait ?* (E se a gente saísse?)' },
        ],
        vocab: ['ça te dirait|você toparia|🤔', 'il vaudrait mieux|seria melhor|⚖️', 'tu ferais mieux de|seria melhor você|☝️', 'conseiller|aconselhar|💡', 'proposer|propor|🗳️', 'sortir|sair|🚪'],
        sentences: ['Et si on sortait ce soir ?|E se a gente saísse hoje à noite?', 'Ça te dirait d\'aller à la plage ?|Você toparia ir à praia?', 'Il vaudrait mieux réserver.|Seria melhor reservar.', 'Je te conseille de lire ce livre.|Eu te aconselho a ler este livro.', 'On pourrait commander une pizza.|A gente poderia pedir uma pizza.'],
        quiz: [
          'Et si on ___ au restaurant ? (aller)|allait|irait;va;irons|*Et si on* + imparfait.',
          '"Il vaudrait mieux" significa…|seria melhor|valeria a pena;vale mais;seria pior|Do verbo *valoir* no conditionnel.',
          'Qual é a sugestão mais educada?|On pourrait partir ?|Partons !;Tu pars.;Il faut partir.|O conditionnel suaviza a proposta.',
        ],
        fill: ['Ça te ___ de venir ? (dire)|dirait|Você toparia vir?|*dire* → *dir-* + *-ait*.', 'Tu ___ mieux de dormir. (faire)|ferais|Seria melhor você dormir.|*faire mieux de* no conditionnel.'],
      },
      {
        id: 'u13story', story: true, title: 'Le rêve de Camille', emoji: '🌙', goal: 'História: e se…?',
        intro: 'Numa noite de verão, Camille e Raimundo imaginam outra vida.',
        dialogue: [
          'Camille|Si tu pouvais vivre n\'importe où, tu irais où ?|Se você pudesse morar em qualquer lugar, iria para onde?',
          'Raimundo|J\'habiterais au bord de l\'Amazone, mais je passerais l\'été en Provence.|Eu moraria na beira do Amazonas, mas passaria o verão na Provença.',
          'Camille|Moi, j\'aurais aimé être musicienne. Si j\'avais commencé plus tôt…|Eu teria gostado de ser musicista. Se eu tivesse começado mais cedo…',
          'Raimundo|Tu devrais reprendre le piano ! Il n\'est jamais trop tard.|Você deveria voltar ao piano! Nunca é tarde demais.',
          'Camille|Tu as raison. Et si on prenait des cours ensemble ?|Você tem razão. E se a gente fizesse aulas juntos?',
          'Raimundo|Ça me dirait bien !|Eu toparia!',
        ],
        quiz: [
          'Onde Raimundo moraria?|Na beira do Amazonas|Em Paris;Na Provença o ano todo;No Japão|*J\'habiterais au bord de l\'Amazone.*',
          'O que Camille teria gostado de ser?|Musicista|Médica;Professora;Pintora|*j\'aurais aimé être musicienne*',
          'O que Raimundo aconselha?|Voltar ao piano|Mudar de país;Parar de sonhar;Estudar francês|*Tu devrais reprendre le piano !*',
        ],
        vocab: ['n\'importe où|em qualquer lugar|🗺️', 'reprendre|retomar|🔁', 'trop tard|tarde demais|⏰'],
        sentences: ['Tu irais où ?|Você iria para onde?', 'Il n\'est jamais trop tard.|Nunca é tarde demais.', 'Ça me dirait bien !|Eu toparia!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u14', level: 'B2', title: 'Les temps du récit', pt: 'Narrar com precisão', emoji: '📚',
    desc: 'Plus-que-parfait, futur antérieur, passé simple (reconhecer) e concordância dos tempos.',
    verbs: ['être', 'avoir', 'faire', 'partir', 'arriver', 'finir', 'prendre', 'voir', 'dire'], tenses: ['plus_que_parfait', 'futur_anterieur', 'passe_compose'],
    lessons: [
      {
        id: 'u14l1', title: 'J\'avais déjà mangé', emoji: '⏪', goal: 'Plus-que-parfait',
        intro: 'Quando você chegou, eu já tinha comido. O plus-que-parfait é o “passado do passado”.',
        teach: [
          { title: 'Formação', text: '**avoir/être no imparfait** + **particípio**.\nMesmas regras do passé composé (verbos com *être* concordam).', table: [['j\'', 'avais mangé', 'eu tinha comido'], ['tu', 'avais vu', 'você tinha visto'], ['il', 'était parti', 'ele tinha saído'], ['nous', 'avions fini', 'nós tínhamos terminado'], ['vous', 'étiez arrivés', 'vocês tinham chegado'], ['elles', 'avaient dit', 'elas tinham dito']] },
          { title: 'Uso', text: 'Ação **anterior** a outra ação passada.', ex: ['Quand je suis arrivé, le film avait déjà commencé.|Quando cheguei, o filme já tinha começado.', 'Elle m\'a dit qu\'elle avait perdu ses clés.|Ela me disse que tinha perdido as chaves.', 'Nous avions fini avant midi.|Tínhamos terminado antes do meio-dia.'], tip: 'Pense numa linha do tempo: plus-que-parfait ← passé composé ← agora.' },
        ],
        vocab: ['déjà|já|✅', 'avant|antes|⏮️', 'quand|quando|⏱️', 'les clés|as chaves|🔑', 'à peine|mal (acabara de)|⚡'],
        sentences: ['Quand il est arrivé, nous étions déjà partis.|Quando ele chegou, nós já tínhamos saído.', 'J\'avais oublié mon passeport.|Eu tinha esquecido meu passaporte.', 'Elle avait toujours rêvé de voir Paris.|Ela sempre tinha sonhado em ver Paris.', 'Ils avaient fini le travail avant la nuit.|Eles tinham terminado o trabalho antes da noite.', 'Tu avais déjà lu ce livre ?|Você já tinha lido esse livro?'],
        quiz: [
          'Quand je suis arrivé, le train ___ parti.|était|avait;est;serait|*partir* usa *être* → *était parti*.',
          'O plus-que-parfait indica…|uma ação anterior a outra no passado|uma ação futura;um hábito;uma hipótese|É o passado do passado.',
          'J\'___ oublié mes lunettes.|avais|étais;aurais;ai eu|*oublier* usa *avoir* → *avais oublié*.',
        ],
        fill: ['Nous ___ déjà mangé. (avoir)|avions|Nós já tínhamos comido.|*avoir* no imparfait: *avions*.', 'Elle ___ partie avant moi. (être)|était|Ela tinha saído antes de mim.|*partir* → *être*.'],
      },
      {
        id: 'u14l2', title: 'Quand j\'aurai fini', emoji: '⏩', goal: 'Futur antérieur',
        intro: 'Quando eu tiver terminado, eu te ligo. O futur antérieur é o “passado do futuro”.',
        teach: [
          { title: 'Formação', text: '**avoir/être no futur** + **particípio**.', table: [['j\'', 'aurai fini', 'eu terei terminado'], ['tu', 'auras compris', 'você terá entendido'], ['il', 'sera rentré', 'ele terá voltado'], ['nous', 'aurons mangé', 'teremos comido'], ['vous', 'serez partis', 'vocês terão saído'], ['ils', 'auront vu', 'eles terão visto']] },
          { title: 'Uso', text: 'Ação que estará **concluída antes** de outra no futuro. Muito usado depois de *quand*, *dès que*, *lorsque*, *une fois que*.', ex: ['Je t\'appellerai quand j\'aurai fini.|Vou te ligar quando tiver terminado.', 'Dès qu\'il sera arrivé, on mangera.|Assim que ele tiver chegado, a gente come.', 'Dans un an, j\'aurai appris le français.|Daqui a um ano, terei aprendido francês.'], tip: 'Português: “quando eu **tiver terminado**” (subjuntivo). Francês: *quand j\'**aurai fini*** (futuro).' },
        ],
        vocab: ['dès que|assim que|⚡', 'lorsque|quando (formal)|⏱️', 'une fois que|uma vez que, depois que|1️⃣', 'dans un an|daqui a um ano|📅', 'terminer|terminar|🏁'],
        sentences: ['Je te répondrai dès que j\'aurai lu ton message.|Vou te responder assim que tiver lido sua mensagem.', 'Quand tu auras fini, tu pourras sortir.|Quando tiver terminado, você poderá sair.', 'Dans dix ans, nous aurons construit notre maison.|Daqui a dez anos, teremos construído nossa casa.', 'Une fois qu\'elle sera partie, on fera la fête.|Depois que ela tiver saído, a gente faz festa.'],
        quiz: [
          'Je t\'appellerai quand j\'___ fini.|aurai|ai;aurais;avais|Ação anterior a outra no futuro → futur antérieur.',
          'Dès qu\'il ___ arrivé, on partira.|sera|est;aura;serait|*arriver* usa *être*.',
          '"Lorsque" é sinônimo de…|quand|parce que;pourtant;donc|*lorsque* = quando (mais formal).',
        ],
        fill: ['Quand tu ___ compris, tu verras. (avoir)|auras|Quando tiver entendido, você verá.|*avoir* no futuro: *auras*.', 'Dans un an, j\'___ appris le français.|aurai|Daqui a um ano, terei aprendido francês.|*j\'aurai* + particípio.'],
      },
      {
        id: 'u14l3', title: 'Le passé simple', emoji: '📖', goal: 'Reconhecer o passé simple em livros',
        intro: 'Nos livros e contos de fadas aparece um passado diferente: *il fut*, *elle alla*. Você não precisa falar — só reconhecer.',
        teach: [
          { title: 'Onde aparece', text: 'O *passé simple* é o passado **literário**: romances, contos, livros de história. Na fala usa-se o passé composé.\nAprenda a reconhecer a 3ª pessoa, que é a mais frequente.', table: [['il fut', 'ele foi (être)'], ['il eut', 'ele teve (avoir)'], ['il fit', 'ele fez (faire)'], ['il alla', 'ele foi (aller)'], ['il vint', 'ele veio (venir)'], ['il dit', 'ele disse (dire)'], ['il prit', 'ele pegou (prendre)'], ['il vit', 'ele viu (voir)'], ['ils parlèrent', 'eles falaram'], ['ils furent', 'eles foram']] },
          { title: 'Terminações', text: 'Verbos em *-er*: *-a / -èrent* (*il parla, ils parlèrent*).\nVerbos em *-ir* e *-re*: *-it / -irent* (*il finit, ils finirent*).\nOutros: *-ut / -urent* (*il put, ils purent*).', ex: ['Il était une fois une princesse.|Era uma vez uma princesa.', 'Le roi entra et regarda la reine.|O rei entrou e olhou a rainha.', 'Ils vécurent heureux.|Eles viveram felizes.'] },
        ],
        vocab: ['il était une fois|era uma vez|🏰', 'le roi|o rei|🤴', 'la reine|a rainha|👸', 'il fut|ele foi|📜', 'ils vécurent|eles viveram|💑'],
        sentences: ['Il était une fois un petit canard.|Era uma vez um patinho.', 'Il prit son chapeau et partit.|Ele pegou o chapéu e partiu.', 'Elle ouvrit la porte et vit le loup.|Ela abriu a porta e viu o lobo.', 'Ils se marièrent et eurent beaucoup d\'enfants.|Eles se casaram e tiveram muitos filhos.'],
        quiz: [
          '"Il fut" vem do verbo…|être|faire;falloir;fuir|*fut* = passé simple de *être*.',
          '"Elle alla" significa…|ela foi|ela ia;ela irá;ela iria|*aller* no passé simple.',
          'Onde o passé simple é usado?|Em textos literários|Em conversas;Em mensagens;Na TV ao vivo|Na fala, usa-se o passé composé.',
          '"Ils vécurent heureux" =|Eles viveram felizes|Eles vivem felizes;Eles viverão felizes;Eles viviam felizes|*vivre* → *vécurent*.',
        ],
        fill: ['Il ___ une fois un roi. (era)|était|Era uma vez um rei.|*Il était une fois* = era uma vez.'],
      },
      {
        id: 'u14l4', title: 'Avant, après, pendant', emoji: '🕰️', goal: 'Marcadores de tempo avançados',
        intro: 'Para narrar como um nativo: antes de, depois de ter, durante, enquanto.',
        teach: [
          { title: 'Estruturas', table: [['avant de + infinitif', 'antes de', 'avant de partir'], ['après + infinitif passé', 'depois de ter', 'après avoir mangé'], ['pendant + nom', 'durante', 'pendant le film'], ['pendant que + verbe', 'enquanto', 'pendant que tu dors'], ['depuis', 'desde / há (continua)', 'depuis trois ans'], ['il y a', 'há (terminado)', 'il y a trois ans']] },
          { title: 'Après avoir / après être', text: '*Après* + **infinitivo passado** (*avoir/être* + particípio):\n*Après avoir dîné, nous sommes sortis.*\n*Après être rentrée, elle a dormi.*', tip: '*Depuis* + presente = ação que continua: *J\'habite ici depuis 2020* (moro aqui desde 2020).' },
        ],
        vocab: ['avant de|antes de|⏮️', 'après avoir|depois de ter|⏭️', 'pendant|durante|↔️', 'depuis|desde, há|📍', 'entre-temps|enquanto isso|⏳', 'auparavant|antes, anteriormente|🕰️'],
        sentences: ['Lave-toi les mains avant de manger.|Lave as mãos antes de comer.', 'Après avoir fini, il est sorti.|Depois de ter terminado, ele saiu.', 'J\'apprends le français depuis six mois.|Aprendo francês há seis meses.', 'Pendant que tu travaillais, j\'ai cuisiné.|Enquanto você trabalhava, eu cozinhei.', 'Après être arrivés, nous avons dîné.|Depois de termos chegado, jantamos.'],
        quiz: [
          '___ avoir mangé, il est parti.|Après|Avant;Pendant;Depuis|*après* + infinitivo passado.',
          'J\'habite ici ___ cinq ans. (e continuo morando)|depuis|il y a;pendant que;avant|Ação que continua → *depuis*.',
          'Lave-toi les mains avant ___ manger.|de|que;à;pour|*avant de* + infinitivo.',
        ],
        fill: ['Après ___ fini, je dors. (avoir)|avoir|Depois de ter terminado, eu durmo.|*après avoir* + particípio.', 'Je travaille ici ___ 2020.|depuis|Trabalho aqui desde 2020.|*depuis* = desde.'],
      },
      {
        id: 'u14story', story: true, title: 'Le mystère du musée', emoji: '🕵️', goal: 'História: um pequeno mistério',
        intro: 'Um quadro desapareceu do museu. A inspetora Moreau interroga o guarda.',
        dialogue: [
          'Inspectrice|Qu\'est-ce que vous avez vu hier soir ?|O que o senhor viu ontem à noite?',
          'Gardien|Quand je suis arrivé à vingt heures, le musée était déjà fermé.|Quando cheguei às vinte horas, o museu já estava fechado.',
          'Gardien|Mais quelqu\'un avait laissé une fenêtre ouverte.|Mas alguém tinha deixado uma janela aberta.',
          'Inspectrice|Et après avoir fait votre ronde ?|E depois de ter feito sua ronda?',
          'Gardien|J\'ai remarqué que le tableau avait disparu.|Percebi que o quadro tinha desaparecido.',
          'Inspectrice|Je vous rappellerai dès que j\'aurai interrogé les autres.|Vou lhe ligar de novo assim que tiver interrogado os outros.',
        ],
        quiz: [
          'A que horas o guarda chegou?|Às 20h|Às 18h;À meia-noite;Às 22h|*à vingt heures*',
          'O que alguém tinha deixado aberto?|Uma janela|A porta;O cofre;A vitrine|*une fenêtre ouverte*',
          'Por que "avait disparu" está no plus-que-parfait?|O quadro sumiu antes de ele perceber|É um hábito;É uma hipótese;É futuro|Ação anterior a outra no passado.',
        ],
        vocab: ['le tableau|o quadro|🖼️', 'la fenêtre|a janela|🪟', 'la ronde|a ronda|🔦', 'disparaître|desaparecer|💨'],
        sentences: ['Le tableau avait disparu.|O quadro tinha desaparecido.', 'Quelqu\'un avait laissé la fenêtre ouverte.|Alguém tinha deixado a janela aberta.', 'Je vous rappellerai.|Vou lhe ligar de novo.'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u15', level: 'B2', title: 'Les pronoms', pt: 'Pronomes', emoji: '🎯',
    desc: 'Objeto direto e indireto, y, en, a ordem dos pronomes duplos e pronomes tônicos.',
    verbs: ['donner', 'dire', 'parler', 'penser', 'envoyer', 'prendre', 'aller'], tenses: ['present', 'passe_compose'],
    lessons: [
      {
        id: 'u15l1', title: 'Le, la, lui, leur', emoji: '👉', goal: 'Pronomes COD e COI',
        intro: 'Eu o vejo, eu lhe dou. Para não repetir palavras, o francês usa pronomes — antes do verbo!',
        teach: [
          { title: 'Objeto direto (COD)', text: 'Substitui algo que vem **sem preposição**: *Je vois Marie* → *Je **la** vois*.', table: [['me (m\')', 'me'], ['te (t\')', 'te'], ['le / la (l\')', 'o / a'], ['nous', 'nos'], ['vous', 'vos, o senhor'], ['les', 'os / as']] },
          { title: 'Objeto indireto (COI)', text: 'Substitui *à + pessoa*: *Je parle à Marie* → *Je **lui** parle*.', table: [['me, te', 'me, te'], ['lui', 'lhe (a ele / a ela)'], ['nous, vous', 'nos, vos'], ['leur', 'lhes (a eles / a elas)']], tip: '*lui* serve para homem **e** mulher. Verbos com COI: *parler à, téléphoner à, dire à, donner à, répondre à, écrire à, demander à*.' },
          { title: 'Posição', text: 'Sempre **antes do verbo conjugado** (ou do infinitivo):\n*Je le connais.* · *Je ne le connais pas.* · *Je vais le voir.* · *Je l\'ai vu.*\nNo imperativo afirmativo vai **depois**: *Regarde-le !* *Donne-moi !*' },
        ],
        vocab: ['le|o (objeto)', 'la|a (objeto)', 'les|os, as (objeto)', 'lui|lhe (a ele/ela)', 'leur|lhes (a eles)', 'répondre à|responder a|💬', 'téléphoner à|telefonar para|📞'],
        sentences: ['Tu connais Paul ? Oui, je le connais.|Você conhece o Paul? Sim, eu o conheço.', 'Je lui ai téléphoné hier.|Eu telefonei para ele ontem.', 'Nous leur avons écrit une lettre.|Nós lhes escrevemos uma carta.', 'Je ne la vois pas.|Eu não a vejo.', 'Donne-moi ton numéro !|Me dá seu número!', 'Je vais les inviter.|Vou convidá-los.'],
        quiz: [
          'Je parle à mes parents → Je ___ parle.|leur|les;lui;leurs|*à* + pessoas no plural → *leur*.',
          'Tu vois la voiture ? Oui, je ___ vois.|la|lui;le;leur|Objeto direto feminino → *la*.',
          'Onde fica o pronome em "Je vais ___ appeler"?|antes do infinitivo|antes de vais;depois de appeler;no fim da frase|Antes do verbo do qual é objeto: *Je vais l\'appeler.*',
          'Imperativo afirmativo: ___|Regarde-le !|Le regarde !;Regarde le !;Lui regarde !|No imperativo afirmativo o pronome vai depois, com hífen.',
        ],
        fill: ['Tu as vu Marc ? Oui, je l\'___ vu.|ai|Você viu o Marc? Sim, eu o vi.|*l\'* + *ai vu*.', 'J\'écris à Sophie → Je ___ écris.|lui|Escrevo para Sophie → Escrevo-lhe.|*à* + uma pessoa → *lui*.'],
      },
      {
        id: 'u15l2', title: 'Y et en', emoji: '🔣', goal: 'Os pronomes y e en',
        intro: 'Duas palavrinhas que confundem todo brasileiro — e que os franceses usam o tempo todo.',
        teach: [
          { title: 'Y', text: 'Substitui **lugar** ou **à + coisa**:\n*Tu vas à Paris ? Oui, j\'**y** vais.*\n*Tu penses à ton voyage ? Oui, j\'**y** pense.*', ex: ['On y va !|Vamos lá!', 'J\'y suis allé l\'année dernière.|Fui lá no ano passado.', 'Je n\'y pense plus.|Não penso mais nisso.'] },
          { title: 'En', text: 'Substitui **de + algo** ou **quantidades**:\n*Tu veux du café ? Oui, j\'**en** veux.*\n*Tu as des enfants ? Oui, j\'**en** ai deux.*\n*Tu viens de Lyon ? Oui, j\'**en** viens.*', ex: ['J\'en ai besoin.|Preciso disso.', 'Il y en a beaucoup.|Tem muito.', 'Combien en voulez-vous ?|Quantos o senhor quer?'], tip: 'Com quantidade, repita o número: *J\'en ai **trois***. Expressões fixas: *On y va*, *Je m\'en vais* (vou embora), *Ça y est* (pronto!).' },
        ],
        vocab: ['y|lá, nisso|📍', 'en|disso, dele, alguns|🔢', 'on y va|vamos lá|🚀', 'ça y est|pronto, consegui|✅', 'je m\'en vais|vou embora|🚶', 'avoir besoin de|precisar de|🆘'],
        sentences: ['Tu vas à la plage ? Oui, j\'y vais demain.|Você vai à praia? Sim, vou amanhã.', 'Tu as des frères ? Oui, j\'en ai deux.|Você tem irmãos? Sim, tenho dois.', 'Tu veux du gâteau ? Non merci, j\'en ai déjà mangé.|Quer bolo? Não, obrigado, já comi.', 'Il n\'y a plus de pain ? Si, il y en a.|Não tem mais pão? Tem sim.', 'Ça y est, j\'ai fini !|Pronto, terminei!'],
        quiz: [
          'Tu vas au marché ? Oui, j\'___ vais.|y|en;le;lui|Lugar → *y*.',
          'Tu bois du thé ? Oui, j\'___ bois.|en|y;le;la|*de* + coisa (partitivo) → *en*.',
          'Tu as combien de chats ? J\'___ ai trois.|en|y;les;leur|Quantidade → *en* + número.',
          'Tu penses à l\'examen ? Oui, j\'___ pense.|y|en;lui;le|*penser à* + coisa → *y*.',
        ],
        fill: ['On ___ va ! (vamos lá)|y|Vamos lá!|Expressão fixa *on y va*.', 'J\'___ ai besoin. (disso)|en|Preciso disso.|*avoir besoin de* → *en*.'],
      },
      {
        id: 'u15l3', title: 'Je le lui donne', emoji: '🧩', goal: 'Pronomes duplos',
        intro: 'Eu o dou a ele: *je le lui donne*. Quando há dois pronomes, a ordem é fixa.',
        teach: [
          { title: 'A ordem', text: 'Decore esta sequência:\n**me/te/nous/vous** → **le/la/les** → **lui/leur** → **y** → **en** → verbo', ex: ['Il me le donne.|Ele me dá (isso).', 'Je le lui ai dit.|Eu disse isso a ele.', 'Je vous les envoie.|Eu os envio ao senhor.', 'Il y en a.|Tem (disso).', 'Je leur en ai parlé.|Eu falei disso com eles.'] },
          { title: 'No imperativo', text: 'Imperativo afirmativo: verbo + **le/la/les** + **moi/lui/nous/leur** + **y/en**.\n*Donne-le-moi !* (Dá isso pra mim!) · *Donnez-m\'en !* (Me dê um pouco!)', tip: 'Na negativa volta a ordem normal: *Ne me le donne pas.*' },
        ],
        vocab: ['donner|dar|🎁', 'prêter|emprestar|🤝', 'montrer|mostrar|👀', 'rendre|devolver|↩️', 'expliquer|explicar|💡'],
        sentences: ['Tu me prêtes ton livre ? Oui, je te le prête.|Você me empresta seu livro? Sim, eu te empresto.', 'Elle lui a donné la clé ? Oui, elle la lui a donnée.|Ela deu a chave para ele? Sim, deu.', 'Montre-la-moi !|Mostra pra mim!', 'Je vous l\'explique tout de suite.|Explico isso ao senhor agora mesmo.', 'Ne me le dis pas !|Não me diga!'],
        quiz: [
          'Je donne le livre à Paul → Je ___ donne.|le lui|lui le;le leur;lui la|Ordem: *le* antes de *lui*.',
          'Il me donne les clés → Il ___ donne.|me les|les me;me leur;leur me|*me* antes de *les*.',
          'Imperativo: Donne la photo à moi → ___|Donne-la-moi !|Donne-moi-la !;Me la donne !;Donne-la-me !|Afirmativo: verbo-la-moi.',
        ],
        fill: ['Tu me le prêtes ? Oui, je te ___ prête.|le|Você me empresta? Sim, te empresto.|*te le*', 'Elle leur en a parlé ? Oui, elle leur ___ a parlé.|en|Ela falou disso com eles? Sim.|*leur en*'],
      },
      {
        id: 'u15l4', title: 'Moi, toi, lui', emoji: '🙋', goal: 'Pronomes tônicos e ênfase',
        intro: 'Moi, je… / C\'est lui ! Os pronomes tônicos dão ênfase e aparecem depois de preposições.',
        teach: [
          { title: 'Os tônicos', table: [['moi', 'eu / mim'], ['toi', 'tu / ti'], ['lui / elle', 'ele / ela'], ['nous', 'nós'], ['vous', 'vocês'], ['eux / elles', 'eles / elas']] },
          { title: 'Quando usar', text: '1. Ênfase: *Moi, je préfère le thé.*\n2. Depois de preposição: *avec moi, chez lui, pour eux.*\n3. Respostas curtas: *Qui veut ? — Moi !*\n4. Com *c\'est*: *C\'est toi ?*\n5. Comparações: *plus grand que lui.*', ex: ['Moi aussi.|Eu também.', 'Moi non plus.|Eu também não.', 'C\'est à toi ?|É seu?', 'Il est plus âgé que moi.|Ele é mais velho que eu.'], tip: '*Moi non plus* = “eu também não” (concordando com uma negativa).' },
        ],
        vocab: ['moi aussi|eu também|🙋', 'moi non plus|eu também não|🙅', 'chez moi|na minha casa|🏠', 'avec eux|com eles|👥', 'c\'est à moi|é meu|🫴'],
        sentences: ['Moi, je n\'aime pas le café.|Eu não gosto de café.', 'Tu viens avec nous ?|Você vem com a gente?', 'C\'est elle qui a raison.|É ela que tem razão.', 'Je n\'aime pas les épinards. — Moi non plus !|Não gosto de espinafre. — Eu também não!', 'Ce livre est à eux.|Este livro é deles.'],
        quiz: [
          'J\'adore le cinéma. — ___ aussi !|Moi|Je;Me;Mon|Resposta curta → pronome tônico.',
          'Je ne parle pas allemand. — Moi ___.|non plus|aussi;pas;jamais|Concordar com negativa → *moi non plus*.',
          'Je vais au cinéma avec ___ (eles).|eux|ils;leur;les|Depois de preposição → *eux*.',
        ],
        fill: ['Tu viens chez ___ ? (mim)|moi|Você vem na minha casa?|Depois de *chez* → *moi*.', 'C\'est ___ qui a appelé. (ele)|lui|Foi ele que ligou.|*c\'est* + tônico.'],
      },
      {
        id: 'u15story', story: true, title: 'Le cadeau', emoji: '🎁', goal: 'História: o presente de aniversário',
        intro: 'Raimundo e Camille preparam uma surpresa para Hugo.',
        dialogue: [
          'Camille|Tu as acheté le cadeau pour Hugo ?|Você comprou o presente do Hugo?',
          'Raimundo|Oui, je l\'ai acheté hier. Je vais le lui donner ce soir.|Sim, comprei ontem. Vou dar pra ele hoje à noite.',
          'Camille|Tu lui as parlé de la fête ?|Você falou da festa com ele?',
          'Raimundo|Non, je ne lui en ai pas parlé. C\'est une surprise !|Não, não falei nada disso. É surpresa!',
          'Camille|Et les ballons ? Il en faut beaucoup !|E os balões? Precisa de muitos!',
          'Raimundo|J\'en ai acheté vingt. On y va ?|Comprei vinte. Vamos lá?',
        ],
        quiz: [
          'Quando Raimundo vai dar o presente?|Hoje à noite|Amanhã;Ontem;No fim de semana|*Je vais le lui donner ce soir.*',
          'Hugo sabe da festa?|Não, é surpresa|Sim;Talvez;Ele organizou|*Je ne lui en ai pas parlé.*',
          'Quantos balões Raimundo comprou?|Vinte|Dez;Dois;Doze|*J\'en ai acheté vingt.*',
        ],
        vocab: ['le cadeau|o presente|🎁', 'la fête|a festa|🎉', 'le ballon|o balão|🎈', 'la surprise|a surpresa|😲'],
        sentences: ['Je vais le lui donner.|Vou dar pra ele.', 'Il en faut beaucoup.|Precisa de muitos.', 'C\'est une surprise !|É surpresa!'],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  {
    id: 'u16', level: 'B2', title: 'Relier les idées', pt: 'Frases complexas', emoji: '🔗',
    desc: 'Pronomes relativos (qui, que, dont, où, lequel), voz passiva, gérondif e particípio presente.',
    verbs: ['construire', 'écrire', 'découvrir', 'produire', 'vendre', 'traduire', 'faire'], tenses: ['present', 'passe_compose', 'futur'],
    lessons: [
      {
        id: 'u16l1', title: 'Qui, que, où', emoji: '🔗', goal: 'Pronomes relativos simples',
        intro: 'O homem **que** eu vi, a cidade **onde** moro: os relativos juntam duas frases em uma.',
        teach: [
          { title: 'Qui x que', text: '**qui** = sujeito do verbo seguinte: *L\'homme **qui** parle est mon père.*\n**que** = objeto: *L\'homme **que** je vois est mon père.*\nTruque: depois de *qui* vem um **verbo**; depois de *que* vem um **sujeito**.', ex: ['La fille qui chante est ma sœur.|A menina que canta é minha irmã.', 'Le livre que je lis est génial.|O livro que estou lendo é genial.'] },
          { title: 'Où', text: '**où** = lugar **e tempo**: *la ville **où** j\'habite*, *le jour **où** je t\'ai rencontré* (o dia em que te conheci).', tip: '*Que* vira *qu\'* antes de vogal, mas *qui* **nunca** sofre elisão: *l\'ami qui arrive*.' },
        ],
        vocab: ['qui|que, quem (sujeito)', 'que|que (objeto)', 'où|onde, em que', 'le jour où|o dia em que|📅', 'la ville où|a cidade onde|🏙️'],
        sentences: ['C\'est le restaurant où nous avons dîné.|É o restaurante onde jantamos.', 'Le film que j\'ai vu était triste.|O filme que eu vi era triste.', 'J\'ai un ami qui habite à Lyon.|Tenho um amigo que mora em Lyon.', 'Je me souviens du jour où tu es arrivé.|Lembro do dia em que você chegou.', 'Voici la robe qu\'elle a achetée.|Aqui está o vestido que ela comprou.'],
        quiz: [
          'La femme ___ parle est française.|qui|que;où;dont|Depois vem um verbo → *qui* (sujeito).',
          'Le gâteau ___ tu as fait est délicieux.|que|qui;où;dont|Depois vem um sujeito (*tu*) → *que*.',
          'Le jour ___ je suis né, il pleuvait.|où|que;qui;quand|*où* também indica tempo.',
        ],
        fill: ['C\'est la maison ___ j\'ai grandi.|où|É a casa onde cresci.|Lugar → *où*.', 'Le prof ___ enseigne le français est sympa.|qui|O professor que ensina francês é legal.|Sujeito → *qui*.'],
      },
      {
        id: 'u16l2', title: 'Dont et lequel', emoji: '🧷', goal: 'Relativos dont, lequel, auquel',
        intro: 'O livro **de que** te falei, a razão **pela qual**… Os relativos avançados.',
        teach: [
          { title: 'Dont', text: '**dont** substitui **de + algo**: *Je parle **de** ce livre* → *le livre **dont** je parle* (o livro de que falo).\nTambém = “cujo”: *l\'ami **dont** la sœur est médecin* (o amigo cuja irmã é médica).', ex: ['C\'est le film dont tout le monde parle.|É o filme de que todo mundo fala.', 'La chose dont j\'ai besoin…|A coisa de que preciso…'] },
          { title: 'Lequel e companhia', text: 'Depois de **preposição** (para coisas): *lequel, laquelle, lesquels, lesquelles*.\nCom *à*: *auquel, à laquelle, auxquels*. Com *de* (em locuções): *duquel*.', table: [['la raison pour laquelle', 'a razão pela qual'], ['le stylo avec lequel', 'a caneta com a qual'], ['le projet auquel je pense', 'o projeto em que penso'], ['le parc près duquel', 'o parque perto do qual']], tip: 'Para **pessoas** depois de preposição, prefira *qui*: *l\'ami avec qui je voyage*.' },
        ],
        vocab: ['dont|de que, cujo', 'lequel|o qual', 'laquelle|a qual', 'auquel|ao qual', 'la raison|a razão|🤔', 'avoir besoin de|precisar de|🆘'],
        sentences: ['Voici le livre dont je t\'ai parlé.|Aqui está o livro de que te falei.', 'C\'est la raison pour laquelle je suis venu.|É a razão pela qual eu vim.', 'L\'entreprise pour laquelle je travaille est petite.|A empresa para a qual trabalho é pequena.', 'Le projet auquel je pense est ambitieux.|O projeto em que penso é ambicioso.', 'J\'ai une amie dont le père est pilote.|Tenho uma amiga cujo pai é piloto.'],
        quiz: [
          'Le livre ___ j\'ai besoin est cher.|dont|que;qui;lequel|*avoir besoin de* → *dont*.',
          'C\'est la raison pour ___ je pars.|laquelle|lequel;dont;que|*raison* é feminino → *laquelle*.',
          'Le problème ___ je pense est grave.|auquel|dont;lequel;que|*penser à* + masculino → *auquel*.',
          'L\'homme ___ la fille est actrice.|dont|que;qui;lequel|“cujo/cuja” → *dont*.',
        ],
        fill: ['C\'est le sujet ___ on parle. (de que)|dont|É o assunto de que falamos.|*parler de* → *dont*.', 'Le stylo avec ___ j\'écris est bleu.|lequel|A caneta com a qual escrevo é azul.|*stylo* é masculino → *lequel*.'],
      },
      {
        id: 'u16l3', title: 'La voix passive', emoji: '🔄', goal: 'Voz passiva',
        intro: 'A Torre Eiffel **foi construída** em 1889. A voz passiva coloca o foco em quem sofre a ação.',
        teach: [
          { title: 'Formação', text: '**être** (no tempo desejado) + **particípio** (concorda com o sujeito) + **par** + agente.', ex: ['La tour Eiffel a été construite en 1889.|A Torre Eiffel foi construída em 1889.', 'Le livre est écrit par un Brésilien.|O livro é escrito por um brasileiro.', 'Les résultats seront publiés demain.|Os resultados serão publicados amanhã.'] },
          { title: 'Alternativas', text: 'O francês falado evita a passiva. Prefere:\n**on** + verbo ativo: *On a volé ma voiture* (Roubaram meu carro).\n**se** + verbo: *Ça se dit* (isso se diz), *Le vin blanc se boit frais*.', tip: 'Com sentimentos e estados usa-se *de* no lugar de *par*: *Il est aimé **de** tous.*' },
        ],
        vocab: ['construit|construído|🏗️', 'publié|publicado|📰', 'volé|roubado|🦹', 'par|por (agente)', 'le résultat|o resultado|📊', 'on dit que|dizem que|🗣️'],
        sentences: ['Ce tableau a été peint par Monet.|Este quadro foi pintado por Monet.', 'La réunion est annulée.|A reunião está cancelada.', 'Les invités seront accueillis à l\'entrée.|Os convidados serão recebidos na entrada.', 'On m\'a volé mon portefeuille.|Roubaram minha carteira.', 'Ce mot ne se dit plus.|Essa palavra não se diz mais.'],
        quiz: [
          'Passiva de "Victor Hugo a écrit ce livre":|Ce livre a été écrit par Victor Hugo.|Ce livre est écrit par Victor Hugo hier.;Ce livre a écrit Victor Hugo.;Ce livre était écrit de Victor Hugo.|Mesmo tempo (passé composé) de *être* + particípio.',
          'La maison a été ___. (construire)|construite|construit;construits;construire|Concorda com *maison* (feminino).',
          'Forma mais natural na fala: "Roubaram meu carro"|On a volé ma voiture.|Ma voiture a été volée par quelqu\'un.;Ils ont volé ma voiture eux.;Ma voiture se vole.|O francês falado prefere *on*.',
        ],
        fill: ['Les lettres ___ envoyées hier. (foram)|ont été|As cartas foram enviadas ontem.|*être* no passé composé: *ont été*.', 'Il est aimé ___ tous.|de|Ele é amado por todos.|Sentimentos → *de*.'],
      },
      {
        id: 'u16l4', title: 'En marchant', emoji: '🚶', goal: 'Gérondif e particípio presente',
        intro: 'Aprendo francês **ouvindo** música. O gérondif mostra duas ações ao mesmo tempo.',
        teach: [
          { title: 'Gérondif', text: '**en** + radical do *nous* + **-ant**:\n*nous parlons* → *en parlant*. *nous finissons* → *en finissant*.\nIrregulares: *en étant, en ayant, en sachant*.', ex: ['Je chante en cuisinant.|Canto enquanto cozinho.', 'C\'est en forgeant qu\'on devient forgeron.|É praticando que se aprende. (provérbio)', 'Il est tombé en courant.|Ele caiu correndo.'] },
          { title: 'Usos', text: '1. **Simultaneidade**: *Ne téléphone pas en conduisant.*\n2. **Modo/meio**: *J\'ai appris en lisant.*\n3. **Condição**: *En partant tôt, tu arriveras à l\'heure.*', tip: 'O gérondif sempre se refere ao **sujeito** da frase principal.' },
        ],
        vocab: ['en marchant|andando|🚶', 'en lisant|lendo|📖', 'en conduisant|dirigindo|🚗', 'en sachant|sabendo|🧠', 'en attendant|enquanto isso, esperando|⏳'],
        sentences: ['J\'écoute de la musique en travaillant.|Escuto música enquanto trabalho.', 'En étudiant tous les jours, tu progresseras vite.|Estudando todo dia, você vai progredir rápido.', 'Il a souri en me voyant.|Ele sorriu ao me ver.', 'Ne mange pas en parlant !|Não coma falando!', 'En attendant, prends un café.|Enquanto isso, tome um café.'],
        quiz: [
          'Gérondif de "faire":|en faisant|en faitant;en fairant;en fasant|*nous faisons* → *en faisant*.',
          'Gérondif de "être":|en étant|en étant été;en soyant;en être|Irregular: *en étant*.',
          '"Je chante en cuisinant" =|Canto enquanto cozinho|Canto na cozinha;Canto e depois cozinho;Cozinho cantores|Ações simultâneas.',
        ],
        fill: ['Il lit en ___ le métro. (prendre)|prenant|Ele lê pegando o metrô.|*nous prenons* → *prenant*.', 'J\'ai appris le français en ___ des films. (regarder)|regardant|Aprendi francês assistindo filmes.|*regarder* → *regardant*.'],
      },
      {
        id: 'u16story', story: true, title: 'L\'interview', emoji: '🎙️', goal: 'História: entrevista com uma escritora',
        intro: 'Uma jornalista entrevista a escritora Inès sobre seu novo livro.',
        dialogue: [
          'Journaliste|Votre roman, dont tout le monde parle, a été traduit en douze langues.|Seu romance, de que todos falam, foi traduzido para doze línguas.',
          'Inès|Oui, c\'est le livre qui a changé ma vie.|Sim, é o livro que mudou minha vida.',
          'Journaliste|Où l\'avez-vous écrit ?|Onde a senhora o escreveu?',
          'Inès|Dans le petit café où je travaillais quand j\'étais étudiante. J\'écrivais en servant les clients !|No pequeno café onde eu trabalhava quando era estudante. Eu escrevia servindo os clientes!',
          'Journaliste|Quelle est la raison pour laquelle vous écrivez ?|Qual é a razão pela qual a senhora escreve?',
          'Inès|C\'est en écrivant que je comprends le monde.|É escrevendo que eu entendo o mundo.',
        ],
        quiz: [
          'Em quantas línguas o livro foi traduzido?|Doze|Dez;Duas;Vinte|*traduit en douze langues*',
          'Onde Inès escreveu o livro?|No café onde trabalhava|Na universidade;Em casa;Numa biblioteca|*Dans le petit café où je travaillais*',
          'Qual pronome relativo aparece em "dont tout le monde parle"?|dont — porque é "parler de"|que;qui;où|*parler de* → *dont*.',
        ],
        vocab: ['le roman|o romance (livro)|📕', 'traduit|traduzido|🌐', 'la langue|a língua|🗣️', 'l\'étudiante|a estudante|🎓'],
        sentences: ['Votre roman a été traduit en douze langues.|Seu romance foi traduzido para doze línguas.', 'J\'écrivais en servant les clients.|Eu escrevia servindo os clientes.', 'C\'est en écrivant que je comprends le monde.|É escrevendo que entendo o mundo.'],
      },
    ],
  },
];
