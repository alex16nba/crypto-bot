const express = require('express');
const router = express.Router();

const accountCtrl = require('../controller/account');

router.get('/getBalance', accountCtrl.getBalance);
router.get('/getBalances', accountCtrl.getBalances);
router.get('/getOrderHistory', accountCtrl.getOrderHistory);
router.get('/getDepositHistory', accountCtrl.getDepositHistory);

module.exports = router;
