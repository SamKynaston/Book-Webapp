import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";

function Navigation({ pages }: NavigationProps) {
  return (
    <span className="Navigation">
      {pages.map(
        (page) =>
          page.ignore !== true && (
            <Link to={page.path} key={page.path} className="Navigation-Button">
              {page.title ?? page.path}
            </Link>
          ),
      )}
    </span>
  );
}

export default Navigation;
