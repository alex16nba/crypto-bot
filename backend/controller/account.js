const request = require('request');

const getOptions = require('../helpers/url').getOptions;

/**
 *  Module exports
 */
module.exports.getBalance = getBalance;
module.exports.getBalances = getBalances;
module.exports.getOrderHistory = getOrderHistory;
module.exports.getDepositHistory = getDepositHistory;

/**
 * @param curreny
 */
function getBalance (req, res, next){
  const params = req.query;
  const url = 'account/getbalance';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @no params
 */
function getBalances (req, res, next){
  const params = req.query;
  const url = 'account/getbalances';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param market?
 */
function getOrderHistory (req, res, next){
  const params = req.query;
  const url = 'account/getorderhistory';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}

/**
 * @param currency?
 */
function getDepositHistory (req, res, next){
  const params = req.query;
  const url = 'account/getdeposithistory';
  const options = getOptions(url, params);

  request.get(options, (err, response, data) => {
    return res.json(JSON.parse(data));
  });
}
