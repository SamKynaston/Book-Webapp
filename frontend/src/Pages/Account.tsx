import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Helpers/Authentication";

type AccountManagementPageProps = {
  //isLoggedIn: boolean; 
}

function AccountManagementPage({ }: AccountManagementPageProps) {
  const { user } = useAuth();

  return (
    <Page requiresAccount={true}>
      <h1>Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your hub.</p>
    </Page>
  );
}

export default AccountManagementPage;
