/**
 *  Module exports
 */
module.exports.toJSON = toJSON;

function toJSON(prop) {
  return (req, res, next) => {
    res.json(req.resources[prop]);
  }
}
