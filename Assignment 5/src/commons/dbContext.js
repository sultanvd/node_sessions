const Sequelize = require('Sequelize');

//dbname, username, password
const dbContext = new Sequelize('postgres', 'postgres', 'test', {
host: 'localhost',
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