interface HarvardReferenceProps {
  book: any;
}

export const HarvardReference = ({ book }: HarvardReferenceProps) => {
  return (
    <div className="reference p-4 bg-gray-100 rounded shadow mb-4 w-4xl">
      <p className="text-gray-800 text-center">
        {book.author} ({book.dateCreated.getFullYear()}){" "}
        <strong>{book.title}</strong>.
      </p>
      <p className="text-gray-800 text-center text-sm">
        ({book.author}, {book.dateCreated.getFullYear()})
      </p>
    </div>
  );
};
