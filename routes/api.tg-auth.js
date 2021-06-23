const { Router } = require("express");
const router = Router();
const config = require("config");
const { createHash, createHmac } = require("crypto");
const { User } = require("../db/index");
const jwt = require("jsonwebtoken");

function checkSignature(token, { hash, ...data }) {
  const secret = createHash("sha256").update(token).digest();
  const checkString = Object.keys(data)
    .sort()
    .map((k) => `${k}=${data[k]}`)
    .join("\n");
  const hmac = createHmac("sha256", secret).update(checkString).digest("hex");
  return hmac === hash;
}

router.post("/", async (req, res) => {
  try {
    const { userData } = req.body;
    if (checkSignature(config.get("botToken"), userData)) {
      const user = await User.getUser(userData.id);
      let isNew = false;
      if (!user) {
        await User.regUser({
          userID: userData.id,
          username: userData.username,
        });
        isNew = true;
      };
      const token = jwt.sign({ userID: userData.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userID: userData.id, isNew });
      return;
    }
    res
      .status(400)
      .json({
        message: "Something wrong with recieved telegram data. Try again.",
      });
    return;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something gone wrong while tg-auth. Try again." });
  }
});

module.exports = router;
