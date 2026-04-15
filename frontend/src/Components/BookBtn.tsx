import { Author, Book } from "@bookwebapp/types";

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
      className={`Book ${isRecommended ? "Recommended" : ""}`}
      key={book.id}
      onClick={() => {
        routeToBook(book.id.toString());
      }}
    >
      {book.cover_id && (
        <img
          className="BookCover"
          src={`http://covers.openlibrary.org/b/id/${book.cover_id}-M.jpg`}
          alt={`Book cover for ${book.title}`}
        />
      )}

      <div className="BookDetails">
        <h2>{book.title}</h2>
        <p>
          {book.authors &&
            book.authors.map((author: Author) => author.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
