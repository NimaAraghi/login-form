import axios from "axios";
import { createContext, useContext, useState, type ReactNode } from "react";

type User = {
  token: string;
  userId: string;
  username: string;
  isAdmin: boolean;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return null;
    return JSON.parse(storedUser);
  });

  const isAuthenticated = !!user;

  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post(
        "https://samad-crm-back.darkube.app/api/v2/auth/login",
        {
          username,
          password,
        }
      );

      if (res.status === 200) {
        const userData: User = {
          token: res.data.data.token,
          username: res.data.data.username,
          userId: res.data.data.userId,
          isAdmin: res.data.data.is_admin,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }

      alert(res.data.message);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
