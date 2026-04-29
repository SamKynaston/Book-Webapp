import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import {
  CREATE_AUTHOR,
  GET_ALL_AUTHORS,
  GET_AUTHOR,
  UPDATE_AUTHOR
} from "../controllers/author.controller";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";
import { AuthorSchema } from "../schemas/authors.schema";

const router = Express.Router();

router.get("/", GET_ALL_AUTHORS);
router.post("/", IS_AUTHENTICATED, VALIDATE_INPUT(AuthorSchema), CREATE_AUTHOR);
router.get("/:id", GET_AUTHOR);
router.put("/:id", IS_AUTHENTICATED, UPDATE_AUTHOR);

export default router;
