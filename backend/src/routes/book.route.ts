import Express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/authentication.middleware";
import {
  createBook,
  getBook,
  getAllBooks,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.get("/:id", getBook);
router.put("/:id", isAuthenticated, createBook);

export default router;
