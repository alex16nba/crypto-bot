const express = require('express');
const router = express.Router();

const transactionCtrl = require('../controller/transaction');
const mainCtrl = require('../controller/main');

router.post('/addTransaction',
  transactionCtrl.addTransaction,
  mainCtrl.toJSON('transaction')
);

module.exports = router;
