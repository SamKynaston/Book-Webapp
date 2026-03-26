import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import {
  createAuthor,
  getAuthor,
  getAllAuthors,
  updateAuthor,
} from "../controllers/author.controller";

const router = Express.Router();

router.get("/", getAllAuthors);
router.post("/", IS_AUTHENTICATED, createAuthor);
router.get("/:id", getAuthor);
router.put("/:id", IS_AUTHENTICATED, updateAuthor);

export default router;
