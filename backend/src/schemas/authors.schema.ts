import * as zod from "zod";
import { Author } from "@bookwebapp/types";

export const AuthorSchema = zod.object({
  name: zod.string(),
}).strict();