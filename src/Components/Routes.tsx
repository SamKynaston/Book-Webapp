import type { Page } from "../Types/Pages.ts";
import Home from "../Pages/Home";

export const pages: Page[] = [{ title: "Home", path: "/", element: <Home /> }];
