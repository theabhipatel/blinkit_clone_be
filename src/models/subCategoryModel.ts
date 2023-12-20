import { Document, Schema, model } from "mongoose";

interface IBaseSubCategory {
  title: string;
  categoryId: string;
}

interface ISubCategorySchema extends IBaseSubCategory, Document {}

const subCategorySchema = new Schema<ISubCategorySchema>({
  title: { type: String, required: true, trim: true },
  categoryId: { type: String, required: true, trim: true },
});

const subCategoryModel = model<ISubCategorySchema>(
  "subcategory",
  subCategorySchema
);

export default subCategoryModel;
