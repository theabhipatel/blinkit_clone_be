import { Document, Schema, model } from "mongoose";

interface IBaseSubCategory {
  title: string;
  categoryId: string;
  thumbnail: string;
}

interface ISubCategorySchema extends IBaseSubCategory, Document {}

const subCategorySchema = new Schema<ISubCategorySchema>({
  title: { type: String, required: true, trim: true },
  categoryId: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true },
});

const subCategoryModel = model<ISubCategorySchema>(
  "subcategory",
  subCategorySchema
);

export default subCategoryModel;
