import { Router } from "express";
import productRouter from "./product.routes";
import categoryRouter from "./category.routes";
import subCategoryRouter from "./subCategory.routes";
import authRouter from "./auth.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/sub-categories", subCategoryRouter);

export default router;
