import { Document, Schema, model } from "mongoose";

interface IBaseSubCategory {
  title: string;
  categoryId: string;
  thumbnail: string;
}

interface IBaseCategory {
  title: string;
  thumbnail: string;
  subCategories: IBaseSubCategory[];
}

interface ICategorySchema extends IBaseCategory, Document {}

const categorySchema = new Schema<ICategorySchema>({
  title: { type: String, required: true, trim: true },
  thumbnail: { type: String, required: true },
  subCategories: [
    {
      title: { type: String, required: true },
      thumbnail: { type: String, required: true },
      categoryId: { type: String, required: true },
    },
  ],
});

const categoryModel = model<ICategorySchema>("category", categorySchema);

export default categoryModel;
