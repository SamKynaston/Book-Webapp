import Page from "../Components/Page";
import { errorMessages } from "../Utilities/Error.utilities";

type ErrorPageProps = {
  code: number
}

function Error({ code }: ErrorPageProps) {
  const error = errorMessages[code || 0]

  return (
    <Page>
      <br />
      <h1>{code}</h1>
      <h2>{error.title}</h2>
      <p>{error.message}</p>

      <a href="/">🏡 Go home</a>
      <br />
    </Page>
  );
}

export default Error;
