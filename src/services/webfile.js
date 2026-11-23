// Ajudantes só para a versão de computador (web/Electron): baixar arquivos,
// transformar o card SVG em PNG e imprimir HTML (Salvar como PDF).
import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isDesktopApp = isWeb && typeof navigator !== 'undefined' && /Electron/i.test(navigator.userAgent || '');

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 4000);
}

export function downloadText(text, filename, type = 'text/plain;charset=utf-8') {
  downloadBlob(new Blob([text], { type }), filename);
}

const toB64 = (buf) => {
  let s = '';
  const bytes = new Uint8Array(buf);
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
  return btoa(s);
};

// As fontes do app (Fraunces/Nunito) não existem dentro de uma imagem SVG solta,
// então copiamos as regras @font-face da página já embutidas em base64.
let fontCss = null;
async function embeddedFonts() {
  if (fontCss != null) return fontCss;
  const out = [];
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules = [];
      try { rules = Array.from(sheet.cssRules || []); } catch { continue; }
      for (const r of rules) {
        if (!(r instanceof CSSFontFaceRule)) continue;
        const fam = r.style.getPropertyValue('font-family');
        const m = /url\(["']?([^"')]+)["']?\)/.exec(r.style.getPropertyValue('src'));
        if (!fam || !m) continue;
        try {
          const res = await fetch(m[1]);
          const b64 = toB64(await res.arrayBuffer());
          out.push(`@font-face{font-family:${fam};src:url(data:font/ttf;base64,${b64});}`);
        } catch {}
      }
    }
  } catch {}
  fontCss = out.join('\n');
  return fontCss;
}

function findSvg(ref, w, h) {
  const el = ref instanceof Element ? ref : ref?.elementRef?.current || ref?._touchableNode || null;
  if (el && el.tagName && el.tagName.toLowerCase() === 'svg') return el;
  const all = Array.from(document.querySelectorAll(`svg[viewBox="0 0 ${w} ${h}"]`));
  return all[all.length - 1] || null;
}

// Gera o PNG do card e baixa (no app de PC vai direto para a pasta Downloads).
export async function downloadSvgPng(ref, w, h, filename) {
  const svg = findSvg(ref, w, h);
  if (!svg) throw new Error('sem-svg');
  const clone = svg.cloneNode(true);
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(w));
  clone.setAttribute('height', String(h));
  const css = await embeddedFonts();
  if (css) {
    const style = document.createElementNS('http://www.w3.org/2000/svg', 'style');
    style.textContent = css;
    clone.insertBefore(style, clone.firstChild);
  }
  const xml = new XMLSerializer().serializeToString(clone);
  const img = new Image();
  const url = URL.createObjectURL(new Blob([xml], { type: 'image/svg+xml;charset=utf-8' }));
  await new Promise((res, rej) => {
    img.onload = res;
    img.onerror = () => rej(new Error('svg-load'));
    img.src = url;
  });
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  URL.revokeObjectURL(url);
  const blob = await new Promise((res) => canvas.toBlob(res, 'image/png'));
  if (!blob) throw new Error('png');
  const file = typeof File !== 'undefined' ? new File([blob], filename, { type: 'image/png' }) : null;
  // No navegador do celular dá pra abrir a folha de compartilhar; no PC, baixa.
  if (!isDesktopApp && file && navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return 'shared';
    } catch (e) {
      if (e?.name === 'AbortError') return 'cancel';
    }
  }
  downloadBlob(blob, filename);
  return 'downloaded';
}

// Abre a janela de impressão com o HTML (o usuário escolhe "Salvar como PDF").
export function printHtml(html) {
  const frame = document.createElement('iframe');
  frame.style.cssText = 'position:fixed;right:0;bottom:0;width:0;height:0;border:0;';
  document.body.appendChild(frame);
  const doc = frame.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();
  setTimeout(() => {
    try {
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } finally {
      setTimeout(() => frame.remove(), 60000);
    }
  }, 600);
}

// No app de PC não existe a folha de compartilhar do celular: o texto vai para a
// área de transferência (Ctrl+V no WhatsApp Web, Instagram etc.).
let shimmed = false;
export function installWebShims(Share, toast) {
  if (!isWeb || shimmed) return;
  shimmed = true;
  // Avisos da voz francesa que o app de PC baixa sozinho.
  const desk = typeof window !== 'undefined' ? window.canardDesktop : null;
  if (desk?.voice) {
    let last = null;
    desk.voice.onChange((st) => {
      if (st.state === last) return;
      if (st.state === 'downloading') toast('Baixando a voz francesa (só na primeira vez)… 🎧');
      else if (st.state === 'ready' && last === 'downloading') toast('Voz francesa pronta! 🇫🇷', 'success');
      else if (st.state === 'error') toast('Não deu para baixar a voz francesa agora. Uso a do Windows por enquanto.');
      last = st.state;
    });
  }
  const orig = Share.share.bind(Share);
  Share.share = async (content = {}, opts) => {
    if (!isDesktopApp && navigator.share) {
      try {
        return await orig(content, opts);
      } catch (e) {
        if (e?.name === 'AbortError') return { action: 'dismissedAction' };
      }
    }
    const text = [content.message, content.url].filter(Boolean).join('\n');
    try {
      await navigator.clipboard.writeText(text);
      toast('Texto copiado — cole onde quiser com Ctrl+V 📋', 'success');
    } catch {
      toast('Não deu para copiar o texto.');
    }
    return { action: 'sharedAction' };
  };
}
