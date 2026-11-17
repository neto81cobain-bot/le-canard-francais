// Keyboard handling that works with Android edge-to-edge (where the window no longer
// shrinks when the keyboard opens, so content ends up hidden behind it).
import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, TextInput, View, Platform } from 'react-native';

// How many pixels of `containerRef` are covered by the keyboard (0 when closed).
export function useKeyboardOverlap(containerRef, onShow) {
  const [overlap, setOverlap] = useState(0);
  const cb = useRef(onShow);
  cb.current = onShow;
  useEffect(() => {
    const showEvt = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvt = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const s = Keyboard.addListener(showEvt, (e) => {
      const kbTop = e.endCoordinates?.screenY ?? 0;
      const node = containerRef?.current;
      const apply = (bottom) => {
        const o = Math.max(0, Math.round(bottom - kbTop));
        setOverlap(o);
        if (cb.current) setTimeout(() => cb.current(kbTop, o), 60);
      };
      if (node?.measureInWindow) node.measureInWindow((x, y, w, h) => apply(y + h));
      else apply(kbTop + (e.endCoordinates?.height || 0));
    });
    const h = Keyboard.addListener(hideEvt, () => setOverlap(0));
    return () => { s.remove(); h.remove(); };
  }, []);
  return overlap;
}

// Scrolls a ScrollView so the focused TextInput sits above the keyboard.
export function scrollFocusedIntoView(scrollRef, offsetRef, kbTop, margin = 90) {
  try {
    const input = TextInput.State?.currentlyFocusedInput?.();
    if (!input?.measureInWindow || !scrollRef?.current) return;
    input.measureInWindow((x, y, w, h) => {
      const limit = kbTop - margin;
      if (y + h > limit) scrollRef.current.scrollTo({ y: (offsetRef?.current || 0) + (y + h - limit), animated: true });
    });
  } catch {}
}

// Drop-in for KeyboardAvoidingView on flex layouts (chat input at the bottom, etc.)
export function KeyboardAwareView({ style, children, ...rest }) {
  const ref = useRef(null);
  const overlap = useKeyboardOverlap(ref);
  return (
    <View ref={ref} style={[style, { paddingBottom: overlap ? overlap : (style && style.paddingBottom) || 0 }]} {...rest}>
      {children}
    </View>
  );
}
