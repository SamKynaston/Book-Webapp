import type { JSX } from "react";
import type { PageProps } from "@bookwebapp/types";
import { useAuth } from "../Helpers/Authentication";
import { Navigate } from "react-router-dom";

function Page({ children, requiresAccount, requiredPermission }: PageProps): JSX.Element {

  const { user, hasPermission } = useAuth();

  if (requiresAccount && !user) {
    return <Navigate to="/login" />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    if (!user) {
      return <Navigate to="/login" />;
    } else {
      return <div className="Content">You do not have permission to view this content.</div>;
    }
  }

  return <div className="Content">{children}</div>;
}

export default Page;
