const express = require('express')

const router = express.Router()

const authMiddleware = require('../Middleware/Auth')

const forgotPWController = require('../Controller/ForgotPWController')

router.get('/updatepassword/:resetpasswordid', forgotPWController.updatepassword)

router.get('/resetPassword/',forgotPWController.resetPassword)

router.post('/password/forgotpassword',authMiddleware.authorize,forgotPWController.forgotPassword)

module.exports = router;