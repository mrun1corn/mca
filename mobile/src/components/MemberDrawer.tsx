import React, { useMemo } from 'react';
import { Modal, View } from 'react-native';
import { useTheme } from '../theme';
import { useQuery } from '@tanstack/react-query';
import { api, formatBDT } from '../lib/api';
import ThemeText from './ui/ThemeText';
import ThemeButton from './ui/ThemeButton';
import ThemedCard from './ui/ThemedCard';

type TxRow = { _id: string; occurredAt: string; type: string; amount: number };
type DueRow = { dueDate: string; totalDue: number; paid: number; status: string };

export default function MemberDrawer({ userId, onClose }: { userId: string | null; onClose: () => void }) {
  const open = !!userId;
  const { colors } = useTheme();
  const txs = useQuery({
    queryKey: ['txs', userId],
    queryFn: async () => (await api.get('/transactions', { params: { userId, limit: 20 } })).data,
    enabled: open,
  });
  const dues = useQuery({
    queryKey: ['dues', userId],
    queryFn: async () => (await api.get(`/users/${userId}/dues`)).data,
    enabled: open,
  });

  const txRows: TxRow[] = (txs.data as TxRow[] | undefined) ?? [];

  const upcomingDues: DueRow[] = useMemo(() => {
    if (!dues.data) return [];
    return (dues.data as any[])
      .flatMap((d: any) =>
        d.schedule.map((it: any) => ({
          dueDate: String(it.dueDate),
          totalDue: Number(it.totalDue || 0),
          paid: Number(it.paid || 0),
          status: String(it.status || 'pending'),
        }))
      )
      .filter((it: DueRow) => it.status !== 'paid');
  }, [dues.data]);

  if (!open) return null;

  return (
    <Modal visible animationType="fade" onRequestClose={onClose} transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <ThemedCard tone="default" title="Member details" style={{ maxHeight: '85%' }}>
          <ThemeText variant="subtitle" style={{ fontWeight: '600', marginBottom: 12 }}>
            Recent activity
          </ThemeText>
          {txRows.length ? (
            <View style={{ gap: 8, marginBottom: 16 }}>
              {txRows.map((item) => (
                <View
                  key={item._id}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 6 }}
                >
                  <ThemeText tone="dim">{new Date(item.occurredAt).toISOString().slice(0, 10)}</ThemeText>
                  <ThemeText tone={item.type === 'deposit' ? 'success' : 'danger'}>
                    {formatBDT(item.amount)}
                  </ThemeText>
                </View>
              ))}
            </View>
          ) : (
            <ThemeText tone="dim" style={{ marginBottom: 16 }}>
              No recent transactions.
            </ThemeText>
          )}

          <ThemeText variant="subtitle" style={{ fontWeight: '600', marginBottom: 12 }}>
            Open dues
          </ThemeText>
          {upcomingDues.length ? (
            <View style={{ gap: 8 }}>
              {upcomingDues.map((item, index) => (
                <View
                  key={`${item.dueDate}-${index}`}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: colors.border, paddingBottom: 6 }}
                >
                  <ThemeText tone="dim">{new Date(item.dueDate).toISOString().slice(0, 10)}</ThemeText>
                  <ThemeText>{formatBDT((item.totalDue || 0) - (item.paid || 0))}</ThemeText>
                </View>
              ))}
            </View>
          ) : (
            <ThemeText tone="dim">No open dues.</ThemeText>
          )}

          <ThemeButton title="Close" variant="secondary" onPress={onClose} style={{ marginTop: 20 }} />
        </ThemedCard>
      </View>
    </Modal>
  );
}
