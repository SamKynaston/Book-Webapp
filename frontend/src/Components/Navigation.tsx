import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";

function Navigation({ pages, isLoggedIn }: NavigationProps) {
  return (
    <div className="Navigation">
      <div className="Navigation-Start">
        {pages.map(
          (page) =>
            page.ignore !== true && (
              <Link to={page.path} key={page.path} className="Navigation-Button">
                {page.image ? (
                  <img
                    src={page.image}
                    alt={page.title ?? page.path}
                    className="Navigation-Icon"
                  />
                ) : (
                  <span>{page.title ?? page.path}</span>
                )}
              </Link>
            ),
        )}
      </div>

      <div className="Navigation-End">
        <Link to={isLoggedIn ? "/account" : "/login"} className="Navigation-Button">
          {isLoggedIn ? "Account" : "Sign In"}
        </Link>
      </div>
    </div>
  );
}

export default Navigation;