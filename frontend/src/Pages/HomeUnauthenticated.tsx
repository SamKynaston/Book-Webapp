import { Book } from "@bookwebapp/types";
import Page from "../Components/Page";
import { getAllBooks } from "../Services/Books.service";
import { Link, useNavigate } from "react-router-dom";
import { BookBtn } from "../Components/BookBtn";
import { useState, useEffect } from "react";

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

      setRandomBooks(shuffled.slice(0, 5))
    })
    .finally(() => {
      setBooksReady(true)
    })
  }, [])

  return (
    <Page>
      <h1 className="mb-1">Welcome to your brand new digital library!</h1>
      <h2>The place to discover your next book, just start below</h2>
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
