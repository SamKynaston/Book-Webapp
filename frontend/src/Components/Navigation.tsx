import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";

function Navigation({ pages }: NavigationProps) {
  return (
    <span className="Navigation">
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

      <Link to="/account" className="Navigation-Button">
        Account
      </Link>
    </span>
  );
}

export default Navigation;
