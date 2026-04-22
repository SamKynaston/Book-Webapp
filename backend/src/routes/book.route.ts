import Express, { Request, Response } from "express";

import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import { REQUIRE_PERMISSION } from "../middleware/permissions.middleware";
import {
  createBook,
  getBook,
  getAllBooks,
  updateBook,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/", getAllBooks);
router.post("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_BOOKS"), createBook);
router.get("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("READ_BOOKS"), getBook);
router.put("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_BOOKS"), updateBook);

export default router;
