const express = require("express");
const socket = require("socket.io");
const router = express.Router();


router.get("/Chat", function (req, res) {
    res.send("<h1>This is Chat route</h1>");
});

module.exports = router;