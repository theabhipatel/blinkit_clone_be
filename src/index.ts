import express from "express";
import { HOST_NAME, PORT } from "./config";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the home route." });
});

app.listen(Number(PORT), HOST_NAME, () => {
  console.log(`server is running at : http://${HOST_NAME}:${PORT}`);
});
