const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} = require("../controllers/projectcontroller");

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.put("/:id", auth, updateProject);
router.delete("/:id", auth, deleteProject);

module.exports = router;
