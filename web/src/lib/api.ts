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

let activeCurrencySymbol = localStorage.getItem("mca_currency_symbol") || "৳";
let activeCurrencyCode = localStorage.getItem("mca_currency_code") || "BDT";

export function setGlobalCurrency(symbol: string, code?: string) {
  if (symbol) {
    activeCurrencySymbol = symbol;
    localStorage.setItem("mca_currency_symbol", symbol);
  }
  if (code) {
    activeCurrencyCode = code;
    localStorage.setItem("mca_currency_code", code);
  }
}

export function getGlobalCurrency() {
  return { symbol: activeCurrencySymbol, code: activeCurrencyCode };
}

export function formatAmount(amount: number, customSymbol?: string) {
  const symbol = customSymbol !== undefined ? customSymbol : activeCurrencySymbol;
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return symbol ? `${symbol} ${formatted}` : formatted;
}
