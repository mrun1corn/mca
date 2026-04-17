import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function formatAmount(amountMinor: number) {
  const amount = amountMinor / 100;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
