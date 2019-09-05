const express = require("express"); // lib call | micro framework

const server = express(); // Exporting express functions

// request mais simples, envio de informação
server.get("/teste", (req, res) => {
  // console.log("teste"); | only for server (useless)
  // res.send('Hello World!') | send an element
  res.json({ message: "Hello World!" }); // send an js object
});

server.listen(3000); // set port 3000
