const express = require('express')

const router = express.Router()

const signupController = require('../Controller/NewUser')

router.post('/signup', signupController.sendData)

module.exports = router;