import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/", getAllBooks);
router.post("/", IS_AUTHENTICATED, createBook);
router.get("/:id", getBook);
router.put("/:id", IS_AUTHENTICATED, updateBook);

export default router;
