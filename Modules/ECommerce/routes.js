const express = require("express");
const router = express.Router();
const validator = require('./validator')


router.get("/ECommerce", function (req, res) {
    console.log("ECommerce Route");
    res.send("<h1>ECommerce Route</h1>")
});
router.post('/product', 
    userController.validate('createProduct'), 
    userController.createPoduct,
  )
module.exports = router;