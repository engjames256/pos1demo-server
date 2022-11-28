import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import products from "./routes/products.js";
import sales from "./routes/sales.js";
import auth from "./routes/auth.js";
import connectDB from "./db/connect.js";
import errorHandler from "./middleware/error-handler.js";
import notFound from "./middleware/not-found.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  })
);

app.use(bodyParser.json({ limit: "20mb", extended: true }));

app.use("/api/v1/auth", auth);
app.use("/api/v1/products", products);
app.use("/api/v1/sales", sales);
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB();
    app.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
