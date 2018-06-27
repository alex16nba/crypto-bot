const bodyParser = require('body-parser');
const methodOverride = require('method-override');

/**
 *  Module exports
 */
module.exports.init = init;

function init(app) {
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  app.use((req, res, next) => {
    req.resources = req.resources || {};
    return next();
  });
}
