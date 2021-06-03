import "./_todo-table.sass";
import React from "react"

class ToDoListTable extends React.Component {
    render() {
        return(
            <div className="todo-table">
                <div className="container">
                    <div className="todo-table__wrapper">
                        <h1 className="todo-table__title">TO-DO LIST</h1>
                    </div>
                </div>
            </div>
        )
    }
}

export default ToDoListTable;