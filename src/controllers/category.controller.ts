import { RequestHandler } from "express";
import categoryModel from "../models/categoryModel";

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

export const createSubCategory: RequestHandler = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    if (categoryId) {
      const newCategory = await categoryModel.findByIdAndUpdate(
        { _id: categoryId },
        { $push: { subCategories: { ...req.body } } }
      );
      if (!newCategory)
        return res
          .status(404)
          .json({ success: false, message: "Sub Category not found." });
      res.status(201).json({ success: true, message: "Sub Category created." });
    }
  } catch (error) {
    next(error);
  }
};

export const getAllCategories: RequestHandler = async (req, res, next) => {
  try {
    const categories = await categoryModel.find(
      {},
      { subCategories: { $slice: 1 } }
    );
    res
      .status(200)
      .json({ success: true, message: "Categories fetched.", categories });
  } catch (error) {
    next(error);
  }
};

export const getSubCategoriesByCategory: RequestHandler = async (
  req,
  res,
  next
) => {
  const { categoryId } = req.params;
  try {
    if (categoryId) {
      const category = await categoryModel.findById(categoryId);
      return res
        .status(200)
        .json({ success: true, message: "Category fetched.", category });
    }
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
