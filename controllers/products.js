const getAllproductsStatic = async (req, res)=>{
    throw new Error('testing async errors')
    res.status(200).json({msg:"get all products static"})

}

const getAllproducts = async (req, res)=>{
    throw new Error('testing async errors')
    res.status(200).json({msg:"get all products"})

}

module.exports = {
    getAllproductsStatic, getAllproducts
}