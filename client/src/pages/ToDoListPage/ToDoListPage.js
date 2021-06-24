import React, { useState, useEffect, useContext } from "react";
import AddTaskBar from "../../components/AddTaskBar";
import ToDoList from "../../components/ToDoList";
import { useHttp } from "../../hooks/http.hook";
import AuthContext from "../../context/auth-context";

import "./_todo-list-page.sass";

export const ToDoListPage = () => {
  const { loading, request } = useHttp();
  const [taskTitle, setTaskTitle] = useState("");
  const [todoList, setTodoList] = useState([]);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { todoList } = await request(
          "api/db/get-todos",
          "POST",
          {},
          {
            Authorization: `Bearer ${token}`,
          }
        );
        setTodoList(todoList);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  const onChangeTaskTitle = (title) => {
    setTaskTitle(title);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      return;
    }

    try {
      const { todoList } = await request(
        "api/db/set-task",
        "POST",
        {
          title: taskTitle,
          descr: "descr",
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setTodoList(todoList);
      setTaskTitle("");
    } catch (e) {
      throw e;
    }
  };

  const handleRowButtons = async (taskID, e) => {
    const btn = e.target.getAttribute("data-row-btn");
    try {
      const { task } = await request(
        "api/db/get-task",
        "POST",
        { taskID },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      const status = btn === "delete" ? 2 : !task.status;
      const { todoList } = await request(
        "api/db/set-task-status",
        "POST",
        {
          taskID,
          status,
        },
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setTodoList(todoList);
    } catch (e) {
      throw e;
    }
    return;
  };

  const handleClearButton = async (e) => {
    e.preventDefault();
    try {
      const { todoList } = await request(
        "api/db/clear-list",
        "DELETE",
        {},
        {
          Authorization: `Bearer ${token}`,
        }
      );
      setTodoList(todoList);
    } catch (e) {
      throw e;
    }
    return;
  };

  return (
    <div className="todo-table">
      <div className="container">
        <div className="todo-table__wrapper">
          <h1 className="todo-table__title">TO-DO LIST</h1>
          <AddTaskBar
            onChange={onChangeTaskTitle}
            onAdd={addTodo}
            todoTitle={taskTitle}
          />
          <ToDoList
            todoList={todoList}
            onClick={(id, e) => handleRowButtons(id, e)}
            onClear={handleClearButton}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};
