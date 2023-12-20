import { Router } from "express";
import {
  createSubCategory,
  getAllSubCategories,
} from "../controllers/subCategory.controller";

const subCategoryRouter = Router();

subCategoryRouter.get("/", getAllSubCategories);
subCategoryRouter.post("/", createSubCategory);

export default subCategoryRouter;
