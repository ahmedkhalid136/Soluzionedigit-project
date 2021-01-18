const Product = require("../../Schema/EcommerceSchema/productSchema").Productschema;


exports.addproduct = async (req, res, next) => {
    try {
        console.log(req.body);
        const { variants, quantity, description, pictures, category, discountPrice, couponCode, tag, reviews, shippingCost, featured } = req.body;

        const user = new Product({
            variants,
            quantity,
            description,
            pictures,
            category,
            discountPrice,
            couponCode,
            tag,
            reviews,
            shippingCost,
            featured
        })
        console.log(user);
        res.json(user);
    }
    catch (err) {
        console.log(err);
    }



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



