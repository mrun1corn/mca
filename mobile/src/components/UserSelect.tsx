import React, { useMemo, useState } from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { api } from '../lib/api';
import { useTheme } from '../theme';
import ThemeText from './ui/ThemeText';
import ThemeInput from './ui/ThemeInput';
import ThemeButton from './ui/ThemeButton';
import ThemedCard from './ui/ThemedCard';

type User = { id: string; name: string; email?: string };

export default function UserSelect({ value, onChange, label = 'Member' }: { value?: string; onChange: (id: string, user?: User) => void; label?: string }) {
  const { colors } = useTheme();
  const { data } = useQuery({ queryKey: ['users'], queryFn: async () => (await api.get('/users')).data });
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const users: User[] = data || [];
  const current = users.find((u) => u.id === value);
  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return users;
    return users.filter((u) => u.name.toLowerCase().includes(t) || (u.email || '').toLowerCase().includes(t));
  }, [users, q]);

  return (
    <View>
      <ThemeText variant="label" style={{ marginBottom: 6 }}>
        {label}
      </ThemeText>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 14,
          backgroundColor: colors.card,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <ThemeText tone={current ? 'default' : 'dim'}>
          {current ? `${current.name}${current.email ? ' · ' + current.email : ''}` : 'Select a member'}
        </ThemeText>
        <ThemeText tone="dim">▾</ThemeText>
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
          <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 12 }}>
            Choose a member
          </ThemeText>
          <ThemeInput placeholder="Search" value={q} onChangeText={setQ} style={{ marginBottom: 16 }} />
          <ThemedCard tone="surface" style={{ flex: 1, padding: 0 }}>
            {filtered.length ? (
              filtered.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    onChange(item.id, item);
                    setOpen(false);
                    setQ('');
                  }}
                  style={{
                    paddingVertical: 14,
                    paddingHorizontal: 16,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  }}
                >
                  <ThemeText style={{ fontWeight: '600' }}>{item.name}</ThemeText>
                  {item.email ? <ThemeText tone="dim">{item.email}</ThemeText> : null}
                </TouchableOpacity>
              ))
            ) : (
              <View style={{ padding: 16 }}>
                <ThemeText tone="dim">No members match your search.</ThemeText>
              </View>
            )}
          </ThemedCard>
          <ThemeButton title="Close" variant="secondary" onPress={() => setOpen(false)} style={{ marginTop: 16 }} />
        </View>
      </Modal>
    </View>
  );
}
