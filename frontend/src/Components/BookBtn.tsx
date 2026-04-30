import { Author, Book } from "@bookwebapp/types";
import { BookCover } from "../Components/BookCover";
import { favouriteBook, unFavouriteBook, isFavourited } from "../Services/Books.service";
import { getBookInventory } from "../Services/Inventory.service";

import { useEffect, useState } from "react";
import { useAuth } from "../Context/Authentication";
import { useNavigate } from "react-router-dom";

interface BookBtnProps {
  book: Book;
  isRecommended: boolean;
  routeToBook?: (id: string) => void;
  refresh?: () => void;
}

export const BookBtn: React.FC<BookBtnProps> = ({ book, isRecommended, routeToBook, refresh }) => {
  const { user } = useAuth();
  const [isFavourite, setFavouritedStatus] = useState<Boolean>(false)
  const [inventory, setInventory] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)

  const navigate = useNavigate();

  const isFavouriteBook = async () => {
    const status = await isFavourited(book.id);
    setFavouritedStatus(status);
  };

  const handleInventory = async() => {
    const result = await getBookInventory(book.id)
    setInventory(result.body.availability)
    setTotal(result.body.total)
  }

  useEffect(() => {
    handleInventory()

    if (!user) return;
    
    isFavouriteBook()
  }, [user, book.id])

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    
    if (target.closest('a') || target.tagName === 'I') {
      return;
    }

    if (routeToBook) {
      routeToBook(book.id.toString());
    } else {
      navigate("/login")
    }
  };

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
      onClick={handleContainerClick}
    >
      {book.cover_id && (
        <BookCover src={`https://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`} alt={book.title} className="LimitBookSize"/>
      )}

      <div className="BookContent">
        <h2>{book.title}</h2>
        {/*<p>
          {book.authors &&
            book.authors.map((author: Author) => author.name).join(", ")}
        </p>*/}

        <p>{inventory} / {total}</p>

        {user ? (
          !isFavourite ? (<a onClick={ handleFavouriteClick }><i className="fa-regular fa-star"></i></a>) : (<a onClick={ handleUnfavouriteClick }><i className="fa-solid fa-star"></i></a>)
        ) : ( 
          <></>
        )}
      </div>
    </div>
  );
};
