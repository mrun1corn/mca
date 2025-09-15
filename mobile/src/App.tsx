import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RootNavigator from './navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme';
import { StatusBar, View, Text, TextInput } from 'react-native';

const qc = new QueryClient();

function Shell() {
  const { scheme, colors } = useTheme();
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={qc}>
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
          <StatusBar barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'} />
          {(() => {
            try {
              (Text as any).defaultProps = (Text as any).defaultProps || {};
              (Text as any).defaultProps.style = [{ color: colors.text }, (Text as any).defaultProps.style].flat().filter(Boolean);
              (TextInput as any).defaultProps = (TextInput as any).defaultProps || {};
              (TextInput as any).defaultProps.placeholderTextColor = colors.textDim;
              (TextInput as any).defaultProps.style = [{ color: colors.text }, (TextInput as any).defaultProps.style].flat().filter(Boolean);
            } catch {}
            return null;
          })()}
          <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <RootNavigator />
          </NavigationContainer>
        </View>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
