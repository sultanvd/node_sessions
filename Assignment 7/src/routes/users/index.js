const allusers = require('./allusers.route');


module.exports = function userRoutes(app){
    app.use('/user', [allusers]);
}