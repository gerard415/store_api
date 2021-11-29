const getAllproductsStatic = async (req, res)=>{
    try {
        res.status(200).json({msg:"get all products staic"})
    } catch (error) {
        res.send(error)
    }
}

const getAllproducts = async (req, res)=>{
    try {
        res.status(200).json({msg:"get all products"})
    } catch (error) {
        res.send(error)
    }
}

module.exports = {
    getAllproductsStatic, getAllproducts
}