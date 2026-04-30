import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import {
  GET_BOOK_AVAILABILITY
} from "../controllers/inventory.controller";
const router = Express.Router();

router.get("/:id", GET_BOOK_AVAILABILITY);

export default router;
