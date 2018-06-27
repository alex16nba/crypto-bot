const ENV = process.env.NODE_ENV || 'development';

const config = require('./webpack.config.' + (ENV === 'production' ? 'prod' : 'dev'));

module.exports = config;
