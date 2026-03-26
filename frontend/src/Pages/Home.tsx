import Page from "../Components/Page";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@bookwebapp/types";
import { BookBtn } from "../Components/BookBtn";

interface HomeProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ }) => {
  const [inputText, setInputText] = useState("");
  const [allBooks, setAllBooks] = useState([]);
  const [isLoaded, setLoadedStatus] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    fetch(`${apiUrl}/v1/books`)
      .then((response) => response.json())

      .then((response) => {
        console.log(response);
        if (response && response.body) {
          setAllBooks(response.body);
        } else {
          setLoadedStatus(true);
        }
      })

      .finally(() => {
        setLoadedStatus(true);
      })

      .catch((error) => {
        console.log(error.message);
      });
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
      {isLoaded && allBooks.length > 0 ? (
        <>
          <input
            type="text"
            placeholder="🔎  Search the library"
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
