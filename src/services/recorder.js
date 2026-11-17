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

export function useRecorder({ maxMs = 9000, onDone } = {}) {
  const recorder = useAudioRecorder(OPTIONS);
  const st = useAudioRecorderState(recorder, 150);
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

  // Silence detection
  useEffect(() => {
    if (phase !== 'recording') return;
    const now = Date.now();
    const level = st.metering ?? -160;
    if (level > -38) {
      spoke.current = true;
      silentSince.current = 0;
    } else if (spoke.current) {
      if (!silentSince.current) silentSince.current = now;
      if (now - silentSince.current > 1300) stop();
    }
    if (now - startAt.current > maxMs) stop();
  }, [st.durationMillis, st.metering, phase]);

  const level = Math.max(0, Math.min(1, ((st.metering ?? -60) + 60) / 50));
  return { start, stop, phase, setPhase, level, recording: phase === 'recording' };
}
