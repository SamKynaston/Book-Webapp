import { useNavigate } from "react-router-dom";
import Page from "../Components/Page";
import { useAuth } from "../Context/Authentication";
import { UpdateForm } from "../Components/UpdateForm";
import { logout, getAllUsers, requestPasswordReset } from "../Services/Users.service";

type AccountManagementPageProps = {
  //isLoggedIn: boolean; 
}

function AccountManagementPage({ }: AccountManagementPageProps) {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  // Signs the user out
  const handleSignout = async () => {
    if (await logout()) {
      refreshUser();
      navigate("/")
    }
  }

  // Sends a password reset request to the server
  const handlePasswordReset = async () => {
    const data = await requestPasswordReset()

    if (data.success) {
      refreshUser();
      navigate(`/password-reset?token=${data.token}`)
    }
  }

  return (
    <Page requiresAccount={true}>
      <h1 className="mb-2">Hello, {user?.username || "User"}!</h1>
      <p>Welcome to your hub.</p>
      <a onClick={handleSignout}>Logout</a>
      <a onClick={handlePasswordReset}>Password Reset</a>
      <UpdateForm id={undefined}/>
    </Page>
  );
}

export default AccountManagementPage;
