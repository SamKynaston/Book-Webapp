import Express, { Request, Response } from "express";

import {
  IS_AUTHENTICATED,
  HASH_PASSWORD,
} from "../middleware/authentication.middleware";

import {
  CREATE_USER,
  AUTHENTICATE_USER,
  GET_USER,
  UPDATE_USER,
} from "../controllers/users.controller";

const router = Express.Router();

router.post("/", HASH_PASSWORD, CREATE_USER);
router.post("/login", AUTHENTICATE_USER);
router.get("/:id", GET_USER);
router.put("/:id", IS_AUTHENTICATED, UPDATE_USER);

export default router;
