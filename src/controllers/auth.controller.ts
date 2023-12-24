import { RequestHandler } from "express";
// import client from "twilio";
import { JWT_SECRET, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } from "../config";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const loginOrSignup: RequestHandler = async (req, res, next) => {
  const { mobile } = req.body;
  try {
    const isUser = await userModel.findOne({ mobile });
    const otp = 1234;
    const otpExpireTime = Date.now() + 60 * 1000 * 10;
    if (isUser) {
      isUser.otp = otp;
      isUser.otpExpireTime = otpExpireTime;
      isUser.save();
    } else {
      const newUser = await userModel.create({
        mobile,
        otp,
        otpExpireTime,
      });
    }
    res.status(200).json({
      success: true,
      message: "Otp has been sent.",
    });

    /** ---> for otp service */
    // client.messages
    //   .create({
    //     body: "Hello from twilio-node and I am testing",
    //     to: "+917089589563", // Text your number
    //     from: "+17027896138", // From a valid Twilio number
    //   })
    //   .then((message: any) => {
    //     console.log("hey this is msg ---->", message.sid);
    //     res.status(200).json({
    //       success: true,
    //       message: "User Logged in.",
    //       messageId: message,
    //     });
    //   });
  } catch (error) {
    next(error);
  }
};

export const verifyOtp: RequestHandler = async (req, res, next) => {
  const { mobile, otp } = req.body;
  try {
    const user = await userModel.findOne({ mobile });
    if (!user)
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    const isOtpMatched = user.otp === otp && user.otpExpireTime > Date.now();
    if (!isOtpMatched)
      return res.status(401).json({
        success: false,
        message: "Otp is worng or Expired.",
      });
    user.otpExpireTime = 0;
    user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET!);
    res.status(200).json({
      success: true,
      message: "User Logged in.",
      token,
    });
  } catch (error) {
    next(error);
  }
};
