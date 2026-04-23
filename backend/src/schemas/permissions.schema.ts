import * as zod from "zod";
import { RolePermission } from "@bookwebapp/types";
import { PermissionsStringSchema } from "./permissions_string.schema";

export const PermissionsSchema: zod.ZodType<RolePermission> = zod.object({
  permissionId: zod.number(),
  permission_string: PermissionsStringSchema,
}).strict();