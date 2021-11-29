const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')

port = 5000
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}
start()

