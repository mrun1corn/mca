import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import RootNavigator from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme';
import { StatusBar, View } from 'react-native';
import { queryClient, asyncStoragePersister } from './lib/queryClient';
import { ToastProvider } from './components/ui/Toast';

function Shell() {
  const { scheme, colors } = useTheme();
  const baseTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const navigationTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: colors.bg,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <StatusBar 
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.card}
      />
      <NavigationContainer theme={navigationTheme}>
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister: asyncStoragePersister,
          // Only non-sensitive queries reach disk. Member directories, balances
          // and transactions stay in memory so a stolen or backed-up device
          // cannot yield the community's contact list or financial records.
          dehydrateOptions: {
            shouldDehydrateQuery: (query) =>
              ['public-settings', 'settings', 'me', 'auth-check', 'currency'].includes(String(query.queryKey[0])),
          },
        }}
      >
        <ThemeProvider>
          <ToastProvider>
            <Shell />
          </ToastProvider>
        </ThemeProvider>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
