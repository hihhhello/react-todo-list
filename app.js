const express = require('express');
const config = require('config');
const path = require("path");

const app = express();

const PORT = config.get("port") || 5000;
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/sync", require("./routes/api.sync"));
app.use("/api/db", require("./routes/api.db"));
if (process.env.NODE_ENV === "production") {
    app.use("/", express.static(path.join(__dirname, "client", "build")));

    app.use("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => {
    console.log(`Server has been started on ${PORT}!`);
});