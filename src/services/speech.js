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
      (/network|neural|wavenet|premium/i.test(v.identifier || v.name || '') ? 5 : 0) +
      (/local/i.test(v.identifier || '') ? 1 : 0);
    fr.sort((a, b) => score(b) - score(a));
    voiceId = fr[0]?.identifier || null;
  } catch {
    voiceId = null;
  }
  return voiceId;
}

export async function speak(text, { slow = false, onDone } = {}) {
  if (!text) return;
  const voice = await pickVoice();
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

export function speakPt(text) {
  Speech.stop();
  Speech.speak(text, { language: 'pt-BR', rate: 1.0 });
}

export function stopSpeaking() {
  Speech.stop();
}
