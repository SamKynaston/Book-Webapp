import Express, { Request, Response } from "express";
import { IS_AUTHENTICATED } from "../middleware/authentication.middleware";
import { REQUIRE_PERMISSION } from "../middleware/permissions.middleware";
import {
  GET_BOOK_AVAILABILITY,
  UPDATE_BOOK_AVAILABILITY,
  GET_ALL_INVENTORY,
  CREATE_INVENTORY
} from "../controllers/inventory.controller";
const router = Express.Router();

router.get("/:id", GET_BOOK_AVAILABILITY);
router.put("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_INVENTORY"), UPDATE_BOOK_AVAILABILITY)
router.post("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_INVENTORY"), CREATE_INVENTORY)
router.get("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("READ_ALL_INVENTORY"), GET_ALL_INVENTORY)

export default router;
