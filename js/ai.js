// ═══════════════════════════════════════════════════════════
//  LinguaAO — ai.js
//  IA Chat: Anthropic Claude API + Text-to-Speech + Voice Input
// ═══════════════════════════════════════════════════════════

// ── CONFIGURAÇÃO ────────────────────────────────────────────
const AI_CONFIG = {
  apiUrl: 'https://api.anthropic.com/v1/messages',
  model: 'claude-opus-4-6',
  maxTokens: 300,
};

// Histórico da conversa (mantido em memória)
let chatHistory = [];
let aiSystemPrompt = '';
let voiceRecognition = null;

// ── INICIALIZAÇÃO ────────────────────────────────────────────
function initAIChat(userName, userLevel) {
  const levelDesc = {
    beginner:     'complete beginner (A1/A2)',
    intermediate: 'intermediate learner (B1/B2)',
    advanced:     'advanced learner (C1/C2)',
  }[userLevel] || 'beginner';

  aiSystemPrompt = `You are Professor LinguaAO, a friendly and encouraging English teacher for Angolan Portuguese speakers.

The student's name is ${userName} and they are a ${levelDesc}.

Your role:
- Respond primarily in Portuguese (Angola), but use English phrases and examples throughout
- Teach English vocabulary, grammar, pronunciation tips, and conversational phrases
- Correct mistakes gently, always explaining the correct form
- Keep responses concise (2-4 short paragraphs max) and mobile-friendly
- Use emojis occasionally to keep things fun 😊
- Celebrate progress and encourage the student
- When teaching a new word or phrase, always provide: the English word, its pronunciation guide, Portuguese translation, and a simple example sentence
- Adapt complexity to the student's level: ${levelDesc}
- Focus exclusively on English language learning

Always respond in a warm, supportive tone. Never be discouraging.`;

  chatHistory = [];
}

