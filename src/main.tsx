import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation.tsx";
import "./Styles/tailwind.css";
import { pages } from "./Components/Routes";
import Home from "./Pages/Home.tsx";
import BookPage from "./Pages/Book.tsx";
import Error from "./Pages/Error.tsx";

const App: React.FC = () => {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/programming.json?details=true")
      .then((response) => response.json())

      .then((response) => {
        if (response && response.works) {
          setAllBooks(response.works);
        }
      });
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation pages={pages} />
        <Routes>
          <Route path="/" element={<Home allBooks={allBooks} />} />

          <Route path="/works/:id" element={<BookPage books={allBooks} />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

export default App;
