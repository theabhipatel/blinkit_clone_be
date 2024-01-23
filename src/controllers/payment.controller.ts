import { RequestHandler } from "express";
import sha256 from "crypto-js/sha256";
import {
  PHONEPE_MERCHANT_ID,
  PHONEPE_PROD_URL,
  PHONEPE_SEVER_REDIRECT_URL,
  PHONEPE_SALT_KEY,
  CLIENT_PAYMENT_SUCCESS_PAGE_URL,
  CLIENT_PAYMENT_FAILURE_PAGE_URL,
} from "../config";
import axios from "axios";
import { makeNewOrder } from "./order.controller";

export const makePaymentWithPhonepe: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const userId = res.locals.userId;
    const transactionId = `T${Date.now()}`;
    const { selectedAddress, name, totalAmount, totalItems, number, items } =
      req.body;

    const data = {
      merchantId: PHONEPE_MERCHANT_ID,
      merchantTransactionId: transactionId,
      merchantUserId: userId,
      name: name,
      amount: totalAmount * 100,
      redirectUrl: `${PHONEPE_SEVER_REDIRECT_URL}/${transactionId}`,
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
      .then(async function (response) {
        // return res.redirect(
        //   response.data.data.instrumentResponse.redirectInfo.url
        // );
        /** ---> creating new order. */
        await makeNewOrder({
          userId,
          transactionId,
          selectedAddress,
          totalAmount,
          totalItems,
          items,
        });

        // ---> redirecting from client through href.
        return res.json({
          success: true,
          message: "Payment initiated.",
          url: response.data.data.instrumentResponse.redirectInfo.url,
        });
      })
      .catch(function (error) {
        console.error("Error ----->", error);
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
          const url = CLIENT_PAYMENT_SUCCESS_PAGE_URL;
          return res.redirect(url);
        } else {
          const url = CLIENT_PAYMENT_FAILURE_PAGE_URL;
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
