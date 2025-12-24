"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type UserRole = "client" | "provider" | null;
type AuthState = {
  isAuthenticated: boolean;
  role: UserRole;
  email: string | null;
};

const AuthContext = createContext<{
  auth: AuthState;
  login: (email: string, role: UserRole) => void;
  logout: () => void;
} | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    email: null,
  });

  const login = (email: string, role: UserRole) => {
    setAuth({
      isAuthenticated: true,
      role,
      email,
    });
  };

  const logout = () => {
    setAuth({
      isAuthenticated: false,
      role: null,
      email: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

