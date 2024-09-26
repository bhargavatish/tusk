const express = require('express');
const router = express.Router();
const expenseController = require('../Controller/Expense');
const userAuthentication = require('../Middleware/Auth')


router.get('/getExpense',userAuthentication.authenticate,expenseController.getExpense);

router.post('/postExpense',userAuthentication.authorize,expenseController.saveExpense);

router.delete('/delete-expense/:id',userAuthentication.authorize,expenseController.deleteExpense);

// router.get('/pdf',userAuthentication.authorize,expenseController.pdfExpense);

router.get('/urltable',userAuthentication.authorize,expenseController.UrlTable);

router.get('/download',userAuthentication.authorize,expenseController.downloadExpense);

// router.post('/saveurl',userAuthentication.authorize,expenseController.SaveToUrlTable);
module.exports = router;