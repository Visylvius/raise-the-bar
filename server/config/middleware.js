var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var orm = require('orm');
var ormConfig = require('../../model');

module.exports = function(app, express) {
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(morgan('combined'));
  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(orm.express('postgres://ssxhdhci:0itwlG8JHy6hlWVj7Q0QPMdyp-HfG_Pm@elmer.db.elephantsql.com:5432/ssxhdhci', ormConfig));
};

// postgres://Loren1@localhost/rtb
