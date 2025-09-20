import React, { useState } from 'react';
import { Alert } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { api, saveTokens } from '../lib/api';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemeButton from '../components/ui/ThemeButton';
import ThemedCard from '../components/ui/ThemedCard';
import { useTheme } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({ navigation }: Props) {
  const { colors } = useTheme();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { identifier, password });
      const tokens = res.data?.tokens;
      if (tokens?.access && tokens?.refresh) {
        await saveTokens(tokens);
        navigation.replace('Main');
      } else {
        Alert.alert('Sign in', 'No tokens returned. Please try again.');
      }
    } catch (e: any) {
      const message = e?.response?.data?.error || 'Unable to sign in. Check your details and connection.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll style={{ justifyContent: 'center' }}>
      <ThemedCard tone="surface" style={{ marginHorizontal: 4 }}>
        <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 6 }}>
          Welcome back
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 16 }}>
          Sign in with your email or username to access the community savings workspace.
        </ThemeText>
        <ThemeText variant="label">Email or username</ThemeText>
        <ThemeInput
          placeholder="e.g. robin@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={identifier}
          onChangeText={setIdentifier}
          style={{ marginBottom: 12 }}
        />
        <ThemeText variant="label">Password</ThemeText>
        <ThemeInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {error ? (
          <ThemeText tone="danger" style={{ marginTop: 12 }}>
            {error}
          </ThemeText>
        ) : (
          <ThemeText tone="muted" style={{ marginTop: 12 }}>
            Tip: use the Change password option once you are signed in.
          </ThemeText>
        )}
        <ThemeButton
          title={loading ? 'Signing in…' : 'Sign in'}
          onPress={onSubmit}
          disabled={loading}
          style={{ marginTop: 18, backgroundColor: colors.primary }}
        />
      </ThemedCard>
    </Screen>
  );
}
