import * as zod from "zod";
import { Author } from "@bookwebapp/types";

export const AuthorSchema: zod.ZodType<Author> = zod.object({
  id: zod.number(),
  name: zod.string(),
}).strict();