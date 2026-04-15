import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../utils/password";

export const IS_AUTHENTICATED = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.headers.token) {
      res.status(401).json({ message: "No authentication token provided" });
    }

    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

export const HASH_PASSWORD = async (
  req: Request,
  res: Response,
  next: NextFunction,
) : Promise<void> => {
  try {
    if (!req.body.password) {
      res.status(400).json({ error: "Password is required" });
    }

    req.body.password = await hashPassword(req.body.password);

    next();
  } catch (err) {
    res.status(500).json({ error: "Failed to hash password" });
  }
};
