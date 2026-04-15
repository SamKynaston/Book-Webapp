import { StrictMode, use } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

// Styling
import "./Styles/tailwind.css";

// Components
import Navigation from "./Components/Navigation";
import { pages } from "./Components/Routes";

// Pages
import Home from "./Pages/Home";
import BookPage from "./Pages/Book";
import Error from "./Pages/Error";
import Footer from "./Components/Footer";
import AccountPage from "./Pages/Account";
import AuthenticationPage from "./Pages/Authentication";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY || "/book";

const App: React.FC = () => {
  const [allCookies, setAllCookies] = useState<string>("");
  const [isAuthenticated, setAuthenticatedStatus] = useState(false);
  const [accountToken, setAccountToken] = useState<string>("");

  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation pages={pages} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`${bookDirectory}/:id`} element={<BookPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/login" element={<AuthenticationPage />} />
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
