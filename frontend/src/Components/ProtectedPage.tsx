import type { JSX } from "react";
import type { PageProps } from "@bookwebapp/types";
import { useAuth } from "../Helpers/Authentication";
import { Navigate } from "react-router-dom";

function Page({ children }: PageProps): JSX.Element {
  const { authenticated, loading } = useAuth();

  console.log(authenticated, loading)

  if (loading) return <p>Loading...</p>;

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div className="Content">{children}</div>;
}

export default Page;
