import { Document, Schema, model } from "mongoose";

interface IBaseInfoLog {
  ip: string;
  path: string;
  method: string;
}

interface IInfoLogSchema extends IBaseInfoLog, Document {}

const infoLogSchema = new Schema<IInfoLogSchema>(
  {
    ip: { type: String },
    path: { type: String },
    method: { type: String },
  },
  { timestamps: true }
);

const infoLogModel = model<IInfoLogSchema>("infolog", infoLogSchema);

export default infoLogModel;
