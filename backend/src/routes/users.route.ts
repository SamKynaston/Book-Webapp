import Express, { Request, Response } from "express";

import {
  IS_AUTHENTICATED,
  BYPASS_PASSWORD_RESET
} from "../middleware/authentication.middleware";

import { OWNERSHIP_CHECK, REQUIRE_PERMISSION } from "../middleware/permissions.middleware";

import {
  CREATE_USER,
  AUTHENTICATE_USER,
  GET_USER,
  GET_ALL_USERS,
  GET_FAVOURITES,
  UPDATE_USER,
  FORCE_PASSWORD_RESET,
  LOGOUT_USER,
  COMPLETE_PASSWORD_RESET
} from "../controllers/users.controller";

import { UserSchema, UserAuthenticationSchema, UserEditSchema, UserPasswordReset } from "../schemas/users.schema";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";

const router = Express.Router();

router.get("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("GET_ALL_USERS"), GET_ALL_USERS);
router.post("/", VALIDATE_INPUT(UserSchema), CREATE_USER);
router.post("/authenticate", VALIDATE_INPUT(UserAuthenticationSchema), AUTHENTICATE_USER);
router.post("/logout", IS_AUTHENTICATED, LOGOUT_USER);
router.get("/me", IS_AUTHENTICATED, GET_USER);
router.get("/favourites", IS_AUTHENTICATED, GET_FAVOURITES)
router.put("/:id", IS_AUTHENTICATED, VALIDATE_INPUT(UserEditSchema), OWNERSHIP_CHECK, UPDATE_USER);
router.post("/:id/admin-reset-password", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_USERS"), FORCE_PASSWORD_RESET);
router.post("/:id/reset-password", BYPASS_PASSWORD_RESET, IS_AUTHENTICATED, VALIDATE_INPUT(UserPasswordReset), OWNERSHIP_CHECK, COMPLETE_PASSWORD_RESET)

export default router;
