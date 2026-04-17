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
router.post("/authenticate", AUTHENTICATE_USER);
router.put("/:id", IS_AUTHENTICATED, UPDATE_USER);
router.get("/me", IS_AUTHENTICATED, GET_USER);

export default router;
