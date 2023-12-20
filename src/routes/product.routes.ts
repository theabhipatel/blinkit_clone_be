import { Router } from "express";
import { createProduct, getProducts } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.post("/", createProduct);

export default productRouter;
