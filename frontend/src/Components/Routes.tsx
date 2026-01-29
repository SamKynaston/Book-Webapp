import type { Page } from "@bookwebapp/types";
import Home from "../Pages/Home";
import icon from "../../public/logo.svg";

export const pages: Page[] = [
  { title: "Library", path: "/", element: <Home />, image: icon },
];
