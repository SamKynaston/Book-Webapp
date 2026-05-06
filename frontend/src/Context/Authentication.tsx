import { User } from "@bookwebapp/types";
import { createContext, useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { apiFetch } from "../Utilities/Fetch.utilities";

type AuthContextType = {
  user: User | null;
  authenticated: boolean;
  loading: boolean;
  forceReset: boolean;
  hasPermission: (permissionName: string) => boolean;
  refreshUser: () => Promise<void>;
};

export async function checkAuth(): Promise<{ body: User, success: boolean, forceReset?: boolean; } | null> {
  const apiUrl = import.meta.env.VITE_API_URL;
  
  const res = await apiFetch(`v1/users/me`, { credentials: "include" });

  const data = await res.json()
  if (!res.ok && res.status !== 403) return null;
  
  return data;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  authenticated: false,
  loading: true,
  forceReset: false,
  hasPermission: () => false,
  refreshUser: async () => {},
});

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [forceReset, setForceReset] = useState(false);

  const authRequestId = useRef(0);

  // Function to check if a user has admin-level permissions
  const isAdmin = user?.roles?.some((role: any) =>
    role.permissions?.some((p: any) => p.permission_string === "ADMINISTRATOR")
  );

  // Function to check if a user has a specified permission, should use the permissionName type but sadly does not.
  const hasPermission = (permissionName: string) => {
    if (!user || !user.roles) return false;
    if (isAdmin) return true;

    return user.roles.some((role: any) => 
      role.permissions?.some((p: any) => p.permission_string === permissionName)
    );
  };

  // Confirms the user's identity by calling the /me route on the API, if in a forceReset state, makes it clear and forces user to always redirect to /reset-password
  const refreshUser = async () => {
    const requestId = ++authRequestId.current;

    setLoading(true)

    const data = await checkAuth();

    if (!data) {
      setUser(null);
      setAuthenticated(false);
      setForceReset(false);
      setLoading(false);
      return;
    }

    if (data.forceReset) {
      setUser(data.body);
      setAuthenticated(false);
      setForceReset(true);
      setLoading(false);
      return;
    }

    setUser(data.body);
    setAuthenticated(data.success);
    setForceReset(false);
    setLoading(false);
  };

  // Check's the user's identity every time the page changes. Contains a lot of repeated code byt works otherwise.
  useEffect(() => {
    setUser(null);
    setAuthenticated(false);
    setLoading(true);

    checkAuth().then((data) => {
      if (!data) {
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
        setForceReset(false);

        return;
      }

      if (data.forceReset) {
        setUser(data.body);
        setAuthenticated(false);
        setForceReset(true);

        return;
      }

      setUser(data.body);
      setAuthenticated(data.success);
      setForceReset(false);
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
    <AuthContext.Provider value={{ user, authenticated, forceReset, loading, hasPermission, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);