import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const IS_AUTHENTICATED = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN"];

    if (!token) {
      return res.status(401).json({ error: "No cookie detected" });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any;
    
    next();
  } catch (err) {
    res.status(401).json({ error: "An error occured" });
  }
};