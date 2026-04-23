import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import {
  createAuthor,
  getAuthor,
  getAllAuthors,
  updateAuthor,
} from "../controllers/author.controller";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";
import { AuthorSchema } from "../schemas/authors.schema";

const router = Express.Router();

router.get("/", getAllAuthors);
router.post("/", IS_AUTHENTICATED, VALIDATE_INPUT(AuthorSchema), createAuthor);
router.get("/:id", getAuthor);
router.put("/:id", IS_AUTHENTICATED, updateAuthor);

export default router;
