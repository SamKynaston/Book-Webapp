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
            <h2>{book.title}</h2>
            <p>
              {book.authors &&
                book.authors.map((author: any) => author.name).join(", ")}
            </p>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default Home;
