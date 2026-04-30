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
      <div className="mb-1 text-8xl">{code}</div>
      {/*<h2 className="mb-1">{error.title}</h2>*/}
      <h2 className="mb-8">{error.message}</h2>

      <a href="/">🏡 Go home</a>
      <br />
    </Page>
  );
}

export default Error;
