/**
 *  Module exports
 */

module.exports.init = init;

function init(app) {
  const modelsPath = app.get('root') + '/backend/models/';
  const models = ['transactions'];

  models.forEach(function(model) {
    require(modelsPath + model);
  });
}
