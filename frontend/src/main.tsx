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
import SearchPage from "./Pages/Search";
import AdminDashboardPage from "./Pages/Dashboard";

import MobileNavigation from "./Components/MobileNavigation";
import { checkAuth, AuthProvider, useAuth } from "./Context/Authentication";

const bookDirectory = import.meta.env.VITE_BOOK_DIRECTORY || "/book";

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { loading } = useAuth();

  if (loading) return <div className="bg-gray-900 h-screen w-screen" />; 
  return <>{children}</>;
};

const App: React.FC = () => {
  const [isMobileDevice, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(query.matches);
    update();

    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <BrowserRouter>      
      <AuthProvider>
        <AuthGate>
          {!isMobileDevice && <Navigation pages={pages} />}

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path={`${bookDirectory}/:id`} element={<BookPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/login" element={<AuthenticationPage />} />
            <Route path="/dashboard" element={<AdminDashboardPage />} />
            <Route path="*" element={<Error code={404} />} />
          </Routes>

          {isMobileDevice && <MobileNavigation pages={pages} />}
          {!isMobileDevice && <Footer />}
        </AuthGate>
      </AuthProvider>
    </BrowserRouter>
  );
};

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

export default App;
