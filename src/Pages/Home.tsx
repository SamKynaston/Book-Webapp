import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Author, Book } from "../Types/Books";

interface HomeProps {
  allBooks: Book[];
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Home: React.FC<HomeProps> = ({ allBooks }) => {
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
      <input
        type="text"
        placeholder="Search books..."
        value={inputText}
        onChange={inputHandler}
      />
      <br />

      {filteredBooks.length === 0 ? (
        <p className="text-gray-700 text-center">Nothing but chickens here!</p>
      ) : (
        <div className="Books">
          {filteredBooks.map((book) => (
            <div
              className="Book"
              key={book.key}
              onClick={() => routeToBook(book.key)}
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
