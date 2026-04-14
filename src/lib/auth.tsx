"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  role: "PRIVATE" | "DEALER";
  createdAt: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (data: RegisterData) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<AuthUser>) => void;
}

interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

interface StoredUser extends AuthUser {
  passwordHash: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

const USERS_KEY = "bilmatch_users";
const SESSION_KEY = "bilmatch_session";

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function simpleHash(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return "h" + Math.abs(hash).toString(36);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionId = localStorage.getItem(SESSION_KEY);
    if (sessionId) {
      const users = getStoredUsers();
      const found = users.find((u) => u.id === sessionId);
      if (found) {
        const { passwordHash, ...userData } = found;
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  function login(email: string, password: string) {
    const users = getStoredUsers();
    const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      return { success: false, error: "Ingen bruger fundet med denne email." };
    }
    if (found.passwordHash !== simpleHash(password)) {
      return { success: false, error: "Forkert password." };
    }
    const { passwordHash, ...userData } = found;
    setUser(userData);
    localStorage.setItem(SESSION_KEY, found.id);
    return { success: true };
  }

  function register(data: RegisterData) {
    const users = getStoredUsers();
    if (users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { success: false, error: "Der findes allerede en bruger med denne email." };
    }
    const newUser: StoredUser = {
      id: "user-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: data.name,
      email: data.email,
      phone: data.phone,
      city: "",
      role: "PRIVATE",
      createdAt: new Date().toISOString(),
      passwordHash: simpleHash(data.password),
    };
    users.push(newUser);
    saveStoredUsers(users);
    const { passwordHash, ...userData } = newUser;
    setUser(userData);
    localStorage.setItem(SESSION_KEY, newUser.id);
    return { success: true };
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
  }

  function updateProfile(data: Partial<AuthUser>) {
    if (!user) return;
    const users = getStoredUsers();
    const index = users.findIndex((u) => u.id === user.id);
    if (index >= 0) {
      users[index] = { ...users[index], ...data };
      saveStoredUsers(users);
    }
    setUser({ ...user, ...data });
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
