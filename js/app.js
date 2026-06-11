// ═══════════════════════════════════════════════════════════
//  LinguaAO — app.js
//  Lógica principal: navegação, XP, jogos, persistência
// ═══════════════════════════════════════════════════════════

// ── ESTADO GLOBAL ───────────────────────────────────────────
let STATE = {
  name: "",
  level: "beginner",
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  lessonsCompleted: [],
  wordsLearned: 0,
  gamesPlayed: 0,
  earlyBird: false,
  nightOwl: false,
  dailyXP: 0,
  dailyGoal: 20,
  settings: { sound: true, dark: true, notif: false, voiceSpeed: 1 }
};

function saveState() {
  localStorage.setItem('lingua_state', JSON.stringify(STATE));
}

function loadState() {
  try {
    const raw = localStorage.getItem('lingua_state');
    if (raw) STATE = { ...STATE, ...JSON.parse(raw) };
  } catch (_) {}
}

// ── BOOTSTRAP ───────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  applySettings();

  setTimeout(() => {
    if (STATE.name) {
      showApp();
    } else {
      showOnboarding();
    }
  }, 1800);

  setupOnboarding();
  setupSetup();
  setupNav();
  setupChat();
  setupSettings();
  updateStreak();
});

// ── SPLASH → ONBOARDING ─────────────────────────────────────
function showOnboarding() {
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('onboarding').classList.remove('hidden');
}

// ── ONBOARDING ───────────────────────────────────────────────
let currentSlide = 0;
const totalSlides = 3;

function setupOnboarding() {
  const nextBtn = document.getElementById('onboard-next');
  const skipBtn = document.getElementById('onboard-skip');

  nextBtn?.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else {
      showSetup();
    }
  });

  skipBtn?.addEventListener('click', showSetup);
}

function goToSlide(idx) {
  document.querySelectorAll('.onboard-slide').forEach((s, i) => {
    s.classList.toggle('active', i === idx);
  });
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === idx);
  });
  currentSlide = idx;
  const nextBtn = document.getElementById('onboard-next');
  if (nextBtn) nextBtn.textContent = idx === totalSlides - 1 ? 'Começar 🚀' : 'Continuar';
}

function showSetup() {
  document.getElementById('onboarding').classList.add('hidden');
  document.getElementById('setup').classList.remove('hidden');
}

// ── SETUP ────────────────────────────────────────────────────
function setupSetup() {
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      STATE.level = btn.dataset.level;
    });
  });

  document.getElementById('setup-done')?.addEventListener('click', () => {
    const nameInput = document.getElementById('name-input');
    const name = nameInput?.value.trim();
    if (!name) {
      nameInput?.focus();
      nameInput?.classList.add('shake');
      setTimeout(() => nameInput?.classList.remove('shake'), 400);
      return;
    }
    STATE.name = name;
    saveState();
    showApp();
  });
}

// ── MOSTRAR APP PRINCIPAL ────────────────────────────────────
function showApp() {
  document.getElementById('splash').classList.add('hidden');
  document.getElementById('onboarding').classList.add('hidden');
  document.getElementById('setup').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');

  initAIChat(STATE.name, STATE.level);
  renderHome();
  renderLessons();
  renderProfile();

  // Avatar
  const initial = (STATE.name || 'A')[0].toUpperCase();
  document.getElementById('user-avatar').textContent = initial;
  document.getElementById('profile-avatar-big').textContent = initial;
  document.getElementById('user-greeting').textContent = `Olá, ${STATE.name}!`;

  updateXPDisplay();
  updateStreakDisplay();
}

// ── NAV ──────────────────────────────────────────────────────
function setupNav() {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`tab-${tab}`)?.classList.add('active');
      if (tab === 'profile') renderProfile();
    });
  });
}

// ── HOME ─────────────────────────────────────────────────────
function renderHome() {
  renderContinueCards();
  renderLangProgress();
  renderBadges();
  renderPhraseCard();
  updateGoalBar();

  const levelNames = { beginner: 'Iniciante 🌱', intermediate: 'Intermédio 🌿', advanced: 'Avançado 🌳' };
  document.getElementById('home-title').textContent =
    STATE.xp === 0 ? 'Vamos começar! 🚀' : `Continua a progredir! 💪`;
  const remaining = LINGUA_DATA.units.flatMap(u => u.lessons)
    .filter(l => !STATE.lessonsCompleted.includes(l.id)).length;
  document.getElementById('lessons-left').textContent = remaining;
}

