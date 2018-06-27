const request = require('request');

const getOptions = require('../helpers/url').getOptions;
const getOptionsV2 = require('../helpers/url').getOptionsV2;
const {IsJsonString} = require('../helpers/json');
/**
 *  Module exports
 */
module.exports.getOrderBook = getOrderBook;
module.exports.getTicker = getTicker;
module.exports.getMarkets = getMarkets;
module.exports.getMarketsV2 = getMarketsV2;
module.exports.formatDataMarketsV2 = formatDataMarketsV2;

/**
 * @param market
 * @type (buy, sell, both)
 */
function getOrderBook (req, res, next){
  const params = req.query;
  const url = 'public/getorderbook';
  const options = getOptions(url, req.body);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param market (BTC-LTC)
 */
function getTicker (req, res, next){
  const url = 'public/getticker';
  const options = getOptions(url, req.body);

  request.get(options, (err, response, data) => {
    if(!IsJsonString(data)) {
      return next({message: 'No parse string available'});
    }

    const parsedData = JSON.parse(data);

    if(!parsedData.success) {
      return next(parsedData)
    }

    req.resources.ticker = parsedData;
    return next();
  });
}
/**
 * @param market (BTC-LTC)
 */
function getMarkets (req, res, next){
  const url = 'public/getmarkets';
  const options = getOptions(url, req.body);

  request.get(options, (err, response, data) => {
    req.resources.market = JSON.parse(data);
    return next();
  });
}
/**
 * @param marketName (BTC-LTC)
 * @param tickInterval [“oneMin”, “fiveMin”, “thirtyMin”, “hour”, “day”]
 */
function getMarketsV2 (req, res, next){
  const url = 'market/GetTicks';
  const options = getOptionsV2(url, req.body);

  request.get(options, (err, response, data) => {
    if(!IsJsonString(data)) {
      return next({message: 'No parse string available'});
    }

    req.resources.market = JSON.parse(data);
    next();

  });
}

function formatDataMarketsV2(req, res, next) {
  const data = req.resources.market;
  const lastData = data.result.slice(-40);
  const emaValues10 = calculateEMA(lastData, 10);
  const emaValues20 = calculateEMA(lastData, 20);
  const emaValues30 = calculateEMA(lastData, 30);

  req.resources.market = lastData;
  req.resources.emas = {
    ema10: emaValues10,
    ema20: emaValues20,
    ema30: emaValues30,
    success: true
  };
  next();
}

/**
 * @param data (array of values)
 * @param N (ema value ex: 10, 20, 30)
 */
function calculateEMA(data, N) {
  const array = [];
  const K = 2 / (N+1);

  data.forEach((item, index) => {
    const CLOSING_PRICE = item['C'];
    const EMA_YESTERDAY = array.length ? array[array.length - 1] : data[0]['C'];

    if(index > 0) {
      const EMA = (CLOSING_PRICE * K) + (EMA_YESTERDAY * (1 - K));
      array.push(EMA);
    }
  });

  return array;
}

