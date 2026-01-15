import Page from "../Components/Page";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ allBooks, setAllBooks }) {
  let navigate = useNavigate();

  const routeToBook = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <Page>
      <div className="Books">
        {allBooks.map((book) => (
          <div
            className="Book"
            key={book.id}
            onClick={() => routeToBook(book.id)}
          >
            <h2>{book.title}</h2>
            <p>{book.author}</p>
          </div>
        ))}
      </div>
    </Page>
  );
}

export default Home;
