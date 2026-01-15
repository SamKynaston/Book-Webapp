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
      <h2>{book.author}</h2>

      {book.description && (
        <>
          {" "}
          <br />
          <h3>Description</h3>
          <p className="reference p-4 bg-gray-100 rounded shadow mb-4 w-4xl">
            {book.description}
          </p>{" "}
        </>
      )}

      <br />
      <h3>Harvard Reference</h3>
      <HarvardReference book={book} />
    </Page>
  );
}

export default Book;
