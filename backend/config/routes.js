/**
 *  Module exports
 */

module.exports.init = init;

function init(app) {
  const routesPath = app.get('root') + '/backend/routes';

  app.use('/', require(`${routesPath}/account`));
  app.use('/', require(`${routesPath}/market`));
  app.use('/', require(`${routesPath}/public`));
  app.use('/', require(`${routesPath}/transaction`));
}
