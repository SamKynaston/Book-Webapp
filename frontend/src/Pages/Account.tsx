import { useNavigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Context/Authentication";
import { UpdateForm } from "../Components/UpdateForm";
import { logout, getAllUsers } from "../Services/Users.service";

type AccountManagementPageProps = {
  //isLoggedIn: boolean; 
}

function AccountManagementPage({ }: AccountManagementPageProps) {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    if (await logout()) {
      refreshUser();
      navigate("/")
    }
  }

  const ignoreForNow = async () => {
    console.log(await getAllUsers())
  }
  ignoreForNow()
  
  return (
    <Page requiresAccount={true}>
      <h1 className="mb-2">Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your hub.</p>
      <a onClick={handleSignout}>Logout</a>
      <UpdateForm id={undefined}/>
    </Page>
  );
}

export default AccountManagementPage;
