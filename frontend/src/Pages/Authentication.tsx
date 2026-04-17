import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";
import { SignupForm } from "../Components/SignupForm";
import { useState } from "react";

type AuthenticationPageProps = {
  //isLoggedIn: boolean; 
}

function AuthenticationPage({ }: AuthenticationPageProps) {
  const [newUser, setNewUser] = useState("");
  
  return (
    <Page>
      <h1>Sign In</h1>
      <AuthenticationForm />
      <h2>Don't have an account?</h2>
      <SignupForm />
    </Page>
  );
}

export default AuthenticationPage;
