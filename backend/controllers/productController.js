const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// Fetch all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// Fetch single product by ID
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Fetch products by categoryId
const getProductsByCategory = asyncHandler(async (req, res) => {
    const categoryId = req.params.categoryId;
    const products = await Product.find({ categoryId });

    if (products.length > 0) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('No products found for this category');
    }
});

module.exports = { getProducts, getProductById, getProductsByCategory };