import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";

function MobileNavigation({ pages, isLoggedIn }: NavigationProps) {
  return (
    <div className="MobileNavigationWrapper">
      <div className="MobileNavigationBar">
        <Link to="/" className="Navigation-Button">
          <i className="fa-solid fa-house"></i>
          <p>Home</p>
        </Link>
        <Link to="/search" className="Navigation-Button">
          <i className="fa-solid fa-magnifying-glass"></i>
          <p>Search</p>
        </Link>
        <Link to="https://github.com/samkynaston" className="Navigation-Button">
          <i className="fa-brands fa-github"></i>
          <p>Github</p>
        </Link>
        <Link to={isLoggedIn ? "/account" : "/login"} className="Navigation-Button">
          <i className="fa-solid fa-user"></i>
          <p>{isLoggedIn ? "Account" : "Sign In"}</p>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;