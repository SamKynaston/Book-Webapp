import { Author, Book } from "@bookwebapp/types";
import { BookCover } from "../Components/BookCover";
import { favouriteBook, unFavouriteBook, isFavourited } from "../Services/Books.service";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/Authentication";

interface BookBtnProps {
  book: Book;
  isRecommended: boolean;
  routeToBook: (id: string) => void;
  refresh?: () => void;
}

export const BookBtn: React.FC<BookBtnProps> = ({ book, isRecommended, routeToBook, refresh }) => {
  const { user } = useAuth();
  const [isFavourite, setFavouritedStatus] = useState<Boolean>(false)

  const isFavouriteBook = async () => {
    const status = await isFavourited(book.id);
    setFavouritedStatus(status);
  };

  useEffect(() => {
    if (!user) return;
    isFavouriteBook()
  }, [user, book.id])

  const handleFavouriteClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
        await favouriteBook(book.id);
        isFavouriteBook();

        if (refresh) { refresh(); };
    } catch (err: any) {
        alert(err.message);
    }
  };

  const handleUnfavouriteClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await unFavouriteBook(book.id);
      isFavouriteBook();

      if (refresh) { refresh(); };
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div
      className={`Book${isRecommended ? " Recommended" : ""}`}
      key={book.id}
      onClick={() => {
        //routeToBook(book.id.toString());
      }}
    >
      {book.cover_id && (
        <BookCover src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} className="LimitBookSize"/>
      )}

      <div className="BookContent">
        <h2>{book.title}</h2>
        <p>
          {book.authors &&
            book.authors.map((author: Author) => author.name).join(", ")}
        </p>

        {!isFavourite ? (<a onClick={ handleFavouriteClick }><i className="fa-regular fa-star"></i></a>) : (<a onClick={ handleUnfavouriteClick }><i className="fa-solid fa-star"></i></a>)}
      </div>
    </div>
  );
};
