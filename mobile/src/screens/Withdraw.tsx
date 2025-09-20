import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeText from '../components/ui/ThemeText';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemedCard from '../components/ui/ThemedCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';
import UserSelect from '../components/UserSelect';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  });

  const toggleExclude = (id: string) =>
    setExclude((arr) => (arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]));

  useEffect(() => {
    if (!takerId && users.data?.[0]) {
      setTakerId(users.data[0].id);
      setTakerName(users.data[0].name);
    }
  }, [users.data, takerId]);

  useEffect(() => {
    if (takerId) {
      setExclude((prev) => prev.filter((id) => id !== takerId));
    }
  }, [takerId]);

  const eligible = (users.data || []).filter((u: any) => u.id !== takerId);

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        Record a withdrawal
      </ThemeText>

      <ThemedCard tone="surface">
        <ThemeText variant="label">Recipient</ThemeText>
        <UserSelect value={takerId} onChange={(id, u) => { setTakerId(id); setTakerName(u?.name || ''); }} />
        {takerName ? <ThemeText tone="dim" style={{ marginTop: 6 }}>Selected: {takerName}</ThemeText> : null}

        <ThemeText variant="label" style={{ marginTop: 20 }}>Amount (BDT)</ThemeText>
        <ThemeInput value={amount} onChangeText={setAmount} keyboardType="numeric" placeholder="0.00" />

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

        <ThemeText variant="subtitle" style={{ fontWeight: '600', marginTop: 20 }}>
          Exclude members from split
        </ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Every active member shares the deduction evenly. Tap to exclude someone from this cash-out.
        </ThemeText>
        <FlatList
          horizontal
          data={eligible}
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
          title={mutate.isPending ? 'Saving…' : 'Save withdrawal'}
          onPress={() => mutate.mutate()}
          disabled={!takerId || !amount || mutate.isPending}
          style={{ marginTop: 24 }}
          leftIcon={<Ionicons name="save-outline" size={18} color={colors.onPrimary} />}
        />
      </ThemedCard>
    </Screen>
  );
}
