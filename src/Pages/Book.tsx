import Page from "../Components/Page";
import { useParams } from "react-router-dom";
import { HarvardReference } from "../Components/Reference";

function Book({ books }: { books: any }) {
  const { id } = useParams();

  if (!id) {
    return <Page>Invalid ID</Page>;
  }

  if (!books) {
    return <Page>Loading...</Page>;
  }

  const book = books.find((book: any) => book.id === parseInt(id));

  if (!book) {
    return <Page>Book not found</Page>;
  }

  return (
    <Page>
      <h1>{book.title}</h1>
      <h4>Authored by: {book.author}</h4>

      {book.description && (
        <>
          {" "}
          <br /> <p>{book.description}</p>{" "}
        </>
      )}

      <br />
      <HarvardReference book={book} />
    </Page>
  );
}

export default Book;
