import Express, { Request, Response } from "express";
import { isAuthenticated } from "../middleware/authentication.middleware";
import {
  createBook,
  getBook,
  getAllBooks,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/works", getAllBooks);
router.post("/works", createBook);
router.get("/works/:id", getBook);
router.put("/works/:id", isAuthenticated, createBook);

export default router;
