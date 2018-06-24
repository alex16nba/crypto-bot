const mongoose = require('mongoose');
const Transaction = mongoose.model('Transaction');

/**
 *  Module exports
 */
module.exports.addTransaction = addTransaction;

function addTransaction(req, res, next) {
  const data = req.body;

  Transaction.create(data, (err, result) => {
    if (err) {
      return next(err);
    }

    req.resources.transaction = result;
    next();
  });
}
