import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { RoleModel } from "../models/role.model";
import { PermissionModel } from "../models/permission.model";

export const CREATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    const user = await UserModel.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const AUTHENTICATE_USER = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;
    let user = null

    if (username) {
      user = await UserModel.findOne({ where: { username } });
    } else if (email) {
      user = await UserModel.findOne({ where: { email } });
    } else {
      return res.status(400).json({ error: "Username or email required" });
    }

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("AUTH_TOKEN", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });

    res.status(200).json({ message: "Authenticated" });
  } catch (error) {
    console.error(error);
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
    console.error(error);
    return res.status(401).json({ authenticated: false });
  }
};

export const UPDATE_USER = async (req: Request, res: Response) => {};