import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import { useTheme } from '../theme';
import { api } from '../lib/api';

export default function Setup() {
  const [password, setPassword] = useState('');
  const { mode, setMode } = useTheme();
  const update = async () => {
    try {
      const me = await api.get('/me');
      await api.patch(`/users/${me.data.id}`, { password });
      setPassword('');
      Alert.alert('Success', 'Password updated');
    } catch {
      Alert.alert('Error', 'Update failed');
    }
  };
  return (
    <View style={s.container}>
      <Text style={s.title}>Settings</Text>
      <Text style={s.label}>Theme</Text>
      <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
        <Button title={`Light ${mode==='light'?'✓':''}`} onPress={() => setMode('light')} />
        <Button title={`Dark ${mode==='dark'?'✓':''}`} onPress={() => setMode('dark')} />
        <Button title={`System ${mode==='system'?'✓':''}`} onPress={() => setMode('system')} />
      </View>
      <Text>Password</Text>
      <ThemeInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title='Update' onPress={update} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  label: { color: '#475569' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});
