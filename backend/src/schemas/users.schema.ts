import * as zod from "zod";
import { User } from "@bookwebapp/types";
import { RoleSchema } from "./roles.schema";

export const UserSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  email: zod.string(),
}).strict();