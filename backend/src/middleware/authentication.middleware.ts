import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import RoleModel from "../models/role.model";
import PermissionModel from "../models/permission.model";
import PasswordResetModel from "../models/password-reset.model";

export const VALIDATE_PASSWORD_RESET_TOKEN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({ success: false, error: "Missing token" });
    }

    const resetEntry = await PasswordResetModel.findOne({
      where: { token },
      include: [{ model: UserModel, as: "user" }]
    }) as PasswordResetModel & { user: UserModel };

    if (!resetEntry) {
      return res.status(403).json({ success: false, error: "Invalid token" });
    }

    if (resetEntry.expiresAt < new Date()) {
      return res.status(403).json({ success: false, error: "Token expired" });
    }

    req.user = resetEntry.user;

    req.auth = {
      skipOldPasswordCheck: true
    };
    next();
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};

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

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { username: string, email: string, };

    const user = await UserModel.findOne({
      where: { username: decoded.username, email: decoded.email },
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
    })

    if (user?.must_reset_password && !req.allowPasswordResetBypass) {
      return res.status(403).json({
        success: false,
        body: user,
        forceReset: true,
      });
    }

    req.user = user;

    if (user) {
      req.user = user;

      req.auth = {
        skipOldPasswordCheck: req.user.must_reset_password
      };
    } else {
      res.status(401).json({ success: false, error: "Authentication failed." });
    }

    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Authentication failed." });
  }
};

export const CONFIRM_ADMIN_RESET = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    const userId = req.params.id;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ success: false });
    }

    const user = await UserModel.findByPk(parseInt(userId, 10))
    if (!user) {
      return res.status(404).json({ success: false });
    }
    
    if (!user.must_reset_password) {
      return res.status(403).json({
        success: false,
        message: "User is not in reset state"
      });
    }

    req.allowPasswordResetBypass = true;
    next()
  } catch (err) {
    res.status(500).json({ success: false });
  }
}