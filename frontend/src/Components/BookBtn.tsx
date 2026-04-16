import { Author, Book } from "@bookwebapp/types";
import { BookCover } from "../Components/BookCover";

interface BookBtnProps {
  book: Book;
  isRecommended: boolean;
  routeToBook: (id: string) => void;
}

export const BookBtn: React.FC<BookBtnProps> = ({
  book,
  isRecommended,
  routeToBook,
}) => {
  return (
    <div
      className={`Book${isRecommended ? " Recommended" : ""}`}
      key={book.id}
      onClick={() => {
        routeToBook(book.id.toString());
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
      </div>
    </div>
  );
};
