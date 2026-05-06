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
// Creates a new user using the username, password, and email parameters
const createUser = async (username: string, password: string, email: string) => {
  // Create the user in the database
  // NOTE: The model automatically hashes the password upon creation and all future updates
  const user = await UserModel.create({ username, password, email });
  
  // Gets the default user role. 
  const userRole = await RoleModel.findOne({
    where: { name: "User" },
  });

  // If found, assigns it to the user
  if (userRole) {
    await user.setRoles([userRole]);
  }

  // Return the user
  return user;
};

// Checks to see if the user exists, then if the attempted password matches cryptographically using bcrypt
const authenticateUser = async (email: string, password: string) => {
  let user = null
  
  // If there is an email, check to see if the user exists in the records
  if (email) {
    user = await UserModel.findOne({ where: { email } });
  } else {
    // if no error is supplied, throw an error
    throw new Error("Invalid credentials");
  }

  if (!user) {
    // If the user doesn't exist, then throw an error
    throw new Error("Invalid credentials");
  }

  // Confirms the password matches cryptographically
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // If not, then throw an error
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  // Issue a JWT token that expires in 24 hours.
  const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  // Return the token.
  return token;
}

// Creates a new user using data thqt's been validated in middleware
export const CREATE_USER = async (req: Request, res: Response) => {
  try {
    // Attempted username, password, and email of the new user
    const { username, password, email } = req.body;

    // Creates the new user
    await createUser(username, password, email);

    // Authenticate the user and then sign them in via the SESSION_TOKEN cookie.
    // NOTE: Cookies are assigned by the server to reduce the risk of potential XSS exploits.
    // NOTE: The system this was based on, a codebase from 2022 that I wrote instead assigned cookies on the client, which was insecure and increased the risk of potential XSS exploits
    const token = await authenticateUser(email, password)

    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    // Return a success
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
};

// Creates a new user, but via the admin dashboard
// NOTE: Passwords are set to the current date (DD/MM/YYYY). Must then be changed by the user once signed in, as otherwise the account will be locked
// NOTE: This password format is NOT secure, however, it is the best potential solution for this project.
export const CREATE_USER_ADMIN = async (req: Request, res: Response) => {
  try {
    // Username and Email
    const { username, email } = req.body;

    // Get the current date
    const now = new Date()
    const tempPassword = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;
    
    // Create the new user using the same function as the CREATE_USER controller
    const user = await createUser(username, tempPassword, email);

    // Set the user's must_reset_password flag to true and save
    user.must_reset_password = true;
    await user.save();

    // Return a success
    res.status(201).json({ success: true });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false });
  }
};

// Signs the user in with their email and password
export const AUTHENTICATE_USER = async (req: Request, res: Response) => {
  try {
    // Get their email and password from the request's body
    const { email, password } = req.body;
    
    // Use the authenticateUser to get a JWT token and then create a new cookie
    let token = await authenticateUser(email, password);
    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    // Return a success
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: "Incorrect credentials" });
  }
};

