import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";
import { useAuth } from "../Helpers/Authentication";

function MobileNavigation({ pages }: NavigationProps) {
    const { authenticated, hasPermission } = useAuth() as any;
  
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

        {
          hasPermission("ADMINISTRATOR") ? (
            <Link to="/dashboard" className="Navigation-Button">
              <i className="fa-solid fa-wrench"></i>
              <p>Dashboard</p>
            </Link>
          ) : null
        }

        <Link to={authenticated ? "/account" : "/login"} className="Navigation-Button">
          <i className="fa-solid fa-user"></i>
          <p>{authenticated ? "Account" : "Sign In"}</p>
        </Link>
      </div>
    </div>
  );
}

export default MobileNavigation;