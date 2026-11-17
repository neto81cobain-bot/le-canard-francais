# 🦆 Le canard français 2.0

App para aprender francês com o Monsieur Canard. Feito em React Native nativo (Expo SDK 58 + Expo Router).

## O que tem

- **Curso em trilha A1 → B1**: 12 unidades, 62 lições (incluindo 12 histórias), 408 palavras e 284 frases com áudio.
- **Cada lição é uma aula**: introdução com o pato → explicação com exemplos e tabelas que falam → prática → resultado.
- **8 tipos de exercício**: imagem, múltipla escolha, tradução, montar frase, ouvir e escrever, completar digitando, combinar pares, ordenar diálogo e falar.
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

### 4. GitHub + atualizações automáticas

1. Em `app.json` → `expo.extra.githubRepo`, coloque `seu-usuario/nome-do-repo`.
2. Ligue o projeto ao EAS (cria o `projectId` e a URL de updates):
   ```bash
   npx eas-cli@latest login
   npx eas-cli@latest init
   npx eas-cli@latest update:configure
   ```
3. Crie um token em https://expo.dev/settings/access-tokens e salve no GitHub em **Settings → Secrets and variables → Actions → New secret**, com o nome `EXPO_TOKEN`.
4. Gere o primeiro APK e instale no celular:
   ```bash
   npx eas-cli@latest build -p android --profile production
   ```
   > Use a mesma conta Expo da versão 1.0, para o APK ser assinado com a mesma chave e instalar por cima.

---

## Como atualizar depois (só `git push`)

O workflow `.github/workflows/publish.yml` roda a cada push na `main`:

| O que você mudou | O que acontece | No celular |
| --- | --- | --- |
| Código, telas, conteúdo das lições | Publica uma **atualização OTA** (EAS Update) | Configurações → **Buscar atualizações** → “Baixar e reiniciar” |
| A `version` no `app.json` (ex.: 2.0.0 → 2.1.0) | Gera um **APK novo** e cria um **GitHub Release** | Configurações → **Buscar atualizações** → “Baixar APK” |

Mude a `version` só quando adicionar uma biblioteca nativa nova ou mexer em permissões. Para conteúdo e telas, basta o push.

---

## Onde editar

| O quê | Arquivo |
| --- | --- |
| Lições A1 / A2 / B1 | `src/content/a1.js`, `a2.js`, `b1.js` |
| Sons, frases do dia, cultura, falsos cognatos, cenários, nivelamento | `src/content/extras.js` |
| Banco de questões da versão 1.0 (818 questões) | `src/content/legacyBank.json` |
| Cores e fontes | `src/theme/index.js` |
| XP, streak, missões, conquistas, loja | `src/store/logic.js` |
| Geração dos exercícios | `src/engine/exercises.js` |
| Telas | `src/app/` |

O formato das lições está explicado no topo de `src/content/a1.js`. Para adicionar uma lição, copie uma existente e mude o `id`.
