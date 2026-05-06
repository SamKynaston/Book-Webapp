import type { JSX } from "react";
import type { PageProps } from "@bookwebapp/types";
import { useAuth } from "../Context/Authentication";
import { Navigate, useLocation } from "react-router-dom";
import Error from "../Pages/Error";

function Page({ children, requiresAccount, requiredPermission, allowPasswordReset }: PageProps): JSX.Element | null {
  const { user, forceReset, hasPermission, loading } = useAuth();
  const location = useLocation();

  if (!loading) {
    // If the account is in a force password reset state, then always navigate to /password-reset regardless of the user's current context
    if (forceReset) {
      if (location.pathname !== "/password-reset") {
        return <Navigate to="/password-reset" replace />;
      }

      return <div className="Content">{children}</div>;
    }

    // If an account requires a page and the user isn't currently signed in, then navigate to login
    if (requiresAccount && !user) {
      return <Navigate to="/login" replace />;
    }

    // If a page requires a specific permission the user lacks, then return to the error page or login if not authenticated
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
