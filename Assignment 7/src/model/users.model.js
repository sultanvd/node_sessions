const dbContext = require('../commons/dbContext');
const Sequelize = require('Sequelize');


const users = dbContext.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'id' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    name: {
      type: Sequelize.STRING,
      field: 'name' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    password: {
      type: Sequelize.STRING,
      field: 'password' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    email: {
      type: Sequelize.STRING,
      field: 'email' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    address: {
      type: Sequelize.STRING,
      field: 'address'
    },
    age: {
      type: Sequelize.INTEGER,
      field: 'age' // Will result in an attribute that is firstName when user facing but first_name in the database
    },
    dob: {
      type: Sequelize.DATEONLY,
      field: 'dob' // Will result in an attribute that is firstName when user facing but first_name in the database
    }
    
  },
  {
    freezeTableName: true // Model tableName will be the same as the model name
  }
);

module.exports = users;