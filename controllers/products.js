const productModel = require('../models/product')

const getAllproductsStatic = async (req, res)=>{
    const products = await productModel.find({ name: "vase table"})
    res.status(200).json({products, nbHits: products.length})

}

const getAllproducts = async (req, res)=>{
    const { featured, company, name } = req.query;
    const queryObject = {} //creating a new object

    if (featured) {
        queryObject.featured = featured === 'true' ? true : false; //turning operator which means that if featured is true then equate it to true else equate it to false
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }; //search using the pattern of the name and making sure its not case sensitive
    }       

    const products = await productModel.find(queryObject)
    res.status(200).json({products, nbHits: products.length} )

}

module.exports = {
    getAllproductsStatic, getAllproducts
}