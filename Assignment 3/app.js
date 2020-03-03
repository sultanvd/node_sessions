const bookRouter = require("./controller/BookController");
const server = require("express");
var bodyParser = require('body-parser');

const app = server();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use('/book', bookRouter);

app.listen(4000, () => console.log("listening to port 4000"));


