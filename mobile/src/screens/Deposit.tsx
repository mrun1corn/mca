import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api, formatBDT } from '../lib/api';
import UserSelect from '../components/UserSelect';
import { useTheme } from '../theme';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import ThemeButton from '../components/ui/ThemeButton';
import ThemeInput from '../components/ui/ThemeInput';

function formatAmount(value: number) {
  return formatBDT(value);
}


export default function Deposit() {
  const { colors } = useTheme();
  const qc = useQueryClient();
  const users = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'simple' | 'pay_due'>('simple');
  const [dueId, setDueId] = useState<string | null>(null);
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
    mutationFn: () => {
      const amountValue = Number(amount) || undefined;
      return api.post('/deposit', {
        userId,
        mode,
        dueId: mode === 'pay_due' ? dueId : undefined,
        amount: amountValue,
        amountPoisha: !amountValue && mode === 'pay_due' ? suggested : undefined,
        date: new Date().toISOString().slice(0, 10),
        note: note || undefined,
        includePenalty: mode === 'pay_due' ? includePenalty : undefined,
        penaltyPctPerMonth: mode === 'pay_due' ? Number(penaltyPct) : undefined,
        graceDays: mode === 'pay_due' ? Number(graceDays) : undefined,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['home'] });
      setAmount('');
      setNote('');
    },
  });

  const hasOpenDues = Boolean(dues.data?.length);
  const selectedDue = useMemo(() => dues.data?.find((d: any) => d._id === dueId), [dues.data, dueId]);

  const suggested = useMemo(() => {
    if (mode !== 'pay_due' || !selectedDue) return 0;
    const today = new Date();
    const grace = selectedDue.penaltyRule?.graceDays ?? (Number(graceDays) || 0);
    const pct = selectedDue.penaltyRule?.monthlyPenaltyPct ?? (Number(penaltyPct) || 0);
    for (const item of selectedDue.schedule as any[]) {
      if (item.status === 'paid') continue;
      const base = (item.totalDue || 0) - (item.paid || 0);
      if (base <= 0) continue;
      const dueDate = new Date(item.dueDate);
      const withGrace = new Date(dueDate);
      withGrace.setDate(withGrace.getDate() + grace);
      let total = base;
      if (includePenalty && today > withGrace && selectedDue.penaltyRule?.enabled) {
        total += Math.floor((item.totalDue * pct) / 100);
      }
      return total;
    }
    return 0;
  }, [mode, selectedDue, includePenalty, graceDays, penaltyPct]);

  useEffect(() => {
    if (!userId && users.data?.[0]) {
      setUserId(users.data[0].id);
      setUserName(users.data[0].name);
    }
  }, [users.data, userId]);

  useEffect(() => {
    if (!hasOpenDues) {
      setMode('simple');
      setIncludePenalty(false);
      setDueId(null);
      return;
    }
    if (mode === 'pay_due' && dues.data && !dueId) {
      setDueId(dues.data[0]._id);
    }
  }, [hasOpenDues, mode, dues.data, dueId]);

  useEffect(() => {
    if (mode === 'pay_due' && amount === '' && suggested) {
      setAmount((suggested / 100).toFixed(2));
    }
  }, [mode, suggested, amount]);

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        Record a deposit
      </ThemeText>

      <ThemedCard tone="surface">
        <ThemeText variant="label">Member</ThemeText>
        <UserSelect value={userId} onChange={(id, u) => { setUserId(id); setUserName(u?.name || ''); }} />
        {userName ? <ThemeText tone="dim" style={{ marginTop: 6 }}>Selected: {userName}</ThemeText> : null}

        {hasOpenDues ? (
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
            <ThemeButton
              title="Simple deposit"
              variant={mode === 'simple' ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setMode('simple')}
            />
            <ThemeButton
              title="Pay a due"
              variant={mode === 'pay_due' ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setMode('pay_due')}
            />
          </View>
        ) : (
          <ThemeText tone="muted" style={{ marginTop: 16 }}>
            No open dues for this member. Recording as a simple deposit.
          </ThemeText>
        )}

        {mode === 'pay_due' && hasOpenDues ? (
          <View style={{ marginTop: 20, gap: 12 }}>
            <ThemeText variant="label">Choose a due</ThemeText>
            {dues.data?.map((d: any) => (
              <ThemeButton
                key={d._id}
                title={`Principal ${formatAmount(d.principal)} • ${d.months} months`}
                variant={dueId === d._id ? 'primary' : 'secondary'}
                size="sm"
                onPress={() => setDueId(d._id)}
              />
            ))}
            {suggested ? (
              <ThemeText tone="dim">Suggested installment: {formatAmount(suggested)}</ThemeText>
            ) : null}
          </View>
        ) : null}

        <ThemeText variant="label" style={{ marginTop: 20 }}>Amount (BDT)</ThemeText>
        <ThemeInput
          placeholder="0.00"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <ThemeText variant="label" style={{ marginTop: 16 }}>Note</ThemeText>
        <ThemeInput placeholder="Optional description" value={note} onChangeText={setNote} />

        {mode === 'pay_due' ? (
          <View style={{ marginTop: 20, gap: 12 }}>
            <ThemeText variant="subtitle" style={{ fontWeight: '600' }}>Penalty options</ThemeText>
            <ThemeButton
              title={includePenalty ? 'Penalty: on' : 'Penalty: off'}
              variant={includePenalty ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setIncludePenalty((prev) => !prev)}
            />
            <ThemeText tone="dim">Apply a penalty when the due is past its grace period.</ThemeText>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <ThemeText variant="label">Penalty % per month</ThemeText>
                <ThemeInput value={penaltyPct} onChangeText={setPenaltyPct} keyboardType="numeric" />
              </View>
              <View style={{ flex: 1 }}>
                <ThemeText variant="label">Grace days</ThemeText>
                <ThemeInput value={graceDays} onChangeText={setGraceDays} keyboardType="numeric" />
              </View>
            </View>
          </View>
        ) : null}

        <ThemeButton
          title={mutate.isPending ? 'Saving…' : 'Save deposit'}
          onPress={() => mutate.mutate()}
          disabled={!userId || !amount || mutate.isPending}
          style={{ marginTop: 24, backgroundColor: colors.primary }}
        />
      </ThemedCard>
    </Screen>
  );
}
