import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";
import { useAuth } from "../Context/Authentication";

function Navigation({ pages }: NavigationProps) {
  const { authenticated, hasPermission } = useAuth() as any;

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
        {
          hasPermission("ADMINISTRATOR") ? (
            <Link to="/dashboard" className="Navigation-Button">
              <i className="fa-solid fa-wrench"></i>
            </Link>
          ) : null
        }

        <Link to={authenticated ? "/account" : "/login"} className="Navigation-Button">
          {authenticated ? <i className="fa-solid fa-user"></i> : <i className="fa-regular fa-user"></i>}
        </Link>
      </div>
    </div>
  );
}

export default Navigation;