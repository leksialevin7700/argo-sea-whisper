import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import oceanHero from '@/assets/ocean-hero.jpg';
import { login, registerUser } from "@/lib/auth";

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        await registerUser(name, email, password);
      }
      navigate("/");
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-surface-gradient">
      {/* Hero Section */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={oceanHero}
          alt="ARGO Ocean Data Visualization"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-ocean-gradient opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2 float-animation">FloatChat</h1>
            <p className="text-white/90">AI-Powered ARGO Ocean Data Explorer</p>
          </div>
        </div>
      </div>

      {/* Auth Card */}
      <div className="flex items-center justify-center p-4">
        <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{mode === "login" ? "Sign in" : "Create account"}</CardTitle>
          <CardDescription>Access your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "register" && (
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            )}
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
            </Button>
            <Button type="button" variant="ghost" className="w-full" onClick={() => setMode(mode === "login" ? "register" : "login")}> 
              {mode === "login" ? "Need an account? Register" : "Have an account? Sign in"}
            </Button>
          </form>
        </CardContent>
        </Card>
      </div>
    </div>
  );
}



