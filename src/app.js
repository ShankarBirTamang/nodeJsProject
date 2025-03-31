import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoute.js";
import userRoutes from "./routes/userRoute.js";
import bodyParser from "body-parser";
import connectDB from "./config/database.js";
import logger from "./middlewares/logger.js";
import authRoute from "./routes/authRoute.js";
import orderRoute from "./routes/orderRoute.js";
import viewRoute from "./routes/viewRoute.js";
import connectCloudinary from "./config/cloudinary.js";
import multer from "multer";
import hbs from "hbs";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();
connectCloudinary();

const upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger);

// Set Handlebars as the view engine
app.set("view engine", "hbs");
app.use("/page", viewRoute);

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    version: "1.0.0",
    port: port,
  });
});
app.use("/api/auth", authRoute);
app.use("/api/products", productRoutes);
app.use("/api/users", upload.single("image"), userRoutes);
app.use("/api/orders", orderRoute);

app.listen(port, () => {
  console.log(`Server started at port ${port}...`);
});
