"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/lib/context";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<"client" | "provider">("client");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    login(email, role);
    router.push("/home");
  };

  return (
    <div className="flex min-h-screen flex-col bg-white px-6 py-12">
      <Link href="/" className="mb-8 flex items-center text-gray-600 hover:text-black">
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back
      </Link>
      <div className="mx-auto w-full max-w-md space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-black">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Role</p>
            <div className="flex gap-4 rounded-xl border border-gray-300 p-1">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  role === "client" ? "bg-black text-white" : "bg-transparent text-gray-600"
                }`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                  role === "provider" ? "bg-black text-white" : "bg-transparent text-gray-600"
                }`}
              >
                Service Provider
              </button>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-xl border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-xl border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="rounded-xl border-gray-300"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button
            type="submit"
            className="w-full rounded-xl bg-black px-8 py-6 text-base font-semibold text-white hover:bg-gray-800"
          >
            Create Account
          </Button>
        </form>
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-black">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
