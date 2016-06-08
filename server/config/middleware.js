var bodyParser = require('body-parser');
var path = require('path');
var orm = require('orm');
var ormConfig = require('../../model');
module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname, '../../dist')));
  console.log(path.join(__dirname + '../../client'));
  app.use(orm.express('postgres://Loren1@localhost/rtb', ormConfig));
};