function renderContinueCards() {
  const container = document.getElementById('continue-cards');
  if (!container) return;

  const allLessons = LINGUA_DATA.units.flatMap(u =>
    u.lessons.map(l => ({ ...l, unitIcon: u.icon, unitTitle: u.title }))
  );

  const inProgress = allLessons.filter(l => !STATE.lessonsCompleted.includes(l.id)).slice(0, 3);
  if (inProgress.length === 0) {
    container.innerHTML = `<div class="continue-card done-card"><span>🎉</span><div><strong>Parabéns!</strong><p>Completaste todas as lições disponíveis!</p></div></div>`;
    return;
  }

  container.innerHTML = inProgress.map(l => `
    <div class="continue-card" onclick="openLesson('${l.id}')">
      <div class="cc-icon">${l.unitIcon}</div>
      <div class="cc-info">
        <div class="cc-title">${l.title}</div>
        <div class="cc-meta">${l.meta} · +${l.xp} XP</div>
      </div>
      <div class="cc-arrow">›</div>
    </div>
  `).join('');
}

function renderLangProgress() {
  const grid = document.getElementById('lang-progress-grid');
  if (!grid) return;

  const total = LINGUA_DATA.units.flatMap(u => u.lessons).length;
  const done = STATE.lessonsCompleted.length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  grid.innerHTML = `
    <div class="lang-prog-card">
      <div class="lpc-flag">🇬🇧</div>
      <div class="lpc-info">
        <div class="lpc-name">English</div>
        <div class="progress-bar" style="margin-top:0.5rem">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div class="lpc-stat">${done}/${total} lições · ${STATE.xp} XP</div>
      </div>
    </div>`;
}

function renderBadges() {
  const row = document.getElementById('badges-row');
  if (!row) return;

  const earned = LINGUA_DATA.badges.filter(b => b.condition(STATE)).slice(0, 5);
  if (earned.length === 0) {
    row.innerHTML = `<div style="color:var(--text3);font-size:0.85rem">Ainda sem conquistas — continua a estudar! 💪</div>`;
    return;
  }
  row.innerHTML = earned.map(b => `
    <div class="badge-chip" title="${b.desc}"><span>${b.icon}</span> ${b.name}</div>
  `).join('');
}

function renderPhraseCard() {
  const card = document.getElementById('phrase-card');
  if (!card) return;
  const phrase = getDailyPhrase();
  card.innerHTML = `
    <div class="phrase-en" onclick="speak('${phrase.en.replace(/'/g,"\\'")}')">
      🔊 ${phrase.en}
    </div>
    <div class="phrase-pt">${phrase.pt}</div>
  `;
}

function updateGoalBar() {
  const pct = Math.min(100, (STATE.dailyXP / STATE.dailyGoal) * 100);
  const bar = document.getElementById('goal-bar');
  const txt = document.getElementById('goal-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (txt) txt.textContent = `${STATE.dailyXP} / ${STATE.dailyGoal} XP`;
}

function updateXPDisplay() {
  const el = document.getElementById('xp-display');
  if (el) el.textContent = `⚡ ${STATE.xp} XP`;
}

function updateStreakDisplay() {
  const el = document.getElementById('streak-display');
  if (el) el.textContent = `🔥 ${STATE.streak} ${STATE.streak === 1 ? 'dia' : 'dias'}`;
}

function updateStreak() {
  const today = new Date().toDateString();
  if (STATE.lastStudyDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (STATE.lastStudyDate === yesterday) {
      STATE.streak++;
    } else if (STATE.lastStudyDate && STATE.lastStudyDate !== today) {
      STATE.streak = 1;
    }
    STATE.lastStudyDate = today;

    // Early bird / Night owl
    const h = new Date().getHours();
    if (h < 8) STATE.earlyBird = true;
    if (h >= 22) STATE.nightOwl = true;

    saveState();
  }
}

function gainXP(amount) {
  STATE.xp += amount;
  STATE.dailyXP += amount;
  updateXPDisplay();
  updateGoalBar();
  saveState();
  showXPToast(amount);

  // Check daily goal achieved
  if (STATE.dailyXP >= STATE.dailyGoal && (STATE.dailyXP - amount) < STATE.dailyGoal) {
    setTimeout(() => showToast('🎯 Meta diária atingida! Fantástico!'), 1000);
  }
}

function showXPToast(xp) {
  const t = document.createElement('div');
  t.className = 'xp-toast';
  t.textContent = `+${xp} XP ⚡`;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 1800);
}

function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast-msg';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

