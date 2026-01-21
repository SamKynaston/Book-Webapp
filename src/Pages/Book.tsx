import Page from "../Components/Page";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { HarvardReference } from "../Components/Reference";
import type { Book, Author } from "../Types/Books";

interface BookPageProps {
  books: Book[];
}

const BookPage: React.FC<BookPageProps> = ({ books }) => {
  const { id } = useParams();
  const [coverLoaded, setCoverLoaded] = useState(false);

  if (!id) {
    return <Page>Invalid ID</Page>;
  }

  if (!books) {
    return <Page>Loading...</Page>;
  }

  const book = books.find((book: Book) => book.key === `/works/${id}`);

  if (!book) {
    return <Page>Book not found</Page>;
  }

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : null;

  return (
    <Page>
      {coverUrl && !coverLoaded && (
        <p className="text-gray-700">Loading cover...</p>
      )}

      {coverUrl && (
        <img
          src={coverUrl}
          alt={book.title}
          onLoad={() => setCoverLoaded(true)}
        />
      )}

      <br />
      <h1>{book.title}</h1>

      {book.authors &&
        book.authors.map((author: Author) => author.name).join(", ")}

      <br />
      <br />
      <h3>Harvard Reference</h3>
      <HarvardReference book={book} />
    </Page>
  );
};

export default BookPage;
