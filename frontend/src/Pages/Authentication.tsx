import { Form, Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";

type AuthenticationPageProps = {
  //isLoggedIn: boolean; 
}

function AuthenticationPage({ }: AuthenticationPageProps) {
  return (
    <Page>
      <h1>Authentication</h1>
      <AuthenticationForm />
    </Page>
  );
}

export default AuthenticationPage;
