interface HarvardReferenceProps {
  book: any;
}

export const HarvardReference = ({ book }: HarvardReferenceProps) => {
  return (
    <div className="reference p-4 bg-gray-100 rounded shadow mb-4">
      <p className="text-gray-800">
        {book.author} ({book.dateCreated.getFullYear()}){" "}
        <strong>{book.title}</strong>.
      </p>
    </div>
  );
};
