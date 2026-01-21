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
    <div
      className="reference p-4 bg-gray-100 rounded shadow mb-4 lgw-4xl cursor-pointer"
      onClick={handleClick}
    >
      <p className="text-gray-800 text-center">
        {book.authors &&
          book.authors.map((author: Author) => author.name).join(", ")}
        , {book.first_publish_year} <strong>{book.title}</strong>.
      </p>
      <p className="text-gray-800 text-center text-sm">
        (
        {book.authors &&
          book.authors.map((author: Author) => author.name).join(", ")}
        , {book.first_publish_year})
      </p>
    </div>
  );
};
