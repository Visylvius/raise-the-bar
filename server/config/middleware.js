var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var orm = require('orm');
var ormConfig = require('../../model');

module.exports = function(app, express) {
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(morgan('combined'));
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(orm.express('postgres://pnlvifxz:DbA0Om-4eMzp6ij84lC3nd06N4ncWmlc@elmer.db.elephantsql.com:5432/pnlvifxz', ormConfig));
};

// postgres://Loren1@localhost/rtb
