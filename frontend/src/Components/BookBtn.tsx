import { Author, Book } from "@bookwebapp/types";


export const BookBtn = (
  book: Book,
  isRecommended: boolean,
  routeToBook: (key: string) => void,
) => {
  return (
    <div
      className="Book"
      key={book.key}
      onClick={() => {
        routeToBook(book.key);
      }}
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
            book.authors.map((author: Author) => author.name).join(", ")}
        </p>
      </div>
    </div>
  );
};
