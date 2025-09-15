import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Modal } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';

export default function People() {
  const qc = useQueryClient();
  const [q, setQ] = useState('');
  const [form, setForm] = useState({ name: '', email: '', role: 'user' });
  const users = useQuery({ queryKey: ['users', q], queryFn: async () => (await api.get(`/users?q=${encodeURIComponent(q)}`)).data });
  const create = useMutation({
    mutationFn: (body: any) => api.post('/users', body),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
    onError: () => Alert.alert('Create failed'),
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
    onError: () => Alert.alert('Delete failed'),
  });
  const [editing, setEditing] = useState<any | null>(null);
  const update = useMutation({
    mutationFn: ({ id, body }: { id: string; body: any }) => api.patch(`/users/${id}`, body),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['users'] }); setEditing(null); },
    onError: () => Alert.alert('Update failed'),
  });
  return (
    <View style={s.container}>
      <ThemeInput placeholder='Search' value={q} onChangeText={setQ} />
      <View style={{ gap: 8 }}>
        <Text style={s.section}>Add Member</Text>
        <ThemeInput placeholder='Name' value={form.name} onChangeText={(v) => setForm({ ...form, name: v as any })} />
        <ThemeInput placeholder='Email' autoCapitalize='none' value={form.email} onChangeText={(v) => setForm({ ...form, email: v as any })} />
        <Button title='Create' onPress={() => create.mutate({ ...form, password: 'ChangeMe123!' })} />
      </View>
      <Text style={s.section}>Members</Text>
      <FlatList
        data={users.data || []}
        keyExtractor={(u) => String(u.id)}
        renderItem={({ item: u }) => (
          <View style={s.row}>
            <View style={{ flex: 1 }}>
              <Text style={s.name}>{u.name}</Text>
              <Text style={s.meta}>{u.email || ''}</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Button title='Edit' onPress={() => setEditing(u)} />
              <Button title='Delete' onPress={() => remove.mutate(u.id)} />
            </View>
          </View>
        )}
      />
      <EditModal
        user={editing}
        onClose={() => setEditing(null)}
        onSave={(body) => update.mutate({ id: editing!.id, body })}
      />
    </View>
  );
}

function EditModal({ user, onClose, onSave }: { user: any | null; onClose: () => void; onSave: (body: any) => void }) {
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  React.useEffect(() => { setForm({ name: user?.name || '', email: user?.email || '', password: '' }); }, [user]);
  return (
    <Modal visible={!!user} animationType='slide' onRequestClose={onClose}>
      <View style={s.modal}>
        <Text style={s.title}>Edit Member</Text>
        <ThemeInput placeholder='Name' value={form.name} onChangeText={(v) => setForm({ ...form, name: v as any })} />
        <ThemeInput placeholder='Email' autoCapitalize='none' value={form.email} onChangeText={(v) => setForm({ ...form, email: v as any })} />
        <ThemeInput placeholder='New password (optional)' secureTextEntry value={form.password} onChangeText={(v) => setForm({ ...form, password: v as any })} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <Button title='Cancel' onPress={onClose} />
          <Button title='Save' onPress={() => onSave({ name: form.name, email: form.email, ...(form.password ? { password: form.password } : {}) })} />
        </View>
      </View>
    </Modal>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 10 },
  section: { fontWeight: '600', marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  name: { fontWeight: '600' },
  meta: { color: '#64748b' },
  modal: { flex: 1, padding: 12, gap: 8 },
  title: { fontSize: 18, fontWeight: '600' },
});
