import express  from "express";
import auth from "../middlewares/auth.js"
import { getAllProducts,getProductByUser, getProductById, createProducts, updateProducts, deleteProducts, getCategories } from "../controllers/productController.js";
import { ROLE_ADMIN, ROLE_MERCHANT } from "../constants/roles.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.js";

const router = express.Router();

/*
URL : /api/products
Method : GET
Get all Products
*/
router.get("/",getAllProducts)
router.get("/users",auth,getProductByUser)
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
router.post("/",auth,roleBasedAuth(ROLE_MERCHANT),createProducts)

/*
URL : /api/products/:id
Method : PUT
Update Product
*/
router.put("/:id",auth,roleBasedAuth(ROLE_MERCHANT),updateProducts)

/*
URL : /api/products/:id
Method : DELETE
Delete Product
*/
router.delete("/:id",auth,roleBasedAuth(ROLE_ADMIN),deleteProducts)
//always use auth middleware before roleBasedAuth middleware

export default router;