// ── LIÇÕES ───────────────────────────────────────────────────
function renderLessons() {
  const path = document.getElementById('lessons-path');
  if (!path) return;

  const levelFilter = STATE.level;
  const units = LINGUA_DATA.units;

  path.innerHTML = units.map(unit => {
    const isLocked = unit.level === 'advanced' && levelFilter === 'beginner';
    const lessonsHTML = unit.lessons.map(l => {
      const done = STATE.lessonsCompleted.includes(l.id);
      return `
        <div class="lesson-item ${done ? 'done' : ''} ${isLocked ? 'locked' : ''}"
             onclick="${isLocked ? '' : `openLesson('${l.id}')`}">
          <div class="li-icon">${done ? '✅' : isLocked ? '🔒' : '▶️'}</div>
          <div class="li-info">
            <div class="li-title">${l.title}</div>
            <div class="li-meta">${l.meta} · +${l.xp} XP</div>
          </div>
          ${done ? '<div class="li-badge">✓</div>' : ''}
        </div>`;
    }).join('');

    return `
      <div class="unit-block">
        <div class="unit-header">
          <span class="unit-icon">${unit.icon}</span>
          <div>
            <div class="unit-title">${unit.title}</div>
            <div class="unit-sub">${unit.subtitle}</div>
          </div>
        </div>
        ${lessonsHTML}
      </div>`;
  }).join('');
}

// ── LESSON PLAYER ─────────────────────────────────────────────
let currentLesson = null;
let currentStep = 0;
let lessonXP = 0;

function openLesson(lessonId) {
  const found = getLessonById(lessonId);
  if (!found) return;

  currentLesson = found.lesson;
  currentStep = 0;
  lessonXP = 0;

  document.getElementById('app').classList.add('hidden');
  const player = document.getElementById('lesson-player');
  player.classList.remove('hidden');

  renderLessonStep();
}

function renderLessonStep() {
  if (!currentLesson) return;
  const steps = currentLesson.steps;
  const step = steps[currentStep];
  const progress = ((currentStep) / steps.length) * 100;

  document.getElementById('lp-fill').style.width = progress + '%';
  document.getElementById('lp-xp').textContent = `+${lessonXP} XP`;

  const content = document.getElementById('lp-content');
  const actions = document.getElementById('lp-actions');

  if (!step) {
    // Lesson complete
    renderLessonComplete();
    return;
  }

  switch (step.type) {
    case 'intro':
      content.innerHTML = `
        <div class="step-intro">
          <div class="step-icon">${step.icon}</div>
          <h2>${step.title}</h2>
          <p>${step.body}</p>
        </div>`;
      actions.innerHTML = `<button class="btn-primary" onclick="nextStep()">Vamos começar! 🚀</button>`;
      break;

    case 'vocab':
      content.innerHTML = `
        <div class="step-vocab">
          <div class="vocab-card" onclick="speak('${step.word.replace(/'/g,"\\'")}')">
            <div class="vocab-word">${step.word}</div>
            <div class="vocab-phonetic">${step.phonetic}</div>
            <div class="vocab-translation">${step.translation}</div>
            <div class="vocab-example">💬 "${step.example}"</div>
            <div class="tap-hint">🔊 Toca para ouvir</div>
          </div>
          ${step.tip ? `<div class="vocab-tip">💡 ${step.tip}</div>` : ''}
        </div>`;
      actions.innerHTML = `
        <button class="btn-primary" onclick="nextStep(); gainXP(3)">Continuar ›</button>`;
      break;

    case 'quiz':
      content.innerHTML = `
        <div class="step-quiz">
          <div class="quiz-question">${step.question}</div>
          <div class="quiz-options">
            ${step.options.map((opt, i) => `
              <button class="quiz-option" onclick="handleQuizAnswer(this, ${i}, ${step.correct})">
                ${opt}
              </button>`).join('')}
          </div>
          <div id="quiz-feedback" class="feedback-msg" style="display:none"></div>
        </div>`;
      actions.innerHTML = `<button class="btn-primary" id="next-btn" onclick="nextStep()" style="display:none">Continuar ›</button>`;
      break;

    case 'fill':
      content.innerHTML = `
        <div class="step-quiz">
          <div class="quiz-question">${step.question}</div>
          <input type="text" id="fill-input" class="fill-input" placeholder="Escreve aqui..." autocomplete="off" />
          <div id="fill-feedback" class="feedback-msg" style="display:none"></div>
        </div>`;
      actions.innerHTML = `
        <button class="btn-primary" onclick="handleFillAnswer('${step.answer.replace(/'/g,"\\'")}')">Verificar ✓</button>`;
      document.getElementById('fill-input')?.addEventListener('keydown', e => {
        if (e.key === 'Enter') handleFillAnswer(step.answer);
      });
      break;

    default:
      nextStep();
  }
}

