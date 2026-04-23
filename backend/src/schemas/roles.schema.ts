import * as zod from "zod";
import { Role } from "@bookwebapp/types";
import { PermissionsSchema } from "./permissions.schema";

export const RoleSchema: zod.ZodType<Role> = zod.object({
  roleId: zod.number(),
  name: zod.string(),
  permissions: zod.array(PermissionsSchema),
}).strict();