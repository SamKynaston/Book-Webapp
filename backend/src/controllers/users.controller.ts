import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RoleModel } from "../models/role.model";
import { PermissionModel } from "../models/permission.model";

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

const authenticateUser = async (password: string, email: string) => {
  let user = null
  
  if (email) {
    user = await UserModel.findOne({ where: { email } });
  } else {
    throw new Error("Username or email required");
  }

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });

  return token;
}

export const CREATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, password_plain, email } = req.body;

    const user = await createUser(username, password, email);
    const token = await authenticateUser(password_plain, email);

    res.cookie("AUTH_TOKEN", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });

    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const AUTHENTICATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    
    let token = await authenticateUser(password, email);

    res.cookie("AUTH_TOKEN", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });

    res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
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
      return res.status(404).json({ error: "User not found" });
    }
    
    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    return res.status(401).json({ authenticated: false });
  }
};

export const LOGOUT_USER = async (req: Request, res: Response) => {
  try {
    res.clearCookie("AUTH_TOKEN", {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });
    
    res.status(200).json({ message: "Logged out" });
  } catch (err) {
    res.status(500).json({ error: "An error occured" });
  }
}

export const UPDATE_USER = async (req: Request, res: Response) => {};