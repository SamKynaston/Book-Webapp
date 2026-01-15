import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./Components/Navigation.tsx";
import "./Styles/tailwind.css";
import { pages } from "./Components/Routes";
import SampleBooks from "./SampleData.json";
import Home from "./Pages/Home.tsx";
import Book from "./Pages/Book.tsx";

const App = () => {
  const [allBooks, setAllBooks] = useState(SampleBooks);

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation pages={pages} />
        <Routes>
          <Route
            path="/"
            element={<Home allBooks={allBooks} setAllBooks={setAllBooks} />}
          />

          <Route path="/book/:id" element={<Book books={allBooks} />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}
