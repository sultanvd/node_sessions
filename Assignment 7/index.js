const express = require('express');
const app = express();

require('dotenv').config();

const preInitialization = require('./src/utils/pre-init');
const registerRoutes = require('./src/routes/auth');
const userRoute = require('./src/routes/users');
const port = 4000;


preInitialization(app);
registerRoutes(app);
userRoute(app);

app.listen(port, () => console.log('listening on port 4000'));
