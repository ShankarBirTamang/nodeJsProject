import productService from "../services/productService.js";

const homePage = (req, res) => {
  res.render("home", { username: "Sankar" });
};
const productPage = async (req, res) => {
  const products = await productService.getAllProducts(req.query);

  res.render("products", { products: products });
};

export { homePage, productPage };
