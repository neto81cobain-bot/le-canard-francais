// Catches render errors so a single broken screen never leaves the app blank.
import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

const C = { bg: '#FBF7F0', navy: '#1E3A8A', red: '#E63946', text: '#1F2937', soft: '#6B7280' };

export class ExerciseBoundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error) {
    console.warn('Exercise crashed:', error?.message);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <View style={{ alignItems: 'center', gap: 12, paddingVertical: 30 }}>
        <Text style={{ fontSize: 46 }}>🦆💦</Text>
        <Text style={{ fontSize: 18, fontWeight: '800', color: this.props.color || C.navy, textAlign: 'center' }}>Ops, este exercício tropeçou</Text>
        <Text style={{ fontSize: 13, color: C.soft, textAlign: 'center' }}>{String(this.state.error?.message || this.state.error).slice(0, 160)}</Text>
        <Pressable onPress={this.props.onSkip} style={{ backgroundColor: C.navy, paddingHorizontal: 22, paddingVertical: 12, borderRadius: 14, marginTop: 6 }}>
          <Text style={{ color: '#fff', fontWeight: '800', fontSize: 15 }}>Pular para o próximo</Text>
        </Pressable>
      </View>
    );
  }
}

// Used by expo-router as the root error screen.
export function RootErrorScreen({ error, retry }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: C.bg }} contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 28, gap: 14 }}>
      <Text style={{ fontSize: 60 }}>🦆</Text>
      <Text style={{ fontSize: 22, fontWeight: '800', color: C.navy, textAlign: 'center' }}>Oups ! Algo deu errado</Text>
      <Text style={{ fontSize: 15, color: C.text, textAlign: 'center' }}>Seu progresso está salvo. Toque abaixo para voltar.</Text>
      <Text selectable style={{ fontSize: 12, color: C.soft, textAlign: 'center' }}>{String(error?.message || error).slice(0, 300)}</Text>
      <Pressable onPress={retry} style={{ backgroundColor: C.red, paddingHorizontal: 26, paddingVertical: 14, borderRadius: 16, marginTop: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Tentar de novo</Text>
      </Pressable>
    </ScrollView>
  );
}
