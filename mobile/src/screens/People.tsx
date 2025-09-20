import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Modal, View } from 'react-native';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemeText from '../components/ui/ThemeText';
import ThemedCard from '../components/ui/ThemedCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';

type UserRow = {
  id: string;
  name: string;
  email?: string;
  role: 'admin' | 'accountant' | 'user';
};

export default function People() {
  const qc = useQueryClient();
  const notify = (message: string) => Alert.alert('People', message);
  const [q, setQ] = useState('');
  const { data } = useQuery({ queryKey: ['users', q], queryFn: async () => (await api.get(`/users?q=${encodeURIComponent(q)}`)).data });
  const [form, setForm] = useState({ name: '', email: '', role: 'user' });

  const create = useMutation({
    mutationFn: (body: any) => api.post('/users', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      notify('Member created');
      setForm({ name: '', email: '', role: 'user' });
    },
    onError: () => notify('Could not create member'),
  });

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      notify('Member removed');
    },
    onError: () => notify('Could not delete member'),
  });

  const me = useQuery({ queryKey: ['me'], queryFn: async () => (await api.get('/me')).data });
  const canManage = me.data?.role === 'admin';

  const [editing, setEditing] = useState<UserRow | null>(null);

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        People
      </ThemeText>

      <ThemeInput
        placeholder="Search by name or email"
        value={q}
        onChangeText={setQ}
        autoCorrect={false}
        style={{ marginBottom: 16 }}
      />

      <ThemedCard title="Add a member" tone="surface">
        <ThemeInput
          placeholder="Full name"
          value={form.name}
          onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
          style={{ marginBottom: 12 }}
        />
        <ThemeInput
          placeholder="Email (optional)"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
          style={{ marginBottom: 12 }}
        />
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
          {(['user', 'accountant', 'admin'] as const).map((role) => (
            <ThemeButton
              key={role}
              title={role.charAt(0).toUpperCase() + role.slice(1)}
              variant={form.role === role ? 'primary' : 'secondary'}
              size="sm"
              onPress={() => setForm((prev) => ({ ...prev, role }))}
            />
          ))}
        </View>
        <ThemeButton
          title={create.isPending ? 'Creating…' : 'Create member'}
          onPress={() => create.mutate({ ...form, password: 'ChangeMe123!' })}
          disabled={!canManage || !form.name || create.isPending}
        />
        {!canManage ? (
          <ThemeText tone="muted" style={{ marginTop: 8 }}>
            Only admins can create members.
          </ThemeText>
        ) : null}
      </ThemedCard>

      <ThemeText variant="subtitle" style={{ fontWeight: '600', marginTop: 24, marginBottom: 12 }}>
        Members
      </ThemeText>
      <FlatList
        data={data as UserRow[] | undefined}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <ThemedCard
            title={item.name}
            subtitle={item.email || 'No email on file'}
            tone="surface"
            footer={
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                <ThemeButton
                  variant="ghost"
                  size="sm"
                  title="Edit"
                  onPress={() => setEditing(item)}
                  disabled={!canManage}
                />
                <ThemeButton
                  variant="danger"
                  size="sm"
                  title="Remove"
                  onPress={() => remove.mutate(item.id)}
                  disabled={!canManage}
                />
              </View>
            }
          />
        )}
        ListEmptyComponent={<ThemeText tone="dim">No members match your search.</ThemeText>}
      />

      <EditMemberModal
        user={editing}
        onClose={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          qc.invalidateQueries({ queryKey: ['users'] });
        }}
        canManage={!!canManage}
      />
    </Screen>
  );
}

type EditProps = {
  user: UserRow | null;
  onClose: () => void;
  onSaved: () => void;
  canManage: boolean;
};

function EditMemberModal({ user, onClose, onSaved, canManage }: EditProps) {
  const { colors } = useTheme();
  const notify = (message: string) => Alert.alert('People', message);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });

  useEffect(() => {
    if (user) {
      setForm({ name: user.name, email: user.email || '', password: '' });
    }
  }, [user]);

  const update = useMutation({
    mutationFn: () =>
      api.patch(`/users/${user?.id}`, {
        name: form.name,
        email: form.email || undefined,
        password: form.password || undefined,
      }),
    onSuccess: () => {
      notify('Member updated');
      onSaved();
    },
    onError: () => notify('Update failed'),
  });

  if (!user) return null;

  return (
    <Modal transparent animationType="fade" visible={!!user} onRequestClose={onClose}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.overlay,
          justifyContent: 'center',
          padding: 16,
        }}
      >
        <ThemedCard tone="default" title="Edit member" subtitle={user.email || undefined}>
          <ThemeInput
            placeholder="Full name"
            value={form.name}
            onChangeText={(value) => setForm((prev) => ({ ...prev, name: value }))}
            style={{ marginBottom: 12 }}
          />
          <ThemeInput
            placeholder="Email"
            autoCapitalize="none"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(value) => setForm((prev) => ({ ...prev, email: value }))}
            style={{ marginBottom: 12 }}
          />
          <ThemeInput
            placeholder="New password (optional)"
            secureTextEntry
            value={form.password}
            onChangeText={(value) => setForm((prev) => ({ ...prev, password: value }))}
            style={{ marginBottom: 12 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
            <ThemeButton variant="ghost" size="sm" title="Cancel" onPress={onClose} />
            <ThemeButton
              title={update.isPending ? 'Saving…' : 'Save changes'}
              onPress={() => update.mutate()}
              disabled={!canManage || update.isPending}
            />
          </View>
        </ThemedCard>
      </View>
    </Modal>
  );
}
