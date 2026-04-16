import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";

function MobileNavigation({ pages }: NavigationProps) {
  return (
    <div className="MobileNavigationWrapper">
      <div className="MobileNavigationBar">
        <Link to="/" className="Navigation-Button">
          Home
        </Link>
        <Link to="/search" className="Navigation-Button">
          Search
        </Link>
        <Link to="/account" className="Navigation-Button">
          Account
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;