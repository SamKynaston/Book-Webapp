import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import "./Styles/tailwind.css";
import { pages } from "./Components/Routes";
import Home from "./Pages/Home";
import BookPage from "./Pages/Book";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";

const App: React.FC = () => {
  const [allBooks, setAllBooks] = useState([]);
  const [isLoaded, setLoadedStatus] = useState(false);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/programming.json?details=true")
      .then((response) => response.json())

      .then((response) => {
        if (response && response.works) {
          setAllBooks(response.works);
        }
      })
      .finally(() => {
        setLoadedStatus(true);
      });
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation pages={pages} />
        <Routes>
          <Route
            path="/"
            element={<Home allBooks={allBooks} isLoaded={isLoaded} />}
          />
          <Route path="/works/:id" element={<BookPage books={allBooks} />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

export default App;
