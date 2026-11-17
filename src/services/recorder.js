// Microphone recording with automatic stop on silence.
import { useEffect, useRef, useState, useCallback } from 'react';
import { useAudioRecorder, useAudioRecorderState, RecordingPresets, requestRecordingPermissionsAsync, setAudioModeAsync } from 'expo-audio';
import { stopSpeaking } from './speech';

const OPTIONS = {
  ...RecordingPresets.HIGH_QUALITY,
  numberOfChannels: 1,
  sampleRate: 16000,
  bitRate: 64000,
  isMeteringEnabled: true,
};

export function useRecorder({ maxMs = 12000, onDone } = {}) {
  const recorder = useAudioRecorder(OPTIONS);
  const st = useAudioRecorderState(recorder, 100);
  const [phase, setPhase] = useState('idle'); // idle | recording | done | denied
  const startAt = useRef(0);
  const spoke = useRef(false);
  const silentSince = useRef(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  const stopping = useRef(false);

  const stop = useCallback(async () => {
    if (stopping.current) return;
    stopping.current = true;
    try {
      await recorder.stop();
    } catch {}
    try {
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
    } catch {}
    setPhase('done');
    const uri = recorder.uri;
    const duration = Date.now() - startAt.current;
    doneRef.current && doneRef.current({ uri, duration, spoke: spoke.current });
  }, [recorder]);

  const start = useCallback(async () => {
    stopSpeaking();
    const perm = await requestRecordingPermissionsAsync();
    if (!perm.granted) {
      setPhase('denied');
      return false;
    }
    await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
    await recorder.prepareToRecordAsync();
    recorder.record();
    startAt.current = Date.now();
    spoke.current = false;
    silentSince.current = 0;
    stopping.current = false;
    setPhase('recording');
    return true;
  }, [recorder]);

  // Silence detection, adaptive to the room: we learn the background-noise level during
  // the first ~0.4 s and the user's voice peak, then stop when the level falls back
  // close to the noise floor (or well below the voice peak) for a short while.
  const floor = useRef(null);
  const peak = useRef(-160);
  useEffect(() => {
    if (phase !== 'recording') { floor.current = null; peak.current = -160; return; }
    const now = Date.now();
    const elapsed = now - startAt.current;
    const level = st.metering;
    if (typeof level === 'number' && level > -159) {
      if (elapsed < 400) {
        floor.current = floor.current == null ? level : Math.min(floor.current, level);
      } else {
        if (floor.current == null) floor.current = level;
        // floor drifts down slowly if the room gets quieter
        if (level < floor.current) floor.current = level;
        peak.current = Math.max(peak.current, level);
        const speechLine = Math.max(floor.current + 10, -45);
        if (level > speechLine) {
          spoke.current = true;
          silentSince.current = 0;
        } else if (spoke.current) {
          const quietLine = Math.max(floor.current + 6, peak.current - 22);
          if (level < quietLine) {
            if (!silentSince.current) silentSince.current = now;
            if (now - silentSince.current > 750) stop();
          } else {
            silentSince.current = 0;
          }
        }
      }
    }
    if (elapsed > maxMs || (!spoke.current && elapsed > 6000)) stop();
  }, [st.durationMillis, st.metering, phase]);

  const level = Math.max(0, Math.min(1, ((st.metering ?? -60) + 60) / 50));
  return { start, stop, phase, setPhase, level, recording: phase === 'recording' };
}
