import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@bookwebapp/types";
import { BookBtn } from "src/Components/BookBtn";

interface HomeProps {
  allBooks: Book[];
  isLoaded: boolean;
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ allBooks, isLoaded }) => {
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  const routeToBook = (id: string) => {
    navigate(`/works/${id}`);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const filteredBooks = allBooks.filter((book) => {
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
          {filteredBooks.map((book) => (
            <BookBtn
              book={book}
              isRecommended={book.isRecommended}
              routeToBook={routeToBook}
            />
          ))}
        </div>
      )}
    </Page>
  );
};

export default Home;
