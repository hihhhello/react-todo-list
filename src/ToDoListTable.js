import React from "react"
import AddTaskBar from "./AddTaskBar";
import "./_todo-table.sass";

class ToDoListTable extends React.Component {
    render() {
        return(
            <div className="todo-table">
                <div className="container">
                    <div className="todo-table__wrapper">
                        <h1 className="todo-table__title">TO-DO LIST</h1>
                        <AddTaskBar />
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoListTable;