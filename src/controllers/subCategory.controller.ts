import { RequestHandler } from "express";
import subCategoryModel from "../models/subCategoryModel";

export const getAllSubCategories: RequestHandler = async (req, res, next) => {
  try {
    const subCategories = await subCategoryModel.find();
    res.status(200).json({
      success: true,
      message: "Sub Categories fetched.",
      subCategories,
    });
  } catch (error) {
    next(error);
  }
};

export const createSubCategory: RequestHandler = async (req, res, next) => {
  try {
    const newCategory = await subCategoryModel.create({
      ...req.body,
    });
    res.status(201).json({ success: true, message: "Sub Category created." });
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
