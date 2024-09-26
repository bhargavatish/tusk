const express = require('express');

const premiumMember = require('../Controller/PremiumMember')

const authMiddleware = require('../Middleware/Auth');

const router  = express.Router();

router.get('/isPremiumMember',authMiddleware.authenticate,premiumMember.isPremiumMember)

module.exports = router;