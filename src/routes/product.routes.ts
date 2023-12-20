import { Router } from "express";

const productRouter = Router();

productRouter.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the Products route." });
});

export default productRouter;
