import express from "express";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Welcome to the home route." });
});

app.listen(3000, () => {
  console.log(`server is running at : http://${"localhost"}:${"3000"}`);
});
