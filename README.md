# LinguaAO — Aprende Inglês 🇬🇧

> Plataforma mobile-first para aprender Inglês com IA, gamificação e lições estruturadas — feita para Angola.

![LinguaAO](https://img.shields.io/badge/LinguaAO-v1.0-6C5CE7?style=for-the-badge)
![PWA](https://img.shields.io/badge/PWA-Ready-00CEC9?style=for-the-badge)
![IA](https://img.shields.io/badge/IA-Claude%20API-A29BFE?style=for-the-badge)

---

## ✨ Funcionalidades

- **🤖 Professor IA** — Conversa em tempo real com Claude (Anthropic) para praticar Inglês
- **📚 Lições estruturadas** — Unidades por nível: Iniciante → Intermédio → Avançado
- **🎮 6 Mini-jogos** — Flashcards, Quiz, Tradução, Escuta & Escreve, Emparelhar, Falar
- **🔊 Text-to-Speech** — Ouve a pronúncia correcta de cada palavra
- **🎤 Voice Input** — Fala e pratica a pronúncia com reconhecimento de voz
- **⚡ Sistema de XP** — Ganha pontos e acompanha o progresso
- **🔥 Streak diário** — Mantém a sequência de dias consecutivos
- **🏆 Conquistas** — Desbloqueie badges ao cumprir desafios
- **🌙 Dark/Light mode** — Interface adaptável
- **📱 PWA** — Instala como app no telemóvel

---

## 🗂️ Estrutura do Projecto

```
linguaao/
├── index.html          # Estrutura principal (SPA)
├── manifest.json       # PWA manifest
├── css/
│   └── style.css       # Todos os estilos (dark + light mode)
├── js/
│   ├── data.js         # Base de dados: lições, vocabulário, quizzes
│   ├── ai.js           # Integração Claude API + TTS + Voice
│   └── app.js          # Lógica principal: navegação, XP, jogos
└── assets/
    ├── icon.svg
    ├── icon-192.png
    └── icon-512.png
```

---

## 🚀 Como usar

### Localmente
1. Clona o repositório:
   ```bash
   git clone https://github.com/Atanasildo/linguaao.git
   cd linguaao
   ```
2. Abre `index.html` num browser (ou usa Live Server no VS Code)

### Com IA real (Claude API)
1. Obtém uma chave API em [console.anthropic.com](https://console.anthropic.com)
2. Em `js/ai.js`, substitui `'your-api-key-here'` pela tua chave:
   ```js
   'x-api-key': 'sk-ant-...',
   ```
> ⚠️ Para produção, usa um backend proxy para não expor a chave API no frontend.

---

## 🎮 Mini-jogos

| Jogo | Descrição | XP |
|------|-----------|-----|
| 🃏 Flashcards | Memoriza vocabulário com repetição espaçada | +5 XP/acerto |
| ❓ Quiz | Perguntas de escolha múltipla | +10 XP/acerto |
| 🔄 Tradução | Traduz frases PT → EN | +15 XP/acerto |
| 👂 Escuta & Escreve | Ouve e escreve a palavra correcta | +12 XP/acerto |
| 🧩 Emparelhar | Associa palavra à tradução | +8 XP/par |
| 🗣️ Falar | Reconhecimento de voz para pronúncia | +20 XP |

---

## 🛠️ Tecnologias

- **Vanilla JS** — Sem frameworks, leve e rápido
- **CSS Variables** — Theming completo dark/light
- **Web Speech API** — TTS e reconhecimento de voz nativo
- **Anthropic Claude API** — IA conversacional
- **PWA** — Funciona offline (com Service Worker)
- **localStorage** — Persistência do progresso

---

## 👤 Autor

**Atanásio LF** — [@Atanasildo](https://github.com/Atanasildo)

---

*Feito com ❤️ em Angola 🇦🇴*
