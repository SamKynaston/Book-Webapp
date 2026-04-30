import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Context/Authentication";
import { BookDashboard } from "../Components/BookDashboard";

type AdminDashboardPageProps = {
  //isLoggedIn: boolean; 
}

function AdminDashboardPage({ }: AdminDashboardPageProps) {
  const { user } = useAuth();

  return (
    <Page requiresAccount={true} requiredPermission="ADMINISTRATOR">
      <BookDashboard />
    </Page>
  );
}

export default AdminDashboardPage;
