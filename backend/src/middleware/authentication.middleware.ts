import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import { hashPassword } from "../utils/password";

export const IS_AUTHENTICATED = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers.token) {
    return res
      .status(401)
      .json({ message: "No authentication token provided" });
  }
  next();
};

export const HASH_PASSWORD = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body.password) {
      return res.status(400).json({ error: "Password is required" });
    }

    req.body.password = await hashPassword(req.body.password);
    next();
  } catch (err) {
    res.status(500).json({ error: "Failed to hash password" });
  }
};
