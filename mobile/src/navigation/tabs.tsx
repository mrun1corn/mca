import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Home';
import People from '../screens/People';
import Deposit from '../screens/Deposit';
import Withdraw from '../screens/Withdraw';
import ExportCsv from '../screens/ExportCsv';
import Setup from '../screens/Setup';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import { useTheme } from '../theme';

const Tab = createBottomTabNavigator();

function Loading() {
  return (
    <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
      <ThemeText tone="dim">Loading your workspace…</ThemeText>
    </Screen>
  );
}

export default function MainTabs() {
  const { colors } = useTheme();
  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
  if (me.isLoading) return <Loading />;
  const role = me.data?.role as 'admin' | 'accountant' | 'user' | undefined;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: { fontSize: 12, marginBottom: 4 },
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingTop: 4,
          height: 60,
        },
        headerStyle: { backgroundColor: colors.card },
        headerTitleStyle: { color: colors.text },
        headerTintColor: colors.primary,
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, string> = {
            Home: 'home',
            People: 'people',
            Deposit: 'cash-outline',
            Withdraw: 'card-outline',
            Export: 'download-outline',
            Settings: 'settings-outline',
          };
          const name = map[route.name] || 'ellipse-outline';
          return <Ionicons name={name as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {role === 'admin' && <Tab.Screen name="People" component={People} />}
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Deposit" component={Deposit} />}
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Withdraw" component={Withdraw} />}
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Export" component={ExportCsv} />}
      <Tab.Screen name="Settings" component={Setup} />
    </Tab.Navigator>
  );
}
