import * as zod from "zod";
import { User } from "@bookwebapp/types";
import { RoleSchema } from "./roles.schema";

export const BookSchema = zod.object({
  title: zod.string(),
  first_publish_year: zod.number(),
  cover_id: zod.number(),
  authors: zod.array(zod.number()),
  is_recommended: zod.boolean(),
}).strict();