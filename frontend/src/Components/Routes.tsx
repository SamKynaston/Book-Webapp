import type { Page } from "@bookwebapp/types";
import Home from "../Pages/Home";

export const pages: Page[] = [
  { title: "Library", path: "/", element: <Home /> },
];
