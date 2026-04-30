import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";
import { SignupForm } from "../Components/SignupForm";
import { useState } from "react";

type AuthenticationPageProps = {
  //isLoggedIn: boolean; 
}

function AuthenticationPage({ }: AuthenticationPageProps) {  
  return (
    <Page>
      <div className="md:gap-24 md:grid md:grid-cols-2 md:max-w-3/4">
        <div className="">
          <h1>Sign into your account</h1>
          <AuthenticationForm />
        </div>

        <div className="inline-block h-[250px] min-h-[1em] w-0.5 self-stretch"></div>

        <div className="">
          <h1>Create a new account</h1>
          <SignupForm />
        </div>
      </div>
    </Page>
  );
}

export default AuthenticationPage;
