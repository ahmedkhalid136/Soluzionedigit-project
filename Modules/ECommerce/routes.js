const express = require("express");
const router = express.Router();
const validator = require('./validator')
const controller = require('./controller')


router.get("/ECommerce", function (req, res) {
    console.log("ECommerce Route");
    res.send("<h1>ECommerce Route</h1>")
});
router.post("/createproduct",
    ValidatorsInstance.createProduct(),
    async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ errors: errors.array() });
            }

            

            // Return a response to client.
            return res.status(200).json({ data });
        } catch (err) {
            next(err);
        }
    });
module.exports = router;

// validator.validate('createProduct'), 
// validator.addProducts,