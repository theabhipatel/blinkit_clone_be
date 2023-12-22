import { Router } from "express";
import {
  createCategory,
  createSubCategory,
  getAllCategories,
  getSubCategoriesByCategory,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/", createCategory);
categoryRouter.get("/", getAllCategories);
categoryRouter.get("/:categoryId", getSubCategoriesByCategory);
categoryRouter.post("/add-sub-category/:categoryId", createSubCategory);

export default categoryRouter;
