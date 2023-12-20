import { Router } from "express";
import productRouter from "./product.routes";

const router = Router();

router.use("/products", productRouter);

export default router;
