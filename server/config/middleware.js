var bodyParser = require('body-parser');
var path = require('path');
var orm = require('orm');
var ormConfig = require('../../model');
module.exports = function(app, express) {
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname + '../../client/dist')));
  app.use(orm.express('postgres://Loren1@localhost/raise-thebar', ormConfig));
};
