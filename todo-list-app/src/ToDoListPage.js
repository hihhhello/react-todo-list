import React from "react";
import AddTaskBar from "./AddTaskBar";
import ToDoList from "./ToDoList";
import { idGenerator } from "./services";

import { ThemeContext } from "./theme-context";

import "./_todo-table-page.sass";

class ToDoListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoTitle: "",
      todoList: [],
    };
    this.ids = idGenerator(this.state.todoList.length);

    this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleRowButtons = this.handleRowButtons.bind(this);
    this.handleClearButton = this.handleClearButton.bind(this);
  }

  componentDidMount() {
    const localeList = JSON.parse(localStorage.getItem("todo-list"));

    this.setState({
      todoList: localeList ? localeList : [],
    });
  }

  componentDidUpdate() {
    localStorage.setItem("todo-list", JSON.stringify(this.state.todoList));
  }

  onChangeTodoTitle(title) {
    this.setState({ todoTitle: title });
  }

  addTodo(e) {
    e.preventDefault();
    const { todoTitle, todoList } = this.state;
    if (!todoTitle) {
      return;
    }
    const newTask = {
      id: this.ids.next().value,
      title: todoTitle,
      status: false,
    };
    const newList = [...todoList, newTask];
    this.setState({ todoList: newList });
    this.onChangeTodoTitle("");
  }

  handleRowButtons(rowId, e) {
    const { todoList } = this.state;
    const ind = todoList.findIndex((task) => task.id === rowId);
    switch (e.target.getAttribute("data-row-btn")) {
      case "delete": {
        const newList = [...todoList.slice(0, ind), ...todoList.slice(ind + 1)];
        this.setState({ todoList: newList });
        break;
      }
      case "check": {
        const rowToChange = todoList[ind];
        rowToChange.status = !rowToChange.status;
        const newList = [
          ...todoList.slice(0, ind),
          rowToChange,
          ...todoList.slice(ind + 1),
        ];
        this.setState({ todoList: newList });
        break;
      }
      default:
        return;
    }
  }

  handleClearButton(e) {
    e.preventDefault();
    this.setState({ todoList: [] });
  }

  render() {
    // if (this.state.todoList.length > 5) {
    //   throw new Error("Local error");
    // }
    return (
      <div className="todo-table">
        <div className="container">
          <div className="todo-table__wrapper">
            <h1 className="todo-table__title">TO-DO LIST</h1>
            <AddTaskBar
              onChange={this.onChangeTodoTitle}
              onAdd={this.addTodo}
              todoTitle={this.state.todoTitle}
            />
            <ToDoList
              todoList={this.state.todoList}
              onClick={(id, e) => this.handleRowButtons(id, e)}
              onClear={this.handleClearButton}
            />
          </div>
        </div>
      </div>
    );
  }
}

ToDoListPage.contextType = ThemeContext;

export default ToDoListPage;
