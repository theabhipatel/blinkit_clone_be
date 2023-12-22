import { Router } from "express";
import {
  createProduct,
  getProduct,
  getProducts,
  getProductsByCategory,
  getProductsBySubCategory,
  getSearchedProducts,
} from "../controllers/product.controller";

const productRouter = Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/search", getSearchedProducts);
productRouter.get("/:productId", getProduct);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.get("/sub-category/:subCategoryId", getProductsBySubCategory);

export default productRouter;
