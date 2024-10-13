const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// Fetch all products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find();
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
    if (!categoryId) {
        return res.status(400).json({ message: 'Category ID is required' });
    }
    const products = await Product.find({ categoryId });

    if (products.length > 0) {
        res.json(products);
    } else {
        res.status(404);
        throw new Error('No products found for this category');
    }
});

// Create a new product
const createProduct = asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, imageUrl, categoryId, categoryName } = req.body;

    const product = new Product({
        name,
        description,
        price,
        countInStock,
        imageUrl,
        categoryId,
        categoryName,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// Update an existing product
const updateProduct = asyncHandler(async (req, res) => {
    const { name, description, price, countInStock, imageUrl, categoryId, categoryName } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.countInStock = countInStock || product.countInStock;
        product.imageUrl = imageUrl || product.imageUrl;
        product.categoryId = categoryId || product.categoryId;
        product.categoryName = categoryName || product.categoryName;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = {
    getProducts,
    getProductById,
    getProductsByCategory,
    createProduct,
    updateProduct,
    deleteProduct,
};