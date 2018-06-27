const express = require('express');
const router = express.Router();

const transactionCtrl = require('../controller/transaction');
const mainCtrl = require('../controller/main');
const cronCtrl = require('../crons/test');

router.post('/addTransaction',
  transactionCtrl.addTransaction,
  mainCtrl.toJSON('transaction')
);

router.post('/test',
  cronCtrl.test
  // mainCtrl.toJSON('')
);

module.exports = router;
