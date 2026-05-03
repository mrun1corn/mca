import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatAmount } from '../lib/api';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme';

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type YearlyCollectionData = {
  year: number;
  total: number;
  monthlyTotals: number[];
  users: Array<{
    userId: string;
    name: string;
    monthly: number[];
    total: number;
  }>;
};

export default function YearlyCollection() {
  const { colors } = useTheme();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery<YearlyCollectionData>({
    queryKey: ['yearly-collection', selectedYear],
    queryFn: async () => (await api.get('/reports/yearly-collection', { params: { year: selectedYear } })).data,
  });

  const yearOptions = [currentYear, currentYear - 1];

  return (
    <Screen scroll>
      <ThemeText variant="title" style={styles.header}>Yearly Collection</ThemeText>
      <ThemeText tone="dim" style={styles.description}>
        Pick a year to see a breakdown of member deposits and monthly totals.
      </ThemeText>

      <View style={styles.yearSelector}>
        {yearOptions.map(year => (
          <Pressable
            key={year}
            onPress={() => setSelectedYear(year)}
            style={[
              styles.yearButton,
              { borderColor: selectedYear === year ? colors.primary : colors.border },
              selectedYear === year && { backgroundColor: colors.primary + '10' }
            ]}
          >
            <ThemeText style={{ fontWeight: selectedYear === year ? '700' : '400', color: selectedYear === year ? colors.primary : colors.text }}>
              {year}
            </ThemeText>
          </Pressable>
        ))}
      </View>

      {isLoading ? (
        <ThemeText tone="dim" style={{ textAlign: 'center', marginTop: 40 }}>Loading report…</ThemeText>
      ) : isError ? (
        <ThemeText tone="danger" style={{ textAlign: 'center', marginTop: 40 }}>Failed to load collection data.</ThemeText>
      ) : data ? (
        <View style={{ gap: 20 }}>
          <ThemedCard
            title={`${selectedYear} Total Collection`}
            value={formatAmount(data.total)}
            tone="primary"
          />

          <View style={styles.monthlyGrid}>
            <ThemeText variant="subtitle" style={{ marginBottom: 8, fontWeight: '600' }}>Monthly Summary</ThemeText>
            <View style={styles.gridRow}>
              {MONTH_LABELS.map((month, i) => (
                <View key={month} style={styles.gridItem}>
                  <ThemeText variant="small" tone="dim">{month}</ThemeText>
                  <ThemeText style={{ fontWeight: '600' }}>{formatAmount(data.monthlyTotals[i] || 0)}</ThemeText>
                </View>
              ))}
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <ThemeText variant="subtitle" style={{ fontWeight: '600' }}>Member Breakdown</ThemeText>
            {data.users.map(user => (
              <ThemedCard
                key={user.userId}
                onPress={() => setExpandedUserId(expandedUserId === user.userId ? null : user.userId)}
                style={{ padding: 12 }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <View>
                    <ThemeText style={{ fontWeight: '600' }}>{user.name}</ThemeText>
                    <ThemeText tone="dim">{formatAmount(user.total)} this year</ThemeText>
                  </View>
                  <Ionicons 
                    name={expandedUserId === user.userId ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={colors.textDim} 
                  />
                </View>
                {expandedUserId === user.userId && (
                  <View style={styles.detailGrid}>
                    {MONTH_LABELS.map((month, i) => (
                      <View key={month} style={styles.detailItem}>
                        <ThemeText variant="small" tone="dim">{month}</ThemeText>
                        <ThemeText style={{ fontSize: 13 }}>{user.monthly[i] ? formatAmount(user.monthly[i]) : '—'}</ThemeText>
                      </View>
                    ))}
                  </View>
                )}
              </ThemedCard>
            ))}
          </View>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: '700',
    marginBottom: 4,
  },
  description: {
    marginBottom: 20,
  },
  yearSelector: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  yearButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 99,
    borderWidth: 1,
  },
  monthlyGrid: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  gridRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
  },
  gridItem: {
    flexBasis: '33.33%',
  },
  detailGrid: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 10,
  },
  detailItem: {
    flexBasis: '25%',
  }
});
