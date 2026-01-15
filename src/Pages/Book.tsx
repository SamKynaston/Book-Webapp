import Page from "../Components/Page";
import { useParams } from "react-router-dom";

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
      <h2>{book.title}</h2>
      <p>Authored by: {book.author}</p>
    </Page>
  );
}

export default Book;
