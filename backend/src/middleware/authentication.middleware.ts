import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import RoleModel from "../models/role.model";
import PermissionModel from "../models/permission.model";

export const IS_AUTHENTICATED = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies[process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN"];

    if (!token) {
      return res.status(401).json({ success: false, error: "No cookie detected" });
    };

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };

    const user = await UserModel.findByPk(decoded.id, {
        attributes: { exclude: ["password"] },
        include: [
        {
            model: RoleModel,
            as: "roles",
            through: { attributes: [] },
            include: [
            {
                model: PermissionModel,
                as: "permissions",
                through: { attributes: [] }
            }
            ]
        }
        ]
    });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Authentication failed." });
  }
};