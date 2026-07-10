import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

let refreshing: Promise<boolean> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    // Do not intercept login or refresh requests themselves to avoid infinite loops
    if (
      err.response?.status === 401 &&
      !original.__retried &&
      original.url !== "/auth/login" &&
      original.url !== "/auth/refresh"
    ) {
      original.__retried = true;
      if (!refreshing) {
        refreshing = (async () => {
          try {
            await axios.post(`${baseURL}/auth/refresh`, {}, { withCredentials: true });
            return true;
          } catch (e) {
            // Trigger a storage event to log the user out in App.tsx
            window.localStorage.setItem("logout", Date.now().toString());
            window.dispatchEvent(new StorageEvent("storage", { key: "logout" }));
            return false;
          } finally {
            refreshing = null;
          }
        })();
      }

      const success = await refreshing;
      if (success) {
        return api.request(original);
      }
    }
    return Promise.reject(err);
  }
);

export function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
