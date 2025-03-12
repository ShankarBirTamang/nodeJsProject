import express  from "express";
import { getAllProducts, getProductById, createProducts, updateProducts, deleteProducts, getCategories } from "../controllers/productController.js";

const router = express.Router();

/*
URL : /api/products
Method : GET
Get all Products
*/
router.get("/",getAllProducts)
/*
URL : /api/products/categories
Method : GET
Get product distinct category
*/
router.get("/categories",getCategories)
/*
URL : /api/products/id
Method : GET
Get product by id
*/
router.get("/:id",getProductById);

/*
URL : /api/products
Method : POST
Create Product
*/
router.post("/",createProducts)

/*
URL : /api/products/:id
Method : PUT
Update Product
*/
router.put("/:id",updateProducts)

/*
URL : /api/products/:id
Method : DELETE
Delete Product
*/
router.delete("/:id",deleteProducts)


export default router;