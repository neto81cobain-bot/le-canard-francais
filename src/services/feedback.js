// Sounds + haptics for answers, lesson completion, chests…
import * as Haptics from 'expo-haptics';
import { createAudioPlayer, setAudioModeAsync } from 'expo-audio';

const sources = {
  correct: require('../../assets/sounds/correct.wav'),
  wrong: require('../../assets/sounds/wrong.wav'),
  complete: require('../../assets/sounds/complete.wav'),
  levelup: require('../../assets/sounds/levelup.wav'),
  tap: require('../../assets/sounds/tap.wav'),
  chest: require('../../assets/sounds/chest.wav'),
};

const players = {};
let prefs = { sounds: true, haptics: true };
let modeSet = false;

export function setFeedbackPrefs(p) {
  prefs = { ...prefs, ...p };
}

async function ensureMode() {
  if (modeSet) return;
  modeSet = true;
  try {
    await setAudioModeAsync({ playsInSilentMode: true, allowsRecording: false });
  } catch {}
}

function play(name) {
  if (!prefs.sounds) return;
  ensureMode();
  try {
    if (!players[name]) players[name] = createAudioPlayer(sources[name]);
    const p = players[name];
    p.seekTo(0);
    p.play();
  } catch {}
}

function buzz(kind) {
  if (!prefs.haptics) return;
  try {
    if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    else if (kind === 'error') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    else if (kind === 'heavy') Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    else Haptics.selectionAsync();
  } catch {}
}

export const fx = {
  correct: () => { play('correct'); buzz('success'); },
  wrong: () => { play('wrong'); buzz('error'); },
  complete: () => { play('complete'); buzz('success'); },
  levelup: () => { play('levelup'); buzz('heavy'); },
  chest: () => { play('chest'); buzz('heavy'); },
  tap: () => { buzz('select'); },
  select: () => { play('tap'); buzz('select'); },
};
