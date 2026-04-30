import * as zod from "zod";
import { User } from "@bookwebapp/types";
import { RoleSchema } from "./roles.schema";

export const UserSchema = zod.object({
  username: zod.string().regex(/^\S+$/),
  password: zod.string().min(8, "Password needs to be 8 characters at minimum").max(32, "Password can only be a maximum of 32 characters"),
  email: zod.email("Needs to be an email"),
}).strict();

export const UserEditSchema = zod.object({
  username: zod.string().regex(/^\S+$/),
  email: zod.email("Needs to be an email"),
}).strict();

export const UserPasswordReset = zod.object({
  oldPassword: zod.string(),
  newPassword: zod.string().min(8, "Password needs to be 8 characters at minimum").max(32, "Password can only be a maximum of 32 characters"),
})

export const UserAuthenticationSchema = zod.object({
    password: zod.string().min(8, "Password needs to be 8 characters at minimum").max(32, "Password can only be a maximum of 32 characters"),
    email: zod.email("Needs to be an email"),
})