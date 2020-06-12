const express = require('express');
const router = express.Router();

const publicCtrl = require('../controller/public');
const mainCtrl = require('../controller/main');

router.get('/getOrderBook',
  publicCtrl.getOrderBook
);

router.get('/getTicker',
  publicCtrl.getTicker,
  mainCtrl.toJSON('ticker')
);

router.get('/getMarkets',
  publicCtrl.getMarkets,
  mainCtrl.toJSON('market')
);

router.get('/getMarketsV2',
  publicCtrl.getMarketsV2,
  mainCtrl.toJSON('market')
);

router.get('/getEmas',
  publicCtrl.getMarketsV2,
  publicCtrl.formatDataMarketsV2,
  mainCtrl.toJSON('emas')
);

module.exports = router;
