import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Author, Book } from "../Types/Books";

interface HomeProps {
  allBooks: Book[];
  isLoaded: boolean;
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ allBooks, isLoaded }) => {
  const [inputText, setInputText] = useState("");

  const navigate = useNavigate();

  const routeToBook = (id: string) => {
    navigate(`${id}`);
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
            <div
              className="Book"
              key={book.key}
              onClick={() => {
                routeToBook(book.key);
              }}
            >
              {book.cover_id && (
                <img
                  className="BookCover"
                  src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
                  alt={book.title}
                />
              )}

              <div className="BookDetails">
                <h2>{book.title}</h2>
                <p>
                  {book.authors &&
                    book.authors
                      .map((author: Author) => author.name)
                      .join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
};

export default Home;
