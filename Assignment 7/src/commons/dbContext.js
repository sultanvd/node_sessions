const Sequelize = require('Sequelize');
require('dotenv').config();

//dbname, username, 
const dbName = process.env.DB_NAME;
const user = process.env.USER_NAME;
const password = process.env.PASS;
const hostName = process.env.HOST_NAME;

const dbContext = new Sequelize(dbName, user, password, {
host: hostName,
port: 5432,
dialect: 'postgres',

define: {
schema: 'public',
timestamps: false // true by default
},

pool: {
max: 5,
min: 0,
idle: 10000
}
});

module.exports = dbContext;