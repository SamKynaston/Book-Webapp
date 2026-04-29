import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";
import { SignupForm } from "../Components/SignupForm";
import { useState } from "react";

type CreateAccountPageProps = {
  //isLoggedIn: boolean; 
}

function CreateAccountPage({ }: CreateAccountPageProps) {  
  return (
    <Page>
      <h1>Sign Up</h1>
      <SignupForm />
    </Page>
  );
}

export default CreateAccountPage;
