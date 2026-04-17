import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Helpers/Authentication";

type AdminDashboardPageProps = {
  //isLoggedIn: boolean; 
}

function AdminDashboardPage({ }: AdminDashboardPageProps) {
  const { user } = useAuth();

  return (
    <Page requiresAccount={true} requiredPermission="ADMINISTRATOR">
      <h1>Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your hub.</p>
    </Page>
  );
}

export default AdminDashboardPage;
