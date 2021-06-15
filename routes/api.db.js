const { Router } = require("express");
const { Task } = require("../db/index");
const router = Router();

// api/db/get-todos
router.get("/get-todos", async (req, res) => {
    try {
        const { userID } = req.body;
        const todoList = await Task.getList(userID);
        if(!todoList) {
            return res.status(400).json({ message: "Todo list is empty! Add some tasks in bot and try again."})
        }

        res.json({ todoList });
    } catch (e) {
        res.status(500).json({ message: "Something gone wrong. Try again."});
    }
});

// api/db/set-task
router.post("/set-task", async (req, res) => {
    try {
        const { userID, title, descr } = req.body;
        await Task.addTask({ userID, title, descr});
        const todoList = await Task.getList(userID);
        res.json({ todoList });
    } catch (e) {
        res.status(500).json({ message: "Something gone wrong. Try again."});
    }
});

module.exports = router;