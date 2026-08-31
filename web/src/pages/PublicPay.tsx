import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { api, formatAmount } from "../lib/api";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../components/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import ModeCard from "../components/ui/ModeCard";

export default function PublicPay() {
  const [searchParams] = useSearchParams();
  const initialMemberParam = searchParams.get("member") || searchParams.get("userId") || "";
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [mode, setMode] = useState<"simple" | "pay_due">("simple");
  const [amount, setAmount] = useState<string>("");
  const [dueId, setDueId] = useState<string>("");
  const [copiedLink, setCopiedLink] = useState(false);

  // Fetch community currency settings
  const settingsQuery = useQuery({
    queryKey: ["public-settings"],
    queryFn: async () => {
      const res = await api.get("/settings");
      return res.data as { currency: string; currencySymbol: string; appName: string };
    },
    staleTime: 60_000,
  });

  const currencyCode = settingsQuery.data?.currency || "BDT";
  const currencySymbol = settingsQuery.data?.currencySymbol || "৳";
  const appName = settingsQuery.data?.appName || "Community Savings";

  // 1. Fetch public member directory
  const membersQuery = useQuery({
    queryKey: ["public-members", searchQuery],
    queryFn: async () => {
      const res = await api.get("/payments/public-members", { params: { q: searchQuery } });
      return res.data as Array<{ id: string; name: string; phone?: string; email?: string }>;
    },
    staleTime: 60_000,
  });

  // Auto-select member if query param matches ID or phone
  useEffect(() => {
    if (initialMemberParam && membersQuery.data?.length) {
      const match = membersQuery.data.find(
        (m) => m.id === initialMemberParam || (m.phone && m.phone.includes(initialMemberParam))
      );
      if (match) {
        setSelectedUserId(match.id);
      }
    }
  }, [initialMemberParam, membersQuery.data]);

  // 2. Fetch member's active dues
  const duesQuery = useQuery({
    queryKey: ["public-dues", selectedUserId],
    queryFn: async () => {
      if (!selectedUserId) return null;
      const res = await api.get(`/payments/public-dues/${selectedUserId}`);
      return res.data as {
        user: { id: string; name: string; phone?: string };
        dues: any[];
      };
    },
    enabled: Boolean(selectedUserId),
    staleTime: 30_000,
  });

  const selectedMember = useMemo(() => {
    return membersQuery.data?.find((m) => m.id === selectedUserId);
  }, [membersQuery.data, selectedUserId]);

  const duesList = duesQuery.data?.dues || [];
  const hasOpenDues = duesList.length > 0;
  const selectedDue = useMemo(() => duesList.find((d: any) => d._id === dueId) || duesList[0], [duesList, dueId]);

  const suggested = useMemo(() => {
    if (!selectedDue) return 0;
    for (const item of selectedDue.schedule || []) {
      if (item.status === "paid") continue;
      const base = (item.totalDue || 0) - (item.paid || 0);
      if (base > 0) return Math.round(base * 100 + Number.EPSILON) / 100;
    }
    return 0;
  }, [selectedDue]);

  useEffect(() => {
    if (hasOpenDues) {
      setMode("pay_due");
      if (duesList[0]?._id && !dueId) {
        setDueId(duesList[0]._id);
      }
    } else {
      setMode("simple");
    }
  }, [hasOpenDues, duesList]);

  useEffect(() => {
    if (mode === "pay_due" && suggested > 0) {
      setAmount(suggested.toFixed(2));
    } else if (mode === "simple") {
      setAmount("");
    }
  }, [mode, suggested]);

  // 3. Initiate payment checkout mutation
  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const raw = Number(amount);
      const effectiveAmt = isFinite(raw) && raw > 0 ? Math.round(raw * 100 + Number.EPSILON) / 100 : suggested;
      if (!selectedUserId) throw new Error("Please select your member profile");
      if (!effectiveAmt || effectiveAmt <= 0) throw new Error("Please enter a valid deposit amount");

      const res = await api.post("/payments/public-initiate", {
        userId: selectedUserId,
        amount: effectiveAmt,
        mode,
        dueId: mode === "pay_due" ? (dueId || selectedDue?._id) : undefined,
        note: mode === "pay_due" ? "Member Dues Payment" : "Member Deposit",
      });
      return res.data;
    },
    onSuccess: (data) => {
      if (data?.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    },
  });

  const generateShareLink = () => {
    const base = window.location.origin;
    const phone = selectedMember?.phone || "";
    return `${base}/pay?member=${phone || selectedUserId}`;
  };

  const copyPaymentLink = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const shareOnWhatsApp = () => {
    const link = generateShareLink();
    const name = selectedMember?.name || "Member";
    const text = encodeURIComponent(
      `Hi ${name}, here is your Community Savings payment link (${currencyCode}): ${link}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-[100dvh] bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between p-4 sm:p-6 md:p-10">
      <header className="max-w-xl mx-auto w-full flex items-center justify-between py-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-500/20">
            {currencySymbol}
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">{appName}</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Instant Online Contribution</p>
          </div>
        </div>
        <Link
          to="/login"
          className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-900 transition"
        >
          Member Login →
        </Link>
      </header>

      <main className="max-w-xl mx-auto w-full my-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-xl space-y-6"
        >
          {/* Step 1: Member Selection */}
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              1. Select Your Name / Profile
            </label>

            <Select
              className="h-12 text-sm font-semibold"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
            >
              <option value="">Choose your member profile…</option>
              {membersQuery.data?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} {m.phone ? `(${m.phone})` : ""}
                </option>
              ))}
            </Select>

            {selectedMember && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={shareOnWhatsApp}
                  className="text-xs font-semibold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-lg hover:bg-emerald-100 transition inline-flex items-center gap-1.5"
                >
                  💬 Share on WhatsApp
                </button>
                <button
                  type="button"
                  onClick={copyPaymentLink}
                  className="text-xs font-semibold px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 transition"
                >
                  {copiedLink ? "✓ Link Copied" : "🔗 Copy Direct Link"}
                </button>
              </div>
            )}
          </div>

          {/* Step 2: Payment Mode & Amount */}
          {selectedUserId && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.25 }}
              className="space-y-6 border-t border-slate-100 dark:border-slate-800 pt-6"
            >
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  2. Payment Purpose
                </label>

                {hasOpenDues ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ModeCard
                      title="Pay Open Due"
                      body="Settles upcoming loan installment."
                      active={mode === "pay_due"}
                      onClick={() => setMode("pay_due")}
                    />
                    <ModeCard
                      title="Direct Savings Deposit"
                      body="Adds directly to your savings pool."
                      active={mode === "simple"}
                      onClick={() => setMode("simple")}
                    />
                  </div>
                ) : (
                  <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-500 font-medium">
                    ✓ You have no overdue payments. This will be credited directly to your savings balance.
                  </div>
                )}
              </div>

              {mode === "pay_due" && hasOpenDues && (
                <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-semibold text-blue-900 dark:text-blue-200">Active Installment</span>
                    <span className="font-bold text-blue-700 dark:text-blue-300">
                      Suggested: {formatAmount(suggested, currencySymbol)}
                    </span>
                  </div>
                  {duesList.length > 1 && (
                    <Select
                      className="h-10 text-xs"
                      value={dueId || duesList[0]._id}
                      onChange={(e) => setDueId(e.target.value)}
                    >
                      {duesList.map((d: any) => (
                        <option key={d._id} value={d._id}>
                          Principal {formatAmount(d.principal, currencySymbol)} — {d.months} mo @ {d.monthlyRatePct}%
                        </option>
                      ))}
                    </Select>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Input
                  label={`Amount (${currencyCode})`}
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-12 text-lg font-bold"
                />
              </div>

              {/* Checkout Action */}
              <div className="pt-2">
                <Button
                  onClick={() => checkoutMutation.mutate()}
                  isLoading={checkoutMutation.isPending}
                  className="w-full h-14 text-base font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/20 rounded-2xl flex items-center justify-center gap-2"
                >
                  <span>Pay with bKash / Nagad / Online ({currencyCode})</span>
                  <span className="text-emerald-200">→</span>
                </Button>
                <p className="text-center text-xs text-slate-400 mt-2">
                  🔒 Secured with automated MFS verification
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </main>

      <footer className="max-w-xl mx-auto w-full text-center text-xs text-slate-400 py-4">
        {appName} · Powered by Paymently / UddoktaPay
      </footer>
    </div>
  );
}
