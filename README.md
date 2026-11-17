# 🦆 Le canard français 2.0

App para aprender francês com o Monsieur Canard. Feito em React Native nativo (Expo SDK 58 + Expo Router).

## O que tem

- **Curso completo A1 → C1**: 20 unidades, 102 lições (incluindo 20 histórias), 836 palavras e 666 frases com áudio.
- **Conjugador com 199 verbos × 10 tempos** (présent, passé composé, impératif, imparfait, futur, conditionnel, subjonctif, plus-que-parfait, futur antérieur, conditionnel passé), com tabela que fala, treino por tempo/nível e revisão espaçada das formas que você erra.
- **Cada unidade treina seus verbos**: exercícios de conjugação entram nas lições e nos testes.
- **Cada lição é uma aula**: introdução com o pato → explicação com exemplos e tabelas que falam → prática → resultado.
- **10 tipos de exercício**: imagem, múltipla escolha, tradução, montar frase, ouvir e escrever, completar digitando, combinar pares, ordenar diálogo, falar e conjugar.
- **Explicação em cada erro**. Os erros voltam no fim da lição e vão para “Meus erros”.
- **Revisão espaçada** (SM-2), flashcards, dicionário pessoal, falsos cognatos e notas culturais.
- **Teste de nivelamento**, teste por unidade (80% libera a próxima) e onboarding.
- **Gamificação**: meta diária, streak com Croissant de reserva, missões diárias, baús, ligas semanais, 32 conquistas, loja com roupinhas para o pato e modo vidas opcional.
- **Falar**: 8 sons do francês com diagrama da boca e jogo de pares mínimos, avaliação de fala palavra por palavra, tradutor por voz PT⇄FR e conversa com o Canard em 8 cenários.
- **Lembretes** diários e alerta de streak em risco.
- **Modo claro e escuro**, login Google, sincronização na nuvem e backup.
- **Botão “Buscar atualizações”** em Configurações.

---

## ⚠️ Antes de tudo: segurança

A versão 1.0 tinha **chaves de API escritas no código**: uma da Groq (`gsk_…`) e uma do Gemini (`AIzaSyCDCC…`). Qualquer pessoa que baixasse o app conseguia extrair as duas.

1. **Revogue as duas** em https://console.groq.com/keys e https://aistudio.google.com/apikey.
2. Na 2.0 nenhuma chave de IA fica no app. A IA passa pelo servidor da pasta `worker/` (passo 3 abaixo).
3. Restrinja a chave do Firebase: Google Cloud Console → APIs e serviços → Credenciais → a chave `AIzaSyAqXN…` → restrinja a apps Android com o pacote `com.raimundo.lecanardfrancais` + SHA-1.

Também descobri por que a avaliação de fala dava **0 (silêncio)**:
- O código antigo mandava a chave errada (a do Gemini) para a Groq.
- O modelo `llama-3.3-70b-versatile` foi desligado pela Groq em agosto de 2026.

A 2.0 usa `whisper-large-v3-turbo` e `openai/gpt-oss-120b`.

---

## Configuração (uma vez só)

### 1. Instalar e rodar

```bash
npm install
npx expo start      # precisa de um development build: npx expo run:android
```

### 2. Firebase (ligas, amigos e backup)

No console do Firebase → Realtime Database → **Regras**, cole o conteúdo de `firebase/database.rules.json` e publique.

O login Google usa o mesmo cliente OAuth da versão 1.0, então continua funcionando. Quem já tinha conta recupera o XP antigo ao entrar.

### 3. Servidor de IA (Cloudflare Worker, grátis)

```bash
cd worker
npx wrangler login
npx wrangler secret put GROQ_API_KEY     # cole uma chave NOVA da Groq
npx wrangler deploy
```

Copie a URL que aparecer (ex.: `https://canard-ai.seunome.workers.dev`) para `app.json` → `expo.extra.apiUrl`.

> Para testar antes de subir o servidor: no app, vá em Configurações → Avançado e cole uma chave Groq pessoal. Ela fica só naquele aparelho.

### 4. Atualizações automáticas (EAS Workflows)

O repositório já vem com `.eas/workflows/publish.yml`. Com o repositório ligado ao projeto no expo.dev (o mesmo do botão **Build from GitHub**), cada push na `main` roda sozinho:

| O que você mudou | O que acontece | No celular |
| --- | --- | --- |
| Código, telas, conteúdo das lições | Publica uma **atualização OTA** no canal `preview` | Configurações → **Buscar atualizações** → “Baixar e reiniciar” |
| Algo nativo (biblioteca nova, permissão, ícone) | Gera um **APK novo** automaticamente | Baixe o APK na página de builds do expo.dev |

O primeiro push gera o APK (ainda não existe build compatível). Instale esse APK; dali em diante, push = atualização no app.

## Enviar para o GitHub

Use o **git** ou o **GitHub Desktop**, não o “Add file → Upload” do site: o upload pelo navegador ignora as pastas que começam com ponto (`.eas`, `.gitignore`), e sem elas as atualizações automáticas não funcionam.

```bash
git clone https://github.com/neto81cobain-bot/le-canard-francais.git
cd le-canard-francais
# apague tudo aqui, menos a pasta .git, e copie TODO o conteúdo do zip
git add -A
git commit -m "Le canard français 2.0"
git push
```

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Lições A1 / A2 / B1 / B2 / C1 | `src/content/a1.js`, `a2.js`, `b1.js`, `b2.js`, `c1.js` |
| Reforço das lições A1–B1 | `src/content/extraA.js` |
| Verbos e regras de conjugação | `src/content/verbs.js` |
| Sons, frases do dia, cultura, falsos cognatos, cenários, nivelamento | `src/content/extras.js` |
| Banco de questões da versão 1.0 (818 questões) | `src/content/legacyBank.json` |
| Cores e fontes | `src/theme/index.js` |
| XP, streak, missões, conquistas, loja | `src/store/logic.js` |
| Geração dos exercícios | `src/engine/exercises.js` |
| Telas | `src/app/` |

O formato das lições está explicado no topo de `src/content/a1.js`. Para adicionar uma lição, copie uma existente e mude o `id`.
