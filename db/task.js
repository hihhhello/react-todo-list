const create_con = require("./connection.js");
const task = module.exports = {};

task.addTask = async ({ userId, title, descr }) => {
    const conn = await create_con();
    await conn.execute("INSERT INTO task(user_id, title, descr) VALUES(?,?,?)",
                                                        [userId, title, descr]);
    await conn.commit();
    await conn.end();
}

task.getList = async (userId) => {
    const conn = await create_con();
    const [rows] = await conn.execute("SELECT id, title, descr, status, task_timestamp FROM task WHERE user_id = ? AND status = 0 OR status = 1", [userId]);
    await conn.end();
    return rows;
}

task.getTask = async (taskId) => {
    const conn = await create_con();
    const [rows] = await conn.execute("SELECT title, descr, status, task_timestamp FROM task WHERE id = ?", [taskId]);
    await conn.end();
    return rows[0];
}

task.deleteTask = async ({ userId, taskId }) => {
    const conn = await create_con();
    await conn.execute("DELETE FROM task WHERE user_id = ? AND id = ?", [userId, taskId]);
    await conn.commit();
    await conn.end();
}

task.toggleStatus = async ({ userId, taskId, status }) => {
    const conn = await create_con();
    await conn.execute("UPDATE task SET status = ? WHERE user_id = ? AND id = ?", [status, userId, taskId]);
    await conn.commit();
    await conn.end();
}