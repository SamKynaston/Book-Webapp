import Express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/authentication.middleware";
import {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/", getAllBooks);
router.post("/", createBook);
router.get("/:id", getBook);
router.put("/:id", updateBook);

export default router;
