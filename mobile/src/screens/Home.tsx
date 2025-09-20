import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatBDT } from '../lib/api';
import MemberDrawer from '../components/MemberDrawer';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import { useTheme } from '../theme';
import ThemedCard from '../components/ui/ThemedCard';
import ThemeButton from '../components/ui/ThemeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Role = 'admin' | 'accountant' | 'user' | undefined;

type TransactionRow = { _id: string; occurredAt: string; type: string; amount: number; note?: string };

type CardRow = {
  userId: string;
  name: string;
  balance: number;
  lastMonth: number;
};

export default function Home() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();
  const home = useQuery({ queryKey: ['home'], queryFn: async () => (await api.get('/home')).data });
  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);
  const role = me.data?.role as Role;
  const myId = me.data?.id as string | undefined;

  const dues = useQuery({
    queryKey: ['dues', myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: role === 'user' && !!myId,
  });

  const txs = useQuery({
    queryKey: ['txs', myId, 10],
    queryFn: async () => (await api.get('/transactions', { params: { limit: 10 } })).data,
    enabled: role === 'user' && !!myId,
  });

  const nextEmi = useMemo(() => {
    if (role !== 'user' || !dues.data) return 0;
    let best: { date: number; due: number } | null = null;
    for (const d of dues.data as any[]) {
      for (const it of d.schedule as any[]) {
        if (it.status === 'paid') continue;
        const date = new Date(it.dueDate).getTime();
        const remaining = (it.totalDue as number) - (it.paid || 0);
        const due = Math.max(0, remaining);
        if (!best || date < best.date) best = { date, due };
        break;
      }
    }
    return best?.due || 0;
  }, [role, dues.data]);

  if (!home.data || !me.data) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ThemeText tone="dim">Loading dashboard…</ThemeText>
      </Screen>
    );
  }

  const data = home.data;

  if (role === 'user') {
    const currentBalance = data.remainingBalance || 0;
    const totalDeposits = data.totalDeposits || 0;

    return (
      <Screen scroll>
        <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 12 }}>
          Hello {me.data.name}
        </ThemeText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ThemedCard
            title="Current balance"
            value={formatBDT(currentBalance)}
            icon={<Ionicons name="wallet" size={22} color="#fff" />}
            tone="primary"
            style={{ flexBasis: '48%' }}
          />
          <ThemedCard
            title="Total deposits"
            value={formatBDT(totalDeposits)}
            icon={<Ionicons name="trending-up" size={20} color="#15803d" />}
            tone="success"
            style={{ flexBasis: '48%' }}
          />
          {nextEmi > 0 ? (
            <ThemedCard
              title="Next payment"
              value={formatBDT(nextEmi)}
              icon={<Ionicons name="calendar" size={20} color="#b45309" />}
              tone="surface"
              style={{ flexBasis: '48%' }}
            />
          ) : null}
        </View>

        <ThemedCard title="Recent activity" tone="surface" style={{ marginTop: 20 }}>
          {(txs.data as TransactionRow[] | undefined)?.length ? (
            <View style={{ gap: 10 }}>
              {(txs.data as TransactionRow[]).map((t) => (
                <View key={t._id} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <ThemeText tone="dim">{new Date(t.occurredAt).toISOString().slice(0, 10)}</ThemeText>
                  <ThemeText tone={t.type === 'deposit' ? 'success' : 'danger'}>
                    {formatBDT(t.amount)}
                  </ThemeText>
                </View>
              ))}
            </View>
          ) : (
            <ThemeText tone="dim">No recent transactions yet.</ThemeText>
          )}
        </ThemedCard>

        <ThemedCard title="Group members" tone="surface" style={{ marginTop: 20 }}>
          <FlatList
            data={data.cards as CardRow[]}
            contentContainerStyle={{ gap: 12 }}
            keyExtractor={(item) => String(item.userId)}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                  <ThemeText>{item.name}</ThemeText>
                  <ThemeText tone="dim">Balance: {formatBDT(item.balance)}</ThemeText>
                </View>
                <ThemeButton
                  variant="ghost"
                  size="sm"
                  title="Details"
                  onPress={() => setDrawerUserId(String(item.userId))}
                />
              </View>
            )}
          />
        </ThemedCard>

        <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />
      </Screen>
    );
  }

  const adminActions = [
    { title: 'Record deposit', icon: 'cash-outline', screen: 'Deposit' },
    { title: 'New withdrawal', icon: 'card-outline', screen: 'Withdraw' },
    { title: 'Export CSV', icon: 'download-outline', screen: 'Export' },
    { title: 'Manage people', icon: 'people-outline', screen: 'People' },
  ];

  const metrics = [
    {
      title: 'Members',
      value: String(data.membersCount),
      icon: <Ionicons name="people" size={20} color="#2563eb" />,
      tone: 'surface' as const,
    },
    {
      title: 'Total balance',
      value: formatBDT(data.groupBalance),
      icon: <Ionicons name="wallet" size={22} color="#2563eb" />,
      tone: 'surface' as const,
    },
    {
      title: 'Open dues',
      value: String(data.arrearsCount),
      icon: <Ionicons name="alert-circle" size={20} color="#b91c1c" />,
      tone: 'danger' as const,
    },
  ];

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 12 }}>
        Community overview
      </ThemeText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {metrics.map((metric) => (
          <ThemedCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            tone={metric.tone}
            style={{ flexBasis: '48%' }}
          />
        ))}
        <ThemedCard
          title="Available balance"
          value={formatBDT(data.remainingBalance)}
          icon={<Ionicons name="cash" size={22} color="#15803d" />}
          tone="success"
          style={{ flexBasis: '48%' }}
        />
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 }}>
        {adminActions.map((action) => (
          <ThemeButton
            key={action.title}
            variant="secondary"
            size="sm"
            title={action.title}
            leftIcon={<Ionicons name={action.icon as any} size={16} color={colors.textDim} />}
            onPress={() => navigation.navigate(action.screen)}
            style={{ flexBasis: '48%' }}
          />
        ))}
      </View>

      <ThemeText variant="subtitle" style={{ fontWeight: '600', marginTop: 24, marginBottom: 8 }}>
        Members
      </ThemeText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {(data.cards as CardRow[]).map((card) => (
          <ThemedCard
            key={card.userId}
            title={card.name}
            subtitle={`Last month: ${formatBDT(card.lastMonth)}`}
            value={`Balance ${formatBDT(card.balance)}`}
            tone="surface"
            onPress={() => setDrawerUserId(String(card.userId))}
            style={{ flexBasis: '48%' }}
          />
        ))}
      </View>

      <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />
    </Screen>
  );
}
