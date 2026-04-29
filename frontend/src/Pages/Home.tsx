import { Book } from "@bookwebapp/types";
import Page from "../Components/Page";
import { getFavourites } from "../Services/Users.service";
import { getBookLink } from "../Services/Books.service";
import { useAuth } from "../Context/Authentication";
import { Link, useNavigate } from "react-router-dom";
import { BookBtn } from "../Components/BookBtn";
import { useState, useEffect } from "react";

interface HomeProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

function Home({ }: HomeProps) {
  const { user } = useAuth();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoaded, setLoadedStatus] = useState<Boolean>(false)

  const navigate = useNavigate();

  const routeToBook = (id: string) => {
    navigate(getBookLink(id));
  };

  useEffect(() => {
    if (!user) return;

    getFavourites()
      .then((books) => {
        console.log(books)
        setAllBooks(books);
      });
  }, [user]);

  return (
    <Page>
      {user ? (
        <>
          <h1>Your Favourites</h1>
          <div className="Books">
            {allBooks.map((book: Book) => (
              <BookBtn book={book} isRecommended={book.is_recommended || false} routeToBook={routeToBook} />
            ))}
          </div>
        </>
      ) : (
        <>
          <Link to="/login">Sign in to see your favourites!</Link>
        </>
      )}
    </Page>
  );
};

export default Home;
