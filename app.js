const express = require('express');
const config = require('config');
const path = require("path");
const { Router } = require("express");
const apiRouter = Router();
const app = express();

const PORT = config.get("port") || 4000;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

apiRouter.get("/", (req, res) => {
    console.log(req.query);
    res.send("Hello dev!");
});

apiRouter.use("/db", require("./routes/api.db"));
apiRouter.use("/tg-auth", require("./routes/api.tg-auth"));




app.use("/react-todo-list/api", apiRouter);


app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}!`);
});