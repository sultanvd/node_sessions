const Cors = require('cors');
const BodyParser = require('body-parser');

module.exports = function preInitialization(app) {
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.use(Cors({ exposedHeaders: 'Authorization' }));
};