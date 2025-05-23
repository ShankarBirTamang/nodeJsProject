//database related task
import fs from "fs";
import Product from "./../models/Product.js";
import promptGemini from "../utils/gemini.js";

// const rawProducts = fs.readFileSync("data/product.json","utf8");
// const products = JSON.parse(rawProducts);

const getAllProducts = async (query, userId) => {
  console.log("queryValue: ", query);
  const sort = JSON.parse(query.sort || "{}");
  const limit = query.limit || 50;
  const offSet = query.offSet;

  const filters = {};

  const { category, brands, name, min, max } = query;

  if (category) filters.category = category; //absolute filter
  if (brands) {
    //array filter
    const brandItems = brands.split(",");
    filters.brand = { $in: brandItems };
  } //fuzzy filter
  if (name) {
    filters.name = { $regex: name, $options: "i" };
  }
  if (min) filters.price = { $gte: parseFloat(min) }; //range filter
  if (max)
    filters.price = {
      ...filters.price,
      $lte: parseFloat(max),
    };
  if (userId) filters.createdBy = userId;
  console.log("filters: ", filters);
  const products = await Product.find(filters)
    .sort(sort)
    .limit(limit)
    .skip(offSet);
  return products;
};

const getProductById = async (id) => {
  // const product = products.find((p)=>p.id==id);
  const product = await Product.findById(id);

  //gets new description using Gemini everytime while getting product
  const geminiResponse = await promptGemini(data.id);
  product.description = geminiResponse;
  console.log(geminiResponse);
  //   return productResponse;
  return product;
};

const createProduct = async (data, userId) => {
  // products.push(data);
  // fs.writeFileSync("data/product.json",JSON.stringify(products));
  // return "Data added successfully";

  // To create description using Gemini
  //   const geminiResponse = await promptGemini(data);

  return await Product.create({
    ...data,
    // description: geminiResponse,
    createdBy: userId,
  });
};

const updateProduct = async (id, data) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};
const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};
const getCategories = async () => {
  return await Product.distinct("category");
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
};
