import { RequestHandler } from "express";
import categoryModel from "../models/categoryModel";

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryModel.find();
    res
      .status(200)
      .json({ success: true, message: "Categories fetched.", categories });
  } catch (error) {
    next(error);
  }
};

export const createCategory: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = await categoryModel.create({
      ...req.body,
    });
    res.status(201).json({ success: true, message: "Category created." });
  } catch (error) {
    next(error);
  }
};

/** ---> sample request handler */
export const sample: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