// Gets an individual user using their ID
export const GET_USER = async (req: Request, res: Response) => {
  try {
    // Get the ID of the User
    const user = await UserModel.findByPk(req.user!.id, {
      attributes: { exclude: ["password"] }, // ALWAYS exclude the hashed password
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

    // If they don't exist, then return a 404
    if (!user) {
      return res.status(404).json({ success: false });
    }
    
    // If they exist, then return a success alongside the user and their roles and permissions
    res.status(200).json({ body: user, success: true });
  } catch (error) {
    return res.status(401).json({ success: false });
  }
};

// Gets all users
// NOTE: Not an optimal solution, but works for the scope of this project. In production the system should utilise pagination.
export const GET_ALL_USERS = async( req: Request, res: Response ) => {
  try {
    // Gets all users in the database alongside their roles
    const users = await UserModel.findAll({
      attributes: { exclude: ["password"] }, // ALWAYS exclude the hashed password
      include: [
        {
          model: RoleModel,
          as: "roles",
          through: { attributes: [] },
        }
      ]
    });

    // Return a success
    res.status(200).json({ body: users, success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

// Gets a user's favourite books
export const GET_FAVOURITES = async (req: Request, res: Response) => {
  try {
    // Find the user using their id
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

    // If they dont exist, return a 404
    if (!user) {
      return res.status(404).json({ success: false });
    }

    // If they exist, then return their favourited books alongside associated authors.
    res.status(200).json({ success: true, body: user.favourites })
  } catch (err) {
    return res.status(500).json({ success: false })
  }
}

// Logs a user out by clearing the user's session cookie
export const LOGOUT_USER = async (req: Request, res: Response) => {
  try {
    res.clearCookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", {
      httpOnly: true,
      secure: false,
      sameSite: "lax", 
      path: "/",
    });
    
    // Return a success
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
}

// Updates a user
export const UPDATE_USER = async (req: Request, res: Response) => {
  try {
    // Get the user's ID from the url's parameters
    const idParam = req.params.id;

    // Check to ensure the ID is not an array
    if (Array.isArray(idParam)) {
        return res.status(400).json({ success: false });
    }
    
    // Convert the ID into a number
    const targetId = parseInt(idParam, 10);

    // Gets the user using the converted ID
    const user = await UserModel.findByPk(targetId, {
      attributes: { exclude: ["password"] },
    });

    // If the user does not exist, return a 404
    if (!user) {
      return res.status(404).json({ success: false });
    }

    // Gets the email and username in the body, and if they exist, sets them accordingly
    const { email, username } = req.body;
    if (email) user.email = email;
    if (username) user.username = username;

    // Save any changes
    await user.save();

    // Issue a new token
    const token = jwt.sign({ id: user.id, username: user.username, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    res.cookie(process.env.SESSION_TOKEN_NAME || "SESSION_TOKEN", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", 
      path: "/",
    });

    // Return a success
    res.status(200).json({ success: true, body: user })
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// Force an admin password reset, which sets the password to a temporary value and sets the must_reset_password flag to true, locking the account
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

    // Get the current date and generate a new password
    const now = new Date();
    const tempPassword = `${now.getDate().toString().padStart(2, "0")}/${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${now.getFullYear()}`;

    // Set the temporary password and flag
    user.password = tempPassword
    user.must_reset_password = true;

    // Save changes
    await user.save();

    // Return a 200 alongside a message
    res.status(200).json({ success: true, message: "User is now required to change their password during their next session" })
  } catch (err) {
    res.status(500).json({ success: false });
  }
};

// Completes a password reset, whether through forced admin resets or otherwise
export const COMPLETE_PASSWORD_RESET = async (req: Request, res: Response) => {
  try {
    // Gets the user's ID from the authenticated user (set in middleware)
    const userId = req.user.id;

    // Finds the user in the database
    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ success: false });

    // Gets the new and old passwords the user is attempting to use in the body of the request
    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    // If the old password doesn't match, return a 403 and reject the request
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordValid) return res.status(403).json({ success: false });

    // Set the user's brand new password and turn the flag off
    user.password = newPassword;
    user.must_reset_password = false;

    // Save all changes and return a success
    await user.save();
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};

// Allows the user to request a password reset
export const REQUEST_PASSWORD_RESET = async (req: Request, res: Response) => {
  try {
    // Issue a random UUID as a token
    const token = crypto.randomUUID();

    // Gets the User ID
    const userId = req.user.id

    // Finds the user in the database
    const user = await UserModel.findByPk(userId);
    if (!user) return res.status(404).json({ success: false });

    // If there is already a passwordresetrequest in the databae, destroy it
    await PasswordResetModel.destroy({
      where: { userId }
    });

    // Create a passwordreset request in the database using the user's id and token
    await PasswordResetModel.create({
      userId: userId,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30) // 30 mins
    });

    // Return the token and a message
    return res.status(200).json({
      success: true,
      token: token,
      message: "Password reset requested"
    });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
};