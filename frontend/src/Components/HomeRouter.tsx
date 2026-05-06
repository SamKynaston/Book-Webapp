import Home from "../Pages/HomeAuthenticated";
import UnauthenticatedHome from "../Pages/HomeUnauthenticated";
import { useAuth } from "../Context/Authentication";

export const HomeRouter = () => {
    const { authenticated } = useAuth();

    // If signed in, return the authenticated version of home, and if not, return the unauthenticated home page
    return authenticated ? < Home /> : < UnauthenticatedHome />
}