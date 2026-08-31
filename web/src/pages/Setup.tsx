import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, setGlobalCurrency, getGlobalCurrency } from "../lib/api";
import { useToast } from "../components/Toast";
import PageHeader from "../components/layout/PageHeader";
import Panel from "../components/ui/Panel";
import Button from "../components/Button";
import { useAuth } from "../App";

const CURRENCY_PRESETS = [
  { code: "BDT", symbol: "৳", label: "BDT (৳) - Bangladeshi Taka" },
  { code: "USD", symbol: "$", label: "USD ($) - US Dollar" },
  { code: "INR", symbol: "₹", label: "INR (₹) - Indian Rupee" },
  { code: "EUR", symbol: "€", label: "EUR (€) - Euro" },
  { code: "GBP", symbol: "£", label: "GBP (£) - British Pound" },
  { code: "AED", symbol: "د.إ", label: "AED (د.إ) - UAE Dirham" },
  { code: "SAR", symbol: "﷼", label: "SAR (﷼) - Saudi Riyal" },
  { code: "CAD", symbol: "CA$", label: "CAD ($) - Canadian Dollar" },
  { code: "MYR", symbol: "RM", label: "MYR (RM) - Malaysian Ringgit" },
  { code: "CUSTOM", symbol: "", label: "Custom Currency…" },
];

export default function Setup() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const { notify } = useToast();
  const qc = useQueryClient();

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  // Currency settings state
  const currentGlobal = getGlobalCurrency();
  const [selectedCurrency, setSelectedCurrency] = useState(currentGlobal.code);
  const [customCode, setCustomCode] = useState(currentGlobal.code);
  const [customSymbol, setCustomSymbol] = useState(currentGlobal.symbol);

  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const res = await api.get("/settings");
      return res.data as { currency: string; currencySymbol: string; appName: string };
    },
    staleTime: 60_000,
  });

  useEffect(() => {
    if (settingsQuery.data) {
      const { currency, currencySymbol } = settingsQuery.data;
      setGlobalCurrency(currencySymbol, currency);
      const isPreset = CURRENCY_PRESETS.some((p) => p.code === currency);
      setSelectedCurrency(isPreset ? currency : "CUSTOM");
      setCustomCode(currency);
      setCustomSymbol(currencySymbol);
    }
  }, [settingsQuery.data]);

  const currencyMutation = useMutation({
    mutationFn: async (payload: { currency: string; currencySymbol: string }) => {
      const res = await api.patch("/settings", payload);
      return res.data;
    },
    onSuccess: (data) => {
      const newSettings = data?.settings;
      if (newSettings) {
        setGlobalCurrency(newSettings.currencySymbol, newSettings.currency);
        qc.invalidateQueries({ queryKey: ["settings"] });
        qc.invalidateQueries({ queryKey: ["home"] });
        notify(`Currency updated to ${newSettings.currency} (${newSettings.currencySymbol})`, "success");
      }
    },
    onError: () => {
      notify("Failed to update currency settings", "error");
    },
  });

  const handleCurrencySelect = (code: string) => {
    setSelectedCurrency(code);
    const preset = CURRENCY_PRESETS.find((p) => p.code === code);
    if (preset && preset.code !== "CUSTOM") {
      setCustomCode(preset.code);
      setCustomSymbol(preset.symbol);
    }
  };

  const saveCurrencySettings = () => {
    currencyMutation.mutate({
      currency: customCode,
      currencySymbol: customSymbol,
    });
  };

  const changePassword = async () => {
    try {
      await api.post("/auth/me/change-password", { currentPassword, newPassword: password });
      setMsg("Password changed");
      setPassword("");
      setCurrentPassword("");
      notify("Password updated", "success");
    } catch (e) {
      setMsg("Failed");
      notify("Password update failed", "error");
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Setup & Preferences"
        title="Manage your security and community settings"
        description="Configure community currency symbols, update passwords, and manage preferences."
      />

      {isAdmin && (
        <Panel
          title="Community Currency & Formatting"
          description="Choose the primary currency symbol and code used across dashboards, member balances, and payment checkout."
        >
          <div className="grid gap-4 max-w-xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Primary Currency
              </label>
              <select
                className="input h-11 w-full text-sm font-medium rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                value={selectedCurrency}
                onChange={(e) => handleCurrencySelect(e.target.value)}
              >
                {CURRENCY_PRESETS.map((preset) => (
                  <option key={preset.code} value={preset.code}>
                    {preset.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Currency Code
                </label>
                <input
                  type="text"
                  className="input h-11 uppercase"
                  placeholder="e.g. USD, EUR, BDT"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value.toUpperCase())}
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  className="input h-11"
                  placeholder="e.g. $, ৳, €, ₹, £"
                  value={customSymbol}
                  onChange={(e) => setCustomSymbol(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-1">
              <Button
                onClick={saveCurrencySettings}
                isLoading={currencyMutation.isPending}
                className="px-6 h-11 text-sm font-bold shadow-md shadow-blue-500/20"
              >
                Save Currency Settings
              </Button>
            </div>
          </div>
        </Panel>
      )}

      <Panel
        title="Change your password"
        description="Only you can update your password. Use something you won’t share anywhere else."
      >
        <div className="grid gap-3 max-w-xl">
          <input
            type="password"
            className="input h-11"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <input
            type="password"
            className="input h-11"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex flex-wrap gap-2 items-center">
            <Button disabled={!currentPassword || !password} onClick={changePassword}>
              Update password
            </Button>
            {msg && <span className="text-sm text-slate-500">{msg}</span>}
          </div>
          <p className="text-xs text-slate-500">
            Tip: share the change password instructions with new members so they can rotate their credentials themselves.
          </p>
        </div>
      </Panel>

      <Panel
        title="How penalties and roles behave"
        description="These reminders save you from hunting through docs when someone asks how things work."
      >
        <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc pl-5">
          <li>Penalty rules are picked per withdrawal. You can tweak the grace days or rate in the form itself.</li>
          <li>Admins can configure currency and manage members, accountants handle funds, and members view their balances.</li>
          <li>Clean decimal math applies to all currencies (cents/decimals preserved).</li>
        </ul>
      </Panel>
    </div>
  );
}
