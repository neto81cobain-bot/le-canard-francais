// Things done offline that need the AI: kept in state.outbox and sent when the internet comes back.
import { translateText, correctWriting, aiAvailable } from './ai';
import { isNetworkError } from './net';
import { toast } from './dialog';

let running = false;

export async function processOutbox(getState, actions) {
  if (running || !aiAvailable()) return;
  const box = getState().outbox || [];
  if (!box.length) return;
  running = true;
  let tr = 0;
  let diary = 0;
  try {
    for (const item of box) {
      try {
        if (item.kind === 'translate') {
          const r = await translateText(item.text, item.dir);
          if (r.translation) {
            const fr = item.dir === 'pt-fr' ? r.translation : item.text;
            const pt = item.dir === 'pt-fr' ? item.text : r.translation;
            actions.addTranslation({ id: item.id, dir: item.dir, source: item.text, translation: r.translation, note: r.note || '', fr, pt });
            tr++;
          }
        } else if (item.kind === 'diary') {
          const r = await correctWriting(item.text, item.prompt, item.level);
          actions.set((s) => ({ diary: (s.diary || []).map((d) => (d.at === item.at ? { ...d, ...r, pending: false } : d)) }));
          diary++;
        }
        actions.set((s) => ({ outbox: (s.outbox || []).filter((x) => x.id !== item.id) }));
      } catch (e) {
        if (isNetworkError(e) || e?.offline) break; // still offline: try again later
        // a real error for this item: give up on it so the queue does not get stuck
        actions.set((s) => ({ outbox: (s.outbox || []).filter((x) => x.id !== item.id), diary: (s.diary || []).map((d) => (d.at === item.at ? { ...d, pending: false } : d)) }));
      }
    }
  } finally {
    running = false;
  }
  if (diary) toast(diary === 1 ? '✍️ Seu texto do diário foi corrigido!' : `✍️ ${diary} textos do diário corrigidos!`, 'success');
  else if (tr) toast(tr === 1 ? '🔁 Sua tradução pendente ficou pronta!' : `🔁 ${tr} traduções pendentes ficaram prontas!`, 'success');
}
