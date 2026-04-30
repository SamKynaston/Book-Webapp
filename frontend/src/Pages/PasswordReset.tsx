import Page from "../Components/Page";

import { PasswordResetForm } from "../Components/PasswordResetForm";

type PasswordResetPageProps = {
  //isLoggedIn: boolean; 
}

function PasswordResetPage({ }: PasswordResetPageProps) {  
  return (
    <Page requiresAccount={true} allowPasswordReset={true}>
      <PasswordResetForm />
    </Page>
  );
}

export default PasswordResetPage;
