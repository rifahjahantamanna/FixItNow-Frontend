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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  // On first load, if a token cookie exists, fetch the current user to restore session
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

  const login = async (email: string, password: string) => {
    const res = await api.post("/api/auth/login", { email, password });
    const { token, user: loggedInUser } = res.data.data;


    Cookies.set("token", token, { expires: 7 });
    queryClient.clear(); // wipe any previous user's cached data
    setUser(loggedInUser);

    

    redirectByRole(loggedInUser.role);
  };

  const register = async (data: { name: string; email: string; password: string; role: string }) => {
    const res = await api.post("/api/auth/register", data);
    const { token, user: newUser } = res.data.data;

    Cookies.set("token", token, { expires: 7 });
    queryClient.clear(); 
    setUser(newUser);

    redirectByRole(newUser.role);
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
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
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