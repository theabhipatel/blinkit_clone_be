import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAddresses,
} from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/addresses", getAddresses);
userRouter.post("/addresses", createAddress);
userRouter.delete("/addresses/:id", deleteAddress);

export default userRouter;
