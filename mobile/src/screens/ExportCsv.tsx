import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Linking } from 'react-native';
import { api } from '../lib/api';
import UserSelect from '../components/UserSelect';

export default function ExportCsv() {
  const base = (api.defaults.baseURL || '').replace(/\/$/, '');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const qs = new URLSearchParams();
  if (from) qs.set('from', from);
  if (to) qs.set('to', to);
  if (userId) qs.set('userId', userId);
  const q = qs.toString();
  return (
    <View style={s.container}>
      <Text style={s.title}>Export CSV</Text>
      <TextInput placeholder='From (YYYY-MM-DD)' value={from} onChangeText={setFrom} style={s.input} />
      <TextInput placeholder='To (YYYY-MM-DD)' value={to} onChangeText={setTo} style={s.input} />
      <UserSelect value={userId} onChange={(id, u) => { setUserId(id); setUserName(u?.name || ''); }} />
      {!!userName && <Text style={s.meta}>User: {userName}</Text>}
      <Button title='Download Summary' onPress={() => Linking.openURL(`${base}/export/summary.csv${q ? '?' + q : ''}`)} />
      <Button title='Download Ledger' onPress={() => Linking.openURL(`${base}/export/ledger.csv${q ? '?' + q : ''}`)} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
});
