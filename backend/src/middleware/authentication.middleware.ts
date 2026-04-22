import { Request, Response, NextFunction } from "express";
import { hashPassword } from "../utils/password";
import jwt from "jsonwebtoken";
import RoleModel from "../models/role.model";
import { UserModel } from "../models/user.model";

export const IS_AUTHENTICATED = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN"];

    if (!token) {
      console.log(req.cookies)
      return res.status(401).json({ error: "No cookie detected" });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as any;
    
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "An error occured" });
  }
};

export const GET_PERMISSIONS = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      req.role = await RoleModel.findOne({ where: { name: "Guest" }, include: ["permissions"]});
    } else {
      req.role = [req.user.roles];
    }

    req.permissions = req.role.permissions.map((p: any) => p.permission_string);    
    next();
  } catch (err) {
    res.status(500).json({ error: "Failed to get permissions" });
  }
}