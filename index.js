const express = require("express"); // Call uframework
const Project = require("./project.js"); // call project object

const server = express(); // define server variable

const list = []; // projects list
let count = 0; // requests counter

server.use(express.json()); // Adapt to read json

// Middleware to find project on list
const findId = (req, res, next) => {
  const { id } = req.params;
  const index = list.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(400).json({ error: "Noun project found" });
  }

  req.index = index;

  next();
};

// Middlewares to count requests
const requestCounter = (req, res, next) => {
  count++;
  const t1 = new Date();
  next();
  const t2 = new Date();
  const time = t2 - t1;

  console.log(count + " - t: " + time + "ms");
};

/// add tasks
server.post("/projects/:id/tasks", requestCounter, findId, (req, res) => {
  const { index } = req;
  const task = req.body.title;

  if (!task) {
    return res.status(400).json({ error: "Task name not recognized" });
  }

  list[index].tasks.push(task);

  return res.send({ message: "Tarefa inserida com sucesso!" });
});

// create a project
server.post("/projects", requestCounter, (req, res) => {
  const project = new Project(req.body);

  if (!project.id || !project.title || !project.tasks) {
    return res.status(400).json({ error: "Projects infos is required" });
  }

  list.push(project);

  return res.json({ message: "Project insert succesfull!" });
});

// list projects on list
server.get("/projects", requestCounter, (req, res) => {
  if (list.length === 0) {
    return res.json({ warning: "Noun project exist" });
  }

  return res.json(list);
});

// update project name
server.put("/projects/:id", requestCounter, findId, (req, res) => {
  const { index } = req;
  const title = req.body.name;

  if (!req.body.name) {
    return res.status(400).json({ error: "New project name not recognized" });
  }

  list[index].title = title;
  return res.json({ menssage: "Name update succesfull" });
});

// Delete project
server.delete("/projects/:id", requestCounter, findId, (req, res) => {
  const { index } = req;

  list.splice(index, 1);

  return res.json({ message: "Project remove succesfull" });
});

server.listen(3000);
