const express = require("express");
const router = express.Router();
const Controller = require("./controller.js");
const Validator = require("./validator.js");


router.route("/").get(Validator.validate, Controller.addProduct);

module.exports = router;