import React from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api, formatBDT } from '../lib/api';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Card from '../components/Card';
import MemberDrawer from '../components/MemberDrawer';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: Props) {
  const home = useQuery({ queryKey: ['home'], queryFn: async () => (await api.get('/home')).data });
  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
  const [drawerUserId, setDrawerUserId] = React.useState<string | null>(null);
  const myId = me.data?.id as string | undefined;
  const dues = useQuery({
    queryKey: ['dues', myId],
    queryFn: async () => (await api.get(`/users/${myId}/dues`)).data,
    enabled: !!myId && me.data?.role === 'user',
  });
  const txs = useQuery({
    queryKey: ['txs', myId, 10],
    queryFn: async () => (await api.get(`/transactions`, { params: { limit: 10 } })).data,
    enabled: !!myId && me.data?.role === 'user',
  });

  if (!home.data) return <View style={s.container}><Text>Loading...</Text></View>;
  const role = me.data?.role as 'admin' | 'accountant' | 'user' | undefined;

  return (
    <View style={s.container}>
      {role === 'user' ? (
        <View>
          <View style={s.cardRow}>
            <Card style={s.card}><Text style={s.label}>Current Balance</Text><Text style={s.value}>{formatBDT(home.data?.remainingBalance || 0)}</Text></Card>
            <Card style={s.card}><Text style={s.label}>Total Deposits</Text><Text style={s.value}>{formatBDT(home.data?.totalDeposits || 0)}</Text></Card>
            {(() => {
              let nextEmi = 0;
              try {
                if (dues.data) {
                  for (const d of dues.data as any[]) {
                    for (const it of d.schedule as any[]) {
                      if (it.status === 'paid') continue;
                      const remaining = (it.totalDue || 0) - (it.paid || 0);
                      nextEmi = nextEmi === 0 ? remaining : Math.min(nextEmi, remaining);
                      break;
                    }
                  }
                }
              } catch {}
              return nextEmi > 0 ? (<Card style={s.card}><Text style={s.label}>Next EMI</Text><Text style={s.value}>{formatBDT(nextEmi)}</Text></Card>) : null;
            })()}
          </View>
          <View style={{ marginTop: 12 }}>
            <Text style={s.sectionTitle}>Recent Activity</Text>
            <FlatList
              data={txs.data || []}
              keyExtractor={(t:any) => String(t._id)}
              renderItem={({ item: t }: any) => (
                <View style={s.rowSmall}>
                  <Text style={s.smallCell}>{new Date(t.occurredAt).toISOString().slice(0,10)}</Text>
                  <Text style={[s.smallCell, { color: t.type==='deposit' ? '#166534' : '#b91c1c' }]}>{t.note || t.type}</Text>
                  <Text style={s.smallCellRight}>{formatBDT(t.amount)}</Text>
                </View>
              )}
              ListEmptyComponent={<Text style={s.memberMeta}>No recent transactions</Text>}
            />
          </View>
        </View>
      ) : (
        <View style={s.cardRow}>
          <Card style={s.card}><Text style={s.label}>Members</Text><Text style={s.value}>{home.data.membersCount}</Text></Card>
          <Card style={s.card}><Text style={s.label}>Total Balance</Text><Text style={s.value}>{formatBDT(home.data.groupBalance)}</Text></Card>
          <Card style={s.card}><Text style={s.label}>Unpaid Dues</Text><Text style={s.value}>{home.data.arrearsCount}</Text></Card>
        </View>
      )}

      {(role === 'admin' || role === 'accountant') && (
        <View style={s.navRow}>
          <Button title="Deposit" onPress={() => navigation.navigate('Deposit')} />
          <Button title="Withdraw" onPress={() => navigation.navigate('Withdraw')} />
          <Button title="Export" onPress={() => navigation.navigate('ExportCsv')} />
          <Button title="Members" onPress={() => navigation.navigate('People')} />
        </View>
      )}

      <Text style={s.sectionTitle}>Members</Text>
      <FlatList
        data={home.data.cards}
        keyExtractor={(item) => String(item.userId)}
        renderItem={({ item }) => (
          <TouchableOpacity style={s.member} onPress={() => setDrawerUserId(String(item.userId))}>
            <Text style={s.memberName}>{item.name}</Text>
            <Text style={s.memberMeta}>Last Month: {formatBDT(item.lastMonth)} • Balance: {formatBDT(item.balance)}</Text>
          </TouchableOpacity>
        )}
      />
      <MemberDrawer userId={drawerUserId} onClose={() => setDrawerUserId(null)} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  cardRow: { flexDirection: 'row', gap: 10, flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { flexBasis: '48%', minHeight: 84 },
  label: { color: '#475569' },
  value: { fontSize: 20, fontWeight: '600' },
  navRow: { flexDirection: 'row', gap: 8, marginTop: 10, flexWrap: 'wrap' },
  sectionTitle: { marginTop: 16, marginBottom: 6, fontWeight: '600' },
  member: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  memberName: { fontWeight: '600' },
  memberMeta: { color: '#64748b' },
  rowSmall: { flexDirection: 'row', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  smallCell: { flex: 1, fontSize: 13, color: '#334155' },
  smallCellRight: { flex: 1, fontSize: 13, textAlign: 'right', color: '#334155' },
});
