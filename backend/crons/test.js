const CronJob = require('cron').CronJob;
const request = require('request');

const {modeOptions} = require('../staticData/staticData');

/**
 *  Module exports
 */
module.exports.test = test;



const testObj = {

};

function startCron(param) {
  const currency = param ? param.currency : null;
  if(!currency) {
    return
  }

  testObj[param.currency].start();
}

function stopCron(param, testBa, callback) {
  const currency = param ? param.currency : null;
  if(!currency) {
    return
  }

  if(!testObj[param.currency]) {
    return callback({error: 'No cron job started with this currency'});
  }
  testObj[param.currency].stop();
  delete testObj[param.currency];
  callback();
}

function createCron(param, testBa, callback) {
  const currency = param ? param.currency : null;
  if(!currency) {
    return
  }

  if(testObj[param.currency]) {
    return callback({error: `Cron job with ${currency} already exists`});
  }
  // console.log('bla')
  testObj[param.currency] = testBa;
  // console.log('bla1')
  callback();
}

function test(req, res, next) {
  let index = 0;
  const onTick = (currency) => {
    // const now = new Date();
    index++;
    console.log('now', currency, index);
  };

  const onComplete = (currency) => {
    console.log('onComplete', currency);
  };

  const testBa = new CronJob({
    cronTime: '*/2 * * * * * ',
    onTick: () => {
      onTick(body.currency);
    },
    onComplete: () => {
      onComplete(body.currency);
    },
    // start: false, //start cron job, by default is false
    }
  );


  const body = req.body;
  console.log('body', body);
  if(body.stop) {
    return stopCron(body, testBa, (err) => {
      if(err) {
        console.log('err', err);
        return next(err);
      }
      console.log('cron stopped', Object.keys(testObj).length)
      return res.json({ message: `Job stopped with currency ${body.currency}`, testObj: Object.keys(testObj)});
    });
  }

  return createCron(body, testBa, (err) => {
    if(err) {
      return next(err);
    }

    startCron(body);
    console.log('testObj', Object.keys(testObj));
    return res.json({ message: `Job started with currency ${body.currency}`, testObj: Object.keys(testObj)});
  });

  // testBa.start();

}

