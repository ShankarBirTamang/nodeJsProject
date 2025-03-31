import express from "express";
import { homePage, productPage } from "../controllers/viewController.js";

const router = express.Router();

router.get("/home", homePage);
router.get("/products", productPage);

export default router;
