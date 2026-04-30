import type { Page } from "@bookwebapp/types";
import Home from "../Pages/HomeAuthenticated";
import icon from "../../public/logo.svg";
import Search from "../Pages/Search";

export const pages: Page[] = [
  { title: "Library", path: "/", element: <Home />, image: icon },
  { title: "Search", path: "/search", element: <Search /> },
];
