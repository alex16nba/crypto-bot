const hmac_sha512 = require('./hmac-sha512');
const {API_KEY, API_SECRET, BASE_URL, BASE_URL_V2} = require('../config/index');

/**
 *  Module exports
 */
module.exports.getOptions = getOptions;
module.exports.getOptionsV2 = getOptionsV2;

function getOptions(bittrexUrl, params) {
  const nonce = new Date().getMilliseconds();
  let url = `${BASE_URL}/${bittrexUrl}?apikey=${API_KEY}&nonce=${nonce}`;
  for(let i in params) {
    url += `&${i}=${params[i]}`;
  }
  const headers = {
    apisign: hmac_sha512.HmacSHA512(url, API_SECRET)
  };
  const options = {
    method: 'GET',
    url: url,
    headers: headers,
  };

  return options;
}

function getOptionsV2(bittrexUrl, params) {
  const nonce = new Date().getMilliseconds();
  let url = `${BASE_URL_V2}/${bittrexUrl}?apikey=${API_KEY}&_=${nonce}`;
  for(let i in params) {
    url += `&${i}=${params[i]}`;
  }
  const headers = {
    apisign: hmac_sha512.HmacSHA512(url, API_SECRET)
  };
  const options = {
    method: 'GET',
    url: url,
    headers: headers,
  };

  return options;
}
