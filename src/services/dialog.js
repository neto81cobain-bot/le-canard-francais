// App-styled replacement for React Native's Alert, plus toasts.
// Same call shape as Alert.alert(title, message, buttons), so screens just import this one.
import { Alert as RNAlert } from 'react-native';

let host = null; // set by <DialogHost/>
export function _registerHost(h) {
  host = h;
  return () => { if (host === h) host = null; };
}

const SUCCESS = /^(salvo|copiad|enviad|pronto|importad|adicionad|feito|obrigad|conectad|sincronizad|desafio enviado)/i;

export const Alert = {
  alert(title, message, buttons, options) {
    // A bare "Salvo!" / "Copiado!" becomes a quick toast instead of a box.
    if ((!buttons || buttons.length <= 1) && SUCCESS.test(String(title || '').trim()) && host) {
      host.toast(message ? `${title} ${message}` : title, 'success');
      if (buttons?.[0]?.onPress) buttons[0].onPress();
      return;
    }
    if (!host) return RNAlert.alert(title, message, buttons, options);
    host.dialog({ title, message, buttons, options });
  },
};

export function toast(text, kind = 'info') {
  if (host) host.toast(text, kind);
  else RNAlert.alert(text);
}
