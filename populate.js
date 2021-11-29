require('dotenv').config()
const connectDB = require('./db/connect')
const productJson = require('./products.json')
const productModel = require('./models/product')




const start = async ()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        console.log('success')
    }catch(err){
        console.log(err)
    }
}
start()