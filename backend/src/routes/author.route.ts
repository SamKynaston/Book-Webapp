import Express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/authentication.middleware";
import {
  createAuthor,
  getAuthor,
  getAllAuthors,
} from "../controllers/author.controller";

const router = Express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthor);

export default router;
