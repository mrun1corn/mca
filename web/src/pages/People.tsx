import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/api";
import { SearchIcon } from "../components/Icon";
import { useState } from "react";
import EditMember from "../components/EditMember";
import { useToast } from "../components/Toast";

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
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative w-full sm:w-80">
          <input className="border p-2 rounded w-full pl-8" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"><SearchIcon/></div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 shadow rounded animate-fade-in">
        <div className="font-medium mb-2">Add Member</div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
          <input className="border p-2 rounded w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border p-2 rounded w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <select className="border p-2 rounded w-full bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="user">user</option>
            <option value="accountant">accountant</option>
            <option value="admin">admin</option>
          </select>
          <button disabled={!isAdmin} title={isAdmin?"":"Admin only"} className="bg-blue-600 disabled:bg-blue-400 text-white px-3 py-2 rounded transition-transform active:scale-[0.98] w-full" onClick={() => create.mutate({ ...form, password: "ChangeMe123!" })}>Create</button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 shadow rounded animate-fade-in">
        <div className="font-medium mb-2">Members</div>
        <table className="w-full text-sm">
          <thead><tr><th className="text-left">Name</th><th className="text-left">Email</th><th>Role</th><th></th></tr></thead>
          <tbody>
            {data?.map((u: any) => (
              <Row key={u.id} u={u} canManage={!!isAdmin} onDelete={() => remove.mutate(u.id)} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ u, canManage, onDelete }: { u: any; canManage: boolean; onDelete: () => void }) {
  const qc = useQueryClient();
  const [editing, setEditing] = useState(false);
  return (
    <tr className="border-t">
      <td>{u.name}</td>
      <td>{u.email}</td>
      <td className="text-center">{u.role}</td>
      <td className="text-right space-x-2">
        <button className="text-blue-600 hover:opacity-80 disabled:text-gray-400" disabled={!canManage} onClick={() => setEditing(true)}>Edit</button>
        <button className="text-red-600 hover:opacity-80 disabled:text-gray-400" disabled={!canManage} onClick={onDelete}>Delete</button>
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
