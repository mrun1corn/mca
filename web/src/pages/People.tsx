import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { SearchIcon } from "../components/Icon";
import { useState } from "react";
import EditMember from "../components/EditMember";
import UserCard from "../components/UserCard";
import { useToast } from "../components/Toast";
import Button from "../components/Button";

export default function People() {
  const qc = useQueryClient();
  const { notify } = useToast();
  const [q, setQ] = useState("");
  const { data } = useQuery({ queryKey: ["users", q], queryFn: async () => (await api.get(`/users?q=${encodeURIComponent(q)}`)).data });
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
      <div className="flex gap-2">
        <div className="relative w-full sm:w-80">
          <input className="input w-full pl-9 h-10" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"><SearchIcon className="w-4 h-4"/></div>
        </div>
      </div>
      {editingUser && (
        <EditMember
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={() => { setEditingUser(null); qc.invalidateQueries({ queryKey: ["users"] }); }}
        />
      )}
      <div className="glass p-3 rounded animate-fade-in">
        <div className="font-medium mb-2">Add Member</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input className="input w-full" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input w-full" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="input w-full" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">user</option>
            <option value="accountant">accountant</option>
            <option value="admin">admin</option>
          </select>
          <Button disabled={!isAdmin} title={isAdmin?"":"Admin only"} className="w-full" onClick={() => create.mutate({ ...form, password: "ChangeMe123!" })}>Create</Button>
        </div>
      </div>
      <div className="glass p-3 rounded animate-fade-in">
        <div className="font-medium mb-2">Members</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.map((u: any) => (
            <UserCard key={u.id} user={u} onEdit={() => setEditingUser(u)} onDelete={() => remove.mutate(u.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ u, canManage, onDelete }: { u: any; canManage: boolean; onDelete: () => void }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  return (
    <tr className="border-t hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors">
      <td>{u.name}</td>
      <td>{u.email}</td>
      <td className="text-center">{u.role}</td>
      <td className="text-right space-x-2">
        <Button variant="ghost" size="sm" disabled={!canManage} onClick={() => setEditing(true)}>Edit</Button>
        <Button variant="danger" size="sm" disabled={!canManage} onClick={onDelete}>Delete</Button>
        {editing && (
          <EditMember
            user={u}
            onClose={() => setEditing(false)}
            onSaved={() => { setEditing(false); qc.invalidateQueries({ queryKey: ["users"] }); }}
          />
        )}
      </td>
    </tr>
  );
}
