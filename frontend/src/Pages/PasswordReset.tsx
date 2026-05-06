import Page from "../Components/Page";

import { PasswordResetForm } from "../Components/PasswordResetForm";
import { useSearchParams } from "react-router-dom";

type PasswordResetPageProps = {
  //isLoggedIn: boolean; 
}

// Password Reset Page. Only works if in a password reset state or the token for the reset is provided in the url.
function PasswordResetPage({ }: PasswordResetPageProps) {  
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    return (
        <Page requiresAccount={true} allowPasswordReset={true}>
            <PasswordResetForm token={token} />
        </Page>
    );
}

export default PasswordResetPage;
