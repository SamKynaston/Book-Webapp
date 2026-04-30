import Home from "../Pages/HomeAuthenticated";
import UnauthenticatedHome from "../Pages/HomeUnauthenticated";
import { useAuth } from "../Context/Authentication";

export const HomeRouter = () => {
    const { authenticated, loading } = useAuth();

    return authenticated ? < Home /> : < UnauthenticatedHome />
}