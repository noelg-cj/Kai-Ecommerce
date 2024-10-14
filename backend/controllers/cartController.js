const Cart = require('../models/cartModel');
const User= require('../models/userModel');
const Product=require('../models/productModel');
const asyncHandler = require('express-async-handler');

const calculateTotalPrice = async (orderItems) => {
    let total = 0;
    for (const item of orderItems) {
        const product = await Product.findById(item.product);
        total += product.price * item.quantity;
    }
    return total;
}

const addToCart=asyncHandler(async (req,res)=>{
    const { userId , productId , quantity }=req.body
    const user=await User.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    let product = await Product.findById(productId);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    let cart=await Cart.findOne({userId})
    if (!cart) {
        
        cart = new Cart({
            userId: userId,
            orderItems: [],
            totalPrice: 0,
        });
    }
    const existingItem = cart.orderItems.find(
        (item) => item.product.toString() === productId
    )
    if (existingItem) {
        
        existingItem.quantity += quantity;
    } 
    else {
        cart.orderItems.push({ product: productId, quantity });
    }
    cart.totalPrice = await calculateTotalPrice(cart.orderItems);
    const updatedCart = await cart.save()
    res.status(200).json(updatedCart);
})

const removeFromCart= asyncHandler(async (req,res)=>{
    const{ userId, productId}= req.body
    const user=await User.findById(userId)
    if(!user){
        return res.status(404).json({message:"User not found"})
    }
    let product = await Product.findById(productId);
    if (!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }
    cart.orderItems = cart.orderItems.filter(
        (item) => item.product.toString() !== productId
    );
    cart.totalPrice = await calculateTotalPrice(cart.orderItems);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
})

const clearCart = asyncHandler(async (req, res) => {
    const userId=req.params.userId
    let cart = await Cart.findOne({userId});
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    cart.orderItems = [];
    cart.totalPrice = 0;
    const clearedCart = await cart.save();
    res.status(200).json({ message: 'Cart cleared successfully'});
});


const getCart = asyncHandler(async (req,res)=>{
    const userId=req.params.userId
    const cart = await Cart.findOne({userId}).populate('orderItems.product')
    if (!cart) {
        cart = new Cart({
            userId: userId,
            orderItems: [],
            totalPrice: 0,
        });
        const newCart= await cart.save()
        return res.status(404).json({ message: 'Cart empty' });
    }
    res.status(200).json(cart);
})

const decrementQuantity= asyncHandler(async (req,res)=>{
    const{ userId, productId }= req.body

    let product = await Product.findById(productId);
    if (!product){
        return res.status(404).json({ message: 'Product not found' });
    }
    let cart = await Cart.findOne({userId})
    if (!cart) return res.status(404).json({ message: 'Cart not found' })
    if(cart.quantity==1){
        cart.orderItems = cart.orderItems.filter(
            (item) => item.product.toString() !== productId
        );
    }
    else{
        const item = cart.orderItems.find(
            (item) => item.product.toString() === productId);
        if (!item) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        item.quantity -= 1;
    }
    cart.totalPrice = await calculateTotalPrice(cart.orderItems);
    const updatedCart = await cart.save();
    res.status(200).json(updatedCart);
})
module.exports={ addToCart ,removeFromCart ,clearCart ,getCart ,decrementQuantity }