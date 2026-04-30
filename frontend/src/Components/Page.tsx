import type { JSX } from "react";
import type { PageProps } from "@bookwebapp/types";
import { useAuth } from "../Context/Authentication";
import { Navigate } from "react-router-dom";
import Error from "../Pages/Error";

function Page({ children, requiresAccount, requiredPermission }: PageProps): JSX.Element | null {

  const { user, hasPermission, loading } = useAuth();

  if (!loading) {
    if (requiresAccount && !user) {
      return <Navigate to="/login" />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      if (!user) {
        return <Navigate to="/login" />;
      } else {
        return <Error code={403}/>;
      }
    }
    
    return <div className="Content">{children}</div>;
  }

  return null;
}

export default Page;
