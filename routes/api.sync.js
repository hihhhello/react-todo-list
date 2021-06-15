const { Router } = require("express");
const { User, Task } = require("../db/index");
const router = Router();

// /api/sync
router.post("/", async (req, res) => {
  console.log("BODY", req.body);
  try {
    const { userID } = req.body;
    const user = await User.getUser(userID);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found! Create table in telegram bot." });
    }

    res.json({ userID, username: user.username });
  } catch (e) {
    res.status(500).json({ message: "Something gone wrong. Try again." });
  }
});

module.exports = router;
