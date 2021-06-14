const create_con = require("./connection.js");
const user = module.exports = {};

user.getUser = async (userId) => {
    const conn = await create_con();
    const [rows] = await conn.execute(`SELECT * FROM user WHERE user_id = ${userId}`);
    conn.end();
    return rows[0];
}

user.regUser = async ({ userId, username}) => {
    const conn = await create_con();
    await conn.execute("INSERT INTO user(user_id, username) VALUES(?,?)", 
                                                        [userId, username]);
    await conn.commit()
    await conn.end();
}

