import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RoleModel } from "../models/role.model";
import { PermissionModel } from "../models/permission.model";
import BookModel from "../models/book.model";
import AuthorModel from "../models/author.model";

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
    expiresIn: "1h",
  });

  return token;
}

export const CREATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    const user = await createUser(username, password, email);
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

export const AUTHENTICATE_USER = async (req: Request, res: Response) => {
  try {
    const { password, email } = req.body;
    
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

    const { email, username, password } = req.body;
    if (email) user.email = email;
    if (username) user.username = username;
    if (password !== null && password.trim() !== "") user.password = password;

    await user.save();

    res.status(200).json({ success: true, body: user })
  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false });
  }
};