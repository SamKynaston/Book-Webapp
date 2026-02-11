import Express, { Request, Response } from "express";

import {
  isAuthenticated,
  hashPass,
} from "../middleware/authentication.middleware";

import {
  createUser,
  updateUser,
  getUser,
} from "../controllers/users.controller";

const router = Express.Router();

router.post("/", hashPass, createUser);
router.get("/:id", getUser);
router.put("/:id", isAuthenticated, updateUser);

export default router;
