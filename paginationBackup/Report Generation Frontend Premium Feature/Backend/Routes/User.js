const express = require('express');

const router = express.Router();

const loginController = require('../Controller/User')

router.post('/userlogin',loginController.userlogin)

module.exports = router;