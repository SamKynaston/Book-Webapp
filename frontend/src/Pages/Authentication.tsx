import Page from "../Components/Page";
import { AuthenticationForm } from "../Components/AuthenticationForm";

type AuthenticationPageProps = {
  //isLoggedIn: boolean; 
}

function AuthenticationPage({ }: AuthenticationPageProps) {
  return (
    <Page>
      <h1>Sign In</h1>
      <AuthenticationForm />
    </Page>
  );
}

export default AuthenticationPage;
