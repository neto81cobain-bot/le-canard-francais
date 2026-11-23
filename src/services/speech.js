// French text-to-speech. Picks the best fr-FR voice installed on the phone
// (prefers "enhanced"/network voices, which sound far more natural).
import * as Speech from 'expo-speech';

let voiceId = null;
let voiceChecked = false;
let baseRate = 0.9;

export function setSpeechRate(r) {
  baseRate = r || 0.9;
}

async function pickVoice() {
  if (voiceChecked) return voiceId;
  voiceChecked = true;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const fr = voices.filter((v) => (v.language || '').toLowerCase().replace('_', '-').startsWith('fr-fr'));
    const score = (v) =>
      (v.quality === 'Enhanced' ? 10 : 0) +
      (/network|neural|wavenet|premium|natural|online/i.test((v.identifier || '') + ' ' + (v.name || '')) ? 5 : 0) +
      (/local/i.test(v.identifier || '') ? 1 : 0);
    fr.sort((a, b) => score(b) - score(a));
    voiceId = fr[0]?.identifier || null;
    // No computador as vozes carregam depois; tenta de novo na próxima fala.
    if (!voices.length) voiceChecked = false;
  } catch {
    voiceId = null;
  }
  return voiceId;
}

// Cada fala recebe um número; stopSpeaking() invalida falas que ainda estavam
// esperando a voz carregar (senão elas começavam depois do "Continuar").
let speechToken = 0;

// ── App de PC: voz neural francesa (Piper) baixada sozinha pelo app ──
const desk = typeof window !== 'undefined' ? window.canardDesktop : null;
let deskAudio = null;
function stopDesk() {
  if (deskAudio) {
    try { deskAudio.onended = null; deskAudio.pause(); } catch {}
    deskAudio = null;
  }
}
async function speakDesktop(text, slow, onDone, my) {
  let name = null;
  try { name = await desk.voice.synth(text); } catch { name = null; }
  if (!name || my !== speechToken) return !!name;
  stopDesk();
  const a = new Audio('/__tts/' + name);
  a.playbackRate = Math.max(0.5, Math.min(1.5, (baseRate / 0.9) * (slow ? 0.72 : 1)));
  a.onended = () => { if (deskAudio === a) deskAudio = null; onDone && onDone(); };
  a.onerror = () => onDone && onDone();
  deskAudio = a;
  try { await a.play(); } catch { onDone && onDone(); }
  return true;
}

export async function speak(text, { slow = false, onDone } = {}) {
  if (!text) return;
  const my = ++speechToken;
  if (desk?.voice) {
    Speech.stop();
    stopDesk();
    if (await speakDesktop(text.replace(/_+/g, '…'), slow, onDone, my)) return;
    if (my !== speechToken) return;
  }
  const voice = await pickVoice();
  if (my !== speechToken) return;
  Speech.stop();
  Speech.speak(text.replace(/_+/g, '…'), {
    language: 'fr-FR',
    voice: voice || undefined,
    rate: slow ? Math.max(0.45, baseRate - 0.35) : baseRate,
    pitch: 1.0,
    onDone,
    onStopped: onDone,
    onError: onDone,
  });
}

export function speakPt(text, { onDone } = {}) {
  speechToken += 1;
  stopDesk();
  Speech.stop();
  Speech.speak(text, { language: 'pt-BR', rate: 1.0, onDone, onStopped: onDone, onError: onDone });
}

export function stopSpeaking() {
  speechToken += 1;
  stopDesk();
  Speech.stop();
}

// Which French voices does this phone have? (for the offline-voice check in Settings)
export async function voiceStatus() {
  if (desk?.voice) {
    try {
      const st = await desk.voice.status();
      return { desktop: st, fr: st.state === 'ready' ? 1 : 0, local: st.state === 'ready' ? 1 : 0 };
    } catch {}
  }
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const fr = voices.filter((v) => (v.language || '').toLowerCase().replace('_', '-').startsWith('fr'));
    const local = fr.filter((v) => !/network/i.test(v.identifier || ''));
    const best = await pickVoice();
    return { total: voices.length, fr: fr.length, local: local.length, best: fr.find((v) => v.identifier === best)?.name || best };
  } catch (e) {
    return { error: String(e?.message || e) };
  }
}
