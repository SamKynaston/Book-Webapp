import type { Book, Author } from "../Types/Books";

interface HarvardReferenceProps {
  book: Book;
}

export const HarvardReference = ({ book }: HarvardReferenceProps) => {
  const text = `${book.authors && book.authors.map((author: Author) => author.name).join(", ")}, ${book.first_publish_year}`;

  const handleClick = () => {
    navigator.clipboard.writeText(`(${text})`);
  };

  return (
    <div className="reference" onClick={handleClick}>
      <p className="title">
        {book.authors &&
          book.authors.map((author: Author) => author.name).join(", ")}
        , {book.first_publish_year} <strong>{book.title}</strong>.
      </p>
      <p className="subtitle">
        (
        {book.authors &&
          book.authors.map((author: Author) => author.name).join(", ")}
        , {book.first_publish_year})
      </p>
    </div>
  );
};
