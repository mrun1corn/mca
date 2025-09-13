import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || "http://localhost:4000/api",
  withCredentials: true,
});

export function formatBDT(poisha: number) {
  const taka = poisha / 100;
  return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(taka);
}

