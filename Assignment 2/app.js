const server = require("express");
const movieRoute = require("./movieRoute");

const app = server();

app.get('', (req, res) => res.send("Welcome to Star Wars"));
app.use('/starWars', movieRoute);

app.listen(4000, () => console.log("Listening on port 4000"));
