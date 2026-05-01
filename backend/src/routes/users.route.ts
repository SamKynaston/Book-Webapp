import Express, { Request, Response } from "express";

import {
  IS_AUTHENTICATED,
  VALIDATE_PASSWORD_RESET_TOKEN,
  CONFIRM_ADMIN_RESET
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
  COMPLETE_PASSWORD_RESET,
  REQUEST_PASSWORD_RESET,
  CREATE_USER_ADMIN
} from "../controllers/users.controller";

import { UserSchema, UserAuthenticationSchema, UserEditSchema, UserPasswordReset, AdminUserCreationSchema } from "../schemas/users.schema";
import { VALIDATE_INPUT } from "../middleware/validate.middleware";

const router = Express.Router();

router.get("/", IS_AUTHENTICATED, REQUIRE_PERMISSION("GET_ALL_USERS"), GET_ALL_USERS);
router.post("/", VALIDATE_INPUT(UserSchema), CREATE_USER);
router.post("/authenticate", VALIDATE_INPUT(UserAuthenticationSchema), AUTHENTICATE_USER);
router.post("/logout", IS_AUTHENTICATED, LOGOUT_USER);
router.post("/request-password-reset", IS_AUTHENTICATED, REQUEST_PASSWORD_RESET);
router.get("/me", IS_AUTHENTICATED, GET_USER);
router.get("/favourites", IS_AUTHENTICATED, GET_FAVOURITES)
router.post("/create-account", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_USERS"), VALIDATE_INPUT(AdminUserCreationSchema), CREATE_USER_ADMIN);
router.put("/:id", IS_AUTHENTICATED, VALIDATE_INPUT(UserEditSchema), OWNERSHIP_CHECK, UPDATE_USER);
router.post("/:id/admin-reset-password", IS_AUTHENTICATED, REQUIRE_PERMISSION("WRITE_USERS"), FORCE_PASSWORD_RESET);
router.post("/:id/reset-password", CONFIRM_ADMIN_RESET, IS_AUTHENTICATED, VALIDATE_INPUT(UserPasswordReset), OWNERSHIP_CHECK, COMPLETE_PASSWORD_RESET)
router.post("/:id/reset-password/token", VALIDATE_PASSWORD_RESET_TOKEN, VALIDATE_INPUT(UserPasswordReset), OWNERSHIP_CHECK, COMPLETE_PASSWORD_RESET)

export default router;
