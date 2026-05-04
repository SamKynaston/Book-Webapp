import { BookTable } from "../Components/BookTable";
import { UserTable } from "../Components/UserTable";
import { InventoryTable } from "../Components/InventoryTable";

import Page from "../Components/Page";

type AdminDashboardPageProps = {
  //isLoggedIn: boolean; 
}

function AdminDashboardPage({ }: AdminDashboardPageProps) {
  return (
    <Page requiresAccount={true} requiredPermission="ADMINISTRATOR">
      <p>When resetting an account's password, or creating a new account, passwords are defaulted to the current date in the following format: <b>DD/MM/YYYY</b>. Once signed in, users are automatically prompted to write a new password. </p>
      <UserTable />
      <BookTable />
      <InventoryTable />
    </Page>
  )
};

export default AdminDashboardPage