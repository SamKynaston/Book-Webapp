import * as zod from "zod";
import { User } from "@bookwebapp/types";
import { RoleSchema } from "./roles.schema";

export const UserSchema: zod.ZodType<User> = zod.object({
  id: zod.number(),
  username: zod.string(),
  password: zod.string(),
  email: zod.string(),
  roles: zod.array(RoleSchema),
}).strict();