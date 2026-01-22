import { useParams } from "react-router-dom";
import { useState } from "react";
import type { Book, Author } from "@bookwebapp/types";
import { HarvardReference } from "../Components/Reference";
import ErrorPage from "./Error.js";
import Page from "../Components/Page";

interface BookPageProps {
  books: Book[];
}

const BookPage: React.FC<BookPageProps> = ({ books }) => {
  const { id } = useParams();
  const [coverLoaded, setCoverLoaded] = useState(false);

  if (!id) {
    return <ErrorPage />;
  }

  if (!books) {
    return <Page>Loading...</Page>;
  }

  const book = books.find((book: Book) => book.key === `/works/${id}`);
  if (!book) {
    return <ErrorPage />;
  }

  const coverUrl = book.cover_id
    ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
    : null;

  return (
    <Page>
      <div className="md:flex md:items-start md:gap-4 pt-5">
        {coverUrl && !coverLoaded && (
          <p className="text-gray-400">Loading cover...</p>
        )}

        {coverUrl && (
          <img
            className="h-75 justify-center transition hover:scale-[1.1]"
            src={coverUrl}
            alt={book.title}
            onLoad={() => setCoverLoaded(true)}
          />
        )}

        <br />
        <div className="md:flex md:flex-col md:grid-cols-1 md:gap-6 h-75">
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
