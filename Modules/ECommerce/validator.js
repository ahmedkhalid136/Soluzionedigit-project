const { body, validationResult } = require('express-validator')
const Product = require('../../Schema/EcommerceSchema/productSchema')

exports.validate = (method) => {
    switch (method) {
        case 'createProduct': {
            return [
                body('Variants', 'Variant doesnt exists').isString(),
                body('colors', 'Color Doesnot exist').exists().isString(),
                body('quantity', 'quantity is Invalid').isInt(),
                body('status', "Invalid Value").optional().isString()
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
