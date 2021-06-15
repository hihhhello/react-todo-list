const create_con = require("./connection");
const user = (module.exports = {});

user.getUser = async (userID) => {
  console.log("DB USER", typeof userID);
  try {
    const conn = await create_con();
    const [rows] = await conn.execute("SELECT * FROM user WHERE user_id = ?", [
      userID,
    ]);
    conn.end();
    return rows[0];
  } catch (e) {
    throw e;
  }
};

user.regUser = async ({ userID, username }) => {
  try {
    const conn = await create_con();
    await conn.execute("INSERT INTO user(user_id, username) VALUES(?,?)", [
      userID,
      username,
    ]);
    await conn.commit();
    await conn.end();
  } catch (e) {
    throw e;
  }
};
