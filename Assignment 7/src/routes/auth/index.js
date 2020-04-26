const login = require('./login.route');
const register = require('./register.route');


module.exports = function registerRoutes(app){
    app.use('/auth', [login, register]);
}