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

  const book = books.find((book: any) => book.key === `/works/${id}`);

  if (!book) {
    return <Page>Book not found</Page>;
  }

  return (
    <Page>
      <h1>{book.title}</h1>

      {book.authors &&
        book.authors.map((author: any) => author.name).join(", ")}

      <br />
      <br />
      <h3>Harvard Reference</h3>
      <HarvardReference book={book} />
    </Page>
  );
}

export default Book;
