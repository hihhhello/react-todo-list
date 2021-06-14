const mysql = require("mysql2/promise");
const config = require("config");

async function create_con() {
    const conn = await mysql.createConnection({
        host: config.get("db_host"),
        user: config.get("db_user"),
        password: config.get("db_pass"),
        database: config.get("db_name"),
    });
    return conn;
}

module.exports = create_con;