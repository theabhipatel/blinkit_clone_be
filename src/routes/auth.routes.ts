import { Router } from "express";
import { loginOrSignup, verifyOtp } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.use("/login-signup", loginOrSignup);
authRouter.use("/verify-otp", verifyOtp);

export default authRouter;
