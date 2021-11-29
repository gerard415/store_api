require('dotenv').config()
const connectDB = require('./db/connect')
const productJson = require('./products.json')
const productModel = require('./models/product')




const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        await productModel.deleteMany() //deletes the current items in your database
        await productModel.create(productJson) //adds all the items inside the json file
        console.log('success')
        process.exit(0) //exiting but was succesfull
    }catch(err){
        console.log(err)
        process.exit(1) //exiting butfor an error
    }
}
start()