const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product',
            },
            quantity:{
                type:Number,
                default:0.0
            }
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    }});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;