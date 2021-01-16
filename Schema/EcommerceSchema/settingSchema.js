const mongoose = require("mongoose");

const Settings = mongoose.Schema({
    maxCartProducts: { type: Number, required: true },
    maxWishlistProducts: { type: Number, required: true },
    subscriptionCost: {
        cost_3_Months: { type: Number, required: true },
        cost_6_Months: { type: Number, required: true },
        annual_Cost: { type: Number, required: true }
    },
    NewProductDays: { type: Date }
});