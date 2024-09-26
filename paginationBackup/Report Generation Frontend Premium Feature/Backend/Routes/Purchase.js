const express = require('express')

const purchaseController = require('../Controller/Purchase')

 const authMiddleware = require('../Middleware/Auth');

 const router = express.Router()

 router.get('/premiumMembership',authMiddleware.authorize,purchaseController.purchasePremium);

 router.post('/updateTransactionStatus',authMiddleware.authorize,purchaseController.updateTransactionStatus);

 module.exports = router;