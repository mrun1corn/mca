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
import Spinner from "../components/ui/Spinner";

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
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); notify("Member created", "success"); },
    onError: () => notify("Create failed", "error"),
  });
  const remove = useMutation({
    mutationFn: (id: string) => api.delete(`/users/${id}`),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["users"] }); notify("Member deleted", "success"); },
    onError: () => notify("Delete failed", "error"),
  });
  const me = useQuery({ queryKey: ["me"], queryFn: async () => (await api.get("/me")).data });
  const isAdmin = me.data?.role === "admin";

  const [form, setForm] = useState({ name: "", email: "", role: "user" });
  const [editingUser, setEditingUser] = useState<any | null>(null);
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <div className="relative w-full sm:w-96">
          <input
            className="input w-full pl-9 h-11"
            placeholder="Search members by name or email"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500">
            <SearchIcon className="w-4 h-4" />
          </div>
        </div>
        {isFetching && !isLoading ? (
          <div className="animate-fade-in"><Spinner label="Refreshing list…" /></div>
        ) : null}
      </div>
      {editingUser && (
        <EditMember
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => { setEditingUser(null); qc.invalidateQueries({ queryKey: ["users"] }); }}
        />
      )}
      <Panel
        title="Add a new member"
        description="Admins can add people to the collective with optional contact details."
        actions={
          <Button
            disabled={!isAdmin || !form.name.trim()}
            title={isAdmin ? undefined : "Admin only"}
            onClick={() => create.mutate({ ...form, password: "ChangeMe123!" })}
          >
            Save member
          </Button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <input
            className="input w-full"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="input w-full"
            placeholder="Email (optional)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select className="input w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">User</option>
            <option value="accountant">Accountant</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </Panel>
      <Panel
        title="Members"
        description={isLoading ? "Loading members…" : `${users.length} member${users.length === 1 ? "" : "s"}`}
      >
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="rounded-xl border border-blue-100/70 dark:border-slate-700 bg-gradient-to-br from-white via-white to-blue-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 animate-pulse h-28" />
            ))}
          </div>
        ) : users.length ? (
          <div className="max-h-[440px]">
            <VirtualList
              items={users}
              itemHeight={120}
              height={Math.min(440, Math.max(180, users.length * 120))}
              render={(user: any) => (
                <UserCard user={user} onEdit={() => setEditingUser(user)} onDelete={() => remove.mutate(user.id)} />
              )}
              keyExtractor={(user: any) => user.id}
            />
          </div>
        ) : (
          <div className="text-sm text-gray-500 dark:text-gray-400">No members found. Try adjusting your search.</div>
        )}
      </Panel>
    </div>
  );
}
