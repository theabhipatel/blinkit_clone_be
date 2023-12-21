import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductsByCategory,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.post("/", createProduct);

export default productRouter;
