import Page from "../Components/Page";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { Book } from "@bookwebapp/types";
import { BookBtn } from "../Components/BookBtn";
import { getAllBooks, getBookLink } from "../Services/Books.service";

interface SearchProps {
  //setAllBooks: React.Dispatch<React.SetStateAction<Book[]>>;
}

const Search: React.FC<SearchProps> = ({ }) => {
  const [inputText, setInputText] = useState("");
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [isLoaded, setLoadedStatus] = useState(false)
  const [hasFailed, setHasFailed] = useState(false);
  const [atBottom, setAtBottom] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      const nearBottom = scrollY + viewport >= fullHeight - 10;
      setAtBottom(nearBottom);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const timeout = setTimeout(() => {
      if (isMounted) {
        setHasFailed(true);
      }
    }, 15000);

    getAllBooks()
      .then((fetchedBooks) => {
        if (!isMounted) return;

        clearTimeout(timeout);
        setAllBooks(fetchedBooks.body);
        setLoadedStatus(true);
      })
      .catch(() => {
        if (!isMounted) return;

        clearTimeout(timeout);
        setHasFailed(true);
      });

    return () => {
      isMounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const routeToBook = (id: string) => {
    navigate(getBookLink(id));
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const filteredBooks = allBooks.filter((book: Book) => {
    if (!inputText) {
      return book;
    } else {
      return book.title.toLowerCase().includes(inputText.toLowerCase());
    }
  })

  return (
    <Page>
      <div className="HomeLayout">
          <div className={`SearchWrapper`}>
            <input
              className="SearchInput"
              type="text"
              placeholder="🔎 Search the Library"
              value={inputText}
              onChange={inputHandler}
            />
          </div>

          {hasFailed ? (
            <>
              <p className="text-center">Failed to load. Try again later.</p>
            </>
          ) : !isLoaded ? (
            <>
              <p className="text-center">Loading</p>
            </>
          ) : null}

          {isLoaded && allBooks.length > 0 && filteredBooks.length === 0 ? (
            <p className="text-center">No books found</p>
          ) : (
            <div className="Books">
              {filteredBooks.map((book: Book) => (
                <BookBtn
                  book={book}
                  isRecommended={book.isRecommended || false}
                  routeToBook={routeToBook}
                />
              ))}
            </div>
          )}
      </div>
    </Page>
  );
};

export default Search;
