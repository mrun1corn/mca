import React, { useMemo } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatAmount } from '../lib/api';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

type MemberSummary = {
  userId: string;
  name: string;
  balance: number;
  totalDeposits: number;
  totalWithdraws: number;
};

type HomeResponse = {
  cards: MemberSummary[];
};

export default function Balances() {
  const { data, isLoading, isError, refetch } = useQuery<HomeResponse>({
    queryKey: ['home'],
    queryFn: async () => (await api.get('/home')).data,
  });

  const rows = data?.cards ?? [];
  const totals = useMemo(() => {
    return rows.reduce(
      (acc, row) => ({
        deposits: acc.deposits + (row.totalDeposits || 0),
        withdraws: acc.withdraws + (row.totalWithdraws || 0),
        balance: acc.balance + (row.balance || 0),
      }),
      { deposits: 0, withdraws: 0, balance: 0 }
    );
  }, [rows]);

  if (isLoading) {
    return (
      <Screen style={styles.center}>
        <ThemeText tone="dim">Loading balances…</ThemeText>
      </Screen>
    );
  }

  if (isError) {
    return (
      <Screen style={styles.center}>
        <ThemeText tone="danger">Failed to load balances.</ThemeText>
        <View style={{ marginTop: 12 }}>
          <Ionicons name="refresh-circle" size={40} color="#2563eb" onPress={() => refetch()} />
        </View>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <ThemeText variant="title" style={styles.header}>Member Balances</ThemeText>
      <ThemeText tone="dim" style={styles.description}>
        See what each member has contributed and withdrawn from the circle.
      </ThemeText>

      <View style={styles.summaryContainer}>
        <ThemedCard
          title="Total Collected"
          value={formatAmount(totals.deposits)}
          tone="primary"
          style={styles.summaryCard}
        />
        <ThemedCard
          title="Total Withdrawn"
          value={formatAmount(totals.withdraws)}
          tone="danger"
          style={styles.summaryCard}
        />
        <ThemedCard
          title="Available Cash"
          value={formatAmount(totals.balance)}
          tone="success"
          style={styles.summaryCard}
        />
      </View>

      <View style={styles.listHeader}>
        <ThemeText style={styles.colMember}>Member</ThemeText>
        <ThemeText style={styles.colAmount}>Deposited</ThemeText>
        <ThemeText style={styles.colAmount}>Balance</ThemeText>
      </View>

      {rows.map((item) => (
        <View key={item.userId} style={styles.row}>
          <View style={styles.colMember}>
            <ThemeText style={{ fontWeight: '600' }}>{item.name}</ThemeText>
            <ThemeText variant="small" tone="dim">Deducted: {formatAmount(item.totalWithdraws)}</ThemeText>
          </View>
          <ThemeText style={styles.colAmount}>{formatAmount(item.totalDeposits)}</ThemeText>
          <ThemeText style={[styles.colAmount, styles.balanceText]}>{formatAmount(item.balance)}</ThemeText>
        </View>
      ))}

      <View style={styles.footer}>
        <ThemeText style={styles.colMember}>Total</ThemeText>
        <ThemeText style={styles.colAmount}>{formatAmount(totals.deposits)}</ThemeText>
        <ThemeText style={[styles.colAmount, { fontWeight: '700' }]}>{formatAmount(totals.balance)}</ThemeText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    marginBottom: 24,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  summaryCard: {
    flexBasis: '48%',
  },
  listHeader: {
    flexDirection: 'row',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    marginTop: 8,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
  },
  colMember: {
    flex: 2,
  },
  colAmount: {
    flex: 1,
    textAlign: 'right',
  },
  balanceText: {
    fontWeight: '700',
    color: '#059669',
  },
});
