import React from "react";
import type { ReactNode } from "react";
import { PERMISSIONS_STRING } from "./Permissions";

export type Page = {
  title: string;
  path: string;
  element: ReactNode;
  ignore?: boolean;
  image?: any;
};

export interface NavigationProps {

}

export interface PageProps {
  children: React.ReactNode;
  requiredPermission?: PERMISSIONS_STRING;
  requiresAccount?: boolean;
}