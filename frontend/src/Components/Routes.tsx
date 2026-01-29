import type { Page } from "@bookwebapp/types";
import Home from "../Pages/Home";
import icon from "../../public/libraryicn.svg";

export const pages: Page[] = [
  { title: "Library", path: "/", element: <Home />, image: icon },
];
