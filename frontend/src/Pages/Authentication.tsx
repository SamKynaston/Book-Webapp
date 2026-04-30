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
      <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 md:max-w-3/4">
        <div className="">
          <h1>Sign into your account</h1>
          <AuthenticationForm />
        </div>

        <div className="w-px hidden md:block bg-stone-900"></div>

        <div className="">
          <h1>Create a new account</h1>
          <SignupForm />
        </div>
      </div>
    </Page>
  );
}

export default AuthenticationPage;
