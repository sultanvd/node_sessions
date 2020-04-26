const dbContext = require('../commons/dbContext');
const Sequelize = require('Sequelize');


const token = dbContext.define(
  'token',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    userid: {
      type: Sequelize.INTEGER,
      field: 'userid'
    },
    token: {
      type: Sequelize.STRING,
      field: 'token'
    }
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = token;