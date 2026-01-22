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
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`
    : null;

  return (
    <Page>
      <div className="md:flex md:items-start md:gap-4">
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
        <div className="md:flex md:flex-col md:grid-cols-1 md:gap-6">
          <span>
            <h3>{book.title}</h3>
            <p>
              {book.authors &&
                book.authors.map((author: Author) => author.name).join(", ")}
            </p>
          </span>
          <span>
            <h3>Harvard Reference</h3>
            <HarvardReference book={book} />
          </span>
        </div>
      </div>
      <br />
    </Page>
  );
};

export default BookPage;
