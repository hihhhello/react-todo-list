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

router.get("/", async (req, res) => {
  try {
    const payload = req.query;
    if (checkSignature(config.get("botToken"), payload)) {
      const user = await User.getUser(payload.id);
      if (!user)
        res
          .status(400)
          .json({
            message: "User not found. Start chat with bot and try again",
          });
      const token = jwt.sign({ userID: payload.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userID: payload.id });
      return;
    }
    res
      .status(400)
      .json({ message: "Something wrong with recieved tg data. Try again." });
    return;
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .json({ message: "Something gone wrong while tg-auth. Try again." });
  }
});

module.exports = router;