function handleQuizAnswer(btn, chosen, correct) {
  document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
  const feedback = document.getElementById('quiz-feedback');
  const nextBtn = document.getElementById('next-btn');

  if (chosen === correct) {
    btn.classList.add('correct');
    feedback.textContent = '✅ Correcto! Muito bem!';
    feedback.className = 'feedback-msg ok';
    lessonXP += 5;
    gainXP(5);
  } else {
    btn.classList.add('wrong');
    document.querySelectorAll('.quiz-option')[correct]?.classList.add('correct');
    feedback.textContent = '❌ Não foi desta vez. Continua!';
    feedback.className = 'feedback-msg no';
  }

  feedback.style.display = 'block';
  if (nextBtn) nextBtn.style.display = 'block';
  speak(chosen === correct ? 'Correct!' : 'Not quite, try again!');
}

function handleFillAnswer(correct) {
  const input = document.getElementById('fill-input');
  const val = input?.value.trim().toLowerCase();
  const correctLower = correct.toLowerCase();
  const feedback = document.getElementById('fill-feedback');

  if (val === correctLower) {
    input.classList.add('correct-input');
    feedback.textContent = '✅ Perfeito!';
    feedback.className = 'feedback-msg ok';
    feedback.style.display = 'block';
    lessonXP += 5;
    gainXP(5);
    setTimeout(nextStep, 1000);
  } else {
    feedback.textContent = `❌ A resposta certa é: "${correct}"`;
    feedback.className = 'feedback-msg no';
    feedback.style.display = 'block';
    setTimeout(nextStep, 1800);
  }
}

function nextStep() {
  currentStep++;
  renderLessonStep();
}

function renderLessonComplete() {
  const id = currentLesson.id;
  if (!STATE.lessonsCompleted.includes(id)) {
    STATE.lessonsCompleted.push(id);
    STATE.wordsLearned += Math.floor(Math.random() * 5) + 3;
    gainXP(currentLesson.xp);
    lessonXP += currentLesson.xp;
  }
  saveState();

  const content = document.getElementById('lp-content');
  const actions = document.getElementById('lp-actions');
  document.getElementById('lp-fill').style.width = '100%';

  content.innerHTML = `
    <div class="step-complete">
      <div class="complete-icon">🎉</div>
      <div class="complete-xp">+${lessonXP} XP</div>
      <div class="stars-row">
        <span class="star">⭐</span>
        <span class="star">⭐</span>
        <span class="star">⭐</span>
      </div>
      <h2>Lição Concluída!</h2>
      <p class="complete-msg">Fizeste um excelente trabalho em "<strong>${currentLesson.title}</strong>".<br>Continua assim! 💪</p>
    </div>`;

  actions.innerHTML = `<button class="btn-primary" onclick="closeLesson()">Continuar 🚀</button>`;
  speak('Congratulations! Lesson complete!');
}

function closeLesson() {
  document.getElementById('lesson-player').classList.add('hidden');
  document.getElementById('app').classList.remove('hidden');
  renderHome();
  renderLessons();
}

document.getElementById('lp-back')?.addEventListener('click', closeLesson);

// ── AI CHAT ──────────────────────────────────────────────────
function setupChat() {
  const sendBtn = document.getElementById('chat-send');
  const input = document.getElementById('chat-input');
  const voiceBtn = document.getElementById('chat-voice');

  sendBtn?.addEventListener('click', () => submitChat());
  input?.addEventListener('keydown', e => { if (e.key === 'Enter') submitChat(); });
  voiceBtn?.addEventListener('click', handleVoiceInput);
}

