import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ allBooks, setAllBooks }) {
  const [inputText, setInputText] = useState("");
  const [booksLoaded, setBooksLoaded] = useState(false);

  let navigate = useNavigate();

  const routeToBook = (id) => {
    navigate(`${id}`);
  };

  const inputHandler = (event) => {
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
                    book.authors.map((author: any) => author.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Page>
  );
}

export default Home;
