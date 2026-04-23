import { Link } from "react-router-dom";
import type { NavigationProps } from "@bookwebapp/types";
import { useAuth } from "../Context/Authentication";
import icon from "../../public/logo.svg";

function Navigation({ pages }: NavigationProps) {
  const { authenticated, hasPermission } = useAuth() as any;

  return (
    <div className="Navigation">
      <div className="Navigation-Start">
        <Link to={"/"} key={"/"} className="Navigation-Button">
          <img
              src={icon}
              alt="Library"
              className="Navigation-Icon"
            />
        </Link>

        {/*<div className="Navigation-Button w-full justify-start">
          <button className="w-full"></button>
        </div>*/}
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