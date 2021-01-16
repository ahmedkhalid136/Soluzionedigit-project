const mongoose = require("mongoose");

const Product = mongoose.Schema({
    variants: [{
        type: String
    }],
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    pictures: [{
        type: String,
        required: true
    }],
    category: [{
        type: String
    }],
    discountPrice: {
        type: Number
    },
    couponCode: {
        type: String
    },
    tag: {
        type: String,
        required: true
    },
    reviews: [{
        type: String
    }],
    shippingCost: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }

});

module.exports = Product;