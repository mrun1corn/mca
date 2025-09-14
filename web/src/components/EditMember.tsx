import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useToast } from "./Toast";
import Button from "./Button";

type UserRow = { id: string; name: string; email?: string; phone?: string; role: "admin"|"accountant"|"user"; status?: "active"|"inactive" };

export default function EditMember({ user, onClose, onSaved }: { user: UserRow; onClose: () => void; onSaved: () => void }) {
  const { notify } = useToast();
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    role: user.role || "user",
    status: (user.status as any) || "active",
    password: "",
  });

  useEffect(() => {
    setForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      role: user.role || "user",
      status: (user.status as any) || "active",
      password: "",
    });
  }, [user]);

  const mutation = useMutation({
    mutationFn: () => api.patch(`/users/${user.id}`, {
      name: form.name,
      email: form.email || undefined,
      phone: form.phone || undefined,
      role: form.role,
      status: form.status,
      password: form.password || undefined,
    }),
    onSuccess: () => { notify("Member updated", "success"); onSaved(); },
    onError: () => notify("Update failed", "error"),
  });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="w-[calc(100%-1rem)] sm:w-full max-w-md max-h-[90vh] overflow-y-auto glass p-3 sm:p-4 rounded" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3">
          <div className="font-semibold">Edit Member</div>
          <button className="text-sm text-gray-600 hover:opacity-80" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-2 text-sm">
          <input className="input w-full" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input w-full" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input w-full" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <div className="grid grid-cols-2 gap-2">
            <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value as any })}>
              <option value="user">user</option>
              <option value="accountant">accountant</option>
              <option value="admin">admin</option>
            </select>
            <select className="input" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as any })}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
          <input type="password" className="input w-full" placeholder="New password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>
        <div className="mt-3 flex justify-between gap-2">
          <Button variant="danger" onClick={async () => { try { await api.delete(`/users/${user.id}`); notify("Member deleted", "success"); onSaved(); onClose(); } catch { notify("Delete failed", "error"); } }}>Delete</Button>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button disabled={mutation.isPending} onClick={() => mutation.mutate()}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
