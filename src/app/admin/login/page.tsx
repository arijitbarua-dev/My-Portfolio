"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid authentication credentials.");
        setLoading(false);
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred during authentication.");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-lg p-6 sm:p-8 relative">
        
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722]" />
            <span className="font-heading text-sm uppercase tracking-wider text-[#111111]">
              ADMINISTRATIVE ACCESS
            </span>
          </div>
          <span className="bg-[#83E52B] text-[#111111] px-2 py-0.5 border border-black font-mono text-[10px] font-bold">
            BETTER-AUTH
          </span>
        </div>

        <div className="space-y-1 mb-6">
          <h1 className="font-heading text-2xl uppercase font-black text-[#111111]">
            Content Console
          </h1>
          <p className="font-sans text-xs text-[#555555]">
            Sign in to manage projects, technical skills, biography, and credentials.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-[#FF5722]/15 border-2 border-[#FF5722] flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-[#FF5722] shrink-0 mt-0.5" />
            <p className="font-mono text-xs text-[#111111] font-bold">{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@portfolio.local"
                className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-mono focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
              />
              <Mail className="w-4 h-4 text-[#555555] absolute right-3 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Security Key / Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] text-sm text-[#111111] font-mono focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
              />
              <Lock className="w-4 h-4 text-[#555555] absolute right-3 top-3.5" />
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              icon={<ArrowRight className="w-4 h-4 text-[#83E52B]" />}
              className="w-full"
            >
              {loading ? "Authenticating..." : "Unlock Dashboard"}
            </Button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#111111]/20 flex items-center justify-between font-mono text-[11px] text-[#555555]">
          <span>Protected Route</span>
          <span className="text-[#111111] font-bold">2026 // v2.0</span>
        </div>

      </div>
    </div>
  );
}

