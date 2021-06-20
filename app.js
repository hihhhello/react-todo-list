const express = require('express');
const config = require('config');
const path = require("path");
const { Router } = require("express");
const router = Router();
const app = express();

const PORT = config.get("port") || 4000;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

router.get("/", (req, res) => {
    res.send("Hello dev!");
});

router.use("/sync", require("./routes/api.sync"));
router.use("/db", require("./routes/api.db"));
router.use("/tg-auth", require("./routes/api.tg-auth"));

if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));
    
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}


app.use("/react-app/api", router);


app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}!`);
});