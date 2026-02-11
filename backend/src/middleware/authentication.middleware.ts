import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";

export const isAuthenticated = (
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

const saltRounds = 10;
export const hashPass = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body.Password) {
      return res.status(400).json({ error: "Password is required" });
    }

    req.body.Password = await bcrypt.hash(req.body.Password, saltRounds);
    next();
  } catch (err) {
    res.status(501);
    res.status(500).json({ error: "Failed to hash password" });
  }
};
