const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGOURL)
    .then(() => {
        console.log('Connection open')
    })
    .catch((err) => console.log(err))

app.use(express.json())
app.use(cors())

const authRouter = require('./routes/authRoutes')
app.use('/api/auth', authRouter)


const productRouter = require('./routes/productRoutes')
app.use('/api/product',productRouter)

const cartRouter=require('./routes/cartRoutes')
app.use('/api/cart',cartRouter)

const orderRouter = require('./routes/orderRoutes')
app.use('/api/order',orderRouter)

const PORT = process.env.PORT || 3000 
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})