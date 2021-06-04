import React from "react"
import AddTaskBar from "./AddTaskBar";
import ToDoList from "./ToDoList";
import "./_todo-table.sass";

const todoList = [
    {id: 0, descr: "Vanilla JavaScript", isDone: true},
    {id: 1, descr: "Vue.js", isDone: true},
    {id: 2, descr: "React.js", isDone: false},
    {id: 3, descr: "Node.js", isDone: false},
];

class ToDoListTable extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            todoTitle: '',
        };

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this); 
        this.addTodo = this.addTodo.bind(this); 
    }

    onChangeTodoTitle(title) {
        this.setState({ todoTitle: title });
    }

    addTodo(e) {
        e.preventDefault();
        const {todoTitle} = this.state;
        if(!todoTitle) {
            return;
        }
        todoList.push({
            descr: todoTitle,
            isDone: false,
        });
        this.onChangeTodoTitle('');
    }

    render() {
        return(
            <div className="todo-table">
                <div className="container">
                    <div className="todo-table__wrapper">
                        <h1 className="todo-table__title">TO-DO LIST</h1>
                        <AddTaskBar 
                            onChange={this.onChangeTodoTitle}
                            onAdd={this.addTodo}
                            todoTitle={this.state.todoTitle}
                        />
                        <ToDoList todoList={todoList} />
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoListTable;