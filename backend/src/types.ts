import { Role, User } from "@bookwebapp/types";
import "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: User | JwtPayload | any & {
        id: number;
      }

      role?: any;
      permissions: string[];
      allowPasswordResetBypass: boolean,

      auth?: {
        skipOldPasswordCheck?: boolean;
      };

      ID?: any;
    }
  }
}