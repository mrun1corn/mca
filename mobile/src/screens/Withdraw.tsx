import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';
import UserSelect from '../components/UserSelect';

export default function Withdraw() {
  const { colors } = useTheme();
  const users = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [takerId, setTakerId] = useState('');
  const [takerName, setTakerName] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('3');
  const [rate, setRate] = useState('2');
  const [exclude, setExclude] = useState<string[]>([]);
  const mutate = useMutation({
    mutationFn: () => api.post('/withdraw', {
      takerId,
      date: new Date().toISOString().slice(0,10),
      amount: Number(amount),
      due: { useDefaultDate: true, defaultDate: new Date().toISOString(), startDate: null, endDate: null, months: Number(months), monthlyRatePct: Number(rate) },
      penalty: { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 },
      excludeMemberIds: exclude,
    }),
  });
  const toggleExclude = (id: string) => setExclude(arr => (arr.includes(id) ? arr.filter(x => x !== id) : [...arr, id]));
  useEffect(() => { if (!takerId && users.data?.[0]) { setTakerId(users.data[0].id); setTakerName(users.data[0].name); } }, [users.data]);
  return (
    <View style={s.container}>
      <Text style={s.title}>Withdraw</Text>
      <UserSelect value={takerId} onChange={(id, u) => { setTakerId(id); setTakerName(u?.name || ''); }} />
      {!!takerName && <Text style={[s.helper,{color:colors.textDim}]}>Selected: {takerName}</Text>}
      <Text style={[s.label,{color:colors.textDim}]}>Amount (BDT)</Text>
      <TextInput style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]} placeholderTextColor={colors.textDim} value={amount} onChangeText={setAmount} keyboardType='numeric' />
      <Text style={[s.label,{color:colors.textDim}]}>Months</Text>
      <TextInput style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]} placeholderTextColor={colors.textDim} value={months} onChangeText={setMonths} keyboardType='numeric' />
      <Text style={[s.label,{color:colors.textDim}]}>Monthly Rate %</Text>
      <TextInput style={[s.input,{color:colors.text,borderColor:colors.border,backgroundColor:'#00000000'}]} placeholderTextColor={colors.textDim} value={rate} onChangeText={setRate} keyboardType='numeric' />
      <Text style={[s.section,{color:colors.text}]}>Exclude From Deduction</Text>
      <FlatList
        data={(users.data||[])}
        keyExtractor={(u:any) => String(u.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item: u }: any) => (
          <TouchableOpacity style={[s.chip, exclude.includes(u.id) ? s.chipActive : null]} onPress={() => toggleExclude(u.id)}>
            <Text style={exclude.includes(u.id) ? s.chipTextActive : s.chipText}>{u.name}</Text>
          </TouchableOpacity>
        )}
      />
      {/* Previews removed to match web; chips control exclusions only */}
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
  section: { fontWeight: '600', marginTop: 8 },
  rowSmall: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  smallCell: { flex: 1, fontSize: 13, color: '#334155' },
  smallCellRight: { flex: 1, fontSize: 13, textAlign: 'right', color: '#334155' },
  chip: { paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16, borderWidth: 1, borderColor: '#cbd5e1', marginRight: 8 },
  chipActive: { backgroundColor: '#dbeafe', borderColor: '#93c5fd' },
  chipText: { color: '#334155' },
  chipTextActive: { color: '#1d4ed8', fontWeight: '600' },
});
