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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 md:gap-16 md:max-w-3/4">
        <div className="text-center">
          <h1 className="text-2xl mb-2">Sign into your account</h1>
          <AuthenticationForm /> { /* Renders the authentication form component */ }
        </div>

        <div className="w-px hidden md:block bg-stone-900"></div>

        <div className="text-center">
          <h1 className="text-2xl mb-2">Create your new account</h1>
          <SignupForm /> { /* Renders the sign up form component */ }
        </div>
      </div>
    </Page>
  );
}

export default AuthenticationPage;
