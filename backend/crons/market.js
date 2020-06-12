const CronJob = require('cron').CronJob;
const request = require('request');

const {modeOptions} = require('../staticData/staticData');
const {baseUrl} = require('../config/index');

let mode = modeOptions.pending;
const headers =  {
  'Content-type': 'application/json',
  'accept': 'application/json',
};

// runs from 5 in 5 seconds
new CronJob('*/45 * * * * * ', () => {
  const now = new Date();
  const url = `${baseUrl}/getEmas?marketName=BTC-ETH&tickInterval=fiveMin`;
  const transactionUrl = `${baseUrl}/addTransaction`;
  const tickerUrl = `${baseUrl}/getTicker?market=BTC-ETH`;

  request.get(url, (err, response, data) => {
    const result = JSON.parse(data);
    const { ema10, ema20, ema30 } = result;
    const lastEma10 = ema10[ema10.length - 1];
    const lastEma20 = ema20[ema20.length - 1];
    const lastEma30 = ema30[ema30.length - 1];
    const options = {
      method: 'POST',
      uri: transactionUrl,
      headers: headers,
      json: true,
    };

    if(mode === modeOptions.pending && lastEma10 > lastEma30 && lastEma20 > lastEma30) {
      logSomeInfo(now, mode, lastEma10, lastEma20, lastEma30, 'HERE BUY');
      request.get(tickerUrl, (err, response, data) => {
        const tickerData = JSON.parse(data);
        if(tickerData.success) {
          mode = modeOptions.buy;
          const ask = tickerData.result.Ask;
          const transaction = {
            type: 'BUY',
            price: ask,
            ema: JSON.stringify({lastEma10, lastEma20, lastEma30}),
            marketName: 'BTC-ETH',
            timeInterval: 'fiveMin'
          };
          options.form = transaction;
          request(options, (err, response, transactionData) => {
            if(transactionData.errors) {
              console.log('now',now);
              return console.error(transactionData.errors);
            }
            console.log('now',now);
            console.log('transactionData with BUY success', transactionData);
          });
        }
      });
    }

    if(mode === modeOptions.buy && lastEma10 < lastEma30 && lastEma20 < lastEma30) {
      logSomeInfo(now, mode, lastEma10, lastEma20, lastEma30, 'HERE SELL');
      request.get(tickerUrl, (err, response, data) => {
        const tickerData = JSON.parse(data);
        if(tickerData.success) {
          mode = modeOptions.pending;
          const bid = tickerData.result.Bid;
          const transaction = {
            type: 'SELL',
            price: bid,
            ema: JSON.stringify({lastEma10, lastEma20, lastEma30}),
            marketName: 'BTC-ETH',
            timeInterval: 'fiveMin'
          };
          options.form = transaction;
          request(options, (err, response, transactionData) => {
            if(transactionData.errors) {
              console.log('now',now);
              return console.error(transactionData.errors);
            }
            console.log('now',now);
            console.log('transactionData with SELL success', transactionData);
          });
        }
      });
    }
  });

}, null, true);

function logSomeInfo(now, mode, lastEma10, lastEma20, lastEma30, msg) {
  console.log('now',now);
  console.log('mode', mode);
  console.log('lastEma10', lastEma10);
  console.log('lastEma20', lastEma20);
  console.log('lastEma30', lastEma30);
  console.log(msg);
}
