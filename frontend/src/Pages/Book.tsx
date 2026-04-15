import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book, Author } from "@bookwebapp/types";
import { HarvardReference } from "../Components/Reference";

// Book Helper
import { GetBook } from "../Helpers/Books";

// Pages
import ErrorPage from "./Error.js";
import Page from "../Components/Page";

interface BookPageProps {

}

const BookPage: React.FC<BookPageProps> = ({ }) => {
  const { id } = useParams();
  const [coverLoaded, setCoverLoaded] = useState(false);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [error, setError] = useState(true);

  if (!id) {
    return <ErrorPage />;
  }

  useEffect(() => {
    GetBook(id)
      .then((fetchedBook) => {
        setBook(fetchedBook);
        setError(false);
      })
      .catch(() => {
        setError(true);
      });
  }, [id]);

  if (error) {
    return <ErrorPage />;
  }

  const coverUrl = book?.cover_id
  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
  : null;

  return (
    <Page>
        {book ? (
          <>
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
          </>
        ): (
          <p>Please wait...</p>
        )}
    </Page>
  );
};

export default BookPage;
