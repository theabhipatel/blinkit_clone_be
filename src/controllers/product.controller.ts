import { RequestHandler } from "express";
import productModel from "../models/product.model";
import subCategoryModel from "../models/subCategory.model";
import mongoose from "mongoose";

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

export const getProduct: RequestHandler = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await productModel.findById(productId);
    // const subCategory = await subCategoryModel.findById(product?.subCategoryId);
    // const newProduct = {
    //   ...product?._doc,
    //   subCategoryTitle: subCategory?.title,
    // };
    res.status(200).json({
      success: true,
      message: "Products fetched.",
      product: product,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory: RequestHandler = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const products = await productModel.find({ categoryId });
    res
      .status(200)
      .json({ success: true, message: "Products fetched.", products });
  } catch (error) {
    next(error);
  }
};

export const getSearchedProducts: RequestHandler = async (req, res, next) => {
  const { q } = req.query;
  try {
    if (q) {
      const products = await productModel.find({
        title: { $regex: q, $options: "i" },
      });
      res
        .status(200)
        .json({ success: true, message: "Products fetched.", products });
    }
  } catch (error) {
    next(error);
  }
};

export const getProductsBySubCategory: RequestHandler = async (
  req,
  res,
  next
) => {
  const { subCategoryId } = req.params;
  try {
    const products = await productModel.find({ subCategoryId });
    res
      .status(200)
      .json({ success: true, message: "Products fetched.", products });
  } catch (error) {
    next(error);
  }
};
export const getBestSellersProducts: RequestHandler = async (
  req,
  res,
  next
) => {
  const bestSellersProductsId: string[] = [
    "6583dfa05d101ffcf2453ec3",
    "659bed9dae0abd048611056e",
    "65b13be2c56fb63691fe5d3b",
    "659bee8dae0abd04861105ba",
    "659bef17ae0abd04861105c6",
    "6583e72d5d101ffcf2453f16",
    "6583e2575d101ffcf2453ede",
    "6583e0f85d101ffcf2453ed0",
  ];

  try {
    const products = await productModel
      .find({
        _id: { $in: bestSellersProductsId },
      })
      .select("-images -details");
    /** ---> ordering products based on bestseller ids */
    const orderedProducts = bestSellersProductsId.map((id) =>
      products.find((product) => product._id.toString() === id)
    );
    res.status(200).json({
      success: true,
      message: "Products fetched.",
      products: orderedProducts,
    });
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
