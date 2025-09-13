import axios from "axios";

const fallbackBase = `${window.location.protocol}//${window.location.hostname}:4000/api`;
const envBase = (import.meta.env.VITE_API_BASE as string) || "";
const baseURL = envBase && !/localhost|127\.0\.0\.1/.test(envBase) ? envBase : fallbackBase;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export function formatBDT(poisha: number) {
  const taka = poisha / 100;
  return new Intl.NumberFormat("en-BD", { style: "currency", currency: "BDT" }).format(taka);
}
