
const Order = require('../models/orderModel');
const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler');


const orderCart =asyncHandler(async(req,res)=>{
    const { userId, classAddress } = req.body;
    if (!classAddress || !classAddress.department || !classAddress.semester || !classAddress.batchNumber) {
        return res.status(400).json({
            message: 'Class address must include department, semester, and batchNumber',
        });
    }
    const cart = await Cart.findOne({ userId }).populate('orderItems.product');
    if (!cart || cart.orderItems.length === 0) {
        return res.status(400).json({ message: 'Cart is empty or not found' });
    }
    const taxPrice = (18 / 100) * cart.totalPrice;
    const totalPrice = cart.totalPrice + taxPrice;
    const order = new Order({
        userId: userId,
        orderItems: cart.orderItems.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
        })),
        classAddress,
        taxPrice,
        totalPrice,
        timestamps: new Date(),
    });
    const createdOrder = await order.save();
    cart.orderItems = [];
    cart.totalPrice = 0;
    await cart.save();
    res.status(201).json(createdOrder);
});

const orderItem =asyncHandler(async(req,res)=>{
    const { userId, productId, quantity, classAddress } = req.body;
    if (!classAddress || !classAddress.department || !classAddress.semester || !classAddress.batchNumber) {
        return res.status(400).json({
            message: 'Class address must include department, semester, and batchNumber',
        });
    }
    const product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    if (quantity <= 0) {
        return res.status(400).json({ message: 'Quantity must be greater than 0' });
    }
    const taxPrice = (18 / 100) * product.price * quantity;
    const totalPrice = product.price * quantity + taxPrice;
    const order = new Order({
        userId: userId,
        orderItems: [{   product: product._id,quantity,},],
        classAddress,
        taxPrice,
        totalPrice,
        timestamps: new Date(),
        });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder)
})

const getUserOrder=asyncHandler(async(req,res)=>{
    const { userId } = req.params; 
    const orders = await Order.find({userId }).populate('orderItems.product');
    if (!orders || orders.length === 0) {
        return res.status(404).json({ message: 'No orders found for this user.' });
    }
    res.status(200).json(orders);
})
// Get order by ID
const getOrderById = asyncHandler(
    async (req, res) => {
        const order = await Order.findById(
            req.params.id).populate('orderItems.product');
        if (order) {
            res.json(order);
        } else {
            res.status(404);
            throw new Error("Order not found");
        }
    }
);


module.exports = { orderCart,orderItem,getUserOrder,getOrderById };