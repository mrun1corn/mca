import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const baseURL = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:4000/api';

export type Tokens = { access: string; refresh: string };

const ACCESS_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export async function saveTokens(tokens: Tokens) {
  await SecureStore.setItemAsync(ACCESS_KEY, tokens.access);
  await SecureStore.setItemAsync(REFRESH_KEY, tokens.refresh);
}

export async function getAccessToken() {
  return SecureStore.getItemAsync(ACCESS_KEY);
}

export async function getRefreshToken() {
  return SecureStore.getItemAsync(REFRESH_KEY);
}

export async function clearTokens() {
  await SecureStore.deleteItemAsync(ACCESS_KEY);
  await SecureStore.deleteItemAsync(REFRESH_KEY);
}

export const api = axios.create({ baseURL });

// Attach Bearer token
api.interceptors.request.use(async (config) => {
  const token = await getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

// Naive refresh on 401
let refreshing: Promise<string | null> | null = null;
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const status = err?.response?.status;
    const original = err.config;
    if (status === 401 && !original.__retried) {
      original.__retried = true;
      if (!refreshing) {
        refreshing = (async () => {
          const refresh = await getRefreshToken();
          if (!refresh) return null;
          try {
            const r = await axios.post(`${baseURL}/auth/refresh`, {}, {
              headers: { Authorization: `Bearer ${refresh}` },
              withCredentials: false,
            });
            const tokens: Tokens | undefined = r.data?.tokens;
            if (tokens) await saveTokens(tokens);
            return tokens?.access || null;
          } catch {
            await clearTokens();
            return null;
          } finally {
            refreshing = null;
          }
        })();
      }
      const newAccess = await refreshing;
      if (newAccess) {
        original.headers = original.headers || {};
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api.request(original);
      }
    }
    return Promise.reject(err);
  }
);

export function formatBDT(amountMinor: number) {
  const taka = amountMinor / 100;
  return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(taka);
}

