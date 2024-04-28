import express from "express";

import {
  changePassword,
  login,
  register,
} from "../controllers/auth.controller";

import { authMiddleware } from "../middlewares/middleware";

const authRouter = express.Router();

authRouter.post("/signin", login);
authRouter.post("/register", register);
authRouter.post("/change-password", authMiddleware, changePassword);
// authRouter.post('/verify', verifyToken)
export { authRouter };
