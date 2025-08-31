import express from "express";
import cors from "cors";
import "dotenv/config";
import connectdb from "./config/connect.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/user.routes.js";
import productRouter from "./routes/product.routes.js";

// App config
const app = express();
const port = process.env.PORT || 4000;
connectdb();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// Api Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/products", productRouter);

// Api endpoints
app.get("/", (req, res) => {
  res.send("API Working !");
});

// starting server
app.listen(port, () => console.log("Server started on PORT : " + port));
