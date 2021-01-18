const Product = require('../../Schema/EcommerceSchema/productSchema')

const addproduct = (req, res, next) => {
    const { Status, description, variants, quantity } = req.body
    if (!Status || !description || !variants || !quantity) {
        return {
            error: 'Please fill all the fields'
        }
    }
    else {

        Product.create({
            Status,
            description,
            variants,
            status
        })
            .then(prod => res.json(prod))
            .catch(next)
    }
}


module.exports = addproduct;
