import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

export type UserRole = "citizen" | "asha" | "hospital";

interface AuthUser {
  email: string;
  role: UserRole;
  name: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
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
  const [isLoading, setIsLoading] = useState(true); // start loading while checking session

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          const appId = import.meta.env.VITE_FIREBASE_APP_ID;
          if (appId) {
            const docRef = doc(db, `personalData/${appId}/users/${firebaseUser.uid}/profile/details`);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              const data = docSnap.data();
              setUser({ email: firebaseUser.email!, role: data.role as UserRole, name: data.name });
            } else {
              setUser(null);
            }
          }
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user profile", err);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string, role: UserRole): Promise<void> => {
    setIsLoading(true);
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      
      const appId = import.meta.env.VITE_FIREBASE_APP_ID;
      if (!appId) throw new Error("Firebase configuration error");

      const docRef = doc(db, `personalData/${appId}/users/${firebaseUser.uid}/profile/details`);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.role !== role) {
          await signOut(auth);
          throw new Error("Invalid role for this account. Please select the correct role tab.");
        }
        setUser({ email: firebaseUser.email!, role: data.role as UserRole, name: data.name });
      } else {
        await signOut(auth);
        throw new Error("User profile not found.");
      }
    } catch (err: any) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        throw new Error("Invalid email or password.");
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
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
