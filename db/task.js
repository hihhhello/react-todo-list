const create_con = require("./connection.js");
const task = module.exports = {};

task.addTask = async ({ userID, title, descr }) => {
    const conn = await create_con();
    await conn.execute("INSERT INTO task(user_id, title, descr) VALUES(?,?,?)",
                                                        [userID, title, descr]);
    await conn.commit();
    await conn.end();
}

task.getList = async (userID) => {
    const conn = await create_con();
    const [rows] = await conn.execute("SELECT id, title, descr, status, task_timestamp FROM task WHERE user_id = ? AND status = 0 OR status = 1", [userID]);
    await conn.end();
    return rows;
}

task.getTask = async (taskId) => {
    const conn = await create_con();
    const [rows] = await conn.execute("SELECT title, descr, status, task_timestamp FROM task WHERE id = ?", [taskId]);
    await conn.end();
    return rows[0];
}

task.deleteTask = async ({ userID, taskId }) => {
    const conn = await create_con();
    await conn.execute("DELETE FROM task WHERE user_id = ? AND id = ?", [userID, taskId]);
    await conn.commit();
    await conn.end();
}

task.toggleStatus = async ({ userID, taskId, status }) => {
    const conn = await create_con();
    await conn.execute("UPDATE task SET status = ? WHERE user_id = ? AND id = ?", [status, userID, taskId]);
    await conn.commit();
    await conn.end();
}

task.clearList = async (userID) => {
    try {
        const conn = await create_con();
        await conn.execute("DELETE FROM TASK WHERE user_id = ?", [userID]);
        await conn.commit();
        await conn.end();
    } catch(e) {
        throw e;
    }
}