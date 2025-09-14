import { useState } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await api.post("/auth/login", { identifier, password });
      navigate("/");
    } catch (e: any) {
      setError(e?.response?.data?.error || "Login failed");
    }
  };

  

  return (
    <div className="max-w-sm mx-auto glass p-6 rounded mt-10 animate-fade-in">
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={identifier} onChange={(e) => setIdentifier(e.target.value)} placeholder="Email or Username" className="w-full input" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full input" />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <Button className="w-full">Sign in</Button>
      </form>
      
    </div>
  );
}
