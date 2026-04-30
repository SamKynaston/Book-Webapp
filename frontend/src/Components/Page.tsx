import type { JSX } from "react";
import type { PageProps } from "@bookwebapp/types";
import { useAuth } from "../Context/Authentication";
import { Navigate, useLocation } from "react-router-dom";
import Error from "../Pages/Error";

function Page({ children, requiresAccount, requiredPermission, allowPasswordReset }: PageProps): JSX.Element | null {
  const { user, forceReset, hasPermission, loading } = useAuth();
  const location = useLocation();

  if (!loading) {
    if (forceReset) {
      if (location.pathname !== "/password-reset") {
        return <Navigate to="/password-reset" replace />;
      }

      return <div className="Content">{children}</div>;
    }

    if (requiresAccount && !user) {
      return <Navigate to="/login" replace />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
      if (!user) {
        return <Navigate to="/login" replace />;
      } else {
        return <Error code={403} />;
      }
    }
      
    return <div className="Content">{children}</div>;
  }
  
  return null;
}

export default Page;
