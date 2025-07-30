const Project = require("../models/projectModel.js");
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const userId = req.user._id;

    const project = new Project({ name, description, userId });
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id });
    return res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Project.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Project not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Project.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports ={
    createProject,
    getProjects,
    updateProject,
    deleteProject
}