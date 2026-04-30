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
      <h1 className="mb-1">{code}</h1>
      <h2 className="mb-1">{error.title}</h2>
      <p className="mb-4">{error.message}</p>

      <a href="/">🏡 Go home</a>
      <br />
    </Page>
  );
}

export default Error;
