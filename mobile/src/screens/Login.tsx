import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { api, saveTokens } from '../lib/api';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { identifier, password });
      const tokens = res.data?.tokens;
      if (tokens?.access && tokens?.refresh) {
        await saveTokens(tokens);
        navigation.replace('Main');
      } else {
        Alert.alert('Login', 'No tokens returned');
      }
    } catch (e: any) {
      Alert.alert('Login failed', e?.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>Sign in</Text>
      <TextInput placeholder="Email or Username" autoCapitalize='none' style={s.input} value={identifier} onChangeText={setIdentifier} />
      <TextInput placeholder="Password" secureTextEntry style={s.input} value={password} onChangeText={setPassword} />
      <Button title={loading ? 'Signing in...' : 'Sign in'} onPress={onSubmit} disabled={loading} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});
