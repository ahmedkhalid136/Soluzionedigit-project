const express = require("express");
const router = express.Router();
const validator = require('./validator')
const controller = require('./controller')


router.get("/ECommerce", function (req, res) {
    console.log("ECommerce Route");
    res.send("<h1>ECommerce Route</h1>")
});
router.post('/product', 
    validator.validate('createProduct'), 
    validator.addProducts,
  )
module.exports = router;