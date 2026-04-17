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
import Search from "./Pages/Search";

import MobileNavigation from "./Components/MobileNavigation";
import { checkAuth, AuthProvider } from "./Helpers/Authentication";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY || "/book";

const App: React.FC = () => {
  const [isAuthenticated, setAuthenticatedStatus] = useState(false);
  const [isMobileDevice, setIsMobile] = useState(false);
  
  useEffect(() => {
    const init = async () => {
      const data = await checkAuth();

      if (data?.authenticated) {
        setAuthenticatedStatus(true);
      } else {
        setAuthenticatedStatus(false);
      }

      console.log(data);
    };

    init();
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(query.matches);
    update();

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <StrictMode>      
      <AuthProvider>
        <BrowserRouter>
          {!isMobileDevice && <Navigation pages={pages} isLoggedIn={isAuthenticated} />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path={`${bookDirectory}/:id`} element={<BookPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<AuthenticationPage />} />
            <Route path="*" element={<Error />} />
          </Routes>

          {isMobileDevice && <MobileNavigation pages={pages} isLoggedIn={isAuthenticated} />}
          {!isMobileDevice && <Footer />}
        </BrowserRouter>
      </AuthProvider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

export default App;
