const productModel = require('../models/product')

const getAllproductsStatic = async (req, res)=>{
    const products = await productModel.find({}).sort('-name price') //leave a space to sort using multiple items, a minus sign to start the sort from the back
    res.status(200).json({products, nbHits: products.length})

}

const getAllproducts = async (req, res)=>{
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {} //creating a new object

    //filtering
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false; //turning operator which means that if featured is true then equate it to true else equate it to false
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' }; //search using the pattern of the name and making sure its not case sensitive
    }       

    // find the queryObject and equate it to result, if sort is provided then sort 
    let result = productModel.find(queryObject)

    //sort
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else{
        result = result.sort('createAt')
    }
    
    //fields
    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    result = result.skip(skip).limit(limit)

    const products = await result
    res.status(200).json({products, nbHits: products.length} )

}

module.exports = {
    getAllproductsStatic, getAllproducts
}