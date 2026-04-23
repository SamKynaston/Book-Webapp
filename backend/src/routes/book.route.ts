import Express, { Request, Response } from "express";

import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import { REQUIRE_PERMISSION } from "../middleware/permissions.middleware";
import {
  CREATE_BOOK,
  GET_BOOK,
  GET_ALL_BOOKS,
  UPDATE_BOOK,
} from "../controllers/book.controller";

const router = Express.Router();

router.get("/", GET_ALL_BOOKS);
router.post("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_BOOKS"), CREATE_BOOK);
router.get("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("READ_BOOKS"), GET_BOOK);
router.put("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_BOOKS"), UPDATE_BOOK);

export default router;
