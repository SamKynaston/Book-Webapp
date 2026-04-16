import { Navigate } from "react-router-dom";
import Page from "../Components/Page";

type AuthenticationPageProps = {
  isLoggedIn: boolean; 
}

function AuthenticationPage({ isLoggedIn }: AuthenticationPageProps) {
  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Page>
      <br />
      <h1>PLACEHOLDER PAGE</h1>
      <p>Placeholder page for authentication</p>
      <br />
      <a href="/">🏡 Go home</a>
      <br />
    </Page>
  );
}

export default AuthenticationPage;
