import { Form, Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";

type AuthenticationPageProps = {
  isLoggedIn: boolean; 
}

function AuthenticationPage({ isLoggedIn }: AuthenticationPageProps) {
  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Page>
      <h1>Authentication</h1>
      <AuthenticationForm />
    </Page>
  );
}

export default AuthenticationPage;
