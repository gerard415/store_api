require('express-async-errors')
const express = require('express')
const app = express()
require('dotenv').config()
const connectDB = require('./db/connect')
const Productrouter = require('./routes/products')


//async errors
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


// middleware
app.use(express.json());

// routes
app.get('/', (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
  });

app.use('/api/v1/products', Productrouter)

//async errors
app.use(notFoundMiddleware);
app.use(errorMiddleware);


const port = process.env.PORT || 5000;
const start = async ()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error)
    }
}
start()

