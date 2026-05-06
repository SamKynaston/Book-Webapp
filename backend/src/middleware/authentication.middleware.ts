import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../models/user.model";
import RoleModel from "../models/role.model";
import PermissionModel from "../models/permission.model";
import PasswordResetModel from "../models/password-reset.model";

// Validates a request's password reset token
export const VALIDATE_PASSWORD_RESET_TOKEN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the body of the request
    const token = req.body.token;

    if (!token) {
      return res.status(400).json({ success: false, error: "Missing token" });
    }

    // Check to see if there's a password reset request with the specified token, dropping the request if not
    const resetEntry = await PasswordResetModel.findOne({
      where: { token },
      include: [{ model: UserModel, as: "user" }]
    }) as PasswordResetModel & { user: UserModel };

    if (!resetEntry) {
      return res.status(403).json({ success: false, error: "Invalid token" });
    }

    // If the token has expired, then drop the request
    if (resetEntry.expiresAt < new Date()) {
      return res.status(403).json({ success: false, error: "Token expired" });
    }

    // Set the req's user as the user in the entry
    req.user = resetEntry.user;

    next();
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};

// Confirms a user is authenticated by using the user's session token
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

    // Verify the token is legitimate
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { username: string, email: string, };

    // Get the user from the decoded token's username and email, including their roles and permissions
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

    // If the user must reset the password and cannot bypass, reject the request with a specific request flag to force the client to redirect to /password-reset
    if (user?.must_reset_password && !req.allowPasswordResetBypass) {
      return res.status(403).json({
        success: false,
        body: user,
        forceReset: true,
      });
    }

    // Set the request's user accordingly
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: "Authentication failed." });
  }
};

// Confirms that the user is in an  admin reset locked state
export const CONFIRM_ADMIN_RESET = async ( req: Request, res: Response, next: NextFunction ) => {
  try {
    // Get the user's id from the request's parameters
    const userId = req.params.id;

    if (!userId || Array.isArray(userId)) {
      return res.status(400).json({ success: false });
    }

    // Gets the user using the user's id
    const user = await UserModel.findByPk(parseInt(userId, 10))
    if (!user) {
      return res.status(404).json({ success: false });
    }

    // If the must_reset_password flag is set to false, reject the request
    if (!user.must_reset_password) {
      return res.status(403).json({
        success: false,
        message: "User is not in reset state"
      });
    }

    next()
  } catch (err) {
    res.status(500).json({ success: false });
  }
}