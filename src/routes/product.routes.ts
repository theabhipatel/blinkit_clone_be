import { Router } from "express";
import {
  createProduct,
  getBestSellersProducts,
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
productRouter.get("/bestsellers", getBestSellersProducts);
productRouter.get("/category/:categoryId", getProductsByCategory);
productRouter.get("/sub-category/:subCategoryId", getProductsBySubCategory);
productRouter.get("/:productId", getProduct);

export default productRouter;
