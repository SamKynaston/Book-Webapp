import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation.tsx";
import "./Styles/tailwind.css";
import { pages } from "./Components/Routes";
import { SampleBooks } from "./SampleData.tsx";
import Home from "./Pages/Home.tsx";
import Book from "./Pages/Book.tsx";
import Error from "./Pages/Error.tsx";

const App = () => {
  const [allBooks, setAllBooks] = useState([]);
  const addBook = (book) => {
    setAllBooks([...allBooks, book]);
  };

  useEffect(() => {
    fetch("https://openlibrary.org/subjects/programming.json")
      .then((response) => response.json())
      //.then((response) => console.log(response))
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
          <Route
            path="/"
            element={<Home allBooks={allBooks} setAllBooks={setAllBooks} />}
          />

          <Route path="/works/:id" element={<Book books={allBooks} />} />

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
