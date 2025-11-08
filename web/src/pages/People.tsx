import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { SearchIcon } from "../components/Icon";
import { useDeferredValue, useState } from "react";
import EditMember from "../components/EditMember";
import UserCard from "../components/UserCard";
import { useToast } from "../components/Toast";
import Button from "../components/Button";
import Panel from "../components/ui/Panel";
import VirtualList from "../components/ui/VirtualList";
import PageHeader from "../components/layout/PageHeader";

export default function People() {
  const qc = useQueryClient();
  const STALE_TIME = 30_000;
  const { notify } = useToast();
  const [q, setQ] = useState("");
  const deferredSearch = useDeferredValue(q);
  const {
    data: users = [],
    isLoading,
    isFetching,
  } = useQuery<any[]>({
    queryKey: ["users", deferredSearch],
    queryFn: async () => (await api.get(`/users?q=${encodeURIComponent(deferredSearch)}`)).data,
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });
  const create = useMutation({
    mutationFn: (body: any) => api.post("/users", body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      notify("Member created", "success");
      setForm({ name: "", email: "", role: "user" });
    },
    onError: () => notify("Create failed", "error"),
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
      notify("Member deleted", "success");
    },
    onError: () => notify("Delete failed", "error"),
  });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const isAdmin = me.data?.role === "admin";

  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [editingUser, setEditingUser] = useState<any | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="People"
        title="Everyone who touches the money, in one tidy list"
        description="Keep names, roles, and contact info current so you always know who can approve deposits, run withdrawals, or just needs a balance update."
      />

      <div className="flex flex-col gap-3">
        <div className="relative w-full sm:w-96">
          <input
            className="input w-full pl-9 h-12"
            placeholder="Search by name or email"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon className="w-4 h-4" />
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Searches apply instantly. Use at least three letters for the best match.
        </p>
        {isFetching && !isLoading ? <div className="text-xs text-slate-500">Refreshing list…</div> : null}
      </div>

      {editingUser && (
        <EditMember
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => {
            setEditingUser(null);
            qc.invalidateQueries({ queryKey: ["users"] });
          }}
        />
      )}

      <Panel
        title="Add someone new"
        description="Admins can invite new members or staff. We’ll auto-generate a starter password unless you provide one."
        actions={
          <Button
            disabled={!isAdmin || !form.name.trim()}
            title={isAdmin ? undefined : "Admin only"}
            onClick={() => create.mutate({ ...form, password: "ChangeMe123!" })}
          >
            Add member
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Full name</label>
            <input
              className="input w-full"
              placeholder="e.g. Tania Rahman"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Email (optional)</label>
            <input
              className="input w-full"
              placeholder="name@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-600 dark:text-slate-300">Role</label>
            <select className="input w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="user">Member (saver/borrower)</option>
              <option value="accountant">Accountant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
      </Panel>

      <Panel
        title="Everyone in the circle"
        description={
          isLoading
            ? "Loading members…"
            : `${users.length} member${users.length === 1 ? "" : "s"} match your search`
        }
      >
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-blue-100/70 dark:border-slate-700 bg-gradient-to-br from-white via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 animate-pulse h-28"
              />
            ))}
          </div>
        ) : users.length ? (
          <div className="max-h-[460px]">
            <VirtualList
              items={users}
              itemHeight={120}
              height={Math.min(460, Math.max(180, users.length * 120))}
              render={(user: any) => (
                <UserCard user={user} onEdit={() => setEditingUser(user)} onDelete={() => remove.mutate(user.id)} />
              )}
              keyExtractor={(user: any) => user.id}
            />
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400">No members found. Try adjusting your search.</div>
        )}
      </Panel>
    </div>
  );
}
