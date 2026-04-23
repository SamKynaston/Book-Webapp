import * as zod from "zod";
import { PERMISSIONS_STRING } from "@bookwebapp/types";

export const PermissionsStringSchema: zod.ZodType<PERMISSIONS_STRING> = zod.enum([
  "READ_BOOKS",
  "WRITE_BOOKS",
  "DELETE_BOOKS",
  "READ_USERS",
  "WRITE_USERS",
  "DELETE_USERS",
  "ADMINISTRATOR",
]);