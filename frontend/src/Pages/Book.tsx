import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book, Author } from "@bookwebapp/types";
import { HarvardReference } from "../Components/Reference";

// Book Helper
import { getBook } from "../Helpers/Books";

// Pages
import ErrorPage from "./Error.js";
import Page from "../Components/Page";
import { BookCover } from "../Components/BookCover";

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
    getBook(id)
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
            <div className="BookDetails">
              <BookCover src={coverUrl} alt={book.title} />

              <div className="BookInfo">
                <span>
                  <h1>{book.title}</h1>
                  <p>
                    {book.authors &&
                      book.authors.map((author: Author) => author.name).join(", ")}
                  </p>
                </span>
                {/* <span>
                  <h2>Harvard Reference</h2>
                  <HarvardReference book={book} />
                </span> */}
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
