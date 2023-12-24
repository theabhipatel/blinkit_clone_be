import { Document, Schema, model } from "mongoose";

interface IBaseUser {
  mobile: string;
  otp: number;
  otpExpireTime: number;
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>({
  mobile: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  otpExpireTime: { type: Number, required: true },
});

const userModel = model<IUserSchema>("user", userSchema);

export default userModel;
