import { User } from "@bookwebapp/types";
import "express";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: User | JwtPayload & {
        id: number;
      }
    }
  }
}