// ── ENVIAR MENSAGEM PARA A IA ────────────────────────────────
async function sendToAI(userMessage) {
  chatHistory.push({ role: 'user', content: userMessage });

  try {
    const response = await fetch(AI_CONFIG.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'your-api-key-here', // substitua pela sua chave real
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: AI_CONFIG.model,
        max_tokens: AI_CONFIG.maxTokens,
        system: aiSystemPrompt,
        messages: chatHistory.slice(-10), // últimas 10 mensagens para contexto
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || 'Desculpa, não consegui responder agora. Tenta novamente!';

    chatHistory.push({ role: 'assistant', content: assistantMessage });

    return { text: assistantMessage, ok: true };

  } catch (err) {
    console.warn('AI API unavailable, using fallback:', err.message);
    return getFallbackResponse(userMessage);
  }
}

// ── RESPOSTAS FALLBACK (sem API) ────────────────────────────
function getFallbackResponse(message) {
  const msg = message.toLowerCase();

  const responses = [
    {
      match: ['olá', 'ola', 'hello', 'oi', 'hi'],
      text: `Hello, ${getChatUserName()}! 👋\n\nEm Inglês, cumprimentamos com:\n• **Hello** /həˈloʊ/ — formal e informal\n• **Hi** /haɪ/ — mais casual\n• **Hey** /heɪ/ — muito informal\n\nTenta dizer: *"Hello! My name is ${getChatUserName()}."* 😊`,
    },
    {
      match: ['bom dia', 'good morning', 'manhã'],
      text: `Great question! 🌅\n\nAs saudações por hora do dia em Inglês:\n• **Good morning** — bom dia (até 12h)\n• **Good afternoon** — boa tarde (12h-18h)\n• **Good evening** — boa noite (a partir das 18h)\n• **Good night** — boa noite (ao deitar)\n\nPratica: *"Good morning! How are you?"*`,
    },
    {
      match: ['obrigado', 'thank you', 'thanks'],
      text: `Perfeito! 🙏 Vamos aprender a agradecer em Inglês:\n\n• **Thank you** /ˈθæŋk juː/ — Obrigado/a (formal)\n• **Thanks** /θæŋks/ — Obrigado (informal)\n• **Thank you very much** — Muito obrigado/a\n• **Thanks a lot** — Muito obrigado (informal)\n\nResposta comum: *"You're welcome!"* (De nada)`,
    },
    {
      match: ['como', 'how are you', 'estás', 'estas'],
      text: `Como se pergunta "como estás" em Inglês:\n\n• **How are you?** /haʊ ɑːr juː/ — formal\n• **How are you doing?** — informal\n• **How's it going?** — muito casual\n\nRespostas comuns:\n✅ *"I'm fine, thank you!"*\n✅ *"I'm great!"*\n✅ *"Not bad, thanks."*`,
    },
    {
      match: ['número', 'numero', 'number', 'contar', 'count'],
      text: `Números em Inglês são fáceis! 🔢\n\n• 1 = **One** /wʌn/\n• 2 = **Two** /tuː/\n• 3 = **Three** /θriː/\n• 4 = **Four** /fɔːr/\n• 5 = **Five** /faɪv/\n• 10 = **Ten** /tɛn/\n• 100 = **One hundred**\n\nTenta contar em voz alta para praticar a pronúncia!`,
    },
    {
      match: ['cor', 'cores', 'color', 'colour'],
      text: `As cores em Inglês! 🎨\n\n• 🔴 Vermelho = **Red** /rɛd/\n• 🔵 Azul = **Blue** /bluː/\n• 🟢 Verde = **Green** /ɡriːn/\n• 🟡 Amarelo = **Yellow** /ˈjɛloʊ/\n• 🟠 Laranja = **Orange** /ˈɒrɪndʒ/\n• ⚫ Preto = **Black** /blæk/\n• ⚪ Branco = **White** /waɪt/`,
    },
    {
      match: ['dias', 'semana', 'week', 'monday', 'tuesday', 'segunda', 'terça'],
      text: `Os dias da semana em Inglês! 📅\n\n• Segunda = **Monday** /ˈmʌndeɪ/\n• Terça = **Tuesday** /ˈtjuːzdeɪ/\n• Quarta = **Wednesday** /ˈwɛnzdeɪ/ ⚠️\n• Quinta = **Thursday** /ˈθɜːrzdeɪ/\n• Sexta = **Friday** /ˈfraɪdeɪ/\n• Sábado = **Saturday** /ˈsætərdeɪ/\n• Domingo = **Sunday** /ˈsʌndeɪ/\n\n⚡ Wednesday é a mais difícil de pronunciar!`,
    },
    {
      match: ['familia', 'família', 'family', 'pai', 'mãe', 'irmão'],
      text: `Vocabulário de família em Inglês! 👨‍👩‍👧‍👦\n\n• Pai = **Father / Dad**\n• Mãe = **Mother / Mum**\n• Irmão = **Brother** /ˈbrʌðər/\n• Irmã = **Sister** /ˈsɪstər/\n• Avô = **Grandfather / Grandpa**\n• Avó = **Grandmother / Grandma**\n• Filho = **Son** /sʌn/\n• Filha = **Daughter** /ˈdɔːtər/`,
    },
    {
      match: ['verbo', 'verb', 'to be', 'ser', 'estar', 'am', 'is', 'are'],
      text: `O verbo **"to be"** é o mais importante do Inglês! 🌟\n\n• I **am** (eu sou/estou)\n• You **are** (tu és/estás)\n• He/She **is** (ele/ela é/está)\n• We **are** (nós somos/estamos)\n• They **are** (eles são/estão)\n\nExemplos:\n✅ *"I am from Angola."*\n✅ *"She is my teacher."*\n✅ *"We are learning English!"*`,
    },
    {
      match: ['corrig', 'correct', 'erro', 'wrong', 'mistake'],
      text: `Ótimo que queres melhorar! 💪 Faz-me uma frase em Inglês e eu corrijo-a com explicação. Por exemplo:\n\n❌ *"I goed to school yesterday"*\n✅ *"I **went** to school yesterday"*\n📌 **"Go"** é irregular no passado: **go → went**\n\nEscreve uma frase para eu corrigir!`,
    },
  ];

  for (const r of responses) {
    if (r.match.some(kw => msg.includes(kw))) {
      return { text: r.text, ok: true };
    }
  }

  // Resposta genérica
  const generic = [
    `Boa pergunta! 🤔 Em Inglês, a prática é a chave. Tenta formular a tua dúvida como uma frase em Inglês e eu ajudo-te a melhorá-la!\n\nPor exemplo: *"How do I say ____ in English?"*`,
    `Vamos praticar! 💬 Diz-me uma frase em Inglês e eu corrijo e explico. Ou pede-me vocabulário sobre qualquer tema: família, trabalho, cores, números, etc.`,
    `Excellent effort! 🌟 Estou aqui para te ajudar a melhorar o teu Inglês. Faz-me uma pergunta sobre gramática, vocabulário, ou pede-me para praticarmos uma conversa!`,
  ];

  return {
    text: generic[Math.floor(Math.random() * generic.length)],
    ok: false,
  };
}

function getChatUserName() {
  try {
    const s = JSON.parse(localStorage.getItem('lingua_state') || '{}');
    return s.name || 'Estudante';
  } catch { return 'Estudante'; }
}

// ── TEXT-TO-SPEECH ────────────────────────────────────────────
function speak(text) {
  if (!window.speechSynthesis) return;
  if (!isAudioEnabled()) return;

  speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-US';
  utter.rate = parseFloat(localStorage.getItem('lingua_voice_speed') || '1');
  utter.pitch = 1;
  utter.volume = 1;

  // Prefere voz feminina
  const voices = speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
    || voices.find(v => v.lang.startsWith('en-US'))
    || voices.find(v => v.lang.startsWith('en'));

  if (preferred) utter.voice = preferred;

  speechSynthesis.speak(utter);
}

// Garantir que as vozes estão carregadas
if (window.speechSynthesis) {
  speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
}

function isAudioEnabled() {
  try {
    const s = JSON.parse(localStorage.getItem('lingua_state') || '{}');
    return s.settings?.sound !== false;
  } catch { return true; }
}

// ── VOICE RECOGNITION (Speech-to-Text) ───────────────────────
function startVoiceInput(onResult, onEnd) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    showToast('⚠️ Reconhecimento de voz não suportado neste browser');
    onEnd?.();
    return;
  }

  voiceRecognition = new SR();
  voiceRecognition.lang = 'en-US';
  voiceRecognition.continuous = false;
  voiceRecognition.interimResults = false;
  voiceRecognition.maxAlternatives = 1;

  voiceRecognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript;
    onResult?.(transcript);
  };

  voiceRecognition.onerror = (e) => {
    console.warn('Voice error:', e.error);
    showToast('⚠️ Não foi possível ouvir. Tenta novamente.');
    onEnd?.();
  };

  voiceRecognition.onend = () => {
    onEnd?.();
  };

  voiceRecognition.start();
}

function stopVoiceInput() {
  voiceRecognition?.stop();
  voiceRecognition = null;
}
