import { User } from "@bookwebapp/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { apiFetch } from "../Utilities/Fetch.utilities";

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  hasPermission: (permissionName: string) => boolean;
  refreshUser: () => Promise<void>;
};

export async function checkAuth(): Promise<{ body: User, success: boolean  } | null> {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const res = await apiFetch(`v1/users/me`, { credentials: "include" });

  const data = await res.json()
  if (!res.ok) return null;
  
  return data;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  loading: true,
  hasPermission: () => false,
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const authRequestId = useRef(0);

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

  const refreshUser = async () => {
    const requestId = ++authRequestId.current;

    setLoading(true)

    const data = await checkAuth();

    if (requestId !== authRequestId.current) return;

    if (!data) {
      setUser(null);
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    setUser(data.body);
    setAuthenticated(data.success);
    setLoading(false);
  };

  useEffect(() => {
    setUser(null);
    setAuthenticated(false);
    setLoading(true);

    checkAuth().then((data) => {
      if (!data) {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
      } else {
        setUser(data.body);
        setAuthenticated(data.success);
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
    <AuthContext.Provider value={{ user, authenticated, loading, hasPermission, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);