// Catches JavaScript errors that happen outside the screen rendering (timers, buttons,
// network callbacks). In a release build those would close the app; here they are
// saved and the app keeps running. Settings → Diagnóstico shows them.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from './dialog';
import * as Updates from 'expo-updates';
import * as Application from 'expo-application';

const KEY = 'lcf_error_log';
let lastAlert = 0;

export async function logError(error, where = '', fatal = false) {
  try {
    const entry = {
      at: Date.now(),
      where,
      fatal,
      message: String(error?.message || error).slice(0, 400),
      stack: String(error?.stack || '').split('\n').slice(0, 6).join('\n').slice(0, 800),
    };
    const prev = JSON.parse((await AsyncStorage.getItem(KEY)) || '[]');
    await AsyncStorage.setItem(KEY, JSON.stringify([entry, ...prev].slice(0, 20)));
  } catch {}
}

export async function readErrors() {
  try { return JSON.parse((await AsyncStorage.getItem(KEY)) || '[]'); } catch { return []; }
}

export async function clearErrors() {
  try { await AsyncStorage.removeItem(KEY); } catch {}
}

export function installGlobalHandler() {
  const EU = global.ErrorUtils;
  if (!EU || EU.__lcfInstalled) return;
  EU.__lcfInstalled = true;
  const previous = EU.getGlobalHandler();
  EU.setGlobalHandler((error, isFatal) => {
    logError(error, 'global', !!isFatal);
    if (!isFatal) return previous && previous(error, isFatal);
    // Keep the app alive instead of closing it.
    if (Date.now() - lastAlert > 5000) {
      lastAlert = Date.now();
      setTimeout(() => Alert.alert('Ops! 🦆', 'Algo deu errado, mas seu progresso está salvo. Se continuar acontecendo, mande o print de Configurações → Diagnóstico.'), 50);
    }
  });
  // Unhandled promise rejections → just log
  try {
    global.HermesInternal?.enablePromiseRejectionTracker?.({
      allRejections: true,
      onUnhandled: (id, err) => logError(err, 'promise'),
      onHandled: () => {},
    });
  } catch {}
}

export async function diagnosticsReport() {
  const errors = await readErrors();
  let updLogs = [];
  try {
    const entries = await Updates.readLogEntriesAsync(3 * 24 * 3600 * 1000);
    updLogs = entries.filter((e) => e.level === 'error' || e.level === 'fatal' || e.level === 'warn').slice(-8);
  } catch {}
  const head = [
    `Versão ${Application.nativeApplicationVersion} (${Application.nativeBuildVersion})`,
    `Canal: ${Updates.channel || '-'} · runtime: ${Updates.runtimeVersion || '-'}`,
    `Atualização: ${Updates.isEmbeddedLaunch ? 'APK (embutida)' : (Updates.updateId || '').slice(0, 8)}${Updates.isEmergencyLaunch ? ' · ⚠️ lançamento de emergência' : ''}`,
  ];
  const errs = errors.map((e) => `• ${new Date(e.at).toLocaleString('pt-BR')} [${e.where}${e.fatal ? ' FATAL' : ''}] ${e.message}`);
  const upd = updLogs.map((e) => `• ${new Date(e.timestamp).toLocaleString('pt-BR')} [updates ${e.level}] ${String(e.message).slice(0, 200)}`);
  return { text: [...head, '', 'Erros do app:', ...(errs.length ? errs : ['nenhum']), '', 'Atualizações:', ...(upd.length ? upd : ['nenhum'])].join('\n'), count: errors.length + updLogs.length };
}
