import { BookTable } from "../Components/BookTable";
import { UserTable } from "../Components/UserTable";
import Page from "../Components/Page";

type AdminDashboardPageProps = {
  //isLoggedIn: boolean; 
}

function AdminDashboardPage({ }: AdminDashboardPageProps) {
  return (
    <Page>
      <UserTable />
      <BookTable />
    </Page>
  )
};

export default AdminDashboardPage