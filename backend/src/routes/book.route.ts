import Express, { Request, Response } from "express";

import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import { REQUIRE_PERMISSION } from "../middleware/permissions.middleware";
import {
  CREATE_BOOK,
  GET_BOOK,
  GET_ALL_BOOKS,
  UPDATE_BOOK,
  FAVOURITE_BOOK,
  UNFAVOURITE_BOOK,
  IS_FAVOURITE_BOOK,
  DELETE_BOOK
} from "../controllers/book.controller";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";
import { BookSchema } from "../schemas/books.schema";

const router = Express.Router();

router.get("/", GET_ALL_BOOKS);
router.post("/", IS_AUTHENTICATED, VALIDATE_INPUT(BookSchema), REQUIRE_PERMISSION("WRITE_BOOKS"), CREATE_BOOK);
router.get("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("READ_BOOKS"), GET_BOOK);
router.put("/:id", IS_AUTHENTICATED, VALIDATE_INPUT(BookSchema), REQUIRE_PERMISSION("WRITE_BOOKS"), UPDATE_BOOK);
router.get("/:id/favourited", IS_AUTHENTICATED, IS_FAVOURITE_BOOK);
router.post("/:id/favourite", IS_AUTHENTICATED, FAVOURITE_BOOK);
router.post("/:id/unfavourite", IS_AUTHENTICATED, UNFAVOURITE_BOOK);
router.delete("/:id", IS_AUTHENTICATED, REQUIRE_PERMISSION("DELETE_BOOKS"), DELETE_BOOK)

export default router;
