import React from "react"
import AddTaskBar from "./AddTaskBar";
import ToDoList from "./ToDoList";
import {idGenerator} from "./services";
import "./_todo-table.sass";

let todoList = [
    {id: 0, descr: "Vanilla JavaScript", isDone: true},
    {id: 1, descr: "Vue.js", isDone: true},
    {id: 2, descr: "React.js", isDone: false},
    {id: 3, descr: "Node.js", isDone: false},
];

class ToDoListTable extends React.Component {
    constructor(props) {
        super(props);
        this.ids = idGenerator(todoList.length);
        this.state ={
            todoTitle: '',
            listLength: todoList.length,
        };

        this.onChangeTodoTitle = this.onChangeTodoTitle.bind(this); 
        this.addTodo = this.addTodo.bind(this); 
        this.handleRowButtons = this.handleRowButtons.bind(this); 
        this.handleClearButton = this.handleClearButton.bind(this); 
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
            id: this.ids.next().value,
            descr: todoTitle,
            isDone: false,
        });
        this.onChangeTodoTitle('');
    }
    
    handleRowButtons(rowId, e) {
        const ind = todoList.findIndex((task) => task.id === rowId);
        switch(e.target.getAttribute("data-row-btn")) {
            case "delete": {
                todoList = [...todoList.slice(0, ind), ...todoList.slice(ind+1)];
                this.setState(prevState => {return { listLength: prevState.listLength - 1 }})
                break;
            }
            default:
                return;
        }
    }

    handleClearButton(e) {
        e.preventDefault();
        todoList = [];
        this.setState({listLength: 0});
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
                        <ToDoList 
                            todoList={todoList} 
                            onClick={(id, e) => this.handleRowButtons(id, e)}
                            onClear={this.handleClearButton}    
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoListTable;