import { Book } from "@bookwebapp/types";
import Page from "../Components/Page";
import { getBookLink, getFavourites } from "../Services/Books.service";
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

  const loadFavourites = async () => {
    const books = await getFavourites();
    setAllBooks(books);
  };

  useEffect(() => {
    if (!user) return;
    loadFavourites();
  }, [user]);

  return (
    <Page>
      {user ? (
        <>
          <h1>Your Favourites</h1>
          <>
            {allBooks && allBooks.length > 0 ? (
              <div className="Books">
                {allBooks.map((book: Book) => (
                  <BookBtn book={book} isRecommended={book.is_recommended || false} routeToBook={routeToBook} refresh={loadFavourites} />
                ))}
              </div>
            ) : (
              <h2 className="text-center text-gray-600">It is time to read!</h2>
            )}
          </>
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
