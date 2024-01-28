import { RequestHandler } from "express";
import productModel from "../models/product.model";
import subCategoryModel from "../models/subCategory.model";
import mongoose, { Document } from "mongoose";
import categoryModel from "../models/category.model";

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
    if (!product)
      return res.status(404).json({
        success: false,
        message: "Products not found.",
      });
    const category = await categoryModel.findOne(
      {
        "subCategories._id": product?.subCategoryId,
      },
      { "subCategories.$": 1 }
    );

    const newProduct = {
      ...product.toObject(),
      subCategoryTitle: category?.subCategories[0]?.title,
    };

    res.status(200).json({
      success: true,
      message: "Products fetched.",
      product: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory: RequestHandler = async (req, res, next) => {
  const { categoryId } = req.params;
  try {
    const products = await productModel
      .find({ categoryId })
      .select("-images -details");
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
      const products = await productModel
        .find({
          title: { $regex: q, $options: "i" },
        })
        .select("-images -details");
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
    const products = await productModel
      .find({ subCategoryId })
      .select("-images -details");
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
