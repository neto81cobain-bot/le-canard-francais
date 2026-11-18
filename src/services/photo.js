// Profile photo from the gallery: pick → square crop → resize to 192 px → small JPEG data URI.
// Stored in the profile, so it shows offline and syncs to friends without a storage server.
let Picker = null;
let Manip = null;
try {
  Picker = require('expo-image-picker');
  Manip = require('expo-image-manipulator');
} catch {
  Picker = null;
}

export const photoPickerAvailable = () => !!(Picker && Picker.launchImageLibraryAsync);

export async function pickProfilePhoto() {
  if (!photoPickerAvailable()) {
    const e = new Error('Esta versão do app ainda não tem acesso à galeria. Instale o APK novo (2.5) para escolher uma foto.');
    e.needsApk = true;
    throw e;
  }
  const r = await Picker.launchImageLibraryAsync({ mediaTypes: ['images'], allowsEditing: true, aspect: [1, 1], quality: 1 });
  if (r.canceled || !r.assets?.length) return null;
  const a = r.assets[0];
  const ctx = Manip.ImageManipulator.manipulate(a.uri);
  const w = a.width || 0;
  const h = a.height || 0;
  // if the system editor didn't crop, crop the centre square ourselves
  if (w && h && Math.abs(w - h) > 2) {
    const side = Math.min(w, h);
    ctx.crop({ originX: Math.round((w - side) / 2), originY: Math.round((h - side) / 2), width: side, height: side });
  }
  ctx.resize({ width: 192, height: 192 });
  const img = await ctx.renderAsync();
  const out = await img.saveAsync({ format: Manip.SaveFormat.JPEG, compress: 0.72, base64: true });
  if (!out?.base64) throw new Error('Não consegui ler essa foto. Tente outra.');
  return 'data:image/jpeg;base64,' + out.base64;
}

// Which picture to show for the user: custom photo, Google photo, or the duck ('none').
export function avatarOf(state) {
  const p = state?.profile?.photo;
  if (p === 'none') return null;
  return p || state?.auth?.photo || null;
}
