const express = require("express");
const router = express.Router();

router.get("/TaskManager", function (req, res) {
    res.send("<form method='POST' action='taskmanager'><input type='text' name='Name'><button type='submit'></button></form>")
});

router.post("/TaskManager", function (req, res) {
    console.log("Hello Wolrd" + req.body);
});

module.exports = router;