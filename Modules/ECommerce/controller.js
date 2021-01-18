const Product = require('../../Schema/EcommerceSchema/productSchema').Productschema

const addproduct = async (req, res, next) => {
    console.log("Hello World" + req.body.variants);
    const { variants, quantity, description, pictures, category, discountPrice, couponCode, tag, reviews, shippingCost, featured } = req.body


    const user = await new Product({
        variants: variants,
        quantity: quantity,
        description: description,
        pictures: pictures,
        category: category,
        discountPrice: discountPrice,
        couponCode: couponCode,
        tag: tag,
        reviews: reviews,
        shippingCost: shippingCost,
        featured: featured
    })
        .then(user => {
            res.json(user)
        })
        .catch(next)
    console.log(user);

}
const searchproduct = (req, res, next) => {
    const Pid = req.params.Pid

    try {
        const product = Product.findById(Pid)

        if (!product) {
            return res.status(404).send()
        }

        res.send(product)
    } catch (e) {
        res.status(500).send()
    }
}



module.exports.addproduct = addproduct;
