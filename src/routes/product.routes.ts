import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getProduct);
productRouter.get("/category/:categoryId", getProductsByCategory);

export default productRouter;
