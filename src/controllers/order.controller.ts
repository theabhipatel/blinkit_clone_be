import { RequestHandler } from "express";
import { orderModel } from "../models/order.model";
import userModel from "../models/user.model";
import mongoose from "mongoose";
import productModel, { IBaseProduct } from "../models/product.model";

interface IItems extends IBaseProduct {
  _id: string;
  quantity: number;
}
type TMakeNewOrderArgs = {
  userId: string;
  transactionId: string;
  selectedAddress: [];
  totalAmount: number;
  totalItems: number;
  items: IItems[];
};

export const makeNewOrder = async (orderInfo: TMakeNewOrderArgs) => {
  try {
    const newOrder = await orderModel.create({
      ...orderInfo,
    });
    orderInfo.items.forEach(async (item) => {
      const product = await productModel.findById(item._id);
      if (product) {
        if (product.stock >= item.quantity) {
          product.stock -= item.quantity;
          await product.save();
        }
      }
    });
    return true;
  } catch (error) {
    return error;
  }
};

export const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const orders = await orderModel.find({ userId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched.",
      orders,
    });
  } catch (error) {
    next(error);
  }
};

export const sample: RequestHandler = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
