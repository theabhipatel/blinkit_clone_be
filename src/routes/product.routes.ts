import { Router } from "express";
import { getProducts } from "../controllers/product.controller";

const productRouter = Router();

productRouter.get("/", getProducts);

export default productRouter;
