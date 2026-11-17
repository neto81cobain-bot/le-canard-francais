// Renders the app's own dialogs and toasts (see services/dialog.js).
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Modal, Pressable, Animated, Easing } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme, fonts, radius, palette, shadow } from '../theme';
import { Button } from './ui';
import Duck from './Duck';
import Icon from './Icon';
import { _registerHost } from '../services/dialog';
import { fx } from '../services/feedback';

const ERROR = /erro|ops|não foi|nao foi|falh|inválid|invalid|sem conex|expirad|denied|negad/i;
const ASK = /\?\s*$|sair|remover|apagar|restaurar|tem certeza/i;

function moodFor(title = '', message = '') {
  const s = `${title} ${message}`;
  if (ERROR.test(s)) return { mood: 'comfort', tone: 'error' };
  if (ASK.test(title)) return { mood: 'think', tone: 'ask' };
  if (/🎉|parabéns|bem-vindo|recuper|conectad/i.test(s)) return { mood: 'celebrate', tone: 'happy' };
  return { mood: 'happy', tone: 'info' };
}

export default function DialogHost() {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const [dlg, setDlg] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const scale = useRef(new Animated.Value(0.9)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const toastY = useRef(new Animated.Value(80)).current;
  const toastTimer = useRef(null);
  const queue = useRef([]);

  useEffect(() => _registerHost({
    dialog: (d) => {
      setDlg((cur) => {
        if (cur) { queue.current.push(d); return cur; }
        return d;
      });
    },
    toast: (text, kind) => {
      clearTimeout(toastTimer.current);
      setToastMsg({ text, kind, id: Date.now() });
      toastY.setValue(80);
      Animated.spring(toastY, { toValue: 0, useNativeDriver: true, friction: 7 }).start();
      toastTimer.current = setTimeout(() => {
        Animated.timing(toastY, { toValue: 120, duration: 220, useNativeDriver: true }).start(() => setToastMsg(null));
      }, 2000);
    },
  }), []);

  useEffect(() => {
    if (!dlg) return;
    scale.setValue(0.9); fade.setValue(0);
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 7, tension: 90, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
    const { tone } = moodFor(dlg.title, dlg.message);
    if (tone === 'error') fx.wrong?.();
  }, [dlg]);

  const close = (btn) => {
    const next = queue.current.shift() || null;
    setDlg(next);
    if (btn?.onPress) setTimeout(() => { try { btn.onPress(); } catch {} }, 10);
  };

  let content = null;
  if (dlg) {
    const { mood, tone } = moodFor(dlg.title, dlg.message);
    const buttons = dlg.buttons && dlg.buttons.length ? dlg.buttons : [{ text: 'OK' }];
    const cancel = buttons.find((b) => b.style === 'cancel');
    const stacked = buttons.length > 2 || buttons.some((b) => (b.text || '').length > 14);
    const accent = tone === 'error' ? t.error : tone === 'happy' ? t.success : t.primary;
    content = (
      <Modal visible transparent animationType="none" statusBarTranslucent onRequestClose={() => close(cancel || (buttons.length === 1 ? buttons[0] : null))}>
        <Animated.View style={{ flex: 1, backgroundColor: 'rgba(8,12,28,0.62)', opacity: fade, alignItems: 'center', justifyContent: 'center', padding: 26 }}>
          <Pressable style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} onPress={() => cancel && close(cancel)} />
          <Animated.View style={[{ width: '100%', maxWidth: 400, backgroundColor: t.surface, borderRadius: 28, paddingTop: 54, paddingHorizontal: 22, paddingBottom: 20, alignItems: 'center', transform: [{ scale }] }, shadow(t, 3)]}>
            <View style={{ position: 'absolute', top: -46, width: 96, height: 96, borderRadius: 48, backgroundColor: t.surface, alignItems: 'center', justifyContent: 'center', borderWidth: 4, borderColor: accent }}>
              <Duck mood={mood} size={78} />
            </View>
            {dlg.title ? <Text style={{ fontFamily: fonts.display, fontSize: 23, color: t.text, textAlign: 'center' }}>{dlg.title}</Text> : null}
            {dlg.message ? <Text style={{ fontFamily: fonts.body, fontSize: 16, lineHeight: 23, color: t.text2, textAlign: 'center', marginTop: 8 }}>{dlg.message}</Text> : null}
            <View style={{ alignSelf: 'stretch', marginTop: 20, gap: 10, flexDirection: stacked ? 'column' : 'row' }}>
              {(stacked ? buttons.slice().reverse() : buttons).map((b, i) => {
                const primary = b === buttons[buttons.length - 1] && b.style !== 'cancel';
                const variant = b.style === 'destructive' ? 'danger' : primary ? (tone === 'error' ? 'error' : 'primary') : 'secondary';
                return <Button key={i} small title={b.text || 'OK'} variant={variant} style={stacked ? null : { flex: 1 }} onPress={() => close(b)} />;
              })}
            </View>
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }

  const kindColor = toastMsg?.kind === 'success' ? t.success : toastMsg?.kind === 'error' ? t.error : t.primary;
  return (
    <>
      {content}
      {toastMsg ? (
        <Animated.View pointerEvents="none" style={[{ position: 'absolute', left: 20, right: 20, bottom: insets.bottom + 96, alignItems: 'center', transform: [{ translateY: toastY }] }]}>
          <View style={[{ flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: t.mode === 'dark' ? '#EDEFF7' : palette.navy, borderRadius: radius.pill || 999, paddingVertical: 12, paddingHorizontal: 18 }, shadow(t, 3)]}>
            <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: kindColor, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name={toastMsg.kind === 'error' ? 'close' : 'check'} size={15} color="#fff" stroke={3} />
            </View>
            <Text style={{ fontFamily: fonts.bodyBold, fontSize: 15, color: t.mode === 'dark' ? palette.navy : '#fff' }}>{toastMsg.text}</Text>
          </View>
        </Animated.View>
      ) : null}
    </>
  );
}
