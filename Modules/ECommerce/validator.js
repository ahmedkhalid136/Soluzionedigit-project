const { body, validationResult } = require('express-validator')
const Product = require('../../Schema/EcommerceSchema/productSchema')

exports.validate = (method) => {
    switch (method) {
        case 'createProduct': {
            return [
                body('variants', 'Variant doesnt exists').isString(),
                body('quantity').isInt(),
                body('description').isString(),
                body('pictures').isString(),
                body('category').isString(),
                body('discountPrice').isInt().optional(),
                body('couponCode').isString().optional(),
                body('tag').isString().optional(),
                body('reviews').isString().optional(),
                body('shippingCost').isInt(),
                body('featured').isBoolean().optional()
            ]
        }
        case 'searchProduct': {
            return [
                body('Pid').exists().isMongoId().custom(
                    val => Product.ProductSchema.isValidproduct(val)
                )
            ]

        }
    }
}

// exports.addproducts = async(req,res,next) => {
//   try{
//     const error = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.status(422).json({ errors: errors.array() });
//         return;
//       }
//       const { quantity, variants, description, status } = req.body
//       const product = await Product.create({
//         variants,
//        quantity, 



//         description,

//         status,   
//       })

//       res.json(product)
//   }
//   catch(error){
//    return next (error)
//   }
// }
