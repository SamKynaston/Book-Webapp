interface HarvardReferenceProps {
  book: any;
}

export const HarvardReference = ({ book }: HarvardReferenceProps) => {
  return (
    <div className="reference p-4 bg-gray-100 rounded shadow mb-4 w-4xl">
      <p className="text-gray-800 text-center">
        {book.authors &&
          book.authors.map((author: any) => author.name).join(", ")}
        , {book.first_publish_year} <strong>{book.title}</strong>.
      </p>
      <p className="text-gray-800 text-center text-sm">
        (
        {book.authors &&
          book.authors.map((author: any) => author.name).join(", ")}
        , {book.first_publish_year})
      </p>
    </div>
  );
};
