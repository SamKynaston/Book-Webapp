import type { Page } from "../Types/Pages.ts";
import Home from "../Pages/Home";

export const pages: Page[] = [
  { title: "Library", path: "/", element: <Home /> },
];
