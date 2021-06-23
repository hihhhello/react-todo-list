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
      if (!user)
        res
          .status(400)
          .json({
            message: "User not found. Start chat with bot and try again.",
          });
      const token = jwt.sign({ userID: userData.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userID: userData.id });
      return;
    }
    res
      .status(400)
      .json({ message: "Something wrong with recieved telegram data. Try again." });
    return;
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something gone wrong while tg-auth. Try again." });
  }
});

module.exports = router;
