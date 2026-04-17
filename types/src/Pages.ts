import React from "react";
import type { ReactNode } from "react";

export type Page = {
  title: string;
  path: string;
  element: ReactNode;
  ignore?: boolean;
  image?: any;
};

export interface NavigationProps {
  pages: Page[];
}

export interface PageProps {
  children: React.ReactNode;
  requiredPermission?: string;
  requiresAccount?: boolean;
}