const mongoose = require("mongoose")
const Client = mongoose.Schema({
    wishlist:{
        type:String        
    },
    numberofOrders:{
        type:Number,
    },
    Disputeindays:{
       type:Date,
    },
    OrderHistory:{
        type:String
    }
})