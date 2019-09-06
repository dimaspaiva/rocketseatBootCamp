const express = require("express"); // Call uframework
const Project = require("./project.js"); // call project object

const server = express(); // define server variable

const list = []; // projects list

server.use(express.json()); // Adapt to read json

// create a project
server.post("/projects", (req, res) => {
  const project = new Project(req.body);

  console.log(project);
  if (!project.id) {
    return res.status(400).json({ error: "Projects infos is required" });
  }

  list.push(project);

  return res.json(list);
});

server.listen(3000);
