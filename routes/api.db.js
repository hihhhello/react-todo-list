const { Router } = require("express");
const { Task } = require("../db/index");
const auth = require("../middleware/auth.middleware");
const router = Router();

// api/db/get-todos
router.post("/get-todos", auth, async (req, res) => {
  try {
    const { userID } = req.body;
    const todoList = await Task.getList(userID);
    if (!todoList) {
      return res
        .status(400)
        .json({
          message: "Todo list is empty! Add some tasks in bot and try again.",
        });
    }
    res.json({ todoList });
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Something went wrong while getting todos. Try again.",
      });
  }
});

// api/db/get-task
router.post("/get-task", auth, async (req, res) => {
  try {
    const { taskID } = req.body;
    const task = await Task.getTask(taskID);
    if (!task) {
      return res
        .status(400)
        .json({
          message: "Something gone wrong while getting task. Try again.",
        });
    }
    res.json({ task });
  } catch (e) {
    res.status(500).json({ message: "Something gone wrong. Try again." });
  }
});

// api/db/set-task
router.post("/set-task", auth, async (req, res) => {
  try {
    const { userID, title, descr } = req.body;
    await Task.addTask({ userID, title, descr });
    const todoList = await Task.getList(userID);
    res.status(201).json({ todoList });
  } catch (e) {
    res.status(500).json({ message: "Something gone wrong. Try again." });
  }
});

// api/db/set-task-status
router.post("/set-task-status", auth, async (req, res) => {
  try {
    const { userID, taskID, status } = req.body;
    await Task.toggleStatus({ userID, taskID, status });
    const todoList = await Task.getList(userID);
    res.status(201).json({ todoList });
  } catch (e) {
    res
      .status(500)
      .json({
        message: "Something gone wrong while updating task status. Try again.",
      });
  }
});

// api/db/clear-list
router.delete("/clear-list", auth, async (req, res) => {
  try {
    const { userID } = req.body;
    await Task.clearList(userID);
    res.json({ todoList: [] });
  } catch (e) {
    res.status(500).json({ message: "Something gone wrong. Try again." });
  }
});

module.exports = router;
