import * as zod from "zod";
import { User } from "@bookwebapp/types";
import { RoleSchema } from "./roles.schema";

export const UserSchema = zod.object({
  username: zod.string().regex(/^\S+$/),
  password: zod.string().min(8).max(32),
  email: zod.email(),
}).strict();

export const UserAuthenticationSchema = zod.object({
    password: zod.string().min(8).max(32),
    email: zod.email(),
})