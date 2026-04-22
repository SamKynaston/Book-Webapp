import Express, { Request, Response } from "express";

import {
  IS_AUTHENTICATED,
} from "../middleware/authentication.middleware";

import { OWNERSHIP_CHECK } from "../middleware/permissions.middleware";

import {
  CREATE_USER,
  AUTHENTICATE_USER,
  GET_USER,
  UPDATE_USER,
  LOGOUT_USER,
} from "../controllers/users.controller";

const router = Express.Router();

router.post("/", CREATE_USER);
router.post("/authenticate", AUTHENTICATE_USER);
router.post("/logout", IS_AUTHENTICATED, LOGOUT_USER);
router.get("/me", IS_AUTHENTICATED, GET_USER);

router.put("/:id", IS_AUTHENTICATED, OWNERSHIP_CHECK, UPDATE_USER);

export default router;
