import { Request, Response, NextFunction } from "express";

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
