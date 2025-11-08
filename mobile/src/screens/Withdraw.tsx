import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeText from '../components/ui/ThemeText';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemedCard from '../components/ui/ThemedCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';
import UserSelect from '../components/UserSelect';

export default function Withdraw() {
  const { colors } = useTheme();
  const qc = useQueryClient();
  const users = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [mode, setMode] = useState<'member' | 'investment'>('member');
  const [takerId, setTakerId] = useState('');
  const [amount, setAmount] = useState('');
  const [months, setMonths] = useState('3');
  const [rate, setRate] = useState('2');
  const [investmentName, setInvestmentName] = useState('');
  const [investmentStart, setInvestmentStart] = useState(() => new Date().toISOString().slice(0, 10));
  const [investmentMonths, setInvestmentMonths] = useState('6');
  const [investmentRate, setInvestmentRate] = useState('3');
  const [exclude, setExclude] = useState<string[]>([]);

  useEffect(() => {
    if (!takerId && users.data?.[0]) {
      setTakerId(users.data[0].id);
    }
  }, [users.data, takerId]);

  useEffect(() => {
    if (mode === 'member') {
      setExclude((prev) => prev.filter((id) => id !== takerId));
    }
  }, [mode, takerId]);

  const contributable = useMemo(() => {
    if (!users.data) return [];
    if (mode === 'member') return users.data.filter((u: any) => u.id !== takerId);
    return users.data;
  }, [users.data, takerId, mode]);

  const toggleExclude = (id: string) =>
    setExclude((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  const withdrawMutation = useMutation({
    mutationFn: () =>
      api.post('/withdraw', {
        takerId,
        date: new Date().toISOString().slice(0, 10),
        amount: Number(amount),
        due: {
          useDefaultDate: true,
          defaultDate: new Date().toISOString(),
          startDate: null,
          endDate: null,
          months: Number(months),
          monthlyRatePct: Number(rate),
        },
        penalty: { enabled: true, monthlyPenaltyPct: 1.0, graceDays: 3 },
        excludeMemberIds: exclude,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['home'] });
      setAmount('');
    },
  });

  const investmentMutation = useMutation({
    mutationFn: () =>
      api.post('/investments', {
        name: investmentName || 'New investment',
        amount: Number(amount),
        startDate: investmentStart,
        months: Number(investmentMonths),
        monthlyRatePct: Number(investmentRate),
        excludeMemberIds: exclude,
      }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['home'] });
      setAmount('');
      setInvestmentName('');
    },
  });

  const submit = () => {
    if (!amount) return;
    if (mode === 'member') withdrawMutation.mutate();
    else investmentMutation.mutate();
  };

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        {mode === 'member' ? 'Record a withdrawal' : 'Record an investment'}
      </ThemeText>

      <ThemedCard tone="surface">
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <ThemeButton title="Member" variant={mode === 'member' ? 'primary' : 'secondary'} size="sm" onPress={() => setMode('member')} />
          <ThemeButton title="Investment" variant={mode === 'investment' ? 'primary' : 'secondary'} size="sm" onPress={() => setMode('investment')} />
        </View>

        {mode === 'member' ? (
          <>
            <ThemeText variant="label">Recipient</ThemeText>
            <UserSelect value={takerId} onChange={(id) => setTakerId(id)} />
          </>
        ) : (
          <>
            <ThemeText variant="label">Investment name</ThemeText>
            <ThemeInput placeholder="e.g. Govt bond" value={investmentName} onChangeText={setInvestmentName} />
            <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
              <View style={{ flex: 1 }}>
                <ThemeText variant="label">Start date</ThemeText>
                <ThemeInput value={investmentStart} onChangeText={setInvestmentStart} placeholder="YYYY-MM-DD" />
              </View>
              <View style={{ flex: 1 }}>
                <ThemeText variant="label">Months</ThemeText>
                <ThemeInput value={investmentMonths} onChangeText={setInvestmentMonths} keyboardType="numeric" />
              </View>
            </View>
            <ThemeText variant="label" style={{ marginTop: 12 }}>
              Monthly interest %
            </ThemeText>
            <ThemeInput value={investmentRate} onChangeText={setInvestmentRate} keyboardType="numeric" />
          </>
        )}

        <ThemeText variant="label" style={{ marginTop: 20 }}>
          Amount (BDT)
        </ThemeText>
        <ThemeInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" />

        {mode === 'member' && (
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <View style={{ flex: 1 }}>
              <ThemeText variant="label">Months</ThemeText>
              <ThemeInput value={months} onChangeText={setMonths} keyboardType="numeric" />
            </View>
            <View style={{ flex: 1 }}>
              <ThemeText variant="label">Monthly rate %</ThemeText>
              <ThemeInput value={rate} onChangeText={setRate} keyboardType="numeric" />
            </View>
          </View>
        )}

        <ThemeText variant="subtitle" style={{ fontWeight: '600', marginTop: 20 }}>
          Exclude members from split
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Each active member funds the amount evenly. Tap to exclude someone.
        </ThemeText>
        <FlatList
          horizontal
          data={contributable}
          keyExtractor={(u: any) => String(u.id)}
          contentContainerStyle={{ gap: 12 }}
          renderItem={({ item: u }: any) => {
            const isActive = exclude.includes(u.id);
            return (
              <TouchableOpacity
                onPress={() => toggleExclude(u.id)}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: isActive ? colors.primary : colors.border,
                  backgroundColor: isActive ? colors.chipBgActive : colors.chipBg,
                }}
              >
                <ThemeText tone={isActive ? 'primary' : 'default'}>{u.name}</ThemeText>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={<ThemeText tone="dim">No members to exclude.</ThemeText>}
          showsHorizontalScrollIndicator={false}
        />

        <ThemeButton
          title={
            mode === 'member'
              ? withdrawMutation.isPending
                ? 'Saving…'
                : 'Save withdrawal'
              : investmentMutation.isPending
              ? 'Saving…'
              : 'Record investment'
          }
          onPress={submit}
          disabled={!amount || (mode === 'member' && !takerId) || withdrawMutation.isPending || investmentMutation.isPending}
          style={{ marginTop: 24 }}
        />
      </ThemedCard>
    </Screen>
  );
}
