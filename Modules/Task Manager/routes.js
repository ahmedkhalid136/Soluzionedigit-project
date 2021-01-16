const express = require("express");
const router = express.Router();


router.get("/TaskManager", function (req, res) {
    console.log("Task Manager Route");
});

module.exports = router;