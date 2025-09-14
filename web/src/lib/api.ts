import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function formatBDT(amountMinor: number) {
  const taka = amountMinor / 100;
  return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(taka);
}
