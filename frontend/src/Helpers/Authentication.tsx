import { User } from "@bookwebapp/types";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  login?: (email: string, password: string) => Promise<void>;
  hasPermission: (permissionName: string) => boolean;
  logout?: () => Promise<void>;
  signup?: (email: string, username: string, password: string) => Promise<void>;
};

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
  hasPermission: () => false,
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.roles?.some((role: any) =>
    role.permissions?.some((p: any) => p.permission_string === "ADMINISTRATOR")
  );

  const hasPermission = (permissionName: string) => {
    if (!user || !user.roles) return false;
    if (isAdmin) return true;

    return user.roles.some((role: any) => 
      role.permissions?.some((p: any) => p.permission_string === permissionName)
    );
  };

  const logout = async () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    await fetch(`${apiUrl}/v1/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    
    setUser(null);
    setAuthenticated(false);
  }

  const signup = async (email: string, username: string, password: string) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/v1/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              email: email, 
              username: username, 
              password: password 
            }),
            credentials: "include"
        });

        if (res.ok) {
          await checkAuth().then((data) => {
            if (!data) return;

            setUser(data.user);
            setAuthenticated(data.authenticated);
          });
        } else {
          throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error("Authentication failed");
    }
  }

  const login = async (email: string, password: string) => {
    try {
        const apiUrl = import.meta.env.VITE_API_URL;

        const res = await fetch(`${apiUrl}/v1/users/authenticate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
            credentials: "include"
        });

        if (res.ok) {
          await checkAuth().then((data) => {
            if (!data) return;

            setUser(data.user);
            setAuthenticated(data.authenticated);
          });
        } else {
          throw new Error("Login failed");
        }
    } catch (error) {
        throw new Error("Authentication failed");
    }
  }

  useEffect(() => {
    checkAuth().then((data) => {
      if (!data) {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
      } else {
        setUser(data.user);
        setAuthenticated(data.authenticated);
      }
    })
    .catch((err) => {
      setUser(null);
      setAuthenticated(false);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, authenticated, loading, login, hasPermission, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);