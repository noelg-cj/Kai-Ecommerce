const express = require('express')
const router = express.Router()
const productController=require('../controllers/productController')

router.get('/category/:categoryId',productController.getProductsByCategory)

router.get('/item/:id',productController.getProductById);

router.post('/create',productController.createProduct);

router.get('/stock',productController.getProducts);

router.delete('/:id',productController.deleteProduct);

router.patch('/:id',productController.updateProduct);



module.exports=router