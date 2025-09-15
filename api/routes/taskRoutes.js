import express from "express";
import Task from "../../models/Task.js";
import { protect } from "../../middleware/protect.js";

const router = express.Router();

// ✅ Get all tasks for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Add a new task
router.post("/", protect, async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ msg: "Task title is required" });
    }

    const newTask = new Task({
      user: req.user._id,
      title,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    console.error("Error creating task:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Update a task (toggle complete or edit title)
router.put("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    task.title = req.body.title ?? task.title;
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// ✅ Delete a task
router.delete("/:id", protect, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task removed" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;
