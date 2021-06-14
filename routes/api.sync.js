const { Router } = require("express");
const { user: userDb } = require("../db/index");
const router = Router();

// /api/sync
router.get("/", async (req, res) => {
    try {
        const { userId } = req.body;

        const user = userDb.getUser(userId);

        if(!user) {
            return res.status(400).json({ message: "User not found! Create table in telegram bot." })
        }
        console.log(user);
        res.json({ userId,  username: user.username});

    } catch (e) {
        res.status(500).json({ message: "Something gone wrong. Try again." })
    }
});

module.exports = router;