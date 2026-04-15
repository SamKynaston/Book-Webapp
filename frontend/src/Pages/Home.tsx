import Page from "../Components/Page";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@bookwebapp/types";
import { BookBtn } from "../Components/BookBtn";
import { getAllBooks } from "../Helpers/Books";

interface HomeProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ }) => {
  const [inputText, setInputText] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoaded, setLoadedStatus] = useState(false)
  const [hasFailed, setHasFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      if (isMounted) {
        setHasFailed(true);
      }
    }, 15000);

    getAllBooks()
      .then((fetchedBooks) => {
        if (!isMounted) return;

        clearTimeout(timeout);
        setAllBooks(fetchedBooks);
        setLoadedStatus(true);
      })
      .catch(() => {
        if (!isMounted) return;

        clearTimeout(timeout);
        setHasFailed(true);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const routeToBook = (id: string) => {
    navigate(`/works/${id}`);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const filteredBooks = allBooks.filter((book: Book) => {
    if (!inputText) {
      return book;
    } else {
      return book.title.toLowerCase().includes(inputText.toLowerCase());
    }
  });

  return (
    <Page>
      {hasFailed ? (
        <>
          <p className="text-gray-300 text-center">Failed to load. Try again later.</p>
        </>
      ) : isLoaded && allBooks.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="🔎  Search the Library"
            value={inputText}
            onChange={inputHandler}
          />
          <br />
        </>
      ) : (
        <>
          <p className="text-gray-300 text-center">Loading</p>
        </>
      )}

      {isLoaded && allBooks.length > 0 && filteredBooks.length === 0 ? (
        <p className="text-gray-300 text-center">No books found</p>
      ) : (
        <div className="Books">
          {filteredBooks.map((book: Book) => (
            <BookBtn
              book={book}
              isRecommended={book.isRecommended || false}
              routeToBook={routeToBook}
            />
          ))}
        </div>
      )}
    </Page>
  );
};

export default Home;
