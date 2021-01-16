const mongoose = require("mongoose");

const Place = mongoose.Schema({
    products: [{
        type: String
    }],
    couponCode: {
        code: { type: String, required: true },
        price: { type: Number, required: true },
        productID: { type: String, required: true }
    },
    freeShipping: {
        type: Boolean,
        default: false
    },
    order: [{
        type: String
    }],
    subscription: {
        type: String,
        required: true
    }

});