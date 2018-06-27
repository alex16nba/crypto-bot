const express = require('express');

const app = express();
const { port } = require('./backend/config/index');
/**
 * Set express (app) variables
 */
app.set('root', __dirname);

require('./backend/config/mongoose').init(app);
require('./backend/config/models').init(app);
require('./backend/config/express').init(app);
require('./backend/config/routes').init(app);
// require('./backend/crons/market');

app.use((err, req, res, next) => {
  const status = err.status || 500;
  return res.status(status).json(err);
});

app.listen(port, ()=> {
  console.log(`app listening on port ${port}`);
});
