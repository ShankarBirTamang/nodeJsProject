//database related task
import fs from 'fs';
import Product from './../models/Product.js';

// const rawProducts = fs.readFileSync("data/product.json","utf8");
// const products = JSON.parse(rawProducts);

const getAllProducts = async ()=>{
    const products = await Product.find();
    return products;
}

const getProductById = async(id)=>{
    // const product = products.find((p)=>p.id==id);
    const product = await Product.findById(id);
    return product;
}

const createProduct = async (data)=>{
    // products.push(data);
    // fs.writeFileSync("data/product.json",JSON.stringify(products));
    // return "Data added successfully";
    return await Product.create(data);
}

const updateProduct = async (id,data)=>{
    return await Product.findByIdAndUpdate(id,data,{new:true});
}
const deleteProduct = async (id)=>{
    await Product.findByIdAndDelete(id);
}
const getCategories = async()=>{
    return await Product.distinct("category");
    
}

export default {getAllProducts,getProductById, createProduct , updateProduct , deleteProduct , getCategories};