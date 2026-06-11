// ═══════════════════════════════════════════════════════════
//  LinguaAO — data.js
//  Base de dados: lições, vocabulário, quizzes, frases do dia
// ═══════════════════════════════════════════════════════════

const LINGUA_DATA = {

  // ── FRASES DO DIA ──────────────────────────────────────────
  dailyPhrases: [
    { en: "The early bird catches the worm.", pt: "Deus ajuda quem cedo madruga." },
    { en: "Practice makes perfect.", pt: "A prática leva à perfeição." },
    { en: "Every day is a new opportunity.", pt: "Cada dia é uma nova oportunidade." },
    { en: "Knowledge is power.", pt: "O conhecimento é poder." },
    { en: "Step by step, we reach the top.", pt: "Passo a passo chega-se ao topo." },
    { en: "Don't give up — great things take time.", pt: "Não desistas — as grandes coisas levam tempo." },
    { en: "Mistakes are proof that you are trying.", pt: "Os erros são prova de que estás a tentar." },
    { en: "Where there's a will, there's a way.", pt: "Onde há vontade, há um caminho." },
    { en: "Life is short — enjoy every moment.", pt: "A vida é curta — aproveita cada momento." },
    { en: "Hard work pays off.", pt: "O trabalho árduo compensa." },
    { en: "Be yourself — everyone else is taken.", pt: "Sê tu mesmo — todos os outros já estão ocupados." },
    { en: "Dream big, work hard, stay humble.", pt: "Sonha grande, trabalha muito, mantém-te humilde." },
    { en: "Success begins outside your comfort zone.", pt: "O sucesso começa fora da zona de conforto." },
    { en: "A journey of a thousand miles begins with a single step.", pt: "Uma jornada de mil quilómetros começa com um único passo." },
  ],

  // ── VOCABULÁRIO (usado nos mini-jogos) ─────────────────────
  vocabulary: {
    beginner: [
      { word: "Hello",      phonetic: "/həˈloʊ/",   translation: "Olá",          example: "Hello! How are you?" },
      { word: "Goodbye",    phonetic: "/ˌɡʊdˈbaɪ/", translation: "Adeus",         example: "Goodbye! See you tomorrow!" },
      { word: "Please",     phonetic: "/pliːz/",     translation: "Por favor",     example: "Can I have water, please?" },
      { word: "Thank you",  phonetic: "/ˈθæŋk juː/",translation: "Obrigado/a",    example: "Thank you very much!" },
      { word: "Sorry",      phonetic: "/ˈsɒri/",     translation: "Desculpa",      example: "I'm sorry I'm late." },
      { word: "Yes",        phonetic: "/jɛs/",       translation: "Sim",           example: "Yes, I understand." },
      { word: "No",         phonetic: "/noʊ/",       translation: "Não",           example: "No, that's not correct." },
      { word: "Water",      phonetic: "/ˈwɔːtər/",   translation: "Água",          example: "I need some water." },
      { word: "Food",       phonetic: "/fuːd/",      translation: "Comida",        example: "The food is delicious." },
      { word: "House",      phonetic: "/haʊs/",      translation: "Casa",          example: "This is my house." },
      { word: "Family",     phonetic: "/ˈfæmɪli/",   translation: "Família",       example: "I love my family." },
      { word: "Friend",     phonetic: "/frɛnd/",     translation: "Amigo/a",       example: "She is my best friend." },
      { word: "School",     phonetic: "/skuːl/",     translation: "Escola",        example: "I go to school every day." },
      { word: "Work",       phonetic: "/wɜːrk/",     translation: "Trabalho",      example: "I work in an office." },
      { word: "Time",       phonetic: "/taɪm/",      translation: "Tempo / Hora",  example: "What time is it?" },
      { word: "Day",        phonetic: "/deɪ/",       translation: "Dia",           example: "Today is a beautiful day." },
      { word: "Night",      phonetic: "/naɪt/",      translation: "Noite",         example: "Good night, sleep well." },
      { word: "Morning",    phonetic: "/ˈmɔːrnɪŋ/",  translation: "Manhã",         example: "Good morning!" },
      { word: "Happy",      phonetic: "/ˈhæpi/",     translation: "Feliz",         example: "I am very happy today." },
      { word: "Beautiful",  phonetic: "/ˈbjuːtɪfəl/",translation: "Bonito/a",      example: "Angola is a beautiful country." },
    ],
    intermediate: [
      { word: "Experience",   phonetic: "/ɪkˈspɪərɪəns/", translation: "Experiência",    example: "She has years of experience." },
      { word: "Opportunity",  phonetic: "/ˌɒpəˈtjuːnɪti/",translation: "Oportunidade",   example: "This is a great opportunity." },
      { word: "Achieve",      phonetic: "/əˈtʃiːv/",       translation: "Alcançar",       example: "I want to achieve my goals." },
      { word: "Improve",      phonetic: "/ɪmˈpruːv/",      translation: "Melhorar",       example: "I improve every day." },
      { word: "Challenge",    phonetic: "/ˈtʃælɪndʒ/",     translation: "Desafio",        example: "Learning English is a challenge." },
      { word: "Confident",    phonetic: "/ˈkɒnfɪdənt/",    translation: "Confiante",      example: "She feels confident now." },
      { word: "Determine",    phonetic: "/dɪˈtɜːrmɪn/",    translation: "Determinar",     example: "He is determined to succeed." },
      { word: "Communicate",  phonetic: "/kəˈmjuːnɪkeɪt/", translation: "Comunicar",      example: "We communicate in English." },
      { word: "Understand",   phonetic: "/ˌʌndərˈstænd/",  translation: "Compreender",    example: "I understand the lesson." },
      { word: "Environment",  phonetic: "/ɪnˈvaɪrənmənt/", translation: "Ambiente",       example: "We must protect the environment." },
      { word: "Government",   phonetic: "/ˈɡʌvərnmənt/",   translation: "Governo",        example: "The government made a decision." },
      { word: "Relationship", phonetic: "/rɪˈleɪʃənʃɪp/",  translation: "Relação",        example: "Good relationships matter." },
      { word: "Technology",   phonetic: "/tɛkˈnɒlədʒi/",   translation: "Tecnologia",     example: "Technology changes our lives." },
      { word: "Community",    phonetic: "/kəˈmjuːnɪti/",   translation: "Comunidade",     example: "I love my community." },
      { word: "Responsibility",phonetic: "/rɪˌspɒnsɪˈbɪlɪti/",translation:"Responsabilidade",example:"We all have responsibilities." },
    ],
    advanced: [
      { word: "Sophisticated", phonetic: "/səˈfɪstɪkeɪtɪd/", translation: "Sofisticado/a",   example: "A sophisticated approach to learning." },
      { word: "Perseverance",  phonetic: "/ˌpɜːrsɪˈvɪərəns/",translation: "Perseverança",     example: "Success requires perseverance." },
      { word: "Eloquent",      phonetic: "/ˈɛləkwənt/",       translation: "Eloquente",        example: "She gave an eloquent speech." },
      { word: "Ambiguous",     phonetic: "/æmˈbɪɡjuəs/",      translation: "Ambíguo/a",        example: "The instructions were ambiguous." },
      { word: "Inevitable",    phonetic: "/ɪnˈɛvɪtəbəl/",     translation: "Inevitável",       example: "Change is inevitable." },
      { word: "Pragmatic",     phonetic: "/præɡˈmætɪk/",      translation: "Pragmático/a",     example: "Be pragmatic in your decisions." },
      { word: "Resilience",    phonetic: "/rɪˈzɪlɪəns/",      translation: "Resiliência",      example: "Resilience is key to success." },
      { word: "Phenomenon",    phonetic: "/fɪˈnɒmɪnən/",      translation: "Fenómeno",         example: "This is a natural phenomenon." },
      { word: "Contemporary",  phonetic: "/kənˈtɛmpərɛri/",   translation: "Contemporâneo/a",  example: "Contemporary art is fascinating." },
      { word: "Entrepreneurial",phonetic:"/ˌɒntrəprəˈnɜːrɪəl/",translation:"Empreendedor/a",  example:"She has an entrepreneurial spirit." },
    ],
  },

  // ── LIÇÕES ESTRUTURADAS ────────────────────────────────────
  units: [
    // ═══ UNIDADE 1 — BÁSICOS ═══
    {
      id: "u1",
      level: "beginner",
      icon: "👋",
      title: "Cumprimentos Básicos",
      subtitle: "Como dizer olá e apresentar-se",
      lessons: [
        {
          id: "u1l1",
          title: "Hello & Goodbye",
          meta: "5 palavras · 5 min",
          xp: 15,
          steps: [
            {
              type: "intro",
              icon: "👋",
              title: "Cumprimentos em Inglês",
              body: "Aprende as primeiras palavras essenciais para cumprimentar alguém em Inglês. É mais simples do que pensas!",
            },
            {
              type: "vocab",
              word: "Hello",
              phonetic: "/həˈloʊ/",
              translation: "Olá",
              example: "Hello! My name is Ana.",
              tip: "Usa 'Hello' a qualquer hora do dia.",
            },
            {
              type: "vocab",
              word: "Good morning",
              phonetic: "/ɡʊd ˈmɔːrnɪŋ/",
              translation: "Bom dia",
              example: "Good morning! How are you?",
              tip: "Diz 'Good morning' até ao meio-dia.",
            },
            {
              type: "vocab",
              word: "Good night",
              phonetic: "/ɡʊd naɪt/",
              translation: "Boa noite",
              example: "Good night! Sleep well.",
              tip: "Usa ao despedir-te à noite.",
            },
            {
              type: "vocab",
              word: "Goodbye",
              phonetic: "/ˌɡʊdˈbaɪ/",
              translation: "Adeus",
              example: "Goodbye! See you tomorrow.",
              tip: "'Bye' é a versão informal.",
            },
            {
              type: "quiz",
              question: "Como se diz 'Bom dia' em Inglês?",
              options: ["Good night", "Good morning", "Good afternoon", "Hello"],
              correct: 1,
            },
            {
              type: "quiz",
              question: "O que significa 'Goodbye'?",
              options: ["Olá", "Obrigado", "Adeus", "Por favor"],
              correct: 2,
            },
            {
              type: "quiz",
              question: "Qual é a forma informal de 'Goodbye'?",
              options: ["Hi", "Hey", "Bye", "See"],
              correct: 2,
            },
            { type: "complete", xp: 15 },
          ],
        },
        {
          id: "u1l2",
          title: "Apresentar-se",
          meta: "6 frases · 7 min",
          xp: 20,
          steps: [
            {
              type: "intro",
              icon: "🙋",
              title: "Como te apresentar",
              body: "Aprende a dizer o teu nome, a tua idade e de onde és em Inglês.",
            },
            {
              type: "vocab",
              word: "My name is...",
              phonetic: "/maɪ neɪm ɪz/",
              translation: "O meu nome é...",
              example: "My name is Carlos. Nice to meet you!",
              tip: "Usa sempre 'My name is' + o teu nome.",
            },
            {
              type: "vocab",
              word: "I am from...",
              phonetic: "/aɪ æm frɒm/",
              translation: "Sou de...",
              example: "I am from Angola.",
              tip: "'I'm from' é a forma contraída — mais natural.",
            },
            {
              type: "vocab",
              word: "Nice to meet you",
              phonetic: "/naɪs tə miːt juː/",
              translation: "Prazer em conhecer-te",
              example: "— My name is Ana. — Nice to meet you, Ana!",
              tip: "Diz isto sempre quando conheces alguém pela primeira vez.",
            },
            {
              type: "vocab",
              word: "How are you?",
              phonetic: "/haʊ ɑːr juː/",
              translation: "Como estás?",
              example: "— Hello! How are you? — I'm fine, thank you!",
              tip: "'How are you?' é a pergunta mais comum em Inglês.",
            },
            {
              type: "quiz",
              question: "Como se diz 'O meu nome é João' em Inglês?",
              options: ["I am João", "My name is João", "Name João", "João is my"],
              correct: 1,
            },
            {
              type: "quiz",
              question: "O que significa 'Nice to meet you'?",
              options: ["Como estás?", "Prazer em conhecer-te", "Onde moras?", "Até logo"],
              correct: 1,
            },
            {
              type: "quiz",
              question: "Como respondes a 'How are you?'",
              options: ["My name is Ana", "I am from Luanda", "I'm fine, thank you!", "Nice to meet you"],
              correct: 2,
            },
            { type: "complete", xp: 20 },
          ],
        },
        {
          id: "u1l3",
          title: "Palavras de Cortesia",
          meta: "5 palavras · 5 min",
          xp: 15,
          steps: [
            { type: "intro", icon: "🤝", title: "Ser educado em Inglês", body: "Palavras como 'please' e 'thank you' são essenciais para a comunicação do dia a dia." },
            { type: "vocab", word: "Please", phonetic: "/pliːz/", translation: "Por favor", example: "Can I have some water, please?", tip: "Coloca 'please' no fim da frase para ser mais educado." },
            { type: "vocab", word: "Thank you", phonetic: "/ˈθæŋk juː/", translation: "Obrigado/a", example: "Thank you for your help!", tip: "'Thanks' é a versão mais informal." },
            { type: "vocab", word: "You're welcome", phonetic: "/jɔːr ˈwɛlkəm/", translation: "De nada", example: "— Thank you! — You're welcome!", tip: "Diz isto quando alguém te agradece." },
            { type: "vocab", word: "Sorry", phonetic: "/ˈsɒri/", translation: "Desculpa", example: "Sorry, I didn't understand.", tip: "'Excuse me' usa-se para pedir passagem ou chamar atenção." },
            { type: "quiz", question: "Como se diz 'De nada' em Inglês?", options: ["Thank you", "Please", "You're welcome", "Sorry"], correct: 2 },
            { type: "quiz", question: "O que significa 'Sorry'?", options: ["Por favor", "Obrigado", "Desculpa", "Olá"], correct: 2 },
            { type: "complete", xp: 15 },
          ],
        },
      ],
    },

    // ═══ UNIDADE 2 — NÚMEROS E CORES ═══
    {
      id: "u2",
      level: "beginner",
      icon: "🔢",
      title: "Números e Cores",
      subtitle: "Conta e descreve o mundo à tua volta",
      lessons: [
        {
          id: "u2l1",
          title: "Números 1–20",
          meta: "20 palavras · 8 min",
          xp: 20,
          steps: [
            { type: "intro", icon: "🔢", title: "Números em Inglês", body: "Os números são usados em quase todas as conversas. Aprende de 1 a 20 agora!" },
            { type: "vocab", word: "One / Two / Three", phonetic: "/wʌn/ /tuː/ /θriː/", translation: "Um / Dois / Três", example: "I have one brother and two sisters.", tip: "Three começa com o som 'th' — passa a língua entre os dentes." },
            { type: "vocab", word: "Four / Five / Six", phonetic: "/fɔːr/ /faɪv/ /sɪks/", translation: "Quatro / Cinco / Seis", example: "The class starts at four o'clock.", tip: "Five tem um 'v' sonoro — como em 'vida'." },
            { type: "vocab", word: "Seven / Eight / Nine / Ten", phonetic: "/ˈsɛvən/ /eɪt/ /naɪn/ /tɛn/", translation: "Sete / Oito / Nove / Dez", example: "I work ten hours a day.", tip: "Eight pronuncia-se 'eɪt' — como a letra A." },
            { type: "vocab", word: "Eleven / Twelve", phonetic: "/ɪˈlɛvən/ /twɛlv/", translation: "Onze / Doze", example: "There are twelve months in a year.", tip: "Eleven e Twelve são irregulares — memoriza!" },
            { type: "vocab", word: "Thirteen to Twenty", phonetic: "/ˈθɜːrtiːn/ ... /ˈtwɛnti/", translation: "Treze a Vinte", example: "She is twenty years old.", tip: "De 13 a 19 adicionas '-teen' ao número base." },
            { type: "quiz", question: "Como se diz '8' em Inglês?", options: ["Seven", "Nine", "Eight", "Six"], correct: 2 },
            { type: "quiz", question: "Quantos meses tem um ano em Inglês? 'There are ___ months in a year.'", options: ["Ten", "Twelve", "Twenty", "Eleven"], correct: 1 },
            { type: "quiz", question: "O que significa 'Twenty'?", options: ["Doze", "Dezasseis", "Vinte", "Trinta"], correct: 2 },
            { type: "complete", xp: 20 },
          ],
        },
        {
          id: "u2l2",
          title: "Cores Básicas",
          meta: "10 cores · 6 min",
          xp: 15,
          steps: [
            { type: "intro", icon: "🎨", title: "Cores em Inglês", body: "Aprende as cores para descrever tudo à tua volta!" },
            { type: "vocab", word: "Red / Blue / Green", phonetic: "/rɛd/ /bluː/ /ɡriːn/", translation: "Vermelho / Azul / Verde", example: "The flag has red, black and yellow.", tip: "A bandeira de Angola tem vermelho e preto!" },
            { type: "vocab", word: "Yellow / White / Black", phonetic: "/ˈjɛloʊ/ /waɪt/ /blæk/", translation: "Amarelo / Branco / Preto", example: "I wear a white shirt to work.", tip: "Yellow pronuncia-se 'JEL-oh'." },
            { type: "vocab", word: "Orange / Purple / Pink / Brown", phonetic: "/ˈɒrɪndʒ/ /ˈpɜːrpəl/ /pɪŋk/ /braʊn/", translation: "Laranja / Roxo / Rosa / Castanho", example: "She has a purple dress.", tip: "Orange é também uma fruta!" },
            { type: "quiz", question: "Qual é a cor 'Yellow'?", options: ["Azul", "Verde", "Amarelo", "Laranja"], correct: 2 },
            { type: "quiz", question: "Como se diz 'Vermelho' em Inglês?", options: ["Blue", "Red", "Pink", "Orange"], correct: 1 },
            { type: "complete", xp: 15 },
          ],
        },
      ],
    },

    // ═══ UNIDADE 3 — VIDA DIÁRIA ═══
    {
      id: "u3",
      level: "beginner",
      icon: "🌅",
      title: "Rotina Diária",
      subtitle: "Descreve o teu dia em Inglês",
      lessons: [
        {
          id: "u3l1",
          title: "Horas do Dia",
          meta: "6 expressões · 7 min",
          xp: 20,
          steps: [
            { type: "intro", icon: "⏰", title: "O tempo em Inglês", body: "Aprende a dizer as horas e a falar sobre partes do dia." },
            { type: "vocab", word: "What time is it?", phonetic: "/wɒt taɪm ɪz ɪt/", translation: "Que horas são?", example: "Excuse me, what time is it?", tip: "Esta é a forma mais comum de perguntar as horas." },
            { type: "vocab", word: "It's [number] o'clock", phonetic: "/ɪts ... əˈklɒk/", translation: "São [número] horas", example: "It's three o'clock in the afternoon.", tip: "O'clock indica horas exatas — sem minutos." },
            { type: "vocab", word: "In the morning / afternoon / evening", phonetic: "/ɪn ðə ˈmɔːrnɪŋ/", translation: "De manhã / De tarde / De noite", example: "I study in the morning.", tip: "Evening começa ao anoitecer (~18h)." },
            { type: "quiz", question: "Como se pergunta as horas em Inglês?", options: ["What day is it?", "What time is it?", "Where are you?", "How old are you?"], correct: 1 },
            { type: "quiz", question: "O que significa 'In the morning'?", options: ["De noite", "De tarde", "De manhã", "Ao meio-dia"], correct: 2 },
            { type: "complete", xp: 20 },
          ],
        },
        {
          id: "u3l2",
          title: "Dias da Semana",
          meta: "7 palavras · 6 min",
          xp: 20,
          steps: [
            { type: "intro", icon: "📅", title: "Dias da Semana", body: "Aprende os 7 dias da semana em Inglês — são essenciais para marcar compromissos!" },
            { type: "vocab", word: "Monday / Tuesday / Wednesday", phonetic: "/ˈmʌndeɪ/ /ˈtjuːzdeɪ/ /ˈwɛnzdeɪ/", translation: "Segunda / Terça / Quarta", example: "The meeting is on Monday.", tip: "Wednesday pronuncia-se 'WENZ-day' — o 'd' do meio é mudo!" },
            { type: "vocab", word: "Thursday / Friday", phonetic: "/ˈθɜːrzdeɪ/ /ˈfraɪdeɪ/", translation: "Quinta / Sexta", example: "I finish work on Friday.", tip: "TGIF = Thank God It's Friday! 😄" },
            { type: "vocab", word: "Saturday / Sunday", phonetic: "/ˈsætərdeɪ/ /ˈsʌndeɪ/", translation: "Sábado / Domingo", example: "I rest on Saturday and Sunday.", tip: "O fim de semana é 'the weekend'." },
            { type: "quiz", question: "Como se diz 'Quarta-feira' em Inglês?", options: ["Tuesday", "Thursday", "Wednesday", "Monday"], correct: 2 },
            { type: "quiz", question: "Qual é o último dia da semana em Inglês?", options: ["Saturday", "Sunday", "Friday", "Monday"], correct: 1 },
            { type: "quiz", question: "O que é 'the weekend'?", options: ["A semana toda", "Os dias úteis", "Sábado e Domingo", "A segunda-feira"], correct: 2 },
            { type: "complete", xp: 20 },
          ],
        },
      ],
    },

    // ═══ UNIDADE 4 — INTERMÉDIO: NO TRABALHO ═══
    {
      id: "u4",
      level: "intermediate",
      icon: "💼",
      title: "No Trabalho",
      subtitle: "Inglês profissional para o dia a dia",
      lessons: [
        {
          id: "u4l1",
          title: "Reuniões e E-mails",
          meta: "8 expressões · 10 min",
          xp: 30,
          steps: [
            { type: "intro", icon: "💼", title: "Inglês no Trabalho", body: "O Inglês é essencial no mundo profissional. Aprende expressões para reuniões, e-mails e conversas de escritório." },
            { type: "vocab", word: "Could you please...?", phonetic: "/kʊd juː pliːz/", translation: "Poderia, por favor...?", example: "Could you please send me the report?", tip: "Muito mais educado do que 'Can you...'." },
            { type: "vocab", word: "I look forward to...", phonetic: "/aɪ lʊk ˈfɔːrwərd tuː/", translation: "Aguardo com expectativa...", example: "I look forward to hearing from you.", tip: "Frase obrigatória no fim de e-mails profissionais." },
            { type: "vocab", word: "Let's schedule a meeting", phonetic: "/lɛts ˈskɛdʒuːl ə ˈmiːtɪŋ/", translation: "Vamos marcar uma reunião", example: "Let's schedule a meeting for next Monday.", tip: "'Schedule' pronuncia-se 'SKED-jool' (AmEng) ou 'SHED-jool' (BrEng)." },
            { type: "vocab", word: "Could you clarify...?", phonetic: "/kʊd juː ˈklærɪfaɪ/", translation: "Pode clarificar...?", example: "Could you clarify what you mean by that?", tip: "Ótimo para pedir mais informação sem parecer rude." },
            { type: "vocab", word: "I agree / I disagree", phonetic: "/aɪ əˈɡriː/ /dɪsəˈɡriː/", translation: "Concordo / Discordo", example: "I agree with your point about the deadline.", tip: "Em reuniões, 'I see your point, but...' é uma forma elegante de discordar." },
            { type: "quiz", question: "Como terminas um e-mail profissional?", options: ["Goodbye!", "I look forward to hearing from you.", "See you later!", "Thanks bye!"], correct: 1 },
            { type: "quiz", question: "O que significa 'Let's schedule a meeting'?", options: ["A reunião acabou", "Vamos cancelar a reunião", "Vamos marcar uma reunião", "A reunião é amanhã"], correct: 2 },
            { type: "quiz", question: "Como se diz 'Concordo' em Inglês?", options: ["I understand", "I agree", "I accept", "I know"], correct: 1 },
            { type: "complete", xp: 30 },
          ],
        },
        {
          id: "u4l2",
          title: "Apresentações Profissionais",
          meta: "6 estruturas · 10 min",
          xp: 30,
          steps: [
            { type: "intro", icon: "🎤", title: "Fazer uma apresentação", body: "Aprende a estruturar e fazer uma apresentação profissional em Inglês com confiança." },
            { type: "vocab", word: "Today I'm going to talk about...", phonetic: "", translation: "Hoje vou falar sobre...", example: "Today I'm going to talk about our Q3 results.", tip: "Começa sempre assim — define o tema logo no início." },
            { type: "vocab", word: "Firstly... Secondly... Finally...", phonetic: "", translation: "Primeiro... Segundo... Por fim...", example: "Firstly, I'll explain the problem. Secondly, the solution.", tip: "Estas palavras ajudam a estruturar a tua apresentação." },
            { type: "vocab", word: "In conclusion...", phonetic: "/ɪn kənˈkluːʒən/", translation: "Em conclusão...", example: "In conclusion, our results show strong growth.", tip: "Usa sempre 'In conclusion' para terminar a apresentação." },
            { type: "quiz", question: "Como começas uma apresentação em Inglês?", options: ["In conclusion...", "Today I'm going to talk about...", "Firstly...", "Finally..."], correct: 1 },
            { type: "quiz", question: "Qual expressão usas para terminar?", options: ["Firstly...", "Today I...", "In conclusion...", "Secondly..."], correct: 2 },
            { type: "complete", xp: 30 },
          ],
        },
      ],
    },

    // ═══ UNIDADE 5 — AVANÇADO ═══
    {
      id: "u5",
      level: "advanced",
      icon: "🎓",
      title: "Inglês Avançado",
      subtitle: "Expressões idiomáticas e nuances",
      lessons: [
        {
          id: "u5l1",
          title: "Expressões Idiomáticas",
          meta: "8 idioms · 12 min",
          xp: 40,
          steps: [
            { type: "intro", icon: "🎭", title: "Idioms — O Segredo do Inglês Natural", body: "As expressões idiomáticas fazem o teu Inglês soar natural e fluente. Aprende as mais usadas!" },
            { type: "vocab", word: "Break a leg!", phonetic: "/breɪk ə lɛɡ/", translation: "Boa sorte! (informal)", example: "Your presentation is tomorrow — break a leg!", tip: "Nunca digas 'Good luck' em teatro — usa 'Break a leg'!" },
            { type: "vocab", word: "Hit the nail on the head", phonetic: "", translation: "Acertar em cheio / Dizer exactamente o certo", example: "You hit the nail on the head with that analysis.", tip: "Usa quando alguém diz algo perfeitamente correcto." },
            { type: "vocab", word: "The ball is in your court", phonetic: "", translation: "A decisão é tua", example: "I've made my offer — the ball is in your court now.", tip: "Metáfora de ténis: agora é a tua vez de jogar." },
            { type: "vocab", word: "Under the weather", phonetic: "", translation: "Sentir-se mal / Doente", example: "I can't come to the meeting — I'm feeling under the weather.", tip: "Uma forma educada de dizer que estás doente." },
            { type: "vocab", word: "Bite the bullet", phonetic: "", translation: "Aguentar / Enfrentar algo difícil", example: "Just bite the bullet and ask for the promotion.", tip: "Origem militar — os soldados mordiam uma bala durante operações." },
            { type: "quiz", question: "O que significa 'Break a leg'?", options: ["Parti a perna", "Boa sorte", "Corre!", "Descansa"], correct: 1 },
            { type: "quiz", question: "'Under the weather' significa:", options: ["Debaixo de chuva", "Sentir-se mal", "Tempo frio", "Ao ar livre"], correct: 1 },
            { type: "quiz", question: "'The ball is in your court' significa:", options: ["Joga ténis", "A decisão é tua", "Vai ao tribunal", "Passa a bola"], correct: 1 },
            { type: "complete", xp: 40 },
          ],
        },
        {
          id: "u5l2",
          title: "Gramática Avançada",
          meta: "Conditionals · 15 min",
          xp: 50,
          steps: [
            { type: "intro", icon: "📖", title: "Conditionals — Falar sobre possibilidades", body: "Os condicionais permitem-te falar sobre situações hipotéticas, desejos e consequências. Essencial para fluência!" },
            { type: "vocab", word: "If I study hard, I will succeed.", phonetic: "", translation: "Se estudar muito, terei sucesso. (1st Conditional)", example: "If it rains tomorrow, I will stay at home.", tip: "1st Conditional: situações reais e possíveis no futuro. 'If + present, will + verb'" },
            { type: "vocab", word: "If I were rich, I would travel the world.", phonetic: "", translation: "Se fosse rico, viajaria pelo mundo. (2nd Conditional)", example: "If I had more time, I would learn more languages.", tip: "2nd Conditional: situações hipotéticas. 'If + past, would + verb'" },
            { type: "vocab", word: "If I had studied, I would have passed.", phonetic: "", translation: "Se tivesse estudado, teria passado. (3rd Conditional)", example: "If she had called earlier, we could have helped.", tip: "3rd Conditional: situações no passado que não aconteceram." },
            { type: "quiz", question: "Qual é o 1st Conditional?", options: ["If I were rich, I would travel.", "If I study, I will pass.", "If I had studied, I would have passed.", "I study because I want to pass."], correct: 1 },
            { type: "quiz", question: "Completa: 'If it ___ tomorrow, I will stay home.'", options: ["rained", "rains", "rain", "will rain"], correct: 1 },
            { type: "quiz", question: "O 3rd Conditional fala sobre:", options: ["Situações futuras possíveis", "Situações hipotéticas presentes", "Situações passadas que não aconteceram", "Factos gerais"], correct: 2 },
            { type: "complete", xp: 50 },
          ],
        },
      ],
    },
  ],

  // ── CONQUISTAS / BADGES ────────────────────────────────────
  badges: [
    { id: "first_lesson",  icon: "🎓", name: "Primeira Lição",    desc: "Completa a tua primeira lição",       condition: (s) => s.lessonsCompleted >= 1 },
    { id: "streak_3",      icon: "🔥", name: "Em Chamas",         desc: "3 dias seguidos",                     condition: (s) => s.streak >= 3 },
    { id: "streak_7",      icon: "⚡", name: "Imparável",         desc: "7 dias seguidos",                     condition: (s) => s.streak >= 7 },
    { id: "xp_100",        icon: "💯", name: "Centenário",         desc: "Ganha 100 XP",                        condition: (s) => s.xp >= 100 },
    { id: "xp_500",        icon: "🏆", name: "Mestre",             desc: "Ganha 500 XP",                        condition: (s) => s.xp >= 500 },
    { id: "words_20",      icon: "📝", name: "Estudioso",          desc: "Aprende 20 palavras",                 condition: (s) => s.wordsLearned >= 20 },
    { id: "words_50",      icon: "📚", name: "Bibliófilo",         desc: "Aprende 50 palavras",                 condition: (s) => s.wordsLearned >= 50 },
    { id: "quiz_perfect",  icon: "🎯", name: "Atirador de Elite",  desc: "Responde 10 quizzes certos seguidos", condition: (s) => s.perfectQuizStreak >= 10 },
    { id: "chat_5",        icon: "💬", name: "Conversador",        desc: "Envia 5 mensagens ao Professor IA",   condition: (s) => s.chatMessages >= 5 },
    { id: "chat_20",       icon: "🗣️", name: "Eloquente",          desc: "Envia 20 mensagens ao Professor IA",  condition: (s) => s.chatMessages >= 20 },
    { id: "all_beginner",  icon: "🌱", name: "Bases Sólidas",      desc: "Completa todas as lições iniciante",  condition: (s) => s.lessonsCompleted >= 7 },
    { id: "all_inter",     icon: "🌿", name: "Intermediário",      desc: "Completa todas as lições intermédio", condition: (s) => s.lessonsCompleted >= 11 },
    { id: "all_advanced",  icon: "🌳", name: "Fluente",            desc: "Completa todas as lições avançado",   condition: (s) => s.lessonsCompleted >= 13 },
    { id: "game_master",   icon: "🎮", name: "Game Master",        desc: "Joga todos os mini-jogos",            condition: (s) => s.gamesPlayed >= 6 },
    { id: "early_bird",    icon: "🐦", name: "Madrugador",         desc: "Estuda antes das 8h",                 condition: (s) => s.earlyBird },
    { id: "night_owl",     icon: "🦉", name: "Coruja da Noite",    desc: "Estuda depois das 22h",               condition: (s) => s.nightOwl },
  ],

  // ── QUIZ RÁPIDO (para o mini-jogo Quiz) ───────────────────
  quickQuizzes: [
    { q: "Como se diz 'Olá' em Inglês?", opts: ["Bye", "Hello", "Sorry", "Please"], a: 1 },
    { q: "O que significa 'Thank you'?", opts: ["Por favor", "Desculpa", "Obrigado/a", "De nada"], a: 2 },
    { q: "Como se diz 'Água' em Inglês?", opts: ["Milk", "Juice", "Water", "Food"], a: 2 },
    { q: "'Monday' é:", opts: ["Terça", "Segunda", "Quarta", "Sexta"], a: 1 },
    { q: "O que significa 'Beautiful'?", opts: ["Feio/a", "Bonito/a", "Grande", "Pequeno/a"], a: 1 },
    { q: "Como se diz 'Casa' em Inglês?", opts: ["School", "Work", "House", "Family"], a: 2 },
    { q: "'Red' é a cor:", opts: ["Azul", "Verde", "Amarela", "Vermelha"], a: 3 },
    { q: "O que significa 'Friend'?", opts: ["Família", "Amigo/a", "Professor/a", "Colega"], a: 1 },
    { q: "Como se diz 'Eu sou de Angola'?", opts: ["I am Angola", "I from Angola", "I am from Angola", "Angola I am"], a: 2 },
    { q: "'Goodbye' significa:", opts: ["Olá", "Obrigado", "Adeus", "Por favor"], a: 2 },
    { q: "Qual é o plural de 'child'?", opts: ["Childs", "Children", "Childrens", "Child"], a: 1 },
    { q: "'I agree' significa:", opts: ["Discordo", "Não sei", "Concordo", "Talvez"], a: 2 },
    { q: "Como se diz 'Oportunidade' em Inglês?", opts: ["Challenge", "Experience", "Opportunity", "Achievement"], a: 2 },
    { q: "O que significa 'Under the weather'?", opts: ["Debaixo de chuva", "Sentir-se mal", "Tempo frio", "Ao ar livre"], a: 1 },
    { q: "'Break a leg' significa:", opts: ["Partir uma perna", "Boa sorte", "Cuidado!", "Foge!"], a: 1 },
    { q: "Qual é o passado de 'go'?", opts: ["Goed", "Went", "Gone", "Goes"], a: 1 },
    { q: "Como se diz '20' em Inglês?", opts: ["Twelve", "Twenty", "Thirteen", "Thirty"], a: 1 },
    { q: "O que significa 'Please'?", opts: ["Obrigado", "Adeus", "Por favor", "Desculpa"], a: 2 },
    { q: "'Wednesday' é:", opts: ["Segunda", "Terça", "Quarta", "Quinta"], a: 2 },
    { q: "Como se diz 'Prazer em conhecer-te'?", opts: ["How are you?", "Nice to meet you", "See you later", "Good morning"], a: 1 },
  ],

  // ── PARES PARA O JOGO "EMPARELHAR" ────────────────────────
  matchPairs: [
    { en: "Hello",      pt: "Olá" },
    { en: "Thank you",  pt: "Obrigado/a" },
    { en: "House",      pt: "Casa" },
    { en: "Friend",     pt: "Amigo/a" },
    { en: "Work",       pt: "Trabalho" },
    { en: "Beautiful",  pt: "Bonito/a" },
    { en: "Water",      pt: "Água" },
    { en: "School",     pt: "Escola" },
    { en: "Family",     pt: "Família" },
    { en: "Happy",      pt: "Feliz" },
    { en: "Day",        pt: "Dia" },
    { en: "Night",      pt: "Noite" },
  ],

  // ── FRASES PARA TRADUZIR ───────────────────────────────────
  translatePhrases: [
    { pt: "Bom dia!",                   en: "Good morning!", hint: "good + morning" },
    { pt: "O meu nome é Maria.",         en: "My name is Maria.", hint: "my + name + is" },
    { pt: "Eu sou de Angola.",           en: "I am from Angola.", hint: "I + am + from" },
    { pt: "Obrigado pela tua ajuda.",    en: "Thank you for your help.", hint: "thank you + for" },
    { pt: "Que horas são?",             en: "What time is it?", hint: "what + time" },
    { pt: "Tenho uma reunião às 9h.",   en: "I have a meeting at nine o'clock.", hint: "I + have + meeting" },
    { pt: "A comida é deliciosa.",       en: "The food is delicious.", hint: "the + food + is" },
    { pt: "Vivo em Luanda.",             en: "I live in Luanda.", hint: "I + live + in" },
    { pt: "Hoje é uma bela manhã.",      en: "Today is a beautiful morning.", hint: "today + is + beautiful" },
    { pt: "Prazer em conhecer-te.",      en: "Nice to meet you.", hint: "nice + to + meet" },
  ],

  // ── PALAVRAS PARA "ESCUTA & ESCREVE" ──────────────────────
  listenWords: [
    "Hello", "Goodbye", "Please", "Thank you", "Sorry",
    "Water", "Food", "House", "Friend", "School",
    "Happy", "Beautiful", "Morning", "Night", "Family",
    "Monday", "Friday", "Orange", "Purple", "Work",
  ],

  // ── PALAVRAS PARA FALAR / PRONÚNCIA ───────────────────────
  speakWords: [
    { word: "Hello",         phonetic: "/həˈloʊ/" },
    { word: "Beautiful",     phonetic: "/ˈbjuːtɪfəl/" },
    { word: "Wednesday",     phonetic: "/ˈwɛnzdeɪ/" },
    { word: "Comfortable",   phonetic: "/ˈkʌmftərbəl/" },
    { word: "Pronunciation", phonetic: "/prəˌnʌnsiˈeɪʃən/" },
    { word: "Vocabulary",    phonetic: "/voʊˈkæbjəlɛri/" },
    { word: "Opportunity",   phonetic: "/ˌɒpəˈtjuːnɪti/" },
    { word: "Experience",    phonetic: "/ɪkˈspɪərɪəns/" },
    { word: "Community",     phonetic: "/kəˈmjuːnɪti/" },
    { word: "Perseverance",  phonetic: "/ˌpɜːrsɪˈvɪərəns/" },
  ],
};

