import express from "express";
import { Register, login } from "../controllers/userController";

const router = express.Router();
router.post("/register", Register);
router.post("/login", login);

export { router as userRouter };
