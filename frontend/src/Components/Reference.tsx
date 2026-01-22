import type { Book, Author } from "@bookwebapp/types";
import { useState } from "react";

interface HarvardReferenceProps {
  book: Book;
}

export const HarvardReference = ({ book }: HarvardReferenceProps) => {
  const [copied, setCopied] = useState(false);

  const text = `${book.authors && book.authors.map((author: Author) => author.name).join(", ")}, ${book.first_publish_year}`;

  const handleClick = () => {
    navigator.clipboard.writeText(`(${text})`);
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="reference" onClick={handleClick}>
      <p className="title">
        {book.authors &&
          book.authors.map((author: Author) => author.name).join(", ")}
        , {book.first_publish_year} <strong>{book.title}</strong>.
      </p>
      <p className="subtitle">{copied ? "Copied!" : `(${text})`}</p>
    </div>
  );
};
