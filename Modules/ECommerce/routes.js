const express = require("express");
const router = express.Router();


router.get("/ECommerce", function (req, res) {
    console.log("ECommerce Route");
    res.send("<h1>ECommerce Route</h1>")
});

module.exports = router;