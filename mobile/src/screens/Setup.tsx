import React, { useState } from 'react';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import { useTheme } from '../theme';
import { api } from '../lib/api';
import { Alert, View } from 'react-native';

export default function Setup() {
  const { mode, setMode } = useTheme();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const changePassword = async () => {
    try {
      setLoading(true);
      const me = await api.get('/me');
      await api.patch(`/users/${me.data.id}`, { password });
      setPassword('');
      Alert.alert('Settings', 'Password updated successfully.');
    } catch {
      Alert.alert('Settings', 'Password update failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        Settings
      </ThemeText>

      <ThemedCard tone="surface">
        <ThemeText variant="subtitle" style={{ fontWeight: '600', marginBottom: 12 }}>
          App appearance
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Choose how the app adapts to light or dark mode.
        </ThemeText>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {(['light', 'dark', 'system'] as const).map((opt) => (
            <ThemeButton
              key={opt}
              title={opt.charAt(0).toUpperCase() + opt.slice(1)}
              variant={mode === opt ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setMode(opt)}
            />
          ))}
        </View>
      </ThemedCard>

      <ThemedCard tone="surface" style={{ marginTop: 20 }}>
        <ThemeText variant="subtitle" style={{ fontWeight: '600', marginBottom: 12 }}>
          Change password
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Set a new password for your account.
        </ThemeText>
        <ThemeInput
          secureTextEntry
          placeholder="New password"
          value={password}
          onChangeText={setPassword}
        />
        <ThemeButton
          title={loading ? 'Updating…' : 'Update password'}
          onPress={changePassword}
          disabled={!password || loading}
          style={{ marginTop: 16 }}
        />
      </ThemedCard>
    </Screen>
  );
}
