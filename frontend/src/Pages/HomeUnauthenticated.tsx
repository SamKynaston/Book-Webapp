import { Book } from "@bookwebapp/types";
import Page from "../Components/Page";
import { getAllBooks } from "../Services/Books.service";
import { Link, useNavigate } from "react-router-dom";
import { BookBtn } from "../Components/BookBtn";
import { useState, useEffect } from "react";

// Home Page for unauthenticated users. Will show six book examples, all redirecting to /login, which also provides options for sign up..

interface HomeProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function UnauthenticatedHome({ }: HomeProps) {
  const [randomBooks, setRandomBooks] = useState<Book[]>([])
  const [booksReady, setBooksReady] = useState<boolean>(false)

  useEffect(() => {
    getAllBooks().then((fetchedBooks) => {
      const books = fetchedBooks.body
      const shuffled = [...books].sort(() => 0.5 - Math.random())

      setRandomBooks(shuffled.slice(0, 6))
    })
    .finally(() => {
      setBooksReady(true)
    })
  }, [])

  return (
    <Page>
      <h1 className="mb-1">Welcome to your digital library!</h1>
      <p className="mb-4">This is the place for you to discover your next read, starting below</p>
      { booksReady ? (
        randomBooks.length > 0 ? (
          <div className="Books">
            {randomBooks.map((book: Book) => (
              <BookBtn book={book} isRecommended={book.is_recommended || false} />
            ))}
          </div>
        ) : (
          <></>
        )
      ) : ( <></> )}
    </Page>
  );
};

export default UnauthenticatedHome;
