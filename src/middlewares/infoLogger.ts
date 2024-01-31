import { RequestHandler } from "express";
import infoLogModel from "../models/ip.model";

const infoLogger: RequestHandler = async (req, res, next) => {
  try {
    const { ip, path, method } = req;

    const isIpExist = await infoLogModel.findOne({ ip });
    if (!isIpExist) {
      await infoLogModel.create({
        ip,
        path,
        method,
      });
    }

    next();
  } catch (error) {
    console.log(error);
  }
};

export default infoLogger;
