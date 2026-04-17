import { Navigate } from "react-router-dom";
import Page from "../Components/ProtectedPage";
import { useAuth } from "../Helpers/Authentication";

type AccountManagementPageProps = {
  //isLoggedIn: boolean; 
}

function AccountManagementPage({ }: AccountManagementPageProps) {
  const { user } = useAuth();

  return (
    <Page>
      <br />
      <h1>Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your account page.</p>
      <br />
    </Page>
  );
}

export default AccountManagementPage;
