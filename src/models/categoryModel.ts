import { Document, Schema, model } from "mongoose";

interface IBaseCategory {
  title: string;
}

interface ICategorySchema extends IBaseCategory, Document {}

const categorySchema = new Schema<ICategorySchema>({
  title: { type: String, required: true, trim: true },
});

const categoryModel = model<ICategorySchema>("category", categorySchema);

export default categoryModel;
