import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { SearchIcon } from "../components/Icon";
import { useDeferredValue, useState } from "react";
import EditMember from "../components/EditMember";
import UserCard from "../components/UserCard";
import { useToast } from "../components/Toast";
import Button from "../components/Button";
import Panel from "../components/ui/Panel";
import PageHeader from "../components/layout/PageHeader";
import { Modal } from "../components/ui/Modal";
import { SkeletonCard } from "../components/Skeleton";

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
  const [starterCredential, setStarterCredential] = useState<{ name: string; password: string } | null>(null);
  const create = useMutation({
    mutationFn: (body: { name: string; email: string; role: string }) => api.post("/users", body),
    onSuccess: (res, variables) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      const password = (res.data as { starterPassword?: string }).starterPassword;
      if (password) setStarterCredential({ name: variables.name, password });
      notify("Member created", "success");
      setForm({ name: "", email: "", role: "user" });
    },
    onError: () => notify("Create failed", "error"),
  });
  const [confirmDeleteUser, setConfirmDeleteUser] = useState<any | null>(null);

  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: (res) => {
      qc.invalidateQueries({ queryKey: ["users"] });
      if (res.data?.deactivated) {
        notify("Member deactivated — financial records preserved", "success");
      } else {
        notify("Member deleted", "success");
      }
      setConfirmDeleteUser(null);
    },
    onError: () => notify("Delete failed", "error"),
  });
  const me = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await api.get("/me")).data,
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
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

      {starterCredential ? (
        <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-900/20 dark:text-amber-200">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-semibold">Starter password for {starterCredential.name}</div>
              <div className="mt-1 font-mono text-base select-all">{starterCredential.password}</div>
              <div className="mt-1 text-xs opacity-80">
                Shown once. The member must change it at first sign-in.
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => navigator.clipboard?.writeText(starterCredential.password)}
              >
                Copy
              </Button>
              <Button variant="secondary" onClick={() => setStarterCredential(null)}>
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <Panel
        title="Add someone new"
        description="Admins can invite new members or staff. We’ll auto-generate a starter password unless you provide one."
        actions={
          <Button
            disabled={!isAdmin || !form.name.trim()}
            title={isAdmin ? undefined : "Admin only"}
            onClick={() => create.mutate({ ...form })}
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
              <SkeletonCard key={idx} lines={2} />
            ))}
          </div>
        ) : users.length ? (
          <div className="max-h-[460px] overflow-auto space-y-3 pr-1">
            {users.map((user: any) => (
              <UserCard key={user.id} user={user} onEdit={() => setEditingUser(user)} onDelete={() => setConfirmDeleteUser(user)} />
            ))}
          </div>
        ) : (
          <div className="text-sm text-slate-500 dark:text-slate-400">No members found. Try adjusting your search.</div>
        )}
      </Panel>

      <Modal
        isOpen={Boolean(confirmDeleteUser)}
        title={confirmDeleteUser ? `Delete ${confirmDeleteUser.name}?` : "Delete Member"}
        onClose={() => setConfirmDeleteUser(null)}
      >
        {confirmDeleteUser && (
          <div className="text-sm text-slate-600 dark:text-slate-300 space-y-4">
            <p>
              Are you sure you want to delete <strong>{confirmDeleteUser.name}</strong>?
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Note: If this member has financial history (deposits, withdrawals, or dues), their profile will be deactivated rather than permanently erased to preserve the community audit trail.
            </p>
            <div className="flex gap-2 justify-end pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="secondary" onClick={() => setConfirmDeleteUser(null)}>
                Cancel
              </Button>
              <Button
                variant="danger"
                isLoading={remove.isPending}
                onClick={() => remove.mutate(confirmDeleteUser.id)}
              >
                Confirm Delete
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
