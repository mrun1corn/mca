import { MMKV } from 'react-native-mmkv';
import { QueryClient } from '@tanstack/react-query';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';

const storage = new MMKV();

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      staleTime: 1000 * 60 * 5,    // 5 minutes
    },
  },
});

// Wrapper to make MMKV compatible with AsyncStorage interface
const clientStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve();
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value === undefined ? null : value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const asyncStoragePersister = createAsyncStoragePersister({
  storage: clientStorage,
  key: 'SAVINGS_MOBILE_OFFLINE_CACHE',
});
