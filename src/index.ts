import express from "express";
import { HOST_NAME, PORT } from "./config";

const app = express();

/** ---> Handing home route for testing. */
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the home route." });
});

/** ---> Handling Not found (404) routes. */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found." });
});

app.listen(Number(PORT), HOST_NAME, () => {
  console.log(`server is running at : http://${HOST_NAME}:${PORT}`);
});
