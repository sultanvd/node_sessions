const server = require("./server");
const fs = require("fs")

const fileName = "./file.txt"

const mainServer = server.mainServer
const hostname = server.hostname
const port = server.port

mainServer.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`\nReading file: ${fileName} \n\n`)

  var content =  fs.readFileSync(fileName, "utf8");
  console.log(content);
});
