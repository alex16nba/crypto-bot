const express = require('express');
const router = express.Router();

const marketCtrl = require('../controller/market');
const publicCtrl = require('../controller/public');
const mainCtrl = require('../controller/main');

router.get('/getOpenOrders', marketCtrl.getOpenOrders);

router.get('/BUYOrder', marketCtrl.buyOrder);

router.get('/SELLOrder', marketCtrl.sellOrder);

router.get('/cancelOrder', marketCtrl.cancelOrder);

router.get('/sellToLastBid',
  publicCtrl.getTicker,
  marketCtrl.sellToLastBid,
  marketCtrl.sellOrder
);

router.get('/buyToLastAsk',
  publicCtrl.getTicker,
  marketCtrl.buyToLastAsk,
  mainCtrl.toJSON('order')
);

module.exports = router;
