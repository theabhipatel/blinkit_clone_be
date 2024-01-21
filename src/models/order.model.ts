import mongoose, { Document } from "mongoose";

interface ISelectedAddress {
  courtesyTitle: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  addressType: string;
  latitude: number;
  longitude: number;
  landmark: string;
}

interface IBaseOrder {
  userId: string;
  transactionId: string;
  selectedAddress: ISelectedAddress;
  paymentStatus: string;
  orderStatus: string;
  totalAmount: number;
  totalItems: number;
  items: [];
}

interface IOrderSchema extends IBaseOrder, Document {}

const orderSchema = new mongoose.Schema<IOrderSchema>(
  {
    userId: {
      type: String,
      ref: "user",
      required: true,
    },
    selectedAddress: {},
    transactionId: {
      type: String,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalItems: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending",
    },
    orderStatus: {
      type: String,
      default: "pending",
    },
    items: [],
  },
  { timestamps: true }
);

export const orderModel = mongoose.model<IOrderSchema>("order", orderSchema);
