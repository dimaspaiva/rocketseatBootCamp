const express = require("express"); // require micro framework

const server = express(); // Define server variable

const users = ["Dimas", "Jorge", "Renato"];

server.use(express.json());

// Middlware
server.use((req, res, next) => {
  console.log(`Método: ${req.method}; URL: ${req.url}`);
  console.time("Request");
  next();
  console.timeEnd("Request");
});

// CRUD
//Create
server.post("/users/", (req, res) => {
  const { name } = req.body;
  users.push(name);

  return res.json(users);
});

//Read
server.get("/users/:id/", (req, res) => {
  // Select one user
  const { id } = req.params; // get route params

  return res.json(users[id]); // send to client user data
});

server.get("/users/", (req, res) => {
  // return list of users
  return res.json(users);
});

//Update
server.put("/users/:id", (req, res) => {
  // update users name
  const { id } = req.params;
  const { name } = req.body;

  users[id] = name;

  return res.json(users);
});

// Deleate
server.delete("/users/:id", (req, res) => {
  // remove one user from list
  const { id } = req.params;

  users.splice(id, 1);

  return res.json(users);
});

server.listen("3000"); // Set port
