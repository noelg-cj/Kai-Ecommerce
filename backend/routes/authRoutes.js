const express = require('express')
const router = express.Router()
const authController=require('../controllers/authController')

router.post('/signup',authController.registerUser)

router.post('/login',authController.authUser)

router.get('/user',authController.getUserProfile)

module.exports=router