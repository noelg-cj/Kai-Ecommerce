const express = require('express')
const router = express.Router()
const cartController=require('../controllers/cartController')

router.post('/add',cartController.addToCart)

router.delete('/remove',cartController.removeFromCart)

router.delete('/clear/:userId',cartController.clearCart)

router.get('/:userId',cartController.getCart)

router.patch('/decrement',cartController.decrementQuantity)

module.exports=router