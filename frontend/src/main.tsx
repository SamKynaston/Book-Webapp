import { StrictMode } from "react";
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
  return (
    <StrictMode>
      <BrowserRouter>
        <Navigation pages={pages} />
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route path="/works/:id" element={<BookPage />} />
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
