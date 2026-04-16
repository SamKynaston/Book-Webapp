import { Navigate } from "react-router-dom";
import Page from "../Components/Page";

type AccountManagementPageProps = {
  isLoggedIn: boolean; 
}

function AccountManagementPage({ isLoggedIn }: AccountManagementPageProps) {
  if (isLoggedIn) {
    return <Navigate to="/account" replace />;
  }

  return (
    <Page>
      <br />
      <h1>PLACEHOLDER PAGE</h1>
      <p>Placeholder page for account management</p>
      <br />
      <a href="/">🏡 Go home</a>
      <br />
    </Page>
  );
}

export default AccountManagementPage;
