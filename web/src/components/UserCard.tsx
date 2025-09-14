import Button from "./Button";

export default function UserCard({ user, onEdit, onDelete }: { user: any; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="card flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium leading-tight">{user.name}</div>
          <div className="text-xs text-gray-500">{user.email || "No email"}</div>
          <div className="text-xs text-gray-500 capitalize">Role: {user.role}</div>
        </div>
      </div>
      <div className="flex gap-2 justify-end pt-1">
        <Button variant="ghost" size="sm" onClick={onEdit}>Edit</Button>
        <Button variant="danger" size="sm" onClick={onDelete}>Delete</Button>
      </div>
    </div>
  );
}

