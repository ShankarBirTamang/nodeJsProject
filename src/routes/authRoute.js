import express from "express";
import { forgotPassword, login , logOut,register, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/login",login);
router.post("/logout",logOut);
router.post("/register",register);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:userId",resetPassword);
export default router;