const express= require('express');
const socket = require("socket.io");
const router = express.Router();
//This route is for getting messages from customer once the customer then we send
// it to the server known as vendors
router.get('/message',(req,res)=>{
    socket.emit('message',message,(error)=>{

    })

})