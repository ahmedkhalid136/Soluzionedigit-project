const Product = require('../../Schema/EcommerceSchema/productSchema')

const addproduct =(req,res,next)=>{
  const{Status,description,variants,quantity}=req.body
  if(!Status||!description||!variants||!quantity){
     return{
         error:'Please fill all the fields'
     }
  }
  else{
    const user = await Product.create({
          Status,
          description,
          variants,
          status
      })
      .then(user=>res.json(user))
      .catch(next)
  }
}
const searchproduct=(req,res,next)=>{
    const Pid = req.params.Pid

  try {
    const product = await Product.findById(Pid)

    if (!product) {
      return res.status(404).send()
    }

    res.send(product)
  } catch (e) {
    res.status(500).send()
  }
}



module.exports=addproduct,searchproduct;