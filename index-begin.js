const express = require("express"); // lib call | micro framework

const server = express(); // Exporting express functions

// Query params = ?param=3000
// const { name } = req.query;
// Route params = /param/2
// Request body = { 'var1': n, 'var2': m, 'name': 'john', 'lastname': 'doe'}

// request mais simples, envio de informação
server.get("/teste/:id", (req, res) => {
  // console.log("teste"); | only for server (useless)
  // res.send('Hello World!') | send an element
  // res.json({ message: "Hello World!" }); | send an js object
  const { id } = req.params;

  return res.json({ message: `Hello id ${id}` });
});

server.listen(3000); // set port 3000
