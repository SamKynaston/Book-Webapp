import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Book, Author } from "@bookwebapp/types";
import { HarvardReference } from "../Components/Reference";
import { useAuth } from "../Context/Authentication";

// Book Helper
import { getBook } from "../Services/Books.service";

// Pages
import ErrorPage from "./Error.js";
import Page from "../Components/Page";
import { BookCover } from "../Components/BookCover";

interface BookPageProps {

}

const BookPage: React.FC<BookPageProps> = ({ }) => {
  const { id } = useParams();
  const [book, setBook] = useState<Book | undefined>(undefined);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const { hasPermission, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      setErrorCode(404);
    }
    
    getBook(id)
      .then((fetchedBook) => {
        if (!fetchedBook) {
          setErrorCode(404)
        }

        setBook(fetchedBook as Book)
        setErrorCode(null)
      })
      .catch((err) => {
        if (err.status === 401) {
          navigate("/login")
        } else {
          setErrorCode(err.status || -1);
        }
      });
  }, [id, navigate]);

  if (errorCode) {
    return <ErrorPage code={errorCode || -1}/>;
  }

  const coverUrl = book?.cover_id
  ? `https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`
  : null;

  return (
    <Page requiredPermission="READ_BOOKS">
        {hasPermission("ADMINISTRATOR") || hasPermission("WRITE_BOOKS") ? (
          <>
            PLACEHOLDER, ADMIN DASHBOARD LINK GOES HERE
          </>
        ) : null}

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
