import React from 'react';
import { Modal, View, Text, StyleSheet, FlatList } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatBDT } from '../lib/api';

export default function MemberDrawer({ userId, onClose }: { userId: string | null; onClose: () => void }) {
  const open = !!userId;
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
  return (
    <Modal visible={open} animationType="slide" onRequestClose={onClose}>
      <View style={s.container}>
        <Text style={s.title}>Member Details</Text>
        <Text style={s.section}>Recent Activity</Text>
        <FlatList
          data={txs.data || []}
          keyExtractor={(it) => String(it._id)}
          renderItem={({ item }) => (
            <View style={s.row}>
              <Text style={s.cell}>{new Date(item.occurredAt).toISOString().slice(0,10)}</Text>
              <Text style={[s.cell, { color: item.type==='deposit' ? '#166534' : '#b91c1c' }]}>{item.note || item.type}</Text>
              <Text style={[s.cellRight]}>{formatBDT(item.amount)}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={s.meta}>No recent transactions</Text>}
        />
        <Text style={s.section}>Open Dues</Text>
        <FlatList
          data={(dues.data || []).flatMap((d: any) => d.schedule.map((it: any, idx: number) => ({...it, _dueId: d._id, _idx: idx}))).filter((it: any) => it.status !== 'paid')}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item }) => (
            <View style={s.rowSmall}>
              <Text style={s.smallCell}>{new Date(item.dueDate).toISOString().slice(0,10)}</Text>
              <Text style={s.smallCellRight}>{formatBDT((item.totalDue || 0) - (item.paid || 0))}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={s.meta}>No open dues</Text>}
        />
        <View style={{ height: 8 }} />
        <Text onPress={onClose} style={s.closeBtn}>Close</Text>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 8 },
  title: { fontSize: 18, fontWeight: '600' },
  section: { fontWeight: '600', marginTop: 8 },
  row: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
  cell: { flex: 1 },
  cellRight: { flex: 1, textAlign: 'right' },
  rowSmall: { flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  smallCell: { flex: 1, fontSize: 13, color: '#334155' },
  smallCellRight: { flex: 1, fontSize: 13, textAlign: 'right', color: '#334155' },
  meta: { color: '#64748b', marginVertical: 6 },
  closeBtn: { color: '#2563eb', textAlign: 'center', paddingVertical: 10, fontWeight: '600' },
});

