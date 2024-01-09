import { Router } from "express";
import productRouter from "./product.routes";
import categoryRouter from "./category.routes";
import subCategoryRouter from "./subCategory.routes";
import authRouter from "./auth.routes";
import userRouter from "./user.routes";
import { privateRoutes } from "../middlewares/privateRoutes";

const router = Router();

router.use("/auth", authRouter);
router.use("/user", privateRoutes, userRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);

export default router;
