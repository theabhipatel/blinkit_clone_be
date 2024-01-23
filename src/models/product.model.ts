import { Document, Schema, model } from "mongoose";

export interface IBaseProduct {
  title: string;
  price: number;
  unit: string;
  discountPercentage: number;
  categoryId: string;
  subCategoryId: string;
  brand: string;
  stock: number;
  thumbnail: string;
  images: string[];
  details: { title: string; description: string }[];
}

interface IProductSchema extends IBaseProduct, Document {}

const productSchema = new Schema<IProductSchema>(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountPercentage: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
    },
    subCategoryId: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
      default: 50,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    details: [
      {
        title: String,
        description: String,
      },
    ],
  },
  { timestamps: true }
);

const productModel = model<IProductSchema>("product", productSchema);

export default productModel;
