import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ allBooks, setAllBooks }) {
  let navigate = useNavigate();

  const routeToBook = (id) => {
    navigate(`${id}`);
  };

  return (
    <Page>
      <div className="Books">
        {allBooks.map((book) => (
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
    </Page>
  );
}

export default Home;
