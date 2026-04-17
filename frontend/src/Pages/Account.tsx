import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Helpers/Authentication";

type AccountManagementPageProps = {
  //isLoggedIn: boolean; 
}

function AccountManagementPage({ }: AccountManagementPageProps) {
  const { user, logout } = useAuth();

  return (
    <Page requiresAccount={true}>
      <h1>Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your hub.</p>
      <a onClick={logout}>Logout</a>
    </Page>
  );
}

export default AccountManagementPage;
