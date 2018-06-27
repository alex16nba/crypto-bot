const express = require('express');
const router = express.Router();

const publicCtrl = require('../controller/public');
const mainCtrl = require('../controller/main');

router.post('/getOrderBook',
  publicCtrl.getOrderBook
);

router.post('/getTicker',
  publicCtrl.getTicker,
  mainCtrl.toJSON('ticker')
);

router.post('/getMarkets',
  publicCtrl.getMarkets,
  mainCtrl.toJSON('market')
);

router.post('/getMarketsV2',
  publicCtrl.getMarketsV2,
  mainCtrl.toJSON('market')
);

router.post('/getEmas',
  publicCtrl.getMarketsV2,
  publicCtrl.formatDataMarketsV2,
  mainCtrl.toJSON('emas')
);

module.exports = router;
