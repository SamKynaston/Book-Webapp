import { Navigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Context/Authentication";
import { CreateBookForm } from "../Components/CreateBookForm";

type AdminDashboardPageProps = {
  //isLoggedIn: boolean; 
}

function AdminDashboardPage({ }: AdminDashboardPageProps) {
  const { user } = useAuth();

  return (
    <Page requiresAccount={true} requiredPermission="ADMINISTRATOR">
      <CreateBookForm />
    </Page>
  );
}

export default AdminDashboardPage;
