import { Router } from "express";
import {
  createCategory,
  getAllCategories,
} from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.get("/", getAllCategories);
categoryRouter.post("/", createCategory);

export default categoryRouter;
