import { Author, Book } from "@bookwebapp/types";
import { BookCover } from "../Components/BookCover";
import { favouriteBook, unFavouriteBook } from "../Services/Books.service";

interface BookBtnProps {
  book: Book;
  isRecommended: boolean;
  routeToBook: (id: string) => void;
  refresh?: () => void;
}

export const BookBtn: React.FC<BookBtnProps> = ({
  book,
  isRecommended,
  routeToBook,
  refresh
}) => {
  const handleFavouriteClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
        await favouriteBook(book.id);
        if (refresh) { refresh() };
    } catch (err: any) {
        alert(err.message);
    }
  };

  const handleUnfavouriteClick = async (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    try {
      await unFavouriteBook(book.id);
      if (refresh) { refresh() };
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
        <a onClick={ handleFavouriteClick }>Favourite</a>
        <a onClick={ handleUnfavouriteClick }>Unfavourite</a>
      </div>
    </div>
  );
};
