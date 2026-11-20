import React, { useMemo, useState } from 'react';
import ThemeInput from '../components/ui/ThemeInput';
import ThemeButton from '../components/ui/ThemeButton';
import Screen from '../components/ui/Screen';
import ThemedCard from '../components/ui/ThemedCard';
import ThemeText from '../components/ui/ThemeText';
import { api } from '../lib/api';
import UserSelect from '../components/UserSelect';
import { Alert, Share } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../theme';

export default function ExportCsv() {
  const { colors } = useTheme();
  const base = (api.defaults.baseURL || '').replace(/\/$/, '');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');

  const qs = useMemo(() => {
    const params = new URLSearchParams();
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    if (userId) params.set('userId', userId);
    return params.toString();
  }, [from, to, userId]);

  const summaryHref = `${base}/export/summary.csv${qs ? '?' + qs : ''}`;
  const ledgerHref = `${base}/export/ledger.csv${qs ? '?' + qs : ''}`;

  return (
    <Screen scroll>
      <ThemeText variant="title" style={{ fontWeight: '700', marginBottom: 16 }}>
        Export CSV reports
      </ThemeText>

      <ThemedCard tone="surface">
        <ThemeText variant="label">Date range</ThemeText>
        <ThemeText tone="dim" style={{ marginBottom: 12 }}>
          Both dates are optional. Leave blank to export the complete history.
        </ThemeText>
        <ThemeInput placeholder="Start (YYYY-MM-DD)" value={from} onChangeText={setFrom} style={{ marginBottom: 12 }} />
        <ThemeInput placeholder="End (YYYY-MM-DD)" value={to} onChangeText={setTo} />

        <ThemeText variant="label" style={{ marginTop: 20 }}>Filter by member</ThemeText>
        <UserSelect value={userId} onChange={(id, u) => { setUserId(id); setUserName(u?.name || ''); }} />
        {userName ? <ThemeText tone="dim" style={{ marginTop: 6 }}>Selected: {userName}</ThemeText> : null}

        <ThemeButton
          title="Share / Export summary CSV"
          variant="secondary"
          leftIcon={<Ionicons name="download-outline" size={18} color={colors.primary} />}
          onPress={async () => {
            try {
              const res = await api.get(summaryHref, { responseType: 'text' });
              await Share.share({ title: 'summary.csv', message: String(res.data) });
            } catch (err: any) {
              Alert.alert('Export Failed', err?.message || 'Could not fetch summary export.');
            }
          }}
          style={{ marginTop: 24 }}
        />
        <ThemeButton
          title="Share / Export ledger CSV"
          leftIcon={<Ionicons name="document-text-outline" size={18} color={colors.onPrimary} />}
          onPress={async () => {
            try {
              const res = await api.get(ledgerHref, { responseType: 'text' });
              await Share.share({ title: 'ledger.csv', message: String(res.data) });
            } catch (err: any) {
              Alert.alert('Export Failed', err?.message || 'Could not fetch ledger export.');
            }
          }}
          style={{ marginTop: 12 }}
        />
        <ThemeText tone="dim" style={{ marginTop: 12 }}>
          Summary aggregates totals per member. Ledger lists every transaction. Filters apply to both downloads.
        </ThemeText>
      </ThemedCard>
    </Screen>
  );
}
