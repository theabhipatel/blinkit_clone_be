import { Document, Schema, model } from "mongoose";

interface IAddress {
  courtesyTitle: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressType: string;
  latitude: number;
  longitude: number;
  landmark: string;
}
interface IBaseUser {
  mobile: string;
  otp: number;
  otpExpireTime: number;
  addresses: IAddress[];
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>({
  mobile: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
  otpExpireTime: { type: Number, required: true },
  addresses: [
    {
      courtesyTitle: { type: String, required: true },
      name: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: { type: String, required: true },
      addressType: { type: String, required: true },
      landmark: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
  ],
});

const userModel = model<IUserSchema>("user", userSchema);

export default userModel;
