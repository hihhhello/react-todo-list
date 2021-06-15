const express = require('express');
const config = require('config');

const app = express();

const PORT = config.get("port") || 5000;

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/sync", require("./routes/api.sync"));
app.use("/api/db", require("./routes/api.db"));

app.use("/", (req, res) => {
    res.send("Hello world!");
})

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}!`);
});