const express = require('express')
const router = express.Router()
orderController=require('../controllers/orderController')

router.post('/cart',orderController.orderCart)

router.post('/item',orderController.orderItem)

router.get('/user/:userId',orderController.getUserOrder)

router.get('/:id',orderController.getOrderById)

module.exports=router