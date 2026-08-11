"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { User } from "@/types";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; role: string }) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setIsLoading(false);
      return;
    }

    api
      .get("/api/auth/me")
      .then((res) => setUser(res.data.data))
      .catch(() => {
        Cookies.remove("token");
        setUser(null);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const refreshUser = async () => {
    const res = await api.get("/api/auth/me");
    setUser(res.data.data);
  };

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, user: loggedInUser } = res.data.data;

      Cookies.set("token", token, { expires: 7 });
      queryClient.clear();
      setUser(loggedInUser);
      redirectByRole(loggedInUser.role);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Login failed");
      throw err;
    }
  };

  const register = async (data: { name: string; email: string; password: string; role: string }) => {
    try {
      const res = await api.post("/api/auth/register", data);
      const { token, user: newUser } = res.data.data;

      Cookies.set("token", token, { expires: 7 });
      queryClient.clear();
      setUser(newUser);
      redirectByRole(newUser.role);
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Registration failed");
      throw err;
    }
  };

  const logout = () => {
    Cookies.remove("token");
    queryClient.clear();
    setUser(null);
    router.push("/auth/login");
  };

  const redirectByRole = (role: string) => {
    if (role === "ADMIN") router.push("/dashboard/admin");
    else if (role === "TECHNICIAN") router.push("/dashboard/technician");
    else router.push("/dashboard/customer");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}