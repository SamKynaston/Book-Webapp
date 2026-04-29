import Express, { Request, Response } from "express";

import {
  IS_AUTHENTICATED,
} from "../middleware/authentication.middleware";

import { OWNERSHIP_CHECK } from "../middleware/permissions.middleware";

import {
  CREATE_USER,
  AUTHENTICATE_USER,
  GET_USER,
  GET_FAVOURITES,
  UPDATE_USER,
  LOGOUT_USER,
} from "../controllers/users.controller";

import { UserSchema, UserAuthenticationSchema } from "../schemas/users.schema";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";

const router = Express.Router();

router.post("/", VALIDATE_INPUT(UserSchema), CREATE_USER);
router.post("/authenticate", VALIDATE_INPUT(UserAuthenticationSchema), AUTHENTICATE_USER);
router.post("/logout", IS_AUTHENTICATED, LOGOUT_USER);
router.get("/me", IS_AUTHENTICATED, GET_USER);
router.get("/favourites", IS_AUTHENTICATED, GET_FAVOURITES)
router.put("/:id", IS_AUTHENTICATED, VALIDATE_INPUT(UserSchema), OWNERSHIP_CHECK, UPDATE_USER);

export default router;
