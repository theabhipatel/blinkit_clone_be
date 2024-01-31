import { RequestHandler } from "express";
// import client from "twilio";
import {
  // FAST2SMS_API_KEY,
  JWT_SECRET,
  // TWILIO_ACCOUNT_SID,
  // TWILIO_AUTH_TOKEN,
} from "../config";
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import axios from "axios";
/** ---> Experiment for send otp to mobile. */
// const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
// const { Vonage } = require("@vonage/server-sdk");
// const vonage = new Vonage({
//   apiKey: "",
//   apiSecret: "",
// });

export const loginOrSignup: RequestHandler = async (req, res, next) => {
  const { mobile } = req.body;
  try {
    const isUser = await userModel.findOne({ mobile });
    // const otp = Math.floor(1000 + Math.random() * 1000);
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
    /** ---> Experiment for send otp to mobile. */
    /** ---> for otp service Twilio */
    // client.messages
    //   .create({
    //     body: "Hello from twilio-node and I am testing",
    //     to: "+917089589563", // Text your number
    //     from: "+17027896138", // From a valid Twilio number
    //   })
    //   .then((message: any) => {
    //     console.log("---->", message.sid);
    //     res.status(200).json({
    //       success: true,
    //       message: "User Logged in.",
    //       messageId: message,
    //     });
    //   });

    /** another otp service FAST2SMS */
    // const response = await axios.get("https://www.fast2sms.com/dev/bulkV2", {
    //   params: {
    //     authorization: FAST2SMS_API_KEY,
    //     variables_values: `Welcome to Blinkit clone Your OTP is ${otp}.`,
    //     route: "otp",
    //     numbers: mobile,
    //   },
    // });

    /** another otp service Vonage */
    // const from = "Vonage APIs";
    // const to = `91${mobile}`;
    // const text = `Welcome to Blinkit clone Your OTP is ${otp}.`;
    // const response = await vonage.sms.send({ to, from, text });
    /** ---> another way doing the same with Vonage */
    // const data = {
    //   from,
    //   text,
    //   to,
    //   api_key: "0d4f66cf",
    //   api_secret: "xygb6AEkFKhfuvdi",
    // };
    // const response = await axios.post("https://rest.nexmo.com/sms/json", data);
    // console.log("response from vonage --------->", response.data);

    res.status(200).json({
      success: true,
      message: "Otp has been sent.",
    });
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
