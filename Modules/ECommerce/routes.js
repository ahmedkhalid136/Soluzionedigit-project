const express = require("express");
const router = express.Router;


router.get("/ECommerce", function (req, res) {
    console.log("ECommerce Route");
});

module.exports = router;