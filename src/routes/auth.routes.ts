import { Router } from "express";
import { loginOrSignup, verifyOtp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/login-signup", loginOrSignup);
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
