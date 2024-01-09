import { Router } from "express";
import { createAddress, getAddresses } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/address", getAddresses);
userRouter.post("/address", createAddress);

export default userRouter;
