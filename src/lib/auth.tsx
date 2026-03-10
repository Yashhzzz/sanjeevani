import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "citizen" | "asha" | "hospital";

interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const DEMO_ACCOUNTS: Record<UserRole, AuthUser> = {
  citizen: { email: "citizen@demo.sanjeevani.health", role: "citizen", name: "Demo Citizen" },
  asha: { email: "asha@demo.sanjeevani.health", role: "asha", name: "Sunita Devi (ASHA)" },
  hospital: { email: "hospital@demo.sanjeevani.health", role: "hospital", name: "Guwahati Med Centre" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("sanjeevani_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("sanjeevani_user");
      }
    }
  }, []);

  const login = async (email: string, _password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 900));
    const authUser: AuthUser = { email, role, name: DEMO_ACCOUNTS[role].name };
    setUser(authUser);
    localStorage.setItem("sanjeevani_user", JSON.stringify(authUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("sanjeevani_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export { DEMO_ACCOUNTS };
