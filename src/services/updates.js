// "Buscar atualizações": 1) over-the-air JS update (EAS Update, published on every
// push to GitHub); 2) new APK published as a GitHub Release (for native changes).
import * as Updates from 'expo-updates';
import * as Application from 'expo-application';
import { Linking } from 'react-native';
import { CONFIG } from './config';

function cmpVersion(a, b) {
  const pa = String(a).replace(/^v/, '').split('.').map((n) => parseInt(n, 10) || 0);
  const pb = String(b).replace(/^v/, '').split('.').map((n) => parseInt(n, 10) || 0);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d) return d > 0 ? 1 : -1;
  }
  return 0;
}

export function currentVersion() {
  return Application.nativeApplicationVersion || '2.0.0';
}

export function updateInfo() {
  return {
    version: currentVersion(),
    build: Application.nativeBuildVersion,
    channel: Updates.channel,
    updateId: Updates.updateId,
    createdAt: Updates.createdAt,
    otaEnabled: Updates.isEnabled,
    embedded: Updates.isEmbeddedLaunch,
  };
}

// Returns { kind: 'ota' | 'apk' | 'none' | 'error', ... }
export async function checkForUpdates() {
  let otaError = null;
  // 1) OTA
  if (Updates.isEnabled && !__DEV__) {
    try {
      const res = await Updates.checkForUpdateAsync();
      if (res.isAvailable) return { kind: 'ota' };
      // Downloaded in the background at launch but not running yet → just restart
      try {
        const st = await Updates.getStateAsync?.();
        if (st?.isUpdatePending) return { kind: 'ota', pending: true };
      } catch {}
    } catch (e) {
      otaError = e?.message || String(e);
    }
  } else if (!Updates.isEnabled) {
    otaError = 'Atualização pelo ar desligada neste aparelho.';
  }
  // 2) GitHub Release with a newer APK
  if (CONFIG.githubRepo && !CONFIG.githubRepo.includes('SEU_USUARIO')) {
    try {
      const r = await fetch(`https://api.github.com/repos/${CONFIG.githubRepo}/releases/latest`, {
        headers: { Accept: 'application/vnd.github+json' },
      });
      if (r.ok) {
        const rel = await r.json();
        const latest = (rel.tag_name || '').replace(/^v/, '');
        if (latest && cmpVersion(latest, currentVersion()) > 0) {
          const apk = (rel.assets || []).find((a) => a.name?.endsWith('.apk'));
          return { kind: 'apk', version: latest, notes: rel.body || '', url: apk?.browser_download_url || rel.html_url };
        }
      }
    } catch {}
  }
  if (otaError) return { kind: 'error', message: 'Não consegui verificar: ' + otaError };
  return { kind: 'none' };
}

export async function applyOta(pending) {
  if (!pending) await Updates.fetchUpdateAsync();
  await Updates.reloadAsync();
}

export function openApk(url) {
  Linking.openURL(url);
}
