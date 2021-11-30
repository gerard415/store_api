const productModel = require('../models/product')

const getAllproductsStatic = async (req, res)=>{
    const products = await productModel.find({}).sort('-name price') //leave a space to sort using multiple items, a minus sign to start the sort from the back
    res.status(200).json({products, nbHits: products.length})

}

const getAllproducts = async (req, res) => {
    const { featured, company, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};
  
    //filtering
    if (featured) {
      queryObject.featured = featured === 'true' ? true : false;
    }
    if (company) {
      queryObject.company = company;
    }
    if (name) {
      queryObject.name = { $regex: name, $options: 'i' };
    }

    //numeric filters //if there is a match between the numeric value here and the one the user inputs, it would replace the numeric value with its corresponding mongoose value
    if (numericFilters) {
      const operatorMap = {
        '>': '$gt',
        '>=': '$gte',
        '=': '$eq',
        '<': '$lt',
        '<=': '$lte',
      };
      const regEx = /\b(<|>|>=|=|<|<=)\b/g;
      let filters = numericFilters.replace(regEx,(match) => `-${operatorMap[match]}-`
      );
      const options = ['price', 'rating'];
      filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-');
        if (options.includes(field)) {
          queryObject[field] = { [operator]: Number(value) };
        }
      });
    }
  
    // find the queryObject and equate it to result, if sort is provided then sort 
    let result = productModel.find(queryObject);

    // sort
    if (sort) {
      const sortList = sort.split(',').join(' ');
      result = result.sort(sortList);
    } else {
      result = result.sort('createdAt');
    }
  
    //fields
    if (fields) {
      const fieldsList = fields.split(',').join(' ');
      result = result.select(fieldsList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
  
    result = result.skip(skip).limit(limit);
    // 23
    // 4 7 7 7 2
  
    const products = await result;
    res.status(200).json({ products, nbHits: products.length });
  };

module.exports = {
    getAllproductsStatic, getAllproducts
}