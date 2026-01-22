import React from "react";
import type { ReactNode } from "react";

export type Page = {
  title: string; // Shows in the title
  path: string; // The path of the page in the browser (EG: http://EXAMPLE.COM/home)
  element: ReactNode; // The page itself, stored as <PAGE_NAME />
  ignore?: boolean; // Allows the navigation bar to ignore a specific route (such as for error messages)
};

export interface NavigationProps {
  pages: Page[];
}

export interface PageProps {
  children: React.ReactNode;
}
