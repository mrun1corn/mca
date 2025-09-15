import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import UserSelect from '../components/UserSelect';
import { useTheme } from '../theme';

export default function Deposit() {
  const { colors } = useTheme();
  const qc = useQueryClient();
  const users = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'simple' | 'pay_due'>('simple');
  const dues = useQuery({
    queryKey: ['dues', userId],
    queryFn: async () => (await api.get(`/users/${userId}/dues`)).data,
    enabled: !!userId,
  });
  const [note, setNote] = useState('');
  const [includePenalty, setIncludePenalty] = useState(false);
  const [penaltyPct, setPenaltyPct] = useState('1');
  const [graceDays, setGraceDays] = useState('3');
  const mutate = useMutation({
    mutationFn: () => api.post('/deposit', {
      userId,
      mode,
      amount: Number(amount),
      date: new Date().toISOString().slice(0,10),
      note: note || undefined,
      includePenalty: mode === 'pay_due' ? includePenalty : undefined,
      penaltyPctPerMonth: mode === 'pay_due' ? Number(penaltyPct) : undefined,
      graceDays: mode === 'pay_due' ? Number(graceDays) : undefined,
    }),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['home'] }); setAmount(''); },
  });
  useEffect(() => { if (!userId && users.data?.[0]) { setUserId(users.data[0].id); setUserName(users.data[0].name); } }, [users.data]);
  return (
    <View style={s.container}>
      <Text style={s.title}>Deposit</Text>
      <UserSelect value={userId} onChange={(id, u) => { setUserId(id); setUserName(u?.name || ''); }} />
      {!!userName && <Text style={[s.helper,{color:colors.textDim}]}>Selected: {userName}</Text>}
      <Text style={[s.label,{color:colors.textDim}]}>Amount (BDT)</Text>
      <TextInput
        style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]}
        placeholderTextColor={colors.textDim}
        value={amount}
        onChangeText={setAmount}
        keyboardType='numeric'
      />
      {dues.data && dues.data.length > 0 && (
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title='Simple' onPress={() => setMode('simple')} />
          <Button title='Pay Due' onPress={() => setMode('pay_due')} />
        </View>
      )}
      <Text style={[s.label,{color:colors.textDim}]}>Note (optional)</Text>
      <TextInput
        style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]}
        placeholderTextColor={colors.textDim}
        value={note}
        onChangeText={setNote}
        placeholder='Deposit note'
      />
      {mode === 'pay_due' && (
        <View>
          <Text style={[s.section,{color:colors.text}]}>Penalty Options</Text>
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 8 }}>
            <Button title={includePenalty ? 'Penalty: On' : 'Penalty: Off'} onPress={() => setIncludePenalty(v => !v)} />
          </View>
          <Text style={[s.label,{color:colors.textDim}]}>Penalty % per month</Text>
          <TextInput
            style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]}
            placeholderTextColor={colors.textDim}
            value={penaltyPct}
            onChangeText={setPenaltyPct}
            keyboardType='numeric'
          />
          <Text style={[s.label,{color:colors.textDim}]}>Grace days</Text>
          <TextInput
            style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]}
            placeholderTextColor={colors.textDim}
            value={graceDays}
            onChangeText={setGraceDays}
            keyboardType='numeric'
          />
          <Text style={[s.meta,{color:colors.textDim}]}>If Penalty is On and a due is past its due date plus grace days, a penalty is applied on the installment total.</Text>
        </View>
      )}
      <Button title='Submit' onPress={() => mutate.mutate()} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 10 },
  title: { fontSize: 18, fontWeight: '600' },
  label: { color: '#475569' },
  helper: { color: '#64748b', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 12 },
});
