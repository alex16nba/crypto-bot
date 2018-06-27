const request = require('request');

const {getOptions} = require('../helpers/url');
const {IsJsonString} = require('../helpers/json');

/**
 *  Module exports
 */
module.exports.getOpenOrders = getOpenOrders;
module.exports.buyOrder = buyOrder;
module.exports.buyToLastAsk = buyToLastAsk;
module.exports.sellOrder = sellOrder;
module.exports.sellToLastBid = sellToLastBid;
module.exports.cancelOrder = cancelOrder;

/**
 * @param market
 * @type (buy, sell, both)
 */
function getOpenOrders (req, res, next){
  const params = req.query;
  const url = 'market/getopenorders';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param market (BTC-LTC)
 * @param quantity (1.2)
 * @param rate (1.3)
 */
function buyOrder (req, res, next){
  const params = req.query;
  const url = 'market/buylimit';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param market (BTC-LTC)
 * @param quantity (1.2)
 * @param rate (1.3)
 */
function sellOrder (req, res, next){
  const params = req.query;
  const url = 'market/selllimit';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param uuid (hgfdhre54d-jtfgh)
 */
function cancelOrder (req, res, next){
  const params = req.query;
  const url = 'market/cancel';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

function sellToLastBid(req, res, next) {
  const { ticker } = req.resource;
  console.log('ticker', ticker);
  return next();
}

function buyToLastAsk(req, res, next) {
  const { ticker } = req.resources;
  const params = req.query;
  console.log('params', params);
  const data = {
    ...params,
    // quantity: 0.1,
    rate: ticker.result.Ask
  };
  const url = 'market/buylimit';
  const options = getOptions(url, data);
  console.log('data', data);

  // return res.json({test: 1231});

  request.get(options, (err, response, data) => {
    if(!IsJsonString(data)) {
      return next({message: 'No parse string available'});
    }

    const parsedData = JSON.parse(data);

    if(!parsedData.success) {
      return next(parsedData)
    }

    req.resources.order = parsedData;

    next();
  });
}

