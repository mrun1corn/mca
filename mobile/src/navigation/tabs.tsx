import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import People from '../screens/People';
import Deposit from '../screens/Deposit';
import Withdraw from '../screens/Withdraw';
import ExportCsv from '../screens/ExportCsv';
import Setup from '../screens/Setup';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

function Loading() {
  return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text>Loading...</Text></View>;
}

export default function MainTabs() {
  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
  if (me.isLoading) return <Loading />;
  const role = me.data?.role as 'admin' | 'accountant' | 'user' | undefined;
  return (
    <Tab.Navigator screenOptions={{ headerShown: true }}>
      <Tab.Screen name="Home" component={Home} />
      {(role === 'admin') && <Tab.Screen name="People" component={People} />}
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Deposit" component={Deposit} />}
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Withdraw" component={Withdraw} />}      
      {(role === 'admin' || role === 'accountant') && <Tab.Screen name="Export" component={ExportCsv} />}
      <Tab.Screen name="Settings" component={Setup} />
    </Tab.Navigator>
  );
}
