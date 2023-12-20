import { RequestHandler } from "express";
import productModel from "../models/productModel";

export const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await productModel.find();
    res
      .status(200)
      .json({ success: true, message: "Products fetched.", products });
  } catch (error) {
    next(error);
  }
};

export const createProduct: RequestHandler = async (req, res, next) => {
  try {
    const newProduct = await productModel.create({
      ...req.body,
    });
    res.status(201).json({ success: true, message: "Product created." });
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
