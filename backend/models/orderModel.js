const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
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
            },
        },
    ],
    classAddress: {
        department: {
            type: String,
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        batchNumber: {
            type: Number,
            required: true,
        },
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0,
    },
    timestamps: Date,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;