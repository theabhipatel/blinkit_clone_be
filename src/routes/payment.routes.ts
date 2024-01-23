import { Router } from "express";
import {
  checkPhonepePaymentStatus,
  makePaymentWithPhonepe,
} from "../controllers/payment.controller";
import { privateRoutes } from "../middlewares/privateRoutes";

const paymentRouter = Router();

paymentRouter.post("/phonepe/pay", privateRoutes, makePaymentWithPhonepe);
paymentRouter.post("/phonepe/status/:txnId", checkPhonepePaymentStatus);

export default paymentRouter;
