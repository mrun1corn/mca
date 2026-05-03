import React, { useMemo, useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, View, RefreshControl, Modal, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatAmount } from '../lib/api';
import MemberDrawer from '../components/MemberDrawer';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import { useTheme } from '../theme';
import ThemedCard from '../components/ui/ThemedCard';
import ThemeButton from '../components/ui/ThemeButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { APP_NAME } from '../lib/config';

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
  const [showTotalsModal, setShowTotalsModal] = useState(false);
  const role = me.data?.role as Role;
  const myId = me.data?.id as string | undefined;

  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    home.refetch().finally(() => setRefreshing(false));
  }, [home]);

  const dues = useQuery({
    queryKey: ['dues', myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: role === 'user' && !!myId,
  });

  const txs = useQuery({
    queryKey: ['txs', myId, 10],
    queryFn: async () => (await api.get('/transactions', { params: { limit: 10 } })).data?.rows ?? [],
    enabled: role === 'user' && !!myId,
  });

  const currentYear = new Date().getFullYear();
  const yearlyCollection = useQuery({
    queryKey: ['yearly-collection', currentYear],
    queryFn: async () => (await api.get('/reports/yearly-collection', { params: { year: currentYear } })).data,
    enabled: role === 'admin' || role === 'accountant',
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

  const adminActions = useMemo(() => {
    const common = [
      { title: 'Record deposit', icon: 'cash-outline', screen: 'Deposit' },
      { title: 'New withdrawal', icon: 'card-outline', screen: 'Withdraw' },
      { title: 'Export CSV', icon: 'download-outline', screen: 'Export' },
    ];
    if (role === 'admin') {
      return [...common, { title: 'Manage people', icon: 'people-outline', screen: 'People' }];
    }
    return common;
  }, [role]);

  if (!home.data || !me.data) {
    return (
      <Screen style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ThemeText tone="dim">Loading dashboard…</ThemeText>
      </Screen>
    );
  }

  const data = home.data;
  const investmentInfo = data?.investments || { activeCount: 0, principal: 0, expectedInterest: 0 };

  const canManageMembers = role === 'admin';
  const canViewMemberDetails = role === 'admin' || role === 'accountant';

  if (role === 'user') {
    const currentBalance = data.remainingBalance || 0;
    const totalDeposits = data.totalDeposits || 0;

    return (
      <Screen scroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} tintColor={colors.primary} />}>
        <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 12 }}>
          Hello {me.data.name}
        </ThemeText>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <ThemedCard
            title="Current balance"
            value={formatAmount(currentBalance)}
            icon={<Ionicons name="wallet" size={22} color="#fff" />}
            tone="primary"
            style={{ flexBasis: '48%' }}
          />
          <ThemedCard
            title="Total deposits"
            value={formatAmount(totalDeposits)}
            icon={<Ionicons name="trending-up" size={20} color="#15803d" />}
            tone="success"
            style={{ flexBasis: '48%' }}
          />
          {nextEmi > 0 ? (
            <ThemedCard
              title="Next payment"
              value={formatAmount(nextEmi)}
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
                    {formatAmount(t.amount)}
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
                  <ThemeText tone="dim">Balance: {formatAmount(item.balance)}</ThemeText>
                </View>
                {item.userId === myId ? (
                  <ThemeButton
                    variant="ghost"
                    size="sm"
                    title="Details"
                    onPress={() => setDrawerUserId(String(item.userId))}
                  />
                ) : null}
              </View>
            )}
          />
        </ThemedCard>

        <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />
      </Screen>
    );
  }

  const metrics: { title: string; value: string; icon: JSX.Element; tone: 'default' | 'surface' | 'success' | 'danger' | 'primary'; onPress?: () => void }[] = [
    {
      title: 'Members',
      value: String(data.membersCount),
      icon: <Ionicons name="people" size={20} color="#2563eb" />,
      tone: 'surface' as const,
    },
    {
      title: 'Total balance',
      value: formatAmount(data.groupBalance),
      icon: <Ionicons name="wallet" size={22} color="#2563eb" />,
      tone: 'surface' as const,
      onPress: () => navigation.navigate('Balances'),
    },
    {
      title: 'Open dues',
      value: String(data.arrearsCount),
      icon: <Ionicons name="alert-circle" size={20} color="#b91c1c" />,
      tone: 'danger' as const,
    },
  ];
  metrics.push({
    title: 'Invested principal',
    value: formatAmount(investmentInfo.principal),
    icon: <Ionicons name="briefcase" size={20} color="#2563eb" />,
    tone: 'surface' as const,
  });
  metrics.push({
    title: 'Projected interest',
    value: formatAmount(investmentInfo.expectedInterest),
    icon: <Ionicons name="trending-up" size={20} color="#16a34a" />,
    tone: 'success' as const,
  });

  if (yearlyCollection.data) {
    metrics.push({
      title: 'Collected this year',
      value: formatAmount(yearlyCollection.data.total),
      icon: <Ionicons name="bar-chart" size={20} color="#0f766e" />,
      tone: 'primary' as const,
      onPress: () => navigation.navigate('YearlyCollection'),
    });
  }

  return (
    <Screen scroll refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} tintColor={colors.primary} />}>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 12 }}>
        {APP_NAME} overview
      </ThemeText>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
        {metrics.map((metric) => (
          <ThemedCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            tone={metric.tone}
            onPress={metric.onPress}
            style={{ flexBasis: '48%', minHeight: 100 }}
            accessibilityLabel={`${metric.title}: ${metric.value}`}
          />
        ))}
        <ThemedCard
          title="Available balance"
          value={formatAmount(data.remainingBalance)}
          icon={<Ionicons name="cash" size={22} color="#15803d" />}
          tone="success"
          onPress={() => setShowTotalsModal(true)}
          style={{ flexBasis: '48%', minHeight: 100 }}
          accessibilityLabel={`Available balance: ${formatAmount(data.remainingBalance)}. Tap for financial breakdown.`}
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
            subtitle={`Last month: ${formatAmount(card.lastMonth)}`}
            value={`Balance ${formatAmount(card.balance)}`}
            tone="surface"
            onPress={canViewMemberDetails ? () => setDrawerUserId(String(card.userId)) : undefined}
            style={{ flexBasis: '48%' }}
          />
        ))}
      </View>

      <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />

      <Modal visible={showTotalsModal} animationType="slide" transparent={true} onRequestClose={() => setShowTotalsModal(false)}>
        <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' }} onPress={() => setShowTotalsModal(false)}>
          <Pressable style={{ backgroundColor: colors.surface, padding: 24, borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <ThemeText variant="title">Financial Breakdown</ThemeText>
              <Pressable onPress={() => setShowTotalsModal(false)}>
                <Ionicons name="close" size={24} color={colors.textDim} />
              </Pressable>
            </View>
            <View style={{ gap: 16 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeText>Total Deposits</ThemeText>
                <ThemeText tone="success">{formatAmount(data.totalDeposits)}</ThemeText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeText>Total Withdrawals</ThemeText>
                <ThemeText tone="danger">-{formatAmount(data.totalWithdraws)}</ThemeText>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeText>Active Investments</ThemeText>
                <ThemeText tone="primary">{formatAmount(investmentInfo.principal)}</ThemeText>
              </View>
              <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 8 }} />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ThemeText style={{ fontWeight: '700' }}>Calculated Balance</ThemeText>
                <ThemeText style={{ fontWeight: '700' }}>{formatAmount(data.groupBalance)}</ThemeText>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
