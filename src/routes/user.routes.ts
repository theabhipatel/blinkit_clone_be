import { Router } from "express";
import { createAddress } from "../controllers/user.controller";

const userRouter = Router();

userRouter.post("/address", createAddress);

export default userRouter;
