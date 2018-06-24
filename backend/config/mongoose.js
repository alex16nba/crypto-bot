const mongoose = require('mongoose');

const config = require('./index');

/**
 *  Module exports
 */
module.exports.init = init;

function init(app) {
  mongoose.connect(config.mongodb.uri);

  // If the Node process ends, cleanup existing connections
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  process.on('SIGHUP', cleanup);

  if (app) {
    app.set('mongoose', mongoose);
  }

  return mongoose;
};

function cleanup() {
  mongoose.connection.close(() => {
    process.exit(0);
  });
}
