import { useState } from "react";

interface BookCoverProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export const BookCover: React.FC<BookCoverProps> = ({src, alt, className = ""}) => {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div className={`NoCover ${className}`}>
        No cover available
      </div>
    );
  }

  return (
    <div className={`BookCover ${className}`}>
      {!loaded && <div className="LoadAnimation" />}

      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`CoverLoaded ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
};