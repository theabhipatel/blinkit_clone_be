import { RequestHandler } from "express";
import sha256 from "crypto-js/sha256";
import {
  PHONEPE_MERCHANT_ID,
  PHONEPE_PROD_URL,
  PHONEPE_REDIRECT_URL,
  PHONEPE_SALT_KEY,
} from "../config";
import axios from "axios";

export const makePaymentWithPhonepe: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { merchantTransactionId, name, muid, amount, number } = req.body;
    const data = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: muid,
      name: name,
      amount: amount * 100,
      redirectUrl: `${PHONEPE_REDIRECT_URL}/${merchantTransactionId}`,
      redirectMode: "POST",
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + PHONEPE_SALT_KEY;

    const sha256Value = sha256(string);
    const checksum = sha256Value + "###" + keyIndex;

    const options = {
      method: "POST",
      url: PHONEPE_PROD_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log("payment res ------>", response.data);
        // console.log(
        //   "payment response.data.data.instrumentResponse.redirectInfo.url ------>",
        //   response.data.data.instrumentResponse.redirectInfo.url
        // );
        return res.redirect(
          response.data.data.instrumentResponse.redirectInfo.url
        );
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    next(error);
  }
};

export const checkPhonepePaymentStatus: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { merchantTransactionId, merchantId } = res.req.body;

    const keyIndex = 1;
    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` + PHONEPE_SALT_KEY;
    const sha256Value = sha256(string);
    const checksum = sha256Value + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchantId}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": `${merchantId}`,
      },
    };

    // CHECK PAYMENT STATUS
    axios
      .request(options)
      .then(async (response) => {
        if (response.data.success === true) {
          const url = `http://localhost:5173/`;
          return res.redirect(url);
        } else {
          const url = `http://localhost:5173/`;
          return res.redirect(url);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    next(error);
  }
};
