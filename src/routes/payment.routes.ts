import { Router } from "express";
import {
  checkPhonepePaymentStatus,
  makePaymentWithPhonepe,
} from "../controllers/payment.controller";

const paymentRouter = Router();

paymentRouter.post("/phonepe/pay", makePaymentWithPhonepe);
paymentRouter.post("/phonepe/status/:txnId", checkPhonepePaymentStatus);

export default paymentRouter;
