const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());


// ===== Read Projects =====
app.get("/api/projects", (req, res) => {

  const data = fs.readFileSync("projects.json");

  const projects = JSON.parse(data);

  res.json(projects);

});


// ===== Add Project =====
app.post("/api/projects", (req, res) => {

  const data = fs.readFileSync("projects.json");

  const projects = JSON.parse(data);

  const newProject = req.body;

  projects.push(newProject);

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(projects, null, 2)
  );

  res.json(newProject);

});


// ===== Delete Project =====
app.delete("/api/projects/:id", (req, res) => {

  const projectId = parseInt(req.params.id);

  const data = fs.readFileSync("projects.json");

  let projects = JSON.parse(data);

  projects = projects.filter(
    project => project.id !== projectId
  );

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(projects, null, 2)
  );

  res.json({
    message: "Project Deleted"
  });

});


// ===== Home Route =====
app.get("/", (req, res) => {

  res.send("Backend running 🚀");

});


// ===== Server =====
app.listen(5000, () => {

  console.log("Server running on port 5000");

});

// ===== Edit Project =====
app.put("/api/projects/:id", (req, res) => {

  const projectId = parseInt(req.params.id);

  const updatedProject = req.body;

  const data = fs.readFileSync("projects.json");

  let projects = JSON.parse(data);

  projects = projects.map(project => {

    if (project.id === projectId) {
      return updatedProject;
    }

    return project;

  });

  fs.writeFileSync(
    "projects.json",
    JSON.stringify(projects, null, 2)
  );

  res.json(updatedProject);

});