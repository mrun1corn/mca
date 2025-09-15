import React, { useMemo, useState } from 'react';
import { Modal, View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';

type User = { id: string; name: string; email?: string };

export default function UserSelect({ value, onChange, label = 'Member' }: { value?: string; onChange: (id: string, user?: User) => void; label?: string }) {
  const { colors } = useTheme();
  const { data } = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const users: User[] = data || [];
  const current = users.find(u => u.id === value);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return users;
    return users.filter(u => u.name.toLowerCase().includes(t) || (u.email || '').toLowerCase().includes(t));
  }, [users, q]);
  return (
    <View>
      <Text style={[s.label,{color:colors.textDim}]}>{label}</Text>
      <TouchableOpacity activeOpacity={0.7} onPress={() => setOpen(true)} style={[s.selectBox,{borderColor:colors.border}]}> 
        <Text style={[s.selectText,{color: current ? colors.text : colors.textDim}]}>
          {current ? current.name + (current.email ? ' · ' + current.email : '') : 'Select a member'}
        </Text>
        <Text style={{ color: colors.textDim }}>▾</Text>
      </TouchableOpacity>
      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={[s.modal,{backgroundColor:colors.bg}] }>
          <Text style={s.title}>Select Member</Text>
          <TextInput placeholder='Search' value={q} onChangeText={setQ} style={[s.input,{borderColor:colors.border}]} />
          <FlatList
            data={filtered}
            keyExtractor={(u) => u.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={s.item} onPress={() => { onChange(item.id, item); setOpen(false); }}>
                <Text style={s.name}>{item.name}</Text>
                {!!item.email && <Text style={s.meta}>{item.email}</Text>}
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={() => setOpen(false)} style={s.closeBtn}> 
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  label: { color: '#475569' },
  value: { fontWeight: '600', marginTop: 2 },
  modal: { flex: 1, padding: 12, gap: 8 },
  title: { fontSize: 18, fontWeight: '600' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  selectBox: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  selectText: { fontSize: 16 },
  item: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontWeight: '600' },
  meta: { color: '#64748b' },
  closeBtn: { alignSelf: 'center', marginTop: 8, borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingVertical: 8, paddingHorizontal: 16 },
});
