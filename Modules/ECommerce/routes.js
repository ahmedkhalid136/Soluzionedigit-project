const express = require("express");
const router = express.Router();
const validator = require("./validator.js");
const controller = require("./controller.js");
const { validationResult, body } = require('express-validator');
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/ECommerce", function (req, res) {
  console.log("ECommerce Route");
  res.send("<h1>ECommerce Route</h1>");
});
router.post(
  "/createproduct",
  validator.validate("createProduct"),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const data = controller.addproduct;

      return res.status(200).json({ data });

      // Return a response to client.
    } catch (err) {
      next(err);
    }
    console.log(data);
  }
);

router.post("/product", (req, res) => {
  console.log(req.body);
})


router.get(
  "/getproduct/:Pid",
  validator.validate("searchProduct"),

  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      const data = controller.searchproduct();

      return res.status(200).json({ data });

      // Return a response to client.
    } catch (err) {
      next(err);
    }
  }

);
module.exports = router;

// validator.validate('createProduct'),
// validator.addProducts,
