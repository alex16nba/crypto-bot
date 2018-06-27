const express = require('express');
const router = express.Router();

const accountCtrl = require('../controller/account');

router.post('/getBalance', accountCtrl.getBalance);
router.post('/getBalances', accountCtrl.getBalances);
router.post('/getOrderHistory', accountCtrl.getOrderHistory);
router.post('/getDepositHistory', accountCtrl.getDepositHistory);

module.exports = router;
