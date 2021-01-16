const express = require("express");
const router = express.Router();


router.get("/Chat", function (req, res) {
    console.log("Chat Route");
});

module.exports = router;