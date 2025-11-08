import React, { useState } from 'react';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import { useTheme } from '../theme';
import { api, clearTokens } from '../lib/api';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';

export default function Setup() {
  const { mode, setMode } = useTheme();
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();

  const changePassword = async () => {
    try {
      setLoading(true);
      await api.post('/auth/me/change-password', { currentPassword, newPassword: password });
      setPassword('');
      setCurrentPassword('');
      Alert.alert('Settings', 'Password updated successfully.');
    } catch {
      Alert.alert('Settings', 'Password update failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLogoutLoading(true);
    try {
      await clearTokens();
      queryClient.clear();
      navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
    } finally {
      setLogoutLoading(false);
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
          placeholder="Current password"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          style={{ marginBottom: 12 }}
        />
        <ThemeInput secureTextEntry placeholder="New password" value={password} onChangeText={setPassword} />
        <ThemeButton
          title={loading ? 'Updating…' : 'Update password'}
          onPress={changePassword}
          disabled={!currentPassword || !password || loading}
          style={{ marginTop: 16 }}
        />
      </ThemedCard>

      <ThemedCard tone="surface" style={{ marginTop: 20 }}>
        <ThemeText variant="subtitle" style={{ fontWeight: '600', marginBottom: 12 }}>
          Account
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Sign out of this device. You will need your credentials to log back in.
        </ThemeText>
        <ThemeButton
          title={logoutLoading ? 'Signing out…' : 'Log out'}
          onPress={logout}
          variant="danger"
          disabled={logoutLoading}
        />
      </ThemedCard>
    </Screen>
  );
}
