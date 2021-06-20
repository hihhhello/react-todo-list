import React, { useState, useEffect } from "react";
import AddTaskBar from "../../components/AddTaskBar";
import ToDoList from "../../components/ToDoList";
import { useHttp } from "../../hooks/http.hook";

import "./_todo-list-page.sass";

export const ToDoListPage = () => {
  const { loading, request } = useHttp();
  const [taskTitle, setTaskTitle] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { userID } = user;
      const fetchData = async () => {
        try {
          const { todoList } = await request("api/db/get-todos", "POST", {
            userID,
          });
          if (todoList) {
            setTodoList(todoList);
          }
        } catch (e) {
          console.log(e);
        }
      };
      fetchData();
    }
  }, [request]);

  const onChangeTaskTitle = (title) => {
    setTaskTitle(title);
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!taskTitle) {
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      try {
        const { userID } = user;
        const { todoList } = await request("api/db/set-task", "POST", {
          userID,
          title: taskTitle,
          descr: "descr",
        });
        setTodoList(todoList);
        setTaskTitle("");
      } catch (e) {
        throw e;
      }
    }
  };

  const handleRowButtons = async (taskID, e) => {
    const btn = e.target.getAttribute("data-row-btn");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { userID } = user;
      try {
        const { task } = await request("api/db/get-task", "POST", { taskID });
        const status = btn === "delete" ? 2 : !task.status;
        const { todoList } = await request("api/db/set-task-status", "POST", {
          userID,
          taskID,
          status,
        });
        setTodoList(todoList);
      } catch (e) {
        throw e;
      }
      return;
    }
  };

  const handleClearButton = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const { userID } = user;
      try {
        const { todoList } = await request("api/db/clear-list", "DELETE", {
          userID,
        });
        setTodoList(todoList);
      } catch (e) {
        throw e;
      }
      return;
    }
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