async function submitChat(text) {
  const input = document.getElementById('chat-input');
  const msg = text || input?.value.trim();
  if (!msg) return;

  if (input) input.value = '';
  document.getElementById('chat-suggestions').style.display = 'none';

  appendChatMsg('user', msg);
  appendTypingIndicator();

  const res = await sendToAI(msg);
  removeTypingIndicator();
  appendChatMsg('bot', res.text);

  if (res.ok) gainXP(2);
  speak(res.text.replace(/[*_#`]/g, '').substring(0, 150));
}

function sendSuggestion(msg) {
  submitChat(msg);
}

function appendChatMsg(role, text) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  // Simple markdown: **bold**
  const formatted = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
  div.innerHTML = `<div class="msg-bubble">${formatted}</div>`;
  container?.appendChild(div);
  container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function appendTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = 'typing-indicator';
  div.innerHTML = `<div class="msg-bubble typing"><span></span><span></span><span></span></div>`;
  container?.appendChild(div);
  container?.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

function removeTypingIndicator() {
  document.getElementById('typing-indicator')?.remove();
}

let isRecording = false;

function handleVoiceInput() {
  const btn = document.getElementById('chat-voice');
  if (isRecording) {
    stopVoiceInput();
    isRecording = false;
    btn.textContent = '🎤';
    return;
  }

  isRecording = true;
  btn.textContent = '🔴';
  btn.classList.add('recording');

  startVoiceInput(
    (transcript) => {
      document.getElementById('chat-input').value = transcript;
    },
    () => {
      isRecording = false;
      btn.textContent = '🎤';
      btn.classList.remove('recording');
    }
  );
}

// ── MINI-JOGOS ────────────────────────────────────────────────
function startGame(type) {
  STATE.gamesPlayed++;
  saveState();

  const modal = document.getElementById('game-modal');
  const content = document.getElementById('game-content');
  modal.classList.remove('hidden');

  switch (type) {
    case 'flashcard': renderFlashcard(content); break;
    case 'quiz':      renderQuizGame(content); break;
    case 'translate': renderTranslateGame(content); break;
    case 'listen':    renderListenGame(content); break;
    case 'match':     renderMatchGame(content); break;
    case 'speak':     renderSpeakGame(content); break;
  }
}

document.getElementById('game-close')?.addEventListener('click', () => {
  document.getElementById('game-modal').classList.add('hidden');
  speechSynthesis.cancel();
  renderProfile();
});

// FLASHCARD
function renderFlashcard(el) {
  const words = getRandomVocab(STATE.level, 10);
  let idx = 0;
  let score = { right: 0, wrong: 0 };

  function render() {
    if (idx >= words.length) {
      const xp = score.right * 5;
      gainXP(xp);
      el.innerHTML = `
        <div class="game-title">🃏 Flashcards</div>
        <div class="game-score">
          <div class="gs-item"><div class="gs-num" style="color:var(--success)">${score.right}</div><div class="gs-label">Acertos</div></div>
          <div class="gs-item"><div class="gs-num" style="color:var(--danger)">${score.wrong}</div><div class="gs-label">Erros</div></div>
          <div class="gs-item"><div class="gs-num" style="color:var(--gold)">+${xp}</div><div class="gs-label">XP</div></div>
        </div>
        <button class="btn-primary" onclick="startGame('flashcard')">Jogar novamente</button>`;
      return;
    }
    const w = words[idx];
    el.innerHTML = `
      <div class="game-title">🃏 Flashcards</div>
      <div class="game-sub">${idx + 1} / ${words.length}</div>
      <div class="flashcard-container">
        <div class="flashcard" id="fc" onclick="revealFC()">
          <div class="fc-word">${w.word}</div>
          <div class="fc-reveal">${w.translation} · ${w.phonetic}<br><em style="font-size:0.8rem;color:var(--text3)">${w.example}</em></div>
          <div class="fc-tap">Toca para ver a tradução</div>
        </div>
      </div>
      <div class="fc-buttons" id="fc-btns">
        <button class="fc-btn-wrong" onclick="fcAnswer(false)">✗ Não sabia</button>
        <button class="fc-btn-right" onclick="fcAnswer(true)">✓ Sabia!</button>
      </div>`;
    speak(w.word);

    window.revealFC = () => {
      document.getElementById('fc')?.classList.add('revealed');
      document.getElementById('fc-btns')?.classList.add('show');
    };
    window.fcAnswer = (correct) => {
      if (correct) { score.right++; gainXP(5); }
      else score.wrong++;
      idx++;
      render();
    };
  }
  render();
}

// QUIZ
function renderQuizGame(el) {
  const questions = getRandomQuizzes(7);
  let idx = 0;
  let score = 0;

  function render() {
    if (idx >= questions.length) {
      const xp = score * 10;
      gainXP(xp);
      el.innerHTML = `
        <div class="game-title">❓ Quiz</div>
        <div class="complete-icon">🏆</div>
        <div class="complete-xp">+${xp} XP</div>
        <p style="color:var(--text2)">${score}/${questions.length} respostas certas</p>
        <button class="btn-primary" style="margin-top:1.5rem" onclick="startGame('quiz')">Jogar novamente</button>`;
      return;
    }

    const q = questions[idx];
    el.innerHTML = `
      <div class="game-title">❓ Quiz <span style="font-size:0.8rem;color:var(--text3)">${idx+1}/${questions.length}</span></div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((o, i) => `<button class="quiz-option" onclick="pickQuiz(this,${i},${q.a})">${o}</button>`).join('')}
      </div>
      <div id="qfb" class="feedback-msg" style="display:none"></div>`;

    window.pickQuiz = (btn, chosen, correct) => {
      document.querySelectorAll('.quiz-option').forEach(b => b.disabled = true);
      const fb = document.getElementById('qfb');
      if (chosen === correct) {
        btn.classList.add('correct');
        fb.textContent = '✅ Correcto!';
        fb.className = 'feedback-msg ok';
        score++;
      } else {
        btn.classList.add('wrong');
        document.querySelectorAll('.quiz-option')[correct]?.classList.add('correct');
        fb.textContent = '❌ Resposta errada!';
        fb.className = 'feedback-msg no';
      }
      fb.style.display = 'block';
      setTimeout(() => { idx++; render(); }, 1200);
    };
  }
  render();
}

// TRADUÇÃO
function renderTranslateGame(el) {
  let rounds = 0;
  let score = 0;

  function render() {
    if (rounds >= 5) {
      const xp = score * 15;
      gainXP(xp);
      el.innerHTML = `
        <div class="game-title">🔄 Tradução</div>
        <div class="complete-icon">✨</div>
        <div class="complete-xp">+${xp} XP</div>
        <p style="color:var(--text2)">${score}/5 certas</p>
        <button class="btn-primary" style="margin-top:1.5rem" onclick="startGame('translate')">Tentar novamente</button>`;
      return;
    }

    const phrase = getRandomTranslate();
    el.innerHTML = `
      <div class="game-title">🔄 Tradução <span style="font-size:0.8rem;color:var(--text3)">${rounds+1}/5</span></div>
      <div class="quiz-question">Traduz para Inglês:<br><strong>"${phrase.pt}"</strong></div>
      <div style="color:var(--text3);font-size:0.8rem;margin-bottom:0.75rem">💡 Dica: ${phrase.hint}</div>
      <input type="text" id="tr-input" class="fill-input" placeholder="Escreve em Inglês..." autocomplete="off"/>
      <div id="tr-fb" class="feedback-msg" style="display:none"></div>
      <button class="btn-primary" style="margin-top:1rem" onclick="checkTranslation('${phrase.en.replace(/'/g,"\\'")}')">Verificar ✓</button>`;

    document.getElementById('tr-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkTranslation(phrase.en);
    });

    window.checkTranslation = (correct) => {
      const val = document.getElementById('tr-input')?.value.trim().toLowerCase();
      const fb = document.getElementById('tr-fb');
      const ok = val === correct.toLowerCase() || correct.toLowerCase().includes(val) && val.length > 4;
      fb.textContent = ok ? `✅ Correcto! "${correct}"` : `❌ Era: "${correct}"`;
      fb.className = `feedback-msg ${ok ? 'ok' : 'no'}`;
      fb.style.display = 'block';
      if (ok) { score++; speak(correct); }
      rounds++;
      setTimeout(render, 1500);
    };
  }
  render();
}

// ESCUTA & ESCREVE
function renderListenGame(el) {
  let rounds = 0;
  let score = 0;

  function render() {
    if (rounds >= 5) {
      const xp = score * 12;
      gainXP(xp);
      el.innerHTML = `
        <div class="game-title">👂 Escuta & Escreve</div>
        <div class="complete-icon">🎵</div>
        <div class="complete-xp">+${xp} XP</div>
        <p style="color:var(--text2)">${score}/5 certas</p>
        <button class="btn-primary" style="margin-top:1.5rem" onclick="startGame('listen')">Tentar novamente</button>`;
      return;
    }

    const word = getRandomListenWord();
    el.innerHTML = `
      <div class="game-title">👂 Escuta & Escreve <span style="font-size:0.8rem;color:var(--text3)">${rounds+1}/5</span></div>
      <div style="text-align:center;margin:1.5rem 0">
        <button onclick="speak('${word}')" style="font-size:4rem;background:none;border:none;cursor:pointer;animation:float 2s infinite">🔊</button>
        <div style="color:var(--text2);font-size:0.85rem;margin-top:0.5rem">Toca para ouvir a palavra</div>
      </div>
      <input type="text" id="li-input" class="fill-input" placeholder="Escreve o que ouviste..." autocomplete="off"/>
      <div id="li-fb" class="feedback-msg" style="display:none"></div>
      <button class="btn-primary" style="margin-top:1rem" onclick="checkListen('${word}')">Verificar ✓</button>`;

    speak(word);

    document.getElementById('li-input')?.addEventListener('keydown', e => {
      if (e.key === 'Enter') checkListen(word);
    });

    window.checkListen = (correct) => {
      const val = document.getElementById('li-input')?.value.trim().toLowerCase();
      const fb = document.getElementById('li-fb');
      const ok = val === correct.toLowerCase();
      fb.textContent = ok ? `✅ Correcto!` : `❌ Era: "${correct}"`;
      fb.className = `feedback-msg ${ok ? 'ok' : 'no'}`;
      fb.style.display = 'block';
      if (ok) score++;
      rounds++;
      setTimeout(render, 1200);
    };
  }
  render();
}

// EMPARELHAR
function renderMatchGame(el) {
  const pairs = getRandomMatchPairs(4);
  let selected = null;
  let matched = [];
  let score = 0;

  const enWords = pairs.map(p => ({ text: p.en, lang: 'en', pair: p.en }));
  const ptWords = pairs.map(p => ({ text: p.pt, lang: 'pt', pair: p.en }));
  const all = [...enWords, ...ptWords].sort(() => Math.random() - 0.5);

  function render() {
    el.innerHTML = `
      <div class="game-title">🧩 Emparelhar</div>
      <div class="game-sub">Associa a palavra inglesa à tradução</div>
      <div class="match-grid" id="match-grid">
        ${all.map((w, i) => `
          <button class="match-btn ${matched.includes(w.pair + w.lang) ? 'matched' : ''}"
                  id="mb-${i}" data-i="${i}" onclick="selectMatch(${i})" ${matched.includes(w.pair+w.lang)?'disabled':''}>
            ${w.text}
          </button>`).join('')}
      </div>
      <div id="match-fb" class="feedback-msg" style="display:none;margin-top:1rem"></div>`;

    if (matched.length === pairs.length * 2) {
      const xp = score * 8;
      gainXP(xp);
      el.innerHTML += `<div class="complete-xp" style="margin-top:1rem">+${xp} XP 🎉</div>
        <button class="btn-primary" style="margin-top:1rem" onclick="startGame('match')">Jogar novamente</button>`;
    }
  }

  window.selectMatch = (i) => {
    const item = all[i];
    const btn = document.getElementById(`mb-${i}`);

    if (selected === null) {
      selected = { i, item };
      btn.classList.add('selected');
    } else {
      const prevBtn = document.getElementById(`mb-${selected.i}`);
      const fb = document.getElementById('match-fb');

      if (selected.item.pair === item.pair && selected.item.lang !== item.lang) {
        // Match!
        btn.classList.add('matched');
        prevBtn.classList.add('matched');
        matched.push(item.pair + 'en', item.pair + 'pt');
        score++;
        speak(item.lang === 'en' ? item.text : selected.item.text);
        fb.textContent = '✅ Par correcto!';
        fb.className = 'feedback-msg ok';
        fb.style.display = 'block';
      } else {
        btn.classList.add('wrong-match');
        prevBtn.classList.add('wrong-match');
        setTimeout(() => {
          btn.classList.remove('wrong-match', 'selected');
          prevBtn.classList.remove('wrong-match', 'selected');
        }, 500);
        fb.textContent = '❌ Tenta novamente!';
        fb.className = 'feedback-msg no';
        fb.style.display = 'block';
      }

      selected = null;
      if (matched.length === pairs.length * 2) setTimeout(render, 600);
    }
  };

  render();
}

// FALAR
function renderSpeakGame(el) {
  const word = getRandomSpeakWord();
  let attempts = 0;

  function render() {
    el.innerHTML = `
      <div class="game-title">🗣️ Falar</div>
      <div style="text-align:center;margin:1.5rem 0">
        <div style="font-size:2.5rem;font-weight:800;color:var(--primary-light)">${word.word}</div>
        <div style="color:var(--text2);font-size:0.9rem;margin-top:0.5rem">${word.phonetic}</div>
        <button onclick="speak('${word.word}')" style="margin-top:1rem;background:rgba(108,92,231,0.15);color:var(--primary-light);border:1px solid var(--primary);border-radius:12px;padding:0.75rem 1.5rem;font-weight:700;cursor:pointer">
          🔊 Ouvir pronúncia
        </button>
      </div>
      <div id="speak-result" style="text-align:center;min-height:60px"></div>
      <button class="btn-primary" id="speak-btn" onclick="startSpeaking('${word.word.replace(/'/g,"\\'")}')">
        🎤 Falar agora
      </button>`;
  }

  window.startSpeaking = (target) => {
    const resultEl = document.getElementById('speak-result');
    const btn = document.getElementById('speak-btn');
    btn.textContent = '🔴 A ouvir...';
    btn.disabled = true;
    resultEl.innerHTML = '<div style="color:var(--text2)">Diz a palavra em voz alta...</div>';

    startVoiceInput(
      (transcript) => {
        attempts++;
        const ok = transcript.toLowerCase().includes(target.toLowerCase());
        resultEl.innerHTML = ok
          ? `<div style="color:var(--success);font-size:1.5rem">✅ Perfeito!<br><small>"${transcript}"</small></div>`
          : `<div style="color:var(--danger)">❌ Ouvi: "${transcript}"<br><small>Tenta novamente!</small></div>`;
        if (ok) {
          gainXP(20);
          resultEl.innerHTML += '<div class="complete-xp" style="font-size:1.2rem">+20 XP</div>';
        }
      },
      () => {
        btn.textContent = '🎤 Tentar novamente';
        btn.disabled = false;
      }
    );
  };

  render();
}

// ── PERFIL ────────────────────────────────────────────────────
function renderProfile() {
  document.getElementById('profile-name').textContent = STATE.name;
  document.getElementById('profile-avatar-big').textContent = (STATE.name || 'A')[0].toUpperCase();
  const levelLabels = { beginner: '🌱 Iniciante', intermediate: '🌿 Intermédio', advanced: '🌳 Avançado' };
  document.getElementById('profile-level-tag').textContent = levelLabels[STATE.level] || '🌱 Iniciante';
  document.getElementById('stat-xp').textContent = STATE.xp;
  document.getElementById('stat-streak').textContent = STATE.streak;
  document.getElementById('stat-lessons').textContent = STATE.lessonsCompleted.length;
  document.getElementById('stat-words').textContent = STATE.wordsLearned;

  // Lang progress
  const langEl = document.getElementById('profile-langs');
  if (langEl) {
    const total = LINGUA_DATA.units.flatMap(u => u.lessons).length;
    const done = STATE.lessonsCompleted.length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    langEl.innerHTML = `
      <div class="profile-lang-row">
        <div class="plr-top">
          <div class="plr-name">🇬🇧 English</div>
          <div class="plr-xp">${STATE.xp} XP</div>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width:${pct}%"></div>
        </div>
        <div style="font-size:0.75rem;color:var(--text3);margin-top:0.5rem">${done}/${total} lições completas</div>
      </div>`;
  }

  // All badges
  const badgesEl = document.getElementById('all-badges');
  if (badgesEl) {
    badgesEl.innerHTML = LINGUA_DATA.badges.map(b => {
      const earned = b.condition(STATE);
      return `
        <div class="badge-full ${earned ? '' : 'locked'}" title="${b.desc}">
          <div class="bf-icon">${b.icon}</div>
          <div class="bf-name">${b.name}</div>
        </div>`;
    }).join('');
  }
}

// ── SETTINGS ─────────────────────────────────────────────────
function setupSettings() {
  document.getElementById('settings-btn')?.addEventListener('click', () => {
    document.getElementById('settings-modal').classList.remove('hidden');
    loadSettingsUI();
  });

  document.getElementById('dark-toggle')?.addEventListener('change', (e) => {
    document.body.classList.toggle('light', !e.target.checked);
    STATE.settings.dark = e.target.checked;
    saveState();
  });

  document.getElementById('sound-toggle')?.addEventListener('change', (e) => {
    STATE.settings.sound = e.target.checked;
    saveState();
  });

  document.getElementById('voice-speed')?.addEventListener('change', (e) => {
    localStorage.setItem('lingua_voice_speed', e.target.value);
  });

  document.getElementById('daily-goal-select')?.addEventListener('change', (e) => {
    STATE.dailyGoal = parseInt(e.target.value);
    saveState();
    updateGoalBar();
  });

  document.getElementById('reset-btn')?.addEventListener('click', () => {
    if (confirm('Tens a certeza? Todo o progresso será perdido!')) {
      localStorage.removeItem('lingua_state');
      location.reload();
    }
  });
}

function loadSettingsUI() {
  const s = STATE.settings;
  const darkTog = document.getElementById('dark-toggle');
  const soundTog = document.getElementById('sound-toggle');
  if (darkTog) darkTog.checked = s.dark !== false;
  if (soundTog) soundTog.checked = s.sound !== false;
}

function closeSettings() {
  document.getElementById('settings-modal').classList.add('hidden');
}

function applySettings() {
  if (STATE.settings.dark === false) {
    document.body.classList.add('light');
  }
}

// Styles are all in css/style.css — no injection needed.