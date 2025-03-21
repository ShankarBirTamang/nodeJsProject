
    //connect with db
    //find for products table
    //get all products
    //returns all products to the user

import { ROLE_ADMIN } from "../constants/roles.js";
import productService from "../services/productService.js";


const getAllProducts = async (req , res)=>{
    const products =await productService.getAllProducts(req.query);
    res.json(products);
};

const getProductByUser = async (req , res)=>{
    try {
        const products = await productService.getAllProducts(req.query,req.user.id);
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
    
}
const createProducts = async (req , res)=>{
    const userId = req.user.id;
    try {
        const data = await productService.createProduct(req.body,userId);
        res.send(data);  
    } catch (error) {
        res.status(500).send(error.message);
    }
    // res.send("create products page");
}

const updateProducts = async (req , res)=>{
    const id = req.params.id;
    const user = req.user;
    try {
        const product = await productService.getProductById(id);
        if(!product) return res.status(404).send("Product not found!");

        //If the product is not created by that user(Merchant) and is also not admin , then access is denied.
        if(product.createdBy != user.id && !user.role.includes(ROLE_ADMIN) ) {
            return res.status(403).send("Access Denied.");
        }
       const data= await productService.updateProduct(id,req.body);
       res.send(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteProducts = async (req , res)=>{
    const id = req.params.id;
    try {
        await productService.deleteProduct(id);
        res.send(`"Product Delete Successfully of id: ${id}"`);
    } catch (error) {
        res.status(500).send(error.message);      
    }
  
}

const getProductById =async (req , res)=>{
    const id =  req.params.id;
    try {
        const product = await productService.getProductById(id);
        if(!product) return res.status(404).send("Product not found!");
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }   
}

const getCategories = async (req,res)=>{
    const categories = await productService.getCategories();
    res.json(categories);
}

export  {getAllProducts ,getProductByUser, getProductById,createProducts,updateProducts , deleteProducts , getCategories};