// ── UTILITÁRIO: buscar unidade por ID ──────────────────────
function getUnitById(id) {
  return LINGUA_DATA.units.find(u => u.id === id);
}

function getLessonById(lessonId) {
  for (const unit of LINGUA_DATA.units) {
    const lesson = unit.lessons.find(l => l.id === lessonId);
    if (lesson) return { lesson, unit };
  }
  return null;
}

function getDailyPhrase() {
  const idx = Math.floor(Date.now() / 86400000) % LINGUA_DATA.dailyPhrases.length;
  return LINGUA_DATA.dailyPhrases[idx];
}

function getRandomVocab(level = "beginner", count = 5) {
  const pool = LINGUA_DATA.vocabulary[level] || LINGUA_DATA.vocabulary.beginner;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomQuizzes(count = 5) {
  const shuffled = [...LINGUA_DATA.quickQuizzes].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomMatchPairs(count = 4) {
  const shuffled = [...LINGUA_DATA.matchPairs].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function getRandomTranslate() {
  return LINGUA_DATA.translatePhrases[Math.floor(Math.random() * LINGUA_DATA.translatePhrases.length)];
}

function getRandomListenWord() {
  return LINGUA_DATA.listenWords[Math.floor(Math.random() * LINGUA_DATA.listenWords.length)];
}

function getRandomSpeakWord() {
  return LINGUA_DATA.speakWords[Math.floor(Math.random() * LINGUA_DATA.speakWords.length)];
}