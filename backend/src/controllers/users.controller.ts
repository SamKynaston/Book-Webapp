import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RoleModel } from "../models/role.model";
import { PermissionModel } from "../models/permission.model";
import BookModel from "../models/book.model";
import AuthorModel from "../models/author.model";
import PasswordResetModel from "../models/password-reset.model";

// Local Functions
const createUser = async (username: string, password: string, email: string) => {
  const user = await UserModel.create({ username, password, email });
  
  const userRole = await RoleModel.findOne({
    where: { name: "User" },
  });

  if (userRole) {
    await user.setRoles([userRole]);
  }

  return user;
};

const authenticateUser = async (email: string, password: string) => {
  let user = null
  
  if (email) {
    user = await UserModel.findOne({ where: { email } });
  } else {
    throw new Error("Invalid credentials");
  }

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return token;
}

export const CREATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    await createUser(username, password, email);
    const token = await authenticateUser(email, password)

    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

export const CREATE_USER_ADMIN = async (req: Request, res: Response) => {
  try {
    const { username, email } = req.body;

    const now = new Date()
    const tempPassword = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
    
    const user = await createUser(username, tempPassword, email);
    user.must_reset_password = true;
    await user.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false });
  }
};

export const AUTHENTICATE_USER = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    let token = await authenticateUser(email, password);
    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Incorrect credentials" });
  }
};

export const GET_USER = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.user!.id, {
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

    if (!user) {
      return res.status(404).json({ success: false });
    }
    
    res.status(200).json({ body: user, success: true });
  } catch (error) {
    return res.status(401).json({ success: false });
  }
};

export const GET_ALL_USERS = async( req: Request, res: Response ) => {
  try {
    const books = await UserModel.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: RoleModel,
          as: "roles",
          through: { attributes: [] },
        }
      ]
    });

    res.status(200).json({ body: books, success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

export const GET_FAVOURITES = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findByPk(req.user!.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: BookModel,
          as: "favourites",
          include: [
            {
              model: AuthorModel,
              as: "authors"
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.status(200).json({ success: true, body: user.favourites })
  } catch (err) {
    return res.status(500).json({ success: false })
  }
}

export const LOGOUT_USER = async (req: Request, res: Response) => {
  try {
    res.clearCookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });
    
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

export const UPDATE_USER = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (Array.isArray(idParam)) {
        return res.status(400).json({ success: false });
    }
    
    const targetId = parseInt(idParam, 10);
    const user = await UserModel.findByPk(targetId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ success: false });
    }

    const { email, username } = req.body;
    if (email) user.email = email;
    if (username) user.username = username;

    await user.save();

    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    res.status(200).json({ success: true, body: user })
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const FORCE_PASSWORD_RESET = async (req: Request, res: Response) => {
  try {
    const idParam = req.params.id;

    if (Array.isArray(idParam)) {
        return res.status(400).json({ success: false });
    }

    const targetId = parseInt(idParam, 10);
    const user = await UserModel.findByPk(targetId, {
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      return res.status(404).json({ success: false });
    }

    const now = new Date();

    const tempPassword = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;

    user.password = tempPassword
    user.must_reset_password = true;
    await user.save();

    res.status(200).json({ success: true, message: "User is now required to change their password during their next session" })
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

export const COMPLETE_PASSWORD_RESET = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ success: false });

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) return res.status(403).json({ success: false });

    user.password = newPassword;
    user.must_reset_password = false;

    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};

export const REQUEST_PASSWORD_RESET = async (req: Request, res: Response) => {
  try {
    const token = crypto.randomUUID();
    const userId = req.user.id

    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ success: false });

    await PasswordResetModel.destroy({
      where: { userId }
    });

    await PasswordResetModel.create({
      userId: userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 mins
    });

    return res.status(200).json({
      success: true,
      token: token,
      message: "Password reset requested"
    });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};