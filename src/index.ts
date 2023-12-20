import express from "express";
import cors from "cors";
import { HOST_NAME, PORT } from "./config";
import { errorHandler } from "./middlewares/errorHandler";

/** ---> Initialze express app */
const app = express();

/** ---> Registering middlewares. */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

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

/** ---> Handling global errors. */
app.use(errorHandler);

/** ---> Listenig for requests. */
app.listen(Number(PORT), HOST_NAME, () => {
  console.log(`server is running at : http://${HOST_NAME}:${PORT}`);
});
