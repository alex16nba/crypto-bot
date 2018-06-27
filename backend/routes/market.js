const express = require('express');
const router = express.Router();

const marketCtrl = require('../controller/market');
const publicCtrl = require('../controller/public');
const mainCtrl = require('../controller/main');

router.post('/getOpenOrders', marketCtrl.getOpenOrders);

router.post('/BUYOrder', marketCtrl.buyOrder);

router.post('/SELLOrder', marketCtrl.sellOrder);

router.post('/cancelOrder', marketCtrl.cancelOrder);

router.post('/sellToLastBid',
  publicCtrl.getTicker,
  marketCtrl.sellToLastBid,
  marketCtrl.sellOrder
);

router.post('/buyToLastAsk',
  publicCtrl.getTicker,
  marketCtrl.buyToLastAsk,
  mainCtrl.toJSON('order')
);

module.exports = router;
