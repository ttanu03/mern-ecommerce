const Product = require('../models/Product');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) { next(error); }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) res.json(product);
    else res.status(404).json({ message: 'Product not found' });
  } catch (error) { next(error); }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, description, image, category } = req.body;
    const product = new Product({ name, price, description, image, category });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) { next(error); }
};