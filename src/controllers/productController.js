
    //connect with db
    //find for products table
    //get all products
    //returns all products to the user

import productService from "../services/productService.js";


const getAllProducts = async (req , res)=>{
    const products =await productService.getAllProducts();
    res.json(products);
};

const createProducts = async (req , res)=>{
    try {
        const data = await productService.createProduct(req.body);
        res.send(data);  
    } catch (error) {
        res.status(500).send(error.message);
    }
    // res.send("create products page");
}

const updateProducts = async (req , res)=>{
    const id = req.params.id;
    try {
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
        if(!product) res.status(404).send("Product not found!");
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }   
}

const getCategories = async (req,res)=>{
    const categories = await productService.getCategories();
    res.json(categories);
}

export  {getAllProducts , getProductById,createProducts,updateProducts , deleteProducts , getCategories};