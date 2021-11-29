const productModel = require('../models/product')

const getAllproductsStatic = async (req, res)=>{
    const products = await productModel.find({ name: "vase table"})
    res.status(200).json({products, nbHits: products.length})

}

const getAllproducts = async (req, res)=>{
    const products = await productModel.find(req.query)
    res.status(200).json({products, nbHits: products.length} )

}

module.exports = {
    getAllproductsStatic, getAllproducts
}