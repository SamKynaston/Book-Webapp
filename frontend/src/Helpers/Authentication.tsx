import { User } from "@bookwebapp/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
};

export async function AuthenticateUser(email: string, password: string) {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/v1/users/authenticate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Authentication failed:", error);
        throw new Error("Authentication failed");
    }
}

export async function checkAuth() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const res = await fetch(`${apiUrl}/v1/users/me`, {
    credentials: "include",
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) return null;

  console.log(data);
  return data;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  loading: true,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth()
    .then((data) => {
      console.log(data)
      if (!data) {
        setUser(null);
        setAuthenticated(false);
      } else {
        setUser(data.user);
        setAuthenticated(data.authenticated);
      }
    })
    .catch((err) => {
      console.error("Auth check failed:", err);
      setUser(null);
      setAuthenticated(false);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);